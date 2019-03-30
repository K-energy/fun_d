import React, { Component } from 'react';
import styled from "styled-components";
import ProjectCard from "./projectCard";
import axios from "axios";
import setting from "../../setting.json";
import _ from "lodash";

const Style = styled.article`
section {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
}
background: #0001;
box-shadow: 0px 0px 10px #0007;

.background-wrapper {
    background-image: url(${require("../../resources/img/BG_curve_2.svg")});
    background-position: top left;
    background-repeat: no-repeat;
    background-size: 80vw;
    padding: 30px 30px 20px 30px;
    padding: 30px 30px 20px 30px;
}
`;

// Additional Mock Data
const AdditionalMock = [{
    name: "สำนักงานสาธารณสุขอำเภอศรีนคร",
    detail: "กระทรวงการต่างประเทศได้จัดทำโครงการบัวแก้วสัญจรพบประชาชน โดยการนำข้าราชการกระทรวงการต่างประเทศเดินทางไปรับฟังความคิดเห็นและดูสภาพความเป็อยู่ของประชาชนในจังหวัดตามแนวชายแดน เพื่อส่งเสริมให้นโยบายการต่างประเทศเป็นของประชาชนอย่างแท้จริง และสอดคล้องกับนโยบายของรัฐบาลในการสนับสนุนให้ประชาชนมีส่วนร่วมในการกำหนดนโยบายต่างประเทศและนโยบายด้านต่างๆ ของรัฐบาล และเพื่อให้ประชาชนตระหนักว่านโยบายต่างประเทศเป็นสิ่งที่จับต้องได้และเกี่ยวข้องกับปากท้องและการดำรงชีวิต ซึ่งจากการดำเนินโครงการที่ผ่านมา มีประชาชนและข้าราชการในพื้นที่เข้าร่วมงานเป็นจำนวนมาก ทำให้กระทรวงการต่างประเทศได้รับข้อมูล ข้อเท็จจริง ความต้องการและปัญหาจากประชาชนในพื้นที่บริเวณชายแดน แล้วนำมาเป็นข้อมูลประกอบการดำเนินนโยบาย กำหนดมาตรการแก้ไขปัญหา และหารือกับผู้นำประเทศเพื่อนบ้าน",
    timeLoc: "Chaing Mai, 2018-2019",
    current: 1500000,
    goal: 4000000,
    src: require("../../resources/img/activity_banner_2.jpg")
}, {
    name: "สอนหนังสือ แก่เยาวชนรุ่นเยาว์",
    detail: "กระทรวงการต่างประเทศได้จัดทำโครงการบัวแก้วสัญจรพบประชาชน โดยการนำข้าราชการกระทรวงการต่างประเทศเดินทางไปรับฟังความคิดเห็นและดูสภาพความเป็อยู่ของประชาชนในจังหวัดตามแนวชายแดน เพื่อส่งเสริมให้นโยบายการต่างประเทศเป็นของประชาชนอย่างแท้จริง และสอดคล้องกับนโยบายของรัฐบาลในการสนับสนุนให้ประชาชนมีส่วนร่วมในการกำหนดนโยบายต่างประเทศและนโยบายด้านต่างๆ",
    timeLoc: "Chaing Mai, 02/03/2018-01/06/2018",
    current: 2.7*10**6,
    goal: 3*10**6,
        src: require('../../assets/images/activity1.jpg')
}, {
    name: "สอนหนังสือ แก่เยาวชนรุ่นเยาว์ #2",
    detail: "กระทรวงการต่างประเทศได้จัดทำโครงการบัวแก้วสัญจรพบประชาชน โดยการนำข้าราชการกระทรวงการต่างประเทศเดินทางไปรับฟังความคิดเห็นและดูสภาพความเป็อยู่ของประชาชนในจังหวัดตามแนวชายแดน เพื่อส่งเสริมให้นโยบายการต่างประเทศเป็นของประชาชนอย่างแท้จริง และสอดคล้องกับนโยบายของรัฐบาลในการสนับสนุนให้ประชาชนมีส่วนร่วมในการกำหนดนโยบายต่างประเทศและนโยบายด้านต่างๆ",
    timeLoc: "Chaing Mai, 02/03/2018-01/06/2018",
    current: 1.2*10**6,
    goal: 2*10**6,
        src: require('../../assets/images/activity2.jpeg')
}]

class Needed extends Component {
    state = {
        isLoading: true,
        isError: false,
        data: null
    }
    componentDidMount() {
        axios.get(`${setting["server_uri"]}/project`).then(
            (data) => data.data
        ).then((data) => this.setState({
            isLoading: false,
            isError: false,
            data: [...AdditionalMock, ...data.map((it) => ({
                detail: it.description,
                name: it.title,
                current: it.current_money,
                goal: it.goal,
                src: it.image,
                timeLoc: `${it.location}, ${it.time_window}`
            }))]
        })).catch((e) => this.setState({
            isLoading: false,
            isError: true,
            data: null
        }));
    }
    render() {
        return (
            <Style>
                <div className="background-wrapper">
                    <h3><i className="fa fa-clock" />&nbsp;Urgent</h3>
                    <section>
                        {
                            (_.defaultTo(this.state.data, [])).map(({
                                name,
                                detail,
                                timeLoc,
                                current,
                                goal,
                                src
                            }, idx) => (
                                <ProjectCard
                                    key={idx}
                                    name={name}
                                    detail={detail}
                                    timeLoc={timeLoc}
                                    current={current}
                                    goal={goal}
                                    src={src}
                                />
                            ))
                        }
                    </section>
                </div>
            </Style>
        );
    }
}

export default Needed;