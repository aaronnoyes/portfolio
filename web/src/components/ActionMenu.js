import React from 'react';
import ActionButton from './ActionButton.js';
import Menu from "./Menu.js";

export default function ActionMenu(props) {
    return (
        <Menu> 
            {props.cancel && <ActionButton onClick={props.cancel}>Cancel</ActionButton>}
            <ActionButton solid={true} onClick={props.action}>{props.children}</ActionButton>
        </Menu>
    );
}