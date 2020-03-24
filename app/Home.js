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
            <div className='Home'>

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

export default Home;
