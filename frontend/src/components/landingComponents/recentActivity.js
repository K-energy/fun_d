import React, { Component } from 'react';
import styled from "styled-components";

const Style = styled.article`
padding: 30px 30px 0px 30px;
.content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
`

class RecentActivity extends Component {
    render() {
        return (
            <Style>
                <h3>Recent Activity</h3>
                <ul>
                    <li>ABC</li>
                    <li>ABC</li>
                    <li>ABC</li>
                    <li>ABC</li>
                    <li>ABC</li>
                </ul>
            </Style>
        );
    }
}

export default RecentActivity;