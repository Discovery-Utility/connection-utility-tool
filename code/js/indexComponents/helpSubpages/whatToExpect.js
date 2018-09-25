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
                        <div>{mainPage_lang.formatString(mainPage_lang.WtExpect_descr, productName)}</div>
                        <div className="wteBlock">
                            <div className="wteNamePar">
                                <div className="parNum">(1)</div>
                                <div className="wteName">{mainPage_lang.WtExpect_Discover}</div>
                            </div>
                            <div
                                className="wteText">{mainPage_lang.formatString(mainPage_lang.WtExpect_DiscoverDescr, discTool)}</div>
                        </div>
                        <div className="wteBlock">
                            <div className="wteNamePar">
                                <div className="parNum">(2)</div>
                                <div className="wteName">{mainPage_lang.WtExpect_Configure}</div>
                            </div>
                            <div
                                className="wteText">{mainPage_lang.formatString(mainPage_lang.WtExpect_ConfigureDescr, discTool)}</div>
                        </div>
                        <div className="wteBlock">
                            <div className="wteNamePar">
                                <div className="parNum">(3)</div>
                                <div className="wteName">{mainPage_lang.WtExpect_Manage}</div>
                            </div>
                            <div
                                className="wteText">{mainPage_lang.formatString(mainPage_lang.WtExpect_ManageDescr, productName)}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

export default (WtExpect);
