import React from 'react';



class Appliances extends React.PureComponent {
    render() {
        return (
            <div className='Appliances'>

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

export default Appliances;
