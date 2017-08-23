import * as React from 'react';
import * as ClassName from 'classnames';

interface MenuNode {
    menuID: number;
    name: string;
    url: string;
    // children: Array<MenuNode>;
    children: MenuNode[];
}

class Menu extends React.Component<MenuNode> {
    props: MenuNode;
    // tslint:disable-next-line:max-line-length
    // Warning: Menu(...): When calling super() in `Menu`, make sure to pass up the same props that your component's constructor was passed.
    // props: MenuNode = {menuID: 0, name: '', url: '', children: []};
    state = { open: false};
    constructor(props: MenuNode) {
        super(props);
    }

    onClick = () => {
        if (this.isFolder()) {
            this.setState({open: !this.state.open});
        }
    }

    renderSub(menuItem: MenuNode): JSX.Element {
        let {menuID, name, url} = menuItem;
        let children = menuItem.children;
        return <Menu key={menuID} menuID={menuID} name={name} url={url} children={children}/>;
    }

    isFolder = () => {
        return this.props.children && this.props.children.length > 0;
    }

    render() {
        const listItems = this.props.children.map((menuItem: MenuNode) =>
            this.renderSub(menuItem)
        );
        return (
        <li className={ClassName({'active': this.state.open})} onClick={this.onClick}>
            {this.isFolder() ? (
                <span>{this.props.name}
                <i 
                    className={ClassName('arrow', this.state.open ? 'icon-circle-down' : 'icon-circle-right')}
                />                    
                </span>
            ) : (
                <a href={this.props.url}>{this.props.name}</a>
            )}
            { this.state.open && this.isFolder() && 
                <ul className="sub-menu">
                    {listItems}
                </ul>
            }
        </li>
        );
    }
}

export { MenuNode, Menu };