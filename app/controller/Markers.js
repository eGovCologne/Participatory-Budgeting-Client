/**
 * SmartIP App
 * @author      Holger Kreis / Mark-a-Spot
 * @copyright   (c) 2013 Cologne City Council
 * @license     GNU General Public License (GPL) Version 2
 */
Ext.define('SmartIp.controller.Markers', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            main: 'mainViewMarkers',
            homeButton: 'homeMarkerButton',
            voteButton: '#voteButton',
            markers: 'markers',
            showMarker: 'marker-show',

        },

        control: {
            main: {
                push: 'onMainPush',
                pop: 'onMainPop',
                // verify if component is visible again
                remove: 'onMainRemove'
            },
            voteButton: {
                tap: 'onMarkerVote'
            },
            markers: {
                itemtap: 'onMarkerSelect'
            }
        }
    },

    onMainRemove: function (view, item) {
        this.showHomeButton();
    },

    onMainPush: function (view, item) {
        this.hideHomeButton();

        if (item.xtype == "marker-show") {
            this.getMarkers().deselectAll();
            this.showVoteButton();

        } else {
            this.hideVoteButton();
        }
    },

    onMainPop: function (view, item) {
        // ask for pre-xtype
        if (item.xtype == "marker-show") {
            this.hideVoteButton();
        } else {
            this.showVoteButton();
        }
    },

    onMarkerSelect: function (list, index, node, record) {
        if (!this.showMarker) {
            this.showMarker = Ext.create('SmartIp.view.marker.Show');
        }

        // Bind the record onto the show marker view
        this.showMarker.setRecord(record);

        // Push the show marker view into the navigation view
        this.getMain().push(this.showMarker);
    },

    onMarkerVote: function () {
        if (!this.actions) {
            this.actions = Ext.Viewport.add({
                xtype: 'actionsheet',
                // this is an implementation of a Star-Rating plugin, reduced to
                // pro and con - voting 
                items: [{
                    text: 'Ich stimme zu',
                    scope: this,
                    ui: 'confirm',
                    handler: function () {
                        myVote = 'pro';
                        this.onVote(myVote);
                        this.actions.hide();
                    }
                }, {
                    text: 'Ich stimme nicht zu',
                    scope: this,
                    ui: 'decline',
                    handler: function () {
                        myVote = 'con';
                        this.onVote(myVote);
                        this.actions.hide();

                    }
                }, {
                    text: 'Abbrechen',
                    scope: this,
                    //ui: 'decline',
                    handler: function () {
                        this.actions.hide();
                    }
                }]
            });
        }

        this.actions.show();
        // Bind the record onto the edit marker view
    },

    onVote: function () {

        // let's see what we get in here (node)
        //console.log(this.getShowMarker().getRecord());

        params = {};
        params.entity = 'node';

        if (myVote == 'con') {
            votingUrl = SmartIp.util.Config.getBaseurl() + '/likedislike/dislike/node/add';
        } else {
            votingUrl = SmartIp.util.Config.getBaseurl() + '/likedislike/like/node/add';
        }
        params.entityid = this.getShowMarker().getRecord().internalId;

        Ext.Ajax.request({
            url: votingUrl,
            method: 'GET',
            headers: {
                Cookie: localStorage.getItem('session_name') + '=' + localStorage.getItem('sessid')
            },
            headers: {
                "X-CSRF-Token": localStorage.getItem('token')
            },

            params: params,
            success: function (response, opts) {
                var response = Ext.decode(response.responseText);
                msg('OK', 'Stimme wurde gespeichert');
                Ext.getStore('Markers').load({
                    page: 0
                });

            },
            failure: function () {
                msg('Achtung', 'Sie müssen sich erst einloggen');
            }
        })
    },

    showHomeButton: function () {

        var homeButton = this.getHomeButton();

        if (!homeButton.isHidden()) {
            return;
        }

        //show the back button and then fade it in
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

    hideHomeButton: function () {

        var homeButton = this.getHomeButton();

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
                onEnd: function () {
                    homeButton.hide();
                }
            });
        }
    },

    showVoteButton: function () {

        var voteButton = this.getVoteButton();

        if (!voteButton.isHidden()) {
            return;
        }

        //show the edit button and then fade it in
        voteButton.show();

        if (!Ext.os.is.Android) {
            Ext.Animator.run({
                element: voteButton.element,
                from: {
                    opacity: 0
                },
                to: {
                    opacity: 1
                }
            });
        }
    },

    hideVoteButton: function () {

        var voteButton = this.getVoteButton();

        if (voteButton.isHidden()) {
            return;
        }

        // fade out vote button and then hide it

        if (!Ext.os.is.Android) {
            Ext.Animator.run({
                element: voteButton.element,
                from: {
                    opacity: 1
                },
                to: {
                    opacity: 0
                }
            });
        }

        voteButton.hide();

    }

});