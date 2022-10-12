/* eslint-disable eqeqeq */
/* eslint-disable prettier/prettier */
/**
 * Created by debayan on 7/23/16.
 */
var NodeHelper = require("node_helper");
var speedtest = require("speedtest-net");
var roundTo = require("round-to");

module.exports = NodeHelper.create({
	start: function(){
		console.log(this.name + " helper started ...");
		this.config = null;
		this.interval = null;
	},

	socketNotificationReceived : function(notification, payload){
		if(notification == "Start")
		{
			this.config = payload;
		}
		if (notification == "Check") {
			this.checkSpeed();
		}
	},
	
	checkSpeed: async function() {
		console.log("Checking speed...");
		try {
			var Check = await speedtest(
				{"serverId": this.config.serverId,
				 "acceptLicense": true,
				 "acceptGdpr": true,
				 "progress": (data) => this.handleProgressEvent(data)
				})
		} catch (err) {
			console.error("{internet-monitor]", err.message);
		} finally {
			if (Check) {
				console.info("Result: ", Check);
				this.sendSocketNotification("data", Check);
				console.debug("Done");
			}
		} // end try
		this.scheduleUpdate();
	},
	
	handleProgressEvent: function(data) {
		switch (data.type) {
			case "download":
				console.debug("Examining download statistic: " + data.download.bandwidth);
				this.sendSocketNotification("downloadSpeedProgress", this.oToMbps(data.download.bandwidth));
				break;
			case "upload":
				console.debug("Examining upload statistic: " + data.upload.bandwidth);
				this.sendSocketNotification("uploadSpeedProgress", this.oToMbps(data.upload.bandwidth));
				break;
			case "ping":
				console.debug("Examining ping statistic:" + data.ping.latency);
				this.sendSocketNotification("ping", Math.round(data.ping.latency));
		}
	}, 
	
	// Convert octect to Mbps [Match with Speedtest web result] 
	oToMbps: function(value) {
		if (!value) return 0
		return (value * 0.000008).toFixed(2)
	}, 

	/** update process **/
	scheduleUpdate: function() {
		if (this.config.updateInterval < 60*1000) this.config.updateInterval = 60*1000
		clearInterval(this.interval);
		this.interval = setInterval(this.checkSpeed(), this.config.update);
	  },

});

