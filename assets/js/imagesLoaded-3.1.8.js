/*!
 * imagesLoaded PACKAGED v3.1.8
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

(function() {
  function e() {}
  function t(e, t) {
    for (var n = e.length; n--; ) if (e[n].listener === t) return n;
    return -1;
  }
  function n(e) {
    return function() {
      return this[e].apply(this, arguments);
    };
  }
  var i = e.prototype,
    r = this,
    o = r.EventEmitter;
  (i.getListeners = function(e) {
    var t,
      n,
      i = this._getEvents();
    if ("object" == typeof e) {
      t = {};
      for (n in i) i.hasOwnProperty(n) && e.test(n) && (t[n] = i[n]);
    } else t = i[e] || (i[e] = []);
    return t;
  }),
    (i.flattenListeners = function(e) {
      var t,
        n = [];
      for (t = 0; e.length > t; t += 1) n.push(e[t].listener);
      return n;
    }),
    (i.getListenersAsObject = function(e) {
      var t,
        n = this.getListeners(e);
      return n instanceof Array && ((t = {}), (t[e] = n)), t || n;
    }),
    (i.addListener = function(e, n) {
      var i,
        r = this.getListenersAsObject(e),
        o = "object" == typeof n;
      for (i in r)
        r.hasOwnProperty(i) &&
          -1 === t(r[i], n) &&
          r[i].push(o ? n : { listener: n, once: !1 });
      return this;
    }),
    (i.on = n("addListener")),
    (i.addOnceListener = function(e, t) {
      return this.addListener(e, { listener: t, once: !0 });
    }),
    (i.once = n("addOnceListener")),
    (i.defineEvent = function(e) {
      return this.getListeners(e), this;
    }),
    (i.defineEvents = function(e) {
      for (var t = 0; e.length > t; t += 1) this.defineEvent(e[t]);
      return this;
    }),
    (i.removeListener = function(e, n) {
      var i,
        r,
        o = this.getListenersAsObject(e);
      for (r in o)
        o.hasOwnProperty(r) &&
          ((i = t(o[r], n)), -1 !== i && o[r].splice(i, 1));
      return this;
    }),
    (i.off = n("removeListener")),
    (i.addListeners = function(e, t) {
      return this.manipulateListeners(!1, e, t);
    }),
    (i.removeListeners = function(e, t) {
      return this.manipulateListeners(!0, e, t);
    }),
    (i.manipulateListeners = function(e, t, n) {
      var i,
        r,
        o = e ? this.removeListener : this.addListener,
        s = e ? this.removeListeners : this.addListeners;
      if ("object" != typeof t || t instanceof RegExp)
        for (i = n.length; i--; ) o.call(this, t, n[i]);
      else
        for (i in t)
          t.hasOwnProperty(i) &&
            (r = t[i]) &&
            ("function" == typeof r ? o.call(this, i, r) : s.call(this, i, r));
      return this;
    }),
    (i.removeEvent = function(e) {
      var t,
        n = typeof e,
        i = this._getEvents();
      if ("string" === n) delete i[e];
      else if ("object" === n)
        for (t in i) i.hasOwnProperty(t) && e.test(t) && delete i[t];
      else delete this._events;
      return this;
    }),
    (i.removeAllListeners = n("removeEvent")),
    (i.emitEvent = function(e, t) {
      var n,
        i,
        r,
        o,
        s = this.getListenersAsObject(e);
      for (r in s)
        if (s.hasOwnProperty(r))
          for (i = s[r].length; i--; )
            (n = s[r][i]),
              n.once === !0 && this.removeListener(e, n.listener),
              (o = n.listener.apply(this, t || [])),
              o === this._getOnceReturnValue() &&
                this.removeListener(e, n.listener);
      return this;
    }),
    (i.trigger = n("emitEvent")),
    (i.emit = function(e) {
      var t = Array.prototype.slice.call(arguments, 1);
      return this.emitEvent(e, t);
    }),
    (i.setOnceReturnValue = function(e) {
      return (this._onceReturnValue = e), this;
    }),
    (i._getOnceReturnValue = function() {
      return this.hasOwnProperty("_onceReturnValue")
        ? this._onceReturnValue
        : !0;
    }),
    (i._getEvents = function() {
      return this._events || (this._events = {});
    }),
    (e.noConflict = function() {
      return (r.EventEmitter = o), e;
    }),
    "function" == typeof define && define.amd
      ? define("eventEmitter/EventEmitter", [], function() {
          return e;
        })
      : "object" == typeof module && module.exports
      ? (module.exports = e)
      : (this.EventEmitter = e);
}.call(this),
  (function(e) {
    function t(t) {
      var n = e.event;
      return (n.target = n.target || n.srcElement || t), n;
    }
    var n = document.documentElement,
      i = function() {};
    n.addEventListener
      ? (i = function(e, t, n) {
          e.addEventListener(t, n, !1);
        })
      : n.attachEvent &&
        (i = function(e, n, i) {
          (e[n + i] = i.handleEvent
            ? function() {
                var n = t(e);
                i.handleEvent.call(i, n);
              }
            : function() {
                var n = t(e);
                i.call(e, n);
              }),
            e.attachEvent("on" + n, e[n + i]);
        });
    var r = function() {};
    n.removeEventListener
      ? (r = function(e, t, n) {
          e.removeEventListener(t, n, !1);
        })
      : n.detachEvent &&
        (r = function(e, t, n) {
          e.detachEvent("on" + t, e[t + n]);
          try {
            delete e[t + n];
          } catch (i) {
            e[t + n] = void 0;
          }
        });
    var o = { bind: i, unbind: r };
    "function" == typeof define && define.amd
      ? define("eventie/eventie", o)
      : (e.eventie = o);
  })(this),
  (function(e, t) {
    "function" == typeof define && define.amd
      ? define(["eventEmitter/EventEmitter", "eventie/eventie"], function(
          n,
          i
        ) {
          return t(e, n, i);
        })
      : "object" == typeof exports
      ? (module.exports = t(
          e,
          require("wolfy87-eventemitter"),
          require("eventie")
        ))
      : (e.imagesLoaded = t(e, e.EventEmitter, e.eventie));
  })(window, function(e, t, n) {
    function i(e, t) {
      for (var n in t) e[n] = t[n];
      return e;
    }
    function r(e) {
      return "[object Array]" === d.call(e);
    }
    function o(e) {
      var t = [];
      if (r(e)) t = e;
      else if ("number" == typeof e.length)
        for (var n = 0, i = e.length; i > n; n++) t.push(e[n]);
      else t.push(e);
      return t;
    }
    function s(e, t, n) {
      if (!(this instanceof s)) return new s(e, t);
      "string" == typeof e && (e = document.querySelectorAll(e)),
        (this.elements = o(e)),
        (this.options = i({}, this.options)),
        "function" == typeof t ? (n = t) : i(this.options, t),
        n && this.on("always", n),
        this.getImages(),
        a && (this.jqDeferred = new a.Deferred());
      var r = this;
      setTimeout(function() {
        r.check();
      });
    }
    function f(e) {
      this.img = e;
    }
    function c(e) {
      (this.src = e), (v[e] = this);
    }
    var a = e.jQuery,
      u = e.console,
      h = u !== void 0,
      d = Object.prototype.toString;
    (s.prototype = new t()),
      (s.prototype.options = {}),
      (s.prototype.getImages = function() {
        this.images = [];
        for (var e = 0, t = this.elements.length; t > e; e++) {
          var n = this.elements[e];
          "IMG" === n.nodeName && this.addImage(n);
          var i = n.nodeType;
          if (i && (1 === i || 9 === i || 11 === i))
            for (
              var r = n.querySelectorAll("img"), o = 0, s = r.length;
              s > o;
              o++
            ) {
              var f = r[o];
              this.addImage(f);
            }
        }
      }),
      (s.prototype.addImage = function(e) {
        var t = new f(e);
        this.images.push(t);
      }),
      (s.prototype.check = function() {
        function e(e, r) {
          return (
            t.options.debug && h && u.log("confirm", e, r),
            t.progress(e),
            n++,
            n === i && t.complete(),
            !0
          );
        }
        var t = this,
          n = 0,
          i = this.images.length;
        if (((this.hasAnyBroken = !1), !i)) return this.complete(), void 0;
        for (var r = 0; i > r; r++) {
          var o = this.images[r];
          o.on("confirm", e), o.check();
        }
      }),
      (s.prototype.progress = function(e) {
        this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded;
        var t = this;
        setTimeout(function() {
          t.emit("progress", t, e),
            t.jqDeferred && t.jqDeferred.notify && t.jqDeferred.notify(t, e);
        });
      }),
      (s.prototype.complete = function() {
        var e = this.hasAnyBroken ? "fail" : "done";
        this.isComplete = !0;
        var t = this;
        setTimeout(function() {
          if ((t.emit(e, t), t.emit("always", t), t.jqDeferred)) {
            var n = t.hasAnyBroken ? "reject" : "resolve";
            t.jqDeferred[n](t);
          }
        });
      }),
      a &&
        (a.fn.imagesLoaded = function(e, t) {
          var n = new s(this, e, t);
          return n.jqDeferred.promise(a(this));
        }),
      (f.prototype = new t()),
      (f.prototype.check = function() {
        var e = v[this.img.src] || new c(this.img.src);
        if (e.isConfirmed)
          return this.confirm(e.isLoaded, "cached was confirmed"), void 0;
        if (this.img.complete && void 0 !== this.img.naturalWidth)
          return (
            this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), void 0
          );
        var t = this;
        e.on("confirm", function(e, n) {
          return t.confirm(e.isLoaded, n), !0;
        }),
          e.check();
      }),
      (f.prototype.confirm = function(e, t) {
        (this.isLoaded = e), this.emit("confirm", this, t);
      });
    var v = {};
    return (
      (c.prototype = new t()),
      (c.prototype.check = function() {
        if (!this.isChecked) {
          var e = new Image();
          n.bind(e, "load", this),
            n.bind(e, "error", this),
            (e.src = this.src),
            (this.isChecked = !0);
        }
      }),
      (c.prototype.handleEvent = function(e) {
        var t = "on" + e.type;
        this[t] && this[t](e);
      }),
      (c.prototype.onload = function(e) {
        this.confirm(!0, "onload"), this.unbindProxyEvents(e);
      }),
      (c.prototype.onerror = function(e) {
        this.confirm(!1, "onerror"), this.unbindProxyEvents(e);
      }),
      (c.prototype.confirm = function(e, t) {
        (this.isConfirmed = !0),
          (this.isLoaded = e),
          this.emit("confirm", this, t);
      }),
      (c.prototype.unbindProxyEvents = function(e) {
        n.unbind(e.target, "load", this), n.unbind(e.target, "error", this);
      }),
      s
    );
  }));

/*
 * jQuery Easing v1.3.2 - http://gsgd.co.uk/sandbox/jquery/easing/
 * Open source under the BSD License.
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * https://raw.github.com/gdsmith/jquery-easing/master/LICENSE
 */
(function(h) {
  h.easing.jswing = h.easing.swing;
  h.extend(h.easing, {
    def: "easeOutQuad",
    swing: function(e, a, c, b, d) {
      return h.easing[h.easing.def](e, a, c, b, d);
    },
    easeInQuad: function(e, a, c, b, d) {
      return b * (a /= d) * a + c;
    },
    easeOutQuad: function(e, a, c, b, d) {
      return -b * (a /= d) * (a - 2) + c;
    },
    easeInOutQuad: function(e, a, c, b, d) {
      return 1 > (a /= d / 2)
        ? (b / 2) * a * a + c
        : (-b / 2) * (--a * (a - 2) - 1) + c;
    },
    easeInCubic: function(e, a, c, b, d) {
      return b * (a /= d) * a * a + c;
    },
    easeOutCubic: function(e, a, c, b, d) {
      return b * ((a = a / d - 1) * a * a + 1) + c;
    },
    easeInOutCubic: function(e, a, c, b, d) {
      return 1 > (a /= d / 2)
        ? (b / 2) * a * a * a + c
        : (b / 2) * ((a -= 2) * a * a + 2) + c;
    },
    easeInQuart: function(e, a, c, b, d) {
      return b * (a /= d) * a * a * a + c;
    },
    easeOutQuart: function(e, a, c, b, d) {
      return -b * ((a = a / d - 1) * a * a * a - 1) + c;
    },
    easeInOutQuart: function(e, a, c, b, d) {
      return 1 > (a /= d / 2)
        ? (b / 2) * a * a * a * a + c
        : (-b / 2) * ((a -= 2) * a * a * a - 2) + c;
    },
    easeInQuint: function(e, a, c, b, d) {
      return b * (a /= d) * a * a * a * a + c;
    },
    easeOutQuint: function(e, a, c, b, d) {
      return b * ((a = a / d - 1) * a * a * a * a + 1) + c;
    },
    easeInOutQuint: function(e, a, c, b, d) {
      return 1 > (a /= d / 2)
        ? (b / 2) * a * a * a * a * a + c
        : (b / 2) * ((a -= 2) * a * a * a * a + 2) + c;
    },
    easeInSine: function(e, a, c, b, d) {
      return -b * Math.cos((a / d) * (Math.PI / 2)) + b + c;
    },
    easeOutSine: function(e, a, c, b, d) {
      return b * Math.sin((a / d) * (Math.PI / 2)) + c;
    },
    easeInOutSine: function(e, a, c, b, d) {
      return (-b / 2) * (Math.cos((Math.PI * a) / d) - 1) + c;
    },
    easeInExpo: function(e, a, c, b, d) {
      return 0 == a ? c : b * Math.pow(2, 10 * (a / d - 1)) + c;
    },
    easeOutExpo: function(e, a, c, b, d) {
      return a == d ? c + b : b * (-Math.pow(2, (-10 * a) / d) + 1) + c;
    },
    easeInOutExpo: function(e, a, c, b, d) {
      return 0 == a
        ? c
        : a == d
        ? c + b
        : 1 > (a /= d / 2)
        ? (b / 2) * Math.pow(2, 10 * (a - 1)) + c
        : (b / 2) * (-Math.pow(2, -10 * --a) + 2) + c;
    },
    easeInCirc: function(e, a, c, b, d) {
      return -b * (Math.sqrt(1 - (a /= d) * a) - 1) + c;
    },
    easeOutCirc: function(e, a, c, b, d) {
      return b * Math.sqrt(1 - (a = a / d - 1) * a) + c;
    },
    easeInOutCirc: function(e, a, c, b, d) {
      return 1 > (a /= d / 2)
        ? (-b / 2) * (Math.sqrt(1 - a * a) - 1) + c
        : (b / 2) * (Math.sqrt(1 - (a -= 2) * a) + 1) + c;
    },
    easeInElastic: function(e, a, c, b, d) {
      e = 1.70158;
      var f = 0,
        g = b;
      if (0 == a) return c;
      if (1 == (a /= d)) return c + b;
      f || (f = 0.3 * d);
      g < Math.abs(b)
        ? ((g = b), (e = f / 4))
        : (e = (f / (2 * Math.PI)) * Math.asin(b / g));
      return (
        -(
          g *
          Math.pow(2, 10 * --a) *
          Math.sin((2 * (a * d - e) * Math.PI) / f)
        ) + c
      );
    },
    easeOutElastic: function(e, a, c, b, d) {
      e = 1.70158;
      var f = 0,
        g = b;
      if (0 == a) return c;
      if (1 == (a /= d)) return c + b;
      f || (f = 0.3 * d);
      g < Math.abs(b)
        ? ((g = b), (e = f / 4))
        : (e = (f / (2 * Math.PI)) * Math.asin(b / g));
      return (
        g * Math.pow(2, -10 * a) * Math.sin((2 * (a * d - e) * Math.PI) / f) +
        b +
        c
      );
    },
    easeInOutElastic: function(e, a, c, b, d) {
      e = 1.70158;
      var f = 0,
        g = b;
      if (0 == a) return c;
      if (2 == (a /= d / 2)) return c + b;
      f || (f = 0.3 * d * 1.5);
      g < Math.abs(b)
        ? ((g = b), (e = f / 4))
        : (e = (f / (2 * Math.PI)) * Math.asin(b / g));
      return 1 > a
        ? -0.5 *
            g *
            Math.pow(2, 10 * --a) *
            Math.sin((2 * (a * d - e) * Math.PI) / f) +
            c
        : g *
            Math.pow(2, -10 * --a) *
            Math.sin((2 * (a * d - e) * Math.PI) / f) *
            0.5 +
            b +
            c;
    },
    easeInBack: function(e, a, c, b, d, f) {
      void 0 == f && (f = 1.70158);
      return b * (a /= d) * a * ((f + 1) * a - f) + c;
    },
    easeOutBack: function(e, a, c, b, d, f) {
      void 0 == f && (f = 1.70158);
      return b * ((a = a / d - 1) * a * ((f + 1) * a + f) + 1) + c;
    },
    easeInOutBack: function(e, a, c, b, d, f) {
      void 0 == f && (f = 1.70158);
      return 1 > (a /= d / 2)
        ? (b / 2) * a * a * (((f *= 1.525) + 1) * a - f) + c
        : (b / 2) * ((a -= 2) * a * (((f *= 1.525) + 1) * a + f) + 2) + c;
    },
    easeInBounce: function(e, a, c, b, d) {
      return b - h.easing.easeOutBounce(e, d - a, 0, b, d) + c;
    },
    easeOutBounce: function(e, a, c, b, d) {
      return (a /= d) < 1 / 2.75
        ? 7.5625 * b * a * a + c
        : a < 2 / 2.75
        ? b * (7.5625 * (a -= 1.5 / 2.75) * a + 0.75) + c
        : a < 2.5 / 2.75
        ? b * (7.5625 * (a -= 2.25 / 2.75) * a + 0.9375) + c
        : b * (7.5625 * (a -= 2.625 / 2.75) * a + 0.984375) + c;
    },
    easeInOutBounce: function(e, a, c, b, d) {
      return a < d / 2
        ? 0.5 * h.easing.easeInBounce(e, 2 * a, 0, b, d) + c
        : 0.5 * h.easing.easeOutBounce(e, 2 * a - d, 0, b, d) + 0.5 * b + c;
    }
  });
})(jQuery);

