import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, ArrowUpDown, Search } from "lucide-react";

interface StudentData {
  id: string;
  name: string;
  student_code: string;
  email: string;
  grades: string[];
}

interface StudentsData {
  studentsData: StudentData[];
  col: string[];
}

type SortConfig = {
  key: string;
  direction: "asc" | "desc" | null;
};

export const TableGrade: React.FC<{
  studentsData: StudentsData;
  role: string;
}> = ({ studentsData, role }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStudents, setFilteredStudents] = useState<StudentData[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "",
    direction: null,
  });

  const sortData = (data: StudentData[], config: SortConfig) => {
    if (!config.key || !config.direction) return data;

    return [...data].sort((a, b) => {
      if (config.key.startsWith("grade_")) {
        const index = parseInt(config.key.split("_")[1]);
        const aValue = parseFloat(a.grades[index] || "0");
        const bValue = parseFloat(b.grades[index] || "0");
        return config.direction === "asc" ? aValue - bValue : bValue - aValue;
      }

      const aValue = a[config.key as keyof StudentData];
      const bValue = b[config.key as keyof StudentData];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return config.direction === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      return 0;
    });
  };

  useEffect(() => {
    let filtered = studentsData.studentsData.filter(
      (student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.student_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Apply sorting
    filtered = sortData(filtered, sortConfig);

    setFilteredStudents(filtered);
    setCurrentPage(1);
  }, [searchTerm, studentsData.studentsData, sortConfig]);

  const handleSort = (key: string) => {
    setSortConfig((currentConfig) => {
      if (currentConfig.key === key) {
        if (currentConfig.direction === "asc") {
          return { key, direction: "desc" };
        }
        if (currentConfig.direction === "desc") {
          return { key: "", direction: null };
        }
      }
      return { key, direction: "asc" };
    });
  };

  const getSortIcon = (key: string) => {
    if (sortConfig.key !== key) return <ArrowUpDown className="h-4 w-4 ml-2" />;
    if (sortConfig.direction === "asc")
      return <ArrowUp className="h-4 w-4 ml-2" />;
    if (sortConfig.direction === "desc")
      return <ArrowDown className="h-4 w-4 ml-2" />;
    return <ArrowUpDown className="h-4 w-4 ml-2" />;
  };

  const renderSortableHeader = (key: string, label: string) => (
    <Button
      variant="ghost"
      className="h-8 w-full justify-start font-medium p-0 hover:bg-transparent hover:opacity-70"
      onClick={() => handleSort(key)}
    >
      {label}
      {getSortIcon(key)}
    </Button>
  );

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentStudents = filteredStudents.slice(startIndex, endIndex);

  const generatePageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = window.innerWidth < 640 ? 1 : 3;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 2) {
        for (let i = 1; i <= maxVisiblePages; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("ellipsis");
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 1) {
        pageNumbers.push(1);
        pageNumbers.push("ellipsis");
        for (let i = totalPages - (maxVisiblePages - 1); i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push("ellipsis");
        pageNumbers.push(currentPage);
        pageNumbers.push("ellipsis");
        pageNumbers.push(totalPages);
      }
    }
    return pageNumbers;
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };

  return (
    <div className="space-y-4 h-[calc(84vh-0.8rem)]">
      {/* Search Bar and Items Per Page Select */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center w-full">
        <div className="flex items-center justify-between w-full">
          {role.toLowerCase() !== "student" && (
            <div className="relative w-full max-w-sm group">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground opacity-50 transition-opacity duration-200 group-focus-within:opacity-100" />
              <Input
                type="search"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 max-w-64 rounded-xl bg-white text-sm"
              />
            </div>
          )}

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Showing</span>
            <Select
              value={itemsPerPage.toString()}
              onValueChange={handleItemsPerPageChange}
            >
              <SelectTrigger className="w-20 rounded-xl bg-white">
                <SelectValue placeholder="10" />
              </SelectTrigger>
              <SelectContent>
                {[5, 10, 20, 30, 40, 50].map((value) => (
                  <SelectItem key={value} value={value.toString()}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-4 h-[calc(100%-3rem)] justify-between">
        {/* Table with horizontal scroll for mobile */}
        <div className="rounded-xl border p-2 bg-white">
          <div className="overflow-x-auto">
            <Table>
              {role.toLowerCase() !== "student" && (
                <TableCaption className="pb-2">
                  {filteredStudents.length} students in this classroom
                </TableCaption>
              )}
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden">Student ID</TableHead>
                  <TableHead className="whitespace-nowrap">
                    {renderSortableHeader("name", "Student Name")}
                  </TableHead>
                  <TableHead className="whitespace-nowrap">
                    {renderSortableHeader("student_code", "Student Code")}
                  </TableHead>
                  <TableHead className="whitespace-nowrap">
                    {renderSortableHeader("email", "Student Email")}
                  </TableHead>
                  {studentsData.col.map((colName, index) => (
                    <TableHead
                      key={index}
                      className="whitespace-nowrap min-w-[100px]"
                    >
                      {renderSortableHeader(`grade_${index}`, colName)}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="hidden">{student.id}</TableCell>
                    <TableCell className="whitespace-nowrap font-medium">
                      {student.name}
                    </TableCell>
                    <TableCell className="whitespace-nowrap opacity-60">
                      {student.student_code}
                    </TableCell>
                    <TableCell className="whitespace-nowrap opacity-60">
                      {student.email}
                    </TableCell>
                    {student.grades.map((grade, index) => (
                      <TableCell key={index} className="text-center">
                        {grade}%
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Pagination - Hide if only one page */}
        {totalPages > 1 && (
          <div className="flex justify-center pt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem className="hidden sm:inline-block">
                  <PaginationPrevious
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    className={
                      currentPage === 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>

                {generatePageNumbers().map((pageNum, index) => (
                  <PaginationItem key={index}>
                    {pageNum === "ellipsis" ? (
                      <PaginationEllipsis />
                    ) : (
                      <PaginationLink
                        onClick={() => setCurrentPage(pageNum as number)}
                        isActive={currentPage === pageNum}
                        className="cursor-pointer"
                      >
                        {pageNum}
                      </PaginationLink>
                    )}
                  </PaginationItem>
                ))}

                <PaginationItem className="hidden sm:inline-block">
                  <PaginationNext
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableGrade;
