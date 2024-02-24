import React, { useEffect, useState } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  PlusCircleOutlined,
  SettingOutlined,
  ToolOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
  FileImageOutlined,
  FileWordOutlined,
  FolderOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import axios from "axios";
import toast from "react-hot-toast";

type MenuItem = Required<MenuProps>["items"][number];

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

// Utility function to map categories to icons
const getCategoryIcon = (category) => {
  const mapping = {
    cad: <ToolOutlined />,
    images: <FileImageOutlined />,
    documents: <FilePdfOutlined />,
    misc: <AppstoreOutlined />,
    word: <FileWordOutlined />,
    excel: <FileExcelOutlined />,
    text: <FileTextOutlined />,
  };
  return mapping[category] || <FolderOutlined />; // Default to FolderOutlined if category is not listed
};

const App = ({
  setSelectedDocument,
}: {
  setSelectedDocument: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    async function getSideBarLinks() {
      try {
        const { data } = await axios.get("http://192.168.172.157:8080/file/fs"); // Change this to your actual endpoint
        console.log(data);
        const dynamicItems = data.map((project) => {
          const projectName = Object.keys(project)[0];
          const fileCategories = project[projectName];

          const children = Object.entries(fileCategories).map(
            ([category, files]) => {
              const fileItems = Object.entries(files).map(
                ([filename, fileDetails]) => {
                  return getItem(filename, fileDetails.filepath);
                }
              );

              return getItem(
                category,
                `${projectName}-${category}`,
                getCategoryIcon(category),
                fileItems
              );
            }
          );

          return getItem(
            projectName,
            projectName,
            <FolderOutlined />,
            children
          );
        });

        // Add static items to the top and bottom
        const staticTopItem = getItem(
          "Projects & Files",
          "grp",
          null,
          dynamicItems,
          "group"
        );
        const staticBottomItems = [
          { type: "divider" },
          getItem(
            "General",
            "grp",
            null,
            [
              getItem("Settings", "13", <SettingOutlined />),
              getItem("Create project", "14", <PlusCircleOutlined />),
            ],
            "group"
          ),
        ];

        setMenuItems([staticTopItem, ...staticBottomItems]);
      } catch (err) {
        toast.error("Error fetching sidebar links");
        console.log(err);
      }
    }
    getSideBarLinks();
  }, []);

  const onClick = (e) => {
    console.log(e);
    setSelectedDocument(e);
  };

  return <Menu onClick={onClick} mode="inline" items={menuItems} />;
};

export default App;
