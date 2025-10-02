sap.ui.define([
    "sap/ui/core/UIComponent",
    "app/projbhughes/model/models"
], (UIComponent, models) => {
    "use strict";

    return UIComponent.extend("app.projbhughes.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {
            UIComponent.prototype.init.apply(this, arguments);
            // sap.ui.getCore().includeStyleSheet("css/style.css");
            this.getRouter().initialize();
            this.getRouter().navTo("RouteMasterView");
        }
    });
});