/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.9.0
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */
(function(i) {
  "use strict";
  "function" == typeof define && define.amd
    ? define(["jquery"], i)
    : "undefined" != typeof exports
    ? (module.exports = i(require("jquery")))
    : i(jQuery);
})(function(i) {
  "use strict";
  var e = window.Slick || {};
  (e = (function() {
    function e(e, o) {
      var s,
        n = this;
      (n.defaults = {
        accessibility: !0,
        adaptiveHeight: !1,
        appendArrows: i(e),
        appendDots: i(e),
        arrows: !0,
        asNavFor: null,
        prevArrow:
          '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
        nextArrow:
          '<button class="slick-next" aria-label="Next" type="button">Next</button>',
        autoplay: !1,
        autoplaySpeed: 3e3,
        centerMode: !1,
        centerPadding: "50px",
        cssEase: "ease",
        customPaging: function(e, t) {
          return i('<button type="button" />').text(t + 1);
        },
        dots: !1,
        dotsClass: "slick-dots",
        draggable: !0,
        easing: "linear",
        edgeFriction: 0.35,
        fade: !1,
        focusOnSelect: !1,
        focusOnChange: !1,
        infinite: !0,
        initialSlide: 0,
        lazyLoad: "ondemand",
        mobileFirst: !1,
        pauseOnHover: !0,
        pauseOnFocus: !0,
        pauseOnDotsHover: !1,
        respondTo: "window",
        responsive: null,
        rows: 1,
        rtl: !1,
        slide: "",
        slidesPerRow: 1,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
        swipe: !0,
        swipeToSlide: !1,
        touchMove: !0,
        touchThreshold: 5,
        useCSS: !0,
        useTransform: !0,
        variableWidth: !1,
        vertical: !1,
        verticalSwiping: !1,
        waitForAnimate: !0,
        zIndex: 1e3
      }),
        (n.initials = {
          animating: !1,
          dragging: !1,
          autoPlayTimer: null,
          currentDirection: 0,
          currentLeft: null,
          currentSlide: 0,
          direction: 1,
          $dots: null,
          listWidth: null,
          listHeight: null,
          loadIndex: 0,
          $nextArrow: null,
          $prevArrow: null,
          scrolling: !1,
          slideCount: null,
          slideWidth: null,
          $slideTrack: null,
          $slides: null,
          sliding: !1,
          slideOffset: 0,
          swipeLeft: null,
          swiping: !1,
          $list: null,
          touchObject: {},
          transformsEnabled: !1,
          unslicked: !1
        }),
        i.extend(n, n.initials),
        (n.activeBreakpoint = null),
        (n.animType = null),
        (n.animProp = null),
        (n.breakpoints = []),
        (n.breakpointSettings = []),
        (n.cssTransitions = !1),
        (n.focussed = !1),
        (n.interrupted = !1),
        (n.hidden = "hidden"),
        (n.paused = !0),
        (n.positionProp = null),
        (n.respondTo = null),
        (n.rowCount = 1),
        (n.shouldClick = !0),
        (n.$slider = i(e)),
        (n.$slidesCache = null),
        (n.transformType = null),
        (n.transitionType = null),
        (n.visibilityChange = "visibilitychange"),
        (n.windowWidth = 0),
        (n.windowTimer = null),
        (s = i(e).data("slick") || {}),
        (n.options = i.extend({}, n.defaults, o, s)),
        (n.currentSlide = n.options.initialSlide),
        (n.originalSettings = n.options),
        "undefined" != typeof document.mozHidden
          ? ((n.hidden = "mozHidden"),
            (n.visibilityChange = "mozvisibilitychange"))
          : "undefined" != typeof document.webkitHidden &&
            ((n.hidden = "webkitHidden"),
            (n.visibilityChange = "webkitvisibilitychange")),
        (n.autoPlay = i.proxy(n.autoPlay, n)),
        (n.autoPlayClear = i.proxy(n.autoPlayClear, n)),
        (n.autoPlayIterator = i.proxy(n.autoPlayIterator, n)),
        (n.changeSlide = i.proxy(n.changeSlide, n)),
        (n.clickHandler = i.proxy(n.clickHandler, n)),
        (n.selectHandler = i.proxy(n.selectHandler, n)),
        (n.setPosition = i.proxy(n.setPosition, n)),
        (n.swipeHandler = i.proxy(n.swipeHandler, n)),
        (n.dragHandler = i.proxy(n.dragHandler, n)),
        (n.keyHandler = i.proxy(n.keyHandler, n)),
        (n.instanceUid = t++),
        (n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/),
        n.registerBreakpoints(),
        n.init(!0);
    }
    var t = 0;
    return e;
  })()),
    (e.prototype.activateADA = function() {
      var i = this;
      i.$slideTrack
        .find(".slick-active")
        .attr({ "aria-hidden": "false" })
        .find("a, input, button, select")
        .attr({ tabindex: "0" });
    }),
    (e.prototype.addSlide = e.prototype.slickAdd = function(e, t, o) {
      var s = this;
      if ("boolean" == typeof t) (o = t), (t = null);
      else if (t < 0 || t >= s.slideCount) return !1;
      s.unload(),
        "number" == typeof t
          ? 0 === t && 0 === s.$slides.length
            ? i(e).appendTo(s.$slideTrack)
            : o
            ? i(e).insertBefore(s.$slides.eq(t))
            : i(e).insertAfter(s.$slides.eq(t))
          : o === !0
          ? i(e).prependTo(s.$slideTrack)
          : i(e).appendTo(s.$slideTrack),
        (s.$slides = s.$slideTrack.children(this.options.slide)),
        s.$slideTrack.children(this.options.slide).detach(),
        s.$slideTrack.append(s.$slides),
        s.$slides.each(function(e, t) {
          i(t).attr("data-slick-index", e);
        }),
        (s.$slidesCache = s.$slides),
        s.reinit();
    }),
    (e.prototype.animateHeight = function() {
      var i = this;
      if (
        1 === i.options.slidesToShow &&
        i.options.adaptiveHeight === !0 &&
        i.options.vertical === !1
      ) {
        var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
        i.$list.animate({ height: e }, i.options.speed);
      }
    }),
    (e.prototype.animateSlide = function(e, t) {
      var o = {},
        s = this;
      s.animateHeight(),
        s.options.rtl === !0 && s.options.vertical === !1 && (e = -e),
        s.transformsEnabled === !1
          ? s.options.vertical === !1
            ? s.$slideTrack.animate(
                { left: e },
                s.options.speed,
                s.options.easing,
                t
              )
            : s.$slideTrack.animate(
                { top: e },
                s.options.speed,
                s.options.easing,
                t
              )
          : s.cssTransitions === !1
          ? (s.options.rtl === !0 && (s.currentLeft = -s.currentLeft),
            i({ animStart: s.currentLeft }).animate(
              { animStart: e },
              {
                duration: s.options.speed,
                easing: s.options.easing,
                step: function(i) {
                  (i = Math.ceil(i)),
                    s.options.vertical === !1
                      ? ((o[s.animType] = "translate(" + i + "px, 0px)"),
                        s.$slideTrack.css(o))
                      : ((o[s.animType] = "translate(0px," + i + "px)"),
                        s.$slideTrack.css(o));
                },
                complete: function() {
                  t && t.call();
                }
              }
            ))
          : (s.applyTransition(),
            (e = Math.ceil(e)),
            s.options.vertical === !1
              ? (o[s.animType] = "translate3d(" + e + "px, 0px, 0px)")
              : (o[s.animType] = "translate3d(0px," + e + "px, 0px)"),
            s.$slideTrack.css(o),
            t &&
              setTimeout(function() {
                s.disableTransition(), t.call();
              }, s.options.speed));
    }),
    (e.prototype.getNavTarget = function() {
      var e = this,
        t = e.options.asNavFor;
      return t && null !== t && (t = i(t).not(e.$slider)), t;
    }),
    (e.prototype.asNavFor = function(e) {
      var t = this,
        o = t.getNavTarget();
      null !== o &&
        "object" == typeof o &&
        o.each(function() {
          var t = i(this).slick("getSlick");
          t.unslicked || t.slideHandler(e, !0);
        });
    }),
    (e.prototype.applyTransition = function(i) {
      var e = this,
        t = {};
      e.options.fade === !1
        ? (t[e.transitionType] =
            e.transformType + " " + e.options.speed + "ms " + e.options.cssEase)
        : (t[e.transitionType] =
            "opacity " + e.options.speed + "ms " + e.options.cssEase),
        e.options.fade === !1 ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t);
    }),
    (e.prototype.autoPlay = function() {
      var i = this;
      i.autoPlayClear(),
        i.slideCount > i.options.slidesToShow &&
          (i.autoPlayTimer = setInterval(
            i.autoPlayIterator,
            i.options.autoplaySpeed
          ));
    }),
    (e.prototype.autoPlayClear = function() {
      var i = this;
      i.autoPlayTimer && clearInterval(i.autoPlayTimer);
    }),
    (e.prototype.autoPlayIterator = function() {
      var i = this,
        e = i.currentSlide + i.options.slidesToScroll;
      i.paused ||
        i.interrupted ||
        i.focussed ||
        (i.options.infinite === !1 &&
          (1 === i.direction && i.currentSlide + 1 === i.slideCount - 1
            ? (i.direction = 0)
            : 0 === i.direction &&
              ((e = i.currentSlide - i.options.slidesToScroll),
              i.currentSlide - 1 === 0 && (i.direction = 1))),
        i.slideHandler(e));
    }),
    (e.prototype.buildArrows = function() {
      var e = this;
      e.options.arrows === !0 &&
        ((e.$prevArrow = i(e.options.prevArrow).addClass("slick-arrow")),
        (e.$nextArrow = i(e.options.nextArrow).addClass("slick-arrow")),
        e.slideCount > e.options.slidesToShow
          ? (e.$prevArrow
              .removeClass("slick-hidden")
              .removeAttr("aria-hidden tabindex"),
            e.$nextArrow
              .removeClass("slick-hidden")
              .removeAttr("aria-hidden tabindex"),
            e.htmlExpr.test(e.options.prevArrow) &&
              e.$prevArrow.prependTo(e.options.appendArrows),
            e.htmlExpr.test(e.options.nextArrow) &&
              e.$nextArrow.appendTo(e.options.appendArrows),
            e.options.infinite !== !0 &&
              e.$prevArrow
                .addClass("slick-disabled")
                .attr("aria-disabled", "true"))
          : e.$prevArrow
              .add(e.$nextArrow)
              .addClass("slick-hidden")
              .attr({ "aria-disabled": "true", tabindex: "-1" }));
    }),
    (e.prototype.buildDots = function() {
      var e,
        t,
        o = this;
      if (o.options.dots === !0 && o.slideCount > o.options.slidesToShow) {
        for (
          o.$slider.addClass("slick-dotted"),
            t = i("<ul />").addClass(o.options.dotsClass),
            e = 0;
          e <= o.getDotCount();
          e += 1
        )
          t.append(i("<li />").append(o.options.customPaging.call(this, o, e)));
        (o.$dots = t.appendTo(o.options.appendDots)),
          o.$dots
            .find("li")
            .first()
            .addClass("slick-active");
      }
    }),
    (e.prototype.buildOut = function() {
      var e = this;
      (e.$slides = e.$slider
        .children(e.options.slide + ":not(.slick-cloned)")
        .addClass("slick-slide")),
        (e.slideCount = e.$slides.length),
        e.$slides.each(function(e, t) {
          i(t)
            .attr("data-slick-index", e)
            .data("originalStyling", i(t).attr("style") || "");
        }),
        e.$slider.addClass("slick-slider"),
        (e.$slideTrack =
          0 === e.slideCount
            ? i('<div class="slick-track"/>').appendTo(e.$slider)
            : e.$slides.wrapAll('<div class="slick-track"/>').parent()),
        (e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent()),
        e.$slideTrack.css("opacity", 0),
        (e.options.centerMode !== !0 && e.options.swipeToSlide !== !0) ||
          (e.options.slidesToScroll = 1),
        i("img[data-lazy]", e.$slider)
          .not("[src]")
          .addClass("slick-loading"),
        e.setupInfinite(),
        e.buildArrows(),
        e.buildDots(),
        e.updateDots(),
        e.setSlideClasses(
          "number" == typeof e.currentSlide ? e.currentSlide : 0
        ),
        e.options.draggable === !0 && e.$list.addClass("draggable");
    }),
    (e.prototype.buildRows = function() {
      var i,
        e,
        t,
        o,
        s,
        n,
        r,
        l = this;
      if (
        ((o = document.createDocumentFragment()),
        (n = l.$slider.children()),
        l.options.rows > 0)
      ) {
        for (
          r = l.options.slidesPerRow * l.options.rows,
            s = Math.ceil(n.length / r),
            i = 0;
          i < s;
          i++
        ) {
          var d = document.createElement("div");
          for (e = 0; e < l.options.rows; e++) {
            var a = document.createElement("div");
            for (t = 0; t < l.options.slidesPerRow; t++) {
              var c = i * r + (e * l.options.slidesPerRow + t);
              n.get(c) && a.appendChild(n.get(c));
            }
            d.appendChild(a);
          }
          o.appendChild(d);
        }
        l.$slider.empty().append(o),
          l.$slider
            .children()
            .children()
            .children()
            .css({
              width: 100 / l.options.slidesPerRow + "%",
              display: "inline-block"
            });
      }
    }),
    (e.prototype.checkResponsive = function(e, t) {
      var o,
        s,
        n,
        r = this,
        l = !1,
        d = r.$slider.width(),
        a = window.innerWidth || i(window).width();
      if (
        ("window" === r.respondTo
          ? (n = a)
          : "slider" === r.respondTo
          ? (n = d)
          : "min" === r.respondTo && (n = Math.min(a, d)),
        r.options.responsive &&
          r.options.responsive.length &&
          null !== r.options.responsive)
      ) {
        s = null;
        for (o in r.breakpoints)
          r.breakpoints.hasOwnProperty(o) &&
            (r.originalSettings.mobileFirst === !1
              ? n < r.breakpoints[o] && (s = r.breakpoints[o])
              : n > r.breakpoints[o] && (s = r.breakpoints[o]));
        null !== s
          ? null !== r.activeBreakpoint
            ? (s !== r.activeBreakpoint || t) &&
              ((r.activeBreakpoint = s),
              "unslick" === r.breakpointSettings[s]
                ? r.unslick(s)
                : ((r.options = i.extend(
                    {},
                    r.originalSettings,
                    r.breakpointSettings[s]
                  )),
                  e === !0 && (r.currentSlide = r.options.initialSlide),
                  r.refresh(e)),
              (l = s))
            : ((r.activeBreakpoint = s),
              "unslick" === r.breakpointSettings[s]
                ? r.unslick(s)
                : ((r.options = i.extend(
                    {},
                    r.originalSettings,
                    r.breakpointSettings[s]
                  )),
                  e === !0 && (r.currentSlide = r.options.initialSlide),
                  r.refresh(e)),
              (l = s))
          : null !== r.activeBreakpoint &&
            ((r.activeBreakpoint = null),
            (r.options = r.originalSettings),
            e === !0 && (r.currentSlide = r.options.initialSlide),
            r.refresh(e),
            (l = s)),
          e || l === !1 || r.$slider.trigger("breakpoint", [r, l]);
      }
    }),
    (e.prototype.changeSlide = function(e, t) {
      var o,
        s,
        n,
        r = this,
        l = i(e.currentTarget);
      switch (
        (l.is("a") && e.preventDefault(),
        l.is("li") || (l = l.closest("li")),
        (n = r.slideCount % r.options.slidesToScroll !== 0),
        (o = n
          ? 0
          : (r.slideCount - r.currentSlide) % r.options.slidesToScroll),
        e.data.message)
      ) {
        case "previous":
          (s = 0 === o ? r.options.slidesToScroll : r.options.slidesToShow - o),
            r.slideCount > r.options.slidesToShow &&
              r.slideHandler(r.currentSlide - s, !1, t);
          break;
        case "next":
          (s = 0 === o ? r.options.slidesToScroll : o),
            r.slideCount > r.options.slidesToShow &&
              r.slideHandler(r.currentSlide + s, !1, t);
          break;
        case "index":
          var d =
            0 === e.data.index
              ? 0
              : e.data.index || l.index() * r.options.slidesToScroll;
          r.slideHandler(r.checkNavigable(d), !1, t),
            l.children().trigger("focus");
          break;
        default:
          return;
      }
    }),
    (e.prototype.checkNavigable = function(i) {
      var e,
        t,
        o = this;
      if (((e = o.getNavigableIndexes()), (t = 0), i > e[e.length - 1]))
        i = e[e.length - 1];
      else
        for (var s in e) {
          if (i < e[s]) {
            i = t;
            break;
          }
          t = e[s];
        }
      return i;
    }),
    (e.prototype.cleanUpEvents = function() {
      var e = this;
      e.options.dots &&
        null !== e.$dots &&
        (i("li", e.$dots)
          .off("click.slick", e.changeSlide)
          .off("mouseenter.slick", i.proxy(e.interrupt, e, !0))
          .off("mouseleave.slick", i.proxy(e.interrupt, e, !1)),
        e.options.accessibility === !0 &&
          e.$dots.off("keydown.slick", e.keyHandler)),
        e.$slider.off("focus.slick blur.slick"),
        e.options.arrows === !0 &&
          e.slideCount > e.options.slidesToShow &&
          (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide),
          e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide),
          e.options.accessibility === !0 &&
            (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler),
            e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))),
        e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler),
        e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler),
        e.$list.off("touchend.slick mouseup.slick", e.swipeHandler),
        e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler),
        e.$list.off("click.slick", e.clickHandler),
        i(document).off(e.visibilityChange, e.visibility),
        e.cleanUpSlideEvents(),
        e.options.accessibility === !0 &&
          e.$list.off("keydown.slick", e.keyHandler),
        e.options.focusOnSelect === !0 &&
          i(e.$slideTrack)
            .children()
            .off("click.slick", e.selectHandler),
        i(window).off(
          "orientationchange.slick.slick-" + e.instanceUid,
          e.orientationChange
        ),
        i(window).off("resize.slick.slick-" + e.instanceUid, e.resize),
        i("[draggable!=true]", e.$slideTrack).off(
          "dragstart",
          e.preventDefault
        ),
        i(window).off("load.slick.slick-" + e.instanceUid, e.setPosition);
    }),
    (e.prototype.cleanUpSlideEvents = function() {
      var e = this;
      e.$list.off("mouseenter.slick", i.proxy(e.interrupt, e, !0)),
        e.$list.off("mouseleave.slick", i.proxy(e.interrupt, e, !1));
    }),
    (e.prototype.cleanUpRows = function() {
      var i,
        e = this;
      e.options.rows > 0 &&
        ((i = e.$slides.children().children()),
        i.removeAttr("style"),
        e.$slider.empty().append(i));
    }),
    (e.prototype.clickHandler = function(i) {
      var e = this;
      e.shouldClick === !1 &&
        (i.stopImmediatePropagation(), i.stopPropagation(), i.preventDefault());
    }),
    (e.prototype.destroy = function(e) {
      var t = this;
      t.autoPlayClear(),
        (t.touchObject = {}),
        t.cleanUpEvents(),
        i(".slick-cloned", t.$slider).detach(),
        t.$dots && t.$dots.remove(),
        t.$prevArrow &&
          t.$prevArrow.length &&
          (t.$prevArrow
            .removeClass("slick-disabled slick-arrow slick-hidden")
            .removeAttr("aria-hidden aria-disabled tabindex")
            .css("display", ""),
          t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()),
        t.$nextArrow &&
          t.$nextArrow.length &&
          (t.$nextArrow
            .removeClass("slick-disabled slick-arrow slick-hidden")
            .removeAttr("aria-hidden aria-disabled tabindex")
            .css("display", ""),
          t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()),
        t.$slides &&
          (t.$slides
            .removeClass(
              "slick-slide slick-active slick-center slick-visible slick-current"
            )
            .removeAttr("aria-hidden")
            .removeAttr("data-slick-index")
            .each(function() {
              i(this).attr("style", i(this).data("originalStyling"));
            }),
          t.$slideTrack.children(this.options.slide).detach(),
          t.$slideTrack.detach(),
          t.$list.detach(),
          t.$slider.append(t.$slides)),
        t.cleanUpRows(),
        t.$slider.removeClass("slick-slider"),
        t.$slider.removeClass("slick-initialized"),
        t.$slider.removeClass("slick-dotted"),
        (t.unslicked = !0),
        e || t.$slider.trigger("destroy", [t]);
    }),
    (e.prototype.disableTransition = function(i) {
      var e = this,
        t = {};
      (t[e.transitionType] = ""),
        e.options.fade === !1 ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t);
    }),
    (e.prototype.fadeSlide = function(i, e) {
      var t = this;
      t.cssTransitions === !1
        ? (t.$slides.eq(i).css({ zIndex: t.options.zIndex }),
          t.$slides
            .eq(i)
            .animate({ opacity: 1 }, t.options.speed, t.options.easing, e))
        : (t.applyTransition(i),
          t.$slides.eq(i).css({ opacity: 1, zIndex: t.options.zIndex }),
          e &&
            setTimeout(function() {
              t.disableTransition(i), e.call();
            }, t.options.speed));
    }),
    (e.prototype.fadeSlideOut = function(i) {
      var e = this;
      e.cssTransitions === !1
        ? e.$slides
            .eq(i)
            .animate(
              { opacity: 0, zIndex: e.options.zIndex - 2 },
              e.options.speed,
              e.options.easing
            )
        : (e.applyTransition(i),
          e.$slides.eq(i).css({ opacity: 0, zIndex: e.options.zIndex - 2 }));
    }),
    (e.prototype.filterSlides = e.prototype.slickFilter = function(i) {
      var e = this;
      null !== i &&
        ((e.$slidesCache = e.$slides),
        e.unload(),
        e.$slideTrack.children(this.options.slide).detach(),
        e.$slidesCache.filter(i).appendTo(e.$slideTrack),
        e.reinit());
    }),
    (e.prototype.focusHandler = function() {
      var e = this;
      e.$slider
        .off("focus.slick blur.slick")
        .on("focus.slick", "*", function(t) {
          var o = i(this);
          setTimeout(function() {
            e.options.pauseOnFocus &&
              o.is(":focus") &&
              ((e.focussed = !0), e.autoPlay());
          }, 0);
        })
        .on("blur.slick", "*", function(t) {
          i(this);
          e.options.pauseOnFocus && ((e.focussed = !1), e.autoPlay());
        });
    }),
    (e.prototype.getCurrent = e.prototype.slickCurrentSlide = function() {
      var i = this;
      return i.currentSlide;
    }),
    (e.prototype.getDotCount = function() {
      var i = this,
        e = 0,
        t = 0,
        o = 0;
      if (i.options.infinite === !0)
        if (i.slideCount <= i.options.slidesToShow) ++o;
        else
          for (; e < i.slideCount; )
            ++o,
              (e = t + i.options.slidesToScroll),
              (t +=
                i.options.slidesToScroll <= i.options.slidesToShow
                  ? i.options.slidesToScroll
                  : i.options.slidesToShow);
      else if (i.options.centerMode === !0) o = i.slideCount;
      else if (i.options.asNavFor)
        for (; e < i.slideCount; )
          ++o,
            (e = t + i.options.slidesToScroll),
            (t +=
              i.options.slidesToScroll <= i.options.slidesToShow
                ? i.options.slidesToScroll
                : i.options.slidesToShow);
      else
        o =
          1 +
          Math.ceil(
            (i.slideCount - i.options.slidesToShow) / i.options.slidesToScroll
          );
      return o - 1;
    }),
    (e.prototype.getLeft = function(i) {
      var e,
        t,
        o,
        s,
        n = this,
        r = 0;
      return (
        (n.slideOffset = 0),
        (t = n.$slides.first().outerHeight(!0)),
        n.options.infinite === !0
          ? (n.slideCount > n.options.slidesToShow &&
              ((n.slideOffset = n.slideWidth * n.options.slidesToShow * -1),
              (s = -1),
              n.options.vertical === !0 &&
                n.options.centerMode === !0 &&
                (2 === n.options.slidesToShow
                  ? (s = -1.5)
                  : 1 === n.options.slidesToShow && (s = -2)),
              (r = t * n.options.slidesToShow * s)),
            n.slideCount % n.options.slidesToScroll !== 0 &&
              i + n.options.slidesToScroll > n.slideCount &&
              n.slideCount > n.options.slidesToShow &&
              (i > n.slideCount
                ? ((n.slideOffset =
                    (n.options.slidesToShow - (i - n.slideCount)) *
                    n.slideWidth *
                    -1),
                  (r = (n.options.slidesToShow - (i - n.slideCount)) * t * -1))
                : ((n.slideOffset =
                    (n.slideCount % n.options.slidesToScroll) *
                    n.slideWidth *
                    -1),
                  (r = (n.slideCount % n.options.slidesToScroll) * t * -1))))
          : i + n.options.slidesToShow > n.slideCount &&
            ((n.slideOffset =
              (i + n.options.slidesToShow - n.slideCount) * n.slideWidth),
            (r = (i + n.options.slidesToShow - n.slideCount) * t)),
        n.slideCount <= n.options.slidesToShow &&
          ((n.slideOffset = 0), (r = 0)),
        n.options.centerMode === !0 && n.slideCount <= n.options.slidesToShow
          ? (n.slideOffset =
              (n.slideWidth * Math.floor(n.options.slidesToShow)) / 2 -
              (n.slideWidth * n.slideCount) / 2)
          : n.options.centerMode === !0 && n.options.infinite === !0
          ? (n.slideOffset +=
              n.slideWidth * Math.floor(n.options.slidesToShow / 2) -
              n.slideWidth)
          : n.options.centerMode === !0 &&
            ((n.slideOffset = 0),
            (n.slideOffset +=
              n.slideWidth * Math.floor(n.options.slidesToShow / 2))),
        (e =
          n.options.vertical === !1
            ? i * n.slideWidth * -1 + n.slideOffset
            : i * t * -1 + r),
        n.options.variableWidth === !0 &&
          ((o =
            n.slideCount <= n.options.slidesToShow || n.options.infinite === !1
              ? n.$slideTrack.children(".slick-slide").eq(i)
              : n.$slideTrack
                  .children(".slick-slide")
                  .eq(i + n.options.slidesToShow)),
          (e =
            n.options.rtl === !0
              ? o[0]
                ? (n.$slideTrack.width() - o[0].offsetLeft - o.width()) * -1
                : 0
              : o[0]
              ? o[0].offsetLeft * -1
              : 0),
          n.options.centerMode === !0 &&
            ((o =
              n.slideCount <= n.options.slidesToShow ||
              n.options.infinite === !1
                ? n.$slideTrack.children(".slick-slide").eq(i)
                : n.$slideTrack
                    .children(".slick-slide")
                    .eq(i + n.options.slidesToShow + 1)),
            (e =
              n.options.rtl === !0
                ? o[0]
                  ? (n.$slideTrack.width() - o[0].offsetLeft - o.width()) * -1
                  : 0
                : o[0]
                ? o[0].offsetLeft * -1
                : 0),
            (e += (n.$list.width() - o.outerWidth()) / 2))),
        e
      );
    }),
    (e.prototype.getOption = e.prototype.slickGetOption = function(i) {
      var e = this;
      return e.options[i];
    }),
    (e.prototype.getNavigableIndexes = function() {
      var i,
        e = this,
        t = 0,
        o = 0,
        s = [];
      for (
        e.options.infinite === !1
          ? (i = e.slideCount)
          : ((t = e.options.slidesToScroll * -1),
            (o = e.options.slidesToScroll * -1),
            (i = 2 * e.slideCount));
        t < i;

      )
        s.push(t),
          (t = o + e.options.slidesToScroll),
          (o +=
            e.options.slidesToScroll <= e.options.slidesToShow
              ? e.options.slidesToScroll
              : e.options.slidesToShow);
      return s;
    }),
    (e.prototype.getSlick = function() {
      return this;
    }),
    (e.prototype.getSlideCount = function() {
      var e,
        t,
        o,
        s,
        n = this;
      return (
        (s = n.options.centerMode === !0 ? Math.floor(n.$list.width() / 2) : 0),
        (o = n.swipeLeft * -1 + s),
        n.options.swipeToSlide === !0
          ? (n.$slideTrack.find(".slick-slide").each(function(e, s) {
              var r, l, d;
              if (
                ((r = i(s).outerWidth()),
                (l = s.offsetLeft),
                n.options.centerMode !== !0 && (l += r / 2),
                (d = l + r),
                o < d)
              )
                return (t = s), !1;
            }),
            (e = Math.abs(i(t).attr("data-slick-index") - n.currentSlide) || 1))
          : n.options.slidesToScroll
      );
    }),
    (e.prototype.goTo = e.prototype.slickGoTo = function(i, e) {
      var t = this;
      t.changeSlide({ data: { message: "index", index: parseInt(i) } }, e);
    }),
    (e.prototype.init = function(e) {
      var t = this;
      i(t.$slider).hasClass("slick-initialized") ||
        (i(t.$slider).addClass("slick-initialized"),
        t.buildRows(),
        t.buildOut(),
        t.setProps(),
        t.startLoad(),
        t.loadSlider(),
        t.initializeEvents(),
        t.updateArrows(),
        t.updateDots(),
        t.checkResponsive(!0),
        t.focusHandler()),
        e && t.$slider.trigger("init", [t]),
        t.options.accessibility === !0 && t.initADA(),
        t.options.autoplay && ((t.paused = !1), t.autoPlay());
    }),
    (e.prototype.initADA = function() {
      var e = this,
        t = Math.ceil(e.slideCount / e.options.slidesToShow),
        o = e.getNavigableIndexes().filter(function(i) {
          return i >= 0 && i < e.slideCount;
        });
      e.$slides
        .add(e.$slideTrack.find(".slick-cloned"))
        .attr({ "aria-hidden": "true", tabindex: "-1" })
        .find("a, input, button, select")
        .attr({ tabindex: "-1" }),
        null !== e.$dots &&
          (e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(t) {
            var s = o.indexOf(t);
            if (
              (i(this).attr({
                role: "tabpanel",
                id: "slick-slide" + e.instanceUid + t,
                tabindex: -1
              }),
              s !== -1)
            ) {
              var n = "slick-slide-control" + e.instanceUid + s;
              i("#" + n).length && i(this).attr({ "aria-describedby": n });
            }
          }),
          e.$dots
            .attr("role", "tablist")
            .find("li")
            .each(function(s) {
              var n = o[s];
              i(this).attr({ role: "presentation" }),
                i(this)
                  .find("button")
                  .first()
                  .attr({
                    role: "tab",
                    id: "slick-slide-control" + e.instanceUid + s,
                    "aria-controls": "slick-slide" + e.instanceUid + n,
                    "aria-label": s + 1 + " of " + t,
                    "aria-selected": null,
                    tabindex: "-1"
                  });
            })
            .eq(e.currentSlide)
            .find("button")
            .attr({ "aria-selected": "true", tabindex: "0" })
            .end());
      for (var s = e.currentSlide, n = s + e.options.slidesToShow; s < n; s++)
        e.options.focusOnChange
          ? e.$slides.eq(s).attr({ tabindex: "0" })
          : e.$slides.eq(s).removeAttr("tabindex");
      e.activateADA();
    }),
    (e.prototype.initArrowEvents = function() {
      var i = this;
      i.options.arrows === !0 &&
        i.slideCount > i.options.slidesToShow &&
        (i.$prevArrow
          .off("click.slick")
          .on("click.slick", { message: "previous" }, i.changeSlide),
        i.$nextArrow
          .off("click.slick")
          .on("click.slick", { message: "next" }, i.changeSlide),
        i.options.accessibility === !0 &&
          (i.$prevArrow.on("keydown.slick", i.keyHandler),
          i.$nextArrow.on("keydown.slick", i.keyHandler)));
    }),
    (e.prototype.initDotEvents = function() {
      var e = this;
      e.options.dots === !0 &&
        e.slideCount > e.options.slidesToShow &&
        (i("li", e.$dots).on(
          "click.slick",
          { message: "index" },
          e.changeSlide
        ),
        e.options.accessibility === !0 &&
          e.$dots.on("keydown.slick", e.keyHandler)),
        e.options.dots === !0 &&
          e.options.pauseOnDotsHover === !0 &&
          e.slideCount > e.options.slidesToShow &&
          i("li", e.$dots)
            .on("mouseenter.slick", i.proxy(e.interrupt, e, !0))
            .on("mouseleave.slick", i.proxy(e.interrupt, e, !1));
    }),
    (e.prototype.initSlideEvents = function() {
      var e = this;
      e.options.pauseOnHover &&
        (e.$list.on("mouseenter.slick", i.proxy(e.interrupt, e, !0)),
        e.$list.on("mouseleave.slick", i.proxy(e.interrupt, e, !1)));
    }),
    (e.prototype.initializeEvents = function() {
      var e = this;
      e.initArrowEvents(),
        e.initDotEvents(),
        e.initSlideEvents(),
        e.$list.on(
          "touchstart.slick mousedown.slick",
          { action: "start" },
          e.swipeHandler
        ),
        e.$list.on(
          "touchmove.slick mousemove.slick",
          { action: "move" },
          e.swipeHandler
        ),
        e.$list.on(
          "touchend.slick mouseup.slick",
          { action: "end" },
          e.swipeHandler
        ),
        e.$list.on(
          "touchcancel.slick mouseleave.slick",
          { action: "end" },
          e.swipeHandler
        ),
        e.$list.on("click.slick", e.clickHandler),
        i(document).on(e.visibilityChange, i.proxy(e.visibility, e)),
        e.options.accessibility === !0 &&
          e.$list.on("keydown.slick", e.keyHandler),
        e.options.focusOnSelect === !0 &&
          i(e.$slideTrack)
            .children()
            .on("click.slick", e.selectHandler),
        i(window).on(
          "orientationchange.slick.slick-" + e.instanceUid,
          i.proxy(e.orientationChange, e)
        ),
        i(window).on(
          "resize.slick.slick-" + e.instanceUid,
          i.proxy(e.resize, e)
        ),
        i("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault),
        i(window).on("load.slick.slick-" + e.instanceUid, e.setPosition),
        i(e.setPosition);
    }),
    (e.prototype.initUI = function() {
      var i = this;
      i.options.arrows === !0 &&
        i.slideCount > i.options.slidesToShow &&
        (i.$prevArrow.show(), i.$nextArrow.show()),
        i.options.dots === !0 &&
          i.slideCount > i.options.slidesToShow &&
          i.$dots.show();
    }),
    (e.prototype.keyHandler = function(i) {
      var e = this;
      i.target.tagName.match("TEXTAREA|INPUT|SELECT") ||
        (37 === i.keyCode && e.options.accessibility === !0
          ? e.changeSlide({
              data: { message: e.options.rtl === !0 ? "next" : "previous" }
            })
          : 39 === i.keyCode &&
            e.options.accessibility === !0 &&
            e.changeSlide({
              data: { message: e.options.rtl === !0 ? "previous" : "next" }
            }));
    }),
    (e.prototype.lazyLoad = function() {
      function e(e) {
        i("img[data-lazy]", e).each(function() {
          var e = i(this),
            t = i(this).attr("data-lazy"),
            o = i(this).attr("data-srcset"),
            s = i(this).attr("data-sizes") || r.$slider.attr("data-sizes"),
            n = document.createElement("img");
          (n.onload = function() {
            e.animate({ opacity: 0 }, 100, function() {
              o && (e.attr("srcset", o), s && e.attr("sizes", s)),
                e.attr("src", t).animate({ opacity: 1 }, 200, function() {
                  e.removeAttr("data-lazy data-srcset data-sizes").removeClass(
                    "slick-loading"
                  );
                }),
                r.$slider.trigger("lazyLoaded", [r, e, t]);
            });
          }),
            (n.onerror = function() {
              e
                .removeAttr("data-lazy")
                .removeClass("slick-loading")
                .addClass("slick-lazyload-error"),
                r.$slider.trigger("lazyLoadError", [r, e, t]);
            }),
            (n.src = t);
        });
      }
      var t,
        o,
        s,
        n,
        r = this;
      if (
        (r.options.centerMode === !0
          ? r.options.infinite === !0
            ? ((s = r.currentSlide + (r.options.slidesToShow / 2 + 1)),
              (n = s + r.options.slidesToShow + 2))
            : ((s = Math.max(
                0,
                r.currentSlide - (r.options.slidesToShow / 2 + 1)
              )),
              (n = 2 + (r.options.slidesToShow / 2 + 1) + r.currentSlide))
          : ((s = r.options.infinite
              ? r.options.slidesToShow + r.currentSlide
              : r.currentSlide),
            (n = Math.ceil(s + r.options.slidesToShow)),
            r.options.fade === !0 && (s > 0 && s--, n <= r.slideCount && n++)),
        (t = r.$slider.find(".slick-slide").slice(s, n)),
        "anticipated" === r.options.lazyLoad)
      )
        for (
          var l = s - 1, d = n, a = r.$slider.find(".slick-slide"), c = 0;
          c < r.options.slidesToScroll;
          c++
        )
          l < 0 && (l = r.slideCount - 1),
            (t = t.add(a.eq(l))),
            (t = t.add(a.eq(d))),
            l--,
            d++;
      e(t),
        r.slideCount <= r.options.slidesToShow
          ? ((o = r.$slider.find(".slick-slide")), e(o))
          : r.currentSlide >= r.slideCount - r.options.slidesToShow
          ? ((o = r.$slider
              .find(".slick-cloned")
              .slice(0, r.options.slidesToShow)),
            e(o))
          : 0 === r.currentSlide &&
            ((o = r.$slider
              .find(".slick-cloned")
              .slice(r.options.slidesToShow * -1)),
            e(o));
    }),
    (e.prototype.loadSlider = function() {
      var i = this;
      i.setPosition(),
        i.$slideTrack.css({ opacity: 1 }),
        i.$slider.removeClass("slick-loading"),
        i.initUI(),
        "progressive" === i.options.lazyLoad && i.progressiveLazyLoad();
    }),
    (e.prototype.next = e.prototype.slickNext = function() {
      var i = this;
      i.changeSlide({ data: { message: "next" } });
    }),
    (e.prototype.orientationChange = function() {
      var i = this;
      i.checkResponsive(), i.setPosition();
    }),
    (e.prototype.pause = e.prototype.slickPause = function() {
      var i = this;
      i.autoPlayClear(), (i.paused = !0);
    }),
    (e.prototype.play = e.prototype.slickPlay = function() {
      var i = this;
      i.autoPlay(),
        (i.options.autoplay = !0),
        (i.paused = !1),
        (i.focussed = !1),
        (i.interrupted = !1);
    }),
    (e.prototype.postSlide = function(e) {
      var t = this;
      if (
        !t.unslicked &&
        (t.$slider.trigger("afterChange", [t, e]),
        (t.animating = !1),
        t.slideCount > t.options.slidesToShow && t.setPosition(),
        (t.swipeLeft = null),
        t.options.autoplay && t.autoPlay(),
        t.options.accessibility === !0 &&
          (t.initADA(), t.options.focusOnChange))
      ) {
        var o = i(t.$slides.get(t.currentSlide));
        o.attr("tabindex", 0).focus();
      }
    }),
    (e.prototype.prev = e.prototype.slickPrev = function() {
      var i = this;
      i.changeSlide({ data: { message: "previous" } });
    }),
    (e.prototype.preventDefault = function(i) {
      i.preventDefault();
    }),
    (e.prototype.progressiveLazyLoad = function(e) {
      e = e || 1;
      var t,
        o,
        s,
        n,
        r,
        l = this,
        d = i("img[data-lazy]", l.$slider);
      d.length
        ? ((t = d.first()),
          (o = t.attr("data-lazy")),
          (s = t.attr("data-srcset")),
          (n = t.attr("data-sizes") || l.$slider.attr("data-sizes")),
          (r = document.createElement("img")),
          (r.onload = function() {
            s && (t.attr("srcset", s), n && t.attr("sizes", n)),
              t
                .attr("src", o)
                .removeAttr("data-lazy data-srcset data-sizes")
                .removeClass("slick-loading"),
              l.options.adaptiveHeight === !0 && l.setPosition(),
              l.$slider.trigger("lazyLoaded", [l, t, o]),
              l.progressiveLazyLoad();
          }),
          (r.onerror = function() {
            e < 3
              ? setTimeout(function() {
                  l.progressiveLazyLoad(e + 1);
                }, 500)
              : (t
                  .removeAttr("data-lazy")
                  .removeClass("slick-loading")
                  .addClass("slick-lazyload-error"),
                l.$slider.trigger("lazyLoadError", [l, t, o]),
                l.progressiveLazyLoad());
          }),
          (r.src = o))
        : l.$slider.trigger("allImagesLoaded", [l]);
    }),
    (e.prototype.refresh = function(e) {
      var t,
        o,
        s = this;
      (o = s.slideCount - s.options.slidesToShow),
        !s.options.infinite && s.currentSlide > o && (s.currentSlide = o),
        s.slideCount <= s.options.slidesToShow && (s.currentSlide = 0),
        (t = s.currentSlide),
        s.destroy(!0),
        i.extend(s, s.initials, { currentSlide: t }),
        s.init(),
        e || s.changeSlide({ data: { message: "index", index: t } }, !1);
    }),
    (e.prototype.registerBreakpoints = function() {
      var e,
        t,
        o,
        s = this,
        n = s.options.responsive || null;
      if ("array" === i.type(n) && n.length) {
        s.respondTo = s.options.respondTo || "window";
        for (e in n)
          if (((o = s.breakpoints.length - 1), n.hasOwnProperty(e))) {
            for (t = n[e].breakpoint; o >= 0; )
              s.breakpoints[o] &&
                s.breakpoints[o] === t &&
                s.breakpoints.splice(o, 1),
                o--;
            s.breakpoints.push(t), (s.breakpointSettings[t] = n[e].settings);
          }
        s.breakpoints.sort(function(i, e) {
          return s.options.mobileFirst ? i - e : e - i;
        });
      }
    }),
    (e.prototype.reinit = function() {
      var e = this;
      (e.$slides = e.$slideTrack
        .children(e.options.slide)
        .addClass("slick-slide")),
        (e.slideCount = e.$slides.length),
        e.currentSlide >= e.slideCount &&
          0 !== e.currentSlide &&
          (e.currentSlide = e.currentSlide - e.options.slidesToScroll),
        e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0),
        e.registerBreakpoints(),
        e.setProps(),
        e.setupInfinite(),
        e.buildArrows(),
        e.updateArrows(),
        e.initArrowEvents(),
        e.buildDots(),
        e.updateDots(),
        e.initDotEvents(),
        e.cleanUpSlideEvents(),
        e.initSlideEvents(),
        e.checkResponsive(!1, !0),
        e.options.focusOnSelect === !0 &&
          i(e.$slideTrack)
            .children()
            .on("click.slick", e.selectHandler),
        e.setSlideClasses(
          "number" == typeof e.currentSlide ? e.currentSlide : 0
        ),
        e.setPosition(),
        e.focusHandler(),
        (e.paused = !e.options.autoplay),
        e.autoPlay(),
        e.$slider.trigger("reInit", [e]);
    }),
    (e.prototype.resize = function() {
      var e = this;
      i(window).width() !== e.windowWidth &&
        (clearTimeout(e.windowDelay),
        (e.windowDelay = window.setTimeout(function() {
          (e.windowWidth = i(window).width()),
            e.checkResponsive(),
            e.unslicked || e.setPosition();
        }, 50)));
    }),
    (e.prototype.removeSlide = e.prototype.slickRemove = function(i, e, t) {
      var o = this;
      return (
        "boolean" == typeof i
          ? ((e = i), (i = e === !0 ? 0 : o.slideCount - 1))
          : (i = e === !0 ? --i : i),
        !(o.slideCount < 1 || i < 0 || i > o.slideCount - 1) &&
          (o.unload(),
          t === !0
            ? o.$slideTrack.children().remove()
            : o.$slideTrack
                .children(this.options.slide)
                .eq(i)
                .remove(),
          (o.$slides = o.$slideTrack.children(this.options.slide)),
          o.$slideTrack.children(this.options.slide).detach(),
          o.$slideTrack.append(o.$slides),
          (o.$slidesCache = o.$slides),
          void o.reinit())
      );
    }),
    (e.prototype.setCSS = function(i) {
      var e,
        t,
        o = this,
        s = {};
      o.options.rtl === !0 && (i = -i),
        (e = "left" == o.positionProp ? Math.ceil(i) + "px" : "0px"),
        (t = "top" == o.positionProp ? Math.ceil(i) + "px" : "0px"),
        (s[o.positionProp] = i),
        o.transformsEnabled === !1
          ? o.$slideTrack.css(s)
          : ((s = {}),
            o.cssTransitions === !1
              ? ((s[o.animType] = "translate(" + e + ", " + t + ")"),
                o.$slideTrack.css(s))
              : ((s[o.animType] = "translate3d(" + e + ", " + t + ", 0px)"),
                o.$slideTrack.css(s)));
    }),
    (e.prototype.setDimensions = function() {
      var i = this;
      i.options.vertical === !1
        ? i.options.centerMode === !0 &&
          i.$list.css({ padding: "0px " + i.options.centerPadding })
        : (i.$list.height(
            i.$slides.first().outerHeight(!0) * i.options.slidesToShow
          ),
          i.options.centerMode === !0 &&
            i.$list.css({ padding: i.options.centerPadding + " 0px" })),
        (i.listWidth = i.$list.width()),
        (i.listHeight = i.$list.height()),
        i.options.vertical === !1 && i.options.variableWidth === !1
          ? ((i.slideWidth = Math.ceil(i.listWidth / i.options.slidesToShow)),
            i.$slideTrack.width(
              Math.ceil(
                i.slideWidth * i.$slideTrack.children(".slick-slide").length
              )
            ))
          : i.options.variableWidth === !0
          ? i.$slideTrack.width(5e3 * i.slideCount)
          : ((i.slideWidth = Math.ceil(i.listWidth)),
            i.$slideTrack.height(
              Math.ceil(
                i.$slides.first().outerHeight(!0) *
                  i.$slideTrack.children(".slick-slide").length
              )
            ));
      var e = i.$slides.first().outerWidth(!0) - i.$slides.first().width();
      i.options.variableWidth === !1 &&
        i.$slideTrack.children(".slick-slide").width(i.slideWidth - e);
    }),
    (e.prototype.setFade = function() {
      var e,
        t = this;
      t.$slides.each(function(o, s) {
        (e = t.slideWidth * o * -1),
          t.options.rtl === !0
            ? i(s).css({
                position: "relative",
                right: e,
                top: 0,
                zIndex: t.options.zIndex - 2,
                opacity: 0
              })
            : i(s).css({
                position: "relative",
                left: e,
                top: 0,
                zIndex: t.options.zIndex - 2,
                opacity: 0
              });
      }),
        t.$slides
          .eq(t.currentSlide)
          .css({ zIndex: t.options.zIndex - 1, opacity: 1 });
    }),
    (e.prototype.setHeight = function() {
      var i = this;
      if (
        1 === i.options.slidesToShow &&
        i.options.adaptiveHeight === !0 &&
        i.options.vertical === !1
      ) {
        var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
        i.$list.css("height", e);
      }
    }),
    (e.prototype.setOption = e.prototype.slickSetOption = function() {
      var e,
        t,
        o,
        s,
        n,
        r = this,
        l = !1;
      if (
        ("object" === i.type(arguments[0])
          ? ((o = arguments[0]), (l = arguments[1]), (n = "multiple"))
          : "string" === i.type(arguments[0]) &&
            ((o = arguments[0]),
            (s = arguments[1]),
            (l = arguments[2]),
            "responsive" === arguments[0] && "array" === i.type(arguments[1])
              ? (n = "responsive")
              : "undefined" != typeof arguments[1] && (n = "single")),
        "single" === n)
      )
        r.options[o] = s;
      else if ("multiple" === n)
        i.each(o, function(i, e) {
          r.options[i] = e;
        });
      else if ("responsive" === n)
        for (t in s)
          if ("array" !== i.type(r.options.responsive))
            r.options.responsive = [s[t]];
          else {
            for (e = r.options.responsive.length - 1; e >= 0; )
              r.options.responsive[e].breakpoint === s[t].breakpoint &&
                r.options.responsive.splice(e, 1),
                e--;
            r.options.responsive.push(s[t]);
          }
      l && (r.unload(), r.reinit());
    }),
    (e.prototype.setPosition = function() {
      var i = this;
      i.setDimensions(),
        i.setHeight(),
        i.options.fade === !1
          ? i.setCSS(i.getLeft(i.currentSlide))
          : i.setFade(),
        i.$slider.trigger("setPosition", [i]);
    }),
    (e.prototype.setProps = function() {
      var i = this,
        e = document.body.style;
      (i.positionProp = i.options.vertical === !0 ? "top" : "left"),
        "top" === i.positionProp
          ? i.$slider.addClass("slick-vertical")
          : i.$slider.removeClass("slick-vertical"),
        (void 0 === e.WebkitTransition &&
          void 0 === e.MozTransition &&
          void 0 === e.msTransition) ||
          (i.options.useCSS === !0 && (i.cssTransitions = !0)),
        i.options.fade &&
          ("number" == typeof i.options.zIndex
            ? i.options.zIndex < 3 && (i.options.zIndex = 3)
            : (i.options.zIndex = i.defaults.zIndex)),
        void 0 !== e.OTransform &&
          ((i.animType = "OTransform"),
          (i.transformType = "-o-transform"),
          (i.transitionType = "OTransition"),
          void 0 === e.perspectiveProperty &&
            void 0 === e.webkitPerspective &&
            (i.animType = !1)),
        void 0 !== e.MozTransform &&
          ((i.animType = "MozTransform"),
          (i.transformType = "-moz-transform"),
          (i.transitionType = "MozTransition"),
          void 0 === e.perspectiveProperty &&
            void 0 === e.MozPerspective &&
            (i.animType = !1)),
        void 0 !== e.webkitTransform &&
          ((i.animType = "webkitTransform"),
          (i.transformType = "-webkit-transform"),
          (i.transitionType = "webkitTransition"),
          void 0 === e.perspectiveProperty &&
            void 0 === e.webkitPerspective &&
            (i.animType = !1)),
        void 0 !== e.msTransform &&
          ((i.animType = "msTransform"),
          (i.transformType = "-ms-transform"),
          (i.transitionType = "msTransition"),
          void 0 === e.msTransform && (i.animType = !1)),
        void 0 !== e.transform &&
          i.animType !== !1 &&
          ((i.animType = "transform"),
          (i.transformType = "transform"),
          (i.transitionType = "transition")),
        (i.transformsEnabled =
          i.options.useTransform && null !== i.animType && i.animType !== !1);
    }),
    (e.prototype.setSlideClasses = function(i) {
      var e,
        t,
        o,
        s,
        n = this;
      if (
        ((t = n.$slider
          .find(".slick-slide")
          .removeClass("slick-active slick-center slick-current")
          .attr("aria-hidden", "true")),
        n.$slides.eq(i).addClass("slick-current"),
        n.options.centerMode === !0)
      ) {
        var r = n.options.slidesToShow % 2 === 0 ? 1 : 0;
        (e = Math.floor(n.options.slidesToShow / 2)),
          n.options.infinite === !0 &&
            (i >= e && i <= n.slideCount - 1 - e
              ? n.$slides
                  .slice(i - e + r, i + e + 1)
                  .addClass("slick-active")
                  .attr("aria-hidden", "false")
              : ((o = n.options.slidesToShow + i),
                t
                  .slice(o - e + 1 + r, o + e + 2)
                  .addClass("slick-active")
                  .attr("aria-hidden", "false")),
            0 === i
              ? t
                  .eq(t.length - 1 - n.options.slidesToShow)
                  .addClass("slick-center")
              : i === n.slideCount - 1 &&
                t.eq(n.options.slidesToShow).addClass("slick-center")),
          n.$slides.eq(i).addClass("slick-center");
      } else
        i >= 0 && i <= n.slideCount - n.options.slidesToShow
          ? n.$slides
              .slice(i, i + n.options.slidesToShow)
              .addClass("slick-active")
              .attr("aria-hidden", "false")
          : t.length <= n.options.slidesToShow
          ? t.addClass("slick-active").attr("aria-hidden", "false")
          : ((s = n.slideCount % n.options.slidesToShow),
            (o = n.options.infinite === !0 ? n.options.slidesToShow + i : i),
            n.options.slidesToShow == n.options.slidesToScroll &&
            n.slideCount - i < n.options.slidesToShow
              ? t
                  .slice(o - (n.options.slidesToShow - s), o + s)
                  .addClass("slick-active")
                  .attr("aria-hidden", "false")
              : t
                  .slice(o, o + n.options.slidesToShow)
                  .addClass("slick-active")
                  .attr("aria-hidden", "false"));
      ("ondemand" !== n.options.lazyLoad &&
        "anticipated" !== n.options.lazyLoad) ||
        n.lazyLoad();
    }),
    (e.prototype.setupInfinite = function() {
      var e,
        t,
        o,
        s = this;
      if (
        (s.options.fade === !0 && (s.options.centerMode = !1),
        s.options.infinite === !0 &&
          s.options.fade === !1 &&
          ((t = null), s.slideCount > s.options.slidesToShow))
      ) {
        for (
          o =
            s.options.centerMode === !0
              ? s.options.slidesToShow + 1
              : s.options.slidesToShow,
            e = s.slideCount;
          e > s.slideCount - o;
          e -= 1
        )
          (t = e - 1),
            i(s.$slides[t])
              .clone(!0)
              .attr("id", "")
              .attr("data-slick-index", t - s.slideCount)
              .prependTo(s.$slideTrack)
              .addClass("slick-cloned");
        for (e = 0; e < o + s.slideCount; e += 1)
          (t = e),
            i(s.$slides[t])
              .clone(!0)
              .attr("id", "")
              .attr("data-slick-index", t + s.slideCount)
              .appendTo(s.$slideTrack)
              .addClass("slick-cloned");
        s.$slideTrack
          .find(".slick-cloned")
          .find("[id]")
          .each(function() {
            i(this).attr("id", "");
          });
      }
    }),
    (e.prototype.interrupt = function(i) {
      var e = this;
      i || e.autoPlay(), (e.interrupted = i);
    }),
    (e.prototype.selectHandler = function(e) {
      var t = this,
        o = i(e.target).is(".slick-slide")
          ? i(e.target)
          : i(e.target).parents(".slick-slide"),
        s = parseInt(o.attr("data-slick-index"));
      return (
        s || (s = 0),
        t.slideCount <= t.options.slidesToShow
          ? void t.slideHandler(s, !1, !0)
          : void t.slideHandler(s)
      );
    }),
    (e.prototype.slideHandler = function(i, e, t) {
      var o,
        s,
        n,
        r,
        l,
        d = null,
        a = this;
      if (
        ((e = e || !1),
        !(
          (a.animating === !0 && a.options.waitForAnimate === !0) ||
          (a.options.fade === !0 && a.currentSlide === i)
        ))
      )
        return (
          e === !1 && a.asNavFor(i),
          (o = i),
          (d = a.getLeft(o)),
          (r = a.getLeft(a.currentSlide)),
          (a.currentLeft = null === a.swipeLeft ? r : a.swipeLeft),
          a.options.infinite === !1 &&
          a.options.centerMode === !1 &&
          (i < 0 || i > a.getDotCount() * a.options.slidesToScroll)
            ? void (
                a.options.fade === !1 &&
                ((o = a.currentSlide),
                t !== !0 && a.slideCount > a.options.slidesToShow
                  ? a.animateSlide(r, function() {
                      a.postSlide(o);
                    })
                  : a.postSlide(o))
              )
            : a.options.infinite === !1 &&
              a.options.centerMode === !0 &&
              (i < 0 || i > a.slideCount - a.options.slidesToScroll)
            ? void (
                a.options.fade === !1 &&
                ((o = a.currentSlide),
                t !== !0 && a.slideCount > a.options.slidesToShow
                  ? a.animateSlide(r, function() {
                      a.postSlide(o);
                    })
                  : a.postSlide(o))
              )
            : (a.options.autoplay && clearInterval(a.autoPlayTimer),
              (s =
                o < 0
                  ? a.slideCount % a.options.slidesToScroll !== 0
                    ? a.slideCount - (a.slideCount % a.options.slidesToScroll)
                    : a.slideCount + o
                  : o >= a.slideCount
                  ? a.slideCount % a.options.slidesToScroll !== 0
                    ? 0
                    : o - a.slideCount
                  : o),
              (a.animating = !0),
              a.$slider.trigger("beforeChange", [a, a.currentSlide, s]),
              (n = a.currentSlide),
              (a.currentSlide = s),
              a.setSlideClasses(a.currentSlide),
              a.options.asNavFor &&
                ((l = a.getNavTarget()),
                (l = l.slick("getSlick")),
                l.slideCount <= l.options.slidesToShow &&
                  l.setSlideClasses(a.currentSlide)),
              a.updateDots(),
              a.updateArrows(),
              a.options.fade === !0
                ? (t !== !0
                    ? (a.fadeSlideOut(n),
                      a.fadeSlide(s, function() {
                        a.postSlide(s);
                      }))
                    : a.postSlide(s),
                  void a.animateHeight())
                : void (t !== !0 && a.slideCount > a.options.slidesToShow
                    ? a.animateSlide(d, function() {
                        a.postSlide(s);
                      })
                    : a.postSlide(s)))
        );
    }),
    (e.prototype.startLoad = function() {
      var i = this;
      i.options.arrows === !0 &&
        i.slideCount > i.options.slidesToShow &&
        (i.$prevArrow.hide(), i.$nextArrow.hide()),
        i.options.dots === !0 &&
          i.slideCount > i.options.slidesToShow &&
          i.$dots.hide(),
        i.$slider.addClass("slick-loading");
    }),
    (e.prototype.swipeDirection = function() {
      var i,
        e,
        t,
        o,
        s = this;
      return (
        (i = s.touchObject.startX - s.touchObject.curX),
        (e = s.touchObject.startY - s.touchObject.curY),
        (t = Math.atan2(e, i)),
        (o = Math.round((180 * t) / Math.PI)),
        o < 0 && (o = 360 - Math.abs(o)),
        o <= 45 && o >= 0
          ? s.options.rtl === !1
            ? "left"
            : "right"
          : o <= 360 && o >= 315
          ? s.options.rtl === !1
            ? "left"
            : "right"
          : o >= 135 && o <= 225
          ? s.options.rtl === !1
            ? "right"
            : "left"
          : s.options.verticalSwiping === !0
          ? o >= 35 && o <= 135
            ? "down"
            : "up"
          : "vertical"
      );
    }),
    (e.prototype.swipeEnd = function(i) {
      var e,
        t,
        o = this;
      if (((o.dragging = !1), (o.swiping = !1), o.scrolling))
        return (o.scrolling = !1), !1;
      if (
        ((o.interrupted = !1),
        (o.shouldClick = !(o.touchObject.swipeLength > 10)),
        void 0 === o.touchObject.curX)
      )
        return !1;
      if (
        (o.touchObject.edgeHit === !0 &&
          o.$slider.trigger("edge", [o, o.swipeDirection()]),
        o.touchObject.swipeLength >= o.touchObject.minSwipe)
      ) {
        switch ((t = o.swipeDirection())) {
          case "left":
          case "down":
            (e = o.options.swipeToSlide
              ? o.checkNavigable(o.currentSlide + o.getSlideCount())
              : o.currentSlide + o.getSlideCount()),
              (o.currentDirection = 0);
            break;
          case "right":
          case "up":
            (e = o.options.swipeToSlide
              ? o.checkNavigable(o.currentSlide - o.getSlideCount())
              : o.currentSlide - o.getSlideCount()),
              (o.currentDirection = 1);
        }
        "vertical" != t &&
          (o.slideHandler(e),
          (o.touchObject = {}),
          o.$slider.trigger("swipe", [o, t]));
      } else
        o.touchObject.startX !== o.touchObject.curX &&
          (o.slideHandler(o.currentSlide), (o.touchObject = {}));
    }),
    (e.prototype.swipeHandler = function(i) {
      var e = this;
      if (
        !(
          e.options.swipe === !1 ||
          ("ontouchend" in document && e.options.swipe === !1) ||
          (e.options.draggable === !1 && i.type.indexOf("mouse") !== -1)
        )
      )
        switch (
          ((e.touchObject.fingerCount =
            i.originalEvent && void 0 !== i.originalEvent.touches
              ? i.originalEvent.touches.length
              : 1),
          (e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold),
          e.options.verticalSwiping === !0 &&
            (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold),
          i.data.action)
        ) {
          case "start":
            e.swipeStart(i);
            break;
          case "move":
            e.swipeMove(i);
            break;
          case "end":
            e.swipeEnd(i);
        }
    }),
    (e.prototype.swipeMove = function(i) {
      var e,
        t,
        o,
        s,
        n,
        r,
        l = this;
      return (
        (n = void 0 !== i.originalEvent ? i.originalEvent.touches : null),
        !(!l.dragging || l.scrolling || (n && 1 !== n.length)) &&
          ((e = l.getLeft(l.currentSlide)),
          (l.touchObject.curX = void 0 !== n ? n[0].pageX : i.clientX),
          (l.touchObject.curY = void 0 !== n ? n[0].pageY : i.clientY),
          (l.touchObject.swipeLength = Math.round(
            Math.sqrt(Math.pow(l.touchObject.curX - l.touchObject.startX, 2))
          )),
          (r = Math.round(
            Math.sqrt(Math.pow(l.touchObject.curY - l.touchObject.startY, 2))
          )),
          !l.options.verticalSwiping && !l.swiping && r > 4
            ? ((l.scrolling = !0), !1)
            : (l.options.verticalSwiping === !0 &&
                (l.touchObject.swipeLength = r),
              (t = l.swipeDirection()),
              void 0 !== i.originalEvent &&
                l.touchObject.swipeLength > 4 &&
                ((l.swiping = !0), i.preventDefault()),
              (s =
                (l.options.rtl === !1 ? 1 : -1) *
                (l.touchObject.curX > l.touchObject.startX ? 1 : -1)),
              l.options.verticalSwiping === !0 &&
                (s = l.touchObject.curY > l.touchObject.startY ? 1 : -1),
              (o = l.touchObject.swipeLength),
              (l.touchObject.edgeHit = !1),
              l.options.infinite === !1 &&
                ((0 === l.currentSlide && "right" === t) ||
                  (l.currentSlide >= l.getDotCount() && "left" === t)) &&
                ((o = l.touchObject.swipeLength * l.options.edgeFriction),
                (l.touchObject.edgeHit = !0)),
              l.options.vertical === !1
                ? (l.swipeLeft = e + o * s)
                : (l.swipeLeft = e + o * (l.$list.height() / l.listWidth) * s),
              l.options.verticalSwiping === !0 && (l.swipeLeft = e + o * s),
              l.options.fade !== !0 &&
                l.options.touchMove !== !1 &&
                (l.animating === !0
                  ? ((l.swipeLeft = null), !1)
                  : void l.setCSS(l.swipeLeft))))
      );
    }),
    (e.prototype.swipeStart = function(i) {
      var e,
        t = this;
      return (
        (t.interrupted = !0),
        1 !== t.touchObject.fingerCount ||
        t.slideCount <= t.options.slidesToShow
          ? ((t.touchObject = {}), !1)
          : (void 0 !== i.originalEvent &&
              void 0 !== i.originalEvent.touches &&
              (e = i.originalEvent.touches[0]),
            (t.touchObject.startX = t.touchObject.curX =
              void 0 !== e ? e.pageX : i.clientX),
            (t.touchObject.startY = t.touchObject.curY =
              void 0 !== e ? e.pageY : i.clientY),
            void (t.dragging = !0))
      );
    }),
    (e.prototype.unfilterSlides = e.prototype.slickUnfilter = function() {
      var i = this;
      null !== i.$slidesCache &&
        (i.unload(),
        i.$slideTrack.children(this.options.slide).detach(),
        i.$slidesCache.appendTo(i.$slideTrack),
        i.reinit());
    }),
    (e.prototype.unload = function() {
      var e = this;
      i(".slick-cloned", e.$slider).remove(),
        e.$dots && e.$dots.remove(),
        e.$prevArrow &&
          e.htmlExpr.test(e.options.prevArrow) &&
          e.$prevArrow.remove(),
        e.$nextArrow &&
          e.htmlExpr.test(e.options.nextArrow) &&
          e.$nextArrow.remove(),
        e.$slides
          .removeClass("slick-slide slick-active slick-visible slick-current")
          .attr("aria-hidden", "true")
          .css("width", "");
    }),
    (e.prototype.unslick = function(i) {
      var e = this;
      e.$slider.trigger("unslick", [e, i]), e.destroy();
    }),
    (e.prototype.updateArrows = function() {
      var i,
        e = this;
      (i = Math.floor(e.options.slidesToShow / 2)),
        e.options.arrows === !0 &&
          e.slideCount > e.options.slidesToShow &&
          !e.options.infinite &&
          (e.$prevArrow
            .removeClass("slick-disabled")
            .attr("aria-disabled", "false"),
          e.$nextArrow
            .removeClass("slick-disabled")
            .attr("aria-disabled", "false"),
          0 === e.currentSlide
            ? (e.$prevArrow
                .addClass("slick-disabled")
                .attr("aria-disabled", "true"),
              e.$nextArrow
                .removeClass("slick-disabled")
                .attr("aria-disabled", "false"))
            : e.currentSlide >= e.slideCount - e.options.slidesToShow &&
              e.options.centerMode === !1
            ? (e.$nextArrow
                .addClass("slick-disabled")
                .attr("aria-disabled", "true"),
              e.$prevArrow
                .removeClass("slick-disabled")
                .attr("aria-disabled", "false"))
            : e.currentSlide >= e.slideCount - 1 &&
              e.options.centerMode === !0 &&
              (e.$nextArrow
                .addClass("slick-disabled")
                .attr("aria-disabled", "true"),
              e.$prevArrow
                .removeClass("slick-disabled")
                .attr("aria-disabled", "false")));
    }),
    (e.prototype.updateDots = function() {
      var i = this;
      null !== i.$dots &&
        (i.$dots
          .find("li")
          .removeClass("slick-active")
          .end(),
        i.$dots
          .find("li")
          .eq(Math.floor(i.currentSlide / i.options.slidesToScroll))
          .addClass("slick-active"));
    }),
    (e.prototype.visibility = function() {
      var i = this;
      i.options.autoplay &&
        (document[i.hidden] ? (i.interrupted = !0) : (i.interrupted = !1));
    }),
    (i.fn.slick = function() {
      var i,
        t,
        o = this,
        s = arguments[0],
        n = Array.prototype.slice.call(arguments, 1),
        r = o.length;
      for (i = 0; i < r; i++)
        if (
          ("object" == typeof s || "undefined" == typeof s
            ? (o[i].slick = new e(o[i], s))
            : (t = o[i].slick[s].apply(o[i].slick, n)),
          "undefined" != typeof t)
        )
          return t;
      return o;
    });
});

