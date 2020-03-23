import React from 'react';
import PropTypes from 'prop-types';

import Employee from './employee';

import './index.scss';

const baseClassName = 'home-page-employees';

class HomePageEmployees extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            employees: this.props.employees,
            selectedEmployeeIndex: -1
        };
    }

    componentDidUpdate(prevProps) {
        const { employees } = this.props;

        const isEmployeesChanged = (prevProps.employees !== employees);

        if (isEmployeesChanged) {
            this.setState({
                employees
            });
        }
    }

    getClassNames = () => {
        return {
            component: baseClassName,
            title: `${baseClassName}__title`,
            list: `${baseClassName}__list`,
        };
    };

    render() {
        const classNames = this.getClassNames();

        const employeesOutput = this.renderEmployees();

        return (
            <div className={classNames.component}>
                <div className={classNames.title}>
                    Employees:
                </div>
                <div className={classNames.list}>
                    {employeesOutput}
                </div>
            </div>
        );
    }

    renderEmployees = () => {
        const { employees, selectedEmployeeIndex } = this.state;

        return employees.map((employee, index) => {
            const selected = (index === selectedEmployeeIndex);

            return (
                <Employee
                    key={employee.id}
                    employee={employee}
                    index={index}
                    selected={selected}
                    onClick={this.handleEmployeeClick}
                />
            );
        });
    };

    handleEmployeeClick = (index) => {
        const { onChange } = this.props;
        const { employees } = this.state;

        const selectedEmployee = employees[index];

        this.setState({
            selectedEmployeeIndex: index
        });

        if (onChange) {
            onChange(selectedEmployee);
        }
    };
}

HomePageEmployees.propTypes = {
    employees: PropTypes.array.isRequired,
    onChange: PropTypes.func
};

export default HomePageEmployees;
