import * as React from 'react';
import { Column, Grid } from '../../components/Grid';

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
            return first.storageName.localeCompare(second.storageName);
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
            return first.storageName.localeCompare(second.storageName);
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

class Table extends Grid<Record> {}

class Storage extends React.Component {
    state = {  };
    render() {
        return (
            <div>
                <p>storage infor</p>
                <Table columns={columns} rows={records} subject="test" />
            </div>
        );
    }
}

export default Storage;