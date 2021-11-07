import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import configStore from './store'
import routeList from "./route";
import HomeComponent from "./home";
import {SnackbarProvider} from "notistack";

const Root = () => {
    const store = configStore({
        "routeList": routeList
    })
    return (
        <Provider store={store}>
            <SnackbarProvider maxSnack={5}>
                <Router>
                    <Switch>
                        <Route exact path='/' render={() => (
                            <Redirect to='/home'/>
                        )}/>
                        <Route path='/home' component={HomeComponent}/>

                    </Switch>
                </Router>
            </SnackbarProvider>
        </Provider>
    )
}

ReactDOM.render(<Root/>, document.getElementById('root'))

