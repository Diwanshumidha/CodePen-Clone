import React, { useState } from "react";
import CodePenLogo from "./icons/CodePenSvg";
import { ArrowBigDownDash, Cloud, Settings } from "lucide-react";
import SettingsDialog from "./SettingsDialog";
import { useHotkeys } from "react-hotkeys-hook";

const Navbar = ({
  SaveCode,
  handleDownload,
}: {
  SaveCode: () => void;
  handleDownload: () => void;
}) => {
  const [isSaved, setIsSaved] = useState(false);
  const handleSaveClick = () => {
    SaveCode();
    setIsSaved(true);

    setTimeout(() => {
      setIsSaved(false);
    }, 1000);
  };

  useHotkeys("alt+d", handleDownload, {
    preventDefault: true,
  });
  useHotkeys("ctrl+s", handleSaveClick, {
    preventDefault: true,
  });

  return (
    <div className=" Nav_container text-white  overflow-y-hidden">
      <h1 className=" m-0 h-full" data-component="Logo" data-test-id="logo">
        <a href="/" className=" w-[30px] mx-[8px] block h-full">
          <CodePenLogo className="w-full h-full " />
          <span className="sr-only">CodePen Home</span>
        </a>
      </h1>
      <div className="ItemTitle_root-BLXtW" data-test-id="item-title-area">
        <div className="ItemTitle_text-t2tKF" data-view="pen">
          <h1 className="ItemTitle_title-skUR3" id="item-title">
            <span
              className="ItemTitle_titleLink-dPGjg"
              id="editable-title-span"
              title=""
            >
              Untitled
            </span>
          </h1>
          <div
            className="ItemTitle_by-typsS text-gray-400"
            data-test="AnItemBy"
          >
            Captain Anonymous
          </div>
        </div>
      </div>
      <div className=" flex px-2 gap-3">
        <button
          onClick={handleSaveClick}
          className=" bg-[rgb(90,95,115)] hover:bg-opacity-70 items-center justify-center inline-flex p-[10px] rounded-md text-[15px]"
        >
          {" "}
          <Cloud fill="white" className=" mr-1" width={15} height={15} />
          {!isSaved ? "Saved" : "Saving..."}
        </button>
        <SettingsDialog>
          <div className=" bg-[rgb(90,95,115)] hover:bg-opacity-70 items-center justify-center inline-flex p-[10px] rounded-md text-[15px]">
            {" "}
            <Settings
              size={32}
              color="#ffffff"
              className=" mr-1"
              width={15}
              height={15}
            />
            Settings
          </div>
        </SettingsDialog>

        <button
          onClick={handleDownload}
          className=" hover:bg-[#248c46]  text-black bg-[#47cf73] items-center justify-center inline-flex p-[10px] rounded-md text-[15px]"
        >
          Download
        </button>
        <button className=" bg-[rgb(90,95,115)] cursor-not-allowed items-center justify-center inline-flex p-[10px] rounded-md text-[15px]">
          Log In
        </button>
      </div>
    </div>
  );
};

export default Navbar;
