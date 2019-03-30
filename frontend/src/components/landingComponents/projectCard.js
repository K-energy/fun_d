import React from "react";
import styled from "styled-components";
import { Button, ProgressBar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProjectCardStyle = styled.article`
box-shadow: 3px 3px 3px #0005;
border: 1px solid #0001;
min-width: 200px;
width: 70vw;
border-radius: 5px;
display: flex;
margin-bottom: 15px;
min-height: 300px;

img {
    object-fit: cover;
    width: 300px;
    height: 300px;
    object-position: center center;
}

.info {
    padding: 15px 25px;
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
    margin-right: 20px;
}
`;

function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

const maxLength = 350;

const ProjectCard = ({ name, detail, current, goal, timeLoc, src, ...props }) => (
    <ProjectCardStyle>
        <img
            alt="project-profile"
            src={src}
        />
        <div className="info">
            <div className="detail">
                <h3>{name}</h3>
                <b>{timeLoc}</b><br />
                <span>{detail.slice(0, maxLength)}{(detail.length > maxLength ? "..." : "")}</span>
            </div>
            <div className="progress-wrapper">
                <span>{formatNumber(current)} baht of {formatNumber(goal)} baht</span>
                <ProgressBar animated now={100 * current/goal} />
            </div>
        </div>
        <div className="side">
            <Link to="/detail">
                <Button>
                    More Detail&nbsp;
                    <i className="fa fa-arrow-right" />
                </Button>
            </Link>
        </div>
    </ProjectCardStyle>
);

export default ProjectCard;