sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/model/json/JSONModel",
    ],
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("knpltsiiasuser.knpltsiias.controller.FlexibleColumnLayout", {
            onInit: function () {
                this.oRouter = this.getOwnerComponent().getRouter();
                this.oRouter.attachRouteMatched(this.onRouteMatched, this);
                this.oRouter.attachBeforeRouteMatched(this.onBeforeRouteMatched, this);

                // Already saved values, if any
                this.oAPPColumnSizes = {
                    desktop: {
                        TwoColumnsMidExpanded: "25/75/0"
                    },
                    tablet: {
                        TwoColumnsMidExpanded: "40/50/100",
                        ThreeColumnsMidExpanded: "20/70/10"
                    }
                };

                this.oFCL = this.getView().byId("app");
                var oModel = new JSONModel(this.oAPPColumnSizes);
                this.getView().setModel(oModel, "columnsDistribution");
            },
            onBeforeRouteMatched: function (oEvent) {

                var oModel = this.getOwnerComponent().getModel();

                var sLayout = oEvent.getParameters().arguments.layout;

                // If there is no layout parameter, query for the default level 0 layout (normally OneColumn)
                if (!sLayout) {
                    var oNextUIState = this.getOwnerComponent().getHelper().getNextUIState(0);
                    sLayout = oNextUIState.layout;
                }

                // Update the layout of the FlexibleColumnLayout
                if (sLayout) {
                    oModel.setProperty("/layout", sLayout);
                }
            },
            onRouteMatched: function (oEvent) {
                var sRouteName = oEvent.getParameter("name"),
                    oArguments = oEvent.getParameter("arguments");

                this._updateUIElements();

                // Save the current route name
                this.currentRouteName = sRouteName;
                this.currentProduct = oArguments.product;
                this.currentSupplier = oArguments.supplier;
            },
            onColumnsDistributionChange: function (oEvent) {
                var sMedia = oEvent.getParameter("media"),
                    sLayout = oEvent.getParameter("layout"),
                    sColumnsSizes = oEvent.getParameter("columnsSizes"),
                    oModel = this.getView().getModel("columnsDistribution"),
                    sPath = `/${sMedia}/${sLayout}`;

                oModel.setProperty(sPath, sColumnsSizes);
            },
            onStateChanged: function (oEvent) {
                var bIsNavigationArrow = oEvent.getParameter("isNavigationArrow")
                var sLayout = oEvent.getParameter("layout");

                this._updateUIElements();

                // Replace the URL with the new layout if a navigation arrow was used
                if (bIsNavigationArrow) {
                    this.oRouter.navTo(this.currentRouteName, { layout: sLayout, product: this.currentProduct, supplier: this.currentSupplier }, true);
                }
            },
            _updateUIElements: function () {
                var oModel = this.getOwnerComponent().getModel();
                var oUIState = this.getOwnerComponent().getHelper().getCurrentUIState();

                // Check if the model and UI state are valid
                if (oModel && oUIState) {
                    oModel.setData(oUIState);
                } else {
                    console.error("Model or UI State is undefined:", oModel, oUIState);
                }
            },
            onExit: function () {
                this.oRouter.detachRouteMatched(this.onRouteMatched, this);
                this.oRouter.detachBeforeRouteMatched(this.onBeforeRouteMatched, this);
            }
        });
    }
);
