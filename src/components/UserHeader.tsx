import * as React from 'react';
import DropMenu from '../view/layout/DropMenu';

class UserHeader extends React.Component {
    state = {  };
    render() {
        let companyName = 'xxxx';        
        return (
            <nav className="header">
            <div className="header-container">
                <div className="pull-left">
                    <a className="brand" href="">{companyName}</a>
                </div>
                <DropMenu/>
            </div>
        </nav>
    );
    }
}

export default UserHeader;