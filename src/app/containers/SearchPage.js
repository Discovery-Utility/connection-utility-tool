import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import env from './../../app_environment';
import t from './../locales/translation';
import "../../scss/pages/_searchpage.scss"
import AppHeader from "../components/AppHeader";
import ButtonOutline from './../components/ButtonOutline';
import {ProgressBar} from 'react-bootstrap';


const COUNT_SECONDS = env.SEARCH_DELAY;

/**
 * SearchPage displays the search appliances process
 */
class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeLeft: COUNT_SECONDS,
            progress: 0,
            redirectToErrorPage: false
        };

        this.clickOnCancelBtn = () => {
            this.setState({
                redirectToErrorPage: true
            })
        }
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            let timeLeft = this.state.timeLeft - 1;
            let progress = this.state.progress + (100 / COUNT_SECONDS);

            if (timeLeft === 0) {
                clearInterval(this.timer);
            }
            this.setState({
                timeLeft: timeLeft,
                progress: progress
            })
        }, 1000)
    }

    componentWillUnmount() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }

    render() {
        let redirectToErrorPage = this.state.redirectToErrorPage;
        let redirectToAppliancesPage = false;

        //try to fetch appliances, appliances store in localStorage
        let appliances = JSON.parse(localStorage.getItem("message")).storages;

        //if timer left and appliances not found redirect to "error" page
        //else redirect to page with appliances
        if (this.state.timeLeft === 0 && appliances.length === 0) {
            redirectToErrorPage = true;
        } else if (this.state.timeLeft === 0 && appliances.length > 0) {
            redirectToAppliancesPage = true;
        }

        return (
            <div>
                <AppHeader/>
                <div className="container">
                    <div className="row justify-content-center text-center">
                        <div className="col-12 align-content-center">
                            <img src="./images/search.svg"
                                 width="150" height="150"
                                 className="search-image"
                                 alt=""/>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-12 text-center">
                            <h2 className="search-title">{t.SEARCH}</h2>
                        </div>
                    </div>

                    <div className="row justify-content-center">
                        <div className="col-4 text-center">
                            <p>{t.SEARCH_HELP}</p>
                        </div>
                    </div>


                    <div className="row justify-content-center search-page-cancel-btn">
                        <ButtonOutline text="Cancel" onClick={this.clickOnCancelBtn}/>
                    </div>

                    <ProgressBar active now={this.state.progress}/>

                    {/*if component <Redirect> visible, page redirect automatic*/}
                    {redirectToErrorPage ? <Redirect to="/error"/> : null}
                    {redirectToAppliancesPage ? <Redirect to="/appliances"/> : null}
                </div>
            </div>
        )
    }
}

export default SearchPage;
