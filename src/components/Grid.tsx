import * as React from 'react';
import * as ClassName from 'classnames';
// import { CheckBox } from './CheckBox';

export interface Column<T> {
    key: string;
    title: string;
    order: boolean;
    sort?: (first: T, second: T) => number;
    render?: (key: string, record: T) => React.ReactNode;
}

// export interface Record<T> {
//     row: T;
// }

interface GridState<T> {
    orderBy?: Column<T>;
    order: string;
    selectRows: Array<T>;
    selectAll?: boolean;
}
export interface GridProps<T> {
    columns: Array<Column<T>>;
    rows: Array<T>;
    recordSelect?: (records: T|Array<T>, oper?: string) => void;
} 

export class Grid<T> extends React.Component<GridProps<T>, GridState<T>> {
    state: GridState<T> = {orderBy: undefined, order: '', selectRows: [], selectAll: false};

    constructor(props: GridProps<T>) {
        super(props);
    }

    render() {
        let header = this.genHeader();
        let records = this.genRecorders();
        return (
        <div className="table-responsive">
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th><input type="checkbox" onChange={this.selectAll} checked={this.state.selectAll}/></th>
                        {header}
                    </tr>
                </thead>
                <tbody>
                        {records}
                </tbody>
            </table>
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
            if (item.render === undefined) {
            return <td  key={item.key}>{record[item.key]}</td>;
            } else {
                return <td  key={item.key}>{item.render(item.key, record)}</td>;
            }
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
                    <td>
                        <input 
                            type="checkbox" 
                            checked={this.isSelect(record)} 
                            onChange={e => this.selectRecord(e, record)}
                        />
                    </td>
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

    selectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        let data = [...this.props.rows];
        let selectAll = event.target.checked;
        if (selectAll === false) {
            data = [];
        }
        this.setState({selectRows: data, selectAll: selectAll}, () => {
            if (this.props.recordSelect !== undefined) {
                this.props.recordSelect(this.state.selectRows);
            }
        });
    }

    selectRecord = (event: React.ChangeEvent<HTMLInputElement>, record: T) => {
        let data = [...this.state.selectRows];
        let select = event.target.checked;
        if (select === true) {
            data.push(record);
        } else {
            data.splice(data.indexOf(record), 1);
        }
        let selectAll = data.length === this.props.rows.length;
        this.setState({selectRows: data, selectAll: selectAll}, () => {
            if (this.props.recordSelect !== undefined) {
                this.props.recordSelect(this.state.selectRows);
            }
        });
    }

    isSelectAll = (): boolean => {
        return this.state.selectRows.length === this.props.rows.length;
    }

    isSelect = (record: T): boolean => {
        if (this.state && this.state.selectRows !== null) {
            return this.state.selectRows.indexOf(record) === -1 ? false : true;
        } else {
            return false;
        }
    }
}