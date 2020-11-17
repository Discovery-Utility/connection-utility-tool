# zeroconf
Zeroconf Storage Connection Utility

**Zeroconf Storage Connection Utility** - is a tool that allows you
efficiently locate appliances of a hyperconverged storage system
using zeroconf technologies.


## What to expect 
Zeroconf Storage Connection Utility (**ZSCU**) allows
you to Discover, Connect and Manage storage systems.

### Discover  
The **ZSCU** will locate all available appliances within your network.
It allows you to choose newly installed appliances and proceed to
Initial Configuration Wizard so that you can create a new cluster,
or add them to an existing one.

### Connect
Once you have selected your appliances using the **ZSCU**, the
Initial Configuration Wizard will launch. This wizard will guide you
through the steps of creating a new cluster.

### Manage  
You will be redirected to the management app of your system.
Here you will manage all aspects of your new cluster.


## Build and run  

You can download and run **ZSCU** binary files from this repository.
Or you may complete several steps to build and run by yourself.

### Howto Build
1. Install [Node.js](https://nodejs.org/en/download/) (tested with  8.11.4)
for your system. The installer will guide you through all necessary steps
and will also install [npm](https://docs.npmjs.com)
2. Clone or download this project
3. Download and install all of the project libraries and dependencies by
running the following commands (using any shell).
    1. run `npm install` in "./" of the project.
4. In the directory "./" build the bundle by `npm run dev` command. (For build the bundle & run application use `npm run app` command)
5. Now you can run or build binary files of **ZSCU**:
    1. For running this application live you need enter `npm run electron`
command in "./"
    2. You can build binary files only from the same platform type as the intended target. For building binary files you need run one of the
following commands in "./":

        ```
        npm run build:win32
        npm run build:win64
        npm run build:linux
        ```
6. In order to rebuild with custom changes repeat repeat #4 & #5

## Supported format for publishing storage systems

In the local network [Zeroconf](https://en.wikipedia.org/wiki/Zero-configuration_networking) 
auto assigns IP-addresses to devices (appliances).
[mDNS](https://community.cisco.com/t5/wireless-mobility-documents/basic-theory-behind-mdns/ta-p/3148577) is used for name resolving.
Whithin the network every appliance has a unique name, that contains
information about itself. This information has the following format:
`<prefix>_<appliance-name>_<compatibility-level>_<system-type>_<system-model>_<HW-type>_<mode>_<system-state>`, where  
* `<prefix> = {PSA, PSC}` - identifier of whether it is the cluster or not: PSC for cluster, PSA for appliance;
* `<appliance-name>` - serial number of the appliance or cluster name;
* `<compatibility-level>` - version of the software installed on the system
* `<system-type> = {X, B, S}` - identifier of appliance's type, X for HCI, B for SAN, S for simulator
* `<system-model>` - model of the appliance
* `<HW-type> = {W, D, R}` - type of hardware
* `<mode> = {U, B}` - appliance mode, U for Unified, B for Block
* `<system-state> = {0, 1, 2, 3, 4, 5, 6, 99}` - identifier of appliance's state.
`0` - unconfigured state, newly installed appliance, `3` - configured, cluster works fine, `99` - unknown state;

Also a published appliance possesses information about its own IP-address and port.

### Testing ZSCU
If you have no ability to test **ZSCU** with real storage systems, you
can do that on the test network by publishing the name of appliances
with following commands:
* For Linux: `avahi-publish-service PSA_FNM00000000001_1_X_EX-1_W_B_0 _http._tcp 3000`, 
* For Windows: `dns-sd -R PSA_FNM00000000001_1_X_EX-1_W_B_0 _http._tcp . 3000`

where
* `_http._tcp` - type of publishing and discovering appliances;
* `3000` - port of that appliances (you may set any one);
* `PSA_FNM00000000001_1_X_EX-1_W_B_0` - unique name of the appliance.

## Troubleshooting tips
With any problems feel free to contact us by [EMAIL]()(TBD) or create an
issue within this project. Also it may be helpful to view all current
and closed issues for similar problems.

Below are some examples of common issues during the build and execution
of **ZSCU**.

### Trouble with build process
Be attentive to console output when you run any commands - sometimes
it can give you an answer to your problem.
One of the frequent issues is outdated version of Node.js and npm.
You may update them by running `npm install -g npm` and `npm install
-g node` respectively.

Also you can update nearly every library in your project by running
`npm install -g <libname>`. Note, the version that will be used in the
application is defined by corresponding `package.json` file.

### Problems with detecting appliances
If you are having problems with detecting appliances, try the following:
* Temporally disable your firewall or add the tool to the exclusion list.
* For all versions of Windows, temporarily disable Cisco Access Manager
and Cisco Security Manager.
* Isolate your local link network by temporarily disabling other networks,
such as your wireless network.
* Disable security applications, such as antivirus software.
* Ensure that you are running **ZSCU** on the same network as the
appliance you are looking to discover. Your laptop or management station
should be cabled directly to the network switch, or connected virtually on
a host within the same network.

### Enable developer tools
If you want to enable developer tools, you should set SHOW_DEV_CONSOLE state true:
`SHOW_DEV_CONSOLE: true` in "/src/app_environment.js" file before
build/run process
