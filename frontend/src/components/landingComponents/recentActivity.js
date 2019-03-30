import React, { Component } from 'react';
import styled from "styled-components";
import { Alert } from "react-bootstrap";

const Style = styled.article`
padding: 30px 30px 40px 30px;
background: #0001;
box-shadow: 0px 0px 10px #0007;
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
    [`"KBTG" donated 100k to "สมาคมสายใยครอบครัว"`, "info"],
    [`"Chula" donated 100k to "โรงพยาบาลส่งเสริมสุขภาพตำบลบ้านวังมะด่าน"`, "success"],
    [`"Accenture" donated 100k to "โรงเรียนชุมชนบ้านหนองปรือ"`, "info"],
    [`"Accenture" donated 100k to "องค์การบริหารส่วนตำบลกรุงชิง"`, "success"],
    [`"KBTG" donated 100k to "โรงเรียนบ้านโปร่งใหญ่"`, "info"]
]

class RecentActivity extends Component {
    render() {
        return (
            <Style>
                <h3><i className="fa fa-newspaper" />&nbsp;Recent Activity</h3>
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