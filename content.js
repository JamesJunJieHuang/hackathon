var cleanUp;

(() => {
  const elementHits = {};

  const createAudioElements = () => {
    const elements = [];
    for (let i = 1; i <= 8; i++) {
      const src = chrome.runtime.getURL(`sounds/glass_0${i}.mp3`);
      const element = document.createElement('audio');
      element.src = src;
      element.volume = 0.5;
      document.body.appendChild(element);
      elements.push(element);
    }
    return elements;
  };

  const audioElements = createAudioElements();

  const playRandomSound = () => {
    const randomIndex = Math.floor(Math.random() * audioElements.length);
    audioElements[randomIndex].play();
  };

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
    element.style.boxShadow = `rgba(149, 157, 165, 0.2) 0px 8px 24px`;
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
    playRandomSound();
    const rect = element.getBoundingClientRect();

    const xPos = event.clientX - rect.left;
    const yPos = event.clientY - rect.top;

    const imgElement = document.createElement('img');

    const randomImage = Math.floor(Math.random() * 4) + 1;
    imgElement.src = chrome.runtime.getURL(
      `./images/broken_glass_0${randomImage}.png`
    );

    const randomRot = Math.floor(Math.random() * 360);
    const randomScale = 1 + Math.random() * 2;

    imgElement.setAttribute(
      'style',
      `
      unset: all;
      width: 100px;
      height: 100px;
      position: absolute;
      top: ${yPos}px;
      left: ${xPos}px;
      z-index: 1000;
      background-color: transparent;
      border: 0px solid transparent !important;
      transform: translate(-50%, -50%) rotate(${randomRot}deg) scale(${randomScale});
      pointer-events: none;
    `
    );

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
    audioElements.forEach((el) => el.remove());
  };
})();
