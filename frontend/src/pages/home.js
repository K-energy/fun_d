import React, { Component } from 'react';
import styled from "styled-components";
import { HomeComponent } from "../components";

const Style = styled.section`
/* padding: 30px; */
`;

class Home extends Component {
    render() {
        return (
            <Style>
                <HomeComponent.Counter />
                <HomeComponent.Needed />
                <HomeComponent.Leaderboard />
                <HomeComponent.RecentActivity />
            </Style>
        );
    }
}

export default Home;