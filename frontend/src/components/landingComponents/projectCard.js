import React from "react";
import styled from "styled-components";
import { Button, ProgressBar } from 'react-bootstrap';

const ProjectCardStyle = styled.article`
padding: 20px;
box-shadow: 3px 3px 3px #0005;
border: 1px solid #0001;
min-width: 200px;
width: 70vw;
border-radius: 5px;
display: flex;
margin-bottom: 5px;
min-height: 300px;

img {
    object-fit: cover;
}

.info {
    padding: 5px 15px;
    flex: 1;
    display: flex;
    flex-direction: column;

    .detail {
        flex: 1;
    }
}
.side  {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
`;

const ProjectCard = (props) => (
    <ProjectCardStyle>
        <img
            alt="project-profile"
            src="https://via.placeholder.com/150x150"
        />
        <div className="info">
            <div className="detail">
                <h3>Project Name</h3>
                <span>Project detail</span>
            </div>
            <div className="progress-wrapper">
                <span>1,500,000 baht of 4,000,000 baht</span>
                <ProgressBar animated now={37.5} />
            </div>
        </div>
        <div className="side">
            <Button>
                More Detail&nbsp;
                <i className="fa fa-arrow-right" />
            </Button>
            <span>End in Blah Blah</span>
        </div>
    </ProjectCardStyle>
);

export default ProjectCard;