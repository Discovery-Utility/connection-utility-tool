import React, {Component} from 'react';
import AppHeader from "../components/AppHeader";
import {Link, Redirect} from "react-router-dom";
import t from './../locales/translation';
import ButtonOutline from './../components/ButtonOutline';
import env from './../../app_environment';
import {ProgressBar} from 'react-bootstrap';

const COUNT_SECONDS = env.SECOND_TO_WAIT;

class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timer: null,
            timeLeft: COUNT_SECONDS,
            progress: 0
        };
    }

    componentDidMount() {
        let timer = setInterval(() => {
            let timeLeft = this.state.timeLeft - 1;
            let progress = this.state.progress + (100 / COUNT_SECONDS);

            if (timeLeft === 0) {
                clearInterval(timer);
            }

            this.setState({
                timeLeft: timeLeft,
                progress: progress
            })
        }, 1000);

        this.setState({
            timer: timer
        });
    }

    componentWillUnmount() {
        let timer = this.state.timer;
        clearInterval(timer);
    }

    render() {
        let redirectToWrongPage, redirectToAppliancesPage = false;

        //try to fetch appliances, appliances is store to localStorage in root of page (now in index.html)
        let appliances = localStorage.getItem("message");

        //if timer left and appliances not found redirect to "wrong" page
        //else redirect to page with appliances
        if (!appliances && this.state.timeLeft === 0) {
            redirectToWrongPage = true;
        } else if (appliances && this.state.timeLeft === env.SECOND_TO_WAIT - 2) {
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


                    <div className="row justify-content-center custom-progress-bar">
                        <Link to="/welcome"><ButtonOutline text="Cancel"/></Link>
                    </div>

                    <ProgressBar active now={this.state.progress} />

                    {/*if component <Redirect> visible, page redirect automatic*/}
                    {redirectToWrongPage ? <Redirect to="/wrong"/> : null}
                    {redirectToAppliancesPage ? <Redirect to="/available"/> : null}
                </div>
            </div>
        )
    }
}

export default SearchPage;
