/* Magic Mirror
 * Node Helper: MMM-AmsIAQ
 *
 * By amonelias https://github.com/amonelias
 * MIT Licensed.
 */

'use strict'
const NodeHelper = require("node_helper")
const { execFile } = require("child_process")

module.exports = NodeHelper.create({

  socketNotificationReceived: function(notification, payload) {
    const child = execFile('python3', ['modules/MMM-AmsIAQ/ams-iaq.py', payload, 'all'], (error, stdout, stderr) => {
      if (error) {
        this.sendSocketNotification("ERROR", stderr)
      }
      else{
        this.data = stdout.split("\n")
        this.values = {
          "predict": this.data[0],
          "status": this.data[1],
          "resistance": this.data[2],
          "tvoc": this.data[3]
        }
        this.sendSocketNotification("DONE", this.values)   
      }         
    })
  },

})