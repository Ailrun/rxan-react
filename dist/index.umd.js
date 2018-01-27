(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
	typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
	(factory((global.rxan = global.rxan || {}, global.rxan.react = {}),global.React));
}(this, (function (exports,React) { 'use strict';

React = React && React.hasOwnProperty('default') ? React['default'] : React;

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
    config = _extends({
      startPropName: 'start',
      stopPropName: 'stop',
      valuePropName: 'value'
    }, config);

    return function (_React$Component) {
      inherits(_class, _React$Component);

      function _class(props, context) {
        classCallCheck(this, _class);

        var _this = possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props, context));

        _this.state = {
          lastValue: undefined,
          subscription: undefined
        };

        _this.start = _this.start.bind(_this);
        _this.stop = _this.stop.bind(_this);
        return _this;
      }

      createClass(_class, [{
        key: 'start',
        value: function start() {
          var _this2 = this;

          this.setState(function (state) {
            if (state.subscription) {
              return {};
            }

            return {
              subscription: value$.subscribe(function (v) {
                _this2.setState({
                  lastValue: v
                });
              }, undefined, function () {
                _this2.setState({
                  subscription: undefined
                });
              })
            };
          });
        }
      }, {
        key: 'stop',
        value: function stop() {
          this.setState(function (state) {
            if (!state.subscription) {
              return {};
            }

            state.subscription.unsubscribe();

            return {
              subscription: undefined
            };
          });
        }
      }, {
        key: 'render',
        value: function render() {
          var _addedProps;

          var addedProps = (_addedProps = {}, defineProperty(_addedProps, config.startPropName, this.start), defineProperty(_addedProps, config.stopPropName, this.stop), defineProperty(_addedProps, config.valuePropName, this.state.lastValue), _addedProps);

          return React.createElement(C, _extends({}, this.props, addedProps));
        }
      }]);
      return _class;
    }(React.Component);
  };
};

exports.withRxan = withRxan;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.umd.js.map
