# rxan-react

[![npm latest version](https://img.shields.io/npm/v/rxan-react/latest.svg)](https://www.npmjs.com/package/rxan-react)
[![npm total download](https://img.shields.io/npm/dt/rxan-react.svg)](https://www.npmjs.com/package/rxan-react)
[![github license](https://img.shields.io/github/license/Ailrun/rxan-react.svg)](https://github.com/Ailrun/rxan-react/blob/master/LICENSE)
[![github latest tag](https://img.shields.io/github/tag/Ailrun/rxan-react.svg)](https://github.com/Ailrun/rxan-react/tags)
[![github commit from latest](https://img.shields.io/github/commits-since/Ailrun/rxan-react/latest.svg)](https://github.com/Ailrun/rxan-react)

[React] adaptor package for [rxan](https://github.com/Ailrun/rxan-core)

## Requirement

This package requires `react@^15||^16` and `rxjs@^5||^6` as peer dependencies.
You should install [React] and RxJS in your project to use this package.

## How to install

To use with `rxjs@^5`
```
npm install --save rxan-core rxan-react
```

To use with `rxjs@^6`
```
npm install --save rxan-core@alpha rxan-react
```

## How to use

### Demo

You can see a live example at [CodePen](https://codepen.io/ailrun/pen/MQgWeW).

### Code examples

Following examples assume that you use ES6 module. You can use ES6 module by using [Webpack] or [Rollup] or any other bundlers.

```javascript
import React from 'react'
import { duration, easing } from 'rxan-core'
import { withRxan } from 'rxan-react'

const animation = duration()(500) // Creates values of 0~1
  .map(easing.sine) // Adds easing function to values of 0~1
  .map((v) => v * 100) // Maps values of 0~1 to values of 0~100

class App extends React.Component {
  componentDidMount() {
    this.props.start()
  }

  render() {
    // uses 'style' props since we name so using `withRxan`
    return (
      <img style={this.props.style} src='https://www.shareicon.net/data/256x256/2016/07/08/117367_logo_512x512.png' />
    )
  }
}

export withRxan(animation, {
  // maps props for result values of animation observable
  mapAnimationToProps(value, start) {
    return {
      start,
      style: {
        transform: 'translateX(-' + value + '%)'
      }
    }
  },
})(App)
```

### API

- **withRxan(observable, config)(component)**
    - **observable**: any observable.
    - **config**: configuration for **withRxan**
        - **config.mapAnimationToProps(value, start, stop)**: mapping value, start, stop to props.  
          This function should returns object or `null`/`undefined`.
            - **value**: current value of observable
            - **start**: function to start observable
            - **stop**: function to stop observable
          Default value is
          ```javascript
          function (value, start, stop) {
            return {
              [config.valuePropName]: value,
              [config.startPropName]: start,
              [config.stopPropName]: stop,
            }
          }
          ```
        - **config.autoStartAt**: auto start observable when specified lifecycle method called.  
          Possible values are:
          `'nothing'`, `'constructor'`,
          `'componentDidMount'`, `'componentWillUpdate'`, `'componentDidUpdate'`.  
          Default value is `'nothing'`.  
          Some lifecycle methods are excluded as intended,
          because these lifecycle methods are not of the component passed to withRxan,
          but of the component that withRxan makes (in the other words, you cannot control those).  
          i.e., there is no state-related difference between `constructor` and `componentWillMount`,
          there is no `shouldComponentUpdate`-related difference between `componentReceiveProps` and `componentWillUpdate`, and so on.
          If you find any wierdness, please [make an issue on github](https://github.com/Ailrun/rxan-react/issues)
        - **config.stopBeforeAutoStart**: whether stop or does not before auto start.
        - ~**config.valuePropName**: name for result values of observable. Default value is `value`.~
        - ~**config.startPropName**: name for the function that start running the observable. Default value is `start`.~
        - ~**config.stopPropName**: name for the function that stop running the observable. Default value is `stop`~
    - **component**: any React component that accepts `config.mapAnimation(value, start, stop)` as part of props.

[Webpack]: https://webpack.js.org/
[Rollup]: https://rollupjs.org/guide/en
[React]: https://reactjs.org
