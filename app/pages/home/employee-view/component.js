import React from 'react';
import PropTypes from 'prop-types';

import utils from 'common/utils';
import api from 'common/api';

import Input from 'controls/input';
import Button from 'controls/button';
import DropDown from 'controls/drop-down';

import IconBlocked from 'pages/home/iconBlocked';
import IconFavorited from 'pages/home/iconFavorited';

import avatarIcon from 'icons/avatar.png';

import employeePositions from 'common/mocked/positions';
import employeeStates from 'common/mocked/employeeStates';
import tags from 'common/mocked/tags';
import dropDownModel from 'common/models/dropDownModel';

import './index.scss';

const baseClassName = 'home-page-employee-view';

class HomePageEmployeeView extends React.PureComponent {
    constructor(props) {
        super(props);

        this.employeePositions = api.createModelsArray(employeePositions, dropDownModel);
        this.employeeStates = api.createModelsArray(employeeStates, dropDownModel);
        this.tags = api.createModelsArray(tags, dropDownModel);

        this.state = {
            employee: this.props.employee
        };
    }

    componentDidUpdate(prevProps) {
        const { employee } = this.props;

        const isEmployeeChanged = (prevProps.employee !== employee);

        if (isEmployeeChanged) {
            this.setState({
                employee
            });
        }
    }

    getClassNames = () => {
        return {
            component: baseClassName,
            employeeInfo: `${baseClassName}__employee-info`,
            employeeNameMailContainer: `${baseClassName}__employee-info-container`,
            employeeCategories: `${baseClassName}__employee-info-categories`,
            avatarContainer: `${baseClassName}__avatar-container`,
            avatarImage: `${baseClassName}__avatar-image`,
            avatarImageContainer: `${baseClassName}__avatar-image-container`,
            avatarButtonsContainer: `${baseClassName}__avatar-buttons-container`,
            employeeContainerFields: `${baseClassName}__employee-container-fields`,
            employeeColumnSmall: `${baseClassName}__employee-column--small`,
            employeeColumnBig: `${baseClassName}__employee-column--big`,
            field: `${baseClassName}__field`,
            title: `${baseClassName}__title`,
            rating: `${baseClassName}__rating`,
            ratingFavorite: `${baseClassName}__rating--favorite`,
            ratingBlocked: `${baseClassName}__rating--blocked`,

        };
    };

