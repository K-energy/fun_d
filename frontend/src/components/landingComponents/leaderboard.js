import React, { Component } from 'react';
import styled from "styled-components";
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";

const Style = styled.article`
padding: 30px 30px 0px 30px;
.content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
`;

const data = [{
    "name": "Current Month",
    "CompanyA": 3000,
    "CompanyB": 4000,
    "CompanyC": 5000,
}, {
    "name": "Previous Month",
    "CompanyB": 3000,
    "CompanyD": 7000,
    "CompanyC": 2000,
}]

class Leaderboard extends Component {
    render() {
        const Keys = Array.from(data.reduce((acc, it) => {
            Object.keys(it).forEach((a) => {
                if(a !== "name")
                acc.add(a)
            })
            return acc;
        }, new Set()));
        return (
            <Style>
                <h3>Leaderboard</h3>
                <div className="content">
                    <BarChart width={730} height={250} data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {
                            Keys.map((it) => (
                                <Bar dataKey={it} key={it} fill="#8884d8" />
                            ))
                        }
                    </BarChart>
                </div>
            </Style>
        );
    }
}

export default Leaderboard;