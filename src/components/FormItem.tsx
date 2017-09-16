import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as ClassName from 'classnames';

export type InputType = 'text' | 'email' | 'number';
export type WatchHandler = (value: FormItemState) => void;
export interface FormItemProps {
    type?: InputType;
    className: string;
    labelName: string;
    placeholder?: string;
    name?: string;
    value?: string|number;
    style?: React.CSSProperties;
    labelWidth?: number;
    disabled?: boolean;
    required?: boolean;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onSelect?: React.SyntheticEvent<HTMLSelectElement>;
    onClick?: React.MouseEvent<HTMLButtonElement>;
    watchValue?: WatchHandler;
}

export interface FormItemState {
    value: string|number;
}

export class FormItem extends React.Component<FormItemProps, FormItemState> {
    static propTypes = {
        type: PropTypes.oneOf(['text', 'email']),
        className: PropTypes.string,
        placeholder: PropTypes.string,
        disabled: PropTypes.bool,
        required: PropTypes.bool,
        name: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        onChange: PropTypes.func,
        onSelect: PropTypes.func,
        onClick: PropTypes.func,
        watchValue: PropTypes.func,
        permit: PropTypes.arrayOf(PropTypes.shape({
            url: PropTypes.string,
            oper: PropTypes.arrayOf(PropTypes.string)
        }))
    };
    static defaultProps = {
        type: 'text',
        labelWidth: 80,
        disabled: false,
        required: false,
        placeholder: '',
        name: ''
    };
    state: FormItemState;
    
    constructor(props: FormItemProps) {
        super(props);
        if (props.value) {
            this.state = {value: props.value};
        } else {
            this.state = {value: ''};
        }
    }

    onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // tslint:disable-next-line:no-console
        console.log(e.target.value);
        let { onChange, watchValue } = this.props;
        e.persist();
        
        this.setState({value: e.target.value}, () => {
            if (onChange) {
                onChange(e);
            }
            if (watchValue) {
                watchValue(this.state);
            }
        });
    }

    render() {
        let {type, labelName, name, value, labelWidth, disabled, required, placeholder} = this.props; 
        const labelStyle = {
            width: labelWidth
        };
        const inputStyle = {
            marginLeft: labelWidth
        };
        return (
        <div className={ClassName('vma-form-item', {'is-required': required})}>
            <label className="vma-form-label" style={labelStyle}>{labelName}</label>
            <div className="vma-wapper" style={inputStyle}>
                <input 
                    type={type} 
                    className="vma-input" 
                    placeholder={placeholder} 
                    name={name} 
                    value={value} 
                    disabled={disabled}
                    onChange={this.onchange}
                />
                {required && 
                <div className="vma-form-item-error">输入格式错误</div>
                }
            </div>
        </div>
    );
    }
}
