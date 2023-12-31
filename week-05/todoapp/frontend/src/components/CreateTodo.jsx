import React, { useState } from 'react';

const inStyle = {
  padding: '5px',
};

const CreateTodo = ({ setIsNewTodo, isNewTodo }) => {
  const [title, setTitle] = useState('');
  const [description, setDecription] = useState('');

  return (
    <div>
      <input
        style={inStyle}
        type="text"
        placeholder="title"
        onChange={(e) => setTitle(e.target.value)}
      />{' '}
      <br /> <br />
      <input
        style={inStyle}
        type="text"
        placeholder="description"
        onChange={(e) => setDecription(e.target.value)}
      />{' '}
      <br /> <br />
      <button
        onClick={() => {
          fetch('http://localhost:3000/todo', {
            method: 'POST',
            body: JSON.stringify({
              title,
              description,
            }),
            headers: {
              'Content-type': 'application/json',
            },
          }).then(async (res) => {
            const msg = await res.json();
            setIsNewTodo(!isNewTodo);
          });
        }}
      >
        Add a todo
      </button>
    </div>
  );
};

export default CreateTodo;
