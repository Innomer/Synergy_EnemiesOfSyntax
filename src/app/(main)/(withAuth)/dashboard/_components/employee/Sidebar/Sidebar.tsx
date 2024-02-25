"use client";
//Third party
import { Layout } from "antd";

//Page specific
import "./SidebarStyles.css";
import App from "./Menu";

interface SideBarProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedDocument: React.Dispatch<React.SetStateAction<undefined>>;
}

export default function Sidebar({
  collapsed,
  setCollapsed,
  setSelectedDocument,
}: SideBarProps) {
  const { Sider } = Layout;

  return (
    <>
      <Sider
        trigger={null}
        collapsible
        breakpoint="md"
        className="!min-h-screen"
        style={{
          backgroundColor: `var(--background-color-secondary)`,
        }}
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <App setSelectedDocument={setSelectedDocument} />
      </Sider>
    </>
  );
}
