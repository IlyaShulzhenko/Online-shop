import React from 'react';
import PropTypes from 'prop-types';

import api from 'common/api';
import utils from 'common/utils';

import Button from 'controls/button';

import './index.scss';

const baseClassName = 'home-page-files';

class HomePageFiles extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            files: this.props.files
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { files } = this.props;

        const isFilesChanged = (prevProps.files !== prevProps.files);

        if (isFilesChanged) {
            this.setState({
                files
            });
        }
    }

    getClassNames = () => {
        return {
            component: baseClassName,
            uploadButton: `${baseClassName}__upload-button`,
            fileContainer: `${baseClassName}__file-container`,
            downloadButton: `${baseClassName}__download-button`,
            removeButton: `${baseClassName}__remove-button`,
            input: `${baseClassName}__input`,
        };
    };

    render() {
        const classNames = this.getClassNames();

        const filesOutput = this.renderFiles(classNames);

        return (
            <div className={classNames.component}>
                {filesOutput}
                <label className={classNames.uploadButton}>
                    +
                    <input
                        type="file"
                        className={classNames.input}
                        onChange={this.handleUploadChange}
                    />
                </label>
            </div>
        );
    }

    renderFiles = (classNames) => {
        const { files } = this.state;

        return files.map((file, index) => {
            return (
                <div key={index} className={classNames.fileContainer}>
                    <Button
                        className={classNames.downloadButton}
                        onClick={this.handleDownloadFileClick(file.path)}
                    >
                        {file.name}
                    </Button>
                    <Button
                        className={classNames.removeButton}
                        onClick={this.handleRemoveFileClick(index)}
                    >
                        -
                    </Button>
                </div>
            );
        });
    };

    handleUploadChange = (event) => {
        const { files } = this.state;

        const newFiles = [...files];
        const file = event.target.files[0];
        const fileName = file.name;

        api.uploadFile(fileName, file)
            .then((file) => {
                newFiles.push(file);

                this.updateFiles(newFiles);
            });
    };

    handleDownloadFileClick = (filePath) => () => {
        api.downloadFile(filePath)
            .then((file) => {
                const filePath = URL.createObjectURL(file);

                utils.saveFile(filePath);
            });
    };

    handleRemoveFileClick = (index) => () => {
        const { files } = this.state;

        const newFiles = [...files];

        newFiles.splice(index, 1);

        this.updateFiles(newFiles);
    };

    updateFiles = (files) => {
        const { onChange } = this.props;

        this.setState({
            files
        });

        if (onChange) {
            onChange(files);
        }
    }
}

HomePageFiles.propTypes = {
    files: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
};

export default HomePageFiles;
