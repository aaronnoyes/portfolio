import React, { useState, useEffect } from 'react';
import MarkdownWrapper from './MarkdownWrapper.js';
import AceEditor from 'react-ace';
import ActionMenu from './ActionMenu.js'
import ContentContainer from './ContentContainer.js';
import PageContainer from './PageContainer.js';
import {Auth} from 'aws-amplify'
import { useParams, useNavigate } from 'react-router-dom';
import { Authenticator } from '@aws-amplify/ui-react';
import { getPost, updatePost, newPost} from '../lib/posts.js'

import md from '../new-placeholder.md'

import "ace-builds/src-noconflict/mode-markdown.js";
import "ace-builds/src-noconflict/theme-monokai.js";
import "ace-builds/src-noconflict/ext-language_tools.js";


export default function Edit(props) {

  let placeHolder = props.isNew ? md : ""; 
  let urlParams = useParams();
  let navigate = useNavigate();

  let action;
  let actionName;

  const [contents, setContents] = useState(placeHolder);
  const [post, setPost] = useState({});
  const [idToken, setIdToken] = useState(null)

  Auth.currentSession().then((s) => setIdToken(s.idToken.jwtToken))

  if (!props.isNew) {
    useEffect(() => {
      getPost(urlParams.postId)
        .then(post => {
          setContents(post.contents);
          setPost(post);
        });   
    }, [props.postId]);

    action = () => {
      updatePost(post, contents, idToken)
        .then(() => navigate('/'))
    }

    actionName = "Update"
  }
  else {
    action = () => {
      newPost(contents, idToken)
        .then(() => navigate('/'))
    }

    actionName = "Create"
  }


  return (
  <Authenticator hideSignUp={true}>
    <PageContainer single={true}>
      <ActionMenu action={action} cancel={() => navigate('/')}>{actionName}</ActionMenu>
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
  </Authenticator>
  )
}

