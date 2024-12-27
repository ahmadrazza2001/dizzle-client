import React from "react";
import TodoList from "../components/Todo.table";

const HomePage: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Drizzle Todos</h1>
      <TodoList />
    </div>
  );
};

export default HomePage;
