import React from 'react';

import api from 'common/api';

import Button from 'controls/button';

import Filter from './filter';
import HomePageEmployees from './employees';
import HomePageEmployeeView from './employee-view';

import './index.scss';
import HyperLink from '../../controls/hyper-link/component';

const baseClassName = 'home-page';

class HomePage extends React.PureComponent {
    
    constructor(props) {
        super(props);

        this.state = {
            filter: {},
            selectedEmployee: null,
            employees: [],
            changed: false
        };
    }

    componentDidMount() {
        this.loadData();
    }

    getClassNames = () => {
        return {
            component: baseClassName,
            header: `${baseClassName}__header`
            
        };
    };

    render() {
        const { filter, employees } = this.state;

        const classNames = this.getClassNames();

        const employeeViewOutput = this.renderEmployeeView();
        const buttonsOutput = this.renderButtons(classNames);

        return (
            <div className={classNames.component}>
                <HyperLink/>
                <Filter
                    filter={filter}
                    onChange={this.handleFilterChange}
                />
                <HomePageEmployees
                    employees={employees}
                    onChange={this.handleEmployeeSelectedChange}
                />
                {employeeViewOutput}
                <div className={classNames.header}>
                    {buttonsOutput}
                </div>
            </div>
        );
    }

    renderEmployeeView = () => {
        const { selectedEmployee } = this.state;

        let output;

        if (selectedEmployee) {
            output = (
                <HomePageEmployeeView
                    employee={selectedEmployee}
                    onChange={this.handleEmployeeChanged}
                />
            );
        }

        return output;
    };

    renderButtons = () => {
        const { changed } = this.state;

        let buttonsOutput ;

        if (changed) {
            buttonsOutput = (
                <>
                    <Button onClick={this.handleSaveClick}>
                        Save
                    </Button>
                    <Button onClick={this.handleCancelClick} theme='link'>
                        Cancel
                    </Button>
                </>
            );
        } else {
            buttonsOutput = (
                <>
                    <Button onClick={this.handleAddNewEmployee}>
                        Add new Employee
                    </Button>
                </>
            );
        }

        return buttonsOutput;
    };

    handleEmployeeChanged = (employee) => {
        this.setState({
            changed: true,
            selectedEmployee: employee
        });
    };

    handleCancelClick = () => {
        this.setState({
            changed: false
        });
    };

    handleSaveClick = () => {
        const { selectedEmployee } = this.state;

        if (selectedEmployee.id) {
            api.updateEmployee(selectedEmployee)
                .then((response) => {
                    if (response) {
                        this.setState({
                            changed: false
                        });
                    }
                });
        } else {
            api.createEmployee(selectedEmployee);
        }
    };

    handleEmployeeSelectedChange = (selectedEmployee) => {
        this.setState({
            selectedEmployee
        });
    };

    handleAddNewEmployee = () => {
        const { employees } = this.state;

        const selectedEmployee = {
            id: 0
        };
        const newEmployees = [selectedEmployee, ...employees];

        this.setState({
            selectedEmployee,
            employees: newEmployees,
            changed: true
        });
    };

    handleFilterChange = (filter) => {
        this.setState({
            filter
        });
    };

    loadData = () => {
        const { filter } = this.state;

        api.loadEmployees(filter)
            .then((employees) => {
                this.setState({
                    employees
                });
            });
    };
}

export default HomePage;
