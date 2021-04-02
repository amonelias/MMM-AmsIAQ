#!/usr/bin/env python3
# 
# Read data from AMS-IAQ-Core C
#
# By amonelias https://github.com/amonelias
# MIT Licensed.

import sys
import pigpio

I2C_BUS = 1         # I2C PIN NUM 0/1
IAQ_ADDR = 0x5a     # AMS-IAQ-Core C Address

def readIAQ():
    try:
        pi = pigpio.pi()
        h = pi.i2c_open(I2C_BUS, IAQ_ADDR)

        (c, b) = pi.i2c_read_device(h, 9)

        values = {}
        values["rawdata"] = b
        values["predict"] = b[0] << 8 | b[1]
        values["status"] = b[2]
        values["resistance"] = b[3] & 0x00 | b[4] << 16 | b[5] << 8 | b[6]
        values["tvoc"] = b[7] << 8 | b[8]
        return values
    except:
        print("IAQ connection failed.")

def error():
    sys.exit("Invalid Arguments! Call python3 ams-iaq.py [i2cadress] ([values])")


if __name__ == "__main__":
    argc = len(sys.argv)

    if (int(sys.argv[1]) != 0 and int(sys.argv[1]) != 1):
        error()
        
    I2C_BUS = int(sys.argv[1])
    values = readIAQ()

    if argc > 2:
        if sys.argv[2] == "all":
            print(values["predict"])
            print(values["status"])
            print(values["resistance"])
            print(values["tvoc"])
        else:
            for i in range(2, argc):
                try:
                    print(values[sys.argv[i]])
                except:
                    error()
    else:
        print("predict = ", values["predict"])
        print("status = ", values["status"])
        print("resistance = ", values["resistance"])
        print("tvoc = ", values["tvoc"])