import React, { useState, useEffect } from 'react';
import MarkdownWrapper from './MarkdownWrapper.js';
import AceEditor from 'react-ace';
import Menu, {ActionButton} from './Menu.js';
import ContentContainer from './ContentContainer.js';
import PageContainer from './PageContainer.js';
import {Auth} from 'aws-amplify';
import { useParams, useNavigate } from 'react-router-dom';
import { getPost, updatePost, newPost} from '../lib/posts.js';

import md from '../new-placeholder.md';

import "ace-builds/src-noconflict/mode-markdown.js";
import "ace-builds/src-noconflict/theme-monokai.js";
import "ace-builds/src-noconflict/ext-language_tools.js";


export default function Edit(props) {

  let placeHolder = props.isNew ? md : ""; 
  let urlParams = useParams();
  let navigate = useNavigate();

  const [contents, setContents] = useState(placeHolder);
  const [post, setPost] = useState({});
  const [idToken, setIdToken] = useState(null);

  useEffect(() => {
    Auth.currentSession().then((s) => setIdToken(s.idToken.jwtToken));
  }, [])

  useEffect(() => {
    if (!props.isNew) {
      getPost(urlParams.postId)
        .then(post => {
          setContents(post.contents);
          setPost(post);
        });   
    }
  }, [props.postId]);

  const action = () => {
    if (!props.isNew) {
      updatePost(post, contents, idToken)
        .then(() => navigate('/'));
    }
    else {
      newPost(contents, idToken)
        .then(() => navigate('/'));
    }
  }

  return (
    <PageContainer single={true}>
      <Menu>
        <ActionButton solid={true} onClick={action}>{props.isNew ? "Create" : "Update"}</ActionButton>
        <ActionButton onClick={() => {navigate('/admin')}}>Cancel</ActionButton>
      </Menu>
      <ContentContainer>
        <AceEditor
          mode="markdown"
          theme="monokai"
          onChange={v => {setContents(v)}}
          name="editor"
          height="100%"
          width="60vw"
          value={contents}
        />
        <MarkdownWrapper>{contents}</MarkdownWrapper>
      </ContentContainer>
    </PageContainer>
  )
}

