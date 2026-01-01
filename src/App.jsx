import { useState, useEffect } from 'react';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  // Derived states
  const [totalCount, setTotalCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);

  const addTodo = () => {
    if (input.trim() !== '') {
      setTodos([...todos, { 
        id: Math.random(), 
        text: input, 
        completed: false 
      }]);
      setInput('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  useEffect(() => {
    setTotalCount(todos.length);
    setCompletedCount(todos.filter(todo => todo.completed).length);
    setPendingCount(todos.filter(todo => !todo.completed).length);
  }, [todos]);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          My Todos
        </h1>

        {/* Input + Add Button */}
        <div className="flex gap-2 mb-6">
          <input
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            placeholder="Add new todo..."
          />
          <button
            onClick={addTodo}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition cursor-pointer"
          >
            Add
          </button>
        </div>

        {/* Todo List */}
          {/* Todo List with nice scrollable area */}
<ul className="space-y-3 mb-8 max-h-60 overflow-y-auto border border-gray-200 rounded-lg bg-gray-50 p-4">
  {todos.length === 0 ? (
    <li className="text-center text-gray-500 py-8">
      No todos yet. Add one above! 👆
    </li>
  ) : (
    todos.map(todo => (
      <li
        key={todo.id}
        className="flex items-center gap-3 bg-white p-4 rounded-lg hover:bg-gray-100 transition-shadow shadow-sm"
      >
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
          className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
        />
        <span
          className={`flex-1 ${
            todo.completed ? 'line-through text-gray-500' : 'text-gray-800 font-medium'
          }`}
        >
          {todo.text}
        </span>
        <button
          onClick={() => deleteTodo(todo.id)}
          className="text-red-500 hover:text-red-700 font-bold text-xl leading-none cursor-pointer"
        >
          ×
        </button>
      </li>
    ))
  )}
</ul>

        {/* Statistics - Derived State */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-blue-100 p-4 rounded-lg">
            <p className="text-2xl font-bold text-blue-700">{totalCount}</p>
            <p className="text-sm text-gray-600">Total</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg">
            <p className="text-2xl font-bold text-green-700">{completedCount}</p>
            <p className="text-sm text-gray-600">Completed</p>
          </div>
          <div className="bg-orange-100 p-4 rounded-lg">
            <p className="text-2xl font-bold text-orange-700">{pendingCount}</p>
            <p className="text-sm text-gray-600">Pending</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoApp;