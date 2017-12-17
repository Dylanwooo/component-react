
# JDesign

> A React-based UI toolkit for the JD.

## Demo
http://beta-h5.m.jd.com/active/jdesign-rough/index.html

## Install
```shell
yarn || npm i
yarn site || npm run site
```

## Structure

 * packages  
    * core 基本组件
    * theme-babel 样式库
    * datepicker  特殊组件
    * etc.


## Development

[Lerna](https://lernajs.io/) manages inter-package dependencies in this monorepo.
Builds are orchestrated via `lerna run` and NPM scripts.

__Prerequisites__: Node.js v7+, Yarn v1.0+ol lerna](https://lernajs.io/)


```shell
nrm add jd http://registry.m.jd.com

jnpm login

lerna bootstrap

lerna publish || jnpm publish
```

## more is coming
