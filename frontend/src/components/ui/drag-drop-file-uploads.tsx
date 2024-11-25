import React, { useState, useRef } from "react";
import { Upload, X, FileText } from "lucide-react";

interface DragDropFileUploadProps {
  onFileChange: (file: File | null) => void;
  error?: string;
}

export const DragDropFileUpload: React.FC<DragDropFileUploadProps> = ({
  onFileChange,
  error,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (selectedFile: File) => {
    setFile(selectedFile);
    onFileChange(selectedFile);
  };

  const removeFile = () => {
    setFile(null);
    onFileChange(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const openFileDialog = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div
      className={`
        w-full p-6 border-2 border-dashed rounded-lg text-center 
        transition-colors duration-300 
        ${
          dragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-blue-500"
        }
      `}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        multiple={false}
        onChange={handleChange}
        aria-label="File upload"
      />

      {!file ? (
        <div
          onClick={openFileDialog}
          className="flex flex-col items-center justify-center cursor-pointer text-sm"
        >
          <Upload className="size-10 text-gray-500 mb-4" />
          <p className="text-gray-600">
            Drag and drop your file here, or
            <span className="text-blue-600 ml-1 hover:underline">
              click to browse
            </span>
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Supported formats: PDF, Images, Documents
          </p>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="w-8 h-8 text-blue-600" />
            <div className="text-left">
              <p className="font-medium">{file.name}</p>
              <p className="text-xs text-gray-500">
                {(file.size / 1024).toFixed(1)} KB
              </p>
            </div>
          </div>
          <button
            onClick={removeFile}
            className="text-red-500 hover:bg-red-50 p-2 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};
