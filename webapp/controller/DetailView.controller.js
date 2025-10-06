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

  var oView = this.getView();
  oView.bindElement({
    path: sPath,
    model: "eqModel"
  });

  var oEqModel = oView.getModel("eqModel");
  if (oEqModel) {
    oEqModel.setProperty("/statusOptions", [
      { key: "Standby", text: "Standby" },
      { key: "Retired", text: "Retired" },
      { key: "Operational", text: "Operational" },
      {key:"Decommissioned", text: "Decommissioned"}
    ]);
  }
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
  if (bEditable) {
  oButton.setText("Display");
  oButton.setIcon("sap-icon://display");
  } else {
  oButton.setText("Edit");
  oButton.setIcon("sap-icon://edit");
  }



  var oSaveBar = oView.byId("saveBar");
  oSaveBar.setVisible(!bEditable);
},
onSave: function () {
  sap.m.MessageToast.show("Data saved successfully.");
},




/////////////////////////////////////////////////////////////////////////

   

  });
});