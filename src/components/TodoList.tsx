'use client'

import { useState } from 'react'

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

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  return (
    <div className="todo-section bg-[#252525] rounded-lg p-5 mt-4">
      <div className="todo-header mb-4">
        <h3 className="todo-title text-lg font-semibold mb-1">TODO ITEMS</h3>
        <div className="todo-description text-[#999] text-sm">
          Track and manage your project tasks
        </div>
      </div>
      
      <ul className="todo-list">
        {todos.map(todo => (
          <li
            key={todo.id}
            className={`todo-item flex items-center p-4 rounded-md bg-[#2c2c2c] mb-2 ${
              todo.completed ? 'text-[#666] line-through' : ''
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
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  )
} 