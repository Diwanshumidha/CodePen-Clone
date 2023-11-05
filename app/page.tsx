"use client";
import dynamic from "next/dynamic";
import {
  Dispatch,
  RefObject,
  SetStateAction,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Resizable } from "re-resizable";
import { Code, Languages } from "@/types/Editor";
import HtmlIcon from "@/components/icons/HtmlSvg";
import CSSIcon from "@/components/icons/CssSvg";
import JSIcon from "@/components/icons/JsSvg";
import Navbar from "@/components/Navbar";
import { DownloadFiles } from "@/utils/utils";
import { useSettingsStore } from "@/store/Settings.store";
import AlertDialogComponent from "@/components/AlertDialog";
import { MinusIcon, PlusIcon } from "lucide-react";
import { StarterCss, StarterHTML } from "@/lib/constant";
const iconMap = {
  "index.html": <HtmlIcon />,
  "index.css": <CSSIcon />,
  "index.js": <JSIcon />,
  default: <JSIcon />,
};

const MonacoEditor = dynamic(() => import("@/components/MonacoEditor"), {
  ssr: false,
});

type paths = "index.html" | "index.js" | "index.css";
type LangArr = {
  name: string;
  path: paths;
  langcode: Languages;
};
const Lang: LangArr[] = [
  {
    name: "HTML",
    path: "index.html",
    langcode: "html",
  },
  {
    name: "JS",
    path: "index.js",
    langcode: "javascript",
  },
  {
    name: "CSS",
    path: "index.css",
    langcode: "css",
  },
];

export default function Home() {
  const [language, setLanguage] = useState(Lang[0]);
  const {
    autoSave,
    htmlClasses,
    metatags,
    IncrementfontSize,
    DecrementfontSize,
  } = useSettingsStore();
  const ref = useRef<HTMLIFrameElement | null>(null);

  const [code, setcode] = useState<Code>({
    html: StarterHTML,
    css: StarterCss,
    javascript: "console.log('Hello World!')",
  });

  const HTMLLayout = (children: string) =>
    `
<!DOCTYPE html>
  <html class='${htmlClasses}'>
    <head>
      <title>${metatags.title}</title>
      <meta name="description" content="${metatags.description}">
    </head>
    ${children}
  </html>

  `;

  const [srcDoc, setSrcDoc] = useState(() =>
    HTMLLayout(`
<body>${code.html}</body>
<style>${code.css}</style>
<script>${code.javascript}</script>
`)
  );

  const SaveCode = () => {
    setSrcDoc(
      HTMLLayout(`
<body>${code.html}</body>
<style>${code.css}</style>
<script>${code.javascript}</script>
  `)
    );
  };

  const handleDownload = () => {
    DownloadFiles(code, HTMLLayout);
  };

  const HandleClear = () => {
    setcode({
      css: "",
      html: "",
      javascript: "",
    });
  };

  useEffect(() => {
    if (autoSave) {
      const delaytimeout = setTimeout(() => {
        SaveCode();
      }, 250);

      return () => clearTimeout(delaytimeout);
    }
  }, [code]);

  return (
    <>
      <Navbar SaveCode={SaveCode} handleDownload={handleDownload} />
      <main className=" w-full h-[calc(100vh-65px)] ">
        <div className=" w-full h-full flex">
          <Resizable
            defaultSize={{
              width: "50%",
              height: "100%",
            }}
            maxWidth={"99%"}
            minWidth={"400px"}
            bounds={"parent"}
            enable={{
              top: false,
              right: true,
              bottom: false,
              left: false,
              topRight: false,
              bottomRight: false,
              bottomLeft: false,
              topLeft: false,
            }}
          >
            <div className=" flex w-full h-full">
              <div className=" w-full h-full flex flex-col">
                <div className=" w-full bg-[#060606] justify-between flex items-center  px-3 text-white ">
                  <div className="flex  gap-3">
                    {Lang.map((item, index) => (
                      <ToggleButton
                        key={index}
                        language={language}
                        setLanguage={setLanguage}
                        name={item.name}
                        path={item.path}
                        index={index}
                      />
                    ))}
                  </div>
                  <div className="flex gap-3 items-center">
                    <div className=" flex gap-3 text-md ">
                      <button onClick={() => DecrementfontSize(2)}>
                        <MinusIcon size={17} />
                      </button>
                      <button onClick={() => IncrementfontSize(2)}>
                        <PlusIcon size={17} />
                      </button>
                    </div>
                    <AlertDialogComponent
                      title="Do You Want to Clear the Whole Code?"
                      description="This Action will Clear the whole code"
                      action={{ title: "Clear", function: HandleClear }}
                    >
                      <div className="bg-[#5a5f73] text-[0.8rem] px-[7px] py-[2px] rounded-sm">
                        clear
                      </div>
                    </AlertDialogComponent>
                  </div>
                </div>

                <MonacoEditor
                  code={code}
                  path={language.path}
                  language={language.langcode}
                  theme="vs-dark"
                  setCode={setcode}
                />
              </div>
              <div className=" w-[15px] h-full bg-black flex justify-center items-center border-x border-[#1e1e1e] shadow"></div>
            </div>
          </Resizable>
          <div className=" w-full h-full bg-white  overflow-x-hidden">
            <iframe
              srcDoc={srcDoc}
              ref={ref}
              id="iframe"
              title="Output"
              sandbox="allow-scripts"
              width="100%"
              height="100%"
            ></iframe>
          </div>
        </div>
      </main>
    </>
  );
}

type ButtonProps = {
  language: LangArr;
  setLanguage: Dispatch<
    SetStateAction<{
      name: string;
      path: paths;
      langcode: Languages;
    }>
  >;

  name: string;
  path: paths;
  index: number;
};
const ToggleButton = ({
  language,
  setLanguage,
  name,
  path,
  index,
}: ButtonProps) => {
  return (
    <button
      className={`${
        language.path === path
          ? " border-t-2 px-3 bg-[#1e1e1e] py-2   border-[#34363e] flex items-center gap-2"
          : " py-2 px-3 hover:bg-[#1e1e1e] flex items-center gap-2 "
      }`}
      onClick={() => setLanguage(Lang[index])}
    >
      {iconMap[path] || iconMap.default} {name}
    </button>
  );
};
