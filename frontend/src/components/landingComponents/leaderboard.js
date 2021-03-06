import React, { Component } from 'react';
import styled from "styled-components";
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from "recharts";
import { Card } from 'react-bootstrap';

const Style = styled.article`

.content {
    padding-right: 4em;
    padding-left: 4em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
}

.background-wrapper {
    background-image: url(${require("../../resources/img/BG_curve.svg")});
    background-position: top left;
    background-repeat: no-repeat;
    background-size: 80vw;
    padding: 30px 30px 20px 30px;
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

const RankedNamed = ["st", "nd", "rd", "th"]
const Color = ["#F7D871", "#D4D3DB", "#A57463", "gray"];

const LeaderBoardItem = ({ image, companyName, donation, idx }) => {
    return (
        <Card
            className="text-center"
            style={{
                border: 'none',
                padding: "0px 5px"
            }}
        >
            <span style={{
                fontSize: `${Math.max(2 - 0.25*idx, 1)}rem`,
            }}>{idx + 1}{idx < RankedNamed.length ? RankedNamed[idx] : RankedNamed[RankedNamed.length-1]}</span>
            <div style={{
                backgroundColor: "white",
                width: "200px",
                height: "200px"
            }}>
                <Card.Img
                    src={image || "http://via.placeholder.com/250?text=Accenture"}
                    style={{
                        width: "200px",
                        height: "200px",
                        objectFit: "contain"
                    }}
                ></Card.Img>
            </div>
            <Card.Body>
                <Card.Title> {companyName} </Card.Title>
                <Card.Subtitle> {donation} </Card.Subtitle>
            </Card.Body>
        </Card>
    );
}

const data = [
    {
        name: 'Aug 18', Donation: 4000, "Total Donor": 11
    },
    {
        name: 'Sep 18', Donation: 3000, "Total Donor": 23
    },
    {
        name: 'Oct 18', Donation: 5000, "Total Donor": 12
    },
    {
        name: 'Nov 18', Donation: 2400, "Total Donor": 32
    },
    {
        name: 'Dec 18', Donation: 6500, "Total Donor": 21
    },
    {
        name: 'Jan 19', Donation: 8000, "Total Donor": 10
    },
    {
        name: 'Feb 19', Donation: 3000, "Total Donor": 11
    },
    {
        name: 'Mar 19', Donation: 4700, "Total Donor": 12
    },
];
 
class Leaderboard extends Component {
    render() {
        return (
            <Style>
                <div className="background-wrapper">
                    <h3>
                        <i className="fa fa-star" />&nbsp;Leaderboard
                    </h3>
                    <div style={{
                        display: "flex",
                        justifyContent: "center"
                    }}>
                        <div style={{
                            width: "70vw",
                            marginTop: "60px"
                        }}>
                            <h6>This month</h6>
                            <div className="content">
                                {
                                    items.map((item, idx) => (
                                        <LeaderBoardItem idx={idx} companyName={item.companyName} donation={item.donation} image={item.image} />
                                    ))
                                }
                            </div>
                            <h6
                                style={{
                                    marginTop: "30px"
                                }}
                            >Total contribution</h6>
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
                        </div>
                    </div>
                </div>
            </Style>
        );
    }
}

export default Leaderboard;