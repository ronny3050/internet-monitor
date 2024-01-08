/**
 * Created by debayan on 7/23/16.
 */
const Log = require("logger");
const NodeHelper = require("node_helper");
const speedtest = require("speedtest-net");

module.exports = NodeHelper.create({
  start () {
    Log.log(`${this.name} helper started ...`);
    this.config = null;
    this.interval = null;
  },

  socketNotificationReceived (notification, payload) {
    if (notification === "Start") {
      this.config = payload;
    }
    if (notification === "Check") {
      this.checkSpeed();
    }
  },

  async checkSpeed () {
    Log.log("Checking speed...");
    let Check;
    try {
      Check = await speedtest({serverId: this.config.serverId,
				 acceptLicense: true,
				 acceptGdpr: true,
				 progress: (data) => this.handleProgressEvent(data)});
    } catch (err) {
      Log.error("[internet-monitor]", err.message);
    } finally {
      if (Check) {
        Log.debug("Result: ", Check);
        this.sendSocketNotification("data", Check);
        Log.debug("Done");
      }
    } // end try
    this.scheduleUpdate();
  },

  handleProgressEvent (data) {
    switch (data.type) {
      case "download":
        Log.debug(`Examining download statistic: ${data.download.bandwidth}`);
        this.sendSocketNotification("downloadSpeedProgress", this.oToMbps(data.download.bandwidth));
        break;
      case "upload":
        Log.debug(`Examining upload statistic: ${data.upload.bandwidth}`);
        this.sendSocketNotification("uploadSpeedProgress", this.oToMbps(data.upload.bandwidth));
        break;
      case "ping":
        Log.debug(`Examining ping statistic:${data.ping.latency}`);
        this.sendSocketNotification("ping", Math.round(data.ping.latency));
    }
  },

  // Convert octect to Mbps [Match with Speedtest web result]
  oToMbps (value) {
    if (!value) {
      return 0;
    }
    return (value * 0.000008).toFixed(2);
  },

  /** update process **/
  scheduleUpdate () {
    if (this.config.updateInterval < 60 * 1000) {
      this.config.updateInterval = 60 * 1000;
    }
    clearInterval(this.interval);
    this.interval = setInterval(() => this.checkSpeed(), this.config.updateInterval);
	  }

});

