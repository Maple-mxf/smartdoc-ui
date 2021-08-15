import React from 'react';
import ReactDOM from 'react-dom';
import Home from './home'
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import configStore from './store'
import routeList from "./route";

const Root = () => {
    const store = configStore({
        "routeList":routeList
    })
    return (
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route exact path='/' render={() => (
                        <Redirect to='/home'/>
                    )}/>
                    <Route path='/home' component={Home}/>
                </Switch>
            </Router>
        </Provider>
    )
}

ReactDOM.render(<Root/>, document.getElementById('root'))

