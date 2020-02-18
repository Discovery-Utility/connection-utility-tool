import React, {Component} from "react";
import t from "./../locales/translation";
import Appliance from "./Appliance";
import Button from "./../components/Button";
import "./../../scss/components/_slideoutdialog.scss";

/**
 * SlideOutDialog displayed add to cluster modal.
 */
class SlideOutDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedNames: []
        };

        this.toggle = () => {
            this.setState({
                modal: !this.state.modal
            });
        };

        this.addSelection = (selectionName, isCheckBox) => {
            let selected = this.state.selectedNames;
            selected = isCheckBox ? selected : [];
            selected.push(selectionName);
            this.setState({
                selectedNames: selected
            });
        };

        this.removeSelection = (selectionName) => {
            let selected = this.state.selectedNames;
            selected = selected.filter((name) => name !== selectionName);
            this.setState({
                selectedNames: selected
            });
        };

        this.addClick = () => {
            let selected = this.state.selectedNames;
            let configured = this.props.configured;
            let unconfiguredAppliance = this.props.selectedAppliance;
            let appliance = configured.find(appliance => appliance.name === selected[0]);
            let link = appliance.link + "/?appliances=" + unconfiguredAppliance.name;

            ipcRndr.send("connect-to-appliance", link);
        };
    }

    render() {
        let {configured, selectedAppliance} = this.props;
        let {selectedNames} = this.state;

        let isAddBtnActive = selectedNames.length === 1;

        let selectedApplianceName = selectedAppliance ? selectedAppliance.name : "";

        return (
            <div className="modal fade" id="modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel4" aria-hidden="true">
                <div className="modal-dialog modal-dialog-slideout modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                {t.ADD_TO_EXISTING}
                            </h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p className="slideout-body-text">Selected: {selectedApplianceName}</p>
                            {configured.map(appliance => {
                                let active = false;

                                    selectedNames.forEach((element) => {
                                        if (element === appliance.name) {
                                            active = true;
                                        }
                                    });

                                    return (
                                        <Appliance addSelection={this.addSelection}
                                                   removeSelection={this.removeSelection}
                                                   itemClick={null}
                                                   key={appliance.name}
                                                   appliance={appliance}
                                                   showSettingsMenu={false}
                                                   active={active}/>
                                    );
                                })}
                        </div>
                        <div className="modal-footer">
                            <Button text={t.ADD_TO_CLUSTER.toUpperCase()} available={isAddBtnActive} onClick={this.addClick} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SlideOutDialog;
