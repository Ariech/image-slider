let currentActive = 0;

const defaultImage = () => {
  const image1 = document.querySelector(".image1");
  const dot1 = document.querySelector('.dot[data-id="0"]');

  image1.classList.toggle("active");
  dot1.classList.toggle("dot-active");
};

const dotEventListener = () => {
  const dots = document.querySelectorAll(".dot");
  const imageContainer = document.querySelectorAll(".image-container");

  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      dots.forEach((otherDot) => {
        otherDot.classList.remove("dot-active");
      });

      currentActive = parseInt(e.target.dataset.id, 10);

      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < imageContainer.length; i++) {
        imageContainer[i].classList.remove("active");
      }

      imageContainer[currentActive].classList.add("active");
      dot.classList.toggle("dot-active");
    });
  });
};

const arrowEventListener = () => {
  const imageContainer = document.querySelectorAll(".image-container");
  const dotsContainer = document.querySelectorAll(".dot");
  const arrowsContainer = document.querySelector(".arrows-container");

  arrowsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("left-arrow")) {
      currentActive -= 1;
    } else if (e.target.classList.contains("right-arrow")) {
      currentActive += 1;
    }

    if (currentActive >= imageContainer.length) {
      currentActive = 0;
    }

    if (currentActive < 0) {
      currentActive = imageContainer.length - 1;
    }

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < imageContainer.length; i++) {
      dotsContainer[i].classList.remove("dot-active");
      imageContainer[i].classList.remove("active");
    }

    dotsContainer[currentActive].classList.add("dot-active");
    imageContainer[currentActive].classList.add("active");
  });
};

const nextSlide = () => {
  const imageContainer = document.querySelectorAll(".image-container");
  const dotsContainer = document.querySelectorAll(".dot");
  currentActive += 1;

  if (currentActive >= imageContainer.length) {
    currentActive = 0;
  }

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < imageContainer.length; i++) {
    dotsContainer[i].classList.remove("dot-active");
    imageContainer[i].classList.remove("active");
  }

  dotsContainer[currentActive].classList.add("dot-active");
  imageContainer[currentActive].classList.add("active");
};

export default function handleSlider() {
  let interval = setInterval(nextSlide, 5000);
  window.addEventListener("click", () => {
    clearInterval(interval);
    interval = setInterval(nextSlide, 5000);
  });

  defaultImage();
  arrowEventListener();
  dotEventListener();
}
