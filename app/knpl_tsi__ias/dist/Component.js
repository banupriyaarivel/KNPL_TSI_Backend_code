sap.ui.define(["sap/ui/core/UIComponent","sap/ui/Device","knpltsiiasuser/knpltsiias/model/models","sap/f/library","sap/f/FlexibleColumnLayoutSemanticHelper","sap/ui/model/json/JSONModel"],function(e,t,n,o,a,i){"use strict";var s=o.LayoutType;return e.extend("knpltsiiasuser.knpltsiias.Component",{metadata:{manifest:"json"},init:function(){e.prototype.init.apply(this,arguments);this.getRouter().initialize();var t={layout:"OneColumn"};var o=new i(t);this.setModel(o);this.setModel(n.createDeviceModel(),"device")},getHelper:function(){var e=this.getRootControl().byId("fcl");var t=new URLSearchParams(window.location.search);var n={defaultTwoColumnLayoutType:s.TwoColumnsMidExpanded,defaultThreeColumnLayoutType:s.ThreeColumnsMidExpanded,maxColumnsCount:t.get("max")};return a.getInstanceFor(e,n)}})});
//# sourceMappingURL=Component.js.map