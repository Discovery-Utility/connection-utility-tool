import React, {Component} from 'react';


class Button extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button type="button" className="btn btn-primary" onClick={this.props.onClick}>{this.props.text}</button>
        );
    }
}

export default Button;

