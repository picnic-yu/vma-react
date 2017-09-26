import * as React from 'react';
import * as ClassName from 'classnames';

interface Data {
    type: string;
    name: string;
    value: string|number;
    checked?: boolean;
    prompt: string;
    placeholder?: string;
    disabled?: boolean;
    isRequire?: boolean;
    handler?(name: string, value: string|number, checked: boolean): void;
}

interface State {
    checked: boolean;
}
class CheckBox extends React.Component<Data, State> {
    state: State;
    constructor(props: Data) {
        super(props);
        this.state = {checked: this.props.checked || false};
    }
    onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // tslint:disable-next-line:no-console
        console.log(this.props.value + ' is checked:' + event.target.checked);
        this.setState({checked: event.target.checked});
        if (this.props.handler) {
            this.props.handler(this.props.name, this.props.value, event.target.checked);
        }
    }

    render() {
        return (
            <label className={ClassName('vma-inline-label', {'is-disabled': this.props.disabled})}>
                <input 
                    type={this.props.type} 
                    name={this.props.name} 
                    value={this.props.value}
                    checked={this.state.checked}
                    disabled={this.props.disabled}
                    onChange={this.onChange}
                />
                <span>{this.props.prompt}</span>
            </label>
        );
    }
}

export default (CheckBox);