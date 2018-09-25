import React from 'react';
import mainPage_lang from "../../locales/translation";
import {discTool} from "../../locales/translation";

// The component is responsible for displaying the tooltip on the download page after 10 seconds of unsuccessful service search

class LoadTooltip extends React.Component {
    render() {
        return (
            <div id="pageForTooltip">
                <div id="troubleShooting">
                    <div>
                        <img id="imgForTooltip" src="icon/imgForTooltip.png"/>
                    </div>
                    <div id="captionTroubleShooting">
                        Troubleshooting
                    </div>
                </div>
                <div id="problemWithAppliances">
                    {mainPage_lang.Troubleshoot_descr}
                </div>
                <ol id="stepsToSolve">
                    <li>{mainPage_lang.Troubleshoot_SetupLi1}</li>
                    <li>{mainPage_lang.Troubleshoot_SetupLi2}</li>
                    <li>{mainPage_lang.Troubleshoot_SetupLi3}</li>
                    <li>{mainPage_lang.Troubleshoot_SetupLi4}</li>
                    <li>{mainPage_lang.formatString(mainPage_lang.Troubleshoot_SetupLi5, discTool)}</li>
                </ol>
            </div>
        );
    };
};

export default (LoadTooltip);
