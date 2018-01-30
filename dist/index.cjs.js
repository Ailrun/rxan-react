'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));

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
      console.warn('Props \'startPropName\' is deprecated. Please use \'mapAnimationToProps\' instead.');
    }

    if (config.stopPropName !== undefined) {
      console.warn('Props \'stopPropName\' is deprecated. Please use \'mapAnimationToProps\' instead.');
    }

    if (config.valuePropName !== undefined) {
      console.warn('Props \'valuePropName\' is deprecated. Please use \'mapAnimationToProps\' instead.');
    }

    config = _extends({
      startPropName: 'start',
      stopPropName: 'stop',
      valuePropName: 'value',
      mapAnimationToProps: function mapAnimationToProps(value, start, stop) {
        var _ref;

        return _ref = {}, defineProperty(_ref, this.valuePropName, value), defineProperty(_ref, this.startPropName, start), defineProperty(_ref, this.stopPropName, stop), _ref;
      }
    }, config);

    return function (_React$Component) {
      inherits(_class, _React$Component);

      function _class(props, context) {
        classCallCheck(this, _class);

        var _this = possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props, context));

        _this.state = {
          lastValue: undefined
        };
        _this.subscription = undefined;

        _this.start = _this.start.bind(_this);
        _this.stop = _this.stop.bind(_this);
        return _this;
      }

      createClass(_class, [{
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

exports.withRxan = withRxan;
//# sourceMappingURL=index.cjs.js.map
