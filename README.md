# ROSDashboard
Web based bash board to interface with your ROS creation. 
The goal of this project is to provide dashboard interfaces that can be accessed on multiple platforms to perform simple ROS control. Expanding from my Create2 project I will be making multiple dashboard that can be deployed on a site taking advantage of the roslibjs library from [RobotWebTools](). 

## Valve Steamdeck
In order to take advantage of the built-in controls of the Steamdeck we need to make a few changes. 

### Google Chrome not already installed
1) Press the Steam button to bring up the Steam Menu, then select **Power > Switch to Desktop**.
2) Select the Discover Software Center icon on the taskbar.
3) In Discover Software Center, select **Applications > Internet > Web Browsers**.
4) Find Chrome in the list of apps and select Install.
5) Add Chrome to the Steam Library. 

### Google Chrome Installed
1) From Desktop Mode, select **Application Launcher > System > Konsole** to open a terminal session. 
2) Type the following command, `flatpak --user override --filesystem=/run/udev:ro com.google.Chrome`, and hit Enter. 
3) Restart DeckOS, configure controls to the **Gamepad with Mouse Trackpad** template for chrome to detect gamepad input. *It is recommended to reprogram the right trackpad click to the left mouse button.* 

In Order for the changes to take effect you may need to close and open the chrome application from within DeckOS a few times. You can test the results using an [online gamepad tester](#). 

## Standard PC
There will be a standard interface for the desktop environment. No changes necessary. 

# Prerequisites 
The following ROS packages are utilized in the included dashboards and will need to be installed on the robot:

ROSBridge Suite - ROS Communications 
`sudo apt-get ros-[distro]-rosbridge-suite`
Web Video Server - Streaming Camera Data 
`sudo apt-get ros-[distro]-web-video-server`

