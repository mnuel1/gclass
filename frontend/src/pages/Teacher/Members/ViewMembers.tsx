// @ts-nocheck

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Users, UserPlus, UserMinus, Search, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Authentication } from "../../../Auth/Authentication";
import { api } from "../../../process/axios";
import useMemberStore from "../../../process/Member/useMemberStore";
import {
  useMemberQuery,
  useAddMember,
  useRemoveMember,
} from "../../../process/Member/useMemberQuery";
import useModalStore from "../../../process/Modal/useModalStore";
import { FailedToast } from "../../../components/Toast/FailedToast";
import { Checkbox } from "@/components/ui/checkbox";
import { PendingMembers } from "./PendingMembers";

const AddMemberDialog = ({ classroom, isOpen, setIsOpen }) => {
  const [search, setSearch] = useState("");
  const [members, setMembers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const { startLoading, stopLoading } = useModalStore();
  const addMembersMutation = useAddMember();

  const searchStudents = async (searchTerm) => {
    if (searchTerm.length < 2) {
      setSearchResults([]);
      return;
    }
    startLoading();
    try {
      const response = await api.get(
        `/search/students/${searchTerm}/${classroom.class_id}`
      );
      if (response.status === 200) {
        setSearchResults(response.data.data);
      }
    } catch (error) {
      FailedToast("Search failed");
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    const debounceSearch = setTimeout(() => {
      searchStudents(search);
    }, 500);
    return () => clearTimeout(debounceSearch);
  }, [search]);

  const handleAddMember = (member) => {
    if (!members.some((m) => m.student_id === member.student_id)) {
      setMembers([...members, member]);
    }
    setSearch("");
    setSearchResults([]);
  };

  const handleRemoveMember = (studentId) => {
    setMembers(members.filter((m) => m.student_id !== studentId));
  };

  const handleSave = () => {
    addMembersMutation.mutate({
      class_id: classroom.class_id,
      members: members,
    });
    setIsOpen(false);
    window.location.reload();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Members</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search students..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8"
            />
          </div>
          {search && (
            <ScrollArea className="h-48 rounded-md border">
              {searchResults.map((result) => (
                <div
                  key={result.student_id}
                  className="flex items-center justify-between p-2 hover:bg-gray-100"
                >
                  <span>{result.fullname}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleAddMember(result)}
                  >
                    Add
                  </Button>
                </div>
              ))}
            </ScrollArea>
          )}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Selected Students</h4>
            <ScrollArea className="h-48 rounded-md border">
              {members.map((member) => (
                <div
                  key={member.student_id}
                  className="flex items-center justify-between p-2 hover:bg-gray-100"
                >
                  <span>{member.fullname}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveMember(member.student_id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </ScrollArea>
          </div>
          <Button onClick={handleSave} className="w-full">
            Add Selected Members
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const RemoveMemberDialog = ({
  classroom,
  members: currentMembers,
  isOpen,
  setIsOpen,
}) => {
  const [selectedMembers, setSelectedMembers] = useState([]);
  const removeMemberMutation = useRemoveMember();

  const handleToggleMember = (member) => {
    setSelectedMembers((prev) =>
      prev.includes(member)
        ? prev.filter((m) => m !== member)
        : [...prev, member]
    );
  };

  const handleRemove = () => {
    removeMemberMutation.mutate({
      class_id: classroom.class_id,
      members: selectedMembers,
    });
    setIsOpen(false);
    window.location.reload();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Remove Members</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[400px] rounded-md border p-4">
          {currentMembers.map((member) => (
            <div
              key={member.student_id}
              className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg"
            >
              <Checkbox
                id={member.student_id}
                checked={selectedMembers.includes(member)}
                onCheckedChange={() => handleToggleMember(member)}
              />
              <span>{member.fullname}</span>
            </div>
          ))}
        </ScrollArea>
        <Button
          onClick={handleRemove}
          variant="destructive"
          disabled={selectedMembers.length === 0}
          className="w-full"
        >
          Remove Selected Members
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export const Members = () => {
  const { getUser } = Authentication();
  const name = getUser();
  const location = useLocation();
  const classroom = location.state.classroom;
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);

  const { data, isSuccess, isError, isLoading } = useMemberQuery(
    classroom.class_id
  );
  const { member, getMember } = useMemberStore();
  const { startLoading, stopLoading } = useModalStore();

  useEffect(() => {
    if (isLoading) startLoading();
    else stopLoading();
    if (isSuccess && data) getMember(data);
    if (isError) FailedToast("Failed to load members");
  }, [data, isSuccess, isError]);

  const getInitialsColor = (name) => {
    const colors = [
      "bg-blue-500/10 text-blue-600",
      "bg-purple-500/10 text-purple-600",
      "bg-rose-500/10 text-rose-600",
      "bg-amber-500/10 text-amber-600",
      "bg-emerald-500/10 text-emerald-600",
    ];
    return colors[name.length % colors.length];
  };

  return (
    <div className="min-h-[calc(100vh-4.5rem)]">
      <div className="px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-medium tracking-tight text-gray-900">
            {classroom.name}
            <span className="text-sm font-normal text-gray-500 ml-2">
              Members
            </span>
          </h1>
        </div>
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Users className="w-4 h-4" />
            <span>{member.length + 1} members</span>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => setIsAddDialogOpen(true)}
              className="text-white text-xs px-4 h-fit py-2 rounded-xl shadown-none"
            >
              <UserPlus className="w-4 h-4" />
              Add Member
            </Button>
            <Button
              onClick={() => setIsRemoveDialogOpen(true)}
              className="text-red-600 bg-transparent text-xs px-4 h-fit py-2 rounded-xl shadown-none border border-red-600"
            >
              <UserMinus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="mb-4">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Teacher
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${getInitialsColor(
                  name
                )}`}
              >
                {name[0].toUpperCase()}
              </div>
              <div>
                <div className="font-medium text-gray-900">{name}</div>
                <div className="text-sm text-gray-500">Class Owner</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Students
              </span>
              <span className="text-sm text-gray-500">
                {member.length} {member.length === 1 ? "student" : "students"}
              </span>
            </div>

            {member.length > 0 ? (
              <div className="space-y-4">
                {member.map((student, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 group hover:bg-gray-50 rounded-lg transition-colors duration-200 px-2"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${getInitialsColor(
                          student.fullname
                        )}`}
                      >
                        {student.fullname[0].toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {student.fullname}
                        </div>
                        <div className="text-sm text-gray-500">
                          Joined {student.created_time}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-400">No students have joined yet</div>
              </div>
            )}
          </div>

          <PendingMembers class_id={classroom.class_id} />
        </div>

        <AddMemberDialog
          classroom={classroom}
          isOpen={isAddDialogOpen}
          setIsOpen={setIsAddDialogOpen}
        />

        <RemoveMemberDialog
          classroom={classroom}
          members={member}
          isOpen={isRemoveDialogOpen}
          setIsOpen={setIsRemoveDialogOpen}
        />
      </div>
    </div>
  );
};

export default Members;
