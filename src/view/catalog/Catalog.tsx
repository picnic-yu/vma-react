import * as React from 'react';
import { 
    FormItem, Input, 
    TextArea, CheckBoxGroup, 
    RadioGroup, 
    Button, ButtonGroup,
    Select, Option,
    Tag
} from '../../components/index';

import { Calendar } from '../../components/Calendar';

class Catalog extends React.Component {
    render() {
        const classStyle = {
            borderBottom: '1px solid #ddd'
          };
        
        return (
            <div>
                <p>catalog infor</p>
                <div>
                    <h3 style={classStyle}>新版V2表单类</h3>
                    <form className="col-12 col-offset-6">
                        <FormItem label="日期选择" required={true}>
                            <Calendar name="testDate"/>
                        </FormItem>
                        <FormItem required={true} label="多行控件">
                            <TextArea name="testControl7" placeholder="请输入" minLength={2} maxLength={10} value="我是描述"/>
                        </FormItem>
                        <FormItem label="多选框" required={true}>
                            <CheckBoxGroup
                                name="checkbox1"
                                options={[
                                {label: 'testControl0', value: 0}, 
                                {label: 'testControl1', value: 1}, 
                                {label: 'testControl2', value: 2, disabled: true}]}
                                value={[0, 1]}
                            />
                        </FormItem>
                        <FormItem label="多选框" required={true} readOnly={true}>
                            <CheckBoxGroup
                                name="checkbox2"
                                options={[
                                {label: 'testControl0', value: 0}, 
                                {label: 'testControl1', value: 1}, 
                                {label: 'testControl2', value: 2, disabled: true}]}
                                value={[0, 1]}
                            />
                        </FormItem>
                        <FormItem label="单选框" required={true} readOnly={false}>
                            <RadioGroup 
                                name="radio2"
                                disabled={false}
                                options={[
                                {label: 'testControl0', value: 0}, 
                                {label: 'testControl1', value: 1}, 
                                {label: 'testControl2', value: 2, disabled: true}]}
                                value={2}
                            />
                        </FormItem>
                        <FormItem label="单选框" required={true} readOnly={true}>
                            <RadioGroup 
                                name="radio1"
                                disabled={false}
                                options={[
                                {label: 'testControl0', value: 0}, 
                                {label: 'testControl1', value: 1}, 
                                {label: 'testControl2', value: 2, disabled: true}]}
                                value={1}
                            />
                        </FormItem>
                        <FormItem label="文本输入" required={true}>
                            <Input type="text" name="input1" placeholder="请输入公司名称" min={2} value="中国"/>
                        </FormItem>
                        <FormItem label="邮箱输入" required={true}>
                            <Input type="email" name="input2" placeholder="请输入工作邮箱" min={2}/>
                        </FormItem>
                        <FormItem label="数字输入" required={true}>
                            <Input type="number" name="input3" placeholder="请输入工龄" max={20}/>
                        </FormItem>
                        <FormItem label="文本输入" required={true}>
                            <Input 
                                type="text"
                                name="input4"
                                placeholder="请输入公司名称"
                                min={2} 
                                readOnly={true} 
                                value="测试一下只读模式"
                            />
                        </FormItem>
                        <FormItem label="时间选择" required={true}>
                            <Input type="datetime-local" name="input5" placeholder="请选择时间" min={2}/>
                        </FormItem>
                        <FormItem label="下拉框" required={true}>
                            <Select
                                name="select1"
                                multiple={false}
                                options={[
                                {label: 'testControl0', value: 0}, 
                                {label: 'testControl1', value: 1}, 
                                {label: 'testControl2', value: 2}]}
                                value={1}
                            >
                                <Option label="请选择" value=""/>
                            </Select>
                        </FormItem>
                        <FormItem>
                            <Tag label="标签" icon="cross"/>
                            <Tag label="标签1" />
                        </FormItem>
                        <FormItem>
                            <Button>按钮</Button>
                        </FormItem>
                        <FormItem>
                            <ButtonGroup>
                                <Button>注册</Button>
                                <Button>登录</Button>
                                <Button>忘记密码</Button>
                            </ButtonGroup>
                        </FormItem>
                    </form>
                </div>
            </div>
        );
    }
}

export default Catalog;