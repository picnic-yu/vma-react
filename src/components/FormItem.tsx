import * as React from 'react';
import * as ClassName from 'classnames';
import { Validator } from './Base';

interface ParentProps {
    [prop: string]: number | Validator;
}

interface LabelProps {
    label?: string;
    width?: string;
    required?: boolean;
    readOnly?: boolean;
}

interface FormItemState<T> {
    value: T;
}

export class FormItem extends React.Component<LabelProps> {
    state: FormItemState<boolean> = {value: true};
    errorMsg: string = '请提供数据';
    render() {
        let { label, width = '100px' } = this.props;
        let marginLeft = width;
        let parentProps: ParentProps = {};
        if (this.props.required !== undefined) {
            Object.assign(parentProps, {required: this.props.required});
        }
        if (this.props.readOnly !== undefined) {
            Object.assign(parentProps, {readOnly: this.props.readOnly});
        }
        if (this.validator !== undefined) {
            Object.assign(parentProps, {validator: this.validator});
        }
        let children = React.Children.map(this.props.children, (child) => {
            if (typeof child === 'string' || typeof child  === 'number') {
                return child;
            } else {
                return React.cloneElement(
                    child,
                    parentProps
                );                
            }
        });

        return (
        <div 
            className={ClassName(
                'vma-form-item', 
                {'is-required': this.props.required}, 
                {'vma-form-item-error': !this.state.value})}
        >
            <label className="vma-form-label" style={{width}}>{label}</label>
            <div className={ClassName('vma-wapper')} style={{marginLeft}}>
              {children}
              {!this.state.value && 
              <div className="vma-form-item-error">{this.errorMsg}</div>
              }
            </div>
        </div>
        );
    }

    validator: Validator = (
        name: string, 
        value: string|string[]|number|undefined, 
        valid: boolean, 
        errorMsg: string) => {
        // tslint:disable-next-line:no-console
        console.log('name:' + name + ' value:' + value + ' valid:' + valid);
        this.errorMsg = errorMsg;
        this.setState({value: valid});
    }
}
