import React, { Component } from 'react';
import styled from "styled-components";
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from "recharts";
import { Card } from 'react-bootstrap';

const Style = styled.article`
padding: 30px 30px 0px 30px;
.content {
    padding-right: 4em;
    padding-left: 4em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
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
        <Card className="text-center" style={{
            border: 'none'
        }}>
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

const data = [
    {
        name: 'Aug 18', Donation: 4000
    },
    {
        name: 'Sep 18', Donation: 3000
    },
    {
        name: 'Oct 18', Donation: 5000
    },
    {
        name: 'Nov 18', Donation: 2400
    },
    {
        name: 'Dec 18', Donation: 6500
    },
    {
        name: 'Jan 19', Donation: 8000
    },
    {
        name: 'Feb 19', Donation: 3000
    },
    {
        name: 'Mar 19', Donation: 4700
    },
];
 
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
                <h6>Total contribution</h6>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center"
                    }}
                >
                    <LineChart
                        width={700}
                        height={400}
                        data={data}
                        margin={{
                            top: 5, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="Donation" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                </div>
            </Style>
        );
    }
}

export default Leaderboard;