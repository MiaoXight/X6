# x6-components

> React components for building x6 editors

[![MIT License](https://img.shields.io/badge/license-MIT_License-green.svg?style=flat-square)](https://github.com/antvis/x6/blob/master/LICENSE) 
[![Language](https://img.shields.io/badge/language-typescript-blue.svg?style=flat-square)](https://www.typescriptlang.org)

[![NPM Package](https://img.shields.io/npm/v/@antv/x6-components.svg?style=flat-square)](https://www.npmjs.com/package/@antv/x6-components) 
[![NPM Downloads](http://img.shields.io/npm/dm/@antv/x6-components.svg?style=flat-square)](https://www.npmjs.com/package/@antv/x6-components) 
[![NPM Dependencies](https://img.shields.io/david/antvis/x6?path=packages%2Fx6-components&style=flat-square)](https://www.npmjs.com/package/@antv/x6-components)

## Components

- Menu
- Dropdown
- ContextMenu
- Menubar
- Toolbar
- SplitBox
- ScrollBox
- AutoScrollBox
- ColorPicker

## Installation

```shell
# npm
$ npm install @antv/x6-components --save

# yarn
$ yarn add @antv/x6-components
```

## Usage

Import component and style:

```ts
import { Menu } from '@antv/x6-components/es/menu'
// less
import '@antv/x6-components/es/menu/style'
// or css
import '@antv/x6-components/es/menu/style/index.css'
```

We strongly recommend using [babel-plugin-import](https://github.com/ant-design/babel-plugin-import), which can convert the following code to the '@antv/x6-components/es/xxx' way:

```ts
import { Menu } from '@antv/x6-components'
```

And this plugin will also load corresponding styles too. Via `.babelrc` or babel-loader:

```js
{
  "plugins": [
    [
      "import",
      {
        "libraryName": "@antv/x6-components",
        "libraryDirectory": "es", // es or lib
        "style": true,
        "transformToDefaultImport": true
      }
    ]
  ]
}
```

## Contributing

Pull requests and stars are highly welcome.

For bugs and feature requests, please [create an issue](https://github.com/antvis/x6/issues/new).
