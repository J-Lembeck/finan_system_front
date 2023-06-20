import { Icon } from '@iconify/react';
import React, { useState } from 'react'
import { Button, Col, Form, Input, Modal, Row } from 'antd';
import { IClientsModalProps, ValueForm } from '../IClients';
import { Notification } from '../../../../components/Notification/Notification';

const ClientsModal = ({
    isModalVisible,
    isNew,
    handleCancel,
    handleSubmit,
    handleSave,
    newList,
    setNewList,
    form
}: IClientsModalProps) => {

    const modalTitle = isNew ? "Novo cliente" : "Editar cliente";
    const [editDisebled, setEditDisebled] = useState(false);

    function handleEditListItem(client: ValueForm) {
        setEditDisebled(true);
        form.setFieldsValue({
            identification: client.identification,
            name: client.name,
            tel: client.tel,
        })
        handleDeleteListItem(client.identification);
    }

    function handleDeleteListItem(code: string) {
		const clients = [...newList];
		const i = clients.findIndex((client) => (client.identification === code));
		clients.splice(i, 1);
		setNewList(clients);
    }

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
                if (isNew) {
                    if (newList.length > 0) {
                        handleSave(newList);
                    } else {
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
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <div>
                    {isNew &&
                        <Button
                            style={{ marginTop: 20, marginLeft: "auto", marginRight: "20px" }}
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
                            {newList.map((client) => {
                                return (
                                    <Row key={client.identification} align="middle" gutter={2}>
                                        <Col span={7}>{client.identification}</Col>
                                        <Col span={8}>{client.name}</Col>
                                        <Col span={7}>{client.tel}</Col>
                                        <Col span={1}>
                                            <Button
                                                disabled={editDisebled}
                                                onClick={() => handleEditListItem(client)}
                                                icon={<Icon className="edit-button" icon="material-symbols:edit-sharp" />}
                                            />
                                        </Col>
                                        <Col span={1}>
                                            <Icon
                                                className="delete-icon"
                                                onClick={() => handleDeleteListItem(client.identification)}
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

export default ClientsModal