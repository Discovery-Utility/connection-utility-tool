import React, {Component} from 'react';
import t from './../locales/translation'
import '../../scss/components/_appliance.scss'

/**
 * Appliance component displays item of appliances list.
 * Appliance may be a radio or checkbox item.
 *
 * props:
 * active: true/false if true component marked.
 * addSelection: callback function
 * removeSelection: callback function
 * appliance: appliance object
 * selectTypeCheckbox: true/false use checkbox or radiobutton
 * showSettingsMenu: true/false show dropdown menu
 */
class Appliance extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checked: this.props.active
        };

        //unite self classes and props classes
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

        //click on the checkbox if props selecteTypeCheckbox = true
        this.checkBoxClick = () => {
            let selfID = this.props.appliance.id;
            let {removeSelection, addSelection} = this.props;
            let isCheckbox = true;
            if (this.state.checked) {
                removeSelection(selfID);
            } else {
                addSelection(selfID, isCheckbox);
            }

            this.setState({
                checked: !this.state.checked
            });
        };

        //click on the radio button if props selecteTypeCheckbox = false
        this.radioClick = () => {
            let {addSelection} = this.props;
            let selfID = this.props.appliance.id;
            let isCheckBox = false;
            addSelection(selfID, isCheckBox);
        };
    }

    render() {
        let {appliance, showSettingsMenu, itemClick, selectTypeCheckbox} = this.props;
        let applianceName = appliance.name;
        let applianceType = appliance.type;
        return (
            <div className={this.getClassNames()} onClick={this.props.onClick}>
                {selectTypeCheckbox ?
                    <label className="container-check">
                        <input type="checkbox" defaultChecked={this.props.active}/>
                        <span onClick={this.checkBoxClick} className="checkmark"/>
                    </label>
                    : <label className="radio-button">
                        <input onClick={this.radioClick} type="radio" defaultChecked={this.props.active}
                               name="radio"/>
                        <span className="radio-checkmark"/>
                    </label>}
                <img src="./images/Dell_Logo.svg"
                     width="25" height="25"
                     className="app-dell-ico"
                     alt="dell-logo"/>

                <p className="app-name">{applianceName}</p>
                <p className="app-type">{applianceType === "VMware" ? "HCI" : "SAN"}</p>
                {showSettingsMenu ? <div className="custom-dropdown dropleft">
                    <img src="./images/more.svg"
                         width="25" height="25"
                         className="d-inline-block align-top"
                         id="dropdownMenuButton"
                         data-toggle="dropdown" aria-haspopup="false" aria-expanded="false"
                         alt=""/>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <p className="dropdown-item custom-dropdown-item" data-toggle="modal" data-target="#modal"
                           onClick={itemClick}>{t.ADD_TO_EXISTING}</p>
                    </div>
                </div> : null}
            </div>
        );
    }
}

export default Appliance;

