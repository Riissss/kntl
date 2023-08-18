console.log('Ejecutando el Bot mas shidori tercer mundista.\nComenzando ejecucion del script...');

import { join, dirname } from 'path'
import { createRequire } from 'module'
import { fileURLToPath } from 'url'
import { setupMaster, fork } from 'cluster'
import { watchFile, unwatchFile } from 'fs'
import cfonts from 'cfonts';
import { createInterface } from 'readline'
import Helper from './lib/helper.js'
import chalk from 'chalk'

const __dirname = dirname(fileURLToPath(import.meta.url))
const require = createRequire(__dirname)
const { name, author } = require(join(__dirname, './package.json'))
const { say } = cfonts
const rl = createInterface(process.stdin, process.stdout)
say(`${name}`, { font: 'simple', color: 'candy', align: 'center', gradient: ["red","blue"]})
var isRunning = false
/** @param {String} file `path/to/file`*/
function start(file) { if (isRunning) return; isRunning = true
  let args = [join(__dirname, file), ...process.argv.slice(2)]
  say([process.argv[0], ...args].join(' '), { font: 'console', align: 'center', gradient: ['red', 'magenta']})
  setupMaster({ exec: args[0], args: args.slice(1),})
  let p = fork(); p.on('message', data => { console.log('\n[RECIBIDO] ', data+'\n'); switch (data) { case 'r': p.process.kill(); isRunning = false; start.apply(this, arguments); break; case 'uptime': p.send(process.uptime()); break}})
  p.on('exit', (_, code) => { isRunning = false; console.error(chalk.bgRed('\n\n[!] Salió del código : '), chalk.bgWhite(code+'\n')); if (code === 0) return watchFile(args[0], () => { unwatchFile(args[0]); start(file)})})
  if (!Helper.opts['test']) if (!rl.listenerCount()) rl.on('line', line => { p.emit('message', line.trim())})}

start('main.js')
