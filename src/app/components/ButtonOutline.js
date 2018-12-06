import React, {Component} from 'react';


class ButtonOutline extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button type="button" className="btn btn-outline-primary outline-btn" onClick={this.props.onClick}>{this.props.text}</button>
        );
    }
}

export default ButtonOutline;



