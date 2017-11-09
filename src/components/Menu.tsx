import * as React from 'react';
import * as ClassName from 'classnames';
import { connect, MapDispatchToPropsParam } from 'react-redux';

import { RouteComponentProps, withRouter } from 'react-router-dom';
import * as ConfigAction from '../redux/actions/config/ConfigAction';

interface MenuNode {
    name: string;
    items?: Array<MenuNode>;
    disabled?: boolean;
    mark?: string;
}

interface CloneNode {
    marks: Array<string>;
    items: Array<MenuNode>;
}
interface MenuProps {
    name: string;
    items?: Array<MenuNode>;
    mark?: string;
    disabled?: boolean;
    notify?: (isMenuTitle: boolean, curMark?: string) => void;
    isMenuTitle?: boolean;
    curMark?: string;
    activeMenu?: string;
}

interface SideMenuState {
    items?: Array<MenuNode>;
    marks: Array<string>;
    isMenuTitle?: boolean;
    curMark?: string;
    activeMenu?: string;
}
    
interface ViewHandle {
    refresh: (activeMenuURL: string) => void;
}

const mapDispatchToPropsParam: MapDispatchToPropsParam<ViewHandle, {}> = (dispatch) => {
    return {
        refresh: (activeMenuURL: string) => dispatch(ConfigAction.activeMenuRefresh(activeMenuURL)),
    };
};

class SiderMenu extends React.Component<MenuNode & RouteComponentProps<{}> & ViewHandle, SideMenuState> {
    state: SideMenuState;
    constructor(props: MenuNode & RouteComponentProps<{}> & ViewHandle) {
        super(props);
        this.state = {...this.marks('', this.props.items)};
    }

    render() {
        let { mark= '', ...others} = {...this.props, ...this.state};
        return <Menu mark={mark} {...others} notify={this.notify}/>;
    }

    notify = (isMenuTitle: boolean, curMark?: string) => {
        if (isMenuTitle) {
            this.setState({isMenuTitle: isMenuTitle, curMark: curMark});            
        } else {
            this.setState({isMenuTitle: isMenuTitle, curMark: curMark, activeMenu: curMark}, () => {
                this.props.refresh('/company/audit');
                this.props.history.push('/company/audit');
            });            
        }
    }

    private marks(parentMark: string, items?: Array<MenuNode>): CloneNode {
        let marks: Array<string> = [];
        let root: Array<MenuNode> = [];
        if (items !== undefined) {
            items.forEach((item, index) => {
                let mark: string = parentMark === '' ? `${index}` : `${parentMark}.${index}`;
                item.mark = mark;
                marks.push(mark);
                if (item.items !== undefined) {
                    let childs = this.marks(mark, item.items);
                    marks = [...marks, ...childs.marks];
                }
                root.push(Object.assign({}, item));
            });
        }
        return {marks, items: root};
    }
}

export const RouteMenu = withRouter<MenuNode>(
        connect<{}, ViewHandle, MenuNode & RouteComponentProps<{}>>(null, mapDispatchToPropsParam)(SiderMenu));

interface MenuState {
    show: boolean;
}
export class Menu extends React.Component<MenuProps, MenuState> {
    state: MenuState = {show: false};
    render(): JSX.Element {
        let { items } = this.props;
        return (
            <ul className="vma-menu">
                {items !== undefined &&  
                    items.map((item, index) => {
                        let key = item.mark;
                        if (item.items !== undefined) {
                            let toggle = this.toggle(key);
                            return (
                                <li 
                                    key={key} 
                                    className={ClassName('vma-menu-node', {'vma-menu-item-disabled': item.disabled})} 
                                    onClick={item.disabled === true ? undefined : e => this.selectedMenu(e, true, key)}
                                >
                                    <div 
                                        className={ClassName('vma-menu-title')} 
                                        style={{paddingLeft: `${this.indent(key)}px`}}
                                    >
                                        {item.name}
                                        <i 
                                            className={ClassName(
                                                'arrow', 
                                                toggle ? 'icon-circle-down' : 'icon-circle-right')}
                                        />                    
                                    </div>
                                    {toggle && 
                                        <Menu 
                                            {...item} 
                                            mark={key} 
                                            curMark={this.props.curMark} 
                                            isMenuTitle={this.props.isMenuTitle}
                                            activeMenu={this.props.activeMenu}
                                            notify={this.props.notify}
                                        />
                                    }
                                </li>);        
                        } else {
                            return (
                                <li 
                                    className={ClassName(
                                        'vma-menu-item', 
                                        {'vma-menu-item-active': this.isActive(key)},
                                        {'vma-menu-item-disabled': item.disabled}
                                    )} 
                                    key={item.mark}
                                    style={{paddingLeft: `${this.indent(key)}px`}} 
                                    onClick={item.disabled === true ? undefined : e => this.selectedMenu(e, false, key)}
                                >
                                    <div>{item.name}</div>
                                </li>);                            
                        }
                    })
                }
            </ul>
        );
    }

    toggle = (mark?: string): boolean => {
        let result: boolean = false;
        result = this.path(mark);
        if (result && this.state.show === true) {
            result = false;
        }
        if (mark !== undefined && this.props.activeMenu !== undefined) {
            if (String.prototype.startsWith && this.props.activeMenu.startsWith(mark) ||
                this.props.activeMenu.indexOf(mark) === 0
            ) {
                result = true;
            }
        }
        return result;
    }

    selectedMenu = (event: React.MouseEvent<HTMLLIElement>, isMenuTitle: boolean, curMark?: string) => {
        event.stopPropagation();
        if (this.path(curMark)) {
            this.setState({show: !this.state.show});
        } else {
            this.setState({show: false});            
        }
        if (this.props.notify !== undefined) {
            this.props.notify(isMenuTitle, curMark);
        }
    }

    private path = (mark?: string): boolean => {
        let result: boolean = false;
        if (mark === undefined) {
            mark = '';
        }
        if (this.props.curMark !== undefined) {
            result = String.prototype.startsWith && this.props.curMark.startsWith(mark) || 
            this.props.curMark.indexOf(mark) === 0;
        }
        return result;
    }

    private indent = (curMark?: string): number => {
        let indent = 28;
        if (curMark === undefined) {
            return 1 * indent;
        } else {
            return curMark.split('.').length * indent;
        }
    }

    private isActive = (mark?: string): boolean => {
        let result: boolean = false;
        if (this.props.isMenuTitle === true && this.props.activeMenu === mark) {
            result = true;
        }
        if (this.props.isMenuTitle === false && this.props.curMark === mark) {
            result = true;
        }
        return result;
    }
}