/**
 * SmartIP App 
 * @author      Holger Kreis / Mark-a-Spot
 * @copyright   (c) 2013 Cologne City Council
 * @license     GNU General Public License (GPL) Version 2
 */

Ext.define('SmartIp.controller.Register', {
    extend: 'Ext.app.Controller',

    config: {
        control: {
            '#registerBackButton': {
                tap: function () {
                    var loginForm = Ext.getCmp('loginForm');
                    if (loginForm) {
                        Ext.getCmp('viewport').setActiveItem(loginForm);
                    } else {
                        Ext.getCmp('viewport').setActiveItem({
                            xtype: 'viewLoginForm'
                        });
                    }
                 }
            },
            '#registerBtn': {
                // calling event on register button (id=#registerBtn)
                tap: 'onRegisterTap'
            },
            '#registerSaveBtn': {
                tap: 'onRegisterSaveTap'
            },
        }
    },

    onRegisterTap: function() {
        var registerForm = Ext.getCmp('registerForm');
        Ext.getCmp('start').animateTo('up','fade');
  
        if (registerForm) {
            Ext.getCmp('viewport').setActiveItem(registerForm);
        } else {
            Ext.getCmp('viewport').setActiveItem({
                xclass: 'SmartIp.view.Register'
            });
        }
        if(localStorage.getItem('credentialsUsername')) {
            Ext.Msg.alert('Achtung', 'Sie sind bereits registriert');  // accessing it      
        }

    },
    onRegisterSaveTap: function() {

        var credentials = Ext.decode(localStorage.getItem('credentials'));
        setButton('registerSaveBtn',true);

        if(Ext.getCmp('pass').getValue() != Ext.getCmp('pass1').getValue()) {
            Ext.Msg.alert('Achtung', 'Die Passwörter stimmen nicht überein');  // accessing it      
        }

        Ext.Ajax.request({
            url: SmartIp.util.Config.getBaseurl() + "/rest/user/register.json",
            method: 'POST',
            params: Ext.getCmp('registerForm').getValues(),
            headers: {"X-CSRF-Token": localStorage.getItem('token')},

            success: function(response, opts) {
                var response = Ext.decode(response.responseText);
                Ext.iterate(response, function(item, credential){
                    localStorage.setItem(item, credential);
                });
                localStorage.setItem('credentialsUsername', Ext.getCmp('name').getValue());
                Ext.getCmp('username').setValue(Ext.getCmp('name').getValue());
                Ext.getCmp('password').setValue(Ext.getCmp('pass').getValue());

                localStorage.setItem('credentialsPassword', Ext.getCmp('pass').getValue());
                localStorage.setItem('credentialsE-Mail', Ext.getCmp('e-mail').getValue());
                setButton('registerSaveBtn',false);

                Ext.Ajax.request({
                    url: SmartIp.util.Config.getBaseurl()  + '/rest/'  + 'user/logout.json',
                    method: 'POST'
                });
                Ext.Msg.alert('Erfolgreich', 'Sie haben sich mit dem Benutzernamen ' + Ext.getCmp('name').getValue() + ' registriert. Loggen Sie sich nun ein.');
                if (loginForm) {
                    Ext.getCmp('viewport').setActiveItem('loginForm');
                } else {
                    Ext.getCmp('viewport').setActiveItem({
                        xclass: 'SmartIp.view.Login'
                    });
                } 
                // accessing it      
            },
            failure: function (response, opts){
                setButton('registerSaveBtn',false);
                if (response.status == 406) { 
                    var errors = Ext.decode(response.responseText);
                    console.log(errors);
                    Ext.iterate(errors.form_errors, function (error, message) {
                        Ext.Msg.alert('Sorry', message);
                    });
                }
            }
        }) 
    },
});

