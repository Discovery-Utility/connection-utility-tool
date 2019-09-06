import React from 'react';
import WtExpect from "./help/whatToExpect";
import Troubleshooting from "./help/troubleshootingTips";
import Docs from "./help/documentation";
import mainPage_lang from "../locales/translation";
import App from "./App";
import AppHeader from "../components/AppHeader";

// This component is responsible for displaying the technical support page,
// it contains three tabs "Documentation", "Troubleshooting Tips" and "What To Expect",
// and respectively, three built-in components for each of the tabs.


class HelpPage extends React.Component {
    constructor(props) {
        super(props);
        this.changeSubtabs = this.changeSubtabs.bind(this);
        this.returnTabs = this.returnTabs.bind(this);

        // "state" - the tab in this case, initially takes the value "expect" - the product description page.
        // "state" can take the value of "tips" - the troubleshooting tips page,
        // and also value of "docs" - documentation page
        this.state = {
            state: "expect"
        };
    };

    // Switch tabs, and also highlight an open tab
    changeSubtabs(subtab) {
        this.setState({
            state: subtab
        });
        var subtabs = document.getElementsByClassName("subtabs");
        for (var i = 0; i < subtabs.length; i++) {
            subtabs[i].style.color = "#555555";
            subtabs[i].style.backgroundColor = "white";
            ;
        }
        var selectSubtub = document.getElementById(subtab).style;
        selectSubtub.color = "#248dc0";
        selectSubtub.backgroundColor = "#eeeeee";
    };

    returnTabs() {
        return (
            <div id="logSwitch">
                <div id="systemLogs">
                    {mainPage_lang.HELP}
                </div>
                <div className="subtabs" id="expect" onClick={this.changeSubtabs.bind(this, "expect")}>
                    {mainPage_lang.WHAT_EXPECT}
                </div>
                <div className="subtabs" id="tips" onClick={this.changeSubtabs.bind(this, "tips")}>
                    {mainPage_lang.TAB_TROUBLESHOOT}
                </div>
                <div className="subtabs" id="docs" onClick={this.changeSubtabs.bind(this, "docs")}>
                    {mainPage_lang.TAB_DOCUMENTATION}
                </div>
            </div>
        );
    }

    render() {
        if (this.state.state == "expect") {
            return (
                <div>
                    <AppHeader/>
                    <div id="logBox">
                        {this.returnTabs()}
                        <WtExpect/>
                    </div>
                </div>
            );
        }
        if (this.state.state == "tips") {
            return (
                <div>
                    <AppHeader/>
                    <div id="logBox">
                        {this.returnTabs()}
                        <Troubleshooting/>
                    </div>
                </div>
            );
        }
        if (this.state.state == "docs") {
            return (
                <div>
                    <AppHeader/>
                    <div id="logBox">
                        {this.returnTabs()}
                        <Docs/>
                    </div>
                </div>
            );
        }
    };
};

export default (HelpPage);
