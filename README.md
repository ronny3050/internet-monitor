# Internet Monitor - Mirror
Monitors internet statistics such as strength and speed information on a smart mirror.

![Monitor Visualization](https://github.com/ronny3050/internet-monitor/blob/master/.previews/preview.gif)

![Minimal Visualization](https://github.com/ronny3050/internet-monitor/blob/master/.previews/preview_minimal.gif)

![StrengthFullscreen Visualization](https://github.com/ronny3050/internet-monitor/blob/master/.previews/preview_strength_fullscreen.png)

## Installing the module

To install the module, just clone this repository to your __modules__ folder: `git clone https://github.com/ronny3050/internet-monitor.git internet-monitor`.
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

<table width="100%">
	<!-- why, markdown... -->
	<thead>
		<tr>
			<th>Option</th>
			<th width="100%">Description</th>
		</tr>
	<thead>
	<tbody>
		<tr>
			<td><code>type</code></td>
			<td>Style of the speed gauges<br>
			<br><b>Possible values:</b> <code>'minimal'</code> Minimalistic Style as shown in the second image above.
			<br><b>Default value:</b> <code>''</code>
			</td>
		</tr>
		<tr>
			<td><code>maxTime</code></td>
			<td>Maximum time to test internet speed (Milliseconds)<br>
				<br><b>Default value:</b> <code>20000</code>
			</td>
		</tr>
		<tr>
			<td><code>updateInterval</code></td>
			<td>Time to rerun/update tests (Milliseconds)<br>
				<br><b>Default value:</b> <code>0</code>
				<br>Please note that <code>updateInterval</code> has to be greater than <code>maxTime</code>
			</td>
		</tr>
		<tr>
			<td><code>verbose</code></td>
			<td>Display additional information about test<br>
				<br><b>Possible values:</b> <code>true</code> or <code>false</code>
				<br><b>Default value:</b> <code>false</code>
				<br><img src="https://github.com/ronny3050/internet-monitor/blob/master/.previews/preview_verbose.png"></img>
			</td>
		</tr>
		<tr>
			<td><code>displayStrength</code></td>
			<td>Display Internet strength<br>
				<br><b>Possible values:</b> <code>true</code> or <code>false</code>
				<br><b>Default value:</b> <code>true</code>
				<br><img src="https://github.com/ronny3050/internet-monitor/blob/master/.previews/preview_strength.png" ></img>
			</td>
		</tr>
		<tr>
			<td><code>displaySpeed</code></td>
			<td>Display download and upload speed gauges<br>
				<br><b>Possible values:</b> <code>true</code> or <code>false</code>
				<br><b>Default value:</b> <code>true</code>
				<br><img src="https://github.com/ronny3050/internet-monitor/blob/master/.previews/preview_speed.png" ></img>
	       <tr>
			<td><code>strengthIconSize</code></td>
			<td>Size of the strength icon<br>
				<br><b>Default value:</b> <code>80</code>
			</td>
		</tr>
		<tr>
			<td><code>maxGaugeScale</code></td>
			<td>Maximum gauge value (Mbps)<br>
				<br><b>Default value:</b> <code>100</code>
			</td>
		</tr>
		<tr>
			<td><code>wifiSymbol</code></td>
			<td>Customize WiFi Symbol (Optional)<br>
			<p>
				<ul>
					<li><code>size</code> Size of the WiFi Symbol</li>
					<li><code>fullColor</code>Hex color code for full strength &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://github.com/ronny3050/internet-monitor/blob/master/.previews/full.gif" width=10%></img></li>
					<li><code>almostColor</code>Hex color code for almost strength &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://github.com/ronny3050/internet-monitor/blob/master/.previews/almost.gif" width=10%></img></li>
					<li><code>halfColor</code>Hex color code for half strength &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://github.com/ronny3050/internet-monitor/blob/master/.previews/half.gif" width=10%></img></li>
					<li><code>noneColor</code>Hex color code for 0 strength &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://github.com/ronny3050/internet-monitor/blob/master/.previews/none.png" width=10%></img></li>
				</ul>
			</p>
		</tr>
			
</table>
