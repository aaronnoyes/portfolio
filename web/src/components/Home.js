import React, { useState} from "react";
import PostList from "./PostList.js";
import ActionButton from "./ActionButton.js"
import MarkdownWrapper from "./MarkdownWrapper.js";
import Menu from "./Menu.js"
import ProfilePhoto from "./ProfilePhoto.js"
import PageContainer from "./PageContainer.js";
import Section from './Section.js'
import ContentContainer from "./ContentContainer.js";
import {Link} from 'react-router-dom'
import {Auth} from 'aws-amplify'
import styled from 'styled-components'
import md from '../home.md';

import me from '../images/me.jpeg'

const Header = styled.h1`
    text-align: center;
`

export default function Home(props) {

    const [isLoggedIn, setLoggedIn] = useState(false)

    Auth.currentUserInfo().then((user) => setLoggedIn(user !== null))
    Auth.currentSession().then((r) => console.log(r))

    return (
        <PageContainer>
            <Menu>
		{ 
		  isLoggedIn && <Link to="/posts/new">
                    <ActionButton solid={true}>New Post</ActionButton>
		  </Link>
		}
		{ 
		  !isLoggedIn && <Link to="/posts/new">
                    <ActionButton solid={true}>Log In</ActionButton>
		  </Link>
		}
            </Menu>
            <ContentContainer>
                <Section>
                    <Header>Aaron Noyes</Header>
                    <ProfilePhoto src={me} className='profile-icon'></ProfilePhoto>
                    <MarkdownWrapper>{md}</MarkdownWrapper>
		    <PostList loggedIn={isLoggedIn}/>
                </Section>
            </ContentContainer>
        </PageContainer>
    );
}
