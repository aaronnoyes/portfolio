import React, { useState, useEffect } from "react";
import PostList from "./PostList.js";
import Menu, {ActionButton} from "./Menu.js";
import PageContainer from "./PageContainer.js";
import Section from './Section.js';
import ContentContainer from "./ContentContainer.js";
import { Authenticator } from '@aws-amplify/ui-react';
import {useNavigate} from 'react-router-dom';
import {Auth} from 'aws-amplify';
import styled from 'styled-components';

const Header = styled.h1`
    text-align: center;
`

export default function Admin(props) {

    const [idToken, setIdToken] = useState(null);

    let navigate = useNavigate();

    useEffect(() => {
        Auth.currentSession().then((s) => setIdToken(s.idToken.jwtToken));
    }, [])

    return (
        <Authenticator hideSignUp={true}>
            <PageContainer>
                <Menu>
                    <ActionButton solid={true} onClick={() => {navigate('/posts/new')}}>New Post</ActionButton>
                    <ActionButton onClick={() => {navigate('/')}}>Home</ActionButton>
                </Menu>
                <ContentContainer>
                    <Section>
                        <Header>Admin</Header>
                        <PostList loggedIn={true} idToken={idToken}/>
                    </Section>
                </ContentContainer>
            </PageContainer>
        </Authenticator>
    );
}
