import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { SuppliersTableData, SuppliersTableProps } from '../ISuppliers';

const SuppliersTable = ({
    isFetching,
    tableData,
    selectedRowKeys,
    onChange
}: SuppliersTableProps) => {
    const rowSelection = {selectedRowKeys, onChange};

    const tableColumns: ColumnsType<SuppliersTableData> = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            align: "left",
            width: 200,
        }, 
        {
            title: "CPF/CNPJ",
            dataIndex: "identification",
            key: "identification",
            align: "left",
            width: 300,
        },
        {
            title: "Nome",
            dataIndex: "name",
            key: "name",
            align: "left",
            width: 500,
        },
        {
            title: "Telefone",
            dataIndex: "tel",
            key: "tel",
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
    );
}

export default SuppliersTable