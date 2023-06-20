import React, { useState, useEffect } from 'react'
import TopButtons from '../../../components/TopButtons/TopButtons'
import { Key } from 'antd/es/table/interface';
import { CategoriesTableData, ValueForm } from './ICategories';
import CategoriesTable from './components/CategoriesTable';
import { Form } from "antd";
import CategoriesModal from './components/CategoriesModal';
import { Notification } from '../../../components/Notification/Notification';

const Categories = () => {

	const [tableData, setTableData] = useState<CategoriesTableData[]>([]);
	const [isFetching, setIsFetching] = useState(true);
	const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
	const [selectedRows, setSelectedRows] = useState<CategoriesTableData[]>([]);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isNewCategory, setIsNewCategory] = useState(true);
	const [newCategoryList, setNewCategoryList] = useState<ValueForm[]>([]);
	const [searchValue, setSearchValue] = useState("");
	const [form] = Form.useForm();

	useEffect(() => {
		const categorias = [
			{ key: 1, id: 12345, description: 'Aluguel', type: 2 },
			{ key: 2, id: 67890, description: 'Pagamento', type: 1 },
			{ key: 3, id: 54321, description: 'IPTU', type: 2 },
		];

		setTableData(categorias);
		setIsFetching(false);
	}, []);

	function handleOpenModal(isNew: boolean) {
		if (isNew) {
			setIsNewCategory(true);
			setSelectedRowKeys([]);
			setSelectedRows([]);
			setNewCategoryList([]);
			form.resetFields();
		} else {
			form.setFieldsValue({
				description: selectedRows[0].description,
				type: selectedRows[0].type,
			});
			setIsNewCategory(false);
		}
		setIsModalVisible(true);
	}

	function handleCloseCategoryModal() {
		setSelectedRowKeys([]);
		setSelectedRows([]);
		form.resetFields();
		setIsModalVisible(false);
	};

	function handleIncludeCategories(data: ValueForm) {
		if (isNewCategory) {
			setNewCategoryList([...newCategoryList, data]);
		} else {
			handleSave([data]);
		}
		form.resetFields();
	}

	function handleSave(data: ValueForm[]) {

		const categoriesToSave = data.map(
			category => {

				const id = Math.floor(Math.random() * (9999 - 1 + 1)) + 1;

				return {
					id: isNewCategory ? id : selectedRows[0].id,
					key: isNewCategory ? id : selectedRowKeys[0],
					description: category.description,
					type: Number(category.type),
				}
			});

		setSelectedRowKeys([]);
		setSelectedRows([]);

		setIsModalVisible(false);
		setIsFetching(true);

		onSaveCategory(categoriesToSave);
	}

	function onSaveCategory(data: any) {
		if (data) {
			Notification({
				type: "success",
				message: "Salvo com sucesso!",
			});
		}
		form.resetFields();

		let tableList = [...tableData];

		if(!isNewCategory) {
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

		onDeleteCategory(tableList);
	}

	function onDeleteCategory(response: CategoriesTableData[]) {
        if(response){
            Notification({
                type: "success", 
                message: "Deletado com sucesso", 
            });
        }

		setTableData(response);
        
		setIsFetching(false);
    };

	function onSelectRowChange(selectedRowKeys: Key[], selectedRows: CategoriesTableData[]) {
		setSelectedRows(selectedRows);
		setSelectedRowKeys(selectedRowKeys);
	};

	function onChangeSearch({ target: { value } }: React.ChangeEvent<HTMLInputElement>) {
		setSearchValue(value);
	}

	let filteredData = tableData.filter(item => item.description.toLowerCase().includes(searchValue.toLowerCase()));

	return (
		<main id="main">
			<div className='main-container'>
				<TopButtons
					pageTittle='Categorias'
					mainButtonTitle="Nova categoria"
					handleNew={() => handleOpenModal(true)}
					handleEdit={() => handleOpenModal(false)}
					handleDelete={handleDelete}
					handleSearch={onChangeSearch}
					isEditable={selectedRows.length === 1}
					isDeletable={selectedRows.length > 0}
				/>
				<CategoriesModal
					isModalVisible={isModalVisible}
					isNew={isNewCategory}
					handleCancel={handleCloseCategoryModal}
					handleSubmit={handleIncludeCategories}
					handleSave={handleSave}
					newList={newCategoryList}
					setNewList={setNewCategoryList}
					form={form}
				/>
				<CategoriesTable
					isFetching={isFetching}
					tableData={filteredData}
					selectedRowKeys={selectedRowKeys}
					onChange={onSelectRowChange}
				/>
			</div>
		</main>
	)
}

export default Categories