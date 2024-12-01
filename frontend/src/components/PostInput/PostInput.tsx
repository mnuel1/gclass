import React, { useState } from "react";
import { api } from "@/pages/Student/process/axios";
import { Authentication } from "@/Auth/Authentication";
import { SuccessToast } from "../Toast/SuccessToast";
import { FailedToast } from "../Toast/FailedToast";

interface Props {
  classId: string;

}
export const PostInput: React.FC<Props> = ({ classId }) => {
  const { getID } = Authentication()
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]); 
    }
  };

  const handleSubmit = async () => {
    if (text || file) {      
      const data = {
        "studentId": null,
        "teacherId": getID(),
        "classId": classId,
        "subject": "",
        "content": text
      }
      try {
        const response = await api.post(`/class/${classId}/posts`, data)
        
        if (response.status === 201) {
          
     
          if (file) {
            const form = new FormData();
            form.append("files", file);

            const uploadFile = await api.post(`/class/upload`, form, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });

            const postId = response.data.postId
                        
            if(uploadFile.status === 200) {
              const fileData = {
                "postId": postId,
                "replyId": null,
                "fileName": uploadFile.data.files[0].fileName,
                "filePath": "uploads/attachments/documents",
                "type": "pdf"
              }
              const attachToPost = await api.post(`class/posts/${postId}/attachments`, fileData)
              
              
              if (attachToPost.status === 200 || attachToPost.status === 201) {
                SuccessToast("Post created.")
              }
            } else {
              FailedToast("Upload Error!")    
            }
          } else {
            SuccessToast("Post created.")
          }
        } else {
          FailedToast("Post Error!")
        }
      } catch(error) {
        FailedToast("Something went wrong!")
      }
      setText("");
      setFile(null);
    } else {
      alert("Please enter some text or attach a file!");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-md p-4 w-full mx-auto mt-6">
      <div className="flex items-center space-x-3 mb-4">
        <textarea
          className="flex-1 resize-none border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          placeholder="What's on your mind?"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
      </div>
      <div className="flex items-center justify-between">
        <label
          htmlFor="file-input"
          className="cursor-pointer flex items-center text-blue-500 hover:text-blue-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5V6a2 2 0 012-2h14a2 2 0 012 2v10.5M16 10a4 4 0 01-8 0m8 4a8 8 0 11-16 0v5a3 3 0 003 3h10a3 3 0 003-3v-5z"
            />
          </svg>
          Attach a file
        </label>
        <input
          id="file-input"
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
          onClick={handleSubmit}
        >
          Post
        </button>
      </div>
      {file && (
        <div className="mt-3 text-gray-700">
          Attached file: <span className="font-semibold">{file.name}</span>
        </div>
      )}
    </div>
  );
};
