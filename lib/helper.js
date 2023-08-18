// @ts-check
import yargs from 'yargs'
import os from 'os'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'
import { createRequire } from 'module'

/** @param {ImportMeta | string} pathURL */
const __filename = function filename(pathURL = import.meta, rmPrefix = os.platform() !== 'win32') { const path = /** @type {ImportMeta} */ (pathURL).url || /** @type {String} */ (pathURL); return rmPrefix ? /file:\/\/\//.test(path) ? fileURLToPath(path) : path : /file:\/\/\//.test(path) ? path : pathToFileURL(path).href}
/** @param {ImportMeta | string} pathURL */
const __dirname = function dirname(pathURL) { return path.dirname(__filename(pathURL, true))}
/** @param {ImportMeta | string} dir */
const __require = function require(dir = import.meta) { const path = /** @type {ImportMeta} */ (dir).url || /** @type {String} */ (dir); return createRequire(path)}
const opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
const prefix = global.Prefijo 



export default { __filename, __dirname, __require, opts, prefix }