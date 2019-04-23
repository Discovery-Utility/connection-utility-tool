import React, { Component } from "react";
import AppHeader from "../components/AppHeader";
import t from "./../locales/translation";
import Button from "./../components/Button";
import "../../scss/pages/_welcomepage.scss";

const { shell } = require("electron");
import { Redirect } from "react-router-dom";

/**
 * Welcome page displays welcome message and button to scan the appliances
 */
class WelcomePage extends Component {
  constructor(props) {
    super(props);
    const disableNetworkPath = "http://lmgtfy.com/?q=how+to+disable+network";
    const disableFirewallPath =
      "http://lmgtfy.com/?q=how+to+disable+firewall+windows+10";

    this.state = {
      redirectToSearch: false,
      wifi: localStorage.getItem("wifi")
    };

    this.clickOnShowDisableNetwork = () => {
      shell.openExternal(disableNetworkPath);
    };
    this.clickOnButton = () => {
      require("electron").ipcRenderer.send("off-wifi");
      this.setState({ wifi: 0 });
    };
    this.clickOnShowDisableFirewall = () => {
      shell.openExternal(disableFirewallPath);
    };

    this.clickOnScanBtn = () => {
      this.setState({
        redirectToSearch: true
      });
    };
  }

  componentWillMount() {
    require("electron").ipcRenderer.on("wifi", (event, message, logMessage) => {
      console.log(message);
      console.log(window);
      this.setState({ wifi: message });
    });
  }

  render() {
    let redirect = this.state.redirectToSearch;

    console.log(localStorage);
    return (
      <div>
        <AppHeader />
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 text-center">
              <h1 className="welcome-page-title">{t.WELCOME_TITLE}</h1>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-4 text-center">
              <p>{t.ABOUT_TOOL}</p>
            </div>
          </div>
          <div className="row justify-content-center">
            <p className="text-center">
              <b>1.</b> {t.WIFI_NETWORKS}
            </p>
          </div>
          <div
            className="row justify-content-center"
            style={{ display: "inherit" }}
          >
            <div className="row justify-content-center">
              <Button
                available={true}
                text="Off Wi-Fi"
                onClick={this.clickOnButton}
              />
            </div>
            {this.state.wifi == 1 && (
              <p className="text-center">Вы подключены к сети Wifi</p>
            )}
            <p
              className="show-link text-center"
              onClick={this.clickOnShowDisableNetwork}
            >
              {" "}
              {t.SHOW_ME_HOW}
            </p>
          </div>
          <div className="row justify-content-center">
            <p className="text-center">
              <b>2.</b> {t.PC_FIRE_WALL}
            </p>
          </div>
          <div className="row justify-content-center">
            <p className="show-link" onClick={this.clickOnShowDisableFirewall}>
              {" "}
              {t.SHOW_ME_HOW}
            </p>
          </div>
          <div className="row justify-content-center">
            <Button
              available={true}
              text={t.SCAN_APPLIANCES}
              onClick={this.clickOnScanBtn}
            />
          </div>

          {/*redirect to next page*/}
          {redirect ? <Redirect to="/search" /> : null}
        </div>
      </div>
    );
  }
}

export default WelcomePage;
