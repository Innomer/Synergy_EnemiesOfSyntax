"use client"
import React, { useRef, useEffect } from "react";
import WebViewer from "@pdftron/webviewer";

const ApryseWebViewer = ({ url }: { url: string }) => {
  console.log("inside apryse web viewer");
  console.log(url)
  const viewer = useRef(null);
  useEffect(() => {
    WebViewer(
      {
        path: "/webviewer/lib",
        webviewerServerURL: "http://192.168.251.59:8090/",
        // webviewerServerURL: "http://65.0.82.14:8090/",
        initialDoc: url,
      },
      viewer.current!
    ).then((instance) => {
    });
  }, []);

  return (
    <div>
      <div ref={viewer} id="viewer" style={{ height: "100vh" }}></div>
    </div>
  );
};

export default ApryseWebViewer;

export const AppryseComparisonTextPDfViewer = () => {
  const viewer = useRef(null);
  useEffect(() => {
    WebViewer(
      {
        fullAPI: true,
        path: "/webviewer/lib",
      },
      document.getElementById("viewer")!
    ).then((instance) => {
      const { PDFNet } = instance.Core;
      instance.UI.addEventListener("viewerLoaded", async () => {
        await PDFNet.initialize();
        const getDocument = async (url) => {
          const newDoc = await instance.Core.createDocument(url);
          return await newDoc.getPDFDoc();
        };
        const [doc1, doc2] = await Promise.all([
          getDocument(
            "https://s3.amazonaws.com/pdftron/pdftron/example/test_doc_1.pdf"
          ),
          getDocument(
            "https://s3.amazonaws.com/pdftron/pdftron/example/test_doc_2.pdf"
          ),
        ]);
        const getPageArray = async (doc) => {
          const arr = [];
          const itr = await doc.getPageIterator(1);
          for (itr; await itr.hasNext(); itr.next()) {
            const page = await itr.current();
            arr.push(page);
          }
          return arr;
        };
        const [doc1Pages, doc2Pages] = await Promise.all([
          getPageArray(doc1),
          getPageArray(doc2),
        ]);
        console.log(doc1Pages, doc2Pages);
        const newDoc = await PDFNet.PDFDoc.create();
        newDoc.lock();
        const biggestLength = Math.max(doc1Pages.length, doc2Pages.length);
        for (let i = 0; i < biggestLength; i++) {
          let page1 = doc1Pages[i];
          let page2 = doc2Pages[i];
          if (!page1) {
            page1 = await doc1.pageCreate(); // create a blank page
          }
          if (!page2) {
            page2 = await doc2.pageCreate(); // create a blank page
          }
          await newDoc.appendVisualDiff(page1, page2);
        }
        newDoc.unlock();
        instance.UI.loadDocument(newDoc);
      });
    });
  }, []);

  return (
    <div>
      <div ref={viewer} id="viewer" style={{ height: "100vh" }}></div>
    </div>
  );
};
