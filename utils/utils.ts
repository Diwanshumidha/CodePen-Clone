import { Code } from "@/types/Editor";
import React, { useEffect } from "react";
import JSZip from "jszip";

export function DownloadFiles(
  code: Code,
  HTMLLayout: (children: string) => string
) {
  const zip = new JSZip();

  const HTML = HTMLLayout(`
  
  <body>${code.html}</body>
  
  `);
  zip.file("index.html", HTML);
  zip.file("styles.css", code.css);
  zip.file("index.js", code.javascript);

  zip.generateAsync({ type: "blob" }).then(function (content) {
    // see FileSaver.js
    // Create a URL for the blob
    const url = URL.createObjectURL(content);

    // Create an anchor element for downloading
    const a = document.createElement("a");
    a.href = url;
    a.download = "code.zip";

    // Trigger the download
    a.click();

    // Clean up by revoking the object URL
    URL.revokeObjectURL(url);
  });
}
