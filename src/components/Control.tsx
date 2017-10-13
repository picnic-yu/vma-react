import * as React from 'react';
// import * as PropTypes from 'prop-types';
import * as ClassName from 'classnames';
import * as validator from 'validator';

import { 
    CheckBoxGroupProps, CheckBoxStates, 
    RadioGroupProps, RadioStates, 
    InputProps, InputStates,
    Pair, DataStates
} from '../interfaces/IFormItem';

/*
export interface Process {
    stateChange(name: string, value: string | number, checked: boolean): void;
    genChildNode(): (JSX.Element | JSX.Element[]);
    validator(): boolean;
}

export function hoc<T>(component: React.Component<FormItem.InputProps<T>>, process: Process) {
    return class extends React.Component<FormItem.InputProps<T>> {
        state: FormItem.DataStates<T>;
        constructor(props: FormItem.InputProps<T>) {
            super(props);
            this.state = {value: props.value};
        }
        
        render() {
            let labelStyle = {
                width: this.props.labelWidth || '80px'
            };
            let wapperStyle = {
                marginLeft: this.props.labelWidth || '80px'
            };
            const checkList = process.genChildNode();
            
            return (
            <div className={ClassName('vma-form-item', {'is-required': this.props.required})}>
                <label className="vma-form-label" style={labelStyle}>{this.props.labelName}</label>
                <div className="vma-wapper" style={wapperStyle}>
                  {checkList}
                  {process.validator() && 
                  <div className="vma-form-item-error">请选择项目</div>
                  }
                </div>
             </div>
            );
        }
    };
}
*/   

interface ControlIF {
    stateChange(name: string, value: string | number, checked: boolean): void;
    genChildNode(): (JSX.Element | JSX.Element[]);
    validator(): boolean;
}

export class CheckBoxControl extends React.Component<CheckBoxGroupProps, CheckBoxStates> implements ControlIF {
    state: CheckBoxStates;

    constructor(props: CheckBoxGroupProps) {
        super(props);
        this.state = {value: props.value};
    }

    watchValue = (name: string, value: number|string, checked: boolean) => {
        this.stateChange(name, value, checked);
    }

    render() {
        let labelStyle = {
            width: this.props.labelWidth || '80px'
        };
        let wapperStyle = {
            marginLeft: this.props.labelWidth || '80px'
        };
        const checkList = this.genChildNode();
        
        return (
        <div className={ClassName('vma-form-item', {'is-required': this.props.required})}>
            <label className="vma-form-label" style={labelStyle}>{this.props.labelName}</label>
            <div className="vma-wapper" style={wapperStyle}>
              {checkList}
              {this.validator() && 
              <div className="vma-form-item-error">请至少选择一项</div>
              }
            </div>
         </div>
        );
    }

    validator = (): boolean => {
        return this.props.required === true && this.state.value !== undefined && this.state.value.length === 0;
    }

    checked(item: Pair<React.ReactText>): boolean {
        return this.state.value !== undefined && this.state.value.indexOf(item.value) !== -1;
    }

    genChildNode() {
        return this.props.valueRange.map((item, index) => {
            // tslint:disable-next-line:jsx-wrap-multiline
            return <Input 
                        key={index} 
                        type={this.props.type} 
                        name={this.props.name || ''} 
                        labelName={item.name} 
                        value={item.value} 
                        checked={this.checked(item)} 
                        disabled={item.disabled} 
                        watchValue={this.watchValue}
            />;
        });
    }

