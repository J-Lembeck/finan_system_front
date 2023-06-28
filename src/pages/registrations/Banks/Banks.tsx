import React, { useState, useEffect } from 'react'
import TopButtons from '../../../components/TopButtons/TopButtons'
import { Form } from "antd";
import api from "../../../services/api";
import { Notification } from '../../../components/Notification/Notification'
import { BanksTableData, ValueForm } from './IBanks';
import BanksTable from './components/BanksTable';
import { Key } from 'antd/es/table/interface';
import BanksModal from './components/BanksModal';

const Banks = () => {

	const [tableData, setTableData] = useState<BanksTableData[]>([]);
	const [isFetching, setIsFetching] = useState(true);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isNewBank, setIsNewBank] = useState(true);
	const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
	const [newBanksList, setNewBanksList] = useState<ValueForm[]>([]);
	const [selectedRows, setSelectedRows] = useState<BanksTableData[]>([]);
	const [searchValue, setSearchValue] = useState("");
	const [form] = Form.useForm();

	useEffect(() => {
		loadBanksData();
	}, []);

	function loadBanksData() {
		api.get("/bank/findAll", {
			params: {
				userId: localStorage.getItem("userId")
			}
		}).then((response) => {
			console.log(response);
			if (response.status === 200) {
			  const banks = response.data.map((item: any) => {
				return {
					key: item.id,
					id: item.id,
					description: item.bankName,
					account: item.bankCode,
					balance: item.balance
				};
			  });
			  setTableData(banks);
			} else {
			  console.log("Erro");
			}
		  });

		setIsFetching(false);
	}

	function handleOpenModal(isNew: boolean) {
		if (isNew) {
			setIsNewBank(true);
			setSelectedRowKeys([]);
			setSelectedRows([]);
			setNewBanksList([]);
			form.resetFields();
		} else {
			form.setFieldsValue({
				description: selectedRows[0].description,
				account: selectedRows[0].account,
				balance: selectedRows[0].balance,
			});
			setIsNewBank(false);
		}
		setIsModalVisible(true);
	}

	function handleDelete() {
		api.delete(`/bank?ids=${selectedRowKeys}`)
		.then((response) => {
			setIsFetching(true);
			onDeleteBanks(response);
		})
	}

	function onDeleteBanks(response: any) {
        if(response){
            Notification({
                type: "success", 
                message: "Deletado com sucesso", 
            });
        }
		setIsFetching(true);
		loadBanksData();
		setIsFetching(false);
    };

	function handleCloseBankModal() {
		setSelectedRowKeys([]);
		setSelectedRows([]);
		form.resetFields();
		setIsModalVisible(false);
	};

	function handleIncludeBanks(data: ValueForm) {
		if (isNewBank) {
			setNewBanksList([...newBanksList, data]);
		} else {
			handleSave([data]);
		}
		form.resetFields();
	}

	function handleSave(data: ValueForm[]) {

		const banksToSave = data.map(
			bank => {
				return {
					id: isNewBank ? null : selectedRows[0].id,
					// key: isNewBank ? id : selectedRowKeys[0],
					bankName: bank.description,
					bankCode: bank.account,
					balance: bank.balance,
					idUser: localStorage.getItem("userId")
				}
			});

		if(isNewBank) {
			api.post("/bank", banksToSave)
			.then((response) => {
				console.log(response);
				setIsFetching(true);
				loadBanksData();
				onSaveBanks(response);
			});
		} else {
			api.put("/bank", banksToSave[0]).then((response) => {
				setIsFetching(true);
				loadBanksData();
				onSaveBanks(response);
			})
		}

		setSelectedRowKeys([]);
		setSelectedRows([]);

		setIsModalVisible(false);
		setIsFetching(true);
	}

	function onSaveBanks(response: any) {
		if (response) {
			Notification({
				type: "success",
				message: isNewBank ? "Salvo com sucesso!" : "Editado com sucesso!",
			});
		}
		form.resetFields();
		setIsFetching(false);
	};

	function onSelectRowChange(selectedRowKeys: Key[], selectedRows: BanksTableData[]) {
		setSelectedRows(selectedRows);
		setSelectedRowKeys(selectedRowKeys);
	};

	function onChangeSearch({ target: { value } }: React.ChangeEvent<HTMLInputElement>) {
		setSearchValue(value);
	}

	let filteredData = tableData.filter(item => item.description?.toLowerCase().includes(searchValue.toLowerCase()));


	return (
		<main id="main">
			<div className='main-container'>
				<TopButtons
					pageTittle='Bancos'
					mainButtonTitle="Novo banco"
					handleNew={() => handleOpenModal(true)}
					handleEdit={() => handleOpenModal(false)}
					handleDelete={handleDelete}
					handleSearch={onChangeSearch}
					isEditable={selectedRows.length === 1}
					isDeletable={selectedRows.length > 0}
				/>
				<BanksModal
					isModalVisible={isModalVisible}
					isNew={isNewBank}
					handleCancel={handleCloseBankModal}
					handleSubmit={handleIncludeBanks}
					handleSave={handleSave}
					newList={newBanksList}
					setNewList={setNewBanksList}
					form={form}
				/>
				<BanksTable
					isFetching={isFetching}
					tableData={filteredData}
					selectedRowKeys={selectedRowKeys}
					onChange={onSelectRowChange}
				/>
			</div>
		</main>
	)
}

export default Banks