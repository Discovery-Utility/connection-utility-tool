import React, {Component} from 'react';


class Button extends Component {
    constructor(props) {
        super(props);

        this.getClassNames = () => {
            let buttonClassNames = "btn btn-primary";
            let customClassNames = this.props.className;

            return buttonClassNames + " " + customClassNames;
        }
    }

    render() {
        return (
            <button type="button" className={this.getClassNames()} onClick={this.props.onClick}>{this.props.text}</button>
        );
    }
}

export default Button;

