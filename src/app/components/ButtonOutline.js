import React, {Component} from 'react';


class ButtonOutline extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="button-outline" onClick={this.props.onClick}>{this.props.text}</div>
        );
    }
}

export default ButtonOutline;



