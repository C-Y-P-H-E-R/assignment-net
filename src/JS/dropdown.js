const changeColor = (getColor) => {
    let bg = document.querySelector('.bg');
    let selectColor = getColor.value;
    let text = getColor.options[getColor.selectedIndex].text;
    bg.style.background = selectColor;
    bg.innerHTML = text;
}

module.exports = changeColor