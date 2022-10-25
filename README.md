# Internet Monitor - Mirror
Monitors internet statistics such as strength and speed information on a smart mirror.

![Monitor Visualization](https://github.com/ronny3050/internet-monitor/blob/master/.previews/preview.gif)

![Minimal Visualization](https://github.com/ronny3050/internet-monitor/blob/master/.previews/preview_minimal.gif)

![StrengthFullscreen Visualization](https://github.com/ronny3050/internet-monitor/blob/master/.previews/preview_strength_fullscreen.png)

**This is a fork of ronny3050's module with some modifications to get it working again.**

## Installing the module

To install the module, just clone this repository to your __modules__ folder: `git clone https://github.com/BrianHepler/internet-monitor.git internet-monitor`.
Then run `cd internet-monitor` and `npm install` which will install the dependencies.

## Using the module

To use this module, add it to the modules array in the `config/config.js` file:
````javascript
modules: [
	{
	    module: 'internet-monitor',
            position: 'top_center',
            header: 'Internet Monitor',
            config:{
                type: '',
                maxTime: 20000,
                updateInterval: 0,
                verbose: false,
                serverId: "12667",
                displayStrength: true,
                displaySpeed: true,
                strengthIconSize: 80,
                maxGaugeScale: 100,
            },
	}
]
````

You can also customize the wifi symbol.

````javascript
modules: [
	{
	    module: 'internet-monitor',
            position: 'top_center',
            header: 'Internet Monitor',
            config:{
                type: '',
                maxTime: 20000,
                updateInterval: 0,
                verbose: false,
                displayStrength: true,
                displaySpeed: true,
                strengthIconSize: 80,
                maxGaugeScale: 100,
		wifiSymbol:{
                    size: 50,
                    fullColor: '#3afc25',
                    almostColor: '#ffff0c',
                    halfColor: '#ff8c00',
	            noneColor: '#ff1111'
		},
            },
	}
]
````

## Configuration options

The following properties can be configured:

| Option | Description |
|--------|--------------|
|type | Style of the speed gauges<br>Possible values:</b> <code>'minimal'</code> Minimalistic Style as shown in the second image above.<br><b>Default value:</b> <code>''</code> |
| updateInterval | Time to rerun/update tests (Milliseconds)<br><b>Default value:</b> <code>0</code><br>Please note that <code>updateInterval</code> has to be greater than <code>maxTime</code> |
| displayStrength | Display Internet Strength<br><b>Possible values:</b> <code>true</code> or <code>false</code><br><b>Default value:</b> <code>true</code><br><img src="https://github.com/ronny3050/internet-monitor/blob/master/.previews/preview_strength.png" ></img> | 
| displaySpeed | Display download and upload speed gauges<br><b>Possible values:</b> <code>true</code> or <code>false</code><br><b>Default value:</b> <code>true</code><br><img src="https://github.com/ronny3050/internet-monitor/blob/master/.previews/preview_speed.png" ></img> |
| strengthIconSize | Size of the strength icon<br><b>Default value:</b> <code>80</code> |
| maxGuageScale | Maximum gauge value (Mbps)<br><b>Default value:</b> <code>100</code> |
| serverId | Test against specific SpeedTest server (optional)<br><b>Default value:</b> <code>''</code><br>List of servers <a href="https://www.speedtest.net/speedtest-servers-static.php" target="new">can be found at SpeedTest</a>. |
| wifiSymbol | Customize WiFi Symbol (Optional)<br><p><ul><li><code>size</code> Size of the WiFi Symbol</li><li><code>fullColor</code>Hex color code for full strength &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://github.com/ronny3050/internet-monitor/blob/master/.previews/full.gif" width=10%></img></li><li><code>almostColor</code>Hex color code for almost strength &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://github.com/ronny3050/internet-monitor/blob/master/.previews/almost.gif" width=10%></img></li><li><code>halfColor</code>Hex color code for half strength &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://github.com/ronny3050/internet-monitor/blob/master/.previews/half.gif" width=10%></img></li><li><code>noneColor</code>Hex color code for 0 strength &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://github.com/ronny3050/internet-monitor/blob/master/.previews/none.png" width=10%></img></li></ul></p> |