(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.ChartBase = factory());
}(this, function () { 'use strict';

  function styleInject(css, ref) {
    if ( ref === void 0 ) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') { return; }

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

}));
