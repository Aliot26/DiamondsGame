let id;

function allowDrop(e) {
    e.preventDefault();
}

function dragStart(e) {
    id = e.target.id;
}

function drop(e) {
    if (e.target.classList.contains('grass')) {
        e.target.append(document.getElementById(id));
    }
}

function setDiamonds(arrDiamonds, numHiddenDiamonds) {
    const rowNum = 5;
    const colNum = 5;

    while (arrDiamonds.length < numHiddenDiamonds) {
        let coordX = Math.floor(Math.random() * colNum);
        let coordY = Math.floor(Math.random() * rowNum);
        let coordDiamond = '' + coordX + coordY;

        if (arrDiamonds.indexOf(coordDiamond) === -1) {
            arrDiamonds.push(coordDiamond);
        }
    }
    return arrDiamonds;
}

function checkWinConditions(arrDiamonds) {
    return arrDiamonds.length === 0;
}

function resetShovelPosition() {
    let shovel = document.getElementById('shovel');
    let placeShovel = document.getElementById('place-shovel');
    let img = document.createElement('img');

    shovel.remove();
    img.setAttribute('id', 'shovel');
    img.setAttribute('draggable', 'true');
    img.setAttribute('ondragstart', 'dragStart(event)');
    img.setAttribute('src', 'static/image/shovel.png');
    placeShovel.appendChild(img);
}

function getCoordinatesDropCell(oneCell) {
    return {
        coordinateX: parseInt((oneCell.dataset.coordinateX), 10),
        coordinateY: parseInt((oneCell.dataset.coordinateY), 10)
    }
}

function checkDiamondExistence(arrDiamonds, oneCell) {
    for (let i = 0; i < arrDiamonds.length; i++) {
        let coorDiamondX = parseInt(arrDiamonds[i][0], 10);
        let coorDiamondY = parseInt(arrDiamonds[i][1], 10);

        if (getCoordinatesDropCell(oneCell).coordinateX === coorDiamondX
            && getCoordinatesDropCell(oneCell).coordinateY === coorDiamondY) {

            arrDiamonds.splice(i, 1);
            return true;
        }
    }
    return false;
}

function changeClass(oneCell, oldClass, newClass) {
    oneCell.classList.remove(oldClass);
    oneCell.classList.add(newClass);
}

function main() {
    const grass = 'grass';
    const diamond = 'diamond';
    const empty_box = 'false';

    let allCells = document.querySelectorAll('.game-cell');
    let arrDiamonds = ["11", "22", "33", "00", "13"];// for test
    let numHiddenDiamonds = 5;
    let countScore = 0;

    let tabCount = document.getElementById('points');
    let tabDiamond = document.getElementById('diamonds');

    arrDiamonds = setDiamonds(arrDiamonds, numHiddenDiamonds);
    for (let oneCell of allCells) {
        oneCell.addEventListener("drop", function _listener() {
            setTimeout(function () {
                resetShovelPosition();
                if (checkDiamondExistence(arrDiamonds, oneCell)) {
                    changeClass(oneCell, grass, diamond);
                    countScore += 1000;
                    tabCount.textContent = "" + countScore;
                    numHiddenDiamonds -= 1;
                    tabDiamond.textContent = "" + numHiddenDiamonds;
                } else if (!oneCell.classList.contains('diamond') && arrDiamonds.length !== 0) {
                    changeClass(oneCell, grass, empty_box);
                    countScore -= 100;
                    tabCount.textContent = "" + countScore;
                }
                oneCell.removeEventListener("drop", _listener);
                if (checkWinConditions(arrDiamonds)) {
                    let tabMessage = document.getElementById('message');
                    tabMessage.textContent = "You won";
                }
            }, 500)
        }, true)

    }
}

// Bubbling event on child(start handler) -> parent
// Capturing

// 3 phases of event propagation:
//
// Capturing phase – the event goes down to the element.
// Target phase – the event reached the target element.
// Bubbling phase – the event bubbles up from the element.

// There are two possible values for that optional last argument:
//
// If it’s false (default), then the handler is set on the bubbling phase.
// If it’s true, then the handler is set on the capturing phase.

main();