import React from 'react';

const Tile = ({ color, chip, onClick }) => {

    let chipStyle;

    if (chip === 1) {
      chipStyle = 'bg-white';
    } else if (chip === -1) {
      chipStyle = 'bg-black';
    } else if (chip === 2) {
      chipStyle = 'bg-green-500'; // Change to green
    } else {
      chipStyle = 'bg-none';
    }
  
  return (
    <div
      style={{ backgroundColor: color }}
      className="w-full h-full border flex justify-center items-center"
      onClick={onClick}
    >
      <div className={`${chipStyle} w-8 h-8 rounded-full`}></div>
    </div>
  );
};

export default Tile;
