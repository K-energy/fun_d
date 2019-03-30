import React, { Component } from 'react';
import styled from "styled-components";
import ProjectCard from "./projectCard";

const Style = styled.article`
&> section {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
}
padding: 30px 30px 0px 30px;
`;

const Projects = [{
    name: "โครงการบัวแก้วสัญจร",
    detail: "กระทรวงการต่างประเทศได้จัดทำโครงการบัวแก้วสัญจรพบประชาชน โดยการนำข้าราชการกระทรวงการต่างประเทศเดินทางไปรับฟังความคิดเห็นและดูสภาพความเป็อยู่ของประชาชนในจังหวัดตามแนวชายแดน เพื่อส่งเสริมให้นโยบายการต่างประเทศเป็นของประชาชนอย่างแท้จริง และสอดคล้องกับนโยบายของรัฐบาลในการสนับสนุนให้ประชาชนมีส่วนร่วมในการกำหนดนโยบายต่างประเทศและนโยบายด้านต่างๆ ของรัฐบาล และเพื่อให้ประชาชนตระหนักว่านโยบายต่างประเทศเป็นสิ่งที่จับต้องได้และเกี่ยวข้องกับปากท้องและการดำรงชีวิต ซึ่งจากการดำเนินโครงการที่ผ่านมา มีประชาชนและข้าราชการในพื้นที่เข้าร่วมงานเป็นจำนวนมาก ทำให้กระทรวงการต่างประเทศได้รับข้อมูล ข้อเท็จจริง ความต้องการและปัญหาจากประชาชนในพื้นที่บริเวณชายแดน แล้วนำมาเป็นข้อมูลประกอบการดำเนินนโยบาย กำหนดมาตรการแก้ไขปัญหา และหารือกับผู้นำประเทศเพื่อนบ้าน",
    timeLoc: "Chaing Mai, 2018-2019",
    current: 1500000,
    goal: 4000000,
    src: require("../../resources/img/activity_banner_2.jpg")
}]

class Needed extends Component {
    render() {
        return (
            <Style>
                <h3>Urgent</h3>
                <section>
                    {
                        Projects.map(({
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
            </Style>
        );
    }
}

export default Needed;