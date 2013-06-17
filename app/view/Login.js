/**
 * SmartIP App
 * @author      Holger Kreis / Mark-a-Spot
 * @copyright   (c) 2013 Cologne City Council
 * @license     GNU General Public License (GPL) Version 2
 */
//console.log(homeButton);
Ext.define('SmartIp.view.Login', {
    extend: 'Ext.form.Panel',
    requires: [
        'SmartIp.controller.Login',
    ],
    xtype: 'viewLoginForm',

    id: 'loginForm',

    config: {
        items: [{
            xtype: 'toolbar',
            docked: 'top',
            title: 'Login',
            items: [{
                xtype: 'homeButton',
            }, {
                flex: 1,
                xtype: 'component'
            }, {
                id: 'registerBtn',
                xtype: 'button',
                text: 'Sign Up',
                ui: 'dark',
                align: 'right',
                iconMask: true
            }]
        }, {
            xtype: 'fieldset',
            defaults: {
                //labelAlign: 'right',
                labelWidth: '50%'
            },
            items: [{
                label: 'User Name',
                xtype: 'textfield',
                name: 'username',
                inputType: 'username',
                id: 'username',
                autoCapitalize: false,
                value: localStorage.getItem('credentialsUsername'),
                maxLength: 128,
                minLength: 3,
            }, {
                label: 'Password',
                xtype: 'textfield',
                name: 'password',
                inputType: 'password',
                value: localStorage.getItem('credentialsPassword'),
                id: 'password'
            }]
        }, {
            xtype: 'button',
            text: 'Sign in',
            ui: 'confirm',
            id: 'loginSaveBtn'
        }]
    }
});