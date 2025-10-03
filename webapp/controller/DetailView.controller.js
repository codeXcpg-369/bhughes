sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast"
], function (Controller, MessageToast) {
  "use strict";

  return Controller.extend("app.projbhughes.controller.DetailView", {
    onInit: function () {
      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.getRoute("RouteDetailView").attachPatternMatched(this._onRouteMatched, this);

      
  var oViewModel = new sap.ui.model.json.JSONModel({
    isEditable: false
  });
  this.getView().setModel(oViewModel, "viewModel");

    },

    _onRouteMatched: function (oEvent) {
      var sIndex = oEvent.getParameter("arguments").index;
      var sPath = "/equipment/" + sIndex;

      this.getView().bindElement({
        path: sPath,
        model: "eqModel"
      });
    },
    
    onNavBack: function () {
  var oHistory = sap.ui.core.routing.History.getInstance();
  var sPreviousHash = oHistory.getPreviousHash();

  if (sPreviousHash !== undefined) {
    window.history.go(-1);
  } else {
    var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
    oRouter.navTo("RouteMasterView", {}, true);
  }
}
,
onToggleMode: function () {
  var oView = this.getView();
  var oViewModel = oView.getModel("viewModel");
  var bEditable = oViewModel.getProperty("/isEditable");

  oViewModel.setProperty("/isEditable", !bEditable);


  var oButton = oView.byId("modeToggleBtn");
  oButton.setText(bEditable ? "Display" : "Edit");


  var oSaveBar = oView.byId("saveBar");
  oSaveBar.setVisible(!bEditable);
},
onSave: function () {
  sap.m.MessageToast.show("Data saved successfully.");
}
  });
});