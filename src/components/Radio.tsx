import * as React from 'react';
import * as ClassName from 'classnames';
import { Validator } from './Base';

type RadioValueType = string|number;

export type RadioAttribute = React.InputHTMLAttributes<HTMLInputElement>;

interface RadioOption {
    label: string;
    value: RadioValueType;
    disabled?: boolean;
}

interface RadioProps {
    name: string;
    required?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    options: Array<RadioOption>;
    value?: RadioValueType;
    validator?: Validator;
}

interface RadioState {
    value: RadioValueType | undefined;    
}

export class Radio extends React.Component<RadioOption & RadioAttribute> {
    render() {
        let { label, value, disabled, checked, onChange} = this.props;
        return (
        ((this.props.readOnly === true && this.props.checked === true) || this.props.readOnly !== true) ? (
        <label className={ClassName('vma-inline-label', {'is-disabled': disabled})}>
            {this.props.readOnly !== true &&
                <input type="radio" value={value} checked={checked} disabled={disabled} onChange={onChange}/>
            }
            <span>{label}</span>
        </label>
        ) : (
            null
        )
        );
    }
}

export class RadioGroup extends React.Component<RadioProps, RadioState> {
    state: RadioState;
    errorMsg: string = '请选择';
    constructor(props: RadioProps) {
        super(props);
        this.state = {value: props.value};
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
            <Radio 
                key={option.value}
                disabled={disabled}
                readOnly={this.props.readOnly}
                {...others} 
                checked={this.state.value === option.value}
                onChange={() => this.selectOption(option)}
            />);
        });
        return (
            <div>
                {children}
            </div>
        );
    }

    selectOption(option: RadioOption) {
        this.setState({value: option.value}, () => {
            if (this.props.validator) {
                this.props.validator(this.props.name, this.state.value, this.validator(), this.errorMsg);
            }
        });
    }

    private validator = (): boolean => {
        if (this.props.required === true && this.state.value !== undefined) {
            return true;
        } else if (this.props.required === undefined || this.props.required === false) {
            return true;
        } else {
            return false;
        }
    }
}
