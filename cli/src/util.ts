export function print(data: any) {
    process.stdout.write(data)
}

export function printError(data: any) {
    process.stderr.write(data)
}
