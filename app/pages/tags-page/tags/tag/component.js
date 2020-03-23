import React from 'react';
import PropTypes from 'prop-types';

import utils from 'common/utils';

import './index.scss';

const baseClassName = 'tags-page-tag';

class Tag extends React.PureComponent {
    getClassNames = () => {
        const { selected } = this.props;

        const componentClassName = utils.getClassName(
            baseClassName,
            [`${baseClassName}--selected`, selected]
        );

        return {
            component: componentClassName,
            title: `${baseClassName}__title`,
            description: `${baseClassName}__description`
        };
    };

    render() {
        const classNames = this.getClassNames();

        const { tag } = this.props;

        return (
            <div className={classNames.component} onClick={this.handleClick}>
                <div className={classNames.title}>
                    {tag.title}
                </div>
                <div className={classNames.description}>
                    {tag.description}
                </div>
            </div>
        );
    }

    handleClick = () => {
        const { onClick, index } = this.props;

        if (onClick) {
            onClick(index);
        }
    };
}

Tag.propTypes = {
    tag: PropTypes.object.isRequired,
    index: PropTypes.number,
    selected: PropTypes.bool,
    onClick: PropTypes.func
};

export default Tag;
