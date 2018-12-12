import React, {Component} from 'react';
import '../../scss/components/_button.scss';


class Button extends Component {
    constructor(props) {
        super(props);

        this.state = {
            disable: false
        };

        this.getClassNames = () => {
            let buttonClassNames = "button";
            let customClassNames = this.props.className;
            let available = this.props.available;

            if (!available) {
                buttonClassNames += " disable";
            }

            return buttonClassNames + " " + customClassNames;
        }
    }

    render() {
        return (
            <div className={this.getClassNames()}
                 onClick={this.props.available ? this.props.onClick : null}>{this.props.text}</div>
        );
    }
}

export default Button;

