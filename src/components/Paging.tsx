import * as React from 'react';
import * as ClassName from 'classnames';
import * as Base from '../components/Base';

export interface PageProps {
    curPage?: number;
    total?: number;
    pageSize?: number;
}

interface RenderProps {
    style?: React.CSSProperties;    
}

export interface PageState {
    curPage: number;
}

export class Paging extends React.Component<PageProps & RenderProps & Base.Handler<number>, PageState> {
    // static defaultProps: PageProps;
    static defaultProps = {
        curPage: 1,
        total: 1,
        pageSize: 10
    };

    state: PageState;
    constructor(props: PageProps & RenderProps & Base.Handler<number>) {
        super(props);
        this.state = {curPage: this.props.curPage ? this.props.curPage : Paging.defaultProps.curPage};
    }

    onClick = (pageNo: number, event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        let total = this.props.total ? this.props.total : Paging.defaultProps.total;
        
        if (pageNo > 0 && pageNo <= total) {
            this.setState({curPage: pageNo});
            if (this.props.watchValue) {
                this.props.watchValue('curPage', pageNo, false);
            }   
        }    
    }

    renderPageItem(): JSX.Element[] {
        let total = this.props.total ? this.props.total : Paging.defaultProps.total;
        let curPage = this.props.curPage ? this.props.curPage : Paging.defaultProps.curPage;
        
        let result = [];
        for (let i = curPage; i <= 5; i++) {
            result.push(i);
        }
        return result.map(pageNo => {
            return (
                <li 
                    key={pageNo} 
                    className={ClassName(
                        {'active': pageNo === this.state.curPage}, 
                        {'disabled': pageNo > total})}
                >
                    <a href="#" onClick={event => this.onClick(pageNo, event)}>{pageNo}</a>
                </li>
            );
        });
    }
    render() {
        let { 
                curPage = Paging.defaultProps.curPage, 
                total = Paging.defaultProps.curPage, 
                pageSize = Paging.defaultProps.curPage, 
                watchValue = undefined, style = {}, 
                ...others
            } = this.props;
        pageSize = 10;
        others = {};
        return (
            <nav className="pull-right">
            <ul className="pagination" style={{...style}}>
                <li className={ClassName({'disabled': curPage <= 1 })}>
                <a href="#" aria-label="Previous" onClick={event => this.onClick(curPage - 1, event)}>
                    <span aria-hidden="true">&laquo;</span>
                </a>
                </li>
                {this.renderPageItem()}
                <li className={ClassName({'disabled': curPage + 5 > total })}>
                <a href="#" aria-label="Next" onClick={event => this.onClick(curPage + 5, event)}>
                    <span aria-hidden="true">&raquo;</span>
                </a>
                </li>
            </ul>
            </nav>                    
        );
    }    
}
