'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
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
}

function _extends() {
  _extends = Object.assign || function (target) {
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

  return _extends.apply(this, arguments);
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

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

    config = _objectSpread2({
      startPropName: 'start',
      stopPropName: 'stop',
      valuePropName: 'value',
      autoStartAt: 'nothing',
      stopBeforeAutoStart: false,
      mapAnimationToProps: function mapAnimationToProps(value, start, stop) {
        var _ref;

        return _ref = {}, _defineProperty(_ref, this.valuePropName, value), _defineProperty(_ref, this.startPropName, start), _defineProperty(_ref, this.stopPropName, stop), _ref;
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
        console.error("Config autoStartAt has invalid value. It should be one of the following.\n    undefined\n    'nothing'\n    'constructor'\n    'componentDidMount'\n    'componentWillUpdate'\n    'componentDidUpdate'");
    }

    return (/*#__PURE__*/function (_React$Component) {
        _inherits(_class, _React$Component);

        function _class(props, context) {
          var _this;

          _classCallCheck(this, _class);

          _this = _possibleConstructorReturn(this, _getPrototypeOf(_class).call(this, props, context));
          _this.state = {
            lastValue: undefined
          };
          _this.subscription = undefined;
          _this.autoStart = _this.autoStart.bind(_assertThisInitialized(_this));
          _this.start = _this.start.bind(_assertThisInitialized(_this));
          _this.stop = _this.stop.bind(_assertThisInitialized(_this));

          if (config.autoStartAt === 'constructor') {
            _this.autoStart();
          }

          return _this;
        }

        _createClass(_class, [{
          key: "componentDidMount",
          value: function componentDidMount() {
            if (config.autoStartAt === 'componentDidMount') {
              this.autoStart();
            }
          }
        }, {
          key: "componentWillUpdate",
          value: function componentWillUpdate() {
            if (config.autoStartAt === 'componentWillUpdate') {
              this.autoStart();
            }
          }
        }, {
          key: "componentDidUpdate",
          value: function componentDidUpdate() {
            if (config.autoStartAt === 'componentDidUpdate') {
              this.autoStart();
            }
          }
        }, {
          key: "componentWillUnmount",
          value: function componentWillUnmount() {
            this.stop();
          }
        }, {
          key: "autoStart",
          value: function autoStart() {
            if (config.stopBeforeAutoStart) {
              this.stop();
            }

            this.start();
          }
        }, {
          key: "start",
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
          key: "stop",
          value: function stop() {
            if (this.subscription) {
              this.subscription.unsubscribe();
              this.subscription = undefined;
            }
          }
        }, {
          key: "render",
          value: function render() {
            var addedProps = config.mapAnimationToProps(this.state.lastValue, this.start, this.stop);
            return React.createElement(C, _extends({}, this.props, addedProps));
          }
        }]);

        return _class;
      }(React.Component)
    );
  };
};

exports.withRxan = withRxan;
//# sourceMappingURL=index.cjs.js.map
