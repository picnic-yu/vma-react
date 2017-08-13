import * as React from 'react';

interface EventHandler {
    (event: {}): void;
}
interface Data {
    type: string;
    disabled?: boolean;
    handler?: EventHandler;
}
class Button extends React.Component<Data> {
    state = {  };
    constructor(props: Data) {
        super(props);
    }
    render() {
        let value = `btn ${this.props.type}`;
        return (
            <button 
                className={value} 
                disabled={this.props.disabled} 
                onClick={this.props.handler}
            >
                {this.props.children}
            </button>
        );
    }
}

export default (Button);