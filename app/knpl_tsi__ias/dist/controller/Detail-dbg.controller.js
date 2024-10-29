sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast) {
    "use strict";
    return Controller.extend("knpltsiiasuser.knpltsiias.controller.Detail", {
        onInit: function () {
            var oUserModel = new sap.ui.model.json.JSONModel();
            this.getView().setModel(oUserModel, "userModel");
            this.oUserModel = this.getOwnerComponent().getModel();

            this.oRouter = this.getOwnerComponent().getRouter();
            this.oRouter.getRoute("detail").attachPatternMatched(this._onUserMatched, this);
            this.oRouter.getRoute("detailGroup").attachPatternMatched(this._onUserMatched, this);
            this._userID = null;
            this._toggle = false;

            var _scrollTop = this.getView().byId("ObjectPageLayout");
            console.log(_scrollTop._oScroller)
            
        },

        _openGroups: function (ID) {
            var oNextUIState = this.getOwnerComponent().getHelper().getNextUIState(2);
            this.oRouter.navTo("detailGroup", {
                layout: oNextUIState.layout,
                userID: ID,
                groups: 'sales'
            });
        },

        _closeGroups: function (ID) {
            var sNextLayout = this.oUserModel.getProperty("/actionButtonsInfo/endColumn/closeColumn");
            this.oRouter.navTo("detail", {
                layout: sNextLayout,
                userID: ID
            }, true);
        },

        formatter: {
            fullName: function (firstName, lastName) {
                return lastName === null ? firstName : firstName + " " + lastName;
            },
            statusIcon: function (isTrue) {
                return Number(isTrue) === 1 ? "sap-icon://sys-enter-2" : "sap-icon://decline";
            },
            statusState: function (isTrue) {
                return Number(isTrue) === 1 ? "Success" : "Error";
            },
            nullState: function (rValue) {
                return rValue ? rValue : 'Not Available';
            }
        },

        handleClose: function () {
            var sNextLayout = this.oUserModel.getProperty("/actionButtonsInfo/midColumn/closeColumn");
            this.oRouter.navTo("list", { layout: sNextLayout });
        },

        _onUserMatched: function (oEvent) {
            this._userID = oEvent.getParameter("arguments").userID;
            this._userID = Number(this._userID);

            if (!isNaN(this._userID)) {
                this.getView().bindElement({
                    path: `/User(${this._userID})`,
                    model: "USERS_DATA",
                    parameters: {
                        expand: "SALES_GROUPS"
                    }
                });

                this._openGroups(this._userID);

            }
        },

        _scrollToTop: function () {
            var oObjectPageLayout = this.getView().byId("ObjectPageLayout");
        }
    });
});
