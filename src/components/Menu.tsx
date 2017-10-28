import * as React from 'react';
import * as ClassName from 'classnames';
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface MenuNode {
    name: string;
    items?: Array<MenuNode>;
    mark?: string;
}

interface MenuProps {
    name: string;
    items?: Array<MenuNode>;
    mark?: string;
    notify?: (isMenuTitle: boolean, curMark?: string) => void;
    isMenuTitle?: boolean;
    curMark?: string;
    activeMenu?: string;
}

interface SideMenuState {
    marks: Array<string>;
    isMenuTitle?: boolean;
    curMark?: string;
    activeMenu?: string;
}

class SiderMenu extends React.Component<MenuNode & RouteComponentProps<{}>, SideMenuState> {
    state: SideMenuState;
    constructor(props: MenuNode & RouteComponentProps<{}>) {
        super(props);
        this.state = {marks: this.marks('', this.props.items)};
    }

    render() {
        let { mark= '', ...others} = this.props;
        return <Menu mark={mark} {...others} {...this.state} notify={this.notify}/>;
    }

    notify = (isMenuTitle: boolean, curMark?: string) => {
        if (isMenuTitle) {
            this.setState({isMenuTitle: isMenuTitle, curMark: curMark});            
        } else {
            this.setState({isMenuTitle: isMenuTitle, curMark: curMark, activeMenu: curMark}, () => {
                this.props.history.push('/company');
            });            
        }
    }

    private marks(parentMark: string, items?: Array<MenuNode>): Array<string> {
        let marks: Array<string> = [];
        if (items !== undefined) {
            items.forEach((item, index) => {
                let mark: string = parentMark === '' ? `${index}` : `${parentMark}.${index}`;
                item.mark = mark;
                marks.push(mark);
                if (item.items !== undefined) {
                    let childs = this.marks(mark, item.items);
                    marks = [...marks, ...childs];
                }
            });
        }
        return marks;
    }
}

export const RouteMenu = withRouter<MenuNode>(SiderMenu);

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
                                <li className="vma-menu-node" key={key} onClick={e => this.selectedMenu(e, true, key)}>
                                    <div 
                                        className="vma-menu-title" 
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
                                        {'vma-menu-item-active': this.isActive(key)}
                                    )} 
                                    key={item.mark}
                                    style={{paddingLeft: `${this.indent(key)}px`}} 
                                    onClick={e => this.selectedMenu(e, false, key)}
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
            if (this.props.activeMenu.startsWith(mark)) {
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
            result = this.props.curMark.startsWith(mark);
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