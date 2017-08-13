import * as React from 'react';
interface Data {
    type: string;
    name: string;
    value: string;
    prompt: string;
    placeholder?: string;
    disabled?: boolean;
    isRequire?: boolean;
    handler?(): void;
}
class CheckBox extends React.Component<Data> {
    state = {  };
    constructor(props: Data) {
        super(props);
    }
    render() {
        let className = 'vma-inline-label ';
        if (this.props.disabled) {
            className += 'is-disabled';
        }
        return (
            <label className={className}>
                <input 
                    type={this.props.type} 
                    name={this.props.name} 
                    value={this.props.value} 
                    disabled={this.props.disabled}
                />
                <span>{this.props.prompt}</span>
            </label>
        );
    }
}

export default (CheckBox);