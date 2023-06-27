import api from "../../services/api"
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button } from "antd";

function Login() {

    const navigate = useNavigate();

    const onFinish = (values: any) => {
        api.post("/user/login", {
            userName: values.userName,
            password: values.passWord
        }).then((response) => {
            if(response.data.auth){
                console.log(response.data.id)
                localStorage.setItem("userId", response.data.id);
                navigate("/dashboard");
            }
        })
    }

    return (
        <div className="container">
            <Form
                name="login"
                className="form-login"
                layout="vertical"
                onFinish={onFinish}
            >
                <h1>Login</h1>
                <Form.Item
                    label="Usuário"
                    name="userName"
                    rules={[{ required: true, message: "É necessário informar seu usuário." }]}
                >
                    <Input className="inputs-login" />
                </Form.Item >
                <Form.Item
                    label="Senha"
                    name="passWord"
                    rules={[{ required: true, message: "É necessário informar sua senha." }]}
                >
                    <Input.Password className="inputs-login" />
                </Form.Item>
                <Form.Item wrapperCol={{ span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Login;