sap.ui.define(["sap/ui/model/json/JSONModel","sap/ui/core/mvc/Controller"],function(e,t){"use strict";return t.extend("knpltsiiasuser.knpltsiias.controller.Groups",{onInit:function(){var e=new sap.ui.model.json.JSONModel;this.getView().setModel(e,"userModel");this.oUserModel=this.getOwnerComponent().getModel();this.oRouter=this.getOwnerComponent().getRouter();this.oModel=this.getOwnerComponent().getModel();this.oRouter.getRoute("detailGroup").attachPatternMatched(this._onGroupsMatched,this);this._userID=null},_onGroupsMatched:function(e){this._userID=e.getParameter("arguments").userID;this._userID=Number(this._userID);if(this._userID!==NaN){this.getView().bindElement({path:`/User(${this._userID})`,model:"USERS_DATA",parameters:{expand:"SALES_GROUPS"}})}},formatter:{statusState:function(e){if(e===1){return"Error"}else{return"Success"}}}})});
//# sourceMappingURL=Groups.controller.js.map