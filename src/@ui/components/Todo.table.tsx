import React, { useEffect, useState } from "react";
import { getTodos, updateTodo, deleteTodo } from "../../@core/services/api";
import { toast } from "react-toastify";
import AddTodoForm from "./AddTodo.form";
import { actionIcons } from "@/assets/icons";
import { formatDate } from "../utils/formatDate";

interface Todo {
  id: string;
  title: string;
  description: string;
  status: boolean;
  createdat: string;
  updatedat: string;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const fetchTodos = async () => {
    try {
      const data = await getTodos();
      setTodos(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      await updateTodo(id);
      await fetchTodos();
      toast.success("Todo updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update todo");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);

      await deleteTodo(id);
      if (updatedTodos.length === 0) {
        setTodos([]);
      } else {
        await fetchTodos();
      }
      toast.success("Todo deleted successfully");
    } catch (error) {
      console.error(error);
      await fetchTodos();
      toast.error("Failed to delete todo");
    }
  };

  const handleAddTodo = async () => {
    await fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = todos.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(todos.length / rowsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="mt-5 rounded-lg w-[400px] overflow-x-scroll md:w-[1080px]">
      <AddTodoForm onAddTodo={handleAddTodo} />
      <table className="table-auto w-full border-collapse rounded-lg border-gray-200 bg-white shadow-sm mt-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-2 py-2 text-left">Sr.</th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Title
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Description
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Status
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Created at
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Updated at
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {currentRows.length > 0 ? (
            currentRows.map((todo, index) => (
              <tr key={todo.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-2 py-2">
                  {indexOfFirstRow + index + 1}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {todo.title}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {todo.description}
                </td>
                <td
                  className={`border ${
                    todo.status === true ? "text-green-500" : "text-orange-500"
                  } border-gray-300 px-4 py-2`}
                >
                  {todo.status ? "Completed" : "Pending"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {formatDate(todo.createdat)}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {formatDate(todo.updatedat)}
                </td>
                <td className="border border-gray-300 px-4 py-2 space-x-2">
                  <span className="flex gap-3 w-full justify-start items-center">
                    {todo.status === false && (
                      <button
                        onClick={() => handleUpdate(todo.id)}
                        className="p-2 rounded bg-green-500 text-white flex justify-center items-center"
                      >
                        {actionIcons.tickMark}
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(todo.id)}
                      className="bg-red-500 text-white flex justify-center items-center p-2 rounded"
                    >
                      {actionIcons.crossMark}
                    </button>
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center py-4 text-gray-500">
                No todos added
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {todos.length > rowsPerPage && (
        <div className="flex justify-center items-center mt-4 gap-2 p-3 ">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded ${
              currentPage === 1
                ? "text-gray-400"
                : "text-gray-700 hover:text-blue-500"
            }`}
          >
            Back
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-blue-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded ${
              currentPage === totalPages
                ? "text-gray-400"
                : "text-gray-700 hover:text-blue-500"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoList;