    stateChange(name: string, value: string | number, checked: boolean) {
        // tslint:disable-next-line:no-console
        console.log(`name:${name} value:${value} checked:${checked} state:${JSON.stringify(this.state.value)}`);
        let result: Array<string | number> = [];
        if (checked) {
            // let result = [...this.state.value, value];
            if (this.state.value !== undefined) {
                result = [...this.state.value, value];
            } else {
                result = [value];
            }
            this.setState({ value: result }, () => {
                if (this.props.watchValue && this.state.value !== undefined) {
                    this.props.watchValue(this.props.name || '', this.state.value, false);
                }
            });
        } else {
            // let result = [...this.state.value];
            if (this.state.value !== undefined) {
                result = [...this.state.value];
            }
            result.splice(result.indexOf(value), 1);
            this.setState({ value: result }, () => {
                if (this.props.watchValue && this.state.value !== undefined) {
                    this.props.watchValue(this.props.name || '', this.state.value, false);
                }
            });
        }
    }
}

export class RadioControl extends React.Component<RadioGroupProps, RadioStates> implements ControlIF {
    state: RadioStates;

    constructor(props: RadioGroupProps) {
        super(props);
        this.state = {value: props.value};
    }

    watchValue = (name: string, value: number|string, checked: boolean) => {
        this.stateChange(name, value, checked);
    }

    render() {
        let labelStyle = {
            width: this.props.labelWidth || '80px'
        };
        let wapperStyle = {
            marginLeft: this.props.labelWidth || '80px'
        };
        const checkList = this.genChildNode();
        
        return (
        <div className={ClassName('vma-form-item', {'is-required': this.props.required})}>
            <label className="vma-form-label" style={labelStyle}>{this.props.labelName}</label>
            <div className="vma-wapper" style={wapperStyle}>
              {checkList}
              {this.validator() && 
              <div className="vma-form-item-error">请选择一项</div>
              }
            </div>
         </div>
        );
    }

    validator = (): boolean => {
        return this.props.required === true && this.state.value === undefined;
    }

    checked(item: Pair<React.ReactText>): boolean {
        return this.state.value === item.value;
    }

    genChildNode() {
        return this.props.valueRange.map((item, index) => {
            // tslint:disable-next-line:jsx-wrap-multiline
            return <Input 
                        key={index} 
                        type={this.props.type} 
                        name={this.props.name || ''} 
                        labelName={item.name} 
                        value={item.value} 
                        checked={this.checked(item)} 
                        disabled={item.disabled} 
                        watchValue={this.watchValue}
            />;
        });
    }

    stateChange(name: string, value: string | number, checked: boolean) {
        this.setState({value: value}, () => {
            if (this.props.watchValue && this.state.value !== undefined) {
                this.props.watchValue(this.props.name || '', this.state.value, false);
            }
        });
    }
}

export class InputControl extends React.Component<InputProps, InputStates> implements ControlIF {
    state: RadioStates;
    errorMsg: string = '请提供数据';

    constructor(props: InputProps) {
        super(props);
        this.state = {value: props.value};
    }

    watchValue = (name: string, value: number|string, checked: boolean) => {
        this.stateChange(name, value, checked);
    }

    render() {
        let labelStyle = {
            width: this.props.labelWidth || '80px'
        };
        let wapperStyle = {
            marginLeft: this.props.labelWidth || '80px'
        };
        const checkList = this.genChildNode();
        
        return (
        <div className={ClassName('vma-form-item', {'is-required': this.props.required})}>
            <label className="vma-form-label" style={labelStyle}>{this.props.labelName}</label>
            <div className="vma-wapper" style={wapperStyle}>
              {checkList}
              {!this.validator() && 
              <div className="vma-form-item-error">{this.errorMsg}</div>
              }
            </div>
         </div>
        );
    }

    validator = (): boolean => {
        let valid: boolean = true;
        if (this.props.required !== true || this.state.value === undefined) {
            return valid;
        }
        switch (this.props.type) {
            case 'text':
            case 'textarea':
            if (typeof this.state.value === 'string') {
                valid = this.validText();            
            }
            break;
            case 'number':
                valid = this.validNumber();
                break;
            case 'email':
            if (typeof this.state.value === 'string') {
                valid = validator.isEmail(this.state.value);
                if (valid === false) {
                    this.errorMsg = '邮箱格式不正确';
                }                 
            }
            break;
        
            default:
                break;
        }
        return valid;
    }

