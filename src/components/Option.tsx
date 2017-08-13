import * as React from 'react';
interface Data {
    type?: string;
    name: string;
    value: string;
    prompt?: string;
    placeholder?: string;
    disabled?: boolean;
    isRequire?: boolean;
    handler?(): void;
}
class Option extends React.Component<Data> {
    state = {  };
    constructor(props: Data) {
        super(props);
    }
    render() {
        return (
            <option value={this.props.value}>{this.props.name}</option>
        );
    }
}

export default (Option);