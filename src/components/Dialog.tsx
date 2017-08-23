import * as React from 'react';

class Dialog extends React.Component {
    render() {
        const showStyle = {
            display: 'none'
        };

        const closeStyle = {
            padding: 3,
            border: 'none'
        };

        const footerStyle = {
            textAlign: 'right',
            width: '100%',
            display: 'inline-block'
        };

        return (
            <div style={showStyle}>
            <div className="modal"/>
            <div className="dialog-wrapper">
              <div className="dialog dialog-large">
                <div className="dialog-header">
                    <span>提示</span>
                    <button className="btn pull-right" style={closeStyle}>&times;</button>
                </div>
                <div className="dialog-body">body</div>
                <div className="dialog-footer">
                  <span style={footerStyle}>
                  <div className="btn-group">
                    <button className="btn btn-default">取消</button><button className="btn btn-primary">确定</button>
                  </div>
                  </span>          
                </div>
              </div>
            </div>
          </div>
                );
    }
}

export default (Dialog);