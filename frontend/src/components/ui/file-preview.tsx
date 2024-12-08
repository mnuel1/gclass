import React from "react";
import {
  Download,
  ImagePlay,
  FileText,
  FileSpreadsheet,
  FileType,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface FilePreviewProps {
  filePath: string;
  onDownload: () => void;
  onDelete?: () => void;
  edit?: boolean;
}

const getFileIcon = (filename: string) => {
  const extension = filename.split(".").pop()?.toLowerCase();
  switch (extension) {
    case "pdf":
      return <FileType className="text-red-500" />;
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
      return <ImagePlay className="text-blue-500" />;
    case "xlsx":
    case "xls":
      return <FileSpreadsheet className="text-green-500" />;
    default:
      return <FileText className="text-gray-500" />;
  }
};

export const FilePreview: React.FC<FilePreviewProps> = ({
  filePath,
  onDownload,
  onDelete,
  edit = false,
}) => {
  const filename = filePath.split("/").pop() || "Unknown File";
  const fileExtension = filename.split(".").pop()?.toUpperCase() || "";

  return (
    <div className="flex sm:flex-row flex-col sm:items-center sm:gap-0 gap-2 sm:justify-between border rounded-lg p-2 mb-2">
      <div className="flex items-start sm:items-center space-x-4">
        {getFileIcon(filename)}
        <div>
          <h3 className="font-medium break-all break-words whitespace-normal max-w-full hyphens-auto overflow-wrap-anywhere">
            {filename}
          </h3>{" "}
          <p className="text-xs text-gray-500">{fileExtension} File</p>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="p-2">
            <MoreHorizontal size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={onDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download
          </DropdownMenuItem>
          {edit && onDelete && (
            <DropdownMenuItem
              onSelect={onDelete}
              className="text-red-600 focus:text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export const AttachmentSection: React.FC<{
  attachments: string;
  handleDownload: () => void;
  handleDelete?: () => void;
  edit?: boolean;
}> = ({ attachments, handleDownload, handleDelete, edit = false }) => {
  return (
    <div className="text-sm mt-1">
      <p className="text-xs font-medium opacity-50 mb-1">My Works</p>
      <FilePreview
        filePath={attachments}
        onDownload={handleDownload}
        onDelete={handleDelete}
        edit={edit}
      />
    </div>
  );
};
