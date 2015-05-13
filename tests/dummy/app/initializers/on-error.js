import PromiseMixin from "ember-promise/mixins/promise";
import ErrorHandler from "../utilities/error-handler";

export function initialize() {
    PromiseMixin.onError = function(json, textStatus, errorThrown) {
        ErrorHandler.accessed = true;
        ErrorHandler.json = json;
        ErrorHandler.textStatus = textStatus;
        ErrorHandler.errorThrown = errorThrown;
    };
}

export default {
    name: "on-error",
    initialize: initialize
};
