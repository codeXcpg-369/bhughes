sap.ui.define([
  "sap/ui/core/mvc/Controller"
], function (Controller) {
  "use strict";

  return Controller.extend("app.projbhughes.controller.MasterView", {
    onInit: function () {
      // this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
      
    var oScrollModel = new sap.ui.model.json.JSONModel({
        showLeftScroll: false
    });
    this.getView().setModel(oScrollModel, "scrollModel");

    },

    onItemPress: function (oEvent) {
          console.log("Item pressed");
      var oItem = oEvent.getParameter("listItem");
      var oContext = oItem.getBindingContext("eqModel");

      var sPath = oContext.getPath(); 
      var sIndex = sPath.split("/")[2]; 

      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.navTo("RouteDetailView", {
        index: sIndex
      });
    },

onScrollRight: function () {
    var oInner = this.byId("scrollContainer").$().find(".sapMScrollContScroll")[0];
    if (oInner) {
        oInner.scrollBy({ left: 300, behavior: "smooth" });
        this.getView().getModel("scrollModel").setProperty("/showLeftScroll", true);
    }
},

onScrollLeft: function () {
    var oInner = this.byId("scrollContainer").$().find(".sapMScrollContScroll")[0];
    if (oInner) {
        oInner.scrollBy({ left: -300, behavior: "smooth" });
        this.getView().getModel("scrollModel").setProperty("/showLeftScroll", false);
    }
}

  });
});