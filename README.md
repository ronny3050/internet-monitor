# Internet Monitor - Mirror
Monitors internet statistics such as strength and speed information on a smart mirror.

![Monitor Visualization](https://github.com/ronny3050/internet-monitor/blob/master/.previews/preview.gif)

![Minimal Visualization](https://github.com/ronny3050/internet-monitor/blob/master/.previews/preview_minimal.gif)

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
			<td><code>numberOfNotifications</code></td>
			<td>Number of notifications to display at a time<br>
				<br><b>Default value:</b> <code>5</code>
				<br>If set to 0, no notification messages will be displayed.
			</td>
		</tr>
		<tr>
			<td><code>displayNoticiationIcon</code></td>
			<td>Display app icon that generated the notification<br>
				<br><b>Possible values:</b> <code>true</code> or <code>false</code>
				<br><b>Default value:</b> <code>true</code>
			</td>
		</tr>
		<tr>
			<td><code>displayMessage</code></td>
			<td>Display body of the notification<br>
				<br><b>Possible values:</b> <code>true</code> or <code>false</code>
				<br><b>Default value:</b> <code>true</code>
				<br><img src="https://github.com/ronny3050/phone-notification-mirror/blob/master/.github/message.png" width="50%" height="0.1%"></img>
			</td>
		</tr>
		<tr>
			<td><code>displayCount</code></td>
			<td>Display notification count<br>
				<br><b>Possible values:</b> <code>true</code> or <code>false</code>
				<br><b>Default value:</b> <code>true</code>
				<br><img src="https://github.com/ronny3050/phone-notification-mirror/blob/master/.github/count.png" width="50%" height="0.1%"></img>
			</td>
		</tr>
		<tr>
			<td><code>alert</code></td>
			<td>Show alerts on new notification<br>
				<br><b>Possible values:</b> <code>true</code> or <code>false</code>
				<br><b>Default value:</b> <code>true</code>
				<br>Please note that this requires the alert module to be present in the config file. For instance,
				<code>modules: [
	{
		widget: 'alert'
	}
]</code>
		<br><img src="https://github.com/ronny3050/phone-notification-mirror/blob/master/.github/alert.png" width="50%" height="2%"></img>

			</td>
		</tr>

		<tr>
			<td><code>fade</code></td>
			<td>Fade older notifications to black. (Gradient)<br>
				<br><b>Possible values:</b> <code>true</code> or <code>false</code>
				<br><b>Default value:</b> <code>true</code>
			</td>
		</tr>
		<tr>
			<td><code>maxCharacters</code></td>
			<td>Number of characters to display per notification body<br>
				<br><b>Default value:</b> <code>50</code>
			</td>
		</tr>

	</tbody>
</table>

