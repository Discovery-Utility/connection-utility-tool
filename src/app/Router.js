import React from 'react';
import {Route, Switch, HashRouter} from 'react-router-dom';
import App from './containers/App';
import WelcomePage from './containers/WelcomePage';
import SearchPage from './containers/SearchPage';
import RescanPage from './containers/RescanPage';
import AppliancesPage from './containers/AppliancesPage';
import DetectionLog from './containers/log/detectionLog';
import HelpPage from "./containers/HelpPage";

/**
 * Router component implements the navigation.
 * Use <Link to={path} /> or <Redirect to={path} /> components.
 * @returns {*}
 * @constructor
 */
const Router = () => (
    <HashRouter>
        <Switch>
            <Route exact path="/" component={App}/>
            <Route exact path="/welcome" component={WelcomePage}/>
            <Route exact path="/search" component={SearchPage}/>
            <Route exact path="/error" component={RescanPage}/>
            <Route exact path="/appliances" component={AppliancesPage}/>
            <Route exact path="/log" component={DetectionLog}/>
            <Route exact path="/help" component={HelpPage}/>
        </Switch>
    </HashRouter>
);

export default Router;

