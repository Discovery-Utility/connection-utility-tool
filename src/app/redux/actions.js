export const ADD_APPLIANCES = "ADD_APPLIANCES";

export function addAppliances(appliances) {
    return {type: ADD_APPLIANCES, appliances}
}