import React, { Component } from 'react';
import { Container,Row,Col,Card,ProgressBar,Button,Table,Modal } from 'react-bootstrap';

import users from './user_mockup'

class Detail extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            users:users['users'],
            project_title:'โครงการบัวแก้วสัญจร',
            project_desc:'กระทรวงการต่างประเทศได้จัดทำโครงการบัวแก้วสัญจรพบประชาชน โดยการนำข้าราชการกระทรวงการต่างประเทศเดินทางไปรับฟังความคิดเห็นและดูสภาพความเป็อยู่ของประชาชนในจังหวัดตามแนวชายแดน เพื่อส่งเสริมให้นโยบายการต่างประเทศเป็นของประชาชนอย่างแท้จริง และสอดคล้องกับนโยบายของรัฐบาลในการสนับสนุนให้ประชาชนมีส่วนร่วมในการกำหนดนโยบายต่างประเทศและนโยบายด้านต่างๆ ของรัฐบาล และเพื่อให้ประชาชนตระหนักว่านโยบายต่างประเทศเป็นสิ่งที่จับต้องได้และเกี่ยวข้องกับปากท้องและการดำรงชีวิต ซึ่งจากการดำเนินโครงการที่ผ่านมา มีประชาชนและข้าราชการในพื้นที่เข้าร่วมงานเป็นจำนวนมาก ทำให้กระทรวงการต่างประเทศได้รับข้อมูล ข้อเท็จจริง ความต้องการและปัญหาจากประชาชนในพื้นที่บริเวณชายแดน แล้วนำมาเป็นข้อมูลประกอบการดำเนินนโยบาย กำหนดมาตรการแก้ไขปัญหา และหารือกับผู้นำประเทศเพื่อนบ้าน',
            fund: false
        }
        // console.log(this.state)
    }
    render() {
        return (
            <section >
                {/* <p>this is detail page</p>/ */}
                <Container style={{marginTop:'30px'}}>
                    <Row>
                        <Col xl={8}>
                            <Card>
                                <Card.Img variant="top" src={require('../assets/images/cat.jpeg')} />
                                <Card.Body>
                                    <Card.Title style={{fontSize:'30px'}}>{this.state.project_title}<br/></Card.Title>
                                    <Card.Title><b>Chaing Mai, 2018-2019</b></Card.Title>
                                    <Card.Text>{this.state.project_desc}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xl={4}>
                            <Card style={{padding:'15px',marginBottom:'30px'}}>
                                <Card.Body>
                                    <Card.Title ><b style={{fontSize:'30px'}}>60000 Baht</b> of 100000 </Card.Title>
                                    <ProgressBar variant="warning" now={60}/>
                                    <div style={{height:'30px'}}/>
                                    <div style={{display:'flex',justifyContent:'center'}}>
                                        {/* <i class="fas fa-money-bill-wave" style={{fontSize:'40px',marginRight:'10px'}}></i> */}
                                        <Button variant="warning" style={{width:'50%'}}> Fund </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                            <Card style={{padding:'15px'}}>
                                <Card.Title>Sponsorship</Card.Title>
                                
                                <Card.Body>
                                    { this.state.users.map( (user,idx)=>{
                                        return (
                                            <Table striped bordered>
                                                <tbody>
                                                    <tr>
                                                        <td><i class="fas fa-tag" style={{fontSize:'20px'}}/></td>
                                                        <td>{user.tag}</td>
                                                    </tr>
                                                    <tr>
                                                        <td><i class="fas fa-money-bill-wave" style={{fontSize:'20px'}}/></td>
                                                        <td> 30000 baht</td>
                                                    </tr>

                                                </tbody>
                                            </Table>
                                        )
                                    })}
                                </Card.Body>
                            </Card>
                            
                        </Col>
                    </Row>
                    <Row style={{marginTop:'40px'}}>
                        <div>
                            <h1>Member list</h1>
                            <div style={{display:'flex',flexDirection:'column'}}>
                                <div style={{display:'flex'}}>
                                    <div style={{borderRadius:'50%',height:'70px',width:'70px',backgroundColor:'#bbb',marginRight:'15px'}}/>
                                    <div style={{display:'flex',flexDirection:'column'}}>
                                        <p style={{verticalAlign:'center',fontSize:'30px'}}><b>นางสาว ศักดิ์ชัย กฐินเทศ</b></p>
                                        <p>ติดตามประเมินผลการทำงานคนพิการ</p>
                                    </div>
                                </div>
                                <div style={{display:'flex'}}>
                                    <div style={{borderRadius:'50%',height:'70px',width:'70px',backgroundColor:'#bbb',marginRight:'15px'}}/>
                                    <div style={{display:'flex',flexDirection:'column'}}>
                                        <p style={{verticalAlign:'center',fontSize:'30px'}}><b>นาย เอลิส กตแก้ว</b></p>
                                        <p>ติดตามประเมินผลการทำงานคนพิการ</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Row>
                </Container>

            </section>
        );
    }
}

export default Detail;