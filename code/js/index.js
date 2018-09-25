import React from 'react';
import ReactDOM from "react-dom";
import Field from "./indexComponents/field";
import DetectionLog from "./indexComponents/detectionLog";
import HelpPage from "./indexComponents/helpPage";
import {connect} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import mainPage_lang from "./lang/mainPage_lang";
import {cdTool} from "./lang/mainPage_lang";

// This component is responsible for displaying the header at the top of
// the application window. It contains the DELL EMC logo, icon, Appliances tab,
// Logs tab and Help tab, and accordingly contains built-in components for each of the tabs

const app = document.getElementById("program");

class MainWindow extends React.Component {
    constructor(props) {
        super(props);

        this.rendHeader = this.rendHeader.bind(this);
        this.changeTabs = this.changeTabs.bind(this);

        // "tab" - tab, that is initially set as "field" - this is the "Appliances" main page.
        // "tab" can also accept "logs" (log page) and "help" page (page of the techsupport)
        this.state = {
            tab: "field"
        };
    }

    // Switch application tabs
    changeTabs(tabChange, e) {
        //console.log(tabChange);
        selectAppliances = [];
        this.setState({
            tab: tabChange
        });
    }

    rendHeader() {
        return (
            <div id="header">
                <div id="headerSigns">
                    <div id="DELL_EMC">
                        <img src="icon/rsz_logo4.png" height="30"/>
                    </div>

                    <font id="CycSign">{cdTool}</font>

                    <div id="Dashboard" onClick={this.changeTabs.bind(this, "field")}>
                        <div><font>{mainPage_lang.header_appliances}</font></div>
                    </div>
                </div>

                {/* The search string by devices' SSN. In the properties of the component,
          the "filterList" parameter is passed, indicating the required state of
          display of additional filters */}
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
        if (this.state.tab == "field") {
            return (
                <div id="mainField" ref="mainField">
                    {this.rendHeader()}
                    <Field/>
                </div>
            );
        }
        if (this.state.tab == "logs") {
            return (
                <div id="mainField" ref="mainField">
                    {this.rendHeader()}
                    <DetectionLog/>
                </div>
            );
        }
        if (this.state.tab == "help") {
            return (
                <div id="mainField" ref="mainField">
                    {this.rendHeader()}
                    <HelpPage/>
                </div>
            );
        }
    };
};

// "Field" component display
ReactDOM.render(
    <div>
        <MainWindow/>
    </div>,
    app
);
