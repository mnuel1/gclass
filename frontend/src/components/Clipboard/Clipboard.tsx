// @ts-nocheck
import React from "react";
import { SuccessToast } from "../Toast/SuccessToast";
import { Share2 } from "lucide-react";

export const Clipboard: React.FC = (class_code) => {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(class_code.class_code);
      SuccessToast("Class code copied");
    } catch (err) {
      SuccessToast("Something went wrong. Try to copy again.");
    }
  };

  return (
    <button
      className="flex justify-center items-center cursor-pointer z-50 hover:bg-gray-200 rounded-full p-2"
      onClick={copyToClipboard}
    >
      <Share2 size={18} />
    </button>
  );
};
