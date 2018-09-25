import React from 'react';
import mainPage_lang from "../../locales/translation";
import {productName} from "../../locales/translation";


// The component is responsible for displaying the documentation page

class Documentation extends React.Component {
    constructor(props) {
        super(props);
        this.docLinks = this.docLinks.bind(this);

    };

    docLinks() {
        shell.openExternal("https://TBD");
    };

    render() {
        return (
            <div id="logShow">
                <div id="captionLog">
                    {mainPage_lang.tab_Documentation}
                </div>
                <div id="whiteSpaceForTable">
                    <div className="ExpContainer">
                        <div>{mainPage_lang.Documentation_descr1}
                            <div className="helpLinks"
                                 onClick={this.docLinks}>{mainPage_lang.formatString(mainPage_lang.Documentation_descr2, productName)}</div>
                            {mainPage_lang.Documentation_descr3}</div>
                        <div className="wteBlock">
                            <div className="wteNamePar">
                                <div className="parNum">(1)</div>
                                <div className="wteName">{mainPage_lang.Documentation_QuickSG}</div>
                            </div>
                            <div className="wteText">
                                <div className="qrCodes"><img id="qrCode" src="qrCodes/qr.jpg"/></div>
                                <div className="textArQR">
                                    {mainPage_lang.Documentation_QuickSGDescr}
                                    <div className="docDownload">
                                        <div className="dpeDownload" onClick={this.docLinks}>DPE DOWNLOAD</div>
                                        <div className="daeDownload" onClick={this.docLinks}>DAE DOWNLOAD</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="docBlock">
                            <div className="wteNamePar">
                                <div className="parNum">(2)</div>
                                <div className="wteName">{mainPage_lang.Documentation_PlanGuide}</div>
                            </div>
                            <div className="wteText">
                                <div className="qrCodes"><img id="qrCode" src="qrCodes/qr.jpg"/></div>
                                <div className="textArQR">
                                    {mainPage_lang.Documentation_PlanGuideDescr}
                                    <div className="docDownload">
                                        <div className="dpeDownload" onClick={this.docLinks}>DOWNLOAD</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="docBlock">
                            <div className="wteNamePar">
                                <div className="parNum">(3)</div>
                                <div className="wteName">{mainPage_lang.Documentation_Config}</div>
                            </div>
                            <div className="wteText">
                                <div className="qrCodes"><img id="qrCode" src="qrCodes/qr.jpg"/></div>
                                <div className="textArQR">
                                    {mainPage_lang.Documentation_ConfigDescr}
                                    <div className="docDownload">
                                        <div className="dpeDownload" onClick={this.docLinks}>DOWNLOAD</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

export default (Documentation);
