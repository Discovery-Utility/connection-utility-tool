import React, {Component} from 'react';
import {Checkbox} from 'react-bootstrap';

class Appliance extends Component {
    constructor(props) {
        super(props);

        this.getClassNames = () => {
            let selfClassNames = "shadow-sm bg-white rounded appliance";
            let customClassNames = this.props.className;

            return selfClassNames + " " + customClassNames;
        };

        this.checkBoxClick = () => {
            console.log("clicked")
        }
    }

    render() {
        return (
            <div className={this.getClassNames()} onClick={this.props.onClick}>

                <div className="app-checkbox">
                    <input type="checkbox" id="checkbox_1"/>
                        <label htmlFor="checkbox_1"/>
                </div>

                <img src="./images/Dell_Logo.svg"
                     width="20" height="20"
                     className="app-dell-ico"
                     alt="dell-logo"/>
            </div>
        );
    }
}

export default Appliance;

