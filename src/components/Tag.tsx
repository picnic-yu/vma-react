import * as React from 'react';
interface Data {
    type?: string;
    name?: string;
    value?: string;
    prompt?: string;
    placeholder?: string;
    disabled?: boolean;
    isRequire?: boolean;
    icon?: string;
    handler?(): void;
}
class Tag extends React.Component<Data> {
    state = {  };
    constructor(props: Data) {
        super(props);
    }
    render() {
        let className = '';
        if (this.props.icon) {
            className = `icon-${this.props.icon}`;
        }
        return (
            <span className="tag">{this.props.prompt}
                <i className={className}/>
            </span>
        );
    }
}

export default (Tag);