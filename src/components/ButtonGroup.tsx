import * as React from 'react';

class ButtonGroup extends React.Component {
    state = {  };
    render() {
        return (
        <div className="btn-group">
            {this.props.children}
        </div>
        );
    }
}

export default (ButtonGroup);