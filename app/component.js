import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import routes from 'common/routes';

import MasterPage from 'components/master-page';

import HomePage from 'pages/home';

import AppliancesPage from 'pages/appliances';

import MachineryPage from 'pages/machinery';

import TagsPage from 'pages/tags-page';

import NotFoundPage from 'pages/not-found';

import './index.scss';

class App extends React.PureComponent {
    render() {
        return (
            <div className='app'>
                <BrowserRouter>
                    <Switch>
                        {/* <Route
                            exact path={routes.newHome}
                            component={this.getPageComponent(<HomePage/>)}/>
                        <Route
                            path={routes.tags}
                            component={this.getPageComponent(<TagsPage/>)}/> */}
                        <Route
                            exact path={routes.newHome}
                            component={this.getPageComponent(<HomePage/>)}/>
                        <Route
                            path={routes.appliances}
                            component={this.getPageComponent(<AppliancesPage/>)}/>                            
                        <Route
                            path={routes.machinery}
                            component={this.getPageComponent(<MachineryPage/>)}/>                           
                        <Route
                            component={this.getPageComponent(<NotFoundPage/>)}/>

                    </Switch>
                </BrowserRouter>
            </div>
        );
    }

    getPageComponent = (component) => () => {
        return (
            <MasterPage>
                {component}
            </MasterPage>
        );
    };
}

export default App;
