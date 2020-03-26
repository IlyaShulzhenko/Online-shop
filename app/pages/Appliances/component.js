import React from 'react';

import './index.scss';
import HyperLink from '../../controls/hyper-link/component';

const baseClassName = 'appliances-page';

class AppliancesPage extends React.PureComponent {
 
    render() {
       
        return (            
            <div>
                <HyperLink/>
            </div>            
        );
    }
}

export default AppliancesPage;
