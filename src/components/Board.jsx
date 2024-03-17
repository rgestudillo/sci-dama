// Board.js
import React, { useState, useEffect } from 'react';
import Tile from './Tile'; // Make sure the path is correct
const initialChips = [
    [0, -1, 0, -1, 0, -1, 0, -1],
    [-1, 0, -1, 0, -1, 0, -1, 0],
    [0, -1, 0, -1, 0, -1, 0, -1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
];
export default function Board() {
    const [player, setPlayer] = useState(1);
    const [tiles, setTiles] = useState([]);
    const [chips, setChips] = useState(initialChips);  
    const [chosen, setChosen] = useState(null);


    const reset = () => {
        const newChips = [...chips];
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if(newChips[i][j] === 2){
                    newChips[i][j] = 0;
                }
            }
        }
        setChips(newChips);
    }


    const generateTiles = () => {
        let newTiles = [];
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const isWhite = (i + j) % 2 === 1;
                let chip = chips[i][j]; 
                newTiles.push({
                    id: `${i}-${j}`,
                    color: isWhite ? '#987654' : '#f0c896', 
                    chip: chip,
                });
            }
        }
        setTiles(newTiles);
    };

    useEffect(() => {
        generateTiles();
    }, []);

    const handleTileClick = (id) => {
        const [row, col] = id.split('-').map(Number);

        if(chips[row][col] == 2){
            const [row1, col1] = chosen.split('-').map(Number);
            const newChips = [...chips];
            newChips[row][col] = chips[row1][col1];
            chips[row1][col1] = 0;
            setChips(newChips);
            reset();
            generateTiles();
            if(player == 1){
                setPlayer(-1);
            }else{
                setPlayer(1);
            }
            return;
        }

        if(chosen == id){
            reset();
            generateTiles();
            setChosen(null);
            return;
        }

        reset();
        setChosen(id);

        if(player === 1 && chips[row][col] == 1){
            const newChips = [...chips];

            if(chips[row - 1][col - 1] == 0){
                newChips[row - 1][col - 1] = 2; 
            }

            if(chips[row - 1][col + 1] == 0){
                newChips[row - 1][col + 1] = 2; 
            }

            setChips(newChips);
            generateTiles();
            
        }else if(player === -1 && chips[row][col] == -1){
            console.log("VALID PLAYER 2");
            const newChips = [...chips];

            if(chips[row + 1][col - 1] == 0){
                newChips[row + 1][col - 1] = 2; 
            }

            if(chips[row + 1][col + 1] == 0){
                newChips[row + 1][col + 1] = 2; 
            }

            setChips(newChips);
            generateTiles();
            
        }
    };


    return (
        <div className='flex text-white space-x-2'>
            <div className="grid grid-rows-8 h-[400px]">
                {[0, 1, 2, 3, 4, 5, 6, 7].map((num) => (
                    <div key={num} className="w-full h-full flex justify-center items-center">{num}</div>
                ))}
            </div>
            <div className='flex flex-col space-y-2'>
                <div className="grid grid-cols-8 w-[400px] h-[400px] border-4 border-black">
                    {tiles.map((tile) => (
                        <Tile key={tile.id} color={tile.color} chip={tile.chip} onClick={() => handleTileClick(tile.id)} />
                    ))}
                </div>
                <div className="grid grid-cols-8 w-[400px]  text-center">
                    {[0, 1, 2, 3, 4, 5, 6, 7].map((num) => (
                        <div key={num} className="w-full h-full flex justify-center items-center">{num}</div>
                    ))}
                </div>
            </div>
        </div>

    );
}
