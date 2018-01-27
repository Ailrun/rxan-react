import React from 'react'

const withRxan = (value$, config) => (C) => {
  config = {
    startPropName: 'start',
    stopPropName: 'stop',
    valuePropName: 'value',
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
      const addedProps = {
        [config.startPropName]: this.start,
        [config.stopPropName]: this.stop,
        [config.valuePropName]: this.state.lastValue,
      }

      return (
        <C {...this.props} {...addedProps} />
      )
    }
  }
}
export {
  withRxan,
}
