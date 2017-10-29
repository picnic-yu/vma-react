import * as React from 'react';
import * as ClassName from 'classnames';

export interface ContextMenuNode {
    name: string;
    url: string;
    disabled?: boolean;
}

export interface MenuNode {
    name: string;
    items?: Array<ContextMenuNode>;
    style?: React.CSSProperties;
    onClick: (item: ContextMenuNode) => void;
}

export class DropDownMenu extends React.Component<MenuNode> {
    render() {
        let { items } = this.props;
        let children = React.Children.map(this.props.children, (child) => {
            if (typeof child === 'string' || typeof child  === 'number') {
                return child;
            } else {
                return React.cloneElement(
                    child,
                    // {onMouseOver: this.onOwnMouseOver}
                );                
            }
        });
        let style = this.props.style || {};
        return (
        <div className="vma-context-menu">
            {children}
            <ul className={ClassName('vma-drop-menu')} style={style}>
                {items !== undefined && 
                    items.map((item, index) => {
                        return (
                        <li 
                            key={index} 
                            className={ClassName({'vma-drop-menu-item-disabled': item.disabled}, 'vma-drop-menu-item')}
                            onClick={item.disabled === true ? undefined : e => this.props.onClick(item)} 
                        >
                        {item.name}
                        </li>);
                    })
                }
            </ul>
        </div>
        );        
    }
}
