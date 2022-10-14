let destroymode = true;
const toggle = document.querySelector('#toggle');
toggle.addEventListener('click', () => {
    destroymode = !destroymode;
    if (destroymode) console.log('destroymode ON');
    else console.log('destroymode OFF');
})