    render() {
        const { employee } = this.state;

        const classNames = this.getClassNames();

        const avatarOutput = this.renderAvatar(classNames);
        const categoriesOutput = this.renderCategories(classNames);
        const employeeTagsOutput = this.renderEmployeeTags(classNames);

        return (
            <div className={classNames.component}>
                <div className={classNames.employeeInfo}>
                    {avatarOutput}
                    <div className={classNames.employeeNameMailContainer}>
                        <div className={classNames.field}>
                            <Input
                                text={employee.name}
                                onChanged={this.handleNameChange}
                            />
                        </div>
                        <div className={classNames.field}>
                            <Input
                                text={employee.mail}
                                onChanged={this.handleMailChange}
                            />
                        </div>
                    </div>
                    {categoriesOutput}
                </div>
                <div className={classNames.employeeContainerFields}>
                    <div className={classNames.employeeColumnSmall}>
                        <div className={classNames.field}>
                            <div className={classNames.title}>
                                Phone:
                            </div>
                            <Input
                                text={employee.phone}
                                onChanged={this.handlePhoneChange}
                            />
                        </div>
                        <div className={classNames.field}>
                            <div className={classNames.title}>
                                Employee State:
                            </div>
                            <DropDown
                                selectedValue={employee.state}
                                items={this.employeeStates}
                                onValueChanged={this.handleEmployeeStateChange}
                            />
                        </div>
                        <div className={classNames.field}>
                            <div className={classNames.title}>
                                Employee Position:
                            </div>
                            <DropDown
                                selectedValue={employee.position}
                                items={this.employeePositions}
                                onValueChanged={this.handleEmployeePositionChange}
                            />
                        </div>
                        {employeeTagsOutput}
                    </div>
                    <div className={classNames.employeeColumnBig}>
                        <div className={classNames.field}>
                            <div className={classNames.title}>
                                Skype:
                            </div>
                            <Input
                                text={employee.skype}
                                onChanged={this.handleSkypeChange}
                            />
                        </div>
                        <div className={classNames.field}>
                            <div className={classNames.title}>
                                Linked In:
                            </div>
                            <Input
                                text={employee.linkedin}
                                onChanged={this.handleLinkedinChange}
                            />
                        </div>
                        <div className={classNames.field}>
                            <div className={classNames.title}>
                                Description:
                            </div>
                            <Input
                                text={employee.description}
                                multiline={true}
                                onChanged={this.handleDescriptionChange}
                            />
                        </div>
                        <div className={classNames.field}>
                            <div className={classNames.title}>
                                Files:
                            </div>
                            {/*<HomePageFiles*/}
                            {/*    files={employee.files}*/}
                            {/*    onChange={this.handleFilesChange}*/}
                            {/*/>*/}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderAvatar = (classNames) => {
        const { employee }  = this.state;

        let avatarOutput;
        let buttonsOutput;

        if (employee.avatar) {
            avatarOutput = (
                <img src={employee.avatar} className={classNames.avatarImage} alt=""/>
            );

            buttonsOutput = (
                <>
                    <label className='button'>
                        Change
                        <input type="file" className='input-hidden' onChange={this.handleUploadChange}/>
                    </label>
                    <Button onClick={this.handleRemoveClick}>
                        Delete
                    </Button>
                </>

            );
        } else {
            avatarOutput = (
                <img src={avatarIcon} className={classNames.avatarImage} alt=""/>
            );

            buttonsOutput = (
                <label className='button'>
                    Change
                    <input type="file" className='input-hidden' onChange={this.handleUploadChange}/>
                </label>
            );
        }

        return (
            <div className={classNames.avatarContainer}>
                <div className={classNames.avatarImageContainer}>
                    {avatarOutput}
                </div>
                <div className={classNames.avatarButtonsContainer}>
                    {buttonsOutput}
                </div>
            </div>
        );
    };

    renderCategories = (classNames) => {
        const { employee } = this.state;

        const classNameFavorite = utils.getClassName(
            classNames.rating,
            [classNames.ratingFavorite, employee.favorite]
        );
        const classNameBlocked = utils.getClassName(
            classNames.rating,
            [classNames.ratingBlocked, employee.blocked]
        );
        const textFavorite = employee.favorite ? 'Favorite' : null;
        const textBlocked = employee.blocked ? 'Blocked' : null;

        const output = (
            <div className={classNames.employeeCategories}>
                <div
                    role='button'
                    className={classNameFavorite}
                    onClick={this.handleCategoryFavoriteClick}
                >
                    <IconFavorited/>
                    {textFavorite}
                </div>
                <div
                    role='button'
                    className={classNameBlocked}
                    onClick={this.handleCategoryBlockedClick}
                >
                    <IconBlocked/>
                    {textBlocked}
                </div>
            </div>
        );

        return output;
    };

    renderEmployeeTags = (classNames) => {
        const { employee } = this.state;

        const employeeTags = api.createModelsArray(employee.tags, dropDownModel);

        let output = (
            <div className={classNames.field}>
                <div className={classNames.title}>
                    Tags:
                </div>
            </div>
        );

        return output;
    };

    handleNameChange = (value) => {
        const { employee } = this.state;

        const newEmployee = { ...employee };

        newEmployee.name = value;

        this.updateEmployee(newEmployee);
    };

    handleMailChange = (value) => {
        const { employee } = this.state;

        const newEmployee = { ...employee };

        newEmployee.mail = value;

        this.updateEmployee(newEmployee);
    };

    handleCategoryFavoriteClick = () => {
        const { employee } = this.state;

        const newEmployee = { ...employee };

        newEmployee.favorite = !newEmployee.favorite;

        this.updateEmployee(newEmployee);
    };

    handleCategoryBlockedClick = () => {
        const { employee } = this.state;

        const newEmployee = { ...employee };

        newEmployee.blocked = !newEmployee.blocked;

        this.updateEmployee(newEmployee);
    };

    handleRemoveClick = () => {
        const { employee } = this.state;

        const newEmployee = { ...employee };

        delete newEmployee.avatar;

        this.updateEmployee(newEmployee);
    };

    handlePhoneChange = (value) => {
        const { employee } = this.state;

        const newEmployee = { ...employee };

        newEmployee.phone = value;

        this.updateEmployee(newEmployee);
    };

    handleSkypeChange = (value) => {
        const { employee } = this.state;

        const newEmployee = { ...employee };

        newEmployee.skype = value;

        this.updateEmployee(newEmployee);
    };

    handleLinkedinChange = (value) => {
        const { employee } = this.state;

        const newEmployee = { ...employee };

        newEmployee.linkedin = value;

        this.updateEmployee(newEmployee);
    };

    handleDescriptionChange = (value) => {
        const { employee } = this.state;

        const newEmployee = { ...employee };

        newEmployee.description = value;

        this.updateEmployee(newEmployee);
    };

    handleEmployeePositionChange = (value) => {
        const { employee } = this.state;

        const newEmployee = { ...employee };

        newEmployee.position = value;

        this.updateEmployee(newEmployee);
    };

    handleEmployeeStateChange = (value) => {
        const { employee } = this.state;

        const newEmployee = { ...employee };

        newEmployee.state = value;

        this.updateEmployee(newEmployee);
    };

    handleUploadChange = (event) => {
        const file = event.target.files[0];
        const fileName = file.name;

        api.uploadFile(fileName, file);
    };

    handleTagsChange = (tags) => {
        const { employee } = this.state;

        const newEmployee = { ...employee };

        newEmployee.tags = tags;

        this.updateEmployee(newEmployee);
    };

    handleDownloadClick = () => {
        const filePath = '';

        api.downloadFile(filePath)
            .then((file) => {
                const filePath = URL.createObjectURL(file);

                utils.saveFile(filePath);
            });
    };

    handleFilesChange = (files) => {
        const { employee } = this.state;

        const newEmployee = { ...employee };

        newEmployee.files = files;

        this.updateEmployee(newEmployee);
    };

    updateEmployee = (employee) => {
        const { onChange } = this.props;

        this.setState({
            employee
        });

        if (onChange) {
            onChange(employee);
        }
    };
}

HomePageEmployeeView.propTypes = {
    employee: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
};

export default HomePageEmployeeView;
