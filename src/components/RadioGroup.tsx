import * as React from 'react';
import * as ClassName from 'classnames';

import CheckBox from './CheckBox';

interface Pair {
    label: string;
    value: number|string;
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
    value: number|string;
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

    render() {
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
                type="radio" 
                name={this.props.name} 
                prompt={item.label} 
                value={item.value} 
                checked={this.checked(item)}
                disabled={this.state.disabled}
                handler={this.watchValue}
            />;
        }
        );
        
        return (
        <div className={ClassName('vma-form-item', {'is-required': this.props.isRequire})}>
            <label className="vma-form-label" style={labelStyle}>{this.props.prompt}</label>
            <div className="vma-wapper" style={wapperStyle}>
              {checkList}
              {this.props.isRequire && 
              <div className="vma-form-item-error">请选择项目</div>
              }
            </div>
         </div>
        );
    }

    private watchValue = (name: string, value: string|number, checked: boolean) => {
        this.setState({value});
    }

    private checked(item: Pair): boolean | undefined {
        return this.state.value === item.value;
    }
}

export default (RadioGroup);