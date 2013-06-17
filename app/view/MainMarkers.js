/**
 * SmartIP App 
 * @author      Holger Kreis / Mark-a-Spot
 * @copyright   (c) 2013 Cologne City Council
 * @license     GNU General Public License (GPL) Version 2
 */

/**
 * Main NavigationView to show a list and marker details
 *
 */


Ext.define('SmartIp.view.MainMarkers', {
    extend: 'Ext.navigation.View',
    xtype: 'mainViewMarkers',
    id: 'mainMarkers',

    requires: [
        'SmartIp.view.Markers',
        'SmartIp.view.marker.Show'
    ],

    config: {
        autoDestroy: false,
        defaultBackButtonText: 'Proposals',
        navigationBar: {
            // ui: 'sencha',
            items: [
                {
                    xtype: 'homeMarkerButton'
                },
                {
                    xtype: 'button',
                    id: 'voteButton',
                    text: 'Vote',
                    align: 'right',
                    hidden: true
                },
            ]
        },

        items: [
            { xtype: 'markers' }
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
