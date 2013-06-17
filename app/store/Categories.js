/**
 * List of Categories, their label and taxonomy id
 */
Ext.define('SmartIp.store.Categories', {
    extend: 'Ext.data.Store',
    config: {
        fields: [{
            name: 'label',
            type: 'string'
        }, {
            name: 'id',
            type: 'string'
        }, ],

        data: [{
            label: 'Category A',
            id: 1
        }, {
            label: 'Category B',
            id: 2
        }, {
            label: 'Category C',
            id: 3
        },{
            label: 'Category D',
            id: 4
        }]
    }
});