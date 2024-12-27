import React, { useState } from "react";
import { addTodo } from "../../@core/services/api";
import { toast } from "react-toastify";

interface Todo {
  id: string;
  title: string;
  description: string;
  status: boolean;
}

interface AddTodoFormProps {
  onAddTodo: (todo: Todo) => void;
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({ onAddTodo }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
  }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { title?: string; description?: string } = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!description.trim()) newErrors.description = "Description is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await addTodo({ title, description });
      const newTodo = response.data;
      onAddTodo(newTodo);
      toast.success("Todo added successfully");
      setTitle("");
      setDescription("");
      setErrors({});
    } catch (error) {
      console.error("Error adding todo:", error);
      toast.error("Failed to add todo");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-gray-100 rounded-lg shadow-sm w-[375px]"
    >
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          id="title"
          type="text"
          placeholder="Todo title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`p-2 border ${
            errors.title ? "border-red-500" : "border-gray-300"
          } rounded mb-1 w-full`}
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          placeholder="What needs to be done?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`p-2 border ${
            errors.description ? "border-red-500" : "border-gray-300"
          } rounded mb-1 w-full`}
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description}</p>
        )}
      </div>
      <button
        type="submit"
        className="bg-green-500 text-white p-2 rounded w-auto"
      >
        Add Todo
      </button>
    </form>
  );
};

export default AddTodoForm;
