const elementHits = {};

const func = (event) => {
  console.log('Clicked', event.target);
  const element = event.target;
  if (!element.id) {
    element.setAttribute('id', Math.random().toString());
  }

  elementHits[element.id] = ++elementHits[element.id] || 1;

  if (elementHits[element.id] > 3) fall(element);
  else nudge(element);

  console.log(elementHits);
};

const nudge = (element) => {
  element.style.transition = `transform 50ms cubic-bezier(0.1,-0.93, 1, 2.33)`;
  const randomX = Math.floor(Math.random() * 10) - 5;
  const randomY = Math.floor(Math.random() * 10) - 5;
  const randomRot = Math.floor(Math.random() * 20) - 10;
  element.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRot}deg)`;
};

const fall = (element) => {
  element.style.transition = `transform 700ms cubic-bezier(0.33333, 0, 0.66667, 0.33333)`;
  const randomRot = Math.floor(Math.random() * 360);
  element.style.transform = `translateY(100vh) rotate(${randomRot}deg)`;
  setTimeout(() => (element.style.opacity = 0), 500);
};

document.addEventListener('click', func);
//document.removeEventListener('click', func);
