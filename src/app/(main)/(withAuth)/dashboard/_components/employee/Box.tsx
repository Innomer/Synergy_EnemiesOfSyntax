//Third part
import React, { type ReactNode } from 'react';
import { Layout } from 'antd';

//Page specific
import './tableStyles.css';
import './filterStyles.css';

//components|hooks|utils
import Sidebar from './Sidebar/Sidebar';
import Navbar from './Navbar';

const { Content } = Layout;

interface boxProps {
  children: ReactNode;
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

interface filterProps {
  children: ReactNode;
}

interface TableProps {
  children: ReactNode;
}

const FilterBoxComponent: React.FC<filterProps> = ({ children }) => {
  return (
    <div
      style={{
        padding: '12px',
        background: `var(--fill-color)`,
        boxShadow: '0 3px 16px rgb(119, 43, 237,0.1)',
        borderRadius: '8px',
        marginBottom: '30px'
      }}
    >
      {children}
    </div>
  );
};

const TableBoxComponent: React.FC<TableProps> = ({ children }) => {
  return (
    <div
      style={{
        background: `var(--background-color-secondary)`,
        boxShadow: '0 0px 16px rgb(119, 43, 237,0.35)',
        borderRadius: '12px'
      }}
    >
      {children}
    </div>
  );
};

const Box: React.FC<boxProps> = ({ children, collapsed, setCollapsed }) => {
  return (
    <Layout
      style={{
        margin: '8px',
        marginRight: '0',
        display: 'flex'
      }}
    >
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout>
        <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content
          style={{
            padding: '18px 9px 10px 20px',
            background: 'var(--background-color)',
            backgroundColor: 'var(--background-color)'
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export { Box, FilterBoxComponent, TableBoxComponent };
