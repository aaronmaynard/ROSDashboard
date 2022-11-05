

# Checklist

## User Interface

- Make da tings look nise.  

- Allow an alternate view for platforms that do not have a video feed
	- [ ] Map view as the main background

- Change ROS workspace 
	- [ ] Make a prompt at load
	- [ ] Option in settings

- Adjustability
	- [ ] Speed slider
	- [ ] Theme Selector
	- [ ] Change joystick control type

## Control Layout

|Button| Function |
|--|--|
| Start | Settings |
| Select | Map View |
| A | Aux1 |
| B | Aux2 |
| X | Aux3 |
| Y | Aux4 |
| UP | Aux5 |
| DOWN | Aux6 |
| LEFT | Aux7 |
| RIGHT | Aux8 |
| TRIGGER LEFT | Aux9 |
| TRIGGER RIGHT | Aux10 |
| BUMPER LEFT | Aux11 |
| BUMPER RIGHT | Aux12 |
| JOYSTICK LEFT | TELEOP TWIST |
| JOYSTICK RIGHT | CAMERA CONTROL | 

## Joystick Control

Two schools of thought for joystick control.  

 1. Single Joy Control
	- Left joystick controls forward/back and rotational movement 
	- **Pro's**
		- *Right Joystick controls can control another device, such as camera*
	- **Con's**
		- *No way to control platforms that can translate sideways*
 2. Dual Joy Control
	 - Left joystick controls all translational movement, right joystick controls all rotational movement 
	- **Pro's**
		- *Supports all types of drive systems, potentially even three-dimensional movement*
	- **Con's**
		- *Lose a dedicated controller*
