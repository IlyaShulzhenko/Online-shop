import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

import Input from 'controls/input';

const baseClassName = 'tags-page-tag-view';

class TagsPageTagView extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            tag: this.props.tag
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { tag } = this.props;

        const isTagChanged = (prevProps.tag !== tag);

        if (isTagChanged) {
            this.setState({
                tag
            });
        }
    }

    getClassNames = () => {
        return {
            component: baseClassName,
            field: `${baseClassName}__field`,
            title: `${baseClassName}__title`
        };
    };

    render() {
        const { tag } = this.state;

        const classNames = this.getClassNames();

        return (
            <div className={classNames.component}>
                <div className={classNames.field}>
                    <div className={classNames.title}>
                        Title:
                    </div>
                    <Input
                        text={tag.title}
                        onChanged={this.handleTitleChange}
                    />
                </div>
                <div className={classNames.field}>
                    <div className={classNames.title}>
                        Description:
                    </div>
                    <Input
                        text={tag.description}
                        onChanged={this.handleDescriptionChange}
                    />
                </div>
            </div>
        );
    }

    handleTitleChange = (value) => {
        const { tag } = this.state;

        const newTag = { ...tag };

        newTag.title = value;

        this.updateTag(newTag);
    };

    handleDescriptionChange = (value) => {
        const { tag } = this.state;

        const newTag = { ...tag };

        newTag.description = value;

        this.updateTag(newTag);
    };

    updateTag = (tag) => {
        const { onChange } = this.props;

        this.setState({
            tag
        });

        if (onChange) {
            onChange(tag);
        }
    };
}

TagsPageTagView.propTypes = {
    tag: PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string
    }).isRequired,
    onChange: PropTypes.func
};

export default TagsPageTagView;
