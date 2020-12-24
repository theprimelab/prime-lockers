const Gpio = require('onoff').Gpio;

var locker = function(pins) {
    this.pins = pins;
    this.sel = [
        new Gpio(pins.sel[0], 'out'),
        new Gpio(pins.sel[1], 'out')
    ];
    this.lock = new Gpio(pins.lock, 'out');

    this.unlock = function(lockerNum) {
        let selVal = parseBinary(lockerNum);
        this.sel[0].writeSync(selVal[0] ? 1 : 0);
        this.sel[1].writeSync(selVal[1] ? 1 : 0);
        this.lock.writeSync(1);
        setTimeout(function() {
            this.lock.writeSync(0);
        }, 10);
    }
}

function parseBinary(num) {
    let binStr = (num >>> 0).toString(2);
    let binArr = [];
    for(let k = 0; k < binStr.length; k++) {
        if(binStr.charAt(k) === '1') {
            binArr.push(true);
        } else {
            binArr.push(false);
        }
    }
    return binArr;
}

module.exports = locker;