# MMM-AmsIAQ
A MagicMirror² module to read and display the data of the AMS-IAQ-CORE-C Sensor.

# Dependencies

- [pigpio](https://github.com/joan2937/pigpio)

# Config

<table>
  <thead>
    <tr>
      <th>Option</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>refreshTime</code></td>
      <td><strong>Default: 10000</strong><br>Time interval to read data in miliseconds<br><br><strong>Type:</strong> <code>number</code></td>
    </tr>
    <tr>
      <td><code>i2cbus</code></td>
      <td><strong>Default: 1</strong><br>I2cbus number of the sensor<br><br><strong>Type:</strong> <code>number</code></td>
    </tr>
    <tr>
      <td><code>fontSize</code></td>
      <td><strong>Default: "medium"</strong><br>Options: <code>"small", "medium", "large"</code><br><br><strong>Type:</strong> <code>string</code></td>
    </tr>
  </tbody>
</table>
