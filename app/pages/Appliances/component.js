import React from 'react';

import './index.scss';

const baseClassName = 'appliances-page';

class AppliancesPage extends React.PureComponent {
    
    getClassNames = () => {
        return {
            component: baseClassName,
            filter: `${baseClassName}__filter`,
            list: `${baseClassName}__list`,
        };
    }

    render() {
        const classNames = this.getClassNames();

        return (            
            <div className={classNames.component}>
                <div className={classNames.filter}>
                    filter
                </div>
                <div className={classNames.list}>
                    List
                </div>
            </div>    

        );
    }
}

export default AppliancesPage;
