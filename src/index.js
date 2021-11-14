import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import configStore from './store'
import routeList from "./route";
import HomeComponent from "./home";
import {SnackbarProvider} from "notistack";
import RichTextComponent from "./style/component/richText";
import NavigationTableContent from "./style/component/tableContent";

const Root = () => {
    const store = configStore({
        "routeList": routeList
    })
    return (
        <Provider store={store}>
            <SnackbarProvider maxSnack={5}>
                <Router>
                    <Switch>
                        <Route path='/home' component={HomeComponent}/>
                        <Route path='/richText' component={RichTextComponent}/>
                        <Route path='/nav' component={NavigationTableContent}/>
                    </Switch>
                </Router>
            </SnackbarProvider>
        </Provider>
    )
}

ReactDOM.render(<Root/>, document.getElementById('root'))

