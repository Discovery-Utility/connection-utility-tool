import React from 'react';
import {Container, Row, Col} from "reactstrap";
import ReactDOM from "react-dom";
import mainPage_lang from "../../lang/mainPage_lang";
import {productName, discTool} from "../../lang/mainPage_lang";


// The component is responsible for displaying the product description page

class WtExpect extends React.Component {
    render() {
        return (
            <div id="logShow">
                <div id="captionLog">
                    {mainPage_lang.tab_WtExpect}
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
