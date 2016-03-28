// setup
var betAmount = document.querySelector('#betAmount')
// var double = document.querySelector('button[data-action=double]')
var div = document.querySelector('.row')
// var red = div.querySelector('.btn-danger')
var green = div.querySelector('.btn-success')
// var black = div.querySelector('.btn-inverse')
var balance = document.querySelector('#balance')
var getBalance = function () {
  return balance.textContent
}
var storeBets = function () {
  sessionStorage.setItem('bets', bets)
}
var getStoredBets = function () {
  sessionStorage.getItem('bets')
}
/*
// API
betAmount.value = 15 // set betAmount
double.click() // x2 the betAmount
red.click() // bet on red
green.click() // bet on green
black.click() // bet on black
startBet() // auto bet on green with the settings below
stopBet() // stop it now!!! :D
*/

// settings :)
var timeout = 10000
var list = {
  nrBets: [9, 7, 4, 4, 2, 3, 2, 1, 1, 2],
  totalBets: [9, 16, 20, 24, 26, 29, 31, 32, 33, 35],
  betAmount: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50,
              55, 60, 65, 70, 75, 80, 85, 93, 100, 108,
              115, 125, 135, 145, 155, 168, 180, 195, 210, 225,
              243, 263, 283, 303, 328, 353, 380, 408, 440, 473,
              510, 550, 593, 638, 685, 738, 795, 858, 923, 993,
              1070, 1153, 1240, 1335, 1440, 1550, 1670, 1798, 1935, 2085,
              2245, 2418, 2603, 2803, 3020, 3253, 3503, 3770, 4060, 4373,
              4710, 5073, 5463, 5883, 6335],
  complete: function () {
    for (var i = 10; i < 75; i++) {
      this.nrBets[i] = 1
      this.totalBets[i] = this.totalBets[i - 1] + 1
    }
  }
}
list.complete()
var bets = sessionStorage.getItem('bets') || 1
var lastBalance = getBalance()
var target = document.querySelector('#past')
var config = {childList: true}
var observer = new MutationObserver(function () {
  setTimeout(bet(), timeout)
})
var bet = function () {
  var currentBalance = getBalance()
  console.log('currentBalance is ' + currentBalance + 'and lastBalance is ' + lastBalance)

  for (var i = 0; i < 75; i++) {
    if (bets < list.totalBets[i]) {
      betAmount.value = list.betAmount[i]
      console.log('betAmount is ' + list.betAmount[i])
      green.click()
      console.log('green clicked')
      break
    }
  }

  currentBalance > lastBalance ? bets = 1 : bets++
  storeBets()
  lastBalance = currentBalance
}

var startBet = function () {
  observer.observe(target, config)
}

var stopBet = function () {
  observer.disconnect()
}

startBet()
