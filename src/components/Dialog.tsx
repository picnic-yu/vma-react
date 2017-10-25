import * as React from 'react';
import { Button, ButtonGroup } from './Button';

interface DialogProps {
    title?: string;
    body?: React.ReactNode;
    show?: boolean;
}

interface DialogState {
    show?: boolean;
    agree?: boolean;
}
class Dialog extends React.Component<DialogProps & React.HtmlHTMLAttributes<HTMLDivElement>, DialogState> {
    state: DialogState;
    constructor(props: DialogProps) {
        super(props);
        this.state = {show: true};
    }

    render() {
        console.log(JSON.stringify(this.state));
        const { title = '温馨提示', body = ''} = this.props;
        let { show }  = this.state; 
        return (
        show ? (
        <div>
            <div className="modal"/>
                <div className="dialog-wrapper">
                    <div className="dialog dialog-large">
                        <div className="dialog-header">
                            <span>{title}</span>
                            <Button className="btn pull-right dialog-close" onClick={this.close}>&times;</Button>
                        </div>
                <div className="dialog-body">
                    {body}
                </div>
                <div className="dialog-footer">
                    <span className="dialog-toolbar">
                        <ButtonGroup>
                            <Button className="btn btn-default" onClick={this.close}>取消</Button>
                            <Button className="btn btn-primary" onClick={this.agree}>确定</Button>
                        </ButtonGroup>
                    </span>          
                </div>
              </div>
            </div>
        </div>
        ) : (
            null
        )
        );
    }

    close = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log('cancle');
        this.setState({show: false, agree: false});
    }

    agree = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log('agree');
        this.setState({show: false, agree: true});
    }
}

export default (Dialog);