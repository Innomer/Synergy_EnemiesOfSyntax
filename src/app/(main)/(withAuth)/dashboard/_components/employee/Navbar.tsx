import { Dropdown, message, Button, Avatar, Menu } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axiosPrivateInstance from '../api/Axios/privateInstance';
import { AxiosError, AxiosRequestConfig } from 'axios';
import useAuth from '../Hooks/useAuth';
import ThemeSwitchButton from './ThemeSwitchButton';

interface buttonProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar = ({ collapsed, setCollapsed }: buttonProps) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleProfileClick = () => {
    setMenuVisible(false);
  };

  const handleLogoutClick = async () => {
    try {
      const options: AxiosRequestConfig = {
        url: 'toll/logout',
        method: 'POST'
      };
      await axiosPrivateInstance(options);
      setAuth({});
      navigate('/');
    } catch (err) {
      console.log(err);
      const error = err as AxiosError;
      if (!error.response) {
        message.error({
          content: 'No server response',
          duration: 3
        });
      } else {
        message.error({
          content: 'There was an error logging out',
          duration: 3
        });
      }
    } finally {
      setMenuVisible(false);
    }
  };

  const menu = (
    <Menu>
      <Menu.Item key="profile" onClick={handleProfileClick}>
        <UserOutlined style={{ marginRight: '15px' }} />
        Profile
      </Menu.Item>
      <Menu.Item key="logout" onClick={handleLogoutClick}>
        <LogoutOutlined style={{ marginRight: '15px' }} />
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: `var(--background-color)`
      }}
    >
      <Button
        className="collapseButton"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          color: `var(--font-color)`,
          backgroundColor: `var(--background-color-secondary)`,
          borderRadius: '0px 5px 5px 0px',
          borderColor: 'var(--background-color-secondary)',
          width: 40,
          height: 40,
          boxShadow: 'none'
        }}
      />

      <div style={{ display: 'flex' }}>
        <ThemeSwitchButton />
        <Dropdown overlay={menu} visible={menuVisible} onVisibleChange={setMenuVisible}>
          <Avatar
            style={{ marginRight: '16px' }}
            size={'default'}
            icon={<UserOutlined />}
            onClick={() => setMenuVisible(!menuVisible)}
          />
        </Dropdown>
      </div>
    </div>
  );
};

export default Navbar;
