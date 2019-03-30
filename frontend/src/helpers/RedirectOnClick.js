import React, { Component } from "react";
import { Redirect } from "react-router-dom";

const Wrapper = (Main, to) => {
    class WrappedComponent extends Component {
        state = {
            isClick: false
        }
        render() {
            const { onClick, ...props } = this.props;
            return (
                <>
                    <Main
                        {...props}
                        onClick={() => {
                            this.setState({ isClick: true });
                            onClick && onClick();
                        }}
                    />
                    {
                        (this.state.isClick) && (<Redirect to={to} />)
                    }
                </>
            )
        }
    }
    return WrappedComponent;
}

export default Wrapper;