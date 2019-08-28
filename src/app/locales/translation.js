import LocalizedStrings from 'react-localization';

// Product constants
export const productName = "ProductName";
export const discTool = "Discovery Utility";
export const appTitle = productName + " " + discTool;

let translation = new LocalizedStrings({
    en: {
        //new ui locales
        WELCOME_TITLE: "Welcome to " + productName + "Discovery Utility!",
        ABOUT_TOOL: "This utility helps you to scan and discover unconfigured appliances in the network\n" +
	    "and launch the initial configuration process to create a " + productName + " cluster.\n" +
	    "Before you begin, do the following on your workstation: \n",
        WIFI_NETWORKS: "Temporarily disable your wireless networks.",
        SHOW_ME_LINK: "Show me how.",
        PC_FIRE_WALL: "Your PC firewall",
        CONNECT_YOUR_LAPTOP: "Connect to the network.",
        SHOW_ME_HOW: "Show me how.",
        SCAN_APPLIANCES: "Scan appliances",
        SEARCH: "Searching...",
        SEARCH_HELP: "This process usually takes 60 seconds." +
            " Once available appliances are discovered, you can create a cluster or add them to an existing one.",
        ERROR_PAGE_TITLE: "Still unable to find anything...",
        DISABLE_ALL: "Before re-scanning, disable the following services:",
        PC_FIRE_WALL_EXTENDED: "Your PC firewall, or add SERVICES to the \"Exclusion list\"",
        DISABLE_CISCO_MESSAGE: "Cisco Access Manager and Cisco Security Manager.",
        DISABLE_NETWORKS: "Networks (wireless, bluetooth, LAN)",
        SECURITY_APPS: "Security applications.",
        ERROR: "Error",
        ERROR_MESSAGE: discTool + " was unable to scan for any appliances.",
        RESCAN_APPLIANCES: "Re-scan for Appliances",
        SCAN_AGAIN: "Scan again",
        AVAILABLE: "Available ",
        CONFIGURED: "Configured",
        SELECT_APPLIANCES: "Select the appliances you want to add to a new or existing cluster.",
        APPLIANCE_SELECTED: "Appliance selected",
        APPLIANCES_SELECTED: "Appliances selected",
        ALMOST_THERE: "Almost there!",
        REDIRECT_HELP_MESSAGE: "To complete the process, you will now be leaving the Discovery Utility. " + productName + "Manager will launch in a browser window where you will complete the initial configuration process.",
        PLEASE_STAY: "Please stay connected to the hardware until the configuration is complete.",
        MIXED_CLUSTER_WARNING: "Your selection results in a combination of " + productName + " and " + productName + "X appliances. Creating a cluster with appliances with different configurations is not supported in this release.",
        MAX_APPLIANCES_IN_CLUSTER: "Your selection would result in too many appliances in the cluster",
        GO_TO_CLUSTER: "Launch " + productName + " Manager",
        ADD_TO_EXISTING: "Add to existing cluster",
        ADD_TO_CLUSTER: "Add to cluster",
        CLOSE: "Close",
        ACTION_OK: "OK",
        DISABLE_FIREWALL: "Temporarily disable security applications such as antivirus and firewall software.",
        DISABLE_FIREWALL_TEXT: "Security applications, such as antivirus and firewalls, running on your workstation may prevent unconfigured appliances from being detected." +
	    "Temporarily disable these applications on the workstation before scanning for the appliances.\n" +
	    "Once you have launched the initial configuration process, you can enable the security applications again.\n" +
	    "If this is not possible, add port 5353 and Discovery Utility on the exclusion list for the antivirus and firewall software. For more information, refer to the antivirus and firewall documentation.\n" +
	    "If none of this is possible, refer to the manual procedure to discover the unconfigured appliances.",
        CONNECT_LAPTOP: "Connect to the network.",
        CONNECT_LAPTOP_TEXT: "Ensure that the workstation is connected directly to the same physical switch that your appliances’ management port is connected to.\n" + 
	    "•	Configure the ethernet adapter, which is connected to the physical switch, with an IPv4-based link local IP address."+
	    "For example, 169.254.1.2. To verify that the link-local addresses is set properly, open the Windows command prompt and run the “ipconfig /all” command.\n" +
	    "•	If your network is running a DHCP service that automatically assigns IP addresses, contact your infrastructure administrator, or manually assign a 169.254.x.x address.",
        DISABLE_NETWORK: "Temporarily disable your wireless networks.",
        DISABLE_NETWORK_TEXT: "Isolate your local link network by temporarily disabling other networks such as your wireless network." +
	    "For example, in Windows 10, select the Network icon in the taskbar, and click the Wi-Fi panel to disable the wireless antenna." +
	    "You can click it again to enable it. For more information on disabling wireless networks, refer to your operating system documentation.",

        //*************************
        // ** MAIN PAGE LOCALES
        // * HEADER
        APPLIANCES: "Appliances",
        ALL_APPLIANCES_FILTER: "ALL APPLIANCES ({0})",
        UNCONFIGURED_FILTER: "UNCONFIGURED ({0})",
        CONFIGURED_FILTER: "CONFIGURED ({0})",
        SERVICE_STATE_FILTER: "SERVICE STATE ({0})",

        // * FILTERING
        SEARCH_APPLIANCES: "Search appliances by serial number",
        ALL: "ALL",
        CREATE_CLUSTER: "CREATE CLUSTER",
        JOIN_CLASTER: "JOIN CLUSTER",

        // * APPLIANCES
        APPLIANCES_FILTER: "Appliance - {0}",
        CLUSTER_NAME: "Cluster name",
        UNCONFIGURED: "unconfigured",

        // * NUMBER OF SELECTED APPLIANCES
        FILTER_APPLIANCES_SELECTED: "{0} Appliances selected",
        SEARCHING: "Searching...",

        // ** HELP PAGE LOCALES
        HELP: "Help",

        // * WHAT TO EXPECT
        WHAT_EXPECT: "What to expect",
        WtExpect_descr: "Complete the following steps to get your {0} configured for use on your network:",
        WtExpect_Discover: "Discover",
        WtExpect_DiscoverDescr: "Use the {0} Discovery Utility to discover all unconfigured appliances within your network. You can choose to group appliances into a new cluster or add them to an existing one.",
        WtExpect_Configure: "Configure",
        WtExpect_ConfigureDescr: "Once you have discovered the appliances you want, begin the initial configuration process. Ensure that you have obtained network-related information in the {0} Series Initial Configuration Worksheet.",
        WtExpect_Manage: "Manage",
        WtExpect_ManageDescr: "When the initial configuration process is complete, you can log on to the {0} Manager" +
	    "where you can configure settings for your cluster and start provisioning user accounts, storage resources, and policies." +
	    "You can also add newly installed appliances to an existing cluster from " + productName + " Manager.\n \n "+
	    "Note: In this release, you can have up to 4 appliances in a cluster.",
        // *TROUBLESHOOTING TIPS
        tab_Troubleshoot: "Troubleshooting Tips",
        Troubleshoot_descr: "If you are having problems detecting appliances, try the following:",
        Troubleshoot_Setup: "Setup",
        Troubleshoot_SetupLi1: "Temporally disable your firewall or add services to the exclusion list.",
        Troubleshoot_SetupLi2: "For all versions of Windows, temporarily disable Cisco Access Manager and Cisco Security Manager.",
        Troubleshoot_SetupLi3: "Isolate your local link network by temporarily disabling other networks, such as your wireless network.",
        Troubleshoot_SetupLi4: "Disable security applications, such as antivirus software.",
        Troubleshoot_SetupLi5: "Ensure that you are running this {0} on the same network as the appliance you are looking to discover." +
	    "Your laptop or management station can be cabled directly to the network switch, or connected virtually on a host within the same network.",
        Troubleshoot_Doc: "Documentation",
        Troubleshoot_DocDescr1: "Visit the",
        Troubleshoot_DocDescr2: "technical documentation",
        Troubleshoot_DocDescr3: "landing page for details on getting started, configuring, managing and optimizing your system.",
        // * DOCUMENTATION
        tab_Documentation: "Documentation Resources",
        Documentation_descr1: "For product and feature documentation or release notes, go to the {0} Documentation page at PLACEHOLDER",
        Documentation_descr2: "Before you try discovering unconfigured appliances and begin the initial configuration process, ensure that you have:",
        Documentation_descr3: "* Configured your network and physical switches based on the recommendations provided in the " + productName + " Series Configure Switches and External Networks Guide.\n" +
	    "* Configured your site and workstation based on the specifications provided in the " + productName + " Series Planning and Preparation Guide.\n" +
	    "* Obtained network-related information you will require for initial configuration using the " + productName + " Series Initial Configuration Worksheet.\n" +
	    "* Installed the base enclosures, and the optional expansion enclosures, referring to the " + productName + " Series Quick Start Guide.",
        Documentation_QuickSG: "",
        Documentation_QuickSGDescr: "",
        Documentation_PlanGuide: "",
        Documentation_PlanGuideDescr: "",
        Documentation_Config: "",
        Documentation_ConfigDescr: "",
        // ------------------------------------------

        // ** TOOLTIPS
        JoinClusterTooltip_descr: "In this release, you can only add one appliance at a time.",
        ClusterTooltip_descr: "In this release, you can only create a cluster with up to 4 appliances.",
        // * INFOTAB
        Infotab_ApplDetails: "Appliance Details",
        Infotab_SN: "Serial Number",
        Infotab_SysType: "System Type",
        Infotab_IP: "IP Address",
        Infotab_buttonClose: "CLOSE",
        Infotab_ClustDetails: "Cluster Details",
        Infotab_ClustName: "Cluster Name",
        Infotab_AdminTool: "Administration Tool",
        Infotab_ApplInCluster: "Appliances in Cluster",
        Infotab_ChooseCluster: "Choose Cluster",
        Infotab_ChooseClusterDescr: "Select the cluster to which you want to add your appliance.",
        Infotab_AvailCl: "Avaliable clusters ({0})",
        Infotab_PlaceHolder: "Search clusters",
        Infotab_name: "Name",
        Infotab_selectedAppliances: "Selected appliances ({0})",
        Infotab_buttonCancel: "CANCEL",
        Infotab_buttonJoin: "JOIN CLUSTER",
        // ------------------------------------------

        // ** LOGS
        Logs_SystemLogs: "System Logs",
        Logs_DetectionLog: "Detection Log",
        Logs_EventLog: "Event Log",
        Logs_buttonSave: "Save logs",
        Logs_buttonClear: "Clear logs",
        Logs_Name: "Event Name",
        Logs_Addr: "Address",
        Logs_State: "State",
        Logs_Type: "Type",
        Logs_Time: "Time"

    }
});

export default (translation);
