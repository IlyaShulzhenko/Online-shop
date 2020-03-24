import React from 'react';


class Home extends React.PureComponent {
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
