/// <reference types="node/http" />

import { IncomingMessage } from "http"

interface CheckOptions {
	/**
	 * A personal access token used for private repositories or to increase
	 * the rate limit.
	 */
	token?: string

	/**
	 * The name of the Github repository to check.
	 */
	repo: string

	/**
	 * The owner of the repository.
	 */
	owner: string

	/**
	 * The current version of the application.
	 */
	currentVersion: string

	/**
	 * @deprecated
	 */
	reduceTraffic?: boolean

	/**
	 * Whether to fetch the repositories' git tags instead of the GitHub releases.
	 * Useful when no releases are created, but only tags.
	 */
	fetchTags?: boolean

	/**
	 * Setting this to true will fetch the latest release only.
	 */
	latestOnly?: boolean

	/**
	 * Excludes pre-releases from checks.
	 * Currently only works when no token is specified.
	 */
	excludePrereleases?: boolean
}

/**
 * Describes the structure of returned tag data.
 */
interface TagDescriptor {
	/**
	 * The name of the tag.
	 * 
	 * @example v1.2.3
	 */
	name: string
}

/**
 * Describes the structure of returned release data.
 */
interface ReleaseDescriptor {
	/**
	 * The name of this release.
	 */
	name: string

	/**
	 * The tag associated with this release.
	 */
	tag: TagDescriptor

	/**
	 * Whether this release is a pre-release.
	 */
	isPrerelease: boolean

	/**
	 * A datetime string indicating the time this release was published.
	 */
	publishedAt: string

	/**
	 * A url where details about this release can be viewed.
	 */
	url: string
}

type CallbackFunction = (error?: Error, update?: ReleaseDescriptor | TagDescriptor) => void

type RestHandlerFunction = (res: IncomingMessage) => void

export default function check(options: CheckOptions, callback: CallbackFunction): null | Promise<ReleaseDescriptor|TagDescriptor>
export = check
