console.time('clock');

var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.createTemplateTagFirstArg = function (a) {
    return a.raw = a
};
$jscomp.createTemplateTagFirstArgWithRaw = function (a, b) {
    a.raw = b;
    return a
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.ISOLATE_POLYFILLS = !1;
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function (a, b, c) {
    if (a == Array.prototype || a == Object.prototype) return a;
    a[b] = c.value;
    return a
};
$jscomp.getGlobal = function (a) {
    a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
    for (var b = 0; b < a.length; ++b) {
        var c = a[b];
        if (c && c.Math == Math) return c
    }
    throw Error("Cannot find global object");
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.IS_SYMBOL_NATIVE = "function" === typeof Symbol && "symbol" === typeof Symbol("x");
$jscomp.TRUST_ES6_POLYFILLS = !$jscomp.ISOLATE_POLYFILLS || $jscomp.IS_SYMBOL_NATIVE;
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
var $jscomp$lookupPolyfilledValue = function (a, b) {
    var c = $jscomp.propertyToPolyfillSymbol[b];
    if (null == c) return a[b];
    c = a[c];
    return void 0 !== c ? c : a[b]
};
$jscomp.polyfill = function (a, b, c, d) {
    b && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(a, b, c, d) : $jscomp.polyfillUnisolated(a, b, c, d))
};
$jscomp.polyfillUnisolated = function (a, b, c, d) {
    c = $jscomp.global;
    a = a.split(".");
    for (d = 0; d < a.length - 1; d++) {
        var e = a[d];
        if (!(e in c)) return;
        c = c[e]
    }
    a = a[a.length - 1];
    d = c[a];
    b = b(d);
    b != d && null != b && $jscomp.defineProperty(c, a, {
        configurable: !0,
        writable: !0,
        value: b
    })
};
$jscomp.polyfillIsolated = function (a, b, c, d) {
    var e = a.split(".");
    a = 1 === e.length;
    d = e[0];
    d = !a && d in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
    for (var f = 0; f < e.length - 1; f++) {
        var g = e[f];
        if (!(g in d)) return;
        d = d[g]
    }
    e = e[e.length - 1];
    c = $jscomp.IS_SYMBOL_NATIVE && "es6" === c ? d[e] : null;
    b = b(c);
    null != b && (a ? $jscomp.defineProperty($jscomp.polyfills, e, {
        configurable: !0,
        writable: !0,
        value: b
    }) : b !== c && (void 0 === $jscomp.propertyToPolyfillSymbol[e] && (c = 1E9 * Math.random() >>> 0, $jscomp.propertyToPolyfillSymbol[e] = $jscomp.IS_SYMBOL_NATIVE ?
        $jscomp.global.Symbol(e) : $jscomp.POLYFILL_PREFIX + c + "$" + e), $jscomp.defineProperty(d, $jscomp.propertyToPolyfillSymbol[e], {
        configurable: !0,
        writable: !0,
        value: b
    })))
};
$jscomp.underscoreProtoCanBeSet = function () {
    var a = {
            a: !0
        },
        b = {};
    try {
        return b.__proto__ = a, b.a
    } catch (c) {}
    return !1
};
$jscomp.setPrototypeOf = $jscomp.TRUST_ES6_POLYFILLS && "function" == typeof Object.setPrototypeOf ? Object.setPrototypeOf : $jscomp.underscoreProtoCanBeSet() ? function (a, b) {
    a.__proto__ = b;
    if (a.__proto__ !== b) throw new TypeError(a + " is not extensible");
    return a
} : null;
$jscomp.arrayIteratorImpl = function (a) {
    var b = 0;
    return function () {
        return b < a.length ? {
            done: !1,
            value: a[b++]
        } : {
            done: !0
        }
    }
};
$jscomp.arrayIterator = function (a) {
    return {
        next: $jscomp.arrayIteratorImpl(a)
    }
};
$jscomp.makeIterator = function (a) {
    var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
    return b ? b.call(a) : $jscomp.arrayIterator(a)
};
$jscomp.generator = {};
$jscomp.generator.ensureIteratorResultIsObject_ = function (a) {
    if (!(a instanceof Object)) throw new TypeError("Iterator result " + a + " is not an object");
};
$jscomp.generator.Context = function () {
    this.isRunning_ = !1;
    this.yieldAllIterator_ = null;
    this.yieldResult = void 0;
    this.nextAddress = 1;
    this.finallyAddress_ = this.catchAddress_ = 0;
    this.finallyContexts_ = this.abruptCompletion_ = null
};
$jscomp.generator.Context.prototype.start_ = function () {
    if (this.isRunning_) throw new TypeError("Generator is already running");
    this.isRunning_ = !0
};
$jscomp.generator.Context.prototype.stop_ = function () {
    this.isRunning_ = !1
};
$jscomp.generator.Context.prototype.jumpToErrorHandler_ = function () {
    this.nextAddress = this.catchAddress_ || this.finallyAddress_
};
$jscomp.generator.Context.prototype.next_ = function (a) {
    this.yieldResult = a
};
$jscomp.generator.Context.prototype.throw_ = function (a) {
    this.abruptCompletion_ = {
        exception: a,
        isException: !0
    };
    this.jumpToErrorHandler_()
};
$jscomp.generator.Context.prototype["return"] = function (a) {
    this.abruptCompletion_ = {
        "return": a
    };
    this.nextAddress = this.finallyAddress_
};
$jscomp.generator.Context.prototype.jumpThroughFinallyBlocks = function (a) {
    this.abruptCompletion_ = {
        jumpTo: a
    };
    this.nextAddress = this.finallyAddress_
};
$jscomp.generator.Context.prototype.yield = function (a, b) {
    this.nextAddress = b;
    return {
        value: a
    }
};
$jscomp.generator.Context.prototype.yieldAll = function (a, b) {
    var c = $jscomp.makeIterator(a),
        d = c.next();
    $jscomp.generator.ensureIteratorResultIsObject_(d);
    if (d.done) this.yieldResult = d.value, this.nextAddress = b;
    else return this.yieldAllIterator_ = c, this.yield(d.value, b)
};
$jscomp.generator.Context.prototype.jumpTo = function (a) {
    this.nextAddress = a
};
$jscomp.generator.Context.prototype.jumpToEnd = function () {
    this.nextAddress = 0
};
$jscomp.generator.Context.prototype.setCatchFinallyBlocks = function (a, b) {
    this.catchAddress_ = a;
    void 0 != b && (this.finallyAddress_ = b)
};
$jscomp.generator.Context.prototype.setFinallyBlock = function (a) {
    this.catchAddress_ = 0;
    this.finallyAddress_ = a || 0
};
$jscomp.generator.Context.prototype.leaveTryBlock = function (a, b) {
    this.nextAddress = a;
    this.catchAddress_ = b || 0
};
$jscomp.generator.Context.prototype.enterCatchBlock = function (a) {
    this.catchAddress_ = a || 0;
    a = this.abruptCompletion_.exception;
    this.abruptCompletion_ = null;
    return a
};
$jscomp.generator.Context.prototype.enterFinallyBlock = function (a, b, c) {
    c ? this.finallyContexts_[c] = this.abruptCompletion_ : this.finallyContexts_ = [this.abruptCompletion_];
    this.catchAddress_ = a || 0;
    this.finallyAddress_ = b || 0
};
$jscomp.generator.Context.prototype.leaveFinallyBlock = function (a, b) {
    var c = this.finallyContexts_.splice(b || 0)[0];
    if (c = this.abruptCompletion_ = this.abruptCompletion_ || c) {
        if (c.isException) return this.jumpToErrorHandler_();
        void 0 != c.jumpTo && this.finallyAddress_ < c.jumpTo ? (this.nextAddress = c.jumpTo, this.abruptCompletion_ = null) : this.nextAddress = this.finallyAddress_
    } else this.nextAddress = a
};
$jscomp.generator.Context.prototype.forIn = function (a) {
    return new $jscomp.generator.Context.PropertyIterator(a)
};
$jscomp.generator.Context.PropertyIterator = function (a) {
    this.object_ = a;
    this.properties_ = [];
    for (var b in a) this.properties_.push(b);
    this.properties_.reverse()
};
$jscomp.generator.Context.PropertyIterator.prototype.getNext = function () {
    for (; 0 < this.properties_.length;) {
        var a = this.properties_.pop();
        if (a in this.object_) return a
    }
    return null
};
$jscomp.generator.Engine_ = function (a) {
    this.context_ = new $jscomp.generator.Context;
    this.program_ = a
};
$jscomp.generator.Engine_.prototype.next_ = function (a) {
    this.context_.start_();
    if (this.context_.yieldAllIterator_) return this.yieldAllStep_(this.context_.yieldAllIterator_.next, a, this.context_.next_);
    this.context_.next_(a);
    return this.nextStep_()
};
$jscomp.generator.Engine_.prototype.return_ = function (a) {
    this.context_.start_();
    var b = this.context_.yieldAllIterator_;
    if (b) return this.yieldAllStep_("return" in b ? b["return"] : function (c) {
        return {
            value: c,
            done: !0
        }
    }, a, this.context_["return"]);
    this.context_["return"](a);
    return this.nextStep_()
};
$jscomp.generator.Engine_.prototype.throw_ = function (a) {
    this.context_.start_();
    if (this.context_.yieldAllIterator_) return this.yieldAllStep_(this.context_.yieldAllIterator_["throw"], a, this.context_.next_);
    this.context_.throw_(a);
    return this.nextStep_()
};
$jscomp.generator.Engine_.prototype.yieldAllStep_ = function (a, b, c) {
    try {
        var d = a.call(this.context_.yieldAllIterator_, b);
        $jscomp.generator.ensureIteratorResultIsObject_(d);
        if (!d.done) return this.context_.stop_(), d;
        var e = d.value
    } catch (f) {
        return this.context_.yieldAllIterator_ = null, this.context_.throw_(f), this.nextStep_()
    }
    this.context_.yieldAllIterator_ = null;
    c.call(this.context_, e);
    return this.nextStep_()
};
$jscomp.generator.Engine_.prototype.nextStep_ = function () {
    for (; this.context_.nextAddress;) try {
        var a = this.program_(this.context_);
        if (a) return this.context_.stop_(), {
            value: a.value,
            done: !1
        }
    } catch (b) {
        this.context_.yieldResult = void 0, this.context_.throw_(b)
    }
    this.context_.stop_();
    if (this.context_.abruptCompletion_) {
        a = this.context_.abruptCompletion_;
        this.context_.abruptCompletion_ = null;
        if (a.isException) throw a.exception;
        return {
            value: a["return"],
            done: !0
        }
    }
    return {
        value: void 0,
        done: !0
    }
};
$jscomp.generator.Generator_ = function (a) {
    this.next = function (b) {
        return a.next_(b)
    };
    this["throw"] = function (b) {
        return a.throw_(b)
    };
    this["return"] = function (b) {
        return a.return_(b)
    };
    this[Symbol.iterator] = function () {
        return this
    }
};
$jscomp.generator.createGenerator = function (a, b) {
    var c = new $jscomp.generator.Generator_(new $jscomp.generator.Engine_(b));
    $jscomp.setPrototypeOf && a.prototype && $jscomp.setPrototypeOf(c, a.prototype);
    return c
};
$jscomp.asyncExecutePromiseGenerator = function (a) {
    function b(d) {
        return a.next(d)
    }

    function c(d) {
        return a["throw"](d)
    }
    return new Promise(function (d, e) {
        function f(g) {
            g.done ? d(g.value) : Promise.resolve(g.value).then(b, c).then(f, e)
        }
        f(a.next())
    })
};
$jscomp.asyncExecutePromiseGeneratorFunction = function (a) {
    return $jscomp.asyncExecutePromiseGenerator(a())
};
$jscomp.asyncExecutePromiseGeneratorProgram = function (a) {
    return $jscomp.asyncExecutePromiseGenerator(new $jscomp.generator.Generator_(new $jscomp.generator.Engine_(a)))
};
var tabs = document.querySelectorAll(".tabheader__item"),
    tabsContent = document.querySelectorAll("div.tabcontent"),
    tabsParent = tabs[0].parentNode;

function hideContent() {
    tabsContent.forEach(function (a) {
        a.classList.add("hide");
        a.classList.remove("show", "fade")
    });
    tabs.forEach(function (a) {
        a.classList.remove("tabheader__item_active")
    })
}

function showContent(a) {
    a = void 0 === a ? 0 : a;
    tabsContent[a].classList.remove("hide");
    tabsContent[a].classList.add("show", "fade");
    tabs[a].classList.add("tabheader__item_active")
}
hideContent();
showContent();
tabsParent.addEventListener("click", function (a) {
    a.target && a.target.classList.contains("tabheader__item") && tabs.forEach(function (b, c) {
        b == a.target && (hideContent(), showContent(c))
    })
});
var doomsDay = "2022-02-17",
    upTime = setInterval(setLostTime, 1E3);
setLostTime();

function getLostTime(a) {
    a = (new Date).getTime();
    a = (new Date(doomsDay)).getTime() - a;
    return {
        day: Math.floor(a / 864E5),
        hours: Math.floor(a / 36E5 % 24),
        min: Math.floor(a / 6E4 % 60),
        sec: Math.floor(a / 1E3 % 60),
        diff: a
    }
}

function setLostTime() {
    var a = getLostTime(doomsDay),
        b = document.querySelectorAll(".timer__block"),
        c = Object.values(a);
    0 >= a.diff ? clearInterval(upTime) : b.forEach(function (d, e) {
        var f = c[e];
        d.firstElementChild.textContent = 10 > f ? "0" + f : f
    })
}
var MenuCard = function (a, b, c, d, e, f) {
    this.src = a;
    this.alt = b;
    this.title = c;
    this.descr = d;
    this.price = e;
    this.transfer = 27;
    this.changeToUAH();
    this.parent = document.querySelector(f)
};
MenuCard.prototype.changeToUAH = function () {
    this.price *= this.transfer
};
MenuCard.prototype.render = function () {
    var a = document.createElement("div");
    a.innerHTML = '\n        <div class="menu__item">\n                    <img src=' + this.src + " alt=" + this.alt + '>\n                    <h3 class="menu__item-subtitle">' + this.title + '</h3>\n                    <div class="menu__item-descr">' + this.descr + '</div>\n                    <div class="menu__item-divider"></div>\n                    <div class="menu__item-price">\n                        <div class="menu__item-cost">\u0426\u0435\u043d\u0430:</div>\n                        <div class="menu__item-total"><span>' +
        this.price + "</span> \u0433\u0440\u043d/\u0434\u0435\u043d\u044c</div>\n                    </div>\n        </div>\n        ";
    this.parent.append(a)
};
(new MenuCard("img/tabs/vegy.jpg", "vegy", '\u041c\u0435\u043d\u044e "\u0424\u0438\u0442\u043d\u0435\u0441"', '\u041c\u0435\u043d\u044e "\u0424\u0438\u0442\u043d\u0435\u0441" - \u044d\u0442\u043e \u043d\u043e\u0432\u044b\u0439 \u043f\u043e\u0434\u0445\u043e\u0434 \u043a \u043f\u0440\u0438\u0433\u043e\u0442\u043e\u0432\u043b\u0435\u043d\u0438\u044e \u0431\u043b\u044e\u0434: \u0431\u043e\u043b\u044c\u0448\u0435 \u0441\u0432\u0435\u0436\u0438\u0445 \u043e\u0432\u043e\u0449\u0435\u0439 \u0438 \u0444\u0440\u0443\u043a\u0442\u043e\u0432. \u041f\u0440\u043e\u0434\u0443\u043a\u0442 \u0430\u043a\u0442\u0438\u0432\u043d\u044b\u0445 \u0438 \u0437\u0434\u043e\u0440\u043e\u0432\u044b\u0445 \u043b\u044e\u0434\u0435\u0439. \u042d\u0442\u043e \u0430\u0431\u0441\u043e\u043b\u044e\u0442\u043d\u043e \u043d\u043e\u0432\u044b\u0439 \u043f\u0440\u043e\u0434\u0443\u043a\u0442 \u0441 \u043e\u043f\u0442\u0438\u043c\u0430\u043b\u044c\u043d\u043e\u0439 \u0446\u0435\u043d\u043e\u0439 \u0438 \u0432\u044b\u0441\u043e\u043a\u0438\u043c \u043a\u0430\u0447\u0435\u0441\u0442\u0432\u043e\u043c!', 9,
    ".menu__field .container")).render();
(new MenuCard("img/tabs/elite.jpg", "elite", "\u041c\u0435\u043d\u044e \u201c\u041f\u0440\u0435\u043c\u0438\u0443\u043c\u201d", "\u0412 \u043c\u0435\u043d\u044e \u201c\u041f\u0440\u0435\u043c\u0438\u0443\u043c\u201d \u043c\u044b \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0435\u043c \u043d\u0435 \u0442\u043e\u043b\u044c\u043a\u043e \u043a\u0440\u0430\u0441\u0438\u0432\u044b\u0439 \u0434\u0438\u0437\u0430\u0439\u043d \u0443\u043f\u0430\u043a\u043e\u0432\u043a\u0438, \u043d\u043e \u0438 \u043a\u0430\u0447\u0435\u0441\u0442\u0432\u0435\u043d\u043d\u043e\u0435 \u0438\u0441\u043f\u043e\u043b\u043d\u0435\u043d\u0438\u0435 \u0431\u043b\u044e\u0434. \u041a\u0440\u0430\u0441\u043d\u0430\u044f \u0440\u044b\u0431\u0430, \u043c\u043e\u0440\u0435\u043f\u0440\u043e\u0434\u0443\u043a\u0442\u044b, \u0444\u0440\u0443\u043a\u0442\u044b - \u0440\u0435\u0441\u0442\u043e\u0440\u0430\u043d\u043d\u043e\u0435 \u043c\u0435\u043d\u044e \u0431\u0435\u0437 \u043f\u043e\u0445\u043e\u0434\u0430 \u0432 \u0440\u0435\u0441\u0442\u043e\u0440\u0430\u043d!", 20,
    ".menu__field .container")).render();
(new MenuCard("img/tabs/post.jpg", '\u041c\u0435\u043d\u044e "\u041f\u043e\u0441\u0442\u043d\u043e\u0435"', "post", "\u041c\u0435\u043d\u044e \u201c\u041f\u043e\u0441\u0442\u043d\u043e\u0435\u201d - \u044d\u0442\u043e \u0442\u0449\u0430\u0442\u0435\u043b\u044c\u043d\u044b\u0439 \u043f\u043e\u0434\u0431\u043e\u0440 \u0438\u043d\u0433\u0440\u0435\u0434\u0438\u0435\u043d\u0442\u043e\u0432: \u043f\u043e\u043b\u043d\u043e\u0435 \u043e\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0438\u0435 \u043f\u0440\u043e\u0434\u0443\u043a\u0442\u043e\u0432 \u0436\u0438\u0432\u043e\u0442\u043d\u043e\u0433\u043e \u043f\u0440\u043e\u0438\u0441\u0445\u043e\u0436\u0434\u0435\u043d\u0438\u044f, \u043c\u043e\u043b\u043e\u043a\u043e \u0438\u0437 \u043c\u0438\u043d\u0434\u0430\u043b\u044f, \u043e\u0432\u0441\u0430, \u043a\u043e\u043a\u043e\u0441\u0430 \u0438\u043b\u0438 \u0433\u0440\u0435\u0447\u043a\u0438, \u043f\u0440\u0430\u0432\u0438\u043b\u044c\u043d\u043e\u0435 \u043a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u043e \u0431\u0435\u043b\u043a\u043e\u0432 \u0437\u0430 \u0441\u0447\u0435\u0442 \u0442\u043e\u0444\u0443 \u0438 \u0438\u043c\u043f\u043e\u0440\u0442\u043d\u044b\u0445 \u0432\u0435\u0433\u0435\u0442\u0430\u0440\u0438\u0430\u043d\u0441\u043a\u0438\u0445 \u0441\u0442\u0435\u0439\u043a\u043e\u0432.", 16,
    ".menu__field .container")).render();
var modalTrigger = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal"),
    closeModal = document.querySelector("[data-close]");
modalTrigger.forEach(function (a) {
    a.addEventListener("click", function () {
        console.log("was a click on data-modal");
        openModalFrame();
        removeShowModalEvent();
        clearInterval(openModalonTime);
        document.body.style.overflow = "hidden"
    })
});
document.addEventListener("keydown", function (a) {
    "Escape" === a.key && modal.classList.contains("show") && (closeModalFrame(), console.log(a.key + " was prased"))
});

function openModalFrame() {
    var a = modal.classList;
    a.remove("hide");
    a.add("show");
    document.body.style.overflow = "hidden"
}

function closeModalFrame() {
    var a = modal.classList;
    a.remove("show");
    a.add("hide");
    document.body.style.overflow = "scroll"
}
closeModal.addEventListener("click", closeModalFrame);
modal.addEventListener("click", function (a) {
    (a.target === modal || a.target.classList.contains("modal__close")) && closeModalFrame()
});
window.addEventListener("scroll", showModal);
var openModalonTime = setTimeout(function () {
    openModalFrame();
    removeShowModalEvent()
}, 5E4);

function showModal() {
    $(window).scrollTop() + $(window).height() + .1 >= $(document).height() && (console.log("\u0443\u0440\u0430! \u043a\u043e\u043d\u0435\u0446 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u044b!"), openModalFrame(), removeShowModalEvent(), clearTimeout(openModalonTime))
}

function removeShowModalEvent() {
    window.removeEventListener("scroll", showModal)
}
var forms = document.querySelectorAll("form"),
    infoLoad = {
        loading: "img/form/spinner.svg",
        success: "Thank's, we'll call you..",
        fail: "An arror has ocurated.."
    };
forms.forEach(function (a) {
    bindPostData(a)
});
var postData = function (a, b) {
    var c;
    return $jscomp.asyncExecutePromiseGeneratorProgram(function (d) {
        return 1 == d.nextAddress ? d.yield(fetch(a, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: b
        }), 2) : 3 != d.nextAddress ? (c = d.yieldResult, d.yield(c.json(), 3)) : d["return"](d.yieldResult)
    })
};

