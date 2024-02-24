import React, { useRef, useEffect } from "react";
import WebViewer from "@pdftron/webviewer";

const ApryseWebViewer = ({ url }: { url: string }) => {
  const viewer = useRef(null);
  useEffect(() => {
    WebViewer(
      {
        path: "/webviewer/lib",
        webviewerServerURL: "http://192.168.159.59:8090",
        initialDoc: url,
      },
      viewer.current!
    ).then((instance) => {
      // You can now use the WebViewer instance API here
    });
  }, []);

  return (
    <div>
      <div ref={viewer} style={{ height: "100vh" }}></div>
      <div></div>
    </div>
  );
};

export default ApryseWebViewer;
