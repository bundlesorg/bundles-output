/*! bundles-output.js | @author brikcss <https://github.com/brikcss> | @reference https://github.com/brikcss/bundles-output */

const fs = require('fs-extra')
const path = require('path')

module.exports = (bundle = {}, bundler = {}) => {
  const cwd = process.cwd()
  // Set default options.
  bundler.options = Object.assign({
    to: cwd,
    root: cwd,
    fs: {
      encoding: 'utf8',
      flag: 'w'
    }
  }, bundler.options)
  // Create a promisess Array to later return.
  const promises = []
  // Iterate through each output file.
  bundle.output.forEach((file, i) => {
    // Determine the output path.
    let outputPath = typeof bundler.options.to === 'function'
      ? bundler.options.to(file, bundler, bundle)
      : path.resolve(bundler.options.to, bundler.options.root
        ? path.relative(bundler.options.root, file.source.path)
        : file.source.path)
    // Push promise to promises Array.
    promises.push(fs.outputFile(outputPath, file.content, bundler.options.fs))
  })
  // Once all promises resolve, return the bundle.
  return Promise.all(promises).then((results) => bundle)
}
