import React, { useState } from 'react';
import './App.css';
import Board from './components/Board';

export default function App() {

  return (
    <div>
      <div className='text-white text-xl text-bold m-5'>
        1v1 SCI DAMA
      </div>
      <Board/>
    </div>
  );
}
