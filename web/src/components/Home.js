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

const Header = styled.h1`
    text-align: center;
`

export default function Home(props) {
    return (
        <PageContainer>
            <Menu>
		        <Link to="/admin">
                    <ActionButton solid={true}>Admin</ActionButton>
		        </Link>
            </Menu>
            <ContentContainer>
                <Section>
                    <Header>Aaron Noyes</Header>
                    <MarkdownWrapper>{md}</MarkdownWrapper>
		            <PostList idToken={null}/>
                </Section>
            </ContentContainer>
        </PageContainer>
    );
}