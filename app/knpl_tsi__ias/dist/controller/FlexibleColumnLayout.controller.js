sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/model/json/JSONModel"],function(t,e){"use strict";return t.extend("knpltsiiasuser.knpltsiias.controller.FlexibleColumnLayout",{onInit:function(){this.oRouter=this.getOwnerComponent().getRouter();this.oRouter.attachRouteMatched(this.onRouteMatched,this);this.oRouter.attachBeforeRouteMatched(this.onBeforeRouteMatched,this);this.oAPPColumnSizes={desktop:{TwoColumnsMidExpanded:"25/75/0"},tablet:{TwoColumnsMidExpanded:"40/50/100",ThreeColumnsMidExpanded:"20/70/10"}};this.oFCL=this.getView().byId("app");var t=new e(this.oAPPColumnSizes);this.getView().setModel(t,"columnsDistribution")},onBeforeRouteMatched:function(t){var e=this.getOwnerComponent().getModel();var o=t.getParameters().arguments.layout;if(!o){var r=this.getOwnerComponent().getHelper().getNextUIState(0);o=r.layout}if(o){e.setProperty("/layout",o)}},onRouteMatched:function(t){var e=t.getParameter("name"),o=t.getParameter("arguments");this._updateUIElements();this.currentRouteName=e;this.currentProduct=o.product;this.currentSupplier=o.supplier},onColumnsDistributionChange:function(t){var e=t.getParameter("media"),o=t.getParameter("layout"),r=t.getParameter("columnsSizes"),n=this.getView().getModel("columnsDistribution"),i=`/${e}/${o}`;n.setProperty(i,r)},onStateChanged:function(t){var e=t.getParameter("isNavigationArrow");var o=t.getParameter("layout");this._updateUIElements();if(e){this.oRouter.navTo(this.currentRouteName,{layout:o,product:this.currentProduct,supplier:this.currentSupplier},true)}},_updateUIElements:function(){var t=this.getOwnerComponent().getModel();var e=this.getOwnerComponent().getHelper().getCurrentUIState();if(t&&e){t.setData(e)}else{console.error("Model or UI State is undefined:",t,e)}},onExit:function(){this.oRouter.detachRouteMatched(this.onRouteMatched,this);this.oRouter.detachBeforeRouteMatched(this.onBeforeRouteMatched,this)}})});
//# sourceMappingURL=FlexibleColumnLayout.controller.js.map