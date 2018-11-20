import React, {Component} from 'react';
import AppHeader from "../components/AppHeader";
import {Link} from "react-router-dom";
import t from './../locales/translation';
import ButtonOutline from './../components/ButtonOutline';
import {ipcRenderer} from "electron";

class SearchPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoadSome: false
        };

        this.isLoad = () => {
            this.setState({
                isLoadSome: true
            });
        }
    }

    render() {
        ipcRenderer.on('ping', (event, arg) => {
            if (arg) {
                this.isLoad();
                console.log(arg);
            }
        });


        return (
            <div>
                <AppHeader/>
                <Link to="/welcome">back</Link>
                <div className="container">
                    <div className="row justify-content-center text-center">
                        <div className="col-12 align-content-center">
                            <img src="./images/search.svg"
                                 width="150" height="150"
                                 className="searchImage"
                                 alt=""/>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-12 text-center">
                            <h2 className="searchTitle">{t.SEARCH}</h2>
                        </div>
                    </div>

                    <div className="row justify-content-center">
                        <div className="col-4 text-center">
                            <p>{t.SEARCH_HELP}</p>
                        </div>
                    </div>


                    <div className="row justify-content-center">
                        <Link to="/welcome"><ButtonOutline text="Cancel"/></Link>
                    </div>

                    {this.state.isLoadSome ? <p>:)</p> : <p>:(</p>}

                </div>
            </div>
        )
    }
}

export default SearchPage;