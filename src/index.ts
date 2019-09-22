import * as readline from 'readline'
import * as fs from 'fs'
import inputProcessor from './inputProcessor'

const args = process.argv.slice(2)

if (args && args.length) {
    fs.readFile(process.argv[2], 'utf-8', function(err, data) {
        var arr = data ? data.split('\n') : []
        arr.forEach(input => console.log(inputProcessor(input)))
    })
} else {
    promptCli()
}

function promptCli() {
    const prompts = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false,
    })
    prompts.question('', function(data: string) {
        console.log(inputProcessor(data))
        promptCli()
    })
}
