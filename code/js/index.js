import React from 'react';
import ReactDOM from "react-dom";
import Field from "./indexComponents/field";
import DetectionLog from "./indexComponents/detectionLog";
import HelpPage from "./indexComponents/helpPage";
import 'bootstrap/dist/css/bootstrap.css';
import mainPage_lang from "./locales/translation";
import {cdTool} from "./locales/translation";

/**
 * MainWindow used to display header of application window.
 * Contains Dell EMC logo, application icon, and tabs.
 * Appliances tab show all appliances in network.
 * Log tab show all program logs.
 * Help tab contains all help information (docs, tutorials, etc.)
 */
class MainWindow extends React.Component {
    constructor(props) {
        super(props);

        this.rendHeader = this.rendHeader.bind(this);
        this.changeTabs = this.changeTabs.bind(this);

        /**
         * "field" - it is "Appliances" main page.
         * "logs"  - log page
         * "help"  - help page
         */
        this.state = {
            tab: "field"
        };
    }

    /**
     * Switch application tabs
     */
    changeTabs(tabChange, e) {
        selectAppliances = [];
        this.setState({
            tab: tabChange
        });
    }

    /**
     * Header render
     * @return {}
     */
    rendHeader() {
        return (
            <div id="header">
                <div id="headerSigns">
                    <div id="DELL_EMC">
                        <img src="icon/rsz_logo4.png" height="30"/>
                    </div>

                    <font id="CycSign">{cdTool}</font>

                    <div id="Dashboard" onClick={this.changeTabs.bind(this, "field")}>
                        <div><font>{mainPage_lang.APPLIANCES}</font></div>
                    </div>
                </div>

                {
                    /**
                     * The search string by devices' SSN. In the properties of the component,
                     * the "filterList" parameter is passed, indicating the required state of
                     * display of additional filters
                     */
                }
                <div id="headerSettings">
                    <div id="Gear" onClick={this.changeTabs.bind(this, "logs")}>
                        <img src="icon/gear_white.png" height="18"/>
                    </div>

                    <div id="Help" onClick={this.changeTabs.bind(this, "help")}>
                        <img src="icon/help_white.png" height="18"/>
                    </div>
                </div>

            </div>
        );
    }

    render() {
        if (this.state.tab === "field") {
            return (
                <div id="mainField" ref="mainField">
                    {this.rendHeader()}
                    <Field/>
                </div>
            );
        }
        if (this.state.tab === "logs") {
            return (
                <div id="mainField" ref="mainField">
                    {this.rendHeader()}
                    <DetectionLog/>
                </div>
            );
        }
        if (this.state.tab === "help") {
            return (
                <div id="mainField" ref="mainField">
                    {this.rendHeader()}
                    <HelpPage/>
                </div>
            );
        }
    };
}

/**
 * Display Main Window into container with "program" id
 */
ReactDOM.render(
    <MainWindow/>,
    document.getElementById("program")
);
