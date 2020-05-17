/* eslint-disable no-trailing-spaces */
/**
 * Created by debayan on 7/24/16.
 */

Module.register("internet-monitor",{

	defaults : {
		serverId: "",
		type: "",
		updateInterval: 0,
		maxTime: 20000,
		verbose: false,
		displayStrength: true,
		displaySpeed: true,
		strengthIconSize: 80,
		maxGaugeScale: 100,
	},
	payload: [],

	downloadBarState: "not_started",
	updating: false,

	start : function(){
		console.log("Internet-monitor module started!");
		
		// this.sendSocketNotification("Start",this.config);
		// Schedule update timer.
		var self = this;
		if(this.config.updateInterval != 0)
		{
			setInterval(function() {
				self.updating= true;
				self.sendSocketNotification("Start",self.config);
			}, this.config.updateInterval);
		} else {
			setTimeout(function() {
				self.updating= true;
				self.sendSocketNotification("Start",self.config);
			}, 2000);
		}
		
	},

	getScripts: function() {
		return [this.file("justgage-1.2.2/raphael.2.2.8.min.js"),
			this.file("justgage-1.2.2/justgage.min.js"),
			this.file("jquery.js")];
	},

	getStyles: function() {
		return ["internet-monitor.css"]
	},

	socketNotificationReceived: function(notification, payload) {

		if (notification == "downloadSpeedProgress") {
			if (this.config.displaySpeed) {
				if (this.downloadBarState == "not_started") {
					this.downloadBarState = "started";
				}
				console.log("updating DOWNLOAD");
				this.download.refresh(payload, this.config.maxGaugeScale);
			}

		}
		if (notification == "uploadSpeedProgress") {
			if (this.config.displaySpeed) {
				console.log("updating UPLOAD");
				this.upload.refresh(payload, this.config.maxGaugeScale);
			}
		}
		if (notification == "data") {
			if (this.config.verbose) {
				if (!this.updating) {
					var d = document.createElement("div");
					d.style = "text-align: left; display:inline-block;";
					$(d).appendTo("#internetData");
				}
				$("#internetData > div").html(
					"    Server:   " + payload.server.host).append("<br/>" +
                    " Location:   " + payload.server.location + " (" + payload.server.country + ")").append("<br/>" +
                    "  Distance:   " + payload.server.distance + " km").append("</div>");
			}
		}

		if (notification == "ping") {
			console.log("ping [" + payload + "]");
			// if (this.downloadBarState == "not_started") {
			// 	this.updateDom();
			// }

			if (this.config.displayStrength) {

				if(this.config.hasOwnProperty("wifiSymbol")) {
					if (payload < 70) {
						$(d).append("<div class=\"wifi-symbol-4\" > <div class=\"wifi-circle first\"></div> <div class=\"wifi-circle second\"></div> <div class=\"wifi-circle third\"></div> <div class=\"wifi-circle fourth\"></div> </div>");
					}
					else if (payload >= 70 && payload < 100) {
						$(d).append("<div class=\"wifi-symbol-2\" > <div class=\"wifi-circle first\"></div> <div class=\"wifi-circle second\"></div> <div class=\"wifi-circle third\"></div> <div class=\"wifi-circle fourth\"></div> </div>");
					}
					else if (payload >= 100 && payload < 150) {
						$(d).append("<div class=\"wifi-symbol-3\" > <div class=\"wifi-circle first\"></div> <div class=\"wifi-circle second\"></div> <div class=\"wifi-circle third\"></div> <div class=\"wifi-circle fourth\"></div> </div>");
					}
					else if (payload >= 150) {
						$(d).append("<div class=\"wifi-symbol-1\" > <div class=\"wifi-circle first\"></div> <div class=\"wifi-circle second\"></div> <div class=\"wifi-circle third\"></div> <div class=\"wifi-circle fourth\"></div> </div>");
					}

					$(".wifi-symbol-1 .wifi-circle").css({
						"border-color": this.config.wifiSymbol.fullColor,
						"font-size": this.config.wifiSymbol.size / 7,
						"margin-top": 0 - this.config.wifiSymbol.size - this.config.wifiSymbol.size * 0.25,
						"margin-left": 0.5 * (150 - this.config.wifiSymbol.size)
					});
					$(".wifi-symbol-1 [foo], .wifi-symbol-1").css({
						"width": this.config.wifiSymbol.size,
						"height": this.config.wifiSymbol.size
					});

					$(".wifi-symbol-2 .wifi-circle").css({
						"border-color": this.config.wifiSymbol.almostColor,
						"font-size": this.config.wifiSymbol.size / 7,
						"margin-top": 0 - this.config.wifiSymbol.size - this.config.wifiSymbol.size * 0.25,
						"margin-left": 0.5 * (150 - this.config.wifiSymbol.size),
					});
					$(".wifi-symbol-2 [foo], .wifi-symbol-2").css({
						"width": this.config.wifiSymbol.size,
						"height": this.config.wifiSymbol.size
					});

					$(".wifi-symbol-3 .wifi-circle").css({
						"border-color": this.config.wifiSymbol.halfColor,
						"font-size": this.config.wifiSymbol.size / 7,
						"margin-top": 0 - this.config.wifiSymbol.size - this.config.wifiSymbol.size * 0.25,
						"margin-left": 0.5 * (150 - this.config.wifiSymbol.size),
					});
					$(".wifi-symbol-3 [foo], .wifi-symbol-3").css({
						"width": this.config.wifiSymbol.size,
						"height": this.config.wifiSymbol.size
					});

					$(".wifi-symbol-4 .wifi-circle").css({
						"border-color": this.config.wifiSymbol.noneColor,
						"font-size": this.config.wifiSymbol.size / 7,
						"margin-top": 0 - this.config.wifiSymbol.size - this.config.wifiSymbol.size * 0.25,
						"margin-left": 0.5 * (150 - this.config.wifiSymbol.size),
					});
					$(".wifi-symbol-4 [foo], .wifi-symbol-4").css({
						"width": this.config.wifiSymbol.size,
						"height": this.config.wifiSymbol.size
					});
				}
				else{
					if(payload < 70){
						$("#pingStrength").attr("src",this.file("images/strength_full.png"));
					}
					else if(payload >= 70 && payload < 100){
						$("#pingStrength").attr("src",this.file("images/strength_almost.png"));
					}
					else if(payload >= 100 && payload < 150){
						$("#pingStrength").attr("src",this.file("images/strength_half.png"));
					}
					else if(payload >= 150)
					{
						$("#pingStrength").attr("src",this.file("images/strength_none.png"));
					}
				}

			}
		}

	},

	getDom: function(){
		var wrapper = document.createElement("div");
		wrapper.className = "small";
		// console.log(this.config);

		if(this.config.displayStrength)
		{
			console.log("creating pingDiv");
			var pingDiv = document.createElement("div");
			pingDiv.id = "pingDiv";
			pingDiv.className = "strength";
			
			var img = document.createElement("img");
			img.src = this.file("images/strength_none.png");
			img.height = this.config.strengthIconSize;
			img.id = "pingStrength";
			img.className = "pingStrength";
			pingDiv.appendChild(img);

			wrapper.appendChild(pingDiv);
		}
		
		if(this.config.displaySpeed) {
			console.log("creating speed");
			var minimal = ((this.config.type == "minimal") ? true : false);
			
			var downloadSpeedGauge = document.createElement("div");
			downloadSpeedGauge.id = "downloadSpeedGauge";
			downloadSpeedGauge.className = "speedGauge";

			var uploadSpeedGauge = document.createElement("div");
			uploadSpeedGauge.id = "uploadSpeedGauge";
			uploadSpeedGauge.className = "speedGauge";

			this.download = new JustGage({
				// id: "downloadSpeedGauge",
				parentNode: downloadSpeedGauge,
				value: 0,
				min: 0,
				max: this.config.maxGaugeScale,
				title: "Download Speed",
				refreshAnimationType: "linear",
				gaugeWidthScale: 0.8,
				valueFontColor: "#FFFFFF",
				valueFontFamily: "Roboto Condensed",
				titleFontFamily: "Roboto Condensed",
				titleFontColor: "#AAAAAA",
				hideMindMax: minimal,
				gaugeColor: "#000000",
				levelColors: ["#FF0000","#FFFF00","#00FF00"],
				hideInnerShadow: true,
				symbol: "Mbps"
			});

			this.upload = new JustGage({
				// id: "uploadSpeedGauge",
				parentNode: uploadSpeedGauge,
				value: 0,
				min: 0,
				max: this.config.maxGaugeScale,
				title: "Upload Speed",
				refreshAnimationType: "linear",
				gaugeWidthScale: 0.8,
				valueFontColor: "#FFFFFF",
				valueFontFamily: "Roboto Condensed",
				titleFontFamily: "Roboto Condensed",
				titleFontColor: "#AAAAAA",
				hideMindMax: minimal,
				gaugeColor: "#000000",
				levelColors: ["#FF0000","#FFFF00","#00FF00"],
				hideInnerShadow: true,
				symbol: "Mbps"
			});

			if (minimal) {
				var downOpt = {
					gaugeColor: "#000",
					levelColors: "#fff",
					hideInnerShadow: true,
				};
				var upOpt = {
					gaugeColor: "#000",
					levelColors: "#fff",
					hideInnerShadow: true,
				};
				this.download.update(downOpt);
				this.upload.update(upOpt);
			}
			wrapper.appendChild(downloadSpeedGauge);
			wrapper.appendChild(uploadSpeedGauge);
		}
		
		if(this.config.verbose) {
			var data = document.createElement("div");
			data.id = "internetData";
			wrapper.appendChild(data);
		}
		
		return wrapper;
	}

});