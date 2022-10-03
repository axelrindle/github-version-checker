function write(stream: NodeJS.WriteStream, data: any) {
    stream.write(data)
}

export function print(data: any) {
    write(process.stdout, data)
}

export function printError(data: any) {
    write(process.stderr, data)
}
