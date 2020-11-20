let locker = function(pins) {
    this.lock = pins.lock;
    this.sel = pins.select;
        

    this.unlock = function(lockerNum) {
        let selVal = parseBinary(lockerNum);
        this.sel[0].writeSync(selVal[0] ? 1 : 0);
        this.sel[1].writeSync(selVal[1] ? 1 : 0);
        this.lock.writeSync(1);
        setTimeout(function() {
            this.lock.writeSync(0);
        }, 500);
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