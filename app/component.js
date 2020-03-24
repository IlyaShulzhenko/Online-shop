import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import routes from 'common/routes';

import MasterPage from 'components/master-page';

import HomePage from 'pages/home';

import TagsPage from 'pages/tags-page';

import NotFoundPage from 'pages/not-found';

import './index.scss';

class App extends React.PureComponent {
    render() {
        return (
            <div className='app'>
                <BrowserRouter>
                    <Switch>
                        <Route
                            exact path={routes.home}
                            component={this.getPageComponent(<HomePage/>)}/>
                        <Route
                            path={routes.tags}
                            component={this.getPageComponent(<TagsPage/>)}/>
                        <Route
                            component={this.getPageComponent(<NotFoundPage/>)}/>
                        <Route
                            component={this.getPageComponent(<home/>)}/>
                        <Route
                            component={this.getPageComponent(<appliances/>)}/>
                        <Route
                            component={this.getPageComponent(<machinery/>)}/>
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
