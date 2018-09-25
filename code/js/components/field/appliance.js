import Infotab from "./popUpWindow/infotab"
import React from 'react';
import ReactDOM from "react-dom";
import mainPage_lang from "../../locales/translation";
// import 'bootstrap/dist/css/bootstrap.css';

// This component is responsible for displaying the device element that contains
// information about the type and status of the device, its SSN, IP, and also modal windows
class Appliance extends React.Component {

    // In the properties of the component, information about the state of modal windows
    // that are used for their correct display is transmitted:
    // ~ "popoverOpen" - it is responsible for displaying information that opens when you hover over the "info" icon
    // ~ "modalOpen" - it is responsible for displaying the modal window pop-up when clicking on the device
    // ~ "nestedModal" - it is responsible for displaying the nested modal window
    // ~ "closeAll" - it is responsible for closing all modal windows
    constructor(props) {
        super(props);


        this.selectApp = this.selectApp.bind(this);
        this.boxHover = this.boxHover.bind(this);
        this.offBoxHover = this.offBoxHover.bind(this);

        this.state = {
            // Переменная отвечает за выделение плашки, true - плашка не выделена, false - выделена
            /* The variable is responsible for highlighting the appliances: "true" - are not selected, "false" - is selected*/
            positon: true
        };
    }


    // Go to the default device link in the browser
    openLink() {
        this.toggleModal();
        shell.openExternal(this.props.ip);
        if (this.state.modelSwitched) this.switchModal();
    };

    // Click on the appliance
    selectApp() {
        if (this.props.state === "unconfigured") {
            var st = document.getElementById(this.props.ssn).style;
            this.state.positon = !this.state.positon;
            if (!this.state.positon) {
                st.backgroundColor = "#cde6f1";
                st.borderColor = "#cde6f1";
                st.transition = "ease-out 0.1s";
                selectAppliances.push(this.props.ssn);
            } else {
                st.backgroundColor = "#e8e8e8";
                st.borderColor = "#e8e8e8";
                st.color = "#5e5e5e";
                st.transition = "ease-out 0.1s";
                for (var i = 0; i < selectAppliances.length; i++) {
                    if (selectAppliances[i] === this.props.ssn) {
                        selectAppliances.splice(i, 1);
                    }
                }
            }
        } else {
            var ppup = document.getElementById("modalpopup");
            ppup.style.transitionDuration = "0.3s";
            ppup.style.left = "60%";
            ppup.style.visibility = "visible";
            ppup.style.opacity = "1.0";
            ReactDOM.render(
                <Infotab
                    cluster={this.props.cluster}
                    ip={this.props.ip}
                    ssn={this.props.ssn}
                    state={this.props.state}
                    type={this.props.type}
                    mode="info"
                />,
                document.getElementById("modalpopup")
            );
        }
    }

// "box" hover
    boxHover() {
        var st = document.getElementById(this.props.ssn).style;
        if (this.state.positon) {
            st.borderColor = "#cde6f1";
            st.textDecoration = "none";
            st.color = "#5e5e5e";
        }
        st.cursor = "pointer";
    }

    // whithout "box" hover
    offBoxHover() {
        if (this.state.positon) {
            var st = document.getElementById(this.props.ssn).style;
            st.borderColor = "#e8e8e8";
        }
    }

    // Displaying of the component
    rendNorm() {
        // Bringing the state of the device to what is recognized by the application
        var state = this.props.state;
        if (state == "service state") {
            state = "service";
        }
        ;

        // Bringing the name of the device to what is recognized by the application
        var nameOrSSN = null;
        if (this.props.cluster == 'true') nameOrSSN = mainPage_lang.CLUSTER_NAME;
        else nameOrSSN = "SN"

        // Set "ip" or "unconfigured"
        var ipOrUnconfig = null;
        if (this.props.state == 'unconfigured') {
            ipOrUnconfig = mainPage_lang.UNCONFIGURED;
        }
        else ipOrUnconfig = this.props.ip.slice(7);
        // "service state" -> "service" to transfer the name of the icon
        var configuration = null;
        if (this.props.state == "service state") configuration = "service";
        else configuration = this.props.state;
        /* <div className="col-lg-4 col-md-6 col-sm-12"> */
        return (
            <div
                className="col-lg-3 col-md-4 col-sm-6 col-xs-12 gridEl"> {/* To display all devices, use the Grid from the Bootstrap library */}
                <div className="box" onClick={this.selectApp} id={this.props.ssn} onMouseEnter={this.boxHover}
                     onMouseLeave={this.offBoxHover}>
                    <img className="boxStateIcon" src={"icon/dell_logo.png"}/>
                    <div className="boxInfo">
                        <div>
                            <font> {mainPage_lang.formatString(mainPage_lang.APPLIANCES_FILTER, this.props.type)}</font>
                        </div>
                        <div><font> {nameOrSSN}: {this.props.ssn}</font></div>
                        <div className={this.props.state + "unc"}><font>{ipOrUnconfig}</font></div>
                    </div>
                    <img className="boxInfoIcon" src={"icon/" + this.props.type + "_" + configuration + ".svg"}/>
                </div>
            </div>
        )
    };

    render() {
        return this.rendNorm();
    }
};

// Ability to use the component by other files
export default (Appliance);
