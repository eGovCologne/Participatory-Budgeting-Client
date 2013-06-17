/**
 * Start screen
 * SmartIP App
 * @author      Holger Kreis / Mark-a-Spot
 * @copyright   (c) 2013 Cologne City Council
 * @license     GNU General Public License (GPL) Version 2
 */
Ext.define('SmartIp.view.Start', {
    extend: 'Ext.Container',
    id: 'start',
    requires: [
        'Ext.device.Connection',
        'SmartIp.view.input.Form',
        'SmartIp.view.MainMap',
        'SmartIp.view.MainMarkers',
        'SmartIp.view.MainInformation',
        'SmartIp.view.Login',
        'SmartIp.view.Register',
        'SmartIp.store.Menu',
    ],
    config: {
        fullscreen: true,
        layout: {
            type: 'vbox',
        },
        items: [{
                xtype: 'carousel',
                items: [{
                    html: '<h3>Welcome</h3><p>Smart citizens in smart cities</p>',
                    cls: 'card1'
                }, {
                    html: '<h3>Signup</h3><p>to participate</p>',
                    cls: 'card2'
                }, {
                    html: '<h3>Add proposals</h3><p>Which features do you want</p>',
                    cls: 'card3'
                }, {
                    html: '<h3>Vote</h3><p>Vote your favs</p>',
                    cls: 'card4'
                }],

                height: 180
            }, {
                xtype: 'toolbar',
                title: 'Welcome',
                items: [{
                    id: 'loginBtn',
                    xtype: 'button',
                    iconCls: 'settings',
                    ui: 'plain',
                    iconMask: true
                }]
            }, {
                // Getting the Menue from Store
                xtype: 'list',
                id: 'menuList',
                store: 'Menu',
                cls: 'x-menue',
                itemTpl: [
                    '<div class="maslist x-menulist x-button x-button-plain x-iconalign-center"><span class="x-button-icon {iconClass} x-icon-mask"><span></div>{label}'
                ].join(''),
                flex: 2
            }

        ]
    },

    animateTo: function (direction, animType) {
        Ext.getCmp('viewport').getLayout().setAnimation({
            duration: 300,
            easing: 'ease-in-out',
            type: animType,
            direction: direction
        });
    }

});