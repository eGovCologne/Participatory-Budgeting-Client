
Ext.define('SmartIp.util.Config', {
    singleton : true,
    config : {
        baseurl : 'http://smartip-drupal',
        iniLat : "50.9374092",
        iniLng : "6.95794350000005",
        address : "Gülichplatz 1-3, 50676 Köln, Deutschland"
    },
    constructor : function(config) {
        this.initConfig(config);
        this.callParent([config]);
    }
});