    checked(item: Pair<React.ReactText>): boolean {
        return this.state.value === item.value;
    }

    genChildNode() {
        // tslint:disable-next-line:jsx-wrap-multiline
        return <Input 
                    type={this.props.type} 
                    name={this.props.name || ''} 
                    labelName={this.props.labelName} 
                    placeholder={this.props.placeholder}
                    value={this.props.value} 
                    disabled={this.props.disabled} 
                    readOnly={this.props.readOnly}
                    checked={false} 
                    rows={this.props.rows}
                    min={this.props.min}
                    max={this.props.max}
                    maxLength={this.props.maxLength}
                    accept={this.props.accept}
                    multiple={this.props.multiple}
                    watchValue={this.watchValue}
        />;
    }

    stateChange(name: string, value: string | number, checked: boolean) {
        this.setState({value: value}, () => {
            if (this.props.watchValue && this.state.value !== undefined) {
                this.props.watchValue(this.props.name || '', this.state.value, false);
            }
        });
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

    private validText() {
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
}
    
// tslint:disable-next-line:max-line-length
export class Input extends React.Component<InputProps> {
    checked: DataStates<boolean>;
    state: InputStates;

    constructor(props: InputProps) {
        super(props);
        this.checked = {value: this.props.checked || false};
    }

    onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (this.props.type === 'radio' || this.props.type === 'checkbox') {
            this.checked.value = event.target.checked;
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
                    this.props.watchValue(this.props.name || '', this.state.value, this.checked.value || false);
                }                    
            });
        } else {
            this.setState({value: event.target.value}, () => {
                if (this.props.watchValue && this.state.value !== undefined) {
                    this.props.watchValue(this.props.name || '', this.state.value, this.checked.value || false);
                }    
            });    
        }
    }

    onChangeTextArea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({value: event.target.value}, () => {
            if (this.props.watchValue && this.state.value !== undefined) {
                this.props.watchValue(this.props.name || '', this.state.value, this.checked.value || false);
            }    
        });
    }

    render() {
        switch (this.props.type) {
            case 'checkbox':
            case 'radio':
                return this.renderByCheckedInput();     
            case 'textarea':
                return this.renderForTextArea();
            case 'file':
                return this.renderForFile();
            default:
                return this.renderForInput();
        }
    }

    private renderByCheckedInput() {
        return (
            <label className={ClassName('vma-inline-label', {'is-disabled': this.props.disabled})}>
                <input 
                    type={this.props.type} 
                    name={this.props.name} 
                    value={this.props.value}
                    checked={this.checked.value}
                    disabled={this.props.disabled}
                    onChange={this.onChange}
                />
                <span>{this.props.labelName}</span>
            </label>
        );
    }

    private renderForInput() {
        return (
            <input 
                type={this.props.type} 
                className="vma-input" 
                placeholder={this.props.placeholder} 
                name={name} 
                value={this.props.value} 
                disabled={this.props.disabled}
                readOnly={this.props.readOnly}
                min={this.props.min}
                max={this.props.max}
                maxLength={this.props.maxLength}
                onChange={this.onChange}
            />
        );

    }

    private renderForFile() {
        return (
            <input 
                type={this.props.type} 
                className="vma-input" 
                placeholder={this.props.placeholder} 
                name={name} 
                value={this.props.value} 
                disabled={this.props.disabled}
                readOnly={this.props.readOnly}
                min={this.props.min}
                max={this.props.max}
                maxLength={this.props.maxLength}
                accept={this.props.accept}
                multiple={this.props.multiple}
                onChange={this.onChange}
            />
        );

    }

    private renderForTextArea() {
        return (
            <textarea 
                className="vma-area" 
                placeholder={this.props.placeholder} 
                name={name} 
                value={this.props.value} 
                disabled={this.props.disabled}
                rows={this.props.rows || 3}
                maxLength={this.props.maxLength}
                onChange={this.onChangeTextArea}
            />
        );

    }
}
