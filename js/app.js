document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------- */
  /* ----- TOGGLE HEADER MENU ----- */
  /* ---------------------------------------------------- */

  const btn = document.querySelector('#btnToggle');
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    document.body.classList.toggle('menu--show');
    this.classList.toggle('btn-toggle--toggled');
  });


  /* ---------------------------------------------------- */
  /* ----- HEADER BANNER TRANSITION  ----- */
  /* ---------------------------------------------------- */

  const btns = document.querySelectorAll('.js--btn');
  const header = document.querySelector('#header');

  function mark(e) {
    e.preventDefault();
    const link = this.querySelector('a');
    const href = link.getAttribute('href');
    header.classList.remove('selected-purple', 'selected-yellow');
    header.classList.toggle('selected-' + href.replace(/^#/, ''));
  }

  btns.forEach(el => {
    el.addEventListener('click', mark);
  });


  /* ---------------------------------------------------- */
  /* ----- NAVBAR SCROLLING ----- */
  /* ---------------------------------------------------- */


  window.addEventListener('scroll', () => {
    document.querySelector('.navigation-container').classList.toggle('navigation-container--background', document.body.scrollTop > 0);
  });


  /* ---------------------------------------------------- */
  /* -----TESTIMONIAL SLIDER ----- */
  /* ---------------------------------------------------- */

  const reviews = document.getElementsByClassName('review');
  const buttons = document.getElementsByClassName('slide--btn');
  const buttonDiv = document.querySelector('#slider-buttons');

  for (let review of reviews) {
    buttonDiv.innerHTML += '<div class=\"slide--btn\"></div>';
  };

  buttons[0].classList.add('selected');

  function removeBtnSelection() {
    for (let j = 0; j < buttons.length; j++) {
      if (buttons[j].classList.contains('selected')) {
        buttons[j].classList.remove('selected');
        return j;
      }
    };
  };

  function rightToCenterSmooth(index) {
    reviews[index].classList.add('smooth');
    reviews[index].classList.add('center');
  };

  function leftToCenterSmooth(index) {
    reviews[index].classList.remove('left');
    reviews[index].classList.add('smooth');
    reviews[index].classList.add('center');
  };

  function centerToLeftSmooth(index) {
    reviews[index].classList.remove('center');
    reviews[index].classList.add('smooth');
    reviews[index].classList.add('left');
  };

  function centerToRightSmooth(index) {
    reviews[index].classList.remove('center');
    reviews[index].classList.add('smooth');
  };

  function LeftToRightSwap(index) {
    reviews[index].classList.remove('left');
    reviews[index].classList.remove('smooth');

    setTimeout(function () {
      reviews[index].classList.add('smooth');
      reviews[index].classList.add('center');
    }, 0);
  }

  function RightToLeftSwap(index) {
    reviews[index].classList.add('left');
    reviews[index].classList.remove('smooth');

    setTimeout(function () {
      reviews[index].classList.remove('left');
      reviews[index].classList.add('smooth');
      reviews[index].classList.add('center');
    }, 0);
  }

  let timeoutID;

  let createHandler = function (current) {
    return function () {

      clearInterval(interval);

      let previous = removeBtnSelection();
      buttons[current].classList.add('selected');

      if (previous < current && reviews[current].classList.contains('left')) {
        centerToLeftSmooth(previous);
        LeftToRightSwap(current);
      } else if (previous < current) {
        centerToLeftSmooth(previous);
        rightToCenterSmooth(current);
      }
      if (previous > current && (reviews[current].className === 'review' || reviews[current].className === 'review smooth')) {
        centerToRightSmooth(previous);
        RightToLeftSwap(current);
      } else if (previous > current) {
        centerToRightSmooth(previous);
        leftToCenterSmooth(current);
      }

      clearTimeout(timeoutID);

      timeoutID = setTimeout(function () {
        for (let i = 0; i < reviews.length; i++) {
          if (i !== current) {
            reviews[i].classList.remove('left');
            reviews[i].classList.remove('smooth');
          }
        }
        automaticSliding(current);
      }, 5000);
    }
  };

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', createHandler(i));
  };

  let interval;
  function automaticSliding(index) {
    interval = setInterval(function () {

      if (index === reviews.length) {
        for (let review of reviews) {
          review.classList.remove('left');
        }
        index = 0;
      }

      reviews[index].classList.add('left');
      reviews[index].classList.remove('center');
      buttons[index].classList.remove('selected');

      if (index + 1 < reviews.length) {
        reviews[index + 1].classList.add('smooth');
        reviews[index + 1].classList.add('center');
        buttons[index + 1].classList.add('selected');
      } else {
        reviews[0].classList.add('smooth');
        reviews[0].classList.add('center');
        buttons[0].classList.add('selected');
      }

      if (index - 1 >= 0) {
        reviews[index - 1].classList.remove('left');
        reviews[index - 1].classList.remove('smooth');
      } else {
        reviews[reviews.length - 1].classList.remove('left');
        reviews[reviews.length - 1].classList.remove('smooth');
      }

      index++;

    }, 3000);
  };

  automaticSliding(0);

  /* ---------------------------------------------------- */
  /* ----- CAROUSEL SLIDER ----- */
  /* ---------------------------------------------------- */

  const mySiema = new Siema({
    perPage: {
      320: 2,
      768: 3,
      1200: 4,
      1920: 4,
    },
    duration: 700,
    loop: true,
  });

  // listen for keydown event
  setInterval(() => mySiema.next(), 1000)


});