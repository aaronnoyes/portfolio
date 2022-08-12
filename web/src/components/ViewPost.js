import React, { useState, useEffect } from 'react';
import MarkdownWrapper from './MarkdownWrapper.js';
import { useParams } from 'react-router-dom';
import ContentContainer from './ContentContainer.js';

import { getPost } from '../lib/posts.js';

export default function ViewPost() {

    let urlParams = useParams();
    const [content, setContent] = useState("Loading...");
    
    useEffect(() => {
        getPost(urlParams.postId)
        .then(post => setContent(post.contents));   
    }, []);


    return (
        <ContentContainer >
            <MarkdownWrapper>{content}</MarkdownWrapper>
        </ContentContainer>
    )
}
