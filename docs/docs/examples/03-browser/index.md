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
    const { data } = useQuery<CheckResult['update'], any, CheckResult['update'], any>({
        queryKey: ['updater'],
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
        <p>
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
        </p>
    )
}
```
