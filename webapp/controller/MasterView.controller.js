sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/core/Fragment",
  "sap/ui/model/json/JSONModel"
], function (Controller, Fragment, JSONModel) {
  "use strict";

  return Controller.extend("app.projbhughes.controller.MasterView", {
    onInit: function () {

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
        oInner.scrollBy({ left: -800, behavior: "smooth" });
        this.getView().getModel("scrollModel").setProperty("/showLeftScroll", false);
      }
    },







    onSearch: function () {
      if (!this._searchDialog) {
        this._searchDialog = Fragment.load({
          name: "app.projbhughes.view.SearchDialog",
          controller: this
        }).then(function (oDialog) {
          this.getView().addDependent(oDialog);
          this._searchDialog = oDialog;
          oDialog.open();
        }.bind(this));
      } else {
        this._searchDialog.open();
      }
      const searchModel = new JSONModel({ results: [] });
      this.getView().setModel(searchModel, "searchModel");
    },

    onLiveSearch: function (oEvent) {
      const query = oEvent.getParameter("newValue").toLowerCase();
      const allItems = this.getView().getModel("eqModel").getProperty("/equipment");


      if (!allItems || !Array.isArray(allItems)) {
        console.warn("eqModel or /equipment path is missing or invalid");
        return;
      }

// for frgments
const filtered = allItems.filter(item => {
  const fields = [
    item.equipment_number,
    item.equipment_description,
    item.material,
    item.location?.location,
    item.general?.manufacturer_part_no,
    item.general?.object_type
  ];

  return fields.some(field => field?.toLowerCase().includes(query));
});


      const searchModel = new JSONModel({ results: filtered });
      this.getView().setModel(searchModel, "searchModel");
    },

onSearchItemPress: function (oEvent) {
  const selectedItem = oEvent.getSource().getBindingContext("searchModel").getObject();
  const allItems = this.getView().getModel("eqModel").getProperty("/equipment");

  const index1 = allItems.findIndex(item =>
    item.equipment_number === selectedItem.equipment_number
  );

  if (index1 !== -1) {
    const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
    oRouter.navTo("RouteDetailView", { index: index1 });
  } else {
    console.warn("Selected item not found in eqModel");
  }

  this._searchDialog.close();
}
,

    onCloseSearchDialog: function () {
      if (this._searchDialog) {
        this._searchDialog.close();
      }
    }

  });
});