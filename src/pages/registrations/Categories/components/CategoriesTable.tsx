import { Table } from 'antd'
import { ColumnsType } from 'antd/es/table';
import { CategoriesTableData, CategoriesTableProps } from '../ICategories'

const CategoriesTable = ({
    isFetching,
    tableData,
    selectedRowKeys,
    onChange
}: CategoriesTableProps) => {

    const rowSelection = {selectedRowKeys, onChange};

    const tableColumns: ColumnsType<CategoriesTableData> = [
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
            title: "Tipo",
            dataIndex: "type",
            key: "type",
            align: "left",
            width: 300,
            render: (type) => type === 1 ? "Contas a pagar" : "Contas a receber"
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

export default CategoriesTable