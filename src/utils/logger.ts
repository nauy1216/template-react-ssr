import chalk from 'chalk'
export function log(...args: string[]) {
    console.log(chalk.bgRed(...args))
}