import React from 'react';

import api from 'common/api';

import Button from 'controls/button';

import Tags from './tags';
import TagsPageTagView from './tag-view';

import './index.scss';

const baseClassName = 'tags-page';

class TagsPage extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            tags: [],
            selectedTag: null,
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

        const classNames = this.getClassNames();

        return (
            <div className={classNames.component}>
            </div>
        );
    }
}

export default TagsPage;
