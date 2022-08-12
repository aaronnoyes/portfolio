import styled from 'styled-components'

export default styled.section`
    width: 60vw;
    overflow:auto;

    & blockquote {
        background: rgba(176, 179, 196, 0.77);
        padding: 2px;
        /* border-radius: 0px; */
        border-left: 5px solid black;
    }

    & img {
        max-height: 400px;
        display: block;
        margin: auto;
    }
`