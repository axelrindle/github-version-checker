function write(stream: NodeJS.WriteStream, data: any, newline: boolean) {
    stream.write(data)
    if (newline) {
        stream.write('\n')
    }
}

export function print(data: any, newline = true) {
    write(process.stdout, data, newline)
}

export function printError(data: any, newline = true) {
    write(process.stdout, data, newline)
}
