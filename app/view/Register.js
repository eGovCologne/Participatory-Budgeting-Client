/**
 * SmartIP App
 * @author      Holger Kreis / Mark-a-Spot
 * @copyright   (c) 2013 Cologne City Council
 * @license     GNU General Public License (GPL) Version 2
 */
Ext.define('SmartIp.view.Register', {
    extend: 'Ext.form.Panel',
    xtype: 'register',

    id: 'registerForm',

    config: {
        items: [{
            xtype: 'toolbar',
            docked: 'top',
            title: 'Sign Up',
            items: [{
                flex: 1,
                xtype: 'component'
            }, {
                xtype: 'button',
                text: 'Done',
                align: 'right',
                id: 'registerBackButton'
            }]
        }, {
            xtype: 'fieldset',
            defaults: {
                labelWidth: '50%',
            },
            items: [{
                xtype: 'textfield',
                name: 'name',
                inputType: 'text',
                id: 'name',
                label: 'User Name',
                autoCapitalize: false,
                value: localStorage.getItem('credentialsUsername'),
                maxLength: 128,
                minLength: 2
            }, {
                xtype: 'textfield',
                label: 'E-mail',
                name: 'mail',
                inputType: 'mail',
                value: localStorage.getItem('credentialsE-mail'),
                id: 'e-mail',
            }, {
                xtype: 'textfield',
                label: 'Password',
                name: 'pass',
                inputType: 'password',
                id: 'pass',
            }, {
                xtype: 'textfield',
                label: 'Repeat Password',
                name: 'pass1',
                inputType: 'password',
                id: 'pass1',
            }],
            instructions: 'Please sign up for voting',

        }, {
            xtype: 'button',
            text: 'Sign Up',
            ui: 'confirm',
            id: 'registerSaveBtn'
        }]
    }
});