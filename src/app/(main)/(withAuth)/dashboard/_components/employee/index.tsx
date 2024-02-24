"use client";

import React, { useEffect, useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import Sidebar from "./Sidebar/Sidebar";
import ApryseWebViewer from "./MainContext";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

export default function EmployeeDashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [selectedDocument, setSelectedDocument] = useState("");
  const [breadCrumpsData, setBreadCrumpsData] = useState("");

  useEffect(() => {
    const url = selectedDocument.keyPath[0];
    const fileName = decodeURIComponent(
      url.split("/").pop().split("%5C").pop()
    );
    const formattedFileName = fileName
      .split(".")
      .slice(0, -1)
      .join(".")
      .replace(/_/g, " ");
    setBreadCrumpsData([formattedFileName]);
  }, [selectedDocument]);

  return (
    <Layout className="h-screen">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        setSelectedDocument={setSelectedDocument}
      />
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
            {selectedDocument.keypath.slice(1).map((item, index) => (
              <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
            ))}
            <Breadcrumb.Item>{formattedFileName}</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="min-h-[500px] p-6"
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <ApryseWebViewer url={selectedDocument.key} />
          </div>
        </Content>
        {/* <Footer style={{ textAlign: "center" }}>Hi hello</Footer> */}
      </Layout>
    </Layout>
  );
}
