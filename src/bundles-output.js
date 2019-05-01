/*! bundles-output.js | @author brikcss <https://github.com/brikcss> | @reference https://github.com/brikcss/bundles-output */

import fs from 'fs-extra'
import path from 'path'

module.exports = (bundle = {}, bundler = {}) => {
  const cwd = process.cwd()
  // Set default options.
  bundler.options = Object.assign({
    to: cwd,
    root: cwd,
    changedOnly: !!bundler.changed,
    fs: {
      encoding: 'utf8',
      flag: 'w'
    }
  }, bundler.options)
  // Create a promises Array to later return.
  const promises = []
  // Iterate through each output file.
  bundle[bundler.options.changedOnly ? 'changed' : 'output'].forEach((file, i) => {
    // Determine the output path.
    let outputPath = typeof bundler.options.to === 'function'
      ? bundler.options.to(file, bundler, bundle)
      : path.resolve(bundler.options.to, bundler.options.root
        ? path.relative(bundler.options.root, file.source.path)
        : file.source.path)
    // If outputPath is a string, add promise to output file.
    if (typeof outputPath === 'string') {
      const fsOptions = Object.assign({}, bundler.options.fs)
      if (file.isBuffer) fsOptions.encoding = null
      promises.push(fs.outputFile(outputPath, file.content, fsOptions))
    }
  })
  // Once all promises resolve, return the bundle.
  return Promise.all(promises).then((results) => bundle)
}
