import * as React from 'react';
import * as ClassName from 'classnames';

interface Data {
    type: string;
    name: string;
    value: string;
    checked?: boolean;
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
    onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // tslint:disable-next-line:no-console
        console.log(this.props.value + ' is checked:' + event.target.checked);
    }

    render() {
        return (
            <label className={ClassName('vma-inline-label', {'is-disabled': this.props.disabled})}>
                <input 
                    type={this.props.type} 
                    name={this.props.name} 
                    value={this.props.value}
                    checked={this.props.checked}
                    disabled={this.props.disabled}
                    onChange={this.onChange}
                />
                <span>{this.props.prompt}</span>
            </label>
        );
    }
}

export default (CheckBox);