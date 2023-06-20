import { Key } from "antd/es/table/interface";

export type ClientsTableData = {
    key: number;
    id: number;
    identification: string;
    name: string;
    tel: string;
}

export type ValueForm = {
    identification: string;
    name: string;
    tel: string;
}

export interface IClientsModalProps {
    isModalVisible: boolean
    isNew: boolean
    handleCancel: () => void;
    handleSubmit: (data: any) => void;
    handleSave: (data: ValueForm[]) => void;
    form: any;
    newList: ValueForm[];
    setNewList: (data: ValueForm[]) => void;
}

export interface ClientsTableProps {
    isFetching: boolean;
    tableData: ClientsTableData[];
    selectedRowKeys: Key[];
    onChange: (selectedRowKeys: React.Key[], selectedRow: ClientsTableData[]) => void;
}