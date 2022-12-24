import { exec } from 'child_process'

interface RunResult {
    stdout: string
    stderr: string
}

export async function run(args?: string|string[]): Promise<RunResult> {
    let _args = ''
    if (args !== undefined) {
        if (Array.isArray(args)) {
            _args = args.join(' ')
        } else {
            _args = args
        }
    }

    return new Promise<RunResult>((resolve, reject) => {
        exec('npx tsx src/index.ts ' + _args, (error, stdout, stderr) => {
            if (error) reject(error)
            else resolve({ stdout, stderr })
        })
    })
}

export function splice<T>(arr: T[], start: number, deleteCount?: number): T[] {
    const copy = Array.from(arr)
    copy.splice(start, deleteCount)
    return copy
}
