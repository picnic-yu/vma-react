import * as React from 'react';
// import * as PropTypes from 'prop-types';
import * as ClassName from 'classnames';

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
              <div className="vma-form-item-error">请选择项目</div>
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
            this.setState({ value: result });
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
              <div className="vma-form-item-error">请选择项目</div>
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
              {this.validator() && 
              <div className="vma-form-item-error">请选择项目</div>
              }
            </div>
         </div>
        );
    }

    validator = (): boolean => {
        return this.props.required === true && (this.state.value === undefined || 
            (typeof this.state.value === 'string' && this.state.value.length === 0));
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
                    checked={false} 
                    rows={this.props.rows}
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
            // tslint:disable-next-line:no-console
            console.log(this.props.value + ' is checked:' + event.target.checked);
        }   
        this.checked.value = event.target.checked;
        this.setState({value: event.target.value}, () => {
            if (this.props.watchValue && this.state.value !== undefined) {
                this.props.watchValue(this.props.name || '', this.state.value, this.checked.value || false);
            }    
        });
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
                onChange={this.onChangeTextArea}
            />
        );

    }
}
