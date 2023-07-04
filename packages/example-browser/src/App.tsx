import { CheckResult } from '@version-checker/api'
import versionCheck from '@version-checker/browser'
import { useQuery } from 'react-query'
import './App.css'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useState } from 'react'

function App() {
    const [currentVersion, setVersion] = useState('1.0.0')

    const {
        isIdle,
        isLoading,
        isError,
        data,
        error,
        isFetching,
        refetch
      } = useQuery<CheckResult['update'], any, CheckResult['update'], any>({
        queryKey: ['updater'],
        queryFn: async () => {
            const { update } = await versionCheck({
                owner: 'axelrindle',
                repo: 'github-version-checker',
                currentVersion,
            })

            console.log(update)

            return update
        }
    })

    return (
        <>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Vite + React</h1>
            <h2>@version-checker/browser sample</h2>

            <div>
                <button onClick={() => refetch()}>
                    Reload
                </button>

                <br />

                <input
                    type="text"
                    value={currentVersion}
                    onChange={e => setVersion(e.target.value)}
                />
            </div>

            <div className="card">
                {isIdle ? (
                    'Not ready...'
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

                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    )
}

export default App