/**
 * Swiper 4.2.0
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * http://www.idangero.us/swiper/
 *
 * Copyright 2014-2018 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: March 16, 2018
 */
!(function(e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define(t)
    : (e.Swiper = t());
})(this, function() {
  "use strict";
  var e =
      "undefined" == typeof document
        ? {
            body: {},
            addEventListener: function() {},
            removeEventListener: function() {},
            activeElement: { blur: function() {}, nodeName: "" },
            querySelector: function() {
              return null;
            },
            querySelectorAll: function() {
              return [];
            },
            getElementById: function() {
              return null;
            },
            createEvent: function() {
              return { initEvent: function() {} };
            },
            createElement: function() {
              return {
                children: [],
                childNodes: [],
                style: {},
                setAttribute: function() {},
                getElementsByTagName: function() {
                  return [];
                }
              };
            },
            location: { hash: "" }
          }
        : document,
    t =
      "undefined" == typeof window
        ? {
            document: e,
            navigator: { userAgent: "" },
            location: {},
            history: {},
            CustomEvent: function() {
              return this;
            },
            addEventListener: function() {},
            removeEventListener: function() {},
            getComputedStyle: function() {
              return {
                getPropertyValue: function() {
                  return "";
                }
              };
            },
            Image: function() {},
            Date: function() {},
            screen: {},
            setTimeout: function() {},
            clearTimeout: function() {}
          }
        : window,
    i = function(e) {
      for (var t = 0; t < e.length; t += 1) this[t] = e[t];
      return (this.length = e.length), this;
    };
  function s(s, a) {
    var r = [],
      n = 0;
    if (s && !a && s instanceof i) return s;
    if (s)
      if ("string" == typeof s) {
        var o,
          l,
          d = s.trim();
        if (d.indexOf("<") >= 0 && d.indexOf(">") >= 0) {
          var h = "div";
          for (
            0 === d.indexOf("<li") && (h = "ul"),
              0 === d.indexOf("<tr") && (h = "tbody"),
              (0 !== d.indexOf("<td") && 0 !== d.indexOf("<th")) || (h = "tr"),
              0 === d.indexOf("<tbody") && (h = "table"),
              0 === d.indexOf("<option") && (h = "select"),
              (l = e.createElement(h)).innerHTML = d,
              n = 0;
            n < l.childNodes.length;
            n += 1
          )
            r.push(l.childNodes[n]);
        } else
          for (
            o =
              a || "#" !== s[0] || s.match(/[ .<>:~]/)
                ? (a || e).querySelectorAll(s.trim())
                : [e.getElementById(s.trim().split("#")[1])],
              n = 0;
            n < o.length;
            n += 1
          )
            o[n] && r.push(o[n]);
      } else if (s.nodeType || s === t || s === e) r.push(s);
      else if (s.length > 0 && s[0].nodeType)
        for (n = 0; n < s.length; n += 1) r.push(s[n]);
    return new i(r);
  }
  function a(e) {
    for (var t = [], i = 0; i < e.length; i += 1)
      -1 === t.indexOf(e[i]) && t.push(e[i]);
    return t;
  }
  (s.fn = i.prototype), (s.Class = i), (s.Dom7 = i);
  var r = {
    addClass: function(e) {
      if (void 0 === e) return this;
      for (var t = e.split(" "), i = 0; i < t.length; i += 1)
        for (var s = 0; s < this.length; s += 1)
          void 0 !== this[s].classList && this[s].classList.add(t[i]);
      return this;
    },
    removeClass: function(e) {
      for (var t = e.split(" "), i = 0; i < t.length; i += 1)
        for (var s = 0; s < this.length; s += 1)
          void 0 !== this[s].classList && this[s].classList.remove(t[i]);
      return this;
    },
    hasClass: function(e) {
      return !!this[0] && this[0].classList.contains(e);
    },
    toggleClass: function(e) {
      for (var t = e.split(" "), i = 0; i < t.length; i += 1)
        for (var s = 0; s < this.length; s += 1)
          void 0 !== this[s].classList && this[s].classList.toggle(t[i]);
      return this;
    },
    attr: function(e, t) {
      var i = arguments;
      if (1 === arguments.length && "string" == typeof e)
        return this[0] ? this[0].getAttribute(e) : void 0;
      for (var s = 0; s < this.length; s += 1)
        if (2 === i.length) this[s].setAttribute(e, t);
        else
          for (var a in e) (this[s][a] = e[a]), this[s].setAttribute(a, e[a]);
      return this;
    },
    removeAttr: function(e) {
      for (var t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
      return this;
    },
    data: function(e, t) {
      var i;
      if (void 0 !== t) {
        for (var s = 0; s < this.length; s += 1)
          (i = this[s]).dom7ElementDataStorage ||
            (i.dom7ElementDataStorage = {}),
            (i.dom7ElementDataStorage[e] = t);
        return this;
      }
      if ((i = this[0])) {
        if (i.dom7ElementDataStorage && e in i.dom7ElementDataStorage)
          return i.dom7ElementDataStorage[e];
        var a = i.getAttribute("data-" + e);
        return a || void 0;
      }
    },
    transform: function(e) {
      for (var t = 0; t < this.length; t += 1) {
        var i = this[t].style;
        (i.webkitTransform = e), (i.transform = e);
      }
      return this;
    },
    transition: function(e) {
      "string" != typeof e && (e += "ms");
      for (var t = 0; t < this.length; t += 1) {
        var i = this[t].style;
        (i.webkitTransitionDuration = e), (i.transitionDuration = e);
      }
      return this;
    },
    on: function() {
      for (var e, t = [], i = arguments.length; i--; ) t[i] = arguments[i];
      var a = t[0],
        r = t[1],
        n = t[2],
        o = t[3];
      function l(e) {
        var t = e.target;
        if (t) {
          var i = e.target.dom7EventData || [];
          if ((i.unshift(e), s(t).is(r))) n.apply(t, i);
          else
            for (var a = s(t).parents(), o = 0; o < a.length; o += 1)
              s(a[o]).is(r) && n.apply(a[o], i);
        }
      }
      function d(e) {
        var t = e && e.target ? e.target.dom7EventData || [] : [];
        t.unshift(e), n.apply(this, t);
      }
      "function" == typeof t[1] &&
        ((a = (e = t)[0]), (n = e[1]), (o = e[2]), (r = void 0)),
        o || (o = !1);
      for (var h, p = a.split(" "), c = 0; c < this.length; c += 1) {
        var u = this[c];
        if (r)
          for (h = 0; h < p.length; h += 1)
            u.dom7LiveListeners || (u.dom7LiveListeners = []),
              u.dom7LiveListeners.push({
                type: a,
                listener: n,
                proxyListener: l
              }),
              u.addEventListener(p[h], l, o);
        else
          for (h = 0; h < p.length; h += 1)
            u.dom7Listeners || (u.dom7Listeners = []),
              u.dom7Listeners.push({ type: a, listener: n, proxyListener: d }),
              u.addEventListener(p[h], d, o);
      }
      return this;
    },
    off: function() {
      for (var e, t = [], i = arguments.length; i--; ) t[i] = arguments[i];
      var s = t[0],
        a = t[1],
        r = t[2],
        n = t[3];
      "function" == typeof t[1] &&
        ((s = (e = t)[0]), (r = e[1]), (n = e[2]), (a = void 0)),
        n || (n = !1);
      for (var o = s.split(" "), l = 0; l < o.length; l += 1)
        for (var d = 0; d < this.length; d += 1) {
          var h = this[d];
          if (a) {
            if (h.dom7LiveListeners)
              for (var p = 0; p < h.dom7LiveListeners.length; p += 1)
                r
                  ? h.dom7LiveListeners[p].listener === r &&
                    h.removeEventListener(
                      o[l],
                      h.dom7LiveListeners[p].proxyListener,
                      n
                    )
                  : h.dom7LiveListeners[p].type === o[l] &&
                    h.removeEventListener(
                      o[l],
                      h.dom7LiveListeners[p].proxyListener,
                      n
                    );
          } else if (h.dom7Listeners)
            for (var c = 0; c < h.dom7Listeners.length; c += 1)
              r
                ? h.dom7Listeners[c].listener === r &&
                  h.removeEventListener(
                    o[l],
                    h.dom7Listeners[c].proxyListener,
                    n
                  )
                : h.dom7Listeners[c].type === o[l] &&
                  h.removeEventListener(
                    o[l],
                    h.dom7Listeners[c].proxyListener,
                    n
                  );
        }
      return this;
    },
    trigger: function() {
      for (var i = [], s = arguments.length; s--; ) i[s] = arguments[s];
      for (var a = i[0].split(" "), r = i[1], n = 0; n < a.length; n += 1)
        for (var o = 0; o < this.length; o += 1) {
          var l = void 0;
          try {
            l = new t.CustomEvent(a[n], {
              detail: r,
              bubbles: !0,
              cancelable: !0
            });
          } catch (t) {
            (l = e.createEvent("Event")).initEvent(a[n], !0, !0),
              (l.detail = r);
          }
          (this[o].dom7EventData = i.filter(function(e, t) {
            return t > 0;
          })),
            this[o].dispatchEvent(l),
            (this[o].dom7EventData = []),
            delete this[o].dom7EventData;
        }
      return this;
    },
    transitionEnd: function(e) {
      var t,
        i = ["webkitTransitionEnd", "transitionend"],
        s = this;
      function a(r) {
        if (r.target === this)
          for (e.call(this, r), t = 0; t < i.length; t += 1) s.off(i[t], a);
      }
      if (e) for (t = 0; t < i.length; t += 1) s.on(i[t], a);
      return this;
    },
    outerWidth: function(e) {
      if (this.length > 0) {
        if (e) {
          var t = this.styles();
          return (
            this[0].offsetWidth +
            parseFloat(t.getPropertyValue("margin-right")) +
            parseFloat(t.getPropertyValue("margin-left"))
          );
        }
        return this[0].offsetWidth;
      }
      return null;
    },
    outerHeight: function(e) {
      if (this.length > 0) {
        if (e) {
          var t = this.styles();
          return (
            this[0].offsetHeight +
            parseFloat(t.getPropertyValue("margin-top")) +
            parseFloat(t.getPropertyValue("margin-bottom"))
          );
        }
        return this[0].offsetHeight;
      }
      return null;
    },
    offset: function() {
      if (this.length > 0) {
        var i = this[0],
          s = i.getBoundingClientRect(),
          a = e.body,
          r = i.clientTop || a.clientTop || 0,
          n = i.clientLeft || a.clientLeft || 0,
          o = i === t ? t.scrollY : i.scrollTop,
          l = i === t ? t.scrollX : i.scrollLeft;
        return { top: s.top + o - r, left: s.left + l - n };
      }
      return null;
    },
    css: function(e, i) {
      var s;
      if (1 === arguments.length) {
        if ("string" != typeof e) {
          for (s = 0; s < this.length; s += 1)
            for (var a in e) this[s].style[a] = e[a];
          return this;
        }
        if (this[0])
          return t.getComputedStyle(this[0], null).getPropertyValue(e);
      }
      if (2 === arguments.length && "string" == typeof e) {
        for (s = 0; s < this.length; s += 1) this[s].style[e] = i;
        return this;
      }
      return this;
    },
    each: function(e) {
      if (!e) return this;
      for (var t = 0; t < this.length; t += 1)
        if (!1 === e.call(this[t], t, this[t])) return this;
      return this;
    },
    html: function(e) {
      if (void 0 === e) return this[0] ? this[0].innerHTML : void 0;
      for (var t = 0; t < this.length; t += 1) this[t].innerHTML = e;
      return this;
    },
    text: function(e) {
      if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
      for (var t = 0; t < this.length; t += 1) this[t].textContent = e;
      return this;
    },
    is: function(a) {
      var r,
        n,
        o = this[0];
      if (!o || void 0 === a) return !1;
      if ("string" == typeof a) {
        if (o.matches) return o.matches(a);
        if (o.webkitMatchesSelector) return o.webkitMatchesSelector(a);
        if (o.msMatchesSelector) return o.msMatchesSelector(a);
        for (r = s(a), n = 0; n < r.length; n += 1) if (r[n] === o) return !0;
        return !1;
      }
      if (a === e) return o === e;
      if (a === t) return o === t;
      if (a.nodeType || a instanceof i) {
        for (r = a.nodeType ? [a] : a, n = 0; n < r.length; n += 1)
          if (r[n] === o) return !0;
        return !1;
      }
      return !1;
    },
    index: function() {
      var e,
        t = this[0];
      if (t) {
        for (e = 0; null !== (t = t.previousSibling); )
          1 === t.nodeType && (e += 1);
        return e;
      }
    },
    eq: function(e) {
      if (void 0 === e) return this;
      var t,
        s = this.length;
      return new i(
        e > s - 1 ? [] : e < 0 ? ((t = s + e) < 0 ? [] : [this[t]]) : [this[e]]
      );
    },
    append: function() {
      for (var t, s = [], a = arguments.length; a--; ) s[a] = arguments[a];
      for (var r = 0; r < s.length; r += 1) {
        t = s[r];
        for (var n = 0; n < this.length; n += 1)
          if ("string" == typeof t) {
            var o = e.createElement("div");
            for (o.innerHTML = t; o.firstChild; )
              this[n].appendChild(o.firstChild);
          } else if (t instanceof i)
            for (var l = 0; l < t.length; l += 1) this[n].appendChild(t[l]);
          else this[n].appendChild(t);
      }
      return this;
    },
    prepend: function(t) {
      var s, a;
      for (s = 0; s < this.length; s += 1)
        if ("string" == typeof t) {
          var r = e.createElement("div");
          for (r.innerHTML = t, a = r.childNodes.length - 1; a >= 0; a -= 1)
            this[s].insertBefore(r.childNodes[a], this[s].childNodes[0]);
        } else if (t instanceof i)
          for (a = 0; a < t.length; a += 1)
            this[s].insertBefore(t[a], this[s].childNodes[0]);
        else this[s].insertBefore(t, this[s].childNodes[0]);
      return this;
    },
    next: function(e) {
      return this.length > 0
        ? e
          ? this[0].nextElementSibling && s(this[0].nextElementSibling).is(e)
            ? new i([this[0].nextElementSibling])
            : new i([])
          : this[0].nextElementSibling
          ? new i([this[0].nextElementSibling])
          : new i([])
        : new i([]);
    },
    nextAll: function(e) {
      var t = [],
        a = this[0];
      if (!a) return new i([]);
      for (; a.nextElementSibling; ) {
        var r = a.nextElementSibling;
        e ? s(r).is(e) && t.push(r) : t.push(r), (a = r);
      }
      return new i(t);
    },
    prev: function(e) {
      if (this.length > 0) {
        var t = this[0];
        return e
          ? t.previousElementSibling && s(t.previousElementSibling).is(e)
            ? new i([t.previousElementSibling])
            : new i([])
          : t.previousElementSibling
          ? new i([t.previousElementSibling])
          : new i([]);
      }
      return new i([]);
    },
    prevAll: function(e) {
      var t = [],
        a = this[0];
      if (!a) return new i([]);
      for (; a.previousElementSibling; ) {
        var r = a.previousElementSibling;
        e ? s(r).is(e) && t.push(r) : t.push(r), (a = r);
      }
      return new i(t);
    },
    parent: function(e) {
      for (var t = [], i = 0; i < this.length; i += 1)
        null !== this[i].parentNode &&
          (e
            ? s(this[i].parentNode).is(e) && t.push(this[i].parentNode)
            : t.push(this[i].parentNode));
      return s(a(t));
    },
    parents: function(e) {
      for (var t = [], i = 0; i < this.length; i += 1)
        for (var r = this[i].parentNode; r; )
          e ? s(r).is(e) && t.push(r) : t.push(r), (r = r.parentNode);
      return s(a(t));
    },
    closest: function(e) {
      var t = this;
      return void 0 === e
        ? new i([])
        : (t.is(e) || (t = t.parents(e).eq(0)), t);
    },
    find: function(e) {
      for (var t = [], s = 0; s < this.length; s += 1)
        for (var a = this[s].querySelectorAll(e), r = 0; r < a.length; r += 1)
          t.push(a[r]);
      return new i(t);
    },
    children: function(e) {
      for (var t = [], r = 0; r < this.length; r += 1)
        for (var n = this[r].childNodes, o = 0; o < n.length; o += 1)
          e
            ? 1 === n[o].nodeType && s(n[o]).is(e) && t.push(n[o])
            : 1 === n[o].nodeType && t.push(n[o]);
      return new i(a(t));
    },
    remove: function() {
      for (var e = 0; e < this.length; e += 1)
        this[e].parentNode && this[e].parentNode.removeChild(this[e]);
      return this;
    },
    add: function() {
      for (var e = [], t = arguments.length; t--; ) e[t] = arguments[t];
      var i, a;
      for (i = 0; i < e.length; i += 1) {
        var r = s(e[i]);
        for (a = 0; a < r.length; a += 1)
          (this[this.length] = r[a]), (this.length += 1);
      }
      return this;
    },
    styles: function() {
      return this[0] ? t.getComputedStyle(this[0], null) : {};
    }
  };
  Object.keys(r).forEach(function(e) {
    s.fn[e] = r[e];
  });
  var n,
    o,
    l,
    d = {
      deleteProps: function(e) {
        var t = e;
        Object.keys(t).forEach(function(e) {
          try {
            t[e] = null;
          } catch (e) {}
          try {
            delete t[e];
          } catch (e) {}
        });
      },
      nextTick: function(e, t) {
        return void 0 === t && (t = 0), setTimeout(e, t);
      },
      now: function() {
        return Date.now();
      },
      getTranslate: function(e, i) {
        var s, a, r;
        void 0 === i && (i = "x");
        var n = t.getComputedStyle(e, null);
        return (
          t.WebKitCSSMatrix
            ? ((a = n.transform || n.webkitTransform).split(",").length > 6 &&
                (a = a
                  .split(", ")
                  .map(function(e) {
                    return e.replace(",", ".");
                  })
                  .join(", ")),
              (r = new t.WebKitCSSMatrix("none" === a ? "" : a)))
            : (s = (r =
                n.MozTransform ||
                n.OTransform ||
                n.MsTransform ||
                n.msTransform ||
                n.transform ||
                n
                  .getPropertyValue("transform")
                  .replace("translate(", "matrix(1, 0, 0, 1,"))
                .toString()
                .split(",")),
          "x" === i &&
            (a = t.WebKitCSSMatrix
              ? r.m41
              : 16 === s.length
              ? parseFloat(s[12])
              : parseFloat(s[4])),
          "y" === i &&
            (a = t.WebKitCSSMatrix
              ? r.m42
              : 16 === s.length
              ? parseFloat(s[13])
              : parseFloat(s[5])),
          a || 0
        );
      },
      parseUrlQuery: function(e) {
        var i,
          s,
          a,
          r,
          n = {},
          o = e || t.location.href;
        if ("string" == typeof o && o.length)
          for (
            r = (s = (o = o.indexOf("?") > -1 ? o.replace(/\S*\?/, "") : "")
              .split("&")
              .filter(function(e) {
                return "" !== e;
              })).length,
              i = 0;
            i < r;
            i += 1
          )
            (a = s[i].replace(/#\S+/g, "").split("=")),
              (n[decodeURIComponent(a[0])] =
                void 0 === a[1] ? void 0 : decodeURIComponent(a[1]) || "");
        return n;
      },
      isObject: function(e) {
        return (
          "object" == typeof e &&
          null !== e &&
          e.constructor &&
          e.constructor === Object
        );
      },
      extend: function() {
        for (var e = [], t = arguments.length; t--; ) e[t] = arguments[t];
        for (var i = Object(e[0]), s = 1; s < e.length; s += 1) {
          var a = e[s];
          if (void 0 !== a && null !== a)
            for (
              var r = Object.keys(Object(a)), n = 0, o = r.length;
              n < o;
              n += 1
            ) {
              var l = r[n],
                h = Object.getOwnPropertyDescriptor(a, l);
              void 0 !== h &&
                h.enumerable &&
                (d.isObject(i[l]) && d.isObject(a[l])
                  ? d.extend(i[l], a[l])
                  : !d.isObject(i[l]) && d.isObject(a[l])
                  ? ((i[l] = {}), d.extend(i[l], a[l]))
                  : (i[l] = a[l]));
            }
        }
        return i;
      }
    },
    h =
      ((l = e.createElement("div")),
      {
        touch:
          (t.Modernizr && !0 === t.Modernizr.touch) ||
          !!(
            "ontouchstart" in t ||
            (t.DocumentTouch && e instanceof t.DocumentTouch)
          ),
        pointerEvents: !(!t.navigator.pointerEnabled && !t.PointerEvent),
        prefixedPointerEvents: !!t.navigator.msPointerEnabled,
        transition:
          ((o = l.style),
          "transition" in o || "webkitTransition" in o || "MozTransition" in o),
        transforms3d:
          (t.Modernizr && !0 === t.Modernizr.csstransforms3d) ||
          ((n = l.style),
          "webkitPerspective" in n ||
            "MozPerspective" in n ||
            "OPerspective" in n ||
            "MsPerspective" in n ||
            "perspective" in n),
        flexbox: (function() {
          for (
            var e = l.style,
              t = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(
                " "
              ),
              i = 0;
            i < t.length;
            i += 1
          )
            if (t[i] in e) return !0;
          return !1;
        })(),
        observer: "MutationObserver" in t || "WebkitMutationObserver" in t,
        passiveListener: (function() {
          var e = !1;
          try {
            var i = Object.defineProperty({}, "passive", {
              get: function() {
                e = !0;
              }
            });
            t.addEventListener("testPassiveListener", null, i);
          } catch (e) {}
          return e;
        })(),
        gestures: "ongesturestart" in t
      }),
    p = function(e) {
      void 0 === e && (e = {});
      var t = this;
      (t.params = e),
        (t.eventsListeners = {}),
        t.params &&
          t.params.on &&
          Object.keys(t.params.on).forEach(function(e) {
            t.on(e, t.params.on[e]);
          });
    },
    c = { components: { configurable: !0 } };
  (p.prototype.on = function(e, t, i) {
    var s = this;
    if ("function" != typeof t) return s;
    var a = i ? "unshift" : "push";
    return (
      e.split(" ").forEach(function(e) {
        s.eventsListeners[e] || (s.eventsListeners[e] = []),
          s.eventsListeners[e][a](t);
      }),
      s
    );
  }),
    (p.prototype.once = function(e, t, i) {
      var s = this;
      if ("function" != typeof t) return s;
      return s.on(
        e,
        function i() {
          for (var a = [], r = arguments.length; r--; ) a[r] = arguments[r];
          t.apply(s, a), s.off(e, i);
        },
        i
      );
    }),
    (p.prototype.off = function(e, t) {
      var i = this;
      return (
        e.split(" ").forEach(function(e) {
          void 0 === t
            ? (i.eventsListeners[e] = [])
            : i.eventsListeners[e].forEach(function(s, a) {
                s === t && i.eventsListeners[e].splice(a, 1);
              });
        }),
        i
      );
    }),
    (p.prototype.emit = function() {
      for (var e = [], t = arguments.length; t--; ) e[t] = arguments[t];
      var i,
        s,
        a,
        r = this;
      return r.eventsListeners
        ? ("string" == typeof e[0] || Array.isArray(e[0])
            ? ((i = e[0]), (s = e.slice(1, e.length)), (a = r))
            : ((i = e[0].events), (s = e[0].data), (a = e[0].context || r)),
          (Array.isArray(i) ? i : i.split(" ")).forEach(function(e) {
            if (r.eventsListeners[e]) {
              var t = [];
              r.eventsListeners[e].forEach(function(e) {
                t.push(e);
              }),
                t.forEach(function(e) {
                  e.apply(a, s);
                });
            }
          }),
          r)
        : r;
    }),
    (p.prototype.useModulesParams = function(e) {
      var t = this;
      t.modules &&
        Object.keys(t.modules).forEach(function(i) {
          var s = t.modules[i];
          s.params && d.extend(e, s.params);
        });
    }),
    (p.prototype.useModules = function(e) {
      void 0 === e && (e = {});
      var t = this;
      t.modules &&
        Object.keys(t.modules).forEach(function(i) {
          var s = t.modules[i],
            a = e[i] || {};
          s.instance &&
            Object.keys(s.instance).forEach(function(e) {
              var i = s.instance[e];
              t[e] = "function" == typeof i ? i.bind(t) : i;
            }),
            s.on &&
              t.on &&
              Object.keys(s.on).forEach(function(e) {
                t.on(e, s.on[e]);
              }),
            s.create && s.create.bind(t)(a);
        });
    }),
    (c.components.set = function(e) {
      this.use && this.use(e);
    }),
    (p.installModule = function(e) {
      for (var t = [], i = arguments.length - 1; i-- > 0; )
        t[i] = arguments[i + 1];
      var s = this;
      s.prototype.modules || (s.prototype.modules = {});
      var a = e.name || Object.keys(s.prototype.modules).length + "_" + d.now();
      return (
        (s.prototype.modules[a] = e),
        e.proto &&
          Object.keys(e.proto).forEach(function(t) {
            s.prototype[t] = e.proto[t];
          }),
        e.static &&
          Object.keys(e.static).forEach(function(t) {
            s[t] = e.static[t];
          }),
        e.install && e.install.apply(s, t),
        s
      );
    }),
    (p.use = function(e) {
      for (var t = [], i = arguments.length - 1; i-- > 0; )
        t[i] = arguments[i + 1];
      var s = this;
      return Array.isArray(e)
        ? (e.forEach(function(e) {
            return s.installModule(e);
          }),
          s)
        : s.installModule.apply(s, [e].concat(t));
    }),
    Object.defineProperties(p, c);
  var u = {
    updateSize: function() {
      var e,
        t,
        i = this.$el;
      (e = void 0 !== this.params.width ? this.params.width : i[0].clientWidth),
        (t =
          void 0 !== this.params.height
            ? this.params.height
            : i[0].clientHeight),
        (0 === e && this.isHorizontal()) ||
          (0 === t && this.isVertical()) ||
          ((e =
            e -
            parseInt(i.css("padding-left"), 10) -
            parseInt(i.css("padding-right"), 10)),
          (t =
            t -
            parseInt(i.css("padding-top"), 10) -
            parseInt(i.css("padding-bottom"), 10)),
          d.extend(this, {
            width: e,
            height: t,
            size: this.isHorizontal() ? e : t
          }));
    },
    updateSlides: function() {
      var e = this.params,
        i = this.$wrapperEl,
        s = this.size,
        a = this.rtlTranslate,
        r = this.wrongRTL,
        n = i.children("." + this.params.slideClass),
        o =
          this.virtual && e.virtual.enabled
            ? this.virtual.slides.length
            : n.length,
        l = [],
        p = [],
        c = [],
        u = e.slidesOffsetBefore;
      "function" == typeof u && (u = e.slidesOffsetBefore.call(this));
      var v = e.slidesOffsetAfter;
      "function" == typeof v && (v = e.slidesOffsetAfter.call(this));
      var f = o,
        m = this.snapGrid.length,
        g = this.snapGrid.length,
        b = e.spaceBetween,
        w = -u,
        y = 0,
        x = 0;
      if (void 0 !== s) {
        var E, T;
        "string" == typeof b &&
          b.indexOf("%") >= 0 &&
          (b = (parseFloat(b.replace("%", "")) / 100) * s),
          (this.virtualSize = -b),
          a
            ? n.css({ marginLeft: "", marginTop: "" })
            : n.css({ marginRight: "", marginBottom: "" }),
          e.slidesPerColumn > 1 &&
            ((E =
              Math.floor(o / e.slidesPerColumn) ===
              o / this.params.slidesPerColumn
                ? o
                : Math.ceil(o / e.slidesPerColumn) * e.slidesPerColumn),
            "auto" !== e.slidesPerView &&
              "row" === e.slidesPerColumnFill &&
              (E = Math.max(E, e.slidesPerView * e.slidesPerColumn)));
        for (
          var S,
            C = e.slidesPerColumn,
            M = E / C,
            z = M - (e.slidesPerColumn * M - o),
            P = 0;
          P < o;
          P += 1
        ) {
          T = 0;
          var k = n.eq(P);
          if (e.slidesPerColumn > 1) {
            var $ = void 0,
              L = void 0,
              I = void 0;
            "column" === e.slidesPerColumnFill
              ? ((I = P - (L = Math.floor(P / C)) * C),
                (L > z || (L === z && I === C - 1)) &&
                  (I += 1) >= C &&
                  ((I = 0), (L += 1)),
                ($ = L + (I * E) / C),
                k.css({
                  "-webkit-box-ordinal-group": $,
                  "-moz-box-ordinal-group": $,
                  "-ms-flex-order": $,
                  "-webkit-order": $,
                  order: $
                }))
              : (L = P - (I = Math.floor(P / M)) * M),
              k
                .css(
                  "margin-" + (this.isHorizontal() ? "top" : "left"),
                  0 !== I && e.spaceBetween && e.spaceBetween + "px"
                )
                .attr("data-swiper-column", L)
                .attr("data-swiper-row", I);
          }
          if ("none" !== k.css("display")) {
            if ("auto" === e.slidesPerView) {
              var D = t.getComputedStyle(k[0], null);
              (T = this.isHorizontal()
                ? k[0].getBoundingClientRect().width +
                  parseFloat(D.getPropertyValue("margin-left")) +
                  parseFloat(D.getPropertyValue("margin-right"))
                : k[0].getBoundingClientRect().height +
                  parseFloat(D.getPropertyValue("margin-top")) +
                  parseFloat(D.getPropertyValue("margin-bottom"))),
                e.roundLengths && (T = Math.floor(T));
            } else
              (T = (s - (e.slidesPerView - 1) * b) / e.slidesPerView),
                e.roundLengths && (T = Math.floor(T)),
                n[P] &&
                  (this.isHorizontal()
                    ? (n[P].style.width = T + "px")
                    : (n[P].style.height = T + "px"));
            n[P] && (n[P].swiperSlideSize = T),
              c.push(T),
              e.centeredSlides
                ? ((w = w + T / 2 + y / 2 + b),
                  0 === y && 0 !== P && (w = w - s / 2 - b),
                  0 === P && (w = w - s / 2 - b),
                  Math.abs(w) < 0.001 && (w = 0),
                  x % e.slidesPerGroup == 0 && l.push(w),
                  p.push(w))
                : (x % e.slidesPerGroup == 0 && l.push(w),
                  p.push(w),
                  (w = w + T + b)),
              (this.virtualSize += T + b),
              (y = T),
              (x += 1);
          }
        }
        if (
          ((this.virtualSize = Math.max(this.virtualSize, s) + v),
          a &&
            r &&
            ("slide" === e.effect || "coverflow" === e.effect) &&
            i.css({ width: this.virtualSize + e.spaceBetween + "px" }),
          (h.flexbox && !e.setWrapperSize) ||
            (this.isHorizontal()
              ? i.css({ width: this.virtualSize + e.spaceBetween + "px" })
              : i.css({ height: this.virtualSize + e.spaceBetween + "px" })),
          e.slidesPerColumn > 1 &&
            ((this.virtualSize = (T + e.spaceBetween) * E),
            (this.virtualSize =
              Math.ceil(this.virtualSize / e.slidesPerColumn) - e.spaceBetween),
            this.isHorizontal()
              ? i.css({ width: this.virtualSize + e.spaceBetween + "px" })
              : i.css({ height: this.virtualSize + e.spaceBetween + "px" }),
            e.centeredSlides))
        ) {
          S = [];
          for (var O = 0; O < l.length; O += 1)
            l[O] < this.virtualSize + l[0] && S.push(l[O]);
          l = S;
        }
        if (!e.centeredSlides) {
          S = [];
          for (var A = 0; A < l.length; A += 1)
            l[A] <= this.virtualSize - s && S.push(l[A]);
          (l = S),
            Math.floor(this.virtualSize - s) - Math.floor(l[l.length - 1]) >
              1 && l.push(this.virtualSize - s);
        }
        0 === l.length && (l = [0]),
          0 !== e.spaceBetween &&
            (this.isHorizontal()
              ? a
                ? n.css({ marginLeft: b + "px" })
                : n.css({ marginRight: b + "px" })
              : n.css({ marginBottom: b + "px" })),
          d.extend(this, {
            slides: n,
            snapGrid: l,
            slidesGrid: p,
            slidesSizesGrid: c
          }),
          o !== f && this.emit("slidesLengthChange"),
          l.length !== m &&
            (this.params.watchOverflow && this.checkOverflow(),
            this.emit("snapGridLengthChange")),
          p.length !== g && this.emit("slidesGridLengthChange"),
          (e.watchSlidesProgress || e.watchSlidesVisibility) &&
            this.updateSlidesOffset();
      }
    },
    updateAutoHeight: function(e) {
      var t,
        i = [],
        s = 0;
      if (
        ("number" == typeof e
          ? this.setTransition(e)
          : !0 === e && this.setTransition(this.params.speed),
        "auto" !== this.params.slidesPerView && this.params.slidesPerView > 1)
      )
        for (t = 0; t < Math.ceil(this.params.slidesPerView); t += 1) {
          var a = this.activeIndex + t;
          if (a > this.slides.length) break;
          i.push(this.slides.eq(a)[0]);
        }
      else i.push(this.slides.eq(this.activeIndex)[0]);
      for (t = 0; t < i.length; t += 1)
        if (void 0 !== i[t]) {
          var r = i[t].offsetHeight;
          s = r > s ? r : s;
        }
      s && this.$wrapperEl.css("height", s + "px");
    },
    updateSlidesOffset: function() {
      for (var e = this.slides, t = 0; t < e.length; t += 1)
        e[t].swiperSlideOffset = this.isHorizontal()
          ? e[t].offsetLeft
          : e[t].offsetTop;
    },
    updateSlidesProgress: function(e) {
      void 0 === e && (e = this.translate || 0);
      var t = this.params,
        i = this.slides,
        s = this.rtlTranslate;
      if (0 !== i.length) {
        void 0 === i[0].swiperSlideOffset && this.updateSlidesOffset();
        var a = -e;
        s && (a = e), i.removeClass(t.slideVisibleClass);
        for (var r = 0; r < i.length; r += 1) {
          var n = i[r],
            o =
              (a +
                (t.centeredSlides ? this.minTranslate() : 0) -
                n.swiperSlideOffset) /
              (n.swiperSlideSize + t.spaceBetween);
          if (t.watchSlidesVisibility) {
            var l = -(a - n.swiperSlideOffset),
              d = l + this.slidesSizesGrid[r];
            ((l >= 0 && l < this.size) ||
              (d > 0 && d <= this.size) ||
              (l <= 0 && d >= this.size)) &&
              i.eq(r).addClass(t.slideVisibleClass);
          }
          n.progress = s ? -o : o;
        }
      }
    },
    updateProgress: function(e) {
      void 0 === e && (e = this.translate || 0);
      var t = this.params,
        i = this.maxTranslate() - this.minTranslate(),
        s = this.progress,
        a = this.isBeginning,
        r = this.isEnd,
        n = a,
        o = r;
      0 === i
        ? ((s = 0), (a = !0), (r = !0))
        : ((a = (s = (e - this.minTranslate()) / i) <= 0), (r = s >= 1)),
        d.extend(this, { progress: s, isBeginning: a, isEnd: r }),
        (t.watchSlidesProgress || t.watchSlidesVisibility) &&
          this.updateSlidesProgress(e),
        a && !n && this.emit("reachBeginning toEdge"),
        r && !o && this.emit("reachEnd toEdge"),
        ((n && !a) || (o && !r)) && this.emit("fromEdge"),
        this.emit("progress", s);
    },
    updateSlidesClasses: function() {
      var e,
        t = this.slides,
        i = this.params,
        s = this.$wrapperEl,
        a = this.activeIndex,
        r = this.realIndex,
        n = this.virtual && i.virtual.enabled;
      t.removeClass(
        i.slideActiveClass +
          " " +
          i.slideNextClass +
          " " +
          i.slidePrevClass +
          " " +
          i.slideDuplicateActiveClass +
          " " +
          i.slideDuplicateNextClass +
          " " +
          i.slideDuplicatePrevClass
      ),
        (e = n
          ? this.$wrapperEl.find(
              "." + i.slideClass + '[data-swiper-slide-index="' + a + '"]'
            )
          : t.eq(a)).addClass(i.slideActiveClass),
        i.loop &&
          (e.hasClass(i.slideDuplicateClass)
            ? s
                .children(
                  "." +
                    i.slideClass +
                    ":not(." +
                    i.slideDuplicateClass +
                    ')[data-swiper-slide-index="' +
                    r +
                    '"]'
                )
                .addClass(i.slideDuplicateActiveClass)
            : s
                .children(
                  "." +
                    i.slideClass +
                    "." +
                    i.slideDuplicateClass +
                    '[data-swiper-slide-index="' +
                    r +
                    '"]'
                )
                .addClass(i.slideDuplicateActiveClass));
      var o = e
        .nextAll("." + i.slideClass)
        .eq(0)
        .addClass(i.slideNextClass);
      i.loop && 0 === o.length && (o = t.eq(0)).addClass(i.slideNextClass);
      var l = e
        .prevAll("." + i.slideClass)
        .eq(0)
        .addClass(i.slidePrevClass);
      i.loop && 0 === l.length && (l = t.eq(-1)).addClass(i.slidePrevClass),
        i.loop &&
          (o.hasClass(i.slideDuplicateClass)
            ? s
                .children(
                  "." +
                    i.slideClass +
                    ":not(." +
                    i.slideDuplicateClass +
                    ')[data-swiper-slide-index="' +
                    o.attr("data-swiper-slide-index") +
                    '"]'
                )
                .addClass(i.slideDuplicateNextClass)
            : s
                .children(
                  "." +
                    i.slideClass +
                    "." +
                    i.slideDuplicateClass +
                    '[data-swiper-slide-index="' +
                    o.attr("data-swiper-slide-index") +
                    '"]'
                )
                .addClass(i.slideDuplicateNextClass),
          l.hasClass(i.slideDuplicateClass)
            ? s
                .children(
                  "." +
                    i.slideClass +
                    ":not(." +
                    i.slideDuplicateClass +
                    ')[data-swiper-slide-index="' +
                    l.attr("data-swiper-slide-index") +
                    '"]'
                )
                .addClass(i.slideDuplicatePrevClass)
            : s
                .children(
                  "." +
                    i.slideClass +
                    "." +
                    i.slideDuplicateClass +
                    '[data-swiper-slide-index="' +
                    l.attr("data-swiper-slide-index") +
                    '"]'
                )
                .addClass(i.slideDuplicatePrevClass));
    },
    updateActiveIndex: function(e) {
      var t,
        i = this.rtlTranslate ? this.translate : -this.translate,
        s = this.slidesGrid,
        a = this.snapGrid,
        r = this.params,
        n = this.activeIndex,
        o = this.realIndex,
        l = this.snapIndex,
        h = e;
      if (void 0 === h) {
        for (var p = 0; p < s.length; p += 1)
          void 0 !== s[p + 1]
            ? i >= s[p] && i < s[p + 1] - (s[p + 1] - s[p]) / 2
              ? (h = p)
              : i >= s[p] && i < s[p + 1] && (h = p + 1)
            : i >= s[p] && (h = p);
        r.normalizeSlideIndex && (h < 0 || void 0 === h) && (h = 0);
      }
      if (
        ((t =
          a.indexOf(i) >= 0
            ? a.indexOf(i)
            : Math.floor(h / r.slidesPerGroup)) >= a.length &&
          (t = a.length - 1),
        h !== n)
      ) {
        var c = parseInt(
          this.slides.eq(h).attr("data-swiper-slide-index") || h,
          10
        );
        d.extend(this, {
          snapIndex: t,
          realIndex: c,
          previousIndex: n,
          activeIndex: h
        }),
          this.emit("activeIndexChange"),
          this.emit("snapIndexChange"),
          o !== c && this.emit("realIndexChange"),
          this.emit("slideChange");
      } else t !== l && ((this.snapIndex = t), this.emit("snapIndexChange"));
    },
    updateClickedSlide: function(e) {
      var t = this.params,
        i = s(e.target).closest("." + t.slideClass)[0],
        a = !1;
      if (i)
        for (var r = 0; r < this.slides.length; r += 1)
          this.slides[r] === i && (a = !0);
      if (!i || !a)
        return (this.clickedSlide = void 0), void (this.clickedIndex = void 0);
      (this.clickedSlide = i),
        this.virtual && this.params.virtual.enabled
          ? (this.clickedIndex = parseInt(
              s(i).attr("data-swiper-slide-index"),
              10
            ))
          : (this.clickedIndex = s(i).index()),
        t.slideToClickedSlide &&
          void 0 !== this.clickedIndex &&
          this.clickedIndex !== this.activeIndex &&
          this.slideToClickedSlide();
    }
  };
  var v = {
    getTranslate: function(e) {
      void 0 === e && (e = this.isHorizontal() ? "x" : "y");
      var t = this.params,
        i = this.rtlTranslate,
        s = this.translate,
        a = this.$wrapperEl;
      if (t.virtualTranslate) return i ? -s : s;
      var r = d.getTranslate(a[0], e);
      return i && (r = -r), r || 0;
    },
    setTranslate: function(e, t) {
      var i = this.rtlTranslate,
        s = this.params,
        a = this.$wrapperEl,
        r = this.progress,
        n = 0,
        o = 0;
      this.isHorizontal() ? (n = i ? -e : e) : (o = e),
        s.roundLengths && ((n = Math.floor(n)), (o = Math.floor(o))),
        s.virtualTranslate ||
          (h.transforms3d
            ? a.transform("translate3d(" + n + "px, " + o + "px, 0px)")
            : a.transform("translate(" + n + "px, " + o + "px)")),
        (this.translate = this.isHorizontal() ? n : o);
      var l = this.maxTranslate() - this.minTranslate();
      (0 === l ? 0 : (e - this.minTranslate()) / l) !== r &&
        this.updateProgress(e),
        this.emit("setTranslate", this.translate, t);
    },
    minTranslate: function() {
      return -this.snapGrid[0];
    },
    maxTranslate: function() {
      return -this.snapGrid[this.snapGrid.length - 1];
    }
  };
  var f = {
    setTransition: function(e, t) {
      this.$wrapperEl.transition(e), this.emit("setTransition", e, t);
    },
    transitionStart: function(e, t) {
      void 0 === e && (e = !0);
      var i = this.activeIndex,
        s = this.params,
        a = this.previousIndex;
      s.autoHeight && this.updateAutoHeight();
      var r = t;
      if (
        (r || (r = i > a ? "next" : i < a ? "prev" : "reset"),
        this.emit("transitionStart"),
        e && i !== a)
      ) {
        if ("reset" === r) return void this.emit("slideResetTransitionStart");
        this.emit("slideChangeTransitionStart"),
          "next" === r
            ? this.emit("slideNextTransitionStart")
            : this.emit("slidePrevTransitionStart");
      }
    },
    transitionEnd: function(e, t) {
      void 0 === e && (e = !0);
      var i = this.activeIndex,
        s = this.previousIndex;
      (this.animating = !1), this.setTransition(0);
      var a = t;
      if (
        (a || (a = i > s ? "next" : i < s ? "prev" : "reset"),
        this.emit("transitionEnd"),
        e && i !== s)
      ) {
        if ("reset" === a) return void this.emit("slideResetTransitionEnd");
        this.emit("slideChangeTransitionEnd"),
          "next" === a
            ? this.emit("slideNextTransitionEnd")
            : this.emit("slidePrevTransitionEnd");
      }
    }
  };
  var m = {
    slideTo: function(e, t, i, s) {
      void 0 === e && (e = 0),
        void 0 === t && (t = this.params.speed),
        void 0 === i && (i = !0);
      var a = this,
        r = e;
      r < 0 && (r = 0);
      var n = a.params,
        o = a.snapGrid,
        l = a.slidesGrid,
        d = a.previousIndex,
        p = a.activeIndex,
        c = a.rtlTranslate,
        u = a.$wrapperEl;
      if (a.animating && n.preventIntercationOnTransition) return !1;
      var v = Math.floor(r / n.slidesPerGroup);
      v >= o.length && (v = o.length - 1),
        (p || n.initialSlide || 0) === (d || 0) &&
          i &&
          a.emit("beforeSlideChangeStart");
      var f,
        m = -o[v];
      if ((a.updateProgress(m), n.normalizeSlideIndex))
        for (var g = 0; g < l.length; g += 1)
          -Math.floor(100 * m) >= Math.floor(100 * l[g]) && (r = g);
      if (a.initialized && r !== p) {
        if (!a.allowSlideNext && m < a.translate && m < a.minTranslate())
          return !1;
        if (
          !a.allowSlidePrev &&
          m > a.translate &&
          m > a.maxTranslate() &&
          (p || 0) !== r
        )
          return !1;
      }
      return (
        (f = r > p ? "next" : r < p ? "prev" : "reset"),
        (c && -m === a.translate) || (!c && m === a.translate)
          ? (a.updateActiveIndex(r),
            n.autoHeight && a.updateAutoHeight(),
            a.updateSlidesClasses(),
            "slide" !== n.effect && a.setTranslate(m),
            "reset" !== f && (a.transitionStart(i, f), a.transitionEnd(i, f)),
            !1)
          : (0 !== t && h.transition
              ? (a.setTransition(t),
                a.setTranslate(m),
                a.updateActiveIndex(r),
                a.updateSlidesClasses(),
                a.emit("beforeTransitionStart", t, s),
                a.transitionStart(i, f),
                a.animating ||
                  ((a.animating = !0),
                  u.transitionEnd(function() {
                    a && !a.destroyed && a.transitionEnd(i, f);
                  })))
              : (a.setTransition(0),
                a.setTranslate(m),
                a.updateActiveIndex(r),
                a.updateSlidesClasses(),
                a.emit("beforeTransitionStart", t, s),
                a.transitionStart(i, f),
                a.transitionEnd(i, f)),
            !0)
      );
    },
    slideToLoop: function(e, t, i, s) {
      void 0 === e && (e = 0),
        void 0 === t && (t = this.params.speed),
        void 0 === i && (i = !0);
      var a = e;
      return (
        this.params.loop && (a += this.loopedSlides), this.slideTo(a, t, i, s)
      );
    },
    slideNext: function(e, t, i) {
      void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
      var s = this.params,
        a = this.animating;
      return s.loop
        ? !a &&
            (this.loopFix(),
            (this._clientLeft = this.$wrapperEl[0].clientLeft),
            this.slideTo(this.activeIndex + s.slidesPerGroup, e, t, i))
        : this.slideTo(this.activeIndex + s.slidesPerGroup, e, t, i);
    },
    slidePrev: function(e, t, i) {
      void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
      var s = this.params,
        a = this.animating;
      return s.loop
        ? !a &&
            (this.loopFix(),
            (this._clientLeft = this.$wrapperEl[0].clientLeft),
            this.slideTo(this.activeIndex - 1, e, t, i))
        : this.slideTo(this.activeIndex - 1, e, t, i);
    },
    slideReset: function(e, t, i) {
      return (
        void 0 === e && (e = this.params.speed),
        void 0 === t && (t = !0),
        this.slideTo(this.activeIndex, e, t, i)
      );
    },
    slideToClosest: function(e, t, i) {
      void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
      var s = this.activeIndex,
        a = Math.floor(s / this.params.slidesPerGroup);
      if (a < this.snapGrid.length - 1) {
        var r = this.rtlTranslate ? this.translate : -this.translate,
          n = this.snapGrid[a];
        r - n > (this.snapGrid[a + 1] - n) / 2 &&
          (s = this.params.slidesPerGroup);
      }
      return this.slideTo(s, e, t, i);
    },
    slideToClickedSlide: function() {
      var e,
        t = this,
        i = t.params,
        a = t.$wrapperEl,
        r =
          "auto" === i.slidesPerView
            ? t.slidesPerViewDynamic()
            : i.slidesPerView,
        n = t.clickedIndex;
      if (i.loop) {
        if (t.animating) return;
        (e = parseInt(s(t.clickedSlide).attr("data-swiper-slide-index"), 10)),
          i.centeredSlides
            ? n < t.loopedSlides - r / 2 ||
              n > t.slides.length - t.loopedSlides + r / 2
              ? (t.loopFix(),
                (n = a
                  .children(
                    "." +
                      i.slideClass +
                      '[data-swiper-slide-index="' +
                      e +
                      '"]:not(.' +
                      i.slideDuplicateClass +
                      ")"
                  )
                  .eq(0)
                  .index()),
                d.nextTick(function() {
                  t.slideTo(n);
                }))
              : t.slideTo(n)
            : n > t.slides.length - r
            ? (t.loopFix(),
              (n = a
                .children(
                  "." +
                    i.slideClass +
                    '[data-swiper-slide-index="' +
                    e +
                    '"]:not(.' +
                    i.slideDuplicateClass +
                    ")"
                )
                .eq(0)
                .index()),
              d.nextTick(function() {
                t.slideTo(n);
              }))
            : t.slideTo(n);
      } else t.slideTo(n);
    }
  };
  var g = {
    loopCreate: function() {
      var t = this,
        i = t.params,
        a = t.$wrapperEl;
      a.children("." + i.slideClass + "." + i.slideDuplicateClass).remove();
      var r = a.children("." + i.slideClass);
      if (i.loopFillGroupWithBlank) {
        var n = i.slidesPerGroup - (r.length % i.slidesPerGroup);
        if (n !== i.slidesPerGroup) {
          for (var o = 0; o < n; o += 1) {
            var l = s(e.createElement("div")).addClass(
              i.slideClass + " " + i.slideBlankClass
            );
            a.append(l);
          }
          r = a.children("." + i.slideClass);
        }
      }
      "auto" !== i.slidesPerView ||
        i.loopedSlides ||
        (i.loopedSlides = r.length),
        (t.loopedSlides = parseInt(i.loopedSlides || i.slidesPerView, 10)),
        (t.loopedSlides += i.loopAdditionalSlides),
        t.loopedSlides > r.length && (t.loopedSlides = r.length);
      var d = [],
        h = [];
      r.each(function(e, i) {
        var a = s(i);
        e < t.loopedSlides && h.push(i),
          e < r.length && e >= r.length - t.loopedSlides && d.push(i),
          a.attr("data-swiper-slide-index", e);
      });
      for (var p = 0; p < h.length; p += 1)
        a.append(s(h[p].cloneNode(!0)).addClass(i.slideDuplicateClass));
      for (var c = d.length - 1; c >= 0; c -= 1)
        a.prepend(s(d[c].cloneNode(!0)).addClass(i.slideDuplicateClass));
    },
    loopFix: function() {
      var e,
        t = this.params,
        i = this.activeIndex,
        s = this.slides,
        a = this.loopedSlides,
        r = this.allowSlidePrev,
        n = this.allowSlideNext,
        o = this.snapGrid,
        l = this.rtlTranslate;
      (this.allowSlidePrev = !0), (this.allowSlideNext = !0);
      var d = -o[i] - this.getTranslate();
      i < a
        ? ((e = s.length - 3 * a + i),
          (e += a),
          this.slideTo(e, 0, !1, !0) &&
            0 !== d &&
            this.setTranslate((l ? -this.translate : this.translate) - d))
        : (("auto" === t.slidesPerView && i >= 2 * a) ||
            i > s.length - 2 * t.slidesPerView) &&
          ((e = -s.length + i + a),
          (e += a),
          this.slideTo(e, 0, !1, !0) &&
            0 !== d &&
            this.setTranslate((l ? -this.translate : this.translate) - d));
      (this.allowSlidePrev = r), (this.allowSlideNext = n);
    },
    loopDestroy: function() {
      var e = this.$wrapperEl,
        t = this.params,
        i = this.slides;
      e.children("." + t.slideClass + "." + t.slideDuplicateClass).remove(),
        i.removeAttr("data-swiper-slide-index");
    }
  };
  var b = {
    setGrabCursor: function(e) {
      if (!h.touch && this.params.simulateTouch) {
        var t = this.el;
        (t.style.cursor = "move"),
          (t.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab"),
          (t.style.cursor = e ? "-moz-grabbin" : "-moz-grab"),
          (t.style.cursor = e ? "grabbing" : "grab");
      }
    },
    unsetGrabCursor: function() {
      h.touch || (this.el.style.cursor = "");
    }
  };
  var w = {
      appendSlide: function(e) {
        var t = this.$wrapperEl,
          i = this.params;
        if (
          (i.loop && this.loopDestroy(), "object" == typeof e && "length" in e)
        )
          for (var s = 0; s < e.length; s += 1) e[s] && t.append(e[s]);
        else t.append(e);
        i.loop && this.loopCreate(),
          (i.observer && h.observer) || this.update();
      },
      prependSlide: function(e) {
        var t = this.params,
          i = this.$wrapperEl,
          s = this.activeIndex;
        t.loop && this.loopDestroy();
        var a = s + 1;
        if ("object" == typeof e && "length" in e) {
          for (var r = 0; r < e.length; r += 1) e[r] && i.prepend(e[r]);
          a = s + e.length;
        } else i.prepend(e);
        t.loop && this.loopCreate(),
          (t.observer && h.observer) || this.update(),
          this.slideTo(a, 0, !1);
      },
      removeSlide: function(e) {
        var t = this.params,
          i = this.$wrapperEl,
          s = this.activeIndex;
        t.loop &&
          (this.loopDestroy(), (this.slides = i.children("." + t.slideClass)));
        var a,
          r = s;
        if ("object" == typeof e && "length" in e) {
          for (var n = 0; n < e.length; n += 1)
            (a = e[n]),
              this.slides[a] && this.slides.eq(a).remove(),
              a < r && (r -= 1);
          r = Math.max(r, 0);
        } else
          (a = e),
            this.slides[a] && this.slides.eq(a).remove(),
            a < r && (r -= 1),
            (r = Math.max(r, 0));
        t.loop && this.loopCreate(),
          (t.observer && h.observer) || this.update(),
          t.loop
            ? this.slideTo(r + this.loopedSlides, 0, !1)
            : this.slideTo(r, 0, !1);
      },
      removeAllSlides: function() {
        for (var e = [], t = 0; t < this.slides.length; t += 1) e.push(t);
        this.removeSlide(e);
      }
    },
    y = (function() {
      var i = t.navigator.userAgent,
        s = {
          ios: !1,
          android: !1,
          androidChrome: !1,
          desktop: !1,
          windows: !1,
          iphone: !1,
          ipod: !1,
          ipad: !1,
          cordova: t.cordova || t.phonegap,
          phonegap: t.cordova || t.phonegap
        },
        a = i.match(/(Windows Phone);?[\s\/]+([\d.]+)?/),
        r = i.match(/(Android);?[\s\/]+([\d.]+)?/),
        n = i.match(/(iPad).*OS\s([\d_]+)/),
        o = i.match(/(iPod)(.*OS\s([\d_]+))?/),
        l = !n && i.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
      if (
        (a && ((s.os = "windows"), (s.osVersion = a[2]), (s.windows = !0)),
        r &&
          !a &&
          ((s.os = "android"),
          (s.osVersion = r[2]),
          (s.android = !0),
          (s.androidChrome = i.toLowerCase().indexOf("chrome") >= 0)),
        (n || l || o) && ((s.os = "ios"), (s.ios = !0)),
        l && !o && ((s.osVersion = l[2].replace(/_/g, ".")), (s.iphone = !0)),
        n && ((s.osVersion = n[2].replace(/_/g, ".")), (s.ipad = !0)),
        o &&
          ((s.osVersion = o[3] ? o[3].replace(/_/g, ".") : null),
          (s.iphone = !0)),
        s.ios &&
          s.osVersion &&
          i.indexOf("Version/") >= 0 &&
          "10" === s.osVersion.split(".")[0] &&
          (s.osVersion = i
            .toLowerCase()
            .split("version/")[1]
            .split(" ")[0]),
        (s.desktop = !(s.os || s.android || s.webView)),
        (s.webView = (l || n || o) && i.match(/.*AppleWebKit(?!.*Safari)/i)),
        s.os && "ios" === s.os)
      ) {
        var d = s.osVersion.split("."),
          h = e.querySelector('meta[name="viewport"]');
        s.minimalUi =
          !s.webView &&
          (o || l) &&
          (1 * d[0] == 7 ? 1 * d[1] >= 1 : 1 * d[0] > 7) &&
          h &&
          h.getAttribute("content").indexOf("minimal-ui") >= 0;
      }
      return (s.pixelRatio = t.devicePixelRatio || 1), s;
    })();
  function x() {
    var e = this.params,
      t = this.el;
    if (!t || 0 !== t.offsetWidth) {
      e.breakpoints && this.setBreakpoint();
      var i = this.allowSlideNext,
        s = this.allowSlidePrev;
      if (
        ((this.allowSlideNext = !0),
        (this.allowSlidePrev = !0),
        this.updateSize(),
        this.updateSlides(),
        e.freeMode)
      ) {
        var a = Math.min(
          Math.max(this.translate, this.maxTranslate()),
          this.minTranslate()
        );
        this.setTranslate(a),
          this.updateActiveIndex(),
          this.updateSlidesClasses(),
          e.autoHeight && this.updateAutoHeight();
      } else
        this.updateSlidesClasses(),
          ("auto" === e.slidesPerView || e.slidesPerView > 1) &&
          this.isEnd &&
          !this.params.centeredSlides
            ? this.slideTo(this.slides.length - 1, 0, !1, !0)
            : this.slideTo(this.activeIndex, 0, !1, !0);
      (this.allowSlidePrev = s), (this.allowSlideNext = i);
    }
  }
  var E = {
    attachEvents: function() {
      var i = this.params,
        a = this.touchEvents,
        r = this.el,
        n = this.wrapperEl;
      (this.onTouchStart = function(i) {
        var a = this.touchEventsData,
          r = this.params,
          n = this.touches;
        if (!this.animating || !r.preventIntercationOnTransition) {
          var o = i;
          if (
            (o.originalEvent && (o = o.originalEvent),
            (a.isTouchEvent = "touchstart" === o.type),
            (a.isTouchEvent || !("which" in o) || 3 !== o.which) &&
              (!a.isTouched || !a.isMoved))
          )
            if (
              r.noSwiping &&
              s(o.target).closest(
                r.noSwipingSelector
                  ? r.noSwipingSelector
                  : "." + r.noSwipingClass
              )[0]
            )
              this.allowClick = !0;
            else if (!r.swipeHandler || s(o).closest(r.swipeHandler)[0]) {
              (n.currentX =
                "touchstart" === o.type ? o.targetTouches[0].pageX : o.pageX),
                (n.currentY =
                  "touchstart" === o.type ? o.targetTouches[0].pageY : o.pageY);
              var l = n.currentX,
                h = n.currentY;
              if (
                !(
                  y.ios &&
                  !y.cordova &&
                  r.iOSEdgeSwipeDetection &&
                  l <= r.iOSEdgeSwipeThreshold &&
                  l >= t.screen.width - r.iOSEdgeSwipeThreshold
                )
              ) {
                if (
                  (d.extend(a, {
                    isTouched: !0,
                    isMoved: !1,
                    allowTouchCallbacks: !0,
                    isScrolling: void 0,
                    startMoving: void 0
                  }),
                  (n.startX = l),
                  (n.startY = h),
                  (a.touchStartTime = d.now()),
                  (this.allowClick = !0),
                  this.updateSize(),
                  (this.swipeDirection = void 0),
                  r.threshold > 0 && (a.allowThresholdMove = !1),
                  "touchstart" !== o.type)
                ) {
                  var p = !0;
                  s(o.target).is(a.formElements) && (p = !1),
                    e.activeElement &&
                      s(e.activeElement).is(a.formElements) &&
                      e.activeElement !== o.target &&
                      e.activeElement.blur(),
                    p && this.allowTouchMove && o.preventDefault();
                }
                this.emit("touchStart", o);
              }
            }
        }
      }.bind(this)),
        (this.onTouchMove = function(t) {
          var i = this.touchEventsData,
            a = this.params,
            r = this.touches,
            n = this.rtlTranslate,
            o = t;
          if ((o.originalEvent && (o = o.originalEvent), i.isTouched)) {
            if (!i.isTouchEvent || "mousemove" !== o.type) {
              var l =
                  "touchmove" === o.type ? o.targetTouches[0].pageX : o.pageX,
                h = "touchmove" === o.type ? o.targetTouches[0].pageY : o.pageY;
              if (o.preventedByNestedSwiper)
                return (r.startX = l), void (r.startY = h);
              if (!this.allowTouchMove)
                return (
                  (this.allowClick = !1),
                  void (
                    i.isTouched &&
                    (d.extend(r, {
                      startX: l,
                      startY: h,
                      currentX: l,
                      currentY: h
                    }),
                    (i.touchStartTime = d.now()))
                  )
                );
              if (i.isTouchEvent && a.touchReleaseOnEdges && !a.loop)
                if (this.isVertical()) {
                  if (
                    (h < r.startY && this.translate <= this.maxTranslate()) ||
                    (h > r.startY && this.translate >= this.minTranslate())
                  )
                    return (i.isTouched = !1), void (i.isMoved = !1);
                } else if (
                  (l < r.startX && this.translate <= this.maxTranslate()) ||
                  (l > r.startX && this.translate >= this.minTranslate())
                )
                  return;
              if (
                i.isTouchEvent &&
                e.activeElement &&
                o.target === e.activeElement &&
                s(o.target).is(i.formElements)
              )
                return (i.isMoved = !0), void (this.allowClick = !1);
              if (
                (i.allowTouchCallbacks && this.emit("touchMove", o),
                !(o.targetTouches && o.targetTouches.length > 1))
              ) {
                (r.currentX = l), (r.currentY = h);
                var p,
                  c = r.currentX - r.startX,
                  u = r.currentY - r.startY;
                if (
                  (void 0 === i.isScrolling &&
                    ((this.isHorizontal() && r.currentY === r.startY) ||
                    (this.isVertical() && r.currentX === r.startX)
                      ? (i.isScrolling = !1)
                      : c * c + u * u >= 25 &&
                        ((p =
                          (180 * Math.atan2(Math.abs(u), Math.abs(c))) /
                          Math.PI),
                        (i.isScrolling = this.isHorizontal()
                          ? p > a.touchAngle
                          : 90 - p > a.touchAngle))),
                  i.isScrolling && this.emit("touchMoveOpposite", o),
                  "undefined" == typeof startMoving &&
                    ((r.currentX === r.startX && r.currentY === r.startY) ||
                      (i.startMoving = !0)),
                  i.isScrolling)
                )
                  i.isTouched = !1;
                else if (i.startMoving) {
                  (this.allowClick = !1),
                    o.preventDefault(),
                    a.touchMoveStopPropagation &&
                      !a.nested &&
                      o.stopPropagation(),
                    i.isMoved ||
                      (a.loop && this.loopFix(),
                      (i.startTranslate = this.getTranslate()),
                      this.setTransition(0),
                      this.animating &&
                        this.$wrapperEl.trigger(
                          "webkitTransitionEnd transitionend"
                        ),
                      (i.allowMomentumBounce = !1),
                      !a.grabCursor ||
                        (!0 !== this.allowSlideNext &&
                          !0 !== this.allowSlidePrev) ||
                        this.setGrabCursor(!0),
                      this.emit("sliderFirstMove", o)),
                    this.emit("sliderMove", o),
                    (i.isMoved = !0);
                  var v = this.isHorizontal() ? c : u;
                  (r.diff = v),
                    (v *= a.touchRatio),
                    n && (v = -v),
                    (this.swipeDirection = v > 0 ? "prev" : "next"),
                    (i.currentTranslate = v + i.startTranslate);
                  var f = !0,
                    m = a.resistanceRatio;
                  if (
                    (a.touchReleaseOnEdges && (m = 0),
                    v > 0 && i.currentTranslate > this.minTranslate()
                      ? ((f = !1),
                        a.resistance &&
                          (i.currentTranslate =
                            this.minTranslate() -
                            1 +
                            Math.pow(
                              -this.minTranslate() + i.startTranslate + v,
                              m
                            )))
                      : v < 0 &&
                        i.currentTranslate < this.maxTranslate() &&
                        ((f = !1),
                        a.resistance &&
                          (i.currentTranslate =
                            this.maxTranslate() +
                            1 -
                            Math.pow(
                              this.maxTranslate() - i.startTranslate - v,
                              m
                            ))),
                    f && (o.preventedByNestedSwiper = !0),
                    !this.allowSlideNext &&
                      "next" === this.swipeDirection &&
                      i.currentTranslate < i.startTranslate &&
                      (i.currentTranslate = i.startTranslate),
                    !this.allowSlidePrev &&
                      "prev" === this.swipeDirection &&
                      i.currentTranslate > i.startTranslate &&
                      (i.currentTranslate = i.startTranslate),
                    a.threshold > 0)
                  ) {
                    if (!(Math.abs(v) > a.threshold || i.allowThresholdMove))
                      return void (i.currentTranslate = i.startTranslate);
                    if (!i.allowThresholdMove)
                      return (
                        (i.allowThresholdMove = !0),
                        (r.startX = r.currentX),
                        (r.startY = r.currentY),
                        (i.currentTranslate = i.startTranslate),
                        void (r.diff = this.isHorizontal()
                          ? r.currentX - r.startX
                          : r.currentY - r.startY)
                      );
                  }
                  a.followFinger &&
                    ((a.freeMode ||
                      a.watchSlidesProgress ||
                      a.watchSlidesVisibility) &&
                      (this.updateActiveIndex(), this.updateSlidesClasses()),
                    a.freeMode &&
                      (0 === i.velocities.length &&
                        i.velocities.push({
                          position:
                            r[this.isHorizontal() ? "startX" : "startY"],
                          time: i.touchStartTime
                        }),
                      i.velocities.push({
                        position:
                          r[this.isHorizontal() ? "currentX" : "currentY"],
                        time: d.now()
                      })),
                    this.updateProgress(i.currentTranslate),
                    this.setTranslate(i.currentTranslate));
                }
              }
            }
          } else
            i.startMoving && i.isScrolling && this.emit("touchMoveOpposite", o);
        }.bind(this)),
        (this.onTouchEnd = function(e) {
          var t = this,
            i = t.touchEventsData,
            s = t.params,
            a = t.touches,
            r = t.rtlTranslate,
            n = t.$wrapperEl,
            o = t.slidesGrid,
            l = t.snapGrid,
            h = e;
          if (
            (h.originalEvent && (h = h.originalEvent),
            i.allowTouchCallbacks && t.emit("touchEnd", h),
            (i.allowTouchCallbacks = !1),
            !i.isTouched)
          )
            return (
              i.isMoved && s.grabCursor && t.setGrabCursor(!1),
              (i.isMoved = !1),
              void (i.startMoving = !1)
            );
          s.grabCursor &&
            i.isMoved &&
            i.isTouched &&
            (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
            t.setGrabCursor(!1);
          var p,
            c = d.now(),
            u = c - i.touchStartTime;
          if (
            (t.allowClick &&
              (t.updateClickedSlide(h),
              t.emit("tap", h),
              u < 300 &&
                c - i.lastClickTime > 300 &&
                (i.clickTimeout && clearTimeout(i.clickTimeout),
                (i.clickTimeout = d.nextTick(function() {
                  t && !t.destroyed && t.emit("click", h);
                }, 300))),
              u < 300 &&
                c - i.lastClickTime < 300 &&
                (i.clickTimeout && clearTimeout(i.clickTimeout),
                t.emit("doubleTap", h))),
            (i.lastClickTime = d.now()),
            d.nextTick(function() {
              t.destroyed || (t.allowClick = !0);
            }),
            !i.isTouched ||
              !i.isMoved ||
              !t.swipeDirection ||
              0 === a.diff ||
              i.currentTranslate === i.startTranslate)
          )
            return (
              (i.isTouched = !1), (i.isMoved = !1), void (i.startMoving = !1)
            );
          if (
            ((i.isTouched = !1),
            (i.isMoved = !1),
            (i.startMoving = !1),
            (p = s.followFinger
              ? r
                ? t.translate
                : -t.translate
              : -i.currentTranslate),
            s.freeMode)
          ) {
            if (p < -t.minTranslate()) return void t.slideTo(t.activeIndex);
            if (p > -t.maxTranslate())
              return void (t.slides.length < l.length
                ? t.slideTo(l.length - 1)
                : t.slideTo(t.slides.length - 1));
            if (s.freeModeMomentum) {
              if (i.velocities.length > 1) {
                var v = i.velocities.pop(),
                  f = i.velocities.pop(),
                  m = v.position - f.position,
                  g = v.time - f.time;
                (t.velocity = m / g),
                  (t.velocity /= 2),
                  Math.abs(t.velocity) < s.freeModeMinimumVelocity &&
                    (t.velocity = 0),
                  (g > 150 || d.now() - v.time > 300) && (t.velocity = 0);
              } else t.velocity = 0;
              (t.velocity *= s.freeModeMomentumVelocityRatio),
                (i.velocities.length = 0);
              var b = 1e3 * s.freeModeMomentumRatio,
                w = t.velocity * b,
                y = t.translate + w;
              r && (y = -y);
              var x,
                E = !1,
                T = 20 * Math.abs(t.velocity) * s.freeModeMomentumBounceRatio;
              if (y < t.maxTranslate())
                s.freeModeMomentumBounce
                  ? (y + t.maxTranslate() < -T && (y = t.maxTranslate() - T),
                    (x = t.maxTranslate()),
                    (E = !0),
                    (i.allowMomentumBounce = !0))
                  : (y = t.maxTranslate());
              else if (y > t.minTranslate())
                s.freeModeMomentumBounce
                  ? (y - t.minTranslate() > T && (y = t.minTranslate() + T),
                    (x = t.minTranslate()),
                    (E = !0),
                    (i.allowMomentumBounce = !0))
                  : (y = t.minTranslate());
              else if (s.freeModeSticky) {
                for (var S, C = 0; C < l.length; C += 1)
                  if (l[C] > -y) {
                    S = C;
                    break;
                  }
                y = -(y =
                  Math.abs(l[S] - y) < Math.abs(l[S - 1] - y) ||
                  "next" === t.swipeDirection
                    ? l[S]
                    : l[S - 1]);
              }
              if (0 !== t.velocity)
                b = r
                  ? Math.abs((-y - t.translate) / t.velocity)
                  : Math.abs((y - t.translate) / t.velocity);
              else if (s.freeModeSticky) return void t.slideToClosest();
              s.freeModeMomentumBounce && E
                ? (t.updateProgress(x),
                  t.setTransition(b),
                  t.setTranslate(y),
                  t.transitionStart(!0, t.swipeDirection),
                  (t.animating = !0),
                  n.transitionEnd(function() {
                    t &&
                      !t.destroyed &&
                      i.allowMomentumBounce &&
                      (t.emit("momentumBounce"),
                      t.setTransition(s.speed),
                      t.setTranslate(x),
                      n.transitionEnd(function() {
                        t && !t.destroyed && t.transitionEnd();
                      }));
                  }))
                : t.velocity
                ? (t.updateProgress(y),
                  t.setTransition(b),
                  t.setTranslate(y),
                  t.transitionStart(!0, t.swipeDirection),
                  t.animating ||
                    ((t.animating = !0),
                    n.transitionEnd(function() {
                      t && !t.destroyed && t.transitionEnd();
                    })))
                : t.updateProgress(y),
                t.updateActiveIndex(),
                t.updateSlidesClasses();
            } else if (s.freeModeSticky) return void t.slideToClosest();
            (!s.freeModeMomentum || u >= s.longSwipesMs) &&
              (t.updateProgress(),
              t.updateActiveIndex(),
              t.updateSlidesClasses());
          } else {
            for (
              var M = 0, z = t.slidesSizesGrid[0], P = 0;
              P < o.length;
              P += s.slidesPerGroup
            )
              void 0 !== o[P + s.slidesPerGroup]
                ? p >= o[P] &&
                  p < o[P + s.slidesPerGroup] &&
                  ((M = P), (z = o[P + s.slidesPerGroup] - o[P]))
                : p >= o[P] &&
                  ((M = P), (z = o[o.length - 1] - o[o.length - 2]));
            var k = (p - o[M]) / z;
            if (u > s.longSwipesMs) {
              if (!s.longSwipes) return void t.slideTo(t.activeIndex);
              "next" === t.swipeDirection &&
                (k >= s.longSwipesRatio
                  ? t.slideTo(M + s.slidesPerGroup)
                  : t.slideTo(M)),
                "prev" === t.swipeDirection &&
                  (k > 1 - s.longSwipesRatio
                    ? t.slideTo(M + s.slidesPerGroup)
                    : t.slideTo(M));
            } else {
              if (!s.shortSwipes) return void t.slideTo(t.activeIndex);
              "next" === t.swipeDirection && t.slideTo(M + s.slidesPerGroup),
                "prev" === t.swipeDirection && t.slideTo(M);
            }
          }
        }.bind(this)),
        (this.onClick = function(e) {
          this.allowClick ||
            (this.params.preventClicks && e.preventDefault(),
            this.params.preventClicksPropagation &&
              this.animating &&
              (e.stopPropagation(), e.stopImmediatePropagation()));
        }.bind(this));
      var o = "container" === i.touchEventsTarget ? r : n,
        l = !!i.nested;
      if (h.touch || (!h.pointerEvents && !h.prefixedPointerEvents)) {
        if (h.touch) {
          var p = !(
            "touchstart" !== a.start ||
            !h.passiveListener ||
            !i.passiveListeners
          ) && { passive: !0, capture: !1 };
          o.addEventListener(a.start, this.onTouchStart, p),
            o.addEventListener(
              a.move,
              this.onTouchMove,
              h.passiveListener ? { passive: !1, capture: l } : l
            ),
            o.addEventListener(a.end, this.onTouchEnd, p);
        }
        ((i.simulateTouch && !y.ios && !y.android) ||
          (i.simulateTouch && !h.touch && y.ios)) &&
          (o.addEventListener("mousedown", this.onTouchStart, !1),
          e.addEventListener("mousemove", this.onTouchMove, l),
          e.addEventListener("mouseup", this.onTouchEnd, !1));
      } else
        o.addEventListener(a.start, this.onTouchStart, !1),
          e.addEventListener(a.move, this.onTouchMove, l),
          e.addEventListener(a.end, this.onTouchEnd, !1);
      (i.preventClicks || i.preventClicksPropagation) &&
        o.addEventListener("click", this.onClick, !0),
        this.on("resize observerUpdate", x, !0);
    },
    detachEvents: function() {
      var t = this.params,
        i = this.touchEvents,
        s = this.el,
        a = this.wrapperEl,
        r = "container" === t.touchEventsTarget ? s : a,
        n = !!t.nested;
      if (h.touch || (!h.pointerEvents && !h.prefixedPointerEvents)) {
        if (h.touch) {
          var o = !(
            "onTouchStart" !== i.start ||
            !h.passiveListener ||
            !t.passiveListeners
          ) && { passive: !0, capture: !1 };
          r.removeEventListener(i.start, this.onTouchStart, o),
            r.removeEventListener(i.move, this.onTouchMove, n),
            r.removeEventListener(i.end, this.onTouchEnd, o);
        }
        ((t.simulateTouch && !y.ios && !y.android) ||
          (t.simulateTouch && !h.touch && y.ios)) &&
          (r.removeEventListener("mousedown", this.onTouchStart, !1),
          e.removeEventListener("mousemove", this.onTouchMove, n),
          e.removeEventListener("mouseup", this.onTouchEnd, !1));
      } else
        r.removeEventListener(i.start, this.onTouchStart, !1),
          e.removeEventListener(i.move, this.onTouchMove, n),
          e.removeEventListener(i.end, this.onTouchEnd, !1);
      (t.preventClicks || t.preventClicksPropagation) &&
        r.removeEventListener("click", this.onClick, !0),
        this.off("resize observerUpdate", x);
    }
  };
  var T = {
      setBreakpoint: function() {
        var e = this.activeIndex,
          t = this.loopedSlides;
        void 0 === t && (t = 0);
        var i = this.params,
          s = i.breakpoints;
        if (s && (!s || 0 !== Object.keys(s).length)) {
          var a = this.getBreakpoint(s);
          if (a && this.currentBreakpoint !== a) {
            var r = a in s ? s[a] : this.originalParams,
              n = i.loop && r.slidesPerView !== i.slidesPerView;
            d.extend(this.params, r),
              d.extend(this, {
                allowTouchMove: this.params.allowTouchMove,
                allowSlideNext: this.params.allowSlideNext,
                allowSlidePrev: this.params.allowSlidePrev
              }),
              (this.currentBreakpoint = a),
              n &&
                (this.loopDestroy(),
                this.loopCreate(),
                this.updateSlides(),
                this.slideTo(e - t + this.loopedSlides, 0, !1)),
              this.emit("breakpoint", r);
          }
        }
      },
      getBreakpoint: function(e) {
        if (e) {
          var i = !1,
            s = [];
          Object.keys(e).forEach(function(e) {
            s.push(e);
          }),
            s.sort(function(e, t) {
              return parseInt(e, 10) - parseInt(t, 10);
            });
          for (var a = 0; a < s.length; a += 1) {
            var r = s[a];
            r >= t.innerWidth && !i && (i = r);
          }
          return i || "max";
        }
      }
    },
    S = (function() {
      return {
        isIE:
          !!t.navigator.userAgent.match(/Trident/g) ||
          !!t.navigator.userAgent.match(/MSIE/g),
        isSafari:
          ((e = t.navigator.userAgent.toLowerCase()),
          e.indexOf("safari") >= 0 &&
            e.indexOf("chrome") < 0 &&
            e.indexOf("android") < 0),
        isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
          t.navigator.userAgent
        )
      };
      var e;
    })();
  var C = {
      init: !0,
      direction: "horizontal",
      touchEventsTarget: "container",
      initialSlide: 0,
      speed: 300,
      preventIntercationOnTransition: !1,
      iOSEdgeSwipeDetection: !1,
      iOSEdgeSwipeThreshold: 20,
      freeMode: !1,
      freeModeMomentum: !0,
      freeModeMomentumRatio: 1,
      freeModeMomentumBounce: !0,
      freeModeMomentumBounceRatio: 1,
      freeModeMomentumVelocityRatio: 1,
      freeModeSticky: !1,
      freeModeMinimumVelocity: 0.02,
      autoHeight: !1,
      setWrapperSize: !1,
      virtualTranslate: !1,
      effect: "slide",
      breakpoints: void 0,
      spaceBetween: 0,
      slidesPerView: 1,
      slidesPerColumn: 1,
      slidesPerColumnFill: "column",
      slidesPerGroup: 1,
      centeredSlides: !1,
      slidesOffsetBefore: 0,
      slidesOffsetAfter: 0,
      normalizeSlideIndex: !0,
      watchOverflow: !1,
      roundLengths: !1,
      touchRatio: 1,
      touchAngle: 45,
      simulateTouch: !0,
      shortSwipes: !0,
      longSwipes: !0,
      longSwipesRatio: 0.5,
      longSwipesMs: 300,
      followFinger: !0,
      allowTouchMove: !0,
      threshold: 0,
      touchMoveStopPropagation: !0,
      touchReleaseOnEdges: !1,
      uniqueNavElements: !0,
      resistance: !0,
      resistanceRatio: 0.85,
      watchSlidesProgress: !1,
      watchSlidesVisibility: !1,
      grabCursor: !1,
      preventClicks: !0,
      preventClicksPropagation: !0,
      slideToClickedSlide: !1,
      preloadImages: !0,
      updateOnImagesReady: !0,
      loop: !1,
      loopAdditionalSlides: 0,
      loopedSlides: null,
      loopFillGroupWithBlank: !1,
      allowSlidePrev: !0,
      allowSlideNext: !0,
      swipeHandler: null,
      noSwiping: !0,
      noSwipingClass: "swiper-no-swiping",
      noSwipingSelector: null,
      passiveListeners: !0,
      containerModifierClass: "swiper-container-",
      slideClass: "swiper-slide",
      slideBlankClass: "swiper-slide-invisible-blank",
      slideActiveClass: "swiper-slide-active",
      slideDuplicateActiveClass: "swiper-slide-duplicate-active",
      slideVisibleClass: "swiper-slide-visible",
      slideDuplicateClass: "swiper-slide-duplicate",
      slideNextClass: "swiper-slide-next",
      slideDuplicateNextClass: "swiper-slide-duplicate-next",
      slidePrevClass: "swiper-slide-prev",
      slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
      wrapperClass: "swiper-wrapper",
      runCallbacksOnInit: !0
    },
    M = {
      update: u,
      translate: v,
      transition: f,
      slide: m,
      loop: g,
      grabCursor: b,
      manipulation: w,
      events: E,
      breakpoints: T,
      checkOverflow: {
        checkOverflow: function() {
          var e = this.isLocked;
          (this.isLocked = 1 === this.snapGrid.length),
            (this.allowTouchMove = !this.isLocked),
            e &&
              e !== this.isLocked &&
              ((this.isEnd = !1), this.navigation.update());
        }
      },
      classes: {
        addClasses: function() {
          var e = this.classNames,
            t = this.params,
            i = this.rtl,
            s = this.$el,
            a = [];
          a.push(t.direction),
            t.freeMode && a.push("free-mode"),
            h.flexbox || a.push("no-flexbox"),
            t.autoHeight && a.push("autoheight"),
            i && a.push("rtl"),
            t.slidesPerColumn > 1 && a.push("multirow"),
            y.android && a.push("android"),
            y.ios && a.push("ios"),
            S.isIE &&
              (h.pointerEvents || h.prefixedPointerEvents) &&
              a.push("wp8-" + t.direction),
            a.forEach(function(i) {
              e.push(t.containerModifierClass + i);
            }),
            s.addClass(e.join(" "));
        },
        removeClasses: function() {
          var e = this.$el,
            t = this.classNames;
          e.removeClass(t.join(" "));
        }
      },
      images: {
        loadImage: function(e, i, s, a, r, n) {
          var o;
          function l() {
            n && n();
          }
          e.complete && r
            ? l()
            : i
            ? (((o = new t.Image()).onload = l),
              (o.onerror = l),
              a && (o.sizes = a),
              s && (o.srcset = s),
              i && (o.src = i))
            : l();
        },
        preloadImages: function() {
          var e = this;
          function t() {
            void 0 !== e &&
              null !== e &&
              e &&
              !e.destroyed &&
              (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1),
              e.imagesLoaded === e.imagesToLoad.length &&
                (e.params.updateOnImagesReady && e.update(),
                e.emit("imagesReady")));
          }
          e.imagesToLoad = e.$el.find("img");
          for (var i = 0; i < e.imagesToLoad.length; i += 1) {
            var s = e.imagesToLoad[i];
            e.loadImage(
              s,
              s.currentSrc || s.getAttribute("src"),
              s.srcset || s.getAttribute("srcset"),
              s.sizes || s.getAttribute("sizes"),
              !0,
              t
            );
          }
        }
      }
    },
    z = {},
    P = (function(e) {
      function t() {
        for (var i, a, r, n = [], o = arguments.length; o--; )
          n[o] = arguments[o];
        1 === n.length && n[0].constructor && n[0].constructor === Object
          ? (r = n[0])
          : ((a = (i = n)[0]), (r = i[1])),
          r || (r = {}),
          (r = d.extend({}, r)),
          a && !r.el && (r.el = a),
          e.call(this, r),
          Object.keys(M).forEach(function(e) {
            Object.keys(M[e]).forEach(function(i) {
              t.prototype[i] || (t.prototype[i] = M[e][i]);
            });
          });
        var l = this;
        void 0 === l.modules && (l.modules = {}),
          Object.keys(l.modules).forEach(function(e) {
            var t = l.modules[e];
            if (t.params) {
              var i = Object.keys(t.params)[0],
                s = t.params[i];
              if ("object" != typeof s) return;
              if (!(i in r && "enabled" in s)) return;
              !0 === r[i] && (r[i] = { enabled: !0 }),
                "object" != typeof r[i] ||
                  "enabled" in r[i] ||
                  (r[i].enabled = !0),
                r[i] || (r[i] = { enabled: !1 });
            }
          });
        var p = d.extend({}, C);
        l.useModulesParams(p),
          (l.params = d.extend({}, p, z, r)),
          (l.originalParams = d.extend({}, l.params)),
          (l.passedParams = d.extend({}, r)),
          (l.$ = s);
        var c = s(l.params.el);
        if ((a = c[0])) {
          if (c.length > 1) {
            var u = [];
            return (
              c.each(function(e, i) {
                var s = d.extend({}, r, { el: i });
                u.push(new t(s));
              }),
              u
            );
          }
          (a.swiper = l), c.data("swiper", l);
          var v,
            f,
            m = c.children("." + l.params.wrapperClass);
          return (
            d.extend(l, {
              $el: c,
              el: a,
              $wrapperEl: m,
              wrapperEl: m[0],
              classNames: [],
              slides: s(),
              slidesGrid: [],
              snapGrid: [],
              slidesSizesGrid: [],
              isHorizontal: function() {
                return "horizontal" === l.params.direction;
              },
              isVertical: function() {
                return "vertical" === l.params.direction;
              },
              rtl:
                "rtl" === a.dir.toLowerCase() || "rtl" === c.css("direction"),
              rtlTranslate:
                "horizontal" === l.params.direction &&
                ("rtl" === a.dir.toLowerCase() || "rtl" === c.css("direction")),
              wrongRTL: "-webkit-box" === m.css("display"),
              activeIndex: 0,
              realIndex: 0,
              isBeginning: !0,
              isEnd: !1,
              translate: 0,
              progress: 0,
              velocity: 0,
              animating: !1,
              allowSlideNext: l.params.allowSlideNext,
              allowSlidePrev: l.params.allowSlidePrev,
              touchEvents:
                ((v = ["touchstart", "touchmove", "touchend"]),
                (f = ["mousedown", "mousemove", "mouseup"]),
                h.pointerEvents
                  ? (f = ["pointerdown", "pointermove", "pointerup"])
                  : h.prefixedPointerEvents &&
                    (f = ["MSPointerDown", "MSPointerMove", "MSPointerUp"]),
                (l.touchEventsTouch = { start: v[0], move: v[1], end: v[2] }),
                (l.touchEventsDesktop = { start: f[0], move: f[1], end: f[2] }),
                h.touch || !l.params.simulateTouch
                  ? l.touchEventsTouch
                  : l.touchEventsDesktop),
              touchEventsData: {
                isTouched: void 0,
                isMoved: void 0,
                allowTouchCallbacks: void 0,
                touchStartTime: void 0,
                isScrolling: void 0,
                currentTranslate: void 0,
                startTranslate: void 0,
                allowThresholdMove: void 0,
                formElements: "input, select, option, textarea, button, video",
                lastClickTime: d.now(),
                clickTimeout: void 0,
                velocities: [],
                allowMomentumBounce: void 0,
                isTouchEvent: void 0,
                startMoving: void 0
              },
              allowClick: !0,
              allowTouchMove: l.params.allowTouchMove,
              touches: {
                startX: 0,
                startY: 0,
                currentX: 0,
                currentY: 0,
                diff: 0
              },
              imagesToLoad: [],
              imagesLoaded: 0
            }),
            l.useModules(),
            l.params.init && l.init(),
            l
          );
        }
      }
      e && (t.__proto__ = e),
        (t.prototype = Object.create(e && e.prototype)),
        (t.prototype.constructor = t);
      var i = {
        extendedDefaults: { configurable: !0 },
        defaults: { configurable: !0 },
        Class: { configurable: !0 },
        $: { configurable: !0 }
      };
      return (
        (t.prototype.slidesPerViewDynamic = function() {
          var e = this.params,
            t = this.slides,
            i = this.slidesGrid,
            s = this.size,
            a = this.activeIndex,
            r = 1;
          if (e.centeredSlides) {
            for (
              var n, o = t[a].swiperSlideSize, l = a + 1;
              l < t.length;
              l += 1
            )
              t[l] &&
                !n &&
                ((r += 1), (o += t[l].swiperSlideSize) > s && (n = !0));
            for (var d = a - 1; d >= 0; d -= 1)
              t[d] &&
                !n &&
                ((r += 1), (o += t[d].swiperSlideSize) > s && (n = !0));
          } else
            for (var h = a + 1; h < t.length; h += 1)
              i[h] - i[a] < s && (r += 1);
          return r;
        }),
        (t.prototype.update = function() {
          var e = this;
          e &&
            !e.destroyed &&
            (e.updateSize(),
            e.updateSlides(),
            e.updateProgress(),
            e.updateSlidesClasses(),
            e.params.freeMode
              ? (t(), e.params.autoHeight && e.updateAutoHeight())
              : (("auto" === e.params.slidesPerView ||
                  e.params.slidesPerView > 1) &&
                e.isEnd &&
                !e.params.centeredSlides
                  ? e.slideTo(e.slides.length - 1, 0, !1, !0)
                  : e.slideTo(e.activeIndex, 0, !1, !0)) || t(),
            e.emit("update"));
          function t() {
            var t = e.rtlTranslate ? -1 * e.translate : e.translate,
              i = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
            e.setTranslate(i), e.updateActiveIndex(), e.updateSlidesClasses();
          }
        }),
        (t.prototype.init = function() {
          this.initialized ||
            (this.emit("beforeInit"),
            this.params.breakpoints && this.setBreakpoint(),
            this.addClasses(),
            this.params.loop && this.loopCreate(),
            this.updateSize(),
            this.updateSlides(),
            this.params.watchOverflow && this.checkOverflow(),
            this.params.grabCursor && this.setGrabCursor(),
            this.params.preloadImages && this.preloadImages(),
            this.params.loop
              ? this.slideTo(
                  this.params.initialSlide + this.loopedSlides,
                  0,
                  this.params.runCallbacksOnInit
                )
              : this.slideTo(
                  this.params.initialSlide,
                  0,
                  this.params.runCallbacksOnInit
                ),
            this.attachEvents(),
            (this.initialized = !0),
            this.emit("init"));
        }),
        (t.prototype.destroy = function(e, t) {
          void 0 === e && (e = !0), void 0 === t && (t = !0);
          var i = this,
            s = i.params,
            a = i.$el,
            r = i.$wrapperEl,
            n = i.slides;
          i.emit("beforeDestroy"),
            (i.initialized = !1),
            i.detachEvents(),
            s.loop && i.loopDestroy(),
            t &&
              (i.removeClasses(),
              a.removeAttr("style"),
              r.removeAttr("style"),
              n &&
                n.length &&
                n
                  .removeClass(
                    [
                      s.slideVisibleClass,
                      s.slideActiveClass,
                      s.slideNextClass,
                      s.slidePrevClass
                    ].join(" ")
                  )
                  .removeAttr("style")
                  .removeAttr("data-swiper-slide-index")
                  .removeAttr("data-swiper-column")
                  .removeAttr("data-swiper-row")),
            i.emit("destroy"),
            Object.keys(i.eventsListeners).forEach(function(e) {
              i.off(e);
            }),
            !1 !== e &&
              ((i.$el[0].swiper = null),
              i.$el.data("swiper", null),
              d.deleteProps(i)),
            (i.destroyed = !0);
        }),
        (t.extendDefaults = function(e) {
          d.extend(z, e);
        }),
        (i.extendedDefaults.get = function() {
          return z;
        }),
        (i.defaults.get = function() {
          return C;
        }),
        (i.Class.get = function() {
          return e;
        }),
        (i.$.get = function() {
          return s;
        }),
        Object.defineProperties(t, i),
        t
      );
    })(p),
    k = { name: "device", proto: { device: y }, static: { device: y } },
    $ = { name: "support", proto: { support: h }, static: { support: h } },
    L = { name: "browser", proto: { browser: S }, static: { browser: S } },
    I = {
      name: "resize",
      create: function() {
        var e = this;
        d.extend(e, {
          resize: {
            resizeHandler: function() {
              e &&
                !e.destroyed &&
                e.initialized &&
                (e.emit("beforeResize"), e.emit("resize"));
            },
            orientationChangeHandler: function() {
              e && !e.destroyed && e.initialized && e.emit("orientationchange");
            }
          }
        });
      },
      on: {
        init: function() {
          t.addEventListener("resize", this.resize.resizeHandler),
            t.addEventListener(
              "orientationchange",
              this.resize.orientationChangeHandler
            );
        },
        destroy: function() {
          t.removeEventListener("resize", this.resize.resizeHandler),
            t.removeEventListener(
              "orientationchange",
              this.resize.orientationChangeHandler
            );
        }
      }
    },
    D = {
      func: t.MutationObserver || t.WebkitMutationObserver,
      attach: function(e, t) {
        void 0 === t && (t = {});
        var i = this,
          s = new (0, D.func)(function(e) {
            e.forEach(function(e) {
              i.emit("observerUpdate", e);
            });
          });
        s.observe(e, {
          attributes: void 0 === t.attributes || t.attributes,
          childList: void 0 === t.childList || t.childList,
          characterData: void 0 === t.characterData || t.characterData
        }),
          i.observer.observers.push(s);
      },
      init: function() {
        if (h.observer && this.params.observer) {
          if (this.params.observeParents)
            for (var e = this.$el.parents(), t = 0; t < e.length; t += 1)
              this.observer.attach(e[t]);
          this.observer.attach(this.$el[0], { childList: !1 }),
            this.observer.attach(this.$wrapperEl[0], { attributes: !1 });
        }
      },
      destroy: function() {
        this.observer.observers.forEach(function(e) {
          e.disconnect();
        }),
          (this.observer.observers = []);
      }
    },
    O = {
      name: "observer",
      params: { observer: !1, observeParents: !1 },
      create: function() {
        d.extend(this, {
          observer: {
            init: D.init.bind(this),
            attach: D.attach.bind(this),
            destroy: D.destroy.bind(this),
            observers: []
          }
        });
      },
      on: {
        init: function() {
          this.observer.init();
        },
        destroy: function() {
          this.observer.destroy();
        }
      }
    },
    A = {
      update: function(e) {
        var t = this,
          i = t.params,
          s = i.slidesPerView,
          a = i.slidesPerGroup,
          r = i.centeredSlides,
          n = t.virtual,
          o = n.from,
          l = n.to,
          h = n.slides,
          p = n.slidesGrid,
          c = n.renderSlide,
          u = n.offset;
        t.updateActiveIndex();
        var v,
          f,
          m,
          g = t.activeIndex || 0;
        (v = t.rtlTranslate ? "right" : t.isHorizontal() ? "left" : "top"),
          r
            ? ((f = Math.floor(s / 2) + a), (m = Math.floor(s / 2) + a))
            : ((f = s + (a - 1)), (m = a));
        var b = Math.max((g || 0) - m, 0),
          w = Math.min((g || 0) + f, h.length - 1),
          y = (t.slidesGrid[b] || 0) - (t.slidesGrid[0] || 0);
        function x() {
          t.updateSlides(),
            t.updateProgress(),
            t.updateSlidesClasses(),
            t.lazy && t.params.lazy.enabled && t.lazy.load();
        }
        if (
          (d.extend(t.virtual, {
            from: b,
            to: w,
            offset: y,
            slidesGrid: t.slidesGrid
          }),
          o === b && l === w && !e)
        )
          return (
            t.slidesGrid !== p && y !== u && t.slides.css(v, y + "px"),
            void t.updateProgress()
          );
        if (t.params.virtual.renderExternal)
          return (
            t.params.virtual.renderExternal.call(t, {
              offset: y,
              from: b,
              to: w,
              slides: (function() {
                for (var e = [], t = b; t <= w; t += 1) e.push(h[t]);
                return e;
              })()
            }),
            void x()
          );
        var E = [],
          T = [];
        if (e) t.$wrapperEl.find("." + t.params.slideClass).remove();
        else
          for (var S = o; S <= l; S += 1)
            (S < b || S > w) &&
              t.$wrapperEl
                .find(
                  "." +
                    t.params.slideClass +
                    '[data-swiper-slide-index="' +
                    S +
                    '"]'
                )
                .remove();
        for (var C = 0; C < h.length; C += 1)
          C >= b &&
            C <= w &&
            (void 0 === l || e
              ? T.push(C)
              : (C > l && T.push(C), C < o && E.push(C)));
        T.forEach(function(e) {
          t.$wrapperEl.append(c(h[e], e));
        }),
          E.sort(function(e, t) {
            return e < t;
          }).forEach(function(e) {
            t.$wrapperEl.prepend(c(h[e], e));
          }),
          t.$wrapperEl.children(".swiper-slide").css(v, y + "px"),
          x();
      },
      renderSlide: function(e, t) {
        var i = this.params.virtual;
        if (i.cache && this.virtual.cache[t]) return this.virtual.cache[t];
        var a = i.renderSlide
          ? s(i.renderSlide.call(this, e, t))
          : s(
              '<div class="' +
                this.params.slideClass +
                '" data-swiper-slide-index="' +
                t +
                '">' +
                e +
                "</div>"
            );
        return (
          a.attr("data-swiper-slide-index") ||
            a.attr("data-swiper-slide-index", t),
          i.cache && (this.virtual.cache[t] = a),
          a
        );
      },
      appendSlide: function(e) {
        this.virtual.slides.push(e), this.virtual.update(!0);
      },
      prependSlide: function(e) {
        if ((this.virtual.slides.unshift(e), this.params.virtual.cache)) {
          var t = this.virtual.cache,
            i = {};
          Object.keys(t).forEach(function(e) {
            i[e + 1] = t[e];
          }),
            (this.virtual.cache = i);
        }
        this.virtual.update(!0), this.slideNext(0);
      }
    },
    H = {
      name: "virtual",
      params: {
        virtual: {
          enabled: !1,
          slides: [],
          cache: !0,
          renderSlide: null,
          renderExternal: null
        }
      },
      create: function() {
        d.extend(this, {
          virtual: {
            update: A.update.bind(this),
            appendSlide: A.appendSlide.bind(this),
            prependSlide: A.prependSlide.bind(this),
            renderSlide: A.renderSlide.bind(this),
            slides: this.params.virtual.slides,
            cache: {}
          }
        });
      },
      on: {
        beforeInit: function() {
          if (this.params.virtual.enabled) {
            this.classNames.push(
              this.params.containerModifierClass + "virtual"
            );
            var e = { watchSlidesProgress: !0 };
            d.extend(this.params, e),
              d.extend(this.originalParams, e),
              this.virtual.update();
          }
        },
        setTranslate: function() {
          this.params.virtual.enabled && this.virtual.update();
        }
      }
    },
    N = {
      handle: function(i) {
        var s = this.rtlTranslate,
          a = i;
        a.originalEvent && (a = a.originalEvent);
        var r = a.keyCode || a.charCode;
        if (
          !this.allowSlideNext &&
          ((this.isHorizontal() && 39 === r) || (this.isVertical() && 40 === r))
        )
          return !1;
        if (
          !this.allowSlidePrev &&
          ((this.isHorizontal() && 37 === r) || (this.isVertical() && 38 === r))
        )
          return !1;
        if (
          !(
            a.shiftKey ||
            a.altKey ||
            a.ctrlKey ||
            a.metaKey ||
            (e.activeElement &&
              e.activeElement.nodeName &&
              ("input" === e.activeElement.nodeName.toLowerCase() ||
                "textarea" === e.activeElement.nodeName.toLowerCase()))
          )
        ) {
          if (
            this.params.keyboard.onlyInViewport &&
            (37 === r || 39 === r || 38 === r || 40 === r)
          ) {
            var n = !1;
            if (
              this.$el.parents("." + this.params.slideClass).length > 0 &&
              0 === this.$el.parents("." + this.params.slideActiveClass).length
            )
              return;
            var o = t.innerWidth,
              l = t.innerHeight,
              d = this.$el.offset();
            s && (d.left -= this.$el[0].scrollLeft);
            for (
              var h = [
                  [d.left, d.top],
                  [d.left + this.width, d.top],
                  [d.left, d.top + this.height],
                  [d.left + this.width, d.top + this.height]
                ],
                p = 0;
              p < h.length;
              p += 1
            ) {
              var c = h[p];
              c[0] >= 0 && c[0] <= o && c[1] >= 0 && c[1] <= l && (n = !0);
            }
            if (!n) return;
          }
          this.isHorizontal()
            ? ((37 !== r && 39 !== r) ||
                (a.preventDefault ? a.preventDefault() : (a.returnValue = !1)),
              ((39 === r && !s) || (37 === r && s)) && this.slideNext(),
              ((37 === r && !s) || (39 === r && s)) && this.slidePrev())
            : ((38 !== r && 40 !== r) ||
                (a.preventDefault ? a.preventDefault() : (a.returnValue = !1)),
              40 === r && this.slideNext(),
              38 === r && this.slidePrev()),
            this.emit("keyPress", r);
        }
      },
      enable: function() {
        this.keyboard.enabled ||
          (s(e).on("keydown", this.keyboard.handle),
          (this.keyboard.enabled = !0));
      },
      disable: function() {
        this.keyboard.enabled &&
          (s(e).off("keydown", this.keyboard.handle),
          (this.keyboard.enabled = !1));
      }
    },
    B = {
      name: "keyboard",
      params: { keyboard: { enabled: !1, onlyInViewport: !0 } },
      create: function() {
        d.extend(this, {
          keyboard: {
            enabled: !1,
            enable: N.enable.bind(this),
            disable: N.disable.bind(this),
            handle: N.handle.bind(this)
          }
        });
      },
      on: {
        init: function() {
          this.params.keyboard.enabled && this.keyboard.enable();
        },
        destroy: function() {
          this.keyboard.enabled && this.keyboard.disable();
        }
      }
    };
  var G = {
      lastScrollTime: d.now(),
      event:
        t.navigator.userAgent.indexOf("firefox") > -1
          ? "DOMMouseScroll"
          : (function() {
              var t = "onwheel" in e;
              if (!t) {
                var i = e.createElement("div");
                i.setAttribute("onwheel", "return;"),
                  (t = "function" == typeof i.onwheel);
              }
              return (
                !t &&
                  e.implementation &&
                  e.implementation.hasFeature &&
                  !0 !== e.implementation.hasFeature("", "") &&
                  (t = e.implementation.hasFeature("Events.wheel", "3.0")),
                t
              );
            })()
          ? "wheel"
          : "mousewheel",
      normalize: function(e) {
        var t = 0,
          i = 0,
          s = 0,
          a = 0;
        return (
          "detail" in e && (i = e.detail),
          "wheelDelta" in e && (i = -e.wheelDelta / 120),
          "wheelDeltaY" in e && (i = -e.wheelDeltaY / 120),
          "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120),
          "axis" in e && e.axis === e.HORIZONTAL_AXIS && ((t = i), (i = 0)),
          (s = 10 * t),
          (a = 10 * i),
          "deltaY" in e && (a = e.deltaY),
          "deltaX" in e && (s = e.deltaX),
          (s || a) &&
            e.deltaMode &&
            (1 === e.deltaMode
              ? ((s *= 40), (a *= 40))
              : ((s *= 800), (a *= 800))),
          s && !t && (t = s < 1 ? -1 : 1),
          a && !i && (i = a < 1 ? -1 : 1),
          { spinX: t, spinY: i, pixelX: s, pixelY: a }
        );
      },
      handleMouseEnter: function() {
        this.mouseEntered = !0;
      },
      handleMouseLeave: function() {
        this.mouseEntered = !1;
      },
      handle: function(e) {
        var i = e,
          s = this,
          a = s.params.mousewheel;
        if (!s.mouseEntered && !a.releaseOnEdges) return !0;
        i.originalEvent && (i = i.originalEvent);
        var r = 0,
          n = s.rtlTranslate ? -1 : 1,
          o = G.normalize(i);
        if (a.forceToAxis)
          if (s.isHorizontal()) {
            if (!(Math.abs(o.pixelX) > Math.abs(o.pixelY))) return !0;
            r = o.pixelX * n;
          } else {
            if (!(Math.abs(o.pixelY) > Math.abs(o.pixelX))) return !0;
            r = o.pixelY;
          }
        else
          r =
            Math.abs(o.pixelX) > Math.abs(o.pixelY) ? -o.pixelX * n : -o.pixelY;
        if (0 === r) return !0;
        if ((a.invert && (r = -r), s.params.freeMode)) {
          var l = s.getTranslate() + r * a.sensitivity,
            h = s.isBeginning,
            p = s.isEnd;
          if (
            (l >= s.minTranslate() && (l = s.minTranslate()),
            l <= s.maxTranslate() && (l = s.maxTranslate()),
            s.setTransition(0),
            s.setTranslate(l),
            s.updateProgress(),
            s.updateActiveIndex(),
            s.updateSlidesClasses(),
            ((!h && s.isBeginning) || (!p && s.isEnd)) &&
              s.updateSlidesClasses(),
            s.params.freeModeSticky &&
              (clearTimeout(s.mousewheel.timeout),
              (s.mousewheel.timeout = d.nextTick(function() {
                s.slideToClosest();
              }, 300))),
            s.emit("scroll", i),
            s.params.autoplay &&
              s.params.autoplayDisableOnInteraction &&
              s.stopAutoplay(),
            l === s.minTranslate() || l === s.maxTranslate())
          )
            return !0;
        } else {
          if (d.now() - s.mousewheel.lastScrollTime > 60)
            if (r < 0)
              if ((s.isEnd && !s.params.loop) || s.animating) {
                if (a.releaseOnEdges) return !0;
              } else s.slideNext(), s.emit("scroll", i);
            else if ((s.isBeginning && !s.params.loop) || s.animating) {
              if (a.releaseOnEdges) return !0;
            } else s.slidePrev(), s.emit("scroll", i);
          s.mousewheel.lastScrollTime = new t.Date().getTime();
        }
        return i.preventDefault ? i.preventDefault() : (i.returnValue = !1), !1;
      },
      enable: function() {
        if (!G.event) return !1;
        if (this.mousewheel.enabled) return !1;
        var e = this.$el;
        return (
          "container" !== this.params.mousewheel.eventsTarged &&
            (e = s(this.params.mousewheel.eventsTarged)),
          e.on("mouseenter", this.mousewheel.handleMouseEnter),
          e.on("mouseleave", this.mousewheel.handleMouseLeave),
          e.on(G.event, this.mousewheel.handle),
          (this.mousewheel.enabled = !0),
          !0
        );
      },
      disable: function() {
        if (!G.event) return !1;
        if (!this.mousewheel.enabled) return !1;
        var e = this.$el;
        return (
          "container" !== this.params.mousewheel.eventsTarged &&
            (e = s(this.params.mousewheel.eventsTarged)),
          e.off(G.event, this.mousewheel.handle),
          (this.mousewheel.enabled = !1),
          !0
        );
      }
    },
    X = {
      update: function() {
        var e = this.params.navigation;
        if (!this.params.loop) {
          var t = this.navigation,
            i = t.$nextEl,
            s = t.$prevEl;
          s &&
            s.length > 0 &&
            (this.isBeginning
              ? s.addClass(e.disabledClass)
              : s.removeClass(e.disabledClass),
            s[
              this.params.watchOverflow && this.isLocked
                ? "addClass"
                : "removeClass"
            ](e.lockClass)),
            i &&
              i.length > 0 &&
              (this.isEnd
                ? i.addClass(e.disabledClass)
                : i.removeClass(e.disabledClass),
              i[
                this.params.watchOverflow && this.isLocked
                  ? "addClass"
                  : "removeClass"
              ](e.lockClass));
        }
      },
      init: function() {
        var e,
          t,
          i = this,
          a = i.params.navigation;
        (a.nextEl || a.prevEl) &&
          (a.nextEl &&
            ((e = s(a.nextEl)),
            i.params.uniqueNavElements &&
              "string" == typeof a.nextEl &&
              e.length > 1 &&
              1 === i.$el.find(a.nextEl).length &&
              (e = i.$el.find(a.nextEl))),
          a.prevEl &&
            ((t = s(a.prevEl)),
            i.params.uniqueNavElements &&
              "string" == typeof a.prevEl &&
              t.length > 1 &&
              1 === i.$el.find(a.prevEl).length &&
              (t = i.$el.find(a.prevEl))),
          e &&
            e.length > 0 &&
            e.on("click", function(e) {
              e.preventDefault(), (i.isEnd && !i.params.loop) || i.slideNext();
            }),
          t &&
            t.length > 0 &&
            t.on("click", function(e) {
              e.preventDefault(),
                (i.isBeginning && !i.params.loop) || i.slidePrev();
            }),
          d.extend(i.navigation, {
            $nextEl: e,
            nextEl: e && e[0],
            $prevEl: t,
            prevEl: t && t[0]
          }));
      },
      destroy: function() {
        var e = this.navigation,
          t = e.$nextEl,
          i = e.$prevEl;
        t &&
          t.length &&
          (t.off("click"), t.removeClass(this.params.navigation.disabledClass)),
          i &&
            i.length &&
            (i.off("click"),
            i.removeClass(this.params.navigation.disabledClass));
      }
    },
    Y = {
      update: function() {
        var e = this.rtl,
          t = this.params.pagination;
        if (
          t.el &&
          this.pagination.el &&
          this.pagination.$el &&
          0 !== this.pagination.$el.length
        ) {
          var i,
            a =
              this.virtual && this.params.virtual.enabled
                ? this.virtual.slides.length
                : this.slides.length,
            r = this.pagination.$el,
            n = this.params.loop
              ? Math.ceil(
                  (a - 2 * this.loopedSlides) / this.params.slidesPerGroup
                )
              : this.snapGrid.length;
          if (
            (this.params.loop
              ? ((i = Math.ceil(
                  (this.activeIndex - this.loopedSlides) /
                    this.params.slidesPerGroup
                )) >
                  a - 1 - 2 * this.loopedSlides &&
                  (i -= a - 2 * this.loopedSlides),
                i > n - 1 && (i -= n),
                i < 0 &&
                  "bullets" !== this.params.paginationType &&
                  (i = n + i))
              : (i =
                  void 0 !== this.snapIndex
                    ? this.snapIndex
                    : this.activeIndex || 0),
            "bullets" === t.type &&
              this.pagination.bullets &&
              this.pagination.bullets.length > 0)
          ) {
            var o,
              l,
              d,
              h = this.pagination.bullets;
            if (
              (t.dynamicBullets &&
                ((this.pagination.bulletSize = h
                  .eq(0)
                  [this.isHorizontal() ? "outerWidth" : "outerHeight"](!0)),
                r.css(
                  this.isHorizontal() ? "width" : "height",
                  this.pagination.bulletSize * (t.dynamicMainBullets + 4) + "px"
                ),
                t.dynamicMainBullets > 1 &&
                  void 0 !== this.previousIndex &&
                  ((this.pagination.dynamicBulletIndex +=
                    i - this.previousIndex),
                  this.pagination.dynamicBulletIndex > t.dynamicMainBullets - 1
                    ? (this.pagination.dynamicBulletIndex =
                        t.dynamicMainBullets - 1)
                    : this.pagination.dynamicBulletIndex < 0 &&
                      (this.pagination.dynamicBulletIndex = 0)),
                (o = i - this.pagination.dynamicBulletIndex),
                (d =
                  ((l = o + (Math.min(h.length, t.dynamicMainBullets) - 1)) +
                    o) /
                  2)),
              h.removeClass(
                t.bulletActiveClass +
                  " " +
                  t.bulletActiveClass +
                  "-next " +
                  t.bulletActiveClass +
                  "-next-next " +
                  t.bulletActiveClass +
                  "-prev " +
                  t.bulletActiveClass +
                  "-prev-prev " +
                  t.bulletActiveClass +
                  "-main"
              ),
              r.length > 1)
            )
              h.each(function(e, a) {
                var r = s(a),
                  n = r.index();
                n === i && r.addClass(t.bulletActiveClass),
                  t.dynamicBullets &&
                    (n >= o &&
                      n <= l &&
                      r.addClass(t.bulletActiveClass + "-main"),
                    n === o &&
                      r
                        .prev()
                        .addClass(t.bulletActiveClass + "-prev")
                        .prev()
                        .addClass(t.bulletActiveClass + "-prev-prev"),
                    n === l &&
                      r
                        .next()
                        .addClass(t.bulletActiveClass + "-next")
                        .next()
                        .addClass(t.bulletActiveClass + "-next-next"));
              });
            else if (
              (h.eq(i).addClass(t.bulletActiveClass), t.dynamicBullets)
            ) {
              for (var p = h.eq(o), c = h.eq(l), u = o; u <= l; u += 1)
                h.eq(u).addClass(t.bulletActiveClass + "-main");
              p
                .prev()
                .addClass(t.bulletActiveClass + "-prev")
                .prev()
                .addClass(t.bulletActiveClass + "-prev-prev"),
                c
                  .next()
                  .addClass(t.bulletActiveClass + "-next")
                  .next()
                  .addClass(t.bulletActiveClass + "-next-next");
            }
            if (t.dynamicBullets) {
              var v = Math.min(h.length, t.dynamicMainBullets + 4),
                f =
                  (this.pagination.bulletSize * v -
                    this.pagination.bulletSize) /
                    2 -
                  d * this.pagination.bulletSize,
                m = e ? "right" : "left";
              h.css(this.isHorizontal() ? m : "top", f + "px");
            }
          }
          if (
            ("fraction" === t.type &&
              (r.find("." + t.currentClass).text(i + 1),
              r.find("." + t.totalClass).text(n)),
            "progressbar" === t.type)
          ) {
            var g = (i + 1) / n,
              b = g,
              w = 1;
            this.isHorizontal() || ((w = g), (b = 1)),
              r
                .find("." + t.progressbarFillClass)
                .transform(
                  "translate3d(0,0,0) scaleX(" + b + ") scaleY(" + w + ")"
                )
                .transition(this.params.speed);
          }
          "custom" === t.type && t.renderCustom
            ? (r.html(t.renderCustom(this, i + 1, n)),
              this.emit("paginationRender", this, r[0]))
            : this.emit("paginationUpdate", this, r[0]),
            r[
              this.params.watchOverflow && this.isLocked
                ? "addClass"
                : "removeClass"
            ](t.lockClass);
        }
      },
      render: function() {
        var e = this.params.pagination;
        if (
          e.el &&
          this.pagination.el &&
          this.pagination.$el &&
          0 !== this.pagination.$el.length
        ) {
          var t =
              this.virtual && this.params.virtual.enabled
                ? this.virtual.slides.length
                : this.slides.length,
            i = this.pagination.$el,
            s = "";
          if ("bullets" === e.type) {
            for (
              var a = this.params.loop
                  ? Math.ceil(
                      (t - 2 * this.loopedSlides) / this.params.slidesPerGroup
                    )
                  : this.snapGrid.length,
                r = 0;
              r < a;
              r += 1
            )
              e.renderBullet
                ? (s += e.renderBullet.call(this, r, e.bulletClass))
                : (s +=
                    "<" +
                    e.bulletElement +
                    ' class="' +
                    e.bulletClass +
                    '"></' +
                    e.bulletElement +
                    ">");
            i.html(s), (this.pagination.bullets = i.find("." + e.bulletClass));
          }
          "fraction" === e.type &&
            ((s = e.renderFraction
              ? e.renderFraction.call(this, e.currentClass, e.totalClass)
              : '<span class="' +
                e.currentClass +
                '"></span> / <span class="' +
                e.totalClass +
                '"></span>'),
            i.html(s)),
            "progressbar" === e.type &&
              ((s = e.renderProgressbar
                ? e.renderProgressbar.call(this, e.progressbarFillClass)
                : '<span class="' + e.progressbarFillClass + '"></span>'),
              i.html(s)),
            "custom" !== e.type &&
              this.emit("paginationRender", this.pagination.$el[0]);
        }
      },
      init: function() {
        var e = this,
          t = e.params.pagination;
        if (t.el) {
          var i = s(t.el);
          0 !== i.length &&
            (e.params.uniqueNavElements &&
              "string" == typeof t.el &&
              i.length > 1 &&
              1 === e.$el.find(t.el).length &&
              (i = e.$el.find(t.el)),
            "bullets" === t.type && t.clickable && i.addClass(t.clickableClass),
            i.addClass(t.modifierClass + t.type),
            "bullets" === t.type &&
              t.dynamicBullets &&
              (i.addClass("" + t.modifierClass + t.type + "-dynamic"),
              (e.pagination.dynamicBulletIndex = 0),
              t.dynamicMainBullets < 1 && (t.dynamicMainBullets = 1)),
            t.clickable &&
              i.on("click", "." + t.bulletClass, function(t) {
                t.preventDefault();
                var i = s(this).index() * e.params.slidesPerGroup;
                e.params.loop && (i += e.loopedSlides), e.slideTo(i);
              }),
            d.extend(e.pagination, { $el: i, el: i[0] }));
        }
      },
      destroy: function() {
        var e = this.params.pagination;
        if (
          e.el &&
          this.pagination.el &&
          this.pagination.$el &&
          0 !== this.pagination.$el.length
        ) {
          var t = this.pagination.$el;
          t.removeClass(e.hiddenClass),
            t.removeClass(e.modifierClass + e.type),
            this.pagination.bullets &&
              this.pagination.bullets.removeClass(e.bulletActiveClass),
            e.clickable && t.off("click", "." + e.bulletClass);
        }
      }
    },
    V = {
      setTranslate: function() {
        if (this.params.scrollbar.el && this.scrollbar.el) {
          var e = this.scrollbar,
            t = this.rtlTranslate,
            i = this.progress,
            s = e.dragSize,
            a = e.trackSize,
            r = e.$dragEl,
            n = e.$el,
            o = this.params.scrollbar,
            l = s,
            d = (a - s) * i;
          t
            ? (d = -d) > 0
              ? ((l = s - d), (d = 0))
              : -d + s > a && (l = a + d)
            : d < 0
            ? ((l = s + d), (d = 0))
            : d + s > a && (l = a - d),
            this.isHorizontal()
              ? (h.transforms3d
                  ? r.transform("translate3d(" + d + "px, 0, 0)")
                  : r.transform("translateX(" + d + "px)"),
                (r[0].style.width = l + "px"))
              : (h.transforms3d
                  ? r.transform("translate3d(0px, " + d + "px, 0)")
                  : r.transform("translateY(" + d + "px)"),
                (r[0].style.height = l + "px")),
            o.hide &&
              (clearTimeout(this.scrollbar.timeout),
              (n[0].style.opacity = 1),
              (this.scrollbar.timeout = setTimeout(function() {
                (n[0].style.opacity = 0), n.transition(400);
              }, 1e3)));
        }
      },
      setTransition: function(e) {
        this.params.scrollbar.el &&
          this.scrollbar.el &&
          this.scrollbar.$dragEl.transition(e);
      },
      updateSize: function() {
        if (this.params.scrollbar.el && this.scrollbar.el) {
          var e = this.scrollbar,
            t = e.$dragEl,
            i = e.$el;
          (t[0].style.width = ""), (t[0].style.height = "");
          var s,
            a = this.isHorizontal() ? i[0].offsetWidth : i[0].offsetHeight,
            r = this.size / this.virtualSize,
            n = r * (a / this.size);
          (s =
            "auto" === this.params.scrollbar.dragSize
              ? a * r
              : parseInt(this.params.scrollbar.dragSize, 10)),
            this.isHorizontal()
              ? (t[0].style.width = s + "px")
              : (t[0].style.height = s + "px"),
            (i[0].style.display = r >= 1 ? "none" : ""),
            this.params.scrollbarHide && (i[0].style.opacity = 0),
            d.extend(e, {
              trackSize: a,
              divider: r,
              moveDivider: n,
              dragSize: s
            }),
            e.$el[
              this.params.watchOverflow && this.isLocked
                ? "addClass"
                : "removeClass"
            ](this.params.scrollbar.lockClass);
        }
      },
      setDragPosition: function(e) {
        var t,
          i = this.scrollbar,
          s = this.rtlTranslate,
          a = i.$el,
          r = i.dragSize,
          n = i.trackSize;
        (t =
          ((this.isHorizontal()
            ? "touchstart" === e.type || "touchmove" === e.type
              ? e.targetTouches[0].pageX
              : e.pageX || e.clientX
            : "touchstart" === e.type || "touchmove" === e.type
            ? e.targetTouches[0].pageY
            : e.pageY || e.clientY) -
            a.offset()[this.isHorizontal() ? "left" : "top"] -
            r / 2) /
          (n - r)),
          (t = Math.max(Math.min(t, 1), 0)),
          s && (t = 1 - t);
        var o =
          this.minTranslate() + (this.maxTranslate() - this.minTranslate()) * t;
        this.updateProgress(o),
          this.setTranslate(o),
          this.updateActiveIndex(),
          this.updateSlidesClasses();
      },
      onDragStart: function(e) {
        var t = this.params.scrollbar,
          i = this.scrollbar,
          s = this.$wrapperEl,
          a = i.$el,
          r = i.$dragEl;
        (this.scrollbar.isTouched = !0),
          e.preventDefault(),
          e.stopPropagation(),
          s.transition(100),
          r.transition(100),
          i.setDragPosition(e),
          clearTimeout(this.scrollbar.dragTimeout),
          a.transition(0),
          t.hide && a.css("opacity", 1),
          this.emit("scrollbarDragStart", e);
      },
      onDragMove: function(e) {
        var t = this.scrollbar,
          i = this.$wrapperEl,
          s = t.$el,
          a = t.$dragEl;
        this.scrollbar.isTouched &&
          (e.preventDefault ? e.preventDefault() : (e.returnValue = !1),
          t.setDragPosition(e),
          i.transition(0),
          s.transition(0),
          a.transition(0),
          this.emit("scrollbarDragMove", e));
      },
      onDragEnd: function(e) {
        var t = this.params.scrollbar,
          i = this.scrollbar.$el;
        this.scrollbar.isTouched &&
          ((this.scrollbar.isTouched = !1),
          t.hide &&
            (clearTimeout(this.scrollbar.dragTimeout),
            (this.scrollbar.dragTimeout = d.nextTick(function() {
              i.css("opacity", 0), i.transition(400);
            }, 1e3))),
          this.emit("scrollbarDragEnd", e),
          t.snapOnRelease && this.slideToClosest());
      },
      enableDraggable: function() {
        if (this.params.scrollbar.el) {
          var t = this.scrollbar,
            i = this.touchEvents,
            s = this.touchEventsDesktop,
            a = this.params,
            r = t.$el[0],
            n = !(!h.passiveListener || !a.passiveListener) && {
              passive: !1,
              capture: !1
            },
            o = !(!h.passiveListener || !a.passiveListener) && {
              passive: !0,
              capture: !1
            };
          h.touch || (!h.pointerEvents && !h.prefixedPointerEvents)
            ? (h.touch &&
                (r.addEventListener(i.start, this.scrollbar.onDragStart, n),
                r.addEventListener(i.move, this.scrollbar.onDragMove, n),
                r.addEventListener(i.end, this.scrollbar.onDragEnd, o)),
              ((a.simulateTouch && !y.ios && !y.android) ||
                (a.simulateTouch && !h.touch && y.ios)) &&
                (r.addEventListener("mousedown", this.scrollbar.onDragStart, n),
                e.addEventListener("mousemove", this.scrollbar.onDragMove, n),
                e.addEventListener("mouseup", this.scrollbar.onDragEnd, o)))
            : (r.addEventListener(s.start, this.scrollbar.onDragStart, n),
              e.addEventListener(s.move, this.scrollbar.onDragMove, n),
              e.addEventListener(s.end, this.scrollbar.onDragEnd, o));
        }
      },
      disableDraggable: function() {
        if (this.params.scrollbar.el) {
          var t = this.scrollbar,
            i = this.touchEvents,
            s = this.touchEventsDesktop,
            a = this.params,
            r = t.$el[0],
            n = !(!h.passiveListener || !a.passiveListener) && {
              passive: !1,
              capture: !1
            },
            o = !(!h.passiveListener || !a.passiveListener) && {
              passive: !0,
              capture: !1
            };
          h.touch || (!h.pointerEvents && !h.prefixedPointerEvents)
            ? (h.touch &&
                (r.removeEventListener(i.start, this.scrollbar.onDragStart, n),
                r.removeEventListener(i.move, this.scrollbar.onDragMove, n),
                r.removeEventListener(i.end, this.scrollbar.onDragEnd, o)),
              ((a.simulateTouch && !y.ios && !y.android) ||
                (a.simulateTouch && !h.touch && y.ios)) &&
                (r.removeEventListener(
                  "mousedown",
                  this.scrollbar.onDragStart,
                  n
                ),
                e.removeEventListener(
                  "mousemove",
                  this.scrollbar.onDragMove,
                  n
                ),
                e.removeEventListener("mouseup", this.scrollbar.onDragEnd, o)))
            : (r.removeEventListener(s.start, this.scrollbar.onDragStart, n),
              e.removeEventListener(s.move, this.scrollbar.onDragMove, n),
              e.removeEventListener(s.end, this.scrollbar.onDragEnd, o));
        }
      },
      init: function() {
        if (this.params.scrollbar.el) {
          var e = this.scrollbar,
            t = this.$el,
            i = this.params.scrollbar,
            a = s(i.el);
          this.params.uniqueNavElements &&
            "string" == typeof i.el &&
            a.length > 1 &&
            1 === t.find(i.el).length &&
            (a = t.find(i.el));
          var r = a.find("." + this.params.scrollbar.dragClass);
          0 === r.length &&
            ((r = s(
              '<div class="' + this.params.scrollbar.dragClass + '"></div>'
            )),
            a.append(r)),
            d.extend(e, { $el: a, el: a[0], $dragEl: r, dragEl: r[0] }),
            i.draggable && e.enableDraggable();
        }
      },
      destroy: function() {
        this.scrollbar.disableDraggable();
      }
    },
    R = {
      setTransform: function(e, t) {
        var i = this.rtl,
          a = s(e),
          r = i ? -1 : 1,
          n = a.attr("data-swiper-parallax") || "0",
          o = a.attr("data-swiper-parallax-x"),
          l = a.attr("data-swiper-parallax-y"),
          d = a.attr("data-swiper-parallax-scale"),
          h = a.attr("data-swiper-parallax-opacity");
        if (
          (o || l
            ? ((o = o || "0"), (l = l || "0"))
            : this.isHorizontal()
            ? ((o = n), (l = "0"))
            : ((l = n), (o = "0")),
          (o =
            o.indexOf("%") >= 0
              ? parseInt(o, 10) * t * r + "%"
              : o * t * r + "px"),
          (l = l.indexOf("%") >= 0 ? parseInt(l, 10) * t + "%" : l * t + "px"),
          void 0 !== h && null !== h)
        ) {
          var p = h - (h - 1) * (1 - Math.abs(t));
          a[0].style.opacity = p;
        }
        if (void 0 === d || null === d)
          a.transform("translate3d(" + o + ", " + l + ", 0px)");
        else {
          var c = d - (d - 1) * (1 - Math.abs(t));
          a.transform(
            "translate3d(" + o + ", " + l + ", 0px) scale(" + c + ")"
          );
        }
      },
      setTranslate: function() {
        var e = this,
          t = e.$el,
          i = e.slides,
          a = e.progress,
          r = e.snapGrid;
        t
          .children(
            "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]"
          )
          .each(function(t, i) {
            e.parallax.setTransform(i, a);
          }),
          i.each(function(t, i) {
            var n = i.progress;
            e.params.slidesPerGroup > 1 &&
              "auto" !== e.params.slidesPerView &&
              (n += Math.ceil(t / 2) - a * (r.length - 1)),
              (n = Math.min(Math.max(n, -1), 1)),
              s(i)
                .find(
                  "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]"
                )
                .each(function(t, i) {
                  e.parallax.setTransform(i, n);
                });
          });
      },
      setTransition: function(e) {
        void 0 === e && (e = this.params.speed);
        this.$el
          .find(
            "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]"
          )
          .each(function(t, i) {
            var a = s(i),
              r = parseInt(a.attr("data-swiper-parallax-duration"), 10) || e;
            0 === e && (r = 0), a.transition(r);
          });
      }
    },
    F = {
      getDistanceBetweenTouches: function(e) {
        if (e.targetTouches.length < 2) return 1;
        var t = e.targetTouches[0].pageX,
          i = e.targetTouches[0].pageY,
          s = e.targetTouches[1].pageX,
          a = e.targetTouches[1].pageY;
        return Math.sqrt(Math.pow(s - t, 2) + Math.pow(a - i, 2));
      },
      onGestureStart: function(e) {
        var t = this.params.zoom,
          i = this.zoom,
          a = i.gesture;
        if (
          ((i.fakeGestureTouched = !1), (i.fakeGestureMoved = !1), !h.gestures)
        ) {
          if (
            "touchstart" !== e.type ||
            ("touchstart" === e.type && e.targetTouches.length < 2)
          )
            return;
          (i.fakeGestureTouched = !0),
            (a.scaleStart = F.getDistanceBetweenTouches(e));
        }
        (a.$slideEl && a.$slideEl.length) ||
        ((a.$slideEl = s(e.target).closest(".swiper-slide")),
        0 === a.$slideEl.length &&
          (a.$slideEl = this.slides.eq(this.activeIndex)),
        (a.$imageEl = a.$slideEl.find("img, svg, canvas")),
        (a.$imageWrapEl = a.$imageEl.parent("." + t.containerClass)),
        (a.maxRatio = a.$imageWrapEl.attr("data-swiper-zoom") || t.maxRatio),
        0 !== a.$imageWrapEl.length)
          ? (a.$imageEl.transition(0), (this.zoom.isScaling = !0))
          : (a.$imageEl = void 0);
      },
      onGestureChange: function(e) {
        var t = this.params.zoom,
          i = this.zoom,
          s = i.gesture;
        if (!h.gestures) {
          if (
            "touchmove" !== e.type ||
            ("touchmove" === e.type && e.targetTouches.length < 2)
          )
            return;
          (i.fakeGestureMoved = !0),
            (s.scaleMove = F.getDistanceBetweenTouches(e));
        }
        s.$imageEl &&
          0 !== s.$imageEl.length &&
          (h.gestures
            ? (this.zoom.scale = e.scale * i.currentScale)
            : (i.scale = (s.scaleMove / s.scaleStart) * i.currentScale),
          i.scale > s.maxRatio &&
            (i.scale =
              s.maxRatio - 1 + Math.pow(i.scale - s.maxRatio + 1, 0.5)),
          i.scale < t.minRatio &&
            (i.scale =
              t.minRatio + 1 - Math.pow(t.minRatio - i.scale + 1, 0.5)),
          s.$imageEl.transform("translate3d(0,0,0) scale(" + i.scale + ")"));
      },
      onGestureEnd: function(e) {
        var t = this.params.zoom,
          i = this.zoom,
          s = i.gesture;
        if (!h.gestures) {
          if (!i.fakeGestureTouched || !i.fakeGestureMoved) return;
          if (
            "touchend" !== e.type ||
            ("touchend" === e.type && e.changedTouches.length < 2 && !y.android)
          )
            return;
          (i.fakeGestureTouched = !1), (i.fakeGestureMoved = !1);
        }
        s.$imageEl &&
          0 !== s.$imageEl.length &&
          ((i.scale = Math.max(Math.min(i.scale, s.maxRatio), t.minRatio)),
          s.$imageEl
            .transition(this.params.speed)
            .transform("translate3d(0,0,0) scale(" + i.scale + ")"),
          (i.currentScale = i.scale),
          (i.isScaling = !1),
          1 === i.scale && (s.$slideEl = void 0));
      },
      onTouchStart: function(e) {
        var t = this.zoom,
          i = t.gesture,
          s = t.image;
        i.$imageEl &&
          0 !== i.$imageEl.length &&
          (s.isTouched ||
            (y.android && e.preventDefault(),
            (s.isTouched = !0),
            (s.touchesStart.x =
              "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX),
            (s.touchesStart.y =
              "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY)));
      },
      onTouchMove: function(e) {
        var t = this.zoom,
          i = t.gesture,
          s = t.image,
          a = t.velocity;
        if (
          i.$imageEl &&
          0 !== i.$imageEl.length &&
          ((this.allowClick = !1), s.isTouched && i.$slideEl)
        ) {
          s.isMoved ||
            ((s.width = i.$imageEl[0].offsetWidth),
            (s.height = i.$imageEl[0].offsetHeight),
            (s.startX = d.getTranslate(i.$imageWrapEl[0], "x") || 0),
            (s.startY = d.getTranslate(i.$imageWrapEl[0], "y") || 0),
            (i.slideWidth = i.$slideEl[0].offsetWidth),
            (i.slideHeight = i.$slideEl[0].offsetHeight),
            i.$imageWrapEl.transition(0),
            this.rtl && ((s.startX = -s.startX), (s.startY = -s.startY)));
          var r = s.width * t.scale,
            n = s.height * t.scale;
          if (!(r < i.slideWidth && n < i.slideHeight)) {
            if (
              ((s.minX = Math.min(i.slideWidth / 2 - r / 2, 0)),
              (s.maxX = -s.minX),
              (s.minY = Math.min(i.slideHeight / 2 - n / 2, 0)),
              (s.maxY = -s.minY),
              (s.touchesCurrent.x =
                "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX),
              (s.touchesCurrent.y =
                "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY),
              !s.isMoved && !t.isScaling)
            ) {
              if (
                this.isHorizontal() &&
                ((Math.floor(s.minX) === Math.floor(s.startX) &&
                  s.touchesCurrent.x < s.touchesStart.x) ||
                  (Math.floor(s.maxX) === Math.floor(s.startX) &&
                    s.touchesCurrent.x > s.touchesStart.x))
              )
                return void (s.isTouched = !1);
              if (
                !this.isHorizontal() &&
                ((Math.floor(s.minY) === Math.floor(s.startY) &&
                  s.touchesCurrent.y < s.touchesStart.y) ||
                  (Math.floor(s.maxY) === Math.floor(s.startY) &&
                    s.touchesCurrent.y > s.touchesStart.y))
              )
                return void (s.isTouched = !1);
            }
            e.preventDefault(),
              e.stopPropagation(),
              (s.isMoved = !0),
              (s.currentX = s.touchesCurrent.x - s.touchesStart.x + s.startX),
              (s.currentY = s.touchesCurrent.y - s.touchesStart.y + s.startY),
              s.currentX < s.minX &&
                (s.currentX =
                  s.minX + 1 - Math.pow(s.minX - s.currentX + 1, 0.8)),
              s.currentX > s.maxX &&
                (s.currentX =
                  s.maxX - 1 + Math.pow(s.currentX - s.maxX + 1, 0.8)),
              s.currentY < s.minY &&
                (s.currentY =
                  s.minY + 1 - Math.pow(s.minY - s.currentY + 1, 0.8)),
              s.currentY > s.maxY &&
                (s.currentY =
                  s.maxY - 1 + Math.pow(s.currentY - s.maxY + 1, 0.8)),
              a.prevPositionX || (a.prevPositionX = s.touchesCurrent.x),
              a.prevPositionY || (a.prevPositionY = s.touchesCurrent.y),
              a.prevTime || (a.prevTime = Date.now()),
              (a.x =
                (s.touchesCurrent.x - a.prevPositionX) /
                (Date.now() - a.prevTime) /
                2),
              (a.y =
                (s.touchesCurrent.y - a.prevPositionY) /
                (Date.now() - a.prevTime) /
                2),
              Math.abs(s.touchesCurrent.x - a.prevPositionX) < 2 && (a.x = 0),
              Math.abs(s.touchesCurrent.y - a.prevPositionY) < 2 && (a.y = 0),
              (a.prevPositionX = s.touchesCurrent.x),
              (a.prevPositionY = s.touchesCurrent.y),
              (a.prevTime = Date.now()),
              i.$imageWrapEl.transform(
                "translate3d(" + s.currentX + "px, " + s.currentY + "px,0)"
              );
          }
        }
      },
      onTouchEnd: function() {
        var e = this.zoom,
          t = e.gesture,
          i = e.image,
          s = e.velocity;
        if (t.$imageEl && 0 !== t.$imageEl.length) {
          if (!i.isTouched || !i.isMoved)
            return (i.isTouched = !1), void (i.isMoved = !1);
          (i.isTouched = !1), (i.isMoved = !1);
          var a = 300,
            r = 300,
            n = s.x * a,
            o = i.currentX + n,
            l = s.y * r,
            d = i.currentY + l;
          0 !== s.x && (a = Math.abs((o - i.currentX) / s.x)),
            0 !== s.y && (r = Math.abs((d - i.currentY) / s.y));
          var h = Math.max(a, r);
          (i.currentX = o), (i.currentY = d);
          var p = i.width * e.scale,
            c = i.height * e.scale;
          (i.minX = Math.min(t.slideWidth / 2 - p / 2, 0)),
            (i.maxX = -i.minX),
            (i.minY = Math.min(t.slideHeight / 2 - c / 2, 0)),
            (i.maxY = -i.minY),
            (i.currentX = Math.max(Math.min(i.currentX, i.maxX), i.minX)),
            (i.currentY = Math.max(Math.min(i.currentY, i.maxY), i.minY)),
            t.$imageWrapEl
              .transition(h)
              .transform(
                "translate3d(" + i.currentX + "px, " + i.currentY + "px,0)"
              );
        }
      },
      onTransitionEnd: function() {
        var e = this.zoom,
          t = e.gesture;
        t.$slideEl &&
          this.previousIndex !== this.activeIndex &&
          (t.$imageEl.transform("translate3d(0,0,0) scale(1)"),
          t.$imageWrapEl.transform("translate3d(0,0,0)"),
          (t.$slideEl = void 0),
          (t.$imageEl = void 0),
          (t.$imageWrapEl = void 0),
          (e.scale = 1),
          (e.currentScale = 1));
      },
      toggle: function(e) {
        var t = this.zoom;
        t.scale && 1 !== t.scale ? t.out() : t.in(e);
      },
      in: function(e) {
        var t,
          i,
          a,
          r,
          n,
          o,
          l,
          d,
          h,
          p,
          c,
          u,
          v,
          f,
          m,
          g,
          b = this.zoom,
          w = this.params.zoom,
          y = b.gesture,
          x = b.image;
        (y.$slideEl ||
          ((y.$slideEl = this.clickedSlide
            ? s(this.clickedSlide)
            : this.slides.eq(this.activeIndex)),
          (y.$imageEl = y.$slideEl.find("img, svg, canvas")),
          (y.$imageWrapEl = y.$imageEl.parent("." + w.containerClass))),
        y.$imageEl && 0 !== y.$imageEl.length) &&
          (y.$slideEl.addClass("" + w.zoomedSlideClass),
          void 0 === x.touchesStart.x && e
            ? ((t =
                "touchend" === e.type ? e.changedTouches[0].pageX : e.pageX),
              (i = "touchend" === e.type ? e.changedTouches[0].pageY : e.pageY))
            : ((t = x.touchesStart.x), (i = x.touchesStart.y)),
          (b.scale = y.$imageWrapEl.attr("data-swiper-zoom") || w.maxRatio),
          (b.currentScale =
            y.$imageWrapEl.attr("data-swiper-zoom") || w.maxRatio),
          e
            ? ((m = y.$slideEl[0].offsetWidth),
              (g = y.$slideEl[0].offsetHeight),
              (a = y.$slideEl.offset().left + m / 2 - t),
              (r = y.$slideEl.offset().top + g / 2 - i),
              (l = y.$imageEl[0].offsetWidth),
              (d = y.$imageEl[0].offsetHeight),
              (h = l * b.scale),
              (p = d * b.scale),
              (v = -(c = Math.min(m / 2 - h / 2, 0))),
              (f = -(u = Math.min(g / 2 - p / 2, 0))),
              (n = a * b.scale),
              (o = r * b.scale),
              n < c && (n = c),
              n > v && (n = v),
              o < u && (o = u),
              o > f && (o = f))
            : ((n = 0), (o = 0)),
          y.$imageWrapEl
            .transition(300)
            .transform("translate3d(" + n + "px, " + o + "px,0)"),
          y.$imageEl
            .transition(300)
            .transform("translate3d(0,0,0) scale(" + b.scale + ")"));
      },
      out: function() {
        var e = this.zoom,
          t = this.params.zoom,
          i = e.gesture;
        i.$slideEl ||
          ((i.$slideEl = this.clickedSlide
            ? s(this.clickedSlide)
            : this.slides.eq(this.activeIndex)),
          (i.$imageEl = i.$slideEl.find("img, svg, canvas")),
          (i.$imageWrapEl = i.$imageEl.parent("." + t.containerClass))),
          i.$imageEl &&
            0 !== i.$imageEl.length &&
            ((e.scale = 1),
            (e.currentScale = 1),
            i.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"),
            i.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"),
            i.$slideEl.removeClass("" + t.zoomedSlideClass),
            (i.$slideEl = void 0));
      },
      enable: function() {
        var e = this.zoom;
        if (!e.enabled) {
          e.enabled = !0;
          var t = !(
            "touchstart" !== this.touchEvents.start ||
            !h.passiveListener ||
            !this.params.passiveListeners
          ) && { passive: !0, capture: !1 };
          h.gestures
            ? (this.$wrapperEl.on(
                "gesturestart",
                ".swiper-slide",
                e.onGestureStart,
                t
              ),
              this.$wrapperEl.on(
                "gesturechange",
                ".swiper-slide",
                e.onGestureChange,
                t
              ),
              this.$wrapperEl.on(
                "gestureend",
                ".swiper-slide",
                e.onGestureEnd,
                t
              ))
            : "touchstart" === this.touchEvents.start &&
              (this.$wrapperEl.on(
                this.touchEvents.start,
                ".swiper-slide",
                e.onGestureStart,
                t
              ),
              this.$wrapperEl.on(
                this.touchEvents.move,
                ".swiper-slide",
                e.onGestureChange,
                t
              ),
              this.$wrapperEl.on(
                this.touchEvents.end,
                ".swiper-slide",
                e.onGestureEnd,
                t
              )),
            this.$wrapperEl.on(
              this.touchEvents.move,
              "." + this.params.zoom.containerClass,
              e.onTouchMove
            );
        }
      },
      disable: function() {
        var e = this.zoom;
        if (e.enabled) {
          this.zoom.enabled = !1;
          var t = !(
            "touchstart" !== this.touchEvents.start ||
            !h.passiveListener ||
            !this.params.passiveListeners
          ) && { passive: !0, capture: !1 };
          h.gestures
            ? (this.$wrapperEl.off(
                "gesturestart",
                ".swiper-slide",
                e.onGestureStart,
                t
              ),
              this.$wrapperEl.off(
                "gesturechange",
                ".swiper-slide",
                e.onGestureChange,
                t
              ),
              this.$wrapperEl.off(
                "gestureend",
                ".swiper-slide",
                e.onGestureEnd,
                t
              ))
            : "touchstart" === this.touchEvents.start &&
              (this.$wrapperEl.off(
                this.touchEvents.start,
                ".swiper-slide",
                e.onGestureStart,
                t
              ),
              this.$wrapperEl.off(
                this.touchEvents.move,
                ".swiper-slide",
                e.onGestureChange,
                t
              ),
              this.$wrapperEl.off(
                this.touchEvents.end,
                ".swiper-slide",
                e.onGestureEnd,
                t
              )),
            this.$wrapperEl.off(
              this.touchEvents.move,
              "." + this.params.zoom.containerClass,
              e.onTouchMove
            );
        }
      }
    },
    W = {
      loadInSlide: function(e, t) {
        void 0 === t && (t = !0);
        var i = this,
          a = i.params.lazy;
        if (void 0 !== e && 0 !== i.slides.length) {
          var r =
              i.virtual && i.params.virtual.enabled
                ? i.$wrapperEl.children(
                    "." +
                      i.params.slideClass +
                      '[data-swiper-slide-index="' +
                      e +
                      '"]'
                  )
                : i.slides.eq(e),
            n = r.find(
              "." +
                a.elementClass +
                ":not(." +
                a.loadedClass +
                "):not(." +
                a.loadingClass +
                ")"
            );
          !r.hasClass(a.elementClass) ||
            r.hasClass(a.loadedClass) ||
            r.hasClass(a.loadingClass) ||
            (n = n.add(r[0])),
            0 !== n.length &&
              n.each(function(e, n) {
                var o = s(n);
                o.addClass(a.loadingClass);
                var l = o.attr("data-background"),
                  d = o.attr("data-src"),
                  h = o.attr("data-srcset"),
                  p = o.attr("data-sizes");
                i.loadImage(o[0], d || l, h, p, !1, function() {
                  if (
                    void 0 !== i &&
                    null !== i &&
                    i &&
                    (!i || i.params) &&
                    !i.destroyed
                  ) {
                    if (
                      (l
                        ? (o.css("background-image", 'url("' + l + '")'),
                          o.removeAttr("data-background"))
                        : (h &&
                            (o.attr("srcset", h), o.removeAttr("data-srcset")),
                          p && (o.attr("sizes", p), o.removeAttr("data-sizes")),
                          d && (o.attr("src", d), o.removeAttr("data-src"))),
                      o.addClass(a.loadedClass).removeClass(a.loadingClass),
                      r.find("." + a.preloaderClass).remove(),
                      i.params.loop && t)
                    ) {
                      var e = r.attr("data-swiper-slide-index");
                      if (r.hasClass(i.params.slideDuplicateClass)) {
                        var s = i.$wrapperEl.children(
                          '[data-swiper-slide-index="' +
                            e +
                            '"]:not(.' +
                            i.params.slideDuplicateClass +
                            ")"
                        );
                        i.lazy.loadInSlide(s.index(), !1);
                      } else {
                        var n = i.$wrapperEl.children(
                          "." +
                            i.params.slideDuplicateClass +
                            '[data-swiper-slide-index="' +
                            e +
                            '"]'
                        );
                        i.lazy.loadInSlide(n.index(), !1);
                      }
                    }
                    i.emit("lazyImageReady", r[0], o[0]);
                  }
                }),
                  i.emit("lazyImageLoad", r[0], o[0]);
              });
        }
      },
      load: function() {
        var e = this,
          t = e.$wrapperEl,
          i = e.params,
          a = e.slides,
          r = e.activeIndex,
          n = e.virtual && i.virtual.enabled,
          o = i.lazy,
          l = i.slidesPerView;
        function d(e) {
          if (n) {
            if (
              t.children(
                "." + i.slideClass + '[data-swiper-slide-index="' + e + '"]'
              ).length
            )
              return !0;
          } else if (a[e]) return !0;
          return !1;
        }
        function h(e) {
          return n ? s(e).attr("data-swiper-slide-index") : s(e).index();
        }
        if (
          ("auto" === l && (l = 0),
          e.lazy.initialImageLoaded || (e.lazy.initialImageLoaded = !0),
          e.params.watchSlidesVisibility)
        )
          t.children("." + i.slideVisibleClass).each(function(t, i) {
            var a = n ? s(i).attr("data-swiper-slide-index") : s(i).index();
            e.lazy.loadInSlide(a);
          });
        else if (l > 1)
          for (var p = r; p < r + l; p += 1) d(p) && e.lazy.loadInSlide(p);
        else e.lazy.loadInSlide(r);
        if (o.loadPrevNext)
          if (l > 1 || (o.loadPrevNextAmount && o.loadPrevNextAmount > 1)) {
            for (
              var c = o.loadPrevNextAmount,
                u = l,
                v = Math.min(r + u + Math.max(c, u), a.length),
                f = Math.max(r - Math.max(u, c), 0),
                m = r + l;
              m < v;
              m += 1
            )
              d(m) && e.lazy.loadInSlide(m);
            for (var g = f; g < r; g += 1) d(g) && e.lazy.loadInSlide(g);
          } else {
            var b = t.children("." + i.slideNextClass);
            b.length > 0 && e.lazy.loadInSlide(h(b));
            var w = t.children("." + i.slidePrevClass);
            w.length > 0 && e.lazy.loadInSlide(h(w));
          }
      }
    },
    q = {
      LinearSpline: function(e, t) {
        var i,
          s,
          a,
          r,
          n,
          o = function(e, t) {
            for (s = -1, i = e.length; i - s > 1; )
              e[(a = (i + s) >> 1)] <= t ? (s = a) : (i = a);
            return i;
          };
        return (
          (this.x = e),
          (this.y = t),
          (this.lastIndex = e.length - 1),
          (this.interpolate = function(e) {
            return e
              ? ((n = o(this.x, e)),
                (r = n - 1),
                ((e - this.x[r]) * (this.y[n] - this.y[r])) /
                  (this.x[n] - this.x[r]) +
                  this.y[r])
              : 0;
          }),
          this
        );
      },
      getInterpolateFunction: function(e) {
        this.controller.spline ||
          (this.controller.spline = this.params.loop
            ? new q.LinearSpline(this.slidesGrid, e.slidesGrid)
            : new q.LinearSpline(this.snapGrid, e.snapGrid));
      },
      setTranslate: function(e, t) {
        var i,
          s,
          a = this,
          r = a.controller.control;
        function n(e) {
          var t = a.rtlTranslate ? -a.translate : a.translate;
          "slide" === a.params.controller.by &&
            (a.controller.getInterpolateFunction(e),
            (s = -a.controller.spline.interpolate(-t))),
            (s && "container" !== a.params.controller.by) ||
              ((i =
                (e.maxTranslate() - e.minTranslate()) /
                (a.maxTranslate() - a.minTranslate())),
              (s = (t - a.minTranslate()) * i + e.minTranslate())),
            a.params.controller.inverse && (s = e.maxTranslate() - s),
            e.updateProgress(s),
            e.setTranslate(s, a),
            e.updateActiveIndex(),
            e.updateSlidesClasses();
        }
        if (Array.isArray(r))
          for (var o = 0; o < r.length; o += 1)
            r[o] !== t && r[o] instanceof P && n(r[o]);
        else r instanceof P && t !== r && n(r);
      },
      setTransition: function(e, t) {
        var i,
          s = this,
          a = s.controller.control;
        function r(t) {
          t.setTransition(e, s),
            0 !== e &&
              (t.transitionStart(),
              t.$wrapperEl.transitionEnd(function() {
                a &&
                  (t.params.loop &&
                    "slide" === s.params.controller.by &&
                    t.loopFix(),
                  t.transitionEnd());
              }));
        }
        if (Array.isArray(a))
          for (i = 0; i < a.length; i += 1)
            a[i] !== t && a[i] instanceof P && r(a[i]);
        else a instanceof P && t !== a && r(a);
      }
    },
    j = {
      makeElFocusable: function(e) {
        return e.attr("tabIndex", "0"), e;
      },
      addElRole: function(e, t) {
        return e.attr("role", t), e;
      },
      addElLabel: function(e, t) {
        return e.attr("aria-label", t), e;
      },
      disableEl: function(e) {
        return e.attr("aria-disabled", !0), e;
      },
      enableEl: function(e) {
        return e.attr("aria-disabled", !1), e;
      },
      onEnterKey: function(e) {
        var t = this.params.a11y;
        if (13 === e.keyCode) {
          var i = s(e.target);
          this.navigation &&
            this.navigation.$nextEl &&
            i.is(this.navigation.$nextEl) &&
            ((this.isEnd && !this.params.loop) || this.slideNext(),
            this.isEnd
              ? this.a11y.notify(t.lastSlideMessage)
              : this.a11y.notify(t.nextSlideMessage)),
            this.navigation &&
              this.navigation.$prevEl &&
              i.is(this.navigation.$prevEl) &&
              ((this.isBeginning && !this.params.loop) || this.slidePrev(),
              this.isBeginning
                ? this.a11y.notify(t.firstSlideMessage)
                : this.a11y.notify(t.prevSlideMessage)),
            this.pagination &&
              i.is("." + this.params.pagination.bulletClass) &&
              i[0].click();
        }
      },
      notify: function(e) {
        var t = this.a11y.liveRegion;
        0 !== t.length && (t.html(""), t.html(e));
      },
      updateNavigation: function() {
        if (!this.params.loop) {
          var e = this.navigation,
            t = e.$nextEl,
            i = e.$prevEl;
          i &&
            i.length > 0 &&
            (this.isBeginning ? this.a11y.disableEl(i) : this.a11y.enableEl(i)),
            t &&
              t.length > 0 &&
              (this.isEnd ? this.a11y.disableEl(t) : this.a11y.enableEl(t));
        }
      },
      updatePagination: function() {
        var e = this,
          t = e.params.a11y;
        e.pagination &&
          e.params.pagination.clickable &&
          e.pagination.bullets &&
          e.pagination.bullets.length &&
          e.pagination.bullets.each(function(i, a) {
            var r = s(a);
            e.a11y.makeElFocusable(r),
              e.a11y.addElRole(r, "button"),
              e.a11y.addElLabel(
                r,
                t.paginationBulletMessage.replace(/{{index}}/, r.index() + 1)
              );
          });
      },
      init: function() {
        this.$el.append(this.a11y.liveRegion);
        var e,
          t,
          i = this.params.a11y;
        this.navigation &&
          this.navigation.$nextEl &&
          (e = this.navigation.$nextEl),
          this.navigation &&
            this.navigation.$prevEl &&
            (t = this.navigation.$prevEl),
          e &&
            (this.a11y.makeElFocusable(e),
            this.a11y.addElRole(e, "button"),
            this.a11y.addElLabel(e, i.nextSlideMessage),
            e.on("keydown", this.a11y.onEnterKey)),
          t &&
            (this.a11y.makeElFocusable(t),
            this.a11y.addElRole(t, "button"),
            this.a11y.addElLabel(t, i.prevSlideMessage),
            t.on("keydown", this.a11y.onEnterKey)),
          this.pagination &&
            this.params.pagination.clickable &&
            this.pagination.bullets &&
            this.pagination.bullets.length &&
            this.pagination.$el.on(
              "keydown",
              "." + this.params.pagination.bulletClass,
              this.a11y.onEnterKey
            );
      },
      destroy: function() {
        var e, t;
        this.a11y.liveRegion &&
          this.a11y.liveRegion.length > 0 &&
          this.a11y.liveRegion.remove(),
          this.navigation &&
            this.navigation.$nextEl &&
            (e = this.navigation.$nextEl),
          this.navigation &&
            this.navigation.$prevEl &&
            (t = this.navigation.$prevEl),
          e && e.off("keydown", this.a11y.onEnterKey),
          t && t.off("keydown", this.a11y.onEnterKey),
          this.pagination &&
            this.params.pagination.clickable &&
            this.pagination.bullets &&
            this.pagination.bullets.length &&
            this.pagination.$el.off(
              "keydown",
              "." + this.params.pagination.bulletClass,
              this.a11y.onEnterKey
            );
      }
    },
    K = {
      init: function() {
        if (this.params.history) {
          if (!t.history || !t.history.pushState)
            return (
              (this.params.history.enabled = !1),
              void (this.params.hashNavigation.enabled = !0)
            );
          var e = this.history;
          (e.initialized = !0),
            (e.paths = K.getPathValues()),
            (e.paths.key || e.paths.value) &&
              (e.scrollToSlide(
                0,
                e.paths.value,
                this.params.runCallbacksOnInit
              ),
              this.params.history.replaceState ||
                t.addEventListener(
                  "popstate",
                  this.history.setHistoryPopState
                ));
        }
      },
      destroy: function() {
        this.params.history.replaceState ||
          t.removeEventListener("popstate", this.history.setHistoryPopState);
      },
      setHistoryPopState: function() {
        (this.history.paths = K.getPathValues()),
          this.history.scrollToSlide(
            this.params.speed,
            this.history.paths.value,
            !1
          );
      },
      getPathValues: function() {
        var e = t.location.pathname
            .slice(1)
            .split("/")
            .filter(function(e) {
              return "" !== e;
            }),
          i = e.length;
        return { key: e[i - 2], value: e[i - 1] };
      },
      setHistory: function(e, i) {
        if (this.history.initialized && this.params.history.enabled) {
          var s = this.slides.eq(i),
            a = K.slugify(s.attr("data-history"));
          t.location.pathname.includes(e) || (a = e + "/" + a);
          var r = t.history.state;
          (r && r.value === a) ||
            (this.params.history.replaceState
              ? t.history.replaceState({ value: a }, null, a)
              : t.history.pushState({ value: a }, null, a));
        }
      },
      slugify: function(e) {
        return e
          .toString()
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]+/g, "")
          .replace(/--+/g, "-")
          .replace(/^-+/, "")
          .replace(/-+$/, "");
      },
      scrollToSlide: function(e, t, i) {
        if (t)
          for (var s = 0, a = this.slides.length; s < a; s += 1) {
            var r = this.slides.eq(s);
            if (
              K.slugify(r.attr("data-history")) === t &&
              !r.hasClass(this.params.slideDuplicateClass)
            ) {
              var n = r.index();
              this.slideTo(n, e, i);
            }
          }
        else this.slideTo(0, e, i);
      }
    },
    U = {
      onHashCange: function() {
        var t = e.location.hash.replace("#", "");
        t !== this.slides.eq(this.activeIndex).attr("data-hash") &&
          this.slideTo(
            this.$wrapperEl
              .children(
                "." + this.params.slideClass + '[data-hash="' + t + '"]'
              )
              .index()
          );
      },
      setHash: function() {
        if (
          this.hashNavigation.initialized &&
          this.params.hashNavigation.enabled
        )
          if (
            this.params.hashNavigation.replaceState &&
            t.history &&
            t.history.replaceState
          )
            t.history.replaceState(
              null,
              null,
              "#" + this.slides.eq(this.activeIndex).attr("data-hash") || ""
            );
          else {
            var i = this.slides.eq(this.activeIndex),
              s = i.attr("data-hash") || i.attr("data-history");
            e.location.hash = s || "";
          }
      },
      init: function() {
        if (
          !(
            !this.params.hashNavigation.enabled ||
            (this.params.history && this.params.history.enabled)
          )
        ) {
          this.hashNavigation.initialized = !0;
          var i = e.location.hash.replace("#", "");
          if (i)
            for (var a = 0, r = this.slides.length; a < r; a += 1) {
              var n = this.slides.eq(a);
              if (
                (n.attr("data-hash") || n.attr("data-history")) === i &&
                !n.hasClass(this.params.slideDuplicateClass)
              ) {
                var o = n.index();
                this.slideTo(o, 0, this.params.runCallbacksOnInit, !0);
              }
            }
          this.params.hashNavigation.watchState &&
            s(t).on("hashchange", this.hashNavigation.onHashCange);
        }
      },
      destroy: function() {
        this.params.hashNavigation.watchState &&
          s(t).off("hashchange", this.hashNavigation.onHashCange);
      }
    },
    _ = {
      run: function() {
        var e = this,
          t = e.slides.eq(e.activeIndex),
          i = e.params.autoplay.delay;
        t.attr("data-swiper-autoplay") &&
          (i = t.attr("data-swiper-autoplay") || e.params.autoplay.delay),
          (e.autoplay.timeout = d.nextTick(function() {
            e.params.autoplay.reverseDirection
              ? e.params.loop
                ? (e.loopFix(),
                  e.slidePrev(e.params.speed, !0, !0),
                  e.emit("autoplay"))
                : e.isBeginning
                ? e.params.autoplay.stopOnLastSlide
                  ? e.autoplay.stop()
                  : (e.slideTo(e.slides.length - 1, e.params.speed, !0, !0),
                    e.emit("autoplay"))
                : (e.slidePrev(e.params.speed, !0, !0), e.emit("autoplay"))
              : e.params.loop
              ? (e.loopFix(),
                e.slideNext(e.params.speed, !0, !0),
                e.emit("autoplay"))
              : e.isEnd
              ? e.params.autoplay.stopOnLastSlide
                ? e.autoplay.stop()
                : (e.slideTo(0, e.params.speed, !0, !0), e.emit("autoplay"))
              : (e.slideNext(e.params.speed, !0, !0), e.emit("autoplay"));
          }, i));
      },
      start: function() {
        return (
          void 0 === this.autoplay.timeout &&
          !this.autoplay.running &&
            ((this.autoplay.running = !0),
            this.emit("autoplayStart"),
            this.autoplay.run(),
            !0)
        );
      },
      stop: function() {
        return (
          !!this.autoplay.running &&
          void 0 !== this.autoplay.timeout &&
            (this.autoplay.timeout &&
              (clearTimeout(this.autoplay.timeout),
              (this.autoplay.timeout = void 0)),
            (this.autoplay.running = !1),
            this.emit("autoplayStop"),
            !0)
        );
      },
      pause: function(e) {
        var t = this;
        t.autoplay.running &&
          (t.autoplay.paused ||
            (t.autoplay.timeout && clearTimeout(t.autoplay.timeout),
            (t.autoplay.paused = !0),
            0 !== e && t.params.autoplay.waitForTransition
              ? t.$wrapperEl.transitionEnd(function() {
                  t &&
                    !t.destroyed &&
                    ((t.autoplay.paused = !1),
                    t.autoplay.running ? t.autoplay.run() : t.autoplay.stop());
                })
              : ((t.autoplay.paused = !1), t.autoplay.run())));
      }
    },
    Z = {
      setTranslate: function() {
        for (var e = this.slides, t = 0; t < e.length; t += 1) {
          var i = this.slides.eq(t),
            s = -i[0].swiperSlideOffset;
          this.params.virtualTranslate || (s -= this.translate);
          var a = 0;
          this.isHorizontal() || ((a = s), (s = 0));
          var r = this.params.fadeEffect.crossFade
            ? Math.max(1 - Math.abs(i[0].progress), 0)
            : 1 + Math.min(Math.max(i[0].progress, -1), 0);
          i.css({ opacity: r }).transform(
            "translate3d(" + s + "px, " + a + "px, 0px)"
          );
        }
      },
      setTransition: function(e) {
        var t = this,
          i = t.slides,
          s = t.$wrapperEl;
        if ((i.transition(e), t.params.virtualTranslate && 0 !== e)) {
          var a = !1;
          i.transitionEnd(function() {
            if (!a && t && !t.destroyed) {
              (a = !0), (t.animating = !1);
              for (
                var e = ["webkitTransitionEnd", "transitionend"], i = 0;
                i < e.length;
                i += 1
              )
                s.trigger(e[i]);
            }
          });
        }
      }
    },
    Q = {
      setTranslate: function() {
        var e,
          t = this.$el,
          i = this.$wrapperEl,
          a = this.slides,
          r = this.width,
          n = this.height,
          o = this.rtlTranslate,
          l = this.size,
          d = this.params.cubeEffect,
          h = this.isHorizontal(),
          p = this.virtual && this.params.virtual.enabled,
          c = 0;
        d.shadow &&
          (h
            ? (0 === (e = i.find(".swiper-cube-shadow")).length &&
                ((e = s('<div class="swiper-cube-shadow"></div>')),
                i.append(e)),
              e.css({ height: r + "px" }))
            : 0 === (e = t.find(".swiper-cube-shadow")).length &&
              ((e = s('<div class="swiper-cube-shadow"></div>')), t.append(e)));
        for (var u = 0; u < a.length; u += 1) {
          var v = a.eq(u),
            f = u;
          p && (f = parseInt(v.attr("data-swiper-slide-index"), 10));
          var m = 90 * f,
            g = Math.floor(m / 360);
          o && ((m = -m), (g = Math.floor(-m / 360)));
          var b = Math.max(Math.min(v[0].progress, 1), -1),
            w = 0,
            y = 0,
            x = 0;
          f % 4 == 0
            ? ((w = 4 * -g * l), (x = 0))
            : (f - 1) % 4 == 0
            ? ((w = 0), (x = 4 * -g * l))
            : (f - 2) % 4 == 0
            ? ((w = l + 4 * g * l), (x = l))
            : (f - 3) % 4 == 0 && ((w = -l), (x = 3 * l + 4 * l * g)),
            o && (w = -w),
            h || ((y = w), (w = 0));
          var E =
            "rotateX(" +
            (h ? 0 : -m) +
            "deg) rotateY(" +
            (h ? m : 0) +
            "deg) translate3d(" +
            w +
            "px, " +
            y +
            "px, " +
            x +
            "px)";
          if (
            (b <= 1 &&
              b > -1 &&
              ((c = 90 * f + 90 * b), o && (c = 90 * -f - 90 * b)),
            v.transform(E),
            d.slideShadows)
          ) {
            var T = h
                ? v.find(".swiper-slide-shadow-left")
                : v.find(".swiper-slide-shadow-top"),
              C = h
                ? v.find(".swiper-slide-shadow-right")
                : v.find(".swiper-slide-shadow-bottom");
            0 === T.length &&
              ((T = s(
                '<div class="swiper-slide-shadow-' +
                  (h ? "left" : "top") +
                  '"></div>'
              )),
              v.append(T)),
              0 === C.length &&
                ((C = s(
                  '<div class="swiper-slide-shadow-' +
                    (h ? "right" : "bottom") +
                    '"></div>'
                )),
                v.append(C)),
              T.length && (T[0].style.opacity = Math.max(-b, 0)),
              C.length && (C[0].style.opacity = Math.max(b, 0));
          }
        }
        if (
          (i.css({
            "-webkit-transform-origin": "50% 50% -" + l / 2 + "px",
            "-moz-transform-origin": "50% 50% -" + l / 2 + "px",
            "-ms-transform-origin": "50% 50% -" + l / 2 + "px",
            "transform-origin": "50% 50% -" + l / 2 + "px"
          }),
          d.shadow)
        )
          if (h)
            e.transform(
              "translate3d(0px, " +
                (r / 2 + d.shadowOffset) +
                "px, " +
                -r / 2 +
                "px) rotateX(90deg) rotateZ(0deg) scale(" +
                d.shadowScale +
                ")"
            );
          else {
            var M = Math.abs(c) - 90 * Math.floor(Math.abs(c) / 90),
              z =
                1.5 -
                (Math.sin((2 * M * Math.PI) / 360) / 2 +
                  Math.cos((2 * M * Math.PI) / 360) / 2),
              P = d.shadowScale,
              k = d.shadowScale / z,
              $ = d.shadowOffset;
            e.transform(
              "scale3d(" +
                P +
                ", 1, " +
                k +
                ") translate3d(0px, " +
                (n / 2 + $) +
                "px, " +
                -n / 2 / k +
                "px) rotateX(-90deg)"
            );
          }
        var L = S.isSafari || S.isUiWebView ? -l / 2 : 0;
        i.transform(
          "translate3d(0px,0," +
            L +
            "px) rotateX(" +
            (this.isHorizontal() ? 0 : c) +
            "deg) rotateY(" +
            (this.isHorizontal() ? -c : 0) +
            "deg)"
        );
      },
      setTransition: function(e) {
        var t = this.$el;
        this.slides
          .transition(e)
          .find(
            ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
          )
          .transition(e),
          this.params.cubeEffect.shadow &&
            !this.isHorizontal() &&
            t.find(".swiper-cube-shadow").transition(e);
      }
    },
    J = {
      setTranslate: function() {
        for (
          var e = this.slides, t = this.rtlTranslate, i = 0;
          i < e.length;
          i += 1
        ) {
          var a = e.eq(i),
            r = a[0].progress;
          this.params.flipEffect.limitRotation &&
            (r = Math.max(Math.min(a[0].progress, 1), -1));
          var n = -180 * r,
            o = 0,
            l = -a[0].swiperSlideOffset,
            d = 0;
          if (
            (this.isHorizontal()
              ? t && (n = -n)
              : ((d = l), (l = 0), (o = -n), (n = 0)),
            (a[0].style.zIndex = -Math.abs(Math.round(r)) + e.length),
            this.params.flipEffect.slideShadows)
          ) {
            var h = this.isHorizontal()
                ? a.find(".swiper-slide-shadow-left")
                : a.find(".swiper-slide-shadow-top"),
              p = this.isHorizontal()
                ? a.find(".swiper-slide-shadow-right")
                : a.find(".swiper-slide-shadow-bottom");
            0 === h.length &&
              ((h = s(
                '<div class="swiper-slide-shadow-' +
                  (this.isHorizontal() ? "left" : "top") +
                  '"></div>'
              )),
              a.append(h)),
              0 === p.length &&
                ((p = s(
                  '<div class="swiper-slide-shadow-' +
                    (this.isHorizontal() ? "right" : "bottom") +
                    '"></div>'
                )),
                a.append(p)),
              h.length && (h[0].style.opacity = Math.max(-r, 0)),
              p.length && (p[0].style.opacity = Math.max(r, 0));
          }
          a.transform(
            "translate3d(" +
              l +
              "px, " +
              d +
              "px, 0px) rotateX(" +
              o +
              "deg) rotateY(" +
              n +
              "deg)"
          );
        }
      },
      setTransition: function(e) {
        var t = this,
          i = t.slides,
          s = t.activeIndex,
          a = t.$wrapperEl;
        if (
          (i
            .transition(e)
            .find(
              ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
            )
            .transition(e),
          t.params.virtualTranslate && 0 !== e)
        ) {
          var r = !1;
          i.eq(s).transitionEnd(function() {
            if (!r && t && !t.destroyed) {
              (r = !0), (t.animating = !1);
              for (
                var e = ["webkitTransitionEnd", "transitionend"], i = 0;
                i < e.length;
                i += 1
              )
                a.trigger(e[i]);
            }
          });
        }
      }
    },
    ee = {
      setTranslate: function() {
        for (
          var e = this.width,
            t = this.height,
            i = this.slides,
            a = this.$wrapperEl,
            r = this.slidesSizesGrid,
            n = this.params.coverflowEffect,
            o = this.isHorizontal(),
            l = this.translate,
            d = o ? e / 2 - l : t / 2 - l,
            p = o ? n.rotate : -n.rotate,
            c = n.depth,
            u = 0,
            v = i.length;
          u < v;
          u += 1
        ) {
          var f = i.eq(u),
            m = r[u],
            g = ((d - f[0].swiperSlideOffset - m / 2) / m) * n.modifier,
            b = o ? p * g : 0,
            w = o ? 0 : p * g,
            y = -c * Math.abs(g),
            x = o ? 0 : n.stretch * g,
            E = o ? n.stretch * g : 0;
          Math.abs(E) < 0.001 && (E = 0),
            Math.abs(x) < 0.001 && (x = 0),
            Math.abs(y) < 0.001 && (y = 0),
            Math.abs(b) < 0.001 && (b = 0),
            Math.abs(w) < 0.001 && (w = 0);
          var T =
            "translate3d(" +
            E +
            "px," +
            x +
            "px," +
            y +
            "px)  rotateX(" +
            w +
            "deg) rotateY(" +
            b +
            "deg)";
          if (
            (f.transform(T),
            (f[0].style.zIndex = 1 - Math.abs(Math.round(g))),
            n.slideShadows)
          ) {
            var S = o
                ? f.find(".swiper-slide-shadow-left")
                : f.find(".swiper-slide-shadow-top"),
              C = o
                ? f.find(".swiper-slide-shadow-right")
                : f.find(".swiper-slide-shadow-bottom");
            0 === S.length &&
              ((S = s(
                '<div class="swiper-slide-shadow-' +
                  (o ? "left" : "top") +
                  '"></div>'
              )),
              f.append(S)),
              0 === C.length &&
                ((C = s(
                  '<div class="swiper-slide-shadow-' +
                    (o ? "right" : "bottom") +
                    '"></div>'
                )),
                f.append(C)),
              S.length && (S[0].style.opacity = g > 0 ? g : 0),
              C.length && (C[0].style.opacity = -g > 0 ? -g : 0);
          }
        }
        (h.pointerEvents || h.prefixedPointerEvents) &&
          (a[0].style.perspectiveOrigin = d + "px 50%");
      },
      setTransition: function(e) {
        this.slides
          .transition(e)
          .find(
            ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
          )
          .transition(e);
      }
    },
    te = [
      k,
      $,
      L,
      I,
      O,
      H,
      B,
      {
        name: "mousewheel",
        params: {
          mousewheel: {
            enabled: !1,
            releaseOnEdges: !1,
            invert: !1,
            forceToAxis: !1,
            sensitivity: 1,
            eventsTarged: "container"
          }
        },
        create: function() {
          d.extend(this, {
            mousewheel: {
              enabled: !1,
              enable: G.enable.bind(this),
              disable: G.disable.bind(this),
              handle: G.handle.bind(this),
              handleMouseEnter: G.handleMouseEnter.bind(this),
              handleMouseLeave: G.handleMouseLeave.bind(this),
              lastScrollTime: d.now()
            }
          });
        },
        on: {
          init: function() {
            this.params.mousewheel.enabled && this.mousewheel.enable();
          },
          destroy: function() {
            this.mousewheel.enabled && this.mousewheel.disable();
          }
        }
      },
      {
        name: "navigation",
        params: {
          navigation: {
            nextEl: null,
            prevEl: null,
            hideOnClick: !1,
            disabledClass: "swiper-button-disabled",
            hiddenClass: "swiper-button-hidden",
            lockClass: "swiper-button-lock"
          }
        },
        create: function() {
          d.extend(this, {
            navigation: {
              init: X.init.bind(this),
              update: X.update.bind(this),
              destroy: X.destroy.bind(this)
            }
          });
        },
        on: {
          init: function() {
            this.navigation.init(), this.navigation.update();
          },
          toEdge: function() {
            this.navigation.update();
          },
          fromEdge: function() {
            this.navigation.update();
          },
          destroy: function() {
            this.navigation.destroy();
          },
          click: function(e) {
            var t = this.navigation,
              i = t.$nextEl,
              a = t.$prevEl;
            !this.params.navigation.hideOnClick ||
              s(e.target).is(a) ||
              s(e.target).is(i) ||
              (i && i.toggleClass(this.params.navigation.hiddenClass),
              a && a.toggleClass(this.params.navigation.hiddenClass));
          }
        }
      },
      {
        name: "pagination",
        params: {
          pagination: {
            el: null,
            bulletElement: "span",
            clickable: !1,
            hideOnClick: !1,
            renderBullet: null,
            renderProgressbar: null,
            renderFraction: null,
            renderCustom: null,
            type: "bullets",
            dynamicBullets: !1,
            dynamicMainBullets: 1,
            bulletClass: "swiper-pagination-bullet",
            bulletActiveClass: "swiper-pagination-bullet-active",
            modifierClass: "swiper-pagination-",
            currentClass: "swiper-pagination-current",
            totalClass: "swiper-pagination-total",
            hiddenClass: "swiper-pagination-hidden",
            progressbarFillClass: "swiper-pagination-progressbar-fill",
            clickableClass: "swiper-pagination-clickable",
            lockClass: "swiper-pagination-lock"
          }
        },
        create: function() {
          d.extend(this, {
            pagination: {
              init: Y.init.bind(this),
              render: Y.render.bind(this),
              update: Y.update.bind(this),
              destroy: Y.destroy.bind(this),
              dynamicBulletIndex: 0
            }
          });
        },
        on: {
          init: function() {
            this.pagination.init(),
              this.pagination.render(),
              this.pagination.update();
          },
          activeIndexChange: function() {
            this.params.loop
              ? this.pagination.update()
              : void 0 === this.snapIndex && this.pagination.update();
          },
          snapIndexChange: function() {
            this.params.loop || this.pagination.update();
          },
          slidesLengthChange: function() {
            this.params.loop &&
              (this.pagination.render(), this.pagination.update());
          },
          snapGridLengthChange: function() {
            this.params.loop ||
              (this.pagination.render(), this.pagination.update());
          },
          destroy: function() {
            this.pagination.destroy();
          },
          click: function(e) {
            this.params.pagination.el &&
              this.params.pagination.hideOnClick &&
              this.pagination.$el.length > 0 &&
              !s(e.target).hasClass(this.params.pagination.bulletClass) &&
              this.pagination.$el.toggleClass(
                this.params.pagination.hiddenClass
              );
          }
        }
      },
      {
        name: "scrollbar",
        params: {
          scrollbar: {
            el: null,
            dragSize: "auto",
            hide: !1,
            draggable: !1,
            snapOnRelease: !0,
            lockClass: "swiper-scrollbar-lock",
            dragClass: "swiper-scrollbar-drag"
          }
        },
        create: function() {
          d.extend(this, {
            scrollbar: {
              init: V.init.bind(this),
              destroy: V.destroy.bind(this),
              updateSize: V.updateSize.bind(this),
              setTranslate: V.setTranslate.bind(this),
              setTransition: V.setTransition.bind(this),
              enableDraggable: V.enableDraggable.bind(this),
              disableDraggable: V.disableDraggable.bind(this),
              setDragPosition: V.setDragPosition.bind(this),
              onDragStart: V.onDragStart.bind(this),
              onDragMove: V.onDragMove.bind(this),
              onDragEnd: V.onDragEnd.bind(this),
              isTouched: !1,
              timeout: null,
              dragTimeout: null
            }
          });
        },
        on: {
          init: function() {
            this.scrollbar.init(),
              this.scrollbar.updateSize(),
              this.scrollbar.setTranslate();
          },
          update: function() {
            this.scrollbar.updateSize();
          },
          resize: function() {
            this.scrollbar.updateSize();
          },
          observerUpdate: function() {
            this.scrollbar.updateSize();
          },
          setTranslate: function() {
            this.scrollbar.setTranslate();
          },
          setTransition: function(e) {
            this.scrollbar.setTransition(e);
          },
          destroy: function() {
            this.scrollbar.destroy();
          }
        }
      },
      {
        name: "parallax",
        params: { parallax: { enabled: !1 } },
        create: function() {
          d.extend(this, {
            parallax: {
              setTransform: R.setTransform.bind(this),
              setTranslate: R.setTranslate.bind(this),
              setTransition: R.setTransition.bind(this)
            }
          });
        },
        on: {
          beforeInit: function() {
            this.params.parallax.enabled &&
              (this.params.watchSlidesProgress = !0);
          },
          init: function() {
            this.params.parallax && this.parallax.setTranslate();
          },
          setTranslate: function() {
            this.params.parallax && this.parallax.setTranslate();
          },
          setTransition: function(e) {
            this.params.parallax && this.parallax.setTransition(e);
          }
        }
      },
      {
        name: "zoom",
        params: {
          zoom: {
            enabled: !1,
            maxRatio: 3,
            minRatio: 1,
            toggle: !0,
            containerClass: "swiper-zoom-container",
            zoomedSlideClass: "swiper-slide-zoomed"
          }
        },
        create: function() {
          var e = this,
            t = {
              enabled: !1,
              scale: 1,
              currentScale: 1,
              isScaling: !1,
              gesture: {
                $slideEl: void 0,
                slideWidth: void 0,
                slideHeight: void 0,
                $imageEl: void 0,
                $imageWrapEl: void 0,
                maxRatio: 3
              },
              image: {
                isTouched: void 0,
                isMoved: void 0,
                currentX: void 0,
                currentY: void 0,
                minX: void 0,
                minY: void 0,
                maxX: void 0,
                maxY: void 0,
                width: void 0,
                height: void 0,
                startX: void 0,
                startY: void 0,
                touchesStart: {},
                touchesCurrent: {}
              },
              velocity: {
                x: void 0,
                y: void 0,
                prevPositionX: void 0,
                prevPositionY: void 0,
                prevTime: void 0
              }
            };
          "onGestureStart onGestureChange onGestureEnd onTouchStart onTouchMove onTouchEnd onTransitionEnd toggle enable disable in out"
            .split(" ")
            .forEach(function(i) {
              t[i] = F[i].bind(e);
            }),
            d.extend(e, { zoom: t });
        },
        on: {
          init: function() {
            this.params.zoom.enabled && this.zoom.enable();
          },
          destroy: function() {
            this.zoom.disable();
          },
          touchStart: function(e) {
            this.zoom.enabled && this.zoom.onTouchStart(e);
          },
          touchEnd: function(e) {
            this.zoom.enabled && this.zoom.onTouchEnd(e);
          },
          doubleTap: function(e) {
            this.params.zoom.enabled &&
              this.zoom.enabled &&
              this.params.zoom.toggle &&
              this.zoom.toggle(e);
          },
          transitionEnd: function() {
            this.zoom.enabled &&
              this.params.zoom.enabled &&
              this.zoom.onTransitionEnd();
          }
        }
      },
      {
        name: "lazy",
        params: {
          lazy: {
            enabled: !1,
            loadPrevNext: !1,
            loadPrevNextAmount: 1,
            loadOnTransitionStart: !1,
            elementClass: "swiper-lazy",
            loadingClass: "swiper-lazy-loading",
            loadedClass: "swiper-lazy-loaded",
            preloaderClass: "swiper-lazy-preloader"
          }
        },
        create: function() {
          d.extend(this, {
            lazy: {
              initialImageLoaded: !1,
              load: W.load.bind(this),
              loadInSlide: W.loadInSlide.bind(this)
            }
          });
        },
        on: {
          beforeInit: function() {
            this.params.lazy.enabled &&
              this.params.preloadImages &&
              (this.params.preloadImages = !1);
          },
          init: function() {
            this.params.lazy.enabled &&
              !this.params.loop &&
              0 === this.params.initialSlide &&
              this.lazy.load();
          },
          scroll: function() {
            this.params.freeMode &&
              !this.params.freeModeSticky &&
              this.lazy.load();
          },
          resize: function() {
            this.params.lazy.enabled && this.lazy.load();
          },
          scrollbarDragMove: function() {
            this.params.lazy.enabled && this.lazy.load();
          },
          transitionStart: function() {
            this.params.lazy.enabled &&
              (this.params.lazy.loadOnTransitionStart ||
                (!this.params.lazy.loadOnTransitionStart &&
                  !this.lazy.initialImageLoaded)) &&
              this.lazy.load();
          },
          transitionEnd: function() {
            this.params.lazy.enabled &&
              !this.params.lazy.loadOnTransitionStart &&
              this.lazy.load();
          }
        }
      },
      {
        name: "controller",
        params: { controller: { control: void 0, inverse: !1, by: "slide" } },
        create: function() {
          d.extend(this, {
            controller: {
              control: this.params.controller.control,
              getInterpolateFunction: q.getInterpolateFunction.bind(this),
              setTranslate: q.setTranslate.bind(this),
              setTransition: q.setTransition.bind(this)
            }
          });
        },
        on: {
          update: function() {
            this.controller.control &&
              this.controller.spline &&
              ((this.controller.spline = void 0),
              delete this.controller.spline);
          },
          resize: function() {
            this.controller.control &&
              this.controller.spline &&
              ((this.controller.spline = void 0),
              delete this.controller.spline);
          },
          observerUpdate: function() {
            this.controller.control &&
              this.controller.spline &&
              ((this.controller.spline = void 0),
              delete this.controller.spline);
          },
          setTranslate: function(e, t) {
            this.controller.control && this.controller.setTranslate(e, t);
          },
          setTransition: function(e, t) {
            this.controller.control && this.controller.setTransition(e, t);
          }
        }
      },
      {
        name: "a11y",
        params: {
          a11y: {
            enabled: !0,
            notificationClass: "swiper-notification",
            prevSlideMessage: "Previous slide",
            nextSlideMessage: "Next slide",
            firstSlideMessage: "This is the first slide",
            lastSlideMessage: "This is the last slide",
            paginationBulletMessage: "Go to slide {{index}}"
          }
        },
        create: function() {
          var e = this;
          d.extend(e, {
            a11y: {
              liveRegion: s(
                '<span class="' +
                  e.params.a11y.notificationClass +
                  '" aria-live="assertive" aria-atomic="true"></span>'
              )
            }
          }),
            Object.keys(j).forEach(function(t) {
              e.a11y[t] = j[t].bind(e);
            });
        },
        on: {
          init: function() {
            this.params.a11y.enabled &&
              (this.a11y.init(), this.a11y.updateNavigation());
          },
          toEdge: function() {
            this.params.a11y.enabled && this.a11y.updateNavigation();
          },
          fromEdge: function() {
            this.params.a11y.enabled && this.a11y.updateNavigation();
          },
          paginationUpdate: function() {
            this.params.a11y.enabled && this.a11y.updatePagination();
          },
          destroy: function() {
            this.params.a11y.enabled && this.a11y.destroy();
          }
        }
      },
      {
        name: "history",
        params: { history: { enabled: !1, replaceState: !1, key: "slides" } },
        create: function() {
          d.extend(this, {
            history: {
              init: K.init.bind(this),
              setHistory: K.setHistory.bind(this),
              setHistoryPopState: K.setHistoryPopState.bind(this),
              scrollToSlide: K.scrollToSlide.bind(this),
              destroy: K.destroy.bind(this)
            }
          });
        },
        on: {
          init: function() {
            this.params.history.enabled && this.history.init();
          },
          destroy: function() {
            this.params.history.enabled && this.history.destroy();
          },
          transitionEnd: function() {
            this.history.initialized &&
              this.history.setHistory(
                this.params.history.key,
                this.activeIndex
              );
          }
        }
      },
      {
        name: "hash-navigation",
        params: {
          hashNavigation: { enabled: !1, replaceState: !1, watchState: !1 }
        },
        create: function() {
          d.extend(this, {
            hashNavigation: {
              initialized: !1,
              init: U.init.bind(this),
              destroy: U.destroy.bind(this),
              setHash: U.setHash.bind(this),
              onHashCange: U.onHashCange.bind(this)
            }
          });
        },
        on: {
          init: function() {
            this.params.hashNavigation.enabled && this.hashNavigation.init();
          },
          destroy: function() {
            this.params.hashNavigation.enabled && this.hashNavigation.destroy();
          },
          transitionEnd: function() {
            this.hashNavigation.initialized && this.hashNavigation.setHash();
          }
        }
      },
      {
        name: "autoplay",
        params: {
          autoplay: {
            enabled: !1,
            delay: 3e3,
            waitForTransition: !0,
            disableOnInteraction: !0,
            stopOnLastSlide: !1,
            reverseDirection: !1
          }
        },
        create: function() {
          d.extend(this, {
            autoplay: {
              running: !1,
              paused: !1,
              run: _.run.bind(this),
              start: _.start.bind(this),
              stop: _.stop.bind(this),
              pause: _.pause.bind(this)
            }
          });
        },
        on: {
          init: function() {
            this.params.autoplay.enabled && this.autoplay.start();
          },
          beforeTransitionStart: function(e, t) {
            this.autoplay.running &&
              (t || !this.params.autoplay.disableOnInteraction
                ? this.autoplay.pause(e)
                : this.autoplay.stop());
          },
          sliderFirstMove: function() {
            this.autoplay.running &&
              (this.params.autoplay.disableOnInteraction
                ? this.autoplay.stop()
                : this.autoplay.pause());
          },
          destroy: function() {
            this.autoplay.running && this.autoplay.stop();
          }
        }
      },
      {
        name: "effect-fade",
        params: { fadeEffect: { crossFade: !1 } },
        create: function() {
          d.extend(this, {
            fadeEffect: {
              setTranslate: Z.setTranslate.bind(this),
              setTransition: Z.setTransition.bind(this)
            }
          });
        },
        on: {
          beforeInit: function() {
            if ("fade" === this.params.effect) {
              this.classNames.push(this.params.containerModifierClass + "fade");
              var e = {
                slidesPerView: 1,
                slidesPerColumn: 1,
                slidesPerGroup: 1,
                watchSlidesProgress: !0,
                spaceBetween: 0,
                virtualTranslate: !0
              };
              d.extend(this.params, e), d.extend(this.originalParams, e);
            }
          },
          setTranslate: function() {
            "fade" === this.params.effect && this.fadeEffect.setTranslate();
          },
          setTransition: function(e) {
            "fade" === this.params.effect && this.fadeEffect.setTransition(e);
          }
        }
      },
      {
        name: "effect-cube",
        params: {
          cubeEffect: {
            slideShadows: !0,
            shadow: !0,
            shadowOffset: 20,
            shadowScale: 0.94
          }
        },
        create: function() {
          d.extend(this, {
            cubeEffect: {
              setTranslate: Q.setTranslate.bind(this),
              setTransition: Q.setTransition.bind(this)
            }
          });
        },
        on: {
          beforeInit: function() {
            if ("cube" === this.params.effect) {
              this.classNames.push(this.params.containerModifierClass + "cube"),
                this.classNames.push(this.params.containerModifierClass + "3d");
              var e = {
                slidesPerView: 1,
                slidesPerColumn: 1,
                slidesPerGroup: 1,
                watchSlidesProgress: !0,
                resistanceRatio: 0,
                spaceBetween: 0,
                centeredSlides: !1,
                virtualTranslate: !0
              };
              d.extend(this.params, e), d.extend(this.originalParams, e);
            }
          },
          setTranslate: function() {
            "cube" === this.params.effect && this.cubeEffect.setTranslate();
          },
          setTransition: function(e) {
            "cube" === this.params.effect && this.cubeEffect.setTransition(e);
          }
        }
      },
      {
        name: "effect-flip",
        params: { flipEffect: { slideShadows: !0, limitRotation: !0 } },
        create: function() {
          d.extend(this, {
            flipEffect: {
              setTranslate: J.setTranslate.bind(this),
              setTransition: J.setTransition.bind(this)
            }
          });
        },
        on: {
          beforeInit: function() {
            if ("flip" === this.params.effect) {
              this.classNames.push(this.params.containerModifierClass + "flip"),
                this.classNames.push(this.params.containerModifierClass + "3d");
              var e = {
                slidesPerView: 1,
                slidesPerColumn: 1,
                slidesPerGroup: 1,
                watchSlidesProgress: !0,
                spaceBetween: 0,
                virtualTranslate: !0
              };
              d.extend(this.params, e), d.extend(this.originalParams, e);
            }
          },
          setTranslate: function() {
            "flip" === this.params.effect && this.flipEffect.setTranslate();
          },
          setTransition: function(e) {
            "flip" === this.params.effect && this.flipEffect.setTransition(e);
          }
        }
      },
      {
        name: "effect-coverflow",
        params: {
          coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: !0
          }
        },
        create: function() {
          d.extend(this, {
            coverflowEffect: {
              setTranslate: ee.setTranslate.bind(this),
              setTransition: ee.setTransition.bind(this)
            }
          });
        },
        on: {
          beforeInit: function() {
            "coverflow" === this.params.effect &&
              (this.classNames.push(
                this.params.containerModifierClass + "coverflow"
              ),
              this.classNames.push(this.params.containerModifierClass + "3d"),
              (this.params.watchSlidesProgress = !0),
              (this.originalParams.watchSlidesProgress = !0));
          },
          setTranslate: function() {
            "coverflow" === this.params.effect &&
              this.coverflowEffect.setTranslate();
          },
          setTransition: function(e) {
            "coverflow" === this.params.effect &&
              this.coverflowEffect.setTransition(e);
          }
        }
      }
    ];
  return (
    void 0 === P.use &&
      ((P.use = P.Class.use), (P.installModule = P.Class.installModule)),
    P.use(te),
    P
  );
});


/*! skrollr 0.6.30 (2015-08-12) | Alexander Prinzhorn - https://github.com/Prinzhorn/skrollr | Free to use under terms of MIT license */
!(function(a, b, c) {
  "use strict";
  function d(c) {
    if (
      ((e = b.documentElement),
      (f = b.body),
      T(),
      (ha = this),
      (c = c || {}),
      (ma = c.constants || {}),
      c.easing)
    )
      for (var d in c.easing) W[d] = c.easing[d];
    (ta = c.edgeStrategy || "set"),
      (ka = {
        beforerender: c.beforerender,
        render: c.render,
        keyframe: c.keyframe
      }),
      (la = c.forceHeight !== !1),
      la && (Ka = c.scale || 1),
      (na = c.mobileDeceleration || y),
      (pa = c.smoothScrolling !== !1),
      (qa = c.smoothScrollingDuration || A),
      (ra = { targetTop: ha.getScrollTop() }),
      (Sa = (
        c.mobileCheck ||
        function() {
          return /Android|iPhone|iPad|iPod|BlackBerry/i.test(
            navigator.userAgent || navigator.vendor || a.opera
          );
        }
      )()),
      Sa
        ? ((ja = b.getElementById(c.skrollrBody || z)),
          ja && ga(),
          X(),
          Ea(e, [s, v], [t]))
        : Ea(e, [s, u], [t]),
      ha.refresh(),
      wa(a, "resize orientationchange", function() {
        var a = e.clientWidth,
          b = e.clientHeight;
        (b !== Pa || a !== Oa) && ((Pa = b), (Oa = a), (Qa = !0));
      });
    var g = U();
    return (
      (function h() {
        $(), (va = g(h));
      })(),
      ha
    );
  }
  var e,
    f,
    g = {
      get: function() {
        return ha;
      },
      init: function(a) {
        return ha || new d(a);
      },
      VERSION: "0.6.30"
    },
    h = Object.prototype.hasOwnProperty,
    i = a.Math,
    j = a.getComputedStyle,
    k = "touchstart",
    l = "touchmove",
    m = "touchcancel",
    n = "touchend",
    o = "skrollable",
    p = o + "-before",
    q = o + "-between",
    r = o + "-after",
    s = "skrollr",
    t = "no-" + s,
    u = s + "-desktop",
    v = s + "-mobile",
    w = "linear",
    x = 1e3,
    y = 0.004,
    z = "skrollr-body",
    A = 200,
    B = "start",
    C = "end",
    D = "center",
    E = "bottom",
    F = "___skrollable_id",
    G = /^(?:input|textarea|button|select)$/i,
    H = /^\s+|\s+$/g,
    I = /^data(?:-(_\w+))?(?:-?(-?\d*\.?\d+p?))?(?:-?(start|end|top|center|bottom))?(?:-?(top|center|bottom))?$/,
    J = /\s*(@?[\w\-\[\]]+)\s*:\s*(.+?)\s*(?:;|$)/gi,
    K = /^(@?[a-z\-]+)\[(\w+)\]$/,
    L = /-([a-z0-9_])/g,
    M = function(a, b) {
      return b.toUpperCase();
    },
    N = /[\-+]?[\d]*\.?[\d]+/g,
    O = /\{\?\}/g,
    P = /rgba?\(\s*-?\d+\s*,\s*-?\d+\s*,\s*-?\d+/g,
    Q = /[a-z\-]+-gradient/g,
    R = "",
    S = "",
    T = function() {
      var a = /^(?:O|Moz|webkit|ms)|(?:-(?:o|moz|webkit|ms)-)/;
      if (j) {
        var b = j(f, null);
        for (var c in b)
          if ((R = c.match(a) || (+c == c && b[c].match(a)))) break;
        if (!R) return void (R = S = "");
        (R = R[0]),
          "-" === R.slice(0, 1)
            ? ((S = R),
              (R = {
                "-webkit-": "webkit",
                "-moz-": "Moz",
                "-ms-": "ms",
                "-o-": "O"
              }[R]))
            : (S = "-" + R.toLowerCase() + "-");
      }
    },
    U = function() {
      var b =
          a.requestAnimationFrame ||
          a[R.toLowerCase() + "RequestAnimationFrame"],
        c = Ha();
      return (
        (Sa || !b) &&
          (b = function(b) {
            var d = Ha() - c,
              e = i.max(0, 1e3 / 60 - d);
            return a.setTimeout(function() {
              (c = Ha()), b();
            }, e);
          }),
        b
      );
    },
    V = function() {
      var b =
        a.cancelAnimationFrame || a[R.toLowerCase() + "CancelAnimationFrame"];
      return (
        (Sa || !b) &&
          (b = function(b) {
            return a.clearTimeout(b);
          }),
        b
      );
    },
    W = {
      begin: function() {
        return 0;
      },
      end: function() {
        return 1;
      },
      linear: function(a) {
        return a;
      },
      quadratic: function(a) {
        return a * a;
      },
      cubic: function(a) {
        return a * a * a;
      },
      swing: function(a) {
        return -i.cos(a * i.PI) / 2 + 0.5;
      },
      sqrt: function(a) {
        return i.sqrt(a);
      },
      outCubic: function(a) {
        return i.pow(a - 1, 3) + 1;
      },
      bounce: function(a) {
        var b;
        if (0.5083 >= a) b = 3;
        else if (0.8489 >= a) b = 9;
        else if (0.96208 >= a) b = 27;
        else {
          if (!(0.99981 >= a)) return 1;
          b = 91;
        }
        return 1 - i.abs((3 * i.cos(a * b * 1.028)) / b);
      }
    };
  (d.prototype.refresh = function(a) {
    var d,
      e,
      f = !1;
    for (
      a === c
        ? ((f = !0), (ia = []), (Ra = 0), (a = b.getElementsByTagName("*")))
        : a.length === c && (a = [a]),
        d = 0,
        e = a.length;
      e > d;
      d++
    ) {
      var g = a[d],
        h = g,
        i = [],
        j = pa,
        k = ta,
        l = !1;
      if ((f && F in g && delete g[F], g.attributes)) {
        for (var m = 0, n = g.attributes.length; n > m; m++) {
          var p = g.attributes[m];
          if ("data-anchor-target" !== p.name)
            if ("data-smooth-scrolling" !== p.name)
              if ("data-edge-strategy" !== p.name)
                if ("data-emit-events" !== p.name) {
                  var q = p.name.match(I);
                  if (null !== q) {
                    var r = {
                      props: p.value,
                      element: g,
                      eventType: p.name.replace(L, M)
                    };
                    i.push(r);
                    var s = q[1];
                    s && (r.constant = s.substr(1));
                    var t = q[2];
                    /p$/.test(t)
                      ? ((r.isPercentage = !0),
                        (r.offset = (0 | t.slice(0, -1)) / 100))
                      : (r.offset = 0 | t);
                    var u = q[3],
                      v = q[4] || u;
                    u && u !== B && u !== C
                      ? ((r.mode = "relative"), (r.anchors = [u, v]))
                      : ((r.mode = "absolute"),
                        u === C
                          ? (r.isEnd = !0)
                          : r.isPercentage || (r.offset = r.offset * Ka));
                  }
                } else l = !0;
              else k = p.value;
            else j = "off" !== p.value;
          else if (((h = b.querySelector(p.value)), null === h))
            throw 'Unable to find anchor target "' + p.value + '"';
        }
        if (i.length) {
          var w, x, y;
          !f && F in g
            ? ((y = g[F]), (w = ia[y].styleAttr), (x = ia[y].classAttr))
            : ((y = g[F] = Ra++), (w = g.style.cssText), (x = Da(g))),
            (ia[y] = {
              element: g,
              styleAttr: w,
              classAttr: x,
              anchorTarget: h,
              keyFrames: i,
              smoothScrolling: j,
              edgeStrategy: k,
              emitEvents: l,
              lastFrameIndex: -1
            }),
            Ea(g, [o], []);
        }
      }
    }
    for (Aa(), d = 0, e = a.length; e > d; d++) {
      var z = ia[a[d][F]];
      z !== c && (_(z), ba(z));
    }
    return ha;
  }),
    (d.prototype.relativeToAbsolute = function(a, b, c) {
      var d = e.clientHeight,
        f = a.getBoundingClientRect(),
        g = f.top,
        h = f.bottom - f.top;
      return (
        b === E ? (g -= d) : b === D && (g -= d / 2),
        c === E ? (g += h) : c === D && (g += h / 2),
        (g += ha.getScrollTop()),
        (g + 0.5) | 0
      );
    }),
    (d.prototype.animateTo = function(a, b) {
      b = b || {};
      var d = Ha(),
        e = ha.getScrollTop(),
        f = b.duration === c ? x : b.duration;
      return (
        (oa = {
          startTop: e,
          topDiff: a - e,
          targetTop: a,
          duration: f,
          startTime: d,
          endTime: d + f,
          easing: W[b.easing || w],
          done: b.done
        }),
        oa.topDiff || (oa.done && oa.done.call(ha, !1), (oa = c)),
        ha
      );
    }),
    (d.prototype.stopAnimateTo = function() {
      oa && oa.done && oa.done.call(ha, !0), (oa = c);
    }),
    (d.prototype.isAnimatingTo = function() {
      return !!oa;
    }),
    (d.prototype.isMobile = function() {
      return Sa;
    }),
    (d.prototype.setScrollTop = function(b, c) {
      return (
        (sa = c === !0),
        Sa ? (Ta = i.min(i.max(b, 0), Ja)) : a.scrollTo(0, b),
        ha
      );
    }),
    (d.prototype.getScrollTop = function() {
      return Sa ? Ta : a.pageYOffset || e.scrollTop || f.scrollTop || 0;
    }),
    (d.prototype.getMaxScrollTop = function() {
      return Ja;
    }),
    (d.prototype.on = function(a, b) {
      return (ka[a] = b), ha;
    }),
    (d.prototype.off = function(a) {
      return delete ka[a], ha;
    }),
    (d.prototype.destroy = function() {
      var a = V();
      a(va), ya(), Ea(e, [t], [s, u, v]);
      for (var b = 0, d = ia.length; d > b; b++) fa(ia[b].element);
      (e.style.overflow = f.style.overflow = ""),
        (e.style.height = f.style.height = ""),
        ja && g.setStyle(ja, "transform", "none"),
        (ha = c),
        (ja = c),
        (ka = c),
        (la = c),
        (Ja = 0),
        (Ka = 1),
        (ma = c),
        (na = c),
        (La = "down"),
        (Ma = -1),
        (Oa = 0),
        (Pa = 0),
        (Qa = !1),
        (oa = c),
        (pa = c),
        (qa = c),
        (ra = c),
        (sa = c),
        (Ra = 0),
        (ta = c),
        (Sa = !1),
        (Ta = 0),
        (ua = c);
    });
  var X = function() {
      var d, g, h, j, o, p, q, r, s, t, u, v;
      wa(e, [k, l, m, n].join(" "), function(a) {
        var e = a.changedTouches[0];
        for (j = a.target; 3 === j.nodeType; ) j = j.parentNode;
        switch (
          ((o = e.clientY),
          (p = e.clientX),
          (t = a.timeStamp),
          G.test(j.tagName) || a.preventDefault(),
          a.type)
        ) {
          case k:
            d && d.blur(),
              ha.stopAnimateTo(),
              (d = j),
              (g = q = o),
              (h = p),
              (s = t);
            break;
          case l:
            G.test(j.tagName) && b.activeElement !== j && a.preventDefault(),
              (r = o - q),
              (v = t - u),
              ha.setScrollTop(Ta - r, !0),
              (q = o),
              (u = t);
            break;
          default:
          case m:
          case n:
            var f = g - o,
              w = h - p,
              x = w * w + f * f;
            if (49 > x) {
              if (!G.test(d.tagName)) {
                d.focus();
                var y = b.createEvent("MouseEvents");
                y.initMouseEvent(
                  "click",
                  !0,
                  !0,
                  a.view,
                  1,
                  e.screenX,
                  e.screenY,
                  e.clientX,
                  e.clientY,
                  a.ctrlKey,
                  a.altKey,
                  a.shiftKey,
                  a.metaKey,
                  0,
                  null
                ),
                  d.dispatchEvent(y);
              }
              return;
            }
            d = c;
            var z = r / v;
            z = i.max(i.min(z, 3), -3);
            var A = i.abs(z / na),
              B = z * A + 0.5 * na * A * A,
              C = ha.getScrollTop() - B,
              D = 0;
            C > Ja
              ? ((D = (Ja - C) / B), (C = Ja))
              : 0 > C && ((D = -C / B), (C = 0)),
              (A *= 1 - D),
              ha.animateTo((C + 0.5) | 0, { easing: "outCubic", duration: A });
        }
      }),
        a.scrollTo(0, 0),
        (e.style.overflow = f.style.overflow = "hidden");
    },
    Y = function() {
      var a,
        b,
        c,
        d,
        f,
        g,
        h,
        j,
        k,
        l,
        m,
        n = e.clientHeight,
        o = Ba();
      for (j = 0, k = ia.length; k > j; j++)
        for (
          a = ia[j],
            b = a.element,
            c = a.anchorTarget,
            d = a.keyFrames,
            f = 0,
            g = d.length;
          g > f;
          f++
        )
          (h = d[f]),
            (l = h.offset),
            (m = o[h.constant] || 0),
            (h.frame = l),
            h.isPercentage && ((l *= n), (h.frame = l)),
            "relative" === h.mode &&
              (fa(b),
              (h.frame =
                ha.relativeToAbsolute(c, h.anchors[0], h.anchors[1]) - l),
              fa(b, !0)),
            (h.frame += m),
            la && !h.isEnd && h.frame > Ja && (Ja = h.frame);
      for (Ja = i.max(Ja, Ca()), j = 0, k = ia.length; k > j; j++) {
        for (a = ia[j], d = a.keyFrames, f = 0, g = d.length; g > f; f++)
          (h = d[f]),
            (m = o[h.constant] || 0),
            h.isEnd && (h.frame = Ja - h.offset + m);
        a.keyFrames.sort(Ia);
      }
    },
    Z = function(a, b) {
      for (var c = 0, d = ia.length; d > c; c++) {
        var e,
          f,
          i = ia[c],
          j = i.element,
          k = i.smoothScrolling ? a : b,
          l = i.keyFrames,
          m = l.length,
          n = l[0],
          s = l[l.length - 1],
          t = k < n.frame,
          u = k > s.frame,
          v = t ? n : s,
          w = i.emitEvents,
          x = i.lastFrameIndex;
        if (t || u) {
          if ((t && -1 === i.edge) || (u && 1 === i.edge)) continue;
          switch (
            (t
              ? (Ea(j, [p], [r, q]),
                w &&
                  x > -1 &&
                  (za(j, n.eventType, La), (i.lastFrameIndex = -1)))
              : (Ea(j, [r], [p, q]),
                w && m > x && (za(j, s.eventType, La), (i.lastFrameIndex = m))),
            (i.edge = t ? -1 : 1),
            i.edgeStrategy)
          ) {
            case "reset":
              fa(j);
              continue;
            case "ease":
              k = v.frame;
              break;
            default:
            case "set":
              var y = v.props;
              for (e in y)
                h.call(y, e) &&
                  ((f = ea(y[e].value)),
                  0 === e.indexOf("@")
                    ? j.setAttribute(e.substr(1), f)
                    : g.setStyle(j, e, f));
              continue;
          }
        } else 0 !== i.edge && (Ea(j, [o, q], [p, r]), (i.edge = 0));
        for (var z = 0; m - 1 > z; z++)
          if (k >= l[z].frame && k <= l[z + 1].frame) {
            var A = l[z],
              B = l[z + 1];
            for (e in A.props)
              if (h.call(A.props, e)) {
                var C = (k - A.frame) / (B.frame - A.frame);
                (C = A.props[e].easing(C)),
                  (f = da(A.props[e].value, B.props[e].value, C)),
                  (f = ea(f)),
                  0 === e.indexOf("@")
                    ? j.setAttribute(e.substr(1), f)
                    : g.setStyle(j, e, f);
              }
            w &&
              x !== z &&
              ("down" === La ? za(j, A.eventType, La) : za(j, B.eventType, La),
              (i.lastFrameIndex = z));
            break;
          }
      }
    },
    $ = function() {
      Qa && ((Qa = !1), Aa());
      var a,
        b,
        d = ha.getScrollTop(),
        e = Ha();
      if (oa)
        e >= oa.endTime
          ? ((d = oa.targetTop), (a = oa.done), (oa = c))
          : ((b = oa.easing((e - oa.startTime) / oa.duration)),
            (d = (oa.startTop + b * oa.topDiff) | 0)),
          ha.setScrollTop(d, !0);
      else if (!sa) {
        var f = ra.targetTop - d;
        f &&
          (ra = {
            startTop: Ma,
            topDiff: d - Ma,
            targetTop: d,
            startTime: Na,
            endTime: Na + qa
          }),
          e <= ra.endTime &&
            ((b = W.sqrt((e - ra.startTime) / qa)),
            (d = (ra.startTop + b * ra.topDiff) | 0));
      }
      if (sa || Ma !== d) {
        (La = d > Ma ? "down" : Ma > d ? "up" : La), (sa = !1);
        var h = { curTop: d, lastTop: Ma, maxTop: Ja, direction: La },
          i = ka.beforerender && ka.beforerender.call(ha, h);
        i !== !1 &&
          (Z(d, ha.getScrollTop()),
          Sa &&
            ja &&
            g.setStyle(ja, "transform", "translate(0, " + -Ta + "px) " + ua),
          (Ma = d),
          ka.render && ka.render.call(ha, h)),
          a && a.call(ha, !1);
      }
      Na = e;
    },
    _ = function(a) {
      for (var b = 0, c = a.keyFrames.length; c > b; b++) {
        for (
          var d, e, f, g, h = a.keyFrames[b], i = {};
          null !== (g = J.exec(h.props));

        )
          (f = g[1]),
            (e = g[2]),
            (d = f.match(K)),
            null !== d ? ((f = d[1]), (d = d[2])) : (d = w),
            (e = e.indexOf("!") ? aa(e) : [e.slice(1)]),
            (i[f] = { value: e, easing: W[d] });
        h.props = i;
      }
    },
    aa = function(a) {
      var b = [];
      return (
        (P.lastIndex = 0),
        (a = a.replace(P, function(a) {
          return a.replace(N, function(a) {
            return (a / 255) * 100 + "%";
          });
        })),
        S &&
          ((Q.lastIndex = 0),
          (a = a.replace(Q, function(a) {
            return S + a;
          }))),
        (a = a.replace(N, function(a) {
          return b.push(+a), "{?}";
        })),
        b.unshift(a),
        b
      );
    },
    ba = function(a) {
      var b,
        c,
        d = {};
      for (b = 0, c = a.keyFrames.length; c > b; b++) ca(a.keyFrames[b], d);
      for (d = {}, b = a.keyFrames.length - 1; b >= 0; b--)
        ca(a.keyFrames[b], d);
    },
    ca = function(a, b) {
      var c;
      for (c in b) h.call(a.props, c) || (a.props[c] = b[c]);
      for (c in a.props) b[c] = a.props[c];
    },
    da = function(a, b, c) {
      var d,
        e = a.length;
      if (e !== b.length)
        throw "Can't interpolate between \"" + a[0] + '" and "' + b[0] + '"';
      var f = [a[0]];
      for (d = 1; e > d; d++) f[d] = a[d] + (b[d] - a[d]) * c;
      return f;
    },
    ea = function(a) {
      var b = 1;
      return (
        (O.lastIndex = 0),
        a[0].replace(O, function() {
          return a[b++];
        })
      );
    },
    fa = function(a, b) {
      a = [].concat(a);
      for (var c, d, e = 0, f = a.length; f > e; e++)
        (d = a[e]),
          (c = ia[d[F]]),
          c &&
            (b
              ? ((d.style.cssText = c.dirtyStyleAttr), Ea(d, c.dirtyClassAttr))
              : ((c.dirtyStyleAttr = d.style.cssText),
                (c.dirtyClassAttr = Da(d)),
                (d.style.cssText = c.styleAttr),
                Ea(d, c.classAttr)));
    },
    ga = function() {
      (ua = "translateZ(0)"), g.setStyle(ja, "transform", ua);
      var a = j(ja),
        b = a.getPropertyValue("transform"),
        c = a.getPropertyValue(S + "transform"),
        d = (b && "none" !== b) || (c && "none" !== c);
      d || (ua = "");
    };
  g.setStyle = function(a, b, c) {
    var d = a.style;
    if (((b = b.replace(L, M).replace("-", "")), "zIndex" === b))
      isNaN(c) ? (d[b] = c) : (d[b] = "" + (0 | c));
    else if ("float" === b) d.styleFloat = d.cssFloat = c;
    else
      try {
        R && (d[R + b.slice(0, 1).toUpperCase() + b.slice(1)] = c), (d[b] = c);
      } catch (e) {}
  };
  var ha,
    ia,
    ja,
    ka,
    la,
    ma,
    na,
    oa,
    pa,
    qa,
    ra,
    sa,
    ta,
    ua,
    va,
    wa = (g.addEvent = function(b, c, d) {
      var e = function(b) {
        return (
          (b = b || a.event),
          b.target || (b.target = b.srcElement),
          b.preventDefault ||
            (b.preventDefault = function() {
              (b.returnValue = !1), (b.defaultPrevented = !0);
            }),
          d.call(this, b)
        );
      };
      c = c.split(" ");
      for (var f, g = 0, h = c.length; h > g; g++)
        (f = c[g]),
          b.addEventListener
            ? b.addEventListener(f, d, !1)
            : b.attachEvent("on" + f, e),
          Ua.push({ element: b, name: f, listener: d });
    }),
    xa = (g.removeEvent = function(a, b, c) {
      b = b.split(" ");
      for (var d = 0, e = b.length; e > d; d++)
        a.removeEventListener
          ? a.removeEventListener(b[d], c, !1)
          : a.detachEvent("on" + b[d], c);
    }),
    ya = function() {
      for (var a, b = 0, c = Ua.length; c > b; b++)
        (a = Ua[b]), xa(a.element, a.name, a.listener);
      Ua = [];
    },
    za = function(a, b, c) {
      ka.keyframe && ka.keyframe.call(ha, a, b, c);
    },
    Aa = function() {
      var a = ha.getScrollTop();
      (Ja = 0),
        la && !Sa && (f.style.height = ""),
        Y(),
        la && !Sa && (f.style.height = Ja + e.clientHeight + "px"),
        Sa
          ? ha.setScrollTop(i.min(ha.getScrollTop(), Ja))
          : ha.setScrollTop(a, !0),
        (sa = !0);
    },
    Ba = function() {
      var a,
        b,
        c = e.clientHeight,
        d = {};
      for (a in ma)
        (b = ma[a]),
          "function" == typeof b
            ? (b = b.call(ha))
            : /p$/.test(b) && (b = (b.slice(0, -1) / 100) * c),
          (d[a] = b);
      return d;
    },
    Ca = function() {
      var a,
        b = 0;
      return (
        ja && (b = i.max(ja.offsetHeight, ja.scrollHeight)),
        (a = i.max(
          b,
          f.scrollHeight,
          f.offsetHeight,
          e.scrollHeight,
          e.offsetHeight,
          e.clientHeight
        )),
        a - e.clientHeight
      );
    },
    Da = function(b) {
      var c = "className";
      return (
        a.SVGElement &&
          b instanceof a.SVGElement &&
          ((b = b[c]), (c = "baseVal")),
        b[c]
      );
    },
    Ea = function(b, d, e) {
      var f = "className";
      if (
        (a.SVGElement &&
          b instanceof a.SVGElement &&
          ((b = b[f]), (f = "baseVal")),
        e === c)
      )
        return void (b[f] = d);
      for (var g = b[f], h = 0, i = e.length; i > h; h++)
        g = Ga(g).replace(Ga(e[h]), " ");
      g = Fa(g);
      for (var j = 0, k = d.length; k > j; j++)
        -1 === Ga(g).indexOf(Ga(d[j])) && (g += " " + d[j]);
      b[f] = Fa(g);
    },
    Fa = function(a) {
      return a.replace(H, "");
    },
    Ga = function(a) {
      return " " + a + " ";
    },
    Ha =
      Date.now ||
      function() {
        return +new Date();
      },
    Ia = function(a, b) {
      return a.frame - b.frame;
    },
    Ja = 0,
    Ka = 1,
    La = "down",
    Ma = -1,
    Na = Ha(),
    Oa = 0,
    Pa = 0,
    Qa = !1,
    Ra = 0,
    Sa = !1,
    Ta = 0,
    Ua = [];
  "function" == typeof define && define.amd
    ? define([], function() {
        return g;
      })
    : "undefined" != typeof module && module.exports
    ? (module.exports = g)
    : (a.skrollr = g);
})(window, document);
