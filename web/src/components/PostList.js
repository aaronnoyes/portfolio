import React, { useState, useEffect } from 'react'
import PostItem from './PostItem.js';
import styled from 'styled-components';
import { getAllPosts } from '../lib/posts.js';

const List = styled.ul`
   list-style: none;
   padding: 0px; 
`

export default function PostList({idToken}) {
    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
        getAllPosts().then(p => setPosts(p));
    }, []);

    return (
        <div>
            <h2>Blog Posts</h2>
            <List> 
                {
                    posts.length !== 0
                    ? posts.map(p => <PostItem key={p.id} post={p} idToken={idToken}/>)
                    : <p>No posts yet...</p>
                }
            </List>
        </div>
    );
}
