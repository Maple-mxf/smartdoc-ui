import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import configStore from './store'
import routeList from "./route";
import HomeComponent from "./home";
import {SnackbarProvider} from "notistack";
import RichTextComponent from "./style/component/richText";
import NavigationTableContent from "./style/component/tableContent";
import TabsComponent from "./style/component/tabs";
import BasicTable from "./style/component/table";
import EditorDemo from "./style/component/demo";

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
                        <Route path='/tabs' component={TabsComponent}/>
                        <Route path='/table' component={BasicTable}/>
                        <Route path='/demo' component={EditorDemo}/>
                    </Switch>
                </Router>
            </SnackbarProvider>
        </Provider>
    )
}

ReactDOM.render(<Root/>, document.getElementById('root'))

