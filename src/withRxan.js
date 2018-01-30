import React from 'react'

const withRxan = (value$, config) => (C) => {
  if (config.startPropName !== undefined) {
    console.warn('Config \'startPropName\' is deprecated. Please use \'mapAnimationToProps\' instead.')
  }

  if (config.stopPropName !== undefined) {
    console.warn('Config \'stopPropName\' is deprecated. Please use \'mapAnimationToProps\' instead.')
  }

  if (config.valuePropName !== undefined) {
    console.warn('Config \'valuePropName\' is deprecated. Please use \'mapAnimationToProps\' instead.')
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
      }
      this.subscription = undefined

      this.start = this.start.bind(this)
      this.stop = this.stop.bind(this)
    }

    start() {
      if (!this.subscription) {
        this.subscription = value$.subscribe((v) => {
          this.setState({
            lastValue: v,
          })
        }, undefined, () => {
          this.stop()
        })
      }
    }

    stop() {
      if (this.subscription) {
        this.subscription.unsubscribe()
        this.subscription = undefined
      }
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
