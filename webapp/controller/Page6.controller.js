sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"./utilities",
	"sap/ui/core/routing/History"
], function(BaseController, MessageBox, Utilities, History) {
	"use strict";

	return BaseController.extend("com.sap.build.standard.untitledPrototype.controller.Page6", {
		handleRouteMatched: function(oEvent) {
			var oParams = oEvent.getParameters();
			this.currentRouteName = oParams.name;
			var sContext;
			if (oParams.arguments.midContext) {
				sContext = oParams.arguments.midContext;
			} else {
				if (this.getOwnerComponent().getComponentData()) {
					var patternConvert = function(oParam) {
						if (Object.keys(oParam).length !== 0) {
							for (var prop in oParam) {
								if (prop !== "sourcePrototype") {
									return prop + "(" + oParam[prop][0] + ")";
								}
							}
						}
					};

					sContext = patternConvert(this.getOwnerComponent().getComponentData().startupParameters);
				}
			}
			var sContextModelProperty = "/midContext";

			if (sContext) {

				var oPath = {
					path: "/" + sContext,
					parameters: {}
				};

				this.getView().bindObject(oPath);
				this.oFclModel.setProperty(sContextModelProperty, sContext);
			}

			var pageName = this.oView.sViewName.split('.');
			pageName = pageName[pageName.length - 1];

			if (pageName === this.currentRouteName) {
				this.oView.getModel('fclButton').setProperty('/visible', true);
			} else {
				this.oView.getModel('fclButton').setProperty('/visible', false);
			}

			if (oEvent.mParameters.arguments.layout && oEvent.mParameters.arguments.layout.includes('FullScreen')) {
				this.oFclModel.setProperty('/expandIcon/img', 'sap-icon://exit-full-screen');
				this.oFclModel.setProperty('/expandIcon/tooltip', 'Exit Full Screen Mode');
			} else {
				this.oFclModel.setProperty('/expandIcon/img', 'sap-icon://full-screen');
				this.oFclModel.setProperty('/expandIcon/tooltip', 'Enter Full Screen Mode');
			}

		},
		_onPageNavButtonPress: function() {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			var oQueryParams = this.getQueryParameters(window.location);

			if (sPreviousHash !== undefined || oQueryParams.navBackToLaunchpad) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("default", true);
			}

		},
		getQueryParameters: function(oLocation) {
			var oQuery = {};
			var aParams = oLocation.search.substring(1).split("&");
			for (var i = 0; i < aParams.length; i++) {
				var aPair = aParams[i].split("=");
				oQuery[aPair[0]] = decodeURIComponent(aPair[1]);
			}
			return oQuery;

		},
		_onButtonPress: function(oEvent) {

			oEvent = jQuery.extend(true, {}, oEvent);
			return new Promise(function(fnResolve) {
					fnResolve(true);
				})
				.then(function(result) {

					var oSource = oEvent.getSource();
					var oSourceBindingContext = oSource.getBindingContext();

					return new Promise(function(fnResolve, fnReject) {
						if (oSourceBindingContext) {
							var oModel = oSourceBindingContext.getModel();

							var oData = oModel._getObject("", oSourceBindingContext, true);

							if (!oData) {
								oModel.read(oSourceBindingContext.sPath, {
									success: function(oData) {
										var sKey = oModel.getKey(oData);
										oData["visibility"] = !oData["visibility"]
										oModel.update('/' + sKey, oData, {
											success: fnResolve,
											error: fnReject,
											refreshAfterChange: true
										});
									},
									error: fnReject
								});
							} else {
								var sKey = oModel.getKey(oData);
								oData["visibility"] = !oData["visibility"]
								oModel.update('/' + sKey, oData, {
									success: fnResolve,
									error: fnReject,
									refreshAfterChange: true
								});
							}
						}
					});

				}.bind(this))
				.then(function(result) {
					if (result === false) {
						return false;
					} else {

						var oSource = oEvent.getSource();
						var oSourceBindingContext = oSource.getBindingContext();

						return new Promise(function(fnResolve, fnReject) {
							if (oSourceBindingContext) {
								var oModel = oSourceBindingContext.getModel();

								var oData = oModel._getObject("", oSourceBindingContext, true);

								if (!oData) {
									oModel.read(oSourceBindingContext.sPath, {
										success: function(oData) {
											var sKey = oModel.getKey(oData);
											oData["visibility2"] = !oData["visibility2"]
											oModel.update('/' + sKey, oData, {
												success: fnResolve,
												error: fnReject,
												refreshAfterChange: true
											});
										},
										error: fnReject
									});
								} else {
									var sKey = oModel.getKey(oData);
									oData["visibility2"] = !oData["visibility2"]
									oModel.update('/' + sKey, oData, {
										success: fnResolve,
										error: fnReject,
										refreshAfterChange: true
									});
								}
							}
						});

					}
				}.bind(this)).catch(function(err) {
					if (err !== undefined) {
						MessageBox.error(err.message);
					}
				});
		},
		_onComboBoxSelectionChange: function() {
			return new Promise(function(fnResolve) {
				var sTargetPos = "";
				sTargetPos = (sTargetPos === "default") ? undefined : sTargetPos;
				sap.m.MessageToast.show("tetete", {
					onClose: fnResolve,
					duration: 2000 || 3000,
					at: sTargetPos,
					my: sTargetPos
				});
			}).catch(function(err) {
				if (err !== undefined) {
					MessageBox.error(err.message);
				}
			});

		},
		_onIconPress: function() {
			return new Promise(function(fnResolve) {
				var sTargetPos = "";
				sTargetPos = (sTargetPos === "default") ? undefined : sTargetPos;
				sap.m.MessageToast.show("tets", {
					onClose: fnResolve,
					duration: 2000 || 3000,
					at: sTargetPos,
					my: sTargetPos
				});
			}).catch(function(err) {
				if (err !== undefined) {
					MessageBox.error(err.message);
				}
			});

		},
		_onButtonPress1: function(oEvent) {

			oEvent = jQuery.extend(true, {}, oEvent);
			return new Promise(function(fnResolve) {
					fnResolve(true);
				})
				.then(function(result) {

					var oSource = oEvent.getSource();
					var oSourceBindingContext = oSource.getBindingContext();

					return new Promise(function(fnResolve, fnReject) {
						if (oSourceBindingContext) {
							var oModel = oSourceBindingContext.getModel();

							var oData = oModel._getObject("", oSourceBindingContext, true);

							if (!oData) {
								oModel.read(oSourceBindingContext.sPath, {
									success: function(oData) {
										var sKey = oModel.getKey(oData);
										oData["visibility"] = !oData["visibility"]
										oModel.update('/' + sKey, oData, {
											success: fnResolve,
											error: fnReject,
											refreshAfterChange: true
										});
									},
									error: fnReject
								});
							} else {
								var sKey = oModel.getKey(oData);
								oData["visibility"] = !oData["visibility"]
								oModel.update('/' + sKey, oData, {
									success: fnResolve,
									error: fnReject,
									refreshAfterChange: true
								});
							}
						}
					});

				}.bind(this))
				.then(function(result) {
					if (result === false) {
						return false;
					} else {

						var oSource = oEvent.getSource();
						var oSourceBindingContext = oSource.getBindingContext();

						return new Promise(function(fnResolve, fnReject) {
							if (oSourceBindingContext) {
								var oModel = oSourceBindingContext.getModel();

								var oData = oModel._getObject("", oSourceBindingContext, true);

								if (!oData) {
									oModel.read(oSourceBindingContext.sPath, {
										success: function(oData) {
											var sKey = oModel.getKey(oData);
											oData["visibility2"] = false;
											oModel.update('/' + sKey, oData, {
												success: fnResolve,
												error: fnReject,
												refreshAfterChange: true
											});
										},
										error: fnReject
									});
								} else {
									var sKey = oModel.getKey(oData);
									oData["visibility2"] = false;
									oModel.update('/' + sKey, oData, {
										success: fnResolve,
										error: fnReject,
										refreshAfterChange: true
									});
								}
							}
						});

					}
				}.bind(this)).catch(function(err) {
					if (err !== undefined) {
						MessageBox.error(err.message);
					}
				});
		},
		_onButtonPress2: function() {
			var oView = this.getView(),
				oController = this,
				status = true,
				requiredFieldInfo = [];
			if (requiredFieldInfo.length) {
				status = this.handleChangeValuestate(requiredFieldInfo, oView);
			}
			if (status) {
				return new Promise(function(fnResolve, fnReject) {
					var oModel = oController.oModel;

					var fnResetChangesAndReject = function(sMessage) {
						oModel.resetChanges();
						fnReject(new Error(sMessage));
					};
					if (oModel && oModel.hasPendingChanges()) {
						oModel.submitChanges({
							success: function(oResponse) {
								var oBatchResponse = oResponse.__batchResponses[0];
								var oChangeResponse = oBatchResponse.__changeResponses && oBatchResponse.__changeResponses[0];
								if (oChangeResponse && oChangeResponse.data) {
									var sNewContext = oModel.getKey(oChangeResponse.data);
									oView.unbindObject();
									oView.bindObject({
										path: "/" + sNewContext
									});
									if (window.history && window.history.replaceState) {
										window.history.replaceState(undefined, undefined, window.location.hash.replace(encodeURIComponent(oController.sContext), encodeURIComponent(sNewContext)));
									}
									oModel.refresh();
									fnResolve();
								} else if (oChangeResponse && oChangeResponse.response) {
									fnResetChangesAndReject(oChangeResponse.message);
								} else if (!oChangeResponse && oBatchResponse.response) {
									fnResetChangesAndReject(oBatchResponse.message);
								} else {
									oModel.refresh();
									fnResolve();
								}
							},
							error: function(oError) {
								fnReject(new Error(oError.message));
							}
						});
					} else {
						fnResolve();
					}
				}).catch(function(err) {
					if (err !== undefined) {
						MessageBox.error(err.message);
					}
				});
			}
		},
		handleChangeValuestate: function(requiredFieldInfo, oView) {
			var status = true;
			if (requiredFieldInfo) {
				requiredFieldInfo.forEach(function(requiredinfo) {
					var input = oView.byId(requiredinfo.id);
					if (input) {
						input.setValueState("None"); //initially set ValueState to None
						if (input.getValue() === '') {
							input.setValueState("Error"); //input is blank set ValueState to error
							status = false;
						} else if (input.getDateValue && !input._bValid) { //since 1.64 ui5 will be providing a function 'isValidValue' that can be used here.
							input.setValueState("Error"); //Invalid Date set ValueState to error
							status = false;
						}
					}
				});
			}
			return status;

		},
		_onFileUploaderUploadComplete: function() {
			// Please implement

		},
		_onFileUploaderChange: function() {
			// Please implement

		},
		_onFileUploaderTypeMissmatch: function() {
			// Please implement

		},
		_onFileUploaderFileSizeExceed: function() {
			// Please implement

		},
		_onExpandButtonPress: function() {
			var endColumn = this.getOwnerComponent().getSemanticHelper().getCurrentUIState().columnsVisibility.endColumn;
			var isFullScreen = this.getOwnerComponent().getSemanticHelper().getCurrentUIState().isFullScreen;
			var nextLayout;
			var actionsButtonsInfo = this.getOwnerComponent().getSemanticHelper().getCurrentUIState().actionButtonsInfo;
			if (endColumn && isFullScreen) {
				nextLayout = actionsButtonsInfo.endColumn.exitFullScreen;
				nextLayout = nextLayout ? nextLayout : this.getOwnerComponent().getSemanticHelper().getNextUIState(2).layout;
			}
			if (!endColumn && isFullScreen) {
				nextLayout = actionsButtonsInfo.midColumn.exitFullScreen;
				nextLayout = nextLayout ? nextLayout : this.getOwnerComponent().getSemanticHelper().getNextUIState(1).layout;
			}
			if (endColumn && !isFullScreen) {
				nextLayout = actionsButtonsInfo.endColumn.fullScreen;
				nextLayout = nextLayout ? nextLayout : this.getOwnerComponent().getSemanticHelper().getNextUIState(3).layout;
			}
			if (!endColumn && !isFullScreen) {
				nextLayout = actionsButtonsInfo.midColumn.fullScreen;
				nextLayout = nextLayout ? nextLayout : 'MidColumnFullScreen'
			}
			var pageName = this.oView.sViewName.split('.');
			pageName = pageName[pageName.length - 1];
			this.oRouter.navTo(pageName, {
				layout: nextLayout
			});

		},
		_onCloseButtonPress: function() {
			var endColumn = this.getOwnerComponent().getSemanticHelper().getCurrentUIState().columnsVisibility.endColumn;
			var nextPage;
			var nextLevel = 0;

			var actionsButtonsInfo = this.getOwnerComponent().getSemanticHelper().getCurrentUIState().actionButtonsInfo;

			var nextLayout = actionsButtonsInfo.midColumn.closeColumn;
			nextLayout = nextLayout ? nextLayout : this.getOwnerComponent().getSemanticHelper().getNextUIState(0).layout;

			if (endColumn) {
				nextLevel = 1;
				nextLayout = actionsButtonsInfo.endColumn.closeColumn;
				nextLayout = nextLayout ? nextLayout : this.getOwnerComponent().getSemanticHelper().getNextUIState(1).layout;
			}

			var pageName = this.oView.sViewName.split('.');
			pageName = pageName[pageName.length - 1];
			var routePattern = this.oRouter.getRoute(pageName).getPattern().split('/');
			var contextFilter = new RegExp('^:.+:$');
			var pagePattern = routePattern.filter(function(pattern) {
				var contextPattern = pattern.match(contextFilter);
				return contextPattern === null || contextPattern === undefined;
			});

			var nextPage = pagePattern[nextLevel];
			this.oRouter.navTo(nextPage, {
				layout: nextLayout
			});

		},
		onInit: function() {

			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.attachRouteMatched(this.handleRouteMatched, this);
			this.oFclModel = this.getOwnerComponent().getModel("FclRouter");
			this.oFclModel.setProperty('/targetAggregation', 'midColumnPages');
			this.oFclModel.setProperty('/expandIcon', {});
			this.oView.setModel(new sap.ui.model.json.JSONModel({}), 'fclButton');

			this.oModel = this.getOwnerComponent().getModel();

		}
	});
}, /* bExport= */ true);
