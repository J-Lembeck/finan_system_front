import React, { Key, useEffect, useState } from 'react'
import TopButtons from '../../../components/TopButtons/TopButtons'
import { ToPayTableData, ValueForm } from './IToReceive';
import { Notification } from '../../../components/Notification/Notification';
import { Form } from "antd";
import ToPayTable from './components/ToReceiveTable';
import ToPayModal from './components/ToReceiveModal';
import moment from 'moment';
import api from '../../../services/api';

const ToReceive = () => {

    const [tableData, setTableData] = useState<ToPayTableData[]>([]);
	const [isFetching, setIsFetching] = useState(true);
	const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
	const [selectedRows, setSelectedRows] = useState<ToPayTableData[]>([]);
	const [isModalVisible, setIsModalVisible] = useState(false);
    const [isNewBill, setIsNewBill] = useState(true);
	const [suppliersList, setSuppliersList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [bankList, setBankList] = useState([]);
	const [form] = Form.useForm();

    useEffect(() => {
		loadAccounts();
		loadSuppliers();
        loadCategories();
        loadBanks();
	}, []);

	function loadAccounts() {
		api.get("/accounting_record/findByType", {
			params: {
				userId: localStorage.getItem("userId"),
				type: true
			}
		}).then((response) => {
			if(response.status = 200){
				const accounts = response.data.map((item: any) => {
					return {
						key: item.id, 
						...item
					}
				})

				setTableData(accounts);
				setIsFetching(false);
			}
		}).catch((err) => {
			console.log("Erro")
		})
	}

    function loadSuppliers(){
        api.get("/supplier/findAll", {
            params: {
                userId: localStorage.getItem("userId")
            }
        }).then((response) => {
            if(response.status == 200){
                const fornecedores = response.data.map((item: any) => {
					return {
						key: item.id,
						value: item.id,
                        label: item.name
					}
				})
				setSuppliersList(fornecedores);
            }
        })
    }

    function loadCategories(){
        api.get("/category/findAll", {
			params: {
				userId: localStorage.getItem("userId")
			}
		}).then((response) => {
			if(response.status = 200){
				const categorias = response.data.map((item: any) => {
					return {
						key: item.id,
						value: item.id,
                        label: item.description
					}
				})

				setCategoryList(categorias);
			}
		}).catch((err) => {
			console.log("Erro")
		})
    }

    function loadBanks(){
        api.get("/bank/findAll", {
			params: {
				userId: localStorage.getItem("userId")
			}
		}).then((response) => {
			if(response.status = 200){
				const banks = response.data.map((item: any) => {
					return {
						key: item.id,
						value: item.id,
                        label: item.bankName
					}
				})

				setBankList(banks);
			}
		}).catch((err) => {
			console.log("Erro")
		})
    }

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
				value: selectedRows[0].value
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
				return {
					id: isNewBill ? null : selectedRows[0].id,
					key: isNewBill ? null : selectedRowKeys[0],
                    idSupplier: bill.idSupplier,
                    idCategory: bill.idCategory,
                    idBank: bill.idBank,
                    idUser: localStorage.getItem("userId"),
                    emissionDateString: moment(bill.emissionDateString).format("DD-MM-YYYY"),
                    paymentDateString: moment(bill.paymentDateString).format("DD-MM-YYYY"),
                    maturityDateString: moment(bill.maturityDateString).format("DD-MM-YYYY"),
                    observation: bill.observation,
                    value: bill.value,
                    type: true,
				}
			});

		if(isNewBill) {
			api.post("/accounting_record", billsToSave)
			.then((response) => {
				setIsFetching(true);
				loadAccounts();
				onSaveBill(response);
			});
		} else {
			api.put("/accounting_record", billsToSave[0]).then((response) => {
				setIsFetching(true);
				loadAccounts();
				onSaveBill(response);
			})
		}

		setSelectedRowKeys([]);
		setSelectedRows([]);

		setIsModalVisible(false);
		setIsFetching(true);
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
					pageTittle='Contas a receber'
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
					supplierList={suppliersList}
					bankList={bankList}
					categoryList={categoryList}
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

export default ToReceive