const result = require('./check-result');

/**
 * Provides the ability to check the current environment
 * with platform-dependent modules. This class handles
 * registration of checking modules and has some convenience methods.
 *
 * @param platformCheckers object {platformName: 'path-for-require'}
 *                         where platformName is the name returned by os.platform()
 *
 * @param requiredChecks array of strings with names of checks that should return result
 *                       even when the platform module doesn't have a method for it or
 *                       fails during the check.
 *
 * All check methods' must have name that identifies the check followed by "Check" suffix.
 * All check methods must be async or return promises
 * All check promises should resolve object:
 * {status: ["unknown"|"failed"|"warning"|"info"|"passed"], details: undefined|object}
 */
module.exports = exports = function(platformCheckers, requiredChecks = []) {
    this.platformChecker = platformCheckers ? platformCheckers[process.platform] : null;
    if (typeof(this.platformChecker) === 'undefined') {
        this.platformChecker = null;
    } else if (this.platformChecker != null) {
        try {
            this.platformChecker = module.parent.require(this.platformChecker);
        } catch(e) {
            console.error(`Failed requiring platformChecker for platform ${process.platform}:`, e);
        }
    }

    // Register required checks
    var registeredChecks = requiredChecks;
    // Also add platform checks
    if (platformChecker) {
        Object.keys(platformChecker).forEach((name) => {
            if (
                (checkDetails = /^(.*)Check$/.exec(name)) &&
                (typeof(platformChecker[name]) === 'function') &&
                (registeredChecks.indexOf(checkDetails[1]) === -1)
            ) {
                registeredChecks.push(checkDetails[1]);
            }
        });
    }

    /**
     * Returns check function (or null if no function for check exists)
     * @param checker checker module to get function from
     * @param checkName name of check to get function for
     */
    function getCheckFunction(checker, checkName) {
        if (checker === null) {
            return null;
        }

        var checkFunction = checker[checkName + 'Check'];
        if (checkFunction !== undefined && typeof(checkFunction) === 'function') {
            return checkFunction;
        }
        return null;
    }

    /**
     * Checks every registered check with provided checker
     *
     * When checker doesn't have a method for the check,
     * adds result.UNSUPPORTED as a result of check
     *
     * @param checker checker module to check with
     */
    async function checkEverything(checker) {
        var checkResult = {};
        for (var i = 0; i < registeredChecks.length; i++) {
            var checkName = registeredChecks[i];
            var checkFunction = getCheckFunction(checker, checkName);

            if (checkFunction !== null) {
                checkResult[checkName] = await checkFunction();
            } else {
                checkResult[checkName] = {status: result.UNSUPPORTED}
            }
        }
        return checkResult;
    }

    /**
     * Returns promise that resolves to the result of chosen check.
     * If no specific check is chosen, all checks are performed.
     *
     * @param what check name, optional
     */
    this.check = (what) => {
        if (what === undefined) {
            return checkEverything(this.platformChecker);
        }

        var checkFunction = getCheckFunction(this.platformChecker, what);
        if (checkFunction !== null) {
            return checkFunction();
        }

        var status;
        if (registeredChecks.indexOf(what) !== -1) {
            // Check is registered, but unsupported by the platform
            reason = result.UNSUPPORTED;
        } else {
            // Check is not registered at all
            reason = result.WHATCHECK;
        }
        return new Promise((resolve) => resolve({status}))
    }

    return this;
}