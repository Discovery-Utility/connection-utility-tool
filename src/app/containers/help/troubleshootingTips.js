import React from 'react';
import mainPage_lang from "../../locales/translation";
import {discTool} from "../../locales/translation";

// The component is responsible for displaying the Troubleshooting Tips page

class Troubleshooting extends React.Component {
    constructor(props) {
        super(props);
        this.linkTechDocs = this.linkTechDocs.bind(this);

    };

    linkTechDocs() {
        shell.openExternal("https://TBD");
    };

    render() {
        return (
            <div id="logShow">
                <div id="captionLog">
                    {mainPage_lang.tab_Troubleshoot}
                </div>
                <div id="whiteSpaceForTable">
                    <div className="ExpContainer">
                        <div>{mainPage_lang.Troubleshoot_descr}</div>
                        <div className="wteBlock">
                            <div className="ttText">
                                <ul>
                                    <li>{mainPage_lang.Troubleshoot_SetupLi1}</li>
                                    <li>{mainPage_lang.Troubleshoot_SetupLi2}</li>
                                    <li>{mainPage_lang.Troubleshoot_SetupLi3}</li>
                                    <li>{mainPage_lang.Troubleshoot_SetupLi4}</li>
                                    <li>{mainPage_lang.Troubleshoot_SetupLi5}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

export default (Troubleshooting);
