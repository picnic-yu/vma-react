import * as React from 'react';

import CheckBox from './CheckBox';

interface Pair {
    label: string;
    value: number|string;
    disabled?: boolean;
    readOnly?: boolean;    
}
interface RenderProps {
    prompt: string;
    name: string;
    options: Array<Pair>;
}
interface RenderState {
    isRequire?: boolean;
    disabled?: boolean;
    readOnly?: boolean;    
}

interface DataState {
    // tslint:disable-next-line:no-any
    value: Array<number|string>;
}
class RadioGroup extends React.Component<RenderProps & RenderState & DataState, DataState> {
    state: RenderState & DataState;
    constructor(props: RenderProps & RenderState & DataState) {
        super(props);
        this.state = {
            isRequire: props.isRequire, 
            disabled: props.disabled, 
            readOnly: props.readOnly, 
            value: props.value
        };
    }

    handle = (name: string, value: string|number, checked: boolean) => {
        if (checked) {
            let result = [...this.state.value, value];
            this.setState({value: result});
        } else {
            let result = [...this.state.value];
            result.splice(result.indexOf(value), 1);
            this.setState({value: result});
        }
    }

    validator = () => {
        return this.props.isRequire && this.state.value.length === 0;
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
        const checkList = this.props.options.map((item, index) => {
            // tslint:disable-next-line:jsx-wrap-multiline
            return <CheckBox 
                key={index} 
                type="checkbox" 
                name={this.props.name} 
                prompt={item.label} 
                value={item.value} 
                checked={this.state.value.indexOf(item.value) !== -1}
                disabled={item.disabled}
                handler={this.handle}
            />;
        }
        );
        
        return (
        <div className={className}>
            <label className="vma-form-label" style={labelStyle}>{this.props.prompt}</label>
            <div className="vma-wapper" style={wapperStyle}>
              {checkList}
              {this.validator() && 
              <div className="vma-form-item-error">请选择项目</div>
              }
            </div>
         </div>
        );
    }
}

export default (RadioGroup);