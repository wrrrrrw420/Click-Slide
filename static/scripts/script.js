function init() {
    var firstClick = 0
    var positions = []
    var boardArray = []
    var countMoves = 0
    var updateClock = null
    var gameTime = ""

    var blockade = document.createElement("div")
    blockade.id = "blockade"

    var imgBlockade = document.createElement("div")
    imgBlockade.id = "imgBlockade"

    var main = document.createElement("div")
    main.id = "main"
    document.body.appendChild(main)

    var slider = document.createElement("div")
    slider.id = "slider"
    main.appendChild(slider)

    var topImg0 = document.createElement("img")
    topImg0.classList.add("slide")
    topImg0.id = "topImg0"
    topImg0.style.backgroundImage = "url(gfx/zubr.png)"
    topImg0.style.left = "-150px"
    slider.appendChild(topImg0)

    var topImg1 = document.createElement("img")
    topImg1.classList.add("slide")
    topImg1.id = "topImg1"
    topImg1.style.backgroundImage = "url(gfx/harn.png)"
    topImg1.style.left = "0px"
    slider.appendChild(topImg1)

    var topImg2 = document.createElement("img")
    topImg2.classList.add("slide")
    topImg2.id = "topImg2"
    topImg2.style.backgroundImage = "url(gfx/kustosz.png)"
    topImg2.style.left = "150px"
    slider.appendChild(topImg2)

    var topImg3 = document.createElement("img")
    topImg3.classList.add("slide")
    topImg3.id = "topImg3"
    topImg3.style.backgroundImage = "url(gfx/zubr.png)"
    topImg3.style.left = "300px"
    slider.appendChild(topImg3)

    var topImg4 = document.createElement("img")
    topImg4.classList.add("slide")
    topImg4.id = "topImg4"
    topImg4.style.backgroundImage = "url(gfx/harn.png)"
    topImg4.style.left = "450px"
    slider.appendChild(topImg4)

    var leftBtn = document.createElement("div")
    leftBtn.classList.add("sliderBtns")
    leftBtn.style.left = "-85px"
    leftBtn.style.backgroundImage = "url(gfx/leftArrow.png)"
    leftBtn.addEventListener("click", function () { slider_obj.moveLeft() })
    slider.appendChild(leftBtn)

    var rightBtn = document.createElement("div")
    rightBtn.style.left = "160px"
    rightBtn.classList.add("sliderBtns")
    rightBtn.style.backgroundImage = "url(gfx/rightArrow.png)"
    rightBtn.addEventListener("click", function () { slider_obj.moveRight() })
    slider.appendChild(rightBtn)

    var white = document.createElement("div")
    white.id = "white"
    slider.appendChild(white)

    var white2 = document.createElement("div")
    white2.id = "white2"
    slider.appendChild(white2)

    var buttons = document.createElement("div")
    buttons.id = "buttonsContainer"
    for (let x = 3; x <= 6; x++) {
        let button = document.createElement("button")
        button.innerHTML = x + "x" + x
        button.id = "btn" + x
        button.classList.add("buttons")
        button.addEventListener("click", function () { game.makeGrid(x) })
        buttons.appendChild(button)
    }
    main.appendChild(buttons)

    var divTimer = document.createElement("div")
    buttons.appendChild(divTimer)

    var mainImgContainer = document.createElement("div")
    mainImgContainer.id = "mainImgContainer"
    main.appendChild(mainImgContainer)

    var currentTime = new Date()
    currentTime = currentTime.getTime()
    var cookieExpire = new Date(currentTime + (10 * 365 * 24 * 60 * 60 * 1000))
    cookieExpire = cookieExpire.toUTCString()


    if (!document.cookie) {
        var cookie3 = document.cookie = "3=[]; expires=" + cookieExpire + "; path=/; SameSite=Strict"
        var cookie4 = document.cookie = "4=[]; expires=" + cookieExpire + "; path=/; SameSite=Strict"
        var cookie5 = document.cookie = "5=[]; expires=" + cookieExpire + "; path=/; SameSite=Strict"
        var cookie6 = document.cookie = "6=[]; expires=" + cookieExpire + "; path=/; SameSite=Strict"
        cookie3 = document.cookie.split(";")[0]
        cookie4 = document.cookie.split(";")[1]
        cookie5 = document.cookie.split(";")[2]
        cookie6 = document.cookie.split(";")[3]
    }
    else {
        for (x = 0; x < 4; x++) {
            if (document.cookie.split(";")[x].split("=")[0] == 3) {
                var cookie3 = document.cookie.split(";")[x]
            }
            if (document.cookie.split(";")[x].split("=")[0] == 4) {
                var cookie4 = document.cookie.split(";")[x]
            }
            if (document.cookie.split(";")[x].split("=")[0] == 5) {
                var cookie5 = document.cookie.split(";")[x]
            }
            if (document.cookie.split(";")[x].split("=")[0] == 6) {
                var cookie6 = document.cookie.split(";")[x]
            }
        }
    }

    var records3 = JSON.parse(cookie3.split("=")[1])
    var records4 = JSON.parse(cookie4.split("=")[1])
    var records5 = JSON.parse(cookie5.split("=")[1])
    var records6 = JSON.parse(cookie6.split("=")[1])

    document.getElementById("btn3").addEventListener("click", function () { cookies.makeRecordsBoard(records3, 3) })
    document.getElementById("btn4").addEventListener("click", function () { cookies.makeRecordsBoard(records4, 4) })
    document.getElementById("btn5").addEventListener("click", function () { cookies.makeRecordsBoard(records5, 5) })
    document.getElementById("btn6").addEventListener("click", function () { cookies.makeRecordsBoard(records6, 6) })

    var recordsDiv = document.createElement("div")
    recordsDiv.id = "records"
    main.appendChild(recordsDiv)


    var moveIndex = 0

    const slider_obj = {
        moveRight: () => {
            moveIndex++
            if (moveIndex == 3) {
                for (x = 0; x < 5; x++) {
                    moveIndex = 0
                    let el = document.getElementById("topImg" + x)
                    let pos = el.style.left
                    pos = pos.substring(0, pos.length - 2)
                    el.style.left = (parseInt(pos) + 450) + "px"
                }
            }
            var count = 0
            var int = setInterval(function () {
                count += 5
                for (x = 0; x < 5; x++) {
                    let el = document.getElementById("topImg" + x)
                    let pos = el.style.left
                    pos = pos.substring(0, pos.length - 2)
                    el.style.left = (parseInt(pos) - 5) + "px"
                    if (count == 150) {
                        clearInterval(int)
                    }
                }
            }, 1)
        },

        moveLeft: () => {
            moveIndex--
            if (moveIndex == -1) {
                for (x = 0; x < 5; x++) {
                    moveIndex = 2
                    let el = document.getElementById("topImg" + x)
                    let pos = el.style.left
                    pos = pos.substring(0, pos.length - 2)
                    el.style.left = (parseInt(pos) - 450) + "px"
                }
            }
            var count = 0
            var int = setInterval(function () {
                count += 5
                for (x = 0; x < 5; x++) {
                    let el = document.getElementById("topImg" + x)
                    let pos = el.style.left
                    pos = pos.substring(0, pos.length - 2)
                    el.style.left = (parseInt(pos) + 5) + "px"
                    if (count == 150) {
                        clearInterval(int)
                    }
                }
            }, 1)
        }
    }


    const game = {
        makeGrid: (e) => {
            clearInterval(updateClock)
            divTimer.id = "timer"
            divTimer.innerHTML = `
            <img class="number" src="gfx/c0.gif">
            <img class="number" src="gfx/c0.gif">
            <img class="number" src="gfx/colon.gif">
            <img class="number" src="gfx/c0.gif">
            <img class="number" src="gfx/c0.gif">
            <img class="number" src="gfx/colon.gif">
            <img class="number" src="gfx/c0.gif">
            <img class="number" src="gfx/c0.gif">
            <img class="number" src="gfx/dot.gif">
            <img class="number" src="gfx/c0.gif">
            <img class="number" src="gfx/c0.gif">
            <img class="number" src="gfx/c0.gif">
            `


            positions = []
            boardArray = []
            let cells = document.getElementById("mainImgContainer").childNodes
            let len = cells.length
            for (i = 0; i < len; i++) {
                cells[0].remove()
            }

            var cellWidth = 540 / e
            var cellHeight = 540 / e
            for (let y = 0; y < e; y++) {
                boardArray.push([])
                positions.push([])
                for (let x = 0; x < e; x++) {
                    if (x == e - 1 && y == e - 1) {
                        boardArray[y].push(0)
                        let cell = document.createElement("div")
                        cell.classList.add("cells")
                        cell.id = "cell." + y + "." + x
                        cell.style.backgroundColor = "black"
                        cell.style.width = cellHeight + "px"
                        cell.style.height = cellWidth + "px"
                        cell.style.top = y * cellHeight + "px"
                        cell.style.left = x * cellWidth + "px"
                        document.getElementById("mainImgContainer").appendChild(cell)
                        cell.addEventListener("click", function () { game.move(e, this) })

                    }
                    else {
                        if (y == e - 1 && x == e - 2) {
                            boardArray[y].push(2)
                        }
                        else if (y == e - 2 && x == e - 1) {
                            boardArray[y].push(2)
                        }
                        else {
                            boardArray[y].push(1)
                        }
                        let cell = document.createElement("div")
                        cell.classList.add("cells")
                        cell.id = "cell." + y + "." + x
                        if (moveIndex == 0) {
                            cell.style.backgroundImage = "url(gfx/harn.png)"
                        } else if (moveIndex == 1) {
                            cell.style.backgroundImage = "url(gfx/kustosz.png)"
                        } else if (moveIndex == 2) {
                            cell.style.backgroundImage = "url(gfx/zubr.png)"
                        }
                        cell.style.backgroundPosition = -(x * cellWidth) + "px " + -(y * cellHeight) + "px"
                        cell.style.width = cellHeight + "px"
                        cell.style.height = cellWidth + "px"
                        cell.style.top = y * cellHeight + "px"
                        cell.style.left = x * cellWidth + "px"
                        cell.addEventListener("click", function () { firstClick = 1; game.move(e, this) })
                        document.getElementById("mainImgContainer").appendChild(cell)
                        positions[y].push(cell.style.backgroundPosition)
                    }
                }
            }
            game.mix(e)
        },

        move: (e, el) => {
            let elId = el.id.split(".")
            let x = parseInt(elId[2])
            let y = parseInt(elId[1])

            if (boardArray[y][x] == 2) {
                for (i = 0; i < e; i++) {
                    for (p = 0; p < e; p++) {
                        if (boardArray[i][p] == 0) {
                            var empty = document.getElementById("cell." + i + "." + p)
                            boardArray[i][p] = 1

                        }
                        boardArray[i][p] = 1
                    }
                }
                let emptyBg = empty.style.backgroundColor

                let elBgPos = el.style.backgroundPosition
                let elBgImg = el.style.backgroundImage
                empty.style.backgroundImage = elBgImg
                empty.style.backgroundPosition = elBgPos
                el.style.backgroundImage = null
                el.style.backgroundPosition = null
                el.style.backgroundColor = emptyBg


                for (u = -1; u < 2; u++) {
                    if (y + u >= 0 && y + u < e) {
                        boardArray[y + u][x] = 2
                    }
                    if (x + u >= 0 && x + u < e) {
                        boardArray[y][x + u] = 2
                    }
                }
                boardArray[y][x] = 0
                if (firstClick == 1) {
                    game.win(e)
                    countMoves++
                }
            }
        },

        mix: (e) => {
            countMoves = 0
            if (document.getElementById("imgBlockade") != null) {
                document.getElementById("imgBlockade").remove()
            }
            main.appendChild(blockade)
            firstClick = 0
            setTimeout(() => {
                var huj = setInterval(() => {
                    let possibleMoves = []
                    for (i = 0; i < e; i++) {
                        for (p = 0; p < e; p++) {
                            if (boardArray[i][p] == 2) {
                                possibleMoves.push(document.getElementById("cell." + i + "." + p))
                            }
                        }
                    }
                    let randomNum = Math.floor(Math.random() * possibleMoves.length)
                    game.move(e, possibleMoves[randomNum])
                }, 10);
                setTimeout(() => {
                    clearInterval(huj)
                    document.getElementById("blockade").remove()
                    timer.startTimer()
                }, e * 700)
            }, 200)
        },

        win: (e) => {
            var correct = 0
            for (let y = 0; y < e; y++) {
                for (let x = 0; x < e; x++) {
                    let cell = document.getElementById("cell." + y + "." + x)
                    if (cell.style.backgroundPosition == positions[y][x]) {
                        correct++
                    }
                }
            }
            if (correct == (e * e) - 1) {
                timer.stopTimer()

                mainImgContainer.appendChild(imgBlockade)
                var nick = prompt("Wygrana!\nLiczba ruchów: " + (countMoves + 1) + "\nCzas: " + gameTime + "\nPodaj swój nick (max 15 liter):")
                while (nick.length > 15 || nick.length < 1) {
                    var nick = prompt("Niepoprawny nick")
                }
                if (e == 3) {
                    records3.push(encodeURIComponent(gameTime + "-" + nick));
                    cookies.sortList(records3)
                    cookie3 = document.cookie = "3=" + JSON.stringify(records3) + "; expires=" + cookieExpire + "; path=/; SameSite=Strict"
                    cookies.makeRecordsBoard(records3, 3)
                } else if (e == 4) {
                    records4.push(encodeURIComponent(gameTime + "-" + nick));
                    cookies.sortList(records4)
                    cookie4 = document.cookie = "4=" + JSON.stringify(records4) + "; expires=" + cookieExpire + "; path=/; SameSite=Strict"
                    cookies.makeRecordsBoard(records4, 4)
                } else if (e == 5) {
                    records5.push(encodeURIComponent(gameTime + "-" + nick));
                    cookies.sortList(records5)
                    cookie5 = document.cookie = "5=" + JSON.stringify(records5) + "; expires=" + cookieExpire + "; path=/; SameSite=Strict"
                    cookies.makeRecordsBoard(records5, 5)
                } else if (e == 6) {
                    records6.push(encodeURIComponent(gameTime + "-" + nick));
                    cookies.sortList(records6)
                    cookie6 = document.cookie = "6=" + JSON.stringify(records6) + "; expires=" + cookieExpire + "; path=/; SameSite=Strict"
                    cookies.makeRecordsBoard(records6, 6)
                }

            }
        }
    }

    const timer = {
        stopTimer: () => {
            clearInterval(updateClock)
            let time = gameTime.split(".")[0]
            let miliseconds = gameTime.split(".")[1]
            let hours = time.split(":")[0]
            let minutes = time.split(":")[1]
            let seconds = time.split(":")[2]
            
            document.getElementById("timer").innerHTML = `
            <img class="number" src="gfx/c${hours[0]}.gif">
            <img class="number" src="gfx/c${hours[1]}.gif">
            <img class="number" src="gfx/colon.gif">
            <img class="number" src="gfx/c${minutes[0]}.gif">
            <img class="number" src="gfx/c${minutes[1]}.gif">
            <img class="number" src="gfx/colon.gif">
            <img class="number" src="gfx/c${seconds[0]}.gif">
            <img class="number" src="gfx/c${seconds[1]}.gif">
            <img class="number" src="gfx/dot.gif">
            <img class="number" src="gfx/c${miliseconds[0]}.gif">
            <img class="number" src="gfx/c${miliseconds[1]}.gif">
            <img class="number" src="gfx/c${miliseconds[2]}.gif">
            `
        },

        startTimer: () => {
            let startTime = new Date().getTime()

            updateClock = setInterval(function () {
                let now = new Date().getTime();
                let distance = now - startTime

                let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
                let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
                let seconds = Math.floor((distance % (1000 * 60)) / 1000)
                let miliseconds = Math.floor(distance % 1000)

                hours = (hours < 10) ? "0" + hours : hours
                minutes = (minutes < 10) ? "0" + minutes : minutes
                seconds = (seconds < 10) ? "0" + seconds : seconds
                miliseconds = (miliseconds < 100 && miliseconds > 10) ? "0" + miliseconds : miliseconds
                miliseconds = (miliseconds < 10) ? "00" + miliseconds : miliseconds

                hours = hours.toString()
                minutes = minutes.toString()
                seconds = seconds.toString()
                miliseconds = miliseconds.toString()


                gameTime = hours + ":" + minutes + ":" + seconds + "." + miliseconds
             
                document.getElementById("timer").innerHTML = `
            <img class="number" src="gfx/c${hours[0]}.gif">
            <img class="number" src="gfx/c${hours[1]}.gif">
            <img class="number" src="gfx/colon.gif">
            <img class="number" src="gfx/c${minutes[0]}.gif">
            <img class="number" src="gfx/c${minutes[1]}.gif">
            <img class="number" src="gfx/colon.gif">
            <img class="number" src="gfx/c${seconds[0]}.gif">
            <img class="number" src="gfx/c${seconds[1]}.gif">
            <img class="number" src="gfx/dot.gif">
            <img class="number" src="gfx/c${miliseconds[0]}.gif">
            <img class="number" src="gfx/c${miliseconds[1]}.gif">
            <img class="number" src="gfx/c${miliseconds[2]}.gif">
            `
            }, 1)
        }
    }


    const cookies = {
        sortList: (ar) => {
            for (x = 0; x < ar.length; x++) {
                ar[x] = decodeURIComponent(ar[x])
                let nick = ar[x].split("-")[1]
                let time = ar[x].split("-")[0]
                let ms = parseInt(time.split(".")[1])
                time = time.split(".")[0]
                let h = time.split(":")[0] * 60 * 60 * 1000
                let m = time.split(":")[1] * 60 * 1000
                let s = time.split(":")[2] * 1000

                ar[x] = (h + m + s + ms) + "-" + nick
            }

            ar.sort(function (a, b) {
                return parseFloat(a.split("-")[0]) - parseFloat(b.split("-")[0]);
            });

            for (x = 0; x < ar.length; x++) {
                let nick = ar[x].split("-")[1]
                let time = ar[x].split("-")[0]

                let hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
                let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))
                let seconds = Math.floor((time % (1000 * 60)) / 1000)
                let miliseconds = Math.floor(time % 1000)

                hours = (hours < 10) ? "0" + hours : hours
                minutes = (minutes < 10) ? "0" + minutes : minutes
                seconds = (seconds < 10) ? "0" + seconds : seconds
                miliseconds = (miliseconds < 100 && miliseconds > 10) ? "0" + miliseconds : miliseconds
                miliseconds = (miliseconds < 10) ? "00" + miliseconds : miliseconds

                ar[x] = encodeURIComponent(hours + ":" + minutes + ":" + seconds + "." + miliseconds + "-" + nick)
            }
        },

        makeRecordsBoard: (ar, e) => {
            recordsDiv.innerHTML = `Top 10 dla trybu ${e}x${e}: <br>`
            for (x = 0; x < 10; x++) {
                if (ar[x]) {
                    if (x == 9) {
                        recordsDiv.innerHTML += (x + 1) + ". " + decodeURIComponent(ar[x]) + "<br>"
                    }
                    else {
                        recordsDiv.innerHTML += (x + 1) + ".   " + decodeURIComponent(ar[x]) + "<br>"
                    }
                }
                else {
                    recordsDiv.innerHTML += (x + 1) + ".<br>"
                }
            }
        }
    }
}
