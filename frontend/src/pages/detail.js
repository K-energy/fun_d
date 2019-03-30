import React, { Component } from 'react';
import { Container,Row,Col,Card,ProgressBar,Button,Table,Badge,Modal,Form } from 'react-bootstrap';
import styled from "styled-components";
import users from './user_mockup';
import axios from 'axios';
import setting from "../setting.json";

const Circle = styled.div`
    border-radius : 50%;
    height: 100px;
    width: 100px;
    background-color: #bbb;
    display: flex;
`
const Line = styled.div`
    border-style:'solid';
    border-width:'10px 0 0 0';
    width:'50px';
    borderColor:'#bbb';
`

class MyVerticallyCenteredModal extends Component {
    onSubmit = (e) => {
        this.props.onSubmit(e);
        this.props.onHide();
    }
    render() {
      return (
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Funding
            </Modal.Title>
          </Modal.Header>
            
          <Modal.Body>
            <Form
                onSubmit={(e) => {
                    e.preventDefault();
                    this.props.onHide();
                    return false;
                }}
            >
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Money</Form.Label>
                    <Form.Control ref={this.props.fundAmtRef} type="text" pattern="\d*\.?\d*" placeholder="Enter money (Baht)" />
                    {/* <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text> */}
                </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.onHide}>Close</Button>
            <Button onClick={this.onSubmit}>Submit</Button>
          </Modal.Footer>
        </Modal>
      );
    }
  }

function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

const MockAPI = {
    addFund: async (val) => {
        return new Promise((res) => {
            setTimeout(() => {
                res(val);
            }, 500);
        })
    }
}

