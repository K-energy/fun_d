import React, { Component } from 'react';
import styled from "styled-components";

const CssVariable = {
    "border": "whitesmoke",
    "card": "#333",
    "font-family": "'Droid Sans Mono', monospace",
    "font-size": "5em",
    "font-width": "lighter",
    "font-color": "white",
    "width": "80px"
}

const FlipCounterStyle = styled.div`
display: block;
position: relative;
width: ${() => CssVariable.width};
height: 120px;
perspective-origin: 50% 50%;
perspective: 300px;
background-color: ${() => CssVariable.card};
border-radius: 3px;
box-shadow: 0px 10px 10px -10px grey;

.upperCard, .lowerCard {
    display: flex;
	position: relative;
	justify-content: center;
	width: 100%;
	height: 50%;
	overflow: hidden;
    border: 1px solid ${() => CssVariable.border};
    
    span {
		font-size: ${() => CssVariable["font-size"]};
		font-family: ${() => CssVariable["font-family"]};
		font-weight: ${() => CssVariable["font-width"]};
		color: ${() => CssVariable["font-color"]};
    }
}

.upperCard {
	align-items: flex-end;
	border-bottom: 0.5px solid ${() => CssVariable.border};
	border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    
    span {
		transform: translateY(50%);
    }
}

.lowerCard {
	align-items: flex-start;
	border-top: 0.5px solid ${() => CssVariable.border};
	border-bottom-left-radius: 3px;
	border-bottom-right-radius: 3px;
    span {
        transform: translateY(-50%);
    }
}

.flipCard {
	display: flex;
	justify-content: center;
	position: absolute;
	left: 0;
	width: ${() => CssVariable.width};
	height: 60px;
	overflow: hidden;
	backface-visibility: hidden;
	
	span {
		font-size: ${() => CssVariable["font-size"]};
		font-family: ${() => CssVariable["font-family"]};
		font-weight: ${() => CssVariable["font-width"]};
		color: ${() => CssVariable["font-color"]};
    }
	
	&.unfold {
		top: 50%;
		align-items: flex-start;
		transform-origin: 50% 0%;
		transform: rotateX(180deg);
		background-color: ${() => CssVariable.card};
		border-bottom-left-radius: 3px;
		border-bottom-right-radius: 3px;
		border: 1px solid ${() => CssVariable.border};
		border-top: 0.5px solid ${() => CssVariable.border};
		
		span {
			transform: translateY(-50%);
        }
    }
		
	&.fold {
		top: 0%;
		align-items: flex-end;
		transform-origin: 50% 100%;
		transform: rotateX(0deg);
		background-color: ${() => CssVariable.card};
		border-top-left-radius: 3px;
		border-top-right-radius: 3px;
		border: 0.5px solid ${() => CssVariable.border};
		border-bottom: 0.5px solid ${() => CssVariable.border};
		
		span {
			transform: translateY(50%);
        }
    }

}

.fold {
  -webkit-animation: fold 0.6s cubic-bezier(0.455, 0.03, 0.515, 0.955) 0s 1 normal forwards;
          animation: fold 0.6s cubic-bezier(0.455, 0.03, 0.515, 0.955) 0s 1 normal forwards;
  -webkit-transform-style: preserve-3d;
          transform-style: preserve-3d;
}

.unfold {
  -webkit-animation: unfold 0.6s cubic-bezier(0.455, 0.03, 0.515, 0.955) 0s 1 normal forwards;
          animation: unfold 0.6s cubic-bezier(0.455, 0.03, 0.515, 0.955) 0s 1 normal forwards;
  -webkit-transform-style: preserve-3d;
          transform-style: preserve-3d;
}

@-webkit-keyframes fold {
  0% {
    -webkit-transform: rotateX(0deg);
            transform: rotateX(0deg);
  }
  100% {
    -webkit-transform: rotateX(-180deg);
            transform: rotateX(-180deg);
  }
}

@keyframes fold {
  0% {
    -webkit-transform: rotateX(0deg);
            transform: rotateX(0deg);
  }
  100% {
    -webkit-transform: rotateX(-180deg);
            transform: rotateX(-180deg);
  }
}

@-webkit-keyframes unfold {
  0% {
    -webkit-transform: rotateX(180deg);
            transform: rotateX(180deg);
  }
  100% {
    -webkit-transform: rotateX(0deg);
            transform: rotateX(0deg);
  }
}
@keyframes unfold {
  0% {
    -webkit-transform: rotateX(180deg);
            transform: rotateX(180deg);
  }
  100% {
    -webkit-transform: rotateX(0deg);
            transform: rotateX(0deg);
  }
}
`;

class FlipCounter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newNum: 0,
            oldNum: 0,
            change: true
        }
    }

    componentDidUpdate() {
        if (this.props.num !== this.state.newNum) {
            this.setState({
                newNum: this.props.num,
                oldNum: this.state.newNum,
                change: (this.state.newNum !== this.props.num) ? !this.state.change : this.state.change
            })
        }
    }

    render() {
        const { newNum, oldNum, change } = this.state;
        const animation1 = change ? 'fold' : 'unfold';
        const animation2 = !change ? 'fold' : 'unfold';
        const number1 = change ? oldNum : newNum;
        const number2 = !change ? oldNum : newNum;

        return (
            <FlipCounterStyle>
                <div className={'upperCard'}>
                    <span>{newNum}</span>
                </div>
                <div className={'lowerCard'}>
                    <span>{oldNum}</span>
                </div>
                <div className={`flipCard first ${animation1}`}>
                    <span>{number1}</span>
                </div>
                <div className={`flipCard second ${animation2}`}>
                    <span>{number2}</span>
                </div>
            </FlipCounterStyle>
        );
    }
}

const CounterStyle = styled.article`
height: 500px;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
background-image: url("https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_1280.jpg");
background-size: cover;
background-attachment: fixed;
background-position: center;
padding: 30px 30px 0px 30px;
color: #FFF;

.main-counter {
    display: flex;
    .digit-group {
        display: flex;
        margin-right: 10px;
    }
}
`;

const groupNumber = null;

class Counter extends Component {
    state = {
        counter: 995
    }
    tick = () => {
        this.setState({
            counter: this.state.counter + 1
        })
    }
    componentDidMount() {
        this._tickID = setInterval(this.tick, 1000);
    }
    componentWillUnmount() {
        clearInterval(this._tickID);
    }
    render() {
        let counterString = String(this.state.counter);
        while (counterString.length % 3 !== 0) {
            counterString = "0" + counterString;
        }
        const digitCount = Math.ceil(counterString.length / 3);
        return (
            <CounterStyle>
                <div className="main-counter">
                    {
                        (Array.from(new Array((groupNumber === null) ? digitCount : groupNumber).keys()).map((groupIdx) => {
                            const subString = counterString.slice(groupIdx * 3, groupIdx * 3 + 3);
                            return (
                                <div className="digit-group" key={groupIdx}>
                                    <FlipCounter num={subString.length > 0 ? parseInt(subString[0]) : 0} />
                                    <FlipCounter num={subString.length > 1 ? parseInt(subString[1]) : 0} />
                                    <FlipCounter num={subString.length > 2 ? parseInt(subString[2]) : 0} />
                                </div>
                            );
                        }))
                    }
                </div>
                <span>{this.state.counter} คนกำลังว่างงาน</span>
            </CounterStyle>
        );
    }
}

export default Counter;