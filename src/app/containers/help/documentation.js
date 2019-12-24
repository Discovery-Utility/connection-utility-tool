import React from "react";
import mainPage_lang from "../../locales/translation";
import {productName} from "../../locales/translation";

// The component is responsible for displaying the documentation page

class Documentation extends React.Component {
    render() {
        return (
            <div id="logShow">
                <div id="captionLog">{mainPage_lang.TAB_DOCUMENTATION}</div>
                <div id="whiteSpaceForTable">
                    <div className="ExpContainer">
                        <div>{mainPage_lang.DOCUMENTATION_DESCR}</div>
                        <div className="wteBlock">
                            <div>{mainPage_lang.DOCUMENTATION_NOTE}</div>
                            <div className="ttText">
                                <ul>
                                    <li>{mainPage_lang.DOCUMENTATION_LI1}</li>
                                    <li>{mainPage_lang.DOCUMENTATION_LI2}</li>
                                    <li>{mainPage_lang.DOCUMENTATION_LI3}</li>
                                    <li>{mainPage_lang.DOCUMENTATION_LI4}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Documentation;
