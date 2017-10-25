import * as React from 'react';
// import ClassNames from 'classnames';

interface TagProps {
    label: string;
    icon?: string;
}

export class Tag extends React.Component<TagProps & React.HTMLAttributes<HTMLSpanElement>> {
    state = {  };
    render() {
        let className = '';
        if (this.props.icon) {
            className = `icon-${this.props.icon}`;
        }
        return (
            <span className="tag">{this.props.label}
                {className.length > 0 &&
                <i className={className}/>
                }
            </span>
        );
    }
}
