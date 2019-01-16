/* eslint-env jest */
const fs = require('fs-extra')
const path = require('path')
const bundle = require('@bundles/core')
const bundlerOutput = require('../lib/bundles-output.js')

test('output bundles', () => {
  expect.assertions(5)
  return bundle({
    bundles: [{
      id: 'test',
      input: ['lib/bundles-output.js', 'test/bundles.spec.js'],
      bundlers: [{
        run: bundlerOutput,
        options: {
          to: '.temp'
        }
      }]
    }]
  }).then(result => {
    expect(result.success).toBe(true)
    expect(fs.pathExistsSync('.temp/lib/bundles-output.js')).toBe(true)
    expect(fs.readFileSync('.temp/lib/bundles-output.js', 'utf8')).toBe(fs.readFileSync('lib/bundles-output.js', 'utf8'))
    expect(fs.pathExistsSync('.temp/test/bundles.spec.js')).toBe(true)
    expect(fs.readFileSync('.temp/test/bundles.spec.js', 'utf8')).toBe(fs.readFileSync('test/bundles.spec.js', 'utf8'))
    fs.removeSync('.temp')
  })
})

test('output with a dynamic output path', () => {
  expect.assertions(3)
  return bundle({
    bundles: [{
      id: 'test',
      input: 'lib/bundles-output.js',
      bundlers: [{
        run: bundlerOutput,
        options: {
          to: (file) => `.temp/${path.basename(file.source.path)}`
        }
      }]
    }]
  }).then(result => {
    expect(result.success).toBe(true)
    expect(fs.pathExistsSync('.temp/bundles-output.js')).toBe(true)
    expect(fs.readFileSync('.temp/bundles-output.js', 'utf8')).toBe(fs.readFileSync('lib/bundles-output.js', 'utf8'))
    fs.removeSync('.temp')
  })
})

test('output relative to root directory', () => {
  expect.assertions(3)
  return bundle({
    bundles: [{
      id: 'test',
      input: 'lib/bundles-output.js',
      bundlers: [{
        run: bundlerOutput,
        options: {
          to: '.temp',
          root: 'lib'
        }
      }]
    }]
  }).then(result => {
    expect(result.success).toBe(true)
    expect(fs.pathExistsSync('.temp/bundles-output.js')).toBe(true)
    expect(fs.readFileSync('.temp/bundles-output.js', 'utf8')).toBe(fs.readFileSync('lib/bundles-output.js', 'utf8'))
    fs.removeSync('.temp')
  })
})
