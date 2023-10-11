import { useState } from "react";
import Square from "../Square/Square";
import "./board.css"
const Board = () => {
    const [nextPlayer, setNextPlayer] = useState("X");
    const [currentArray, setCurrentArray] = useState(Array(9).fill(null));
    const [isWinner, setWinner] = useState(false);
    const [winnerPlayer, setWinnerPlayer] = useState(null);
    const [history, setHistory] = useState([currentArray]);
    function getUniqueElements(array) {
        const uniqueArray = [];
        for (let i = 0; i < array.length; i++) {
            let isDuplicate = false;
            for (let j = 0; j < uniqueArray.length; j++) {
                if (JSON.stringify(array[i]) === JSON.stringify(uniqueArray[j])) {
                    isDuplicate = true;
                    break;
                }
            }
            if (!isDuplicate) {
                uniqueArray.push(array[i]);
            }
        }
        return uniqueArray;
    }
    const uniqueElements = getUniqueElements(history);
    const result = uniqueElements;
    const moves = result.map((squares, move) => {
        let description;
        if (move > 0) {
            description = 'Go to move #' + move;
        } else {
            description = 'Go to game start';
        }
        return (
            <li key={move}>
                <button onClick={() => {
                    setCurrentArray((prev) => {
                        if (checkWinner(squares) === "X") {
                            setWinner(true);
                            setWinnerPlayer("X");
                        }
                        else if (checkWinner(squares) === "O") {
                            setWinner(true);
                            setWinnerPlayer("O");
                        }
                        else setWinner(false);
                        const counts = squares.reduce((acc, currentValue) => {
                            if (currentValue === "X") {
                                acc.X++;
                            } else if (currentValue === "O") {
                                acc.O++;
                            }
                            return acc;
                        }, { X: 0, O: 0 });
                        if (counts.X === counts.O || counts.X < counts.O) setNextPlayer("X");
                        else setNextPlayer("O");
                        return squares;
                    });
                }}>{description}</button>
            </li>
        );
    });
    function checkWinner(currentArray) {
        const winnerArray = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]
        for (let i = 0; i < winnerArray.length; i++) {
            const [a, b, c] = winnerArray[i];
            if (currentArray[a] === currentArray[b] && currentArray[b] === currentArray[c] && currentArray[c] === "X") {
                return "X"
            }
            if (currentArray[a] === currentArray[b] && currentArray[b] === currentArray[c] && currentArray[c] === "O") {
                return "O"
            }
        }
        return "NO"
    }
    function handleClickSquare(i) {
        if (isWinner) {
            return;
        }
        if (currentArray[i]) {
            return;
        }
        const counts = currentArray.reduce((acc, currentValue) => {
            if (currentValue === "X" || currentValue === "O") {
                acc++;
            }
            return acc;
        }, 0);
        setCurrentArray((prev) => {
            const newArr = [...prev];
            newArr[i] = nextPlayer;
            setHistory((prev) => {
                const newHistory = prev.slice(0, counts + 1);
                return [...newHistory, newArr];
            });
            if (checkWinner(newArr) === "X") {
                setWinner(true);
                setWinnerPlayer("X");
            }
            if (checkWinner(newArr) === "O") {
                setWinner(true);
                setWinnerPlayer("O");
            }
            if (nextPlayer === "X") setNextPlayer("O");
            else setNextPlayer("X");
            return newArr;
        })
    }
    return (
        <>
            <div className="main-container">
                <div className="left-container">
                    {isWinner ? (
                        <div className="winner">Winner: {winnerPlayer}</div >
                    ) : (
                        <div className="next-player">Next player: {nextPlayer}</div >
                    )}
                    <div className="board-container">
                        {currentArray.map((ele, i) => {
                            return (

                                <Square key={i} value={ele} handleClick={() => handleClickSquare(i)} />
                            )
                        })}
                    </div>
                </div>
                <div className="right-container">
                    <ol value="1" className="step-container">
                        {moves}
                    </ol>
                </div>
            </div>


        </>
    );
}

export default Board;