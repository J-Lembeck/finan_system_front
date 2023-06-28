import { Key } from "antd/es/table/interface";

export type CategoriesTableData = {
    key: number;
    id: number;
    description: string;
    type: number;
}

export type ValueForm = {
    description: string;
    type: String;
}

export interface CategoriesTableProps {
    isFetching: boolean;
    tableData: CategoriesTableData[];
    selectedRowKeys: Key[];
    onChange: (selectedRowKeys: React.Key[], selectedRow: CategoriesTableData[]) => void;
}

export interface ICategoriesModalProps {
    isModalVisible: boolean
    isNew: boolean
    handleCancel: () => void;
    handleSubmit: (data: any) => void;
    handleSave: (data: ValueForm[]) => void;
    form: any;
    newList: ValueForm[];
    setNewList: (data: ValueForm[]) => void;
}