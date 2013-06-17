/**
 * SmartIP App 
 * @author      Holger Kreis / Mark-a-Spot
 * @copyright   (c) 2013 Cologne City Council
 * @license     GNU General Public License (GPL) Version 2
 */

Ext.define('SmartIp.view.information.Show', {
    extend: 'Ext.Container',
    xtype: 'information-show',
    config: {
        id: "information-show",
        title: 'Information',
        baseCls: 'x-show-information',
        layout: 'vbox',

        items: [
            {
                id: 'contentInformation',
                xtype: 'panel',
                flex: 1,
                scrollable: true,
                tpl: [
                    '<div class="top">',
                        '<div class="title">{title}<span></span></div>',
                        '<div class="body">{Body}</div>',
                    '</div>'
                ].join('')
            }
        ],

        record: null
    },

    updateRecord: function(newRecord) {
        // Set Data to #content 
        if (newRecord) {
            this.down('#contentInformation').setData(newRecord.data);

            // this.down('map').setMapCenter({
            //     latitude: newRecord.data.latitude,
            //     longitude: newRecord.data.longitude
            // });
        }
    }
});
