import styled, {css} from 'styled-components';
import ContentContainer from './ContentContainer.js';

export default styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    ${props => props.single && css`
        height: 100vh;
        box-sizing: border-box;
        & ${ContentContainer} {
            height: 100px;
            flex: 1 0 auto;
        }
    `}
`