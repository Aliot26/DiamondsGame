function main() {
    let allCells = document.querySelectorAll('.game-cell');
    let arrDiamonds = [];
    let numDiamonds = 5;
    let rowNum = 5;
    let colNum = 5;


    while (arrDiamonds.length < numDiamonds) {
        let coordX = Math.floor(Math.random() * colNum);
        let coordY = Math.floor(Math.random() * rowNum);
        let coordDiamond = '' + coordX + coordY;
        if (arrDiamonds.indexOf(coordDiamond) === -1) {
            arrDiamonds.push(coordDiamond);
        }
    }

    arrDiamonds.forEach(function (item, i, arr) {
        let coorX = item[0];
        let coorY = item[1];
        let cellToFill = document.querySelector(`.game-cell[data-coordinate-x="${coorX}"][data-coordinate-y="${coorY}"]`);
        // cellToFill.classList.add('diamond');
    });




    for (let oneCell of allCells) {
        oneCell.addEventListener("drop", function () {
            setTimeout(function () {
                let shovel = document.getElementById('shovel');
                shovel.remove();
                let placeShovel = document.getElementById('place-shovel');
                let img = document.createElement('img');
                img.setAttribute('id', 'shovel');
                img.setAttribute('draggable', 'true');
                img.setAttribute('ondragstart', 'dragStart(event)');
                img.setAttribute('src', 'static/image/shovel.png');
                placeShovel.appendChild(img);

                oneCell.classList.remove('grass');
                oneCell.classList.add('false');
            }, 1000)
        })
    }
}

main();