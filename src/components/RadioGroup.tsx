import * as React from 'react';

interface Data {
    prompt: string;
    isRequire?: boolean;
    disabled?: boolean;
}

class RadioGroup extends React.Component<Data> {
    state = {  };
    constructor(props: Data) {
        super(props);
    }
    render() {
        let className = 'vma-form-item ';
        if (this.props.isRequire) {
            className += 'is-required';
        }
        let labelStyle = {
            width: '80px'
        };
        let wapperStyle = {
            marginLeft: '80px'
        };
        return (
        <div className={className}>
            <label className="vma-form-label" style={labelStyle}>{this.props.prompt}</label>
            <div className="vma-wapper" style={wapperStyle}>
              {this.props.children}
              {this.props.isRequire && 
              <div className="vma-form-item-error">请选择项目</div>
              }
            </div>
         </div>
        );
    }
}

export default (RadioGroup);