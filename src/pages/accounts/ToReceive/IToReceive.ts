import { Moment } from "moment";
import { Key } from "react";

export type ToPayTableData = {
    key: number;
    id: number;
    idSupplier: number;
    idCategory: number;
    idBank: number;
    idCliente: number;
    idUser: number;
    emissionDateString: string;
    paymentDateString: string;
    maturityDateString: string;
    observation: string;
    value: number;
    type: boolean;
}

export type ValueForm = {
    idSupplier: number;
    idCategory: number;
    idBank: number;
    emissionDateString: string;
    paymentDateString: string;
    maturityDateString: string;
    observation: string;
    value: number;
}

export interface ToPayTableProps {
    isFetching: boolean;
    tableData: ToPayTableData[];
    selectedRowKeys: Key[];
    onChange: (selectedRowKeys: React.Key[], selectedRow: ToPayTableData[]) => void;
}

export interface IToPayModalProps {
    isModalVisible: boolean
    isNew: boolean
    handleCancel: () => void;
    // handleSubmit: (data: any) => void;
    handleSave: (data: ValueForm[]) => void;
    form: any;
    // newList: ValueForm[];
    // setNewList: (data: ValueForm[]) => void;
    supplierList: any;
    categoryList: any;
    bankList: any;
}

export interface IToPayItemForm {
    value: number;
    label: string
}