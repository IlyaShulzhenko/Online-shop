import React from 'react';
import PropTypes from 'prop-types';

import Input from 'controls/input';
import DropDown from 'controls/drop-down';
import CheckBox from 'controls/check-box';
import Button from 'controls/button';

import './index.scss';

const baseClassName = 'home-page-filter';

class HomePageFilter extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            filter: this.props.filter
        };
    }

    getClassNames = () => {
        return {
            component: baseClassName,
            field:`${baseClassName}__field`,
            title: `${baseClassName}__title`,
            resetButton : `${baseClassName}__reset-button`,
        };
    };

    render() {
        const { filter } = this.state;

        const classNames = this.getClassNames();

        return (
            <div className={classNames.component}>
                <div className={classNames.field}>
                    <div className={classNames.title}>
                        Search keywords:
                    </div>
                    <Input
                        text={filter.name}
                        onChanged={this.handleSearchChange}
                    />
                </div>
                <div className={classNames.field}>
                    <div className={classNames.title}>
                        Employee Position:
                    </div>
                    <DropDown
                        onValueChanged={this.handlePositionChange}
                    />
                </div>
                <div className={classNames.field}>
                    <div className={classNames.title}>
                        Employee State:
                    </div>
                    <DropDown
                        onValueChanged={this.handleStateChange}
                    />
                </div>
                <div className={classNames.field}>
                    <div className={classNames.title}>
                        Category:
                    </div>
                    <div>
                        <CheckBox
                            checked={filter.favorited}
                            onCheckedChanged={this.handleFavoritedChange}
                        >
                            Favorited
                        </CheckBox>
                    </div>
                    <div>
                        <CheckBox
                            checked={filter.blocked}
                            onCheckedChanged={this.handleBlockedChange}
                        >
                            Blocked
                        </CheckBox>
                    </div>
                </div>
                <div className={classNames.field}>
                    <div className={classNames.title}>
                        Tags:
                    </div>
                    <Button>
                        +
                    </Button>
                </div>
                <Button
                    theme='link'
                    className={classNames.resetButton}
                    onClick={this.handleResetClick}
                >
                    Reset Filter
                </Button>
            </div>
        );
    }

    handleSearchChange = (value) => {
        const { filter } = this.state;

        const newFilter = {...filter};

        if (value.length) {
            newFilter.name = value;
            newFilter.mail = value;
        } else {
            delete newFilter.name;
            delete newFilter.mail;
        }

        this.updateFilter(newFilter);
    };

    handlePositionChange = (value) => {
        const { filter } = this.state;

        const newFilter = {...filter};

        if (value.length) {
            newFilter.position = value;
        } else {
            delete newFilter.position;
        }

        this.updateFilter(newFilter);
    };

    handleStateChange = (value) => {
        const { filter } = this.state;

        const newFilter = {...filter};

        if (value.length) {
            newFilter.state = value;
        } else {
            delete newFilter.state;
        }

        this.updateFilter(newFilter);
    };

    handleFavoritedChange = (value) => {
        const { filter } = this.state;

        const newFilter = {...filter};

        if (value) {
            newFilter.favorited = true;
        } else {
            delete newFilter.favorited;
        }

        this.updateFilter(newFilter);
    };

    handleBlockedChange = (value) => {
        const { filter } = this.state;

        const newFilter = {...filter};

        if (value) {
            newFilter.blocked = true;
        } else {
            delete newFilter.blocked;
        }

        this.updateFilter(newFilter);
    };

    handleResetClick = () => {
        const filter = {};

        this.updateFilter(filter);
    };

    updateFilter = (filter) => {
        const { onChange } = this.props;

        this.setState({
            filter
        });

        if (onChange) {
            onChange(filter);
        }
    };
}

HomePageFilter.propTypes = {
    filter: PropTypes.shape({
        name: PropTypes.string,
        mail: PropTypes.string,
        position: PropTypes.string,
        state: PropTypes.string,
        favorited: PropTypes.bool,
        blocked: PropTypes.bool,
        tags: PropTypes.array
    }),
    onChange: PropTypes.func
};

export default HomePageFilter;
