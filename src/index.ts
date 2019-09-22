import * as readline from 'readline'
import * as fs from 'fs'

const args = process.argv.slice(2);

if(args && args.length){
    console.log('file operation')
}
else{
    promptCli()
}


function promptCli(){
	const prompts = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });
    prompts.question("", function (data: string) {
        console.log("out: " + data);
        promptCli()
    });
}

