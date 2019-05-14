import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {withTracker} from 'meteor/react-meteor-data';

import {Problems} from '../api/problems.js';

import AccountsUIWrapper from './AccountsUIWrapper';
import Problem from './Problem.js';
import {Meteor} from "meteor/meteor";

class App extends Component {
    constructor(props) {
        super(props);
    }

    handleSubmit(event) {
        event.preventDefault();

        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

        Meteor.call('problems.insert', text, this.props.currentUser._id, this.props.currentUser.profile.name);

        ReactDOM.findDOMNode(this.refs.textInput).value = '';
    }

    renderProblems() {
        return this.props.problems.map((problem) => (
            <Problem key={problem._id} problem={problem}/>
        ))
    }

    render() {
        return (
            <div className="column-header">
                <header>
                    <h1>Queue</h1>

                    <AccountsUIWrapper/>

                    {this.props.currentUser ?
                        <div className="column">
                            {this.renderProblems()}
                                <form className="new-problem" onSubmit={this.handleSubmit.bind(this)}>
                                    <input
                                        className="input-problem"
                                        type="text"
                                        ref="textInput"
                                        placeholder="Sisesta uus probleem"
                                    />
                                </form>
                        </div> : ''
                    }
                </header>
            </div>
        )
    }
}

export default withTracker(() => {

    return {
        problems: Problems.find({}, {sort: {createdAt: 1}}).fetch(),
        currentUser: Meteor.user(),
    }

})(App);

