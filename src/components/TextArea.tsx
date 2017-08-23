import * as React from 'react';
interface Data {
    name?: string;
    value?: string;
    prompt: string;
    placeholder?: string;
    disabled?: boolean;
    isRequire?: boolean;
    row?:number;
    handler?(name: string, value: string|number): void;
}
class TextArea extends React.Component<Data> {
    state = {value: ''};
    constructor(props: Data) {
        super(props);
        if (props.value === undefined) {
            this.state.value = '';
        } else {
            this.state.value = props.value;            
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        // tslint:disable-next-line:no-console
        console.log(event.target.value);
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
        let className = 'vma-form-item ';
        if (this.props.isRequire) {
            className += 'is-required';
        }
        return (
        <div className={className}>
            <label className="vma-form-label" style={{width: 80}}>{this.props.prompt}</label>
            <div className="vma-wapper" style={{marginLeft: 80}}>
                <textarea 
                    className="vma-area"
                    rows={this.props.row}
                    name={this.props.name} 
                    value={this.state.value} 
                    onChange={this.handleChange}
                />
                {this.props.isRequire && 
                <div className="vma-form-item-error">请输入备注</div>
                }
            </div>
        </div>
              );
    }
}

export default (TextArea);