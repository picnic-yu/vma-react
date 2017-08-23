import * as React from 'react';

class DropMenu extends React.Component {
    state = {  };
    render() {
        return (
        <div className="pull-right">
            <ul className="notifyBar">
                <li>
                    <a href="" className="notify notify-grey">
                        <span className="notifyMsg">代办</span>
                        <span className="notifyNumber">5</span>
                    </a>
                    <ul className="drop-menu">
                        <li><a href="">下拉1</a></li>
                        <li><a href="">下拉2</a></li>
                        <li><a href="">下拉3</a></li>
                    </ul>
                </li>
                <li>
                    <a href="" className="notify notify-orange">
                        <span className="notifyMsg">通知</span>
                        <span className="notifyNumber">5</span>
                    </a>
                    <ul className="drop-menu">
                        <li><a href="">下拉5</a></li>
                        <li><a href="">下拉6</a></li>
                        <li><a href="">下拉7</a></li>
                    </ul>
                </li>
                <li>
                    <a href="" className="notify notify-purple">
                        <span className="notifyMsg">邮件</span>
                        <span className="notifyNumber">5</span>
                    </a>
                    <ul className="drop-menu">
                        <li><a href="">下拉8</a></li>
                        <li><a href="">下拉9</a></li>
                        <li><a href="">下拉10</a></li>
                    </ul>
                </li>
                <li>
                    <a href="" className="notify notify-green">
                        <span className="notifyMsg">帐号</span>
                        <span className="notifyNumber">5</span>
                    </a>
                    <ul className="drop-menu">
                        <li><a href="">下拉11</a></li>
                        <li><a href="">下拉12</a></li>
                        <li><a href="">下拉13</a></li>
                    </ul>
                </li>
            </ul>
        </div>
                  
        );
    }
}

export default DropMenu;