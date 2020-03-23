import React from 'react';
import PropTypes from 'prop-types';

import utils from 'common/utils';

import iconAvatar from 'icons/avatar.png';
import IconBlocked from 'pages/home/iconBlocked';
import IconFavorited from 'pages/home/iconFavorited';

import './index.scss';

const baseClassName = 'home-page-employee';

class Employee extends React.PureComponent {
    getClassNames = () => {
        const { selected } = this.props;

        const componentClassName = utils.getClassName(
            baseClassName,
            [`${baseClassName}--selected`, selected]
        );

        return {
            component: componentClassName,
            avatar: `${baseClassName}__avatar`,
            info: `${baseClassName}__info`,
            infoName: `${baseClassName}__info-name`,
            infoMail: `${baseClassName}__info-mail`,
            rating: `${baseClassName}__rating`,
            ratingFavorite: `${baseClassName}__rating-favorite`,
            ratingBlocked: `${baseClassName}__rating-blocked`,
            ratingDefault: `${baseClassName}__rating-default`
        };
    };

    render() {
        const classNames = this.getClassNames();

        const avatarOutput = this.renderAvatar(classNames);
        const nameOutput = this.renderName(classNames);
        const mailOutput = this.renderMail(classNames);
        const favoriteOutput = this.renderFavorite(classNames);
        const blockedOutput = this.renderBlocked(classNames);

        return (
            <div className={classNames.component} onClick={this.handleClick}>
                {avatarOutput}
                <div className={classNames.info}>
                    {nameOutput}
                    {mailOutput}
                </div>
                <div className={classNames.rating}>
                    {favoriteOutput}
                    {blockedOutput}
                </div>
            </div>
        );
    }

    renderAvatar = (classNames) => {
        const { employee } = this.props;

        let avatarOutput;

        if (employee.avatar) {
            avatarOutput = employee.avatar;
        } else {
            avatarOutput = iconAvatar;
        }

        return (
            <div className={classNames.avatar}>
                <img src={avatarOutput} alt=""/>
            </div>
        );
    };

    renderName = (classNames) => {
        const { employee } = this.props;

        let output;

        if (employee.name) {
            output = (
                <div className={classNames.infoName}>
                    {employee.name}
                </div>
            );
        }

        return output;
    };

    renderMail = (classNames) => {
        const { employee } = this.props;

        let output;

        if (employee.mail) {
            output = (
                <div className={classNames.infoMail}>
                    {employee.mail}
                </div>
            );
        }

        return output;
    };

    renderFavorite = (classNames) => {
        const { employee } = this.props;

        let output;

        if (employee.favorite) {
            output = (
                <div className={classNames.ratingFavorite}>
                    <IconFavorited />
                </div>
            );
        } else {
            output = (
                <div className={classNames.ratingDefault}>
                    <IconFavorited />
                </div>
            );
        }

        return output;
    };

    renderBlocked = (classNames) => {
        const { employee } = this.props;

        let output;

        if (employee.blocked) {
            output = (
                <div className={classNames.ratingBlocked}>
                    <IconBlocked />
                </div>
            );
        } else {
            output = (
                <div className={classNames.ratingDefault}>
                    <IconBlocked />
                </div>
            );
        }

        return output;
    };

    handleClick = () => {
        const {onClick, index} = this.props;

        if (onClick) {
            onClick(index);
        }
    };
}

Employee.propTypes = {
    employee: PropTypes.object.isRequired,
    index: PropTypes.number,
    selected: PropTypes.bool,
    onClick: PropTypes.func
};

export default Employee;
