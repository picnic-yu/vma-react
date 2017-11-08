import * as React from 'react';
import { Column, Grid } from '../../components/Grid';
import { PageState, Paging } from '../../components/Paging';
import { Input, FormItem, Button, ButtonGroup } from '../../components/index';
import Permit from '../../components/Permit';

function rowSelect(e: React.MouseEvent<HTMLAnchorElement>, row: Record, oper: string) {
    e.preventDefault();
    console.log(`oper=${oper} row=${JSON.stringify(row)}`);
}
interface Record {
    compID: number;
    compName: string;
    storageName: string;
    provice: string;
    city: string;
    storageAddr: string;
}

const columns: Array<Column<Record>> = [
    {
        key: 'compID',
        title: '公司编码',
        order: false,
        render(key: string, record: Record) {
            return (
                <a style={{display: 'block'}} href="#" onClick={e => rowSelect(e, record, 'view')}>{record.compName}</a>
            );
        }
    },
    {
        key: 'storageName',
        title: '仓库名称',
        order: true,
        sort: (first: Record, second: Record) => {
            return second.storageName.localeCompare(first.storageName);
        }
    },
    {
        key: 'provice',
        title: '归属省',
        order: false
    },
    {
        key: 'city',
        title: '归属市',
        order: true,
        sort: (first: Record, second: Record) => {
            return second.storageName.localeCompare(first.storageName);
        }
    },
    {
        key: 'storageAddr',
        title: '仓库地址',
        order: false
    },
    {
        key: 'action',
        title: '操作',
        order: false,
        render: (key: string, record: Record) => {
            return (
            <div>
                <Permit url="/storage" oper="update">
                    <a href="#" onClick={e => rowSelect(e, record, 'update')}>更新</a>
                </Permit>
                <span className="divider"/>
                <Permit url="/storage" oper="delete" hidden={false}>
                    <a href="#" onClick={e => rowSelect(e, record, 'delete')}>删除</a>
                </Permit>
                <span className="divider"/>
                <Permit url="/storage" oper="audit">
                    <a href="#" onClick={e => rowSelect(e, record, 'audit')}>审核</a>
                </Permit>
            </div>
            // <ButtonGroup>
            //     <Button>更新</Button>
            //     <Button>删除</Button>
            //     <Button>审核</Button>
            // </ButtonGroup>    
            );
        }
    }
];

const records = [
    {
        compID: 1,
        compName: '公司1',
        storageName: 'xxx0',
        provice: 'hunan',
        city: 'changsha3',
        storageAddr: '捞刀河208号'
    },
    {
        compID: 2,
        compName: '公司2',
        storageName: 'xxx1',
        provice: 'hunan',
        city: 'changsha2',
        storageAddr: '捞刀河209号'
    },
    {
        compID: 3,
        compName: '公司3',
        storageName: 'xxx2',
        provice: 'hunan',
        city: 'changsha1',
        storageAddr: '捞刀河210号'
    },
    {
        compID: 4,
        compName: '公司4',
        storageName: 'xxx3',
        provice: 'hunan',
        city: 'changsha0',
        storageAddr: '捞刀河211号'
    }
];

const page = {
    curPage: 1,
    total: 4,
    pageSize: 10
};

interface Query {
    storageName?: string;
    storageAddr?: string;
}

type StorageState = Query | PageState;

class Table extends Grid<Record> {}

class Storage extends React.Component<{}, StorageState> {
    state: StorageState;

    watchValue = (name: string, value: string|number) => {
        this.setState({[name]: value});
    }
    render() {
        return (
            <div>
                <p>storage infor</p>
                <form className="row">
                    <div className="col-12">
                        <FormItem label="仓库名称">
                            <Input type="text" name="storageName" watchValue={this.watchValue}/>
                        </FormItem>
                    </div>
                    <div className="col-12">
                        <FormItem label="仓库地址">
                            <Input type="text" name="storageAddr" watchValue={this.watchValue}/>
                        </FormItem>
                    </div>
                    <div className="pull-right">
                        <ButtonGroup>
                        <Button type="">查询</Button>
                        <Button type="">清除</Button>
                        </ButtonGroup>
                    </div>                </form>
                <div className="panel panel-default">
                    <div className="panel-header">
                        <span>仓库列表</span>
                        <ButtonGroup className="pull-right">
                            <Button>删除</Button>
                            <Button>导出</Button>
                        </ButtonGroup>
                    </div>
                    <Table columns={columns} rows={records} recordSelect={this.recordSelect} />
                    <Paging {...page} style={{marginTop: '0px'}} watchValue={this.watchValue}/>
                </div>
            </div>
        );
    }

    recordSelect = (rows: Record|Array<Record>, oper?: string) => {
        console.log(`oper=${oper} row=${JSON.stringify(rows)}`);        
    }
}

export default Storage;