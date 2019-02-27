function setDiamonds(arrDiamonds) {
    const numDiamonds = 5;
    const rowNum = 5;
    const colNum = 5;
    while (arrDiamonds.length < numDiamonds) {
        let coordX = Math.floor(Math.random() * colNum);
        let coordY = Math.floor(Math.random() * rowNum);
        let coordDiamond = '' + coordX + coordY;
        if (arrDiamonds.indexOf(coordDiamond) === -1) {
            arrDiamonds.push(coordDiamond);
        }
    }
    return arrDiamonds;
}

function resetShovel() {
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

function main() {
    let allCells = document.querySelectorAll('.game-cell');
    let arrDiamonds = ["11", "22"];

    arrDiamonds = setDiamonds(arrDiamonds);

    for (let oneCell of allCells) {
        oneCell.addEventListener("drop", function () {
            setTimeout(function () {
                resetShovel();

                let coords = {};
                coords.coordinateX = parseInt((oneCell.dataset.coordinateX), 10);
                coords.coordinateY = parseInt((oneCell.dataset.coordinateY), 10);
                for (let i = 0; i < arrDiamonds.length; i++) {
                    let coorX = parseInt(arrDiamonds[i][0], 10);
                    let coorY = parseInt(arrDiamonds[i][1], 10);
                    if (coords.coordinateX === coorX && coords.coordinateY === coorY) {
                        oneCell.classList.remove('grass');
                        oneCell.classList.add('diamond');
                        break;
                    }
                }
                if (!oneCell.classList.contains('diamond')) {
                    oneCell.classList.remove('grass');
                    oneCell.classList.add('false');
                }
            }, 1000)
        })
    }
}

main();