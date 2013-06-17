/**
 * SmartIP App 
 * @author      Holger Kreis / Mark-a-Spot
 * @copyright   (c) 2013 Cologne City Council
 * @license     GNU General Public License (GPL) Version 2
 */
Ext.define('SmartIp.controller.Start', {
    extend: 'Ext.app.Controller',
    
    config: {
        control: {
            '#loginBtn': {
                tap: 'onLoginTap'
            },
            '#menuList': {
                itemtap: 'onMenuTap'
            },
            
            // Define the controller action for the homeButton component

            'homeButton': {
                tap: function () {
                    Ext.getCmp('start').animateTo('right','slide');
                    Ext.getCmp('viewport').setActiveItem(Ext.getCmp('start'));
                }
            },
            'homeMarkerButton': {
                tap: function () {
                    Ext.getCmp('start').animateTo('right','slide');
                    Ext.getCmp('viewport').setActiveItem(Ext.getCmp('start'));
                }
            },
    
            'homeInfoButton': {
                tap: function () {
                    Ext.getCmp('start').animateTo('right','slide');
                    Ext.getCmp('viewport').setActiveItem(Ext.getCmp('start'));
                }
            },
        }
    },

    onLoginTap: function() {
        var loginForm = Ext.getCmp('loginForm');
        Ext.getCmp('start').animateTo('left', 'slide');
  
        if (loginForm) {
            Ext.getCmp('viewport').setActiveItem(loginForm);
        } else {
            Ext.getCmp('viewport').setActiveItem({
                            xtype: 'viewLoginForm'
            });
        }
    },

    onHomeTap: function() {
        Ext.getCmp('start').animateTo('right', 'slide');
        Ext.getCmp('viewport').setActiveItem('start');
        Ext.getCmp('homeButton').destroy();

    },

    onMenuTap: function(me, list, item, index) {

        Ext.getCmp('start').animateTo('left', 'slide');

        if(index.data.id == "inputForm"){

            var inputForm = Ext.getCmp('inputForm');

            if (inputForm) {
                Ext.getCmp('viewport').setActiveItem(inputForm);
            } else {
                Ext.getCmp('viewport').setActiveItem({
                    xclass: 'SmartIp.view.input.Form'
                });
            }
        }

        if(index.data.id == "loginForm"){
            
            var loginForm = Ext.getCmp('loginForm');
                      
            if (loginForm) {
                Ext.getCmp('viewport').setActiveItem(loginForm);
            } else {
                Ext.getCmp('viewport').setActiveItem({
                    xtype: 'viewLoginForm'
                });

            }

        }

        if(index.data.id == "mainMarkers"){
            
            var mainMarkers = Ext.getCmp('mainMarkers');
      
            if (mainMarkers) {
                Ext.getCmp('viewport').setActiveItem(mainMarkers);
            } else {
                Ext.getCmp('viewport').setActiveItem({
                    xtype: 'mainViewMarkers'
                });
            }

        }

        if(index.data.id == "mainMap"){

            var mainMap = Ext.getCmp('mainMap');
            //Ext.getCmp('startScreen').animateTo('left', 'slide');
          
            if (mainMap) {
                Ext.getCmp('viewport').setActiveItem(mainMap);
            } else {
                Ext.getCmp('viewport').setActiveItem({
                    xtype: 'mainViewMap'
                });
            }
        }

        // if(index.data.id == "mainInformation"){

        //     var mainInformation = Ext.getCmp('mainInformation');
          
        //     if (mainInformation) {
        //         Ext.getCmp('viewport').setActiveItem(mainInformation);
        //     } else {
        //         Ext.getCmp('viewport').setActiveItem({
        //             xtype: 'mainViewInformation'
        //         });
        //     }
        // }

    }

});
