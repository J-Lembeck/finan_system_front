import { Col, Modal, Row, Form, Select, Input, DatePicker } from 'antd';
import { Notification } from '../../../../components/Notification/Notification';
import { IToPayModalProps } from '../IToReceive';
import { useEffect, useState } from 'react';
import api from '../../../../services/api';

const ToReceiveModal = ({
    isModalVisible,
    isNew,
    handleCancel,
    handleSave,
    form,
    supplierList,
    categoryList,
    bankList
}: IToPayModalProps) => {

    const modalTitle = isNew ? "Nova entrada" : "Editar entrada";

    return (
        <Modal
            width={820}
            title={modalTitle}
            open={isModalVisible}
            okButtonProps={{ htmlType: "submit", form: "new-form" }}
            onCancel={() => {
                handleCancel()
            }}
            className="gs-modal link-account-modal"
            cancelText="Cancelar"
            okText="Salvar"
            centered
        >
            <Form
                form={form}
                name="new-form"
                onFinish={(data) => {
                    handleSave([data]);
                }}
            >
                <Row>
                    <Col span={9} style={{ marginRight: 20 }}>
                        <Form.Item
                            name="maturityDateString"
                            label="Data Vencimento"
                            rules={[{ required: true, message: "Campo obrigatório" }]}
                        >
                            <DatePicker format={"DD/MM/YYYY"} />
                        </Form.Item>
                    </Col>
                    <Col span={14}>
                        <Form.Item
                            name="idSupplier"
                            label="Fornecedor"
                            rules={[{ required: true, message: "Campo obrigatório" }]}
                        >
                            <Select
                                defaultValue="Selecione"
                                options={supplierList}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={9} style={{ marginRight: 20 }}>
                        <Form.Item
                            name="value"
                            label="Valor"
                            rules={[{ required: true, message: "Campo obrigatório" }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={7} style={{ marginRight: 20 }}>
                        <Form.Item
                            name="paymentDateString"
                            label="Data Pagamento"
                            rules={[{ required: true, message: "Campo obrigatório" }]}
                        >
                            <DatePicker format={"DD/MM/YYYY"} />
                        </Form.Item>
                    </Col>
                    <Col span={7} style={{ flex: "none", width: "205px" }}>
                        <Form.Item
                            name="idBank"
                            label="Banco"
                            rules={[{ required: true, message: "Campo obrigatório" }]}
                        >
                            <Select
                                defaultValue="Selecione"
                                options={bankList}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={14} style={{ marginRight: 20 }}>
                        <Form.Item
                            name="idCategory"
                            label="Categoria"
                            rules={[{ required: true, message: "Campo obrigatório" }]}
                        >
                            <Select
                                defaultValue="Selecione"
                                options={categoryList}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={9}>
                        <Form.Item
                            name="emissionDateString"
                            label="Data Emissão"
                            rules={[{ required: true, message: "Campo obrigatório" }]}
                        >
                            <DatePicker format={"DD/MM/YYYY"} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{ marginRight: 5 }}>
                        <Form.Item
                            name="observation"
                            label="Observação"
                            rules={[{ required: true, message: "Campo obrigatório" }]}
                        >
                            <Input.TextArea rows={1} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    )
}

export default ToReceiveModal