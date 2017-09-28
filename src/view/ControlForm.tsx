import * as React from 'react';

import { CheckBoxControl, RadioControl, InputControl } from '../components/Control';

class Form extends React.Component {

    observeForm = (name: string, value: string|number|Array<number|string>, checked: boolean) => {
      // tslint:disable-next-line:no-console
      console.log(name + ':' + value);
    }
    
    render() {
    const classStyle = {
      borderBottom: '1px solid #ddd'
    };
    return (
      <div>
        <h3 style={classStyle}>新版表单类</h3>
        <form className="col-12 col-offset-6">
          <CheckBoxControl 
            type="checkbox"
            name="testControl0" 
            labelName="多选控件"
            valueRange={
                [
                  {name: '选择项目0', value: 0}, 
                  {name: '选择项目1', value: 1}, 
                  {name: '选择项目2', value: 2, disabled: false}
                ]
              } 
            value={[1, 2]}
            required={true}
            labelWidth="100px"
            watchValue={this.observeForm}
          />
          <RadioControl 
            type="radio"
            name="testControl1" 
            labelName="单选控件"
            valueRange={
                [
                  {name: '选择项目0', value: 0}, 
                  {name: '选择项目1', value: 1}, 
                  {name: '选择项目2', value: 2, disabled: false}
                ]
              } 
            required={true}
            labelWidth="100px"
            watchValue={this.observeForm}
          />
          <CheckBoxControl 
            type="checkbox"
            name="testControl0" 
            labelName="多选控件"
            valueRange={
                [
                  {name: '选择项目0', value: 0}, 
                  {name: '选择项目1', value: 1}, 
                  {name: '选择项目2', value: 2, disabled: false}
                ]
              } 
            value={[1, 2]}
            required={true}
            labelWidth="100px"
            watchValue={this.observeForm}
          />
          <InputControl 
            type="text" 
            name="testControl2" 
            labelName="单行控件" 
            placeholder="请输入" 
            required={true}
            labelWidth="100px"
            watchValue={this.observeForm}
          />
          <InputControl 
            type="textarea" 
            name="testControl3" 
            labelName="多行控件" 
            placeholder="请输入" 
            required={true}
            labelWidth="100px"
            watchValue={this.observeForm}
          />
        </form>
        </div>
               
        );
    }
}

export default Form;