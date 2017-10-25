import * as React from 'react';
import { Column, Grid } from '../../components/Grid';
import { PageState, Paging } from '../../components/Paging';
import { InputControl } from '../../components/Control';
import Button from '../../components/Button';
import ButtonGroup from '../../components/ButtonGroup';

interface Record {
    compID: number;
    storageName: string;
    provice: string;
    city: string;
    storageAddr: string;
}

const columns: Array<Column<Record>> = [
    {
        key: 'compID',
        title: '公司编码',
        order: false
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
    }
];

const records = [
    {
        compID: 1,
        storageName: 'xxx0',
        provice: 'hunan',
        city: 'changsha3',
        storageAddr: '捞刀河208号'
    },
    {
        compID: 2,
        storageName: 'xxx1',
        provice: 'hunan',
        city: 'changsha2',
        storageAddr: '捞刀河209号'
    },
    {
        compID: 3,
        storageName: 'xxx2',
        provice: 'hunan',
        city: 'changsha1',
        storageAddr: '捞刀河210号'
    },
    {
        compID: 4,
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
                    <InputControl type="text" labelName="仓库名称" name="storageName" watchValue={this.watchValue}/>
                    </div>
                    <div className="col-12">
                    <InputControl type="text" labelName="仓库地址" name="storageAddr" watchValue={this.watchValue}/>
                    </div>
                    <div className="pull-right">
                        <ButtonGroup>
                        <Button type="">查询</Button>
                        <Button type="">清除</Button>
                        </ButtonGroup>
                    </div>
                </form>
                <Table columns={columns} rows={records} subject="test" />
                <Paging {...page} style={{marginTop: '-20px'}} watchValue={this.watchValue}/>
            </div>
        );
    }
}

export default Storage;