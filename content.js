alert('Here');

const func = (event) => {
  console.log('Clicked', event.target);
  const element = event.target;
  let y = 0;
  setInterval(() => {
    element.style.transform = `translateY(${y++})`;
  }, 1);
};

document.addEventListener('click', func);
//document.removeEventListener('click', func);
