import * as React from 'react';
import * as ClassName from 'classnames';
import { Validator } from './Base';

type CheckBoxValueType = string|number;
export type CheckBoxAttribute = React.InputHTMLAttributes<HTMLInputElement>;

interface CheckBoxOption {
    label: string;
    value: CheckBoxValueType;
    disabled?: boolean;
}
interface CheckBoxProps {
    name: string;
    required?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    options: Array<CheckBoxOption>;
    value?: Array<CheckBoxValueType>;
    validator?: Validator;
}
interface CheckBoxState {
    value: Array<CheckBoxValueType>;    
}

export class CheckBox extends React.Component<CheckBoxOption & CheckBoxAttribute> {
    render() {
        let { label, value, disabled, checked, onChange} = this.props;
        return (
        ((this.props.readOnly === true && this.props.checked === true) || this.props.readOnly !== true) ? (
        <label className={ClassName('vma-inline-label', {'is-disabled': disabled})}>
            {this.props.readOnly !== true &&
                <input type="checkbox" value={value} checked={checked} disabled={disabled} onChange={onChange}/>
            }
            <span>{label}</span>
        </label>
        ) : (
            null
        )
        );
    }
}

export class CheckBoxGroup extends React.Component<CheckBoxProps, CheckBoxState> {
    state: CheckBoxState;
    errorMsg: string = '请至少选择一项';
    constructor(props: CheckBoxProps) {
        super(props);
        this.state = {value: props.value || []};
    }
    render() {
        let { options } = this.props;
        const children = options.map(option => {
            // <Input type="checkbox" value={option.value} disabled={option.disabled}>{option.label}</Input>
            let { disabled, ...others} = option;
            if (this.props.disabled) {
                disabled = this.props.disabled;
            }
            return (
            <CheckBox 
                key={option.value}
                disabled={disabled}
                readOnly={this.props.readOnly}
                {...others} 
                checked={this.state.value.indexOf(option.value) !== -1}
                onChange={() => this.selectOption(option)}
            />);
        });
        return (
            <div>
                {children}
            </div>
        );
    }

    selectOption(option: CheckBoxOption) {
        let index = this.state.value.indexOf(option.value);
        let value = [...this.state.value];
        if (index === -1) {
            value.push(option.value);
        } else {
            value.splice(index, 1);
        }
        this.setState({value}, () => {
            if (this.props.validator) {
                this.props.validator(this.props.name, this.state.value, this.validator(), this.errorMsg);
            }
        });
    }

    private validator = (): boolean => {
        if (this.props.required === true && this.state.value !== undefined && this.state.value.length > 0) {
            return true;
        } else if (this.props.required === undefined || this.props.required === false) {
            return true;
        } else {
            return false;
        }
    }
}
