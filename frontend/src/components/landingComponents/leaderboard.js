import React, { Component } from 'react';
import styled from "styled-components";
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";
import { Card } from 'react-bootstrap';

const Style = styled.article`
padding: 30px 30px 0px 30px;
.content {
    padding-right: 4em;
    padding-left: 4em;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
`;

const items = [
    {
        image: require('../../resources/img/accenture_logo.png'),
        companyName: 'Accenture',
        donation: '300K THB',
    },
    {
        image: require('../../resources/img/kbtg_logo.png'),
        companyName: 'KBTG',
        donation: '290K THB',
    },
    {
        image: require('../../resources/img/chula_logo.jpg'),
        companyName: 'Chula',
        donation: '250K THB',
    },
    {
        image: require('../../resources/img/scb_logo.png'),
        companyName: 'SCB',
        donation: '100K THB',
    },
]

const LeaderBoardItem = ({ image, companyName, donation }) => {
    return (
        <Card className="text-center" style={{border: 'none'}}>
            <Card.Img
                src={image || "http://via.placeholder.com/250?text=Accenture"}
                style={{
                    width: "200px",
                    height: "200px",
                    objectFit: "contain"
                }}
            ></Card.Img>
            <Card.Body>
                <Card.Title> {companyName} </Card.Title>
                <Card.Subtitle> {donation} </Card.Subtitle>
            </Card.Body>
        </Card>
    );
}
 
class Leaderboard extends Component {
    render() {
        return (
            <Style>
                <h3>Leaderboard</h3>
                <h6>This month</h6>
                <div className="content">
                    {
                        items.map(item => (
                            <LeaderBoardItem companyName={item.companyName} donation={item.donation} image={item.image} />
                        ))
                    }
                </div>
            </Style>
        );
    }
}

export default Leaderboard;