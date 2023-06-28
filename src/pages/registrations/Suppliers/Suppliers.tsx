import React, { useState, useEffect } from 'react'
import TopButtons from '../../../components/TopButtons/TopButtons'
import SuppliersModal from './components/SuppliersModal'
import SuppliersTable from './components/SuppliersTable'
import { Key } from 'antd/es/table/interface'
import { SuppliersTableData, ValueForm } from './ISuppliers'
import { Form } from "antd";
import { Notification } from '../../../components/Notification/Notification'
import api from '../../../services/api';

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
		loadSuppliers();
	}, []);

	function loadSuppliers() {
		api.get("/supplier/findAll", {
			params: {
				userId: localStorage.getItem("userId")
			}
		}).then((response) => {
			if(response.status = 200){
				const fornecedores = response.data.map((item: any) => {
					return {
						key: item.id,
						id: item.id,
						identification: item.cnpj,
						name: item.name,
						tel: item.phone
					}
				})

				setTableData(fornecedores);
				setIsFetching(false);
			}
		}).catch((err) => {
			console.log("Erro")
		})
	}

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
	api.delete(`/supplier?ids=${selectedRowKeys}`)
		.then((response) => {
			setIsFetching(true);
			onDeleteSupplier(response);
		})
	}

	function onDeleteSupplier(response: any) {
        if(response){
            Notification({
                type: "success", 
                message: "Deletado com sucesso", 
            });
        }

		setIsFetching(true);
		loadSuppliers();
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
				return {
					id: isNewSupplier ? null : selectedRows[0].id,
					key: isNewSupplier ? null : selectedRowKeys[0],
					cnpj: supplier.identification,
					name: supplier.name,
					phone: supplier.tel,
					idUser: localStorage.getItem("userId")
				}
			}
		);

		if(isNewSupplier) {
			api.post("/supplier", suppliersToSave)
			.then((response) => {
				setIsFetching(true);
				loadSuppliers();
				onSaveSupplier(response);
			});
		} else {
			api.put("/supplier", suppliersToSave[0]).then((response) => {
				setIsFetching(true);
				loadSuppliers();
				onSaveSupplier(response);
			})
		}

		setSelectedRowKeys([]);
		setSelectedRows([]);

		setIsModalVisible(false);
		setIsFetching(true);
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