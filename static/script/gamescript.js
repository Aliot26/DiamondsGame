let dragShovel = {};



document.onmousedown = function (e) {
    let elem = e.target.closest('.draggable');

    if (!elem) return;
    dragShovel.elem = elem;
    dragShovel.downX = e.pageX;
    dragShovel.downY = e.pageY;
};

document.onmousemove = function (e) {
    if (!dragShovel.elem) return;
    if (!dragShovel.avatar) {
        let moveX = e.pageX - dragShovel.downX;
        let moveY = e.pageY - dragShovel.downY;
        if (Math.abs(moveX) < 3 && Math.abs(moveY) < 3) {
            return;
        }

        dragShovel.avatar = createAvatar(e);
        if (!dragShovel.avatar) {
            dragShovel = {};
            return;
        }

        let coords = getCoords(dragShovel.avatar);
        dragShovel.shiftX = dragShovel.downX - coords.left;
        dragShovel.shiftY = dragShovel.downY - coords.top;

        startDrag(e);
    }
    dragShovel.avatar.style.left = e.pageX - dragShovel.shiftX + 'px';
    dragShovel.avatar.style.top = e.pageY - dragShovel.shiftY + 'px';

    return false
};

function createAvatar(e) {
    let avatar = dragShovel.elem;
    let old = {
        parent: avatar.parentNode,
        nextSibling: avatar.nextSibling,
        position: avatar.position || '',
        left: avatar.left || '',
        top: avatar.top || '',
        zIndex: avatar.zIndex || ''
    };

    avatar.rollback = function () {
        old.parent.insertBefore(avatar, old.nextSibling);
        avatar.style.position = old.position;
        avatar.style.left = old.left;
        avatar.style.top = old.top;
        avatar.style.zIndex = old.zIndex
    };

    return avatar;
}

function startDrag(e) {
    let avatar = dragShovel.avatar;
    document.body.appendChild(avatar);
    avatar.style.zIndex = 9999;
    avatar.style.position = 'absolute';
}

function main() {

}

main();