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
        companyName: 'Accenture',
        donation: '300K THB',
    },
    {
        companyName: 'KBTG',
        donation: '290K THB',
    },
    {
        companyName: 'Chula',
        donation: '250K THB',
    },
    {
        companyName: 'SCB',
        donation: '100K THB',
    },
]

const LeaderBoardItem = ({ companyName, donation }) => {
    return (
        <Card className="text-center" style={{border: 'none'}}>
        <Card.Img src="http://via.placeholder.com/250?text=Accenture"></Card.Img>
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
                            <LeaderBoardItem companyName={item.companyName} donation={item.donation} />
                        ))
                    }
                </div>
            </Style>
        );
    }
}

export default Leaderboard;