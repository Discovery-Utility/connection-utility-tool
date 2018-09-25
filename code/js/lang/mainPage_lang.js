import LocalizedStrings from 'react-localization';

// Names parametrization
export const cdTool = "Cyc Discovery Tool";
export const productName = "Product Name";
export const discTool = "Discovery tool";

let mainPage_lang = new LocalizedStrings({
    en: {
        // ** MAIN PAGE LANGUAGE
        // * HEADER
        header_appliances: "Appliances",
        filter_allAppl: "ALL APPLIANCES ({0})",
        filter_unconf: "UNCONFIGURED ({0})",
        filter_conf: "CONFIGURED ({0})",
        filter_serv: "SERVICE STATE ({0})",
        // * FILTERING
        filter_search: "Search appliances by serial number",
        filter_All: "ALL",
        button_createCluster: "CREATE CLUSTER",
        button_joinCluster: "JOIN CLUSTER",
        // * APPLIANCES
        applianceinfo_Appliance: "Appliance - {0}",
        applianceinfo_ClusterName: "Cluster name",
        applianceinfo_stateUnconf: "unconfigured",
        // * NUMBER OF SELECTED APPLIANCES
        bottomInfo_appliancesSelected: "{0} Appliances selected",
        main_searching: "Searching...",
        // ------------------------------------------

        // ** HELP PAGE LANGUAGE
        tab_Help: "Help",
        // * WHAT TO EXPECT
        tab_WtExpect: "What to expect",
        WtExpect_descr: "You will need to complete three steps to get your {0} up and running and available on your network.",
        WtExpect_Discover: "Discover",
        WtExpect_DiscoverDescr: "The {0} will locate all available appliances within your network. It allows you to choose new installed appliances and group them together, so that you can create a new cluster, or add them to an existing cluster.",
        WtExpect_Configure: "Configure",
        WtExpect_ConfigureDescr: "Once you have discovered your appliances using the {0}, the Initial Configuration Wizard will launch. This wizard will guide you through steps to create a new cluster and make it available on your network.",
        WtExpect_Manage: "Manage",
        WtExpect_ManageDescr: "You will be redirected to the {0} management tool for your system. Here you will manage all aspects of your new cluster. Once you have logged in, {0} allows you the option to add newly installed appliances to an existing cluster.",
        // *TROUBLESHOOTING TIPS
        tab_Troubleshoot: "Troubleshooting Tips",
        Troubleshoot_descr: "If you are having problems detecting appliances, try the following:",
        Troubleshoot_Setup: "Setup",
        Troubleshoot_SetupLi1: "Temporally disable your firewall or add services to the exclusion list.",
        Troubleshoot_SetupLi2: "For all versions of Windows, temporarily disable Cisco Access Manager and Cisco Security Manager.",
        Troubleshoot_SetupLi3: "Isolate your local link network by temporarily disabling other networks, such as your wireless network.",
        Troubleshoot_SetupLi4: "Disable security applications, such as antivirus software.",
        Troubleshoot_SetupLi5: "Ensure that you are running this {0} on the same network as the appliance you are looking to discover. Your laptop or management station can be cabled directly to the network switch, or connected virtually on a host within the same network.",
        Troubleshoot_Doc: "Documentation",
        Troubleshoot_DocDescr1: "Visit the",
        Troubleshoot_DocDescr2: "technical documentation",
        Troubleshoot_DocDescr3: "landing page for details on getting started, configuring, managing and optimizing your system.",
        // * DOCUMENTATION
        tab_Documentation: "Documentation",
        Documentation_descr1: "The following resources are available from our",
        Documentation_descr2: "{0} Documentation",
        Documentation_descr3: "landing page.",
        Documentation_QuickSG: "Quick Start Guides",
        Documentation_QuickSGDescr: "Refer to these quick start guides to get your appliance hardware racked, powered up, and ready for configuration.",
        Documentation_PlanGuide: "Planning and Preparation Guide",
        Documentation_PlanGuideDescr: "Used side-by-side with the system during the installation process. Covers both hardware and software installation. Includes the Configuration Worksheet.",
        Documentation_Config: "Configuration Worksheet",
        Documentation_ConfigDescr: "A working document used to capture all of the network and configuration detail needed to run through the software installation and configuration smoothly.",
        // ------------------------------------------

        // ** TOOLTIPS
        JoinClusterTooltip_descr: "Only adding one appliance at a time is supported.",
        ClusterTooltip_descr: "Cannot create cluster for more than 4 appliances.",
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

    },
    ru: {
        // ** MAIN PAGE LANGUAGE
        // * HEADER
        header_appliances: "Устройства",
        filter_allAppl: "ВСЕ УСТРОЙСТВА ({0})",
        filter_unconf: "НЕ НАСТРОЕННЫЕ ({0})",
        filter_conf: "НАСТРОЕННЫЕ ({0})",
        filter_serv: "ТЕХНИЧЕСКИЕ РАБОТЫ ({0})",
        // * FILTERING
        filter_search: "Поиск устройств по серийному номеру",
        filter_All: "ВСЕ",
        button_createCluster: "СОЗДАТЬ КЛАСТЕР",
        button_joinCluster: "ДОБАВИТЬ В КЛАСТЕР",
        // * APPLIANCES
        applianceinfo_Appliance: "Устройство - {0}",
        applianceinfo_ClusterName: "Имя кластера",
        applianceinfo_stateUnconf: "не настроено",
        // * NUMBER OF SELECTED APPLIANCES
        bottomInfo_appliancesSelected: "{0} Устройств выбрано",
        main_searching: "Поиск устройств...",
        // ------------------------------------------

        // ** HELP PAGE LANGUAGE
        tab_Help: "Помощь",
        // * WHAT TO EXPECT
        tab_WtExpect: "Описание продукта",
        WtExpect_descr: "Вам будет необходимо выполнить 3 шага, для того чтобы настроить ваш {0}, а также чтобы он заработал и стал доступен в сети.",
        WtExpect_Discover: "Поиск",
        WtExpect_DiscoverDescr: "{0} обнаружит все доступные устройства в вашей сети. Он позволяет Вам выбирать и группировать вновь установленные устройства, что позволит Вам создать новый кластер, либо добавить их в уже существующий кластер.",
        WtExpect_Configure: "Настройка",
        WtExpect_ConfigureDescr: "Как только Вы обнаружили ваше устройство с помощью {0}, запустится Мастер Начальной Настройки. Он поможет Вам пройти последовательность шагов для создания нового кластера, а также его корректной работы и отображения в вашей сети.",
        WtExpect_Manage: "Управление",
        WtExpect_ManageDescr: "Вы будете перенаправлены на средство управления {0} для вашей системы. Здесь Вы сможете управлять всеми аспектами вашего нового кластера. Как только Вы вошли в систему, {0} позволит Вам добавлять установленные недавно устройства к существующим кластерам.",
        // *TROUBLESHOOTING TIPS
        tab_Troubleshoot: "Советы по устранению неполадок",
        Troubleshoot_descr: "Если у вас появились проблемы с поиском устройств, попробуйте следующее:",
        Troubleshoot_Setup: "Настройка",
        Troubleshoot_SetupLi1: "Временно отключите ваш firewall или обновите его список исключений.",
        Troubleshoot_SetupLi2: "Для всех версий Windows временно отключите Cisco Access Manager и Cisco Security Manager.",
        Troubleshoot_SetupLi3: "Изолируйте вашу локальную сеть, временно отключив другие (к примеру беспроводные wi-fi сети).",
        Troubleshoot_SetupLi4: "Отключите защитные системы, такие как антивирусное программное обеспечение.",
        Troubleshoot_SetupLi5: "Убедитесь, что запускаете {0} в той же сети, в которой находятся искомые устройства. Ваш ноутбук или управляющая станция могут быть напрямую подключены к сетевому коммутатору, либо подключены виртуально через хост в той же сети.",
        Troubleshoot_Doc: "Документация",
        Troubleshoot_DocDescr1: "На странице",
        Troubleshoot_DocDescr2: "технической документации",
        Troubleshoot_DocDescr3: "вы можете найти больше информации о том, как начать работу, настроить, оптимизировать и управлять вашими системами.",
        // * DOCUMENTATION
        tab_Documentation: "Документация",
        Documentation_descr1: "Следующие ресурсы доступны на нашей странице",
        Documentation_descr2: "{0}",
        Documentation_descr3: "документации.",
        Documentation_QuickSG: "Краткое руководство",
        Documentation_QuickSGDescr: "Данные краткие руководства помогут вам быстро подключить к сети и подготовить ваши устройства к дальнейшей настройке.",
        Documentation_PlanGuide: "Руководство по подготовке",
        Documentation_PlanGuideDescr: "Следующие  материалы используются в процессе установки, и охватывают как аппаратную, так и программную установку. Включают в себя лист конфигурации системы.",
        Documentation_Config: "Лист конфигурации",
        Documentation_ConfigDescr: "Следующий документ покрывает все детали и особенности сети, а также настройки, необходимые для успешной установки и наладки ваших систем.",
        // ------------------------------------------

        // ** TOOLTIPS
        JoinClusterTooltip_descr: "Допускается добавление лишь одного устройства за раз.",
        ClusterTooltip_descr: "Не возможно создать кластер из более чем 4-х устройств.",
        // * INFOTAB
        Infotab_ApplDetails: "Информация об устройстве",
        Infotab_SN: "Серийный номер",
        Infotab_SysType: "Тип системы",
        Infotab_IP: "IP адрес",
        Infotab_buttonClose: "ЗАКРЫТЬ",
        Infotab_ClustDetails: "Информация о кластере",
        Infotab_ClustName: "Имя кластера",
        Infotab_AdminTool: "Инструмент администрирования",
        Infotab_ApplInCluster: "Устройства в кластере",
        Infotab_ChooseCluster: "Выберите кластер",
        Infotab_ChooseClusterDescr: "Выберите кластер, в который Вы хотите добавить ваше устройство.",
        Infotab_AvailCl: "Доступные кластеры ({0})",
        Infotab_PlaceHolder: "Поиск кластеров",
        Infotab_name: "Имя",
        Infotab_selectedAppliances: "Выбранные устройства ({0})",
        Infotab_buttonCancel: "ОТМЕНА",
        Infotab_buttonJoin: "ДОБАВИТЬ В КЛАСТЕР",
        // ------------------------------------------

        // ** LOGS
        Logs_SystemLogs: "Системные логи",
        Logs_DetectionLog: "Лог обнаружений",
        Logs_EventLog: "Лог событий",
        Logs_buttonSave: "Сохранить логи",
        Logs_buttonClear: "Очистить логи",
        Logs_Name: "Имя события",
        Logs_Addr: "IP",
        Logs_State: "Состояние",
        Logs_Type: "Тип",
        Logs_Time: "Время"
    }
});

export default (mainPage_lang);
