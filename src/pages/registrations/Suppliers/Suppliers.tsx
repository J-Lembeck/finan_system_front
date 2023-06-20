import React, { useState, useEffect } from 'react'
import TopButtons from '../../../components/TopButtons/TopButtons'
import SuppliersModal from './components/SuppliersModal'
import SuppliersTable from './components/SuppliersTable'
import { Key } from 'antd/es/table/interface'
import { SuppliersTableData, ValueForm } from './ISuppliers'
import { Form } from "antd";
import { Notification } from '../../../components/Notification/Notification'

const Supliers = () => {

	const [tableData, setTableData] = useState<SuppliersTableData[]>([]);
	const [isFetching, setIsFetching] = useState(true);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isNewSupplier, setIsNewSupplier] = useState(true);
	const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
	const [newSuppliersList, setNewSuppliersList] = useState<ValueForm[]>([]);
	const [selectedRows, setSelectedRows] = useState<SuppliersTableData[]>([]);
	const [searchValue, setSearchValue] = useState("");
	const [form] = Form.useForm();

	useEffect(() => {
		const fornecedores = [
			{ key: 1, id: 12345, identification: '123.456.789-00', name: 'Teste I', tel: '47 99999-8888' },
			{ key: 2, id: 67890, identification: '12.345.678/0001-90', name: 'Teste II', tel: '47 11111-2222' },
			{ key: 3, id: 54321, identification: '987.654.321-00', name: 'Teste III', tel: '47 33333-4444' },
			{ key: 4, id: 98765, identification: '98.765.432/0001-21', name: 'Teste IV', tel: '47 7777-8888' },
		];

		setTableData(fornecedores);
		setIsFetching(false);
	}, []);

	function handleOpenModal(isNew: boolean) {
		if (isNew) {
			setIsNewSupplier(true);
			setSelectedRowKeys([]);
			setSelectedRows([]);
			setNewSuppliersList([]);
			form.resetFields();
		} else {
			form.setFieldsValue({
				identification: selectedRows[0].identification,
				name: selectedRows[0].name,
				tel: selectedRows[0].tel,
			});
			setIsNewSupplier(false);
		}
		setIsModalVisible(true);
	}

	function handleDelete() {

		let tableList = [...tableData];

		selectedRows.forEach(row => {
			const i = tableList.findIndex((supplier) => (supplier.id === row.id));
			tableList.splice(i, 1);
		});

		setIsFetching(true);

		onDeleteSupplier(tableList);
	}

	function onDeleteSupplier(response: SuppliersTableData[]) {
        if(response){
            Notification({
                type: "success", 
                message: "Deletado com sucesso", 
            });
        }

		setTableData(response);
        
		setIsFetching(false);
    };

	function handleCloseSupplierModal() {
		setSelectedRowKeys([]);
		setSelectedRows([]);
		form.resetFields();
		setIsModalVisible(false);
	};

	function handleIncludeSuppliers(data: ValueForm) {
		if (isNewSupplier) {
			setNewSuppliersList([...newSuppliersList, data]);
		} else {
			handleSave([data]);
		}
		form.resetFields();
	}

	function handleSave(data: ValueForm[]) {

		const suppliersToSave = data.map(
			supplier => {

				const id = Math.floor(Math.random() * (9999 - 1 + 1)) + 1;

				return {
					id: isNewSupplier ? id : selectedRows[0].id,
					key: isNewSupplier ? id : selectedRowKeys[0],
					identification: supplier.identification,
					name: supplier.name,
					tel: supplier.tel,
				}
			});

		setSelectedRowKeys([]);
		setSelectedRows([]);

		setIsModalVisible(false);
		setIsFetching(true);

		onSaveSupplier(suppliersToSave);
	}

	function onSaveSupplier(data: any) {
		if (data) {
			Notification({
				type: "success",
				message: "Salvo com sucesso!",
			});
		}
		form.resetFields();

		let tableList = [...tableData];

		if(!isNewSupplier) {
			const i = tableList.findIndex((supplier) => (supplier.key === selectedRowKeys[0]));
			tableList.splice(i, 1);
		}
		
		setIsFetching(false);

		setTableData([...tableList, ...data]);

	};

	function onSelectRowChange(selectedRowKeys: Key[], selectedRows: SuppliersTableData[]) {
		setSelectedRows(selectedRows);
		setSelectedRowKeys(selectedRowKeys);
	};

	function onChangeSearch({ target: { value } }: React.ChangeEvent<HTMLInputElement>) {
		setSearchValue(value);
	}

	let filteredData = tableData.filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase()));

	return (
		<main id="main">
			<div className='main-container'>
				<TopButtons
					pageTittle='Fornecedores'
					mainButtonTitle="Novo fornecedor"
					handleNew={() => handleOpenModal(true)}
					handleEdit={() => handleOpenModal(false)}
					handleDelete={handleDelete}
					handleSearch={onChangeSearch}
					isEditable={selectedRows.length === 1}
					isDeletable={selectedRows.length > 0}
				/>
				<SuppliersModal
					isModalVisible={isModalVisible}
					isNew={isNewSupplier}
					handleCancel={handleCloseSupplierModal}
					handleSubmit={handleIncludeSuppliers}
					handleSave={handleSave}
					newList={newSuppliersList}
					setNewList={setNewSuppliersList}
					form={form}
				/>
				<SuppliersTable
					isFetching={isFetching}
					tableData={filteredData}
					selectedRowKeys={selectedRowKeys}
					onChange={onSelectRowChange}
				/>
			</div>
		</main>
	)
}

export default Supliers