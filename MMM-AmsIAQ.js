/* global Module */

/* Magic Mirror
 * Module: MMM-AmsIAQ
 *
 * By amonelias https://github.com/amonelias
 * MIT Licensed.
 */

Module.register("MMM-AmsIAQ", {
    
    defaults: {
        refreshTime: 10000,
        i2cbus: 1,
        fontSize: "medium"
    },

    start: function () {
        this.sendSocketNotification("", this.config.i2cbus)
        let timer = setInterval(()=>{
            this.sendSocketNotification("", this.config.i2cbus)
        }, this.config.refreshTime)

        if(this.config.fontSize === "small"){
            this.fontSizeHeader = "xsmall"
        }
        else if(this.config.fontSize === "medium"){
            this.fontSizeHeader = "small"
        }
        else if(this.config.fontSize === "large"){
            this.fontSizeHeader = "medium"
        }
        else{
            this.config.fontSize = "medium"
            this.fontSizeHeader = "small"
        }
    },

    getDom: function() {
        let element = document.createElement("div")
        element.id = "amsIaq"

        let header = document.createElement("div")
        header.id = "amsIaq-header"
        header.classList.add("normal", this.fontSizeHeader, "regular")

        let content = document.createElement("div")
        content.id = "amsIaq-content"

        let predict = document.createElement("div")
        predict.id = "amsIaq-predict"
        predict.classList.add("bright", this.config.fontSize, "regular",)

        let tvoc = document.createElement("div")
        tvoc.id = "amsIaq-tvoc"
        tvoc.classList.add("bright", this.config.fontSize, "regular",)

        header.innerHTML = "Indoor Air Quality:"
        predict.innerHTML = "Co2: ... ppm"
        tvoc.innerHTML = "Tvoc: ... ppb"

        content.appendChild(predict)
        content.appendChild(tvoc)
        element.appendChild(header)
        element.appendChild(content)
        return element
    },

    socketNotificationReceived: function(notification, payload) {
        let element = document.getElementById("amsIaq")
        document.getElementById("amsIaq-content").remove()
        let content = document.createElement("div")
        content.id = "amsIaq-content"
        switch(notification) {
            case "ERROR":
                let error = document.createElement("div")
                error.id = "amsIaq-error"
                error.style.color = "#ff0033"
                error.classList.add(this.config.fontSize, "regular")
                error.innerHTML = "ERROR"
                console.error("Error AmsIAQ: ", payload)
                content.appendChild(error)
                break 
            case "DONE":
                let predict = document.createElement("div")
                predict.id = "amsIaq-predict"
                predict.classList.add("bright", this.config.fontSize, "regular",)

                let tvoc = document.createElement("div")
                tvoc.id = "amsIaq-tvoc"
                tvoc.classList.add("bright", this.config.fontSize, "regular",)

                predict.innerHTML = "Co2: <b>" + payload["predict"] + "</b> ppm"
                tvoc.innerHTML = "Tvoc: <b>" + payload["tvoc"] + "</b> ppb"

                content.appendChild(predict)
                content.appendChild(tvoc)

                this.sendNotification("AMSIAQ_DATA_CO2", Number(payload["predict"]))
                this.sendNotification("AMSIAQ_DATA_TVOC", Number(payload["tvoc"]))
                break
        }
        element.appendChild(content)
    },

  })