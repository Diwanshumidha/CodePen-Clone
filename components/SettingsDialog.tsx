import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useSettingsStore } from "@/store/Settings.store";
import { Textarea } from "./ui/textarea";

const SettingsDialog = ({ children }: { children: React.ReactNode }) => {
  const {
    autoSave,
    htmlClasses,
    theme,
    wordWrap,
    metatags,
    setWordWrap,
    setAutoSave,
    setHtmlClasses,
    setMetaTags,
    setTheme,
    fontSize,
    setfontSize,
  } = useSettingsStore();
  return (
    <div>
      <Dialog>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>General Settings:</DialogTitle>
            <DialogDescription>
              Customize General Settings for a creative coding experience! 😊🎨
            </DialogDescription>
          </DialogHeader>

          <div className=" flex flex-col gap-6">
            <div className=" flex  gap-4">
              <div className="flex items-center  space-x-2">
                <Label className=" " htmlFor="auto-save">
                  Auto Save:{" "}
                </Label>
                <Switch
                  onCheckedChange={(e) => setAutoSave(e)}
                  checked={autoSave}
                  id="auto-save"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor="word-wrap" className="">
                  Word Wrap:{" "}
                </Label>
                <Switch
                  onCheckedChange={(e) => setWordWrap(e)}
                  checked={wordWrap}
                  id="word-wrap"
                />
              </div>
            </div>
            <div className=" space-y-4">
              <div className="grid w-full max-w-sm items-center gap-2">
                <Label htmlFor="classes">
                  Add Classes to {"<"}html{">"}:{" "}
                </Label>
                <Input
                  value={htmlClasses}
                  onChange={(e) => setHtmlClasses(e.target.value)}
                  type="text"
                  id="classes"
                  placeholder="classes"
                />
              </div>

              <div className="grid w-full max-w-sm items-center gap-2">
                <Label htmlFor="classes">Font Size:</Label>
                <Input
                  value={fontSize}
                  type="number"
                  onChange={(e) => setfontSize(parseInt(e.target.value))}
                />
              </div>

              <div className="grid w-full max-w-sm items-center gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  value={metatags.title}
                  onChange={(e) => setMetaTags(e.target.value, "title")}
                  type="text"
                  id="title"
                  placeholder="title"
                />
              </div>

              <div className="grid w-full max-w-sm items-center gap-2">
                <Label htmlFor="classes">Description</Label>
                <Textarea
                  value={metatags.description}
                  onChange={(e) => setMetaTags(e.target.value, "description")}
                  id="classes"
                  placeholder="classes"
                />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SettingsDialog;
