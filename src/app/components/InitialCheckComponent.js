import React, {Component} from 'react';
import '../../scss/components/_initial_check_component.scss'

/**
 * Represents preparation step on the first screen
 *
 * props:
 * title: step title
 * text: step description
 * status: step status (can be "failed", "warning", "info", "passed")
 * onClick: on step click
 *
 */
class InitialCheckComponent extends Component {
    constructor(props) {
        super(props);

        this.getClassNames = () => {
            let selfClassNames = "initial-check";
            let customClassNames = `initial-check-for-${this.props.check.toLowerCase()} `;
            customClassNames += this.props.status.toLowerCase();

            return selfClassNames + " " + customClassNames;
        }
    }

    render() {
        return (
            <div className={this.getClassNames()} onClick={this.props.onClick}>
                <div className="initial-check-image"></div>
                <div className="initial-check-info">
                    <p className="initial-check-title"><b>{this.props.title}</b></p>
                    <p className="initial-check-desc">{this.props.text}</p>
                </div>
            </div>
        );
    }
}

export default InitialCheckComponent;