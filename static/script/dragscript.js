let id;

function allowDrop(e) {
    e.preventDefault();
}

function dragStart(e) {
    id = e.target.id;
}

function drop(e) {
    e.target.append(document.getElementById(id));
}

