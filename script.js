//  initial stage and Generate pin
const wrongNotify = document.getElementById('wrong-notify');
const successNotify = document.getElementById('success-notify');
hideAllNotification();
const submitBtn = document.getElementById('submitBtn');
let tryLeft = document.getElementById('action-left');
let totalTry = 3;



function hideAllNotification() {
  wrongNotify.style.display = 'none';
  successNotify.style.display = 'none';
};

const generateBtn = document.getElementById('generateBtn');
const generatePin = document.getElementById('showPin');

generateBtn.addEventListener('click', function(){
    generatePin.value = gettingPin(1000, 9999);
    submitBtn.disabled = false;
    submitBtn.style.backgroundColor = 'green';

});

function gettingPin(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

// Apply generated pin to the verification input screen

let displayInput = document.getElementById('input-pin');
const keyPadNumber = document.querySelector('.numbers');

keyPadNumber.addEventListener('click', function(e){
  let targetKey = e.target;
  keyPadInput(targetKey);
});

function keyPadInput(targetKey){
  if(targetKey.classList.contains('button')){

    if(targetKey.dataset.type == 'backspace'){
      let inputString = displayInput.value;
      displayInput.value = inputString.slice(0, inputString.length-1);
    }
    else if(targetKey.dataset.type == 'clear'){
      displayInput.value = '';
    }
    else{
      displayInput.value += targetKey.innerText;
    }
  }

  else if(targetKey.classList.contains('submit-btn') && generatePin.value.length > 0){
    verifyUserInput();
  }
};

function verifyUserInput(){
  if (displayInput.value == generatePin.value) {
    successNotify.style.display = 'block';
    wrongNotify.style.display = 'none';  
    resetStage();
  }
  else if(totalTry > 1) {
    wrongNotify.style.display = 'block';
    successNotify.style.display = 'none';
    displayInput.value = '';
    totalTry--;
    tryLeft.innerText = totalTry;
  }
  else {
      resetStage();
      hideAllNotification();
    }
}

function resetStage(){
  totalTry = 3;
  tryLeft.innerText = totalTry;
  generatePin.value = '';
  displayInput.value = '';
  submitBtn.disabled = true;
  
  
}
