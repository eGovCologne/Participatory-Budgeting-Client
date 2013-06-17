/**
 * Store List of Markers, Features
 */

Ext.define('SmartIp.store.Information', {
    extend: 'Ext.data.Store',

    config: {
        model: 'SmartIp.model.Information',
        autoLoad: true,
        pageSize: 5,

        proxy: {
            type: 'ajax',
            url: SmartIp.util.Config.getBaseurl() + "/pages/json/list",
            pageParam: '',
            limitParam: '',
            reader: {
                type: 'json',
                rootProperty: 'nodes'
            }
        }

    }
});