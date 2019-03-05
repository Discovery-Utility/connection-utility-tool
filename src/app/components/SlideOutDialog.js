import React, {Component} from 'react';
import t from './../locales/translation'
import Appliance from "./Appliance";
import Button from './../components/Button';
const {shell} = require('electron');

import './../../scss/components/_slideoutdialog.scss';

/**
 * SlideOutDialog displayed add to cluster modal.
 */
class SlideOutDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected_ids: []
        };

        this.toggle = () => {
            this.setState({
                modal: !this.state.modal
            });
        };

        this.addSelection = (selectionId, isCheckBox) => {
            let selected = this.state.selected_ids;
            selected = isCheckBox ? selected : [];
            selected.push(selectionId);
            this.setState({
                selected_ids: selected
            });
        };

        this.removeSelection = (selectionId) => {
            let selected = this.state.selected_ids;
            selected = selected.filter((id) => id !== selectionId);
            this.setState({
                selected_ids: selected
            });
        };

        this.addClick = () => {
            let selected = this.state.selected_ids;
            let configured = this.props.configured;
            let unconfiguredAppliance = this.props.selectedAppliance;
            let appliance = configured.filter(appliance => appliance.id === selected[0])[0];
            let link = appliance.link + "/?appliances=" + unconfiguredAppliance.name;

            ipcRndr.send("connect-to-appliance", link);
            //shell.openExternal(link);
        };
    };


    render() {
        let {configured, selectedAppliance} = this.props;
        let {selected_ids} = this.state;

        let isAddBtnActive = selected_ids.length === 1;

        let selectedApplianceName = selectedAppliance ? selectedAppliance.name : "";

        return (
            <div>


                <div className="modal fade" id="modal" tabIndex="-1" role="dialog"
                     aria-labelledby="exampleModalLabel4" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-slideout modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">{t.ADD_TO_EXISTING}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <p className="slideout-body-text">Selected: {selectedApplianceName}</p>
                            <div className="modal-body">
                                {
                                    configured.map(appliance => {
                                        let active = false;

                                        selected_ids.forEach((element) => {
                                            if (element === appliance.id) {
                                                active = true;
                                            }
                                        });

                                        return (
                                            <Appliance addSelection={this.addSelection}
                                                       removeSelection={this.removeSelection}
                                                       itemClick={null}
                                                       key={appliance.id}
                                                       appliance={appliance}
                                                       showSettingsMenu={false}
                                                       active={active}/>
                                        );
                                    })}
                            </div>
                            <div className="modal-footer">
                                <Button text={t.ADD_TO_CLUSTER.toUpperCase()} available={isAddBtnActive}
                                        onClick={this.addClick}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SlideOutDialog;
