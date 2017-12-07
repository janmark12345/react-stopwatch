'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stopwatch = function (_React$Component) {
  _inherits(Stopwatch, _React$Component);

  function Stopwatch(props) {
    _classCallCheck(this, Stopwatch);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.start = function () {
      if (!_this.state.running) {
        _this.setState({ running: true });
        _this.watch = setInterval(function () {
          return _this.step();
        }, 10);
      }
    };

    _this.stop = function () {
      _this.setState({ running: false });
      clearInterval(_this.watch);
    };

    _this.step = function () {
      if (!_this.state.running) return;
      _this.calculate();
      _this.print();
    };

    _this.reset = function () {
      _this.setState({
        minutes: 0,
        seconds: 0,
        miliseconds: 0,
        text: '00:00:00',
        laps: []
      });
      console.log(_this.state.seconds);
    };

    _this.print = function () {
      _this.setState({ text: _this.format() });
    };

    _this.format = function () {
      return pad0(_this.state.minutes) + ':' + pad0(_this.state.seconds) + ':' + pad0(_this.state.miliseconds);
    };

    _this.calculate = function () {
      _this.state.miliseconds += 1;
      if (_this.state.miliseconds >= 100) {
        _this.state.seconds += 1;
        _this.state.miliseconds = 0;
      }
      if (_this.state.seconds >= 60) {
        _this.state.minutes += 1;
        _this.state.seconds = 0;
      }
    };

    _this.lap = function () {
      if (_this.state.running) {
        _this.setState({ laps: _this.state.laps.concat(_this.state.text) });
      }
    };

    _this.state = {
      laps: [],
      text: '00:00:00',
      running: false,
      miliseconds: 0,
      seconds: 0,
      minutes: 0
    };

    return _this;
  }

  Stopwatch.prototype.render = function render() {
    return React.createElement(
      'div',
      { className: 'main' },
      React.createElement(
        'div',
        { className: 'stopwatch' },
        this.state.text
      ),
      React.createElement(
        'nav',
        null,
        React.createElement(
          'button',
          { className: 'start', onClick: this.start },
          'start'
        ),
        React.createElement(
          'button',
          { className: 'start', onClick: this.stop },
          'stop'
        ),
        React.createElement(
          'button',
          { onClick: this.reset },
          'reset'
        ),
        React.createElement(
          'button',
          { onClick: this.lap },
          'lap'
        )
      ),
      React.createElement(
        'ul',
        { className: 'results' },
        this.state.laps.map(function (lapTime) {
          return React.createElement(
            'li',
            null,
            lapTime
          );
        })
      )
    );
  };

  return Stopwatch;
}(React.Component);

;

function pad0(value) {
  var result = value.toString();
  if (result.length < 2) {
    result = '0' + result;
  }
  return result;
}

var app = React.createElement(Stopwatch);
ReactDOM.render(app, document.getElementById('app'));