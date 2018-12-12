import React, {Component} from 'react';

class Appliance extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checked: false
        };

        this.getClassNames = () => {
            let selfClassNames = "rounded appliance";
            let customClassNames = this.props.className;
            if (!customClassNames) {
                customClassNames = "";
            }

            let active = this.props.active ? "active" : "not-active";
            selfClassNames += " " + active;
            return selfClassNames + " " + customClassNames;
        };

        this.checkBoxClick = () => {
            let selfID = this.props.appliance.id;
            let {removeSelection, addSelection} = this.props;

            if (this.state.checked) {
                removeSelection(selfID);
            } else {
                addSelection(selfID);
            }

            this.setState({
                checked: !this.state.checked
            });
        }
    }

    render() {
        let {appliance} = this.props;
        let applianceName = appliance.name;
        let applianceType = appliance.type;
        return (
            <div className={this.getClassNames()} onClick={this.props.onClick}>

                {/*<div className="app-checkbox">
                    <input type="checkbox" id="checkbox" onClick={this.checkBoxClick}/>
                    <label htmlFor="checkbox"/>
                </div>*/}
                <label  className="container-check">
                    <input type="checkbox" />
                        <span onClick={this.checkBoxClick} className="checkmark"/>
                </label>
                <img src="./images/Dell_Logo.svg"
                     width="25" height="25"
                     className="app-dell-ico"
                     alt="dell-logo"/>

                <p className="app-name">{applianceName}</p>
                <p className="app-type">{applianceType === "VMware" ? "HCI" : "SAN"}</p>
            </div>
    );
    }
    }

    export default Appliance;

