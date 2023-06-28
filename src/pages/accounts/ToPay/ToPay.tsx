import React, { Key, useEffect, useState } from 'react'
import TopButtons from '../../../components/TopButtons/TopButtons'
import { ToPayTableData, ValueForm } from './IToPay';
import { Notification } from '../../../components/Notification/Notification';
import { Form } from "antd";
import ToPayTable from './components/ToPayTable';
import ToPayModal from './components/ToPayModal';
import moment from 'moment';

const ToPay = () => {

    const [tableData, setTableData] = useState<ToPayTableData[]>([]);
	const [isFetching, setIsFetching] = useState(true);
	const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
	const [selectedRows, setSelectedRows] = useState<ToPayTableData[]>([]);
	const [isModalVisible, setIsModalVisible] = useState(false);
    const [isNewBill, setIsNewBill] = useState(true);
	const [form] = Form.useForm();

    useEffect(() => {
		const categorias = [
			{ 
                key: 1, 
                id: 12345, 
                idSupplier: 1, 
                idCategory: 2, 
                idBank: 1, 
                idCliente: 4, 
                idUser: 6,  
                emissionDateString: moment("10-07-2023").format("DD/MM/YYYY"),
                paymentDateString: moment("10-07-2023").format("DD/MM/YYYY"),
                maturityDateString: moment("10-07-2023").format("DD/MM/YYYY"),
                observation: "teste",
                value: 500.25,
                type: true
            },
		];

        console.log(categorias);

		setTableData(categorias);
		setIsFetching(false);
	}, []);

    function handleOpenModal(isNew: boolean) {
		if (isNew) {
			setIsNewBill(true);
			setSelectedRowKeys([]);
			setSelectedRows([]);
			form.resetFields();
		} else {
			form.setFieldsValue({
                idSupplier: selectedRows[0].idSupplier,
                idCategory: selectedRows[0].idCategory,
                idBank: selectedRows[0].idBank,
                emissionDateString: moment(selectedRows[0].emissionDateString),
                paymentDateString: moment(selectedRows[0].paymentDateString),
                maturityDateString: moment(selectedRows[0].maturityDateString),
                observation: selectedRows[0].observation,
			});
			setIsNewBill(false);
		}
		setIsModalVisible(true);
	}

    function handleCloseCategoryModal() {
		setSelectedRowKeys([]);
		setSelectedRows([]);
		form.resetFields();
		setIsModalVisible(false);
	};

	function handleSave(data: ValueForm[]) {

        form.resetFields();

		const billsToSave = data.map(
			bill => {

				const id = Math.floor(Math.random() * (9999 - 1 + 1)) + 1;

				return {
					id: isNewBill ? id : selectedRows[0].id,
					key: isNewBill ? id : selectedRowKeys[0],
                    idSupplier: bill.idSupplier,
                    idCategory: bill.idCategory,
                    idBank: bill.idBank,
                    // idCliente: bill.idCliente,
                    // idUser: bill.idUser,
                    emissionDateString: bill.emissionDateString,
                    paymentDateString: bill.paymentDateString,
                    maturityDateString: bill.maturityDateString,
                    observation: bill.observation,
                    value: bill.value,
                    type: true,
				}
			});

        console.log(billsToSave);

		setSelectedRowKeys([]);
		setSelectedRows([]);

		setIsModalVisible(false);
		setIsFetching(true);

		onSaveBill(billsToSave);
	}

    function onSaveBill(data: any) {
		if (data) {
			Notification({
				type: "success",
				message: "Salvo com sucesso!",
			});
		}
		form.resetFields();

		let tableList = [...tableData];

		if(!isNewBill) {
			const i = tableList.findIndex((category) => (category.key === selectedRowKeys[0]));
			tableList.splice(i, 1);
		}
		
		setIsFetching(false);

		setTableData([...tableList, ...data]);

	};

    function handleDelete() {

		let tableList = [...tableData];

		selectedRows.forEach(row => {
			const i = tableList.findIndex((category) => (category.id === row.id));
			tableList.splice(i, 1);
		});

		setIsFetching(true);

		onDeleteBill(tableList);
	}

    function onDeleteBill(response: ToPayTableData[]) {
        if(response){
            Notification({
                type: "success", 
                message: "Deletado com sucesso", 
            });
        }

		setTableData(response);
        
		setIsFetching(false);
    };

    function onSelectRowChange(selectedRowKeys: Key[], selectedRows: ToPayTableData[]) {
		setSelectedRows(selectedRows);
		setSelectedRowKeys(selectedRowKeys);
	};

    return (
		<main id="main">
			<div className='main-container'>
				<TopButtons
					pageTittle='Contas a pagar'
					mainButtonTitle="Nova conta"
					handleNew={() => handleOpenModal(true)}
					handleEdit={() => handleOpenModal(false)}
					handleDelete={handleDelete}
					isEditable={selectedRows.length === 1}
					isDeletable={selectedRows.length > 0}
				/>
				<ToPayModal
					isModalVisible={isModalVisible}
					isNew={isNewBill}
					handleCancel={handleCloseCategoryModal}
					handleSave={handleSave}
					form={form}
				/>
				<ToPayTable
					isFetching={isFetching}
					tableData={tableData}
					selectedRowKeys={selectedRowKeys}
					onChange={onSelectRowChange}
				/>
			</div>
		</main>
	)
}

export default ToPay