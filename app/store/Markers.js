/**
 * Store List of Markers, Features
 */

Ext.define('SmartIp.store.Markers', {
    extend: 'Ext.data.Store',
    // override currentPage property
    currentPage: 0,

    config: {
        model: 'SmartIp.model.Marker',
        pageSize: 5,
        proxy: {
            type: 'ajax',
            url: SmartIp.util.Config.getBaseurl() + "/proposals/app",      
            pageParam: 'page',
            limitParam: 'limit',
            reader: {
                type: 'json',
                rootProperty: 'nodes'
            }
        }

    }
});