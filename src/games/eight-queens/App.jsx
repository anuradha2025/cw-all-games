import React, { useEffect, useState } from "react";
import "./App.css";
import { saveSolution, getAllSolutions } from "./db/storage";
import hanldle from "./exc/Excpetionhandle";

const BOARD_SIZE = 8;

function App() {
  const [queens, setQueens] = useState([]);
  const [totalSolutions, setTotalSolutions] = useState(null);
  const [worker, setWorker] = useState(null);
  const [playerName, setPlayerName] = useState("");
  const [submittedName, setSubmittedName] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [solutions, setSolutions] = useState(() => {
    return JSON.parse(localStorage.getItem("eightQueensSolutions")) || [];
  });
  // Optional: if you want to determine if all solutions have been found
  const [allSolutionsFound, setAllSolutionsFound] = useState(false);

  // Initialize total solutions using a Worker if available, otherwise fallback
  useEffect(() => {
    if (process.env.NODE_ENV === "test") {
      // For tests, skip worker creation
      setTotalSolutions(92);
      return;
    }
    loadWorker();
  }, []);

  async function loadWorker() {
    if (typeof window !== "undefined" && typeof window.Worker !== "undefined") {
      try {
        // Dynamically compute the worker URL so the import.meta.url expression isn’t parsed in test mode
        const workerUrl = new URL('./workers/eightQueensWorker.js', import.meta.url);
        const newWorker = new Worker(workerUrl);
        newWorker.onmessage = (e) => {
          setTotalSolutions(e.data);
          console.log("Worker result:", e.data);
        };
        setWorker(newWorker);
        newWorker.postMessage("start");
        return () => {
          newWorker.terminate();
        };
      } catch (err) {
        console.error("Worker error:", err);
        setTotalSolutions(92);
      }
    } else {
      setTotalSolutions(92);
    }
  }

  // Record start time when name is submitted and board is reset
  useEffect(() => {
    if (submittedName && queens.length === 0) {
      setStartTime(Date.now());
    }
  }, [submittedName, queens.length]);

  const isQueenHere = (row, col) => {
    return queens.some((q) => q.row === row && q.col === col);
  };

  const isAttacked = (row, col) => {
    return queens.some(
      (q) =>
        q.row === row ||
        q.col === col ||
        Math.abs(q.row - row) === Math.abs(q.col - col)
    );
  };

  const normalizeSolution = (queensArray) => {
    const sorted = [...queensArray].sort((a, b) =>
      a.row === b.row ? a.col - b.col : a.row - b.row
    );
    const key = sorted.map((q) => `${q.row}${q.col}`).join("");
    return { key, sorted };
  };

  const handleClick = (row, col) => {
    // Prevent adding queen if no name submitted, queen already exists, or attacked position
    if (!submittedName || isQueenHere(row, col) || isAttacked(row, col)) return;
    const newQueens = [...queens, { row, col }];
    setQueens(newQueens);

    if (newQueens.length === BOARD_SIZE) {
      const normalized = normalizeSolution(newQueens);
      const exists = solutions.find((s) => s.key === normalized.key);
      const duration = ((Date.now() - startTime) / 1000).toFixed(2);
      if (exists) {
        alert(`This method has already been used by ${exists.player}. Try a different way.`);
      } else {
        const newEntry = {
          key: normalized.key,
          player: submittedName,
          time: `${duration}s`,
          score: 100 - parseFloat(duration),
          positions: newQueens,
        };
        const updatedSolutions = [...solutions, newEntry];
        setSolutions(updatedSolutions);
        localStorage.setItem("eightQueensSolutions", JSON.stringify(updatedSolutions));
        if (updatedSolutions.length === totalSolutions) {
          setAllSolutionsFound(true);
        }
        alert("Correct! Solution saved.");
      }
    }
  };

  const handleExistingSolution = (solution) => {
    setQueens(solution.positions);
    setToastMessage(`You are now trying the solution submitted by ${solution.player}`);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const terminate = () => {
    setQueens([]);
    setSubmittedName(null);
    setStartTime(null);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const showCustomToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="container">
      <h1>Eight Queens Puzzle</h1>

      {!submittedName ? (
        <div className="input-area">
          <input
            className="text-area"
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Enter your name"
          />
          <button
            className="submit-button"
            onClick={() => {
              if (playerName.trim()) {
                setSubmittedName(playerName);
              }
            }}
          >
            Submit
          </button>
        </div>
      ) : (
        <h2 className="sub-heading">Welcome, {submittedName}!</h2>
      )}

      <div className="stats">
        <p>Total Possible Solutions: {totalSolutions}</p>
        <p>Solutions Found: {solutions.length}</p>
        <p>Remaining: {totalSolutions - solutions.length}</p>
      </div>

      <div className="small-container">
        <div className="left">
          <div className="board">
            {Array.from({ length: BOARD_SIZE }, (_, row) => (
              <div key={row} className="row">
                {Array.from({ length: BOARD_SIZE }, (_, col) => {
                  const isWhite = (row + col) % 2 === 0;
                  const isQueen = isQueenHere(row, col);
                  const attacked = isAttacked(row, col);
                  const cellClass = `cell ${isWhite ? "white" : "black"} ${attacked ? "attacked" : ""}`;
                  return (
                    <div
                      key={col}
                      role="cell"
                      className={cellClass}
                      onClick={() => handleClick(row, col)}
                    >
                      {isQueen && <span className="queen">♛</span>}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="right">
          <h3>Submitted Solutions</h3>
          <table>
            <thead>
              <tr>
                <th>Player</th>
                <th>Time</th>
                <th>Score</th>
                <th>Positions</th>
              </tr>
            </thead>
            <tbody>
              {solutions
                .filter((entry) => Array.isArray(entry.positions))
                .map((entry, idx) => (
                  <tr key={idx}>
                    <td>{entry.player}</td>
                    <td>{entry.time}</td>
                    <td>{entry.score}</td>
                    <td>
                      {entry.positions.map((p) => `(${p.row},${p.col})`).join(", ")}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <button className="terminate" onClick={terminate}>
            Terminate
          </button>

          {showAlert && <div className="custom-alert">Session is over</div>}
          {showToast && <div className="custom-toast">{toastMessage}</div>}
        </div>
      </div>
    </div>
  );
}

export default App;