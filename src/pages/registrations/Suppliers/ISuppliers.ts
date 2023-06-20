import { Key } from "antd/es/table/interface";

export type SuppliersTableData = {
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

export interface ISuppliersModalProps {
    isModalVisible: boolean
    isNew: boolean
    handleCancel: () => void;
    handleSubmit: (data: any) => void;
    handleSave: (data: ValueForm[]) => void;
    form: any;
    newList: ValueForm[];
    setNewList: (data: ValueForm[]) => void;
}

export interface SuppliersTableProps {
    isFetching: boolean;
    tableData: SuppliersTableData[];
    selectedRowKeys: Key[];
    onChange: (selectedRowKeys: React.Key[], selectedRow: SuppliersTableData[]) => void;
}