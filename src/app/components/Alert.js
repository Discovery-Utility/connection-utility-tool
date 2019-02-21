import React, {Component} from 'react';
import '../../scss/components/_alert.scss'

/**
 * Alert component display alert message.
 *
 * props:
 * title: alert title
 * text: alert text
 * onClick: click on alert
 *
 * TODO. Display not only an error message, but also success.
 */
class Alert extends Component {
    constructor(props) {
        super(props);

        this.getClassNames = () => {
            let selfClassNames = "rounded alert-error custom-alert";
            let customClassNames = this.props.className;

            return selfClassNames + " " + customClassNames;
        }
    }

    render() {
        return (
            <div className={this.getClassNames()} onClick={this.props.onClick}>
                <img src="./images/error.svg"
                     width="30" height="30"
                     className="alert-img"
                     alt=""/>
                <div className="alert-content">
                    <p className="alert-title"><b>{this.props.title}</b></p>
                    <p className="alert-msg">{this.props.text}</p>
                </div>
            </div>
        );
    }
}

export default Alert;