function bindPostData(a) {
    a.addEventListener("submit", function (b) {
        b.preventDefault();
        var c = document.createElement("img");
        c.src = infoLoad.loading;
        c.style.cssText = "\n        display: block;\n        margin: 0 auto;";
        a.insertAdjacentElement("afterend", c);
        b = new FormData(a);
        b = JSON.stringify(Object.fromEntries(b.entries()));
        postData("http://localhost:3000/requests", b).then(function (d) {
            console.log(d);
            showThanksModal(infoLoad.success);
            c.remove()
        })["catch"](function () {
            showThanksModal(infoLoad.fail)
        })["finally"](function () {
            a.reset()
        })
    })
}

function showThanksModal(a) {
    var b = document.querySelector(".modal__dialog");
    b.classList.remove("show");
    b.classList.add("hide");
    openModalFrame();
    var c = document.createElement("div");
    c.classList.add("modal__dialog");
    c.innerHTML = '\n    <div class="modal__content">\n        <div data-close class="modal__close">&times;</div>\n        <div class="modal__title">' + a + "</div>\n    </div>\n    ";
    modal.append(c);
    setTimeout(function () {
            c.remove();
            b.classList.remove("hide");
            b.classList.add("show");
            closeModalFrame()
        },
        2E3)
};
console.timeLog('clock');