/**
 * SmartIP App 
 * @author      Holger Kreis / Mark-a-Spot
 * @copyright   (c) 2013 Cologne City Council
 * @license     GNU General Public License (GPL) Version 2
 */

Ext.define('SmartIp.controller.Login', {
    extend: 'Ext.app.Controller',

    config: {
        control: {
            '#loginBackButton': {
                tap: function () {
                    Ext.getCmp('startScreen').animateTo('right', 'slide');
                    Ext.getCmp('viewport').setActiveItem('start');
                }
            },
            '#loginSaveBtn': {
                // calling event on settings button (id=#loginBtn)
                tap: 'onLoginSaveTap'
            }
        }
    },
    onLoginSaveTap: function() {

        var credentials = Ext.decode(localStorage.getItem('credentials'));

        setButton('loginSaveBtn',true);

        Ext.Ajax.request({
            url: SmartIp.util.Config.getBaseurl() + '/rest/user/login.json',
            method: 'POST',
            headers: {"X-CSRF-Token": localStorage.getItem('token')},
            params: Ext.getCmp('loginForm').getValues(),
            success: function(response, opts) {
                var text = Ext.decode(response.responseText);
                Ext.iterate(text, function(item, credential){
                    //console.log(credential);
                    localStorage.setItem(item, credential);
                    //console.log(localStorage.getItem(item));
                });
                localStorage.setItem('credentialsUsername', Ext.getCmp('username').getValue());
                localStorage.setItem('credentialsPassword', Ext.getCmp('password').getValue());
                setButton('loginSaveBtn',false);
                if(localStorage.getItem('credentialsUsername')) {
                    msg("Success", "You can now add personalized proposals and add votes to other content");
                    Ext.getCmp('start').animateTo('right', 'slide');
                    Ext.getCmp('viewport').setActiveItem('start');
                }
            },
            failure: function (response, opts){
                setButton('loginSaveBtn',false);
                //console.log(response.status);
                if (response.status == 401) { 
                    Ext.Msg.alert('', 'Please check username or password');
                }
                if (response.status == 406) { 
                    Ext.Msg.alert('', 'You are already logged in');
                }
            }
        }) 
    },
});