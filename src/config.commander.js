import { program } from "commander";

program
    .option('-m, --mode <mode>', 'ambiente a trabajar', 'development')
    .option('-p, --port <number>', 'puerto a trabajar', 8080)
    .option('-d, --debug', 'variable para modo debug', false)
    .parse();

export default program;
