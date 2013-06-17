/**
 * SmartIP App 
 * @author      Holger Kreis / Mark-a-Spot
 * @copyright   (c) 2013 Cologne City Council
 * @license     GNU General Public License (GPL) Version 2
 */

Ext.define('SmartIp.view.MainInformation', {
    extend: 'Ext.navigation.View',
    xtype: 'mainViewInformation',
    id: 'mainInformation',

    requires: [
        'SmartIp.view.Information',
        'SmartIp.view.information.Show'
    ],

    config: {
        defaultBackButtonText: 'Information',
        autoDestroy: true,
        navigationBar: {
            items: [{
                xtype: 'homeInfoButton'
            }]
        },

        items: [
            { xtype: 'information' }
        ]
    },

    applyLayout: function(config) {
        config = config || {};

        if (Ext.os.is.Android) {
            config.animation = false;
        }

        return config;
    }
});
