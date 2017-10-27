import * as React from 'react';
import './App.css';
import './assets/icomoon/style.css';

export default class Demo extends React.Component {
    render() {
        return (
        <div className="container">
        <div className="sider">
        <ul className="menu">
            <li className="active">
                <a href="#">菜单<i className="arrow icon-circle-down"/></a>
                <ul className="sub-menu">
                    <li><a href="#">菜单</a></li>
                    <li><a href="#">menu12</a></li>
                    <li><a href="#">菜单</a></li>
                </ul>
            </li>
            <li><a href="#">菜单</a></li>
            <li><a href="#">菜单</a></li>
            <li><a href="#">菜单</a></li>
            <li><a href="#">菜单</a></li>
        </ul></div></div>);
    }
}