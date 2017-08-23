import * as React from 'react';

interface Data {
    prompt: string;
    isRequire?: boolean;
    disabled?: boolean;
    onChange?: React.ChangeEvent<HTMLSelectElement>;
}

class Select extends React.Component<Data> {
    state = {  };
    constructor(props: Data) {
        super(props);
    }

    onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        // tslint:disable-next-line:no-console
        console.log(e.target.value);
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
                <select className="vma-input" disabled={this.props.disabled} onChange={this.onChange}>
                  {this.props.children}
                </select>
              {this.props.isRequire && 
              <div className="vma-form-item-error">请选择项目</div>
              }
            </div>
         </div>
        );
    }
}

export default (Select);