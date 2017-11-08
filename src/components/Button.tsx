import * as React from 'react';
import * as ClassName from 'classnames';
import { Validator } from './Base';

interface ButtonProps {
    disabled?: boolean;
    validator?: Validator;
}

export class Button extends React.Component<ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>> {
    render() {
        let { className = 'btn', disabled, validator, children, ...others} = this.props;
        return (
        <button className={className} disabled={disabled} {...others}>
            {children}
        </button>
    );
    }
}

export class ButtonGroup extends React.Component<ButtonProps & React.HTMLAttributes<HTMLDivElement>> {
    render() {
        const { className, validator, children, ...others} = this.props;
        return (
        <div className={ClassName('btn-group', className)} {...others}>
            {children}
        </div>
        );
    }
}
