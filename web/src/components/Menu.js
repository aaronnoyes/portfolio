import styled, {css} from "styled-components";

export default styled.menu`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 0px;
    margin: 0px;
`

export const ActionButton = styled.button`
    min-width: 120px;
    height: 40px;
    font-weight: bold;
    font-size: 1.1em;
    margin: 5px;
    cursor:pointer;
    border-radius: 5px;
    border: 2px solid black;
    ${ props => props.solid && css`
        border: none;
        color: white;
        background: black; 
    `}
    ${ props => props.color && css`
        background-color: ${props.color};
    `}
`