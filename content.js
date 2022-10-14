var cleanUp;

(() => {
  const elementHits = {};

  const customCursorStyleElement = document.createElement('style');
  customCursorStyleElement.innerHTML = `
* {
    cursor: url('${chrome.runtime.getURL(`images/hammer_cursor.png`)}'), auto;
}
`;
  document.head.appendChild(customCursorStyleElement);

  const demolishOnClick = (event) => {
    event.preventDefault();
    const element = event.target;
    if (!element.id) {
      element.setAttribute('id', Math.random().toString());
    }

    elementHits[element.id] = ++elementHits[element.id] || 1;

    createBrokenGlassEffect(event, element);
    if (elementHits[element.id] > 3) {
      fall(element);
    } else {
      nudge(element);
    }
  };

  const nudge = (element) => {
    element.style.transition = `transform 50ms cubic-bezier(0.1,-0.93, 1, 2.33)`;
    const randomX = Math.floor(Math.random() * 4) - 2;
    const randomY = Math.floor(Math.random() * 4) - 2;
    const randomRot = Math.floor(Math.random() * 4) - 2;
    element.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRot}deg)`;
  };

  const fall = (element) => {
    element.style.transition = `transform 900ms cubic-bezier( 0.78, -0.02, 0.76, 0.3 )`;
    const randomRot = Math.floor(Math.random() * 360);
    element.style.transform = `translateY(100vh) rotate3d(${Math.random()}, ${Math.random()}, ${Math.random()}, ${randomRot}deg)`;
    element.style.pointerEvents = 'none';
    setTimeout(() => (element.style.opacity = 0), 1200);
  };

  const createBrokenGlassEffect = (event, element) => {
    const rect = element.getBoundingClientRect();

    const xPos = event.clientX - rect.left;
    const yPos = event.clientY - rect.top;

    console.log(xPos, yPos);

    const imgElement = document.createElement('img');

    const randomImage = Math.floor(Math.random() * 4) + 1;
    imgElement.src = chrome.runtime.getURL(
      `./images/broken_glass_0${randomImage}.png`
    );

    console.log(imgElement.src);
    imgElement.style.width = '100px';
    imgElement.style.height = '100px';
    imgElement.style.position = 'absolute';

    imgElement.style.top = `${yPos}px`;
    imgElement.style.left = `${xPos}px`;
    imgElement.style.zIndex = '1000';

    const randomRot = Math.floor(Math.random() * 360);
    const randomScale = 1 + Math.random() * 2;

    imgElement.style.transform = `translate(-50%, -50%) rotate(${randomRot}deg) scale(${randomScale})`;

    imgElement.style.pointerEvents = 'none';

    element.appendChild(imgElement);
    element.style.overflow = 'hidden';

    for (let i = 0; i < 20; i++) {
      createParticle(event.clientX, event.clientY);
    }
  };

  const createParticle = (xPos, yPos) => {
    const particle = document.createElement('particle');
    particle.style.left = 0;
    particle.style.top = 0;
    particle.style.position = 'fixed';
    particle.style.pointerEvents = 'none';
    document.body.appendChild(particle);
    const size = Math.floor(Math.random() * 7) + 1;
    particle.style.width = `${size}px`;
    particle.style.height = `1px`;

    particle.style.backgroundColor = 'black';

    const destX = xPos + (Math.random() - 0.5) * 250;
    const destY = yPos + (Math.random() - 0.5) * 250;

    const randomRot = Math.floor(Math.random() * 360);

    const animation = particle.animate(
      [
        {
          transform: `translate(${xPos - size / 2}px, ${
            yPos - size / 2
          }px) rotate(0deg)`,
          opacity: 1,
        },
        {
          transform: `translate(${destX}px, ${destY}px) rotate(${randomRot}deg)`,
          opacity: 0,
        },
      ],
      {
        duration: 500 + Math.random() * 1000,
        easing: 'cubic-bezier( 0.17, 0.8, 0.43, 0.92 )',
      }
    );
    animation.onfinish = () => particle.remove();
  };

  document.addEventListener('click', demolishOnClick);

  cleanUp = () => {
    document.removeEventListener('click', demolishOnClick);
    customCursorStyleElement.remove();
  };
})();
