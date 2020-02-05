/* Copyright (c) 2020 behemehal. See the file LICENSE for copying permission. */
/* Created by Ahmetcan Aksu */
/* Only read BETA */

exports.connect = (i2c,options) => {
    var opt = options|| {
        adress: 0x48
    };

    var voltagePotential = (old, newv, range) => {
      if (old[0]) {
        return newv;
      } else {
        return {
            0: Math.floor(newv[0] - old[0]) <= range && Math.floor(newv[0] - old[0]) >= range ? old[0] : newv[0],
            1: Math.floor(newv[1] - old[1]) <= range && Math.floor(newv[1] - old[1]) >= range ? old[1] : newv[1],
            2: Math.floor(newv[2] - old[2]) <= range && Math.floor(newv[2] - old[2]) >= range ? old[2] : newv[2],
            3: Math.floor(newv[3] - old[3]) <= range && Math.floor(newv[3] - old[3]) >= range ? old[3] : newv[3],
        };
       }
    };

    function readAnalogPCF8591(ad, reg) {
        I2C1.writeTo(ad, reg);
        var buffer = I2C1.readFrom(ad, 4);
        var vals = {
            0: parseInt(buffer[3].toString(16),16),
            1: parseInt(buffer[2].toString(16),16),
            2: parseInt(buffer[1].toString(16),16),
            3: parseInt(buffer[0].toString(16),16)
        };
        var potential_ = voltagePotential(last, vals);
        var last = potential_;
        return potential;
    }
    return {
        readMode: () => readAnalogPCF8591(opt.adress, 0x04)
    };
}
