import { Form, Input, Button, Modal, message } from 'antd'
import { useState } from 'react';
import { IChangePassowrdModalProps, IValueForm } from './IChangePaswordModalProps';
import api from '../../../services/api';

function ChangePasswordModal({ isModalOpen, setIsModalOpen } : IChangePassowrdModalProps){

    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    function onFinish(data: any) {
        api.post("/user/changePassword", {
            userId: Number(localStorage.getItem("userId")),
            password: data.password,
            newPassword: data.newPassword
        }).then((response) => {
            console.log(response.status);
            if(response.status == 200){
                messageApi.success('Senha alterada');
            }
        }).catch((err) => {
            console.log(err)
            messageApi.error('Senha atual incorreta');
        })
    }

    function handleCancel() {
        setIsModalOpen(false);
    }

    return (
        <>
            {contextHolder}
            <Modal title="Trocar senha" 
                open={isModalOpen} 
                onCancel={handleCancel}
                onOk={() => {
                        form
                        .validateFields()
                        .then((values) => {
                            onFinish(values);
                        })
                }}
                >
                <Form
                    name="changePassword"
                    form={form}
                    className="form-login"
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Senha"
                        name="password"
                        rules={[{ required: true, message: "É necessário informar sua senha." }]}
                    >
                        <Input.Password className="inputs-login" />
                    </Form.Item>
                    <Form.Item
                        label="Nova Senha"
                        name="newPassword"
                        rules={[{ required: true, message: "É necessário informar sua senha." }]}
                    >
                        <Input.Password className="inputs-login" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default ChangePasswordModal;