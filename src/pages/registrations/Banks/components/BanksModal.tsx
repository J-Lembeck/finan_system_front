import { Button, Col, Form, Input, Modal, Row } from 'antd';
import React, { useState } from 'react'
import { Notification } from '../../../../components/Notification/Notification';
import { Icon } from '@iconify/react';
import { IBanksModalProps, ValueForm } from '../IBanks';

const BanksModal = ({
    isModalVisible,
    isNew,
    handleCancel,
    handleSubmit,
    handleSave,
    newList,
    setNewList,
    form
}: IBanksModalProps) => {

    const modalTitle = isNew ? "Novo banco" : "Editar banco";
    const [editDisebled, setEditDisebled] = useState(false);

    function handleEditListItem(bank: ValueForm) {
        setEditDisebled(true);
        form.setFieldsValue({
            description: bank.description,
            account: bank.account,
            balance: bank.balance,
        })
        handleDeleteListItem(bank.account);
    }

    function handleDeleteListItem(code: string) {
		const banks = [...newList];
		const i = banks.findIndex((bank) => (bank.account === code));
		banks.splice(i, 1);
		setNewList(banks);
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
                            name="description"
                            label="Descrição"
                            rules={[{ required: true, message: "Campo obrigatório" }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8} style={{ marginRight: 20 }}>
                        <Form.Item
                            name="account"
                            label="Conta"
                            rules={[{ required: true, message: "Campo obrigatório" }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={7}>
                        <Form.Item
                            name="balance"
                            label="Saldo inicial"
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
                                <Col span={10}>Descrição</Col>
                                <Col span={6}>Conta</Col>
                                <Col span={6}>Saldo inicial</Col>
                                <Col span={1} />
                                <Col span={1} />
                            </Row>
                        </div>
                        <div className="new-account-table-body">
                            {newList.map((bank) => {
                                return (
                                    <Row key={bank.account} align="middle" gutter={2}>
                                        <Col span={10}>{bank.description}</Col>
                                        <Col span={6}>{bank.account}</Col>
                                        <Col span={6}>{bank.balance}</Col>
                                        <Col span={1}>
                                            <Button
                                                disabled={editDisebled}
                                                onClick={() => handleEditListItem(bank)}
                                                icon={<Icon className="edit-button" icon="material-symbols:edit-sharp" />}
                                            />
                                        </Col>
                                        <Col span={1}>
                                            <Icon
                                                className="delete-icon"
                                                onClick={() => handleDeleteListItem(bank.account)}
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

export default BanksModal