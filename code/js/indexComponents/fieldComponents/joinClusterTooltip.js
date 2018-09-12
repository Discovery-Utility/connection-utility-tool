import React from 'react';
import ReactDOM from "react-dom";
import mainPage_lang from "../../lang/mainPage_lang";

// The component is responsible for displaying the tooltip when hovering over the inactive Join button

class JoinClusterTooltip extends React.Component {
  render() {
    return (
      <div id="joinClusterTooltip">
        {mainPage_lang.JoinClusterTooltip_descr}
      </div>
    );
  };
};

export default (JoinClusterTooltip);
