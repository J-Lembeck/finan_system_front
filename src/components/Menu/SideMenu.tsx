import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import type { MenuProps, MenuTheme } from 'antd';
import { Menu, Switch } from 'antd';
import { Link } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem(<Link to="/dashboard" >Dashboard</Link>, '1', <Icon icon="ant-design:stock-outlined" style={{ fontSize: "20px" }} />),

    getItem('Contas', 'sub1', <Icon icon="ph:money-thin" style={{ fontSize: "20px" }} />, [
        getItem('A pagar', '3'),
        getItem('A receber', '4'),
    ]),

    getItem('Cadastros', 'sub2', <Icon icon="carbon:enterprise" style={{ fontSize: "20px" }} />, [
        getItem(<Link to="/suppliers" >Fornecedores</Link>, '7'),
        getItem(<Link to="/categories" >Categorias</Link>, '8'),
        getItem(<Link to="/clients" >Clientes</Link>, '9'),
        getItem(<Link to="/banks" >Bancos</Link>, '10'),
    ]),
];

export default function SideMenu() {
    const [theme, setTheme] = useState<MenuTheme>('dark');
    const [current, setCurrent] = useState('1');

    const changeTheme = (value: boolean) => {
        setTheme(value ? 'dark' : 'light');
    };

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    return (
        <>
            {/* <div>
                <Switch
                    checked={theme === 'dark'}
                    onChange={changeTheme}
                    checkedChildren="Dark"
                    unCheckedChildren="Light"
                />
            </div>
            <br />
            <br /> */}
            <Menu
                theme={theme}
                onClick={onClick}
                style={{ width: 256 }}
                defaultOpenKeys={['sub1']}
                selectedKeys={[current]}
                mode="inline"
                items={items}
                id="main-menu"
            />
        </>
    );
};