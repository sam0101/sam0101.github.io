import React from 'react';
import { Switch, Route } from 'react-router-dom';
import UserRegistration from '../components/UserRegistraion';
import UserLogin from '../components/UserLogin';
import UserList from '../components/UserList';
export default class AppRoutes extends React.Component {
    constructor() {
        super()
        this.state = {
            userID: localStorage.getItem("userID")
        }
    }
   
    render() {
        return (
            <div>
                <Switch>
                    <Route exact
                        path="/register"
                        render={props => (
                            <UserRegistration
                            />
                        )}
                    />
                    <Route exact
                        path="/login"
                        render={props => (
                            <UserLogin
                            />
                        )}
                    />
                         <Route exact
                        path="/"
                        render={props => (
                            <UserLogin
                            />
                        )}
                    />

                   
                     <Route exact
                        path="/userlist"
                        render={props => (
                            <UserList
                            />
                        )}
                    />
                    )}
                />}
                </Switch>
            </div>
        )
    }
}