import { Table } from 'antd'
import { ColumnsType } from 'antd/es/table';
import { ToPayTableData, ToPayTableProps } from '../IToPay'
import moment from 'moment';

const ToPayTable = ({
    isFetching,
    tableData,
    selectedRowKeys,
    onChange
}: ToPayTableProps) => {

    const rowSelection = {selectedRowKeys, onChange};

    const tableColumns: ColumnsType<ToPayTableData> = [
        {
            title: "Data de vencimento",
            dataIndex: "maturityDateString",
            key: "maturityDateString",
            align: "left",
            width: 200,
            render: (date) => moment(date).format("DD/MM/YYYY")
        }, 
        {
            title: "Fornecedor",
            dataIndex: "idSupplier",
            key: "idSupplier",
            align: "left",
            width: 500,
        },
        {
            title: "Valor",
            dataIndex: "value",
            key: "value",
            align: "left",
            width: 300,
        },
        {
            title: "Data de pagamento",
            dataIndex: "paymentDateString",
            key: "paymentDateString",
            align: "left",
            width: 300,
            render: (date) => moment(date).format("DD/MM/YYYY")
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

export default ToPayTable