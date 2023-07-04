# Browser Usage

Version 3.1.0 introduced official browser support.

Visit [Browser Support](../../browser-support/) for more information.

## Basic Usage

```tsx
import { CheckResult } from '@version-checker/api'
import versionCheck from '@version-checker/browser'
import { useState } from 'react'
import { useQuery } from 'react-query'

export default function App() {
    const { data, refetch } = useQuery<CheckResult['update'], any, CheckResult['update'], any>({
        queryKey: ['updater'],
        enabled: false,
        queryFn: async () => {
            const { update } = await versionCheck({
                owner: 'axelrindle',
                repo: 'github-version-checker',
                currentVersion: '1.2.3',
            })

            return update
        }
    })

    return (
        <>
            <button onClick={() => refetch()}>
                Check
            </button>
            <p>
                {isIdle ? (
                    <span>Hit <b>Reload</b> to check for updates.</span>
                ) : isLoading ? (
                    <span>Loading...</span>
                ) : isError ? (
                    <span>Error: {error.message}</span>
                ) : (
                    <>
                        <div>
                            {data === undefined ?
                                (
                                    <p>
                                        No update found.
                                    </p>
                                ) :
                                (
                                    <p>
                                        <b>{data?.name}</b>
                                    </p>
                                )
                            }
                        </div>
                        <div>{isFetching ? 'Fetching...' : null}</div>
                    </>
                )}
            </p>
        </>
    )
}
```