class Detail extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            users:users['users'],
            project_title:'โครงการบัวแก้วสัญจร',
            project_desc:'กระทรวงการต่างประเทศได้จัดทำโครงการบัวแก้วสัญจรพบประชาชน โดยการนำข้าราชการกระทรวงการต่างประเทศเดินทางไปรับฟังความคิดเห็นและดูสภาพความเป็อยู่ของประชาชนในจังหวัดตามแนวชายแดน เพื่อส่งเสริมให้นโยบายการต่างประเทศเป็นของประชาชนอย่างแท้จริง และสอดคล้องกับนโยบายของรัฐบาลในการสนับสนุนให้ประชาชนมีส่วนร่วมในการกำหนดนโยบายต่างประเทศและนโยบายด้านต่างๆ ของรัฐบาล และเพื่อให้ประชาชนตระหนักว่านโยบายต่างประเทศเป็นสิ่งที่จับต้องได้และเกี่ยวข้องกับปากท้องและการดำรงชีวิต ซึ่งจากการดำเนินโครงการที่ผ่านมา มีประชาชนและข้าราชการในพื้นที่เข้าร่วมงานเป็นจำนวนมาก ทำให้กระทรวงการต่างประเทศได้รับข้อมูล ข้อเท็จจริง ความต้องการและปัญหาจากประชาชนในพื้นที่บริเวณชายแดน แล้วนำมาเป็นข้อมูลประกอบการดำเนินนโยบาย กำหนดมาตรการแก้ไขปัญหา และหารือกับผู้นำประเทศเพื่อนบ้าน',
            fund: false,
            tags: [],
            members: [],
            modalShow: false,
            current_money: 0,
            goal_money: 0,
            contributors: [],
        }
        // console.log(this.state)
    }

    async componentDidMount(){
        const project = (await axios.get(`${setting["server_uri"]}/project`)).data

        const contributors = await Promise.all(project[0]['contributors'].map((id) => {
            return axios.get(`${setting["server_uri"]}/company/${id}`).then((d) => d.data);
        }));

        await this.setState({
            members: project[0]['members'],
            project_desc: project[0]['description'],
            project_title: project[0]['title'],
            tags: project[0]['tags'],
            current_money: parseFloat(project[0]['current_money']),
            goal_money: parseFloat(project[0]['goal']),
            contributors: contributors
        })
        // var contributors =  ;


        // console.log(contributors)


    }

    onSubmit = async (e) => {
        e.preventDefault();
        try {
            if (parseFloat(this._fundAmt.value) <= 0) {
                return false;
            }
            // Mock API
            const addVal = await MockAPI.addFund(this._fundAmt.value);
            this.setState({
                current_money: parseFloat(this.state.current_money) + parseFloat(addVal)
            })
        } catch(error) {
            // Fail silently
        }
        return false;
    }

    render() {
        let modalClose = () => this.setState({ modalShow: false });
        const isOverFunded = parseFloat(this.state.current_money) / parseFloat(this.state.goal_money) >= 1;
        return (
            <section >
                {/* <p>this is detail page</p>/ */}
                <Container style={{marginTop:'30px'}}>
                    <Row>
                        <Col xl={8}>
                            <Card>
                                <Card.Img variant="top" src={require('../assets/images/cat.jpg')} />
                                <Card.Body>
                                    <Card.Title style={{fontSize:'30px'}}>{this.state.project_title}<br/></Card.Title>
                                    <Card.Title><b>Chaing Mai, 2018-2019</b></Card.Title>
                                    <Card.Text>{this.state.project_desc}</Card.Text>
                                    <div>
                                        {this.state.tags.map((tag,idx)=>{
                                            return (
                                                <Badge style={{margin:'5px'}} variant="primary">{tag}</Badge>
                                            )
                                        })}
                                        {/* <Badge style={{margin:'5px'}} variant="primary">การศึกษา</Badge>
                                        <Badge style={{margin:'5px'}} variant="primary">ผู้พิการทางสายตา</Badge> */}
                                    </div>
                                </Card.Body>

                            </Card>
                        </Col>
                        <Col xl={4}>
                            <Card style={{padding:'15px',marginBottom:'30px'}}>
                                <Card.Body>
                                    <Card.Title ><b style={{fontSize:'20px'}}>{formatNumber(this.state.current_money)} Baht</b> of {formatNumber(this.state.goal_money)} </Card.Title>
                                    <ProgressBar animated variant={isOverFunded ? "success" : "warning"} now={100 * parseFloat(this.state.current_money) / parseFloat(this.state.goal_money)}/>
                                    <div style={{height:'30px'}}/>
                                    <div style={{display:'flex',justifyContent:'center'}}>
                                        {/* <i class="fas fa-money-bill-wave" style={{fontSize:'40px',marginRight:'10px'}}></i> */}
                                        <Button variant={isOverFunded ? "success" : "warning"} onClick={()=>{this.setState({modalShow:true})}} style={{width:'50%'}}> {isOverFunded ? "Funded" : "Fund"} </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                            <Card style={{padding:'15px',marginBottom:'30px'}}>
                                <Card.Title>Sponsorship</Card.Title>
                                
                                <Card.Body>
                                    { this.state.contributors.map( (contributor, idx)=>{
                                        return (
                                            <Table striped bordered key={idx}>
                                                <tbody>
                                                    <tr style={{width:'100%'}}>
                                                        <td><i className="fas fa-tag" style={{fontSize:'20px'}}/></td>
                                                        <td>{contributor.title}</td>
                                                    </tr>
                                                    <tr style={{width:'100%'}}>
                                                        <td><i className="fas fa-money-bill-wave" style={{fontSize:'20px'}}/></td>
                                                        <td> 30000 baht</td>
                                                    </tr>
                                                    <tr style={{width:'100%'}}>
                                                        <td><i class="fas fa-envelope"></i></td>
                                                        <td><a href={contributor.link}>{contributor.link}</a></td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        )
                                    })}
                                </Card.Body>
                            </Card>
                            <div>
                                <h1>Member list</h1>
                                <div style={{display:'flex',flexDirection:'column'}}>
{/*                                     
                                    <div style={{display:'flex'}}>
                                        <div style={{borderRadius:'50%',height:'70px',width:'70px',backgroundColor:'#bbb',marginRight:'15px'}}/>
                                        <div style={{display:'flex',flexDirection:'column'}}>
                                            <p style={{verticalAlign:'center',fontSize:'20px'}}><b>นางสาว ศักดิ์ชัย กฐินเทศ  <Badge variant="primary">PWD</Badge></b></p>
                                            <p>ติดตามประเมินผลการทำงานคนพิการ</p>
                                        </div>
                                    </div>
                                    <div style={{display:'flex'}}>
                              
                                        <div style={{borderRadius:'50%',height:'70px',width:'70px',backgroundColor:'#bbb',marginRight:'15px'}}/>
                                        <div style={{display:'flex',flexDirection:'column'}}>
                                            <p style={{verticalAlign:'center',fontSize:'20px'}}><b>นาย เอลิส กตแก้ว</b>  <Badge variant="primary">PWD</Badge></p>
                                            <p>ติดตามประเมินผลการทำงานคนพิการ</p>
                                        </div>
                                    </div> */}
                                    {this.state.members.map((member,idx)=>{
                                        return(
                                            <div style={{display:'flex'}}>
                                                <div style={{borderRadius:'50%',height:'70px',width:'70px',backgroundColor:'#bbb',marginRight:'15px'}}/>
                                                <div style={{display:'flex',flexDirection:'column'}}>
                                                    <p style={{verticalAlign:'center',fontSize:'20px'}}><b>{member}</b>  <Badge variant="primary">PWD</Badge></p>
                                                    <p>ติดตามประเมินผลการทำงานคนพิการ</p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <div style={{height:'30px'}}/>
                    <Row>
                        <div>
                            <h1>Progress</h1>
                            <Card style={{marginBottom:'30px'}}>
                                <div style={{width:'1200px',height:'300px',display:'flex',flexDirection:'row'}}>
                                    <img style={{width:'800px',height:'100%'}} src={require('../assets/images/activity1.jpg')}/>
                                        
                                    <div style={{width:'100%',padding:'10px'}}>
                                        <h2><b>สอนหนังสือ แก่เยาวชนรุ่นเยาว์</b></h2>
                                        <p><b>Chaing Mai, 02/03/2018-01/06/2018</b></p>
                                        <p>กระทรวงการต่างประเทศได้จัดทำโครงการบัวแก้วสัญจรพบประชาชน โดยการนำข้าราชการกระทรวงการต่างประเทศเดินทางไปรับฟังความคิดเห็นและดูสภาพความเป็อยู่ของประชาชนในจังหวัดตามแนวชายแดน เพื่อส่งเสริมให้นโยบายการต่างประเทศเป็นของประชาชนอย่างแท้จริง และสอดคล้องกับนโยบายของรัฐบาลในการสนับสนุนให้ประชาชนมีส่วนร่วมในการกำหนดนโยบายต่างประเทศและนโยบายด้านต่างๆ </p>
                                    </div>
                                    <p style={{marginTop:'auto',marginRight:'15px'}}>Updated : 01/06/2018</p>
                                </div>  
                            </Card>
                            <Card style={{marginBottom:'30px'}}>
                                <div style={{width:'1200px',height:'300px',display:'flex',flexDirection:'row'}}>
                                    <img style={{width:'800px',height:'100%'}} src={require('../assets/images/activity2.jpeg')}/>
                                        
                                    <div style={{width:'100%',padding:'10px'}}>
                                        <h2><b>สอนหนังสือ แก่เยาวชนรุ่นเยาว์ #2</b></h2>
                                        <p><b>Chaing Mai, 02/07/2018-01/01/2019</b></p>
                                        <p>กระทรวงการต่างประเทศได้จัดทำโครงการบัวแก้วสัญจรพบประชาชน โดยการนำข้าราชการกระทรวงการต่างประเทศเดินทางไปรับฟังความคิดเห็นและดูสภาพความเป็อยู่ของประชาชนในจังหวัดตามแนวชายแดน เพื่อส่งเสริมให้นโยบายการต่างประเทศเป็นของประชาชนอย่างแท้จริง และสอดคล้องกับนโยบายของรัฐบาลในการสนับสนุนให้ประชาชนมีส่วนร่วมในการกำหนดนโยบายต่างประเทศและนโยบายด้านต่างๆ </p>
                                    </div>
                                    <p style={{marginTop:'auto',marginRight:'15px'}}>Updated : 01/01/2019</p>
                                </div>  
                            </Card>
                        </div>
                    </Row>
                    <div style={{height:'30px'}}/>
                </Container>
                <MyVerticallyCenteredModal
                    show={this.state.modalShow}
                    onHide={modalClose}
                    onSubmit={this.onSubmit}
                    fundAmtRef={me => this._fundAmt = me}
                />              
            </section>
        );
    }
}

export default Detail;