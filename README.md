# rxan-react

React adaptor package for rxan

## Requirement

This package requires React@^15||^16 and RxJS@^5 as peer dependencies.
You should install react and rxjs in your project to use this package.

## How to install

```
npm install rxan-core rxan-react
```

## How to use

### Demo

You can see a live example at [CodePen](https://codepen.io/ailrun/pen/MQgWeW).

### Code examples

Following examples assumes that you use ES6 module. You can use ES6 module by using [webpack] or [rollup] or any other bundlers.

```javascript
import React from 'react'
import { duration, easing } from 'rxan-core'
import { withRxan } from 'rxan-react'

const animation = duration()(500) // Creates values of 0~1
  .map(easing.sine) // Adds easing function to values of 0~1
  .map((v) => v * 100) // Maps values of 0~1 to values of 0~100
  .map((v) => ({
    transform: 'translateX(-' + v + '%)',
  })) // Maps values of 0~100 to CSS style with a transform property

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
  valuePropName: 'style', // names props for result values of animation observable
})(App)
```

### API

- `withRxan(observable, config)(component)`
    - `observable`: any observable.
    - `config`: configuration for `withRxan`
        - `config.valuePropName`: name for result values of observable.
        - `config.startPropName`: name for the function that start running the observable.
        - `config.stopPropName`: name for the function that stop running the observable.
    - `component`: any React component that accepts `[config.valuePropName]`, `[config.startPropName]`, `config.stopPropName` as props.

[webpack]: https://webpack.js.org/
[rollup]: https://rollupjs.org/guide/en
