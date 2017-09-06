import * as React from 'react';
import * as ClassName from 'classnames';

interface Data {
    type: string;
    name?: string;
    value?: string|number;
    prompt: string;
    placeholder?: string;
    disabled?: boolean;
    isRequire?: boolean;
    handler?(name: string, value: string|number): void;
}
class Input extends React.Component<Data> {
    state = {value: ''};
    constructor(props: Data) {
        super(props);
        if (props.value === undefined) {
            this.state.value = '';
        } else {
            this.state.value = props.value.toString();            
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({value: event.target.value});
        if (this.props.handler !== undefined) {
            if (this.props.name !== undefined) {
                this.props.handler(this.props.name, event.target.value);                
            } else {
                this.props.handler('', event.target.value);
            }
        }
    }
    render() {
        return (
        <div className={ClassName('vma-form-item', {'is-required': this.props.isRequire})}>
            <label 
                className="vma-form-label" 
                style={{width: '80px'}}
            >{this.props.prompt}
            </label>
            <div className="vma-wapper" style={{marginLeft: '80px'}}>
                <input 
                    type={this.props.type} 
                    className="vma-input" 
                    placeholder={this.props.placeholder} 
                    name={this.props.name} 
                    value={this.state.value} 
                    onChange={this.handleChange}
                />
                {this.props.isRequire && 
                <div className="vma-form-item-error">输入格式错误</div>
                }
            </div>
        </div>
        );
    }
}

export default (Input);