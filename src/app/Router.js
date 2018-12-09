import React from 'react';
import {Route, Switch, HashRouter} from 'react-router-dom';
import App from './containers/App';
import WelcomePage from './containers/WelcomePage';
import MenuPage from './containers/MenuPage';
import QuestionPage from './containers/QuestionPage';
import SearchPage from './containers/SearchPage';
import ErrorPage from './containers/ErrorPage';
import AppliancesPage from './containers/AppliancesPage';
import DetectionLog from './containers/log/detectionLog';
import HelpPage from "./containers/helpPage";

const Router = () => (
    <HashRouter>
        <Switch>
            <Route exact path="/" component={App}/>
            <Route exact path="/welcome" component={WelcomePage}/>
            <Route exact path="/search" component={SearchPage}/>
            <Route exact path="/menu" component={MenuPage}/>
            <Route exact path="/question" component={QuestionPage}/>
            <Route exact path="/error" component={ErrorPage}/>
            <Route exact path="/appliances" component={AppliancesPage}/>
            <Route exact path="/log" component={DetectionLog}/>
            <Route exact path="/help" component={HelpPage}/>
        </Switch>
    </HashRouter>
);

export default Router;

