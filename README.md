# CW All Games - Coursework Project

This repository contains the source code, documentation, and deliverables for our coursework project. The project implements several game menu options with both user-driven interactions and algorithm-based computations. Our implementation covers classic problems and puzzles using various algorithms, appropriate data structures, thorough unit testing, and robust validation/exception handling.

## Game Menu Options

### 1. Tic-Tac-Toe (5x5)
- **Game Mode:** Human vs. Computer
- **Features:**
  - Implements a 5x5 board, allowing players to compete against the computer.
  - Determines the optimal move for the computer using two different algorithmic approaches.
  - Interactive user interface displaying the game state and outcomes (win, lose, or draw).
  - Records the player's name along with the correct answer in the database.
  - Logs the time taken for each computer move for both algorithmic approaches.
  - Contains unit testing code along with proper validations and exception handling.

### 2. Traveling Salesman Problem
- **Game Mode:** Finding the Shortest Route
- **Features:**
  - Each game round involves cities labeled A to J, with distances randomly assigned between 50 and 100 kilometers.
  - A home city is chosen randomly at the start of each round.
  - Users select which cities to visit, and the system computes the shortest route for visiting each city exactly once before returning to the home city.
  - Implements three different algorithmic approaches to calculate the shortest route.
  - Captures the time taken by each algorithm and stores the details (player's name, home city, selected cities, and the computed shortest route) into the database.
  - Includes unit testing, validations, and exception handling.

### 3. Tower of Hanoi
- **Game Mode:** Puzzle Challenge
- **Features:**
  - Uses a randomly selected number of disks (between 5 and 10) for each game round.
  - Players input the "sequence of moves" required to shift the disks from the source peg to the destination peg.
  - Offers both recursive and iterative (non-recursive) solutions.
  - Extends the classic three-peg solution to a four-peg configuration using the Frame-Stewart algorithm for comparison.
  - Records execution times for each algorithm and stores successful game responses in the database.
  - Incorporates thorough unit testing along with validations and exception handling.

### 4. Eight Queens’ Puzzle
- **Game Mode:** Chess Puzzle
- **Features:**
  - The goal is to position eight queens on an 8x8 chessboard so that no two queens threaten each other.
  - Implements two methods: a sequential solution and a threaded solution to identify the maximum number of valid queen arrangements.
  - Provides a user interface for entering answers and visual feedback on the game outcome.
  - If a player provides a correct answer, their name and solution are saved; duplicate correct answers are flagged, and players are prompted to try again.
  - Once all possible solutions are identified, the system resets the validation flag for further play.
  - Includes complete unit tests, validations, and exception handling.

### 5. Knight's Tour Problem
- **Game Mode:** Chessboard Challenge
- **Features:**
  - The knight starts at a randomly selected position, and the objective is to visit every square on the chessboard exactly once.
  - Two algorithmic approaches are used to determine the valid sequence of moves.
  - A user-friendly interface provides a means for players to submit and verify their answers.
  - On a correct answer, the player's name and solution details are recorded in the database.
  - Comes with comprehensive unit testing, validations, and exception handling.

## How to Run on Your PC

Follow these steps to set up and run the project on your local machine:

1. **Clone the Repository**  
   Open your terminal or command prompt and run:
   ```bash
   git clone https://github.com/anuradha2025/cw-all-games.git
   cd cw-all-games
   ```

2. **Install Dependencies**  
   This project uses Node.js with TypeScript and JavaScript. Ensure you have [Node.js](https://nodejs.org/) installed. Then, install the required packages:
   ```bash
   npm install
   ```

3. **Run the Application**  
   Start the development server:
   ```bash
   npm run dev
   ```
   This command will launch the application and display the game menu options in your browser.

4. **Run Unit Tests**  
   To execute the unit tests, run:
   ```bash
   npm run test
   ```

  ## Environment Configuration

Create a file named ".env" in the project root and add the backend server's URL:
```bash
VITE_API_URL=xxxxxxxxxxxx
```


## Summary

This project, developed as part of our coursework, highlights our understanding and application of various algorithms, data structures, unit testing practices, and user interface development. It serves both as a technical showcase and a comprehensive implementation of game-based problem solving for our course.
