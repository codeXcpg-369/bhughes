sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast"
], function (Controller, MessageToast) {
  "use strict";

  return Controller.extend("app.projbhughes.controller.DetailView", {
    onInit: function () {
      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.getRoute("RouteDetailView").attachPatternMatched(this._onRouteMatched, this);
    },

    _onRouteMatched: function (oEvent) {
      var sIndex = oEvent.getParameter("arguments").index;
      var sPath = "/equipment/" + sIndex;

      this.getView().bindElement({
        path: sPath,
        model: "eqModel"
      });
    },

    // onSavePress: function () {
    //   MessageToast.show("Save functionality not implemented yet.");
    // }
  });
});