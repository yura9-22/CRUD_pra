import React, { useState, useEffect, use } from 'react'
import axios from 'axios'
import './App.css'

const API_URL = 'http://localhost:3001/todos';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTodoTitle, setNewTodoTitle] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(API_URL);
        setTodos(response.data);
        setLoading(false);

      } catch (err) {
        console.error("データ取得エラー:", err);
        setError("APIサーバーとの通信に失敗しました。json-serverが起動し、db.jsonがあるか確認してください。");
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const handleInputChange = (event) => {
    setNewTodoTitle(event.target.value);
  };

  const handleCreateTodo = async (event) => {
    event.preventDefault();

    if (!newTodoTitle.trim()) return;

    try {
      const response = await axios.post(API_URL, {
        title: newTodoTitle,
        completed: false,
      });

      setTodos([...todos, response.data]);
      setNewTodoTitle(''); 

    } catch (err) {
      console.error("TODO作成エラー:", err);
      setError("TODOの作成に失敗しました。");
    }
    }

  if (loading){
    return (
      <div className="container">
        <h1>TODOリストをロード中...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <p className="error-message">エラーが発生しました: {error}</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>TODOリスト</h1>

      <form onSubmit={handleCreateTodo} className="todo-form">
        <input
          type="text"
          value={newTodoTitle}
          onChange={handleInputChange}
          placeholder="新しいTODOを入力"
        />
        <button type="submit">追加</button>
      </form>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id}
          className={todo.completed ? 'completed' : ''  }>
            <input type="checkbox" checked={todo.completed} readOnly />
            <span>{todo.title}</span>
          </li>
        ))}
      </ul>

      {todos.length === 0 && <p className="no-todos">TODOがありません。新しく追加しましょう。</p>}
          </div>
  );
}

export default TodoList
