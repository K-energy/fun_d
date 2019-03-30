import React, { Component } from 'react';
import styled from "styled-components";
import { Alert } from "react-bootstrap";

const Style = styled.article`
padding: 30px 30px 0px 30px;
h3 {
    margin-bottom: 20px;
}
.content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    & > div {
        max-width: 70vw;
        width: 70vw;
    }
}
`

const data = [
    [`"KBTG" donated 100k to "XXX"`, "info"],
    [`"Chula" donated 100k to "YYY"`, "success"],
    [`"Accenture" donated 100k to "ZZZ"`, "info"],
    [`"Accenture" donated 100k to "ZYX"`, "success"],
    [`"KBTG" donated 100k to "XYZ"`, "info"]
]

class RecentActivity extends Component {
    render() {
        return (
            <Style>
                <h3>Recent Activity</h3>
                <section className="content">
                    <div>
                        {
                            data.map((txt, idx) => (
                                <Alert key={idx} variant={txt[1]}>
                                    {txt[0]}
                                </Alert>
                            ))
                        }
                    </div>
                </section>
            </Style>
        );
    }
}

export default RecentActivity;