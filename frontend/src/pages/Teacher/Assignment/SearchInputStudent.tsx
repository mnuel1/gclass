import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Member } from "@/pages/Student/process/Member/memberType";
import useMemberStore from "@/process/Member/useMemberStore";
import { useState } from "react";

export const SearchInput = ({
  onAdd,
  disabled,
}: {
  onAdd: (m: Member) => void;
  disabled: boolean;
}) => {
  const [searchText, setSearchText] = useState("");
  const { member } = useMemberStore();

  return (
    <div className="space-y-2">
      <Label>Add Student</Label>
      <div className="flex flex-col gap-2">
        <Input
          disabled={disabled}
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search student by name..."
          className="w-full"
        />
        {searchText.length > 0 && (
          <div className="max-h-48 w-full bg-white overflow-y-auto border border-gray-200 rounded-md">
            {member
              .filter((student) =>
                student.fullname
                  .toLowerCase()
                  .includes(searchText.toLowerCase())
              )
              .map((student) => (
                <div
                  key={student.student_id}
                  className="hover:bg-gray-100 p-3 cursor-pointer"
                  onClick={() => {
                    onAdd(student);
                    setSearchText("");
                  }}
                >
                  {student.fullname}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};
