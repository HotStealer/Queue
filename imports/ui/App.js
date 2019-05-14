import React, { Component } from 'react';
import AccountsUIWrapper from './AccountsUIWrapper';
import { withTracker } from 'meteor/react-meteor-data';
class App extends Component {

    render() {
        return(
            <div className="container">
                <header>
                    <h1>Queue</h1>
                    <AccountsUIWrapper />
                    {this.props.currentUser ?
                    <ul>
                        <li>Problem</li>
                    </ul> : ''
                    }
                </header>
            </div>
            )
    }
}

export default withTracker(() => {

    return{
        currentUser: Meteor.user(),
    }

})(App);

