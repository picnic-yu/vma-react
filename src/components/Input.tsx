import * as React from 'react';

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
        const labelStyle = {
            width: '80px'
        };
        const inputStyle = {
            marginLeft: '80px'
        };
        let className = 'vma-form-item ';
        if (this.props.isRequire) {
            className += 'is-required';
        }
        return (
            <div className={className}>
                <label className="vma-form-label" style={labelStyle}>{this.props.prompt}</label>
                <div className="vma-wapper" style={inputStyle}>
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