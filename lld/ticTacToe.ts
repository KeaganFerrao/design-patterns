class Player {
    id: string;
    name: string;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }
    // Other player related data
}

enum BoardWinnerStatus {
    PLAYER_ONE,
    PLAYER_TWO,
    DRAW,
    UNDECIDED
}

class Board {
    // 1  => Player1
    //-1  => Player 2
    // 0  => Empty
    private currentPlayer = 1;
    private board: number[][] = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    private boardWinnerStatus: BoardWinnerStatus = BoardWinnerStatus.UNDECIDED;

    reset() {
        this.board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]; // 3x3
        this.boardWinnerStatus = BoardWinnerStatus.UNDECIDED;
        this.currentPlayer = 1
    }

    getWinner() {
        return this.boardWinnerStatus;
    }

    getCurrentPlayer() {
        return this.currentPlayer
    }

    getBoard() {
        return this.board
    }

    // Returns 1 if player 1 has won in this move
    // Returns -1 if player 2 has won in this move
    // Returns 0 if none has won in this move
    makeMove(move: Move): number {
        if (this.boardWinnerStatus !== BoardWinnerStatus.UNDECIDED) {
            throw new Error("This game is finished");
        }
        if (move.row > 2 || move.column > 2 || move.row < 0 || move.column < 0) {
            throw new Error("Invalid row/column index");
        }
        if (this.board[move.row][move.column] !== 0) {
            throw new Error("Square already occupied");
        }
        if (move.playerId !== this.currentPlayer) {
            throw new Error("Wrong player played")
        }

        this.board[move.row][move.column] = this.currentPlayer;

        // Check winning condition
        let rowSum = 0;
        let colSum = 0;
        let diagSum = 0;
        let reverseDiagSum = 0
        for (let i = 0; i < this.board.length; i++) {
            rowSum += this.board[move.row][i];
            colSum += this.board[i][move.column];
            diagSum += this.board[i][i];
            reverseDiagSum += this.board[this.board.length - 1 - i][this.board.length - 1 - i]
        }

        if (Math.abs(rowSum) === this.board.length || Math.abs(colSum) === this.board.length || Math.abs(diagSum) === this.board.length || Math.abs(reverseDiagSum) === this.board.length) {
            this.boardWinnerStatus = this.currentPlayer === 1 ? BoardWinnerStatus.PLAYER_ONE : BoardWinnerStatus.PLAYER_TWO;
            console.log("Player won", this.currentPlayer);
            return this.currentPlayer;
        }

        this.currentPlayer = (this.currentPlayer * -1);
        console.log("Now playing", this.currentPlayer)

        return 0;
    }
}

class Move {
    playerId: number; // 1 or -1
    row: number;
    column: number

    constructor(player: number, row: number, column: number) {
        this.playerId = player;
        this.row = row;
        this.column = column;
    }
}

class Game {
    id: string;
    playerId1: string;
    playerId2: string;
    moves: Move[] = []

    constructor(id: string, player1: string, player2: string) {
        this.id = id;
        this.playerId1 = player1;
        this.playerId2 = player2;
    }

    saveMoveHistory(move: Move) {
        this.moves.push(move);
    }
}

function main() {
    const player1 = new Player("1", "Keagan");
    const player2 = new Player("2", "John");

    const board = new Board();
    const game = new Game("101", player1.id, player2.id);

    const moves = [[1, 0, 0], [-1, 0, 1], [1, 1, 1], [-1, 0, 2], [1, 2, 2]];

    for (const move of moves) {
        const m = new Move(move[0], move[1], move[2])
        board.makeMove(m);
        game.saveMoveHistory(m);
    }

    console.log(game.moves)
}

main();