/**
 * Created by debayan on 7/23/16.
 */
var NodeHelper = require('node_helper');
var speedtest = require('speedtest-net');
var roundTo = require('round-to');

module.exports = NodeHelper.create({
        start: function(){
            console.log(this.name + ' helper started ...');

        },
        socketNotificationReceived : function(notification, payload){
            if(notification == 'Start')
            {
                console.log('starting internet monitor node helper')
                var that = this;
                var st = speedtest({maxTime: payload.maxTime});
                st.on('downloadspeedprogress', function (speed) {
                        var download = roundTo(speed, speed >= 10 ? 0 : 1);
                        that.sendSocketNotification('downloadSpeedProgress', download);
                });

                st.on('uploadspeedprogress', function (speed) {
                    var upload = roundTo(speed, speed >= 10 ? 0 : 1);
                    that.sendSocketNotification('uploadSpeedProgress', upload);
                });

                st.on('data', function(data){
                   that.sendSocketNotification('data',data);
                });

                st.once('testserver', function(server){
                    var ping = Math.round(server.bestPing);
                    that.sendSocketNotification('ping',ping);
                });
            }
        }
});

