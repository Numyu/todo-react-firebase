import React from 'react'

export default function Todo(todo) {
  return (
    <li className='todo-li'>
        <div className="row">
            <input 
                onChange={() => todo.toggleComplete(todo)} 
                type="checkbox" className="checkbox" 
                checked={todo.completed ? 'checked' : ''}
            />
            <p onClick={() => todo.toggleComplete(todo)} className='text'>
                {todo.text}
            </p>
        </div>
        <button onClick={() => todo.deleteTodo(todo.id)} className="remove-li">
            x
        </button>
    </li>
  )
}
