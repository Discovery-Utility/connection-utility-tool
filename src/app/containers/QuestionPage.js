import React, {Component} from 'react';
import AppHeader from "../components/AppHeader";
import {Link} from "react-router-dom";
class QuestionPage extends Component {
    render() {
        return (
            <div>
                <AppHeader/>
                <Link to="/welcome">back</Link>
                <div className="container">
                   QuestionPage
                </div>
            </div>
        )
    }
}

export default QuestionPage;
