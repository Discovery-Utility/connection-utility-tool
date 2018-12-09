import React, {Component} from 'react';
import '../../scss/components/_button.scss';


class Button extends Component {
    constructor(props) {
        super(props);

        this.getClassNames = () => {
            let buttonClassNames = "button";
            let customClassNames = this.props.className;

            return buttonClassNames + " " + customClassNames;
        }
    }

    render() {
        return (
            <div className={this.getClassNames()} onClick={this.props.onClick}>{this.props.text}</div>
        );
    }
}

export default Button;

