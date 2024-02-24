"use client";
//Third party
import { Layout, Menu } from "antd";

//Page specific
import "./SidebarStyles.css";
import { SidebarLinks } from "./SidebarItems";
import { Link } from "@nextui-org/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  UserOutlined,
  CreditCardOutlined,
  UnorderedListOutlined,
  CarOutlined,
  IdcardOutlined,
  MenuOutlined,
  HomeOutlined,
  FolderOutlined,
  DatabaseOutlined,
  ToolOutlined,
  TeamOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { FileText, Sheet, FileCode2, FileVideo2 } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import App from "./Menu";
import { siteConfig } from "@/lib/config/siteConfig";
interface MenuItem {
  key: string;
  icon: React.ReactNode;
  label: string;
  route?: string;
  children?: MenuItem[];
}

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
  const [sideBarLinks, setSideBarLinks] = useState();
  const location = usePathname();

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }

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
