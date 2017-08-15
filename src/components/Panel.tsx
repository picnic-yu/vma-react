import * as React from 'react';

class Panel extends React.Component {
    render() {
        return (
            <div className="panel panel-default">
            <div className="panel-header">
              <span>面板标题</span>
            </div>
            <div className="panel-body">
              <p>面板正文</p>
            </div>
          </div>
                );
    }
}

export default (Panel);