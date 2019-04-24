import React, {Component} from 'react';
import t from '../locales/translation';
import InitialCheckComponent from '../components/InitialCheckComponent';

const {ipcRenderer} = require('electron');

/**
 * Initial checks elements container
 * props: setChecksPassed(boolean), filterChecks: [ "string" ]
 */
class InitialChecksContainer extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            available: false
        };

        this.check = () => {
            ipcRenderer.send('checkRequested');
        }

        this.checkResultListener = this.checkResultListener.bind(this);
        this.getChecks = this.getChecks.bind(this);
    }

    checkResultListener(event, arg) {
        var newState = {};

        var hasFailed = false;
        Object.keys(arg).forEach((key) => {
            newState[key + 'CheckResult'] = arg[key];
            hasFailed = hasFailed || arg[key].status === "failed"
        });
        this.props.setChecksPassed(!hasFailed);
        this.setState(newState);
    }

    componentWillMount() {
        ipcRenderer.on('checkResult', this.checkResultListener);

        this.check();
        this.timer = setInterval(this.check, 1000);
    }

    componentWillUnmount() {
        ipcRenderer.removeListener('checkResult', this.checkResultListener);
        clearInterval(this.timer);
    }

    getChecks() {
        if (!this.props.filterChecks) {
            var result = [];
            Object.keys(this.state).map((key) => {
                if (key.endsWith('CheckResult')) {
                    result.push(key.slice(0, key.lastIndexOf('CheckResult')));
                }
            });
            return result;
        } else {
            return this.props.filterChecks;
        }
    }

    getTranslations(checkName, status) { 
        var translationPrefix = `INITIAL_${checkName.toUpperCase()}`;
        status = status.toUpperCase();

        var title = t[`${translationPrefix}_${status}`];
        if (typeof(title) === 'undefined') {
            title = t[translationPrefix];
        }

        var text = t[`${translationPrefix}_${status}_TEXT`];
        if (typeof(text) === 'undefined') {
            text = t[translationPrefix + '_TEXT'];
        };

        title = typeof(title) !== 'undefined' ? title : translationPrefix;
        text = typeof(text) !== 'undefined' ? text : translationPrefix + '_TEXT';
        return {title, text}
    }

    render() {
        let redirect = this.state.redirectToSearch;
        return (
            <div>
                <div className="row justify-content-center">
                    <div className="col-9 text-center">
                        <h1 className="welcome-page-title">{t.WELCOME_TITLE}</h1>
                        <h5 className="welcome-page-subtitle">{t.ABOUT_TOOL}</h5>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="text-center">
                        <p>{t.CHECK_THE_FOLLOWING}</p>
                    </div>
                </div>
                {this.getChecks().map((key) => {
                    var checkResult = this.state[key + 'CheckResult'];
                    if (!checkResult) return null;
                    
                    var translation = this.getTranslations(key, checkResult.status);

                    return (
                        <div key={key} className="row justify-content-center">
                            <div className="col-10">
                                <InitialCheckComponent
                                    check={key}
                                    title={translation.title} 
                                    text={translation.text}
                                    status={checkResult.status}
                                    checkResult={checkResult} />
                            </div>
                        </div>
                    )
                })}
                
                <div className="row justify-content-center">
                    <p className="text-center"><b>{this.state.avCheckResult && this.state.avCheckResult.title}</b></p>
                </div>
            </div>
        )
    }
}

export default InitialChecksContainer;
