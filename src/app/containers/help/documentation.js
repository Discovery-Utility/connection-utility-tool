import React from 'react';
import mainPage_lang from "../../locales/translation";
import {productName} from "../../locales/translation";


// The component is responsible for displaying the documentation page

class Documentation extends React.Component {

    render() {
        return (
            <div id="logShow">
                <div id="captionLog">
                    {mainPage_lang.tab_Documentation}
                </div>
                <div id="whiteSpaceForTable">
                    <div className="ExpContainer">
                        <div>{mainPage_lang.Documentation_descr}</div>
                        <div className="wteBlock">
		            <div>{mainPage_lang.Documentation_note}</div>
                            <div className="ttText">
                                <ul>
                                    <li>{mainPage_lang.DocumentationLi1}</li>
                                    <li>{mainPage_lang.DocumentationLi2}</li>
                                    <li>{mainPage_lang.DocumentationLi3}</li>
                                    <li>{mainPage_lang.DocumentationLi4}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

export default (Documentation);
