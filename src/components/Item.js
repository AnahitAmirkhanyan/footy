import React from 'react'

function Item(props) {

    const dragStart = e => {
        const target = e.target;
        e.dataTransfer.setData('item_id', target.id);

        setTimeout(() => {
            target.style.display = "none";
        }, 0);
    }

    const dragOver = e => {
        e.stopPropagation();
    }

    return (
        <div
            id={props.id}
            draggable={props.draggable}
            onDragStart={dragStart}
            onDragOver={dragOver}
            className={props.className}
        >
            { props.children }
        </div>
    )
}

export default Item;