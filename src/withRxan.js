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
    autoStartAt: 'nothing',
    stopBeforeAutoStart: false,
    mapAnimationToProps(value, start, stop) {
      return {
        [this.valuePropName]: value,
        [this.startPropName]: start,
        [this.stopPropName]: stop,
      }
    },
    ...config,
  }

  switch (config.autoStartAt) {
  case 'nothing':
  case 'constructor':
  case 'componentDidMount':
  case 'componentWillUpdate':
  case 'componentDidUpdate':
    break
  default:
    console.error(`Config autoStartAt has invalid value.\
 It should be one of the following.
    undefined
    'nothing'
    'constructor'
    'componentDidMount'
    'componentWillUpdate'
    'componentDidUpdate'`)
  }

  return class extends React.Component {
    constructor(props, context) {
      super(props, context)

      this.state = {
        lastValue: undefined,
      }
      this.subscription = undefined

      this.autoStart = this.autoStart.bind(this)
      this.start = this.start.bind(this)
      this.stop = this.stop.bind(this)

      if (config.autoStartAt === 'constructor') {
        this.autoStart()
      }
    }

    componentDidMount() {
      if (config.autoStartAt === 'componentDidMount') {
        this.autoStart()
      }
    }

    componentWillUpdate() {
      if (config.autoStartAt === 'componentWillUpdate') {
        this.autoStart()
      }
    }

    componentDidUpdate() {
      if (config.autoStartAt === 'componentDidUpdate') {
        this.autoStart()
      }
    }

    componentWillUnmount() {
      this.stop()
    }

    autoStart() {
      if (config.stopBeforeAutoStart) {
        this.stop()
      }

      this.start()
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
