'use client'

import { useState } from 'react'
import { Plus, X } from 'lucide-react'

interface TodoItem {
  id: number
  text: string
  completed: boolean
}

export function TodoList() {
  const [todos, setTodos] = useState<TodoItem[]>([
    { id: 1, text: 'Finalize color palette for living room', completed: true },
    { id: 2, text: 'Source sustainable materials for flooring', completed: false },
    { id: 3, text: 'Create lighting plan for dining area', completed: false },
  ])
  const [newTodoText, setNewTodoText] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTodoText.trim()) {
      const newTodo: TodoItem = {
        id: Date.now(),
        text: newTodoText.trim(),
        completed: false
      }
      setTodos([...todos, newTodo])
      setNewTodoText('')
      setShowAddForm(false)
    }
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div className="todo-section bg-[#252525] rounded-lg p-5 mt-4">
      <div className="todo-header flex justify-between items-center mb-4">
        <div>
          <h3 className="todo-title text-lg font-semibold mb-1">TODO ITEMS</h3>
          <div className="todo-description text-[#999] text-sm">
            Track and manage your project tasks
          </div>
        </div>
        <button 
          className="bg-transparent text-white border border-[#444] rounded-full px-4 py-2 flex items-center text-sm hover:bg-[#2a2a2a] transition-all"
          onClick={() => setShowAddForm(true)}
        >
          <Plus size={16} className="mr-1" />
          Add Task
        </button>
      </div>
      
      {showAddForm && (
        <form onSubmit={addTodo} className="mb-4 flex">
          <input
            type="text"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            placeholder="Enter a new task..."
            className="flex-grow p-3 bg-[#2c2c2c] border border-[#444] rounded-l-md text-white"
            autoFocus
          />
          <button
            type="submit"
            className="px-4 bg-[#f8a387] text-[#1a1a1a] font-medium rounded-r-md hover:opacity-90"
          >
            Add
          </button>
        </form>
      )}
      
      {todos.length === 0 ? (
        <div className="text-center py-8 text-[#999]">
          No tasks yet. Add your first task to get started.
        </div>
      ) : (
        <ul className="todo-list">
          {todos.map(todo => (
            <li
              key={todo.id}
              className={`todo-item flex items-center p-4 rounded-md bg-[#2c2c2c] mb-2 ${
                todo.completed ? 'text-[#666]' : ''
              }`}
            >
              <div
                className={`todo-checkbox w-[18px] h-[18px] border-2 border-[#f8a387] rounded-sm mr-4 flex justify-center items-center cursor-pointer ${
                  todo.completed ? 'bg-[#f8a387]' : ''
                }`}
                onClick={() => toggleTodo(todo.id)}
              >
                {todo.completed && (
                  <span className="text-[#252525] text-xs font-bold">✓</span>
                )}
              </div>
              <span className={todo.completed ? 'line-through flex-grow' : 'flex-grow'}>
                {todo.text}
              </span>
              <button 
                onClick={() => deleteTodo(todo.id)}
                className="text-[#999] hover:text-red-400 ml-2"
              >
                <X size={16} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}