'use strict';

import './popup.css';

document.addEventListener('DOMContentLoaded', function() {
  const calculateButton = document.getElementById('calculateButton');
  const progressBar = document.getElementById('progress');
  const loadingBar = document.getElementById('loadingBar');
  const coefficientValueElement = document.getElementById('coefficientValue');

  // console.log('calculateButton', calculateButton)

  calculateButton.addEventListener('click', function() {
    console.log('calculateButton click')
    simulateLoading();
    setTimeout(calculateCoefficient, 3000);
  });


  let width = 0;

  function simulateLoading() {
    calculateButton.disabled = true;
    coefficientValueElement.style.display = 'none';
    progressBar.style.display = 'block';
    loadingBar.style.display = 'block';
    progressBar.style.width = '0%';

    const interval = setInterval(function() {
      if (width >= 100) {
        console.log('width 100')
        clearInterval(interval);
        calculateButton.disabled = false;
        width = 0
      } else {

        width++;
        console.log('width', width)
        progressBar.style.width = width + '%';
      }
    }, 30);
  }

  function calculateCoefficient() {
    const randomValue = Math.random();
    let coefficient;
  
    if (randomValue <= 0.5) {
      coefficient = (1.00 + (0.3 * Math.random())).toFixed(2);
    } else if (randomValue <= 0.75) {
      coefficient = (1.3 + (0.2 * Math.random())).toFixed(2);
    } else if (randomValue <= 0.95) {
      coefficient = (1.5 + (0.5 * Math.random())).toFixed(2);
    } else if (randomValue <= 0.99) {
      coefficient = (2 + (1 * Math.random())).toFixed(2);
    } else if (randomValue <= 0.999) {
      coefficient = (3 + (2 * Math.random())).toFixed(2);
    } else {
      coefficient = (5 + (5 * Math.random())).toFixed(2);
    }
  
 
    coefficientValueElement.textContent = `Coefficient: ${coefficient}`;
    coefficientValueElement.style.display = 'block';  
    loadingBar.style.display = 'none';
    progressBar.style.display = 'none';
    
  }
});

  // Communicate with background file by sending a message
  chrome.runtime.sendMessage(
    {
      type: 'GREETINGS',
      payload: {
        message: 'Hello, my name is Pop. I am from Popup.',
      },
    },
    (response) => {
      console.log(response.message);
    }
  );

