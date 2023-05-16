function calcTime(sec, min, zeroing) {
   sec++;
  if (zeroing) { sec = 0; min = 0; }  
  if (sec >= 60) { sec = 0; min++; }
  if (sec < 10) { sec = '0' + sec; }
  if (min < 10) { min = '0' + min; }
  return Number(min+sec);
}

module.exports = {calcTime};