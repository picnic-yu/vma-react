import * as React from 'react';
import * as ClassName from 'classnames';

export interface Column<T> {
    key: string;
    title: string;
    order: boolean;
    sort?: (first: T, second: T) => number;
}

// export interface Record<T> {
//     row: T;
// }

interface GridState<T> {
    orderBy: Column<T>;
    order: string;
}
export interface GridProps<T> {
    subject: string;
    columns: Array<Column<T>>;
    rows: Array<T>;
} 

export class Grid<T> extends React.Component<GridProps<T>, GridState<T>> {
    state: GridState<T>;

    constructor(props: GridProps<T>) {
        super(props);
    }

    render() {
        let header = this.genHeader();
        let records = this.genRecorders();
        return (
        <div className="panel panel-default">
            <h4 className="panel-header">{this.props.subject}列表</h4>
            <div className="table-responsive">
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            {header}
                        </tr>
                    </thead>
                    <tbody>
                            {records}
                    </tbody>
                </table>
            </div>
        </div>
        );
    }

    genHeader(): JSX.Element[] {
        return this.props.columns.map((item, index) => {
            return (
                <th 
                    key={item.key} 
                    className={ClassName(
                                {'sort': item.order}, 
                                {'active': this.state && this.state.orderBy === item}
                    )} 
                    onClickCapture={this.sortRecord.bind(this, item)}
                >
                    {item.title}
                    <span 
                        className={ClassName(
                            {'gridSort': item.order}, 
                            {'asc': item.order && this.state && this.state.order === 'asc'},
                            {'dsc': item.order && this.state && this.state.order === 'desc'}
                        )} 
                    />
                </th>);
        });
    }

    genRecorder(record: T): JSX.Element[] {
        return this.props.columns.map((item, index) => {
            return <td  key={item.key}>{record[item.key]}</td>;
        });
    }

    genRecorders(): JSX.Element[] {
        let records = [...this.props.rows];
        if (this.state !== null && this.state.orderBy !== undefined) {
            if (typeof this.state.orderBy.sort === 'function') {
                records.sort(this.state.orderBy.sort);
            }
        }
        if (this.state !== null && this.state.order === 'desc') {
            records.reverse();
        }
        return records.map((record, index) => {
            let row = this.genRecorder(record);
            return (
                <tr key={index}>
                    {row}
                </tr>
            );
        });
    }

    sortRecord = (column: Column<T>) => {
        // tslint:disable-next-line:max-line-length
        let data = Object.assign({}, this.state);
        if (column.order === true) {
            data.orderBy = column;
            data.order = data.order === 'asc' ? 'desc' : 'asc';
            this.setState(data);
        }
    }
}