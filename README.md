# rxan-react

[React](https://reactjs.org) adaptor package for [rxan](https://github.com/Ailrun/rxan-core)

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

Following examples assume that you use ES6 module. You can use ES6 module by using [webpack] or [rollup] or any other bundlers.

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
            - **value**: current value of observable
            - **start**: function to start observable
            - **stop**: function to stop observable
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
        - ~**config.valuePropName**: name for result values of observable.~
        - ~**config.startPropName**: name for the function that start running the observable.~
        - ~**config.stopPropName**: name for the function that stop running the observable.~
    - **component**: any React component that accepts `config.mapAnimation(value, start, stop)` as part of props.

[webpack]: https://webpack.js.org/
[rollup]: https://rollupjs.org/guide/en
