import React from 'react';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var withRxan = function withRxan(value$, config) {
  return function (C) {
    if (config.startPropName !== undefined) {
      console.warn('Config \'startPropName\' is deprecated. Please use \'mapAnimationToProps\' instead.');
    }

    if (config.stopPropName !== undefined) {
      console.warn('Config \'stopPropName\' is deprecated. Please use \'mapAnimationToProps\' instead.');
    }

    if (config.valuePropName !== undefined) {
      console.warn('Config \'valuePropName\' is deprecated. Please use \'mapAnimationToProps\' instead.');
    }

    config = _extends({
      startPropName: 'start',
      stopPropName: 'stop',
      valuePropName: 'value',
      autoStartAt: 'nothing',
      stopBeforeAutoStart: false,
      mapAnimationToProps: function mapAnimationToProps(value, start, stop) {
        var _ref;

        return _ref = {}, defineProperty(_ref, this.valuePropName, value), defineProperty(_ref, this.startPropName, start), defineProperty(_ref, this.stopPropName, stop), _ref;
      }
    }, config);

    switch (config.autoStartAt) {
      case 'nothing':
      case 'constructor':
      case 'componentDidMount':
      case 'componentWillUpdate':
      case 'componentDidUpdate':
        break;
      default:
        console.error('Config autoStartAt has invalid value. It should be one of the following.\n    undefined\n    \'nothing\'\n    \'constructor\'\n    \'componentDidMount\'\n    \'componentWillUpdate\'\n    \'componentDidUpdate\'');
    }

    return function (_React$Component) {
      inherits(_class, _React$Component);

      function _class(props, context) {
        classCallCheck(this, _class);

        var _this = possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props, context));

        _this.state = {
          lastValue: undefined
        };
        _this.subscription = undefined;

        _this.autoStart = _this.autoStart.bind(_this);
        _this.start = _this.start.bind(_this);
        _this.stop = _this.stop.bind(_this);

        if (config.autoStartAt === 'constructor') {
          _this.autoStart();
        }
        return _this;
      }

      createClass(_class, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
          if (config.autoStartAt === 'componentDidMount') {
            this.autoStart();
          }
        }
      }, {
        key: 'componentWillUpdate',
        value: function componentWillUpdate() {
          if (config.autoStartAt === 'componentWillUpdate') {
            this.autoStart();
          }
        }
      }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
          if (config.autoStartAt === 'componentDidUpdate') {
            this.autoStart();
          }
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          this.stop();
        }
      }, {
        key: 'autoStart',
        value: function autoStart() {
          if (config.stopBeforeAutoStart) {
            this.stop();
          }

          this.start();
        }
      }, {
        key: 'start',
        value: function start() {
          var _this2 = this;

          if (!this.subscription) {
            this.subscription = value$.subscribe(function (v) {
              _this2.setState({
                lastValue: v
              });
            }, undefined, function () {
              _this2.stop();
            });
          }
        }
      }, {
        key: 'stop',
        value: function stop() {
          if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = undefined;
          }
        }
      }, {
        key: 'render',
        value: function render() {
          var addedProps = config.mapAnimationToProps(this.state.lastValue, this.start, this.stop);

          return React.createElement(C, _extends({}, this.props, addedProps));
        }
      }]);
      return _class;
    }(React.Component);
  };
};

export { withRxan };
//# sourceMappingURL=index.esm.js.map
