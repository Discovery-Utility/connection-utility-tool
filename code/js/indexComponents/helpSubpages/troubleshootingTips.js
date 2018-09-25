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
                            <div className="wteNamePar">
                                <div className="parNum">(1)</div>
                                <div className="wteName">{mainPage_lang.Troubleshoot_Setup}</div>
                            </div>
                            <div className="ttText">
                                <ul>
                                    <li>{mainPage_lang.Troubleshoot_SetupLi1}</li>
                                    <li>{mainPage_lang.Troubleshoot_SetupLi2}</li>
                                    <li>{mainPage_lang.Troubleshoot_SetupLi3}</li>
                                    <li>{mainPage_lang.Troubleshoot_SetupLi4}</li>
                                    <li>{mainPage_lang.formatString(mainPage_lang.Troubleshoot_SetupLi5, discTool)}</li>
                                </ul>
                            </div>
                        </div>
                        <div className="wteBlock">
                            <div className="wteNamePar">
                                <div className="parNum">(2)</div>
                                <div className="wteName">{mainPage_lang.Troubleshoot_Doc}</div>
                            </div>
                            <div className="wteText">
                                <div className="qrCodes"><img id="qrCode" src="qrCodes/qr.jpg"/></div>
                                <div className="textArQR">{mainPage_lang.Troubleshoot_DocDescr1}
                                    <div className="helpLinks"
                                         onClick={this.linkTechDocs}>{mainPage_lang.Troubleshoot_DocDescr2}</div>
                                    {mainPage_lang.Troubleshoot_DocDescr3}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

export default (Troubleshooting);
