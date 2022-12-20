import { CallbackFunction, CheckOptions, CheckResult } from '@github-version-checker/api'
import check from './check'

/**
 * The exported checking function.
 *
 * @param options The options for the version check.
 * @param callback An optional callback to pass the result to.
 *                 Can be omitted to return a Promise.
 */
export default function versionCheck(
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
