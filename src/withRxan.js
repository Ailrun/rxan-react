import React from 'react'

const withRxan = (value$, config) => (C) => {
  if (config.startPropName !== undefined) {
    console.warn('Props \'startPropName\' is deprecated. Please use \'mapAnimationToProps\' instead.')
  }

  if (config.stopPropName !== undefined) {
    console.warn('Props \'stopPropName\' is deprecated. Please use \'mapAnimationToProps\' instead.')
  }

  if (config.valuePropName !== undefined) {
    console.warn('Props \'valuePropName\' is deprecated. Please use \'mapAnimationToProps\' instead.')
  }

  config = {
    startPropName: 'start',
    stopPropName: 'stop',
    valuePropName: 'value',
    mapAnimationToProps(value, start, stop) {
      return {
        [this.valuePropName]: value,
        [this.startPropName]: start,
        [this.stopPropName]: stop,
      }
    },
    ...config,
  }

  return class extends React.Component {
    constructor(props, context) {
      super(props, context)

      this.state = {
        lastValue: undefined,
        subscription: undefined,
      }

      this.start = this.start.bind(this)
      this.stop = this.stop.bind(this)
    }

    start() {
      this.setState((state) => {
        if (state.subscription) {
          return {}
        }

        return {
          subscription: value$.subscribe((v) => {
            this.setState({
              lastValue: v,
            })
          }, undefined, () => {
            this.setState({
              subscription: undefined,
            })
          }),
        }
      })
    }

    stop() {
      this.setState((state) => {
        if (!state.subscription) {
          return {}
        }

        state.subscription.unsubscribe()

        return {
          subscription: undefined,
        }
      })
    }

    render() {
      const addedProps =
        config.mapAnimationToProps(this.state.lastValue, this.start, this.stop)

      return (
        <C {...this.props} {...addedProps} />
      )
    }
  }
}
export {
  withRxan,
}
