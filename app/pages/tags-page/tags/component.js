import React from 'react';
import PropTypes from 'prop-types';

import Tag from './tag';

import './index.scss';

const baseClassName = 'tags-page-tags';

class TagsPageTags extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            tags: this.props.tags,
            selectedTagIndex: -1
        };
    }

    componentDidUpdate(prevProps) {
        const { tags } = this.props;

        const isTagsChanged = (prevProps.tags !== tags);

        if (isTagsChanged) {
            this.setState({
                tags
            });
        }
    }

    getClassNames = () => {
        return {
            component: baseClassName
        };
    };

    render() {
        const classNames = this.getClassNames();

        const tagsOutput = this.renderTags();

        return (
            <div className={classNames.component}>
                {tagsOutput}
            </div>
        );
    }

    renderTags = () => {
        const { tags, selectedTagIndex } = this.state;

        return tags.map((tag, index) => {
            const selected = (index === selectedTagIndex);

            return (
                <Tag
                    key={tag.id}
                    tag={tag}
                    index={index}
                    selected={selected}
                    onClick={this.handleTagClick}
                />
            );
        });
    };

    handleTagClick = (index) => {
        const { onTagSelectedChanged } = this.props;
        const { tags } = this.state;

        const selectedTag = tags[index];

        this.setState({
            selectedTagIndex: index
        });

        if (onTagSelectedChanged) {
            onTagSelectedChanged(selectedTag);
        }
    };
}

TagsPageTags.propTypes = {
    tags: PropTypes.array.isRequired,
    onTagSelectedChanged: PropTypes.func
};

export default TagsPageTags;
