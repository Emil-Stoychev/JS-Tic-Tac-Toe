window.addEventListener('load', () => {

    const tilesContainer = document.querySelector('.container')
    const tiles = tilesContainer.querySelectorAll('.tile')
    const resetGameBtn = document.querySelector('#reset')
    const wonGameText = document.querySelector('#wonGameText')
    const curPlayerSpanEl = document.querySelector('.display span')
    let roundWin

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isFilled

    resetGameBtn.addEventListener('click', resetGame)
    tiles.forEach((x, i) => x.addEventListener('click', () => setInBoardIndex(x, i)))

    /*
        Board indexes
        [0] [1] [2]
        [3] [4] [5]
        [6] [7] [8]
    */

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    let e
    let s
    let r

    function resultValidate(currentPlayer) {
        roundWin = false
        wonGameText.setAttribute('class', 'display hide')
        for (let i = 0; i <= 7; i++) {
            let winCondition = winningConditions[i]
            let a = board[winCondition[0]]
            let b = board[winCondition[1]]
            let c = board[winCondition[2]]

            if (a == '' || b == '' || c == '') {
                continue
            }

            if (a == b && b == c) {
                roundWin = true
                e = winCondition[0]
                s = winCondition[1]
                r = winCondition[2]
                break
            }
        }

        if (roundWin) {
            let first = Array.from(tiles).find((x, i) => i == e)
            let second = Array.from(tiles).find((x, i) => i == s)
            let third = Array.from(tiles).find((x, i) => i == r)
            winGame(currentPlayer)
            roundWinActions(first, second, third)
        }
    }

    function setInBoardIndex(tile, index) {

        if (tile.textContent === 'X' || tile.textContent === 'O' || tile.textContent === ' ') {
            return
        }


        tile.textContent = currentPlayer
        board[index] = currentPlayer

        tile.setAttribute('class', `tile player${currentPlayer}`)
        resultValidate(currentPlayer)
        currentPlayer == 'X' ? currentPlayer = 'O' : currentPlayer = 'X'
        curPlayerSpanEl.setAttribute('class', `player${currentPlayer}`)
        curPlayerSpanEl.textContent = currentPlayer
        isFilled = Array.from(tiles).some(x => x.textContent == '')

        if (!isFilled) {
            if (!roundWin) {
                wonGameText.textContent = `Try again!`
                wonGameText.setAttribute('class', 'display')
            }
        }
    }


    function winGame(currentPlayer) {
        wonGameText.textContent = `Player ${currentPlayer} win the Game!`
        wonGameText.setAttribute('class', 'display')
        tiles.forEach(x => {
            if (x.textContent == '') {
                x.textContent = ' '
            }
        })
    }
    let timer

    function resetGame() {
        board = ['', '', '', '', '', '', '', '', '']
        tiles.forEach(x => x.textContent = '' && x.setAttribute('class', 'tile'))
        wonGameText.setAttribute('class', 'display hide')
        currentPlayer = 'X'
        curPlayerSpanEl.setAttribute('class', `player${currentPlayer}`)
        curPlayerSpanEl.textContent = currentPlayer
        clearInterval(timer)
    }

    function roundWinActions(...params) {
        timer = setInterval(() => {
            let randomNum = Math.floor(Math.random() * 3) + 1
            params.forEach(x => x.setAttribute('class', `tile win${randomNum}`))
        }, 400);
    }
})