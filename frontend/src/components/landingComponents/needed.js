import React, { Component } from 'react';
import styled from "styled-components";
import ProjectCard from "./projectCard";

const Style = styled.article`
&> section {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
}
`;

class Needed extends Component {
    render() {
        return (
            <Style>
                <h3>Urgent</h3>
                <section>
                    <ProjectCard />
                    <ProjectCard />
                    <ProjectCard />
                </section>
            </Style>
        );
    }
}

export default Needed;