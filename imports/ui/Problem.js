import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';

import {Problems} from '../api/problems.js';

export default class Problem extends Component {

    deleteThisProblem() {
        Meteor.call('problems.remove', this.props.problem._id);
    }

    render() {
        return (
            <div className="item">
                <div className="inside-left">
                    <div className="text">{this.props.problem.text}</div>
                </div>
                <div className="inside-right">
                    <button className="delete" onClick={this.deleteThisProblem.bind(this)}>
                        X
                    </button>
                    <div className="username">{this.props.problem.username}</div>
                </div>
            </div>

        );
    }
}