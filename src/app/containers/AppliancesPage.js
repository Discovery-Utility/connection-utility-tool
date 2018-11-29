import React, {Component} from 'react';
import AppHeader from "../components/AppHeader";
import t from './../locales/translation'
import {Link} from "react-router-dom";
import Appliance from './../components/Appliance'


class AppliancesPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            appliances: [],
            configured: [],
            selected_ids: [1],
            unconfigured: [],
            state_available: true    //used for switch available/configured screen states
        };

        this.changeScreenState = () => {
            this.setState({
                state_available: !this.state.state_available
            });
        };

        this.addSelection = (selectionId) => {
            let selected = this.state.selected_ids;
            selected.push(selectionId);
            this.setState({
                selected_ids: selected
            });
        };

        this.removeSelection = (selectionId) => {
            let selected = this.state.selected_ids;
            selected = selected.filter((id) => id !== selectionId)
            this.setState({
                selected_ids: selected
            });
        };

    }

    componentDidMount() {
        let appliances = JSON.parse(localStorage.getItem("message")).storages;

        if (appliances) {
            let id = 0;
            appliances.forEach((appliance) => appliance.id = id++);

            for (let i = 0; i < appliances.length; i++) {
                appliances[i].id = i;
            }

            let configured = appliances.filter(appliance => appliance.state === "configured");
            let unconfigured = appliances.filter(appliance => appliance.state === "unconfigured");

            this.setState({
                appliances: appliances,
                configured: configured,
                unconfigured: unconfigured,
            });
        }
    }

    render() {
        let unconfigured = this.state.unconfigured;
        let selected = this.state.selected_ids;

        return (
            <div>
                <AppHeader/>
                <div className="appliances-header">
                    <div className="available-appliances-title">
                        {t.APPLIANCES}
                    </div>

                    <div className="available-appliances-rescan">
                        <img src="./images/refresh.svg"
                             width="20" height="20"
                             alt="refresh-ico"/>

                    </div>
                    <Link to="/search">
                        <div className="available-appliances-rescan-text">
                            {t.SCAN_AGAIN}
                        </div>
                    </Link>

                </div>

                <div className="container">
                    <div className="row">
                        <p onClick={this.changeScreenState}
                           className="change-available-configured">{this.state.state_available ? t.AVAILABLE : t.CONFIGURED}</p>
                    </div>

                    <div className="row">
                        {this.state.state_available ? <p>{t.SELECT_APPLIANCES}</p> : null}
                    </div>

                    <div className="row">
                        <div className="appliances-list">
                            {unconfigured.map(appliance => {
                                let active = false;

                                selected.forEach((element) => {
                                   if (element === appliance.id) {
                                       active = true;
                                   }
                                });


                                //this.addSelection(2);
                                return (<Appliance addSelection={this.addSelection}
                                                   removeSelection={this.removeSelection}
                                                   key={appliance.id}
                                                   appliance={appliance}
                                                   active={active}/>);
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AppliancesPage;
