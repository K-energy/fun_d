import React, { Component } from 'react';
import { Container, Card, Col, Row, Image } from 'react-bootstrap';
import CanvasJSReact from '../assets/canvasjs.react'
import axios from 'axios'
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const CanvasJSChart = CanvasJSReact.CanvasJSChart;
const Style = styled.section`
  padding: 50px 0px;
`;

const activities = [
  {
    title: 'Urban Healthcare',
    place: 'Chiang Mai',
    time: 'Aug 2018 - Aug 2019',
    donated: '300,000 THB',
    image: require('../resources/img/activity_banner_2.jpg')
  },
  {
    title: 'Urban Teachers',
    place: 'Mae Hong Sorn',
    time: 'Aug 2018 - Aug 2019',
    donated: '20,000 THB',
    image: require('../resources/img/activity_banner_1.jpg')
  }
]

class ActivityInfoItem extends Component {
  render() {
    const { activity } = this.props;
    return (
      <Card className="my-4 col-md-5 mr-2">
        <Card.Img
          style={{
            opacity: '0.5',
            filter: 'blur(2px)'
          }}
          src={activity.image || "http://via.placeholder.com/900x300?text=activity"}
        ></Card.Img>
          <Card.ImgOverlay style={{
            backgroundImage: "linear-gradient(#FFF9, #FFF6, #FFF0)"
          }}>
              <Card.Title> {activity.title} </Card.Title>
              <Card.Subtitle> {activity.place}, {activity.time} </Card.Subtitle>
              <Card.Text> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi, corrupti iure rem quasi amet autem dolore perferendis velit, incidunt repudiandae nulla repellat facilis nemo perspiciatis laboriosam sit vero dolores pariatur! </Card.Text>
          </Card.ImgOverlay>
        <Card.Header> Donated {activity.donated} </Card.Header>
      </Card>
    )
  }
}

class CompanyProfile extends Component {
  
  doughnutOptions = {
    subtitles: [{
      text: "Total: 100M THB",
      verticalAlign: "center",
      fontSize: 24,
      fontFamily: "Arial",
      dockInsidePlotArea: true
    }],
    data: [{
      type: "doughnut",
      indexLabel: "{name}: {y}",
      yValueFormatString: "#,###'K THB'",
      dataPoints: [
        { name: "Healthcare", y: 50 },
        { name: "Education", y: 140 },
        { name: "PWD Businesses", y: 120 },
        { name: "Others", y: 70 }
      ]
    }]
  }

  barOptions = {
    animationEnabled: true,
    axisY: {
      title: "in THB",
      prefix: "THB ",
      suffix: "k"
    },
    toolTip: {
      shared: true,
      reversed: true
    },
    legend: {
      verticalAlign: "center",
      horizontalAlign: "right",
      reversed: true,
      // cursor: "pointer",
      // itemclick: this.toggleDataSeries
    },
    data: [
    {
      type: "stackedColumn",
      name: "Healthcare",
      showInLegend: true,
      yValueFormatString: "#,###k",
      dataPoints: [
        { label: "Jan", y: 2 },
        { label: "Feb", y: 6 },
        { label: "Mar", y: 5 },
        { label: "Apr", y: 8 },
        { label: "May", y: 9 },
        { label: "Jun", y: 11 },
        { label: "Jul", y: 12 },
        { label: "Aug", y: 7 },
        { label: "Sept", y: 8 },
        { label: "Oct", y: 3 },
        { label: "Nov", y: 4 },
        { label: "Dec", y: 6 }
      ]
    },
    {
      type: "stackedColumn",
      name: "Education",
      showInLegend: true,
      yValueFormatString: "#,###k",
      dataPoints: [
        { label: "Jan", y: 13 },
        { label: "Feb", y: 13 },
        { label: "Mar", y: 15 },
        { label: "Apr", y: 16 },
        { label: "May", y: 17 },
        { label: "Jun", y: 17 },
        { label: "Jul", y: 18 },
        { label: "Aug", y: 18 },
        { label: "Sept", y: 17 },
        { label: "Oct", y: 18 },
        { label: "Nov", y: 18 },
        { label: "Dec", y: 18 }
      ]
    },
    {
      type: "stackedColumn",
      name: "PWD Businesses",
      showInLegend: true,
      yValueFormatString: "#,###k",
      dataPoints: [
        { label: "Jan", y: 13 },
        { label: "Feb", y: 13 },
        { label: "Mar", y: 15 },
        { label: "Apr", y: 15 },
        { label: "May", y: 15 },
        { label: "Jun", y: 15 },
        { label: "Jul", y: 16 },
        { label: "Aug", y: 17 },
        { label: "Sept", y: 17 },
        { label: "Oct", y: 18 },
        { label: "Nov", y: 19 },
        { label: "Dec", y: 20 },
    ]
    },
    {
      type: "stackedColumn",
      name: "Others",
      showInLegend: true,
      yValueFormatString: "#,###k",
      dataPoints: [
        { label: "Jan", y: 14 },
        { label: "Feb", y: 8 },
        { label: "Mar", y: 6 },
        { label: "Apr", y: 6 },
        { label: "May", y: 5 },
        { label: "Jun", y: 5 },
        { label: "Jul", y: 6 },
        { label: "Aug", y: 3 },
        { label: "Sept", y: 9 },
        { label: "Oct", y: 5 },
        { label: "Nov", y: 8 },
        { label: "Dec", y: 2 },
      ]
    }]
  }
  constructor(props){
    super(props)
    this.state = {
      title:'',
      desc:'',
      link:'',
      involved_projects:''
    }
  }
  async componentDidMount(){
    const company_data = (await axios.get('http://10.22.5.86:8080/company/5c9f5bcd897c9af0af874e9d')).data
    this.setState({
      title:company_data['title'],
      desc:company_data['description'],
      link:company_data['link'],
      involved_project:company_data['involved_projects']
    })
    // console.log('data',company_data)

  }

  render() {
    return (
      <Style>
        <Container>
          <h2>
            Company Profile
          </h2>
          <br></br>
          <div className="d-flex">
              <Image src={require('../resources/img/accenture.png')} fluid />
              <Card style={{flex: 1, border: 'none'}}>
                <Card.Body>
                    <Card.Title> {this.state.title} </Card.Title>
                    <Card.Subtitle> <a href={this.state.link}>{this.state.link}</a> </Card.Subtitle>
                    <Card.Text> {this.state.desc} </Card.Text>
                </Card.Body>
              </Card>
          </div>
          <br/>
          <hr></hr>
          <h3>
            Sponsorships
          </h3>
          <Row>
            <Col>
              <CanvasJSChart options={this.doughnutOptions}></CanvasJSChart>
            </Col>
            <Col>
              <CanvasJSChart options={this.barOptions}></CanvasJSChart>
            </Col>
          </Row>
          <br />
          <h5>
            Top Donations
          </h5>

          <Container>
            <Row>
              <Col className="d-flex flex-wrap justify-content-between">
              {
                activities.map((activity, idx) => (
                  <ActivityInfoItem activity={activity} key={idx}/>
                  ))
                }
              </Col>
            </Row>
          </Container>
        </Container>
      </Style>
    );
  }
}

export default CompanyProfile;