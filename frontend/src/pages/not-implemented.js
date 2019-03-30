import React, { Component } from 'react';
import styled from "styled-components";

const Style = styled.section`
/* padding: 30px; */
display: flex;
justify-content: center;
align-items: center;
min-height: 500px;
`;

class NotImplemented extends Component {
    render() {
        return (
            <Style>
                <h2>😢 Sorry, this page is not implemented yet 😢</h2>
            </Style>
        );
    }
}

export default NotImplemented;