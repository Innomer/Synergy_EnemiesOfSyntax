const inputData = [
  {
    Synergy: {
      cad: {
        "colorwh.dwg": {
          filename: "colorwh.dwg",
          version: "Synergy\\colorwh.dwg_1708776840369",
          commitMessage: "Hello Test",
          commitId: "1708776840372",
          timestamp: "2024-02-24T12:14:00.372Z",
          filepath:
            "http://192.168.172.157:8080/download/static%5CSynergy%5Ccad%5Ccolorwh.dwg",
        },
      },
      images: {
        "Antariksh.png": {
          filename: "Antariksh.png",
          version: "Synergy\\Antariksh.png_1708776897357",
          commitMessage: "Hello Test",
          commitId: "1708776897363",
          timestamp: "2024-02-24T12:14:57.363Z",
          filepath:
            "http://192.168.172.157:8080/download/static%5CSynergy%5Cimages%5CAntariksh.png",
        },
      },
      documents: {
        "60004210142_AAExp2c.pdf": {
          filename: "60004210142_AAExp2c.pdf",
          version: "Synergy\\60004210142_AAExp2c.pdf_1708776902812",
          commitMessage: "Hello Test",
          commitId: "1708776902813",
          timestamp: "2024-02-24T12:15:02.813Z",
          filepath:
            "http://192.168.172.157:8080/download/static%5CSynergy%5Cdocuments%5C60004210142_AAExp2c.pdf",
        },
      },
      misc: {
        "tria.txt": {
          filename: "tria.txt",
          version: "Synergy\\tria.txt_1708778813788",
          commitMessage: "Hello Test",
          commitId: "1708778813798",
          timestamp: "2024-02-24T12:46:53.798Z",
          filepath:
            "http://192.168.172.157:8080/download/static%5CSynergy%5Cmisc%5Ctria.txt",
        },
      },
    },
  },
  {
    Unicode: {
      misc: {
        "frtonedn.txt": {
          filename: "frtonedn.txt",
          version: "Unicode\\frtonedn.txt_1708778220985",
          commitMessage: "OWW",
          commitId: "1708778220987",
          timestamp: "2024-02-24T12:37:00.987Z",
          filepath:
            "http://192.168.172.157:8080/download/static%5CUnicode%5Cmisc%5Cfrtonedn.txt",
        },
      },
    },
  },
];

const convertData = (data) => {
  return data.flatMap((project) => {
    const projectName = Object.keys(project)[0];
    return Object.entries(project[projectName]).flatMap(([category, files]) => {
      return Object.values(files).map((file) => ({
        content: file.filename.split(".").slice(0, -1).join("."),
        url: file.filepath,
        hierarchy: {
          lvl1: `${file.filename.split(".").pop()} ${category}`,
          lvl2: projectName,
          lvl3: file.commitMessage,
        },
      }));
    });
  });
};

const convertedData = convertData(inputData);
console.log(JSON.stringify(convertedData, null, 2));
