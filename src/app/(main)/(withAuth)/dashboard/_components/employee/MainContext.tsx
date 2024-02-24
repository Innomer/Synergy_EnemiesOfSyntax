import React, { useRef, useEffect } from "react";
import WebViewer from "@pdftron/webviewer";

const ApryseWebViewer = ({ url }: { url: string }) => {
  const viewer = useRef(null);
  useEffect(() => {
    WebViewer(
      {
        path: "/webviewer/lib",
        webviewerServerURL: "http://192.168.159.59:8090",
        initialDoc:
          "https://aapkadhikar.s3.ap-south-1.amazonaws.com/uploads/colorwh.dwg",
      },
      viewer.current!
    ).then((instance) => {
      // You can now use the WebViewer instance API here
    });
  }, []);

  return <div ref={viewer} style={{ height: "100vh" }}></div>;
};

export default ApryseWebViewer;
