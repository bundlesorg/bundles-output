# Bundles Output Bundler

<!-- Shields. -->
<p>
    <!-- NPM version. -->
    <a href="https://www.npmjs.com/package/@bundles/bundles-output"><img alt="NPM version" src="https://img.shields.io/npm/v/@bundles/bundles-output.svg?style=flat-square"></a>
    <!-- NPM downloads/month. -->
    <a href="https://www.npmjs.com/package/@bundles/bundles-output"><img alt="NPM downloads per month" src="https://img.shields.io/npm/dm/@bundles/bundles-output.svg?style=flat-square"></a>
    <!-- Travis branch. -->
    <a href="https://github.com/brikcss/bundles-output/tree/master"><img alt="Travis branch" src="https://img.shields.io/travis/rust-lang/rust/master.svg?style=flat-square&label=master"></a>
    <!-- Codacy. -->
    <a href="https://www.codacy.com/app/thezimmee/bundles-core"><img alt="Codacy code grade" src="https://img.shields.io/codacy/grade/9b153e1a4e304f43bbb205cdb496ef6b/master.svg?style=flat-square"></a>
    <a href="https://www.codacy.com/app/thezimmee/bundles-core"><img alt="Codacy coverage" src="https://img.shields.io/codacy/coverage/9b153e1a4e304f43bbb205cdb496ef6b/master.svg?style=flat-square"></a>
    <!-- Coveralls -->
    <a href='https://coveralls.io/github/brikcss/bundles-output?branch=master'><img src='https://img.shields.io/coveralls/github/brikcss/bundles-output/master.svg?style=flat-square' alt='Coverage Status' /></a>
    <!-- JS Standard style. -->
    <a href="https://standardjs.com"><img alt="JavaScript Style Guide" src="https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square"></a>
    <!-- Prettier code style. -->
    <a href="https://prettier.io/"><img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square"></a>
    <!-- Semantic release. -->
    <a href="https://github.com/semantic-release/semantic-release"><img alt="semantic release" src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square"></a>
    <!-- Commitizen friendly. -->
    <a href="http://commitizen.github.io/cz-cli/"><img alt="Commitizen friendly" src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square"></a>
    <!-- MIT License. -->
    <a href="https://choosealicense.com/licenses/mit/"><img alt="License" src="https://img.shields.io/npm/l/express.svg?style=flat-square"></a>
    <!-- Greenkeeper. -->
    <a href="https://greenkeeper.io/"><img src="https://badges.greenkeeper.io/brikcss/bundles-output.svg?style=flat-square" alt="Greenkeeper badge"></a>
</p>

This is a bundler plugin for use with [Bundles](https://github.com/brikcss/bundles-core). `bundles-output` outputs the data and content compiled by Bundles to disk.

## Environment support

| Node | CLI | ES Module | Browser | UMD |
| :--: | :-: | :-------: | :-----: | :-: |
|  ✓   |  ✓  |     ✓     |    x    |  x  |

## Install

Make sure [Bundles core is installed](https://github.com/brikcss/bundles-core#install).

```sh
npm install @bundles/bundles-output -D
```

## Usage

See [configuring Bundles](https://github.com/brikcss/bundles-core#configuration) for details on configuring Bundles.

### Configuration

**IMPORTANT: Unless you know what you're doing, `bundles-output` should be the last bundler in the `config.bundlers` Array, since it should typically run after all other bundlers have run.**

The following properties are available in `bundler.options`:

- **`to`** _{String|Function}_ _(required)_ Directory to output compiled data to. Can be a callback Function which returns a String. If return value is falsy, or is not a String, the file will not be output.
- **`root`** _{String}_ _(process.cwd())_ Root directory for source input paths. For example, settings of `{ to: 'output', root: 'my/dir' }` with a source input of `['my/dir/one.md', 'my/dir/subdir/two.md']` will output files to `output/one.md` and `output/subdir/two.md`.
- **`fs`** Options passed to [fs-extra's `outputFile` method](https://github.com/jprichardson/node-fs-extra), which are the same options passed to [node fs's `writeFile` method](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback). This, for example, gives user control over whether existing files are overwritten. _Note: The `encoding` option is automatically set based on whether the file type is text/utf8 or binary._

### Example

```js
// Outputs `src/my/file.md` to `my/dir/my/file.md`.
const bundle = {
  input: 'src/my/file.md',
  bundlers: [
    {
      run: '@bundles/bundles-output',
      options: {
        to: 'my/dir',
        root: 'src',
        changedOnly: true,
      },
    },
  ],
};
```
