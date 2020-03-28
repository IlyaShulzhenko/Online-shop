import React from 'react';
import NavLink from 'react-router-dom/NavLink';

import routes from 'common/routes';

import './index.scss';

class MasterPage extends React.PureComponent {

    render() {
        return (
            <>
                {this.props.children}
            </>
        );
    }
}

export default MasterPage;
