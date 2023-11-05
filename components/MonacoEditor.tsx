// @ts-nocheck
"use client";
import React, {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import Editor from "@monaco-editor/react";

import { Code, Languages, Themes } from "@/types/Editor";
import { useSettingsStore } from "@/store/Settings.store";
import { Loader, Loader2 } from "lucide-react";
// loader.config({ monaco });

type Props = {
  language: Languages;
  theme?: Themes;
  path: string;
  setCode: Dispatch<SetStateAction<Code>>;
  code: Code;
};

const MonacoEditorCom = ({
  language = "javascript",
  theme = "vs-dark",
  path,
  setCode,
  code,
}: Props) => {
  const editorRef = useRef(null);
  const { wordWrap, fontSize } = useSettingsStore();

  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor;
  }
  function onChange() {
    const code: string = editorRef.current.getValue();

    if (language === "javascript") {
      const unwantedKeywords = /<\/script>|<\/html>|<\/body>/gi;
      const cleanedCode = code.replace(unwantedKeywords, "");
      setCode((prev) => ({
        ...prev,
        [language]: cleanedCode,
      }));
    } else {
      setCode((prev) => ({
        ...prev,
        [language]: code,
      }));
    }
  }

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <Editor
        value={code[language]}
        onChange={onChange}
        theme={theme}
        defaultLanguage={language}
        language={language}
        path={path}
        loading={
          <div className="flex gap-2">
            <Loader2 className=" animate-spin" /> Wait a Sec We are Setting
            Up......
          </div>
        }
        onMount={handleEditorDidMount}
        options={{
          quickSuggestions: true,
          snippetSuggestions: "bottom",
          comments: {
            ignoreEmptyLines: true,
            insertSpace: true,
          },
          acceptSuggestionOnCommitCharacter: true,
          acceptSuggestionOnEnter: "on",
          accessibilitySupport: "auto",
          autoIndent: false,
          automaticLayout: true,
          codeLens: true,
          colorDecorators: true,
          contextmenu: true,
          cursorBlinking: "expand",
          cursorSmoothCaretAnimation: "off",
          cursorStyle: "line",
          disableLayerHinting: false,
          disableMonospaceOptimizations: false,
          dragAndDrop: false,
          fixedOverflowWidgets: false,
          folding: true,
          fontSize: fontSize,
          foldingStrategy: "auto",
          fontLigatures: false,
          formatOnPaste: false,
          formatOnType: false,
          hideCursorInOverviewRuler: false,
          highlightActiveIndentGuide: true,
          links: true,

          mouseWheelZoom: false,
          multiCursorMergeOverlapping: true,
          multiCursorModifier: "alt",
          overviewRulerBorder: true,
          overviewRulerLanes: 2,
          quickSuggestionsDelay: 100,
          readOnly: false,
          renderControlCharacters: false,
          renderFinalNewline: "on",
          renderIndentGuides: true,
          renderLineHighlight: "all",
          renderWhitespace: "none",
          revealHorizontalRightPadding: 30,
          roundedSelection: true,
          rulers: [],
          scrollBeyondLastColumn: 5,
          scrollBeyondLastLine: true,
          selectOnLineNumbers: true,
          selectionClipboard: true,
          selectionHighlight: true,
          showFoldingControls: "mouseover",
          smoothScrolling: false,
          suggestOnTriggerCharacters: true,
          wordBasedSuggestions: true,
          wordSeparators: "~!@#$%^&*()-=+[{]}|;:'\",.<>/?",
          wordWrap: wordWrap ? "on" : "off",
          wordWrapBreakAfterCharacters: "\t})]?|&,;",
          wordWrapBreakBeforeCharacters: "{([+",
          wordWrapBreakObtrusiveCharacters: ".",
          wordWrapColumn: 80,
          wordWrapMinified: true,
          wrappingIndent: "none",
        }}
      />
    </div>
  );
};

export default MonacoEditorCom;
