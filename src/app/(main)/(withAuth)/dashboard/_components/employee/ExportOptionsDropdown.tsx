import { useState } from 'react';
import { Button, Dropdown, Menu, message } from 'antd';
import { FileExcelOutlined, ExportOutlined, ReloadOutlined, FilePdfOutlined } from '@ant-design/icons';
import { smallButtonStyleProps } from '../Styles/CSS/CommonProps/smallButtonStyleProps';
import handlingPDFExport, { orientationProps } from '../utils/handlingPDFExport';
import handlingCSVExport from '../utils/handlingCSVExport';
import dayjs from "dayjs";

type tableData = {
  columns: {
    dataKey: string;
    header: string;
  }[];
  data: Record<string, unknown>[];
};

type ExportOptionsDropdown = {
  width: number;
  tableData: tableData;
  filename: string;
  title?: string;
};

export default function ExportOptionsDropdown({ width, tableData, filename, title }: ExportOptionsDropdown) {
  const [isExportLoading, setIsExportLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const exportPDFLastDate = localStorage.getItem("exportPDFLastDate") || "";
  const exportCSVLastDate = localStorage.getItem("exportCSVLastDate") || "";
  const canExportPDF =
    !exportPDFLastDate || dayjs().diff(dayjs(exportPDFLastDate), "day") > 1;
  const canExportCSV =
    !exportCSVLastDate || dayjs().diff(dayjs(exportCSVLastDate), "day") > 1;
  //TODO display the component depending on role and how many times they can export

  const exportToPDF = (format: orientationProps) => {
    if (tableData.data.length === 0) {
      messageApi.warning({
        style: { backgroundColor: '#E19B12' },
        content: 'There is no data currently!',
        duration: 3
      });
      console.log('No data');
      return;
    }
    handlingPDFExport(
      tableData,
      filename,
      //! custom orientation
      format,
      setIsExportLoading,
      title
    );
    localStorage.setItem("exportPDFLastDate", Date.now().toString());
  };

  const exportToCSV = () => {
    if (tableData.data.length === 0) {
      messageApi.warning({
        style: { backgroundColor: '#E19B12' },
        content: 'There is no data currently!',
        duration: 3
      });
      console.log('No data');
      return;
    }
    handlingCSVExport(tableData, filename, setIsExportLoading);
    localStorage.setItem("exportCSVLastDate", Date.now().toString());
  };

  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item
            key="csv"
            onClick={exportToCSV}
            style={{
              display: 'flex',
              justifyContent: 'space-around'
            }}
          >
            {isExportLoading ? (
              <ReloadOutlined spin />
            ) : (
              <>
                <FileExcelOutlined style={{ marginRight: '4px' }} />
                Export as CSV
              </>
            )}
          </Menu.Item>

          <Menu.SubMenu
            title={
              isExportLoading ? (
                <ReloadOutlined spin />
              ) : (
                <>
                  <FilePdfOutlined style={{ marginRight: '4px' }} /> Export as PDF
                </>
              )
            }
          >
            <Menu.Item
              key="pdf-landscape"
              onClick={() => {
                exportToPDF('landscape');
              }}
            >
              Landscape
            </Menu.Item>
            <Menu.Item
              key="pdf-portrait"
              onClick={() => {
                exportToPDF('portrait');
              }}
            >
              Portrait
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      }
    >
      <Button
        className="export-button"
        style={{
          ...smallButtonStyleProps,
          padding: `${width >= 992 ? '0px 20px' : '0px'}`,
          marginRight: `${width < 762 ? '0.3rem' : '1.7rem'}`,
          height: `${width >= 992 ? '' : '35px'}`,
          width: `${width >= 992 ? '' : '35px'}`
        }}
      >
        {width >= 992 && 'Export'}
        <ExportOutlined />
      </Button>
    </Dropdown>
  );
}
