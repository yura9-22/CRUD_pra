import React, { useState, useEffect, use } from 'react'
import axios from 'axios'
import './App.css'

const API_URL = 'http://localhost:3001/todos';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
