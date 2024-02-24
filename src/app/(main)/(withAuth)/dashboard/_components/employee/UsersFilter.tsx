"use client";
//Third party
import React, { useEffect, useState } from "react";
import {
  ClearOutlined,
  ReloadOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Form, Tooltip, message } from "antd";

//components|hooks|utils
import ExportOptionsDropdown from "./";

export default function UsersFilter({
  setReloadTrigger,
  reloadingCurrentlyOrNot,
  filters,
  setFilters,
  data,
  together,
  setTogether,
}: any) {
  const [lastRefreshTime, setLastRefreshTime] = useState<Date>(new Date());
  const [lastRefreshTimeFormatted, setLastRefreshTimeFormatted] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  //for exporting
  const tableData = {
    columns: [
      { dataKey: "id", header: "ID" },
      { dataKey: "name", header: "Name" },
      { dataKey: "mobileNumber", header: "Mobile Number" },
      { dataKey: "shiftStartTime", header: "Shift Start Time" },
      { dataKey: "shiftEndTime", header: "Shift End Time" },
      { dataKey: "gender", header: "Gender" },
      { dataKey: "email", header: "Email" },
      { dataKey: "readableDOB", header: "Date of Birth" },
    ],
    data,
  };
  console.log("data", data);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeDiff = now.getTime() - lastRefreshTime.getTime();
      let message = "";
      const minutes = Math.floor(timeDiff / (1000 * 60));
      const hours = Math.floor(
        (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

      if (days) {
        message = `${days} day${days > 1 ? "s" : ""} ago`;
      } else if (hours) {
        message = `${hours} hour${hours > 1 ? "s" : ""} ago`;
      } else {
        message = `${minutes} minutes ago`;
      }

      setLastRefreshTimeFormatted(message); // Set the formatted message
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, [lastRefreshTime]);

  useEffect(() => {
    if (reloadingCurrentlyOrNot) {
      setLastRefreshTime(new Date());
      setLastRefreshTimeFormatted("now");
    }
  }, [reloadingCurrentlyOrNot]);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            // flexWrap: `${width < 768 ? "wrap" : "nowrap"}`,
            alignItems: "center",
          }}
        >
          {/* <ExportOptionsDropdown
            tableData={tableData}
            width={width}
            filename="Operator_data"
          /> */}

          {/* <Tooltip title={`Clear filters and sorters`}>
            <Button
              onClick={dealingWithClearFilters}
              className="small-button"
              style={{
                ...smallButtonStyleProps,
                marginRight: `${
                  width >= 992
                    ? "2rem"
                    : `${width < 992 && width >= 768 ? "1.3rem" : "0.3rem"}`
                }`,
              }}
            >
              <ClearOutlined />
            </Button>
          </Tooltip> */}

          <Tooltip title={`Last refresh ${lastRefreshTimeFormatted}`}>
            <Button
              className="small-button"
              // style={{
              //   ...smallButtonStyleProps,
              //   marginRight: `${
              //     width >= 992
              //       ? "2rem"
              //       : `${width < 992 && width >= 768 ? "1.3rem" : "0.3rem"}`
              //   }`,
              // }}
              onClick={() => {
                // setReloadTrigger((prev) => prev + 1);
              }}
            >
              {reloadingCurrentlyOrNot ? (
                <ReloadOutlined spin />
              ) : (
                <ReloadOutlined />
              )}
            </Button>
          </Tooltip>
        </div>
      </div>
    </>
  );
}
