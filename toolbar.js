const selectSizeTable = document.getElementById('select-table-size');
const selectSizeTableSpanList = selectSizeTable.getElementsByTagName('span');

document.getElementById('select-font').onchange = (event) => {
    var font = event.target.value;
    //TODO change font document here
}

document.getElementById('line-spacing').onclick = (event) => {
    document.getElementById('dropdown-content').classList.toggle('show');
}

document.getElementById('insert-table').onclick = (event) => {
    selectSizeTable.innerHTML = '';
    document.querySelector('.table-dropdown input[name=row]').value = 5;
    document.querySelector('.table-dropdown input[name=col]').value = 5;
    
    for (let i = 0; i < 25; i++) {
        let s = document.createElement('span');
        addEventToSpan(s);
        selectSizeTable.appendChild(s);
    }
    selectSizeTable.style.gridTemplateColumns = 'auto auto auto auto auto';

    document.getElementById('table-dropdown-content').classList.toggle('show');
}

// Close the dropdown if the user clicks outside of it
window.onclick = (event) => {
    if (!event.target.matches('.line-spacing') && !event.target.matches('.icon-line-spacing')) {
        document.getElementById("dropdown-content").classList.remove('show');
    }
    if (!event.target.matches('.insert-table') && !event.target.matches('.icon-table-grid')) {
        document.getElementById("table-dropdown-content").classList.remove('show');
    }
}

let addEventToSpan = (span) => {
    span.onclick = (event) => {
        // let indexSpan = 0;
        // for(let span of selectSizeTableSpanList) {
        //     indexSpan++;
        //     if(event.target === span) {
        //         let col = document.querySelector('.table-dropdown input[name=col]').value;
        //         let indexRow = Math.ceil(indexSpan / col);
        //         let indexCol = indexSpan - (col * (indexRow - 1));
        //         //TODO draw table with indexRow and indexCol
        //         return;
        //     }
        // }
    }

    span.onmouseover = (event) => {
        for (let span of selectSizeTableSpanList) {
            span.classList.remove('hover');
        }
        let indexSpan = 0;
        for (let span of selectSizeTableSpanList) {
            indexSpan++;
            if (event.target === span) {
                let row = Number(document.querySelector('.table-dropdown input[name=row]').value);
                let col = Number(document.querySelector('.table-dropdown input[name=col]').value);
                let indexRow = Math.ceil(indexSpan / col);
                let indexCol = indexSpan - (col * (indexRow - 1));
                if (row === indexRow && indexRow < 15) {
                    for (let i = 0; i < col; i++) {
                        let s = document.createElement('span');
                        addEventToSpan(s);
                        selectSizeTable.appendChild(s);
                    }
                    document.querySelector('.table-dropdown input[name=row]').value = row + 1;
                    document.getElementById('display-size').innerHTML = indexCol + ' x ' + indexRow;

                    for (let i = 1; i <= indexRow; i++) {
                        for (let j = 1; j <= indexCol; j++) {
                            let index = col * (i - 1) + j;
                            selectSizeTableSpanList[index - 1].classList.add('hover');
                        }
                    }
                    return;
                }
                if (col === indexCol && indexCol < 15) {
                    let cssAtr = 'auto ';
                    for (let i = 0; i < row; i++) {
                        let s = document.createElement('span');
                        addEventToSpan(s);
                        selectSizeTable.appendChild(s);
                    }
                    for (let i = 0; i < col; i++) {
                        cssAtr += 'auto ';
                    }
                    selectSizeTable.style.gridTemplateColumns = cssAtr;
                    document.querySelector('.table-dropdown input[name=col]').value = col + 1;
                    document.getElementById('display-size').innerHTML = indexCol + ' x ' + indexRow;

                    for (let i = 1; i <= indexRow; i++) {
                        for (let j = 1; j <= indexCol; j++) {
                            let index = col * (i - 1) + j;
                            selectSizeTableSpanList[index - 1].classList.add('hover');
                        }
                    }
                    return;
                }
                document.getElementById('display-size').innerHTML = indexCol + ' x ' + indexRow;

                for (let i = 1; i <= indexRow; i++) {
                    for (let j = 1; j <= indexCol; j++) {
                        let index = col * (i - 1) + j;
                        selectSizeTableSpanList[index - 1].classList.add('hover');
                    }
                }
                return;
            }
        }
    }

    span.onmouseout = (event) => {
        let isHoverSelectSize = false;
        if (selectSizeTable.parentElement.querySelector(':hover') === selectSizeTable) {
            isHoverSelectSize = true;
        }
        if (!isHoverSelectSize) {
            for (let span of selectSizeTableSpanList) {
                span.classList.remove('hover');
            }
            document.getElementById('display-size').innerHTML = 'Insert Table';
        }
    }
}

//main function
document.getElementById('editor').contentEditable = true;
document.getElementById('editor').spellcheck = false;
document.execCommand('fontSize', false, 4); //set default font size

document.getElementById('backward').onclick = (event) => {
    document.execCommand('undo', false, null);
}

document.getElementById('forward').onclick = (event) => {
    document.execCommand('redo', false, null);
}

document.getElementById('select-font').onchange = (event) => {
    let value = event.target.value;
    document.execCommand('fontName', false, value);
}

document.getElementById('select-font-size').onchange = (event) => {
    let value = event.target.value;
    document.execCommand('fontSize', false, value);
}

document.getElementById('bold').onclick = (event) => {
    document.execCommand('bold', false, null);
    document.getElementById('bold').classList.toggle('button-active');
}

document.getElementById('italic').onclick = (event) => {
    document.execCommand('italic', false, null);
    document.getElementById('italic').classList.toggle('button-active');
}

document.getElementById('underline').onclick = (event) => {
    document.execCommand('underline', false, null);
    document.getElementById('underline').classList.toggle('button-active');
}

document.getElementById('align-left').onclick = (event) => {
    document.execCommand('justifyLeft', false, null);
    document.getElementById('align-left').classList.add('button-active');
    document.getElementById('align-center').classList.remove('button-active');
    document.getElementById('align-right').classList.remove('button-active');
}

document.getElementById('align-center').onclick = (event) => {
    document.execCommand('justifyCenter', false, null);
    document.getElementById('align-left').classList.remove('button-active');
    document.getElementById('align-center').classList.add('button-active');
    document.getElementById('align-right').classList.remove('button-active');
}

document.getElementById('align-right').onclick = (event) => {
    document.execCommand('justifyRight', false, null);
    document.getElementById('align-left').classList.remove('button-active');
    document.getElementById('align-center').classList.remove('button-active');
    document.getElementById('align-right').classList.add('button-active');
}