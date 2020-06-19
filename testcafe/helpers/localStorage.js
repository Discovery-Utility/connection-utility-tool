import {ClientFunction} from "testcafe";

/**
 * Testcafe wrapper for localStorage
 */
const getLocalStorageItem = ClientFunction(prop => {
    return localStorage.getItem(prop);
});

/**
 * Get the list of appliances or clusters from localStorage
 * @param {Boolean} isClusterList
 * @returns {[{}]}
 */
export async function parseLocalStorage(isClusterList) {
    const localStorage = JSON.parse(await getLocalStorageItem("message"));
    return localStorage.storages.filter(appliance => {
        return appliance.cluster === isClusterList;
    });
}
