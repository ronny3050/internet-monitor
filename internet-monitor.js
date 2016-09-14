/**
 * Created by debayan on 7/24/16.
 */

Widget.register("internet-monitor",{

    defaults : {
    },
    payload: [],

    downloadBarState: 'not_started',
    updating: false,

    start : function(){
        console.log("Internet-monitor module started!");
        this.sendSocketNotification('Start',this.config);
        // Schedule update timer.
        var self = this;
        if(this.config.updateInterval != 0)
        {
            setInterval(function() {
                self.updating= true;
                self.sendSocketNotification('Start',self.config);
            }, this.config.updateInterval);
        }
    },

    getScripts: function(){
        return [this.file('justgage-1.2.2/justgage.js'),this.file('justgage-1.2.2/raphael-2.1.4.min.js'),this.file('jquery.js')]
    },

    getStyles: function(){
        return ["internet-monitor.css"]
    },
    
    addScript: function(mode){
       var script = document.createElement('script');
        if(this.config.type == 'minimal'){
            script.innerHTML = 'var download, upload;' +
                'download = new JustGage({' +
                'id: "downloadSpeedGauge",' +
                'value: ' + 0 + ',' +
                'min: 0,' +
                'max: 100,' +
                'title: "Download Speed",' +
                'refreshAnimationType:"linear",' +
                'gaugeWidthScale: "0.8",' +
                'valueFontColor: "#fff",' +
                'valueFontFamily: "Roboto Condensed",' +
                'titleFontFamily: "Roboto Condensed",' +
                'titleFontColor: "#aaa",' +
                'hideMinMax: true,'+
                'gaugeColor: "#000",'+
                'levelColors: ["#fff"],'+
                'hideInnerShadow: true,'+
                'symbol: "Mbps"});' +
                'upload = new JustGage({' +
                'id: "uploadSpeedGauge",' +
                'value: ' + 0 + ',' +
                'min: 0,' +
                'max: 100,' +
                'title: "Upload Speed",' +
                'refreshAnimationType:"linear",' +
                'gaugeWidthScale: "0.8",' +
                'valueFontColor: "#fff",' +
                'valueFontFamily: "Roboto Condensed",' +
                'titleFontFamily: "Roboto Condensed",' +
                'titleFontColor: "#aaa",' +
                'hideMinMax: true,'+
                'gaugeColor: "#000",'+
                'levelColors: ["#fff"],'+
                'hideInnerShadow: true,'+
                'symbol: "Mbps"});';

        }
        else{
        script.innerHTML = 'var download, upload;' +
            'download = new JustGage({' +
            'id: "downloadSpeedGauge",' +
            'value: ' + 0 + ',' +
            'min: 0,' +
            'max: 100,' +
            'title: "Download Speed",' +
            'refreshAnimationType:"linear",' +
            'gaugeWidthScale: "0.8",' +
            'valueFontColor: "#fff",' +
            'valueFontFamily: "Roboto Condensed",' +
            'titleFontFamily: "Roboto Condensed",' +
            'titleFontColor: "#aaa",' +
            'symbol: "Mbps"});' +
            'upload = new JustGage({' +
            'id: "uploadSpeedGauge",' +
            'value: ' + 0 + ',' +
            'min: 0,' +
            'max: 100,' +
            'title: "Upload Speed",' +
            'refreshAnimationType:"linear",' +
            'gaugeWidthScale: "0.8",' +
            'valueFontColor: "#fff",' +
            'valueFontFamily: "Roboto Condensed",' +
            'titleFontFamily: "Roboto Condensed",' +
            'titleFontColor: "#aaa",' +
            'symbol: "Mbps"});';
        }
        $(script).appendTo('body');

    },

    socketNotificationReceived: function(notification, payload){


        if(notification == 'downloadSpeedProgress')
        {
            if(this.config.displaySpeed) {
                if (this.downloadBarState == 'not_started') {
                    this.addScript();
                    this.downloadBarState = 'started';
                }
                console.log('updating DOWNLOAD');
                download.refresh(payload, 100);
            }

        }
        if(notification == 'uploadSpeedProgress')
        {
            if(this.config.displaySpeed) {
                console.log('updating UPLOAD');
                upload.refresh(payload,100);
            }
        }
        if(notification == 'data')
        {
            if(this.config.verbose)
            {
                if(!this.updating)
                {
                    var d = document.createElement("div");
                    d.style = 'text-align: left; display:inline-block;';
                    $(d).appendTo('#internetData');
                }
                $('#internetData > div').html(
                    '    Server:   ' + payload.server.host).append('<br/>' +
                    ' Location:   ' + payload.server.location + ' (' + payload.server.country + ')').append('<br/>' +
                    '  Distance:   ' + payload.server.distance + ' km').append("</div>");
            }
        }
        if(notification == 'ping'){
            if(this.downloadBarState == 'not_started')
            this.updateDom();
            if(this.config.displayStrength){
                var d = null;
                if(this.downloadBarState == 'not_started')
                {
                    d = document.createElement("div");
                    $(d).appendTo('#pingDiv');
                }
                else{
                    d = document.getElementById('#pingDiv');
                }
                if(payload < 70){
                    $(d).append('<img src="' + window.location.href + '/widgets/internet-monitor//images/' + 'strength_full.png" width=' +  this.config.strengthIconSize +'height=' + this.config.strengthIconSize +'/>');
                }
                else if(payload >= 70 && payload < 100){
                    $(d).append('<img src="' + window.location.href + '/widgets/internet-monitor//images/' + 'strength_almost.png" width=' + this.config.strengthIconSize +' height=' + this.config.strengthIconSize + '/>');
                }
                else if(payload >= 100 && payload < 150){
                    $(d).append('<img src="' + window.location.href + '/widgets/internet-monitor//images/' + 'strength_half.png" width=' + this.config.strengthIconSize +' height=' + this.config.strengthIconSize + '/>');
                }
                else if(payload >= 150)
                {
                    $(d).append('<img src="' + window.location.href + '/widgets/internet-monitor//images/' + 'strength_none.png" width=' + this.config.strengthIconSize +' height=' + this.config.strengthIconSize + '/>');
                }
            }
        }
    },

    getDom: function(){
        var wrapper = document.createElement("div");
        wrapper.className = "small";
        if(this.config.displayStrength)
        {
            var pingDiv = document.createElement("div");
            pingDiv.id = "pingDiv";
            wrapper.appendChild(pingDiv);
        }
        if(this.config.displaySpeed) {
            var downloadSpeedGauge = document.createElement("div");
            downloadSpeedGauge.id = 'downloadSpeedGauge';

            var uploadSpeedGauge = document.createElement("div");
            uploadSpeedGauge.id = 'uploadSpeedGauge';
            wrapper.appendChild(downloadSpeedGauge);
            wrapper.appendChild(uploadSpeedGauge);
        }
        if(this.config.verbose) {
            var data = document.createElement("div");
            data.id = 'internetData';
            wrapper.appendChild(data);
        }
        return wrapper;
    }


});