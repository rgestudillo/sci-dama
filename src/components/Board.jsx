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
    }, []); // Run only once when the component mounts

    
    const checkForValidCapture = (row, col) => {
        const currentPlayerChip = player === 1 ? 1 : -1;
        const opponentChip = player === 1 ? -1 : 1;
        const validCaptures = [];
    
        // Check if the current player's chip can capture diagonally
        if (chips[row][col] === currentPlayerChip) {
            // Check upper-left capture
            if (row >= 2 && col >= 2 && chips[row - 1][col - 1] === opponentChip && (chips[row - 2][col - 2] === 0 || chips[row - 2][col - 2] === 2 )) {
                validCaptures.push([row - 2, col - 2]);
            }
            // Check upper-right capture
            if (row >= 2 && col <= 5 && chips[row - 1][col + 1] === opponentChip && (chips[row - 2][col + 2] === 0 || chips[row - 2][col + 2] === 2 )) {
                validCaptures.push([row - 2, col + 2]);
            }
            // Check lower-left capture (for king pieces)
            if (row <= 5 && col >= 2 && chips[row + 1][col - 1] === opponentChip && (chips[row + 2][col - 2] === 0 || chips[row + 2][col - 2] === 2 )) {
                validCaptures.push([row + 2, col - 2]);
            }
            // Check lower-right capture (for king pieces)
            if (row <= 5 && col <= 5 && chips[row + 1][col + 1] === opponentChip && (chips[row + 2][col + 2] === 0 || chips[row + 2][col + 2] === 2 )) {
                validCaptures.push([row + 2, col + 2]);
            }
        }
    
        // Return array of valid capture tiles, or an empty array if no valid capture found
        return validCaptures;
    };
    
    const hasValidCapture = (player) => {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (chips[i][j] == player && checkForValidCapture(i, j).length > 0) {
                    return true;
                }
            }
        }
        return false;
    };

    const handleTileClick = (id) => {
        const [row, col] = id.split('-').map(Number);
        
        const validCaptureTiles = checkForValidCapture(row, col);
        

        if(chosen == id){
            reset();
            generateTiles();
            setChosen(null);
            return;
        }

        if (hasValidCapture(player)) {

            if(chips[row][col] == 2){
                const [row1, col1] = chosen.split('-').map(Number);
        
                // Code for the piece that will capture
                const newChips = [...chips];
                newChips[row][col] = chips[row1][col1];
                newChips[row1][col1] = 0; // Set the captured piece to 0
        
                // Find the position of the captured piece and set it to 0
                const capturedRow = row1 + (row - row1) / 2;
                const capturedCol = col1 + (col - col1) / 2;
                newChips[capturedRow][capturedCol] = 0;
        
                setChips(newChips);
                reset();
                generateTiles();

                if(!hasValidCapture(player)){
                    if(player == 1){
                        setPlayer(-1);
                    }else{
                        setPlayer(1);
                    }
                }
 
                return;
            }
        
            if (checkForValidCapture(row, col).length === 0) {
                return;
            }
        }



        if(chips[row][col] == 2){
            const [row1, col1] = chosen.split('-').map(Number);
            const newChips = [...chips];
            newChips[row][col] = chips[row1][col1];
            newChips[row1][col1] = 0;
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


        reset();
        setChosen(id);
    
        if (validCaptureTiles.length > 0) {
            const newChips = [...chips];
            validCaptureTiles.forEach(([r, c]) => {
                newChips[r][c] = 2;
            });
            setChips(newChips);
            generateTiles();
            
            //capture the piece here

            return;
        }

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
