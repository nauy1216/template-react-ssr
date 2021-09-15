import chalk from 'chalk'
export function log(...args) {
    console.log(chalk.bgRed(...args))
}