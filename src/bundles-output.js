/*! bundles-output.js | @author brikcss <https://github.com/brikcss> | @reference https://github.com/brikcss/bundles-output */

import fs from 'fs-extra'
import path from 'path'

export default (bundle = {}, bundler = {}) => {
  const cwd = process.cwd()
  // Set default options.
  const options = bundler.options = Object.assign({
    to: getOutputPath,
    dir: '',
    root: cwd,
    incremental: !!bundle.changed,
    fs: {
      encoding: 'utf8',
      flag: 'w'
    }
  }, bundler.options || {})
  // Create a promises Array to later return.
  const promises = []
  // Ensure options.to is a function.
  if (typeof options.to === 'string') options.dir = options.to
  if (typeof options.to !== 'function') options.to = getOutputPath
  // Iterate through each output file.
  bundle[options.incremental ? 'changed' : 'output'].forEach((file, i) => {
    // Determine the output path.
    let outputPath = options.to(file, bundler.options)
    // If outputPath is a string, add promise to output file.
    if (typeof outputPath === 'string') {
      const fsOptions = Object.assign({}, options.fs)
      file.to = outputPath
      if (file.isBuffer) fsOptions.encoding = null
      promises.push(fs.outputFile(outputPath, file.content, fsOptions))
    }
  });
  // Delete removed files from their previously output path.
  (bundle.removed || []).forEach((file, i) => {
    let outputPath = file.to || options.to(file, bundler)
    if (typeof outputPath === 'string') promises.push(fs.remove(outputPath))
  })
  // Once all promises resolve, return the bundle.
  return Promise.all(promises).then((results) => bundle)
}

function getOutputPath (file, options = {}) {
  return path.resolve(options.dir, options.root
    ? path.relative(options.root, file.source.path)
    : file.source.path)
}
