var PRESETS;

fetch('/presets.json').then(x => x.json()).then(data => {
  let parent = document.getElementById('_preset');
  PRESETS = data
  PRESETS.forEach(e => {
    let option = document.createElement('option');
    option.innerHTML = e.name
    option.setAttribute('value', e.name);
    parent.appendChild(option)
  });
})
var SELECT = document.getElementById('_preset')
SELECT.addEventListener('change', function() {
  let _merchant = document.getElementById('_merchant');
  let _payment_details = document.getElementById('_payment_details');
  let r = PRESETS.find(item => item.name === SELECT.value)

  _merchant.value = r.merchant;
  _payment_details.value = r.payment_details ? r.payment_details: _merchant.value
})

function z(n) {
  return ('0' + n).slice(-2)
}

// Time
function updateTime() {
  var d = new Date();
  let m = d.getMonth();
  if (m <= 11) {
    m++
  }
  document.getElementsByClassName('time')[0].innerHTML = `${z(d.getDate())}/${z(m)}/20${z(d.getFullYear())} ${z(d.getHours())}:${z(d.getMinutes())}:${z(d.getSeconds())}`;  
}

function requestAmount() {
  amount = prompt('amount')
  if (amount == '') {return}
  document.getElementById('amount').innerHTML = `RM <span>${Number(amount).toFixed(2)}</span>`
  updateTime();
}

function back() {
  document.getElementsByClassName('panel')[0].style.display = 'block';
  document.getElementsByClassName('receipt')[0].style.display = 'none';
}

function generateTransactionRef() {
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, ''); // Format YYYYMMDD
  const serviceIdentifier = "TNGD";
  function getRandomString(length) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
  const uniquePart1 = getRandomString(8);
  const uniquePart2 = getRandomString(8);
  return `${dateStr}${serviceIdentifier}${uniquePart1}<br>${uniquePart2}`;
}

function generateEwalletRef() {
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
  const transactionId = Array.from({ length: 14 }, () => Math.floor(Math.random() * 10)).join('');
  const serviceIdentifier = "TNG";
  function getRandomString(length) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
  const secondaryRef = getRandomString(18);
  return `${dateStr}${transactionId}${serviceIdentifier}<br>${secondaryRef}`;
}


function submit() {
  let _amount = document.getElementById('_amount');
  let _merchant = document.getElementById('_merchant');
  let _payment_details = document.getElementById('_payment_details');
  let _preset = document.getElementById('_preset');

  var d = new Date();
  let m = d.getMonth();
  if (m <= 11) {
    m++
  }

  document.getElementById('amount').innerHTML = `RM <span>${Number(_amount.value).toFixed(2)}</span>`;
  document.getElementsByClassName('merchant')[0].innerHTML = `${_merchant.value}`;
  document.getElementsByClassName('payment_details')[0].innerHTML = `${_payment_details.value}`;
  document.getElementsByClassName('dn_ref_no')[0].innerHTML = generateTransactionRef();
  document.getElementsByClassName('ewallet_ref_no')[0].innerHTML = generateEwalletRef();

  document.getElementsByClassName('panel')[0].style.display = 'none';
  document.getElementsByClassName('receipt')[0].style.display = 'block';
  updateTime();
}

window.navigator.standalone = true