import React, {Component} from 'react';
import {Link} from "react-router-dom";


class Alert extends Component {
    constructor(props) {
        super(props);

        this.getClassNames = () => {
            let selfClassNames = "p-3 mb-1 pb-1 bg-danger text-white shadow rounded";//  p-3 mb-5 bg-white rounded
            let customClassNames = this.props.className;

            return selfClassNames + " " + customClassNames;
        }
    }

    render() {
        return (
            <div className={this.getClassNames()}>
                <div className="row justify-content-start">
                    <img src="./images/error.svg"
                         width="25" height="25"
                         className="pt-2 d-inline-block align-top"
                         alt=""/>
                    <div >
                        <p className="tooltipTitle"><b>{this.props.title}</b></p>
                        <p className="tooltipText">{this.props.text}</p>
                    </div>
                </div>
                {/*<button type="button" className="close" aria-label="Close">
                    <span aria-hidden="true"/>
                </button>*/}

            </div>
        );
    }
}

export default Alert;

