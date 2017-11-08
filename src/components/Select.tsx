import * as React from 'react';
import { Validator } from './Base';

type SelectValueType = string|number|undefined;

interface SelectOption {
    label: string;
    value: SelectValueType;
    disabled?: boolean;
}
interface SelectProps {
    name: string;
    required?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    multiple?: boolean;
    options: Array<SelectOption>;
    value?: SelectValueType;
    validator?: Validator;
}
interface SelectState {
    value: SelectValueType;    
}

export class Option extends React.Component<SelectOption & React.OptionHTMLAttributes<HTMLOptionElement>> {
    render() {
        const { label, value, disabled, ...others } = this.props;
        return (
            disabled ? (
                null
            ) : (
                <option value={value} {...others}>{label}</option>                
            )
        );
    }
}

export class Select extends React.Component<SelectProps, SelectState> {
    state: SelectState;
    errorMsg: string = '请至少选择一项';

    constructor(props: SelectProps) {
        super(props);
        this.state = {value: props.value};
    }
    render() {
        let { options } = this.props;
        const children = options.map(option => {
            // tslint:disable-next-line:no-shadowed-variable
            let { disabled, ...others} = option;
            if (this.props.disabled) {
                disabled = this.props.disabled;
            }
            return (
            <Option 
                key={option.value}
                disabled={disabled}
                {...others} 
            />);
        });
        const { multiple, disabled} = this.props;
        const className = 'vma-input';
        return (
        <select 
            className={className} 
            disabled={disabled} 
            multiple={multiple} 
            onChange={e => this.selectOption(e.target.value)}
        >
            {this.props.children}
            {children}
        </select>
        );
    }

    selectOption(selected: SelectValueType) {
        if ((selected + '').length === 0) {
            selected = undefined;
        } else if (typeof(this.props.options[0].value) === 'number') {
            selected = parseInt(selected + '', 10);
        }
        this.setState({value: selected}, () => {
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