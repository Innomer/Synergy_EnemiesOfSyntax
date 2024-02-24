"use client";

import React, { useEffect, useState } from "react";
import {
  ExportOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Button, Layout, Menu, Timeline, theme } from "antd";
import Sidebar from "./Sidebar/Sidebar";
import ApryseWebViewer from "./MainContext";
import toast from "react-hot-toast";
import axios from "axios";
import { siteConfig } from "@/lib/config/siteConfig";
import dayjs from "dayjs";
import { Tooltip } from "@nextui-org/react";

const { Header, Content, Footer } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

export default function EmployeeDashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [selectedDocument, setSelectedDocument] = useState<any>();
  const [breadCrumpsData, setBreadCrumpsData] = useState([]);
  const [getCommitsForCurrentProject, setGetCommitsForCurrentProject] =
    useState([]);
  const [fileName, setFileName] = useState("");

  const downloadCurrentFile = () => {
    if (!selectedDocument.key) {
      toast.error("Please select a file first");
    }
    const anchor = document.createElement("a");
    anchor.href = selectedDocument.key;
    anchor.download = selectedDocument.key;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };
  async function compareCommit(id, name) {
    try {
      const { data } = await axios.post(
        `${siteConfig.baseUrl}/file/compare/${name}/${id}`
      );
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }
  async function rollbackCommit(id, name) {
    try {
      const { data } = await axios.post(
        `${siteConfig.baseUrl}/file/rollback/${name}/${id}`
      );
      console.log(data);
      toast.success("commit rolled back successfully");
    } catch (err) {
      toast.error("There was an erorr in rolling back the commti");
      console.log(err);
    }
  }

  async function getCommitData(filename) {
    try {
      console.log(selectedDocument);
      const { data } = await axios.get(
        `${siteConfig.baseUrl}/file/commit-history/file/Synergy/${filename}`
      );
      setGetCommitsForCurrentProject(data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    if (selectedDocument && selectedDocument.keyPath) {
      const url = selectedDocument.keyPath[0];
      //split at - into two parts the selectedDocument.keyPath[1] ans save them into partParts array
      const pathParts = selectedDocument.keyPath[1]
        ? selectedDocument.keyPath[1].split("-")
        : [];

      const fileNamee = decodeURIComponent(
        url.split("/").pop().split("%5C").pop()
      );
      setFileName(fileNamee);
      getCommitData(fileNamee);

      const formattedFileName = fileNamee
        .split(".")
        .slice(0, -1)
        .join(".")
        .replace(/_/g, " ");

      setBreadCrumpsData([...pathParts, formattedFileName]);
    }
  }, [selectedDocument]);

  return (
    <Layout className="h-screen">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        setSelectedDocument={setSelectedDocument}
      />
      <Layout>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          className="bg-slate-400 m-4 ml-0 rounded-lg rounded-l-none"
        >
          <Button
            type="default"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              color: `var(--font-color)`,
              backgroundColor: `var(--background-color-secondary)`,
              borderRadius: "0px 5px 5px 0px",
              borderColor: "var(--background-color-secondary)",
              width: 40,
              height: 40,
              boxShadow: "none",
            }}
          />
          <Button
            className="export-button flex align-middle justify-center mx-6"
            onClick={downloadCurrentFile}
          >
            Export
            <ExportOutlined className="ml-3" />
          </Button>
        </div>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            {breadCrumpsData.map((item, index) => (
              <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
            ))}
          </Breadcrumb>

          <div
            className="min-h-[500px] p-6 mb-12 flex flex-col gap-y-20"
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {selectedDocument?.key && (
              <ApryseWebViewer url={selectedDocument?.key || ""} />
            )}
            <Timeline
              items={getCommitsForCurrentProject.map((commit: any, index) => ({
                color: index === 0 ? "green" : "blue", // Adjust color based on some logic if necessary
                children: (
                  <>
                    <div key={commit.commitId}>
                      <p className="mr-3">
                        {dayjs(commit.timestamp).format("h:mma D MMMM, YYYY")}
                      </p>
                      <p>{'"' + commit.commitMessage + '"'}</p>{" "}
                    </div>
                    {index !== 0 && (
                      <div className="flex gap-x-3">
                        <Button
                          size="small"
                          onClick={() => {
                            rollbackCommit(commit.commitId, fileName);
                          }}
                        >
                          RollBack
                        </Button>
                        <Button
                          size="small"
                          onClick={() => {
                            compareCommit(commit.commitId, fileName);
                          }}
                        >
                          Compare Commit
                        </Button>
                      </div>
                    )}
                  </>
                ),
              }))}
            />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
