import { useLocation } from "react-router-dom";
import { UserOutlined } from '@ant-design/icons';
import "./style.sass";
import { Avatar, Dropdown, MenuProps } from 'antd';

const Navbar = () => {

    const location = useLocation();
    const isIndexPath = location.pathname === '/';

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <a onClick={handleChangePassword}>
                    Trocar senha
                </a>
            ),
        }
    ];

    function handleChangePassword() {
        console.log("aaa")
    }

    return (
        <>
            {!isIndexPath &&
            <nav className='navbar'>
                <h1 style={{ color: "white" }}>LOGO</h1>
                <Dropdown menu={{ items }} placement="bottomRight" arrow>
                    <Avatar size={40} icon={<UserOutlined />} />
                </Dropdown>
            </nav>}
        </>
    )
}

export default Navbar