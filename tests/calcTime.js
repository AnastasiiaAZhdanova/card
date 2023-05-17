/* eslint-disable prettier/prettier */
function calcTime(sec, min, zeroing) {
    // eslint-disable-next-line prettier/prettier
    sec++;
    if (zeroing) {
        sec = 0;
        min = 0;
    }
    if (sec >= 60) {
        sec = 0;
        min++;
    }
    if (sec < 10) {
        sec = '0' + sec;
    }
    if (min < 10) {
        min = '0' + min;
    }
    return Number(min + sec);
}

module.exports = { calcTime };
