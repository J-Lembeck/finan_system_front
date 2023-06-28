import React, { useState } from 'react'
import { Icon } from '@iconify/react';
import { Button, Col, Form, Input, Modal, Row, Select } from 'antd';
import { Notification } from '../../../../components/Notification/Notification';
import { ICategoriesModalProps, ValueForm } from '../ICategories';

const CategoriesModal = ({
    isModalVisible,
    isNew,
    handleCancel,
    handleSubmit,
    handleSave,
    newList,
    setNewList,
    form
}: ICategoriesModalProps) => {

    const modalTitle = isNew ? "Nova categoria" : "Editar categoria";
    const [editDisebled, setEditDisebled] = useState(false);

    function handleEditListItem(category: ValueForm) {
        setEditDisebled(true);
        form.setFieldsValue({
            description: category.description,
            type: Number(category.type)
        })
        handleDeleteListItem(category.description + category.type);
    }

    function handleDeleteListItem(code: string) {
        const category = [...newList];
        const i = category.findIndex((category) => ((category.description + category.type) === code));
        category.splice(i, 1);
        setNewList(category);
    }

    return (
        <Modal
            width={600}
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
                    <Col span={14} style={{ marginRight: 20 }}>
                        <Form.Item
                            name="description"
                            label="Descrição"
                            rules={[{ required: true, message: "Campo obrigatório" }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={9}>
                        <Form.Item
                            name="type"
                            label="Tipo"
                            rules={[{ required: true, message: "Campo obrigatório" }]}
                        >
                            <Select
                                defaultValue="Selecione"
                                options={[{ value: "PAY", label: 'Contas a pagar' }, { value: "RECEIVE", label: 'Contas a receber' }]}
                            />

                        </Form.Item>
                    </Col>
                </Row>
                <div>
                    {isNew &&
                        <Button
                            style={{ marginTop: 20, marginLeft: "auto", marginRight: "4px" }}
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
                                <Col span={12}>Descrição</Col>
                                <Col span={8}>Tipo</Col>
                                <Col span={1} />
                                <Col span={1} />
                            </Row>
                        </div>
                        <div className="new-account-table-body">
                            {newList.map((category) => {
                                return (
                                    <Row key={category.description + category.type} align="middle" gutter={2}>
                                        <Col span={12}>{category.description}</Col>
                                        <Col span={8}>{category.type === "PAY" ? "Contas a pagar" : "Contas a receber"}</Col>
                                        <Col span={1}>
                                            <Button
                                                disabled={editDisebled}
                                                onClick={() => handleEditListItem(category)}
                                                icon={<Icon className="edit-button" icon="material-symbols:edit-sharp" />}
                                            />
                                        </Col>
                                        <Col span={1}>
                                            <Icon
                                                className="delete-icon"
                                                onClick={() => handleDeleteListItem(category.description + category.type)}
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

export default CategoriesModal