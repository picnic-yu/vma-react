import * as React from 'react';
import * as ClassName from 'classnames';
import * as validator from 'validator';
import { Handler } from './Base';

interface CheckState {
    checked: boolean;
}

interface InputState<T> {
    value: T;
}

export type InputAttribute = React.InputHTMLAttributes<HTMLInputElement>;

export class Input extends React.Component<
    InputAttribute & Handler<string|string[]|number|undefined|File>> {
    state: InputState<string|string[]|number|undefined> &  CheckState;
    errorMsg: string = '请提供数据';
    constructor(props: React.InputHTMLAttributes<HTMLInputElement>) {
        super(props);
        this.state = {value: this.props.value, checked: this.props.checked || false};
    }
    render() {
        if (process.env.NODE_ENV !== 'production' && (this.props.type === 'checkbox' || this.props.type === 'radio')) {
            console.warn(`using CheckBox or Radio instead of ${this.props.type}`);
        }
        // tslint:disable-next-line:no-shadowed-variable
        // tslint:disable-next-line:max-line-length
        let { type, className= 'vma-input', value, children, watchValue, checked, onChange, validator, ...others} = this.props;
        onChange = this.onChange;
        return (
            type === 'radio' || type === 'checkbox' ? (
                <label className={ClassName('vma-inline-label', {'is-disabled': this.props.disabled})}>
                    <input type={type} {...others} checked={this.state.checked} onChange={onChange}/>
                    <span>{children}</span>
                </label>
            ) : (
                <input 
                    type={type} 
                    className={className} 
                    {...others} 
                    onChange={onChange} 
                    value={this.state.value}
                />                
            )
        );
    }

    validator = (): boolean => {
        let result: boolean = this.props.required === true;
        switch (this.props.type) {
            case 'checkbox':
                result = result && this.state.checked;
                // result = result && this.state.value !== undefined;
                // result = result && Array.isArray(this.state.value) && this.state.value.length === 0;
                break;
            case 'radio':
                result = result && this.state.value === undefined;
                break;
            case 'text':
            case 'password':
                result = this.validText();
                break;
            case 'number':
                result = this.validNumber();
                break;
            case 'email':
                result = this.validEmail();
                break;
            default:
                break;
        }
        return result;
    }

    onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (this.props.type === 'radio' || this.props.type === 'checkbox') {
            // tslint:disable-next-line:no-console
            console.log(this.props.value + ' is checked:' + event.target.checked);
        }
        let files: Array<File> = [];
        if (this.props.type === 'file' && event.target.files !== null) {
            for (let i = 0; i < event.target.files.length; i++) {
                files.push(event.target.files.item(i));
                // console.log(event.target.files.item(i));
            }
        }

        if (this.props.type === 'file') {
            this.setState({value: files}, () => {
                if (this.props.watchValue && this.state.value !== undefined) {
                    this.props.watchValue(
                        this.props.name || '', this.state.value, 
                        this.state.checked || false);
                }
                if (this.props.validator) {
                    this.props.validator(
                        this.props.name || '', 
                        this.state.value, 
                        this.validator(), 
                        this.errorMsg);
                }                
            });
        } else {
            this.setState({value: event.target.value, checked: event.target.checked}, () => {
                if (this.props.watchValue && this.state.value !== undefined) {
                    this.props.watchValue(
                        this.props.name || '', 
                        this.state.value, 
                        this.state.checked || false);
                }
                if (this.props.validator) {
                    this.props.validator(
                        this.props.name || '', 
                        this.state.value, 
                        this.validator(), 
                        this.errorMsg);
                }                                
            });    
        }
    }

    private validText = (): boolean => {
        let valid: boolean = true;
        if (typeof this.state.value === 'string') {
            this.errorMsg = '';
            let value = this.state.value.length;
            if (this.props.min !== undefined && (isNaN(value) || value < this.props.min)) {
                this.errorMsg = `非法的文本,最短:${this.props.min}`;
                valid = valid && false;
            }
            if (this.props.max !== undefined && (isNaN(value) || value > this.props.max)) {
                valid = valid && false;
                if (this.errorMsg.length === 0) {
                    this.errorMsg += `非法的文本, 最长: ${this.props.max}`;
                } else {
                    this.errorMsg += `, 最长: ${this.props.max}`;
                }
            }
        }
        return valid;        
    }

    private validNumber() {
        let valid: boolean = true;
        if (typeof this.state.value === 'string') {
            valid = validator.isInt(this.state.value);
            this.errorMsg = '';
            let value = validator.toInt(this.state.value);
            if (this.props.min !== undefined && (isNaN(value) || value < this.props.min)) {
                this.errorMsg = `非法的数字,最小:${this.props.min}`;
                valid = valid && false;
            }
            if (this.props.max !== undefined && (isNaN(value) || value > this.props.max)) {
                valid = valid && false;
                if (this.errorMsg.length === 0) {
                    this.errorMsg += `非法的数字, 最大: ${this.props.max}`;
                } else {
                    this.errorMsg += `, 最大: ${this.props.max}`;
                }
            }
        }
        return valid;
    }

    private validEmail() {
        let valid: boolean = true;
        if (typeof this.state.value === 'string') {
            valid = validator.isEmail(this.state.value);
            if (valid === false) {
                this.errorMsg = '邮箱格式不正确';
            }                 
        }
        return valid;
    }
}
