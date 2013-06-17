/**
 * SmartIP App 
 * @author      Holger Kreis / Mark-a-Spot
 * @copyright   (c) 2013 Cologne City Council
 * @license     GNU General Public License (GPL) Version 2 onb behalf of City of cologne
 */

Ext.define('SmartIp.controller.Information', {
    extend: 'Ext.app.Controller',

    config: {
        routes: {
            'information/:id': 'showInformation'
        },
        refs: {
            main: 'mainViewInformation',
            homeButton: 'homeInfoButton',
            information: 'information',
            showInformation: 'information-show',
        },

        control: {
            main: {
                push: 'onMainPush',
                pop: 'onMainPop',
                // ask if component is visible again
                remove: 'onMainRemove'
            },

            information: {
                itemtap: 'onInformationSelect'
            }
        }
    },
    onMainRemove: function(view, item){
        this.showHomeButton();
    },

    onMainPush: function(view, item) {

        this.hideHomeButton();
     
        if (item.xtype == "information-show") {
            this.getInformation().deselectAll();
            this.hideHomeButton();
        } 
    },

    onMainPop: function(view, item) {
        // this.showInformation = null
        // ask for pre-xtype
        if (item.xtype == "information-show") {
            this.showHomeButton();           
        }
    },

    getRecordServer: function(record){

        Ext.Ajax.request({
            url: SmartIp.util.Config.getBaseurl() + '/de/pages/json/'+ record.data.Nid,
            success: function(response){
                if(Ext.getCmp('information-show')){
                    Ext.getCmp('information-show').destroy();
                }
                var response = Ext.decode(response.responseText);
                var newRecord = {};
                record.data = response.nodes[0].node;

                // if (!this.showInformation) {
                //     console.log("new showInformation");
                this.showInformation = Ext.create('SmartIp.view.information.Show');
                // }
                // Ext.create('SmartIp.view.information.Show')

                this.showInformation.setRecord(record);
                // Push the show contact view into the navigation view
                this.getMain().push(this.showInformation); 
                // console.log(Ext.getCmp('information-show'));
                Ext.Viewport.setMasked(false);

            },
            scope: this
        });
    },

    onInformationSelect: function(list, index, node, record) {
        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: 'Loading ...'
        });
        this.getMain().pop();
        this.getRecordServer(record);
    },

    showHomeButton: function() {

        var homeButton = this.getHomeButton();

        //show the home button and then fade it in
        homeButton.show();

        if (!Ext.os.is.Android) {
            Ext.Animator.run({
                element: homeButton.element,
                from: {
                    opacity: 0
                },
                to: {
                    opacity: 1
                }
            });
        }
    }, 

    hideHomeButton: function() {
        var homeButton = this.getHomeButton();
        homeButton.hide();

        if (Ext.os.is.Android) {
            homeButton.hide();
        } else {
                    
            Ext.Animator.run({
                element: homeButton.element,
                from: {
                    opacity: 1
                },
                to: {
                    opacity: 0
                },
                onEnd: function() {
                    homeButton.hide();
                }
            });
        }
    },


});
