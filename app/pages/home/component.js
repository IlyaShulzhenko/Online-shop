import React from 'react';

import './index.scss';

import HyperLink from 'controls/hyper-link';

const baseClassName = 'home-page';

class HomePage extends React.PureComponent {
    
    render() {
        return (            
            <div>
                <HyperLink to="Appliances">
                    Appliances
                </HyperLink>
                <br/>
                <HyperLink to = "machinery">
                    machinery
                </HyperLink>
            </div>            
        );
    }
}

export default HomePage;
