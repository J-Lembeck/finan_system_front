import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserOutlined } from '@ant-design/icons';
import "./style.sass";
import { Avatar, Dropdown, MenuProps } from 'antd';
import ChangePasswordModal from "./components/ChangePasswordModal";

const Navbar = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const isIndexPath = location.pathname === '/';

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <a onClick={handleChangePassword}>
                    Trocar senha
                </a>
            )
        },
        {
            key: '2',
            label: (
                <a onClick={handleLogOut}>
                    Sair
                </a>
            )
        }
    ];

    function handleChangePassword() {
        setIsModalOpen(true);
    }

    function handleLogOut() {
        localStorage.removeItem("userId");
        navigate("/");
    }

    return (
        <>
            {!isIndexPath &&
            <nav className='navbar'>
                <h1 style={{ color: "white" }}>FINANSystem</h1>
                <Dropdown menu={{ items }} placement="bottomRight" arrow>
                    <Avatar size={40} icon={<UserOutlined />} />
                </Dropdown>
            </nav>}

            <ChangePasswordModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
            />
        </>
    )
}

export default Navbar