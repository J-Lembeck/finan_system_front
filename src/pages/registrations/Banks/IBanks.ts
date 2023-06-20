import { Key } from "antd/es/table/interface";

export type BanksTableData = {
    key: number;
    id: number;
    description: string;
    account: string;
    balance: number;
}

export type ValueForm = {
    description: string;
    account: string;
    balance: number;
}

export interface IBanksModalProps {
    isModalVisible: boolean
    isNew: boolean
    handleCancel: () => void;
    handleSubmit: (data: any) => void;
    handleSave: (data: ValueForm[]) => void;
    form: any;
    newList: ValueForm[];
    setNewList: (data: ValueForm[]) => void;
}

export interface BanksTableProps {
    isFetching: boolean;
    tableData: BanksTableData[];
    selectedRowKeys: Key[];
    onChange: (selectedRowKeys: React.Key[], selectedRow: BanksTableData[]) => void;
}