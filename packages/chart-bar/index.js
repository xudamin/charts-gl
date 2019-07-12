(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('fs'), require('path')) :
  typeof define === 'function' && define.amd ? define(['fs', 'path'], factory) :
  (global = global || self, global.ChartBar = factory(global.fs, global.path));
}(this, function (fs, path) { 'use strict';

  fs = fs && fs.hasOwnProperty('default') ? fs['default'] : fs;
  path = path && path.hasOwnProperty('default') ? path['default'] : path;

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var chartBase = createCommonjsModule(function (module, exports) {
  (function (global, factory) {
     module.exports = factory() ;
  })(commonjsGlobal, function () {

    function styleInject(css, ref) {
      if (ref === void 0) ref = {};
      var insertAt = ref.insertAt;

      if (!css || typeof document === 'undefined') {
        return;
      }

      var head = document.head || document.getElementsByTagName('head')[0];
      var style = document.createElement('style');
      style.type = 'text/css';

      if (insertAt === 'top') {
        if (head.firstChild) {
          head.insertBefore(style, head.firstChild);
        } else {
          head.appendChild(style);
        }
      } else {
        head.appendChild(style);
      }

      if (style.styleSheet) {
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(document.createTextNode(css));
      }
    }

    var css = "*{margin:0;padding:0}body,html{width:100%;height:100%}body{background:#000}";
    styleInject(css);
    var name = "chart-base";
    var version = "1.0.1";

    var Base = function () {
      function Base(id) {
        this.id = id;
        this.init();
      }

      var _proto = Base.prototype;

      _proto.init = function init() {
        console.log("i am running " + name + " ----> " + version);
      };

      _proto.destroy = function destroy() {
        console.log('i am destroy');
      };

      return Base;
    }();

    return Base;
  });
  });

  var paths = new Map();

  var src = function () {
      return {
          resolveId: function (importee, importer) {
              if (importee === 'rollup-plugin-bundle-worker') {
                  return path.resolve(__dirname, 'workerhelper.js');
              }
              else if (importee.indexOf('worker!') === 0) {
                  var name = importee.split('!')[1],
                      target = path.resolve(path.dirname(importer), name);

                  paths.set(target, name);
                  return target;
              }
          },

          /**
           * Do everything in load so that code loaded by the plugin can still be transformed by the
           * rollup configuration
           */
          load: function (id) {
              if (!paths.has(id)) {
                  return;
              }

              var code = [
                      `import shimWorker from 'rollup-plugin-bundle-worker';`,
                      `export default new shimWorker(${JSON.stringify(paths.get(id))}, function (window, document) {`,
                      `var self = this;`,
                      fs.readFileSync(id, 'utf-8'),
                      `\n});`
                  ].join('\n');

              return code;
          }
      };
  };

  var Worker = new src("./src/workers/demo.worker.js", function (window, document) {
    this.addEventListener('message', function (e) {
      this.postMessage('You said: ' + e.data);
    }, false);
  });

  var Bar = function (_Base) {
    _inheritsLoose(Bar, _Base);

    function Bar(id) {
      var _this;

      _this = _Base.call(this) || this;
      _this.id = id;

      _this.initWorker();

      return _this;
    }

    var _proto = Bar.prototype;

    _proto.destroy = function destroy() {
      console.log('i am bar destroy');
    };

    _proto.initWorker = function initWorker() {
      var worker = new Worker();
      worker.postMessage('Hello World');

      worker.onmessage = function (event) {
        console.log('Received message ' + event.data);
        console.log('finish');
      };
    };

    return Bar;
  }(chartBase);

  return Bar;

}));
