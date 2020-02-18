import React from "react";
import mainPage_lang from "../../locales/translation";
import {discTool} from "../../locales/translation";

// The component is responsible for displaying the Troubleshooting Tips page

class Troubleshooting extends React.Component {
    constructor(props) {
        super(props);
        this.linkTechDocs = this.linkTechDocs.bind(this);
    }

    linkTechDocs() {
        shell.openExternal("https://TBD");
    }

    render() {
        return (
            <div id="logShow">
                <div id="captionLog">{mainPage_lang.TAB_TROUBLESHOOT}</div>
                <div id="whiteSpaceForTable">
                    <div className="ExpContainer">
                        <div>{mainPage_lang.TROUBLESHOOT_DESCR}</div>
                        <div className="wteBlock">
                            <div className="ttText">
                                <ul>
                                    <li>{mainPage_lang.TROUBLESHOOT_SETUP_LI1}</li>
                                    <li>{mainPage_lang.TROUBLESHOOT_SETUP_LI2}</li>
                                    <li>{mainPage_lang.TROUBLESHOOT_SETUP_LI3}</li>
                                    <li>{mainPage_lang.TROUBLESHOOT_SETUP_LI4}</li>
                                    <li>{mainPage_lang.TROUBLESHOOT_SETUP_LI5}</li>
                                </ul>
                                <div>{mainPage_lang.TROUBLESHOOT_NOTE}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Troubleshooting;
