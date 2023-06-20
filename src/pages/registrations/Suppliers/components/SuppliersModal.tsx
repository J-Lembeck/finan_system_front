import { Button, Col, Form, Input, Modal, Row } from 'antd'
import React, { useState } from 'react'
import { ISuppliersModalProps, ValueForm } from '../ISuppliers'
import { Icon } from '@iconify/react';
import { Notification } from '../../../../components/Notification/Notification';


const SuppliersModal = ({
    isModalVisible,
    isNew,
    handleCancel,
    handleSubmit,
    handleSave,
    newList,
    setNewList,
    form
}: ISuppliersModalProps) => {

    const modalTitle = isNew ? "Novo fornecedor" : "Editar fornecedor";
    const [editDisebled, setEditDisebled] = useState(false);
    const [value, setValue] = useState('');

    function handleEditListItem(supplier: ValueForm) {
        setEditDisebled(true);
        form.setFieldsValue({
            identification: supplier.identification,
            name: supplier.name,
            tel: supplier.tel,
        })
        handleDeleteListItem(supplier.identification);
    }

    function handleDeleteListItem(code: string) {
		const suppliers = [...newList];
		const i = suppliers.findIndex((supplier) => (supplier.identification === code));
		suppliers.splice(i, 1);
		setNewList(suppliers);
    }

    const handleInputChange = (event: any) => {
        const inputValue = event.target.value;
        const telephoneValue = inputValue.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
        const formattedValue = formatTelephone(telephoneValue); // Formata o número de telefone

        setValue(formattedValue);
    };
    
    const formatTelephone = (value: string) => {
        const formattedValue = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
        console.log(formattedValue);
        console.log(value);
        return formattedValue;
    };

    return (
        <Modal
            width={800}
            title={modalTitle}
            open={isModalVisible}
            okButtonProps={!isNew ? { htmlType: "submit", form: "new-form" } : {}}
            onCancel={() => {
                handleCancel()
            }}
            className="gs-modal link-account-modal"
            cancelText="Cancelar"
            okText="Salvar"
            onOk={() => {
                if(isNew){
                    if(newList.length > 0){
                        handleSave(newList);
                    }else{
                        Notification({
							type: 'warning',
							message: 'Nenhum item adicionado a lista.'
						})
                    }
                }
            }}
            centered
        >
            <Form
                form={form}
                name="new-form"
                className={isNew ? "form-new" : ""}
                onFinish={(data) => {
                    setEditDisebled(false)
                    handleSubmit(data);
                }}
            >
                <Row>
                    <Col span={7} style={{ marginRight: 20 }}>
                        <Form.Item
                            name="identification"
                            label="CPF/CNPJ"
                            rules={[{ required: true, message: "Campo obrigatório" }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8} style={{ marginRight: 20 }}>
                        <Form.Item
                            name="name"
                            label="Nome"
                            rules={[{ required: true, message: "Campo obrigatório" }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={7}>
                        <Form.Item
                            name="tel"
                            label="Telefone"
                            rules={[{ required: true, message: "Campo obrigatório" }]}
                        >
                            <Input value={value} onChange={handleInputChange} />
                        </Form.Item>
                    </Col>
                </Row>
                <div>
                    {isNew &&
                        <Button
                        style={{marginTop: 20, marginLeft: "auto", marginRight: "20px"}}
                        type="default"
                        htmlType="submit"
                        className="gs-secondary-button"
                        icon={<Icon icon="akar-icons:circle-plus-fill" />}
                        >Adicionar à lista</Button>}
                </div>
            </Form>
                {isNew &&
                    (newList.length > 0 ?
                        <>
                            <div className="new-account-table-head">
                                <Row align="middle" gutter={2}>
                                    <Col span={7}>CPF/CNPJ</Col>
                                    <Col span={8}>Nome</Col>
                                    <Col span={7}>Telefone</Col>
                                    <Col span={1} />
                                    <Col span={1} />
                                </Row>
                            </div>
                            <div className="new-account-table-body">
                                {newList.map((supplier) => {
                                    return (
                                        <Row key={supplier.identification} align="middle" gutter={2}>
                                            <Col span={7}>{supplier.identification}</Col>
                                            <Col span={8}>{supplier.name}</Col>
                                            <Col span={7}>{supplier.tel}</Col>
                                            <Col span={1}>
                                                <Button
                                                    disabled={editDisebled}
                                                    onClick={() => handleEditListItem(supplier)}
                                                    icon={<Icon className="edit-button" icon="material-symbols:edit-sharp" />}
                                                />
                                            </Col>
                                            <Col span={1}>
                                                <Icon
                                                    className="delete-icon"
                                                    onClick={() => handleDeleteListItem(supplier.identification)}
                                                    icon="fa6-solid:trash"
                                                />
                                            </Col>
                                        </Row>
                                    );
                                })}
                            </div>
                        </>
                        :
                        <div className="modal-list-empty">
                            <Icon icon="icomoon-free:file-empty" />
                            <p>Nenhum item adicionado à lista</p>
                        </div>
                    )
                }
        </Modal>
    )
}

export default SuppliersModal