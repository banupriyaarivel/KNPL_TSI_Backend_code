sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    'sap/ui/model/Sorter',
    'sap/m/MessageBox',
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function (Controller, Filter, FilterOperator, Sorter, MessageBox, Fragment, JSONModel, MessageToast) {
    "use strict";

    return Controller.extend("knpltsiiasuser.knpltsiias.controller.List", {
        onInit: async function () {
            console.log('Application Started');

            var oNewUser = {
                ID: await this._newUserID(),
                FIRST_NAME: null,
                LAST_NAME: null,
                EMAIL: null,
                PROFILE_IMAGE: null,
                IS_ARCHIVED: 0,
                CREATED_AT: null,
                UPDATED_AT: null,
                APP_VERSION: null,
                LAST_LOGIN_AT: null,
                EMPLOYEE_CODE: null,
                ZONE: null,
                DESIGNATION: null,
                MANAGER: null,
                MOBILE: null,
                DIVISION_IDENTIFIER: null,
                IS_ACTIVATED: 0
            };

            var oNewUserSalesGroup = {
                ID: await this._newUserSalesGroupID(),
                UserID: null,
                SalesGroup: null,
                IsArchived: 0,
                CreatedAt: null,
                UpdatedAt: null
            };

            this._oNewIASUser = {
                familyName: null,
                givenName: null,
                userName: null,
                active: null,
                email: null,
                phoneNumber: null
            }

            console.log(JSON.stringify(this._oNewIASUser))

            var oNewUserModel = new JSONModel(oNewUser);
            this.getView().setModel(oNewUserModel, "newUser");

            var oNewUserSalesGroupModel = new JSONModel(oNewUserSalesGroup);
            this.getView().setModel(oNewUserSalesGroupModel, "newSalesGroup");



            this._bDescendingSort = false;
        },

        //  filter
        onLiveSearch: function (oEvent) {
            const aFilter = [];
            let sQuery = oEvent.getParameter("newValue");

            if (sQuery) {
                const oFirstNameFilter = new Filter("FIRST_NAME", FilterOperator.Contains, sQuery);
                aFilter.push(oFirstNameFilter);

                if (!isNaN(sQuery) && sQuery.trim() !== "") {
                    const oUserIDFilter = new Filter("ID", FilterOperator.EQ, Number(sQuery));
                    aFilter.push(oUserIDFilter);
                }
            }

            const oCombinedFilter = new Filter({ filters: aFilter, and: false });
            const oList = this.byId("usersTable");
            const oBinding = oList.getBinding("items");
            oBinding.filter(oCombinedFilter);
        },

        onSort: function () {
            this._bDescendingSort = !this._bDescendingSort;
            const oTable = this.getView().byId("usersTable"),
                oBinding = oTable.getBinding("items"),
                oSorter = new Sorter("ID", this._bDescendingSort);
            oBinding.sort(oSorter);
        },

        // Add new user
        onAdd: function () {
            if (!this.rDialog) {
                this.rDialog = Fragment.load({
                    id: this.getView().getId(),
                    name: "knpltsiiasuser.knpltsiias.fragments.register",
                    controller: this
                }).then(oDialog => {
                    this.getView().addDependent(oDialog);
                    return oDialog;
                });
            }
            this.rDialog.then(oDialog => oDialog.open());

        },

        onSubmit: function () {
            const oNewUserModel = this.getView().getModel("newUser");
            const oNewUserData = oNewUserModel.getData();

            const oNewUserSalesGroupModel = this.getView().getModel("newSalesGroup");
            const oNewUserSalesGroupData = oNewUserSalesGroupModel.getData();

            if (oNewUserData.FIRST_NAME && oNewUserData.EMAIL && oNewUserData.LAST_NAME && oNewUserSalesGroupData.SalesGroup) {
                oNewUserData.CREATED_AT = this._getCurrentTime();
                oNewUserSalesGroupData.CreatedAt = this._getCurrentTime();
                
                this._oNewIASUser.givenName = oNewUserData.FIRST_NAME;
                this._oNewIASUser.familyName = oNewUserData.LAST_NAME;
                this._oNewIASUser.userName = `${oNewUserData.FIRST_NAME} ${oNewUserData.LAST_NAME}`;
                this._oNewIASUser.email = oNewUserData.EMAIL;
                this._oNewIASUser.phoneNumber = oNewUserData.MOBILE;
                this._oNewIASUser.active = oNewUserData.IS_ACTIVATED ? true : false


                if (this._validateNewUserData(oNewUserData)) {
                    console.log("Validations passed");
                    this._checkUserExistence("EMAIL", oNewUserData.EMAIL);
                    console.log(this._oNewIASUser)
                    console.log(oNewUserData)
                }
            } else {
                MessageBox.error("Please fill in all required fields.");
            }
        },

        onCancel: function () {
            this.byId('registerDialog').close();
        },

        // List item press navigation
        onListItemPress: function (oEvent) {
            const oRouter = this.getOwnerComponent().getRouter();
            const oNextUIState = this.getOwnerComponent().getHelper().getNextUIState(1);
            const oSelectedItem = oEvent.getParameter("listItem");
            const oContext = oSelectedItem.getBindingContext("USERS_DATA");
            const sUserID = oContext.getObject().ID;

            oRouter.navTo("detail", {
                layout: oNextUIState.layout,
                userID: sUserID
            }, true);
        },

        // Validations
        _validateNewUserData: function (newData) {
            const EmailRegEx = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
            if (!newData.EMAIL.match(EmailRegEx)) {
                MessageBox.error('Please enter a valid email');
                return false;
            }
            if (newData.MOBILE.length !== 10) {
                MessageBox.error('Please enter a valid mobile number');
                return false;
            }
            return true;
        },

        _checkUserExistence: function (key, value) {
            let sUrl = this.getOwnerComponent().getModel("USERS_DATA").getServiceUrl();
            sUrl = `${sUrl}User?$filter=${key} eq '${value}'`;
            $.ajax({
                url: sUrl,
                type: "GET",
                contentType: "application/json",
                success: (oData) => this._validateUserExistence(oData.value, value),
                error: function () {
                    MessageBox.error('Error retrieving data');
                }
            });
        },

        _validateUserExistence: async function (Data, email) {
            if (Data.length === 1) {
                MessageBox.warning("Email is already registered");
            } else {
                const IASuserExist = await this._checkIASUser(email);
                if (IASuserExist) {
                    MessageBox.warning("Email is already registered in IAS");
                } else {
                    MessageBox.success("Registering new user", {
                        title: "Add user",
                        onClose: this._onRegisterUser.bind(this),
                    });
                }
            }
        },

        _onRegisterUser: async function () {
            console.log('Successfully registered');
            const oNewUserModel = this.getView().getModel("newUser");
            const oNewUserSalesGroupModel = this.getView().getModel("newSalesGroup");

            const oNewUserData = oNewUserModel.getData();
            const oNewUserSalesGroupData = oNewUserSalesGroupModel.getData();

            oNewUserSalesGroupData.UserID = oNewUserData.ID;
            oNewUserSalesGroupData.SalesGroup = this._formatSalesGroupID(oNewUserSalesGroupData.SalesGroup);

            console.log(oNewUserSalesGroupData, oNewUserData);
            await this._createUserInDatabase(oNewUserData, oNewUserSalesGroupData);

            // Reset the models
            oNewUserModel.setData({
                ID: await this._newUserID(),
                FIRST_NAME: null,
                LAST_NAME: null,
                EMAIL: null,
                PROFILE_IMAGE: null,
                IS_ARCHIVED: 0,
                CREATED_AT: null,
                UPDATED_AT: null,
                APP_VERSION: null,
                LAST_LOGIN_AT: null,
                EMPLOYEE_CODE: null,
                ZONE: null,
                DESIGNATION: null,
                MANAGER: null,
                MOBILE: null,
                DIVISION_IDENTIFIER: null,
                IS_ACTIVATED: 0
            });

            oNewUserSalesGroupModel.setData({
                ID: await this._newUserSalesGroupID(),
                UserID: null,
                SalesGroup: null,
                IsArchived: 0,
                CreatedAt: null,
                UpdatedAt: null
            });

            this._oNewIASUser = {
                familyName: null,
                givenName: null,
                userName: null,
                active: null,
                email: null,
                phoneNumber: null
            };

            this.onCancel()

        },

        // IAS User Checking
        _checkIASUser: async function (email) {
            this.showBusyDialog();
            const sUrl = this.getOwnerComponent().getModel("USERS_DATA").getServiceUrl();
            const data = { email };
            let exists = false;

            await $.ajax({
                url: `${sUrl}findMyUser`,
                type: "POST",
                data: JSON.stringify(data),
                contentType: "application/json",
                success: function (oData) {
                    if (oData.value.Resources) {
                        console.log('Email already registered in IAS');
                        exists = true;
                    }
                },
                error: function () {
                    MessageBox.error("Error");
                },
                complete: this.hideBusyDialog.bind(this)
            });

            return exists;
        },
        _createUserInDatabase: async function (newUserData, newUserSalesGroupData) {
            let sUrl = this.getOwnerComponent().getModel("USERS_DATA").getServiceUrl();
            
                await $.ajax({
                    url: `${sUrl}User`,
                    method: "POST",
                    data: JSON.stringify(newUserData),
                    contentType: 'application/json',
                });
                MessageToast.show('User Saved Successfully');
                await this._createUserSalesGroupInDatabase(newUserSalesGroupData);
                await this._createIASUser();
                this.onPostSuccess();
            
        },
        _createUserSalesGroupInDatabase: function (data) {
            let sUrl = this.getOwnerComponent().getModel("USERS_DATA").getServiceUrl();
            let that = this
            $.ajax({
                url: `${sUrl}UserSalesGroup`,
                method: "POST",
                data: JSON.stringify(data),
                contentType: 'application/json',
                success: function (data) {
                    MessageToast.show('User Sales Group Saved Successfully')
                    

                }.bind(this),
                error: function (error) {
                    console.log(error.responseJSON.error.message);
                }
            });
        },
        _createIASUser: function () {
            let sUrl = this.getOwnerComponent().getModel("USERS_DATA").getServiceUrl();
            let that = this
            $.ajax({
                url: `${sUrl}addMyUser`,
                method: "POST",
                data: JSON.stringify(that._oNewIASUser),
                contentType: 'application/json',
                success: function (data) {
                    console.log(data.value)
                    if (data.value.status === 'Success') {
                        MessageToast.show(data.value.message)
                        return
                    }
                    MessageBox.error(data.value.message)



                }.bind(this),
                error: function (error) {
                    console.log(error.responseJSON.error.message);
                }
            });
        },



        _getCurrentTime: function () {
            const createdAt = new Date();
            const formattedDate = createdAt.toISOString();
            return formattedDate
        },

        _formatSalesGroupID: function (value) {
            console.log(value.length, typeof value, value)
            let newValue;
            if (value.length === 1) {
                newValue = "00" + value
            } else if (value.length === 2) {
                newValue = "0" + value
            } else {
                newValue = value
            }

            return newValue
        },
        _newUserID: async function () {
            let newID;
            let sUrl = this.getOwnerComponent().getModel("USERS_DATA").getServiceUrl();
            sUrl = `${sUrl}User?$orderby=ID desc&$top=1`;
            await $.ajax({
                url: sUrl,
                method: "GET",
                success: function (oData) {
                    newID = oData.value[0].ID + 1
                },
                error: function (error) {
                    console.log(error)
                }
            })
            console.log(newID)
            return newID

        },
        _newUserSalesGroupID: async function () {
            let newID;
            let sUrl = this.getOwnerComponent().getModel("USERS_DATA").getServiceUrl();
            sUrl = `${sUrl}UserSalesGroup?$orderby=ID desc&$top=1`;
            await $.ajax({
                url: sUrl,
                method: "GET",
                success: function (oData) {
                    newID = oData.value[0].ID + 1
                },
                error: function (error) {
                    console.log(error)
                }
            })
            return newID

        },

        // Busy dialog handling
        showBusyDialog: function () {
            if (!this._pBusyDialog) {
                this._pBusyDialog = Fragment.load({
                    id: this.getView().getId(),
                    name: "knpltsiiasuser.knpltsiias.fragments.busyDialog",
                    controller: this
                }).then(oDialog => {
                    this.getView().addDependent(oDialog);
                    return oDialog;
                });
            }
            this._pBusyDialog.then(oDialog => oDialog.open());
        },

        hideBusyDialog: function () {
            if (this._pBusyDialog) {
                this._pBusyDialog.then(oDialog => oDialog.close());
            }
        },
        onPostSuccess: function () {
            var oModel = this.getView().getModel("USERS_DATA");
            if (oModel) {
                oModel.refresh();
            }
        }


    });
});
