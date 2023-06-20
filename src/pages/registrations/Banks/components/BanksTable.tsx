import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { BanksTableData, BanksTableProps } from '../IBanks';

const BanksTable = ({
    isFetching,
    tableData,
    selectedRowKeys,
    onChange
}: BanksTableProps) => {

    const rowSelection = {selectedRowKeys, onChange};

    const tableColumns: ColumnsType<BanksTableData> = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            align: "left",
            width: 200,
        }, 
        {
            title: "Descrição",
            dataIndex: "description",
            key: "description",
            align: "left",
            width: 500,
        },
        {
            title: "Conta",
            dataIndex: "account",
            key: "account",
            align: "left",
            width: 200,
        },
        {
            title: "Saldo inicial",
            dataIndex: "balance",
            key: "balance",
            align: "left",
            width: 300,
        },
    ];

    return (
        <Table
            loading={{
                spinning: isFetching,
                tip: "Carregando"
            }}
            className="gs-table"
            dataSource={tableData}
            columns={tableColumns}
            rowSelection={rowSelection}
            pagination={{ hideOnSinglePage: false, pageSize: 4 }}
            bordered
        />
    )
}

export default BanksTable