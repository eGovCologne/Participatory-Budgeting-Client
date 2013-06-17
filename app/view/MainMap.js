/**
 * SmartIP App
 * @author      Holger Kreis / Mark-a-Spot
 * @copyright   (c) 2013 Cologne City Council
 * @license     GNU General Public License (GPL) Version 2
 */
Ext.define('SmartIp.view.MainMap', {
    extend: 'Ext.navigation.View',
    xtype: 'mainViewMap',
    id: 'mainMap',

    config: {
        autoDestroy: false,
        defaultBackButtonText: 'Zurück',
        navigationBar: {
            // ui: 'sencha',
            items: [{
                xtype: 'homeButton'
            }, {
                id: 'locateButtonMap',
                xtype: 'button',
                iconMask: true,
                iconCls: 'locate3',
                align: 'left'
            }]
        },

        items: [{
            xtype: 'map',
            title: 'Map',
            id: 'contentMap',

            useCurrentLocation: false,
            mapOptions: {
                center: new google.maps.LatLng(SmartIp.util.Config.getIniLat(), SmartIp.util.Config.getIniLng()),
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                navigationControl: true,
                // http://www.svennerberg.com/2009/06/google-maps-api-3-map-settings/
                navigationControlOptions: {
                    style: google.maps.NavigationControlStyle.SMALL
                }
            }
        }]
    },

    applyLayout: function (config) {
        config = config || {};

        if (Ext.os.is.Android) {
            config.animation = false;
        }

        return config;
    }
});