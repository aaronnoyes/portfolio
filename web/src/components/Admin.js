import React, { useState, useEffect } from "react";
import PostList from "./PostList.js";
import ActionButton from "./ActionButton.js"
import MarkdownWrapper from "./MarkdownWrapper.js";
import Menu from "./Menu.js"
import ProfilePhoto from "./ProfilePhoto.js"
import PageContainer from "./PageContainer.js";
import Section from './Section.js'
import ContentContainer from "./ContentContainer.js";
import { Authenticator } from '@aws-amplify/ui-react';
import {Link} from 'react-router-dom'
import {Auth} from 'aws-amplify'
import styled from 'styled-components'

const Header = styled.h1`
    text-align: center;
`

export default function Admin(props) {

    const [idToken, setIdToken] = useState(null)

    useEffect(() => {
        Auth.currentSession().then((s) => setIdToken(s.idToken.jwtToken))
    }, [])

    return (
        <Authenticator hideSignUp={true}>
            <PageContainer>
                <Menu>
                    <Link to="/posts/new">
                        <ActionButton solid={true}>New Post</ActionButton>
                    </Link>
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
