import React from 'react';
import mainPage_lang from "../../locales/translation";
import {productName, discTool} from "../../locales/translation";


// The component is responsible for displaying the product description page

class WtExpect extends React.Component {
    render() {
        return (
            <div id="logShow">
                <div id="captionLog">
                    {mainPage_lang.WHAT_EXPECT}
                </div>
                <div id="whiteSpaceForTable">
                    <div className="ExpContainer">
                        <div>{mainPage_lang.formatString(mainPage_lang.WTEXPECT_DESCR, productName)}</div>
                        <div className="wteBlock">
                            <div className="wteNamePar">
                                <div className="parNum">(1)</div>
                                <div className="wteName">{mainPage_lang.WTEXPECT_DISCOVER}</div>
                            </div>
                            <div
                                className="wteText">{mainPage_lang.formatString(mainPage_lang.WTEXPECT_DISCOVER_DESCR, discTool)}</div>
                        </div>
                        <div className="wteBlock">
                            <div className="wteNamePar">
                                <div className="parNum">(2)</div>
                                <div className="wteName">{mainPage_lang.WTEXPECT_CONFIGURE}</div>
                            </div>
                            <div
                                className="wteText">{mainPage_lang.formatString(mainPage_lang.WTEXPECT_CONFIGURE_DESCR)}</div>
                        </div>
                        <div className="wteBlock">
                            <div className="wteNamePar">
                                <div className="parNum">(3)</div>
                                <div className="wteName">{mainPage_lang.WTEXPECT_MANAGE}</div>
                            </div>
                            <div className="wteText">{mainPage_lang.formatString(mainPage_lang.WTEXPECT_MANAGE_DESCR, productName)}</div>
 				<div className="wteText">{mainPage_lang.formatString(mainPage_lang.WTEXPECT_NOTE, productName)}</div>
		</div>
		</div>
                    </div>
                </div>
        );
    };
};

export default (WtExpect);
