import { CallbackFunction, CheckOptions, CheckResult } from '@version-checker/api'
import check from './check'

/**
 * Performs the update check.
 *
 * @param options The options for the version check.
 * @returns {Promise<CheckResult>}
 */
function versionCheck(options: CheckOptions): Promise<CheckResult>

/**
 * Performs the update check.
 *
 * @param options The options for the version check.
 * @param callback A callback which receives the error or the result.
 */
function versionCheck(options: CheckOptions, callback: CallbackFunction): undefined

function versionCheck(
    options: CheckOptions,
    callback?: CallbackFunction
): undefined | Promise<CheckResult> {
    if (callback) {
        check(options)
            .then(update => callback(undefined, update))
            .catch(error => callback(error, undefined))
        return undefined
    } else {
        return check(options)
    }
}

export default versionCheck
//@ts-ignore
export = versionCheck
