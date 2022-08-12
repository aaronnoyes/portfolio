import  React from 'react';
import { Link } from "react-router-dom";
import styled, {css} from 'styled-components';


const StyledLink = styled(Link)`
    color: blue;
    text-decoration: none;
    font-size: 1.2em;

    &:visited {
        color: blue;
    }

    ${props => props.small && css`
        font-size: 0.8em;
    `}
`

const ListItem = styled.li`
    margin: 20px 0px;
`

export default function PostItem({post, loggedIn}) {
    return (
        <ListItem key={post.id}>
            <StyledLink to={'posts/' + post.id}>{post.name}</StyledLink>
            <br></br>
            <small>
                {( () => {
                    let date = new Date(post.created);
                    return date.toDateString().substring(4);
                })()}
            </small>
            <br></br>
	    { loggedIn && <StyledLink small={true} to={'posts/' + post.id + '/edit'}>Edit</StyledLink>}
        </ListItem>
    );
}

