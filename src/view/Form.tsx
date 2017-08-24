import * as React from 'react';
import Button from '../components/Button';
import ButtonGroup from '../components/ButtonGroup';
import Input from '../components/Input';
import RadioGroup from '../components/RadioGroup';
import CheckBox from '../components/CheckBox';
import TextArea from '../components/TextArea';
import Select from '../components/Select';
import Option from '../components/Option';
import Tag from '../components/Tag';
import { FormItem, FormItemState } from '../components/FormItem';
import Dialog from '../components/Dialog';
import Panel from '../components/Panel';

interface FormData {
    companyName: string;
    companyInfo: string;
    companyCode: number;
    [index: string]: string|number;
  }

const logo = require('../logo.svg');
class Form extends React.Component<{}, FormData> {
    constructor(props: {}, data: FormData) {
        super();
        this.state = data;
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleClick(e: MouseEvent) {
        e.preventDefault();
        // tslint:disable-next-line:no-console
        console.log('handleChange:' + e.type);
    }
    
    handleChange(name: string, value: string|number) {
        // tslint:disable-next-line:no-console
        console.log(name + ':' + value);
        if (name.length !== 0) {
          let data = {};
          data[name] = value;
          this.setState(data, () => {
            // tslint:disable-next-line:no-console
            console.log(this.state);
          });
        }
    }
    
    onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // tslint:disable-next-line:no-console
        console.log(e.target.value);
    }
    
    watchValue = (data: FormItemState) => {
        // tslint:disable-next-line:no-console
        console.log(data.value);
    }

    render() {
    const classStyle = {
      borderBottom: '1px solid #ddd'
    };
    return (
        <div>
            <div className="App App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h2>Welcome to React</h2>
            </div>
            <p className="App App-intro">
              To get started, edit <code>src/App.tsx</code> and save to reload.
            </p>
            <h3 style={classStyle}>蒙图层类</h3>
            <Dialog/>
            <h3 style={classStyle}>面板类</h3>
            <div className="row-24">
              <Panel/>
            </div>
            <h3 style={classStyle}>标签类</h3>
            <div style={{marginBottom: 14}}>
              <Tag prompt="标签1" icon="cross"/>
              <Tag prompt="标签2" icon="cross"/>
              <Tag prompt="标签3" icon="cross"/>
            </div>
            <h3 style={classStyle}>按钮类</h3>
            <ButtonGroup>
            <Button type="btn-default" disabled={true}>取消</Button>
            <Button type="btn-primary" handler={this.handleClick}>确认</Button>
            </ButtonGroup>
            <h3 style={classStyle}>输入类</h3>
            <FormItem 
              className="col-24 btn btn-default" 
              labelName="测试" 
              required={true}
              onChange={this.onchange} 
              watchValue={this.watchValue} 
            />
            <Button type="btn-primary" handler={this.handleClick}>确认</Button>
            <h3 style={classStyle}>表单类</h3>
            <form className="col-12 col-offset-6">
            <Input 
              type="text" 
              prompt="文本" 
              placeholder="请输入公司名称" 
              isRequire={true}  
              name="companyName" 
              value={this.state.companyName} 
              handler={this.handleChange}
            />
            <Input type="email" prompt="邮箱" />
            <Input 
              type="number" 
              prompt="数字密码" 
              name="companycode" 
              value={this.state.companyCode} 
              handler={this.handleChange}
            />
            <RadioGroup prompt="输入项" isRequire={true}>
              <CheckBox type="checkbox" name="test" prompt="选择项目" value="0"/>
              <CheckBox type="checkbox" name="test" prompt="选择项目" value="1" disabled={true}/>
              <CheckBox type="checkbox" name="test" prompt="选择项目" value="2"/>
            </RadioGroup>
            <RadioGroup prompt="输入项">
              <CheckBox type="radio" name="test" prompt="选择项目" value="0"/>
              <CheckBox type="radio" name="test" prompt="选择项目" value="1" disabled={true}/>
              <CheckBox type="radio" name="test" prompt="选择项目" value="2"/>
            </RadioGroup>
            <TextArea 
              prompt="输入项" 
              isRequire={true} 
              name="companyInfo" 
              value={this.state.companyInfo} 
              handler={this.handleChange}
            />
            <Select prompt="输入项" isRequire={true} disabled={false}>
              <Option name="请选择" value=""/>
              <Option name="选择项1" value="1"/>
              <Option name="选择项2" value="2"/>
              <Option name="选择项3" value="3"/>
            </Select>
            <ButtonGroup>
            <Button type="btn-default" disabled={true}>取消</Button>
            <Button type="btn-primary" handler={this.handleClick}>确认</Button>
            </ButtonGroup>
            </form>
        </div>
               
        );
    }
}

export default Form;