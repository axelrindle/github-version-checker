function write(stream: NodeJS.WriteStream, data: string, newline: boolean) {
    stream.write(data)
    if (newline) {
        stream.write('\n')
    }
}

export function print(data: string, newline = true) {
    write(process.stdout, data, newline)
}

export function printError(data: string, newline = true) {
    write(process.stdout, data, newline)
}
