import React, { useState, useEffect, Key } from 'react'
import TopButtons from '../../../components/TopButtons/TopButtons'
import { Form } from "antd";
import { Notification } from '../../../components/Notification/Notification'
import { ClientsTableData, ValueForm } from './IClients';
import ClientsTable from './components/ClientsTable';
import ClientsModal from './components/ClientsModal';
import api from '../../../services/api';

const Clients = () => {

	const [tableData, setTableData] = useState<ClientsTableData[]>([]);
	const [isFetching, setIsFetching] = useState(true);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isNewClient, setIsNewClient] = useState(true);
	const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
	const [newClientsList, setNewClientsList] = useState<ValueForm[]>([]);
	const [selectedRows, setSelectedRows] = useState<ClientsTableData[]>([]);
	const [searchValue, setSearchValue] = useState("");
	const [form] = Form.useForm();

	useEffect(() => {
		loadClientsData();
	}, []);

	function loadClientsData() {
		api.get("/client/findAll").then((response) => {
			console.log(response);
			if (response.status === 200) {
			  const clients = response.data.map((item: any) => {
				return {
					key: item.id,
					id: item.id,
					identification: item.cnpj,
					name: item.name,
					tel: item.phone
				};
			  });
			  setTableData(clients);
			} else {
			  console.log("Erro");
			}
		  });

		setIsFetching(false);
	}

	function handleOpenModal(isNew: boolean) {
		if (isNew) {
			setIsNewClient(true);
			setSelectedRowKeys([]);
			setSelectedRows([]);
			setNewClientsList([]);
			form.resetFields();
		} else {
			form.setFieldsValue({
				identification: selectedRows[0].identification,
				name: selectedRows[0].name,
				tel: selectedRows[0].tel,
			});
			setIsNewClient(false);
		}
		setIsModalVisible(true);
	}

	function handleDelete() {
		api.delete(`/client?ids=${selectedRowKeys}`)
		.then((response) => {
			setIsFetching(true);
			onDeleteClient(response);
		})
	}

	function onDeleteClient(response: any) {
        if(response){
            Notification({
                type: "success", 
                message: "Deletado com sucesso", 
            });
        }
		setIsFetching(true);
		loadClientsData();
		setIsFetching(false);
    };

	function handleCloseClientModal() {
		setSelectedRowKeys([]);
		setSelectedRows([]);
		form.resetFields();
		setIsModalVisible(false);
	};

	function handleIncludeClients(data: ValueForm) {
		if (isNewClient) {
			setNewClientsList([...newClientsList, data]);
		} else {
			handleSave([data]);
		}
		form.resetFields();
	}

	function handleSave(data: ValueForm[]) {

		const clientsToSave = data.map(
			client => {
				return {
					id: isNewClient ? null : selectedRows[0].id,
					cnpj: client.identification,
					name: client.name,
					phone: client.tel,
					idUser: null
				}
			});
		
		if(isNewClient) {
			api.post("/client", clientsToSave)
			.then((response) => {
				console.log(response);
				setIsFetching(true);
				loadClientsData();
				onSaveClient(response);
			});
		} else {
			api.put("/client", clientsToSave[0]).then((response) => {
				setIsFetching(true);
				loadClientsData();
				onSaveClient(response);
			})
		}

		setSelectedRowKeys([]);
		setSelectedRows([]);

		setIsModalVisible(false);
		setIsFetching(true);
	}

	function onSaveClient(response: any) {
		if (response) {
			Notification({
				type: "success",
				message: isNewClient ? "Salvo com sucesso!" : "Editado com sucesso!",
			});
		}
		form.resetFields();
		setIsFetching(false);
	};

	function onSelectRowChange(selectedRowKeys: Key[], selectedRows: ClientsTableData[]) {
		setSelectedRows(selectedRows);
		setSelectedRowKeys(selectedRowKeys);
	};

	function onChangeSearch({ target: { value } }: React.ChangeEvent<HTMLInputElement>) {
		setSearchValue(value);
	}

	let filteredData = tableData.filter(item => item.name?.toLowerCase().includes(searchValue.toLowerCase()));
	
	return (
		<main id="main">
			<div className='main-container'>
				<TopButtons
					pageTittle='Clientes'
					mainButtonTitle="Novo cliente"
					handleNew={() => handleOpenModal(true)}
					handleEdit={() => handleOpenModal(false)}
					handleDelete={handleDelete}
					handleSearch={onChangeSearch}
					isEditable={selectedRows.length === 1}
					isDeletable={selectedRows.length > 0}
				/>
				<ClientsModal
					isModalVisible={isModalVisible}
					isNew={isNewClient}
					handleCancel={handleCloseClientModal}
					handleSubmit={handleIncludeClients}
					handleSave={handleSave}
					newList={newClientsList}
					setNewList={setNewClientsList}
					form={form}
				/>
				<ClientsTable
					isFetching={isFetching}
					tableData={filteredData}
					selectedRowKeys={selectedRowKeys}
					onChange={onSelectRowChange}
				/>
			</div>
		</main>
	)
}

export default Clients