/**
 * List of Navigation-Points, Features
 */
Ext.define('SmartIp.store.Menu', {
    extend: 'Ext.data.Store',
    config: {
        // storeId: 'menuList',
        fields: [{
            name: 'label',
            type: 'string'
        }, {
            name: 'id',
            type: 'string'
        }, {
            name: 'iconClass',
            type: 'string'
        }, ],
        data: [{
            label: 'Add proposal',
            id: 'inputForm',
            iconClass: 'doc_compose2'
        }, {
            label: 'Proposal List',
            id: 'mainMarkers',
            iconClass: 'bulb'
        }, {
            label: 'Map',
            id: 'mainMap',
            iconClass: 'maps'
            //  },{
            // add if you add pages via information-store
            // label: 'Information',
            // id: 'mainInformation',
            // iconClass: 'info'
        }, {
            label: 'Sign up / Sign in',
            id: 'loginForm',
            iconClass: 'settings'
        }]
    }
});