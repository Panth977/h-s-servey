var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key2, value) => key2 in obj ? __defProp(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
var __esm = (fn2, res) => function __init() {
  return fn2 && (res = (0, fn2[__getOwnPropNames(fn2)[0]])(fn2 = 0)), res;
};
var __commonJS = (cb2, mod) => function __require() {
  return mod || (0, cb2[__getOwnPropNames(cb2)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name6 in all)
    __defProp(target, name6, { get: all[name6], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key2 of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key2) && key2 !== except)
        __defProp(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc(from, key2)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __publicField = (obj, key2, value) => {
  __defNormalProp(obj, typeof key2 !== "symbol" ? key2 + "" : key2, value);
  return value;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};

// .svelte-kit/output/server/chunks/index.js
function noop() {
}
function run(fn2) {
  return fn2();
}
function blank_object() {
  return /* @__PURE__ */ Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    return noop;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
  const e = document.createEvent("CustomEvent");
  e.initCustomEvent(type, bubbles, cancelable, detail);
  return e;
}
function set_current_component(component16) {
  current_component = component16;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function createEventDispatcher() {
  const component16 = get_current_component();
  return (type, detail, { cancelable = false } = {}) => {
    const callbacks = component16.$$.callbacks[type];
    if (callbacks) {
      const event2 = custom_event(type, detail, { cancelable });
      callbacks.slice().forEach((fn2) => {
        fn2.call(component16, event2);
      });
      return !event2.defaultPrevented;
    }
    return true;
  };
}
function setContext(key2, context) {
  get_current_component().$$.context.set(key2, context);
  return context;
}
function getContext(key2) {
  return get_current_component().$$.context.get(key2);
}
function escape(value, is_attr = false) {
  const str = String(value);
  const pattern = is_attr ? ATTR_REGEX : CONTENT_REGEX;
  pattern.lastIndex = 0;
  let escaped2 = "";
  let last = 0;
  while (pattern.test(str)) {
    const i = pattern.lastIndex - 1;
    const ch = str[i];
    escaped2 += str.substring(last, i) + (ch === "&" ? "&amp;" : ch === '"' ? "&quot;" : "&lt;");
    last = i + 1;
  }
  return escaped2 + str.substring(last);
}
function each(items, fn2) {
  let str = "";
  for (let i = 0; i < items.length; i += 1) {
    str += fn2(items[i], i);
  }
  return str;
}
function validate_component(component16, name6) {
  if (!component16 || !component16.$$render) {
    if (name6 === "svelte:component")
      name6 += " this={...}";
    throw new Error(`<${name6}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
  }
  return component16;
}
function create_ssr_component(fn2) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(context || (parent_component ? parent_component.$$.context : [])),
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn2(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = /* @__PURE__ */ new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: /* @__PURE__ */ new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css3) => css3.code).join("\n"),
          map: null
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name6, value, boolean) {
  if (value == null || boolean && !value)
    return "";
  const assignment = boolean && value === true ? "" : `="${escape(value, true)}"`;
  return ` ${name6}${assignment}`;
}
var current_component, ATTR_REGEX, CONTENT_REGEX, missing_component, on_destroy;
var init_chunks = __esm({
  ".svelte-kit/output/server/chunks/index.js"() {
    Promise.resolve();
    ATTR_REGEX = /[&"]/g;
    CONTENT_REGEX = /[&<]/g;
    missing_component = {
      $$render: () => ""
    };
  }
});

// .svelte-kit/output/server/chunks/index2.js
function error(status, message) {
  return new HttpError(status, message);
}
function json(data, init2) {
  const headers = new Headers(init2 == null ? void 0 : init2.headers);
  if (!headers.has("content-type")) {
    headers.set("content-type", "application/json");
  }
  return new Response(JSON.stringify(data), {
    ...init2,
    headers
  });
}
var HttpError, Redirect;
var init_index2 = __esm({
  ".svelte-kit/output/server/chunks/index2.js"() {
    HttpError = class {
      constructor(status, message) {
        __publicField(this, "name", "HttpError");
        __publicField(this, "stack");
        this.status = status;
        this.message = message ?? `Error: ${status}`;
      }
      toString() {
        return this.message;
      }
    };
    Redirect = class {
      constructor(status, location) {
        this.status = status;
        this.location = location;
      }
    };
  }
});

// .svelte-kit/output/server/chunks/index3.js
function readable(value, start2) {
  return {
    subscribe: writable(value, start2).subscribe
  };
}
function writable(value, start2 = noop) {
  let stop2;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop2) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn2) {
    set(fn2(value));
  }
  function subscribe2(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop2 = start2(set) || noop;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop2();
        stop2 = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
var subscriber_queue;
var init_index3 = __esm({
  ".svelte-kit/output/server/chunks/index3.js"() {
    init_chunks();
    subscriber_queue = [];
  }
});

// node_modules/cookie/index.js
var require_cookie = __commonJS({
  "node_modules/cookie/index.js"(exports) {
    "use strict";
    exports.parse = parse2;
    exports.serialize = serialize2;
    var __toString = Object.prototype.toString;
    var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
    function parse2(str, options) {
      if (typeof str !== "string") {
        throw new TypeError("argument str must be a string");
      }
      var obj = {};
      var opt = options || {};
      var dec = opt.decode || decode;
      var index16 = 0;
      while (index16 < str.length) {
        var eqIdx = str.indexOf("=", index16);
        if (eqIdx === -1) {
          break;
        }
        var endIdx = str.indexOf(";", index16);
        if (endIdx === -1) {
          endIdx = str.length;
        } else if (endIdx < eqIdx) {
          index16 = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        var key2 = str.slice(index16, eqIdx).trim();
        if (void 0 === obj[key2]) {
          var val = str.slice(eqIdx + 1, endIdx).trim();
          if (val.charCodeAt(0) === 34) {
            val = val.slice(1, -1);
          }
          obj[key2] = tryDecode(val, dec);
        }
        index16 = endIdx + 1;
      }
      return obj;
    }
    function serialize2(name6, val, options) {
      var opt = options || {};
      var enc = opt.encode || encode2;
      if (typeof enc !== "function") {
        throw new TypeError("option encode is invalid");
      }
      if (!fieldContentRegExp.test(name6)) {
        throw new TypeError("argument name is invalid");
      }
      var value = enc(val);
      if (value && !fieldContentRegExp.test(value)) {
        throw new TypeError("argument val is invalid");
      }
      var str = name6 + "=" + value;
      if (null != opt.maxAge) {
        var maxAge = opt.maxAge - 0;
        if (isNaN(maxAge) || !isFinite(maxAge)) {
          throw new TypeError("option maxAge is invalid");
        }
        str += "; Max-Age=" + Math.floor(maxAge);
      }
      if (opt.domain) {
        if (!fieldContentRegExp.test(opt.domain)) {
          throw new TypeError("option domain is invalid");
        }
        str += "; Domain=" + opt.domain;
      }
      if (opt.path) {
        if (!fieldContentRegExp.test(opt.path)) {
          throw new TypeError("option path is invalid");
        }
        str += "; Path=" + opt.path;
      }
      if (opt.expires) {
        var expires = opt.expires;
        if (!isDate(expires) || isNaN(expires.valueOf())) {
          throw new TypeError("option expires is invalid");
        }
        str += "; Expires=" + expires.toUTCString();
      }
      if (opt.httpOnly) {
        str += "; HttpOnly";
      }
      if (opt.secure) {
        str += "; Secure";
      }
      if (opt.priority) {
        var priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError("option priority is invalid");
        }
      }
      if (opt.sameSite) {
        var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
        switch (sameSite) {
          case true:
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError("option sameSite is invalid");
        }
      }
      return str;
    }
    function decode(str) {
      return str.indexOf("%") !== -1 ? decodeURIComponent(str) : str;
    }
    function encode2(val) {
      return encodeURIComponent(val);
    }
    function isDate(val) {
      return __toString.call(val) === "[object Date]" || val instanceof Date;
    }
    function tryDecode(str, decode2) {
      try {
        return decode2(str);
      } catch (e) {
        return str;
      }
    }
  }
});

// node_modules/set-cookie-parser/lib/set-cookie.js
var require_set_cookie = __commonJS({
  "node_modules/set-cookie-parser/lib/set-cookie.js"(exports, module) {
    "use strict";
    var defaultParseOptions = {
      decodeValues: true,
      map: false,
      silent: false
    };
    function isNonEmptyString(str) {
      return typeof str === "string" && !!str.trim();
    }
    function parseString2(setCookieValue, options) {
      var parts = setCookieValue.split(";").filter(isNonEmptyString);
      var nameValuePairStr = parts.shift();
      var parsed = parseNameValuePair(nameValuePairStr);
      var name6 = parsed.name;
      var value = parsed.value;
      options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
      try {
        value = options.decodeValues ? decodeURIComponent(value) : value;
      } catch (e) {
        console.error(
          "set-cookie-parser encountered an error while decoding a cookie with value '" + value + "'. Set options.decodeValues to false to disable this feature.",
          e
        );
      }
      var cookie2 = {
        name: name6,
        value
      };
      parts.forEach(function(part) {
        var sides = part.split("=");
        var key2 = sides.shift().trimLeft().toLowerCase();
        var value2 = sides.join("=");
        if (key2 === "expires") {
          cookie2.expires = new Date(value2);
        } else if (key2 === "max-age") {
          cookie2.maxAge = parseInt(value2, 10);
        } else if (key2 === "secure") {
          cookie2.secure = true;
        } else if (key2 === "httponly") {
          cookie2.httpOnly = true;
        } else if (key2 === "samesite") {
          cookie2.sameSite = value2;
        } else {
          cookie2[key2] = value2;
        }
      });
      return cookie2;
    }
    function parseNameValuePair(nameValuePairStr) {
      var name6 = "";
      var value = "";
      var nameValueArr = nameValuePairStr.split("=");
      if (nameValueArr.length > 1) {
        name6 = nameValueArr.shift();
        value = nameValueArr.join("=");
      } else {
        value = nameValuePairStr;
      }
      return { name: name6, value };
    }
    function parse2(input, options) {
      options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
      if (!input) {
        if (!options.map) {
          return [];
        } else {
          return {};
        }
      }
      if (input.headers && input.headers["set-cookie"]) {
        input = input.headers["set-cookie"];
      } else if (input.headers) {
        var sch = input.headers[Object.keys(input.headers).find(function(key2) {
          return key2.toLowerCase() === "set-cookie";
        })];
        if (!sch && input.headers.cookie && !options.silent) {
          console.warn(
            "Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning."
          );
        }
        input = sch;
      }
      if (!Array.isArray(input)) {
        input = [input];
      }
      options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
      if (!options.map) {
        return input.filter(isNonEmptyString).map(function(str) {
          return parseString2(str, options);
        });
      } else {
        var cookies = {};
        return input.filter(isNonEmptyString).reduce(function(cookies2, str) {
          var cookie2 = parseString2(str, options);
          cookies2[cookie2.name] = cookie2;
          return cookies2;
        }, cookies);
      }
    }
    function splitCookiesString2(cookiesString) {
      if (Array.isArray(cookiesString)) {
        return cookiesString;
      }
      if (typeof cookiesString !== "string") {
        return [];
      }
      var cookiesStrings = [];
      var pos = 0;
      var start2;
      var ch;
      var lastComma;
      var nextStart;
      var cookiesSeparatorFound;
      function skipWhitespace() {
        while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
          pos += 1;
        }
        return pos < cookiesString.length;
      }
      function notSpecialChar() {
        ch = cookiesString.charAt(pos);
        return ch !== "=" && ch !== ";" && ch !== ",";
      }
      while (pos < cookiesString.length) {
        start2 = pos;
        cookiesSeparatorFound = false;
        while (skipWhitespace()) {
          ch = cookiesString.charAt(pos);
          if (ch === ",") {
            lastComma = pos;
            pos += 1;
            skipWhitespace();
            nextStart = pos;
            while (pos < cookiesString.length && notSpecialChar()) {
              pos += 1;
            }
            if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
              cookiesSeparatorFound = true;
              pos = nextStart;
              cookiesStrings.push(cookiesString.substring(start2, lastComma));
              start2 = pos;
            } else {
              pos = lastComma + 1;
            }
          } else {
            pos += 1;
          }
        }
        if (!cookiesSeparatorFound || pos >= cookiesString.length) {
          cookiesStrings.push(cookiesString.substring(start2, cookiesString.length));
        }
      }
      return cookiesStrings;
    }
    module.exports = parse2;
    module.exports.parse = parse2;
    module.exports.parseString = parseString2;
    module.exports.splitCookiesString = splitCookiesString2;
  }
});

// .svelte-kit/output/server/chunks/hooks.js
var hooks_exports = {};
var init_hooks = __esm({
  ".svelte-kit/output/server/chunks/hooks.js"() {
  }
});

// node_modules/@firebase/util/dist/index.esm2017.js
function getUA() {
  if (typeof navigator !== "undefined" && typeof navigator["userAgent"] === "string") {
    return navigator["userAgent"];
  } else {
    return "";
  }
}
function isMobileCordova() {
  return typeof window !== "undefined" && !!(window["cordova"] || window["phonegap"] || window["PhoneGap"]) && /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(getUA());
}
function isBrowserExtension() {
  const runtime = typeof chrome === "object" ? chrome.runtime : typeof browser === "object" ? browser.runtime : void 0;
  return typeof runtime === "object" && runtime.id !== void 0;
}
function isReactNative() {
  return typeof navigator === "object" && navigator["product"] === "ReactNative";
}
function isElectron() {
  return getUA().indexOf("Electron/") >= 0;
}
function isIE() {
  const ua2 = getUA();
  return ua2.indexOf("MSIE ") >= 0 || ua2.indexOf("Trident/") >= 0;
}
function isUWP() {
  return getUA().indexOf("MSAppHost/") >= 0;
}
function isIndexedDBAvailable() {
  return typeof indexedDB === "object";
}
function validateIndexedDBOpenable() {
  return new Promise((resolve2, reject) => {
    try {
      let preExist = true;
      const DB_CHECK_NAME = "validate-browser-context-for-indexeddb-analytics-module";
      const request = self.indexedDB.open(DB_CHECK_NAME);
      request.onsuccess = () => {
        request.result.close();
        if (!preExist) {
          self.indexedDB.deleteDatabase(DB_CHECK_NAME);
        }
        resolve2(true);
      };
      request.onupgradeneeded = () => {
        preExist = false;
      };
      request.onerror = () => {
        var _a;
        reject(((_a = request.error) === null || _a === void 0 ? void 0 : _a.message) || "");
      };
    } catch (error2) {
      reject(error2);
    }
  });
}
function replaceTemplate(template2, data) {
  return template2.replace(PATTERN, (_, key2) => {
    const value = data[key2];
    return value != null ? String(value) : `<${key2}?>`;
  });
}
function isEmpty(obj) {
  for (const key2 in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key2)) {
      return false;
    }
  }
  return true;
}
function deepEqual(a, b) {
  if (a === b) {
    return true;
  }
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  for (const k3 of aKeys) {
    if (!bKeys.includes(k3)) {
      return false;
    }
    const aProp = a[k3];
    const bProp = b[k3];
    if (isObject(aProp) && isObject(bProp)) {
      if (!deepEqual(aProp, bProp)) {
        return false;
      }
    } else if (aProp !== bProp) {
      return false;
    }
  }
  for (const k3 of bKeys) {
    if (!aKeys.includes(k3)) {
      return false;
    }
  }
  return true;
}
function isObject(thing) {
  return thing !== null && typeof thing === "object";
}
function querystring(querystringParams) {
  const params = [];
  for (const [key2, value] of Object.entries(querystringParams)) {
    if (Array.isArray(value)) {
      value.forEach((arrayVal) => {
        params.push(encodeURIComponent(key2) + "=" + encodeURIComponent(arrayVal));
      });
    } else {
      params.push(encodeURIComponent(key2) + "=" + encodeURIComponent(value));
    }
  }
  return params.length ? "&" + params.join("&") : "";
}
function querystringDecode(querystring2) {
  const obj = {};
  const tokens = querystring2.replace(/^\?/, "").split("&");
  tokens.forEach((token) => {
    if (token) {
      const [key2, value] = token.split("=");
      obj[decodeURIComponent(key2)] = decodeURIComponent(value);
    }
  });
  return obj;
}
function extractQuerystring(url) {
  const queryStart = url.indexOf("?");
  if (!queryStart) {
    return "";
  }
  const fragmentStart = url.indexOf("#", queryStart);
  return url.substring(queryStart, fragmentStart > 0 ? fragmentStart : void 0);
}
function createSubscribe(executor, onNoObservers) {
  const proxy = new ObserverProxy(executor, onNoObservers);
  return proxy.subscribe.bind(proxy);
}
function implementsAnyMethods(obj, methods) {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }
  for (const method of methods) {
    if (method in obj && typeof obj[method] === "function") {
      return true;
    }
  }
  return false;
}
function noop2() {
}
function getModularInstance(service) {
  if (service && service._delegate) {
    return service._delegate;
  } else {
    return service;
  }
}
var stringToByteArray$1, byteArrayToString, base642, base64Encode, base64urlEncodeWithoutPadding, base64Decode, Deferred, ERROR_NAME, FirebaseError, ErrorFactory, PATTERN, ObserverProxy, MAX_VALUE_MILLIS;
var init_index_esm2017 = __esm({
  "node_modules/@firebase/util/dist/index.esm2017.js"() {
    stringToByteArray$1 = function(str) {
      const out = [];
      let p2 = 0;
      for (let i = 0; i < str.length; i++) {
        let c = str.charCodeAt(i);
        if (c < 128) {
          out[p2++] = c;
        } else if (c < 2048) {
          out[p2++] = c >> 6 | 192;
          out[p2++] = c & 63 | 128;
        } else if ((c & 64512) === 55296 && i + 1 < str.length && (str.charCodeAt(i + 1) & 64512) === 56320) {
          c = 65536 + ((c & 1023) << 10) + (str.charCodeAt(++i) & 1023);
          out[p2++] = c >> 18 | 240;
          out[p2++] = c >> 12 & 63 | 128;
          out[p2++] = c >> 6 & 63 | 128;
          out[p2++] = c & 63 | 128;
        } else {
          out[p2++] = c >> 12 | 224;
          out[p2++] = c >> 6 & 63 | 128;
          out[p2++] = c & 63 | 128;
        }
      }
      return out;
    };
    byteArrayToString = function(bytes) {
      const out = [];
      let pos = 0, c = 0;
      while (pos < bytes.length) {
        const c1 = bytes[pos++];
        if (c1 < 128) {
          out[c++] = String.fromCharCode(c1);
        } else if (c1 > 191 && c1 < 224) {
          const c2 = bytes[pos++];
          out[c++] = String.fromCharCode((c1 & 31) << 6 | c2 & 63);
        } else if (c1 > 239 && c1 < 365) {
          const c2 = bytes[pos++];
          const c3 = bytes[pos++];
          const c4 = bytes[pos++];
          const u = ((c1 & 7) << 18 | (c2 & 63) << 12 | (c3 & 63) << 6 | c4 & 63) - 65536;
          out[c++] = String.fromCharCode(55296 + (u >> 10));
          out[c++] = String.fromCharCode(56320 + (u & 1023));
        } else {
          const c2 = bytes[pos++];
          const c3 = bytes[pos++];
          out[c++] = String.fromCharCode((c1 & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
        }
      }
      return out.join("");
    };
    base642 = {
      byteToCharMap_: null,
      charToByteMap_: null,
      byteToCharMapWebSafe_: null,
      charToByteMapWebSafe_: null,
      ENCODED_VALS_BASE: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
      get ENCODED_VALS() {
        return this.ENCODED_VALS_BASE + "+/=";
      },
      get ENCODED_VALS_WEBSAFE() {
        return this.ENCODED_VALS_BASE + "-_.";
      },
      HAS_NATIVE_SUPPORT: typeof atob === "function",
      encodeByteArray(input, webSafe) {
        if (!Array.isArray(input)) {
          throw Error("encodeByteArray takes an array as a parameter");
        }
        this.init_();
        const byteToCharMap = webSafe ? this.byteToCharMapWebSafe_ : this.byteToCharMap_;
        const output = [];
        for (let i = 0; i < input.length; i += 3) {
          const byte1 = input[i];
          const haveByte2 = i + 1 < input.length;
          const byte2 = haveByte2 ? input[i + 1] : 0;
          const haveByte3 = i + 2 < input.length;
          const byte3 = haveByte3 ? input[i + 2] : 0;
          const outByte1 = byte1 >> 2;
          const outByte2 = (byte1 & 3) << 4 | byte2 >> 4;
          let outByte3 = (byte2 & 15) << 2 | byte3 >> 6;
          let outByte4 = byte3 & 63;
          if (!haveByte3) {
            outByte4 = 64;
            if (!haveByte2) {
              outByte3 = 64;
            }
          }
          output.push(byteToCharMap[outByte1], byteToCharMap[outByte2], byteToCharMap[outByte3], byteToCharMap[outByte4]);
        }
        return output.join("");
      },
      encodeString(input, webSafe) {
        if (this.HAS_NATIVE_SUPPORT && !webSafe) {
          return btoa(input);
        }
        return this.encodeByteArray(stringToByteArray$1(input), webSafe);
      },
      decodeString(input, webSafe) {
        if (this.HAS_NATIVE_SUPPORT && !webSafe) {
          return atob(input);
        }
        return byteArrayToString(this.decodeStringToByteArray(input, webSafe));
      },
      decodeStringToByteArray(input, webSafe) {
        this.init_();
        const charToByteMap = webSafe ? this.charToByteMapWebSafe_ : this.charToByteMap_;
        const output = [];
        for (let i = 0; i < input.length; ) {
          const byte1 = charToByteMap[input.charAt(i++)];
          const haveByte2 = i < input.length;
          const byte2 = haveByte2 ? charToByteMap[input.charAt(i)] : 0;
          ++i;
          const haveByte3 = i < input.length;
          const byte3 = haveByte3 ? charToByteMap[input.charAt(i)] : 64;
          ++i;
          const haveByte4 = i < input.length;
          const byte4 = haveByte4 ? charToByteMap[input.charAt(i)] : 64;
          ++i;
          if (byte1 == null || byte2 == null || byte3 == null || byte4 == null) {
            throw Error();
          }
          const outByte1 = byte1 << 2 | byte2 >> 4;
          output.push(outByte1);
          if (byte3 !== 64) {
            const outByte2 = byte2 << 4 & 240 | byte3 >> 2;
            output.push(outByte2);
            if (byte4 !== 64) {
              const outByte3 = byte3 << 6 & 192 | byte4;
              output.push(outByte3);
            }
          }
        }
        return output;
      },
      init_() {
        if (!this.byteToCharMap_) {
          this.byteToCharMap_ = {};
          this.charToByteMap_ = {};
          this.byteToCharMapWebSafe_ = {};
          this.charToByteMapWebSafe_ = {};
          for (let i = 0; i < this.ENCODED_VALS.length; i++) {
            this.byteToCharMap_[i] = this.ENCODED_VALS.charAt(i);
            this.charToByteMap_[this.byteToCharMap_[i]] = i;
            this.byteToCharMapWebSafe_[i] = this.ENCODED_VALS_WEBSAFE.charAt(i);
            this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[i]] = i;
            if (i >= this.ENCODED_VALS_BASE.length) {
              this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(i)] = i;
              this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(i)] = i;
            }
          }
        }
      }
    };
    base64Encode = function(str) {
      const utf8Bytes = stringToByteArray$1(str);
      return base642.encodeByteArray(utf8Bytes, true);
    };
    base64urlEncodeWithoutPadding = function(str) {
      return base64Encode(str).replace(/\./g, "");
    };
    base64Decode = function(str) {
      try {
        return base642.decodeString(str, true);
      } catch (e) {
        console.error("base64Decode failed: ", e);
      }
      return null;
    };
    Deferred = class {
      constructor() {
        this.reject = () => {
        };
        this.resolve = () => {
        };
        this.promise = new Promise((resolve2, reject) => {
          this.resolve = resolve2;
          this.reject = reject;
        });
      }
      wrapCallback(callback) {
        return (error2, value) => {
          if (error2) {
            this.reject(error2);
          } else {
            this.resolve(value);
          }
          if (typeof callback === "function") {
            this.promise.catch(() => {
            });
            if (callback.length === 1) {
              callback(error2);
            } else {
              callback(error2, value);
            }
          }
        };
      }
    };
    ERROR_NAME = "FirebaseError";
    FirebaseError = class extends Error {
      constructor(code, message, customData) {
        super(message);
        this.code = code;
        this.customData = customData;
        this.name = ERROR_NAME;
        Object.setPrototypeOf(this, FirebaseError.prototype);
        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, ErrorFactory.prototype.create);
        }
      }
    };
    ErrorFactory = class {
      constructor(service, serviceName, errors) {
        this.service = service;
        this.serviceName = serviceName;
        this.errors = errors;
      }
      create(code, ...data) {
        const customData = data[0] || {};
        const fullCode = `${this.service}/${code}`;
        const template2 = this.errors[code];
        const message = template2 ? replaceTemplate(template2, customData) : "Error";
        const fullMessage = `${this.serviceName}: ${message} (${fullCode}).`;
        const error2 = new FirebaseError(fullCode, fullMessage, customData);
        return error2;
      }
    };
    PATTERN = /\{\$([^}]+)}/g;
    ObserverProxy = class {
      constructor(executor, onNoObservers) {
        this.observers = [];
        this.unsubscribes = [];
        this.observerCount = 0;
        this.task = Promise.resolve();
        this.finalized = false;
        this.onNoObservers = onNoObservers;
        this.task.then(() => {
          executor(this);
        }).catch((e) => {
          this.error(e);
        });
      }
      next(value) {
        this.forEachObserver((observer) => {
          observer.next(value);
        });
      }
      error(error2) {
        this.forEachObserver((observer) => {
          observer.error(error2);
        });
        this.close(error2);
      }
      complete() {
        this.forEachObserver((observer) => {
          observer.complete();
        });
        this.close();
      }
      subscribe(nextOrObserver, error2, complete) {
        let observer;
        if (nextOrObserver === void 0 && error2 === void 0 && complete === void 0) {
          throw new Error("Missing Observer.");
        }
        if (implementsAnyMethods(nextOrObserver, [
          "next",
          "error",
          "complete"
        ])) {
          observer = nextOrObserver;
        } else {
          observer = {
            next: nextOrObserver,
            error: error2,
            complete
          };
        }
        if (observer.next === void 0) {
          observer.next = noop2;
        }
        if (observer.error === void 0) {
          observer.error = noop2;
        }
        if (observer.complete === void 0) {
          observer.complete = noop2;
        }
        const unsub = this.unsubscribeOne.bind(this, this.observers.length);
        if (this.finalized) {
          this.task.then(() => {
            try {
              if (this.finalError) {
                observer.error(this.finalError);
              } else {
                observer.complete();
              }
            } catch (e) {
            }
            return;
          });
        }
        this.observers.push(observer);
        return unsub;
      }
      unsubscribeOne(i) {
        if (this.observers === void 0 || this.observers[i] === void 0) {
          return;
        }
        delete this.observers[i];
        this.observerCount -= 1;
        if (this.observerCount === 0 && this.onNoObservers !== void 0) {
          this.onNoObservers(this);
        }
      }
      forEachObserver(fn2) {
        if (this.finalized) {
          return;
        }
        for (let i = 0; i < this.observers.length; i++) {
          this.sendOne(i, fn2);
        }
      }
      sendOne(i, fn2) {
        this.task.then(() => {
          if (this.observers !== void 0 && this.observers[i] !== void 0) {
            try {
              fn2(this.observers[i]);
            } catch (e) {
              if (typeof console !== "undefined" && console.error) {
                console.error(e);
              }
            }
          }
        });
      }
      close(err) {
        if (this.finalized) {
          return;
        }
        this.finalized = true;
        if (err !== void 0) {
          this.finalError = err;
        }
        this.task.then(() => {
          this.observers = void 0;
          this.onNoObservers = void 0;
        });
      }
    };
    MAX_VALUE_MILLIS = 4 * 60 * 60 * 1e3;
  }
});

// node_modules/@firebase/component/dist/esm/index.esm2017.js
function normalizeIdentifierForFactory(identifier) {
  return identifier === DEFAULT_ENTRY_NAME ? void 0 : identifier;
}
function isComponentEager(component16) {
  return component16.instantiationMode === "EAGER";
}
var Component, DEFAULT_ENTRY_NAME, Provider, ComponentContainer;
var init_index_esm20172 = __esm({
  "node_modules/@firebase/component/dist/esm/index.esm2017.js"() {
    init_index_esm2017();
    Component = class {
      constructor(name6, instanceFactory, type) {
        this.name = name6;
        this.instanceFactory = instanceFactory;
        this.type = type;
        this.multipleInstances = false;
        this.serviceProps = {};
        this.instantiationMode = "LAZY";
        this.onInstanceCreated = null;
      }
      setInstantiationMode(mode) {
        this.instantiationMode = mode;
        return this;
      }
      setMultipleInstances(multipleInstances) {
        this.multipleInstances = multipleInstances;
        return this;
      }
      setServiceProps(props) {
        this.serviceProps = props;
        return this;
      }
      setInstanceCreatedCallback(callback) {
        this.onInstanceCreated = callback;
        return this;
      }
    };
    DEFAULT_ENTRY_NAME = "[DEFAULT]";
    Provider = class {
      constructor(name6, container) {
        this.name = name6;
        this.container = container;
        this.component = null;
        this.instances = /* @__PURE__ */ new Map();
        this.instancesDeferred = /* @__PURE__ */ new Map();
        this.instancesOptions = /* @__PURE__ */ new Map();
        this.onInitCallbacks = /* @__PURE__ */ new Map();
      }
      get(identifier) {
        const normalizedIdentifier = this.normalizeInstanceIdentifier(identifier);
        if (!this.instancesDeferred.has(normalizedIdentifier)) {
          const deferred = new Deferred();
          this.instancesDeferred.set(normalizedIdentifier, deferred);
          if (this.isInitialized(normalizedIdentifier) || this.shouldAutoInitialize()) {
            try {
              const instance = this.getOrInitializeService({
                instanceIdentifier: normalizedIdentifier
              });
              if (instance) {
                deferred.resolve(instance);
              }
            } catch (e) {
            }
          }
        }
        return this.instancesDeferred.get(normalizedIdentifier).promise;
      }
      getImmediate(options) {
        var _a;
        const normalizedIdentifier = this.normalizeInstanceIdentifier(options === null || options === void 0 ? void 0 : options.identifier);
        const optional = (_a = options === null || options === void 0 ? void 0 : options.optional) !== null && _a !== void 0 ? _a : false;
        if (this.isInitialized(normalizedIdentifier) || this.shouldAutoInitialize()) {
          try {
            return this.getOrInitializeService({
              instanceIdentifier: normalizedIdentifier
            });
          } catch (e) {
            if (optional) {
              return null;
            } else {
              throw e;
            }
          }
        } else {
          if (optional) {
            return null;
          } else {
            throw Error(`Service ${this.name} is not available`);
          }
        }
      }
      getComponent() {
        return this.component;
      }
      setComponent(component16) {
        if (component16.name !== this.name) {
          throw Error(`Mismatching Component ${component16.name} for Provider ${this.name}.`);
        }
        if (this.component) {
          throw Error(`Component for ${this.name} has already been provided`);
        }
        this.component = component16;
        if (!this.shouldAutoInitialize()) {
          return;
        }
        if (isComponentEager(component16)) {
          try {
            this.getOrInitializeService({ instanceIdentifier: DEFAULT_ENTRY_NAME });
          } catch (e) {
          }
        }
        for (const [instanceIdentifier, instanceDeferred] of this.instancesDeferred.entries()) {
          const normalizedIdentifier = this.normalizeInstanceIdentifier(instanceIdentifier);
          try {
            const instance = this.getOrInitializeService({
              instanceIdentifier: normalizedIdentifier
            });
            instanceDeferred.resolve(instance);
          } catch (e) {
          }
        }
      }
      clearInstance(identifier = DEFAULT_ENTRY_NAME) {
        this.instancesDeferred.delete(identifier);
        this.instancesOptions.delete(identifier);
        this.instances.delete(identifier);
      }
      async delete() {
        const services = Array.from(this.instances.values());
        await Promise.all([
          ...services.filter((service) => "INTERNAL" in service).map((service) => service.INTERNAL.delete()),
          ...services.filter((service) => "_delete" in service).map((service) => service._delete())
        ]);
      }
      isComponentSet() {
        return this.component != null;
      }
      isInitialized(identifier = DEFAULT_ENTRY_NAME) {
        return this.instances.has(identifier);
      }
      getOptions(identifier = DEFAULT_ENTRY_NAME) {
        return this.instancesOptions.get(identifier) || {};
      }
      initialize(opts = {}) {
        const { options = {} } = opts;
        const normalizedIdentifier = this.normalizeInstanceIdentifier(opts.instanceIdentifier);
        if (this.isInitialized(normalizedIdentifier)) {
          throw Error(`${this.name}(${normalizedIdentifier}) has already been initialized`);
        }
        if (!this.isComponentSet()) {
          throw Error(`Component ${this.name} has not been registered yet`);
        }
        const instance = this.getOrInitializeService({
          instanceIdentifier: normalizedIdentifier,
          options
        });
        for (const [instanceIdentifier, instanceDeferred] of this.instancesDeferred.entries()) {
          const normalizedDeferredIdentifier = this.normalizeInstanceIdentifier(instanceIdentifier);
          if (normalizedIdentifier === normalizedDeferredIdentifier) {
            instanceDeferred.resolve(instance);
          }
        }
        return instance;
      }
      onInit(callback, identifier) {
        var _a;
        const normalizedIdentifier = this.normalizeInstanceIdentifier(identifier);
        const existingCallbacks = (_a = this.onInitCallbacks.get(normalizedIdentifier)) !== null && _a !== void 0 ? _a : /* @__PURE__ */ new Set();
        existingCallbacks.add(callback);
        this.onInitCallbacks.set(normalizedIdentifier, existingCallbacks);
        const existingInstance = this.instances.get(normalizedIdentifier);
        if (existingInstance) {
          callback(existingInstance, normalizedIdentifier);
        }
        return () => {
          existingCallbacks.delete(callback);
        };
      }
      invokeOnInitCallbacks(instance, identifier) {
        const callbacks = this.onInitCallbacks.get(identifier);
        if (!callbacks) {
          return;
        }
        for (const callback of callbacks) {
          try {
            callback(instance, identifier);
          } catch (_a) {
          }
        }
      }
      getOrInitializeService({ instanceIdentifier, options = {} }) {
        let instance = this.instances.get(instanceIdentifier);
        if (!instance && this.component) {
          instance = this.component.instanceFactory(this.container, {
            instanceIdentifier: normalizeIdentifierForFactory(instanceIdentifier),
            options
          });
          this.instances.set(instanceIdentifier, instance);
          this.instancesOptions.set(instanceIdentifier, options);
          this.invokeOnInitCallbacks(instance, instanceIdentifier);
          if (this.component.onInstanceCreated) {
            try {
              this.component.onInstanceCreated(this.container, instanceIdentifier, instance);
            } catch (_a) {
            }
          }
        }
        return instance || null;
      }
      normalizeInstanceIdentifier(identifier = DEFAULT_ENTRY_NAME) {
        if (this.component) {
          return this.component.multipleInstances ? identifier : DEFAULT_ENTRY_NAME;
        } else {
          return identifier;
        }
      }
      shouldAutoInitialize() {
        return !!this.component && this.component.instantiationMode !== "EXPLICIT";
      }
    };
    ComponentContainer = class {
      constructor(name6) {
        this.name = name6;
        this.providers = /* @__PURE__ */ new Map();
      }
      addComponent(component16) {
        const provider = this.getProvider(component16.name);
        if (provider.isComponentSet()) {
          throw new Error(`Component ${component16.name} has already been registered with ${this.name}`);
        }
        provider.setComponent(component16);
      }
      addOrOverwriteComponent(component16) {
        const provider = this.getProvider(component16.name);
        if (provider.isComponentSet()) {
          this.providers.delete(component16.name);
        }
        this.addComponent(component16);
      }
      getProvider(name6) {
        if (this.providers.has(name6)) {
          return this.providers.get(name6);
        }
        const provider = new Provider(name6, this);
        this.providers.set(name6, provider);
        return provider;
      }
      getProviders() {
        return Array.from(this.providers.values());
      }
    };
  }
});

// node_modules/@firebase/logger/dist/esm/index.esm2017.js
var instances, LogLevel, levelStringToEnum, defaultLogLevel, ConsoleMethod, defaultLogHandler, Logger;
var init_index_esm20173 = __esm({
  "node_modules/@firebase/logger/dist/esm/index.esm2017.js"() {
    instances = [];
    (function(LogLevel2) {
      LogLevel2[LogLevel2["DEBUG"] = 0] = "DEBUG";
      LogLevel2[LogLevel2["VERBOSE"] = 1] = "VERBOSE";
      LogLevel2[LogLevel2["INFO"] = 2] = "INFO";
      LogLevel2[LogLevel2["WARN"] = 3] = "WARN";
      LogLevel2[LogLevel2["ERROR"] = 4] = "ERROR";
      LogLevel2[LogLevel2["SILENT"] = 5] = "SILENT";
    })(LogLevel || (LogLevel = {}));
    levelStringToEnum = {
      "debug": LogLevel.DEBUG,
      "verbose": LogLevel.VERBOSE,
      "info": LogLevel.INFO,
      "warn": LogLevel.WARN,
      "error": LogLevel.ERROR,
      "silent": LogLevel.SILENT
    };
    defaultLogLevel = LogLevel.INFO;
    ConsoleMethod = {
      [LogLevel.DEBUG]: "log",
      [LogLevel.VERBOSE]: "log",
      [LogLevel.INFO]: "info",
      [LogLevel.WARN]: "warn",
      [LogLevel.ERROR]: "error"
    };
    defaultLogHandler = (instance, logType, ...args) => {
      if (logType < instance.logLevel) {
        return;
      }
      const now = new Date().toISOString();
      const method = ConsoleMethod[logType];
      if (method) {
        console[method](`[${now}]  ${instance.name}:`, ...args);
      } else {
        throw new Error(`Attempted to log a message with an invalid logType (value: ${logType})`);
      }
    };
    Logger = class {
      constructor(name6) {
        this.name = name6;
        this._logLevel = defaultLogLevel;
        this._logHandler = defaultLogHandler;
        this._userLogHandler = null;
        instances.push(this);
      }
      get logLevel() {
        return this._logLevel;
      }
      set logLevel(val) {
        if (!(val in LogLevel)) {
          throw new TypeError(`Invalid value "${val}" assigned to \`logLevel\``);
        }
        this._logLevel = val;
      }
      setLogLevel(val) {
        this._logLevel = typeof val === "string" ? levelStringToEnum[val] : val;
      }
      get logHandler() {
        return this._logHandler;
      }
      set logHandler(val) {
        if (typeof val !== "function") {
          throw new TypeError("Value assigned to `logHandler` must be a function");
        }
        this._logHandler = val;
      }
      get userLogHandler() {
        return this._userLogHandler;
      }
      set userLogHandler(val) {
        this._userLogHandler = val;
      }
      debug(...args) {
        this._userLogHandler && this._userLogHandler(this, LogLevel.DEBUG, ...args);
        this._logHandler(this, LogLevel.DEBUG, ...args);
      }
      log(...args) {
        this._userLogHandler && this._userLogHandler(this, LogLevel.VERBOSE, ...args);
        this._logHandler(this, LogLevel.VERBOSE, ...args);
      }
      info(...args) {
        this._userLogHandler && this._userLogHandler(this, LogLevel.INFO, ...args);
        this._logHandler(this, LogLevel.INFO, ...args);
      }
      warn(...args) {
        this._userLogHandler && this._userLogHandler(this, LogLevel.WARN, ...args);
        this._logHandler(this, LogLevel.WARN, ...args);
      }
      error(...args) {
        this._userLogHandler && this._userLogHandler(this, LogLevel.ERROR, ...args);
        this._logHandler(this, LogLevel.ERROR, ...args);
      }
    };
  }
});

// node_modules/idb/build/wrap-idb-value.js
function getIdbProxyableTypes() {
  return idbProxyableTypes || (idbProxyableTypes = [
    IDBDatabase,
    IDBObjectStore,
    IDBIndex,
    IDBCursor,
    IDBTransaction
  ]);
}
function getCursorAdvanceMethods() {
  return cursorAdvanceMethods || (cursorAdvanceMethods = [
    IDBCursor.prototype.advance,
    IDBCursor.prototype.continue,
    IDBCursor.prototype.continuePrimaryKey
  ]);
}
function promisifyRequest(request) {
  const promise = new Promise((resolve2, reject) => {
    const unlisten = () => {
      request.removeEventListener("success", success);
      request.removeEventListener("error", error2);
    };
    const success = () => {
      resolve2(wrap(request.result));
      unlisten();
    };
    const error2 = () => {
      reject(request.error);
      unlisten();
    };
    request.addEventListener("success", success);
    request.addEventListener("error", error2);
  });
  promise.then((value) => {
    if (value instanceof IDBCursor) {
      cursorRequestMap.set(value, request);
    }
  }).catch(() => {
  });
  reverseTransformCache.set(promise, request);
  return promise;
}
function cacheDonePromiseForTransaction(tx) {
  if (transactionDoneMap.has(tx))
    return;
  const done = new Promise((resolve2, reject) => {
    const unlisten = () => {
      tx.removeEventListener("complete", complete);
      tx.removeEventListener("error", error2);
      tx.removeEventListener("abort", error2);
    };
    const complete = () => {
      resolve2();
      unlisten();
    };
    const error2 = () => {
      reject(tx.error || new DOMException("AbortError", "AbortError"));
      unlisten();
    };
    tx.addEventListener("complete", complete);
    tx.addEventListener("error", error2);
    tx.addEventListener("abort", error2);
  });
  transactionDoneMap.set(tx, done);
}
function replaceTraps(callback) {
  idbProxyTraps = callback(idbProxyTraps);
}
function wrapFunction(func) {
  if (func === IDBDatabase.prototype.transaction && !("objectStoreNames" in IDBTransaction.prototype)) {
    return function(storeNames, ...args) {
      const tx = func.call(unwrap(this), storeNames, ...args);
      transactionStoreNamesMap.set(tx, storeNames.sort ? storeNames.sort() : [storeNames]);
      return wrap(tx);
    };
  }
  if (getCursorAdvanceMethods().includes(func)) {
    return function(...args) {
      func.apply(unwrap(this), args);
      return wrap(cursorRequestMap.get(this));
    };
  }
  return function(...args) {
    return wrap(func.apply(unwrap(this), args));
  };
}
function transformCachableValue(value) {
  if (typeof value === "function")
    return wrapFunction(value);
  if (value instanceof IDBTransaction)
    cacheDonePromiseForTransaction(value);
  if (instanceOfAny(value, getIdbProxyableTypes()))
    return new Proxy(value, idbProxyTraps);
  return value;
}
function wrap(value) {
  if (value instanceof IDBRequest)
    return promisifyRequest(value);
  if (transformCache.has(value))
    return transformCache.get(value);
  const newValue = transformCachableValue(value);
  if (newValue !== value) {
    transformCache.set(value, newValue);
    reverseTransformCache.set(newValue, value);
  }
  return newValue;
}
var instanceOfAny, idbProxyableTypes, cursorAdvanceMethods, cursorRequestMap, transactionDoneMap, transactionStoreNamesMap, transformCache, reverseTransformCache, idbProxyTraps, unwrap;
var init_wrap_idb_value = __esm({
  "node_modules/idb/build/wrap-idb-value.js"() {
    instanceOfAny = (object, constructors) => constructors.some((c) => object instanceof c);
    cursorRequestMap = /* @__PURE__ */ new WeakMap();
    transactionDoneMap = /* @__PURE__ */ new WeakMap();
    transactionStoreNamesMap = /* @__PURE__ */ new WeakMap();
    transformCache = /* @__PURE__ */ new WeakMap();
    reverseTransformCache = /* @__PURE__ */ new WeakMap();
    idbProxyTraps = {
      get(target, prop, receiver) {
        if (target instanceof IDBTransaction) {
          if (prop === "done")
            return transactionDoneMap.get(target);
          if (prop === "objectStoreNames") {
            return target.objectStoreNames || transactionStoreNamesMap.get(target);
          }
          if (prop === "store") {
            return receiver.objectStoreNames[1] ? void 0 : receiver.objectStore(receiver.objectStoreNames[0]);
          }
        }
        return wrap(target[prop]);
      },
      set(target, prop, value) {
        target[prop] = value;
        return true;
      },
      has(target, prop) {
        if (target instanceof IDBTransaction && (prop === "done" || prop === "store")) {
          return true;
        }
        return prop in target;
      }
    };
    unwrap = (value) => reverseTransformCache.get(value);
  }
});

// node_modules/idb/build/index.js
function openDB(name6, version6, { blocked, upgrade, blocking, terminated } = {}) {
  const request = indexedDB.open(name6, version6);
  const openPromise = wrap(request);
  if (upgrade) {
    request.addEventListener("upgradeneeded", (event2) => {
      upgrade(wrap(request.result), event2.oldVersion, event2.newVersion, wrap(request.transaction));
    });
  }
  if (blocked)
    request.addEventListener("blocked", () => blocked());
  openPromise.then((db3) => {
    if (terminated)
      db3.addEventListener("close", () => terminated());
    if (blocking)
      db3.addEventListener("versionchange", () => blocking());
  }).catch(() => {
  });
  return openPromise;
}
function getMethod(target, prop) {
  if (!(target instanceof IDBDatabase && !(prop in target) && typeof prop === "string")) {
    return;
  }
  if (cachedMethods.get(prop))
    return cachedMethods.get(prop);
  const targetFuncName = prop.replace(/FromIndex$/, "");
  const useIndex = prop !== targetFuncName;
  const isWrite = writeMethods.includes(targetFuncName);
  if (!(targetFuncName in (useIndex ? IDBIndex : IDBObjectStore).prototype) || !(isWrite || readMethods.includes(targetFuncName))) {
    return;
  }
  const method = async function(storeName, ...args) {
    const tx = this.transaction(storeName, isWrite ? "readwrite" : "readonly");
    let target2 = tx.store;
    if (useIndex)
      target2 = target2.index(args.shift());
    return (await Promise.all([
      target2[targetFuncName](...args),
      isWrite && tx.done
    ]))[0];
  };
  cachedMethods.set(prop, method);
  return method;
}
var readMethods, writeMethods, cachedMethods;
var init_build = __esm({
  "node_modules/idb/build/index.js"() {
    init_wrap_idb_value();
    init_wrap_idb_value();
    readMethods = ["get", "getKey", "getAll", "getAllKeys", "count"];
    writeMethods = ["put", "add", "delete", "clear"];
    cachedMethods = /* @__PURE__ */ new Map();
    replaceTraps((oldTraps) => ({
      ...oldTraps,
      get: (target, prop, receiver) => getMethod(target, prop) || oldTraps.get(target, prop, receiver),
      has: (target, prop) => !!getMethod(target, prop) || oldTraps.has(target, prop)
    }));
  }
});

// node_modules/@firebase/app/dist/esm/index.esm2017.js
function isVersionServiceProvider(provider) {
  const component16 = provider.getComponent();
  return (component16 === null || component16 === void 0 ? void 0 : component16.type) === "VERSION";
}
function _addComponent(app, component16) {
  try {
    app.container.addComponent(component16);
  } catch (e) {
    logger.debug(`Component ${component16.name} failed to register with FirebaseApp ${app.name}`, e);
  }
}
function _registerComponent(component16) {
  const componentName = component16.name;
  if (_components.has(componentName)) {
    logger.debug(`There were multiple attempts to register component ${componentName}.`);
    return false;
  }
  _components.set(componentName, component16);
  for (const app of _apps.values()) {
    _addComponent(app, component16);
  }
  return true;
}
function _getProvider(app, name6) {
  const heartbeatController = app.container.getProvider("heartbeat").getImmediate({ optional: true });
  if (heartbeatController) {
    void heartbeatController.triggerHeartbeat();
  }
  return app.container.getProvider(name6);
}
function initializeApp(options, rawConfig = {}) {
  if (typeof rawConfig !== "object") {
    const name7 = rawConfig;
    rawConfig = { name: name7 };
  }
  const config2 = Object.assign({ name: DEFAULT_ENTRY_NAME2, automaticDataCollectionEnabled: false }, rawConfig);
  const name6 = config2.name;
  if (typeof name6 !== "string" || !name6) {
    throw ERROR_FACTORY.create("bad-app-name", {
      appName: String(name6)
    });
  }
  const existingApp = _apps.get(name6);
  if (existingApp) {
    if (deepEqual(options, existingApp.options) && deepEqual(config2, existingApp.config)) {
      return existingApp;
    } else {
      throw ERROR_FACTORY.create("duplicate-app", { appName: name6 });
    }
  }
  const container = new ComponentContainer(name6);
  for (const component16 of _components.values()) {
    container.addComponent(component16);
  }
  const newApp = new FirebaseAppImpl(options, config2, container);
  _apps.set(name6, newApp);
  return newApp;
}
function getApp(name6 = DEFAULT_ENTRY_NAME2) {
  const app = _apps.get(name6);
  if (!app) {
    throw ERROR_FACTORY.create("no-app", { appName: name6 });
  }
  return app;
}
function getApps() {
  return Array.from(_apps.values());
}
function registerVersion(libraryKeyOrName, version6, variant) {
  var _a;
  let library = (_a = PLATFORM_LOG_STRING[libraryKeyOrName]) !== null && _a !== void 0 ? _a : libraryKeyOrName;
  if (variant) {
    library += `-${variant}`;
  }
  const libraryMismatch = library.match(/\s|\//);
  const versionMismatch = version6.match(/\s|\//);
  if (libraryMismatch || versionMismatch) {
    const warning = [
      `Unable to register library "${library}" with version "${version6}":`
    ];
    if (libraryMismatch) {
      warning.push(`library name "${library}" contains illegal characters (whitespace or "/")`);
    }
    if (libraryMismatch && versionMismatch) {
      warning.push("and");
    }
    if (versionMismatch) {
      warning.push(`version name "${version6}" contains illegal characters (whitespace or "/")`);
    }
    logger.warn(warning.join(" "));
    return;
  }
  _registerComponent(new Component(`${library}-version`, () => ({ library, version: version6 }), "VERSION"));
}
function getDbPromise() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade: (db3, oldVersion) => {
        switch (oldVersion) {
          case 0:
            db3.createObjectStore(STORE_NAME);
        }
      }
    }).catch((e) => {
      throw ERROR_FACTORY.create("idb-open", {
        originalErrorMessage: e.message
      });
    });
  }
  return dbPromise;
}
async function readHeartbeatsFromIndexedDB(app) {
  var _a;
  try {
    const db3 = await getDbPromise();
    return db3.transaction(STORE_NAME).objectStore(STORE_NAME).get(computeKey(app));
  } catch (e) {
    if (e instanceof FirebaseError) {
      logger.warn(e.message);
    } else {
      const idbGetError = ERROR_FACTORY.create("idb-get", {
        originalErrorMessage: (_a = e) === null || _a === void 0 ? void 0 : _a.message
      });
      logger.warn(idbGetError.message);
    }
  }
}
async function writeHeartbeatsToIndexedDB(app, heartbeatObject) {
  var _a;
  try {
    const db3 = await getDbPromise();
    const tx = db3.transaction(STORE_NAME, "readwrite");
    const objectStore = tx.objectStore(STORE_NAME);
    await objectStore.put(heartbeatObject, computeKey(app));
    return tx.done;
  } catch (e) {
    if (e instanceof FirebaseError) {
      logger.warn(e.message);
    } else {
      const idbGetError = ERROR_FACTORY.create("idb-set", {
        originalErrorMessage: (_a = e) === null || _a === void 0 ? void 0 : _a.message
      });
      logger.warn(idbGetError.message);
    }
  }
}
function computeKey(app) {
  return `${app.name}!${app.options.appId}`;
}
function getUTCDateString() {
  const today = new Date();
  return today.toISOString().substring(0, 10);
}
function extractHeartbeatsForHeader(heartbeatsCache, maxSize = MAX_HEADER_BYTES) {
  const heartbeatsToSend = [];
  let unsentEntries = heartbeatsCache.slice();
  for (const singleDateHeartbeat of heartbeatsCache) {
    const heartbeatEntry = heartbeatsToSend.find((hb2) => hb2.agent === singleDateHeartbeat.agent);
    if (!heartbeatEntry) {
      heartbeatsToSend.push({
        agent: singleDateHeartbeat.agent,
        dates: [singleDateHeartbeat.date]
      });
      if (countBytes(heartbeatsToSend) > maxSize) {
        heartbeatsToSend.pop();
        break;
      }
    } else {
      heartbeatEntry.dates.push(singleDateHeartbeat.date);
      if (countBytes(heartbeatsToSend) > maxSize) {
        heartbeatEntry.dates.pop();
        break;
      }
    }
    unsentEntries = unsentEntries.slice(1);
  }
  return {
    heartbeatsToSend,
    unsentEntries
  };
}
function countBytes(heartbeatsCache) {
  return base64urlEncodeWithoutPadding(
    JSON.stringify({ version: 2, heartbeats: heartbeatsCache })
  ).length;
}
function registerCoreComponents(variant) {
  _registerComponent(new Component("platform-logger", (container) => new PlatformLoggerServiceImpl(container), "PRIVATE"));
  _registerComponent(new Component("heartbeat", (container) => new HeartbeatServiceImpl(container), "PRIVATE"));
  registerVersion(name$o, version$1, variant);
  registerVersion(name$o, version$1, "esm2017");
  registerVersion("fire-js", "");
}
var PlatformLoggerServiceImpl, name$o, version$1, logger, name$n, name$m, name$l, name$k, name$j, name$i, name$h, name$g, name$f, name$e, name$d, name$c, name$b, name$a, name$9, name$8, name$7, name$6, name$5, name$4, name$3, name$2, name$1, name, version, DEFAULT_ENTRY_NAME2, PLATFORM_LOG_STRING, _apps, _components, ERRORS, ERROR_FACTORY, FirebaseAppImpl, SDK_VERSION, DB_NAME, DB_VERSION, STORE_NAME, dbPromise, MAX_HEADER_BYTES, STORED_HEARTBEAT_RETENTION_MAX_MILLIS, HeartbeatServiceImpl, HeartbeatStorageImpl;
var init_index_esm20174 = __esm({
  "node_modules/@firebase/app/dist/esm/index.esm2017.js"() {
    init_index_esm20172();
    init_index_esm20173();
    init_index_esm2017();
    init_index_esm2017();
    init_build();
    PlatformLoggerServiceImpl = class {
      constructor(container) {
        this.container = container;
      }
      getPlatformInfoString() {
        const providers = this.container.getProviders();
        return providers.map((provider) => {
          if (isVersionServiceProvider(provider)) {
            const service = provider.getImmediate();
            return `${service.library}/${service.version}`;
          } else {
            return null;
          }
        }).filter((logString) => logString).join(" ");
      }
    };
    name$o = "@firebase/app";
    version$1 = "0.7.32";
    logger = new Logger("@firebase/app");
    name$n = "@firebase/app-compat";
    name$m = "@firebase/analytics-compat";
    name$l = "@firebase/analytics";
    name$k = "@firebase/app-check-compat";
    name$j = "@firebase/app-check";
    name$i = "@firebase/auth";
    name$h = "@firebase/auth-compat";
    name$g = "@firebase/database";
    name$f = "@firebase/database-compat";
    name$e = "@firebase/functions";
    name$d = "@firebase/functions-compat";
    name$c = "@firebase/installations";
    name$b = "@firebase/installations-compat";
    name$a = "@firebase/messaging";
    name$9 = "@firebase/messaging-compat";
    name$8 = "@firebase/performance";
    name$7 = "@firebase/performance-compat";
    name$6 = "@firebase/remote-config";
    name$5 = "@firebase/remote-config-compat";
    name$4 = "@firebase/storage";
    name$3 = "@firebase/storage-compat";
    name$2 = "@firebase/firestore";
    name$1 = "@firebase/firestore-compat";
    name = "firebase";
    version = "9.9.4";
    DEFAULT_ENTRY_NAME2 = "[DEFAULT]";
    PLATFORM_LOG_STRING = {
      [name$o]: "fire-core",
      [name$n]: "fire-core-compat",
      [name$l]: "fire-analytics",
      [name$m]: "fire-analytics-compat",
      [name$j]: "fire-app-check",
      [name$k]: "fire-app-check-compat",
      [name$i]: "fire-auth",
      [name$h]: "fire-auth-compat",
      [name$g]: "fire-rtdb",
      [name$f]: "fire-rtdb-compat",
      [name$e]: "fire-fn",
      [name$d]: "fire-fn-compat",
      [name$c]: "fire-iid",
      [name$b]: "fire-iid-compat",
      [name$a]: "fire-fcm",
      [name$9]: "fire-fcm-compat",
      [name$8]: "fire-perf",
      [name$7]: "fire-perf-compat",
      [name$6]: "fire-rc",
      [name$5]: "fire-rc-compat",
      [name$4]: "fire-gcs",
      [name$3]: "fire-gcs-compat",
      [name$2]: "fire-fst",
      [name$1]: "fire-fst-compat",
      "fire-js": "fire-js",
      [name]: "fire-js-all"
    };
    _apps = /* @__PURE__ */ new Map();
    _components = /* @__PURE__ */ new Map();
    ERRORS = {
      ["no-app"]: "No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()",
      ["bad-app-name"]: "Illegal App name: '{$appName}",
      ["duplicate-app"]: "Firebase App named '{$appName}' already exists with different options or config",
      ["app-deleted"]: "Firebase App named '{$appName}' already deleted",
      ["invalid-app-argument"]: "firebase.{$appName}() takes either no argument or a Firebase App instance.",
      ["invalid-log-argument"]: "First argument to `onLog` must be null or a function.",
      ["idb-open"]: "Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.",
      ["idb-get"]: "Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.",
      ["idb-set"]: "Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.",
      ["idb-delete"]: "Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}."
    };
    ERROR_FACTORY = new ErrorFactory("app", "Firebase", ERRORS);
    FirebaseAppImpl = class {
      constructor(options, config2, container) {
        this._isDeleted = false;
        this._options = Object.assign({}, options);
        this._config = Object.assign({}, config2);
        this._name = config2.name;
        this._automaticDataCollectionEnabled = config2.automaticDataCollectionEnabled;
        this._container = container;
        this.container.addComponent(new Component("app", () => this, "PUBLIC"));
      }
      get automaticDataCollectionEnabled() {
        this.checkDestroyed();
        return this._automaticDataCollectionEnabled;
      }
      set automaticDataCollectionEnabled(val) {
        this.checkDestroyed();
        this._automaticDataCollectionEnabled = val;
      }
      get name() {
        this.checkDestroyed();
        return this._name;
      }
      get options() {
        this.checkDestroyed();
        return this._options;
      }
      get config() {
        this.checkDestroyed();
        return this._config;
      }
      get container() {
        return this._container;
      }
      get isDeleted() {
        return this._isDeleted;
      }
      set isDeleted(val) {
        this._isDeleted = val;
      }
      checkDestroyed() {
        if (this.isDeleted) {
          throw ERROR_FACTORY.create("app-deleted", { appName: this._name });
        }
      }
    };
    SDK_VERSION = version;
    DB_NAME = "firebase-heartbeat-database";
    DB_VERSION = 1;
    STORE_NAME = "firebase-heartbeat-store";
    dbPromise = null;
    MAX_HEADER_BYTES = 1024;
    STORED_HEARTBEAT_RETENTION_MAX_MILLIS = 30 * 24 * 60 * 60 * 1e3;
    HeartbeatServiceImpl = class {
      constructor(container) {
        this.container = container;
        this._heartbeatsCache = null;
        const app = this.container.getProvider("app").getImmediate();
        this._storage = new HeartbeatStorageImpl(app);
        this._heartbeatsCachePromise = this._storage.read().then((result) => {
          this._heartbeatsCache = result;
          return result;
        });
      }
      async triggerHeartbeat() {
        const platformLogger = this.container.getProvider("platform-logger").getImmediate();
        const agent = platformLogger.getPlatformInfoString();
        const date = getUTCDateString();
        if (this._heartbeatsCache === null) {
          this._heartbeatsCache = await this._heartbeatsCachePromise;
        }
        if (this._heartbeatsCache.lastSentHeartbeatDate === date || this._heartbeatsCache.heartbeats.some((singleDateHeartbeat) => singleDateHeartbeat.date === date)) {
          return;
        } else {
          this._heartbeatsCache.heartbeats.push({ date, agent });
        }
        this._heartbeatsCache.heartbeats = this._heartbeatsCache.heartbeats.filter((singleDateHeartbeat) => {
          const hbTimestamp = new Date(singleDateHeartbeat.date).valueOf();
          const now = Date.now();
          return now - hbTimestamp <= STORED_HEARTBEAT_RETENTION_MAX_MILLIS;
        });
        return this._storage.overwrite(this._heartbeatsCache);
      }
      async getHeartbeatsHeader() {
        if (this._heartbeatsCache === null) {
          await this._heartbeatsCachePromise;
        }
        if (this._heartbeatsCache === null || this._heartbeatsCache.heartbeats.length === 0) {
          return "";
        }
        const date = getUTCDateString();
        const { heartbeatsToSend, unsentEntries } = extractHeartbeatsForHeader(this._heartbeatsCache.heartbeats);
        const headerString = base64urlEncodeWithoutPadding(JSON.stringify({ version: 2, heartbeats: heartbeatsToSend }));
        this._heartbeatsCache.lastSentHeartbeatDate = date;
        if (unsentEntries.length > 0) {
          this._heartbeatsCache.heartbeats = unsentEntries;
          await this._storage.overwrite(this._heartbeatsCache);
        } else {
          this._heartbeatsCache.heartbeats = [];
          void this._storage.overwrite(this._heartbeatsCache);
        }
        return headerString;
      }
    };
    HeartbeatStorageImpl = class {
      constructor(app) {
        this.app = app;
        this._canUseIndexedDBPromise = this.runIndexedDBEnvironmentCheck();
      }
      async runIndexedDBEnvironmentCheck() {
        if (!isIndexedDBAvailable()) {
          return false;
        } else {
          return validateIndexedDBOpenable().then(() => true).catch(() => false);
        }
      }
      async read() {
        const canUseIndexedDB = await this._canUseIndexedDBPromise;
        if (!canUseIndexedDB) {
          return { heartbeats: [] };
        } else {
          const idbHeartbeatObject = await readHeartbeatsFromIndexedDB(this.app);
          return idbHeartbeatObject || { heartbeats: [] };
        }
      }
      async overwrite(heartbeatsObject) {
        var _a;
        const canUseIndexedDB = await this._canUseIndexedDBPromise;
        if (!canUseIndexedDB) {
          return;
        } else {
          const existingHeartbeatsObject = await this.read();
          return writeHeartbeatsToIndexedDB(this.app, {
            lastSentHeartbeatDate: (_a = heartbeatsObject.lastSentHeartbeatDate) !== null && _a !== void 0 ? _a : existingHeartbeatsObject.lastSentHeartbeatDate,
            heartbeats: heartbeatsObject.heartbeats
          });
        }
      }
      async add(heartbeatsObject) {
        var _a;
        const canUseIndexedDB = await this._canUseIndexedDBPromise;
        if (!canUseIndexedDB) {
          return;
        } else {
          const existingHeartbeatsObject = await this.read();
          return writeHeartbeatsToIndexedDB(this.app, {
            lastSentHeartbeatDate: (_a = heartbeatsObject.lastSentHeartbeatDate) !== null && _a !== void 0 ? _a : existingHeartbeatsObject.lastSentHeartbeatDate,
            heartbeats: [
              ...existingHeartbeatsObject.heartbeats,
              ...heartbeatsObject.heartbeats
            ]
          });
        }
      }
    };
    registerCoreComponents("");
  }
});

// node_modules/@firebase/webchannel-wrapper/dist/index.esm2017.js
function aa() {
}
function ba(a) {
  var b = typeof a;
  b = "object" != b ? b : a ? Array.isArray(a) ? "array" : b : "null";
  return "array" == b || "object" == b && "number" == typeof a.length;
}
function p(a) {
  var b = typeof a;
  return "object" == b && null != a || "function" == b;
}
function da(a) {
  return Object.prototype.hasOwnProperty.call(a, ea) && a[ea] || (a[ea] = ++fa);
}
function ha(a, b, c) {
  return a.call.apply(a.bind, arguments);
}
function ia(a, b, c) {
  if (!a)
    throw Error();
  if (2 < arguments.length) {
    var d = Array.prototype.slice.call(arguments, 2);
    return function() {
      var e = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply(e, d);
      return a.apply(b, e);
    };
  }
  return function() {
    return a.apply(b, arguments);
  };
}
function q(a, b, c) {
  Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? q = ha : q = ia;
  return q.apply(null, arguments);
}
function ja(a, b) {
  var c = Array.prototype.slice.call(arguments, 1);
  return function() {
    var d = c.slice();
    d.push.apply(d, arguments);
    return a.apply(this, d);
  };
}
function t(a, b) {
  function c() {
  }
  c.prototype = b.prototype;
  a.Z = b.prototype;
  a.prototype = new c();
  a.prototype.constructor = a;
  a.Vb = function(d, e, f) {
    for (var h = Array(arguments.length - 2), n = 2; n < arguments.length; n++)
      h[n - 2] = arguments[n];
    return b.prototype[e].apply(d, h);
  };
}
function v() {
  this.s = this.s;
  this.o = this.o;
}
function oa(a) {
  a: {
    var b = pa;
    const c = a.length, d = "string" === typeof a ? a.split("") : a;
    for (let e = 0; e < c; e++)
      if (e in d && b.call(void 0, d[e], e, a)) {
        b = e;
        break a;
      }
    b = -1;
  }
  return 0 > b ? null : "string" === typeof a ? a.charAt(b) : a[b];
}
function qa(a) {
  return Array.prototype.concat.apply([], arguments);
}
function ra(a) {
  const b = a.length;
  if (0 < b) {
    const c = Array(b);
    for (let d = 0; d < b; d++)
      c[d] = a[d];
    return c;
  }
  return [];
}
function sa(a) {
  return /^[\s\xa0]*$/.test(a);
}
function w(a, b) {
  return -1 != a.indexOf(b);
}
function ua(a, b) {
  return a < b ? -1 : a > b ? 1 : 0;
}
function xa(a, b, c) {
  for (const d in a)
    b.call(c, a[d], d, a);
}
function ya(a) {
  const b = {};
  for (const c in a)
    b[c] = a[c];
  return b;
}
function Aa(a, b) {
  let c, d;
  for (let e = 1; e < arguments.length; e++) {
    d = arguments[e];
    for (c in d)
      a[c] = d[c];
    for (let f = 0; f < za.length; f++)
      c = za[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c]);
  }
}
function Ca(a) {
  Ca[" "](a);
  return a;
}
function Fa(a) {
  var b = Ga;
  return Object.prototype.hasOwnProperty.call(b, 9) ? b[9] : b[9] = a(9);
}
function Ma() {
  var a = l.document;
  return a ? a.documentMode : void 0;
}
function Ra() {
  return Fa(function() {
    let a = 0;
    const b = ta(String(Na)).split("."), c = ta("9").split("."), d = Math.max(b.length, c.length);
    for (let h = 0; 0 == a && h < d; h++) {
      var e = b[h] || "", f = c[h] || "";
      do {
        e = /(\d*)(\D*)(.*)/.exec(e) || ["", "", "", ""];
        f = /(\d*)(\D*)(.*)/.exec(f) || ["", "", "", ""];
        if (0 == e[0].length && 0 == f[0].length)
          break;
        a = ua(0 == e[1].length ? 0 : parseInt(e[1], 10), 0 == f[1].length ? 0 : parseInt(f[1], 10)) || ua(0 == e[2].length, 0 == f[2].length) || ua(e[2], f[2]);
        e = e[3];
        f = f[3];
      } while (0 == a);
    }
    return 0 <= a;
  });
}
function z(a, b) {
  this.type = a;
  this.g = this.target = b;
  this.defaultPrevented = false;
}
function A(a, b) {
  z.call(this, a ? a.type : "");
  this.relatedTarget = this.g = this.target = null;
  this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0;
  this.key = "";
  this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = false;
  this.state = null;
  this.pointerId = 0;
  this.pointerType = "";
  this.i = null;
  if (a) {
    var c = this.type = a.type, d = a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : null;
    this.target = a.target || a.srcElement;
    this.g = b;
    if (b = a.relatedTarget) {
      if (Ka) {
        a: {
          try {
            Ca(b.nodeName);
            var e = true;
            break a;
          } catch (f) {
          }
          e = false;
        }
        e || (b = null);
      }
    } else
      "mouseover" == c ? b = a.fromElement : "mouseout" == c && (b = a.toElement);
    this.relatedTarget = b;
    d ? (this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX, this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY, this.screenX = d.screenX || 0, this.screenY = d.screenY || 0) : (this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX, this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY, this.screenX = a.screenX || 0, this.screenY = a.screenY || 0);
    this.button = a.button;
    this.key = a.key || "";
    this.ctrlKey = a.ctrlKey;
    this.altKey = a.altKey;
    this.shiftKey = a.shiftKey;
    this.metaKey = a.metaKey;
    this.pointerId = a.pointerId || 0;
    this.pointerType = "string" === typeof a.pointerType ? a.pointerType : Wa[a.pointerType] || "";
    this.state = a.state;
    this.i = a;
    a.defaultPrevented && A.Z.h.call(this);
  }
}
function Ya(a, b, c, d, e) {
  this.listener = a;
  this.proxy = null;
  this.src = b;
  this.type = c;
  this.capture = !!d;
  this.ia = e;
  this.key = ++Xa;
  this.ca = this.fa = false;
}
function Za(a) {
  a.ca = true;
  a.listener = null;
  a.proxy = null;
  a.src = null;
  a.ia = null;
}
function $a(a) {
  this.src = a;
  this.g = {};
  this.h = 0;
}
function bb(a, b) {
  var c = b.type;
  if (c in a.g) {
    var d = a.g[c], e = ma(d, b), f;
    (f = 0 <= e) && Array.prototype.splice.call(d, e, 1);
    f && (Za(b), 0 == a.g[c].length && (delete a.g[c], a.h--));
  }
}
function ab(a, b, c, d) {
  for (var e = 0; e < a.length; ++e) {
    var f = a[e];
    if (!f.ca && f.listener == b && f.capture == !!c && f.ia == d)
      return e;
  }
  return -1;
}
function fb(a, b, c, d, e) {
  if (d && d.once)
    return gb(a, b, c, d, e);
  if (Array.isArray(b)) {
    for (var f = 0; f < b.length; f++)
      fb(a, b[f], c, d, e);
    return null;
  }
  c = hb(c);
  return a && a[B] ? a.N(b, c, p(d) ? !!d.capture : !!d, e) : ib(a, b, c, false, d, e);
}
function ib(a, b, c, d, e, f) {
  if (!b)
    throw Error("Invalid event type");
  var h = p(e) ? !!e.capture : !!e, n = jb(a);
  n || (a[cb] = n = new $a(a));
  c = n.add(b, c, d, h, f);
  if (c.proxy)
    return c;
  d = kb();
  c.proxy = d;
  d.src = a;
  d.listener = c;
  if (a.addEventListener)
    Va || (e = h), void 0 === e && (e = false), a.addEventListener(b.toString(), d, e);
  else if (a.attachEvent)
    a.attachEvent(lb(b.toString()), d);
  else if (a.addListener && a.removeListener)
    a.addListener(d);
  else
    throw Error("addEventListener and attachEvent are unavailable.");
  return c;
}
function kb() {
  function a(c) {
    return b.call(a.src, a.listener, c);
  }
  var b = mb;
  return a;
}
function gb(a, b, c, d, e) {
  if (Array.isArray(b)) {
    for (var f = 0; f < b.length; f++)
      gb(a, b[f], c, d, e);
    return null;
  }
  c = hb(c);
  return a && a[B] ? a.O(b, c, p(d) ? !!d.capture : !!d, e) : ib(a, b, c, true, d, e);
}
function nb(a, b, c, d, e) {
  if (Array.isArray(b))
    for (var f = 0; f < b.length; f++)
      nb(a, b[f], c, d, e);
  else
    (d = p(d) ? !!d.capture : !!d, c = hb(c), a && a[B]) ? (a = a.i, b = String(b).toString(), b in a.g && (f = a.g[b], c = ab(f, c, d, e), -1 < c && (Za(f[c]), Array.prototype.splice.call(f, c, 1), 0 == f.length && (delete a.g[b], a.h--)))) : a && (a = jb(a)) && (b = a.g[b.toString()], a = -1, b && (a = ab(b, c, d, e)), (c = -1 < a ? b[a] : null) && ob(c));
}
function ob(a) {
  if ("number" !== typeof a && a && !a.ca) {
    var b = a.src;
    if (b && b[B])
      bb(b.i, a);
    else {
      var c = a.type, d = a.proxy;
      b.removeEventListener ? b.removeEventListener(c, d, a.capture) : b.detachEvent ? b.detachEvent(lb(c), d) : b.addListener && b.removeListener && b.removeListener(d);
      (c = jb(b)) ? (bb(c, a), 0 == c.h && (c.src = null, b[cb] = null)) : Za(a);
    }
  }
}
function lb(a) {
  return a in db ? db[a] : db[a] = "on" + a;
}
function mb(a, b) {
  if (a.ca)
    a = true;
  else {
    b = new A(b, this);
    var c = a.listener, d = a.ia || a.src;
    a.fa && ob(a);
    a = c.call(d, b);
  }
  return a;
}
function jb(a) {
  a = a[cb];
  return a instanceof $a ? a : null;
}
function hb(a) {
  if ("function" === typeof a)
    return a;
  a[pb] || (a[pb] = function(b) {
    return a.handleEvent(b);
  });
  return a[pb];
}
function C() {
  v.call(this);
  this.i = new $a(this);
  this.P = this;
  this.I = null;
}
function D(a, b) {
  var c, d = a.I;
  if (d)
    for (c = []; d; d = d.I)
      c.push(d);
  a = a.P;
  d = b.type || b;
  if ("string" === typeof b)
    b = new z(b, a);
  else if (b instanceof z)
    b.target = b.target || a;
  else {
    var e = b;
    b = new z(d, a);
    Aa(b, e);
  }
  e = true;
  if (c)
    for (var f = c.length - 1; 0 <= f; f--) {
      var h = b.g = c[f];
      e = qb(h, d, true, b) && e;
    }
  h = b.g = a;
  e = qb(h, d, true, b) && e;
  e = qb(h, d, false, b) && e;
  if (c)
    for (f = 0; f < c.length; f++)
      h = b.g = c[f], e = qb(h, d, false, b) && e;
}
function qb(a, b, c, d) {
  b = a.i.g[String(b)];
  if (!b)
    return true;
  b = b.concat();
  for (var e = true, f = 0; f < b.length; ++f) {
    var h = b[f];
    if (h && !h.ca && h.capture == c) {
      var n = h.listener, u = h.ia || h.src;
      h.fa && bb(a.i, h);
      e = false !== n.call(u, d) && e;
    }
  }
  return e && !d.defaultPrevented;
}
function sb() {
  var a = tb;
  let b = null;
  a.g && (b = a.g, a.g = a.g.next, a.g || (a.h = null), b.next = null);
  return b;
}
function yb(a) {
  l.setTimeout(() => {
    throw a;
  }, 0);
}
function zb(a, b) {
  Ab || Bb();
  Cb || (Ab(), Cb = true);
  tb.add(a, b);
}
function Bb() {
  var a = l.Promise.resolve(void 0);
  Ab = function() {
    a.then(Db);
  };
}
function Db() {
  for (var a; a = sb(); ) {
    try {
      a.h.call(a.g);
    } catch (c) {
      yb(c);
    }
    var b = vb;
    b.j(a);
    100 > b.h && (b.h++, a.next = b.g, b.g = a);
  }
  Cb = false;
}
function Eb(a, b) {
  C.call(this);
  this.h = a || 1;
  this.g = b || l;
  this.j = q(this.kb, this);
  this.l = Date.now();
}
function Fb(a) {
  a.da = false;
  a.S && (a.g.clearTimeout(a.S), a.S = null);
}
function Gb(a, b, c) {
  if ("function" === typeof a)
    c && (a = q(a, c));
  else if (a && "function" == typeof a.handleEvent)
    a = q(a.handleEvent, a);
  else
    throw Error("Invalid listener argument");
  return 2147483647 < Number(b) ? -1 : l.setTimeout(a, b || 0);
}
function Hb(a) {
  a.g = Gb(() => {
    a.g = null;
    a.i && (a.i = false, Hb(a));
  }, a.j);
  const b = a.h;
  a.h = null;
  a.m.apply(null, b);
}
function E(a) {
  v.call(this);
  this.h = a;
  this.g = {};
}
function Kb(a, b, c, d) {
  Array.isArray(c) || (c && (Jb[0] = c.toString()), c = Jb);
  for (var e = 0; e < c.length; e++) {
    var f = fb(b, c[e], d || a.handleEvent, false, a.h || a);
    if (!f)
      break;
    a.g[f.key] = f;
  }
}
function Lb(a) {
  xa(a.g, function(b, c) {
    this.g.hasOwnProperty(c) && ob(b);
  }, a);
  a.g = {};
}
function Mb() {
  this.g = true;
}
function Nb(a, b, c, d, e, f) {
  a.info(function() {
    if (a.g)
      if (f) {
        var h = "";
        for (var n = f.split("&"), u = 0; u < n.length; u++) {
          var m = n[u].split("=");
          if (1 < m.length) {
            var r = m[0];
            m = m[1];
            var G2 = r.split("_");
            h = 2 <= G2.length && "type" == G2[1] ? h + (r + "=" + m + "&") : h + (r + "=redacted&");
          }
        }
      } else
        h = null;
    else
      h = f;
    return "XMLHTTP REQ (" + d + ") [attempt " + e + "]: " + b + "\n" + c + "\n" + h;
  });
}
function Ob(a, b, c, d, e, f, h) {
  a.info(function() {
    return "XMLHTTP RESP (" + d + ") [ attempt " + e + "]: " + b + "\n" + c + "\n" + f + " " + h;
  });
}
function F(a, b, c, d) {
  a.info(function() {
    return "XMLHTTP TEXT (" + b + "): " + Pb(a, c) + (d ? " " + d : "");
  });
}
function Qb(a, b) {
  a.info(function() {
    return "TIMEOUT: " + b;
  });
}
function Pb(a, b) {
  if (!a.g)
    return b;
  if (!b)
    return null;
  try {
    var c = JSON.parse(b);
    if (c) {
      for (a = 0; a < c.length; a++)
        if (Array.isArray(c[a])) {
          var d = c[a];
          if (!(2 > d.length)) {
            var e = d[1];
            if (Array.isArray(e) && !(1 > e.length)) {
              var f = e[0];
              if ("noop" != f && "stop" != f && "close" != f)
                for (var h = 1; h < e.length; h++)
                  e[h] = "";
            }
          }
        }
    }
    return rb(c);
  } catch (n) {
    return b;
  }
}
function Sb() {
  return Rb = Rb || new C();
}
function Tb(a) {
  z.call(this, H.Ma, a);
}
function I(a) {
  const b = Sb();
  D(b, new Tb(b, a));
}
function Ub(a, b) {
  z.call(this, H.STAT_EVENT, a);
  this.stat = b;
}
function J(a) {
  const b = Sb();
  D(b, new Ub(b, a));
}
function Vb(a, b) {
  z.call(this, H.Na, a);
  this.size = b;
}
function K(a, b) {
  if ("function" !== typeof a)
    throw Error("Fn must not be null and must be a function");
  return l.setTimeout(function() {
    a();
  }, b);
}
function Yb() {
}
function Zb(a) {
  return a.h || (a.h = a.i());
}
function $b() {
}
function ac() {
  z.call(this, "d");
}
function bc() {
  z.call(this, "c");
}
function dc() {
}
function M(a, b, c, d) {
  this.l = a;
  this.j = b;
  this.m = c;
  this.X = d || 1;
  this.V = new E(this);
  this.P = ec;
  a = Ja ? 125 : void 0;
  this.W = new Eb(a);
  this.H = null;
  this.i = false;
  this.s = this.A = this.v = this.K = this.F = this.Y = this.B = null;
  this.D = [];
  this.g = null;
  this.C = 0;
  this.o = this.u = null;
  this.N = -1;
  this.I = false;
  this.O = 0;
  this.L = null;
  this.aa = this.J = this.$ = this.U = false;
  this.h = new fc();
}
function fc() {
  this.i = null;
  this.g = "";
  this.h = false;
}
function ic(a, b, c) {
  a.K = 1;
  a.v = jc(N(b));
  a.s = c;
  a.U = true;
  kc(a, null);
}
function kc(a, b) {
  a.F = Date.now();
  lc(a);
  a.A = N(a.v);
  var c = a.A, d = a.X;
  Array.isArray(d) || (d = [String(d)]);
  mc(c.h, "t", d);
  a.C = 0;
  c = a.l.H;
  a.h = new fc();
  a.g = nc(a.l, c ? b : null, !a.s);
  0 < a.O && (a.L = new Ib(q(a.Ia, a, a.g), a.O));
  Kb(a.V, a.g, "readystatechange", a.gb);
  b = a.H ? ya(a.H) : {};
  a.s ? (a.u || (a.u = "POST"), b["Content-Type"] = "application/x-www-form-urlencoded", a.g.ea(a.A, a.u, a.s, b)) : (a.u = "GET", a.g.ea(a.A, a.u, null, b));
  I(1);
  Nb(a.j, a.u, a.A, a.m, a.X, a.s);
}
function qc(a) {
  return a.g ? "GET" == a.u && 2 != a.K && a.l.Ba : false;
}
function tc(a, b, c) {
  let d = true, e;
  for (; !a.I && a.C < c.length; )
    if (e = vc(a, c), e == hc) {
      4 == b && (a.o = 4, J(14), d = false);
      F(a.j, a.m, null, "[Incomplete Response]");
      break;
    } else if (e == gc) {
      a.o = 4;
      J(15);
      F(a.j, a.m, c, "[Invalid Chunk]");
      d = false;
      break;
    } else
      F(a.j, a.m, e, null), sc(a, e);
  qc(a) && e != hc && e != gc && (a.h.g = "", a.C = 0);
  4 != b || 0 != c.length || a.h.h || (a.o = 1, J(16), d = false);
  a.i = a.i && d;
  d ? 0 < c.length && !a.aa && (a.aa = true, b = a.l, b.g == a && b.$ && !b.L && (b.h.info("Great, no buffering proxy detected. Bytes received: " + c.length), wc(b), b.L = true, J(11))) : (F(
    a.j,
    a.m,
    c,
    "[Invalid Chunked Response]"
  ), P(a), rc(a));
}
function vc(a, b) {
  var c = a.C, d = b.indexOf("\n", c);
  if (-1 == d)
    return hc;
  c = Number(b.substring(c, d));
  if (isNaN(c))
    return gc;
  d += 1;
  if (d + c > b.length)
    return hc;
  b = b.substr(d, c);
  a.C = d + c;
  return b;
}
function lc(a) {
  a.Y = Date.now() + a.P;
  xc(a, a.P);
}
function xc(a, b) {
  if (null != a.B)
    throw Error("WatchDog timer not null");
  a.B = K(q(a.eb, a), b);
}
function pc(a) {
  a.B && (l.clearTimeout(a.B), a.B = null);
}
function rc(a) {
  0 == a.l.G || a.I || uc(a.l, a);
}
function P(a) {
  pc(a);
  var b = a.L;
  b && "function" == typeof b.na && b.na();
  a.L = null;
  Fb(a.W);
  Lb(a.V);
  a.g && (b = a.g, a.g = null, b.abort(), b.na());
}
function sc(a, b) {
  try {
    var c = a.l;
    if (0 != c.G && (c.g == a || yc(c.i, a))) {
      if (c.I = a.N, !a.J && yc(c.i, a) && 3 == c.G) {
        try {
          var d = c.Ca.g.parse(b);
        } catch (m) {
          d = null;
        }
        if (Array.isArray(d) && 3 == d.length) {
          var e = d;
          if (0 == e[0])
            a: {
              if (!c.u) {
                if (c.g)
                  if (c.g.F + 3e3 < a.F)
                    zc(c), Ac(c);
                  else
                    break a;
                Bc(c);
                J(18);
              }
            }
          else
            c.ta = e[1], 0 < c.ta - c.U && 37500 > e[2] && c.N && 0 == c.A && !c.v && (c.v = K(q(c.ab, c), 6e3));
          if (1 >= Cc(c.i) && c.ka) {
            try {
              c.ka();
            } catch (m) {
            }
            c.ka = void 0;
          }
        } else
          Q(c, 11);
      } else if ((a.J || c.g == a) && zc(c), !sa(b))
        for (e = c.Ca.g.parse(b), b = 0; b < e.length; b++) {
          let m = e[b];
          c.U = m[0];
          m = m[1];
          if (2 == c.G)
            if ("c" == m[0]) {
              c.J = m[1];
              c.la = m[2];
              const r = m[3];
              null != r && (c.ma = r, c.h.info("VER=" + c.ma));
              const G2 = m[4];
              null != G2 && (c.za = G2, c.h.info("SVER=" + c.za));
              const Da2 = m[5];
              null != Da2 && "number" === typeof Da2 && 0 < Da2 && (d = 1.5 * Da2, c.K = d, c.h.info("backChannelRequestTimeoutMs_=" + d));
              d = c;
              const ca = a.g;
              if (ca) {
                const Ea2 = ca.g ? ca.g.getResponseHeader("X-Client-Wire-Protocol") : null;
                if (Ea2) {
                  var f = d.i;
                  !f.g && (w(Ea2, "spdy") || w(Ea2, "quic") || w(Ea2, "h2")) && (f.j = f.l, f.g = /* @__PURE__ */ new Set(), f.h && (Dc(f, f.h), f.h = null));
                }
                if (d.D) {
                  const xb = ca.g ? ca.g.getResponseHeader("X-HTTP-Session-Id") : null;
                  xb && (d.sa = xb, R(d.F, d.D, xb));
                }
              }
              c.G = 3;
              c.j && c.j.xa();
              c.$ && (c.O = Date.now() - a.F, c.h.info("Handshake RTT: " + c.O + "ms"));
              d = c;
              var h = a;
              d.oa = Ec(d, d.H ? d.la : null, d.W);
              if (h.J) {
                Fc(d.i, h);
                var n = h, u = d.K;
                u && n.setTimeout(u);
                n.B && (pc(n), lc(n));
                d.g = h;
              } else
                Gc(d);
              0 < c.l.length && Hc(c);
            } else
              "stop" != m[0] && "close" != m[0] || Q(c, 7);
          else
            3 == c.G && ("stop" == m[0] || "close" == m[0] ? "stop" == m[0] ? Q(c, 7) : Ic(c) : "noop" != m[0] && c.j && c.j.wa(m), c.A = 0);
        }
    }
    I(4);
  } catch (m) {
  }
}
function Jc(a) {
  if (a.R && "function" == typeof a.R)
    return a.R();
  if ("string" === typeof a)
    return a.split("");
  if (ba(a)) {
    for (var b = [], c = a.length, d = 0; d < c; d++)
      b.push(a[d]);
    return b;
  }
  b = [];
  c = 0;
  for (d in a)
    b[c++] = a[d];
  return b;
}
function Kc(a, b) {
  if (a.forEach && "function" == typeof a.forEach)
    a.forEach(b, void 0);
  else if (ba(a) || "string" === typeof a)
    na(a, b, void 0);
  else {
    if (a.T && "function" == typeof a.T)
      var c = a.T();
    else if (a.R && "function" == typeof a.R)
      c = void 0;
    else if (ba(a) || "string" === typeof a) {
      c = [];
      for (var d = a.length, e = 0; e < d; e++)
        c.push(e);
    } else
      for (e in c = [], d = 0, a)
        c[d++] = e;
    d = Jc(a);
    e = d.length;
    for (var f = 0; f < e; f++)
      b.call(void 0, d[f], c && c[f], a);
  }
}
function S(a, b) {
  this.h = {};
  this.g = [];
  this.i = 0;
  var c = arguments.length;
  if (1 < c) {
    if (c % 2)
      throw Error("Uneven number of arguments");
    for (var d = 0; d < c; d += 2)
      this.set(arguments[d], arguments[d + 1]);
  } else if (a)
    if (a instanceof S)
      for (c = a.T(), d = 0; d < c.length; d++)
        this.set(c[d], a.get(c[d]));
    else
      for (d in a)
        this.set(d, a[d]);
}
function Lc(a) {
  if (a.i != a.g.length) {
    for (var b = 0, c = 0; b < a.g.length; ) {
      var d = a.g[b];
      T(a.h, d) && (a.g[c++] = d);
      b++;
    }
    a.g.length = c;
  }
  if (a.i != a.g.length) {
    var e = {};
    for (c = b = 0; b < a.g.length; )
      d = a.g[b], T(e, d) || (a.g[c++] = d, e[d] = 1), b++;
    a.g.length = c;
  }
}
function T(a, b) {
  return Object.prototype.hasOwnProperty.call(a, b);
}
function Nc(a, b) {
  if (a) {
    a = a.split("&");
    for (var c = 0; c < a.length; c++) {
      var d = a[c].indexOf("="), e = null;
      if (0 <= d) {
        var f = a[c].substring(0, d);
        e = a[c].substring(d + 1);
      } else
        f = a[c];
      b(f, e ? decodeURIComponent(e.replace(/\+/g, " ")) : "");
    }
  }
}
function U(a, b) {
  this.i = this.s = this.j = "";
  this.m = null;
  this.o = this.l = "";
  this.g = false;
  if (a instanceof U) {
    this.g = void 0 !== b ? b : a.g;
    Oc(this, a.j);
    this.s = a.s;
    Pc(this, a.i);
    Qc(this, a.m);
    this.l = a.l;
    b = a.h;
    var c = new Rc();
    c.i = b.i;
    b.g && (c.g = new S(b.g), c.h = b.h);
    Sc(this, c);
    this.o = a.o;
  } else
    a && (c = String(a).match(Mc)) ? (this.g = !!b, Oc(this, c[1] || "", true), this.s = Tc(c[2] || ""), Pc(this, c[3] || "", true), Qc(this, c[4]), this.l = Tc(c[5] || "", true), Sc(this, c[6] || "", true), this.o = Tc(c[7] || "")) : (this.g = !!b, this.h = new Rc(null, this.g));
}
function N(a) {
  return new U(a);
}
function Oc(a, b, c) {
  a.j = c ? Tc(b, true) : b;
  a.j && (a.j = a.j.replace(/:$/, ""));
}
function Pc(a, b, c) {
  a.i = c ? Tc(b, true) : b;
}
function Qc(a, b) {
  if (b) {
    b = Number(b);
    if (isNaN(b) || 0 > b)
      throw Error("Bad port number " + b);
    a.m = b;
  } else
    a.m = null;
}
function Sc(a, b, c) {
  b instanceof Rc ? (a.h = b, Zc(a.h, a.g)) : (c || (b = Uc(b, $c)), a.h = new Rc(b, a.g));
}
function R(a, b, c) {
  a.h.set(b, c);
}
function jc(a) {
  R(a, "zx", Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ Date.now()).toString(36));
  return a;
}
function ad(a) {
  return a instanceof U ? N(a) : new U(a, void 0);
}
function bd(a, b, c, d) {
  var e = new U(null, void 0);
  a && Oc(e, a);
  b && Pc(e, b);
  c && Qc(e, c);
  d && (e.l = d);
  return e;
}
function Tc(a, b) {
  return a ? b ? decodeURI(a.replace(/%25/g, "%2525")) : decodeURIComponent(a) : "";
}
function Uc(a, b, c) {
  return "string" === typeof a ? (a = encodeURI(a).replace(b, cd), c && (a = a.replace(/%25([0-9a-fA-F]{2})/g, "%$1")), a) : null;
}
function cd(a) {
  a = a.charCodeAt(0);
  return "%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16);
}
function Rc(a, b) {
  this.h = this.g = null;
  this.i = a || null;
  this.j = !!b;
}
function V(a) {
  a.g || (a.g = new S(), a.h = 0, a.i && Nc(a.i, function(b, c) {
    a.add(decodeURIComponent(b.replace(/\+/g, " ")), c);
  }));
}
function dd(a, b) {
  V(a);
  b = W(a, b);
  T(a.g.h, b) && (a.i = null, a.h -= a.g.get(b).length, a = a.g, T(a.h, b) && (delete a.h[b], a.i--, a.g.length > 2 * a.i && Lc(a)));
}
function ed(a, b) {
  V(a);
  b = W(a, b);
  return T(a.g.h, b);
}
function mc(a, b, c) {
  dd(a, b);
  0 < c.length && (a.i = null, a.g.set(W(a, b), ra(c)), a.h += c.length);
}
function W(a, b) {
  b = String(b);
  a.j && (b = b.toLowerCase());
  return b;
}
function Zc(a, b) {
  b && !a.j && (V(a), a.i = null, a.g.forEach(function(c, d) {
    var e = d.toLowerCase();
    d != e && (dd(this, d), mc(this, e, c));
  }, a));
  a.j = b;
}
function gd(a) {
  this.l = a || hd;
  l.PerformanceNavigationTiming ? (a = l.performance.getEntriesByType("navigation"), a = 0 < a.length && ("hq" == a[0].nextHopProtocol || "h2" == a[0].nextHopProtocol)) : a = !!(l.g && l.g.Ea && l.g.Ea() && l.g.Ea().Zb);
  this.j = a ? this.l : 1;
  this.g = null;
  1 < this.j && (this.g = /* @__PURE__ */ new Set());
  this.h = null;
  this.i = [];
}
function id(a) {
  return a.h ? true : a.g ? a.g.size >= a.j : false;
}
function Cc(a) {
  return a.h ? 1 : a.g ? a.g.size : 0;
}
function yc(a, b) {
  return a.h ? a.h == b : a.g ? a.g.has(b) : false;
}
function Dc(a, b) {
  a.g ? a.g.add(b) : a.h = b;
}
function Fc(a, b) {
  a.h && a.h == b ? a.h = null : a.g && a.g.has(b) && a.g.delete(b);
}
function jd(a) {
  if (null != a.h)
    return a.i.concat(a.h.D);
  if (null != a.g && 0 !== a.g.size) {
    let b = a.i;
    for (const c of a.g.values())
      b = b.concat(c.D);
    return b;
  }
  return ra(a.i);
}
function kd() {
}
function ld() {
  this.g = new kd();
}
function md(a, b, c) {
  const d = c || "";
  try {
    Kc(a, function(e, f) {
      let h = e;
      p(e) && (h = rb(e));
      b.push(d + f + "=" + encodeURIComponent(h));
    });
  } catch (e) {
    throw b.push(d + "type=" + encodeURIComponent("_badmap")), e;
  }
}
function nd(a, b) {
  const c = new Mb();
  if (l.Image) {
    const d = new Image();
    d.onload = ja(od, c, d, "TestLoadImage: loaded", true, b);
    d.onerror = ja(od, c, d, "TestLoadImage: error", false, b);
    d.onabort = ja(od, c, d, "TestLoadImage: abort", false, b);
    d.ontimeout = ja(od, c, d, "TestLoadImage: timeout", false, b);
    l.setTimeout(function() {
      if (d.ontimeout)
        d.ontimeout();
    }, 1e4);
    d.src = a;
  } else
    b(false);
}
function od(a, b, c, d, e) {
  try {
    b.onload = null, b.onerror = null, b.onabort = null, b.ontimeout = null, e(d);
  } catch (f) {
  }
}
function pd(a) {
  this.l = a.$b || null;
  this.j = a.ib || false;
}
function qd(a, b) {
  C.call(this);
  this.D = a;
  this.u = b;
  this.m = void 0;
  this.readyState = rd;
  this.status = 0;
  this.responseType = this.responseText = this.response = this.statusText = "";
  this.onreadystatechange = null;
  this.v = new Headers();
  this.h = null;
  this.C = "GET";
  this.B = "";
  this.g = false;
  this.A = this.j = this.l = null;
}
function ud(a) {
  a.j.read().then(a.Sa.bind(a)).catch(a.ha.bind(a));
}
function td(a) {
  a.readyState = 4;
  a.l = null;
  a.j = null;
  a.A = null;
  sd(a);
}
function sd(a) {
  a.onreadystatechange && a.onreadystatechange.call(a);
}
function X(a) {
  C.call(this);
  this.headers = new S();
  this.u = a || null;
  this.h = false;
  this.C = this.g = null;
  this.H = "";
  this.m = 0;
  this.j = "";
  this.l = this.F = this.v = this.D = false;
  this.B = 0;
  this.A = null;
  this.J = wd;
  this.K = this.L = false;
}
function Bd(a) {
  return y && Ra() && "number" === typeof a.timeout && void 0 !== a.ontimeout;
}
function pa(a) {
  return "content-type" == a.toLowerCase();
}
function zd(a, b) {
  a.h = false;
  a.g && (a.l = true, a.g.abort(), a.l = false);
  a.j = b;
  a.m = 5;
  Cd(a);
  Dd(a);
}
function Cd(a) {
  a.D || (a.D = true, D(a, "complete"), D(a, "error"));
}
function Ed(a) {
  if (a.h && "undefined" != typeof goog && (!a.C[1] || 4 != O(a) || 2 != a.ba())) {
    if (a.v && 4 == O(a))
      Gb(a.Fa, 0, a);
    else if (D(a, "readystatechange"), 4 == O(a)) {
      a.h = false;
      try {
        const n = a.ba();
        a:
          switch (n) {
            case 200:
            case 201:
            case 202:
            case 204:
            case 206:
            case 304:
            case 1223:
              var b = true;
              break a;
            default:
              b = false;
          }
        var c;
        if (!(c = b)) {
          var d;
          if (d = 0 === n) {
            var e = String(a.H).match(Mc)[1] || null;
            if (!e && l.self && l.self.location) {
              var f = l.self.location.protocol;
              e = f.substr(0, f.length - 1);
            }
            d = !xd.test(e ? e.toLowerCase() : "");
          }
          c = d;
        }
        if (c)
          D(a, "complete"), D(
            a,
            "success"
          );
        else {
          a.m = 6;
          try {
            var h = 2 < O(a) ? a.g.statusText : "";
          } catch (u) {
            h = "";
          }
          a.j = h + " [" + a.ba() + "]";
          Cd(a);
        }
      } finally {
        Dd(a);
      }
    }
  }
}
function Dd(a, b) {
  if (a.g) {
    Ad(a);
    const c = a.g, d = a.C[0] ? aa : null;
    a.g = null;
    a.C = null;
    b || D(a, "ready");
    try {
      c.onreadystatechange = d;
    } catch (e) {
    }
  }
}
function Ad(a) {
  a.g && a.K && (a.g.ontimeout = null);
  a.A && (l.clearTimeout(a.A), a.A = null);
}
function O(a) {
  return a.g ? a.g.readyState : 0;
}
function oc(a) {
  try {
    if (!a.g)
      return null;
    if ("response" in a.g)
      return a.g.response;
    switch (a.J) {
      case wd:
      case "text":
        return a.g.responseText;
      case "arraybuffer":
        if ("mozResponseArrayBuffer" in a.g)
          return a.g.mozResponseArrayBuffer;
    }
    return null;
  } catch (b) {
    return null;
  }
}
function Fd(a) {
  let b = "";
  xa(a, function(c, d) {
    b += d;
    b += ":";
    b += c;
    b += "\r\n";
  });
  return b;
}
function Gd(a, b, c) {
  a: {
    for (d in c) {
      var d = false;
      break a;
    }
    d = true;
  }
  d || (c = Fd(c), "string" === typeof a ? null != c && encodeURIComponent(String(c)) : R(a, b, c));
}
function Hd(a, b, c) {
  return c && c.internalChannelParams ? c.internalChannelParams[a] || b : b;
}
function Id(a) {
  this.za = 0;
  this.l = [];
  this.h = new Mb();
  this.la = this.oa = this.F = this.W = this.g = this.sa = this.D = this.aa = this.o = this.P = this.s = null;
  this.Za = this.V = 0;
  this.Xa = Hd("failFast", false, a);
  this.N = this.v = this.u = this.m = this.j = null;
  this.X = true;
  this.I = this.ta = this.U = -1;
  this.Y = this.A = this.C = 0;
  this.Pa = Hd("baseRetryDelayMs", 5e3, a);
  this.$a = Hd("retryDelaySeedMs", 1e4, a);
  this.Ya = Hd("forwardChannelMaxRetries", 2, a);
  this.ra = Hd("forwardChannelRequestTimeoutMs", 2e4, a);
  this.qa = a && a.xmlHttpFactory || void 0;
  this.Ba = a && a.Yb || false;
  this.K = void 0;
  this.H = a && a.supportsCrossDomainXhr || false;
  this.J = "";
  this.i = new gd(a && a.concurrentRequestLimit);
  this.Ca = new ld();
  this.ja = a && a.fastHandshake || false;
  this.Ra = a && a.Wb || false;
  a && a.Aa && this.h.Aa();
  a && a.forceLongPolling && (this.X = false);
  this.$ = !this.ja && this.X && a && a.detectBufferingProxy || false;
  this.ka = void 0;
  this.O = 0;
  this.L = false;
  this.B = null;
  this.Wa = !a || false !== a.Xb;
}
function Ic(a) {
  Jd(a);
  if (3 == a.G) {
    var b = a.V++, c = N(a.F);
    R(c, "SID", a.J);
    R(c, "RID", b);
    R(c, "TYPE", "terminate");
    Kd(a, c);
    b = new M(a, a.h, b, void 0);
    b.K = 2;
    b.v = jc(N(c));
    c = false;
    l.navigator && l.navigator.sendBeacon && (c = l.navigator.sendBeacon(b.v.toString(), ""));
    !c && l.Image && (new Image().src = b.v, c = true);
    c || (b.g = nc(b.l, null), b.g.ea(b.v));
    b.F = Date.now();
    lc(b);
  }
  Ld(a);
}
function Ac(a) {
  a.g && (wc(a), a.g.cancel(), a.g = null);
}
function Jd(a) {
  Ac(a);
  a.u && (l.clearTimeout(a.u), a.u = null);
  zc(a);
  a.i.cancel();
  a.m && ("number" === typeof a.m && l.clearTimeout(a.m), a.m = null);
}
function Md(a, b) {
  a.l.push(new fd(a.Za++, b));
  3 == a.G && Hc(a);
}
function Hc(a) {
  id(a.i) || a.m || (a.m = true, zb(a.Ha, a), a.C = 0);
}
function Nd(a, b) {
  if (Cc(a.i) >= a.i.j - (a.m ? 1 : 0))
    return false;
  if (a.m)
    return a.l = b.D.concat(a.l), true;
  if (1 == a.G || 2 == a.G || a.C >= (a.Xa ? 0 : a.Ya))
    return false;
  a.m = K(q(a.Ha, a, b), Od(a, a.C));
  a.C++;
  return true;
}
function Qd(a, b) {
  var c;
  b ? c = b.m : c = a.V++;
  const d = N(a.F);
  R(d, "SID", a.J);
  R(d, "RID", c);
  R(d, "AID", a.U);
  Kd(a, d);
  a.o && a.s && Gd(d, a.o, a.s);
  c = new M(a, a.h, c, a.C + 1);
  null === a.o && (c.H = a.s);
  b && (a.l = b.D.concat(a.l));
  b = Pd(a, c, 1e3);
  c.setTimeout(Math.round(0.5 * a.ra) + Math.round(0.5 * a.ra * Math.random()));
  Dc(a.i, c);
  ic(c, d, b);
}
function Kd(a, b) {
  a.j && Kc({}, function(c, d) {
    R(b, d, c);
  });
}
function Pd(a, b, c) {
  c = Math.min(a.l.length, c);
  var d = a.j ? q(a.j.Oa, a.j, a) : null;
  a: {
    var e = a.l;
    let f = -1;
    for (; ; ) {
      const h = ["count=" + c];
      -1 == f ? 0 < c ? (f = e[0].h, h.push("ofs=" + f)) : f = 0 : h.push("ofs=" + f);
      let n = true;
      for (let u = 0; u < c; u++) {
        let m = e[u].h;
        const r = e[u].g;
        m -= f;
        if (0 > m)
          f = Math.max(0, e[u].h - 100), n = false;
        else
          try {
            md(r, h, "req" + m + "_");
          } catch (G2) {
            d && d(r);
          }
      }
      if (n) {
        d = h.join("&");
        break a;
      }
    }
  }
  a = a.l.splice(0, c);
  b.D = a;
  return d;
}
function Gc(a) {
  a.g || a.u || (a.Y = 1, zb(a.Ga, a), a.A = 0);
}
function Bc(a) {
  if (a.g || a.u || 3 <= a.A)
    return false;
  a.Y++;
  a.u = K(q(a.Ga, a), Od(a, a.A));
  a.A++;
  return true;
}
function wc(a) {
  null != a.B && (l.clearTimeout(a.B), a.B = null);
}
function Rd(a) {
  a.g = new M(a, a.h, "rpc", a.Y);
  null === a.o && (a.g.H = a.s);
  a.g.O = 0;
  var b = N(a.oa);
  R(b, "RID", "rpc");
  R(b, "SID", a.J);
  R(b, "CI", a.N ? "0" : "1");
  R(b, "AID", a.U);
  Kd(a, b);
  R(b, "TYPE", "xmlhttp");
  a.o && a.s && Gd(b, a.o, a.s);
  a.K && a.g.setTimeout(a.K);
  var c = a.g;
  a = a.la;
  c.K = 1;
  c.v = jc(N(b));
  c.s = null;
  c.U = true;
  kc(c, a);
}
function zc(a) {
  null != a.v && (l.clearTimeout(a.v), a.v = null);
}
function uc(a, b) {
  var c = null;
  if (a.g == b) {
    zc(a);
    wc(a);
    a.g = null;
    var d = 2;
  } else if (yc(a.i, b))
    c = b.D, Fc(a.i, b), d = 1;
  else
    return;
  a.I = b.N;
  if (0 != a.G) {
    if (b.i)
      if (1 == d) {
        c = b.s ? b.s.length : 0;
        b = Date.now() - b.F;
        var e = a.C;
        d = Sb();
        D(d, new Vb(d, c, b, e));
        Hc(a);
      } else
        Gc(a);
    else if (e = b.o, 3 == e || 0 == e && 0 < a.I || !(1 == d && Nd(a, b) || 2 == d && Bc(a)))
      switch (c && 0 < c.length && (b = a.i, b.i = b.i.concat(c)), e) {
        case 1:
          Q(a, 5);
          break;
        case 4:
          Q(a, 10);
          break;
        case 3:
          Q(a, 6);
          break;
        default:
          Q(a, 2);
      }
  }
}
function Od(a, b) {
  let c = a.Pa + Math.floor(Math.random() * a.$a);
  a.j || (c *= 2);
  return c * b;
}
function Q(a, b) {
  a.h.info("Error code " + b);
  if (2 == b) {
    var c = null;
    a.j && (c = null);
    var d = q(a.jb, a);
    c || (c = new U("//www.google.com/images/cleardot.gif"), l.location && "http" == l.location.protocol || Oc(c, "https"), jc(c));
    nd(c.toString(), d);
  } else
    J(2);
  a.G = 0;
  a.j && a.j.va(b);
  Ld(a);
  Jd(a);
}
function Ld(a) {
  a.G = 0;
  a.I = -1;
  if (a.j) {
    if (0 != jd(a.i).length || 0 != a.l.length)
      a.i.i.length = 0, ra(a.l), a.l.length = 0;
    a.j.ua();
  }
}
function Ec(a, b, c) {
  let d = ad(c);
  if ("" != d.i)
    b && Pc(d, b + "." + d.i), Qc(d, d.m);
  else {
    const e = l.location;
    d = bd(e.protocol, b ? b + "." + e.hostname : e.hostname, +e.port, c);
  }
  a.aa && xa(a.aa, function(e, f) {
    R(d, f, e);
  });
  b = a.D;
  c = a.sa;
  b && c && R(d, b, c);
  R(d, "VER", a.ma);
  Kd(a, d);
  return d;
}
function nc(a, b, c) {
  if (b && !a.H)
    throw Error("Can't create secondary domain capable XhrIo object.");
  b = c && a.Ba && !a.qa ? new X(new pd({ ib: true })) : new X(a.qa);
  b.L = a.H;
  return b;
}
function Sd() {
}
function Td() {
  if (y && !(10 <= Number(Ua)))
    throw Error("Environmental error: no available transport.");
}
function Y(a, b) {
  C.call(this);
  this.g = new Id(b);
  this.l = a;
  this.h = b && b.messageUrlParams || null;
  a = b && b.messageHeaders || null;
  b && b.clientProtocolHeaderRequired && (a ? a["X-Client-Protocol"] = "webchannel" : a = { "X-Client-Protocol": "webchannel" });
  this.g.s = a;
  a = b && b.initMessageHeaders || null;
  b && b.messageContentType && (a ? a["X-WebChannel-Content-Type"] = b.messageContentType : a = { "X-WebChannel-Content-Type": b.messageContentType });
  b && b.ya && (a ? a["X-WebChannel-Client-Profile"] = b.ya : a = { "X-WebChannel-Client-Profile": b.ya });
  this.g.P = a;
  (a = b && b.httpHeadersOverwriteParam) && !sa(a) && (this.g.o = a);
  this.A = b && b.supportsCrossDomainXhr || false;
  this.v = b && b.sendRawJson || false;
  (b = b && b.httpSessionIdParam) && !sa(b) && (this.g.D = b, a = this.h, null !== a && b in a && (a = this.h, b in a && delete a[b]));
  this.j = new Z(this);
}
function Ud(a) {
  ac.call(this);
  var b = a.__sm__;
  if (b) {
    a: {
      for (const c in b) {
        a = c;
        break a;
      }
      a = void 0;
    }
    if (this.i = a)
      a = this.i, b = null !== b && a in b ? b[a] : void 0;
    this.data = b;
  } else
    this.data = a;
}
function Vd() {
  bc.call(this);
  this.status = 1;
}
function Z(a) {
  this.g = a;
}
var commonjsGlobal, esm, k, goog, l, ea, fa, ka, la, ma, na, ta, x, va2, wa, za, Ha, y, Ia, Ja, Ka, La, Na, Oa2, Pa, Qa, Ga, Sa, Ta2, Ua, Va, Wa, B, Xa, cb, db, pb, rb, ub, vb, wb, Ab, Cb, tb, Ib, Jb, H, Rb, Wb, Xb, L, cc, ec, gc, hc, Mc, Vc, Xc, Wc, $c, Yc, fd, hd, rd, vd, wd, xd, yd, createWebChannelTransport, getStatEventTarget, ErrorCode, EventType, Event, Stat, FetchXmlHttpFactory, WebChannel, XhrIo;
var init_index_esm20175 = __esm({
  "node_modules/@firebase/webchannel-wrapper/dist/index.esm2017.js"() {
    commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
    esm = {};
    goog = goog || {};
    l = commonjsGlobal || self;
    ea = "closure_uid_" + (1e9 * Math.random() >>> 0);
    fa = 0;
    ka = 0;
    la = {};
    v.prototype.s = false;
    v.prototype.na = function() {
      if (!this.s && (this.s = true, this.M(), 0 != ka)) {
        var a = da(this);
        delete la[a];
      }
    };
    v.prototype.M = function() {
      if (this.o)
        for (; this.o.length; )
          this.o.shift()();
    };
    ma = Array.prototype.indexOf ? function(a, b) {
      return Array.prototype.indexOf.call(a, b, void 0);
    } : function(a, b) {
      if ("string" === typeof a)
        return "string" !== typeof b || 1 != b.length ? -1 : a.indexOf(b, 0);
      for (let c = 0; c < a.length; c++)
        if (c in a && a[c] === b)
          return c;
      return -1;
    };
    na = Array.prototype.forEach ? function(a, b, c) {
      Array.prototype.forEach.call(a, b, c);
    } : function(a, b, c) {
      const d = a.length, e = "string" === typeof a ? a.split("") : a;
      for (let f = 0; f < d; f++)
        f in e && b.call(c, e[f], f, a);
    };
    ta = String.prototype.trim ? function(a) {
      return a.trim();
    } : function(a) {
      return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1];
    };
    a: {
      va2 = l.navigator;
      if (va2) {
        wa = va2.userAgent;
        if (wa) {
          x = wa;
          break a;
        }
      }
      x = "";
    }
    za = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
    Ca[" "] = aa;
    Ha = w(x, "Opera");
    y = w(x, "Trident") || w(x, "MSIE");
    Ia = w(x, "Edge");
    Ja = Ia || y;
    Ka = w(x, "Gecko") && !(w(x.toLowerCase(), "webkit") && !w(x, "Edge")) && !(w(x, "Trident") || w(x, "MSIE")) && !w(x, "Edge");
    La = w(x.toLowerCase(), "webkit") && !w(x, "Edge");
    a: {
      Oa2 = "", Pa = function() {
        var a = x;
        if (Ka)
          return /rv:([^\);]+)(\)|;)/.exec(a);
        if (Ia)
          return /Edge\/([\d\.]+)/.exec(a);
        if (y)
          return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
        if (La)
          return /WebKit\/(\S+)/.exec(a);
        if (Ha)
          return /(?:Version)[ \/]?(\S+)/.exec(a);
      }();
      Pa && (Oa2 = Pa ? Pa[1] : "");
      if (y) {
        Qa = Ma();
        if (null != Qa && Qa > parseFloat(Oa2)) {
          Na = String(Qa);
          break a;
        }
      }
      Na = Oa2;
    }
    Ga = {};
    if (l.document && y) {
      Ta2 = Ma();
      Sa = Ta2 ? Ta2 : parseInt(Na, 10) || void 0;
    } else
      Sa = void 0;
    Ua = Sa;
    Va = function() {
      if (!l.addEventListener || !Object.defineProperty)
        return false;
      var a = false, b = Object.defineProperty({}, "passive", { get: function() {
        a = true;
      } });
      try {
        l.addEventListener("test", aa, b), l.removeEventListener("test", aa, b);
      } catch (c) {
      }
      return a;
    }();
    z.prototype.h = function() {
      this.defaultPrevented = true;
    };
    t(A, z);
    Wa = { 2: "touch", 3: "pen", 4: "mouse" };
    A.prototype.h = function() {
      A.Z.h.call(this);
      var a = this.i;
      a.preventDefault ? a.preventDefault() : a.returnValue = false;
    };
    B = "closure_listenable_" + (1e6 * Math.random() | 0);
    Xa = 0;
    $a.prototype.add = function(a, b, c, d, e) {
      var f = a.toString();
      a = this.g[f];
      a || (a = this.g[f] = [], this.h++);
      var h = ab(a, b, d, e);
      -1 < h ? (b = a[h], c || (b.fa = false)) : (b = new Ya(b, this.src, f, !!d, e), b.fa = c, a.push(b));
      return b;
    };
    cb = "closure_lm_" + (1e6 * Math.random() | 0);
    db = {};
    pb = "__closure_events_fn_" + (1e9 * Math.random() >>> 0);
    t(C, v);
    C.prototype[B] = true;
    C.prototype.removeEventListener = function(a, b, c, d) {
      nb(this, a, b, c, d);
    };
    C.prototype.M = function() {
      C.Z.M.call(this);
      if (this.i) {
        var a = this.i, c;
        for (c in a.g) {
          for (var d = a.g[c], e = 0; e < d.length; e++)
            Za(d[e]);
          delete a.g[c];
          a.h--;
        }
      }
      this.I = null;
    };
    C.prototype.N = function(a, b, c, d) {
      return this.i.add(String(a), b, false, c, d);
    };
    C.prototype.O = function(a, b, c, d) {
      return this.i.add(String(a), b, true, c, d);
    };
    rb = l.JSON.stringify;
    ub = class {
      constructor() {
        this.h = this.g = null;
      }
      add(a, b) {
        const c = vb.get();
        c.set(a, b);
        this.h ? this.h.next = c : this.g = c;
        this.h = c;
      }
    };
    vb = new class {
      constructor(a, b) {
        this.i = a;
        this.j = b;
        this.h = 0;
        this.g = null;
      }
      get() {
        let a;
        0 < this.h ? (this.h--, a = this.g, this.g = a.next, a.next = null) : a = this.i();
        return a;
      }
    }(() => new wb(), (a) => a.reset());
    wb = class {
      constructor() {
        this.next = this.g = this.h = null;
      }
      set(a, b) {
        this.h = a;
        this.g = b;
        this.next = null;
      }
      reset() {
        this.next = this.g = this.h = null;
      }
    };
    Cb = false;
    tb = new ub();
    t(Eb, C);
    k = Eb.prototype;
    k.da = false;
    k.S = null;
    k.kb = function() {
      if (this.da) {
        var a = Date.now() - this.l;
        0 < a && a < 0.8 * this.h ? this.S = this.g.setTimeout(this.j, this.h - a) : (this.S && (this.g.clearTimeout(this.S), this.S = null), D(this, "tick"), this.da && (Fb(this), this.start()));
      }
    };
    k.start = function() {
      this.da = true;
      this.S || (this.S = this.g.setTimeout(this.j, this.h), this.l = Date.now());
    };
    k.M = function() {
      Eb.Z.M.call(this);
      Fb(this);
      delete this.g;
    };
    Ib = class extends v {
      constructor(a, b) {
        super();
        this.m = a;
        this.j = b;
        this.h = null;
        this.i = false;
        this.g = null;
      }
      l(a) {
        this.h = arguments;
        this.g ? this.i = true : Hb(this);
      }
      M() {
        super.M();
        this.g && (l.clearTimeout(this.g), this.g = null, this.i = false, this.h = null);
      }
    };
    t(E, v);
    Jb = [];
    E.prototype.M = function() {
      E.Z.M.call(this);
      Lb(this);
    };
    E.prototype.handleEvent = function() {
      throw Error("EventHandler.handleEvent not implemented");
    };
    Mb.prototype.Aa = function() {
      this.g = false;
    };
    Mb.prototype.info = function() {
    };
    H = {};
    Rb = null;
    H.Ma = "serverreachability";
    t(Tb, z);
    H.STAT_EVENT = "statevent";
    t(Ub, z);
    H.Na = "timingevent";
    t(Vb, z);
    Wb = { NO_ERROR: 0, lb: 1, yb: 2, xb: 3, sb: 4, wb: 5, zb: 6, Ja: 7, TIMEOUT: 8, Cb: 9 };
    Xb = { qb: "complete", Mb: "success", Ka: "error", Ja: "abort", Eb: "ready", Fb: "readystatechange", TIMEOUT: "timeout", Ab: "incrementaldata", Db: "progress", tb: "downloadprogress", Ub: "uploadprogress" };
    Yb.prototype.h = null;
    L = { OPEN: "a", pb: "b", Ka: "c", Bb: "d" };
    t(ac, z);
    t(bc, z);
    t(dc, Yb);
    dc.prototype.g = function() {
      return new XMLHttpRequest();
    };
    dc.prototype.i = function() {
      return {};
    };
    cc = new dc();
    ec = 45e3;
    gc = {};
    hc = {};
    k = M.prototype;
    k.setTimeout = function(a) {
      this.P = a;
    };
    k.gb = function(a) {
      a = a.target;
      const b = this.L;
      b && 3 == O(a) ? b.l() : this.Ia(a);
    };
    k.Ia = function(a) {
      try {
        if (a == this.g)
          a: {
            const r = O(this.g);
            var b = this.g.Da();
            const G2 = this.g.ba();
            if (!(3 > r) && (3 != r || Ja || this.g && (this.h.h || this.g.ga() || oc(this.g)))) {
              this.I || 4 != r || 7 == b || (8 == b || 0 >= G2 ? I(3) : I(2));
              pc(this);
              var c = this.g.ba();
              this.N = c;
              b:
                if (qc(this)) {
                  var d = oc(this.g);
                  a = "";
                  var e = d.length, f = 4 == O(this.g);
                  if (!this.h.i) {
                    if ("undefined" === typeof TextDecoder) {
                      P(this);
                      rc(this);
                      var h = "";
                      break b;
                    }
                    this.h.i = new l.TextDecoder();
                  }
                  for (b = 0; b < e; b++)
                    this.h.h = true, a += this.h.i.decode(d[b], { stream: f && b == e - 1 });
                  d.splice(
                    0,
                    e
                  );
                  this.h.g += a;
                  this.C = 0;
                  h = this.h.g;
                } else
                  h = this.g.ga();
              this.i = 200 == c;
              Ob(this.j, this.u, this.A, this.m, this.X, r, c);
              if (this.i) {
                if (this.$ && !this.J) {
                  b: {
                    if (this.g) {
                      var n, u = this.g;
                      if ((n = u.g ? u.g.getResponseHeader("X-HTTP-Initial-Response") : null) && !sa(n)) {
                        var m = n;
                        break b;
                      }
                    }
                    m = null;
                  }
                  if (c = m)
                    F(this.j, this.m, c, "Initial handshake response via X-HTTP-Initial-Response"), this.J = true, sc(this, c);
                  else {
                    this.i = false;
                    this.o = 3;
                    J(12);
                    P(this);
                    rc(this);
                    break a;
                  }
                }
                this.U ? (tc(this, r, h), Ja && this.i && 3 == r && (Kb(this.V, this.W, "tick", this.fb), this.W.start())) : (F(this.j, this.m, h, null), sc(this, h));
                4 == r && P(this);
                this.i && !this.I && (4 == r ? uc(this.l, this) : (this.i = false, lc(this)));
              } else
                400 == c && 0 < h.indexOf("Unknown SID") ? (this.o = 3, J(12)) : (this.o = 0, J(13)), P(this), rc(this);
            }
          }
      } catch (r) {
      } finally {
      }
    };
    k.fb = function() {
      if (this.g) {
        var a = O(this.g), b = this.g.ga();
        this.C < b.length && (pc(this), tc(this, a, b), this.i && 4 != a && lc(this));
      }
    };
    k.cancel = function() {
      this.I = true;
      P(this);
    };
    k.eb = function() {
      this.B = null;
      const a = Date.now();
      0 <= a - this.Y ? (Qb(this.j, this.A), 2 != this.K && (I(3), J(17)), P(this), this.o = 2, rc(this)) : xc(this, this.Y - a);
    };
    k = S.prototype;
    k.R = function() {
      Lc(this);
      for (var a = [], b = 0; b < this.g.length; b++)
        a.push(this.h[this.g[b]]);
      return a;
    };
    k.T = function() {
      Lc(this);
      return this.g.concat();
    };
    k.get = function(a, b) {
      return T(this.h, a) ? this.h[a] : b;
    };
    k.set = function(a, b) {
      T(this.h, a) || (this.i++, this.g.push(a));
      this.h[a] = b;
    };
    k.forEach = function(a, b) {
      for (var c = this.T(), d = 0; d < c.length; d++) {
        var e = c[d], f = this.get(e);
        a.call(b, f, e, this);
      }
    };
    Mc = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^\\/?#]*)@)?([^\\/?#]*?)(?::([0-9]+))?(?=[\\/?#]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;
    U.prototype.toString = function() {
      var a = [], b = this.j;
      b && a.push(Uc(b, Vc, true), ":");
      var c = this.i;
      if (c || "file" == b)
        a.push("//"), (b = this.s) && a.push(Uc(b, Vc, true), "@"), a.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g, "%$1")), c = this.m, null != c && a.push(":", String(c));
      if (c = this.l)
        this.i && "/" != c.charAt(0) && a.push("/"), a.push(Uc(c, "/" == c.charAt(0) ? Wc : Xc, true));
      (c = this.h.toString()) && a.push("?", c);
      (c = this.o) && a.push("#", Uc(c, Yc));
      return a.join("");
    };
    Vc = /[#\/\?@]/g;
    Xc = /[#\?:]/g;
    Wc = /[#\?]/g;
    $c = /[#\?@]/g;
    Yc = /#/g;
    k = Rc.prototype;
    k.add = function(a, b) {
      V(this);
      this.i = null;
      a = W(this, a);
      var c = this.g.get(a);
      c || this.g.set(a, c = []);
      c.push(b);
      this.h += 1;
      return this;
    };
    k.forEach = function(a, b) {
      V(this);
      this.g.forEach(function(c, d) {
        na(c, function(e) {
          a.call(b, e, d, this);
        }, this);
      }, this);
    };
    k.T = function() {
      V(this);
      for (var a = this.g.R(), b = this.g.T(), c = [], d = 0; d < b.length; d++)
        for (var e = a[d], f = 0; f < e.length; f++)
          c.push(b[d]);
      return c;
    };
    k.R = function(a) {
      V(this);
      var b = [];
      if ("string" === typeof a)
        ed(this, a) && (b = qa(b, this.g.get(W(this, a))));
      else {
        a = this.g.R();
        for (var c = 0; c < a.length; c++)
          b = qa(b, a[c]);
      }
      return b;
    };
    k.set = function(a, b) {
      V(this);
      this.i = null;
      a = W(this, a);
      ed(this, a) && (this.h -= this.g.get(a).length);
      this.g.set(a, [b]);
      this.h += 1;
      return this;
    };
    k.get = function(a, b) {
      if (!a)
        return b;
      a = this.R(a);
      return 0 < a.length ? String(a[0]) : b;
    };
    k.toString = function() {
      if (this.i)
        return this.i;
      if (!this.g)
        return "";
      for (var a = [], b = this.g.T(), c = 0; c < b.length; c++) {
        var d = b[c], e = encodeURIComponent(String(d));
        d = this.R(d);
        for (var f = 0; f < d.length; f++) {
          var h = e;
          "" !== d[f] && (h += "=" + encodeURIComponent(String(d[f])));
          a.push(h);
        }
      }
      return this.i = a.join("&");
    };
    fd = class {
      constructor(a, b) {
        this.h = a;
        this.g = b;
      }
    };
    hd = 10;
    gd.prototype.cancel = function() {
      this.i = jd(this);
      if (this.h)
        this.h.cancel(), this.h = null;
      else if (this.g && 0 !== this.g.size) {
        for (const a of this.g.values())
          a.cancel();
        this.g.clear();
      }
    };
    kd.prototype.stringify = function(a) {
      return l.JSON.stringify(a, void 0);
    };
    kd.prototype.parse = function(a) {
      return l.JSON.parse(a, void 0);
    };
    t(pd, Yb);
    pd.prototype.g = function() {
      return new qd(this.l, this.j);
    };
    pd.prototype.i = function(a) {
      return function() {
        return a;
      };
    }({});
    t(qd, C);
    rd = 0;
    k = qd.prototype;
    k.open = function(a, b) {
      if (this.readyState != rd)
        throw this.abort(), Error("Error reopening a connection");
      this.C = a;
      this.B = b;
      this.readyState = 1;
      sd(this);
    };
    k.send = function(a) {
      if (1 != this.readyState)
        throw this.abort(), Error("need to call open() first. ");
      this.g = true;
      const b = { headers: this.v, method: this.C, credentials: this.m, cache: void 0 };
      a && (b.body = a);
      (this.D || l).fetch(new Request(this.B, b)).then(this.Va.bind(this), this.ha.bind(this));
    };
    k.abort = function() {
      this.response = this.responseText = "";
      this.v = new Headers();
      this.status = 0;
      this.j && this.j.cancel("Request was aborted.");
      1 <= this.readyState && this.g && 4 != this.readyState && (this.g = false, td(this));
      this.readyState = rd;
    };
    k.Va = function(a) {
      if (this.g && (this.l = a, this.h || (this.status = this.l.status, this.statusText = this.l.statusText, this.h = a.headers, this.readyState = 2, sd(this)), this.g && (this.readyState = 3, sd(this), this.g)))
        if ("arraybuffer" === this.responseType)
          a.arrayBuffer().then(this.Ta.bind(this), this.ha.bind(this));
        else if ("undefined" !== typeof l.ReadableStream && "body" in a) {
          this.j = a.body.getReader();
          if (this.u) {
            if (this.responseType)
              throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');
            this.response = [];
          } else
            this.response = this.responseText = "", this.A = new TextDecoder();
          ud(this);
        } else
          a.text().then(this.Ua.bind(this), this.ha.bind(this));
    };
    k.Sa = function(a) {
      if (this.g) {
        if (this.u && a.value)
          this.response.push(a.value);
        else if (!this.u) {
          var b = a.value ? a.value : new Uint8Array(0);
          if (b = this.A.decode(b, { stream: !a.done }))
            this.response = this.responseText += b;
        }
        a.done ? td(this) : sd(this);
        3 == this.readyState && ud(this);
      }
    };
    k.Ua = function(a) {
      this.g && (this.response = this.responseText = a, td(this));
    };
    k.Ta = function(a) {
      this.g && (this.response = a, td(this));
    };
    k.ha = function() {
      this.g && td(this);
    };
    k.setRequestHeader = function(a, b) {
      this.v.append(a, b);
    };
    k.getResponseHeader = function(a) {
      return this.h ? this.h.get(a.toLowerCase()) || "" : "";
    };
    k.getAllResponseHeaders = function() {
      if (!this.h)
        return "";
      const a = [], b = this.h.entries();
      for (var c = b.next(); !c.done; )
        c = c.value, a.push(c[0] + ": " + c[1]), c = b.next();
      return a.join("\r\n");
    };
    Object.defineProperty(qd.prototype, "withCredentials", { get: function() {
      return "include" === this.m;
    }, set: function(a) {
      this.m = a ? "include" : "same-origin";
    } });
    vd = l.JSON.parse;
    t(X, C);
    wd = "";
    xd = /^https?$/i;
    yd = ["POST", "PUT"];
    k = X.prototype;
    k.ea = function(a, b, c, d) {
      if (this.g)
        throw Error("[goog.net.XhrIo] Object is active with another request=" + this.H + "; newUri=" + a);
      b = b ? b.toUpperCase() : "GET";
      this.H = a;
      this.j = "";
      this.m = 0;
      this.D = false;
      this.h = true;
      this.g = this.u ? this.u.g() : cc.g();
      this.C = this.u ? Zb(this.u) : Zb(cc);
      this.g.onreadystatechange = q(this.Fa, this);
      try {
        this.F = true, this.g.open(b, String(a), true), this.F = false;
      } catch (f) {
        zd(this, f);
        return;
      }
      a = c || "";
      const e = new S(this.headers);
      d && Kc(d, function(f, h) {
        e.set(h, f);
      });
      d = oa(e.T());
      c = l.FormData && a instanceof l.FormData;
      !(0 <= ma(yd, b)) || d || c || e.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
      e.forEach(function(f, h) {
        this.g.setRequestHeader(h, f);
      }, this);
      this.J && (this.g.responseType = this.J);
      "withCredentials" in this.g && this.g.withCredentials !== this.L && (this.g.withCredentials = this.L);
      try {
        Ad(this), 0 < this.B && ((this.K = Bd(this.g)) ? (this.g.timeout = this.B, this.g.ontimeout = q(this.pa, this)) : this.A = Gb(this.pa, this.B, this)), this.v = true, this.g.send(a), this.v = false;
      } catch (f) {
        zd(this, f);
      }
    };
    k.pa = function() {
      "undefined" != typeof goog && this.g && (this.j = "Timed out after " + this.B + "ms, aborting", this.m = 8, D(this, "timeout"), this.abort(8));
    };
    k.abort = function(a) {
      this.g && this.h && (this.h = false, this.l = true, this.g.abort(), this.l = false, this.m = a || 7, D(this, "complete"), D(this, "abort"), Dd(this));
    };
    k.M = function() {
      this.g && (this.h && (this.h = false, this.l = true, this.g.abort(), this.l = false), Dd(this, true));
      X.Z.M.call(this);
    };
    k.Fa = function() {
      this.s || (this.F || this.v || this.l ? Ed(this) : this.cb());
    };
    k.cb = function() {
      Ed(this);
    };
    k.ba = function() {
      try {
        return 2 < O(this) ? this.g.status : -1;
      } catch (a) {
        return -1;
      }
    };
    k.ga = function() {
      try {
        return this.g ? this.g.responseText : "";
      } catch (a) {
        return "";
      }
    };
    k.Qa = function(a) {
      if (this.g) {
        var b = this.g.responseText;
        a && 0 == b.indexOf(a) && (b = b.substring(a.length));
        return vd(b);
      }
    };
    k.Da = function() {
      return this.m;
    };
    k.La = function() {
      return "string" === typeof this.j ? this.j : String(this.j);
    };
    k = Id.prototype;
    k.ma = 8;
    k.G = 1;
    k.hb = function(a) {
      try {
        this.h.info("Origin Trials invoked: " + a);
      } catch (b) {
      }
    };
    k.Ha = function(a) {
      if (this.m)
        if (this.m = null, 1 == this.G) {
          if (!a) {
            this.V = Math.floor(1e5 * Math.random());
            a = this.V++;
            const e = new M(this, this.h, a, void 0);
            let f = this.s;
            this.P && (f ? (f = ya(f), Aa(f, this.P)) : f = this.P);
            null === this.o && (e.H = f);
            if (this.ja)
              a: {
                var b = 0;
                for (var c = 0; c < this.l.length; c++) {
                  b: {
                    var d = this.l[c];
                    if ("__data__" in d.g && (d = d.g.__data__, "string" === typeof d)) {
                      d = d.length;
                      break b;
                    }
                    d = void 0;
                  }
                  if (void 0 === d)
                    break;
                  b += d;
                  if (4096 < b) {
                    b = c;
                    break a;
                  }
                  if (4096 === b || c === this.l.length - 1) {
                    b = c + 1;
                    break a;
                  }
                }
                b = 1e3;
              }
            else
              b = 1e3;
            b = Pd(this, e, b);
            c = N(this.F);
            R(c, "RID", a);
            R(c, "CVER", 22);
            this.D && R(c, "X-HTTP-Session-Id", this.D);
            Kd(this, c);
            this.o && f && Gd(c, this.o, f);
            Dc(this.i, e);
            this.Ra && R(c, "TYPE", "init");
            this.ja ? (R(c, "$req", b), R(c, "SID", "null"), e.$ = true, ic(e, c, null)) : ic(e, c, b);
            this.G = 2;
          }
        } else
          3 == this.G && (a ? Qd(this, a) : 0 == this.l.length || id(this.i) || Qd(this));
    };
    k.Ga = function() {
      this.u = null;
      Rd(this);
      if (this.$ && !(this.L || null == this.g || 0 >= this.O)) {
        var a = 2 * this.O;
        this.h.info("BP detection timer enabled: " + a);
        this.B = K(q(this.bb, this), a);
      }
    };
    k.bb = function() {
      this.B && (this.B = null, this.h.info("BP detection timeout reached."), this.h.info("Buffering proxy detected and switch to long-polling!"), this.N = false, this.L = true, J(10), Ac(this), Rd(this));
    };
    k.ab = function() {
      null != this.v && (this.v = null, Ac(this), Bc(this), J(19));
    };
    k.jb = function(a) {
      a ? (this.h.info("Successfully pinged google.com"), J(2)) : (this.h.info("Failed to ping google.com"), J(1));
    };
    k = Sd.prototype;
    k.xa = function() {
    };
    k.wa = function() {
    };
    k.va = function() {
    };
    k.ua = function() {
    };
    k.Oa = function() {
    };
    Td.prototype.g = function(a, b) {
      return new Y(a, b);
    };
    t(Y, C);
    Y.prototype.m = function() {
      this.g.j = this.j;
      this.A && (this.g.H = true);
      var a = this.g, b = this.l, c = this.h || void 0;
      a.Wa && (a.h.info("Origin Trials enabled."), zb(q(a.hb, a, b)));
      J(0);
      a.W = b;
      a.aa = c || {};
      a.N = a.X;
      a.F = Ec(a, null, a.W);
      Hc(a);
    };
    Y.prototype.close = function() {
      Ic(this.g);
    };
    Y.prototype.u = function(a) {
      if ("string" === typeof a) {
        var b = {};
        b.__data__ = a;
        Md(this.g, b);
      } else
        this.v ? (b = {}, b.__data__ = rb(a), Md(this.g, b)) : Md(this.g, a);
    };
    Y.prototype.M = function() {
      this.g.j = null;
      delete this.j;
      Ic(this.g);
      delete this.g;
      Y.Z.M.call(this);
    };
    t(Ud, ac);
    t(Vd, bc);
    t(Z, Sd);
    Z.prototype.xa = function() {
      D(this.g, "a");
    };
    Z.prototype.wa = function(a) {
      D(this.g, new Ud(a));
    };
    Z.prototype.va = function(a) {
      D(this.g, new Vd(a));
    };
    Z.prototype.ua = function() {
      D(this.g, "b");
    };
    Td.prototype.createWebChannel = Td.prototype.g;
    Y.prototype.send = Y.prototype.u;
    Y.prototype.open = Y.prototype.m;
    Y.prototype.close = Y.prototype.close;
    Wb.NO_ERROR = 0;
    Wb.TIMEOUT = 8;
    Wb.HTTP_ERROR = 6;
    Xb.COMPLETE = "complete";
    $b.EventType = L;
    L.OPEN = "a";
    L.CLOSE = "b";
    L.ERROR = "c";
    L.MESSAGE = "d";
    C.prototype.listen = C.prototype.N;
    X.prototype.listenOnce = X.prototype.O;
    X.prototype.getLastError = X.prototype.La;
    X.prototype.getLastErrorCode = X.prototype.Da;
    X.prototype.getStatus = X.prototype.ba;
    X.prototype.getResponseJson = X.prototype.Qa;
    X.prototype.getResponseText = X.prototype.ga;
    X.prototype.send = X.prototype.ea;
    createWebChannelTransport = esm.createWebChannelTransport = function() {
      return new Td();
    };
    getStatEventTarget = esm.getStatEventTarget = function() {
      return Sb();
    };
    ErrorCode = esm.ErrorCode = Wb;
    EventType = esm.EventType = Xb;
    Event = esm.Event = H;
    Stat = esm.Stat = { rb: 0, ub: 1, vb: 2, Ob: 3, Tb: 4, Qb: 5, Rb: 6, Pb: 7, Nb: 8, Sb: 9, PROXY: 10, NOPROXY: 11, Lb: 12, Hb: 13, Ib: 14, Gb: 15, Jb: 16, Kb: 17, nb: 18, mb: 19, ob: 20 };
    FetchXmlHttpFactory = esm.FetchXmlHttpFactory = pd;
    WebChannel = esm.WebChannel = $b;
    XhrIo = esm.XhrIo = X;
  }
});

// node_modules/@firebase/firestore/dist/index.esm2017.js
function k2() {
  return N2.logLevel;
}
function O2(t2, ...e) {
  if (N2.logLevel <= LogLevel.DEBUG) {
    const n = e.map(B2);
    N2.debug(`Firestore (${x2}): ${t2}`, ...n);
  }
}
function F2(t2, ...e) {
  if (N2.logLevel <= LogLevel.ERROR) {
    const n = e.map(B2);
    N2.error(`Firestore (${x2}): ${t2}`, ...n);
  }
}
function $(t2, ...e) {
  if (N2.logLevel <= LogLevel.WARN) {
    const n = e.map(B2);
    N2.warn(`Firestore (${x2}): ${t2}`, ...n);
  }
}
function B2(t2) {
  if ("string" == typeof t2)
    return t2;
  try {
    return e = t2, JSON.stringify(e);
  } catch (e2) {
    return t2;
  }
  var e;
}
function L2(t2 = "Unexpected state") {
  const e = `FIRESTORE (${x2}) INTERNAL ASSERTION FAILED: ` + t2;
  throw F2(e), new Error(e);
}
function U2(t2, e) {
  t2 || L2();
}
function K2(t2, e) {
  return t2;
}
function nt(t2) {
  const e = "undefined" != typeof self && (self.crypto || self.msCrypto), n = new Uint8Array(t2);
  if (e && "function" == typeof e.getRandomValues)
    e.getRandomValues(n);
  else
    for (let e2 = 0; e2 < t2; e2++)
      n[e2] = Math.floor(256 * Math.random());
  return n;
}
function it(t2, e) {
  return t2 < e ? -1 : t2 > e ? 1 : 0;
}
function rt(t2, e, n) {
  return t2.length === e.length && t2.every((t3, s2) => n(t3, e[s2]));
}
function Tt(t2, e) {
  const n = t2.toTimestamp().seconds, s2 = t2.toTimestamp().nanoseconds + 1, i = ct.fromTimestamp(1e9 === s2 ? new ut(n + 1, 0) : new ut(n, s2));
  return new At(i, dt.empty(), e);
}
function Et(t2) {
  return new At(t2.readTime, t2.key, -1);
}
function Rt(t2, e) {
  let n = t2.readTime.compareTo(e.readTime);
  return 0 !== n ? n : (n = dt.comparator(t2.documentKey, e.documentKey), 0 !== n ? n : it(t2.largestBatchId, e.largestBatchId));
}
async function vt(t2) {
  if (t2.code !== G.FAILED_PRECONDITION || t2.message !== bt)
    throw t2;
  O2("LocalStore", "Unexpectedly lost primary lease");
}
function Nt(t2) {
  return "IndexedDbTransactionError" === t2.name;
}
function Ut(t2) {
  let e = 0;
  for (const n in t2)
    Object.prototype.hasOwnProperty.call(t2, n) && e++;
  return e;
}
function qt(t2, e) {
  for (const n in t2)
    Object.prototype.hasOwnProperty.call(t2, n) && e(n, t2[n]);
}
function Kt(t2) {
  for (const e in t2)
    if (Object.prototype.hasOwnProperty.call(t2, e))
      return false;
  return true;
}
function te(t2) {
  if (U2(!!t2), "string" == typeof t2) {
    let e = 0;
    const n = Zt.exec(t2);
    if (U2(!!n), n[1]) {
      let t3 = n[1];
      t3 = (t3 + "000000000").substr(0, 9), e = Number(t3);
    }
    const s2 = new Date(t2);
    return {
      seconds: Math.floor(s2.getTime() / 1e3),
      nanos: e
    };
  }
  return {
    seconds: ee(t2.seconds),
    nanos: ee(t2.nanos)
  };
}
function ee(t2) {
  return "number" == typeof t2 ? t2 : "string" == typeof t2 ? Number(t2) : 0;
}
function ne(t2) {
  return "string" == typeof t2 ? Xt.fromBase64String(t2) : Xt.fromUint8Array(t2);
}
function se(t2) {
  var e, n;
  return "server_timestamp" === (null === (n = ((null === (e = null == t2 ? void 0 : t2.mapValue) || void 0 === e ? void 0 : e.fields) || {}).__type__) || void 0 === n ? void 0 : n.stringValue);
}
function ie(t2) {
  const e = t2.mapValue.fields.__previous_value__;
  return se(e) ? ie(e) : e;
}
function re(t2) {
  const e = te(t2.mapValue.fields.__local_write_time__.timestampValue);
  return new ut(e.seconds, e.nanos);
}
function ce(t2) {
  return null == t2;
}
function ae(t2) {
  return 0 === t2 && 1 / t2 == -1 / 0;
}
function he(t2) {
  return "number" == typeof t2 && Number.isInteger(t2) && !ae(t2) && t2 <= Number.MAX_SAFE_INTEGER && t2 >= Number.MIN_SAFE_INTEGER;
}
function de(t2) {
  return "nullValue" in t2 ? 0 : "booleanValue" in t2 ? 1 : "integerValue" in t2 || "doubleValue" in t2 ? 2 : "timestampValue" in t2 ? 3 : "stringValue" in t2 ? 5 : "bytesValue" in t2 ? 6 : "referenceValue" in t2 ? 7 : "geoPointValue" in t2 ? 8 : "arrayValue" in t2 ? 9 : "mapValue" in t2 ? se(t2) ? 4 : ve(t2) ? 9007199254740991 : 10 : L2();
}
function _e(t2, e) {
  if (t2 === e)
    return true;
  const n = de(t2);
  if (n !== de(e))
    return false;
  switch (n) {
    case 0:
    case 9007199254740991:
      return true;
    case 1:
      return t2.booleanValue === e.booleanValue;
    case 4:
      return re(t2).isEqual(re(e));
    case 3:
      return function(t3, e2) {
        if ("string" == typeof t3.timestampValue && "string" == typeof e2.timestampValue && t3.timestampValue.length === e2.timestampValue.length)
          return t3.timestampValue === e2.timestampValue;
        const n2 = te(t3.timestampValue), s2 = te(e2.timestampValue);
        return n2.seconds === s2.seconds && n2.nanos === s2.nanos;
      }(t2, e);
    case 5:
      return t2.stringValue === e.stringValue;
    case 6:
      return function(t3, e2) {
        return ne(t3.bytesValue).isEqual(ne(e2.bytesValue));
      }(t2, e);
    case 7:
      return t2.referenceValue === e.referenceValue;
    case 8:
      return function(t3, e2) {
        return ee(t3.geoPointValue.latitude) === ee(e2.geoPointValue.latitude) && ee(t3.geoPointValue.longitude) === ee(e2.geoPointValue.longitude);
      }(t2, e);
    case 2:
      return function(t3, e2) {
        if ("integerValue" in t3 && "integerValue" in e2)
          return ee(t3.integerValue) === ee(e2.integerValue);
        if ("doubleValue" in t3 && "doubleValue" in e2) {
          const n2 = ee(t3.doubleValue), s2 = ee(e2.doubleValue);
          return n2 === s2 ? ae(n2) === ae(s2) : isNaN(n2) && isNaN(s2);
        }
        return false;
      }(t2, e);
    case 9:
      return rt(t2.arrayValue.values || [], e.arrayValue.values || [], _e);
    case 10:
      return function(t3, e2) {
        const n2 = t3.mapValue.fields || {}, s2 = e2.mapValue.fields || {};
        if (Ut(n2) !== Ut(s2))
          return false;
        for (const t4 in n2)
          if (n2.hasOwnProperty(t4) && (void 0 === s2[t4] || !_e(n2[t4], s2[t4])))
            return false;
        return true;
      }(t2, e);
    default:
      return L2();
  }
}
function we(t2, e) {
  return void 0 !== (t2.values || []).find((t3) => _e(t3, e));
}
function me(t2, e) {
  if (t2 === e)
    return 0;
  const n = de(t2), s2 = de(e);
  if (n !== s2)
    return it(n, s2);
  switch (n) {
    case 0:
    case 9007199254740991:
      return 0;
    case 1:
      return it(t2.booleanValue, e.booleanValue);
    case 2:
      return function(t3, e2) {
        const n2 = ee(t3.integerValue || t3.doubleValue), s3 = ee(e2.integerValue || e2.doubleValue);
        return n2 < s3 ? -1 : n2 > s3 ? 1 : n2 === s3 ? 0 : isNaN(n2) ? isNaN(s3) ? 0 : -1 : 1;
      }(t2, e);
    case 3:
      return ge(t2.timestampValue, e.timestampValue);
    case 4:
      return ge(re(t2), re(e));
    case 5:
      return it(t2.stringValue, e.stringValue);
    case 6:
      return function(t3, e2) {
        const n2 = ne(t3), s3 = ne(e2);
        return n2.compareTo(s3);
      }(t2.bytesValue, e.bytesValue);
    case 7:
      return function(t3, e2) {
        const n2 = t3.split("/"), s3 = e2.split("/");
        for (let t4 = 0; t4 < n2.length && t4 < s3.length; t4++) {
          const e3 = it(n2[t4], s3[t4]);
          if (0 !== e3)
            return e3;
        }
        return it(n2.length, s3.length);
      }(t2.referenceValue, e.referenceValue);
    case 8:
      return function(t3, e2) {
        const n2 = it(ee(t3.latitude), ee(e2.latitude));
        if (0 !== n2)
          return n2;
        return it(ee(t3.longitude), ee(e2.longitude));
      }(t2.geoPointValue, e.geoPointValue);
    case 9:
      return function(t3, e2) {
        const n2 = t3.values || [], s3 = e2.values || [];
        for (let t4 = 0; t4 < n2.length && t4 < s3.length; ++t4) {
          const e3 = me(n2[t4], s3[t4]);
          if (e3)
            return e3;
        }
        return it(n2.length, s3.length);
      }(t2.arrayValue, e.arrayValue);
    case 10:
      return function(t3, e2) {
        if (t3 === le.mapValue && e2 === le.mapValue)
          return 0;
        if (t3 === le.mapValue)
          return 1;
        if (e2 === le.mapValue)
          return -1;
        const n2 = t3.fields || {}, s3 = Object.keys(n2), i = e2.fields || {}, r = Object.keys(i);
        s3.sort(), r.sort();
        for (let t4 = 0; t4 < s3.length && t4 < r.length; ++t4) {
          const e3 = it(s3[t4], r[t4]);
          if (0 !== e3)
            return e3;
          const o = me(n2[s3[t4]], i[r[t4]]);
          if (0 !== o)
            return o;
        }
        return it(s3.length, r.length);
      }(t2.mapValue, e.mapValue);
    default:
      throw L2();
  }
}
function ge(t2, e) {
  if ("string" == typeof t2 && "string" == typeof e && t2.length === e.length)
    return it(t2, e);
  const n = te(t2), s2 = te(e), i = it(n.seconds, s2.seconds);
  return 0 !== i ? i : it(n.nanos, s2.nanos);
}
function ye(t2) {
  return pe(t2);
}
function pe(t2) {
  return "nullValue" in t2 ? "null" : "booleanValue" in t2 ? "" + t2.booleanValue : "integerValue" in t2 ? "" + t2.integerValue : "doubleValue" in t2 ? "" + t2.doubleValue : "timestampValue" in t2 ? function(t3) {
    const e2 = te(t3);
    return `time(${e2.seconds},${e2.nanos})`;
  }(t2.timestampValue) : "stringValue" in t2 ? t2.stringValue : "bytesValue" in t2 ? ne(t2.bytesValue).toBase64() : "referenceValue" in t2 ? (n = t2.referenceValue, dt.fromName(n).toString()) : "geoPointValue" in t2 ? `geo(${(e = t2.geoPointValue).latitude},${e.longitude})` : "arrayValue" in t2 ? function(t3) {
    let e2 = "[", n2 = true;
    for (const s2 of t3.values || [])
      n2 ? n2 = false : e2 += ",", e2 += pe(s2);
    return e2 + "]";
  }(t2.arrayValue) : "mapValue" in t2 ? function(t3) {
    const e2 = Object.keys(t3.fields || {}).sort();
    let n2 = "{", s2 = true;
    for (const i of e2)
      s2 ? s2 = false : n2 += ",", n2 += `${i}:${pe(t3.fields[i])}`;
    return n2 + "}";
  }(t2.mapValue) : L2();
  var e, n;
}
function Ie(t2, e) {
  return {
    referenceValue: `projects/${t2.projectId}/databases/${t2.database}/documents/${e.path.canonicalString()}`
  };
}
function Te(t2) {
  return !!t2 && "integerValue" in t2;
}
function Ee(t2) {
  return !!t2 && "arrayValue" in t2;
}
function Ae(t2) {
  return !!t2 && "nullValue" in t2;
}
function Re(t2) {
  return !!t2 && "doubleValue" in t2 && isNaN(Number(t2.doubleValue));
}
function be(t2) {
  return !!t2 && "mapValue" in t2;
}
function Pe(t2) {
  if (t2.geoPointValue)
    return {
      geoPointValue: Object.assign({}, t2.geoPointValue)
    };
  if (t2.timestampValue && "object" == typeof t2.timestampValue)
    return {
      timestampValue: Object.assign({}, t2.timestampValue)
    };
  if (t2.mapValue) {
    const e = {
      mapValue: {
        fields: {}
      }
    };
    return qt(t2.mapValue.fields, (t3, n) => e.mapValue.fields[t3] = Pe(n)), e;
  }
  if (t2.arrayValue) {
    const e = {
      arrayValue: {
        values: []
      }
    };
    for (let n = 0; n < (t2.arrayValue.values || []).length; ++n)
      e.arrayValue.values[n] = Pe(t2.arrayValue.values[n]);
    return e;
  }
  return Object.assign({}, t2);
}
function ve(t2) {
  return "__max__" === (((t2.mapValue || {}).fields || {}).__type__ || {}).stringValue;
}
function Oe(t2, e = null, n = [], s2 = [], i = null, r = null, o = null) {
  return new Me(t2, e, n, s2, i, r, o);
}
function Fe(t2) {
  const e = K2(t2);
  if (null === e.ht) {
    let t3 = e.path.canonicalString();
    null !== e.collectionGroup && (t3 += "|cg:" + e.collectionGroup), t3 += "|f:", t3 += e.filters.map((t4) => {
      return (e2 = t4).field.canonicalString() + e2.op.toString() + ye(e2.value);
      var e2;
    }).join(","), t3 += "|ob:", t3 += e.orderBy.map((t4) => function(t5) {
      return t5.field.canonicalString() + t5.dir;
    }(t4)).join(","), ce(e.limit) || (t3 += "|l:", t3 += e.limit), e.startAt && (t3 += "|lb:", t3 += e.startAt.inclusive ? "b:" : "a:", t3 += e.startAt.position.map((t4) => ye(t4)).join(",")), e.endAt && (t3 += "|ub:", t3 += e.endAt.inclusive ? "a:" : "b:", t3 += e.endAt.position.map((t4) => ye(t4)).join(",")), e.ht = t3;
  }
  return e.ht;
}
function $e(t2) {
  let e = t2.path.canonicalString();
  return null !== t2.collectionGroup && (e += " collectionGroup=" + t2.collectionGroup), t2.filters.length > 0 && (e += `, filters: [${t2.filters.map((t3) => {
    return `${(e2 = t3).field.canonicalString()} ${e2.op} ${ye(e2.value)}`;
    var e2;
  }).join(", ")}]`), ce(t2.limit) || (e += ", limit: " + t2.limit), t2.orderBy.length > 0 && (e += `, orderBy: [${t2.orderBy.map((t3) => function(t4) {
    return `${t4.field.canonicalString()} (${t4.dir})`;
  }(t3)).join(", ")}]`), t2.startAt && (e += ", startAt: ", e += t2.startAt.inclusive ? "b:" : "a:", e += t2.startAt.position.map((t3) => ye(t3)).join(",")), t2.endAt && (e += ", endAt: ", e += t2.endAt.inclusive ? "a:" : "b:", e += t2.endAt.position.map((t3) => ye(t3)).join(",")), `Target(${e})`;
}
function Be(t2, e) {
  if (t2.limit !== e.limit)
    return false;
  if (t2.orderBy.length !== e.orderBy.length)
    return false;
  for (let n2 = 0; n2 < t2.orderBy.length; n2++)
    if (!en(t2.orderBy[n2], e.orderBy[n2]))
      return false;
  if (t2.filters.length !== e.filters.length)
    return false;
  for (let i = 0; i < t2.filters.length; i++)
    if (n = t2.filters[i], s2 = e.filters[i], n.op !== s2.op || !n.field.isEqual(s2.field) || !_e(n.value, s2.value))
      return false;
  var n, s2;
  return t2.collectionGroup === e.collectionGroup && (!!t2.path.isEqual(e.path) && (!!sn(t2.startAt, e.startAt) && sn(t2.endAt, e.endAt)));
}
function Le(t2) {
  return dt.isDocumentKey(t2.path) && null === t2.collectionGroup && 0 === t2.filters.length;
}
function ze(t2, e) {
  var n;
  return ((null === (n = e.arrayValue) || void 0 === n ? void 0 : n.values) || []).map((t3) => dt.fromName(t3.referenceValue));
}
function en(t2, e) {
  return t2.dir === e.dir && t2.field.isEqual(e.field);
}
function nn(t2, e, n) {
  let s2 = 0;
  for (let i = 0; i < t2.position.length; i++) {
    const r = e[i], o = t2.position[i];
    if (r.field.isKeyField())
      s2 = dt.comparator(dt.fromName(o.referenceValue), n.key);
    else {
      s2 = me(o, n.data.field(r.field));
    }
    if ("desc" === r.dir && (s2 *= -1), 0 !== s2)
      break;
  }
  return s2;
}
function sn(t2, e) {
  if (null === t2)
    return null === e;
  if (null === e)
    return false;
  if (t2.inclusive !== e.inclusive || t2.position.length !== e.position.length)
    return false;
  for (let n = 0; n < t2.position.length; n++) {
    if (!_e(t2.position[n], e.position[n]))
      return false;
  }
  return true;
}
function on(t2, e, n, s2, i, r, o, u) {
  return new rn(t2, e, n, s2, i, r, o, u);
}
function un(t2) {
  return new rn(t2);
}
function cn(t2) {
  return 0 === t2.filters.length && null === t2.limit && null == t2.startAt && null == t2.endAt && (0 === t2.explicitOrderBy.length || 1 === t2.explicitOrderBy.length && t2.explicitOrderBy[0].field.isKeyField());
}
function an(t2) {
  return t2.explicitOrderBy.length > 0 ? t2.explicitOrderBy[0].field : null;
}
function hn(t2) {
  for (const e of t2.filters)
    if (e.dt())
      return e.field;
  return null;
}
function ln(t2) {
  return null !== t2.collectionGroup;
}
function fn(t2) {
  const e = K2(t2);
  if (null === e._t) {
    e._t = [];
    const t3 = hn(e), n = an(e);
    if (null !== t3 && null === n)
      t3.isKeyField() || e._t.push(new tn(t3)), e._t.push(new tn(ft.keyField(), "asc"));
    else {
      let t4 = false;
      for (const n2 of e.explicitOrderBy)
        e._t.push(n2), n2.field.isKeyField() && (t4 = true);
      if (!t4) {
        const t5 = e.explicitOrderBy.length > 0 ? e.explicitOrderBy[e.explicitOrderBy.length - 1].dir : "asc";
        e._t.push(new tn(ft.keyField(), t5));
      }
    }
  }
  return e._t;
}
function dn(t2) {
  const e = K2(t2);
  if (!e.wt)
    if ("F" === e.limitType)
      e.wt = Oe(e.path, e.collectionGroup, fn(e), e.filters, e.limit, e.startAt, e.endAt);
    else {
      const t3 = [];
      for (const n2 of fn(e)) {
        const e2 = "desc" === n2.dir ? "asc" : "desc";
        t3.push(new tn(n2.field, e2));
      }
      const n = e.endAt ? new Ze(e.endAt.position, e.endAt.inclusive) : null, s2 = e.startAt ? new Ze(e.startAt.position, e.startAt.inclusive) : null;
      e.wt = Oe(e.path, e.collectionGroup, t3, e.filters, e.limit, n, s2);
    }
  return e.wt;
}
function _n(t2, e, n) {
  return new rn(t2.path, t2.collectionGroup, t2.explicitOrderBy.slice(), t2.filters.slice(), e, n, t2.startAt, t2.endAt);
}
function wn(t2, e) {
  return Be(dn(t2), dn(e)) && t2.limitType === e.limitType;
}
function mn(t2) {
  return `${Fe(dn(t2))}|lt:${t2.limitType}`;
}
function gn(t2) {
  return `Query(target=${$e(dn(t2))}; limitType=${t2.limitType})`;
}
function yn(t2, e) {
  return e.isFoundDocument() && function(t3, e2) {
    const n = e2.key.path;
    return null !== t3.collectionGroup ? e2.key.hasCollectionId(t3.collectionGroup) && t3.path.isPrefixOf(n) : dt.isDocumentKey(t3.path) ? t3.path.isEqual(n) : t3.path.isImmediateParentOf(n);
  }(t2, e) && function(t3, e2) {
    for (const n of t3.explicitOrderBy)
      if (!n.field.isKeyField() && null === e2.data.field(n.field))
        return false;
    return true;
  }(t2, e) && function(t3, e2) {
    for (const n of t3.filters)
      if (!n.matches(e2))
        return false;
    return true;
  }(t2, e) && function(t3, e2) {
    if (t3.startAt && !function(t4, e3, n) {
      const s2 = nn(t4, e3, n);
      return t4.inclusive ? s2 <= 0 : s2 < 0;
    }(t3.startAt, fn(t3), e2))
      return false;
    if (t3.endAt && !function(t4, e3, n) {
      const s2 = nn(t4, e3, n);
      return t4.inclusive ? s2 >= 0 : s2 > 0;
    }(t3.endAt, fn(t3), e2))
      return false;
    return true;
  }(t2, e);
}
function pn(t2) {
  return t2.collectionGroup || (t2.path.length % 2 == 1 ? t2.path.lastSegment() : t2.path.get(t2.path.length - 2));
}
function In(t2) {
  return (e, n) => {
    let s2 = false;
    for (const i of fn(t2)) {
      const t3 = Tn(i, e, n);
      if (0 !== t3)
        return t3;
      s2 = s2 || i.field.isKeyField();
    }
    return 0;
  };
}
function Tn(t2, e, n) {
  const s2 = t2.field.isKeyField() ? dt.comparator(e.key, n.key) : function(t3, e2, n2) {
    const s3 = e2.data.field(t3), i = n2.data.field(t3);
    return null !== s3 && null !== i ? me(s3, i) : L2();
  }(t2.field, e, n);
  switch (t2.dir) {
    case "asc":
      return s2;
    case "desc":
      return -1 * s2;
    default:
      return L2();
  }
}
function En(t2, e) {
  if (t2.gt) {
    if (isNaN(e))
      return {
        doubleValue: "NaN"
      };
    if (e === 1 / 0)
      return {
        doubleValue: "Infinity"
      };
    if (e === -1 / 0)
      return {
        doubleValue: "-Infinity"
      };
  }
  return {
    doubleValue: ae(e) ? "-0" : e
  };
}
function An(t2) {
  return {
    integerValue: "" + t2
  };
}
function Rn(t2, e) {
  return he(e) ? An(e) : En(t2, e);
}
function Pn(t2, e, n) {
  return t2 instanceof Sn ? function(t3, e2) {
    const n2 = {
      fields: {
        __type__: {
          stringValue: "server_timestamp"
        },
        __local_write_time__: {
          timestampValue: {
            seconds: t3.seconds,
            nanos: t3.nanoseconds
          }
        }
      }
    };
    return e2 && (n2.fields.__previous_value__ = e2), {
      mapValue: n2
    };
  }(n, e) : t2 instanceof Dn ? Cn(t2, e) : t2 instanceof xn ? Nn(t2, e) : function(t3, e2) {
    const n2 = Vn(t3, e2), s2 = Mn(n2) + Mn(t3.yt);
    return Te(n2) && Te(t3.yt) ? An(s2) : En(t3.It, s2);
  }(t2, e);
}
function vn(t2, e, n) {
  return t2 instanceof Dn ? Cn(t2, e) : t2 instanceof xn ? Nn(t2, e) : n;
}
function Vn(t2, e) {
  return t2 instanceof kn ? Te(n = e) || function(t3) {
    return !!t3 && "doubleValue" in t3;
  }(n) ? e : {
    integerValue: 0
  } : null;
  var n;
}
function Cn(t2, e) {
  const n = On(e);
  for (const e2 of t2.elements)
    n.some((t3) => _e(t3, e2)) || n.push(e2);
  return {
    arrayValue: {
      values: n
    }
  };
}
function Nn(t2, e) {
  let n = On(e);
  for (const e2 of t2.elements)
    n = n.filter((t3) => !_e(t3, e2));
  return {
    arrayValue: {
      values: n
    }
  };
}
function Mn(t2) {
  return ee(t2.integerValue || t2.doubleValue);
}
function On(t2) {
  return Ee(t2) && t2.arrayValue.values ? t2.arrayValue.values.slice() : [];
}
function $n(t2, e) {
  return t2.field.isEqual(e.field) && function(t3, e2) {
    return t3 instanceof Dn && e2 instanceof Dn || t3 instanceof xn && e2 instanceof xn ? rt(t3.elements, e2.elements, _e) : t3 instanceof kn && e2 instanceof kn ? _e(t3.yt, e2.yt) : t3 instanceof Sn && e2 instanceof Sn;
  }(t2.transform, e.transform);
}
function Un(t2, e) {
  return void 0 !== t2.updateTime ? e.isFoundDocument() && e.version.isEqual(t2.updateTime) : void 0 === t2.exists || t2.exists === e.isFoundDocument();
}
function Kn(t2, e) {
  if (!t2.hasLocalMutations || e && 0 === e.fields.length)
    return null;
  if (null === e)
    return t2.isNoDocument() ? new Zn(t2.key, Ln.none()) : new zn(t2.key, t2.data, Ln.none());
  {
    const n = t2.data, s2 = xe.empty();
    let i = new Wt(ft.comparator);
    for (let t3 of e.fields)
      if (!i.has(t3)) {
        let e2 = n.field(t3);
        null === e2 && t3.length > 1 && (t3 = t3.popLast(), e2 = n.field(t3)), null === e2 ? s2.delete(t3) : s2.set(t3, e2), i = i.add(t3);
      }
    return new Hn(t2.key, s2, new Jt(i.toArray()), Ln.none());
  }
}
function Gn(t2, e, n) {
  t2 instanceof zn ? function(t3, e2, n2) {
    const s2 = t3.value.clone(), i = Yn(t3.fieldTransforms, e2, n2.transformResults);
    s2.setAll(i), e2.convertToFoundDocument(n2.version, s2).setHasCommittedMutations();
  }(t2, e, n) : t2 instanceof Hn ? function(t3, e2, n2) {
    if (!Un(t3.precondition, e2))
      return void e2.convertToUnknownDocument(n2.version);
    const s2 = Yn(t3.fieldTransforms, e2, n2.transformResults), i = e2.data;
    i.setAll(Jn(t3)), i.setAll(s2), e2.convertToFoundDocument(n2.version, i).setHasCommittedMutations();
  }(t2, e, n) : function(t3, e2, n2) {
    e2.convertToNoDocument(n2.version).setHasCommittedMutations();
  }(0, e, n);
}
function Qn(t2, e, n, s2) {
  return t2 instanceof zn ? function(t3, e2, n2, s3) {
    if (!Un(t3.precondition, e2))
      return n2;
    const i = t3.value.clone(), r = Xn(t3.fieldTransforms, s3, e2);
    return i.setAll(r), e2.convertToFoundDocument(e2.version, i).setHasLocalMutations(), null;
  }(t2, e, n, s2) : t2 instanceof Hn ? function(t3, e2, n2, s3) {
    if (!Un(t3.precondition, e2))
      return n2;
    const i = Xn(t3.fieldTransforms, s3, e2), r = e2.data;
    if (r.setAll(Jn(t3)), r.setAll(i), e2.convertToFoundDocument(e2.version, r).setHasLocalMutations(), null === n2)
      return null;
    return n2.unionWith(t3.fieldMask.fields).unionWith(t3.fieldTransforms.map((t4) => t4.field));
  }(t2, e, n, s2) : function(t3, e2, n2) {
    if (Un(t3.precondition, e2))
      return e2.convertToNoDocument(e2.version).setHasLocalMutations(), null;
    return n2;
  }(t2, e, n);
}
function Wn(t2, e) {
  return t2.type === e.type && (!!t2.key.isEqual(e.key) && (!!t2.precondition.isEqual(e.precondition) && (!!function(t3, e2) {
    return void 0 === t3 && void 0 === e2 || !(!t3 || !e2) && rt(t3, e2, (t4, e3) => $n(t4, e3));
  }(t2.fieldTransforms, e.fieldTransforms) && (0 === t2.type ? t2.value.isEqual(e.value) : 1 !== t2.type || t2.data.isEqual(e.data) && t2.fieldMask.isEqual(e.fieldMask)))));
}
function Jn(t2) {
  const e = /* @__PURE__ */ new Map();
  return t2.fieldMask.fields.forEach((n) => {
    if (!n.isEmpty()) {
      const s2 = t2.data.field(n);
      e.set(n, s2);
    }
  }), e;
}
function Yn(t2, e, n) {
  const s2 = /* @__PURE__ */ new Map();
  U2(t2.length === n.length);
  for (let i = 0; i < n.length; i++) {
    const r = t2[i], o = r.transform, u = e.data.field(r.field);
    s2.set(r.field, vn(o, u, n[i]));
  }
  return s2;
}
function Xn(t2, e, n) {
  const s2 = /* @__PURE__ */ new Map();
  for (const i of t2) {
    const t3 = i.transform, r = n.data.field(i.field);
    s2.set(i.field, Pn(t3, r, e));
  }
  return s2;
}
function rs(t2) {
  if (void 0 === t2)
    return F2("GRPC error has no .code"), G.UNKNOWN;
  switch (t2) {
    case ns.OK:
      return G.OK;
    case ns.CANCELLED:
      return G.CANCELLED;
    case ns.UNKNOWN:
      return G.UNKNOWN;
    case ns.DEADLINE_EXCEEDED:
      return G.DEADLINE_EXCEEDED;
    case ns.RESOURCE_EXHAUSTED:
      return G.RESOURCE_EXHAUSTED;
    case ns.INTERNAL:
      return G.INTERNAL;
    case ns.UNAVAILABLE:
      return G.UNAVAILABLE;
    case ns.UNAUTHENTICATED:
      return G.UNAUTHENTICATED;
    case ns.INVALID_ARGUMENT:
      return G.INVALID_ARGUMENT;
    case ns.NOT_FOUND:
      return G.NOT_FOUND;
    case ns.ALREADY_EXISTS:
      return G.ALREADY_EXISTS;
    case ns.PERMISSION_DENIED:
      return G.PERMISSION_DENIED;
    case ns.FAILED_PRECONDITION:
      return G.FAILED_PRECONDITION;
    case ns.ABORTED:
      return G.ABORTED;
    case ns.OUT_OF_RANGE:
      return G.OUT_OF_RANGE;
    case ns.UNIMPLEMENTED:
      return G.UNIMPLEMENTED;
    case ns.DATA_LOSS:
      return G.DATA_LOSS;
    default:
      return L2();
  }
}
function cs() {
  return us;
}
function hs(...t2) {
  let e = as;
  for (const n of t2)
    e = e.insert(n.key, n);
  return e;
}
function ls(t2) {
  let e = as;
  return t2.forEach((t3, n) => e = e.insert(t3, n.overlayedDocument)), e;
}
function fs() {
  return _s();
}
function ds() {
  return _s();
}
function _s() {
  return new os((t2) => t2.toString(), (t2, e) => t2.isEqual(e));
}
function gs(...t2) {
  let e = ms;
  for (const n of t2)
    e = e.add(n);
  return e;
}
function ps() {
  return ys;
}
function vs() {
  return new Gt(dt.comparator);
}
function Vs() {
  return new Gt(dt.comparator);
}
function xs(t2, e) {
  if (t2.gt) {
    return `${new Date(1e3 * e.seconds).toISOString().replace(/\.\d*/, "").replace("Z", "")}.${("000000000" + e.nanoseconds).slice(-9)}Z`;
  }
  return {
    seconds: "" + e.seconds,
    nanos: e.nanoseconds
  };
}
function Ns(t2, e) {
  return t2.gt ? e.toBase64() : e.toUint8Array();
}
function Ms(t2) {
  return U2(!!t2), ct.fromTimestamp(function(t3) {
    const e = te(t3);
    return new ut(e.seconds, e.nanos);
  }(t2));
}
function Os(t2, e) {
  return function(t3) {
    return new ht(["projects", t3.projectId, "databases", t3.database]);
  }(t2).child("documents").child(e).canonicalString();
}
function Fs(t2) {
  const e = ht.fromString(t2);
  return U2(ai(e)), e;
}
function Bs(t2, e) {
  const n = Fs(e);
  if (n.get(1) !== t2.databaseId.projectId)
    throw new Q2(G.INVALID_ARGUMENT, "Tried to deserialize key from different project: " + n.get(1) + " vs " + t2.databaseId.projectId);
  if (n.get(3) !== t2.databaseId.database)
    throw new Q2(G.INVALID_ARGUMENT, "Tried to deserialize key from different database: " + n.get(3) + " vs " + t2.databaseId.database);
  return new dt(Ks(n));
}
function Ls(t2, e) {
  return Os(t2.databaseId, e);
}
function Us(t2) {
  const e = Fs(t2);
  return 4 === e.length ? ht.emptyPath() : Ks(e);
}
function qs(t2) {
  return new ht(["projects", t2.databaseId.projectId, "databases", t2.databaseId.database]).canonicalString();
}
function Ks(t2) {
  return U2(t2.length > 4 && "documents" === t2.get(4)), t2.popFirst(5);
}
function Ws(t2, e) {
  let n;
  if ("targetChange" in e) {
    e.targetChange;
    const s2 = function(t3) {
      return "NO_CHANGE" === t3 ? 0 : "ADD" === t3 ? 1 : "REMOVE" === t3 ? 2 : "CURRENT" === t3 ? 3 : "RESET" === t3 ? 4 : L2();
    }(e.targetChange.targetChangeType || "NO_CHANGE"), i = e.targetChange.targetIds || [], r = function(t3, e2) {
      return t3.gt ? (U2(void 0 === e2 || "string" == typeof e2), Xt.fromBase64String(e2 || "")) : (U2(void 0 === e2 || e2 instanceof Uint8Array), Xt.fromUint8Array(e2 || new Uint8Array()));
    }(t2, e.targetChange.resumeToken), o = e.targetChange.cause, u = o && function(t3) {
      const e2 = void 0 === t3.code ? G.UNKNOWN : rs(t3.code);
      return new Q2(e2, t3.message || "");
    }(o);
    n = new Rs(s2, i, r, u || null);
  } else if ("documentChange" in e) {
    e.documentChange;
    const s2 = e.documentChange;
    s2.document, s2.document.name, s2.document.updateTime;
    const i = Bs(t2, s2.document.name), r = Ms(s2.document.updateTime), o = new xe({
      mapValue: {
        fields: s2.document.fields
      }
    }), u = ke.newFoundDocument(i, r, o), c = s2.targetIds || [], a = s2.removedTargetIds || [];
    n = new Es(c, a, u.key, u);
  } else if ("documentDelete" in e) {
    e.documentDelete;
    const s2 = e.documentDelete;
    s2.document;
    const i = Bs(t2, s2.document), r = s2.readTime ? Ms(s2.readTime) : ct.min(), o = ke.newNoDocument(i, r), u = s2.removedTargetIds || [];
    n = new Es([], u, o.key, o);
  } else if ("documentRemove" in e) {
    e.documentRemove;
    const s2 = e.documentRemove;
    s2.document;
    const i = Bs(t2, s2.document), r = s2.removedTargetIds || [];
    n = new Es([], r, i, null);
  } else {
    if (!("filter" in e))
      return L2();
    {
      e.filter;
      const t3 = e.filter;
      t3.targetId;
      const s2 = t3.count || 0, i = new es(s2), r = t3.targetId;
      n = new As(r, i);
    }
  }
  return n;
}
function Ys(t2, e) {
  return {
    documents: [Ls(t2, e.path)]
  };
}
function Xs(t2, e) {
  const n = {
    structuredQuery: {}
  }, s2 = e.path;
  null !== e.collectionGroup ? (n.parent = Ls(t2, s2), n.structuredQuery.from = [{
    collectionId: e.collectionGroup,
    allDescendants: true
  }]) : (n.parent = Ls(t2, s2.popLast()), n.structuredQuery.from = [{
    collectionId: s2.lastSegment()
  }]);
  const i = function(t3) {
    if (0 === t3.length)
      return;
    const e2 = t3.map((t4) => function(t5) {
      if ("==" === t5.op) {
        if (Re(t5.value))
          return {
            unaryFilter: {
              field: ii(t5.field),
              op: "IS_NAN"
            }
          };
        if (Ae(t5.value))
          return {
            unaryFilter: {
              field: ii(t5.field),
              op: "IS_NULL"
            }
          };
      } else if ("!=" === t5.op) {
        if (Re(t5.value))
          return {
            unaryFilter: {
              field: ii(t5.field),
              op: "IS_NOT_NAN"
            }
          };
        if (Ae(t5.value))
          return {
            unaryFilter: {
              field: ii(t5.field),
              op: "IS_NOT_NULL"
            }
          };
      }
      return {
        fieldFilter: {
          field: ii(t5.field),
          op: si(t5.op),
          value: t5.value
        }
      };
    }(t4));
    if (1 === e2.length)
      return e2[0];
    return {
      compositeFilter: {
        op: "AND",
        filters: e2
      }
    };
  }(e.filters);
  i && (n.structuredQuery.where = i);
  const r = function(t3) {
    if (0 === t3.length)
      return;
    return t3.map((t4) => function(t5) {
      return {
        field: ii(t5.field),
        direction: ni(t5.dir)
      };
    }(t4));
  }(e.orderBy);
  r && (n.structuredQuery.orderBy = r);
  const o = function(t3, e2) {
    return t3.gt || ce(e2) ? e2 : {
      value: e2
    };
  }(t2, e.limit);
  var u;
  return null !== o && (n.structuredQuery.limit = o), e.startAt && (n.structuredQuery.startAt = {
    before: (u = e.startAt).inclusive,
    values: u.position
  }), e.endAt && (n.structuredQuery.endAt = function(t3) {
    return {
      before: !t3.inclusive,
      values: t3.position
    };
  }(e.endAt)), n;
}
function Zs(t2) {
  let e = Us(t2.parent);
  const n = t2.structuredQuery, s2 = n.from ? n.from.length : 0;
  let i = null;
  if (s2 > 0) {
    U2(1 === s2);
    const t3 = n.from[0];
    t3.allDescendants ? i = t3.collectionId : e = e.child(t3.collectionId);
  }
  let r = [];
  n.where && (r = ei(n.where));
  let o = [];
  n.orderBy && (o = n.orderBy.map((t3) => function(t4) {
    return new tn(
      ri(t4.field),
      function(t5) {
        switch (t5) {
          case "ASCENDING":
            return "asc";
          case "DESCENDING":
            return "desc";
          default:
            return;
        }
      }(t4.direction)
    );
  }(t3)));
  let u = null;
  n.limit && (u = function(t3) {
    let e2;
    return e2 = "object" == typeof t3 ? t3.value : t3, ce(e2) ? null : e2;
  }(n.limit));
  let c = null;
  n.startAt && (c = function(t3) {
    const e2 = !!t3.before, n2 = t3.values || [];
    return new Ze(n2, e2);
  }(n.startAt));
  let a = null;
  return n.endAt && (a = function(t3) {
    const e2 = !t3.before, n2 = t3.values || [];
    return new Ze(n2, e2);
  }(n.endAt)), on(e, i, o, r, u, "F", c, a);
}
function ti(t2, e) {
  const n = function(t3, e2) {
    switch (e2) {
      case 0:
        return null;
      case 1:
        return "existence-filter-mismatch";
      case 2:
        return "limbo-document";
      default:
        return L2();
    }
  }(0, e.purpose);
  return null == n ? null : {
    "goog-listen-tags": n
  };
}
function ei(t2) {
  return t2 ? void 0 !== t2.unaryFilter ? [ui(t2)] : void 0 !== t2.fieldFilter ? [oi(t2)] : void 0 !== t2.compositeFilter ? t2.compositeFilter.filters.map((t3) => ei(t3)).reduce((t3, e) => t3.concat(e)) : L2() : [];
}
function ni(t2) {
  return Ss[t2];
}
function si(t2) {
  return Ds[t2];
}
function ii(t2) {
  return {
    fieldPath: t2.canonicalString()
  };
}
function ri(t2) {
  return ft.fromServerFormat(t2.fieldPath);
}
function oi(t2) {
  return Ge.create(ri(t2.fieldFilter.field), function(t3) {
    switch (t3) {
      case "EQUAL":
        return "==";
      case "NOT_EQUAL":
        return "!=";
      case "GREATER_THAN":
        return ">";
      case "GREATER_THAN_OR_EQUAL":
        return ">=";
      case "LESS_THAN":
        return "<";
      case "LESS_THAN_OR_EQUAL":
        return "<=";
      case "ARRAY_CONTAINS":
        return "array-contains";
      case "IN":
        return "in";
      case "NOT_IN":
        return "not-in";
      case "ARRAY_CONTAINS_ANY":
        return "array-contains-any";
      default:
        return L2();
    }
  }(t2.fieldFilter.op), t2.fieldFilter.value);
}
function ui(t2) {
  switch (t2.unaryFilter.op) {
    case "IS_NAN":
      const e = ri(t2.unaryFilter.field);
      return Ge.create(e, "==", {
        doubleValue: NaN
      });
    case "IS_NULL":
      const n = ri(t2.unaryFilter.field);
      return Ge.create(n, "==", {
        nullValue: "NULL_VALUE"
      });
    case "IS_NOT_NAN":
      const s2 = ri(t2.unaryFilter.field);
      return Ge.create(s2, "!=", {
        doubleValue: NaN
      });
    case "IS_NOT_NULL":
      const i = ri(t2.unaryFilter.field);
      return Ge.create(i, "!=", {
        nullValue: "NULL_VALUE"
      });
    default:
      return L2();
  }
}
function ai(t2) {
  return t2.length >= 4 && "projects" === t2.get(0) && "databases" === t2.get(2);
}
function Xi(t2) {
  const e = Zs({
    parent: t2.parent,
    structuredQuery: t2.structuredQuery
  });
  return "LAST" === t2.limitType ? _n(e, e.limit, "L") : e;
}
function Po(t2, e, n, s2) {
  return new bo(t2, e, n, s2);
}
async function vo(t2, e) {
  const n = K2(t2);
  return await n.persistence.runTransaction("Handle user change", "readonly", (t3) => {
    let s2;
    return n.mutationQueue.getAllMutationBatches(t3).next((i) => (s2 = i, n.Qi(e), n.mutationQueue.getAllMutationBatches(t3))).next((e2) => {
      const i = [], r = [];
      let o = gs();
      for (const t4 of s2) {
        i.push(t4.batchId);
        for (const e3 of t4.mutations)
          o = o.add(e3.key);
      }
      for (const t4 of e2) {
        r.push(t4.batchId);
        for (const e3 of t4.mutations)
          o = o.add(e3.key);
      }
      return n.localDocuments.getDocuments(t3, o).next((t4) => ({
        ji: t4,
        removedBatchIds: i,
        addedBatchIds: r
      }));
    });
  });
}
function So(t2) {
  const e = K2(t2);
  return e.persistence.runTransaction("Get last remote snapshot version", "readonly", (t3) => e.Cs.getLastRemoteSnapshotVersion(t3));
}
function Do(t2, e) {
  const n = K2(t2), s2 = e.snapshotVersion;
  let i = n.Ui;
  return n.persistence.runTransaction("Apply remote event", "readwrite-primary", (t3) => {
    const r = n.Gi.newChangeBuffer({
      trackRemovals: true
    });
    i = n.Ui;
    const o = [];
    e.targetChanges.forEach((r2, u2) => {
      const c2 = i.get(u2);
      if (!c2)
        return;
      o.push(n.Cs.removeMatchingKeys(t3, r2.removedDocuments, u2).next(() => n.Cs.addMatchingKeys(t3, r2.addedDocuments, u2)));
      let a = c2.withSequenceNumber(t3.currentSequenceNumber);
      e.targetMismatches.has(u2) ? a = a.withResumeToken(Xt.EMPTY_BYTE_STRING, ct.min()).withLastLimboFreeSnapshotVersion(ct.min()) : r2.resumeToken.approximateByteSize() > 0 && (a = a.withResumeToken(r2.resumeToken, s2)), i = i.insert(u2, a), function(t4, e2, n2) {
        if (0 === t4.resumeToken.approximateByteSize())
          return true;
        if (e2.snapshotVersion.toMicroseconds() - t4.snapshotVersion.toMicroseconds() >= 3e8)
          return true;
        return n2.addedDocuments.size + n2.modifiedDocuments.size + n2.removedDocuments.size > 0;
      }(c2, a, r2) && o.push(n.Cs.updateTargetData(t3, a));
    });
    let u = cs(), c = gs();
    if (e.documentUpdates.forEach((s3) => {
      e.resolvedLimboDocuments.has(s3) && o.push(n.persistence.referenceDelegate.updateLimboDocument(t3, s3));
    }), o.push(Co(t3, r, e.documentUpdates).next((t4) => {
      u = t4.Wi, c = t4.zi;
    })), !s2.isEqual(ct.min())) {
      const e2 = n.Cs.getLastRemoteSnapshotVersion(t3).next((e3) => n.Cs.setTargetsMetadata(t3, t3.currentSequenceNumber, s2));
      o.push(e2);
    }
    return Vt.waitFor(o).next(() => r.apply(t3)).next(() => n.localDocuments.getLocalViewOfDocuments(t3, u, c)).next(() => u);
  }).then((t3) => (n.Ui = i, t3));
}
function Co(t2, e, n) {
  let s2 = gs(), i = gs();
  return n.forEach((t3) => s2 = s2.add(t3)), e.getEntries(t2, s2).next((t3) => {
    let s3 = cs();
    return n.forEach((n2, r) => {
      const o = t3.get(n2);
      r.isFoundDocument() !== o.isFoundDocument() && (i = i.add(n2)), r.isNoDocument() && r.version.isEqual(ct.min()) ? (e.removeEntry(n2, r.readTime), s3 = s3.insert(n2, r)) : !o.isValidDocument() || r.version.compareTo(o.version) > 0 || 0 === r.version.compareTo(o.version) && o.hasPendingWrites ? (e.addEntry(r), s3 = s3.insert(n2, r)) : O2("LocalStore", "Ignoring outdated watch update for ", n2, ". Current version:", o.version, " Watch version:", r.version);
    }), {
      Wi: s3,
      zi: i
    };
  });
}
function No(t2, e) {
  const n = K2(t2);
  return n.persistence.runTransaction("Allocate target", "readwrite", (t3) => {
    let s2;
    return n.Cs.getTargetData(t3, e).next((i) => i ? (s2 = i, Vt.resolve(s2)) : n.Cs.allocateTargetId(t3).next((i2) => (s2 = new qi(e, i2, 0, t3.currentSequenceNumber), n.Cs.addTargetData(t3, s2).next(() => s2))));
  }).then((t3) => {
    const s2 = n.Ui.get(t3.targetId);
    return (null === s2 || t3.snapshotVersion.compareTo(s2.snapshotVersion) > 0) && (n.Ui = n.Ui.insert(t3.targetId, t3), n.qi.set(e, t3.targetId)), t3;
  });
}
async function ko(t2, e, n) {
  const s2 = K2(t2), i = s2.Ui.get(e), r = n ? "readwrite" : "readwrite-primary";
  try {
    n || await s2.persistence.runTransaction("Release target", r, (t3) => s2.persistence.referenceDelegate.removeTarget(t3, i));
  } catch (t3) {
    if (!Nt(t3))
      throw t3;
    O2("LocalStore", `Failed to update sequence numbers for target ${e}: ${t3}`);
  }
  s2.Ui = s2.Ui.remove(e), s2.qi.delete(i.target);
}
function Mo(t2, e, n) {
  const s2 = K2(t2);
  let i = ct.min(), r = gs();
  return s2.persistence.runTransaction("Execute query", "readonly", (t3) => function(t4, e2, n2) {
    const s3 = K2(t4), i2 = s3.qi.get(n2);
    return void 0 !== i2 ? Vt.resolve(s3.Ui.get(i2)) : s3.Cs.getTargetData(e2, n2);
  }(s2, t3, dn(e)).next((e2) => {
    if (e2)
      return i = e2.lastLimboFreeSnapshotVersion, s2.Cs.getMatchingKeysForTargetId(t3, e2.targetId).next((t4) => {
        r = t4;
      });
  }).next(() => s2.Li.getDocumentsMatchingQuery(t3, e, n ? i : ct.min(), n ? r : gs())).next((t4) => ($o(s2, pn(e), t4), {
    documents: t4,
    Hi: r
  })));
}
function $o(t2, e, n) {
  let s2 = ct.min();
  n.forEach((t3, e2) => {
    e2.readTime.compareTo(s2) > 0 && (s2 = e2.readTime);
  }), t2.Ki.set(e, s2);
}
function su() {
  return "undefined" != typeof document ? document : null;
}
function iu(t2) {
  return new Cs(t2, true);
}
async function fu(t2) {
  if (Iu(t2))
    for (const e of t2.wu)
      await e(true);
}
async function du(t2) {
  for (const e of t2.wu)
    await e(false);
}
function _u(t2, e) {
  const n = K2(t2);
  n.du.has(e.targetId) || (n.du.set(e.targetId, e), pu(n) ? yu(n) : $u(n).ko() && mu(n, e));
}
function wu(t2, e) {
  const n = K2(t2), s2 = $u(n);
  n.du.delete(e), s2.ko() && gu(n, e), 0 === n.du.size && (s2.ko() ? s2.Fo() : Iu(n) && n.gu.set("Unknown"));
}
function mu(t2, e) {
  t2.yu.Ot(e.targetId), $u(t2).zo(e);
}
function gu(t2, e) {
  t2.yu.Ot(e), $u(t2).Ho(e);
}
function yu(t2) {
  t2.yu = new Ps({
    getRemoteKeysForTarget: (e) => t2.remoteSyncer.getRemoteKeysForTarget(e),
    se: (e) => t2.du.get(e) || null
  }), $u(t2).start(), t2.gu.uu();
}
function pu(t2) {
  return Iu(t2) && !$u(t2).No() && t2.du.size > 0;
}
function Iu(t2) {
  return 0 === K2(t2)._u.size;
}
function Tu(t2) {
  t2.yu = void 0;
}
async function Eu(t2) {
  t2.du.forEach((e, n) => {
    mu(t2, e);
  });
}
async function Au(t2, e) {
  Tu(t2), pu(t2) ? (t2.gu.hu(e), yu(t2)) : t2.gu.set("Unknown");
}
async function Ru(t2, e, n) {
  if (t2.gu.set("Online"), e instanceof Rs && 2 === e.state && e.cause)
    try {
      await async function(t3, e2) {
        const n2 = e2.cause;
        for (const s2 of e2.targetIds)
          t3.du.has(s2) && (await t3.remoteSyncer.rejectListen(s2, n2), t3.du.delete(s2), t3.yu.removeTarget(s2));
      }(t2, e);
    } catch (n2) {
      O2("RemoteStore", "Failed to remove targets %s: %s ", e.targetIds.join(","), n2), await bu(t2, n2);
    }
  else if (e instanceof Es ? t2.yu.Gt(e) : e instanceof As ? t2.yu.Yt(e) : t2.yu.Wt(e), !n.isEqual(ct.min()))
    try {
      const e2 = await So(t2.localStore);
      n.compareTo(e2) >= 0 && await function(t3, e3) {
        const n2 = t3.yu.te(e3);
        return n2.targetChanges.forEach((n3, s2) => {
          if (n3.resumeToken.approximateByteSize() > 0) {
            const i = t3.du.get(s2);
            i && t3.du.set(s2, i.withResumeToken(n3.resumeToken, e3));
          }
        }), n2.targetMismatches.forEach((e4) => {
          const n3 = t3.du.get(e4);
          if (!n3)
            return;
          t3.du.set(e4, n3.withResumeToken(Xt.EMPTY_BYTE_STRING, n3.snapshotVersion)), gu(t3, e4);
          const s2 = new qi(n3.target, e4, 1, n3.sequenceNumber);
          mu(t3, s2);
        }), t3.remoteSyncer.applyRemoteEvent(n2);
      }(t2, n);
    } catch (e2) {
      O2("RemoteStore", "Failed to raise snapshot:", e2), await bu(t2, e2);
    }
}
async function bu(t2, e, n) {
  if (!Nt(e))
    throw e;
  t2._u.add(1), await du(t2), t2.gu.set("Offline"), n || (n = () => So(t2.localStore)), t2.asyncQueue.enqueueRetryable(async () => {
    O2("RemoteStore", "Retrying IndexedDB access"), await n(), t2._u.delete(1), await fu(t2);
  });
}
async function Ou(t2, e) {
  const n = K2(t2);
  n.asyncQueue.verifyOperationInProgress(), O2("RemoteStore", "RemoteStore received new credentials");
  const s2 = Iu(n);
  n._u.add(3), await du(n), s2 && n.gu.set("Unknown"), await n.remoteSyncer.handleCredentialChange(e), n._u.delete(3), await fu(n);
}
async function Fu(t2, e) {
  const n = K2(t2);
  e ? (n._u.delete(2), await fu(n)) : e || (n._u.add(2), await du(n), n.gu.set("Unknown"));
}
function $u(t2) {
  return t2.pu || (t2.pu = function(t3, e, n) {
    const s2 = K2(t3);
    return s2.su(), new uu(e, s2.Vo, s2.authCredentials, s2.appCheckCredentials, s2.It, n);
  }(t2.datastore, t2.asyncQueue, {
    Yr: Eu.bind(null, t2),
    Zr: Au.bind(null, t2),
    Wo: Ru.bind(null, t2)
  }), t2.wu.push(async (e) => {
    e ? (t2.pu.Oo(), pu(t2) ? yu(t2) : t2.gu.set("Unknown")) : (await t2.pu.stop(), Tu(t2));
  })), t2.pu;
}
function Uu(t2, e) {
  if (F2("AsyncQueue", `${e}: ${t2}`), Nt(t2))
    return new Q2(G.UNAVAILABLE, `${e}: ${t2}`);
  throw t2;
}
async function Wu(t2, e) {
  const n = K2(t2), s2 = e.query;
  let i = false, r = n.queries.get(s2);
  if (r || (i = true, r = new Qu()), i)
    try {
      r.Au = await n.onListen(s2);
    } catch (t3) {
      const n2 = Uu(t3, `Initialization of query '${gn(e.query)}' failed`);
      return void e.onError(n2);
    }
  if (n.queries.set(s2, r), r.listeners.push(e), e.bu(n.onlineState), r.Au) {
    e.Pu(r.Au) && Yu(n);
  }
}
async function zu(t2, e) {
  const n = K2(t2), s2 = e.query;
  let i = false;
  const r = n.queries.get(s2);
  if (r) {
    const t3 = r.listeners.indexOf(e);
    t3 >= 0 && (r.listeners.splice(t3, 1), i = 0 === r.listeners.length);
  }
  if (i)
    return n.queries.delete(s2), n.onUnlisten(s2);
}
function Hu(t2, e) {
  const n = K2(t2);
  let s2 = false;
  for (const t3 of e) {
    const e2 = t3.query, i = n.queries.get(e2);
    if (i) {
      for (const e3 of i.listeners)
        e3.Pu(t3) && (s2 = true);
      i.Au = t3;
    }
  }
  s2 && Yu(n);
}
function Ju(t2, e, n) {
  const s2 = K2(t2), i = s2.queries.get(e);
  if (i)
    for (const t3 of i.listeners)
      t3.onError(n);
  s2.queries.delete(e);
}
function Yu(t2) {
  t2.Ru.forEach((t3) => {
    t3.next();
  });
}
async function ac2(t2, e) {
  const n = $c2(t2);
  let s2, i;
  const r = n.sc.get(e);
  if (r)
    s2 = r.targetId, n.sharedClientState.addLocalQueryTarget(s2), i = r.view.tc();
  else {
    const t3 = await No(n.localStore, dn(e));
    n.isPrimaryClient && _u(n.remoteStore, t3);
    const r2 = n.sharedClientState.addLocalQueryTarget(t3.targetId);
    s2 = t3.targetId, i = await hc2(n, e, s2, "current" === r2);
  }
  return i;
}
async function hc2(t2, e, n, s2) {
  t2.dc = (e2, n2, s3) => async function(t3, e3, n3, s4) {
    let i2 = e3.view.ju(n3);
    i2.$i && (i2 = await Mo(
      t3.localStore,
      e3.query,
      false
    ).then(({ documents: t4 }) => e3.view.ju(t4, i2)));
    const r2 = s4 && s4.targetChanges.get(e3.targetId), o2 = e3.view.applyChanges(
      i2,
      t3.isPrimaryClient,
      r2
    );
    return Ac2(t3, e3.targetId, o2.Yu), o2.snapshot;
  }(t2, e2, n2, s3);
  const i = await Mo(
    t2.localStore,
    e,
    true
  ), r = new rc2(e, i.Hi), o = r.ju(i.documents), u = Ts.createSynthesizedTargetChangeForCurrentChange(n, s2 && "Offline" !== t2.onlineState), c = r.applyChanges(
    o,
    t2.isPrimaryClient,
    u
  );
  Ac2(t2, n, c.Yu);
  const a = new oc2(e, n, r);
  return t2.sc.set(e, a), t2.ic.has(n) ? t2.ic.get(n).push(e) : t2.ic.set(n, [e]), c.snapshot;
}
async function lc2(t2, e) {
  const n = K2(t2), s2 = n.sc.get(e), i = n.ic.get(s2.targetId);
  if (i.length > 1)
    return n.ic.set(s2.targetId, i.filter((t3) => !wn(t3, e))), void n.sc.delete(e);
  if (n.isPrimaryClient) {
    n.sharedClientState.removeLocalQueryTarget(s2.targetId);
    n.sharedClientState.isActiveQueryTarget(s2.targetId) || await ko(
      n.localStore,
      s2.targetId,
      false
    ).then(() => {
      n.sharedClientState.clearQueryState(s2.targetId), wu(n.remoteStore, s2.targetId), Tc2(n, s2.targetId);
    }).catch(vt);
  } else
    Tc2(n, s2.targetId), await ko(
      n.localStore,
      s2.targetId,
      true
    );
}
async function dc2(t2, e) {
  const n = K2(t2);
  try {
    const t3 = await Do(n.localStore, e);
    e.targetChanges.forEach((t4, e2) => {
      const s2 = n.uc.get(e2);
      s2 && (U2(t4.addedDocuments.size + t4.modifiedDocuments.size + t4.removedDocuments.size <= 1), t4.addedDocuments.size > 0 ? s2.ec = true : t4.modifiedDocuments.size > 0 ? U2(s2.ec) : t4.removedDocuments.size > 0 && (U2(s2.ec), s2.ec = false));
    }), await Pc2(n, t3, e);
  } catch (t3) {
    await vt(t3);
  }
}
function _c(t2, e, n) {
  const s2 = K2(t2);
  if (s2.isPrimaryClient && 0 === n || !s2.isPrimaryClient && 1 === n) {
    const t3 = [];
    s2.sc.forEach((n2, s3) => {
      const i = s3.view.bu(e);
      i.snapshot && t3.push(i.snapshot);
    }), function(t4, e2) {
      const n2 = K2(t4);
      n2.onlineState = e2;
      let s3 = false;
      n2.queries.forEach((t5, n3) => {
        for (const t6 of n3.listeners)
          t6.bu(e2) && (s3 = true);
      }), s3 && Yu(n2);
    }(s2.eventManager, e), t3.length && s2.nc.Wo(t3), s2.onlineState = e, s2.isPrimaryClient && s2.sharedClientState.setOnlineState(e);
  }
}
async function wc2(t2, e, n) {
  const s2 = K2(t2);
  s2.sharedClientState.updateQueryState(e, "rejected", n);
  const i = s2.uc.get(e), r = i && i.key;
  if (r) {
    let t3 = new Gt(dt.comparator);
    t3 = t3.insert(r, ke.newNoDocument(r, ct.min()));
    const n2 = gs().add(r), i2 = new Is(
      ct.min(),
      /* @__PURE__ */ new Map(),
      new Wt(it),
      t3,
      n2
    );
    await dc2(s2, i2), s2.oc = s2.oc.remove(r), s2.uc.delete(e), bc2(s2);
  } else
    await ko(
      s2.localStore,
      e,
      false
    ).then(() => Tc2(s2, e, n)).catch(vt);
}
function Tc2(t2, e, n = null) {
  t2.sharedClientState.removeLocalQueryTarget(e);
  for (const s2 of t2.ic.get(e))
    t2.sc.delete(s2), n && t2.nc._c(s2, n);
  if (t2.ic.delete(e), t2.isPrimaryClient) {
    t2.cc.ls(e).forEach((e2) => {
      t2.cc.containsKey(e2) || Ec2(t2, e2);
    });
  }
}
function Ec2(t2, e) {
  t2.rc.delete(e.path.canonicalString());
  const n = t2.oc.get(e);
  null !== n && (wu(t2.remoteStore, n), t2.oc = t2.oc.remove(e), t2.uc.delete(n), bc2(t2));
}
function Ac2(t2, e, n) {
  for (const s2 of n)
    if (s2 instanceof sc2)
      t2.cc.addReference(s2.key, e), Rc2(t2, s2);
    else if (s2 instanceof ic2) {
      O2("SyncEngine", "Document no longer in limbo: " + s2.key), t2.cc.removeReference(s2.key, e);
      t2.cc.containsKey(s2.key) || Ec2(t2, s2.key);
    } else
      L2();
}
function Rc2(t2, e) {
  const n = e.key, s2 = n.path.canonicalString();
  t2.oc.get(n) || t2.rc.has(s2) || (O2("SyncEngine", "New document in limbo: " + n), t2.rc.add(s2), bc2(t2));
}
function bc2(t2) {
  for (; t2.rc.size > 0 && t2.oc.size < t2.maxConcurrentLimboResolutions; ) {
    const e = t2.rc.values().next().value;
    t2.rc.delete(e);
    const n = new dt(ht.fromString(e)), s2 = t2.lc.next();
    t2.uc.set(s2, new uc2(n)), t2.oc = t2.oc.insert(n, s2), _u(t2.remoteStore, new qi(dn(un(n.path)), s2, 2, Lt.at));
  }
}
async function Pc2(t2, e, n) {
  const s2 = K2(t2), i = [], r = [], o = [];
  s2.sc.isEmpty() || (s2.sc.forEach((t3, u) => {
    o.push(s2.dc(u, e, n).then((t4) => {
      if (t4) {
        s2.isPrimaryClient && s2.sharedClientState.updateQueryState(u.targetId, t4.fromCache ? "not-current" : "current"), i.push(t4);
        const e2 = Ao.Ci(u.targetId, t4);
        r.push(e2);
      }
    }));
  }), await Promise.all(o), s2.nc.Wo(i), await async function(t3, e2) {
    const n2 = K2(t3);
    try {
      await n2.persistence.runTransaction("notifyLocalViewChanges", "readwrite", (t4) => Vt.forEach(e2, (e3) => Vt.forEach(e3.Si, (s3) => n2.persistence.referenceDelegate.addReference(t4, e3.targetId, s3)).next(() => Vt.forEach(e3.Di, (s3) => n2.persistence.referenceDelegate.removeReference(t4, e3.targetId, s3)))));
    } catch (t4) {
      if (!Nt(t4))
        throw t4;
      O2("LocalStore", "Failed to update sequence numbers: " + t4);
    }
    for (const t4 of e2) {
      const e3 = t4.targetId;
      if (!t4.fromCache) {
        const t5 = n2.Ui.get(e3), s3 = t5.snapshotVersion, i2 = t5.withLastLimboFreeSnapshotVersion(s3);
        n2.Ui = n2.Ui.insert(e3, i2);
      }
    }
  }(s2.localStore, r));
}
async function vc2(t2, e) {
  const n = K2(t2);
  if (!n.currentUser.isEqual(e)) {
    O2("SyncEngine", "User change. New user:", e.toKey());
    const t3 = await vo(n.localStore, e);
    n.currentUser = e, function(t4, e2) {
      t4.hc.forEach((t5) => {
        t5.forEach((t6) => {
          t6.reject(new Q2(G.CANCELLED, e2));
        });
      }), t4.hc.clear();
    }(n, "'waitForPendingWrites' promise is rejected due to a user change."), n.sharedClientState.handleUserChange(e, t3.removedBatchIds, t3.addedBatchIds), await Pc2(n, t3.ji);
  }
}
function Vc2(t2, e) {
  const n = K2(t2), s2 = n.uc.get(e);
  if (s2 && s2.ec)
    return gs().add(s2.key);
  {
    let t3 = gs();
    const s3 = n.ic.get(e);
    if (!s3)
      return t3;
    for (const e2 of s3) {
      const s4 = n.sc.get(e2);
      t3 = t3.unionWith(s4.view.Qu);
    }
    return t3;
  }
}
function $c2(t2) {
  const e = K2(t2);
  return e.remoteStore.remoteSyncer.applyRemoteEvent = dc2.bind(null, e), e.remoteStore.remoteSyncer.getRemoteKeysForTarget = Vc2.bind(null, e), e.remoteStore.remoteSyncer.rejectListen = wc2.bind(null, e), e.nc.Wo = Hu.bind(null, e.eventManager), e.nc._c = Ju.bind(null, e.eventManager), e;
}
async function Yc2(t2, e) {
  t2.asyncQueue.verifyOperationInProgress(), O2("FirestoreClient", "Initializing OfflineComponentProvider");
  const n = await t2.getConfiguration();
  await e.initialize(n);
  let s2 = n.initialUser;
  t2.setCredentialChangeListener(async (t3) => {
    s2.isEqual(t3) || (await vo(e.localStore, t3), s2 = t3);
  }), e.persistence.setDatabaseDeletedListener(() => t2.terminate()), t2.offlineComponents = e;
}
async function Xc2(t2, e) {
  t2.asyncQueue.verifyOperationInProgress();
  const n = await Zc2(t2);
  O2("FirestoreClient", "Initializing OnlineComponentProvider");
  const s2 = await t2.getConfiguration();
  await e.initialize(n, s2), t2.setCredentialChangeListener((t3) => Ou(e.remoteStore, t3)), t2.setAppCheckTokenChangeListener((t3, n2) => Ou(e.remoteStore, n2)), t2.onlineComponents = e;
}
async function Zc2(t2) {
  return t2.offlineComponents || (O2("FirestoreClient", "Using default OfflineComponentProvider"), await Yc2(t2, new Uc2())), t2.offlineComponents;
}
async function ta2(t2) {
  return t2.onlineComponents || (O2("FirestoreClient", "Using default OnlineComponentProvider"), await Xc2(t2, new Gc2())), t2.onlineComponents;
}
async function ra2(t2) {
  const e = await ta2(t2), n = e.eventManager;
  return n.onListen = ac2.bind(null, e.syncEngine), n.onUnlisten = lc2.bind(null, e.syncEngine), n;
}
function aa2(t2, e, n = {}) {
  const s2 = new j();
  return t2.asyncQueue.enqueueAndForget(async () => function(t3, e2, n2, s3, i) {
    const r = new jc2({
      next: (r2) => {
        e2.enqueueAndForget(() => zu(t3, o));
        const u = r2.docs.has(n2);
        !u && r2.fromCache ? i.reject(new Q2(G.UNAVAILABLE, "Failed to get document because the client is offline.")) : u && r2.fromCache && s3 && "server" === s3.source ? i.reject(new Q2(G.UNAVAILABLE, 'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')) : i.resolve(r2);
      },
      error: (t4) => i.reject(t4)
    }), o = new Xu(un(n2.path), r, {
      includeMetadataChanges: true,
      Nu: true
    });
    return Wu(t3, o);
  }(await ra2(t2), t2.asyncQueue, e, n, s2)), s2.promise;
}
function ga(t2, e, n) {
  if (!n)
    throw new Q2(G.INVALID_ARGUMENT, `Function ${t2}() cannot be called with an empty ${e}.`);
}
function ya2(t2, e, n, s2) {
  if (true === e && true === s2)
    throw new Q2(G.INVALID_ARGUMENT, `${t2} and ${n} cannot be used together.`);
}
function pa2(t2) {
  if (!dt.isDocumentKey(t2))
    throw new Q2(G.INVALID_ARGUMENT, `Invalid document reference. Document references must have an even number of segments, but ${t2} has ${t2.length}.`);
}
function Ia2(t2) {
  if (dt.isDocumentKey(t2))
    throw new Q2(G.INVALID_ARGUMENT, `Invalid collection reference. Collection references must have an odd number of segments, but ${t2} has ${t2.length}.`);
}
function Ta(t2) {
  if (void 0 === t2)
    return "undefined";
  if (null === t2)
    return "null";
  if ("string" == typeof t2)
    return t2.length > 20 && (t2 = `${t2.substring(0, 20)}...`), JSON.stringify(t2);
  if ("number" == typeof t2 || "boolean" == typeof t2)
    return "" + t2;
  if ("object" == typeof t2) {
    if (t2 instanceof Array)
      return "an array";
    {
      const e = function(t3) {
        if (t3.constructor)
          return t3.constructor.name;
        return null;
      }(t2);
      return e ? `a custom ${e} object` : "an object";
    }
  }
  return "function" == typeof t2 ? "a function" : L2();
}
function Ea(t2, e) {
  if ("_delegate" in t2 && (t2 = t2._delegate), !(t2 instanceof e)) {
    if (e.name === t2.constructor.name)
      throw new Q2(G.INVALID_ARGUMENT, "Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");
    {
      const n = Ta(t2);
      throw new Q2(G.INVALID_ARGUMENT, `Expected type '${e.name}', but it was: ${n}`);
    }
  }
  return t2;
}
function Aa2(t2, e) {
  if (e <= 0)
    throw new Q2(G.INVALID_ARGUMENT, `Function ${t2}() requires a positive number, but it was: ${e}.`);
}
function Da(t2, e, ...n) {
  if (t2 = getModularInstance(t2), ga("collection", "path", e), t2 instanceof ba2) {
    const s2 = ht.fromString(e, ...n);
    return Ia2(s2), new Sa2(t2, null, s2);
  }
  {
    if (!(t2 instanceof va || t2 instanceof Sa2))
      throw new Q2(G.INVALID_ARGUMENT, "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");
    const s2 = t2._path.child(ht.fromString(e, ...n));
    return Ia2(s2), new Sa2(
      t2.firestore,
      null,
      s2
    );
  }
}
function xa2(t2, e, ...n) {
  if (t2 = getModularInstance(t2), 1 === arguments.length && (e = st.R()), ga("doc", "path", e), t2 instanceof ba2) {
    const s2 = ht.fromString(e, ...n);
    return pa2(s2), new va(
      t2,
      null,
      new dt(s2)
    );
  }
  {
    if (!(t2 instanceof va || t2 instanceof Sa2))
      throw new Q2(G.INVALID_ARGUMENT, "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");
    const s2 = t2._path.child(ht.fromString(e, ...n));
    return pa2(s2), new va(t2.firestore, t2 instanceof Sa2 ? t2.converter : null, new dt(s2));
  }
}
function Oa(t2) {
  return function(t3, e) {
    if ("object" != typeof t3 || null === t3)
      return false;
    const n = t3;
    for (const t4 of e)
      if (t4 in n && "function" == typeof n[t4])
        return true;
    return false;
  }(t2, ["next", "error", "complete"]);
}
function La2(t2, e, n) {
  n || (n = "(default)");
  const s2 = _getProvider(t2, "firestore");
  if (s2.isInitialized(n)) {
    const t3 = s2.getImmediate({
      identifier: n
    }), i = s2.getOptions(n);
    if (deepEqual(i, e))
      return t3;
    throw new Q2(G.FAILED_PRECONDITION, "initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.");
  }
  if (void 0 !== e.cacheSizeBytes && -1 !== e.cacheSizeBytes && e.cacheSizeBytes < 1048576)
    throw new Q2(G.INVALID_ARGUMENT, "cacheSizeBytes must be at least 1048576");
  return s2.initialize({
    options: e,
    instanceIdentifier: n
  });
}
function Ua2(e, n) {
  const s2 = "object" == typeof e ? e : getApp(), i = "string" == typeof e ? e : n || "(default)";
  return _getProvider(s2, "firestore").getImmediate({
    identifier: i
  });
}
function qa2(t2) {
  return t2._firestoreClient || Ka2(t2), t2._firestoreClient.verifyNotTerminated(), t2._firestoreClient;
}
function Ka2(t2) {
  var e;
  const n = t2._freezeSettings(), s2 = function(t3, e2, n2, s3) {
    return new oe(t3, e2, n2, s3.host, s3.ssl, s3.experimentalForceLongPolling, s3.experimentalAutoDetectLongPolling, s3.useFetchStreams);
  }(t2._databaseId, (null === (e = t2._app) || void 0 === e ? void 0 : e.options.appId) || "", t2._persistenceKey, n);
  t2._firestoreClient = new Jc2(t2._authCredentials, t2._appCheckCredentials, t2._queue, s2);
}
function ah(t2) {
  switch (t2) {
    case 0:
    case 2:
    case 1:
      return true;
    case 3:
    case 4:
      return false;
    default:
      throw L2();
  }
}
function fh(t2) {
  const e = t2._freezeSettings(), n = iu(t2._databaseId);
  return new lh(t2._databaseId, !!e.ignoreUndefinedProperties, n);
}
function Eh(t2, e, n, s2 = false) {
  return Ah(n, t2.fa(s2 ? 4 : 3, e));
}
function Ah(t2, e) {
  if (bh(
    t2 = getModularInstance(t2)
  ))
    return Ph("Unsupported field value:", e, t2), Rh(t2, e);
  if (t2 instanceof ih)
    return function(t3, e2) {
      if (!ah(e2.na))
        throw e2.aa(`${t3._methodName}() can only be used with update() and set()`);
      if (!e2.path)
        throw e2.aa(`${t3._methodName}() is not currently supported inside arrays`);
      const n = t3._toFieldTransform(e2);
      n && e2.fieldTransforms.push(n);
    }(t2, e), null;
  if (void 0 === t2 && e.ignoreUndefinedProperties)
    return null;
  if (e.path && e.fieldMask.push(e.path), t2 instanceof Array) {
    if (e.settings.ra && 4 !== e.na)
      throw e.aa("Nested arrays are not supported");
    return function(t3, e2) {
      const n = [];
      let s2 = 0;
      for (const i of t3) {
        let t4 = Ah(i, e2.ca(s2));
        null == t4 && (t4 = {
          nullValue: "NULL_VALUE"
        }), n.push(t4), s2++;
      }
      return {
        arrayValue: {
          values: n
        }
      };
    }(t2, e);
  }
  return function(t3, e2) {
    if (null === (t3 = getModularInstance(t3)))
      return {
        nullValue: "NULL_VALUE"
      };
    if ("number" == typeof t3)
      return Rn(e2.It, t3);
    if ("boolean" == typeof t3)
      return {
        booleanValue: t3
      };
    if ("string" == typeof t3)
      return {
        stringValue: t3
      };
    if (t3 instanceof Date) {
      const n = ut.fromDate(t3);
      return {
        timestampValue: xs(e2.It, n)
      };
    }
    if (t3 instanceof ut) {
      const n = new ut(t3.seconds, 1e3 * Math.floor(t3.nanoseconds / 1e3));
      return {
        timestampValue: xs(e2.It, n)
      };
    }
    if (t3 instanceof rh)
      return {
        geoPointValue: {
          latitude: t3.latitude,
          longitude: t3.longitude
        }
      };
    if (t3 instanceof sh)
      return {
        bytesValue: Ns(e2.It, t3._byteString)
      };
    if (t3 instanceof va) {
      const n = e2.databaseId, s2 = t3.firestore._databaseId;
      if (!s2.isEqual(n))
        throw e2.aa(`Document reference is for database ${s2.projectId}/${s2.database} but should be for database ${n.projectId}/${n.database}`);
      return {
        referenceValue: Os(t3.firestore._databaseId || e2.databaseId, t3._key.path)
      };
    }
    throw e2.aa(`Unsupported field value: ${Ta(t3)}`);
  }(t2, e);
}
function Rh(t2, e) {
  const n = {};
  return Kt(t2) ? e.path && e.path.length > 0 && e.fieldMask.push(e.path) : qt(t2, (t3, s2) => {
    const i = Ah(s2, e.ia(t3));
    null != i && (n[t3] = i);
  }), {
    mapValue: {
      fields: n
    }
  };
}
function bh(t2) {
  return !("object" != typeof t2 || null === t2 || t2 instanceof Array || t2 instanceof Date || t2 instanceof ut || t2 instanceof rh || t2 instanceof sh || t2 instanceof va || t2 instanceof ih);
}
function Ph(t2, e, n) {
  if (!bh(n) || !function(t3) {
    return "object" == typeof t3 && null !== t3 && (Object.getPrototypeOf(t3) === Object.prototype || null === Object.getPrototypeOf(t3));
  }(n)) {
    const s2 = Ta(n);
    throw "an object" === s2 ? e.aa(t2 + " a custom object") : e.aa(t2 + " " + s2);
  }
}
function Sh(t2, e, n) {
  if (e.search(Vh) >= 0)
    throw Dh(
      `Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,
      t2,
      false,
      void 0,
      n
    );
  try {
    return new eh(...e.split("."))._internalPath;
  } catch (s2) {
    throw Dh(
      `Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,
      t2,
      false,
      void 0,
      n
    );
  }
}
function Dh(t2, e, n, s2, i) {
  const r = s2 && !s2.isEmpty(), o = void 0 !== i;
  let u = `Function ${e}() called with invalid data`;
  n && (u += " (via `toFirestore()`)"), u += ". ";
  let c = "";
  return (r || o) && (c += " (found", r && (c += ` in field ${s2}`), o && (c += ` in document ${i}`), c += ")"), new Q2(G.INVALID_ARGUMENT, u + t2 + c);
}
function kh(t2, e) {
  return "string" == typeof e ? Sh(t2, e) : e instanceof eh ? e._internalPath : e._delegate._internalPath;
}
function Bh(t2) {
  switch (t2) {
    case 0:
      return "added";
    case 2:
    case 3:
      return "modified";
    case 1:
      return "removed";
    default:
      return L2();
  }
}
function Uh(t2) {
  if ("L" === t2.limitType && 0 === t2.explicitOrderBy.length)
    throw new Q2(G.UNIMPLEMENTED, "limitToLast() queries require specifying at least one orderBy() clause");
}
function Kh(t2, ...e) {
  for (const n of e)
    t2 = n._apply(t2);
  return t2;
}
function Qh(t2, e, n) {
  const s2 = e, i = kh("where", t2);
  return new Gh(i, s2, n);
}
function Wh(t2, e = "asc") {
  const n = e, s2 = kh("orderBy", t2);
  return new jh(s2, n);
}
function Hh(t2) {
  return Aa2("limit", t2), new zh("limit", t2, "F");
}
function il(t2, e, n) {
  if ("string" == typeof (n = getModularInstance(n))) {
    if ("" === n)
      throw new Q2(G.INVALID_ARGUMENT, "Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");
    if (!ln(e) && -1 !== n.indexOf("/"))
      throw new Q2(G.INVALID_ARGUMENT, `Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);
    const s2 = e.path.child(ht.fromString(n));
    if (!dt.isDocumentKey(s2))
      throw new Q2(G.INVALID_ARGUMENT, `Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${s2}' is not because it has an odd number of segments (${s2.length}).`);
    return Ie(t2, new dt(s2));
  }
  if (n instanceof va)
    return Ie(t2, n._key);
  throw new Q2(G.INVALID_ARGUMENT, `Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Ta(n)}.`);
}
function rl(t2, e) {
  if (!Array.isArray(t2) || 0 === t2.length)
    throw new Q2(G.INVALID_ARGUMENT, `Invalid Query. A non-empty array is required for '${e.toString()}' filters.`);
  if (t2.length > 10)
    throw new Q2(G.INVALID_ARGUMENT, `Invalid Query. '${e.toString()}' filters support a maximum of 10 elements in the value array.`);
}
function ol(t2, e, n) {
  if (!n.isEqual(e))
    throw new Q2(G.INVALID_ARGUMENT, `Invalid query. You have a where filter with an inequality (<, <=, !=, not-in, >, or >=) on field '${e.toString()}' and so you must also use '${e.toString()}' as your first argument to orderBy(), but your first orderBy() is on field '${n.toString()}' instead.`);
}
function dl(t2) {
  t2 = Ea(t2, va);
  const e = Ea(t2.firestore, Ba);
  return aa2(qa2(e), t2._key).then((n) => vl(e, t2, n));
}
function Rl(t2, ...e) {
  var n, s2, i;
  t2 = getModularInstance(t2);
  let r = {
    includeMetadataChanges: false
  }, o = 0;
  "object" != typeof e[o] || Oa(e[o]) || (r = e[o], o++);
  const u = {
    includeMetadataChanges: r.includeMetadataChanges
  };
  if (Oa(e[o])) {
    const t3 = e[o];
    e[o] = null === (n = t3.next) || void 0 === n ? void 0 : n.bind(t3), e[o + 1] = null === (s2 = t3.error) || void 0 === s2 ? void 0 : s2.bind(t3), e[o + 2] = null === (i = t3.complete) || void 0 === i ? void 0 : i.bind(t3);
  }
  let c, a, h;
  if (t2 instanceof va)
    a = Ea(t2.firestore, Ba), h = un(t2._key.path), c = {
      next: (n2) => {
        e[o] && e[o](vl(a, t2, n2));
      },
      error: e[o + 1],
      complete: e[o + 2]
    };
  else {
    const n2 = Ea(t2, Va2);
    a = Ea(n2.firestore, Ba), h = n2._query;
    const s3 = new _l(a);
    c = {
      next: (t3) => {
        e[o] && e[o](new $h(a, s3, n2, t3));
      },
      error: e[o + 1],
      complete: e[o + 2]
    }, Uh(t2._query);
  }
  return function(t3, e2, n2, s3) {
    const i2 = new jc2(s3), r2 = new Xu(e2, i2, n2);
    return t3.asyncQueue.enqueueAndForget(async () => Wu(await ra2(t3), r2)), () => {
      i2.Rc(), t3.asyncQueue.enqueueAndForget(async () => zu(await ra2(t3), r2));
    };
  }(qa2(a), h, u, c);
}
function vl(t2, e, n) {
  const s2 = n.docs.get(e._key), i = new _l(t2);
  return new Oh(t2, i, e._key, s2, new Mh(n.hasPendingWrites, n.fromCache), e.converter);
}
var D2, C2, x2, N2, G, Q2, j, W2, z2, J2, Y2, X2, Z2, tt, st, ut, ct, at, ht, lt, ft, dt, _t, At, bt, Pt, Vt, Lt, Gt, Qt, jt, Wt, zt, Jt, Xt, Zt, oe, ue, le, xe, ke, Me, Ge, Qe, je, We, He, Je, Ye, Xe, Ze, tn, rn, bn, Sn, Dn, xn, kn, Ln, qn, zn, Hn, Zn, es, ns, ss, os, us, as, ws, ms, ys, Is, Ts, Es, As, Rs, bs, Ps, Ss, Ds, Cs, xi, Ni, ki, Mi, Oi, Bi, Ui, qi, Ki, ur, yr, pr, Ir, Vr, Or, Wr, no, so, io, ro, oo, uo, co, ao, ho, lo, fo, _o, wo, Ao, Ro, bo, zo, Jo, Yo, Xo, Zo, tu, eu, ru, ou, uu, au, hu, lu, Lu, qu, Ku, Gu, Qu, ju, Xu, sc2, ic2, rc2, oc2, uc2, cc2, Uc2, Gc2, jc2, Jc2, ma2, Ra2, ba2, va, Va2, Sa2, Ma2, Ba, eh, sh, ih, rh, oh, hh, lh, Vh, xh, Nh, Mh, Oh, Fh, $h, qh, Gh, jh, zh, cl, _l;
var init_index_esm20176 = __esm({
  "node_modules/@firebase/firestore/dist/index.esm2017.js"() {
    init_index_esm20174();
    init_index_esm20172();
    init_index_esm20173();
    init_index_esm2017();
    init_index_esm20175();
    D2 = "@firebase/firestore";
    C2 = class {
      constructor(t2) {
        this.uid = t2;
      }
      isAuthenticated() {
        return null != this.uid;
      }
      toKey() {
        return this.isAuthenticated() ? "uid:" + this.uid : "anonymous-user";
      }
      isEqual(t2) {
        return t2.uid === this.uid;
      }
    };
    C2.UNAUTHENTICATED = new C2(null), C2.GOOGLE_CREDENTIALS = new C2("google-credentials-uid"), C2.FIRST_PARTY = new C2("first-party-uid"), C2.MOCK_USER = new C2("mock-user");
    x2 = "9.9.4";
    N2 = new Logger("@firebase/firestore");
    G = {
      OK: "ok",
      CANCELLED: "cancelled",
      UNKNOWN: "unknown",
      INVALID_ARGUMENT: "invalid-argument",
      DEADLINE_EXCEEDED: "deadline-exceeded",
      NOT_FOUND: "not-found",
      ALREADY_EXISTS: "already-exists",
      PERMISSION_DENIED: "permission-denied",
      UNAUTHENTICATED: "unauthenticated",
      RESOURCE_EXHAUSTED: "resource-exhausted",
      FAILED_PRECONDITION: "failed-precondition",
      ABORTED: "aborted",
      OUT_OF_RANGE: "out-of-range",
      UNIMPLEMENTED: "unimplemented",
      INTERNAL: "internal",
      UNAVAILABLE: "unavailable",
      DATA_LOSS: "data-loss"
    };
    Q2 = class extends FirebaseError {
      constructor(t2, e) {
        super(t2, e), this.code = t2, this.message = e, this.toString = () => `${this.name}: [code=${this.code}]: ${this.message}`;
      }
    };
    j = class {
      constructor() {
        this.promise = new Promise((t2, e) => {
          this.resolve = t2, this.reject = e;
        });
      }
    };
    W2 = class {
      constructor(t2, e) {
        this.user = e, this.type = "OAuth", this.headers = /* @__PURE__ */ new Map(), this.headers.set("Authorization", `Bearer ${t2}`);
      }
    };
    z2 = class {
      getToken() {
        return Promise.resolve(null);
      }
      invalidateToken() {
      }
      start(t2, e) {
        t2.enqueueRetryable(() => e(C2.UNAUTHENTICATED));
      }
      shutdown() {
      }
    };
    J2 = class {
      constructor(t2) {
        this.t = t2, this.currentUser = C2.UNAUTHENTICATED, this.i = 0, this.forceRefresh = false, this.auth = null;
      }
      start(t2, e) {
        let n = this.i;
        const s2 = (t3) => this.i !== n ? (n = this.i, e(t3)) : Promise.resolve();
        let i = new j();
        this.o = () => {
          this.i++, this.currentUser = this.u(), i.resolve(), i = new j(), t2.enqueueRetryable(() => s2(this.currentUser));
        };
        const r = () => {
          const e2 = i;
          t2.enqueueRetryable(async () => {
            await e2.promise, await s2(this.currentUser);
          });
        }, o = (t3) => {
          O2("FirebaseAuthCredentialsProvider", "Auth detected"), this.auth = t3, this.auth.addAuthTokenListener(this.o), r();
        };
        this.t.onInit((t3) => o(t3)), setTimeout(() => {
          if (!this.auth) {
            const t3 = this.t.getImmediate({
              optional: true
            });
            t3 ? o(t3) : (O2("FirebaseAuthCredentialsProvider", "Auth not yet detected"), i.resolve(), i = new j());
          }
        }, 0), r();
      }
      getToken() {
        const t2 = this.i, e = this.forceRefresh;
        return this.forceRefresh = false, this.auth ? this.auth.getToken(e).then((e2) => this.i !== t2 ? (O2("FirebaseAuthCredentialsProvider", "getToken aborted due to token change."), this.getToken()) : e2 ? (U2("string" == typeof e2.accessToken), new W2(e2.accessToken, this.currentUser)) : null) : Promise.resolve(null);
      }
      invalidateToken() {
        this.forceRefresh = true;
      }
      shutdown() {
        this.auth && this.auth.removeAuthTokenListener(this.o);
      }
      u() {
        const t2 = this.auth && this.auth.getUid();
        return U2(null === t2 || "string" == typeof t2), new C2(t2);
      }
    };
    Y2 = class {
      constructor(t2, e, n, s2) {
        this.h = t2, this.l = e, this.m = n, this.g = s2, this.type = "FirstParty", this.user = C2.FIRST_PARTY, this.p = /* @__PURE__ */ new Map();
      }
      I() {
        return this.g ? this.g() : (U2(!("object" != typeof this.h || null === this.h || !this.h.auth || !this.h.auth.getAuthHeaderValueForFirstParty)), this.h.auth.getAuthHeaderValueForFirstParty([]));
      }
      get headers() {
        this.p.set("X-Goog-AuthUser", this.l);
        const t2 = this.I();
        return t2 && this.p.set("Authorization", t2), this.m && this.p.set("X-Goog-Iam-Authorization-Token", this.m), this.p;
      }
    };
    X2 = class {
      constructor(t2, e, n, s2) {
        this.h = t2, this.l = e, this.m = n, this.g = s2;
      }
      getToken() {
        return Promise.resolve(new Y2(this.h, this.l, this.m, this.g));
      }
      start(t2, e) {
        t2.enqueueRetryable(() => e(C2.FIRST_PARTY));
      }
      shutdown() {
      }
      invalidateToken() {
      }
    };
    Z2 = class {
      constructor(t2) {
        this.value = t2, this.type = "AppCheck", this.headers = /* @__PURE__ */ new Map(), t2 && t2.length > 0 && this.headers.set("x-firebase-appcheck", this.value);
      }
    };
    tt = class {
      constructor(t2) {
        this.T = t2, this.forceRefresh = false, this.appCheck = null, this.A = null;
      }
      start(t2, e) {
        const n = (t3) => {
          null != t3.error && O2("FirebaseAppCheckTokenProvider", `Error getting App Check token; using placeholder token instead. Error: ${t3.error.message}`);
          const n2 = t3.token !== this.A;
          return this.A = t3.token, O2("FirebaseAppCheckTokenProvider", `Received ${n2 ? "new" : "existing"} token.`), n2 ? e(t3.token) : Promise.resolve();
        };
        this.o = (e2) => {
          t2.enqueueRetryable(() => n(e2));
        };
        const s2 = (t3) => {
          O2("FirebaseAppCheckTokenProvider", "AppCheck detected"), this.appCheck = t3, this.appCheck.addTokenListener(this.o);
        };
        this.T.onInit((t3) => s2(t3)), setTimeout(() => {
          if (!this.appCheck) {
            const t3 = this.T.getImmediate({
              optional: true
            });
            t3 ? s2(t3) : O2("FirebaseAppCheckTokenProvider", "AppCheck not yet detected");
          }
        }, 0);
      }
      getToken() {
        const t2 = this.forceRefresh;
        return this.forceRefresh = false, this.appCheck ? this.appCheck.getToken(t2).then((t3) => t3 ? (U2("string" == typeof t3.token), this.A = t3.token, new Z2(t3.token)) : null) : Promise.resolve(null);
      }
      invalidateToken() {
        this.forceRefresh = true;
      }
      shutdown() {
        this.appCheck && this.appCheck.removeTokenListener(this.o);
      }
    };
    st = class {
      static R() {
        const t2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", e = Math.floor(256 / t2.length) * t2.length;
        let n = "";
        for (; n.length < 20; ) {
          const s2 = nt(40);
          for (let i = 0; i < s2.length; ++i)
            n.length < 20 && s2[i] < e && (n += t2.charAt(s2[i] % t2.length));
        }
        return n;
      }
    };
    ut = class {
      constructor(t2, e) {
        if (this.seconds = t2, this.nanoseconds = e, e < 0)
          throw new Q2(G.INVALID_ARGUMENT, "Timestamp nanoseconds out of range: " + e);
        if (e >= 1e9)
          throw new Q2(G.INVALID_ARGUMENT, "Timestamp nanoseconds out of range: " + e);
        if (t2 < -62135596800)
          throw new Q2(G.INVALID_ARGUMENT, "Timestamp seconds out of range: " + t2);
        if (t2 >= 253402300800)
          throw new Q2(G.INVALID_ARGUMENT, "Timestamp seconds out of range: " + t2);
      }
      static now() {
        return ut.fromMillis(Date.now());
      }
      static fromDate(t2) {
        return ut.fromMillis(t2.getTime());
      }
      static fromMillis(t2) {
        const e = Math.floor(t2 / 1e3), n = Math.floor(1e6 * (t2 - 1e3 * e));
        return new ut(e, n);
      }
      toDate() {
        return new Date(this.toMillis());
      }
      toMillis() {
        return 1e3 * this.seconds + this.nanoseconds / 1e6;
      }
      _compareTo(t2) {
        return this.seconds === t2.seconds ? it(this.nanoseconds, t2.nanoseconds) : it(this.seconds, t2.seconds);
      }
      isEqual(t2) {
        return t2.seconds === this.seconds && t2.nanoseconds === this.nanoseconds;
      }
      toString() {
        return "Timestamp(seconds=" + this.seconds + ", nanoseconds=" + this.nanoseconds + ")";
      }
      toJSON() {
        return {
          seconds: this.seconds,
          nanoseconds: this.nanoseconds
        };
      }
      valueOf() {
        const t2 = this.seconds - -62135596800;
        return String(t2).padStart(12, "0") + "." + String(this.nanoseconds).padStart(9, "0");
      }
    };
    ct = class {
      constructor(t2) {
        this.timestamp = t2;
      }
      static fromTimestamp(t2) {
        return new ct(t2);
      }
      static min() {
        return new ct(new ut(0, 0));
      }
      static max() {
        return new ct(new ut(253402300799, 999999999));
      }
      compareTo(t2) {
        return this.timestamp._compareTo(t2.timestamp);
      }
      isEqual(t2) {
        return this.timestamp.isEqual(t2.timestamp);
      }
      toMicroseconds() {
        return 1e6 * this.timestamp.seconds + this.timestamp.nanoseconds / 1e3;
      }
      toString() {
        return "SnapshotVersion(" + this.timestamp.toString() + ")";
      }
      toTimestamp() {
        return this.timestamp;
      }
    };
    at = class {
      constructor(t2, e, n) {
        void 0 === e ? e = 0 : e > t2.length && L2(), void 0 === n ? n = t2.length - e : n > t2.length - e && L2(), this.segments = t2, this.offset = e, this.len = n;
      }
      get length() {
        return this.len;
      }
      isEqual(t2) {
        return 0 === at.comparator(this, t2);
      }
      child(t2) {
        const e = this.segments.slice(this.offset, this.limit());
        return t2 instanceof at ? t2.forEach((t3) => {
          e.push(t3);
        }) : e.push(t2), this.construct(e);
      }
      limit() {
        return this.offset + this.length;
      }
      popFirst(t2) {
        return t2 = void 0 === t2 ? 1 : t2, this.construct(this.segments, this.offset + t2, this.length - t2);
      }
      popLast() {
        return this.construct(this.segments, this.offset, this.length - 1);
      }
      firstSegment() {
        return this.segments[this.offset];
      }
      lastSegment() {
        return this.get(this.length - 1);
      }
      get(t2) {
        return this.segments[this.offset + t2];
      }
      isEmpty() {
        return 0 === this.length;
      }
      isPrefixOf(t2) {
        if (t2.length < this.length)
          return false;
        for (let e = 0; e < this.length; e++)
          if (this.get(e) !== t2.get(e))
            return false;
        return true;
      }
      isImmediateParentOf(t2) {
        if (this.length + 1 !== t2.length)
          return false;
        for (let e = 0; e < this.length; e++)
          if (this.get(e) !== t2.get(e))
            return false;
        return true;
      }
      forEach(t2) {
        for (let e = this.offset, n = this.limit(); e < n; e++)
          t2(this.segments[e]);
      }
      toArray() {
        return this.segments.slice(this.offset, this.limit());
      }
      static comparator(t2, e) {
        const n = Math.min(t2.length, e.length);
        for (let s2 = 0; s2 < n; s2++) {
          const n2 = t2.get(s2), i = e.get(s2);
          if (n2 < i)
            return -1;
          if (n2 > i)
            return 1;
        }
        return t2.length < e.length ? -1 : t2.length > e.length ? 1 : 0;
      }
    };
    ht = class extends at {
      construct(t2, e, n) {
        return new ht(t2, e, n);
      }
      canonicalString() {
        return this.toArray().join("/");
      }
      toString() {
        return this.canonicalString();
      }
      static fromString(...t2) {
        const e = [];
        for (const n of t2) {
          if (n.indexOf("//") >= 0)
            throw new Q2(G.INVALID_ARGUMENT, `Invalid segment (${n}). Paths must not contain // in them.`);
          e.push(...n.split("/").filter((t3) => t3.length > 0));
        }
        return new ht(e);
      }
      static emptyPath() {
        return new ht([]);
      }
    };
    lt = /^[_a-zA-Z][_a-zA-Z0-9]*$/;
    ft = class extends at {
      construct(t2, e, n) {
        return new ft(t2, e, n);
      }
      static isValidIdentifier(t2) {
        return lt.test(t2);
      }
      canonicalString() {
        return this.toArray().map((t2) => (t2 = t2.replace(/\\/g, "\\\\").replace(/`/g, "\\`"), ft.isValidIdentifier(t2) || (t2 = "`" + t2 + "`"), t2)).join(".");
      }
      toString() {
        return this.canonicalString();
      }
      isKeyField() {
        return 1 === this.length && "__name__" === this.get(0);
      }
      static keyField() {
        return new ft(["__name__"]);
      }
      static fromServerFormat(t2) {
        const e = [];
        let n = "", s2 = 0;
        const i = () => {
          if (0 === n.length)
            throw new Q2(G.INVALID_ARGUMENT, `Invalid field path (${t2}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);
          e.push(n), n = "";
        };
        let r = false;
        for (; s2 < t2.length; ) {
          const e2 = t2[s2];
          if ("\\" === e2) {
            if (s2 + 1 === t2.length)
              throw new Q2(G.INVALID_ARGUMENT, "Path has trailing escape character: " + t2);
            const e3 = t2[s2 + 1];
            if ("\\" !== e3 && "." !== e3 && "`" !== e3)
              throw new Q2(G.INVALID_ARGUMENT, "Path has invalid escape sequence: " + t2);
            n += e3, s2 += 2;
          } else
            "`" === e2 ? (r = !r, s2++) : "." !== e2 || r ? (n += e2, s2++) : (i(), s2++);
        }
        if (i(), r)
          throw new Q2(G.INVALID_ARGUMENT, "Unterminated ` in path: " + t2);
        return new ft(e);
      }
      static emptyPath() {
        return new ft([]);
      }
    };
    dt = class {
      constructor(t2) {
        this.path = t2;
      }
      static fromPath(t2) {
        return new dt(ht.fromString(t2));
      }
      static fromName(t2) {
        return new dt(ht.fromString(t2).popFirst(5));
      }
      static empty() {
        return new dt(ht.emptyPath());
      }
      get collectionGroup() {
        return this.path.popLast().lastSegment();
      }
      hasCollectionId(t2) {
        return this.path.length >= 2 && this.path.get(this.path.length - 2) === t2;
      }
      getCollectionGroup() {
        return this.path.get(this.path.length - 2);
      }
      getCollectionPath() {
        return this.path.popLast();
      }
      isEqual(t2) {
        return null !== t2 && 0 === ht.comparator(this.path, t2.path);
      }
      toString() {
        return this.path.toString();
      }
      static comparator(t2, e) {
        return ht.comparator(t2.path, e.path);
      }
      static isDocumentKey(t2) {
        return t2.length % 2 == 0;
      }
      static fromSegments(t2) {
        return new dt(new ht(t2.slice()));
      }
    };
    _t = class {
      constructor(t2, e, n, s2) {
        this.indexId = t2, this.collectionGroup = e, this.fields = n, this.indexState = s2;
      }
    };
    _t.UNKNOWN_ID = -1;
    At = class {
      constructor(t2, e, n) {
        this.readTime = t2, this.documentKey = e, this.largestBatchId = n;
      }
      static min() {
        return new At(ct.min(), dt.empty(), -1);
      }
      static max() {
        return new At(ct.max(), dt.empty(), -1);
      }
    };
    bt = "The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";
    Pt = class {
      constructor() {
        this.onCommittedListeners = [];
      }
      addOnCommittedListener(t2) {
        this.onCommittedListeners.push(t2);
      }
      raiseOnCommittedEvent() {
        this.onCommittedListeners.forEach((t2) => t2());
      }
    };
    Vt = class {
      constructor(t2) {
        this.nextCallback = null, this.catchCallback = null, this.result = void 0, this.error = void 0, this.isDone = false, this.callbackAttached = false, t2((t3) => {
          this.isDone = true, this.result = t3, this.nextCallback && this.nextCallback(t3);
        }, (t3) => {
          this.isDone = true, this.error = t3, this.catchCallback && this.catchCallback(t3);
        });
      }
      catch(t2) {
        return this.next(void 0, t2);
      }
      next(t2, e) {
        return this.callbackAttached && L2(), this.callbackAttached = true, this.isDone ? this.error ? this.wrapFailure(e, this.error) : this.wrapSuccess(t2, this.result) : new Vt((n, s2) => {
          this.nextCallback = (e2) => {
            this.wrapSuccess(t2, e2).next(n, s2);
          }, this.catchCallback = (t3) => {
            this.wrapFailure(e, t3).next(n, s2);
          };
        });
      }
      toPromise() {
        return new Promise((t2, e) => {
          this.next(t2, e);
        });
      }
      wrapUserFunction(t2) {
        try {
          const e = t2();
          return e instanceof Vt ? e : Vt.resolve(e);
        } catch (t3) {
          return Vt.reject(t3);
        }
      }
      wrapSuccess(t2, e) {
        return t2 ? this.wrapUserFunction(() => t2(e)) : Vt.resolve(e);
      }
      wrapFailure(t2, e) {
        return t2 ? this.wrapUserFunction(() => t2(e)) : Vt.reject(e);
      }
      static resolve(t2) {
        return new Vt((e, n) => {
          e(t2);
        });
      }
      static reject(t2) {
        return new Vt((e, n) => {
          n(t2);
        });
      }
      static waitFor(t2) {
        return new Vt((e, n) => {
          let s2 = 0, i = 0, r = false;
          t2.forEach((t3) => {
            ++s2, t3.next(() => {
              ++i, r && i === s2 && e();
            }, (t4) => n(t4));
          }), r = true, i === s2 && e();
        });
      }
      static or(t2) {
        let e = Vt.resolve(false);
        for (const n of t2)
          e = e.next((t3) => t3 ? Vt.resolve(t3) : n());
        return e;
      }
      static forEach(t2, e) {
        const n = [];
        return t2.forEach((t3, s2) => {
          n.push(e.call(this, t3, s2));
        }), this.waitFor(n);
      }
      static mapArray(t2, e) {
        return new Vt((n, s2) => {
          const i = t2.length, r = new Array(i);
          let o = 0;
          for (let u = 0; u < i; u++) {
            const c = u;
            e(t2[c]).next((t3) => {
              r[c] = t3, ++o, o === i && n(r);
            }, (t3) => s2(t3));
          }
        });
      }
      static doWhile(t2, e) {
        return new Vt((n, s2) => {
          const i = () => {
            true === t2() ? e().next(() => {
              i();
            }, s2) : n();
          };
          i();
        });
      }
    };
    Lt = class {
      constructor(t2, e) {
        this.previousValue = t2, e && (e.sequenceNumberHandler = (t3) => this.ut(t3), this.ct = (t3) => e.writeSequenceNumber(t3));
      }
      ut(t2) {
        return this.previousValue = Math.max(t2, this.previousValue), this.previousValue;
      }
      next() {
        const t2 = ++this.previousValue;
        return this.ct && this.ct(t2), t2;
      }
    };
    Lt.at = -1;
    Gt = class {
      constructor(t2, e) {
        this.comparator = t2, this.root = e || jt.EMPTY;
      }
      insert(t2, e) {
        return new Gt(this.comparator, this.root.insert(t2, e, this.comparator).copy(null, null, jt.BLACK, null, null));
      }
      remove(t2) {
        return new Gt(this.comparator, this.root.remove(t2, this.comparator).copy(null, null, jt.BLACK, null, null));
      }
      get(t2) {
        let e = this.root;
        for (; !e.isEmpty(); ) {
          const n = this.comparator(t2, e.key);
          if (0 === n)
            return e.value;
          n < 0 ? e = e.left : n > 0 && (e = e.right);
        }
        return null;
      }
      indexOf(t2) {
        let e = 0, n = this.root;
        for (; !n.isEmpty(); ) {
          const s2 = this.comparator(t2, n.key);
          if (0 === s2)
            return e + n.left.size;
          s2 < 0 ? n = n.left : (e += n.left.size + 1, n = n.right);
        }
        return -1;
      }
      isEmpty() {
        return this.root.isEmpty();
      }
      get size() {
        return this.root.size;
      }
      minKey() {
        return this.root.minKey();
      }
      maxKey() {
        return this.root.maxKey();
      }
      inorderTraversal(t2) {
        return this.root.inorderTraversal(t2);
      }
      forEach(t2) {
        this.inorderTraversal((e, n) => (t2(e, n), false));
      }
      toString() {
        const t2 = [];
        return this.inorderTraversal((e, n) => (t2.push(`${e}:${n}`), false)), `{${t2.join(", ")}}`;
      }
      reverseTraversal(t2) {
        return this.root.reverseTraversal(t2);
      }
      getIterator() {
        return new Qt(this.root, null, this.comparator, false);
      }
      getIteratorFrom(t2) {
        return new Qt(this.root, t2, this.comparator, false);
      }
      getReverseIterator() {
        return new Qt(this.root, null, this.comparator, true);
      }
      getReverseIteratorFrom(t2) {
        return new Qt(this.root, t2, this.comparator, true);
      }
    };
    Qt = class {
      constructor(t2, e, n, s2) {
        this.isReverse = s2, this.nodeStack = [];
        let i = 1;
        for (; !t2.isEmpty(); )
          if (i = e ? n(t2.key, e) : 1, e && s2 && (i *= -1), i < 0)
            t2 = this.isReverse ? t2.left : t2.right;
          else {
            if (0 === i) {
              this.nodeStack.push(t2);
              break;
            }
            this.nodeStack.push(t2), t2 = this.isReverse ? t2.right : t2.left;
          }
      }
      getNext() {
        let t2 = this.nodeStack.pop();
        const e = {
          key: t2.key,
          value: t2.value
        };
        if (this.isReverse)
          for (t2 = t2.left; !t2.isEmpty(); )
            this.nodeStack.push(t2), t2 = t2.right;
        else
          for (t2 = t2.right; !t2.isEmpty(); )
            this.nodeStack.push(t2), t2 = t2.left;
        return e;
      }
      hasNext() {
        return this.nodeStack.length > 0;
      }
      peek() {
        if (0 === this.nodeStack.length)
          return null;
        const t2 = this.nodeStack[this.nodeStack.length - 1];
        return {
          key: t2.key,
          value: t2.value
        };
      }
    };
    jt = class {
      constructor(t2, e, n, s2, i) {
        this.key = t2, this.value = e, this.color = null != n ? n : jt.RED, this.left = null != s2 ? s2 : jt.EMPTY, this.right = null != i ? i : jt.EMPTY, this.size = this.left.size + 1 + this.right.size;
      }
      copy(t2, e, n, s2, i) {
        return new jt(null != t2 ? t2 : this.key, null != e ? e : this.value, null != n ? n : this.color, null != s2 ? s2 : this.left, null != i ? i : this.right);
      }
      isEmpty() {
        return false;
      }
      inorderTraversal(t2) {
        return this.left.inorderTraversal(t2) || t2(this.key, this.value) || this.right.inorderTraversal(t2);
      }
      reverseTraversal(t2) {
        return this.right.reverseTraversal(t2) || t2(this.key, this.value) || this.left.reverseTraversal(t2);
      }
      min() {
        return this.left.isEmpty() ? this : this.left.min();
      }
      minKey() {
        return this.min().key;
      }
      maxKey() {
        return this.right.isEmpty() ? this.key : this.right.maxKey();
      }
      insert(t2, e, n) {
        let s2 = this;
        const i = n(t2, s2.key);
        return s2 = i < 0 ? s2.copy(null, null, null, s2.left.insert(t2, e, n), null) : 0 === i ? s2.copy(null, e, null, null, null) : s2.copy(null, null, null, null, s2.right.insert(t2, e, n)), s2.fixUp();
      }
      removeMin() {
        if (this.left.isEmpty())
          return jt.EMPTY;
        let t2 = this;
        return t2.left.isRed() || t2.left.left.isRed() || (t2 = t2.moveRedLeft()), t2 = t2.copy(null, null, null, t2.left.removeMin(), null), t2.fixUp();
      }
      remove(t2, e) {
        let n, s2 = this;
        if (e(t2, s2.key) < 0)
          s2.left.isEmpty() || s2.left.isRed() || s2.left.left.isRed() || (s2 = s2.moveRedLeft()), s2 = s2.copy(null, null, null, s2.left.remove(t2, e), null);
        else {
          if (s2.left.isRed() && (s2 = s2.rotateRight()), s2.right.isEmpty() || s2.right.isRed() || s2.right.left.isRed() || (s2 = s2.moveRedRight()), 0 === e(t2, s2.key)) {
            if (s2.right.isEmpty())
              return jt.EMPTY;
            n = s2.right.min(), s2 = s2.copy(n.key, n.value, null, null, s2.right.removeMin());
          }
          s2 = s2.copy(null, null, null, null, s2.right.remove(t2, e));
        }
        return s2.fixUp();
      }
      isRed() {
        return this.color;
      }
      fixUp() {
        let t2 = this;
        return t2.right.isRed() && !t2.left.isRed() && (t2 = t2.rotateLeft()), t2.left.isRed() && t2.left.left.isRed() && (t2 = t2.rotateRight()), t2.left.isRed() && t2.right.isRed() && (t2 = t2.colorFlip()), t2;
      }
      moveRedLeft() {
        let t2 = this.colorFlip();
        return t2.right.left.isRed() && (t2 = t2.copy(null, null, null, null, t2.right.rotateRight()), t2 = t2.rotateLeft(), t2 = t2.colorFlip()), t2;
      }
      moveRedRight() {
        let t2 = this.colorFlip();
        return t2.left.left.isRed() && (t2 = t2.rotateRight(), t2 = t2.colorFlip()), t2;
      }
      rotateLeft() {
        const t2 = this.copy(null, null, jt.RED, null, this.right.left);
        return this.right.copy(null, null, this.color, t2, null);
      }
      rotateRight() {
        const t2 = this.copy(null, null, jt.RED, this.left.right, null);
        return this.left.copy(null, null, this.color, null, t2);
      }
      colorFlip() {
        const t2 = this.left.copy(null, null, !this.left.color, null, null), e = this.right.copy(null, null, !this.right.color, null, null);
        return this.copy(null, null, !this.color, t2, e);
      }
      checkMaxDepth() {
        const t2 = this.check();
        return Math.pow(2, t2) <= this.size + 1;
      }
      check() {
        if (this.isRed() && this.left.isRed())
          throw L2();
        if (this.right.isRed())
          throw L2();
        const t2 = this.left.check();
        if (t2 !== this.right.check())
          throw L2();
        return t2 + (this.isRed() ? 0 : 1);
      }
    };
    jt.EMPTY = null, jt.RED = true, jt.BLACK = false;
    jt.EMPTY = new class {
      constructor() {
        this.size = 0;
      }
      get key() {
        throw L2();
      }
      get value() {
        throw L2();
      }
      get color() {
        throw L2();
      }
      get left() {
        throw L2();
      }
      get right() {
        throw L2();
      }
      copy(t2, e, n, s2, i) {
        return this;
      }
      insert(t2, e, n) {
        return new jt(t2, e);
      }
      remove(t2, e) {
        return this;
      }
      isEmpty() {
        return true;
      }
      inorderTraversal(t2) {
        return false;
      }
      reverseTraversal(t2) {
        return false;
      }
      minKey() {
        return null;
      }
      maxKey() {
        return null;
      }
      isRed() {
        return false;
      }
      checkMaxDepth() {
        return true;
      }
      check() {
        return 0;
      }
    }();
    Wt = class {
      constructor(t2) {
        this.comparator = t2, this.data = new Gt(this.comparator);
      }
      has(t2) {
        return null !== this.data.get(t2);
      }
      first() {
        return this.data.minKey();
      }
      last() {
        return this.data.maxKey();
      }
      get size() {
        return this.data.size;
      }
      indexOf(t2) {
        return this.data.indexOf(t2);
      }
      forEach(t2) {
        this.data.inorderTraversal((e, n) => (t2(e), false));
      }
      forEachInRange(t2, e) {
        const n = this.data.getIteratorFrom(t2[0]);
        for (; n.hasNext(); ) {
          const s2 = n.getNext();
          if (this.comparator(s2.key, t2[1]) >= 0)
            return;
          e(s2.key);
        }
      }
      forEachWhile(t2, e) {
        let n;
        for (n = void 0 !== e ? this.data.getIteratorFrom(e) : this.data.getIterator(); n.hasNext(); ) {
          if (!t2(n.getNext().key))
            return;
        }
      }
      firstAfterOrEqual(t2) {
        const e = this.data.getIteratorFrom(t2);
        return e.hasNext() ? e.getNext().key : null;
      }
      getIterator() {
        return new zt(this.data.getIterator());
      }
      getIteratorFrom(t2) {
        return new zt(this.data.getIteratorFrom(t2));
      }
      add(t2) {
        return this.copy(this.data.remove(t2).insert(t2, true));
      }
      delete(t2) {
        return this.has(t2) ? this.copy(this.data.remove(t2)) : this;
      }
      isEmpty() {
        return this.data.isEmpty();
      }
      unionWith(t2) {
        let e = this;
        return e.size < t2.size && (e = t2, t2 = this), t2.forEach((t3) => {
          e = e.add(t3);
        }), e;
      }
      isEqual(t2) {
        if (!(t2 instanceof Wt))
          return false;
        if (this.size !== t2.size)
          return false;
        const e = this.data.getIterator(), n = t2.data.getIterator();
        for (; e.hasNext(); ) {
          const t3 = e.getNext().key, s2 = n.getNext().key;
          if (0 !== this.comparator(t3, s2))
            return false;
        }
        return true;
      }
      toArray() {
        const t2 = [];
        return this.forEach((e) => {
          t2.push(e);
        }), t2;
      }
      toString() {
        const t2 = [];
        return this.forEach((e) => t2.push(e)), "SortedSet(" + t2.toString() + ")";
      }
      copy(t2) {
        const e = new Wt(this.comparator);
        return e.data = t2, e;
      }
    };
    zt = class {
      constructor(t2) {
        this.iter = t2;
      }
      getNext() {
        return this.iter.getNext().key;
      }
      hasNext() {
        return this.iter.hasNext();
      }
    };
    Jt = class {
      constructor(t2) {
        this.fields = t2, t2.sort(ft.comparator);
      }
      static empty() {
        return new Jt([]);
      }
      unionWith(t2) {
        let e = new Wt(ft.comparator);
        for (const t3 of this.fields)
          e = e.add(t3);
        for (const n of t2)
          e = e.add(n);
        return new Jt(e.toArray());
      }
      covers(t2) {
        for (const e of this.fields)
          if (e.isPrefixOf(t2))
            return true;
        return false;
      }
      isEqual(t2) {
        return rt(this.fields, t2.fields, (t3, e) => t3.isEqual(e));
      }
    };
    Xt = class {
      constructor(t2) {
        this.binaryString = t2;
      }
      static fromBase64String(t2) {
        const e = atob(t2);
        return new Xt(e);
      }
      static fromUint8Array(t2) {
        const e = function(t3) {
          let e2 = "";
          for (let n = 0; n < t3.length; ++n)
            e2 += String.fromCharCode(t3[n]);
          return e2;
        }(t2);
        return new Xt(e);
      }
      [Symbol.iterator]() {
        let t2 = 0;
        return {
          next: () => t2 < this.binaryString.length ? {
            value: this.binaryString.charCodeAt(t2++),
            done: false
          } : {
            value: void 0,
            done: true
          }
        };
      }
      toBase64() {
        return t2 = this.binaryString, btoa(t2);
        var t2;
      }
      toUint8Array() {
        return function(t2) {
          const e = new Uint8Array(t2.length);
          for (let n = 0; n < t2.length; n++)
            e[n] = t2.charCodeAt(n);
          return e;
        }(this.binaryString);
      }
      approximateByteSize() {
        return 2 * this.binaryString.length;
      }
      compareTo(t2) {
        return it(this.binaryString, t2.binaryString);
      }
      isEqual(t2) {
        return this.binaryString === t2.binaryString;
      }
    };
    Xt.EMPTY_BYTE_STRING = new Xt("");
    Zt = new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);
    oe = class {
      constructor(t2, e, n, s2, i, r, o, u) {
        this.databaseId = t2, this.appId = e, this.persistenceKey = n, this.host = s2, this.ssl = i, this.forceLongPolling = r, this.autoDetectLongPolling = o, this.useFetchStreams = u;
      }
    };
    ue = class {
      constructor(t2, e) {
        this.projectId = t2, this.database = e || "(default)";
      }
      static empty() {
        return new ue("", "");
      }
      get isDefaultDatabase() {
        return "(default)" === this.database;
      }
      isEqual(t2) {
        return t2 instanceof ue && t2.projectId === this.projectId && t2.database === this.database;
      }
    };
    le = {
      mapValue: {
        fields: {
          __type__: {
            stringValue: "__max__"
          }
        }
      }
    };
    xe = class {
      constructor(t2) {
        this.value = t2;
      }
      static empty() {
        return new xe({
          mapValue: {}
        });
      }
      field(t2) {
        if (t2.isEmpty())
          return this.value;
        {
          let e = this.value;
          for (let n = 0; n < t2.length - 1; ++n)
            if (e = (e.mapValue.fields || {})[t2.get(n)], !be(e))
              return null;
          return e = (e.mapValue.fields || {})[t2.lastSegment()], e || null;
        }
      }
      set(t2, e) {
        this.getFieldsMap(t2.popLast())[t2.lastSegment()] = Pe(e);
      }
      setAll(t2) {
        let e = ft.emptyPath(), n = {}, s2 = [];
        t2.forEach((t3, i2) => {
          if (!e.isImmediateParentOf(i2)) {
            const t4 = this.getFieldsMap(e);
            this.applyChanges(t4, n, s2), n = {}, s2 = [], e = i2.popLast();
          }
          t3 ? n[i2.lastSegment()] = Pe(t3) : s2.push(i2.lastSegment());
        });
        const i = this.getFieldsMap(e);
        this.applyChanges(i, n, s2);
      }
      delete(t2) {
        const e = this.field(t2.popLast());
        be(e) && e.mapValue.fields && delete e.mapValue.fields[t2.lastSegment()];
      }
      isEqual(t2) {
        return _e(this.value, t2.value);
      }
      getFieldsMap(t2) {
        let e = this.value;
        e.mapValue.fields || (e.mapValue = {
          fields: {}
        });
        for (let n = 0; n < t2.length; ++n) {
          let s2 = e.mapValue.fields[t2.get(n)];
          be(s2) && s2.mapValue.fields || (s2 = {
            mapValue: {
              fields: {}
            }
          }, e.mapValue.fields[t2.get(n)] = s2), e = s2;
        }
        return e.mapValue.fields;
      }
      applyChanges(t2, e, n) {
        qt(e, (e2, n2) => t2[e2] = n2);
        for (const e2 of n)
          delete t2[e2];
      }
      clone() {
        return new xe(Pe(this.value));
      }
    };
    ke = class {
      constructor(t2, e, n, s2, i, r) {
        this.key = t2, this.documentType = e, this.version = n, this.readTime = s2, this.data = i, this.documentState = r;
      }
      static newInvalidDocument(t2) {
        return new ke(t2, 0, ct.min(), ct.min(), xe.empty(), 0);
      }
      static newFoundDocument(t2, e, n) {
        return new ke(t2, 1, e, ct.min(), n, 0);
      }
      static newNoDocument(t2, e) {
        return new ke(t2, 2, e, ct.min(), xe.empty(), 0);
      }
      static newUnknownDocument(t2, e) {
        return new ke(t2, 3, e, ct.min(), xe.empty(), 2);
      }
      convertToFoundDocument(t2, e) {
        return this.version = t2, this.documentType = 1, this.data = e, this.documentState = 0, this;
      }
      convertToNoDocument(t2) {
        return this.version = t2, this.documentType = 2, this.data = xe.empty(), this.documentState = 0, this;
      }
      convertToUnknownDocument(t2) {
        return this.version = t2, this.documentType = 3, this.data = xe.empty(), this.documentState = 2, this;
      }
      setHasCommittedMutations() {
        return this.documentState = 2, this;
      }
      setHasLocalMutations() {
        return this.documentState = 1, this.version = ct.min(), this;
      }
      setReadTime(t2) {
        return this.readTime = t2, this;
      }
      get hasLocalMutations() {
        return 1 === this.documentState;
      }
      get hasCommittedMutations() {
        return 2 === this.documentState;
      }
      get hasPendingWrites() {
        return this.hasLocalMutations || this.hasCommittedMutations;
      }
      isValidDocument() {
        return 0 !== this.documentType;
      }
      isFoundDocument() {
        return 1 === this.documentType;
      }
      isNoDocument() {
        return 2 === this.documentType;
      }
      isUnknownDocument() {
        return 3 === this.documentType;
      }
      isEqual(t2) {
        return t2 instanceof ke && this.key.isEqual(t2.key) && this.version.isEqual(t2.version) && this.documentType === t2.documentType && this.documentState === t2.documentState && this.data.isEqual(t2.data);
      }
      mutableCopy() {
        return new ke(this.key, this.documentType, this.version, this.readTime, this.data.clone(), this.documentState);
      }
      toString() {
        return `Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`;
      }
    };
    Me = class {
      constructor(t2, e = null, n = [], s2 = [], i = null, r = null, o = null) {
        this.path = t2, this.collectionGroup = e, this.orderBy = n, this.filters = s2, this.limit = i, this.startAt = r, this.endAt = o, this.ht = null;
      }
    };
    Ge = class extends class {
    } {
      constructor(t2, e, n) {
        super(), this.field = t2, this.op = e, this.value = n;
      }
      static create(t2, e, n) {
        return t2.isKeyField() ? "in" === e || "not-in" === e ? this.lt(t2, e, n) : new Qe(t2, e, n) : "array-contains" === e ? new He(t2, n) : "in" === e ? new Je(t2, n) : "not-in" === e ? new Ye(t2, n) : "array-contains-any" === e ? new Xe(t2, n) : new Ge(t2, e, n);
      }
      static lt(t2, e, n) {
        return "in" === e ? new je(t2, n) : new We(t2, n);
      }
      matches(t2) {
        const e = t2.data.field(this.field);
        return "!=" === this.op ? null !== e && this.ft(me(e, this.value)) : null !== e && de(this.value) === de(e) && this.ft(me(e, this.value));
      }
      ft(t2) {
        switch (this.op) {
          case "<":
            return t2 < 0;
          case "<=":
            return t2 <= 0;
          case "==":
            return 0 === t2;
          case "!=":
            return 0 !== t2;
          case ">":
            return t2 > 0;
          case ">=":
            return t2 >= 0;
          default:
            return L2();
        }
      }
      dt() {
        return ["<", "<=", ">", ">=", "!=", "not-in"].indexOf(this.op) >= 0;
      }
    };
    Qe = class extends Ge {
      constructor(t2, e, n) {
        super(t2, e, n), this.key = dt.fromName(n.referenceValue);
      }
      matches(t2) {
        const e = dt.comparator(t2.key, this.key);
        return this.ft(e);
      }
    };
    je = class extends Ge {
      constructor(t2, e) {
        super(t2, "in", e), this.keys = ze("in", e);
      }
      matches(t2) {
        return this.keys.some((e) => e.isEqual(t2.key));
      }
    };
    We = class extends Ge {
      constructor(t2, e) {
        super(t2, "not-in", e), this.keys = ze("not-in", e);
      }
      matches(t2) {
        return !this.keys.some((e) => e.isEqual(t2.key));
      }
    };
    He = class extends Ge {
      constructor(t2, e) {
        super(t2, "array-contains", e);
      }
      matches(t2) {
        const e = t2.data.field(this.field);
        return Ee(e) && we(e.arrayValue, this.value);
      }
    };
    Je = class extends Ge {
      constructor(t2, e) {
        super(t2, "in", e);
      }
      matches(t2) {
        const e = t2.data.field(this.field);
        return null !== e && we(this.value.arrayValue, e);
      }
    };
    Ye = class extends Ge {
      constructor(t2, e) {
        super(t2, "not-in", e);
      }
      matches(t2) {
        if (we(this.value.arrayValue, {
          nullValue: "NULL_VALUE"
        }))
          return false;
        const e = t2.data.field(this.field);
        return null !== e && !we(this.value.arrayValue, e);
      }
    };
    Xe = class extends Ge {
      constructor(t2, e) {
        super(t2, "array-contains-any", e);
      }
      matches(t2) {
        const e = t2.data.field(this.field);
        return !(!Ee(e) || !e.arrayValue.values) && e.arrayValue.values.some((t3) => we(this.value.arrayValue, t3));
      }
    };
    Ze = class {
      constructor(t2, e) {
        this.position = t2, this.inclusive = e;
      }
    };
    tn = class {
      constructor(t2, e = "asc") {
        this.field = t2, this.dir = e;
      }
    };
    rn = class {
      constructor(t2, e = null, n = [], s2 = [], i = null, r = "F", o = null, u = null) {
        this.path = t2, this.collectionGroup = e, this.explicitOrderBy = n, this.filters = s2, this.limit = i, this.limitType = r, this.startAt = o, this.endAt = u, this._t = null, this.wt = null, this.startAt, this.endAt;
      }
    };
    bn = class {
      constructor() {
        this._ = void 0;
      }
    };
    Sn = class extends bn {
    };
    Dn = class extends bn {
      constructor(t2) {
        super(), this.elements = t2;
      }
    };
    xn = class extends bn {
      constructor(t2) {
        super(), this.elements = t2;
      }
    };
    kn = class extends bn {
      constructor(t2, e) {
        super(), this.It = t2, this.yt = e;
      }
    };
    Ln = class {
      constructor(t2, e) {
        this.updateTime = t2, this.exists = e;
      }
      static none() {
        return new Ln();
      }
      static exists(t2) {
        return new Ln(void 0, t2);
      }
      static updateTime(t2) {
        return new Ln(t2);
      }
      get isNone() {
        return void 0 === this.updateTime && void 0 === this.exists;
      }
      isEqual(t2) {
        return this.exists === t2.exists && (this.updateTime ? !!t2.updateTime && this.updateTime.isEqual(t2.updateTime) : !t2.updateTime);
      }
    };
    qn = class {
    };
    zn = class extends qn {
      constructor(t2, e, n, s2 = []) {
        super(), this.key = t2, this.value = e, this.precondition = n, this.fieldTransforms = s2, this.type = 0;
      }
      getFieldMask() {
        return null;
      }
    };
    Hn = class extends qn {
      constructor(t2, e, n, s2, i = []) {
        super(), this.key = t2, this.data = e, this.fieldMask = n, this.precondition = s2, this.fieldTransforms = i, this.type = 1;
      }
      getFieldMask() {
        return this.fieldMask;
      }
    };
    Zn = class extends qn {
      constructor(t2, e) {
        super(), this.key = t2, this.precondition = e, this.type = 2, this.fieldTransforms = [];
      }
      getFieldMask() {
        return null;
      }
    };
    es = class {
      constructor(t2) {
        this.count = t2;
      }
    };
    (ss = ns || (ns = {}))[ss.OK = 0] = "OK", ss[ss.CANCELLED = 1] = "CANCELLED", ss[ss.UNKNOWN = 2] = "UNKNOWN", ss[ss.INVALID_ARGUMENT = 3] = "INVALID_ARGUMENT", ss[ss.DEADLINE_EXCEEDED = 4] = "DEADLINE_EXCEEDED", ss[ss.NOT_FOUND = 5] = "NOT_FOUND", ss[ss.ALREADY_EXISTS = 6] = "ALREADY_EXISTS", ss[ss.PERMISSION_DENIED = 7] = "PERMISSION_DENIED", ss[ss.UNAUTHENTICATED = 16] = "UNAUTHENTICATED", ss[ss.RESOURCE_EXHAUSTED = 8] = "RESOURCE_EXHAUSTED", ss[ss.FAILED_PRECONDITION = 9] = "FAILED_PRECONDITION", ss[ss.ABORTED = 10] = "ABORTED", ss[ss.OUT_OF_RANGE = 11] = "OUT_OF_RANGE", ss[ss.UNIMPLEMENTED = 12] = "UNIMPLEMENTED", ss[ss.INTERNAL = 13] = "INTERNAL", ss[ss.UNAVAILABLE = 14] = "UNAVAILABLE", ss[ss.DATA_LOSS = 15] = "DATA_LOSS";
    os = class {
      constructor(t2, e) {
        this.mapKeyFn = t2, this.equalsFn = e, this.inner = {}, this.innerSize = 0;
      }
      get(t2) {
        const e = this.mapKeyFn(t2), n = this.inner[e];
        if (void 0 !== n) {
          for (const [e2, s2] of n)
            if (this.equalsFn(e2, t2))
              return s2;
        }
      }
      has(t2) {
        return void 0 !== this.get(t2);
      }
      set(t2, e) {
        const n = this.mapKeyFn(t2), s2 = this.inner[n];
        if (void 0 === s2)
          return this.inner[n] = [[t2, e]], void this.innerSize++;
        for (let n2 = 0; n2 < s2.length; n2++)
          if (this.equalsFn(s2[n2][0], t2))
            return void (s2[n2] = [t2, e]);
        s2.push([t2, e]), this.innerSize++;
      }
      delete(t2) {
        const e = this.mapKeyFn(t2), n = this.inner[e];
        if (void 0 === n)
          return false;
        for (let s2 = 0; s2 < n.length; s2++)
          if (this.equalsFn(n[s2][0], t2))
            return 1 === n.length ? delete this.inner[e] : n.splice(s2, 1), this.innerSize--, true;
        return false;
      }
      forEach(t2) {
        qt(this.inner, (e, n) => {
          for (const [e2, s2] of n)
            t2(e2, s2);
        });
      }
      isEmpty() {
        return Kt(this.inner);
      }
      size() {
        return this.innerSize;
      }
    };
    us = new Gt(dt.comparator);
    as = new Gt(dt.comparator);
    ws = new Gt(dt.comparator);
    ms = new Wt(dt.comparator);
    ys = new Wt(it);
    Is = class {
      constructor(t2, e, n, s2, i) {
        this.snapshotVersion = t2, this.targetChanges = e, this.targetMismatches = n, this.documentUpdates = s2, this.resolvedLimboDocuments = i;
      }
      static createSynthesizedRemoteEventForCurrentChange(t2, e) {
        const n = /* @__PURE__ */ new Map();
        return n.set(t2, Ts.createSynthesizedTargetChangeForCurrentChange(t2, e)), new Is(ct.min(), n, ps(), cs(), gs());
      }
    };
    Ts = class {
      constructor(t2, e, n, s2, i) {
        this.resumeToken = t2, this.current = e, this.addedDocuments = n, this.modifiedDocuments = s2, this.removedDocuments = i;
      }
      static createSynthesizedTargetChangeForCurrentChange(t2, e) {
        return new Ts(Xt.EMPTY_BYTE_STRING, e, gs(), gs(), gs());
      }
    };
    Es = class {
      constructor(t2, e, n, s2) {
        this.Tt = t2, this.removedTargetIds = e, this.key = n, this.Et = s2;
      }
    };
    As = class {
      constructor(t2, e) {
        this.targetId = t2, this.At = e;
      }
    };
    Rs = class {
      constructor(t2, e, n = Xt.EMPTY_BYTE_STRING, s2 = null) {
        this.state = t2, this.targetIds = e, this.resumeToken = n, this.cause = s2;
      }
    };
    bs = class {
      constructor() {
        this.Rt = 0, this.bt = Vs(), this.Pt = Xt.EMPTY_BYTE_STRING, this.vt = false, this.Vt = true;
      }
      get current() {
        return this.vt;
      }
      get resumeToken() {
        return this.Pt;
      }
      get St() {
        return 0 !== this.Rt;
      }
      get Dt() {
        return this.Vt;
      }
      Ct(t2) {
        t2.approximateByteSize() > 0 && (this.Vt = true, this.Pt = t2);
      }
      xt() {
        let t2 = gs(), e = gs(), n = gs();
        return this.bt.forEach((s2, i) => {
          switch (i) {
            case 0:
              t2 = t2.add(s2);
              break;
            case 2:
              e = e.add(s2);
              break;
            case 1:
              n = n.add(s2);
              break;
            default:
              L2();
          }
        }), new Ts(this.Pt, this.vt, t2, e, n);
      }
      Nt() {
        this.Vt = false, this.bt = Vs();
      }
      kt(t2, e) {
        this.Vt = true, this.bt = this.bt.insert(t2, e);
      }
      Mt(t2) {
        this.Vt = true, this.bt = this.bt.remove(t2);
      }
      Ot() {
        this.Rt += 1;
      }
      Ft() {
        this.Rt -= 1;
      }
      $t() {
        this.Vt = true, this.vt = true;
      }
    };
    Ps = class {
      constructor(t2) {
        this.Bt = t2, this.Lt = /* @__PURE__ */ new Map(), this.Ut = cs(), this.qt = vs(), this.Kt = new Wt(it);
      }
      Gt(t2) {
        for (const e of t2.Tt)
          t2.Et && t2.Et.isFoundDocument() ? this.Qt(e, t2.Et) : this.jt(e, t2.key, t2.Et);
        for (const e of t2.removedTargetIds)
          this.jt(e, t2.key, t2.Et);
      }
      Wt(t2) {
        this.forEachTarget(t2, (e) => {
          const n = this.zt(e);
          switch (t2.state) {
            case 0:
              this.Ht(e) && n.Ct(t2.resumeToken);
              break;
            case 1:
              n.Ft(), n.St || n.Nt(), n.Ct(t2.resumeToken);
              break;
            case 2:
              n.Ft(), n.St || this.removeTarget(e);
              break;
            case 3:
              this.Ht(e) && (n.$t(), n.Ct(t2.resumeToken));
              break;
            case 4:
              this.Ht(e) && (this.Jt(e), n.Ct(t2.resumeToken));
              break;
            default:
              L2();
          }
        });
      }
      forEachTarget(t2, e) {
        t2.targetIds.length > 0 ? t2.targetIds.forEach(e) : this.Lt.forEach((t3, n) => {
          this.Ht(n) && e(n);
        });
      }
      Yt(t2) {
        const e = t2.targetId, n = t2.At.count, s2 = this.Xt(e);
        if (s2) {
          const t3 = s2.target;
          if (Le(t3))
            if (0 === n) {
              const n2 = new dt(t3.path);
              this.jt(e, n2, ke.newNoDocument(n2, ct.min()));
            } else
              U2(1 === n);
          else {
            this.Zt(e) !== n && (this.Jt(e), this.Kt = this.Kt.add(e));
          }
        }
      }
      te(t2) {
        const e = /* @__PURE__ */ new Map();
        this.Lt.forEach((n2, s3) => {
          const i = this.Xt(s3);
          if (i) {
            if (n2.current && Le(i.target)) {
              const e2 = new dt(i.target.path);
              null !== this.Ut.get(e2) || this.ee(s3, e2) || this.jt(s3, e2, ke.newNoDocument(e2, t2));
            }
            n2.Dt && (e.set(s3, n2.xt()), n2.Nt());
          }
        });
        let n = gs();
        this.qt.forEach((t3, e2) => {
          let s3 = true;
          e2.forEachWhile((t4) => {
            const e3 = this.Xt(t4);
            return !e3 || 2 === e3.purpose || (s3 = false, false);
          }), s3 && (n = n.add(t3));
        }), this.Ut.forEach((e2, n2) => n2.setReadTime(t2));
        const s2 = new Is(t2, e, this.Kt, this.Ut, n);
        return this.Ut = cs(), this.qt = vs(), this.Kt = new Wt(it), s2;
      }
      Qt(t2, e) {
        if (!this.Ht(t2))
          return;
        const n = this.ee(t2, e.key) ? 2 : 0;
        this.zt(t2).kt(e.key, n), this.Ut = this.Ut.insert(e.key, e), this.qt = this.qt.insert(e.key, this.ne(e.key).add(t2));
      }
      jt(t2, e, n) {
        if (!this.Ht(t2))
          return;
        const s2 = this.zt(t2);
        this.ee(t2, e) ? s2.kt(e, 1) : s2.Mt(e), this.qt = this.qt.insert(e, this.ne(e).delete(t2)), n && (this.Ut = this.Ut.insert(e, n));
      }
      removeTarget(t2) {
        this.Lt.delete(t2);
      }
      Zt(t2) {
        const e = this.zt(t2).xt();
        return this.Bt.getRemoteKeysForTarget(t2).size + e.addedDocuments.size - e.removedDocuments.size;
      }
      Ot(t2) {
        this.zt(t2).Ot();
      }
      zt(t2) {
        let e = this.Lt.get(t2);
        return e || (e = new bs(), this.Lt.set(t2, e)), e;
      }
      ne(t2) {
        let e = this.qt.get(t2);
        return e || (e = new Wt(it), this.qt = this.qt.insert(t2, e)), e;
      }
      Ht(t2) {
        const e = null !== this.Xt(t2);
        return e || O2("WatchChangeAggregator", "Detected inactive target", t2), e;
      }
      Xt(t2) {
        const e = this.Lt.get(t2);
        return e && e.St ? null : this.Bt.se(t2);
      }
      Jt(t2) {
        this.Lt.set(t2, new bs());
        this.Bt.getRemoteKeysForTarget(t2).forEach((e) => {
          this.jt(t2, e, null);
        });
      }
      ee(t2, e) {
        return this.Bt.getRemoteKeysForTarget(t2).has(e);
      }
    };
    Ss = (() => {
      const t2 = {
        asc: "ASCENDING",
        desc: "DESCENDING"
      };
      return t2;
    })();
    Ds = (() => {
      const t2 = {
        "<": "LESS_THAN",
        "<=": "LESS_THAN_OR_EQUAL",
        ">": "GREATER_THAN",
        ">=": "GREATER_THAN_OR_EQUAL",
        "==": "EQUAL",
        "!=": "NOT_EQUAL",
        "array-contains": "ARRAY_CONTAINS",
        in: "IN",
        "not-in": "NOT_IN",
        "array-contains-any": "ARRAY_CONTAINS_ANY"
      };
      return t2;
    })();
    Cs = class {
      constructor(t2, e) {
        this.databaseId = t2, this.gt = e;
      }
    };
    xi = [...[...[...[...["mutationQueues", "mutations", "documentMutations", "remoteDocuments", "targets", "owner", "targetGlobal", "targetDocuments"], "clientMetadata"], "remoteDocumentGlobal"], "collectionParents"], "bundles", "namedQueries"];
    Ni = [...xi, "documentOverlays"];
    ki = ["mutationQueues", "mutations", "documentMutations", "remoteDocumentsV14", "targets", "owner", "targetGlobal", "targetDocuments", "clientMetadata", "remoteDocumentGlobal", "collectionParents", "bundles", "namedQueries", "documentOverlays"];
    Mi = ki;
    Oi = [...Mi, "indexConfiguration", "indexState", "indexEntries"];
    Bi = class {
      constructor(t2, e, n, s2) {
        this.batchId = t2, this.localWriteTime = e, this.baseMutations = n, this.mutations = s2;
      }
      applyToRemoteDocument(t2, e) {
        const n = e.mutationResults;
        for (let e2 = 0; e2 < this.mutations.length; e2++) {
          const s2 = this.mutations[e2];
          if (s2.key.isEqual(t2.key)) {
            Gn(s2, t2, n[e2]);
          }
        }
      }
      applyToLocalView(t2, e) {
        for (const n of this.baseMutations)
          n.key.isEqual(t2.key) && (e = Qn(n, t2, e, this.localWriteTime));
        for (const n of this.mutations)
          n.key.isEqual(t2.key) && (e = Qn(n, t2, e, this.localWriteTime));
        return e;
      }
      applyToLocalDocumentSet(t2, e) {
        const n = ds();
        return this.mutations.forEach((s2) => {
          const i = t2.get(s2.key), r = i.overlayedDocument;
          let o = this.applyToLocalView(r, i.mutatedFields);
          o = e.has(s2.key) ? null : o;
          const u = Kn(r, o);
          null !== u && n.set(s2.key, u), r.isValidDocument() || r.convertToNoDocument(ct.min());
        }), n;
      }
      keys() {
        return this.mutations.reduce((t2, e) => t2.add(e.key), gs());
      }
      isEqual(t2) {
        return this.batchId === t2.batchId && rt(this.mutations, t2.mutations, (t3, e) => Wn(t3, e)) && rt(this.baseMutations, t2.baseMutations, (t3, e) => Wn(t3, e));
      }
    };
    Ui = class {
      constructor(t2, e) {
        this.largestBatchId = t2, this.mutation = e;
      }
      getKey() {
        return this.mutation.key;
      }
      isEqual(t2) {
        return null !== t2 && this.mutation === t2.mutation;
      }
      toString() {
        return `Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`;
      }
    };
    qi = class {
      constructor(t2, e, n, s2, i = ct.min(), r = ct.min(), o = Xt.EMPTY_BYTE_STRING) {
        this.target = t2, this.targetId = e, this.purpose = n, this.sequenceNumber = s2, this.snapshotVersion = i, this.lastLimboFreeSnapshotVersion = r, this.resumeToken = o;
      }
      withSequenceNumber(t2) {
        return new qi(this.target, this.targetId, this.purpose, t2, this.snapshotVersion, this.lastLimboFreeSnapshotVersion, this.resumeToken);
      }
      withResumeToken(t2, e) {
        return new qi(this.target, this.targetId, this.purpose, this.sequenceNumber, e, this.lastLimboFreeSnapshotVersion, t2);
      }
      withLastLimboFreeSnapshotVersion(t2) {
        return new qi(this.target, this.targetId, this.purpose, this.sequenceNumber, this.snapshotVersion, t2, this.resumeToken);
      }
    };
    Ki = class {
      constructor(t2) {
        this.re = t2;
      }
    };
    ur = class {
      constructor() {
      }
      ce(t2, e) {
        this.ae(t2, e), e.he();
      }
      ae(t2, e) {
        if ("nullValue" in t2)
          this.le(e, 5);
        else if ("booleanValue" in t2)
          this.le(e, 10), e.fe(t2.booleanValue ? 1 : 0);
        else if ("integerValue" in t2)
          this.le(e, 15), e.fe(ee(t2.integerValue));
        else if ("doubleValue" in t2) {
          const n = ee(t2.doubleValue);
          isNaN(n) ? this.le(e, 13) : (this.le(e, 15), ae(n) ? e.fe(0) : e.fe(n));
        } else if ("timestampValue" in t2) {
          const n = t2.timestampValue;
          this.le(e, 20), "string" == typeof n ? e.de(n) : (e.de(`${n.seconds || ""}`), e.fe(n.nanos || 0));
        } else if ("stringValue" in t2)
          this._e(t2.stringValue, e), this.we(e);
        else if ("bytesValue" in t2)
          this.le(e, 30), e.me(ne(t2.bytesValue)), this.we(e);
        else if ("referenceValue" in t2)
          this.ge(t2.referenceValue, e);
        else if ("geoPointValue" in t2) {
          const n = t2.geoPointValue;
          this.le(e, 45), e.fe(n.latitude || 0), e.fe(n.longitude || 0);
        } else
          "mapValue" in t2 ? ve(t2) ? this.le(e, Number.MAX_SAFE_INTEGER) : (this.ye(t2.mapValue, e), this.we(e)) : "arrayValue" in t2 ? (this.pe(t2.arrayValue, e), this.we(e)) : L2();
      }
      _e(t2, e) {
        this.le(e, 25), this.Ie(t2, e);
      }
      Ie(t2, e) {
        e.de(t2);
      }
      ye(t2, e) {
        const n = t2.fields || {};
        this.le(e, 55);
        for (const t3 of Object.keys(n))
          this._e(t3, e), this.ae(n[t3], e);
      }
      pe(t2, e) {
        const n = t2.values || [];
        this.le(e, 50);
        for (const t3 of n)
          this.ae(t3, e);
      }
      ge(t2, e) {
        this.le(e, 37);
        dt.fromName(t2).path.forEach((t3) => {
          this.le(e, 60), this.Ie(t3, e);
        });
      }
      le(t2, e) {
        t2.fe(e);
      }
      we(t2) {
        t2.fe(2);
      }
    };
    ur.Te = new ur();
    yr = class {
      constructor() {
        this.Ye = new pr();
      }
      addToCollectionParentIndex(t2, e) {
        return this.Ye.add(e), Vt.resolve();
      }
      getCollectionParents(t2, e) {
        return Vt.resolve(this.Ye.getEntries(e));
      }
      addFieldIndex(t2, e) {
        return Vt.resolve();
      }
      deleteFieldIndex(t2, e) {
        return Vt.resolve();
      }
      getDocumentsMatchingTarget(t2, e) {
        return Vt.resolve(null);
      }
      getIndexType(t2, e) {
        return Vt.resolve(0);
      }
      getFieldIndexes(t2, e) {
        return Vt.resolve([]);
      }
      getNextCollectionGroupToUpdate(t2) {
        return Vt.resolve(null);
      }
      getMinOffset(t2, e) {
        return Vt.resolve(At.min());
      }
      getMinOffsetFromCollectionGroup(t2, e) {
        return Vt.resolve(At.min());
      }
      updateCollectionGroup(t2, e, n) {
        return Vt.resolve();
      }
      updateIndexEntries(t2, e) {
        return Vt.resolve();
      }
    };
    pr = class {
      constructor() {
        this.index = {};
      }
      add(t2) {
        const e = t2.lastSegment(), n = t2.popLast(), s2 = this.index[e] || new Wt(ht.comparator), i = !s2.has(n);
        return this.index[e] = s2.add(n), i;
      }
      has(t2) {
        const e = t2.lastSegment(), n = t2.popLast(), s2 = this.index[e];
        return s2 && s2.has(n);
      }
      getEntries(t2) {
        return (this.index[t2] || new Wt(ht.comparator)).toArray();
      }
    };
    Ir = new Uint8Array(0);
    Vr = class {
      constructor(t2, e, n) {
        this.cacheSizeCollectionThreshold = t2, this.percentileToCollect = e, this.maximumSequenceNumbersToCollect = n;
      }
      static withCacheSize(t2) {
        return new Vr(t2, Vr.DEFAULT_COLLECTION_PERCENTILE, Vr.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT);
      }
    };
    Vr.DEFAULT_COLLECTION_PERCENTILE = 10, Vr.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT = 1e3, Vr.DEFAULT = new Vr(41943040, Vr.DEFAULT_COLLECTION_PERCENTILE, Vr.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT), Vr.DISABLED = new Vr(-1, 0, 0);
    Or = class {
      constructor(t2) {
        this.bn = t2;
      }
      next() {
        return this.bn += 2, this.bn;
      }
      static Pn() {
        return new Or(0);
      }
      static vn() {
        return new Or(-1);
      }
    };
    Wr = class {
      constructor() {
        this.changes = new os((t2) => t2.toString(), (t2, e) => t2.isEqual(e)), this.changesApplied = false;
      }
      addEntry(t2) {
        this.assertNotApplied(), this.changes.set(t2.key, t2);
      }
      removeEntry(t2, e) {
        this.assertNotApplied(), this.changes.set(t2, ke.newInvalidDocument(t2).setReadTime(e));
      }
      getEntry(t2, e) {
        this.assertNotApplied();
        const n = this.changes.get(e);
        return void 0 !== n ? Vt.resolve(n) : this.getFromCache(t2, e);
      }
      getEntries(t2, e) {
        return this.getAllFromCache(t2, e);
      }
      apply(t2) {
        return this.assertNotApplied(), this.changesApplied = true, this.applyChanges(t2);
      }
      assertNotApplied() {
      }
    };
    no = class {
      constructor(t2, e) {
        this.overlayedDocument = t2, this.mutatedFields = e;
      }
    };
    so = class {
      constructor(t2, e, n, s2) {
        this.remoteDocumentCache = t2, this.mutationQueue = e, this.documentOverlayCache = n, this.indexManager = s2;
      }
      getDocument(t2, e) {
        let n = null;
        return this.documentOverlayCache.getOverlay(t2, e).next((s2) => (n = s2, this.getBaseDocument(t2, e, n))).next((t3) => (null !== n && Qn(n.mutation, t3, Jt.empty(), ut.now()), t3));
      }
      getDocuments(t2, e) {
        return this.remoteDocumentCache.getEntries(t2, e).next((e2) => this.getLocalViewOfDocuments(t2, e2, gs()).next(() => e2));
      }
      getLocalViewOfDocuments(t2, e, n = gs()) {
        const s2 = fs();
        return this.populateOverlays(t2, s2, e).next(() => this.computeViews(t2, e, s2, n).next((t3) => {
          let e2 = hs();
          return t3.forEach((t4, n2) => {
            e2 = e2.insert(t4, n2.overlayedDocument);
          }), e2;
        }));
      }
      getOverlayedDocuments(t2, e) {
        const n = fs();
        return this.populateOverlays(t2, n, e).next(() => this.computeViews(t2, e, n, gs()));
      }
      populateOverlays(t2, e, n) {
        const s2 = [];
        return n.forEach((t3) => {
          e.has(t3) || s2.push(t3);
        }), this.documentOverlayCache.getOverlays(t2, s2).next((t3) => {
          t3.forEach((t4, n2) => {
            e.set(t4, n2);
          });
        });
      }
      computeViews(t2, e, n, s2) {
        let i = cs();
        const r = _s(), o = _s();
        return e.forEach((t3, e2) => {
          const o2 = n.get(e2.key);
          s2.has(e2.key) && (void 0 === o2 || o2.mutation instanceof Hn) ? i = i.insert(e2.key, e2) : void 0 !== o2 && (r.set(e2.key, o2.mutation.getFieldMask()), Qn(o2.mutation, e2, o2.mutation.getFieldMask(), ut.now()));
        }), this.recalculateAndSaveOverlays(t2, i).next((t3) => (t3.forEach((t4, e2) => r.set(t4, e2)), e.forEach((t4, e2) => {
          var n2;
          return o.set(t4, new no(e2, null !== (n2 = r.get(t4)) && void 0 !== n2 ? n2 : null));
        }), o));
      }
      recalculateAndSaveOverlays(t2, e) {
        const n = _s();
        let s2 = new Gt((t3, e2) => t3 - e2), i = gs();
        return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t2, e).next((t3) => {
          for (const i2 of t3)
            i2.keys().forEach((t4) => {
              const r = e.get(t4);
              if (null === r)
                return;
              let o = n.get(t4) || Jt.empty();
              o = i2.applyToLocalView(r, o), n.set(t4, o);
              const u = (s2.get(i2.batchId) || gs()).add(t4);
              s2 = s2.insert(i2.batchId, u);
            });
        }).next(() => {
          const r = [], o = s2.getReverseIterator();
          for (; o.hasNext(); ) {
            const s3 = o.getNext(), u = s3.key, c = s3.value, a = ds();
            c.forEach((t3) => {
              if (!i.has(t3)) {
                const s4 = Kn(e.get(t3), n.get(t3));
                null !== s4 && a.set(t3, s4), i = i.add(t3);
              }
            }), r.push(this.documentOverlayCache.saveOverlays(t2, u, a));
          }
          return Vt.waitFor(r);
        }).next(() => n);
      }
      recalculateAndSaveOverlaysForDocumentKeys(t2, e) {
        return this.remoteDocumentCache.getEntries(t2, e).next((e2) => this.recalculateAndSaveOverlays(t2, e2));
      }
      getDocumentsMatchingQuery(t2, e, n) {
        return function(t3) {
          return dt.isDocumentKey(t3.path) && null === t3.collectionGroup && 0 === t3.filters.length;
        }(e) ? this.getDocumentsMatchingDocumentQuery(t2, e.path) : ln(e) ? this.getDocumentsMatchingCollectionGroupQuery(t2, e, n) : this.getDocumentsMatchingCollectionQuery(t2, e, n);
      }
      getNextDocuments(t2, e, n, s2) {
        return this.remoteDocumentCache.getAllFromCollectionGroup(t2, e, n, s2).next((i) => {
          const r = s2 - i.size > 0 ? this.documentOverlayCache.getOverlaysForCollectionGroup(t2, e, n.largestBatchId, s2 - i.size) : Vt.resolve(fs());
          let o = -1, u = i;
          return r.next((e2) => Vt.forEach(e2, (e3, n2) => (o < n2.largestBatchId && (o = n2.largestBatchId), i.get(e3) ? Vt.resolve() : this.getBaseDocument(t2, e3, n2).next((t3) => {
            u = u.insert(e3, t3);
          }))).next(() => this.populateOverlays(t2, e2, i)).next(() => this.computeViews(t2, u, e2, gs())).next((t3) => ({
            batchId: o,
            changes: ls(t3)
          })));
        });
      }
      getDocumentsMatchingDocumentQuery(t2, e) {
        return this.getDocument(t2, new dt(e)).next((t3) => {
          let e2 = hs();
          return t3.isFoundDocument() && (e2 = e2.insert(t3.key, t3)), e2;
        });
      }
      getDocumentsMatchingCollectionGroupQuery(t2, e, n) {
        const s2 = e.collectionGroup;
        let i = hs();
        return this.indexManager.getCollectionParents(t2, s2).next((r) => Vt.forEach(r, (r2) => {
          const o = function(t3, e2) {
            return new rn(
              e2,
              null,
              t3.explicitOrderBy.slice(),
              t3.filters.slice(),
              t3.limit,
              t3.limitType,
              t3.startAt,
              t3.endAt
            );
          }(e, r2.child(s2));
          return this.getDocumentsMatchingCollectionQuery(t2, o, n).next((t3) => {
            t3.forEach((t4, e2) => {
              i = i.insert(t4, e2);
            });
          });
        }).next(() => i));
      }
      getDocumentsMatchingCollectionQuery(t2, e, n) {
        let s2;
        return this.remoteDocumentCache.getAllFromCollection(t2, e.path, n).next((i) => (s2 = i, this.documentOverlayCache.getOverlaysForCollection(t2, e.path, n.largestBatchId))).next((t3) => {
          t3.forEach((t4, e2) => {
            const n3 = e2.getKey();
            null === s2.get(n3) && (s2 = s2.insert(n3, ke.newInvalidDocument(n3)));
          });
          let n2 = hs();
          return s2.forEach((s3, i) => {
            const r = t3.get(s3);
            void 0 !== r && Qn(r.mutation, i, Jt.empty(), ut.now()), yn(e, i) && (n2 = n2.insert(s3, i));
          }), n2;
        });
      }
      getBaseDocument(t2, e, n) {
        return null === n || 1 === n.mutation.type ? this.remoteDocumentCache.getEntry(t2, e) : Vt.resolve(ke.newInvalidDocument(e));
      }
    };
    io = class {
      constructor(t2) {
        this.It = t2, this.Zn = /* @__PURE__ */ new Map(), this.ts = /* @__PURE__ */ new Map();
      }
      getBundleMetadata(t2, e) {
        return Vt.resolve(this.Zn.get(e));
      }
      saveBundleMetadata(t2, e) {
        var n;
        return this.Zn.set(e.id, {
          id: (n = e).id,
          version: n.version,
          createTime: Ms(n.createTime)
        }), Vt.resolve();
      }
      getNamedQuery(t2, e) {
        return Vt.resolve(this.ts.get(e));
      }
      saveNamedQuery(t2, e) {
        return this.ts.set(e.name, function(t3) {
          return {
            name: t3.name,
            query: Xi(t3.bundledQuery),
            readTime: Ms(t3.readTime)
          };
        }(e)), Vt.resolve();
      }
    };
    ro = class {
      constructor() {
        this.overlays = new Gt(dt.comparator), this.es = /* @__PURE__ */ new Map();
      }
      getOverlay(t2, e) {
        return Vt.resolve(this.overlays.get(e));
      }
      getOverlays(t2, e) {
        const n = fs();
        return Vt.forEach(e, (e2) => this.getOverlay(t2, e2).next((t3) => {
          null !== t3 && n.set(e2, t3);
        })).next(() => n);
      }
      saveOverlays(t2, e, n) {
        return n.forEach((n2, s2) => {
          this.ue(t2, e, s2);
        }), Vt.resolve();
      }
      removeOverlaysForBatchId(t2, e, n) {
        const s2 = this.es.get(n);
        return void 0 !== s2 && (s2.forEach((t3) => this.overlays = this.overlays.remove(t3)), this.es.delete(n)), Vt.resolve();
      }
      getOverlaysForCollection(t2, e, n) {
        const s2 = fs(), i = e.length + 1, r = new dt(e.child("")), o = this.overlays.getIteratorFrom(r);
        for (; o.hasNext(); ) {
          const t3 = o.getNext().value, r2 = t3.getKey();
          if (!e.isPrefixOf(r2.path))
            break;
          r2.path.length === i && (t3.largestBatchId > n && s2.set(t3.getKey(), t3));
        }
        return Vt.resolve(s2);
      }
      getOverlaysForCollectionGroup(t2, e, n, s2) {
        let i = new Gt((t3, e2) => t3 - e2);
        const r = this.overlays.getIterator();
        for (; r.hasNext(); ) {
          const t3 = r.getNext().value;
          if (t3.getKey().getCollectionGroup() === e && t3.largestBatchId > n) {
            let e2 = i.get(t3.largestBatchId);
            null === e2 && (e2 = fs(), i = i.insert(t3.largestBatchId, e2)), e2.set(t3.getKey(), t3);
          }
        }
        const o = fs(), u = i.getIterator();
        for (; u.hasNext(); ) {
          if (u.getNext().value.forEach((t3, e2) => o.set(t3, e2)), o.size() >= s2)
            break;
        }
        return Vt.resolve(o);
      }
      ue(t2, e, n) {
        const s2 = this.overlays.get(n.key);
        if (null !== s2) {
          const t3 = this.es.get(s2.largestBatchId).delete(n.key);
          this.es.set(s2.largestBatchId, t3);
        }
        this.overlays = this.overlays.insert(n.key, new Ui(e, n));
        let i = this.es.get(e);
        void 0 === i && (i = gs(), this.es.set(e, i)), this.es.set(e, i.add(n.key));
      }
    };
    oo = class {
      constructor() {
        this.ns = new Wt(uo.ss), this.rs = new Wt(uo.os);
      }
      isEmpty() {
        return this.ns.isEmpty();
      }
      addReference(t2, e) {
        const n = new uo(t2, e);
        this.ns = this.ns.add(n), this.rs = this.rs.add(n);
      }
      us(t2, e) {
        t2.forEach((t3) => this.addReference(t3, e));
      }
      removeReference(t2, e) {
        this.cs(new uo(t2, e));
      }
      hs(t2, e) {
        t2.forEach((t3) => this.removeReference(t3, e));
      }
      ls(t2) {
        const e = new dt(new ht([])), n = new uo(e, t2), s2 = new uo(e, t2 + 1), i = [];
        return this.rs.forEachInRange([n, s2], (t3) => {
          this.cs(t3), i.push(t3.key);
        }), i;
      }
      fs() {
        this.ns.forEach((t2) => this.cs(t2));
      }
      cs(t2) {
        this.ns = this.ns.delete(t2), this.rs = this.rs.delete(t2);
      }
      ds(t2) {
        const e = new dt(new ht([])), n = new uo(e, t2), s2 = new uo(e, t2 + 1);
        let i = gs();
        return this.rs.forEachInRange([n, s2], (t3) => {
          i = i.add(t3.key);
        }), i;
      }
      containsKey(t2) {
        const e = new uo(t2, 0), n = this.ns.firstAfterOrEqual(e);
        return null !== n && t2.isEqual(n.key);
      }
    };
    uo = class {
      constructor(t2, e) {
        this.key = t2, this._s = e;
      }
      static ss(t2, e) {
        return dt.comparator(t2.key, e.key) || it(t2._s, e._s);
      }
      static os(t2, e) {
        return it(t2._s, e._s) || dt.comparator(t2.key, e.key);
      }
    };
    co = class {
      constructor(t2, e) {
        this.indexManager = t2, this.referenceDelegate = e, this.mutationQueue = [], this.ws = 1, this.gs = new Wt(uo.ss);
      }
      checkEmpty(t2) {
        return Vt.resolve(0 === this.mutationQueue.length);
      }
      addMutationBatch(t2, e, n, s2) {
        const i = this.ws;
        this.ws++, this.mutationQueue.length > 0 && this.mutationQueue[this.mutationQueue.length - 1];
        const r = new Bi(i, e, n, s2);
        this.mutationQueue.push(r);
        for (const e2 of s2)
          this.gs = this.gs.add(new uo(e2.key, i)), this.indexManager.addToCollectionParentIndex(t2, e2.key.path.popLast());
        return Vt.resolve(r);
      }
      lookupMutationBatch(t2, e) {
        return Vt.resolve(this.ys(e));
      }
      getNextMutationBatchAfterBatchId(t2, e) {
        const n = e + 1, s2 = this.ps(n), i = s2 < 0 ? 0 : s2;
        return Vt.resolve(this.mutationQueue.length > i ? this.mutationQueue[i] : null);
      }
      getHighestUnacknowledgedBatchId() {
        return Vt.resolve(0 === this.mutationQueue.length ? -1 : this.ws - 1);
      }
      getAllMutationBatches(t2) {
        return Vt.resolve(this.mutationQueue.slice());
      }
      getAllMutationBatchesAffectingDocumentKey(t2, e) {
        const n = new uo(e, 0), s2 = new uo(e, Number.POSITIVE_INFINITY), i = [];
        return this.gs.forEachInRange([n, s2], (t3) => {
          const e2 = this.ys(t3._s);
          i.push(e2);
        }), Vt.resolve(i);
      }
      getAllMutationBatchesAffectingDocumentKeys(t2, e) {
        let n = new Wt(it);
        return e.forEach((t3) => {
          const e2 = new uo(t3, 0), s2 = new uo(t3, Number.POSITIVE_INFINITY);
          this.gs.forEachInRange([e2, s2], (t4) => {
            n = n.add(t4._s);
          });
        }), Vt.resolve(this.Is(n));
      }
      getAllMutationBatchesAffectingQuery(t2, e) {
        const n = e.path, s2 = n.length + 1;
        let i = n;
        dt.isDocumentKey(i) || (i = i.child(""));
        const r = new uo(new dt(i), 0);
        let o = new Wt(it);
        return this.gs.forEachWhile((t3) => {
          const e2 = t3.key.path;
          return !!n.isPrefixOf(e2) && (e2.length === s2 && (o = o.add(t3._s)), true);
        }, r), Vt.resolve(this.Is(o));
      }
      Is(t2) {
        const e = [];
        return t2.forEach((t3) => {
          const n = this.ys(t3);
          null !== n && e.push(n);
        }), e;
      }
      removeMutationBatch(t2, e) {
        U2(0 === this.Ts(e.batchId, "removed")), this.mutationQueue.shift();
        let n = this.gs;
        return Vt.forEach(e.mutations, (s2) => {
          const i = new uo(s2.key, e.batchId);
          return n = n.delete(i), this.referenceDelegate.markPotentiallyOrphaned(t2, s2.key);
        }).next(() => {
          this.gs = n;
        });
      }
      An(t2) {
      }
      containsKey(t2, e) {
        const n = new uo(e, 0), s2 = this.gs.firstAfterOrEqual(n);
        return Vt.resolve(e.isEqual(s2 && s2.key));
      }
      performConsistencyCheck(t2) {
        return this.mutationQueue.length, Vt.resolve();
      }
      Ts(t2, e) {
        return this.ps(t2);
      }
      ps(t2) {
        if (0 === this.mutationQueue.length)
          return 0;
        return t2 - this.mutationQueue[0].batchId;
      }
      ys(t2) {
        const e = this.ps(t2);
        if (e < 0 || e >= this.mutationQueue.length)
          return null;
        return this.mutationQueue[e];
      }
    };
    ao = class {
      constructor(t2) {
        this.Es = t2, this.docs = new Gt(dt.comparator), this.size = 0;
      }
      setIndexManager(t2) {
        this.indexManager = t2;
      }
      addEntry(t2, e) {
        const n = e.key, s2 = this.docs.get(n), i = s2 ? s2.size : 0, r = this.Es(e);
        return this.docs = this.docs.insert(n, {
          document: e.mutableCopy(),
          size: r
        }), this.size += r - i, this.indexManager.addToCollectionParentIndex(t2, n.path.popLast());
      }
      removeEntry(t2) {
        const e = this.docs.get(t2);
        e && (this.docs = this.docs.remove(t2), this.size -= e.size);
      }
      getEntry(t2, e) {
        const n = this.docs.get(e);
        return Vt.resolve(n ? n.document.mutableCopy() : ke.newInvalidDocument(e));
      }
      getEntries(t2, e) {
        let n = cs();
        return e.forEach((t3) => {
          const e2 = this.docs.get(t3);
          n = n.insert(t3, e2 ? e2.document.mutableCopy() : ke.newInvalidDocument(t3));
        }), Vt.resolve(n);
      }
      getAllFromCollection(t2, e, n) {
        let s2 = cs();
        const i = new dt(e.child("")), r = this.docs.getIteratorFrom(i);
        for (; r.hasNext(); ) {
          const { key: t3, value: { document: i2 } } = r.getNext();
          if (!e.isPrefixOf(t3.path))
            break;
          t3.path.length > e.length + 1 || (Rt(Et(i2), n) <= 0 || (s2 = s2.insert(i2.key, i2.mutableCopy())));
        }
        return Vt.resolve(s2);
      }
      getAllFromCollectionGroup(t2, e, n, s2) {
        L2();
      }
      As(t2, e) {
        return Vt.forEach(this.docs, (t3) => e(t3));
      }
      newChangeBuffer(t2) {
        return new ho(this);
      }
      getSize(t2) {
        return Vt.resolve(this.size);
      }
    };
    ho = class extends Wr {
      constructor(t2) {
        super(), this.Yn = t2;
      }
      applyChanges(t2) {
        const e = [];
        return this.changes.forEach((n, s2) => {
          s2.isValidDocument() ? e.push(this.Yn.addEntry(t2, s2)) : this.Yn.removeEntry(n);
        }), Vt.waitFor(e);
      }
      getFromCache(t2, e) {
        return this.Yn.getEntry(t2, e);
      }
      getAllFromCache(t2, e) {
        return this.Yn.getEntries(t2, e);
      }
    };
    lo = class {
      constructor(t2) {
        this.persistence = t2, this.Rs = new os((t3) => Fe(t3), Be), this.lastRemoteSnapshotVersion = ct.min(), this.highestTargetId = 0, this.bs = 0, this.Ps = new oo(), this.targetCount = 0, this.vs = Or.Pn();
      }
      forEachTarget(t2, e) {
        return this.Rs.forEach((t3, n) => e(n)), Vt.resolve();
      }
      getLastRemoteSnapshotVersion(t2) {
        return Vt.resolve(this.lastRemoteSnapshotVersion);
      }
      getHighestSequenceNumber(t2) {
        return Vt.resolve(this.bs);
      }
      allocateTargetId(t2) {
        return this.highestTargetId = this.vs.next(), Vt.resolve(this.highestTargetId);
      }
      setTargetsMetadata(t2, e, n) {
        return n && (this.lastRemoteSnapshotVersion = n), e > this.bs && (this.bs = e), Vt.resolve();
      }
      Dn(t2) {
        this.Rs.set(t2.target, t2);
        const e = t2.targetId;
        e > this.highestTargetId && (this.vs = new Or(e), this.highestTargetId = e), t2.sequenceNumber > this.bs && (this.bs = t2.sequenceNumber);
      }
      addTargetData(t2, e) {
        return this.Dn(e), this.targetCount += 1, Vt.resolve();
      }
      updateTargetData(t2, e) {
        return this.Dn(e), Vt.resolve();
      }
      removeTargetData(t2, e) {
        return this.Rs.delete(e.target), this.Ps.ls(e.targetId), this.targetCount -= 1, Vt.resolve();
      }
      removeTargets(t2, e, n) {
        let s2 = 0;
        const i = [];
        return this.Rs.forEach((r, o) => {
          o.sequenceNumber <= e && null === n.get(o.targetId) && (this.Rs.delete(r), i.push(this.removeMatchingKeysForTargetId(t2, o.targetId)), s2++);
        }), Vt.waitFor(i).next(() => s2);
      }
      getTargetCount(t2) {
        return Vt.resolve(this.targetCount);
      }
      getTargetData(t2, e) {
        const n = this.Rs.get(e) || null;
        return Vt.resolve(n);
      }
      addMatchingKeys(t2, e, n) {
        return this.Ps.us(e, n), Vt.resolve();
      }
      removeMatchingKeys(t2, e, n) {
        this.Ps.hs(e, n);
        const s2 = this.persistence.referenceDelegate, i = [];
        return s2 && e.forEach((e2) => {
          i.push(s2.markPotentiallyOrphaned(t2, e2));
        }), Vt.waitFor(i);
      }
      removeMatchingKeysForTargetId(t2, e) {
        return this.Ps.ls(e), Vt.resolve();
      }
      getMatchingKeysForTargetId(t2, e) {
        const n = this.Ps.ds(e);
        return Vt.resolve(n);
      }
      containsKey(t2, e) {
        return Vt.resolve(this.Ps.containsKey(e));
      }
    };
    fo = class {
      constructor(t2, e) {
        this.Vs = {}, this.overlays = {}, this.Ss = new Lt(0), this.Ds = false, this.Ds = true, this.referenceDelegate = t2(this), this.Cs = new lo(this);
        this.indexManager = new yr(), this.remoteDocumentCache = function(t3) {
          return new ao(t3);
        }((t3) => this.referenceDelegate.xs(t3)), this.It = new Ki(e), this.Ns = new io(this.It);
      }
      start() {
        return Promise.resolve();
      }
      shutdown() {
        return this.Ds = false, Promise.resolve();
      }
      get started() {
        return this.Ds;
      }
      setDatabaseDeletedListener() {
      }
      setNetworkEnabled() {
      }
      getIndexManager(t2) {
        return this.indexManager;
      }
      getDocumentOverlayCache(t2) {
        let e = this.overlays[t2.toKey()];
        return e || (e = new ro(), this.overlays[t2.toKey()] = e), e;
      }
      getMutationQueue(t2, e) {
        let n = this.Vs[t2.toKey()];
        return n || (n = new co(e, this.referenceDelegate), this.Vs[t2.toKey()] = n), n;
      }
      getTargetCache() {
        return this.Cs;
      }
      getRemoteDocumentCache() {
        return this.remoteDocumentCache;
      }
      getBundleCache() {
        return this.Ns;
      }
      runTransaction(t2, e, n) {
        O2("MemoryPersistence", "Starting transaction:", t2);
        const s2 = new _o(this.Ss.next());
        return this.referenceDelegate.ks(), n(s2).next((t3) => this.referenceDelegate.Ms(s2).next(() => t3)).toPromise().then((t3) => (s2.raiseOnCommittedEvent(), t3));
      }
      Os(t2, e) {
        return Vt.or(Object.values(this.Vs).map((n) => () => n.containsKey(t2, e)));
      }
    };
    _o = class extends Pt {
      constructor(t2) {
        super(), this.currentSequenceNumber = t2;
      }
    };
    wo = class {
      constructor(t2) {
        this.persistence = t2, this.Fs = new oo(), this.$s = null;
      }
      static Bs(t2) {
        return new wo(t2);
      }
      get Ls() {
        if (this.$s)
          return this.$s;
        throw L2();
      }
      addReference(t2, e, n) {
        return this.Fs.addReference(n, e), this.Ls.delete(n.toString()), Vt.resolve();
      }
      removeReference(t2, e, n) {
        return this.Fs.removeReference(n, e), this.Ls.add(n.toString()), Vt.resolve();
      }
      markPotentiallyOrphaned(t2, e) {
        return this.Ls.add(e.toString()), Vt.resolve();
      }
      removeTarget(t2, e) {
        this.Fs.ls(e.targetId).forEach((t3) => this.Ls.add(t3.toString()));
        const n = this.persistence.getTargetCache();
        return n.getMatchingKeysForTargetId(t2, e.targetId).next((t3) => {
          t3.forEach((t4) => this.Ls.add(t4.toString()));
        }).next(() => n.removeTargetData(t2, e));
      }
      ks() {
        this.$s = /* @__PURE__ */ new Set();
      }
      Ms(t2) {
        const e = this.persistence.getRemoteDocumentCache().newChangeBuffer();
        return Vt.forEach(this.Ls, (n) => {
          const s2 = dt.fromPath(n);
          return this.Us(t2, s2).next((t3) => {
            t3 || e.removeEntry(s2, ct.min());
          });
        }).next(() => (this.$s = null, e.apply(t2)));
      }
      updateLimboDocument(t2, e) {
        return this.Us(t2, e).next((t3) => {
          t3 ? this.Ls.delete(e.toString()) : this.Ls.add(e.toString());
        });
      }
      xs(t2) {
        return 0;
      }
      Us(t2, e) {
        return Vt.or([() => Vt.resolve(this.Fs.containsKey(e)), () => this.persistence.getTargetCache().containsKey(t2, e), () => this.persistence.Os(t2, e)]);
      }
    };
    Ao = class {
      constructor(t2, e, n, s2) {
        this.targetId = t2, this.fromCache = e, this.Si = n, this.Di = s2;
      }
      static Ci(t2, e) {
        let n = gs(), s2 = gs();
        for (const t3 of e.docChanges)
          switch (t3.type) {
            case 0:
              n = n.add(t3.doc.key);
              break;
            case 1:
              s2 = s2.add(t3.doc.key);
          }
        return new Ao(t2, e.fromCache, n, s2);
      }
    };
    Ro = class {
      constructor() {
        this.xi = false;
      }
      initialize(t2, e) {
        this.Ni = t2, this.indexManager = e, this.xi = true;
      }
      getDocumentsMatchingQuery(t2, e, n, s2) {
        return this.ki(t2, e).next((i) => i || this.Mi(t2, e, s2, n)).next((n2) => n2 || this.Oi(t2, e));
      }
      ki(t2, e) {
        if (cn(e))
          return Vt.resolve(null);
        let n = dn(e);
        return this.indexManager.getIndexType(t2, n).next((s2) => 0 === s2 ? null : (null !== e.limit && 1 === s2 && (e = _n(e, null, "F"), n = dn(e)), this.indexManager.getDocumentsMatchingTarget(t2, n).next((s3) => {
          const i = gs(...s3);
          return this.Ni.getDocuments(t2, i).next((s4) => this.indexManager.getMinOffset(t2, n).next((n2) => {
            const r = this.Fi(e, s4);
            return this.$i(e, r, i, n2.readTime) ? this.ki(t2, _n(e, null, "F")) : this.Bi(t2, r, e, n2);
          }));
        })));
      }
      Mi(t2, e, n, s2) {
        return cn(e) || s2.isEqual(ct.min()) ? this.Oi(t2, e) : this.Ni.getDocuments(t2, n).next((i) => {
          const r = this.Fi(e, i);
          return this.$i(e, r, n, s2) ? this.Oi(t2, e) : (k2() <= LogLevel.DEBUG && O2("QueryEngine", "Re-using previous result from %s to execute query: %s", s2.toString(), gn(e)), this.Bi(t2, r, e, Tt(s2, -1)));
        });
      }
      Fi(t2, e) {
        let n = new Wt(In(t2));
        return e.forEach((e2, s2) => {
          yn(t2, s2) && (n = n.add(s2));
        }), n;
      }
      $i(t2, e, n, s2) {
        if (null === t2.limit)
          return false;
        if (n.size !== e.size)
          return true;
        const i = "F" === t2.limitType ? e.last() : e.first();
        return !!i && (i.hasPendingWrites || i.version.compareTo(s2) > 0);
      }
      Oi(t2, e) {
        return k2() <= LogLevel.DEBUG && O2("QueryEngine", "Using full collection scan to execute query:", gn(e)), this.Ni.getDocumentsMatchingQuery(t2, e, At.min());
      }
      Bi(t2, e, n, s2) {
        return this.Ni.getDocumentsMatchingQuery(t2, n, s2).next((t3) => (e.forEach((e2) => {
          t3 = t3.insert(e2.key, e2);
        }), t3));
      }
    };
    bo = class {
      constructor(t2, e, n, s2) {
        this.persistence = t2, this.Li = e, this.It = s2, this.Ui = new Gt(it), this.qi = new os((t3) => Fe(t3), Be), this.Ki = /* @__PURE__ */ new Map(), this.Gi = t2.getRemoteDocumentCache(), this.Cs = t2.getTargetCache(), this.Ns = t2.getBundleCache(), this.Qi(n);
      }
      Qi(t2) {
        this.documentOverlayCache = this.persistence.getDocumentOverlayCache(t2), this.indexManager = this.persistence.getIndexManager(t2), this.mutationQueue = this.persistence.getMutationQueue(t2, this.indexManager), this.localDocuments = new so(this.Gi, this.mutationQueue, this.documentOverlayCache, this.indexManager), this.Gi.setIndexManager(this.indexManager), this.Li.initialize(this.localDocuments, this.indexManager);
      }
      collectGarbage(t2) {
        return this.persistence.runTransaction("Collect garbage", "readwrite-primary", (e) => t2.collect(e, this.Ui));
      }
    };
    zo = class {
      constructor() {
        this.activeTargetIds = ps();
      }
      er(t2) {
        this.activeTargetIds = this.activeTargetIds.add(t2);
      }
      nr(t2) {
        this.activeTargetIds = this.activeTargetIds.delete(t2);
      }
      tr() {
        const t2 = {
          activeTargetIds: this.activeTargetIds.toArray(),
          updateTimeMs: Date.now()
        };
        return JSON.stringify(t2);
      }
    };
    Jo = class {
      constructor() {
        this.Lr = new zo(), this.Ur = {}, this.onlineStateHandler = null, this.sequenceNumberHandler = null;
      }
      addPendingMutation(t2) {
      }
      updateMutationState(t2, e, n) {
      }
      addLocalQueryTarget(t2) {
        return this.Lr.er(t2), this.Ur[t2] || "not-current";
      }
      updateQueryState(t2, e, n) {
        this.Ur[t2] = e;
      }
      removeLocalQueryTarget(t2) {
        this.Lr.nr(t2);
      }
      isLocalQueryTarget(t2) {
        return this.Lr.activeTargetIds.has(t2);
      }
      clearQueryState(t2) {
        delete this.Ur[t2];
      }
      getAllActiveQueryTargets() {
        return this.Lr.activeTargetIds;
      }
      isActiveQueryTarget(t2) {
        return this.Lr.activeTargetIds.has(t2);
      }
      start() {
        return this.Lr = new zo(), Promise.resolve();
      }
      handleUserChange(t2, e, n) {
      }
      setOnlineState(t2) {
      }
      shutdown() {
      }
      writeSequenceNumber(t2) {
      }
      notifyBundleLoaded(t2) {
      }
    };
    Yo = class {
      qr(t2) {
      }
      shutdown() {
      }
    };
    Xo = class {
      constructor() {
        this.Kr = () => this.Gr(), this.Qr = () => this.jr(), this.Wr = [], this.zr();
      }
      qr(t2) {
        this.Wr.push(t2);
      }
      shutdown() {
        window.removeEventListener("online", this.Kr), window.removeEventListener("offline", this.Qr);
      }
      zr() {
        window.addEventListener("online", this.Kr), window.addEventListener("offline", this.Qr);
      }
      Gr() {
        O2("ConnectivityMonitor", "Network connectivity changed: AVAILABLE");
        for (const t2 of this.Wr)
          t2(0);
      }
      jr() {
        O2("ConnectivityMonitor", "Network connectivity changed: UNAVAILABLE");
        for (const t2 of this.Wr)
          t2(1);
      }
      static C() {
        return "undefined" != typeof window && void 0 !== window.addEventListener && void 0 !== window.removeEventListener;
      }
    };
    Zo = {
      BatchGetDocuments: "batchGet",
      Commit: "commit",
      RunQuery: "runQuery"
    };
    tu = class {
      constructor(t2) {
        this.Hr = t2.Hr, this.Jr = t2.Jr;
      }
      Yr(t2) {
        this.Xr = t2;
      }
      Zr(t2) {
        this.eo = t2;
      }
      onMessage(t2) {
        this.no = t2;
      }
      close() {
        this.Jr();
      }
      send(t2) {
        this.Hr(t2);
      }
      so() {
        this.Xr();
      }
      io(t2) {
        this.eo(t2);
      }
      ro(t2) {
        this.no(t2);
      }
    };
    eu = class extends class {
      constructor(t2) {
        this.databaseInfo = t2, this.databaseId = t2.databaseId;
        const e = t2.ssl ? "https" : "http";
        this.oo = e + "://" + t2.host, this.uo = "projects/" + this.databaseId.projectId + "/databases/" + this.databaseId.database + "/documents";
      }
      co(t2, e, n, s2, i) {
        const r = this.ao(t2, e);
        O2("RestConnection", "Sending: ", r, n);
        const o = {};
        return this.ho(o, s2, i), this.lo(t2, r, o, n).then((t3) => (O2("RestConnection", "Received: ", t3), t3), (e2) => {
          throw $("RestConnection", `${t2} failed with error: `, e2, "url: ", r, "request:", n), e2;
        });
      }
      fo(t2, e, n, s2, i, r) {
        return this.co(t2, e, n, s2, i);
      }
      ho(t2, e, n) {
        t2["X-Goog-Api-Client"] = "gl-js/ fire/" + x2, t2["Content-Type"] = "text/plain", this.databaseInfo.appId && (t2["X-Firebase-GMPID"] = this.databaseInfo.appId), e && e.headers.forEach((e2, n2) => t2[n2] = e2), n && n.headers.forEach((e2, n2) => t2[n2] = e2);
      }
      ao(t2, e) {
        const n = Zo[t2];
        return `${this.oo}/v1/${e}:${n}`;
      }
    } {
      constructor(t2) {
        super(t2), this.forceLongPolling = t2.forceLongPolling, this.autoDetectLongPolling = t2.autoDetectLongPolling, this.useFetchStreams = t2.useFetchStreams;
      }
      lo(t2, e, n, s2) {
        return new Promise((i, r) => {
          const o = new XhrIo();
          o.listenOnce(EventType.COMPLETE, () => {
            try {
              switch (o.getLastErrorCode()) {
                case ErrorCode.NO_ERROR:
                  const e2 = o.getResponseJson();
                  O2("Connection", "XHR received:", JSON.stringify(e2)), i(e2);
                  break;
                case ErrorCode.TIMEOUT:
                  O2("Connection", 'RPC "' + t2 + '" timed out'), r(new Q2(G.DEADLINE_EXCEEDED, "Request time out"));
                  break;
                case ErrorCode.HTTP_ERROR:
                  const n2 = o.getStatus();
                  if (O2("Connection", 'RPC "' + t2 + '" failed with status:', n2, "response text:", o.getResponseText()), n2 > 0) {
                    const t3 = o.getResponseJson().error;
                    if (t3 && t3.status && t3.message) {
                      const e3 = function(t4) {
                        const e4 = t4.toLowerCase().replace(/_/g, "-");
                        return Object.values(G).indexOf(e4) >= 0 ? e4 : G.UNKNOWN;
                      }(t3.status);
                      r(new Q2(e3, t3.message));
                    } else
                      r(new Q2(G.UNKNOWN, "Server responded with status " + o.getStatus()));
                  } else
                    r(new Q2(G.UNAVAILABLE, "Connection failed."));
                  break;
                default:
                  L2();
              }
            } finally {
              O2("Connection", 'RPC "' + t2 + '" completed.');
            }
          });
          const u = JSON.stringify(s2);
          o.send(e, "POST", u, n, 15);
        });
      }
      _o(t2, e, n) {
        const s2 = [this.oo, "/", "google.firestore.v1.Firestore", "/", t2, "/channel"], i = createWebChannelTransport(), r = getStatEventTarget(), o = {
          httpSessionIdParam: "gsessionid",
          initMessageHeaders: {},
          messageUrlParams: {
            database: `projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`
          },
          sendRawJson: true,
          supportsCrossDomainXhr: true,
          internalChannelParams: {
            forwardChannelRequestTimeoutMs: 6e5
          },
          forceLongPolling: this.forceLongPolling,
          detectBufferingProxy: this.autoDetectLongPolling
        };
        this.useFetchStreams && (o.xmlHttpFactory = new FetchXmlHttpFactory({})), this.ho(o.initMessageHeaders, e, n), isMobileCordova() || isReactNative() || isElectron() || isIE() || isUWP() || isBrowserExtension() || (o.httpHeadersOverwriteParam = "$httpHeaders");
        const u = s2.join("");
        O2("Connection", "Creating WebChannel: " + u, o);
        const c = i.createWebChannel(u, o);
        let a = false, h = false;
        const l2 = new tu({
          Hr: (t3) => {
            h ? O2("Connection", "Not sending because WebChannel is closed:", t3) : (a || (O2("Connection", "Opening WebChannel transport."), c.open(), a = true), O2("Connection", "WebChannel sending:", t3), c.send(t3));
          },
          Jr: () => c.close()
        }), y2 = (t3, e2, n2) => {
          t3.listen(e2, (t4) => {
            try {
              n2(t4);
            } catch (t5) {
              setTimeout(() => {
                throw t5;
              }, 0);
            }
          });
        };
        return y2(c, WebChannel.EventType.OPEN, () => {
          h || O2("Connection", "WebChannel transport opened.");
        }), y2(c, WebChannel.EventType.CLOSE, () => {
          h || (h = true, O2("Connection", "WebChannel transport closed"), l2.io());
        }), y2(c, WebChannel.EventType.ERROR, (t3) => {
          h || (h = true, $("Connection", "WebChannel transport errored:", t3), l2.io(new Q2(G.UNAVAILABLE, "The operation could not be completed")));
        }), y2(c, WebChannel.EventType.MESSAGE, (t3) => {
          var e2;
          if (!h) {
            const n2 = t3.data[0];
            U2(!!n2);
            const s3 = n2, i2 = s3.error || (null === (e2 = s3[0]) || void 0 === e2 ? void 0 : e2.error);
            if (i2) {
              O2("Connection", "WebChannel received error:", i2);
              const t4 = i2.status;
              let e3 = function(t5) {
                const e4 = ns[t5];
                if (void 0 !== e4)
                  return rs(e4);
              }(t4), n3 = i2.message;
              void 0 === e3 && (e3 = G.INTERNAL, n3 = "Unknown error status: " + t4 + " with message " + i2.message), h = true, l2.io(new Q2(e3, n3)), c.close();
            } else
              O2("Connection", "WebChannel received:", n2), l2.ro(n2);
          }
        }), y2(r, Event.STAT_EVENT, (t3) => {
          t3.stat === Stat.PROXY ? O2("Connection", "Detected buffering proxy") : t3.stat === Stat.NOPROXY && O2("Connection", "Detected no buffering proxy");
        }), setTimeout(() => {
          l2.so();
        }, 0), l2;
      }
    };
    ru = class {
      constructor(t2, e, n = 1e3, s2 = 1.5, i = 6e4) {
        this.Hs = t2, this.timerId = e, this.wo = n, this.mo = s2, this.yo = i, this.po = 0, this.Io = null, this.To = Date.now(), this.reset();
      }
      reset() {
        this.po = 0;
      }
      Eo() {
        this.po = this.yo;
      }
      Ao(t2) {
        this.cancel();
        const e = Math.floor(this.po + this.Ro()), n = Math.max(0, Date.now() - this.To), s2 = Math.max(0, e - n);
        s2 > 0 && O2("ExponentialBackoff", `Backing off for ${s2} ms (base delay: ${this.po} ms, delay with jitter: ${e} ms, last attempt: ${n} ms ago)`), this.Io = this.Hs.enqueueAfterDelay(this.timerId, s2, () => (this.To = Date.now(), t2())), this.po *= this.mo, this.po < this.wo && (this.po = this.wo), this.po > this.yo && (this.po = this.yo);
      }
      bo() {
        null !== this.Io && (this.Io.skipDelay(), this.Io = null);
      }
      cancel() {
        null !== this.Io && (this.Io.cancel(), this.Io = null);
      }
      Ro() {
        return (Math.random() - 0.5) * this.po;
      }
    };
    ou = class {
      constructor(t2, e, n, s2, i, r, o, u) {
        this.Hs = t2, this.Po = n, this.vo = s2, this.Vo = i, this.authCredentialsProvider = r, this.appCheckCredentialsProvider = o, this.listener = u, this.state = 0, this.So = 0, this.Do = null, this.Co = null, this.stream = null, this.xo = new ru(t2, e);
      }
      No() {
        return 1 === this.state || 5 === this.state || this.ko();
      }
      ko() {
        return 2 === this.state || 3 === this.state;
      }
      start() {
        4 !== this.state ? this.auth() : this.Mo();
      }
      async stop() {
        this.No() && await this.close(0);
      }
      Oo() {
        this.state = 0, this.xo.reset();
      }
      Fo() {
        this.ko() && null === this.Do && (this.Do = this.Hs.enqueueAfterDelay(this.Po, 6e4, () => this.$o()));
      }
      Bo(t2) {
        this.Lo(), this.stream.send(t2);
      }
      async $o() {
        if (this.ko())
          return this.close(0);
      }
      Lo() {
        this.Do && (this.Do.cancel(), this.Do = null);
      }
      Uo() {
        this.Co && (this.Co.cancel(), this.Co = null);
      }
      async close(t2, e) {
        this.Lo(), this.Uo(), this.xo.cancel(), this.So++, 4 !== t2 ? this.xo.reset() : e && e.code === G.RESOURCE_EXHAUSTED ? (F2(e.toString()), F2("Using maximum backoff delay to prevent overloading the backend."), this.xo.Eo()) : e && e.code === G.UNAUTHENTICATED && 3 !== this.state && (this.authCredentialsProvider.invalidateToken(), this.appCheckCredentialsProvider.invalidateToken()), null !== this.stream && (this.qo(), this.stream.close(), this.stream = null), this.state = t2, await this.listener.Zr(e);
      }
      qo() {
      }
      auth() {
        this.state = 1;
        const t2 = this.Ko(this.So), e = this.So;
        Promise.all([this.authCredentialsProvider.getToken(), this.appCheckCredentialsProvider.getToken()]).then(([t3, n]) => {
          this.So === e && this.Go(t3, n);
        }, (e2) => {
          t2(() => {
            const t3 = new Q2(G.UNKNOWN, "Fetching auth token failed: " + e2.message);
            return this.Qo(t3);
          });
        });
      }
      Go(t2, e) {
        const n = this.Ko(this.So);
        this.stream = this.jo(t2, e), this.stream.Yr(() => {
          n(() => (this.state = 2, this.Co = this.Hs.enqueueAfterDelay(this.vo, 1e4, () => (this.ko() && (this.state = 3), Promise.resolve())), this.listener.Yr()));
        }), this.stream.Zr((t3) => {
          n(() => this.Qo(t3));
        }), this.stream.onMessage((t3) => {
          n(() => this.onMessage(t3));
        });
      }
      Mo() {
        this.state = 5, this.xo.Ao(async () => {
          this.state = 0, this.start();
        });
      }
      Qo(t2) {
        return O2("PersistentStream", `close with error: ${t2}`), this.stream = null, this.close(4, t2);
      }
      Ko(t2) {
        return (e) => {
          this.Hs.enqueueAndForget(() => this.So === t2 ? e() : (O2("PersistentStream", "stream callback skipped by getCloseGuardedDispatcher."), Promise.resolve()));
        };
      }
    };
    uu = class extends ou {
      constructor(t2, e, n, s2, i, r) {
        super(t2, "listen_stream_connection_backoff", "listen_stream_idle", "health_check_timeout", e, n, s2, r), this.It = i;
      }
      jo(t2, e) {
        return this.Vo._o("Listen", t2, e);
      }
      onMessage(t2) {
        this.xo.reset();
        const e = Ws(this.It, t2), n = function(t3) {
          if (!("targetChange" in t3))
            return ct.min();
          const e2 = t3.targetChange;
          return e2.targetIds && e2.targetIds.length ? ct.min() : e2.readTime ? Ms(e2.readTime) : ct.min();
        }(t2);
        return this.listener.Wo(e, n);
      }
      zo(t2) {
        const e = {};
        e.database = qs(this.It), e.addTarget = function(t3, e2) {
          let n2;
          const s2 = e2.target;
          return n2 = Le(s2) ? {
            documents: Ys(t3, s2)
          } : {
            query: Xs(t3, s2)
          }, n2.targetId = e2.targetId, e2.resumeToken.approximateByteSize() > 0 ? n2.resumeToken = Ns(t3, e2.resumeToken) : e2.snapshotVersion.compareTo(ct.min()) > 0 && (n2.readTime = xs(t3, e2.snapshotVersion.toTimestamp())), n2;
        }(this.It, t2);
        const n = ti(this.It, t2);
        n && (e.labels = n), this.Bo(e);
      }
      Ho(t2) {
        const e = {};
        e.database = qs(this.It), e.removeTarget = t2, this.Bo(e);
      }
    };
    au = class extends class {
    } {
      constructor(t2, e, n, s2) {
        super(), this.authCredentials = t2, this.appCheckCredentials = e, this.Vo = n, this.It = s2, this.nu = false;
      }
      su() {
        if (this.nu)
          throw new Q2(G.FAILED_PRECONDITION, "The client has already been terminated.");
      }
      co(t2, e, n) {
        return this.su(), Promise.all([this.authCredentials.getToken(), this.appCheckCredentials.getToken()]).then(([s2, i]) => this.Vo.co(t2, e, n, s2, i)).catch((t3) => {
          throw "FirebaseError" === t3.name ? (t3.code === G.UNAUTHENTICATED && (this.authCredentials.invalidateToken(), this.appCheckCredentials.invalidateToken()), t3) : new Q2(G.UNKNOWN, t3.toString());
        });
      }
      fo(t2, e, n, s2) {
        return this.su(), Promise.all([this.authCredentials.getToken(), this.appCheckCredentials.getToken()]).then(([i, r]) => this.Vo.fo(t2, e, n, i, r, s2)).catch((t3) => {
          throw "FirebaseError" === t3.name ? (t3.code === G.UNAUTHENTICATED && (this.authCredentials.invalidateToken(), this.appCheckCredentials.invalidateToken()), t3) : new Q2(G.UNKNOWN, t3.toString());
        });
      }
      terminate() {
        this.nu = true;
      }
    };
    hu = class {
      constructor(t2, e) {
        this.asyncQueue = t2, this.onlineStateHandler = e, this.state = "Unknown", this.iu = 0, this.ru = null, this.ou = true;
      }
      uu() {
        0 === this.iu && (this.cu("Unknown"), this.ru = this.asyncQueue.enqueueAfterDelay("online_state_timeout", 1e4, () => (this.ru = null, this.au("Backend didn't respond within 10 seconds."), this.cu("Offline"), Promise.resolve())));
      }
      hu(t2) {
        "Online" === this.state ? this.cu("Unknown") : (this.iu++, this.iu >= 1 && (this.lu(), this.au(`Connection failed 1 times. Most recent error: ${t2.toString()}`), this.cu("Offline")));
      }
      set(t2) {
        this.lu(), this.iu = 0, "Online" === t2 && (this.ou = false), this.cu(t2);
      }
      cu(t2) {
        t2 !== this.state && (this.state = t2, this.onlineStateHandler(t2));
      }
      au(t2) {
        const e = `Could not reach Cloud Firestore backend. ${t2}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;
        this.ou ? (F2(e), this.ou = false) : O2("OnlineStateTracker", e);
      }
      lu() {
        null !== this.ru && (this.ru.cancel(), this.ru = null);
      }
    };
    lu = class {
      constructor(t2, e, n, s2, i) {
        this.localStore = t2, this.datastore = e, this.asyncQueue = n, this.remoteSyncer = {}, this.fu = [], this.du = /* @__PURE__ */ new Map(), this._u = /* @__PURE__ */ new Set(), this.wu = [], this.mu = i, this.mu.qr((t3) => {
          n.enqueueAndForget(async () => {
            Iu(this) && (O2("RemoteStore", "Restarting streams for network reachability change."), await async function(t4) {
              const e2 = K2(t4);
              e2._u.add(4), await du(e2), e2.gu.set("Unknown"), e2._u.delete(4), await fu(e2);
            }(this));
          });
        }), this.gu = new hu(n, s2);
      }
    };
    Lu = class {
      constructor(t2, e, n, s2, i) {
        this.asyncQueue = t2, this.timerId = e, this.targetTimeMs = n, this.op = s2, this.removalCallback = i, this.deferred = new j(), this.then = this.deferred.promise.then.bind(this.deferred.promise), this.deferred.promise.catch((t3) => {
        });
      }
      static createAndSchedule(t2, e, n, s2, i) {
        const r = Date.now() + n, o = new Lu(t2, e, r, s2, i);
        return o.start(n), o;
      }
      start(t2) {
        this.timerHandle = setTimeout(() => this.handleDelayElapsed(), t2);
      }
      skipDelay() {
        return this.handleDelayElapsed();
      }
      cancel(t2) {
        null !== this.timerHandle && (this.clearTimeout(), this.deferred.reject(new Q2(G.CANCELLED, "Operation cancelled" + (t2 ? ": " + t2 : ""))));
      }
      handleDelayElapsed() {
        this.asyncQueue.enqueueAndForget(() => null !== this.timerHandle ? (this.clearTimeout(), this.op().then((t2) => this.deferred.resolve(t2))) : Promise.resolve());
      }
      clearTimeout() {
        null !== this.timerHandle && (this.removalCallback(this), clearTimeout(this.timerHandle), this.timerHandle = null);
      }
    };
    qu = class {
      constructor(t2) {
        this.comparator = t2 ? (e, n) => t2(e, n) || dt.comparator(e.key, n.key) : (t3, e) => dt.comparator(t3.key, e.key), this.keyedMap = hs(), this.sortedSet = new Gt(this.comparator);
      }
      static emptySet(t2) {
        return new qu(t2.comparator);
      }
      has(t2) {
        return null != this.keyedMap.get(t2);
      }
      get(t2) {
        return this.keyedMap.get(t2);
      }
      first() {
        return this.sortedSet.minKey();
      }
      last() {
        return this.sortedSet.maxKey();
      }
      isEmpty() {
        return this.sortedSet.isEmpty();
      }
      indexOf(t2) {
        const e = this.keyedMap.get(t2);
        return e ? this.sortedSet.indexOf(e) : -1;
      }
      get size() {
        return this.sortedSet.size;
      }
      forEach(t2) {
        this.sortedSet.inorderTraversal((e, n) => (t2(e), false));
      }
      add(t2) {
        const e = this.delete(t2.key);
        return e.copy(e.keyedMap.insert(t2.key, t2), e.sortedSet.insert(t2, null));
      }
      delete(t2) {
        const e = this.get(t2);
        return e ? this.copy(this.keyedMap.remove(t2), this.sortedSet.remove(e)) : this;
      }
      isEqual(t2) {
        if (!(t2 instanceof qu))
          return false;
        if (this.size !== t2.size)
          return false;
        const e = this.sortedSet.getIterator(), n = t2.sortedSet.getIterator();
        for (; e.hasNext(); ) {
          const t3 = e.getNext().key, s2 = n.getNext().key;
          if (!t3.isEqual(s2))
            return false;
        }
        return true;
      }
      toString() {
        const t2 = [];
        return this.forEach((e) => {
          t2.push(e.toString());
        }), 0 === t2.length ? "DocumentSet ()" : "DocumentSet (\n  " + t2.join("  \n") + "\n)";
      }
      copy(t2, e) {
        const n = new qu();
        return n.comparator = this.comparator, n.keyedMap = t2, n.sortedSet = e, n;
      }
    };
    Ku = class {
      constructor() {
        this.Tu = new Gt(dt.comparator);
      }
      track(t2) {
        const e = t2.doc.key, n = this.Tu.get(e);
        n ? 0 !== t2.type && 3 === n.type ? this.Tu = this.Tu.insert(e, t2) : 3 === t2.type && 1 !== n.type ? this.Tu = this.Tu.insert(e, {
          type: n.type,
          doc: t2.doc
        }) : 2 === t2.type && 2 === n.type ? this.Tu = this.Tu.insert(e, {
          type: 2,
          doc: t2.doc
        }) : 2 === t2.type && 0 === n.type ? this.Tu = this.Tu.insert(e, {
          type: 0,
          doc: t2.doc
        }) : 1 === t2.type && 0 === n.type ? this.Tu = this.Tu.remove(e) : 1 === t2.type && 2 === n.type ? this.Tu = this.Tu.insert(e, {
          type: 1,
          doc: n.doc
        }) : 0 === t2.type && 1 === n.type ? this.Tu = this.Tu.insert(e, {
          type: 2,
          doc: t2.doc
        }) : L2() : this.Tu = this.Tu.insert(e, t2);
      }
      Eu() {
        const t2 = [];
        return this.Tu.inorderTraversal((e, n) => {
          t2.push(n);
        }), t2;
      }
    };
    Gu = class {
      constructor(t2, e, n, s2, i, r, o, u) {
        this.query = t2, this.docs = e, this.oldDocs = n, this.docChanges = s2, this.mutatedKeys = i, this.fromCache = r, this.syncStateChanged = o, this.excludesMetadataChanges = u;
      }
      static fromInitialDocuments(t2, e, n, s2) {
        const i = [];
        return e.forEach((t3) => {
          i.push({
            type: 0,
            doc: t3
          });
        }), new Gu(
          t2,
          e,
          qu.emptySet(e),
          i,
          n,
          s2,
          true,
          false
        );
      }
      get hasPendingWrites() {
        return !this.mutatedKeys.isEmpty();
      }
      isEqual(t2) {
        if (!(this.fromCache === t2.fromCache && this.syncStateChanged === t2.syncStateChanged && this.mutatedKeys.isEqual(t2.mutatedKeys) && wn(this.query, t2.query) && this.docs.isEqual(t2.docs) && this.oldDocs.isEqual(t2.oldDocs)))
          return false;
        const e = this.docChanges, n = t2.docChanges;
        if (e.length !== n.length)
          return false;
        for (let t3 = 0; t3 < e.length; t3++)
          if (e[t3].type !== n[t3].type || !e[t3].doc.isEqual(n[t3].doc))
            return false;
        return true;
      }
    };
    Qu = class {
      constructor() {
        this.Au = void 0, this.listeners = [];
      }
    };
    ju = class {
      constructor() {
        this.queries = new os((t2) => mn(t2), wn), this.onlineState = "Unknown", this.Ru = /* @__PURE__ */ new Set();
      }
    };
    Xu = class {
      constructor(t2, e, n) {
        this.query = t2, this.vu = e, this.Vu = false, this.Su = null, this.onlineState = "Unknown", this.options = n || {};
      }
      Pu(t2) {
        if (!this.options.includeMetadataChanges) {
          const e2 = [];
          for (const n of t2.docChanges)
            3 !== n.type && e2.push(n);
          t2 = new Gu(
            t2.query,
            t2.docs,
            t2.oldDocs,
            e2,
            t2.mutatedKeys,
            t2.fromCache,
            t2.syncStateChanged,
            true
          );
        }
        let e = false;
        return this.Vu ? this.Du(t2) && (this.vu.next(t2), e = true) : this.Cu(t2, this.onlineState) && (this.xu(t2), e = true), this.Su = t2, e;
      }
      onError(t2) {
        this.vu.error(t2);
      }
      bu(t2) {
        this.onlineState = t2;
        let e = false;
        return this.Su && !this.Vu && this.Cu(this.Su, t2) && (this.xu(this.Su), e = true), e;
      }
      Cu(t2, e) {
        if (!t2.fromCache)
          return true;
        const n = "Offline" !== e;
        return (!this.options.Nu || !n) && (!t2.docs.isEmpty() || "Offline" === e);
      }
      Du(t2) {
        if (t2.docChanges.length > 0)
          return true;
        const e = this.Su && this.Su.hasPendingWrites !== t2.hasPendingWrites;
        return !(!t2.syncStateChanged && !e) && true === this.options.includeMetadataChanges;
      }
      xu(t2) {
        t2 = Gu.fromInitialDocuments(t2.query, t2.docs, t2.mutatedKeys, t2.fromCache), this.Vu = true, this.vu.next(t2);
      }
    };
    sc2 = class {
      constructor(t2) {
        this.key = t2;
      }
    };
    ic2 = class {
      constructor(t2) {
        this.key = t2;
      }
    };
    rc2 = class {
      constructor(t2, e) {
        this.query = t2, this.Lu = e, this.Uu = null, this.current = false, this.qu = gs(), this.mutatedKeys = gs(), this.Ku = In(t2), this.Gu = new qu(this.Ku);
      }
      get Qu() {
        return this.Lu;
      }
      ju(t2, e) {
        const n = e ? e.Wu : new Ku(), s2 = e ? e.Gu : this.Gu;
        let i = e ? e.mutatedKeys : this.mutatedKeys, r = s2, o = false;
        const u = "F" === this.query.limitType && s2.size === this.query.limit ? s2.last() : null, c = "L" === this.query.limitType && s2.size === this.query.limit ? s2.first() : null;
        if (t2.inorderTraversal((t3, e2) => {
          const a = s2.get(t3), h = yn(this.query, e2) ? e2 : null, l2 = !!a && this.mutatedKeys.has(a.key), f = !!h && (h.hasLocalMutations || this.mutatedKeys.has(h.key) && h.hasCommittedMutations);
          let d = false;
          if (a && h) {
            a.data.isEqual(h.data) ? l2 !== f && (n.track({
              type: 3,
              doc: h
            }), d = true) : this.zu(a, h) || (n.track({
              type: 2,
              doc: h
            }), d = true, (u && this.Ku(h, u) > 0 || c && this.Ku(h, c) < 0) && (o = true));
          } else
            !a && h ? (n.track({
              type: 0,
              doc: h
            }), d = true) : a && !h && (n.track({
              type: 1,
              doc: a
            }), d = true, (u || c) && (o = true));
          d && (h ? (r = r.add(h), i = f ? i.add(t3) : i.delete(t3)) : (r = r.delete(t3), i = i.delete(t3)));
        }), null !== this.query.limit)
          for (; r.size > this.query.limit; ) {
            const t3 = "F" === this.query.limitType ? r.last() : r.first();
            r = r.delete(t3.key), i = i.delete(t3.key), n.track({
              type: 1,
              doc: t3
            });
          }
        return {
          Gu: r,
          Wu: n,
          $i: o,
          mutatedKeys: i
        };
      }
      zu(t2, e) {
        return t2.hasLocalMutations && e.hasCommittedMutations && !e.hasLocalMutations;
      }
      applyChanges(t2, e, n) {
        const s2 = this.Gu;
        this.Gu = t2.Gu, this.mutatedKeys = t2.mutatedKeys;
        const i = t2.Wu.Eu();
        i.sort((t3, e2) => function(t4, e3) {
          const n2 = (t5) => {
            switch (t5) {
              case 0:
                return 1;
              case 2:
              case 3:
                return 2;
              case 1:
                return 0;
              default:
                return L2();
            }
          };
          return n2(t4) - n2(e3);
        }(t3.type, e2.type) || this.Ku(t3.doc, e2.doc)), this.Hu(n);
        const r = e ? this.Ju() : [], o = 0 === this.qu.size && this.current ? 1 : 0, u = o !== this.Uu;
        if (this.Uu = o, 0 !== i.length || u) {
          return {
            snapshot: new Gu(
              this.query,
              t2.Gu,
              s2,
              i,
              t2.mutatedKeys,
              0 === o,
              u,
              false
            ),
            Yu: r
          };
        }
        return {
          Yu: r
        };
      }
      bu(t2) {
        return this.current && "Offline" === t2 ? (this.current = false, this.applyChanges(
          {
            Gu: this.Gu,
            Wu: new Ku(),
            mutatedKeys: this.mutatedKeys,
            $i: false
          },
          false
        )) : {
          Yu: []
        };
      }
      Xu(t2) {
        return !this.Lu.has(t2) && (!!this.Gu.has(t2) && !this.Gu.get(t2).hasLocalMutations);
      }
      Hu(t2) {
        t2 && (t2.addedDocuments.forEach((t3) => this.Lu = this.Lu.add(t3)), t2.modifiedDocuments.forEach((t3) => {
        }), t2.removedDocuments.forEach((t3) => this.Lu = this.Lu.delete(t3)), this.current = t2.current);
      }
      Ju() {
        if (!this.current)
          return [];
        const t2 = this.qu;
        this.qu = gs(), this.Gu.forEach((t3) => {
          this.Xu(t3.key) && (this.qu = this.qu.add(t3.key));
        });
        const e = [];
        return t2.forEach((t3) => {
          this.qu.has(t3) || e.push(new ic2(t3));
        }), this.qu.forEach((n) => {
          t2.has(n) || e.push(new sc2(n));
        }), e;
      }
      Zu(t2) {
        this.Lu = t2.Hi, this.qu = gs();
        const e = this.ju(t2.documents);
        return this.applyChanges(e, true);
      }
      tc() {
        return Gu.fromInitialDocuments(this.query, this.Gu, this.mutatedKeys, 0 === this.Uu);
      }
    };
    oc2 = class {
      constructor(t2, e, n) {
        this.query = t2, this.targetId = e, this.view = n;
      }
    };
    uc2 = class {
      constructor(t2) {
        this.key = t2, this.ec = false;
      }
    };
    cc2 = class {
      constructor(t2, e, n, s2, i, r) {
        this.localStore = t2, this.remoteStore = e, this.eventManager = n, this.sharedClientState = s2, this.currentUser = i, this.maxConcurrentLimboResolutions = r, this.nc = {}, this.sc = new os((t3) => mn(t3), wn), this.ic = /* @__PURE__ */ new Map(), this.rc = /* @__PURE__ */ new Set(), this.oc = new Gt(dt.comparator), this.uc = /* @__PURE__ */ new Map(), this.cc = new oo(), this.ac = {}, this.hc = /* @__PURE__ */ new Map(), this.lc = Or.vn(), this.onlineState = "Unknown", this.fc = void 0;
      }
      get isPrimaryClient() {
        return true === this.fc;
      }
    };
    Uc2 = class {
      constructor() {
        this.synchronizeTabs = false;
      }
      async initialize(t2) {
        this.It = iu(t2.databaseInfo.databaseId), this.sharedClientState = this.mc(t2), this.persistence = this.gc(t2), await this.persistence.start(), this.localStore = this.yc(t2), this.gcScheduler = this.Ic(t2, this.localStore), this.indexBackfillerScheduler = this.Tc(t2, this.localStore);
      }
      Ic(t2, e) {
        return null;
      }
      Tc(t2, e) {
        return null;
      }
      yc(t2) {
        return Po(this.persistence, new Ro(), t2.initialUser, this.It);
      }
      gc(t2) {
        return new fo(wo.Bs, this.It);
      }
      mc(t2) {
        return new Jo();
      }
      async terminate() {
        this.gcScheduler && this.gcScheduler.stop(), await this.sharedClientState.shutdown(), await this.persistence.shutdown();
      }
    };
    Gc2 = class {
      async initialize(t2, e) {
        this.localStore || (this.localStore = t2.localStore, this.sharedClientState = t2.sharedClientState, this.datastore = this.createDatastore(e), this.remoteStore = this.createRemoteStore(e), this.eventManager = this.createEventManager(e), this.syncEngine = this.createSyncEngine(
          e,
          !t2.synchronizeTabs
        ), this.sharedClientState.onlineStateHandler = (t3) => _c(this.syncEngine, t3, 1), this.remoteStore.remoteSyncer.handleCredentialChange = vc2.bind(null, this.syncEngine), await Fu(this.remoteStore, this.syncEngine.isPrimaryClient));
      }
      createEventManager(t2) {
        return new ju();
      }
      createDatastore(t2) {
        const e = iu(t2.databaseInfo.databaseId), n = (s2 = t2.databaseInfo, new eu(s2));
        var s2;
        return function(t3, e2, n2, s3) {
          return new au(t3, e2, n2, s3);
        }(t2.authCredentials, t2.appCheckCredentials, n, e);
      }
      createRemoteStore(t2) {
        return e = this.localStore, n = this.datastore, s2 = t2.asyncQueue, i = (t3) => _c(this.syncEngine, t3, 0), r = Xo.C() ? new Xo() : new Yo(), new lu(e, n, s2, i, r);
        var e, n, s2, i, r;
      }
      createSyncEngine(t2, e) {
        return function(t3, e2, n, s2, i, r, o) {
          const u = new cc2(t3, e2, n, s2, i, r);
          return o && (u.fc = true), u;
        }(this.localStore, this.remoteStore, this.eventManager, this.sharedClientState, t2.initialUser, t2.maxConcurrentLimboResolutions, e);
      }
      terminate() {
        return async function(t2) {
          const e = K2(t2);
          O2("RemoteStore", "RemoteStore shutting down."), e._u.add(5), await du(e), e.mu.shutdown(), e.gu.set("Unknown");
        }(this.remoteStore);
      }
    };
    jc2 = class {
      constructor(t2) {
        this.observer = t2, this.muted = false;
      }
      next(t2) {
        this.observer.next && this.Ac(this.observer.next, t2);
      }
      error(t2) {
        this.observer.error ? this.Ac(this.observer.error, t2) : F2("Uncaught Error in snapshot listener:", t2);
      }
      Rc() {
        this.muted = true;
      }
      Ac(t2, e) {
        this.muted || setTimeout(() => {
          this.muted || t2(e);
        }, 0);
      }
    };
    Jc2 = class {
      constructor(t2, e, n, s2) {
        this.authCredentials = t2, this.appCheckCredentials = e, this.asyncQueue = n, this.databaseInfo = s2, this.user = C2.UNAUTHENTICATED, this.clientId = st.R(), this.authCredentialListener = () => Promise.resolve(), this.appCheckCredentialListener = () => Promise.resolve(), this.authCredentials.start(n, async (t3) => {
          O2("FirestoreClient", "Received user=", t3.uid), await this.authCredentialListener(t3), this.user = t3;
        }), this.appCheckCredentials.start(n, (t3) => (O2("FirestoreClient", "Received new app check token=", t3), this.appCheckCredentialListener(t3, this.user)));
      }
      async getConfiguration() {
        return {
          asyncQueue: this.asyncQueue,
          databaseInfo: this.databaseInfo,
          clientId: this.clientId,
          authCredentials: this.authCredentials,
          appCheckCredentials: this.appCheckCredentials,
          initialUser: this.user,
          maxConcurrentLimboResolutions: 100
        };
      }
      setCredentialChangeListener(t2) {
        this.authCredentialListener = t2;
      }
      setAppCheckTokenChangeListener(t2) {
        this.appCheckCredentialListener = t2;
      }
      verifyNotTerminated() {
        if (this.asyncQueue.isShuttingDown)
          throw new Q2(G.FAILED_PRECONDITION, "The client has already been terminated.");
      }
      terminate() {
        this.asyncQueue.enterRestrictedMode();
        const t2 = new j();
        return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async () => {
          try {
            this.onlineComponents && await this.onlineComponents.terminate(), this.offlineComponents && await this.offlineComponents.terminate(), this.authCredentials.shutdown(), this.appCheckCredentials.shutdown(), t2.resolve();
          } catch (e) {
            const n = Uu(e, "Failed to shutdown persistence");
            t2.reject(n);
          }
        }), t2.promise;
      }
    };
    ma2 = /* @__PURE__ */ new Map();
    Ra2 = class {
      constructor(t2) {
        var e;
        if (void 0 === t2.host) {
          if (void 0 !== t2.ssl)
            throw new Q2(G.INVALID_ARGUMENT, "Can't provide ssl option if host option is not set");
          this.host = "firestore.googleapis.com", this.ssl = true;
        } else
          this.host = t2.host, this.ssl = null === (e = t2.ssl) || void 0 === e || e;
        if (this.credentials = t2.credentials, this.ignoreUndefinedProperties = !!t2.ignoreUndefinedProperties, void 0 === t2.cacheSizeBytes)
          this.cacheSizeBytes = 41943040;
        else {
          if (-1 !== t2.cacheSizeBytes && t2.cacheSizeBytes < 1048576)
            throw new Q2(G.INVALID_ARGUMENT, "cacheSizeBytes must be at least 1048576");
          this.cacheSizeBytes = t2.cacheSizeBytes;
        }
        this.experimentalForceLongPolling = !!t2.experimentalForceLongPolling, this.experimentalAutoDetectLongPolling = !!t2.experimentalAutoDetectLongPolling, this.useFetchStreams = !!t2.useFetchStreams, ya2("experimentalForceLongPolling", t2.experimentalForceLongPolling, "experimentalAutoDetectLongPolling", t2.experimentalAutoDetectLongPolling);
      }
      isEqual(t2) {
        return this.host === t2.host && this.ssl === t2.ssl && this.credentials === t2.credentials && this.cacheSizeBytes === t2.cacheSizeBytes && this.experimentalForceLongPolling === t2.experimentalForceLongPolling && this.experimentalAutoDetectLongPolling === t2.experimentalAutoDetectLongPolling && this.ignoreUndefinedProperties === t2.ignoreUndefinedProperties && this.useFetchStreams === t2.useFetchStreams;
      }
    };
    ba2 = class {
      constructor(t2, e, n, s2) {
        this._authCredentials = t2, this._appCheckCredentials = e, this._databaseId = n, this._app = s2, this.type = "firestore-lite", this._persistenceKey = "(lite)", this._settings = new Ra2({}), this._settingsFrozen = false;
      }
      get app() {
        if (!this._app)
          throw new Q2(G.FAILED_PRECONDITION, "Firestore was not initialized using the Firebase SDK. 'app' is not available");
        return this._app;
      }
      get _initialized() {
        return this._settingsFrozen;
      }
      get _terminated() {
        return void 0 !== this._terminateTask;
      }
      _setSettings(t2) {
        if (this._settingsFrozen)
          throw new Q2(G.FAILED_PRECONDITION, "Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");
        this._settings = new Ra2(t2), void 0 !== t2.credentials && (this._authCredentials = function(t3) {
          if (!t3)
            return new z2();
          switch (t3.type) {
            case "gapi":
              const e = t3.client;
              return new X2(e, t3.sessionIndex || "0", t3.iamToken || null, t3.authTokenFactory || null);
            case "provider":
              return t3.client;
            default:
              throw new Q2(G.INVALID_ARGUMENT, "makeAuthCredentialsProvider failed due to invalid credential type");
          }
        }(t2.credentials));
      }
      _getSettings() {
        return this._settings;
      }
      _freezeSettings() {
        return this._settingsFrozen = true, this._settings;
      }
      _delete() {
        return this._terminateTask || (this._terminateTask = this._terminate()), this._terminateTask;
      }
      toJSON() {
        return {
          app: this._app,
          databaseId: this._databaseId,
          settings: this._settings
        };
      }
      _terminate() {
        return function(t2) {
          const e = ma2.get(t2);
          e && (O2("ComponentProvider", "Removing Datastore"), ma2.delete(t2), e.terminate());
        }(this), Promise.resolve();
      }
    };
    va = class {
      constructor(t2, e, n) {
        this.converter = e, this._key = n, this.type = "document", this.firestore = t2;
      }
      get _path() {
        return this._key.path;
      }
      get id() {
        return this._key.path.lastSegment();
      }
      get path() {
        return this._key.path.canonicalString();
      }
      get parent() {
        return new Sa2(this.firestore, this.converter, this._key.path.popLast());
      }
      withConverter(t2) {
        return new va(this.firestore, t2, this._key);
      }
    };
    Va2 = class {
      constructor(t2, e, n) {
        this.converter = e, this._query = n, this.type = "query", this.firestore = t2;
      }
      withConverter(t2) {
        return new Va2(this.firestore, t2, this._query);
      }
    };
    Sa2 = class extends Va2 {
      constructor(t2, e, n) {
        super(t2, e, un(n)), this._path = n, this.type = "collection";
      }
      get id() {
        return this._query.path.lastSegment();
      }
      get path() {
        return this._query.path.canonicalString();
      }
      get parent() {
        const t2 = this._path.popLast();
        return t2.isEmpty() ? null : new va(
          this.firestore,
          null,
          new dt(t2)
        );
      }
      withConverter(t2) {
        return new Sa2(this.firestore, t2, this._path);
      }
    };
    Ma2 = class {
      constructor() {
        this.$c = Promise.resolve(), this.Bc = [], this.Lc = false, this.Uc = [], this.qc = null, this.Kc = false, this.Gc = false, this.Qc = [], this.xo = new ru(this, "async_queue_retry"), this.jc = () => {
          const t3 = su();
          t3 && O2("AsyncQueue", "Visibility state changed to " + t3.visibilityState), this.xo.bo();
        };
        const t2 = su();
        t2 && "function" == typeof t2.addEventListener && t2.addEventListener("visibilitychange", this.jc);
      }
      get isShuttingDown() {
        return this.Lc;
      }
      enqueueAndForget(t2) {
        this.enqueue(t2);
      }
      enqueueAndForgetEvenWhileRestricted(t2) {
        this.Wc(), this.zc(t2);
      }
      enterRestrictedMode(t2) {
        if (!this.Lc) {
          this.Lc = true, this.Gc = t2 || false;
          const e = su();
          e && "function" == typeof e.removeEventListener && e.removeEventListener("visibilitychange", this.jc);
        }
      }
      enqueue(t2) {
        if (this.Wc(), this.Lc)
          return new Promise(() => {
          });
        const e = new j();
        return this.zc(() => this.Lc && this.Gc ? Promise.resolve() : (t2().then(e.resolve, e.reject), e.promise)).then(() => e.promise);
      }
      enqueueRetryable(t2) {
        this.enqueueAndForget(() => (this.Bc.push(t2), this.Hc()));
      }
      async Hc() {
        if (0 !== this.Bc.length) {
          try {
            await this.Bc[0](), this.Bc.shift(), this.xo.reset();
          } catch (t2) {
            if (!Nt(t2))
              throw t2;
            O2("AsyncQueue", "Operation failed with retryable error: " + t2);
          }
          this.Bc.length > 0 && this.xo.Ao(() => this.Hc());
        }
      }
      zc(t2) {
        const e = this.$c.then(() => (this.Kc = true, t2().catch((t3) => {
          this.qc = t3, this.Kc = false;
          const e2 = function(t4) {
            let e3 = t4.message || "";
            t4.stack && (e3 = t4.stack.includes(t4.message) ? t4.stack : t4.message + "\n" + t4.stack);
            return e3;
          }(t3);
          throw F2("INTERNAL UNHANDLED ERROR: ", e2), t3;
        }).then((t3) => (this.Kc = false, t3))));
        return this.$c = e, e;
      }
      enqueueAfterDelay(t2, e, n) {
        this.Wc(), this.Qc.indexOf(t2) > -1 && (e = 0);
        const s2 = Lu.createAndSchedule(this, t2, e, n, (t3) => this.Jc(t3));
        return this.Uc.push(s2), s2;
      }
      Wc() {
        this.qc && L2();
      }
      verifyOperationInProgress() {
      }
      async Yc() {
        let t2;
        do {
          t2 = this.$c, await t2;
        } while (t2 !== this.$c);
      }
      Xc(t2) {
        for (const e of this.Uc)
          if (e.timerId === t2)
            return true;
        return false;
      }
      Zc(t2) {
        return this.Yc().then(() => {
          this.Uc.sort((t3, e) => t3.targetTimeMs - e.targetTimeMs);
          for (const e of this.Uc)
            if (e.skipDelay(), "all" !== t2 && e.timerId === t2)
              break;
          return this.Yc();
        });
      }
      ta(t2) {
        this.Qc.push(t2);
      }
      Jc(t2) {
        const e = this.Uc.indexOf(t2);
        this.Uc.splice(e, 1);
      }
    };
    Ba = class extends ba2 {
      constructor(t2, e, n, s2) {
        super(t2, e, n, s2), this.type = "firestore", this._queue = new Ma2(), this._persistenceKey = (null == s2 ? void 0 : s2.name) || "[DEFAULT]";
      }
      _terminate() {
        return this._firestoreClient || Ka2(this), this._firestoreClient.terminate();
      }
    };
    eh = class {
      constructor(...t2) {
        for (let e = 0; e < t2.length; ++e)
          if (0 === t2[e].length)
            throw new Q2(G.INVALID_ARGUMENT, "Invalid field name at argument $(i + 1). Field names must not be empty.");
        this._internalPath = new ft(t2);
      }
      isEqual(t2) {
        return this._internalPath.isEqual(t2._internalPath);
      }
    };
    sh = class {
      constructor(t2) {
        this._byteString = t2;
      }
      static fromBase64String(t2) {
        try {
          return new sh(Xt.fromBase64String(t2));
        } catch (t3) {
          throw new Q2(G.INVALID_ARGUMENT, "Failed to construct data from Base64 string: " + t3);
        }
      }
      static fromUint8Array(t2) {
        return new sh(Xt.fromUint8Array(t2));
      }
      toBase64() {
        return this._byteString.toBase64();
      }
      toUint8Array() {
        return this._byteString.toUint8Array();
      }
      toString() {
        return "Bytes(base64: " + this.toBase64() + ")";
      }
      isEqual(t2) {
        return this._byteString.isEqual(t2._byteString);
      }
    };
    ih = class {
      constructor(t2) {
        this._methodName = t2;
      }
    };
    rh = class {
      constructor(t2, e) {
        if (!isFinite(t2) || t2 < -90 || t2 > 90)
          throw new Q2(G.INVALID_ARGUMENT, "Latitude must be a number between -90 and 90, but was: " + t2);
        if (!isFinite(e) || e < -180 || e > 180)
          throw new Q2(G.INVALID_ARGUMENT, "Longitude must be a number between -180 and 180, but was: " + e);
        this._lat = t2, this._long = e;
      }
      get latitude() {
        return this._lat;
      }
      get longitude() {
        return this._long;
      }
      isEqual(t2) {
        return this._lat === t2._lat && this._long === t2._long;
      }
      toJSON() {
        return {
          latitude: this._lat,
          longitude: this._long
        };
      }
      _compareTo(t2) {
        return it(this._lat, t2._lat) || it(this._long, t2._long);
      }
    };
    oh = /^__.*__$/;
    hh = class {
      constructor(t2, e, n, s2, i, r) {
        this.settings = t2, this.databaseId = e, this.It = n, this.ignoreUndefinedProperties = s2, void 0 === i && this.ea(), this.fieldTransforms = i || [], this.fieldMask = r || [];
      }
      get path() {
        return this.settings.path;
      }
      get na() {
        return this.settings.na;
      }
      sa(t2) {
        return new hh(Object.assign(Object.assign({}, this.settings), t2), this.databaseId, this.It, this.ignoreUndefinedProperties, this.fieldTransforms, this.fieldMask);
      }
      ia(t2) {
        var e;
        const n = null === (e = this.path) || void 0 === e ? void 0 : e.child(t2), s2 = this.sa({
          path: n,
          ra: false
        });
        return s2.oa(t2), s2;
      }
      ua(t2) {
        var e;
        const n = null === (e = this.path) || void 0 === e ? void 0 : e.child(t2), s2 = this.sa({
          path: n,
          ra: false
        });
        return s2.ea(), s2;
      }
      ca(t2) {
        return this.sa({
          path: void 0,
          ra: true
        });
      }
      aa(t2) {
        return Dh(t2, this.settings.methodName, this.settings.ha || false, this.path, this.settings.la);
      }
      contains(t2) {
        return void 0 !== this.fieldMask.find((e) => t2.isPrefixOf(e)) || void 0 !== this.fieldTransforms.find((e) => t2.isPrefixOf(e.field));
      }
      ea() {
        if (this.path)
          for (let t2 = 0; t2 < this.path.length; t2++)
            this.oa(this.path.get(t2));
      }
      oa(t2) {
        if (0 === t2.length)
          throw this.aa("Document fields must not be empty");
        if (ah(this.na) && oh.test(t2))
          throw this.aa('Document fields cannot begin and end with "__"');
      }
    };
    lh = class {
      constructor(t2, e, n) {
        this.databaseId = t2, this.ignoreUndefinedProperties = e, this.It = n || iu(t2);
      }
      fa(t2, e, n, s2 = false) {
        return new hh({
          na: t2,
          methodName: e,
          la: n,
          path: ft.emptyPath(),
          ra: false,
          ha: s2
        }, this.databaseId, this.It, this.ignoreUndefinedProperties);
      }
    };
    Vh = new RegExp("[~\\*/\\[\\]]");
    xh = class {
      constructor(t2, e, n, s2, i) {
        this._firestore = t2, this._userDataWriter = e, this._key = n, this._document = s2, this._converter = i;
      }
      get id() {
        return this._key.path.lastSegment();
      }
      get ref() {
        return new va(this._firestore, this._converter, this._key);
      }
      exists() {
        return null !== this._document;
      }
      data() {
        if (this._document) {
          if (this._converter) {
            const t2 = new Nh(
              this._firestore,
              this._userDataWriter,
              this._key,
              this._document,
              null
            );
            return this._converter.fromFirestore(t2);
          }
          return this._userDataWriter.convertValue(this._document.data.value);
        }
      }
      get(t2) {
        if (this._document) {
          const e = this._document.data.field(kh("DocumentSnapshot.get", t2));
          if (null !== e)
            return this._userDataWriter.convertValue(e);
        }
      }
    };
    Nh = class extends xh {
      data() {
        return super.data();
      }
    };
    Mh = class {
      constructor(t2, e) {
        this.hasPendingWrites = t2, this.fromCache = e;
      }
      isEqual(t2) {
        return this.hasPendingWrites === t2.hasPendingWrites && this.fromCache === t2.fromCache;
      }
    };
    Oh = class extends xh {
      constructor(t2, e, n, s2, i, r) {
        super(t2, e, n, s2, r), this._firestore = t2, this._firestoreImpl = t2, this.metadata = i;
      }
      exists() {
        return super.exists();
      }
      data(t2 = {}) {
        if (this._document) {
          if (this._converter) {
            const e = new Fh(
              this._firestore,
              this._userDataWriter,
              this._key,
              this._document,
              this.metadata,
              null
            );
            return this._converter.fromFirestore(e, t2);
          }
          return this._userDataWriter.convertValue(this._document.data.value, t2.serverTimestamps);
        }
      }
      get(t2, e = {}) {
        if (this._document) {
          const n = this._document.data.field(kh("DocumentSnapshot.get", t2));
          if (null !== n)
            return this._userDataWriter.convertValue(n, e.serverTimestamps);
        }
      }
    };
    Fh = class extends Oh {
      data(t2 = {}) {
        return super.data(t2);
      }
    };
    $h = class {
      constructor(t2, e, n, s2) {
        this._firestore = t2, this._userDataWriter = e, this._snapshot = s2, this.metadata = new Mh(s2.hasPendingWrites, s2.fromCache), this.query = n;
      }
      get docs() {
        const t2 = [];
        return this.forEach((e) => t2.push(e)), t2;
      }
      get size() {
        return this._snapshot.docs.size;
      }
      get empty() {
        return 0 === this.size;
      }
      forEach(t2, e) {
        this._snapshot.docs.forEach((n) => {
          t2.call(e, new Fh(this._firestore, this._userDataWriter, n.key, n, new Mh(this._snapshot.mutatedKeys.has(n.key), this._snapshot.fromCache), this.query.converter));
        });
      }
      docChanges(t2 = {}) {
        const e = !!t2.includeMetadataChanges;
        if (e && this._snapshot.excludesMetadataChanges)
          throw new Q2(G.INVALID_ARGUMENT, "To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");
        return this._cachedChanges && this._cachedChangesIncludeMetadataChanges === e || (this._cachedChanges = function(t3, e2) {
          if (t3._snapshot.oldDocs.isEmpty()) {
            let e3 = 0;
            return t3._snapshot.docChanges.map((n) => ({
              type: "added",
              doc: new Fh(t3._firestore, t3._userDataWriter, n.doc.key, n.doc, new Mh(t3._snapshot.mutatedKeys.has(n.doc.key), t3._snapshot.fromCache), t3.query.converter),
              oldIndex: -1,
              newIndex: e3++
            }));
          }
          {
            let n = t3._snapshot.oldDocs;
            return t3._snapshot.docChanges.filter((t4) => e2 || 3 !== t4.type).map((e3) => {
              const s2 = new Fh(t3._firestore, t3._userDataWriter, e3.doc.key, e3.doc, new Mh(t3._snapshot.mutatedKeys.has(e3.doc.key), t3._snapshot.fromCache), t3.query.converter);
              let i = -1, r = -1;
              return 0 !== e3.type && (i = n.indexOf(e3.doc.key), n = n.delete(e3.doc.key)), 1 !== e3.type && (n = n.add(e3.doc), r = n.indexOf(e3.doc.key)), {
                type: Bh(e3.type),
                doc: s2,
                oldIndex: i,
                newIndex: r
              };
            });
          }
        }(this, e), this._cachedChangesIncludeMetadataChanges = e), this._cachedChanges;
      }
    };
    qh = class {
    };
    Gh = class extends qh {
      constructor(t2, e, n) {
        super(), this.wa = t2, this.ma = e, this.ga = n, this.type = "where";
      }
      _apply(t2) {
        const e = fh(t2.firestore), n = function(t3, e2, n2, s2, i, r, o) {
          let u;
          if (i.isKeyField()) {
            if ("array-contains" === r || "array-contains-any" === r)
              throw new Q2(G.INVALID_ARGUMENT, `Invalid Query. You can't perform '${r}' queries on documentId().`);
            if ("in" === r || "not-in" === r) {
              rl(o, r);
              const e3 = [];
              for (const n3 of o)
                e3.push(il(s2, t3, n3));
              u = {
                arrayValue: {
                  values: e3
                }
              };
            } else
              u = il(s2, t3, o);
          } else
            "in" !== r && "not-in" !== r && "array-contains-any" !== r || rl(o, r), u = Eh(
              n2,
              e2,
              o,
              "in" === r || "not-in" === r
            );
          const c = Ge.create(i, r, u);
          return function(t4, e3) {
            if (e3.dt()) {
              const n4 = hn(t4);
              if (null !== n4 && !n4.isEqual(e3.field))
                throw new Q2(G.INVALID_ARGUMENT, `Invalid query. All where filters with an inequality (<, <=, !=, not-in, >, or >=) must be on the same field. But you have inequality filters on '${n4.toString()}' and '${e3.field.toString()}'`);
              const s3 = an(t4);
              null !== s3 && ol(t4, e3.field, s3);
            }
            const n3 = function(t5, e4) {
              for (const n4 of t5.filters)
                if (e4.indexOf(n4.op) >= 0)
                  return n4.op;
              return null;
            }(
              t4,
              function(t5) {
                switch (t5) {
                  case "!=":
                    return ["!=", "not-in"];
                  case "array-contains":
                    return ["array-contains", "array-contains-any", "not-in"];
                  case "in":
                    return ["array-contains-any", "in", "not-in"];
                  case "array-contains-any":
                    return ["array-contains", "array-contains-any", "in", "not-in"];
                  case "not-in":
                    return ["array-contains", "array-contains-any", "in", "not-in", "!="];
                  default:
                    return [];
                }
              }(e3.op)
            );
            if (null !== n3)
              throw n3 === e3.op ? new Q2(G.INVALID_ARGUMENT, `Invalid query. You cannot use more than one '${e3.op.toString()}' filter.`) : new Q2(G.INVALID_ARGUMENT, `Invalid query. You cannot use '${e3.op.toString()}' filters with '${n3.toString()}' filters.`);
          }(t3, c), c;
        }(t2._query, "where", e, t2.firestore._databaseId, this.wa, this.ma, this.ga);
        return new Va2(t2.firestore, t2.converter, function(t3, e2) {
          const n2 = t3.filters.concat([e2]);
          return new rn(t3.path, t3.collectionGroup, t3.explicitOrderBy.slice(), n2, t3.limit, t3.limitType, t3.startAt, t3.endAt);
        }(t2._query, n));
      }
    };
    jh = class extends qh {
      constructor(t2, e) {
        super(), this.wa = t2, this.ya = e, this.type = "orderBy";
      }
      _apply(t2) {
        const e = function(t3, e2, n) {
          if (null !== t3.startAt)
            throw new Q2(G.INVALID_ARGUMENT, "Invalid query. You must not call startAt() or startAfter() before calling orderBy().");
          if (null !== t3.endAt)
            throw new Q2(G.INVALID_ARGUMENT, "Invalid query. You must not call endAt() or endBefore() before calling orderBy().");
          const s2 = new tn(e2, n);
          return function(t4, e3) {
            if (null === an(t4)) {
              const n2 = hn(t4);
              null !== n2 && ol(t4, n2, e3.field);
            }
          }(t3, s2), s2;
        }(t2._query, this.wa, this.ya);
        return new Va2(t2.firestore, t2.converter, function(t3, e2) {
          const n = t3.explicitOrderBy.concat([e2]);
          return new rn(t3.path, t3.collectionGroup, n, t3.filters.slice(), t3.limit, t3.limitType, t3.startAt, t3.endAt);
        }(t2._query, e));
      }
    };
    zh = class extends qh {
      constructor(t2, e, n) {
        super(), this.type = t2, this.pa = e, this.Ia = n;
      }
      _apply(t2) {
        return new Va2(t2.firestore, t2.converter, _n(t2._query, this.pa, this.Ia));
      }
    };
    cl = class {
      convertValue(t2, e = "none") {
        switch (de(t2)) {
          case 0:
            return null;
          case 1:
            return t2.booleanValue;
          case 2:
            return ee(t2.integerValue || t2.doubleValue);
          case 3:
            return this.convertTimestamp(t2.timestampValue);
          case 4:
            return this.convertServerTimestamp(t2, e);
          case 5:
            return t2.stringValue;
          case 6:
            return this.convertBytes(ne(t2.bytesValue));
          case 7:
            return this.convertReference(t2.referenceValue);
          case 8:
            return this.convertGeoPoint(t2.geoPointValue);
          case 9:
            return this.convertArray(t2.arrayValue, e);
          case 10:
            return this.convertObject(t2.mapValue, e);
          default:
            throw L2();
        }
      }
      convertObject(t2, e) {
        const n = {};
        return qt(t2.fields, (t3, s2) => {
          n[t3] = this.convertValue(s2, e);
        }), n;
      }
      convertGeoPoint(t2) {
        return new rh(ee(t2.latitude), ee(t2.longitude));
      }
      convertArray(t2, e) {
        return (t2.values || []).map((t3) => this.convertValue(t3, e));
      }
      convertServerTimestamp(t2, e) {
        switch (e) {
          case "previous":
            const n = ie(t2);
            return null == n ? null : this.convertValue(n, e);
          case "estimate":
            return this.convertTimestamp(re(t2));
          default:
            return null;
        }
      }
      convertTimestamp(t2) {
        const e = te(t2);
        return new ut(e.seconds, e.nanos);
      }
      convertDocumentKey(t2, e) {
        const n = ht.fromString(t2);
        U2(ai(n));
        const s2 = new ue(n.get(1), n.get(3)), i = new dt(n.popFirst(5));
        return s2.isEqual(e) || F2(`Document ${i} contains a document reference within a different database (${s2.projectId}/${s2.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`), i;
      }
    };
    _l = class extends cl {
      constructor(t2) {
        super(), this.firestore = t2;
      }
      convertBytes(t2) {
        return new sh(t2);
      }
      convertReference(t2) {
        const e = this.convertDocumentKey(t2, this.firestore._databaseId);
        return new va(this.firestore, null, e);
      }
    };
    !function(t2, e = true) {
      !function(t3) {
        x2 = t3;
      }(SDK_VERSION), _registerComponent(new Component("firestore", (t3, { instanceIdentifier: n, options: s2 }) => {
        const i = t3.getProvider("app").getImmediate(), r = new Ba(new J2(t3.getProvider("auth-internal")), new tt(t3.getProvider("app-check-internal")), function(t4, e2) {
          if (!Object.prototype.hasOwnProperty.apply(t4.options, ["projectId"]))
            throw new Q2(G.INVALID_ARGUMENT, '"projectId" not provided in firebase.initializeApp.');
          return new ue(t4.options.projectId, e2);
        }(i, n), i);
        return s2 = Object.assign({
          useFetchStreams: e
        }, s2), r._setSettings(s2), r;
      }, "PUBLIC").setMultipleInstances(true)), registerVersion(D2, "3.4.15", t2), registerVersion(D2, "3.4.15", "esm2017");
    }();
  }
});

// node_modules/firebase/app/dist/index.esm.js
var name2, version2;
var init_index_esm = __esm({
  "node_modules/firebase/app/dist/index.esm.js"() {
    init_index_esm20174();
    init_index_esm20174();
    name2 = "firebase";
    version2 = "9.9.4";
    registerVersion(name2, version2, "app");
  }
});

// node_modules/firebase/firestore/dist/index.esm.js
var init_index_esm2 = __esm({
  "node_modules/firebase/firestore/dist/index.esm.js"() {
    init_index_esm20176();
  }
});

// node_modules/@firebase/storage/dist/index.esm2017.js
function prependCode(code) {
  return "storage/" + code;
}
function unknown() {
  const message = "An unknown error occurred, please check the error payload for server response.";
  return new StorageError("unknown", message);
}
function retryLimitExceeded() {
  return new StorageError("retry-limit-exceeded", "Max retry time for operation exceeded, please try again.");
}
function canceled() {
  return new StorageError("canceled", "User canceled the upload/download.");
}
function invalidUrl(url) {
  return new StorageError("invalid-url", "Invalid URL '" + url + "'.");
}
function invalidDefaultBucket(bucket) {
  return new StorageError("invalid-default-bucket", "Invalid default bucket '" + bucket + "'.");
}
function invalidArgument(message) {
  return new StorageError("invalid-argument", message);
}
function appDeleted() {
  return new StorageError("app-deleted", "The Firebase app was deleted.");
}
function invalidRootOperation(name6) {
  return new StorageError("invalid-root-operation", "The operation '" + name6 + "' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').");
}
function start(f, callback, timeout) {
  let waitSeconds = 1;
  let retryTimeoutId = null;
  let globalTimeoutId = null;
  let hitTimeout = false;
  let cancelState = 0;
  function canceled2() {
    return cancelState === 2;
  }
  let triggeredCallback = false;
  function triggerCallback(...args) {
    if (!triggeredCallback) {
      triggeredCallback = true;
      callback.apply(null, args);
    }
  }
  function callWithDelay(millis) {
    retryTimeoutId = setTimeout(() => {
      retryTimeoutId = null;
      f(handler, canceled2());
    }, millis);
  }
  function clearGlobalTimeout() {
    if (globalTimeoutId) {
      clearTimeout(globalTimeoutId);
    }
  }
  function handler(success, ...args) {
    if (triggeredCallback) {
      clearGlobalTimeout();
      return;
    }
    if (success) {
      clearGlobalTimeout();
      triggerCallback.call(null, success, ...args);
      return;
    }
    const mustStop = canceled2() || hitTimeout;
    if (mustStop) {
      clearGlobalTimeout();
      triggerCallback.call(null, success, ...args);
      return;
    }
    if (waitSeconds < 64) {
      waitSeconds *= 2;
    }
    let waitMillis;
    if (cancelState === 1) {
      cancelState = 2;
      waitMillis = 0;
    } else {
      waitMillis = (waitSeconds + Math.random()) * 1e3;
    }
    callWithDelay(waitMillis);
  }
  let stopped = false;
  function stop2(wasTimeout) {
    if (stopped) {
      return;
    }
    stopped = true;
    clearGlobalTimeout();
    if (triggeredCallback) {
      return;
    }
    if (retryTimeoutId !== null) {
      if (!wasTimeout) {
        cancelState = 2;
      }
      clearTimeout(retryTimeoutId);
      callWithDelay(0);
    } else {
      if (!wasTimeout) {
        cancelState = 1;
      }
    }
  }
  callWithDelay(0);
  globalTimeoutId = setTimeout(() => {
    hitTimeout = true;
    stop2(true);
  }, timeout);
  return stop2;
}
function stop(id2) {
  id2(false);
}
function isJustDef(p2) {
  return p2 !== void 0;
}
function validateNumber(argument, minValue, maxValue, value) {
  if (value < minValue) {
    throw invalidArgument(`Invalid value for '${argument}'. Expected ${minValue} or greater.`);
  }
  if (value > maxValue) {
    throw invalidArgument(`Invalid value for '${argument}'. Expected ${maxValue} or less.`);
  }
}
function makeQueryString(params) {
  const encode2 = encodeURIComponent;
  let queryPart = "?";
  for (const key2 in params) {
    if (params.hasOwnProperty(key2)) {
      const nextPart = encode2(key2) + "=" + encode2(params[key2]);
      queryPart = queryPart + nextPart + "&";
    }
  }
  queryPart = queryPart.slice(0, -1);
  return queryPart;
}
function addAuthHeader_(headers, authToken) {
  if (authToken !== null && authToken.length > 0) {
    headers["Authorization"] = "Firebase " + authToken;
  }
}
function addVersionHeader_(headers, firebaseVersion) {
  headers["X-Firebase-Storage-Version"] = "webjs/" + (firebaseVersion !== null && firebaseVersion !== void 0 ? firebaseVersion : "AppManager");
}
function addGmpidHeader_(headers, appId) {
  if (appId) {
    headers["X-Firebase-GMPID"] = appId;
  }
}
function addAppCheckHeader_(headers, appCheckToken) {
  if (appCheckToken !== null) {
    headers["X-Firebase-AppCheck"] = appCheckToken;
  }
}
function makeRequest(requestInfo, appId, authToken, appCheckToken, requestFactory, firebaseVersion) {
  const queryPart = makeQueryString(requestInfo.urlParams);
  const url = requestInfo.url + queryPart;
  const headers = Object.assign({}, requestInfo.headers);
  addGmpidHeader_(headers, appId);
  addAuthHeader_(headers, authToken);
  addVersionHeader_(headers, firebaseVersion);
  addAppCheckHeader_(headers, appCheckToken);
  return new NetworkRequest(url, requestInfo.method, headers, requestInfo.body, requestInfo.successCodes, requestInfo.additionalRetryCodes, requestInfo.handler, requestInfo.errorHandler, requestInfo.timeout, requestInfo.progressCallback, requestFactory);
}
function parent(path) {
  if (path.length === 0) {
    return null;
  }
  const index16 = path.lastIndexOf("/");
  if (index16 === -1) {
    return "";
  }
  const newPath = path.slice(0, index16);
  return newPath;
}
function lastComponent(path) {
  const index16 = path.lastIndexOf("/", path.length - 2);
  if (index16 === -1) {
    return path;
  } else {
    return path.slice(index16 + 1);
  }
}
function extractBucket(host, config2) {
  const bucketString = config2 === null || config2 === void 0 ? void 0 : config2[CONFIG_STORAGE_BUCKET_KEY];
  if (bucketString == null) {
    return null;
  }
  return Location.makeFromBucketSpec(bucketString, host);
}
function getStorage(app = getApp(), bucketUrl) {
  app = getModularInstance(app);
  const storageProvider = _getProvider(app, STORAGE_TYPE);
  const storageInstance = storageProvider.getImmediate({
    identifier: bucketUrl
  });
  return storageInstance;
}
function factory(container, { instanceIdentifier: url }) {
  const app = container.getProvider("app").getImmediate();
  const authProvider = container.getProvider("auth-internal");
  const appCheckProvider = container.getProvider("app-check-internal");
  return new FirebaseStorageImpl(app, authProvider, appCheckProvider, url, SDK_VERSION);
}
function registerStorage() {
  _registerComponent(new Component(STORAGE_TYPE, factory, "PUBLIC").setMultipleInstances(true));
  registerVersion(name3, version3, "");
  registerVersion(name3, version3, "esm2017");
}
var DEFAULT_HOST, CONFIG_STORAGE_BUCKET_KEY, DEFAULT_MAX_OPERATION_RETRY_TIME, DEFAULT_MAX_UPLOAD_RETRY_TIME, StorageError, Location, FailRequest, ErrorCode2, NetworkRequest, RequestEndStatus, RESUMABLE_UPLOAD_CHUNK_SIZE, Reference, FirebaseStorageImpl, name3, version3, STORAGE_TYPE;
var init_index_esm20177 = __esm({
  "node_modules/@firebase/storage/dist/index.esm2017.js"() {
    init_index_esm20174();
    init_index_esm2017();
    init_index_esm20172();
    DEFAULT_HOST = "firebasestorage.googleapis.com";
    CONFIG_STORAGE_BUCKET_KEY = "storageBucket";
    DEFAULT_MAX_OPERATION_RETRY_TIME = 2 * 60 * 1e3;
    DEFAULT_MAX_UPLOAD_RETRY_TIME = 10 * 60 * 1e3;
    StorageError = class extends FirebaseError {
      constructor(code, message) {
        super(prependCode(code), `Firebase Storage: ${message} (${prependCode(code)})`);
        this.customData = { serverResponse: null };
        this._baseMessage = this.message;
        Object.setPrototypeOf(this, StorageError.prototype);
      }
      _codeEquals(code) {
        return prependCode(code) === this.code;
      }
      get serverResponse() {
        return this.customData.serverResponse;
      }
      set serverResponse(serverResponse) {
        this.customData.serverResponse = serverResponse;
        if (this.customData.serverResponse) {
          this.message = `${this._baseMessage}
${this.customData.serverResponse}`;
        } else {
          this.message = this._baseMessage;
        }
      }
    };
    Location = class {
      constructor(bucket, path) {
        this.bucket = bucket;
        this.path_ = path;
      }
      get path() {
        return this.path_;
      }
      get isRoot() {
        return this.path.length === 0;
      }
      fullServerUrl() {
        const encode2 = encodeURIComponent;
        return "/b/" + encode2(this.bucket) + "/o/" + encode2(this.path);
      }
      bucketOnlyServerUrl() {
        const encode2 = encodeURIComponent;
        return "/b/" + encode2(this.bucket) + "/o";
      }
      static makeFromBucketSpec(bucketString, host) {
        let bucketLocation;
        try {
          bucketLocation = Location.makeFromUrl(bucketString, host);
        } catch (e) {
          return new Location(bucketString, "");
        }
        if (bucketLocation.path === "") {
          return bucketLocation;
        } else {
          throw invalidDefaultBucket(bucketString);
        }
      }
      static makeFromUrl(url, host) {
        let location = null;
        const bucketDomain = "([A-Za-z0-9.\\-_]+)";
        function gsModify(loc) {
          if (loc.path.charAt(loc.path.length - 1) === "/") {
            loc.path_ = loc.path_.slice(0, -1);
          }
        }
        const gsPath = "(/(.*))?$";
        const gsRegex = new RegExp("^gs://" + bucketDomain + gsPath, "i");
        const gsIndices = { bucket: 1, path: 3 };
        function httpModify(loc) {
          loc.path_ = decodeURIComponent(loc.path);
        }
        const version6 = "v[A-Za-z0-9_]+";
        const firebaseStorageHost = host.replace(/[.]/g, "\\.");
        const firebaseStoragePath = "(/([^?#]*).*)?$";
        const firebaseStorageRegExp = new RegExp(`^https?://${firebaseStorageHost}/${version6}/b/${bucketDomain}/o${firebaseStoragePath}`, "i");
        const firebaseStorageIndices = { bucket: 1, path: 3 };
        const cloudStorageHost = host === DEFAULT_HOST ? "(?:storage.googleapis.com|storage.cloud.google.com)" : host;
        const cloudStoragePath = "([^?#]*)";
        const cloudStorageRegExp = new RegExp(`^https?://${cloudStorageHost}/${bucketDomain}/${cloudStoragePath}`, "i");
        const cloudStorageIndices = { bucket: 1, path: 2 };
        const groups = [
          { regex: gsRegex, indices: gsIndices, postModify: gsModify },
          {
            regex: firebaseStorageRegExp,
            indices: firebaseStorageIndices,
            postModify: httpModify
          },
          {
            regex: cloudStorageRegExp,
            indices: cloudStorageIndices,
            postModify: httpModify
          }
        ];
        for (let i = 0; i < groups.length; i++) {
          const group = groups[i];
          const captures = group.regex.exec(url);
          if (captures) {
            const bucketValue = captures[group.indices.bucket];
            let pathValue = captures[group.indices.path];
            if (!pathValue) {
              pathValue = "";
            }
            location = new Location(bucketValue, pathValue);
            group.postModify(location);
            break;
          }
        }
        if (location == null) {
          throw invalidUrl(url);
        }
        return location;
      }
    };
    FailRequest = class {
      constructor(error2) {
        this.promise_ = Promise.reject(error2);
      }
      getPromise() {
        return this.promise_;
      }
      cancel(_appDelete = false) {
      }
    };
    (function(ErrorCode3) {
      ErrorCode3[ErrorCode3["NO_ERROR"] = 0] = "NO_ERROR";
      ErrorCode3[ErrorCode3["NETWORK_ERROR"] = 1] = "NETWORK_ERROR";
      ErrorCode3[ErrorCode3["ABORT"] = 2] = "ABORT";
    })(ErrorCode2 || (ErrorCode2 = {}));
    NetworkRequest = class {
      constructor(url_, method_, headers_, body_, successCodes_, additionalRetryCodes_, callback_, errorCallback_, timeout_, progressCallback_, connectionFactory_) {
        this.url_ = url_;
        this.method_ = method_;
        this.headers_ = headers_;
        this.body_ = body_;
        this.successCodes_ = successCodes_;
        this.additionalRetryCodes_ = additionalRetryCodes_;
        this.callback_ = callback_;
        this.errorCallback_ = errorCallback_;
        this.timeout_ = timeout_;
        this.progressCallback_ = progressCallback_;
        this.connectionFactory_ = connectionFactory_;
        this.pendingConnection_ = null;
        this.backoffId_ = null;
        this.canceled_ = false;
        this.appDelete_ = false;
        this.promise_ = new Promise((resolve2, reject) => {
          this.resolve_ = resolve2;
          this.reject_ = reject;
          this.start_();
        });
      }
      start_() {
        const doTheRequest = (backoffCallback, canceled2) => {
          if (canceled2) {
            backoffCallback(false, new RequestEndStatus(false, null, true));
            return;
          }
          const connection = this.connectionFactory_();
          this.pendingConnection_ = connection;
          const progressListener = (progressEvent) => {
            const loaded = progressEvent.loaded;
            const total = progressEvent.lengthComputable ? progressEvent.total : -1;
            if (this.progressCallback_ !== null) {
              this.progressCallback_(loaded, total);
            }
          };
          if (this.progressCallback_ !== null) {
            connection.addUploadProgressListener(progressListener);
          }
          connection.send(this.url_, this.method_, this.body_, this.headers_).then(() => {
            if (this.progressCallback_ !== null) {
              connection.removeUploadProgressListener(progressListener);
            }
            this.pendingConnection_ = null;
            const hitServer = connection.getErrorCode() === ErrorCode2.NO_ERROR;
            const status = connection.getStatus();
            if (!hitServer || this.isRetryStatusCode_(status)) {
              const wasCanceled = connection.getErrorCode() === ErrorCode2.ABORT;
              backoffCallback(false, new RequestEndStatus(false, null, wasCanceled));
              return;
            }
            const successCode = this.successCodes_.indexOf(status) !== -1;
            backoffCallback(true, new RequestEndStatus(successCode, connection));
          });
        };
        const backoffDone = (requestWentThrough, status) => {
          const resolve2 = this.resolve_;
          const reject = this.reject_;
          const connection = status.connection;
          if (status.wasSuccessCode) {
            try {
              const result = this.callback_(connection, connection.getResponse());
              if (isJustDef(result)) {
                resolve2(result);
              } else {
                resolve2();
              }
            } catch (e) {
              reject(e);
            }
          } else {
            if (connection !== null) {
              const err = unknown();
              err.serverResponse = connection.getErrorText();
              if (this.errorCallback_) {
                reject(this.errorCallback_(connection, err));
              } else {
                reject(err);
              }
            } else {
              if (status.canceled) {
                const err = this.appDelete_ ? appDeleted() : canceled();
                reject(err);
              } else {
                const err = retryLimitExceeded();
                reject(err);
              }
            }
          }
        };
        if (this.canceled_) {
          backoffDone(false, new RequestEndStatus(false, null, true));
        } else {
          this.backoffId_ = start(doTheRequest, backoffDone, this.timeout_);
        }
      }
      getPromise() {
        return this.promise_;
      }
      cancel(appDelete) {
        this.canceled_ = true;
        this.appDelete_ = appDelete || false;
        if (this.backoffId_ !== null) {
          stop(this.backoffId_);
        }
        if (this.pendingConnection_ !== null) {
          this.pendingConnection_.abort();
        }
      }
      isRetryStatusCode_(status) {
        const isFiveHundredCode = status >= 500 && status < 600;
        const extraRetryCodes = [
          408,
          429
        ];
        const isExtraRetryCode = extraRetryCodes.indexOf(status) !== -1;
        const isRequestSpecificRetryCode = this.additionalRetryCodes_.indexOf(status) !== -1;
        return isFiveHundredCode || isExtraRetryCode || isRequestSpecificRetryCode;
      }
    };
    RequestEndStatus = class {
      constructor(wasSuccessCode, connection, canceled2) {
        this.wasSuccessCode = wasSuccessCode;
        this.connection = connection;
        this.canceled = !!canceled2;
      }
    };
    RESUMABLE_UPLOAD_CHUNK_SIZE = 256 * 1024;
    Reference = class {
      constructor(_service, location) {
        this._service = _service;
        if (location instanceof Location) {
          this._location = location;
        } else {
          this._location = Location.makeFromUrl(location, _service.host);
        }
      }
      toString() {
        return "gs://" + this._location.bucket + "/" + this._location.path;
      }
      _newRef(service, location) {
        return new Reference(service, location);
      }
      get root() {
        const location = new Location(this._location.bucket, "");
        return this._newRef(this._service, location);
      }
      get bucket() {
        return this._location.bucket;
      }
      get fullPath() {
        return this._location.path;
      }
      get name() {
        return lastComponent(this._location.path);
      }
      get storage() {
        return this._service;
      }
      get parent() {
        const newPath = parent(this._location.path);
        if (newPath === null) {
          return null;
        }
        const location = new Location(this._location.bucket, newPath);
        return new Reference(this._service, location);
      }
      _throwIfRoot(name6) {
        if (this._location.path === "") {
          throw invalidRootOperation(name6);
        }
      }
    };
    FirebaseStorageImpl = class {
      constructor(app, _authProvider, _appCheckProvider, _url, _firebaseVersion) {
        this.app = app;
        this._authProvider = _authProvider;
        this._appCheckProvider = _appCheckProvider;
        this._url = _url;
        this._firebaseVersion = _firebaseVersion;
        this._bucket = null;
        this._host = DEFAULT_HOST;
        this._protocol = "https";
        this._appId = null;
        this._deleted = false;
        this._maxOperationRetryTime = DEFAULT_MAX_OPERATION_RETRY_TIME;
        this._maxUploadRetryTime = DEFAULT_MAX_UPLOAD_RETRY_TIME;
        this._requests = /* @__PURE__ */ new Set();
        if (_url != null) {
          this._bucket = Location.makeFromBucketSpec(_url, this._host);
        } else {
          this._bucket = extractBucket(this._host, this.app.options);
        }
      }
      get host() {
        return this._host;
      }
      set host(host) {
        this._host = host;
        if (this._url != null) {
          this._bucket = Location.makeFromBucketSpec(this._url, host);
        } else {
          this._bucket = extractBucket(host, this.app.options);
        }
      }
      get maxUploadRetryTime() {
        return this._maxUploadRetryTime;
      }
      set maxUploadRetryTime(time) {
        validateNumber(
          "time",
          0,
          Number.POSITIVE_INFINITY,
          time
        );
        this._maxUploadRetryTime = time;
      }
      get maxOperationRetryTime() {
        return this._maxOperationRetryTime;
      }
      set maxOperationRetryTime(time) {
        validateNumber(
          "time",
          0,
          Number.POSITIVE_INFINITY,
          time
        );
        this._maxOperationRetryTime = time;
      }
      async _getAuthToken() {
        if (this._overrideAuthToken) {
          return this._overrideAuthToken;
        }
        const auth = this._authProvider.getImmediate({ optional: true });
        if (auth) {
          const tokenData = await auth.getToken();
          if (tokenData !== null) {
            return tokenData.accessToken;
          }
        }
        return null;
      }
      async _getAppCheckToken() {
        const appCheck = this._appCheckProvider.getImmediate({ optional: true });
        if (appCheck) {
          const result = await appCheck.getToken();
          return result.token;
        }
        return null;
      }
      _delete() {
        if (!this._deleted) {
          this._deleted = true;
          this._requests.forEach((request) => request.cancel());
          this._requests.clear();
        }
        return Promise.resolve();
      }
      _makeStorageReference(loc) {
        return new Reference(this, loc);
      }
      _makeRequest(requestInfo, requestFactory, authToken, appCheckToken) {
        if (!this._deleted) {
          const request = makeRequest(requestInfo, this._appId, authToken, appCheckToken, requestFactory, this._firebaseVersion);
          this._requests.add(request);
          request.getPromise().then(() => this._requests.delete(request), () => this._requests.delete(request));
          return request;
        } else {
          return new FailRequest(appDeleted());
        }
      }
      async makeRequestWithTokens(requestInfo, requestFactory) {
        const [authToken, appCheckToken] = await Promise.all([
          this._getAuthToken(),
          this._getAppCheckToken()
        ]);
        return this._makeRequest(requestInfo, requestFactory, authToken, appCheckToken).getPromise();
      }
    };
    name3 = "@firebase/storage";
    version3 = "0.9.9";
    STORAGE_TYPE = "storage";
    registerStorage();
  }
});

// node_modules/firebase/storage/dist/index.esm.js
var init_index_esm3 = __esm({
  "node_modules/firebase/storage/dist/index.esm.js"() {
    init_index_esm20177();
  }
});

// node_modules/tslib/tslib.js
var require_tslib = __commonJS({
  "node_modules/tslib/tslib.js"(exports, module) {
    var __extends2;
    var __assign2;
    var __rest2;
    var __decorate2;
    var __param2;
    var __metadata2;
    var __awaiter2;
    var __generator2;
    var __exportStar2;
    var __values2;
    var __read2;
    var __spread2;
    var __spreadArrays2;
    var __spreadArray2;
    var __await2;
    var __asyncGenerator2;
    var __asyncDelegator2;
    var __asyncValues2;
    var __makeTemplateObject2;
    var __importStar2;
    var __importDefault2;
    var __classPrivateFieldGet2;
    var __classPrivateFieldSet2;
    var __classPrivateFieldIn2;
    var __createBinding2;
    (function(factory3) {
      var root = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : {};
      if (typeof define === "function" && define.amd) {
        define("tslib", ["exports"], function(exports2) {
          factory3(createExporter(root, createExporter(exports2)));
        });
      } else if (typeof module === "object" && typeof module.exports === "object") {
        factory3(createExporter(root, createExporter(module.exports)));
      } else {
        factory3(createExporter(root));
      }
      function createExporter(exports2, previous) {
        if (exports2 !== root) {
          if (typeof Object.create === "function") {
            Object.defineProperty(exports2, "__esModule", { value: true });
          } else {
            exports2.__esModule = true;
          }
        }
        return function(id2, v2) {
          return exports2[id2] = previous ? previous(id2, v2) : v2;
        };
      }
    })(function(exporter) {
      var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
        d.__proto__ = b;
      } || function(d, b) {
        for (var p2 in b)
          if (Object.prototype.hasOwnProperty.call(b, p2))
            d[p2] = b[p2];
      };
      __extends2 = function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
      __assign2 = Object.assign || function(t2) {
        for (var s2, i = 1, n = arguments.length; i < n; i++) {
          s2 = arguments[i];
          for (var p2 in s2)
            if (Object.prototype.hasOwnProperty.call(s2, p2))
              t2[p2] = s2[p2];
        }
        return t2;
      };
      __rest2 = function(s2, e) {
        var t2 = {};
        for (var p2 in s2)
          if (Object.prototype.hasOwnProperty.call(s2, p2) && e.indexOf(p2) < 0)
            t2[p2] = s2[p2];
        if (s2 != null && typeof Object.getOwnPropertySymbols === "function")
          for (var i = 0, p2 = Object.getOwnPropertySymbols(s2); i < p2.length; i++) {
            if (e.indexOf(p2[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p2[i]))
              t2[p2[i]] = s2[p2[i]];
          }
        return t2;
      };
      __decorate2 = function(decorators, target, key2, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key2) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key2, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key2, r) : d(target, key2)) || r;
        return c > 3 && r && Object.defineProperty(target, key2, r), r;
      };
      __param2 = function(paramIndex, decorator) {
        return function(target, key2) {
          decorator(target, key2, paramIndex);
        };
      };
      __metadata2 = function(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(metadataKey, metadataValue);
      };
      __awaiter2 = function(thisArg, _arguments, P2, generator) {
        function adopt(value) {
          return value instanceof P2 ? value : new P2(function(resolve2) {
            resolve2(value);
          });
        }
        return new (P2 || (P2 = Promise))(function(resolve2, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      __generator2 = function(thisArg, body) {
        var _ = { label: 0, sent: function() {
          if (t2[0] & 1)
            throw t2[1];
          return t2[1];
        }, trys: [], ops: [] }, f, y2, t2, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
          return this;
        }), g;
        function verb(n) {
          return function(v2) {
            return step([n, v2]);
          };
        }
        function step(op) {
          if (f)
            throw new TypeError("Generator is already executing.");
          while (_)
            try {
              if (f = 1, y2 && (t2 = op[0] & 2 ? y2["return"] : op[0] ? y2["throw"] || ((t2 = y2["return"]) && t2.call(y2), 0) : y2.next) && !(t2 = t2.call(y2, op[1])).done)
                return t2;
              if (y2 = 0, t2)
                op = [op[0] & 2, t2.value];
              switch (op[0]) {
                case 0:
                case 1:
                  t2 = op;
                  break;
                case 4:
                  _.label++;
                  return { value: op[1], done: false };
                case 5:
                  _.label++;
                  y2 = op[1];
                  op = [0];
                  continue;
                case 7:
                  op = _.ops.pop();
                  _.trys.pop();
                  continue;
                default:
                  if (!(t2 = _.trys, t2 = t2.length > 0 && t2[t2.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                    _ = 0;
                    continue;
                  }
                  if (op[0] === 3 && (!t2 || op[1] > t2[0] && op[1] < t2[3])) {
                    _.label = op[1];
                    break;
                  }
                  if (op[0] === 6 && _.label < t2[1]) {
                    _.label = t2[1];
                    t2 = op;
                    break;
                  }
                  if (t2 && _.label < t2[2]) {
                    _.label = t2[2];
                    _.ops.push(op);
                    break;
                  }
                  if (t2[2])
                    _.ops.pop();
                  _.trys.pop();
                  continue;
              }
              op = body.call(thisArg, _);
            } catch (e) {
              op = [6, e];
              y2 = 0;
            } finally {
              f = t2 = 0;
            }
          if (op[0] & 5)
            throw op[1];
          return { value: op[0] ? op[1] : void 0, done: true };
        }
      };
      __exportStar2 = function(m, o) {
        for (var p2 in m)
          if (p2 !== "default" && !Object.prototype.hasOwnProperty.call(o, p2))
            __createBinding2(o, m, p2);
      };
      __createBinding2 = Object.create ? function(o, m, k3, k22) {
        if (k22 === void 0)
          k22 = k3;
        var desc = Object.getOwnPropertyDescriptor(m, k3);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k3];
          } };
        }
        Object.defineProperty(o, k22, desc);
      } : function(o, m, k3, k22) {
        if (k22 === void 0)
          k22 = k3;
        o[k22] = m[k3];
      };
      __values2 = function(o) {
        var s2 = typeof Symbol === "function" && Symbol.iterator, m = s2 && o[s2], i = 0;
        if (m)
          return m.call(o);
        if (o && typeof o.length === "number")
          return {
            next: function() {
              if (o && i >= o.length)
                o = void 0;
              return { value: o && o[i++], done: !o };
            }
          };
        throw new TypeError(s2 ? "Object is not iterable." : "Symbol.iterator is not defined.");
      };
      __read2 = function(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
          return o;
        var i = m.call(o), r, ar = [], e;
        try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
            ar.push(r.value);
        } catch (error2) {
          e = { error: error2 };
        } finally {
          try {
            if (r && !r.done && (m = i["return"]))
              m.call(i);
          } finally {
            if (e)
              throw e.error;
          }
        }
        return ar;
      };
      __spread2 = function() {
        for (var ar = [], i = 0; i < arguments.length; i++)
          ar = ar.concat(__read2(arguments[i]));
        return ar;
      };
      __spreadArrays2 = function() {
        for (var s2 = 0, i = 0, il2 = arguments.length; i < il2; i++)
          s2 += arguments[i].length;
        for (var r = Array(s2), k3 = 0, i = 0; i < il2; i++)
          for (var a = arguments[i], j2 = 0, jl = a.length; j2 < jl; j2++, k3++)
            r[k3] = a[j2];
        return r;
      };
      __spreadArray2 = function(to, from, pack) {
        if (pack || arguments.length === 2)
          for (var i = 0, l2 = from.length, ar; i < l2; i++) {
            if (ar || !(i in from)) {
              if (!ar)
                ar = Array.prototype.slice.call(from, 0, i);
              ar[i] = from[i];
            }
          }
        return to.concat(ar || Array.prototype.slice.call(from));
      };
      __await2 = function(v2) {
        return this instanceof __await2 ? (this.v = v2, this) : new __await2(v2);
      };
      __asyncGenerator2 = function(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q2 = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
          return this;
        }, i;
        function verb(n) {
          if (g[n])
            i[n] = function(v2) {
              return new Promise(function(a, b) {
                q2.push([n, v2, a, b]) > 1 || resume(n, v2);
              });
            };
        }
        function resume(n, v2) {
          try {
            step(g[n](v2));
          } catch (e) {
            settle(q2[0][3], e);
          }
        }
        function step(r) {
          r.value instanceof __await2 ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q2[0][2], r);
        }
        function fulfill(value) {
          resume("next", value);
        }
        function reject(value) {
          resume("throw", value);
        }
        function settle(f, v2) {
          if (f(v2), q2.shift(), q2.length)
            resume(q2[0][0], q2[0][1]);
        }
      };
      __asyncDelegator2 = function(o) {
        var i, p2;
        return i = {}, verb("next"), verb("throw", function(e) {
          throw e;
        }), verb("return"), i[Symbol.iterator] = function() {
          return this;
        }, i;
        function verb(n, f) {
          i[n] = o[n] ? function(v2) {
            return (p2 = !p2) ? { value: __await2(o[n](v2)), done: n === "return" } : f ? f(v2) : v2;
          } : f;
        }
      };
      __asyncValues2 = function(o) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values2 === "function" ? __values2(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
          return this;
        }, i);
        function verb(n) {
          i[n] = o[n] && function(v2) {
            return new Promise(function(resolve2, reject) {
              v2 = o[n](v2), settle(resolve2, reject, v2.done, v2.value);
            });
          };
        }
        function settle(resolve2, reject, d, v2) {
          Promise.resolve(v2).then(function(v3) {
            resolve2({ value: v3, done: d });
          }, reject);
        }
      };
      __makeTemplateObject2 = function(cooked, raw) {
        if (Object.defineProperty) {
          Object.defineProperty(cooked, "raw", { value: raw });
        } else {
          cooked.raw = raw;
        }
        return cooked;
      };
      var __setModuleDefault = Object.create ? function(o, v2) {
        Object.defineProperty(o, "default", { enumerable: true, value: v2 });
      } : function(o, v2) {
        o["default"] = v2;
      };
      __importStar2 = function(mod) {
        if (mod && mod.__esModule)
          return mod;
        var result = {};
        if (mod != null) {
          for (var k3 in mod)
            if (k3 !== "default" && Object.prototype.hasOwnProperty.call(mod, k3))
              __createBinding2(result, mod, k3);
        }
        __setModuleDefault(result, mod);
        return result;
      };
      __importDefault2 = function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      __classPrivateFieldGet2 = function(receiver, state, kind, f) {
        if (kind === "a" && !f)
          throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
          throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
      };
      __classPrivateFieldSet2 = function(receiver, state, value, kind, f) {
        if (kind === "m")
          throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
          throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
          throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
      };
      __classPrivateFieldIn2 = function(state, receiver) {
        if (receiver === null || typeof receiver !== "object" && typeof receiver !== "function")
          throw new TypeError("Cannot use 'in' operator on non-object");
        return typeof state === "function" ? receiver === state : state.has(receiver);
      };
      exporter("__extends", __extends2);
      exporter("__assign", __assign2);
      exporter("__rest", __rest2);
      exporter("__decorate", __decorate2);
      exporter("__param", __param2);
      exporter("__metadata", __metadata2);
      exporter("__awaiter", __awaiter2);
      exporter("__generator", __generator2);
      exporter("__exportStar", __exportStar2);
      exporter("__createBinding", __createBinding2);
      exporter("__values", __values2);
      exporter("__read", __read2);
      exporter("__spread", __spread2);
      exporter("__spreadArrays", __spreadArrays2);
      exporter("__spreadArray", __spreadArray2);
      exporter("__await", __await2);
      exporter("__asyncGenerator", __asyncGenerator2);
      exporter("__asyncDelegator", __asyncDelegator2);
      exporter("__asyncValues", __asyncValues2);
      exporter("__makeTemplateObject", __makeTemplateObject2);
      exporter("__importStar", __importStar2);
      exporter("__importDefault", __importDefault2);
      exporter("__classPrivateFieldGet", __classPrivateFieldGet2);
      exporter("__classPrivateFieldSet", __classPrivateFieldSet2);
      exporter("__classPrivateFieldIn", __classPrivateFieldIn2);
    });
  }
});

// node_modules/tslib/modules/index.js
var import_tslib, __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __exportStar, __createBinding, __values, __read, __spread, __spreadArrays, __spreadArray, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault, __classPrivateFieldGet, __classPrivateFieldSet, __classPrivateFieldIn;
var init_modules = __esm({
  "node_modules/tslib/modules/index.js"() {
    import_tslib = __toESM(require_tslib(), 1);
    ({
      __extends,
      __assign,
      __rest,
      __decorate,
      __param,
      __metadata,
      __awaiter,
      __generator,
      __exportStar,
      __createBinding,
      __values,
      __read,
      __spread,
      __spreadArrays,
      __spreadArray,
      __await,
      __asyncGenerator,
      __asyncDelegator,
      __asyncValues,
      __makeTemplateObject,
      __importStar,
      __importDefault,
      __classPrivateFieldGet,
      __classPrivateFieldSet,
      __classPrivateFieldIn
    } = import_tslib.default);
  }
});

// node_modules/@firebase/auth/dist/esm2017/index-6bd8d405.js
function _prodErrorMap() {
  return {
    ["dependent-sdk-initialized-before-auth"]: "Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."
  };
}
function _logError(msg, ...args) {
  if (logClient.logLevel <= LogLevel.ERROR) {
    logClient.error(`Auth (${SDK_VERSION}): ${msg}`, ...args);
  }
}
function _fail(authOrCode, ...rest) {
  throw createErrorInternal(authOrCode, ...rest);
}
function _createError(authOrCode, ...rest) {
  return createErrorInternal(authOrCode, ...rest);
}
function _errorWithCustomMessage(auth, code, message) {
  const errorMap = Object.assign(Object.assign({}, prodErrorMap()), { [code]: message });
  const factory3 = new ErrorFactory("auth", "Firebase", errorMap);
  return factory3.create(code, {
    appName: auth.name
  });
}
function createErrorInternal(authOrCode, ...rest) {
  if (typeof authOrCode !== "string") {
    const code = rest[0];
    const fullParams = [...rest.slice(1)];
    if (fullParams[0]) {
      fullParams[0].appName = authOrCode.name;
    }
    return authOrCode._errorFactory.create(code, ...fullParams);
  }
  return _DEFAULT_AUTH_ERROR_FACTORY.create(authOrCode, ...rest);
}
function _assert(assertion, authOrCode, ...rest) {
  if (!assertion) {
    throw createErrorInternal(authOrCode, ...rest);
  }
}
function debugFail(failure) {
  const message = `INTERNAL ASSERTION FAILED: ` + failure;
  _logError(message);
  throw new Error(message);
}
function debugAssert(assertion, message) {
  if (!assertion) {
    debugFail(message);
  }
}
function _getInstance(cls) {
  debugAssert(cls instanceof Function, "Expected a class definition");
  let instance = instanceCache.get(cls);
  if (instance) {
    debugAssert(instance instanceof cls, "Instance stored in cache mismatched with class");
    return instance;
  }
  instance = new cls();
  instanceCache.set(cls, instance);
  return instance;
}
function initializeAuth(app, deps) {
  const provider = _getProvider(app, "auth");
  if (provider.isInitialized()) {
    const auth2 = provider.getImmediate();
    const initialOptions = provider.getOptions();
    if (deepEqual(initialOptions, deps !== null && deps !== void 0 ? deps : {})) {
      return auth2;
    } else {
      _fail(auth2, "already-initialized");
    }
  }
  const auth = provider.initialize({ options: deps });
  return auth;
}
function _initializeAuthInstance(auth, deps) {
  const persistence = (deps === null || deps === void 0 ? void 0 : deps.persistence) || [];
  const hierarchy = (Array.isArray(persistence) ? persistence : [persistence]).map(_getInstance);
  if (deps === null || deps === void 0 ? void 0 : deps.errorMap) {
    auth._updateErrorMap(deps.errorMap);
  }
  auth._initializeWithPersistence(hierarchy, deps === null || deps === void 0 ? void 0 : deps.popupRedirectResolver);
}
function _getCurrentUrl() {
  var _a;
  return typeof self !== "undefined" && ((_a = self.location) === null || _a === void 0 ? void 0 : _a.href) || "";
}
function _isHttpOrHttps() {
  return _getCurrentScheme() === "http:" || _getCurrentScheme() === "https:";
}
function _getCurrentScheme() {
  var _a;
  return typeof self !== "undefined" && ((_a = self.location) === null || _a === void 0 ? void 0 : _a.protocol) || null;
}
function _isOnline() {
  if (typeof navigator !== "undefined" && navigator && "onLine" in navigator && typeof navigator.onLine === "boolean" && (_isHttpOrHttps() || isBrowserExtension() || "connection" in navigator)) {
    return navigator.onLine;
  }
  return true;
}
function _getUserLanguage() {
  if (typeof navigator === "undefined") {
    return null;
  }
  const navigatorLanguage = navigator;
  return navigatorLanguage.languages && navigatorLanguage.languages[0] || navigatorLanguage.language || null;
}
function _emulatorUrl(config2, path) {
  debugAssert(config2.emulator, "Emulator should always be set here");
  const { url } = config2.emulator;
  if (!path) {
    return url;
  }
  return `${url}${path.startsWith("/") ? path.slice(1) : path}`;
}
function _addTidIfNecessary(auth, request) {
  if (auth.tenantId && !request.tenantId) {
    return Object.assign(Object.assign({}, request), { tenantId: auth.tenantId });
  }
  return request;
}
async function _performApiRequest(auth, method, path, request, customErrorMap = {}) {
  return _performFetchWithErrorHandling(auth, customErrorMap, async () => {
    let body = {};
    let params = {};
    if (request) {
      if (method === "GET") {
        params = request;
      } else {
        body = {
          body: JSON.stringify(request)
        };
      }
    }
    const query = querystring(Object.assign({ key: auth.config.apiKey }, params)).slice(1);
    const headers = await auth._getAdditionalHeaders();
    headers["Content-Type"] = "application/json";
    if (auth.languageCode) {
      headers["X-Firebase-Locale"] = auth.languageCode;
    }
    return FetchProvider.fetch()(_getFinalTarget(auth, auth.config.apiHost, path, query), Object.assign({
      method,
      headers,
      referrerPolicy: "no-referrer"
    }, body));
  });
}
async function _performFetchWithErrorHandling(auth, customErrorMap, fetchFn) {
  auth._canInitEmulator = false;
  const errorMap = Object.assign(Object.assign({}, SERVER_ERROR_MAP), customErrorMap);
  try {
    const networkTimeout = new NetworkTimeout(auth);
    const response = await Promise.race([
      fetchFn(),
      networkTimeout.promise
    ]);
    networkTimeout.clearNetworkTimeout();
    const json2 = await response.json();
    if ("needConfirmation" in json2) {
      throw _makeTaggedError(auth, "account-exists-with-different-credential", json2);
    }
    if (response.ok && !("errorMessage" in json2)) {
      return json2;
    } else {
      const errorMessage = response.ok ? json2.errorMessage : json2.error.message;
      const [serverErrorCode, serverErrorMessage] = errorMessage.split(" : ");
      if (serverErrorCode === "FEDERATED_USER_ID_ALREADY_LINKED") {
        throw _makeTaggedError(auth, "credential-already-in-use", json2);
      } else if (serverErrorCode === "EMAIL_EXISTS") {
        throw _makeTaggedError(auth, "email-already-in-use", json2);
      } else if (serverErrorCode === "USER_DISABLED") {
        throw _makeTaggedError(auth, "user-disabled", json2);
      }
      const authError = errorMap[serverErrorCode] || serverErrorCode.toLowerCase().replace(/[_\s]+/g, "-");
      if (serverErrorMessage) {
        throw _errorWithCustomMessage(auth, authError, serverErrorMessage);
      } else {
        _fail(auth, authError);
      }
    }
  } catch (e) {
    if (e instanceof FirebaseError) {
      throw e;
    }
    _fail(auth, "network-request-failed");
  }
}
async function _performSignInRequest(auth, method, path, request, customErrorMap = {}) {
  const serverResponse = await _performApiRequest(auth, method, path, request, customErrorMap);
  if ("mfaPendingCredential" in serverResponse) {
    _fail(auth, "multi-factor-auth-required", {
      _serverResponse: serverResponse
    });
  }
  return serverResponse;
}
function _getFinalTarget(auth, host, path, query) {
  const base2 = `${host}${path}?${query}`;
  if (!auth.config.emulator) {
    return `${auth.config.apiScheme}://${base2}`;
  }
  return _emulatorUrl(auth.config, base2);
}
function _makeTaggedError(auth, code, response) {
  const errorParams = {
    appName: auth.name
  };
  if (response.email) {
    errorParams.email = response.email;
  }
  if (response.phoneNumber) {
    errorParams.phoneNumber = response.phoneNumber;
  }
  const error2 = _createError(auth, code, errorParams);
  error2.customData._tokenResponse = response;
  return error2;
}
async function deleteAccount(auth, request) {
  return _performApiRequest(auth, "POST", "/v1/accounts:delete", request);
}
async function getAccountInfo(auth, request) {
  return _performApiRequest(auth, "POST", "/v1/accounts:lookup", request);
}
function utcTimestampToDateString(utcTimestamp) {
  if (!utcTimestamp) {
    return void 0;
  }
  try {
    const date = new Date(Number(utcTimestamp));
    if (!isNaN(date.getTime())) {
      return date.toUTCString();
    }
  } catch (e) {
  }
  return void 0;
}
async function getIdTokenResult(user, forceRefresh = false) {
  const userInternal = getModularInstance(user);
  const token = await userInternal.getIdToken(forceRefresh);
  const claims = _parseToken(token);
  _assert(claims && claims.exp && claims.auth_time && claims.iat, userInternal.auth, "internal-error");
  const firebase = typeof claims.firebase === "object" ? claims.firebase : void 0;
  const signInProvider = firebase === null || firebase === void 0 ? void 0 : firebase["sign_in_provider"];
  return {
    claims,
    token,
    authTime: utcTimestampToDateString(secondsStringToMilliseconds(claims.auth_time)),
    issuedAtTime: utcTimestampToDateString(secondsStringToMilliseconds(claims.iat)),
    expirationTime: utcTimestampToDateString(secondsStringToMilliseconds(claims.exp)),
    signInProvider: signInProvider || null,
    signInSecondFactor: (firebase === null || firebase === void 0 ? void 0 : firebase["sign_in_second_factor"]) || null
  };
}
function secondsStringToMilliseconds(seconds) {
  return Number(seconds) * 1e3;
}
function _parseToken(token) {
  var _a;
  const [algorithm, payload, signature] = token.split(".");
  if (algorithm === void 0 || payload === void 0 || signature === void 0) {
    _logError("JWT malformed, contained fewer than 3 sections");
    return null;
  }
  try {
    const decoded = base64Decode(payload);
    if (!decoded) {
      _logError("Failed to decode base64 JWT payload");
      return null;
    }
    return JSON.parse(decoded);
  } catch (e) {
    _logError("Caught error parsing JWT payload as JSON", (_a = e) === null || _a === void 0 ? void 0 : _a.toString());
    return null;
  }
}
function _tokenExpiresIn(token) {
  const parsedToken = _parseToken(token);
  _assert(parsedToken, "internal-error");
  _assert(typeof parsedToken.exp !== "undefined", "internal-error");
  _assert(typeof parsedToken.iat !== "undefined", "internal-error");
  return Number(parsedToken.exp) - Number(parsedToken.iat);
}
async function _logoutIfInvalidated(user, promise, bypassAuthState = false) {
  if (bypassAuthState) {
    return promise;
  }
  try {
    return await promise;
  } catch (e) {
    if (e instanceof FirebaseError && isUserInvalidated(e)) {
      if (user.auth.currentUser === user) {
        await user.auth.signOut();
      }
    }
    throw e;
  }
}
function isUserInvalidated({ code }) {
  return code === `auth/${"user-disabled"}` || code === `auth/${"user-token-expired"}`;
}
async function _reloadWithoutSaving(user) {
  var _a;
  const auth = user.auth;
  const idToken = await user.getIdToken();
  const response = await _logoutIfInvalidated(user, getAccountInfo(auth, { idToken }));
  _assert(response === null || response === void 0 ? void 0 : response.users.length, auth, "internal-error");
  const coreAccount = response.users[0];
  user._notifyReloadListener(coreAccount);
  const newProviderData = ((_a = coreAccount.providerUserInfo) === null || _a === void 0 ? void 0 : _a.length) ? extractProviderData(coreAccount.providerUserInfo) : [];
  const providerData = mergeProviderData(user.providerData, newProviderData);
  const oldIsAnonymous = user.isAnonymous;
  const newIsAnonymous = !(user.email && coreAccount.passwordHash) && !(providerData === null || providerData === void 0 ? void 0 : providerData.length);
  const isAnonymous = !oldIsAnonymous ? false : newIsAnonymous;
  const updates = {
    uid: coreAccount.localId,
    displayName: coreAccount.displayName || null,
    photoURL: coreAccount.photoUrl || null,
    email: coreAccount.email || null,
    emailVerified: coreAccount.emailVerified || false,
    phoneNumber: coreAccount.phoneNumber || null,
    tenantId: coreAccount.tenantId || null,
    providerData,
    metadata: new UserMetadata(coreAccount.createdAt, coreAccount.lastLoginAt),
    isAnonymous
  };
  Object.assign(user, updates);
}
async function reload(user) {
  const userInternal = getModularInstance(user);
  await _reloadWithoutSaving(userInternal);
  await userInternal.auth._persistUserIfCurrent(userInternal);
  userInternal.auth._notifyListenersIfCurrent(userInternal);
}
function mergeProviderData(original, newData) {
  const deduped = original.filter((o) => !newData.some((n) => n.providerId === o.providerId));
  return [...deduped, ...newData];
}
function extractProviderData(providers) {
  return providers.map((_a) => {
    var { providerId } = _a, provider = __rest(_a, ["providerId"]);
    return {
      providerId,
      uid: provider.rawId || "",
      displayName: provider.displayName || null,
      email: provider.email || null,
      phoneNumber: provider.phoneNumber || null,
      photoURL: provider.photoUrl || null
    };
  });
}
async function requestStsToken(auth, refreshToken) {
  const response = await _performFetchWithErrorHandling(auth, {}, async () => {
    const body = querystring({
      "grant_type": "refresh_token",
      "refresh_token": refreshToken
    }).slice(1);
    const { tokenApiHost, apiKey } = auth.config;
    const url = _getFinalTarget(auth, tokenApiHost, "/v1/token", `key=${apiKey}`);
    const headers = await auth._getAdditionalHeaders();
    headers["Content-Type"] = "application/x-www-form-urlencoded";
    return FetchProvider.fetch()(url, {
      method: "POST",
      headers,
      body
    });
  });
  return {
    accessToken: response.access_token,
    expiresIn: response.expires_in,
    refreshToken: response.refresh_token
  };
}
function assertStringOrUndefined(assertion, appName) {
  _assert(typeof assertion === "string" || typeof assertion === "undefined", "internal-error", { appName });
}
function _persistenceKeyName(key2, apiKey, appName) {
  return `${"firebase"}:${key2}:${apiKey}:${appName}`;
}
function _getBrowserName(userAgent) {
  const ua2 = userAgent.toLowerCase();
  if (ua2.includes("opera/") || ua2.includes("opr/") || ua2.includes("opios/")) {
    return "Opera";
  } else if (_isIEMobile(ua2)) {
    return "IEMobile";
  } else if (ua2.includes("msie") || ua2.includes("trident/")) {
    return "IE";
  } else if (ua2.includes("edge/")) {
    return "Edge";
  } else if (_isFirefox(ua2)) {
    return "Firefox";
  } else if (ua2.includes("silk/")) {
    return "Silk";
  } else if (_isBlackBerry(ua2)) {
    return "Blackberry";
  } else if (_isWebOS(ua2)) {
    return "Webos";
  } else if (_isSafari(ua2)) {
    return "Safari";
  } else if ((ua2.includes("chrome/") || _isChromeIOS(ua2)) && !ua2.includes("edge/")) {
    return "Chrome";
  } else if (_isAndroid(ua2)) {
    return "Android";
  } else {
    const re2 = /([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/;
    const matches = userAgent.match(re2);
    if ((matches === null || matches === void 0 ? void 0 : matches.length) === 2) {
      return matches[1];
    }
  }
  return "Other";
}
function _isFirefox(ua2 = getUA()) {
  return /firefox\//i.test(ua2);
}
function _isSafari(userAgent = getUA()) {
  const ua2 = userAgent.toLowerCase();
  return ua2.includes("safari/") && !ua2.includes("chrome/") && !ua2.includes("crios/") && !ua2.includes("android");
}
function _isChromeIOS(ua2 = getUA()) {
  return /crios\//i.test(ua2);
}
function _isIEMobile(ua2 = getUA()) {
  return /iemobile/i.test(ua2);
}
function _isAndroid(ua2 = getUA()) {
  return /android/i.test(ua2);
}
function _isBlackBerry(ua2 = getUA()) {
  return /blackberry/i.test(ua2);
}
function _isWebOS(ua2 = getUA()) {
  return /webos/i.test(ua2);
}
function _isIOS(ua2 = getUA()) {
  return /iphone|ipad|ipod/i.test(ua2) || /macintosh/i.test(ua2) && /mobile/i.test(ua2);
}
function _isIOSStandalone(ua2 = getUA()) {
  var _a;
  return _isIOS(ua2) && !!((_a = window.navigator) === null || _a === void 0 ? void 0 : _a.standalone);
}
function _isIE10() {
  return isIE() && document.documentMode === 10;
}
function _isMobileBrowser(ua2 = getUA()) {
  return _isIOS(ua2) || _isAndroid(ua2) || _isWebOS(ua2) || _isBlackBerry(ua2) || /windows phone/i.test(ua2) || _isIEMobile(ua2);
}
function _isIframe() {
  try {
    return !!(window && window !== window.top);
  } catch (e) {
    return false;
  }
}
function _getClientVersion(clientPlatform, frameworks = []) {
  let reportedPlatform;
  switch (clientPlatform) {
    case "Browser":
      reportedPlatform = _getBrowserName(getUA());
      break;
    case "Worker":
      reportedPlatform = `${_getBrowserName(getUA())}-${clientPlatform}`;
      break;
    default:
      reportedPlatform = clientPlatform;
  }
  const reportedFrameworks = frameworks.length ? frameworks.join(",") : "FirebaseCore-web";
  return `${reportedPlatform}/${"JsCore"}/${SDK_VERSION}/${reportedFrameworks}`;
}
function _castAuth(auth) {
  return getModularInstance(auth);
}
async function updateEmailPassword(auth, request) {
  return _performApiRequest(auth, "POST", "/v1/accounts:update", request);
}
async function signInWithPassword(auth, request) {
  return _performSignInRequest(auth, "POST", "/v1/accounts:signInWithPassword", _addTidIfNecessary(auth, request));
}
async function signInWithEmailLink$1(auth, request) {
  return _performSignInRequest(auth, "POST", "/v1/accounts:signInWithEmailLink", _addTidIfNecessary(auth, request));
}
async function signInWithEmailLinkForLinking(auth, request) {
  return _performSignInRequest(auth, "POST", "/v1/accounts:signInWithEmailLink", _addTidIfNecessary(auth, request));
}
async function signInWithIdp(auth, request) {
  return _performSignInRequest(auth, "POST", "/v1/accounts:signInWithIdp", _addTidIfNecessary(auth, request));
}
async function sendPhoneVerificationCode(auth, request) {
  return _performApiRequest(auth, "POST", "/v1/accounts:sendVerificationCode", _addTidIfNecessary(auth, request));
}
async function signInWithPhoneNumber$1(auth, request) {
  return _performSignInRequest(auth, "POST", "/v1/accounts:signInWithPhoneNumber", _addTidIfNecessary(auth, request));
}
async function linkWithPhoneNumber$1(auth, request) {
  const response = await _performSignInRequest(auth, "POST", "/v1/accounts:signInWithPhoneNumber", _addTidIfNecessary(auth, request));
  if (response.temporaryProof) {
    throw _makeTaggedError(auth, "account-exists-with-different-credential", response);
  }
  return response;
}
async function verifyPhoneNumberForExisting(auth, request) {
  const apiRequest = Object.assign(Object.assign({}, request), { operation: "REAUTH" });
  return _performSignInRequest(auth, "POST", "/v1/accounts:signInWithPhoneNumber", _addTidIfNecessary(auth, apiRequest), VERIFY_PHONE_NUMBER_FOR_EXISTING_ERROR_MAP_);
}
function parseMode(mode) {
  switch (mode) {
    case "recoverEmail":
      return "RECOVER_EMAIL";
    case "resetPassword":
      return "PASSWORD_RESET";
    case "signIn":
      return "EMAIL_SIGNIN";
    case "verifyEmail":
      return "VERIFY_EMAIL";
    case "verifyAndChangeEmail":
      return "VERIFY_AND_CHANGE_EMAIL";
    case "revertSecondFactorAddition":
      return "REVERT_SECOND_FACTOR_ADDITION";
    default:
      return null;
  }
}
function parseDeepLink(url) {
  const link = querystringDecode(extractQuerystring(url))["link"];
  const doubleDeepLink = link ? querystringDecode(extractQuerystring(link))["deep_link_id"] : null;
  const iOSDeepLink = querystringDecode(extractQuerystring(url))["deep_link_id"];
  const iOSDoubleDeepLink = iOSDeepLink ? querystringDecode(extractQuerystring(iOSDeepLink))["link"] : null;
  return iOSDoubleDeepLink || iOSDeepLink || doubleDeepLink || link || url;
}
function providerIdForResponse(response) {
  if (response.providerId) {
    return response.providerId;
  }
  if ("phoneNumber" in response) {
    return "phone";
  }
  return null;
}
function _processCredentialSavingMfaContextIfNecessary(auth, operationType, credential, user) {
  const idTokenProvider = operationType === "reauthenticate" ? credential._getReauthenticationResolver(auth) : credential._getIdTokenResponse(auth);
  return idTokenProvider.catch((error2) => {
    if (error2.code === `auth/${"multi-factor-auth-required"}`) {
      throw MultiFactorError._fromErrorAndOperation(auth, error2, operationType, user);
    }
    throw error2;
  });
}
async function _link$1(user, credential, bypassAuthState = false) {
  const response = await _logoutIfInvalidated(user, credential._linkToIdToken(user.auth, await user.getIdToken()), bypassAuthState);
  return UserCredentialImpl._forOperation(user, "link", response);
}
async function _reauthenticate(user, credential, bypassAuthState = false) {
  var _a;
  const { auth } = user;
  const operationType = "reauthenticate";
  try {
    const response = await _logoutIfInvalidated(user, _processCredentialSavingMfaContextIfNecessary(auth, operationType, credential, user), bypassAuthState);
    _assert(response.idToken, auth, "internal-error");
    const parsed = _parseToken(response.idToken);
    _assert(parsed, auth, "internal-error");
    const { sub: localId } = parsed;
    _assert(user.uid === localId, auth, "user-mismatch");
    return UserCredentialImpl._forOperation(user, operationType, response);
  } catch (e) {
    if (((_a = e) === null || _a === void 0 ? void 0 : _a.code) === `auth/${"user-not-found"}`) {
      _fail(auth, "user-mismatch");
    }
    throw e;
  }
}
async function _signInWithCredential(auth, credential, bypassAuthState = false) {
  const operationType = "signIn";
  const response = await _processCredentialSavingMfaContextIfNecessary(auth, operationType, credential);
  const userCredential = await UserCredentialImpl._fromIdTokenResponse(auth, operationType, response);
  if (!bypassAuthState) {
    await auth._updateCurrentUser(userCredential.user);
  }
  return userCredential;
}
function startEnrollPhoneMfa(auth, request) {
  return _performApiRequest(auth, "POST", "/v2/accounts/mfaEnrollment:start", _addTidIfNecessary(auth, request));
}
function finalizeEnrollPhoneMfa(auth, request) {
  return _performApiRequest(auth, "POST", "/v2/accounts/mfaEnrollment:finalize", _addTidIfNecessary(auth, request));
}
function _iframeCannotSyncWebStorage() {
  const ua2 = getUA();
  return _isSafari(ua2) || _isIOS(ua2);
}
function _allSettled(promises) {
  return Promise.all(promises.map(async (promise) => {
    try {
      const value = await promise;
      return {
        fulfilled: true,
        value
      };
    } catch (reason) {
      return {
        fulfilled: false,
        reason
      };
    }
  }));
}
function _generateEventId(prefix2 = "", digits = 10) {
  let random = "";
  for (let i = 0; i < digits; i++) {
    random += Math.floor(Math.random() * 10);
  }
  return prefix2 + random;
}
function _window() {
  return window;
}
function _setWindowLocation(url) {
  _window().location.href = url;
}
function _isWorker() {
  return typeof _window()["WorkerGlobalScope"] !== "undefined" && typeof _window()["importScripts"] === "function";
}
async function _getActiveServiceWorker() {
  if (!(navigator === null || navigator === void 0 ? void 0 : navigator.serviceWorker)) {
    return null;
  }
  try {
    const registration = await navigator.serviceWorker.ready;
    return registration.active;
  } catch (_a) {
    return null;
  }
}
function _getServiceWorkerController() {
  var _a;
  return ((_a = navigator === null || navigator === void 0 ? void 0 : navigator.serviceWorker) === null || _a === void 0 ? void 0 : _a.controller) || null;
}
function _getWorkerGlobalScope() {
  return _isWorker() ? self : null;
}
function getObjectStore(db3, isReadWrite) {
  return db3.transaction([DB_OBJECTSTORE_NAME], isReadWrite ? "readwrite" : "readonly").objectStore(DB_OBJECTSTORE_NAME);
}
function _deleteDatabase() {
  const request = indexedDB.deleteDatabase(DB_NAME2);
  return new DBPromise(request).toPromise();
}
function _openDatabase() {
  const request = indexedDB.open(DB_NAME2, DB_VERSION2);
  return new Promise((resolve2, reject) => {
    request.addEventListener("error", () => {
      reject(request.error);
    });
    request.addEventListener("upgradeneeded", () => {
      const db3 = request.result;
      try {
        db3.createObjectStore(DB_OBJECTSTORE_NAME, { keyPath: DB_DATA_KEYPATH });
      } catch (e) {
        reject(e);
      }
    });
    request.addEventListener("success", async () => {
      const db3 = request.result;
      if (!db3.objectStoreNames.contains(DB_OBJECTSTORE_NAME)) {
        db3.close();
        await _deleteDatabase();
        resolve2(await _openDatabase());
      } else {
        resolve2(db3);
      }
    });
  });
}
async function _putObject(db3, key2, value) {
  const request = getObjectStore(db3, true).put({
    [DB_DATA_KEYPATH]: key2,
    value
  });
  return new DBPromise(request).toPromise();
}
async function getObject(db3, key2) {
  const request = getObjectStore(db3, false).get(key2);
  const data = await new DBPromise(request).toPromise();
  return data === void 0 ? null : data.value;
}
function _deleteObject(db3, key2) {
  const request = getObjectStore(db3, true).delete(key2);
  return new DBPromise(request).toPromise();
}
function startSignInPhoneMfa(auth, request) {
  return _performApiRequest(auth, "POST", "/v2/accounts/mfaSignIn:start", _addTidIfNecessary(auth, request));
}
function finalizeSignInPhoneMfa(auth, request) {
  return _performApiRequest(auth, "POST", "/v2/accounts/mfaSignIn:finalize", _addTidIfNecessary(auth, request));
}
function getScriptParentElement() {
  var _a, _b;
  return (_b = (_a = document.getElementsByTagName("head")) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : document;
}
function _loadJS(url) {
  return new Promise((resolve2, reject) => {
    const el = document.createElement("script");
    el.setAttribute("src", url);
    el.onload = resolve2;
    el.onerror = (e) => {
      const error2 = _createError("internal-error");
      error2.customData = e;
      reject(error2);
    };
    el.type = "text/javascript";
    el.charset = "UTF-8";
    getScriptParentElement().appendChild(el);
  });
}
function _generateCallbackName(prefix2) {
  return `__${prefix2}${Math.floor(Math.random() * 1e6)}`;
}
async function _verifyPhoneNumber(auth, options, verifier) {
  var _a;
  const recaptchaToken = await verifier.verify();
  try {
    _assert(typeof recaptchaToken === "string", auth, "argument-error");
    _assert(verifier.type === RECAPTCHA_VERIFIER_TYPE, auth, "argument-error");
    let phoneInfoOptions;
    if (typeof options === "string") {
      phoneInfoOptions = {
        phoneNumber: options
      };
    } else {
      phoneInfoOptions = options;
    }
    if ("session" in phoneInfoOptions) {
      const session = phoneInfoOptions.session;
      if ("phoneNumber" in phoneInfoOptions) {
        _assert(session.type === "enroll", auth, "internal-error");
        const response = await startEnrollPhoneMfa(auth, {
          idToken: session.credential,
          phoneEnrollmentInfo: {
            phoneNumber: phoneInfoOptions.phoneNumber,
            recaptchaToken
          }
        });
        return response.phoneSessionInfo.sessionInfo;
      } else {
        _assert(session.type === "signin", auth, "internal-error");
        const mfaEnrollmentId = ((_a = phoneInfoOptions.multiFactorHint) === null || _a === void 0 ? void 0 : _a.uid) || phoneInfoOptions.multiFactorUid;
        _assert(mfaEnrollmentId, auth, "missing-multi-factor-info");
        const response = await startSignInPhoneMfa(auth, {
          mfaPendingCredential: session.credential,
          mfaEnrollmentId,
          phoneSignInInfo: {
            recaptchaToken
          }
        });
        return response.phoneResponseInfo.sessionInfo;
      }
    } else {
      const { sessionInfo } = await sendPhoneVerificationCode(auth, {
        phoneNumber: phoneInfoOptions.phoneNumber,
        recaptchaToken
      });
      return sessionInfo;
    }
  } finally {
    verifier._reset();
  }
}
function _withDefaultResolver(auth, resolverOverride) {
  if (resolverOverride) {
    return _getInstance(resolverOverride);
  }
  _assert(auth._popupRedirectResolver, auth, "argument-error");
  return auth._popupRedirectResolver;
}
function _signIn(params) {
  return _signInWithCredential(params.auth, new IdpCredential(params), params.bypassAuthState);
}
function _reauth(params) {
  const { auth, user } = params;
  _assert(user, auth, "internal-error");
  return _reauthenticate(user, new IdpCredential(params), params.bypassAuthState);
}
async function _link(params) {
  const { auth, user } = params;
  _assert(user, auth, "internal-error");
  return _link$1(user, new IdpCredential(params), params.bypassAuthState);
}
async function _getAndClearPendingRedirectStatus(resolver, auth) {
  const key2 = pendingRedirectKey(auth);
  const persistence = resolverPersistence(resolver);
  if (!await persistence._isAvailable()) {
    return false;
  }
  const hasPendingRedirect = await persistence._get(key2) === "true";
  await persistence._remove(key2);
  return hasPendingRedirect;
}
function _overrideRedirectResult(auth, result) {
  redirectOutcomeMap.set(auth._key(), result);
}
function resolverPersistence(resolver) {
  return _getInstance(resolver._redirectPersistence);
}
function pendingRedirectKey(auth) {
  return _persistenceKeyName(PENDING_REDIRECT_KEY, auth.config.apiKey, auth.name);
}
async function _getRedirectResult(auth, resolverExtern, bypassAuthState = false) {
  const authInternal = _castAuth(auth);
  const resolver = _withDefaultResolver(authInternal, resolverExtern);
  const action = new RedirectAction(authInternal, resolver, bypassAuthState);
  const result = await action.execute();
  if (result && !bypassAuthState) {
    delete result.user._redirectEventId;
    await authInternal._persistUserIfCurrent(result.user);
    await authInternal._setRedirectUser(null, resolverExtern);
  }
  return result;
}
function eventUid(e) {
  return [e.type, e.eventId, e.sessionId, e.tenantId].filter((v2) => v2).join("-");
}
function isNullRedirectEvent({ type, error: error2 }) {
  return type === "unknown" && (error2 === null || error2 === void 0 ? void 0 : error2.code) === `auth/${"no-auth-event"}`;
}
function isRedirectEvent(event2) {
  switch (event2.type) {
    case "signInViaRedirect":
    case "linkViaRedirect":
    case "reauthViaRedirect":
      return true;
    case "unknown":
      return isNullRedirectEvent(event2);
    default:
      return false;
  }
}
async function _getProjectConfig(auth, request = {}) {
  return _performApiRequest(auth, "GET", "/v1/projects", request);
}
async function _validateOrigin(auth) {
  if (auth.config.emulator) {
    return;
  }
  const { authorizedDomains } = await _getProjectConfig(auth);
  for (const domain of authorizedDomains) {
    try {
      if (matchDomain(domain)) {
        return;
      }
    } catch (_a) {
    }
  }
  _fail(auth, "unauthorized-domain");
}
function matchDomain(expected) {
  const currentUrl = _getCurrentUrl();
  const { protocol, hostname } = new URL(currentUrl);
  if (expected.startsWith("chrome-extension://")) {
    const ceUrl = new URL(expected);
    if (ceUrl.hostname === "" && hostname === "") {
      return protocol === "chrome-extension:" && expected.replace("chrome-extension://", "") === currentUrl.replace("chrome-extension://", "");
    }
    return protocol === "chrome-extension:" && ceUrl.hostname === hostname;
  }
  if (!HTTP_REGEX.test(protocol)) {
    return false;
  }
  if (IP_ADDRESS_REGEX.test(expected)) {
    return hostname === expected;
  }
  const escapedDomainPattern = expected.replace(/\./g, "\\.");
  const re2 = new RegExp("^(.+\\." + escapedDomainPattern + "|" + escapedDomainPattern + ")$", "i");
  return re2.test(hostname);
}
function resetUnloadedGapiModules() {
  const beacon = _window().___jsl;
  if (beacon === null || beacon === void 0 ? void 0 : beacon.H) {
    for (const hint of Object.keys(beacon.H)) {
      beacon.H[hint].r = beacon.H[hint].r || [];
      beacon.H[hint].L = beacon.H[hint].L || [];
      beacon.H[hint].r = [...beacon.H[hint].L];
      if (beacon.CP) {
        for (let i = 0; i < beacon.CP.length; i++) {
          beacon.CP[i] = null;
        }
      }
    }
  }
}
function loadGapi(auth) {
  return new Promise((resolve2, reject) => {
    var _a, _b, _c2;
    function loadGapiIframe() {
      resetUnloadedGapiModules();
      gapi.load("gapi.iframes", {
        callback: () => {
          resolve2(gapi.iframes.getContext());
        },
        ontimeout: () => {
          resetUnloadedGapiModules();
          reject(_createError(auth, "network-request-failed"));
        },
        timeout: NETWORK_TIMEOUT.get()
      });
    }
    if ((_b = (_a = _window().gapi) === null || _a === void 0 ? void 0 : _a.iframes) === null || _b === void 0 ? void 0 : _b.Iframe) {
      resolve2(gapi.iframes.getContext());
    } else if (!!((_c2 = _window().gapi) === null || _c2 === void 0 ? void 0 : _c2.load)) {
      loadGapiIframe();
    } else {
      const cbName = _generateCallbackName("iframefcb");
      _window()[cbName] = () => {
        if (!!gapi.load) {
          loadGapiIframe();
        } else {
          reject(_createError(auth, "network-request-failed"));
        }
      };
      return _loadJS(`https://apis.google.com/js/api.js?onload=${cbName}`).catch((e) => reject(e));
    }
  }).catch((error2) => {
    cachedGApiLoader = null;
    throw error2;
  });
}
function _loadGapi(auth) {
  cachedGApiLoader = cachedGApiLoader || loadGapi(auth);
  return cachedGApiLoader;
}
function getIframeUrl(auth) {
  const config2 = auth.config;
  _assert(config2.authDomain, auth, "auth-domain-config-required");
  const url = config2.emulator ? _emulatorUrl(config2, EMULATED_IFRAME_PATH) : `https://${auth.config.authDomain}/${IFRAME_PATH}`;
  const params = {
    apiKey: config2.apiKey,
    appName: auth.name,
    v: SDK_VERSION
  };
  const eid = EID_FROM_APIHOST.get(auth.config.apiHost);
  if (eid) {
    params.eid = eid;
  }
  const frameworks = auth._getFrameworks();
  if (frameworks.length) {
    params.fw = frameworks.join(",");
  }
  return `${url}?${querystring(params).slice(1)}`;
}
async function _openIframe(auth) {
  const context = await _loadGapi(auth);
  const gapi2 = _window().gapi;
  _assert(gapi2, auth, "internal-error");
  return context.open({
    where: document.body,
    url: getIframeUrl(auth),
    messageHandlersFilter: gapi2.iframes.CROSS_ORIGIN_IFRAMES_FILTER,
    attributes: IFRAME_ATTRIBUTES,
    dontclear: true
  }, (iframe) => new Promise(async (resolve2, reject) => {
    await iframe.restyle({
      setHideOnLeave: false
    });
    const networkError = _createError(auth, "network-request-failed");
    const networkErrorTimer = _window().setTimeout(() => {
      reject(networkError);
    }, PING_TIMEOUT.get());
    function clearTimerAndResolve() {
      _window().clearTimeout(networkErrorTimer);
      resolve2(iframe);
    }
    iframe.ping(clearTimerAndResolve).then(clearTimerAndResolve, () => {
      reject(networkError);
    });
  }));
}
function _open(auth, url, name6, width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT) {
  const top = Math.max((window.screen.availHeight - height) / 2, 0).toString();
  const left = Math.max((window.screen.availWidth - width) / 2, 0).toString();
  let target = "";
  const options = Object.assign(Object.assign({}, BASE_POPUP_OPTIONS), {
    width: width.toString(),
    height: height.toString(),
    top,
    left
  });
  const ua2 = getUA().toLowerCase();
  if (name6) {
    target = _isChromeIOS(ua2) ? TARGET_BLANK : name6;
  }
  if (_isFirefox(ua2)) {
    url = url || FIREFOX_EMPTY_URL;
    options.scrollbars = "yes";
  }
  const optionsString = Object.entries(options).reduce((accum, [key2, value]) => `${accum}${key2}=${value},`, "");
  if (_isIOSStandalone(ua2) && target !== "_self") {
    openAsNewWindowIOS(url || "", target);
    return new AuthPopup(null);
  }
  const newWin = window.open(url || "", target, optionsString);
  _assert(newWin, auth, "popup-blocked");
  try {
    newWin.focus();
  } catch (e) {
  }
  return new AuthPopup(newWin);
}
function openAsNewWindowIOS(url, target) {
  const el = document.createElement("a");
  el.href = url;
  el.target = target;
  const click = document.createEvent("MouseEvent");
  click.initMouseEvent("click", true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 1, null);
  el.dispatchEvent(click);
}
function _getRedirectUrl(auth, provider, authType, redirectUrl, eventId, additionalParams) {
  _assert(auth.config.authDomain, auth, "auth-domain-config-required");
  _assert(auth.config.apiKey, auth, "invalid-api-key");
  const params = {
    apiKey: auth.config.apiKey,
    appName: auth.name,
    authType,
    redirectUrl,
    v: SDK_VERSION,
    eventId
  };
  if (provider instanceof FederatedAuthProvider) {
    provider.setDefaultLanguage(auth.languageCode);
    params.providerId = provider.providerId || "";
    if (!isEmpty(provider.getCustomParameters())) {
      params.customParameters = JSON.stringify(provider.getCustomParameters());
    }
    for (const [key2, value] of Object.entries(additionalParams || {})) {
      params[key2] = value;
    }
  }
  if (provider instanceof BaseOAuthProvider) {
    const scopes = provider.getScopes().filter((scope) => scope !== "");
    if (scopes.length > 0) {
      params.scopes = scopes.join(",");
    }
  }
  if (auth.tenantId) {
    params.tid = auth.tenantId;
  }
  const paramsDict = params;
  for (const key2 of Object.keys(paramsDict)) {
    if (paramsDict[key2] === void 0) {
      delete paramsDict[key2];
    }
  }
  return `${getHandlerBase(auth)}?${querystring(paramsDict).slice(1)}`;
}
function getHandlerBase({ config: config2 }) {
  if (!config2.emulator) {
    return `https://${config2.authDomain}/${WIDGET_PATH}`;
  }
  return _emulatorUrl(config2, EMULATOR_WIDGET_PATH);
}
function getVersionForPlatform(clientPlatform) {
  switch (clientPlatform) {
    case "Node":
      return "node";
    case "ReactNative":
      return "rn";
    case "Worker":
      return "webworker";
    case "Cordova":
      return "cordova";
    default:
      return void 0;
  }
}
function registerAuth(clientPlatform) {
  _registerComponent(new Component("auth", (container, { options: deps }) => {
    const app = container.getProvider("app").getImmediate();
    const heartbeatServiceProvider = container.getProvider("heartbeat");
    const { apiKey, authDomain } = app.options;
    return ((app2, heartbeatServiceProvider2) => {
      _assert(apiKey && !apiKey.includes(":"), "invalid-api-key", { appName: app2.name });
      _assert(!(authDomain === null || authDomain === void 0 ? void 0 : authDomain.includes(":")), "argument-error", {
        appName: app2.name
      });
      const config2 = {
        apiKey,
        authDomain,
        clientPlatform,
        apiHost: "identitytoolkit.googleapis.com",
        tokenApiHost: "securetoken.googleapis.com",
        apiScheme: "https",
        sdkClientVersion: _getClientVersion(clientPlatform)
      };
      const authInstance = new AuthImpl(app2, heartbeatServiceProvider2, config2);
      _initializeAuthInstance(authInstance, deps);
      return authInstance;
    })(app, heartbeatServiceProvider);
  }, "PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((container, _instanceIdentifier, _instance) => {
    const authInternalProvider = container.getProvider("auth-internal");
    authInternalProvider.initialize();
  }));
  _registerComponent(new Component("auth-internal", (container) => {
    const auth = _castAuth(container.getProvider("auth").getImmediate());
    return ((auth2) => new AuthInterop(auth2))(auth);
  }, "PRIVATE").setInstantiationMode("EXPLICIT"));
  registerVersion(name4, version4, getVersionForPlatform(clientPlatform));
  registerVersion(name4, version4, "esm2017");
}
function getAuth(app = getApp()) {
  const provider = _getProvider(app, "auth");
  if (provider.isInitialized()) {
    return provider.getImmediate();
  }
  return initializeAuth(app, {
    popupRedirectResolver: browserPopupRedirectResolver,
    persistence: [
      indexedDBLocalPersistence,
      browserLocalPersistence,
      browserSessionPersistence
    ]
  });
}
var prodErrorMap, _DEFAULT_AUTH_ERROR_FACTORY, logClient, instanceCache, Delay, FetchProvider, SERVER_ERROR_MAP, DEFAULT_API_TIMEOUT_MS, NetworkTimeout, ProactiveRefresh, UserMetadata, StsTokenManager, UserImpl, InMemoryPersistence, inMemoryPersistence, PersistenceUserManager, AuthMiddlewareQueue, AuthImpl, Subscription, AuthCredential, EmailAuthCredential, IDP_REQUEST_URI$1, OAuthCredential, VERIFY_PHONE_NUMBER_FOR_EXISTING_ERROR_MAP_, PhoneAuthCredential, ActionCodeURL, EmailAuthProvider, FederatedAuthProvider, BaseOAuthProvider, FacebookAuthProvider, GoogleAuthProvider, GithubAuthProvider, TwitterAuthProvider, UserCredentialImpl, MultiFactorError, STORAGE_AVAILABLE_KEY, BrowserPersistenceClass, _POLLING_INTERVAL_MS$1, IE10_LOCAL_STORAGE_SYNC_DELAY, BrowserLocalPersistence, browserLocalPersistence, BrowserSessionPersistence, browserSessionPersistence, Receiver, Sender, DB_NAME2, DB_VERSION2, DB_OBJECTSTORE_NAME, DB_DATA_KEYPATH, DBPromise, _POLLING_INTERVAL_MS, _TRANSACTION_RETRY_COUNT, IndexedDBLocalPersistence, indexedDBLocalPersistence, _JSLOAD_CALLBACK, NETWORK_TIMEOUT_DELAY, RECAPTCHA_VERIFIER_TYPE, PhoneAuthProvider, IdpCredential, AbstractPopupRedirectOperation, _POLL_WINDOW_CLOSE_TIMEOUT, PopupOperation, PENDING_REDIRECT_KEY, redirectOutcomeMap, RedirectAction, EVENT_DUPLICATION_CACHE_DURATION_MS, AuthEventManager, IP_ADDRESS_REGEX, HTTP_REGEX, NETWORK_TIMEOUT, cachedGApiLoader, PING_TIMEOUT, IFRAME_PATH, EMULATED_IFRAME_PATH, IFRAME_ATTRIBUTES, EID_FROM_APIHOST, BASE_POPUP_OPTIONS, DEFAULT_WIDTH, DEFAULT_HEIGHT, TARGET_BLANK, FIREFOX_EMPTY_URL, AuthPopup, WIDGET_PATH, EMULATOR_WIDGET_PATH, WEB_STORAGE_SUPPORT_KEY, BrowserPopupRedirectResolver, browserPopupRedirectResolver, MultiFactorAssertionImpl, PhoneMultiFactorAssertionImpl, PhoneMultiFactorGenerator, name4, version4, AuthInterop;
var init_index_6bd8d405 = __esm({
  "node_modules/@firebase/auth/dist/esm2017/index-6bd8d405.js"() {
    init_index_esm2017();
    init_index_esm20174();
    init_modules();
    init_index_esm20173();
    init_index_esm20172();
    prodErrorMap = _prodErrorMap;
    _DEFAULT_AUTH_ERROR_FACTORY = new ErrorFactory("auth", "Firebase", _prodErrorMap());
    logClient = new Logger("@firebase/auth");
    instanceCache = /* @__PURE__ */ new Map();
    Delay = class {
      constructor(shortDelay, longDelay) {
        this.shortDelay = shortDelay;
        this.longDelay = longDelay;
        debugAssert(longDelay > shortDelay, "Short delay should be less than long delay!");
        this.isMobile = isMobileCordova() || isReactNative();
      }
      get() {
        if (!_isOnline()) {
          return Math.min(5e3, this.shortDelay);
        }
        return this.isMobile ? this.longDelay : this.shortDelay;
      }
    };
    FetchProvider = class {
      static initialize(fetchImpl, headersImpl, responseImpl) {
        this.fetchImpl = fetchImpl;
        if (headersImpl) {
          this.headersImpl = headersImpl;
        }
        if (responseImpl) {
          this.responseImpl = responseImpl;
        }
      }
      static fetch() {
        if (this.fetchImpl) {
          return this.fetchImpl;
        }
        if (typeof self !== "undefined" && "fetch" in self) {
          return self.fetch;
        }
        debugFail("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill");
      }
      static headers() {
        if (this.headersImpl) {
          return this.headersImpl;
        }
        if (typeof self !== "undefined" && "Headers" in self) {
          return self.Headers;
        }
        debugFail("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill");
      }
      static response() {
        if (this.responseImpl) {
          return this.responseImpl;
        }
        if (typeof self !== "undefined" && "Response" in self) {
          return self.Response;
        }
        debugFail("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill");
      }
    };
    SERVER_ERROR_MAP = {
      ["CREDENTIAL_MISMATCH"]: "custom-token-mismatch",
      ["MISSING_CUSTOM_TOKEN"]: "internal-error",
      ["INVALID_IDENTIFIER"]: "invalid-email",
      ["MISSING_CONTINUE_URI"]: "internal-error",
      ["INVALID_PASSWORD"]: "wrong-password",
      ["MISSING_PASSWORD"]: "internal-error",
      ["EMAIL_EXISTS"]: "email-already-in-use",
      ["PASSWORD_LOGIN_DISABLED"]: "operation-not-allowed",
      ["INVALID_IDP_RESPONSE"]: "invalid-credential",
      ["INVALID_PENDING_TOKEN"]: "invalid-credential",
      ["FEDERATED_USER_ID_ALREADY_LINKED"]: "credential-already-in-use",
      ["MISSING_REQ_TYPE"]: "internal-error",
      ["EMAIL_NOT_FOUND"]: "user-not-found",
      ["RESET_PASSWORD_EXCEED_LIMIT"]: "too-many-requests",
      ["EXPIRED_OOB_CODE"]: "expired-action-code",
      ["INVALID_OOB_CODE"]: "invalid-action-code",
      ["MISSING_OOB_CODE"]: "internal-error",
      ["CREDENTIAL_TOO_OLD_LOGIN_AGAIN"]: "requires-recent-login",
      ["INVALID_ID_TOKEN"]: "invalid-user-token",
      ["TOKEN_EXPIRED"]: "user-token-expired",
      ["USER_NOT_FOUND"]: "user-token-expired",
      ["TOO_MANY_ATTEMPTS_TRY_LATER"]: "too-many-requests",
      ["INVALID_CODE"]: "invalid-verification-code",
      ["INVALID_SESSION_INFO"]: "invalid-verification-id",
      ["INVALID_TEMPORARY_PROOF"]: "invalid-credential",
      ["MISSING_SESSION_INFO"]: "missing-verification-id",
      ["SESSION_EXPIRED"]: "code-expired",
      ["MISSING_ANDROID_PACKAGE_NAME"]: "missing-android-pkg-name",
      ["UNAUTHORIZED_DOMAIN"]: "unauthorized-continue-uri",
      ["INVALID_OAUTH_CLIENT_ID"]: "invalid-oauth-client-id",
      ["ADMIN_ONLY_OPERATION"]: "admin-restricted-operation",
      ["INVALID_MFA_PENDING_CREDENTIAL"]: "invalid-multi-factor-session",
      ["MFA_ENROLLMENT_NOT_FOUND"]: "multi-factor-info-not-found",
      ["MISSING_MFA_ENROLLMENT_ID"]: "missing-multi-factor-info",
      ["MISSING_MFA_PENDING_CREDENTIAL"]: "missing-multi-factor-session",
      ["SECOND_FACTOR_EXISTS"]: "second-factor-already-in-use",
      ["SECOND_FACTOR_LIMIT_EXCEEDED"]: "maximum-second-factor-count-exceeded",
      ["BLOCKING_FUNCTION_ERROR_RESPONSE"]: "internal-error"
    };
    DEFAULT_API_TIMEOUT_MS = new Delay(3e4, 6e4);
    NetworkTimeout = class {
      constructor(auth) {
        this.auth = auth;
        this.timer = null;
        this.promise = new Promise((_, reject) => {
          this.timer = setTimeout(() => {
            return reject(_createError(this.auth, "network-request-failed"));
          }, DEFAULT_API_TIMEOUT_MS.get());
        });
      }
      clearNetworkTimeout() {
        clearTimeout(this.timer);
      }
    };
    ProactiveRefresh = class {
      constructor(user) {
        this.user = user;
        this.isRunning = false;
        this.timerId = null;
        this.errorBackoff = 3e4;
      }
      _start() {
        if (this.isRunning) {
          return;
        }
        this.isRunning = true;
        this.schedule();
      }
      _stop() {
        if (!this.isRunning) {
          return;
        }
        this.isRunning = false;
        if (this.timerId !== null) {
          clearTimeout(this.timerId);
        }
      }
      getInterval(wasError) {
        var _a;
        if (wasError) {
          const interval = this.errorBackoff;
          this.errorBackoff = Math.min(this.errorBackoff * 2, 96e4);
          return interval;
        } else {
          this.errorBackoff = 3e4;
          const expTime = (_a = this.user.stsTokenManager.expirationTime) !== null && _a !== void 0 ? _a : 0;
          const interval = expTime - Date.now() - 3e5;
          return Math.max(0, interval);
        }
      }
      schedule(wasError = false) {
        if (!this.isRunning) {
          return;
        }
        const interval = this.getInterval(wasError);
        this.timerId = setTimeout(async () => {
          await this.iteration();
        }, interval);
      }
      async iteration() {
        var _a;
        try {
          await this.user.getIdToken(true);
        } catch (e) {
          if (((_a = e) === null || _a === void 0 ? void 0 : _a.code) === `auth/${"network-request-failed"}`) {
            this.schedule(true);
          }
          return;
        }
        this.schedule();
      }
    };
    UserMetadata = class {
      constructor(createdAt, lastLoginAt) {
        this.createdAt = createdAt;
        this.lastLoginAt = lastLoginAt;
        this._initializeTime();
      }
      _initializeTime() {
        this.lastSignInTime = utcTimestampToDateString(this.lastLoginAt);
        this.creationTime = utcTimestampToDateString(this.createdAt);
      }
      _copy(metadata) {
        this.createdAt = metadata.createdAt;
        this.lastLoginAt = metadata.lastLoginAt;
        this._initializeTime();
      }
      toJSON() {
        return {
          createdAt: this.createdAt,
          lastLoginAt: this.lastLoginAt
        };
      }
    };
    StsTokenManager = class {
      constructor() {
        this.refreshToken = null;
        this.accessToken = null;
        this.expirationTime = null;
      }
      get isExpired() {
        return !this.expirationTime || Date.now() > this.expirationTime - 3e4;
      }
      updateFromServerResponse(response) {
        _assert(response.idToken, "internal-error");
        _assert(typeof response.idToken !== "undefined", "internal-error");
        _assert(typeof response.refreshToken !== "undefined", "internal-error");
        const expiresIn = "expiresIn" in response && typeof response.expiresIn !== "undefined" ? Number(response.expiresIn) : _tokenExpiresIn(response.idToken);
        this.updateTokensAndExpiration(response.idToken, response.refreshToken, expiresIn);
      }
      async getToken(auth, forceRefresh = false) {
        _assert(!this.accessToken || this.refreshToken, auth, "user-token-expired");
        if (!forceRefresh && this.accessToken && !this.isExpired) {
          return this.accessToken;
        }
        if (this.refreshToken) {
          await this.refresh(auth, this.refreshToken);
          return this.accessToken;
        }
        return null;
      }
      clearRefreshToken() {
        this.refreshToken = null;
      }
      async refresh(auth, oldToken) {
        const { accessToken, refreshToken, expiresIn } = await requestStsToken(auth, oldToken);
        this.updateTokensAndExpiration(accessToken, refreshToken, Number(expiresIn));
      }
      updateTokensAndExpiration(accessToken, refreshToken, expiresInSec) {
        this.refreshToken = refreshToken || null;
        this.accessToken = accessToken || null;
        this.expirationTime = Date.now() + expiresInSec * 1e3;
      }
      static fromJSON(appName, object) {
        const { refreshToken, accessToken, expirationTime } = object;
        const manager = new StsTokenManager();
        if (refreshToken) {
          _assert(typeof refreshToken === "string", "internal-error", {
            appName
          });
          manager.refreshToken = refreshToken;
        }
        if (accessToken) {
          _assert(typeof accessToken === "string", "internal-error", {
            appName
          });
          manager.accessToken = accessToken;
        }
        if (expirationTime) {
          _assert(typeof expirationTime === "number", "internal-error", {
            appName
          });
          manager.expirationTime = expirationTime;
        }
        return manager;
      }
      toJSON() {
        return {
          refreshToken: this.refreshToken,
          accessToken: this.accessToken,
          expirationTime: this.expirationTime
        };
      }
      _assign(stsTokenManager) {
        this.accessToken = stsTokenManager.accessToken;
        this.refreshToken = stsTokenManager.refreshToken;
        this.expirationTime = stsTokenManager.expirationTime;
      }
      _clone() {
        return Object.assign(new StsTokenManager(), this.toJSON());
      }
      _performRefresh() {
        return debugFail("not implemented");
      }
    };
    UserImpl = class {
      constructor(_a) {
        var { uid, auth, stsTokenManager } = _a, opt = __rest(_a, ["uid", "auth", "stsTokenManager"]);
        this.providerId = "firebase";
        this.proactiveRefresh = new ProactiveRefresh(this);
        this.reloadUserInfo = null;
        this.reloadListener = null;
        this.uid = uid;
        this.auth = auth;
        this.stsTokenManager = stsTokenManager;
        this.accessToken = stsTokenManager.accessToken;
        this.displayName = opt.displayName || null;
        this.email = opt.email || null;
        this.emailVerified = opt.emailVerified || false;
        this.phoneNumber = opt.phoneNumber || null;
        this.photoURL = opt.photoURL || null;
        this.isAnonymous = opt.isAnonymous || false;
        this.tenantId = opt.tenantId || null;
        this.providerData = opt.providerData ? [...opt.providerData] : [];
        this.metadata = new UserMetadata(opt.createdAt || void 0, opt.lastLoginAt || void 0);
      }
      async getIdToken(forceRefresh) {
        const accessToken = await _logoutIfInvalidated(this, this.stsTokenManager.getToken(this.auth, forceRefresh));
        _assert(accessToken, this.auth, "internal-error");
        if (this.accessToken !== accessToken) {
          this.accessToken = accessToken;
          await this.auth._persistUserIfCurrent(this);
          this.auth._notifyListenersIfCurrent(this);
        }
        return accessToken;
      }
      getIdTokenResult(forceRefresh) {
        return getIdTokenResult(this, forceRefresh);
      }
      reload() {
        return reload(this);
      }
      _assign(user) {
        if (this === user) {
          return;
        }
        _assert(this.uid === user.uid, this.auth, "internal-error");
        this.displayName = user.displayName;
        this.photoURL = user.photoURL;
        this.email = user.email;
        this.emailVerified = user.emailVerified;
        this.phoneNumber = user.phoneNumber;
        this.isAnonymous = user.isAnonymous;
        this.tenantId = user.tenantId;
        this.providerData = user.providerData.map((userInfo) => Object.assign({}, userInfo));
        this.metadata._copy(user.metadata);
        this.stsTokenManager._assign(user.stsTokenManager);
      }
      _clone(auth) {
        return new UserImpl(Object.assign(Object.assign({}, this), { auth, stsTokenManager: this.stsTokenManager._clone() }));
      }
      _onReload(callback) {
        _assert(!this.reloadListener, this.auth, "internal-error");
        this.reloadListener = callback;
        if (this.reloadUserInfo) {
          this._notifyReloadListener(this.reloadUserInfo);
          this.reloadUserInfo = null;
        }
      }
      _notifyReloadListener(userInfo) {
        if (this.reloadListener) {
          this.reloadListener(userInfo);
        } else {
          this.reloadUserInfo = userInfo;
        }
      }
      _startProactiveRefresh() {
        this.proactiveRefresh._start();
      }
      _stopProactiveRefresh() {
        this.proactiveRefresh._stop();
      }
      async _updateTokensIfNecessary(response, reload2 = false) {
        let tokensRefreshed = false;
        if (response.idToken && response.idToken !== this.stsTokenManager.accessToken) {
          this.stsTokenManager.updateFromServerResponse(response);
          tokensRefreshed = true;
        }
        if (reload2) {
          await _reloadWithoutSaving(this);
        }
        await this.auth._persistUserIfCurrent(this);
        if (tokensRefreshed) {
          this.auth._notifyListenersIfCurrent(this);
        }
      }
      async delete() {
        const idToken = await this.getIdToken();
        await _logoutIfInvalidated(this, deleteAccount(this.auth, { idToken }));
        this.stsTokenManager.clearRefreshToken();
        return this.auth.signOut();
      }
      toJSON() {
        return Object.assign(Object.assign({
          uid: this.uid,
          email: this.email || void 0,
          emailVerified: this.emailVerified,
          displayName: this.displayName || void 0,
          isAnonymous: this.isAnonymous,
          photoURL: this.photoURL || void 0,
          phoneNumber: this.phoneNumber || void 0,
          tenantId: this.tenantId || void 0,
          providerData: this.providerData.map((userInfo) => Object.assign({}, userInfo)),
          stsTokenManager: this.stsTokenManager.toJSON(),
          _redirectEventId: this._redirectEventId
        }, this.metadata.toJSON()), {
          apiKey: this.auth.config.apiKey,
          appName: this.auth.name
        });
      }
      get refreshToken() {
        return this.stsTokenManager.refreshToken || "";
      }
      static _fromJSON(auth, object) {
        var _a, _b, _c2, _d, _e2, _f, _g, _h;
        const displayName = (_a = object.displayName) !== null && _a !== void 0 ? _a : void 0;
        const email = (_b = object.email) !== null && _b !== void 0 ? _b : void 0;
        const phoneNumber = (_c2 = object.phoneNumber) !== null && _c2 !== void 0 ? _c2 : void 0;
        const photoURL = (_d = object.photoURL) !== null && _d !== void 0 ? _d : void 0;
        const tenantId = (_e2 = object.tenantId) !== null && _e2 !== void 0 ? _e2 : void 0;
        const _redirectEventId = (_f = object._redirectEventId) !== null && _f !== void 0 ? _f : void 0;
        const createdAt = (_g = object.createdAt) !== null && _g !== void 0 ? _g : void 0;
        const lastLoginAt = (_h = object.lastLoginAt) !== null && _h !== void 0 ? _h : void 0;
        const { uid, emailVerified, isAnonymous, providerData, stsTokenManager: plainObjectTokenManager } = object;
        _assert(uid && plainObjectTokenManager, auth, "internal-error");
        const stsTokenManager = StsTokenManager.fromJSON(this.name, plainObjectTokenManager);
        _assert(typeof uid === "string", auth, "internal-error");
        assertStringOrUndefined(displayName, auth.name);
        assertStringOrUndefined(email, auth.name);
        _assert(typeof emailVerified === "boolean", auth, "internal-error");
        _assert(typeof isAnonymous === "boolean", auth, "internal-error");
        assertStringOrUndefined(phoneNumber, auth.name);
        assertStringOrUndefined(photoURL, auth.name);
        assertStringOrUndefined(tenantId, auth.name);
        assertStringOrUndefined(_redirectEventId, auth.name);
        assertStringOrUndefined(createdAt, auth.name);
        assertStringOrUndefined(lastLoginAt, auth.name);
        const user = new UserImpl({
          uid,
          auth,
          email,
          emailVerified,
          displayName,
          isAnonymous,
          photoURL,
          phoneNumber,
          tenantId,
          stsTokenManager,
          createdAt,
          lastLoginAt
        });
        if (providerData && Array.isArray(providerData)) {
          user.providerData = providerData.map((userInfo) => Object.assign({}, userInfo));
        }
        if (_redirectEventId) {
          user._redirectEventId = _redirectEventId;
        }
        return user;
      }
      static async _fromIdTokenResponse(auth, idTokenResponse, isAnonymous = false) {
        const stsTokenManager = new StsTokenManager();
        stsTokenManager.updateFromServerResponse(idTokenResponse);
        const user = new UserImpl({
          uid: idTokenResponse.localId,
          auth,
          stsTokenManager,
          isAnonymous
        });
        await _reloadWithoutSaving(user);
        return user;
      }
    };
    InMemoryPersistence = class {
      constructor() {
        this.type = "NONE";
        this.storage = {};
      }
      async _isAvailable() {
        return true;
      }
      async _set(key2, value) {
        this.storage[key2] = value;
      }
      async _get(key2) {
        const value = this.storage[key2];
        return value === void 0 ? null : value;
      }
      async _remove(key2) {
        delete this.storage[key2];
      }
      _addListener(_key, _listener) {
        return;
      }
      _removeListener(_key, _listener) {
        return;
      }
    };
    InMemoryPersistence.type = "NONE";
    inMemoryPersistence = InMemoryPersistence;
    PersistenceUserManager = class {
      constructor(persistence, auth, userKey) {
        this.persistence = persistence;
        this.auth = auth;
        this.userKey = userKey;
        const { config: config2, name: name6 } = this.auth;
        this.fullUserKey = _persistenceKeyName(this.userKey, config2.apiKey, name6);
        this.fullPersistenceKey = _persistenceKeyName("persistence", config2.apiKey, name6);
        this.boundEventHandler = auth._onStorageEvent.bind(auth);
        this.persistence._addListener(this.fullUserKey, this.boundEventHandler);
      }
      setCurrentUser(user) {
        return this.persistence._set(this.fullUserKey, user.toJSON());
      }
      async getCurrentUser() {
        const blob = await this.persistence._get(this.fullUserKey);
        return blob ? UserImpl._fromJSON(this.auth, blob) : null;
      }
      removeCurrentUser() {
        return this.persistence._remove(this.fullUserKey);
      }
      savePersistenceForRedirect() {
        return this.persistence._set(this.fullPersistenceKey, this.persistence.type);
      }
      async setPersistence(newPersistence) {
        if (this.persistence === newPersistence) {
          return;
        }
        const currentUser = await this.getCurrentUser();
        await this.removeCurrentUser();
        this.persistence = newPersistence;
        if (currentUser) {
          return this.setCurrentUser(currentUser);
        }
      }
      delete() {
        this.persistence._removeListener(this.fullUserKey, this.boundEventHandler);
      }
      static async create(auth, persistenceHierarchy, userKey = "authUser") {
        if (!persistenceHierarchy.length) {
          return new PersistenceUserManager(_getInstance(inMemoryPersistence), auth, userKey);
        }
        const availablePersistences = (await Promise.all(persistenceHierarchy.map(async (persistence) => {
          if (await persistence._isAvailable()) {
            return persistence;
          }
          return void 0;
        }))).filter((persistence) => persistence);
        let selectedPersistence = availablePersistences[0] || _getInstance(inMemoryPersistence);
        const key2 = _persistenceKeyName(userKey, auth.config.apiKey, auth.name);
        let userToMigrate = null;
        for (const persistence of persistenceHierarchy) {
          try {
            const blob = await persistence._get(key2);
            if (blob) {
              const user = UserImpl._fromJSON(auth, blob);
              if (persistence !== selectedPersistence) {
                userToMigrate = user;
              }
              selectedPersistence = persistence;
              break;
            }
          } catch (_a) {
          }
        }
        const migrationHierarchy = availablePersistences.filter((p2) => p2._shouldAllowMigration);
        if (!selectedPersistence._shouldAllowMigration || !migrationHierarchy.length) {
          return new PersistenceUserManager(selectedPersistence, auth, userKey);
        }
        selectedPersistence = migrationHierarchy[0];
        if (userToMigrate) {
          await selectedPersistence._set(key2, userToMigrate.toJSON());
        }
        await Promise.all(persistenceHierarchy.map(async (persistence) => {
          if (persistence !== selectedPersistence) {
            try {
              await persistence._remove(key2);
            } catch (_a) {
            }
          }
        }));
        return new PersistenceUserManager(selectedPersistence, auth, userKey);
      }
    };
    AuthMiddlewareQueue = class {
      constructor(auth) {
        this.auth = auth;
        this.queue = [];
      }
      pushCallback(callback, onAbort) {
        const wrappedCallback = (user) => new Promise((resolve2, reject) => {
          try {
            const result = callback(user);
            resolve2(result);
          } catch (e) {
            reject(e);
          }
        });
        wrappedCallback.onAbort = onAbort;
        this.queue.push(wrappedCallback);
        const index16 = this.queue.length - 1;
        return () => {
          this.queue[index16] = () => Promise.resolve();
        };
      }
      async runMiddleware(nextUser) {
        var _a;
        if (this.auth.currentUser === nextUser) {
          return;
        }
        const onAbortStack = [];
        try {
          for (const beforeStateCallback of this.queue) {
            await beforeStateCallback(nextUser);
            if (beforeStateCallback.onAbort) {
              onAbortStack.push(beforeStateCallback.onAbort);
            }
          }
        } catch (e) {
          onAbortStack.reverse();
          for (const onAbort of onAbortStack) {
            try {
              onAbort();
            } catch (_) {
            }
          }
          throw this.auth._errorFactory.create("login-blocked", {
            originalMessage: (_a = e) === null || _a === void 0 ? void 0 : _a.message
          });
        }
      }
    };
    AuthImpl = class {
      constructor(app, heartbeatServiceProvider, config2) {
        this.app = app;
        this.heartbeatServiceProvider = heartbeatServiceProvider;
        this.config = config2;
        this.currentUser = null;
        this.emulatorConfig = null;
        this.operations = Promise.resolve();
        this.authStateSubscription = new Subscription(this);
        this.idTokenSubscription = new Subscription(this);
        this.beforeStateQueue = new AuthMiddlewareQueue(this);
        this.redirectUser = null;
        this.isProactiveRefreshEnabled = false;
        this._canInitEmulator = true;
        this._isInitialized = false;
        this._deleted = false;
        this._initializationPromise = null;
        this._popupRedirectResolver = null;
        this._errorFactory = _DEFAULT_AUTH_ERROR_FACTORY;
        this.lastNotifiedUid = void 0;
        this.languageCode = null;
        this.tenantId = null;
        this.settings = { appVerificationDisabledForTesting: false };
        this.frameworks = [];
        this.name = app.name;
        this.clientVersion = config2.sdkClientVersion;
      }
      _initializeWithPersistence(persistenceHierarchy, popupRedirectResolver) {
        if (popupRedirectResolver) {
          this._popupRedirectResolver = _getInstance(popupRedirectResolver);
        }
        this._initializationPromise = this.queue(async () => {
          var _a, _b;
          if (this._deleted) {
            return;
          }
          this.persistenceManager = await PersistenceUserManager.create(this, persistenceHierarchy);
          if (this._deleted) {
            return;
          }
          if ((_a = this._popupRedirectResolver) === null || _a === void 0 ? void 0 : _a._shouldInitProactively) {
            try {
              await this._popupRedirectResolver._initialize(this);
            } catch (e) {
            }
          }
          await this.initializeCurrentUser(popupRedirectResolver);
          this.lastNotifiedUid = ((_b = this.currentUser) === null || _b === void 0 ? void 0 : _b.uid) || null;
          if (this._deleted) {
            return;
          }
          this._isInitialized = true;
        });
        return this._initializationPromise;
      }
      async _onStorageEvent() {
        if (this._deleted) {
          return;
        }
        const user = await this.assertedPersistence.getCurrentUser();
        if (!this.currentUser && !user) {
          return;
        }
        if (this.currentUser && user && this.currentUser.uid === user.uid) {
          this._currentUser._assign(user);
          await this.currentUser.getIdToken();
          return;
        }
        await this._updateCurrentUser(user, true);
      }
      async initializeCurrentUser(popupRedirectResolver) {
        var _a;
        const previouslyStoredUser = await this.assertedPersistence.getCurrentUser();
        let futureCurrentUser = previouslyStoredUser;
        let needsTocheckMiddleware = false;
        if (popupRedirectResolver && this.config.authDomain) {
          await this.getOrInitRedirectPersistenceManager();
          const redirectUserEventId = (_a = this.redirectUser) === null || _a === void 0 ? void 0 : _a._redirectEventId;
          const storedUserEventId = futureCurrentUser === null || futureCurrentUser === void 0 ? void 0 : futureCurrentUser._redirectEventId;
          const result = await this.tryRedirectSignIn(popupRedirectResolver);
          if ((!redirectUserEventId || redirectUserEventId === storedUserEventId) && (result === null || result === void 0 ? void 0 : result.user)) {
            futureCurrentUser = result.user;
            needsTocheckMiddleware = true;
          }
        }
        if (!futureCurrentUser) {
          return this.directlySetCurrentUser(null);
        }
        if (!futureCurrentUser._redirectEventId) {
          if (needsTocheckMiddleware) {
            try {
              await this.beforeStateQueue.runMiddleware(futureCurrentUser);
            } catch (e) {
              futureCurrentUser = previouslyStoredUser;
              this._popupRedirectResolver._overrideRedirectResult(this, () => Promise.reject(e));
            }
          }
          if (futureCurrentUser) {
            return this.reloadAndSetCurrentUserOrClear(futureCurrentUser);
          } else {
            return this.directlySetCurrentUser(null);
          }
        }
        _assert(this._popupRedirectResolver, this, "argument-error");
        await this.getOrInitRedirectPersistenceManager();
        if (this.redirectUser && this.redirectUser._redirectEventId === futureCurrentUser._redirectEventId) {
          return this.directlySetCurrentUser(futureCurrentUser);
        }
        return this.reloadAndSetCurrentUserOrClear(futureCurrentUser);
      }
      async tryRedirectSignIn(redirectResolver) {
        let result = null;
        try {
          result = await this._popupRedirectResolver._completeRedirectFn(this, redirectResolver, true);
        } catch (e) {
          await this._setRedirectUser(null);
        }
        return result;
      }
      async reloadAndSetCurrentUserOrClear(user) {
        var _a;
        try {
          await _reloadWithoutSaving(user);
        } catch (e) {
          if (((_a = e) === null || _a === void 0 ? void 0 : _a.code) !== `auth/${"network-request-failed"}`) {
            return this.directlySetCurrentUser(null);
          }
        }
        return this.directlySetCurrentUser(user);
      }
      useDeviceLanguage() {
        this.languageCode = _getUserLanguage();
      }
      async _delete() {
        this._deleted = true;
      }
      async updateCurrentUser(userExtern) {
        const user = userExtern ? getModularInstance(userExtern) : null;
        if (user) {
          _assert(user.auth.config.apiKey === this.config.apiKey, this, "invalid-user-token");
        }
        return this._updateCurrentUser(user && user._clone(this));
      }
      async _updateCurrentUser(user, skipBeforeStateCallbacks = false) {
        if (this._deleted) {
          return;
        }
        if (user) {
          _assert(this.tenantId === user.tenantId, this, "tenant-id-mismatch");
        }
        if (!skipBeforeStateCallbacks) {
          await this.beforeStateQueue.runMiddleware(user);
        }
        return this.queue(async () => {
          await this.directlySetCurrentUser(user);
          this.notifyAuthListeners();
        });
      }
      async signOut() {
        await this.beforeStateQueue.runMiddleware(null);
        if (this.redirectPersistenceManager || this._popupRedirectResolver) {
          await this._setRedirectUser(null);
        }
        return this._updateCurrentUser(null, true);
      }
      setPersistence(persistence) {
        return this.queue(async () => {
          await this.assertedPersistence.setPersistence(_getInstance(persistence));
        });
      }
      _getPersistence() {
        return this.assertedPersistence.persistence.type;
      }
      _updateErrorMap(errorMap) {
        this._errorFactory = new ErrorFactory("auth", "Firebase", errorMap());
      }
      onAuthStateChanged(nextOrObserver, error2, completed) {
        return this.registerStateListener(this.authStateSubscription, nextOrObserver, error2, completed);
      }
      beforeAuthStateChanged(callback, onAbort) {
        return this.beforeStateQueue.pushCallback(callback, onAbort);
      }
      onIdTokenChanged(nextOrObserver, error2, completed) {
        return this.registerStateListener(this.idTokenSubscription, nextOrObserver, error2, completed);
      }
      toJSON() {
        var _a;
        return {
          apiKey: this.config.apiKey,
          authDomain: this.config.authDomain,
          appName: this.name,
          currentUser: (_a = this._currentUser) === null || _a === void 0 ? void 0 : _a.toJSON()
        };
      }
      async _setRedirectUser(user, popupRedirectResolver) {
        const redirectManager = await this.getOrInitRedirectPersistenceManager(popupRedirectResolver);
        return user === null ? redirectManager.removeCurrentUser() : redirectManager.setCurrentUser(user);
      }
      async getOrInitRedirectPersistenceManager(popupRedirectResolver) {
        if (!this.redirectPersistenceManager) {
          const resolver = popupRedirectResolver && _getInstance(popupRedirectResolver) || this._popupRedirectResolver;
          _assert(resolver, this, "argument-error");
          this.redirectPersistenceManager = await PersistenceUserManager.create(this, [_getInstance(resolver._redirectPersistence)], "redirectUser");
          this.redirectUser = await this.redirectPersistenceManager.getCurrentUser();
        }
        return this.redirectPersistenceManager;
      }
      async _redirectUserForId(id2) {
        var _a, _b;
        if (this._isInitialized) {
          await this.queue(async () => {
          });
        }
        if (((_a = this._currentUser) === null || _a === void 0 ? void 0 : _a._redirectEventId) === id2) {
          return this._currentUser;
        }
        if (((_b = this.redirectUser) === null || _b === void 0 ? void 0 : _b._redirectEventId) === id2) {
          return this.redirectUser;
        }
        return null;
      }
      async _persistUserIfCurrent(user) {
        if (user === this.currentUser) {
          return this.queue(async () => this.directlySetCurrentUser(user));
        }
      }
      _notifyListenersIfCurrent(user) {
        if (user === this.currentUser) {
          this.notifyAuthListeners();
        }
      }
      _key() {
        return `${this.config.authDomain}:${this.config.apiKey}:${this.name}`;
      }
      _startProactiveRefresh() {
        this.isProactiveRefreshEnabled = true;
        if (this.currentUser) {
          this._currentUser._startProactiveRefresh();
        }
      }
      _stopProactiveRefresh() {
        this.isProactiveRefreshEnabled = false;
        if (this.currentUser) {
          this._currentUser._stopProactiveRefresh();
        }
      }
      get _currentUser() {
        return this.currentUser;
      }
      notifyAuthListeners() {
        var _a, _b;
        if (!this._isInitialized) {
          return;
        }
        this.idTokenSubscription.next(this.currentUser);
        const currentUid = (_b = (_a = this.currentUser) === null || _a === void 0 ? void 0 : _a.uid) !== null && _b !== void 0 ? _b : null;
        if (this.lastNotifiedUid !== currentUid) {
          this.lastNotifiedUid = currentUid;
          this.authStateSubscription.next(this.currentUser);
        }
      }
      registerStateListener(subscription, nextOrObserver, error2, completed) {
        if (this._deleted) {
          return () => {
          };
        }
        const cb2 = typeof nextOrObserver === "function" ? nextOrObserver : nextOrObserver.next.bind(nextOrObserver);
        const promise = this._isInitialized ? Promise.resolve() : this._initializationPromise;
        _assert(promise, this, "internal-error");
        promise.then(() => cb2(this.currentUser));
        if (typeof nextOrObserver === "function") {
          return subscription.addObserver(nextOrObserver, error2, completed);
        } else {
          return subscription.addObserver(nextOrObserver);
        }
      }
      async directlySetCurrentUser(user) {
        if (this.currentUser && this.currentUser !== user) {
          this._currentUser._stopProactiveRefresh();
        }
        if (user && this.isProactiveRefreshEnabled) {
          user._startProactiveRefresh();
        }
        this.currentUser = user;
        if (user) {
          await this.assertedPersistence.setCurrentUser(user);
        } else {
          await this.assertedPersistence.removeCurrentUser();
        }
      }
      queue(action) {
        this.operations = this.operations.then(action, action);
        return this.operations;
      }
      get assertedPersistence() {
        _assert(this.persistenceManager, this, "internal-error");
        return this.persistenceManager;
      }
      _logFramework(framework) {
        if (!framework || this.frameworks.includes(framework)) {
          return;
        }
        this.frameworks.push(framework);
        this.frameworks.sort();
        this.clientVersion = _getClientVersion(this.config.clientPlatform, this._getFrameworks());
      }
      _getFrameworks() {
        return this.frameworks;
      }
      async _getAdditionalHeaders() {
        var _a;
        const headers = {
          ["X-Client-Version"]: this.clientVersion
        };
        if (this.app.options.appId) {
          headers["X-Firebase-gmpid"] = this.app.options.appId;
        }
        const heartbeatsHeader = await ((_a = this.heartbeatServiceProvider.getImmediate({
          optional: true
        })) === null || _a === void 0 ? void 0 : _a.getHeartbeatsHeader());
        if (heartbeatsHeader) {
          headers["X-Firebase-Client"] = heartbeatsHeader;
        }
        return headers;
      }
    };
    Subscription = class {
      constructor(auth) {
        this.auth = auth;
        this.observer = null;
        this.addObserver = createSubscribe((observer) => this.observer = observer);
      }
      get next() {
        _assert(this.observer, this.auth, "internal-error");
        return this.observer.next.bind(this.observer);
      }
    };
    AuthCredential = class {
      constructor(providerId, signInMethod) {
        this.providerId = providerId;
        this.signInMethod = signInMethod;
      }
      toJSON() {
        return debugFail("not implemented");
      }
      _getIdTokenResponse(_auth) {
        return debugFail("not implemented");
      }
      _linkToIdToken(_auth, _idToken) {
        return debugFail("not implemented");
      }
      _getReauthenticationResolver(_auth) {
        return debugFail("not implemented");
      }
    };
    EmailAuthCredential = class extends AuthCredential {
      constructor(_email, _password, signInMethod, _tenantId = null) {
        super("password", signInMethod);
        this._email = _email;
        this._password = _password;
        this._tenantId = _tenantId;
      }
      static _fromEmailAndPassword(email, password) {
        return new EmailAuthCredential(email, password, "password");
      }
      static _fromEmailAndCode(email, oobCode, tenantId = null) {
        return new EmailAuthCredential(email, oobCode, "emailLink", tenantId);
      }
      toJSON() {
        return {
          email: this._email,
          password: this._password,
          signInMethod: this.signInMethod,
          tenantId: this._tenantId
        };
      }
      static fromJSON(json2) {
        const obj = typeof json2 === "string" ? JSON.parse(json2) : json2;
        if ((obj === null || obj === void 0 ? void 0 : obj.email) && (obj === null || obj === void 0 ? void 0 : obj.password)) {
          if (obj.signInMethod === "password") {
            return this._fromEmailAndPassword(obj.email, obj.password);
          } else if (obj.signInMethod === "emailLink") {
            return this._fromEmailAndCode(obj.email, obj.password, obj.tenantId);
          }
        }
        return null;
      }
      async _getIdTokenResponse(auth) {
        switch (this.signInMethod) {
          case "password":
            return signInWithPassword(auth, {
              returnSecureToken: true,
              email: this._email,
              password: this._password
            });
          case "emailLink":
            return signInWithEmailLink$1(auth, {
              email: this._email,
              oobCode: this._password
            });
          default:
            _fail(auth, "internal-error");
        }
      }
      async _linkToIdToken(auth, idToken) {
        switch (this.signInMethod) {
          case "password":
            return updateEmailPassword(auth, {
              idToken,
              returnSecureToken: true,
              email: this._email,
              password: this._password
            });
          case "emailLink":
            return signInWithEmailLinkForLinking(auth, {
              idToken,
              email: this._email,
              oobCode: this._password
            });
          default:
            _fail(auth, "internal-error");
        }
      }
      _getReauthenticationResolver(auth) {
        return this._getIdTokenResponse(auth);
      }
    };
    IDP_REQUEST_URI$1 = "http://localhost";
    OAuthCredential = class extends AuthCredential {
      constructor() {
        super(...arguments);
        this.pendingToken = null;
      }
      static _fromParams(params) {
        const cred = new OAuthCredential(params.providerId, params.signInMethod);
        if (params.idToken || params.accessToken) {
          if (params.idToken) {
            cred.idToken = params.idToken;
          }
          if (params.accessToken) {
            cred.accessToken = params.accessToken;
          }
          if (params.nonce && !params.pendingToken) {
            cred.nonce = params.nonce;
          }
          if (params.pendingToken) {
            cred.pendingToken = params.pendingToken;
          }
        } else if (params.oauthToken && params.oauthTokenSecret) {
          cred.accessToken = params.oauthToken;
          cred.secret = params.oauthTokenSecret;
        } else {
          _fail("argument-error");
        }
        return cred;
      }
      toJSON() {
        return {
          idToken: this.idToken,
          accessToken: this.accessToken,
          secret: this.secret,
          nonce: this.nonce,
          pendingToken: this.pendingToken,
          providerId: this.providerId,
          signInMethod: this.signInMethod
        };
      }
      static fromJSON(json2) {
        const obj = typeof json2 === "string" ? JSON.parse(json2) : json2;
        const { providerId, signInMethod } = obj, rest = __rest(obj, ["providerId", "signInMethod"]);
        if (!providerId || !signInMethod) {
          return null;
        }
        const cred = new OAuthCredential(providerId, signInMethod);
        cred.idToken = rest.idToken || void 0;
        cred.accessToken = rest.accessToken || void 0;
        cred.secret = rest.secret;
        cred.nonce = rest.nonce;
        cred.pendingToken = rest.pendingToken || null;
        return cred;
      }
      _getIdTokenResponse(auth) {
        const request = this.buildRequest();
        return signInWithIdp(auth, request);
      }
      _linkToIdToken(auth, idToken) {
        const request = this.buildRequest();
        request.idToken = idToken;
        return signInWithIdp(auth, request);
      }
      _getReauthenticationResolver(auth) {
        const request = this.buildRequest();
        request.autoCreate = false;
        return signInWithIdp(auth, request);
      }
      buildRequest() {
        const request = {
          requestUri: IDP_REQUEST_URI$1,
          returnSecureToken: true
        };
        if (this.pendingToken) {
          request.pendingToken = this.pendingToken;
        } else {
          const postBody = {};
          if (this.idToken) {
            postBody["id_token"] = this.idToken;
          }
          if (this.accessToken) {
            postBody["access_token"] = this.accessToken;
          }
          if (this.secret) {
            postBody["oauth_token_secret"] = this.secret;
          }
          postBody["providerId"] = this.providerId;
          if (this.nonce && !this.pendingToken) {
            postBody["nonce"] = this.nonce;
          }
          request.postBody = querystring(postBody);
        }
        return request;
      }
    };
    VERIFY_PHONE_NUMBER_FOR_EXISTING_ERROR_MAP_ = {
      ["USER_NOT_FOUND"]: "user-not-found"
    };
    PhoneAuthCredential = class extends AuthCredential {
      constructor(params) {
        super("phone", "phone");
        this.params = params;
      }
      static _fromVerification(verificationId, verificationCode) {
        return new PhoneAuthCredential({ verificationId, verificationCode });
      }
      static _fromTokenResponse(phoneNumber, temporaryProof) {
        return new PhoneAuthCredential({ phoneNumber, temporaryProof });
      }
      _getIdTokenResponse(auth) {
        return signInWithPhoneNumber$1(auth, this._makeVerificationRequest());
      }
      _linkToIdToken(auth, idToken) {
        return linkWithPhoneNumber$1(auth, Object.assign({ idToken }, this._makeVerificationRequest()));
      }
      _getReauthenticationResolver(auth) {
        return verifyPhoneNumberForExisting(auth, this._makeVerificationRequest());
      }
      _makeVerificationRequest() {
        const { temporaryProof, phoneNumber, verificationId, verificationCode } = this.params;
        if (temporaryProof && phoneNumber) {
          return { temporaryProof, phoneNumber };
        }
        return {
          sessionInfo: verificationId,
          code: verificationCode
        };
      }
      toJSON() {
        const obj = {
          providerId: this.providerId
        };
        if (this.params.phoneNumber) {
          obj.phoneNumber = this.params.phoneNumber;
        }
        if (this.params.temporaryProof) {
          obj.temporaryProof = this.params.temporaryProof;
        }
        if (this.params.verificationCode) {
          obj.verificationCode = this.params.verificationCode;
        }
        if (this.params.verificationId) {
          obj.verificationId = this.params.verificationId;
        }
        return obj;
      }
      static fromJSON(json2) {
        if (typeof json2 === "string") {
          json2 = JSON.parse(json2);
        }
        const { verificationId, verificationCode, phoneNumber, temporaryProof } = json2;
        if (!verificationCode && !verificationId && !phoneNumber && !temporaryProof) {
          return null;
        }
        return new PhoneAuthCredential({
          verificationId,
          verificationCode,
          phoneNumber,
          temporaryProof
        });
      }
    };
    ActionCodeURL = class {
      constructor(actionLink) {
        var _a, _b, _c2, _d, _e2, _f;
        const searchParams = querystringDecode(extractQuerystring(actionLink));
        const apiKey = (_a = searchParams["apiKey"]) !== null && _a !== void 0 ? _a : null;
        const code = (_b = searchParams["oobCode"]) !== null && _b !== void 0 ? _b : null;
        const operation = parseMode((_c2 = searchParams["mode"]) !== null && _c2 !== void 0 ? _c2 : null);
        _assert(apiKey && code && operation, "argument-error");
        this.apiKey = apiKey;
        this.operation = operation;
        this.code = code;
        this.continueUrl = (_d = searchParams["continueUrl"]) !== null && _d !== void 0 ? _d : null;
        this.languageCode = (_e2 = searchParams["languageCode"]) !== null && _e2 !== void 0 ? _e2 : null;
        this.tenantId = (_f = searchParams["tenantId"]) !== null && _f !== void 0 ? _f : null;
      }
      static parseLink(link) {
        const actionLink = parseDeepLink(link);
        try {
          return new ActionCodeURL(actionLink);
        } catch (_a) {
          return null;
        }
      }
    };
    EmailAuthProvider = class {
      constructor() {
        this.providerId = EmailAuthProvider.PROVIDER_ID;
      }
      static credential(email, password) {
        return EmailAuthCredential._fromEmailAndPassword(email, password);
      }
      static credentialWithLink(email, emailLink) {
        const actionCodeUrl = ActionCodeURL.parseLink(emailLink);
        _assert(actionCodeUrl, "argument-error");
        return EmailAuthCredential._fromEmailAndCode(email, actionCodeUrl.code, actionCodeUrl.tenantId);
      }
    };
    EmailAuthProvider.PROVIDER_ID = "password";
    EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD = "password";
    EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD = "emailLink";
    FederatedAuthProvider = class {
      constructor(providerId) {
        this.providerId = providerId;
        this.defaultLanguageCode = null;
        this.customParameters = {};
      }
      setDefaultLanguage(languageCode) {
        this.defaultLanguageCode = languageCode;
      }
      setCustomParameters(customOAuthParameters) {
        this.customParameters = customOAuthParameters;
        return this;
      }
      getCustomParameters() {
        return this.customParameters;
      }
    };
    BaseOAuthProvider = class extends FederatedAuthProvider {
      constructor() {
        super(...arguments);
        this.scopes = [];
      }
      addScope(scope) {
        if (!this.scopes.includes(scope)) {
          this.scopes.push(scope);
        }
        return this;
      }
      getScopes() {
        return [...this.scopes];
      }
    };
    FacebookAuthProvider = class extends BaseOAuthProvider {
      constructor() {
        super("facebook.com");
      }
      static credential(accessToken) {
        return OAuthCredential._fromParams({
          providerId: FacebookAuthProvider.PROVIDER_ID,
          signInMethod: FacebookAuthProvider.FACEBOOK_SIGN_IN_METHOD,
          accessToken
        });
      }
      static credentialFromResult(userCredential) {
        return FacebookAuthProvider.credentialFromTaggedObject(userCredential);
      }
      static credentialFromError(error2) {
        return FacebookAuthProvider.credentialFromTaggedObject(error2.customData || {});
      }
      static credentialFromTaggedObject({ _tokenResponse: tokenResponse }) {
        if (!tokenResponse || !("oauthAccessToken" in tokenResponse)) {
          return null;
        }
        if (!tokenResponse.oauthAccessToken) {
          return null;
        }
        try {
          return FacebookAuthProvider.credential(tokenResponse.oauthAccessToken);
        } catch (_a) {
          return null;
        }
      }
    };
    FacebookAuthProvider.FACEBOOK_SIGN_IN_METHOD = "facebook.com";
    FacebookAuthProvider.PROVIDER_ID = "facebook.com";
    GoogleAuthProvider = class extends BaseOAuthProvider {
      constructor() {
        super("google.com");
        this.addScope("profile");
      }
      static credential(idToken, accessToken) {
        return OAuthCredential._fromParams({
          providerId: GoogleAuthProvider.PROVIDER_ID,
          signInMethod: GoogleAuthProvider.GOOGLE_SIGN_IN_METHOD,
          idToken,
          accessToken
        });
      }
      static credentialFromResult(userCredential) {
        return GoogleAuthProvider.credentialFromTaggedObject(userCredential);
      }
      static credentialFromError(error2) {
        return GoogleAuthProvider.credentialFromTaggedObject(error2.customData || {});
      }
      static credentialFromTaggedObject({ _tokenResponse: tokenResponse }) {
        if (!tokenResponse) {
          return null;
        }
        const { oauthIdToken, oauthAccessToken } = tokenResponse;
        if (!oauthIdToken && !oauthAccessToken) {
          return null;
        }
        try {
          return GoogleAuthProvider.credential(oauthIdToken, oauthAccessToken);
        } catch (_a) {
          return null;
        }
      }
    };
    GoogleAuthProvider.GOOGLE_SIGN_IN_METHOD = "google.com";
    GoogleAuthProvider.PROVIDER_ID = "google.com";
    GithubAuthProvider = class extends BaseOAuthProvider {
      constructor() {
        super("github.com");
      }
      static credential(accessToken) {
        return OAuthCredential._fromParams({
          providerId: GithubAuthProvider.PROVIDER_ID,
          signInMethod: GithubAuthProvider.GITHUB_SIGN_IN_METHOD,
          accessToken
        });
      }
      static credentialFromResult(userCredential) {
        return GithubAuthProvider.credentialFromTaggedObject(userCredential);
      }
      static credentialFromError(error2) {
        return GithubAuthProvider.credentialFromTaggedObject(error2.customData || {});
      }
      static credentialFromTaggedObject({ _tokenResponse: tokenResponse }) {
        if (!tokenResponse || !("oauthAccessToken" in tokenResponse)) {
          return null;
        }
        if (!tokenResponse.oauthAccessToken) {
          return null;
        }
        try {
          return GithubAuthProvider.credential(tokenResponse.oauthAccessToken);
        } catch (_a) {
          return null;
        }
      }
    };
    GithubAuthProvider.GITHUB_SIGN_IN_METHOD = "github.com";
    GithubAuthProvider.PROVIDER_ID = "github.com";
    TwitterAuthProvider = class extends BaseOAuthProvider {
      constructor() {
        super("twitter.com");
      }
      static credential(token, secret) {
        return OAuthCredential._fromParams({
          providerId: TwitterAuthProvider.PROVIDER_ID,
          signInMethod: TwitterAuthProvider.TWITTER_SIGN_IN_METHOD,
          oauthToken: token,
          oauthTokenSecret: secret
        });
      }
      static credentialFromResult(userCredential) {
        return TwitterAuthProvider.credentialFromTaggedObject(userCredential);
      }
      static credentialFromError(error2) {
        return TwitterAuthProvider.credentialFromTaggedObject(error2.customData || {});
      }
      static credentialFromTaggedObject({ _tokenResponse: tokenResponse }) {
        if (!tokenResponse) {
          return null;
        }
        const { oauthAccessToken, oauthTokenSecret } = tokenResponse;
        if (!oauthAccessToken || !oauthTokenSecret) {
          return null;
        }
        try {
          return TwitterAuthProvider.credential(oauthAccessToken, oauthTokenSecret);
        } catch (_a) {
          return null;
        }
      }
    };
    TwitterAuthProvider.TWITTER_SIGN_IN_METHOD = "twitter.com";
    TwitterAuthProvider.PROVIDER_ID = "twitter.com";
    UserCredentialImpl = class {
      constructor(params) {
        this.user = params.user;
        this.providerId = params.providerId;
        this._tokenResponse = params._tokenResponse;
        this.operationType = params.operationType;
      }
      static async _fromIdTokenResponse(auth, operationType, idTokenResponse, isAnonymous = false) {
        const user = await UserImpl._fromIdTokenResponse(auth, idTokenResponse, isAnonymous);
        const providerId = providerIdForResponse(idTokenResponse);
        const userCred = new UserCredentialImpl({
          user,
          providerId,
          _tokenResponse: idTokenResponse,
          operationType
        });
        return userCred;
      }
      static async _forOperation(user, operationType, response) {
        await user._updateTokensIfNecessary(response, true);
        const providerId = providerIdForResponse(response);
        return new UserCredentialImpl({
          user,
          providerId,
          _tokenResponse: response,
          operationType
        });
      }
    };
    MultiFactorError = class extends FirebaseError {
      constructor(auth, error2, operationType, user) {
        var _a;
        super(error2.code, error2.message);
        this.operationType = operationType;
        this.user = user;
        Object.setPrototypeOf(this, MultiFactorError.prototype);
        this.customData = {
          appName: auth.name,
          tenantId: (_a = auth.tenantId) !== null && _a !== void 0 ? _a : void 0,
          _serverResponse: error2.customData._serverResponse,
          operationType
        };
      }
      static _fromErrorAndOperation(auth, error2, operationType, user) {
        return new MultiFactorError(auth, error2, operationType, user);
      }
    };
    STORAGE_AVAILABLE_KEY = "__sak";
    BrowserPersistenceClass = class {
      constructor(storageRetriever, type) {
        this.storageRetriever = storageRetriever;
        this.type = type;
      }
      _isAvailable() {
        try {
          if (!this.storage) {
            return Promise.resolve(false);
          }
          this.storage.setItem(STORAGE_AVAILABLE_KEY, "1");
          this.storage.removeItem(STORAGE_AVAILABLE_KEY);
          return Promise.resolve(true);
        } catch (_a) {
          return Promise.resolve(false);
        }
      }
      _set(key2, value) {
        this.storage.setItem(key2, JSON.stringify(value));
        return Promise.resolve();
      }
      _get(key2) {
        const json2 = this.storage.getItem(key2);
        return Promise.resolve(json2 ? JSON.parse(json2) : null);
      }
      _remove(key2) {
        this.storage.removeItem(key2);
        return Promise.resolve();
      }
      get storage() {
        return this.storageRetriever();
      }
    };
    _POLLING_INTERVAL_MS$1 = 1e3;
    IE10_LOCAL_STORAGE_SYNC_DELAY = 10;
    BrowserLocalPersistence = class extends BrowserPersistenceClass {
      constructor() {
        super(() => window.localStorage, "LOCAL");
        this.boundEventHandler = (event2, poll) => this.onStorageEvent(event2, poll);
        this.listeners = {};
        this.localCache = {};
        this.pollTimer = null;
        this.safariLocalStorageNotSynced = _iframeCannotSyncWebStorage() && _isIframe();
        this.fallbackToPolling = _isMobileBrowser();
        this._shouldAllowMigration = true;
      }
      forAllChangedKeys(cb2) {
        for (const key2 of Object.keys(this.listeners)) {
          const newValue = this.storage.getItem(key2);
          const oldValue = this.localCache[key2];
          if (newValue !== oldValue) {
            cb2(key2, oldValue, newValue);
          }
        }
      }
      onStorageEvent(event2, poll = false) {
        if (!event2.key) {
          this.forAllChangedKeys((key3, _oldValue, newValue) => {
            this.notifyListeners(key3, newValue);
          });
          return;
        }
        const key2 = event2.key;
        if (poll) {
          this.detachListener();
        } else {
          this.stopPolling();
        }
        if (this.safariLocalStorageNotSynced) {
          const storedValue2 = this.storage.getItem(key2);
          if (event2.newValue !== storedValue2) {
            if (event2.newValue !== null) {
              this.storage.setItem(key2, event2.newValue);
            } else {
              this.storage.removeItem(key2);
            }
          } else if (this.localCache[key2] === event2.newValue && !poll) {
            return;
          }
        }
        const triggerListeners = () => {
          const storedValue2 = this.storage.getItem(key2);
          if (!poll && this.localCache[key2] === storedValue2) {
            return;
          }
          this.notifyListeners(key2, storedValue2);
        };
        const storedValue = this.storage.getItem(key2);
        if (_isIE10() && storedValue !== event2.newValue && event2.newValue !== event2.oldValue) {
          setTimeout(triggerListeners, IE10_LOCAL_STORAGE_SYNC_DELAY);
        } else {
          triggerListeners();
        }
      }
      notifyListeners(key2, value) {
        this.localCache[key2] = value;
        const listeners = this.listeners[key2];
        if (listeners) {
          for (const listener of Array.from(listeners)) {
            listener(value ? JSON.parse(value) : value);
          }
        }
      }
      startPolling() {
        this.stopPolling();
        this.pollTimer = setInterval(() => {
          this.forAllChangedKeys((key2, oldValue, newValue) => {
            this.onStorageEvent(
              new StorageEvent("storage", {
                key: key2,
                oldValue,
                newValue
              }),
              true
            );
          });
        }, _POLLING_INTERVAL_MS$1);
      }
      stopPolling() {
        if (this.pollTimer) {
          clearInterval(this.pollTimer);
          this.pollTimer = null;
        }
      }
      attachListener() {
        window.addEventListener("storage", this.boundEventHandler);
      }
      detachListener() {
        window.removeEventListener("storage", this.boundEventHandler);
      }
      _addListener(key2, listener) {
        if (Object.keys(this.listeners).length === 0) {
          if (this.fallbackToPolling) {
            this.startPolling();
          } else {
            this.attachListener();
          }
        }
        if (!this.listeners[key2]) {
          this.listeners[key2] = /* @__PURE__ */ new Set();
          this.localCache[key2] = this.storage.getItem(key2);
        }
        this.listeners[key2].add(listener);
      }
      _removeListener(key2, listener) {
        if (this.listeners[key2]) {
          this.listeners[key2].delete(listener);
          if (this.listeners[key2].size === 0) {
            delete this.listeners[key2];
          }
        }
        if (Object.keys(this.listeners).length === 0) {
          this.detachListener();
          this.stopPolling();
        }
      }
      async _set(key2, value) {
        await super._set(key2, value);
        this.localCache[key2] = JSON.stringify(value);
      }
      async _get(key2) {
        const value = await super._get(key2);
        this.localCache[key2] = JSON.stringify(value);
        return value;
      }
      async _remove(key2) {
        await super._remove(key2);
        delete this.localCache[key2];
      }
    };
    BrowserLocalPersistence.type = "LOCAL";
    browserLocalPersistence = BrowserLocalPersistence;
    BrowserSessionPersistence = class extends BrowserPersistenceClass {
      constructor() {
        super(() => window.sessionStorage, "SESSION");
      }
      _addListener(_key, _listener) {
        return;
      }
      _removeListener(_key, _listener) {
        return;
      }
    };
    BrowserSessionPersistence.type = "SESSION";
    browserSessionPersistence = BrowserSessionPersistence;
    Receiver = class {
      constructor(eventTarget) {
        this.eventTarget = eventTarget;
        this.handlersMap = {};
        this.boundEventHandler = this.handleEvent.bind(this);
      }
      static _getInstance(eventTarget) {
        const existingInstance = this.receivers.find((receiver) => receiver.isListeningto(eventTarget));
        if (existingInstance) {
          return existingInstance;
        }
        const newInstance = new Receiver(eventTarget);
        this.receivers.push(newInstance);
        return newInstance;
      }
      isListeningto(eventTarget) {
        return this.eventTarget === eventTarget;
      }
      async handleEvent(event2) {
        const messageEvent = event2;
        const { eventId, eventType, data } = messageEvent.data;
        const handlers = this.handlersMap[eventType];
        if (!(handlers === null || handlers === void 0 ? void 0 : handlers.size)) {
          return;
        }
        messageEvent.ports[0].postMessage({
          status: "ack",
          eventId,
          eventType
        });
        const promises = Array.from(handlers).map(async (handler) => handler(messageEvent.origin, data));
        const response = await _allSettled(promises);
        messageEvent.ports[0].postMessage({
          status: "done",
          eventId,
          eventType,
          response
        });
      }
      _subscribe(eventType, eventHandler) {
        if (Object.keys(this.handlersMap).length === 0) {
          this.eventTarget.addEventListener("message", this.boundEventHandler);
        }
        if (!this.handlersMap[eventType]) {
          this.handlersMap[eventType] = /* @__PURE__ */ new Set();
        }
        this.handlersMap[eventType].add(eventHandler);
      }
      _unsubscribe(eventType, eventHandler) {
        if (this.handlersMap[eventType] && eventHandler) {
          this.handlersMap[eventType].delete(eventHandler);
        }
        if (!eventHandler || this.handlersMap[eventType].size === 0) {
          delete this.handlersMap[eventType];
        }
        if (Object.keys(this.handlersMap).length === 0) {
          this.eventTarget.removeEventListener("message", this.boundEventHandler);
        }
      }
    };
    Receiver.receivers = [];
    Sender = class {
      constructor(target) {
        this.target = target;
        this.handlers = /* @__PURE__ */ new Set();
      }
      removeMessageHandler(handler) {
        if (handler.messageChannel) {
          handler.messageChannel.port1.removeEventListener("message", handler.onMessage);
          handler.messageChannel.port1.close();
        }
        this.handlers.delete(handler);
      }
      async _send(eventType, data, timeout = 50) {
        const messageChannel = typeof MessageChannel !== "undefined" ? new MessageChannel() : null;
        if (!messageChannel) {
          throw new Error("connection_unavailable");
        }
        let completionTimer;
        let handler;
        return new Promise((resolve2, reject) => {
          const eventId = _generateEventId("", 20);
          messageChannel.port1.start();
          const ackTimer = setTimeout(() => {
            reject(new Error("unsupported_event"));
          }, timeout);
          handler = {
            messageChannel,
            onMessage(event2) {
              const messageEvent = event2;
              if (messageEvent.data.eventId !== eventId) {
                return;
              }
              switch (messageEvent.data.status) {
                case "ack":
                  clearTimeout(ackTimer);
                  completionTimer = setTimeout(() => {
                    reject(new Error("timeout"));
                  }, 3e3);
                  break;
                case "done":
                  clearTimeout(completionTimer);
                  resolve2(messageEvent.data.response);
                  break;
                default:
                  clearTimeout(ackTimer);
                  clearTimeout(completionTimer);
                  reject(new Error("invalid_response"));
                  break;
              }
            }
          };
          this.handlers.add(handler);
          messageChannel.port1.addEventListener("message", handler.onMessage);
          this.target.postMessage({
            eventType,
            eventId,
            data
          }, [messageChannel.port2]);
        }).finally(() => {
          if (handler) {
            this.removeMessageHandler(handler);
          }
        });
      }
    };
    DB_NAME2 = "firebaseLocalStorageDb";
    DB_VERSION2 = 1;
    DB_OBJECTSTORE_NAME = "firebaseLocalStorage";
    DB_DATA_KEYPATH = "fbase_key";
    DBPromise = class {
      constructor(request) {
        this.request = request;
      }
      toPromise() {
        return new Promise((resolve2, reject) => {
          this.request.addEventListener("success", () => {
            resolve2(this.request.result);
          });
          this.request.addEventListener("error", () => {
            reject(this.request.error);
          });
        });
      }
    };
    _POLLING_INTERVAL_MS = 800;
    _TRANSACTION_RETRY_COUNT = 3;
    IndexedDBLocalPersistence = class {
      constructor() {
        this.type = "LOCAL";
        this._shouldAllowMigration = true;
        this.listeners = {};
        this.localCache = {};
        this.pollTimer = null;
        this.pendingWrites = 0;
        this.receiver = null;
        this.sender = null;
        this.serviceWorkerReceiverAvailable = false;
        this.activeServiceWorker = null;
        this._workerInitializationPromise = this.initializeServiceWorkerMessaging().then(() => {
        }, () => {
        });
      }
      async _openDb() {
        if (this.db) {
          return this.db;
        }
        this.db = await _openDatabase();
        return this.db;
      }
      async _withRetries(op) {
        let numAttempts = 0;
        while (true) {
          try {
            const db3 = await this._openDb();
            return await op(db3);
          } catch (e) {
            if (numAttempts++ > _TRANSACTION_RETRY_COUNT) {
              throw e;
            }
            if (this.db) {
              this.db.close();
              this.db = void 0;
            }
          }
        }
      }
      async initializeServiceWorkerMessaging() {
        return _isWorker() ? this.initializeReceiver() : this.initializeSender();
      }
      async initializeReceiver() {
        this.receiver = Receiver._getInstance(_getWorkerGlobalScope());
        this.receiver._subscribe("keyChanged", async (_origin, data) => {
          const keys = await this._poll();
          return {
            keyProcessed: keys.includes(data.key)
          };
        });
        this.receiver._subscribe("ping", async (_origin, _data) => {
          return ["keyChanged"];
        });
      }
      async initializeSender() {
        var _a, _b;
        this.activeServiceWorker = await _getActiveServiceWorker();
        if (!this.activeServiceWorker) {
          return;
        }
        this.sender = new Sender(this.activeServiceWorker);
        const results = await this.sender._send("ping", {}, 800);
        if (!results) {
          return;
        }
        if (((_a = results[0]) === null || _a === void 0 ? void 0 : _a.fulfilled) && ((_b = results[0]) === null || _b === void 0 ? void 0 : _b.value.includes("keyChanged"))) {
          this.serviceWorkerReceiverAvailable = true;
        }
      }
      async notifyServiceWorker(key2) {
        if (!this.sender || !this.activeServiceWorker || _getServiceWorkerController() !== this.activeServiceWorker) {
          return;
        }
        try {
          await this.sender._send(
            "keyChanged",
            { key: key2 },
            this.serviceWorkerReceiverAvailable ? 800 : 50
          );
        } catch (_a) {
        }
      }
      async _isAvailable() {
        try {
          if (!indexedDB) {
            return false;
          }
          const db3 = await _openDatabase();
          await _putObject(db3, STORAGE_AVAILABLE_KEY, "1");
          await _deleteObject(db3, STORAGE_AVAILABLE_KEY);
          return true;
        } catch (_a) {
        }
        return false;
      }
      async _withPendingWrite(write2) {
        this.pendingWrites++;
        try {
          await write2();
        } finally {
          this.pendingWrites--;
        }
      }
      async _set(key2, value) {
        return this._withPendingWrite(async () => {
          await this._withRetries((db3) => _putObject(db3, key2, value));
          this.localCache[key2] = value;
          return this.notifyServiceWorker(key2);
        });
      }
      async _get(key2) {
        const obj = await this._withRetries((db3) => getObject(db3, key2));
        this.localCache[key2] = obj;
        return obj;
      }
      async _remove(key2) {
        return this._withPendingWrite(async () => {
          await this._withRetries((db3) => _deleteObject(db3, key2));
          delete this.localCache[key2];
          return this.notifyServiceWorker(key2);
        });
      }
      async _poll() {
        const result = await this._withRetries((db3) => {
          const getAllRequest = getObjectStore(db3, false).getAll();
          return new DBPromise(getAllRequest).toPromise();
        });
        if (!result) {
          return [];
        }
        if (this.pendingWrites !== 0) {
          return [];
        }
        const keys = [];
        const keysInResult = /* @__PURE__ */ new Set();
        for (const { fbase_key: key2, value } of result) {
          keysInResult.add(key2);
          if (JSON.stringify(this.localCache[key2]) !== JSON.stringify(value)) {
            this.notifyListeners(key2, value);
            keys.push(key2);
          }
        }
        for (const localKey of Object.keys(this.localCache)) {
          if (this.localCache[localKey] && !keysInResult.has(localKey)) {
            this.notifyListeners(localKey, null);
            keys.push(localKey);
          }
        }
        return keys;
      }
      notifyListeners(key2, newValue) {
        this.localCache[key2] = newValue;
        const listeners = this.listeners[key2];
        if (listeners) {
          for (const listener of Array.from(listeners)) {
            listener(newValue);
          }
        }
      }
      startPolling() {
        this.stopPolling();
        this.pollTimer = setInterval(async () => this._poll(), _POLLING_INTERVAL_MS);
      }
      stopPolling() {
        if (this.pollTimer) {
          clearInterval(this.pollTimer);
          this.pollTimer = null;
        }
      }
      _addListener(key2, listener) {
        if (Object.keys(this.listeners).length === 0) {
          this.startPolling();
        }
        if (!this.listeners[key2]) {
          this.listeners[key2] = /* @__PURE__ */ new Set();
          void this._get(key2);
        }
        this.listeners[key2].add(listener);
      }
      _removeListener(key2, listener) {
        if (this.listeners[key2]) {
          this.listeners[key2].delete(listener);
          if (this.listeners[key2].size === 0) {
            delete this.listeners[key2];
          }
        }
        if (Object.keys(this.listeners).length === 0) {
          this.stopPolling();
        }
      }
    };
    IndexedDBLocalPersistence.type = "LOCAL";
    indexedDBLocalPersistence = IndexedDBLocalPersistence;
    _JSLOAD_CALLBACK = _generateCallbackName("rcb");
    NETWORK_TIMEOUT_DELAY = new Delay(3e4, 6e4);
    RECAPTCHA_VERIFIER_TYPE = "recaptcha";
    PhoneAuthProvider = class {
      constructor(auth) {
        this.providerId = PhoneAuthProvider.PROVIDER_ID;
        this.auth = _castAuth(auth);
      }
      verifyPhoneNumber(phoneOptions, applicationVerifier) {
        return _verifyPhoneNumber(this.auth, phoneOptions, getModularInstance(applicationVerifier));
      }
      static credential(verificationId, verificationCode) {
        return PhoneAuthCredential._fromVerification(verificationId, verificationCode);
      }
      static credentialFromResult(userCredential) {
        const credential = userCredential;
        return PhoneAuthProvider.credentialFromTaggedObject(credential);
      }
      static credentialFromError(error2) {
        return PhoneAuthProvider.credentialFromTaggedObject(error2.customData || {});
      }
      static credentialFromTaggedObject({ _tokenResponse: tokenResponse }) {
        if (!tokenResponse) {
          return null;
        }
        const { phoneNumber, temporaryProof } = tokenResponse;
        if (phoneNumber && temporaryProof) {
          return PhoneAuthCredential._fromTokenResponse(phoneNumber, temporaryProof);
        }
        return null;
      }
    };
    PhoneAuthProvider.PROVIDER_ID = "phone";
    PhoneAuthProvider.PHONE_SIGN_IN_METHOD = "phone";
    IdpCredential = class extends AuthCredential {
      constructor(params) {
        super("custom", "custom");
        this.params = params;
      }
      _getIdTokenResponse(auth) {
        return signInWithIdp(auth, this._buildIdpRequest());
      }
      _linkToIdToken(auth, idToken) {
        return signInWithIdp(auth, this._buildIdpRequest(idToken));
      }
      _getReauthenticationResolver(auth) {
        return signInWithIdp(auth, this._buildIdpRequest());
      }
      _buildIdpRequest(idToken) {
        const request = {
          requestUri: this.params.requestUri,
          sessionId: this.params.sessionId,
          postBody: this.params.postBody,
          tenantId: this.params.tenantId,
          pendingToken: this.params.pendingToken,
          returnSecureToken: true,
          returnIdpCredential: true
        };
        if (idToken) {
          request.idToken = idToken;
        }
        return request;
      }
    };
    AbstractPopupRedirectOperation = class {
      constructor(auth, filter, resolver, user, bypassAuthState = false) {
        this.auth = auth;
        this.resolver = resolver;
        this.user = user;
        this.bypassAuthState = bypassAuthState;
        this.pendingPromise = null;
        this.eventManager = null;
        this.filter = Array.isArray(filter) ? filter : [filter];
      }
      execute() {
        return new Promise(async (resolve2, reject) => {
          this.pendingPromise = { resolve: resolve2, reject };
          try {
            this.eventManager = await this.resolver._initialize(this.auth);
            await this.onExecution();
            this.eventManager.registerConsumer(this);
          } catch (e) {
            this.reject(e);
          }
        });
      }
      async onAuthEvent(event2) {
        const { urlResponse, sessionId, postBody, tenantId, error: error2, type } = event2;
        if (error2) {
          this.reject(error2);
          return;
        }
        const params = {
          auth: this.auth,
          requestUri: urlResponse,
          sessionId,
          tenantId: tenantId || void 0,
          postBody: postBody || void 0,
          user: this.user,
          bypassAuthState: this.bypassAuthState
        };
        try {
          this.resolve(await this.getIdpTask(type)(params));
        } catch (e) {
          this.reject(e);
        }
      }
      onError(error2) {
        this.reject(error2);
      }
      getIdpTask(type) {
        switch (type) {
          case "signInViaPopup":
          case "signInViaRedirect":
            return _signIn;
          case "linkViaPopup":
          case "linkViaRedirect":
            return _link;
          case "reauthViaPopup":
          case "reauthViaRedirect":
            return _reauth;
          default:
            _fail(this.auth, "internal-error");
        }
      }
      resolve(cred) {
        debugAssert(this.pendingPromise, "Pending promise was never set");
        this.pendingPromise.resolve(cred);
        this.unregisterAndCleanUp();
      }
      reject(error2) {
        debugAssert(this.pendingPromise, "Pending promise was never set");
        this.pendingPromise.reject(error2);
        this.unregisterAndCleanUp();
      }
      unregisterAndCleanUp() {
        if (this.eventManager) {
          this.eventManager.unregisterConsumer(this);
        }
        this.pendingPromise = null;
        this.cleanUp();
      }
    };
    _POLL_WINDOW_CLOSE_TIMEOUT = new Delay(2e3, 1e4);
    PopupOperation = class extends AbstractPopupRedirectOperation {
      constructor(auth, filter, provider, resolver, user) {
        super(auth, filter, resolver, user);
        this.provider = provider;
        this.authWindow = null;
        this.pollId = null;
        if (PopupOperation.currentPopupAction) {
          PopupOperation.currentPopupAction.cancel();
        }
        PopupOperation.currentPopupAction = this;
      }
      async executeNotNull() {
        const result = await this.execute();
        _assert(result, this.auth, "internal-error");
        return result;
      }
      async onExecution() {
        debugAssert(this.filter.length === 1, "Popup operations only handle one event");
        const eventId = _generateEventId();
        this.authWindow = await this.resolver._openPopup(
          this.auth,
          this.provider,
          this.filter[0],
          eventId
        );
        this.authWindow.associatedEvent = eventId;
        this.resolver._originValidation(this.auth).catch((e) => {
          this.reject(e);
        });
        this.resolver._isIframeWebStorageSupported(this.auth, (isSupported) => {
          if (!isSupported) {
            this.reject(_createError(this.auth, "web-storage-unsupported"));
          }
        });
        this.pollUserCancellation();
      }
      get eventId() {
        var _a;
        return ((_a = this.authWindow) === null || _a === void 0 ? void 0 : _a.associatedEvent) || null;
      }
      cancel() {
        this.reject(_createError(this.auth, "cancelled-popup-request"));
      }
      cleanUp() {
        if (this.authWindow) {
          this.authWindow.close();
        }
        if (this.pollId) {
          window.clearTimeout(this.pollId);
        }
        this.authWindow = null;
        this.pollId = null;
        PopupOperation.currentPopupAction = null;
      }
      pollUserCancellation() {
        const poll = () => {
          var _a, _b;
          if ((_b = (_a = this.authWindow) === null || _a === void 0 ? void 0 : _a.window) === null || _b === void 0 ? void 0 : _b.closed) {
            this.pollId = window.setTimeout(() => {
              this.pollId = null;
              this.reject(_createError(this.auth, "popup-closed-by-user"));
            }, 2e3);
            return;
          }
          this.pollId = window.setTimeout(poll, _POLL_WINDOW_CLOSE_TIMEOUT.get());
        };
        poll();
      }
    };
    PopupOperation.currentPopupAction = null;
    PENDING_REDIRECT_KEY = "pendingRedirect";
    redirectOutcomeMap = /* @__PURE__ */ new Map();
    RedirectAction = class extends AbstractPopupRedirectOperation {
      constructor(auth, resolver, bypassAuthState = false) {
        super(auth, [
          "signInViaRedirect",
          "linkViaRedirect",
          "reauthViaRedirect",
          "unknown"
        ], resolver, void 0, bypassAuthState);
        this.eventId = null;
      }
      async execute() {
        let readyOutcome = redirectOutcomeMap.get(this.auth._key());
        if (!readyOutcome) {
          try {
            const hasPendingRedirect = await _getAndClearPendingRedirectStatus(this.resolver, this.auth);
            const result = hasPendingRedirect ? await super.execute() : null;
            readyOutcome = () => Promise.resolve(result);
          } catch (e) {
            readyOutcome = () => Promise.reject(e);
          }
          redirectOutcomeMap.set(this.auth._key(), readyOutcome);
        }
        if (!this.bypassAuthState) {
          redirectOutcomeMap.set(this.auth._key(), () => Promise.resolve(null));
        }
        return readyOutcome();
      }
      async onAuthEvent(event2) {
        if (event2.type === "signInViaRedirect") {
          return super.onAuthEvent(event2);
        } else if (event2.type === "unknown") {
          this.resolve(null);
          return;
        }
        if (event2.eventId) {
          const user = await this.auth._redirectUserForId(event2.eventId);
          if (user) {
            this.user = user;
            return super.onAuthEvent(event2);
          } else {
            this.resolve(null);
          }
        }
      }
      async onExecution() {
      }
      cleanUp() {
      }
    };
    EVENT_DUPLICATION_CACHE_DURATION_MS = 10 * 60 * 1e3;
    AuthEventManager = class {
      constructor(auth) {
        this.auth = auth;
        this.cachedEventUids = /* @__PURE__ */ new Set();
        this.consumers = /* @__PURE__ */ new Set();
        this.queuedRedirectEvent = null;
        this.hasHandledPotentialRedirect = false;
        this.lastProcessedEventTime = Date.now();
      }
      registerConsumer(authEventConsumer) {
        this.consumers.add(authEventConsumer);
        if (this.queuedRedirectEvent && this.isEventForConsumer(this.queuedRedirectEvent, authEventConsumer)) {
          this.sendToConsumer(this.queuedRedirectEvent, authEventConsumer);
          this.saveEventToCache(this.queuedRedirectEvent);
          this.queuedRedirectEvent = null;
        }
      }
      unregisterConsumer(authEventConsumer) {
        this.consumers.delete(authEventConsumer);
      }
      onEvent(event2) {
        if (this.hasEventBeenHandled(event2)) {
          return false;
        }
        let handled = false;
        this.consumers.forEach((consumer) => {
          if (this.isEventForConsumer(event2, consumer)) {
            handled = true;
            this.sendToConsumer(event2, consumer);
            this.saveEventToCache(event2);
          }
        });
        if (this.hasHandledPotentialRedirect || !isRedirectEvent(event2)) {
          return handled;
        }
        this.hasHandledPotentialRedirect = true;
        if (!handled) {
          this.queuedRedirectEvent = event2;
          handled = true;
        }
        return handled;
      }
      sendToConsumer(event2, consumer) {
        var _a;
        if (event2.error && !isNullRedirectEvent(event2)) {
          const code = ((_a = event2.error.code) === null || _a === void 0 ? void 0 : _a.split("auth/")[1]) || "internal-error";
          consumer.onError(_createError(this.auth, code));
        } else {
          consumer.onAuthEvent(event2);
        }
      }
      isEventForConsumer(event2, consumer) {
        const eventIdMatches = consumer.eventId === null || !!event2.eventId && event2.eventId === consumer.eventId;
        return consumer.filter.includes(event2.type) && eventIdMatches;
      }
      hasEventBeenHandled(event2) {
        if (Date.now() - this.lastProcessedEventTime >= EVENT_DUPLICATION_CACHE_DURATION_MS) {
          this.cachedEventUids.clear();
        }
        return this.cachedEventUids.has(eventUid(event2));
      }
      saveEventToCache(event2) {
        this.cachedEventUids.add(eventUid(event2));
        this.lastProcessedEventTime = Date.now();
      }
    };
    IP_ADDRESS_REGEX = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
    HTTP_REGEX = /^https?/;
    NETWORK_TIMEOUT = new Delay(3e4, 6e4);
    cachedGApiLoader = null;
    PING_TIMEOUT = new Delay(5e3, 15e3);
    IFRAME_PATH = "__/auth/iframe";
    EMULATED_IFRAME_PATH = "emulator/auth/iframe";
    IFRAME_ATTRIBUTES = {
      style: {
        position: "absolute",
        top: "-100px",
        width: "1px",
        height: "1px"
      },
      "aria-hidden": "true",
      tabindex: "-1"
    };
    EID_FROM_APIHOST = /* @__PURE__ */ new Map([
      ["identitytoolkit.googleapis.com", "p"],
      ["staging-identitytoolkit.sandbox.googleapis.com", "s"],
      ["test-identitytoolkit.sandbox.googleapis.com", "t"]
    ]);
    BASE_POPUP_OPTIONS = {
      location: "yes",
      resizable: "yes",
      statusbar: "yes",
      toolbar: "no"
    };
    DEFAULT_WIDTH = 500;
    DEFAULT_HEIGHT = 600;
    TARGET_BLANK = "_blank";
    FIREFOX_EMPTY_URL = "http://localhost";
    AuthPopup = class {
      constructor(window2) {
        this.window = window2;
        this.associatedEvent = null;
      }
      close() {
        if (this.window) {
          try {
            this.window.close();
          } catch (e) {
          }
        }
      }
    };
    WIDGET_PATH = "__/auth/handler";
    EMULATOR_WIDGET_PATH = "emulator/auth/handler";
    WEB_STORAGE_SUPPORT_KEY = "webStorageSupport";
    BrowserPopupRedirectResolver = class {
      constructor() {
        this.eventManagers = {};
        this.iframes = {};
        this.originValidationPromises = {};
        this._redirectPersistence = browserSessionPersistence;
        this._completeRedirectFn = _getRedirectResult;
        this._overrideRedirectResult = _overrideRedirectResult;
      }
      async _openPopup(auth, provider, authType, eventId) {
        var _a;
        debugAssert((_a = this.eventManagers[auth._key()]) === null || _a === void 0 ? void 0 : _a.manager, "_initialize() not called before _openPopup()");
        const url = _getRedirectUrl(auth, provider, authType, _getCurrentUrl(), eventId);
        return _open(auth, url, _generateEventId());
      }
      async _openRedirect(auth, provider, authType, eventId) {
        await this._originValidation(auth);
        _setWindowLocation(_getRedirectUrl(auth, provider, authType, _getCurrentUrl(), eventId));
        return new Promise(() => {
        });
      }
      _initialize(auth) {
        const key2 = auth._key();
        if (this.eventManagers[key2]) {
          const { manager, promise: promise2 } = this.eventManagers[key2];
          if (manager) {
            return Promise.resolve(manager);
          } else {
            debugAssert(promise2, "If manager is not set, promise should be");
            return promise2;
          }
        }
        const promise = this.initAndGetManager(auth);
        this.eventManagers[key2] = { promise };
        promise.catch(() => {
          delete this.eventManagers[key2];
        });
        return promise;
      }
      async initAndGetManager(auth) {
        const iframe = await _openIframe(auth);
        const manager = new AuthEventManager(auth);
        iframe.register("authEvent", (iframeEvent) => {
          _assert(iframeEvent === null || iframeEvent === void 0 ? void 0 : iframeEvent.authEvent, auth, "invalid-auth-event");
          const handled = manager.onEvent(iframeEvent.authEvent);
          return { status: handled ? "ACK" : "ERROR" };
        }, gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER);
        this.eventManagers[auth._key()] = { manager };
        this.iframes[auth._key()] = iframe;
        return manager;
      }
      _isIframeWebStorageSupported(auth, cb2) {
        const iframe = this.iframes[auth._key()];
        iframe.send(WEB_STORAGE_SUPPORT_KEY, { type: WEB_STORAGE_SUPPORT_KEY }, (result) => {
          var _a;
          const isSupported = (_a = result === null || result === void 0 ? void 0 : result[0]) === null || _a === void 0 ? void 0 : _a[WEB_STORAGE_SUPPORT_KEY];
          if (isSupported !== void 0) {
            cb2(!!isSupported);
          }
          _fail(auth, "internal-error");
        }, gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER);
      }
      _originValidation(auth) {
        const key2 = auth._key();
        if (!this.originValidationPromises[key2]) {
          this.originValidationPromises[key2] = _validateOrigin(auth);
        }
        return this.originValidationPromises[key2];
      }
      get _shouldInitProactively() {
        return _isMobileBrowser() || _isSafari() || _isIOS();
      }
    };
    browserPopupRedirectResolver = BrowserPopupRedirectResolver;
    MultiFactorAssertionImpl = class {
      constructor(factorId) {
        this.factorId = factorId;
      }
      _process(auth, session, displayName) {
        switch (session.type) {
          case "enroll":
            return this._finalizeEnroll(auth, session.credential, displayName);
          case "signin":
            return this._finalizeSignIn(auth, session.credential);
          default:
            return debugFail("unexpected MultiFactorSessionType");
        }
      }
    };
    PhoneMultiFactorAssertionImpl = class extends MultiFactorAssertionImpl {
      constructor(credential) {
        super("phone");
        this.credential = credential;
      }
      static _fromCredential(credential) {
        return new PhoneMultiFactorAssertionImpl(credential);
      }
      _finalizeEnroll(auth, idToken, displayName) {
        return finalizeEnrollPhoneMfa(auth, {
          idToken,
          displayName,
          phoneVerificationInfo: this.credential._makeVerificationRequest()
        });
      }
      _finalizeSignIn(auth, mfaPendingCredential) {
        return finalizeSignInPhoneMfa(auth, {
          mfaPendingCredential,
          phoneVerificationInfo: this.credential._makeVerificationRequest()
        });
      }
    };
    PhoneMultiFactorGenerator = class {
      constructor() {
      }
      static assertion(credential) {
        return PhoneMultiFactorAssertionImpl._fromCredential(credential);
      }
    };
    PhoneMultiFactorGenerator.FACTOR_ID = "phone";
    name4 = "@firebase/auth";
    version4 = "0.20.6";
    AuthInterop = class {
      constructor(auth) {
        this.auth = auth;
        this.internalListeners = /* @__PURE__ */ new Map();
      }
      getUid() {
        var _a;
        this.assertAuthConfigured();
        return ((_a = this.auth.currentUser) === null || _a === void 0 ? void 0 : _a.uid) || null;
      }
      async getToken(forceRefresh) {
        this.assertAuthConfigured();
        await this.auth._initializationPromise;
        if (!this.auth.currentUser) {
          return null;
        }
        const accessToken = await this.auth.currentUser.getIdToken(forceRefresh);
        return { accessToken };
      }
      addAuthTokenListener(listener) {
        this.assertAuthConfigured();
        if (this.internalListeners.has(listener)) {
          return;
        }
        const unsubscribe = this.auth.onIdTokenChanged((user) => {
          var _a;
          listener(((_a = user) === null || _a === void 0 ? void 0 : _a.stsTokenManager.accessToken) || null);
        });
        this.internalListeners.set(listener, unsubscribe);
        this.updateProactiveRefresh();
      }
      removeAuthTokenListener(listener) {
        this.assertAuthConfigured();
        const unsubscribe = this.internalListeners.get(listener);
        if (!unsubscribe) {
          return;
        }
        this.internalListeners.delete(listener);
        unsubscribe();
        this.updateProactiveRefresh();
      }
      assertAuthConfigured() {
        _assert(this.auth._initializationPromise, "dependent-sdk-initialized-before-auth");
      }
      updateProactiveRefresh() {
        if (this.internalListeners.size > 0) {
          this.auth._startProactiveRefresh();
        } else {
          this.auth._stopProactiveRefresh();
        }
      }
    };
    registerAuth("Browser");
  }
});

// node_modules/@firebase/auth/dist/esm2017/index.js
var init_esm2017 = __esm({
  "node_modules/@firebase/auth/dist/esm2017/index.js"() {
    init_index_6bd8d405();
    init_index_esm2017();
    init_index_esm20174();
    init_modules();
    init_index_esm20173();
    init_index_esm20172();
  }
});

// node_modules/firebase/auth/dist/index.esm.js
var init_index_esm4 = __esm({
  "node_modules/firebase/auth/dist/index.esm.js"() {
    init_esm2017();
  }
});

// node_modules/@firebase/app-check/dist/esm/index.esm2017.js
function getState(app) {
  return APP_CHECK_STATES.get(app) || DEFAULT_STATE;
}
function setState(app, state) {
  APP_CHECK_STATES.set(app, state);
}
function getDebugState() {
  return DEBUG_STATE;
}
function sleep(ms2) {
  return new Promise((resolve2) => {
    setTimeout(resolve2, ms2);
  });
}
function ensureActivated(app) {
  if (!getState(app).activated) {
    throw ERROR_FACTORY2.create("use-before-activation", {
      appName: app.name
    });
  }
}
async function exchangeToken({ url, body }, heartbeatServiceProvider) {
  var _a, _b;
  const headers = {
    "Content-Type": "application/json"
  };
  const heartbeatService = heartbeatServiceProvider.getImmediate({
    optional: true
  });
  if (heartbeatService) {
    const heartbeatsHeader = await heartbeatService.getHeartbeatsHeader();
    if (heartbeatsHeader) {
      headers["X-Firebase-Client"] = heartbeatsHeader;
    }
  }
  const options = {
    method: "POST",
    body: JSON.stringify(body),
    headers
  };
  let response;
  try {
    response = await fetch(url, options);
  } catch (originalError) {
    throw ERROR_FACTORY2.create("fetch-network-error", {
      originalErrorMessage: (_a = originalError) === null || _a === void 0 ? void 0 : _a.message
    });
  }
  if (response.status !== 200) {
    throw ERROR_FACTORY2.create("fetch-status-error", {
      httpStatus: response.status
    });
  }
  let responseBody;
  try {
    responseBody = await response.json();
  } catch (originalError) {
    throw ERROR_FACTORY2.create("fetch-parse-error", {
      originalErrorMessage: (_b = originalError) === null || _b === void 0 ? void 0 : _b.message
    });
  }
  const match = responseBody.ttl.match(/^([\d.]+)(s)$/);
  if (!match || !match[2] || isNaN(Number(match[1]))) {
    throw ERROR_FACTORY2.create("fetch-parse-error", {
      originalErrorMessage: `ttl field (timeToLive) is not in standard Protobuf Duration format: ${responseBody.ttl}`
    });
  }
  const timeToLiveAsNumber = Number(match[1]) * 1e3;
  const now = Date.now();
  return {
    token: responseBody.token,
    expireTimeMillis: now + timeToLiveAsNumber,
    issuedAtTimeMillis: now
  };
}
function getExchangeDebugTokenRequest(app, debugToken) {
  const { projectId, appId, apiKey } = app.options;
  return {
    url: `${BASE_ENDPOINT}/projects/${projectId}/apps/${appId}:${EXCHANGE_DEBUG_TOKEN_METHOD}?key=${apiKey}`,
    body: {
      debug_token: debugToken
    }
  };
}
function getDBPromise() {
  if (dbPromise2) {
    return dbPromise2;
  }
  dbPromise2 = new Promise((resolve2, reject) => {
    var _a;
    try {
      const request = indexedDB.open(DB_NAME3, DB_VERSION3);
      request.onsuccess = (event2) => {
        resolve2(event2.target.result);
      };
      request.onerror = (event2) => {
        var _a2;
        reject(ERROR_FACTORY2.create("storage-open", {
          originalErrorMessage: (_a2 = event2.target.error) === null || _a2 === void 0 ? void 0 : _a2.message
        }));
      };
      request.onupgradeneeded = (event2) => {
        const db3 = event2.target.result;
        switch (event2.oldVersion) {
          case 0:
            db3.createObjectStore(STORE_NAME2, {
              keyPath: "compositeKey"
            });
        }
      };
    } catch (e) {
      reject(ERROR_FACTORY2.create("storage-open", {
        originalErrorMessage: (_a = e) === null || _a === void 0 ? void 0 : _a.message
      }));
    }
  });
  return dbPromise2;
}
function writeTokenToIndexedDB(app, token) {
  return write(computeKey2(app), token);
}
async function write(key2, value) {
  const db3 = await getDBPromise();
  const transaction = db3.transaction(STORE_NAME2, "readwrite");
  const store = transaction.objectStore(STORE_NAME2);
  const request = store.put({
    compositeKey: key2,
    value
  });
  return new Promise((resolve2, reject) => {
    request.onsuccess = (_event) => {
      resolve2();
    };
    transaction.onerror = (event2) => {
      var _a;
      reject(ERROR_FACTORY2.create("storage-set", {
        originalErrorMessage: (_a = event2.target.error) === null || _a === void 0 ? void 0 : _a.message
      }));
    };
  });
}
function computeKey2(app) {
  return `${app.options.appId}-${app.name}`;
}
function writeTokenToStorage(app, token) {
  if (isIndexedDBAvailable()) {
    return writeTokenToIndexedDB(app, token).catch((e) => {
      logger2.warn(`Failed to write token to IndexedDB. Error: ${e}`);
    });
  }
  return Promise.resolve();
}
function isDebugMode() {
  const debugState = getDebugState();
  return debugState.enabled;
}
async function getDebugToken() {
  const state = getDebugState();
  if (state.enabled && state.token) {
    return state.token.promise;
  } else {
    throw Error(`
            Can't get debug token in production mode.
        `);
  }
}
function formatDummyToken(tokenErrorData) {
  return base642.encodeString(
    JSON.stringify(tokenErrorData),
    false
  );
}
async function getToken$2(appCheck, forceRefresh = false) {
  const app = appCheck.app;
  ensureActivated(app);
  const state = getState(app);
  let token = state.token;
  let error2 = void 0;
  if (!token) {
    const cachedToken = await state.cachedTokenPromise;
    if (cachedToken && isValid(cachedToken)) {
      token = cachedToken;
    }
  }
  if (!forceRefresh && token && isValid(token)) {
    return {
      token: token.token
    };
  }
  let shouldCallListeners = false;
  if (isDebugMode()) {
    if (!state.exchangeTokenPromise) {
      state.exchangeTokenPromise = exchangeToken(getExchangeDebugTokenRequest(app, await getDebugToken()), appCheck.heartbeatServiceProvider).then((token2) => {
        state.exchangeTokenPromise = void 0;
        return token2;
      });
      shouldCallListeners = true;
    }
    const tokenFromDebugExchange = await state.exchangeTokenPromise;
    await writeTokenToStorage(app, tokenFromDebugExchange);
    setState(app, Object.assign(Object.assign({}, state), { token: tokenFromDebugExchange }));
    return { token: tokenFromDebugExchange.token };
  }
  try {
    if (!state.exchangeTokenPromise) {
      state.exchangeTokenPromise = state.provider.getToken().then((token2) => {
        state.exchangeTokenPromise = void 0;
        return token2;
      });
      shouldCallListeners = true;
    }
    token = await state.exchangeTokenPromise;
  } catch (e) {
    if (e.code === `appCheck/${"throttled"}`) {
      logger2.warn(e.message);
    } else {
      logger2.error(e);
    }
    error2 = e;
  }
  let interopTokenResult;
  if (!token) {
    interopTokenResult = makeDummyTokenResult(error2);
  } else {
    interopTokenResult = {
      token: token.token
    };
    setState(app, Object.assign(Object.assign({}, state), { token }));
    await writeTokenToStorage(app, token);
  }
  if (shouldCallListeners) {
    notifyTokenListeners(app, interopTokenResult);
  }
  return interopTokenResult;
}
function addTokenListener(appCheck, type, listener, onError) {
  const { app } = appCheck;
  const state = getState(app);
  const tokenObserver = {
    next: listener,
    error: onError,
    type
  };
  setState(app, Object.assign(Object.assign({}, state), { tokenObservers: [...state.tokenObservers, tokenObserver] }));
  if (state.token && isValid(state.token)) {
    const validToken = state.token;
    Promise.resolve().then(() => {
      listener({ token: validToken.token });
      initTokenRefresher(appCheck);
    }).catch(() => {
    });
  }
  void state.cachedTokenPromise.then(() => initTokenRefresher(appCheck));
}
function removeTokenListener(app, listener) {
  const state = getState(app);
  const newObservers = state.tokenObservers.filter((tokenObserver) => tokenObserver.next !== listener);
  if (newObservers.length === 0 && state.tokenRefresher && state.tokenRefresher.isRunning()) {
    state.tokenRefresher.stop();
  }
  setState(app, Object.assign(Object.assign({}, state), { tokenObservers: newObservers }));
}
function initTokenRefresher(appCheck) {
  const { app } = appCheck;
  const state = getState(app);
  let refresher = state.tokenRefresher;
  if (!refresher) {
    refresher = createTokenRefresher(appCheck);
    setState(app, Object.assign(Object.assign({}, state), { tokenRefresher: refresher }));
  }
  if (!refresher.isRunning() && state.isTokenAutoRefreshEnabled) {
    refresher.start();
  }
}
function createTokenRefresher(appCheck) {
  const { app } = appCheck;
  return new Refresher(
    async () => {
      const state = getState(app);
      let result;
      if (!state.token) {
        result = await getToken$2(appCheck);
      } else {
        result = await getToken$2(appCheck, true);
      }
      if (result.error) {
        throw result.error;
      }
    },
    () => {
      return true;
    },
    () => {
      const state = getState(app);
      if (state.token) {
        let nextRefreshTimeMillis = state.token.issuedAtTimeMillis + (state.token.expireTimeMillis - state.token.issuedAtTimeMillis) * 0.5 + 5 * 60 * 1e3;
        const latestAllowableRefresh = state.token.expireTimeMillis - 5 * 60 * 1e3;
        nextRefreshTimeMillis = Math.min(nextRefreshTimeMillis, latestAllowableRefresh);
        return Math.max(0, nextRefreshTimeMillis - Date.now());
      } else {
        return 0;
      }
    },
    TOKEN_REFRESH_TIME.RETRIAL_MIN_WAIT,
    TOKEN_REFRESH_TIME.RETRIAL_MAX_WAIT
  );
}
function notifyTokenListeners(app, token) {
  const observers = getState(app).tokenObservers;
  for (const observer of observers) {
    try {
      if (observer.type === "EXTERNAL" && token.error != null) {
        observer.error(token.error);
      } else {
        observer.next(token);
      }
    } catch (e) {
    }
  }
}
function isValid(token) {
  return token.expireTimeMillis - Date.now() > 0;
}
function makeDummyTokenResult(error2) {
  return {
    token: formatDummyToken(defaultTokenErrorData),
    error: error2
  };
}
function factory2(app, heartbeatServiceProvider) {
  return new AppCheckService(app, heartbeatServiceProvider);
}
function internalFactory(appCheck) {
  return {
    getToken: (forceRefresh) => getToken$2(appCheck, forceRefresh),
    addTokenListener: (listener) => addTokenListener(appCheck, "INTERNAL", listener),
    removeTokenListener: (listener) => removeTokenListener(appCheck.app, listener)
  };
}
function registerAppCheck() {
  _registerComponent(new Component(APP_CHECK_NAME, (container) => {
    const app = container.getProvider("app").getImmediate();
    const heartbeatServiceProvider = container.getProvider("heartbeat");
    return factory2(app, heartbeatServiceProvider);
  }, "PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((container, _identifier, _appcheckService) => {
    container.getProvider(APP_CHECK_NAME_INTERNAL).initialize();
  }));
  _registerComponent(new Component(APP_CHECK_NAME_INTERNAL, (container) => {
    const appCheck = container.getProvider("app-check").getImmediate();
    return internalFactory(appCheck);
  }, "PUBLIC").setInstantiationMode("EXPLICIT"));
  registerVersion(name5, version5);
}
var APP_CHECK_STATES, DEFAULT_STATE, DEBUG_STATE, BASE_ENDPOINT, EXCHANGE_DEBUG_TOKEN_METHOD, TOKEN_REFRESH_TIME, ONE_DAY, Refresher, ERRORS2, ERROR_FACTORY2, DB_NAME3, DB_VERSION3, STORE_NAME2, dbPromise2, logger2, defaultTokenErrorData, AppCheckService, name5, version5, APP_CHECK_NAME, APP_CHECK_NAME_INTERNAL;
var init_index_esm20178 = __esm({
  "node_modules/@firebase/app-check/dist/esm/index.esm2017.js"() {
    init_index_esm20174();
    init_index_esm20172();
    init_index_esm2017();
    init_index_esm20173();
    APP_CHECK_STATES = /* @__PURE__ */ new Map();
    DEFAULT_STATE = {
      activated: false,
      tokenObservers: []
    };
    DEBUG_STATE = {
      initialized: false,
      enabled: false
    };
    BASE_ENDPOINT = "https://content-firebaseappcheck.googleapis.com/v1";
    EXCHANGE_DEBUG_TOKEN_METHOD = "exchangeDebugToken";
    TOKEN_REFRESH_TIME = {
      OFFSET_DURATION: 5 * 60 * 1e3,
      RETRIAL_MIN_WAIT: 30 * 1e3,
      RETRIAL_MAX_WAIT: 16 * 60 * 1e3
    };
    ONE_DAY = 24 * 60 * 60 * 1e3;
    Refresher = class {
      constructor(operation, retryPolicy, getWaitDuration, lowerBound, upperBound) {
        this.operation = operation;
        this.retryPolicy = retryPolicy;
        this.getWaitDuration = getWaitDuration;
        this.lowerBound = lowerBound;
        this.upperBound = upperBound;
        this.pending = null;
        this.nextErrorWaitInterval = lowerBound;
        if (lowerBound > upperBound) {
          throw new Error("Proactive refresh lower bound greater than upper bound!");
        }
      }
      start() {
        this.nextErrorWaitInterval = this.lowerBound;
        this.process(true).catch(() => {
        });
      }
      stop() {
        if (this.pending) {
          this.pending.reject("cancelled");
          this.pending = null;
        }
      }
      isRunning() {
        return !!this.pending;
      }
      async process(hasSucceeded) {
        this.stop();
        try {
          this.pending = new Deferred();
          await sleep(this.getNextRun(hasSucceeded));
          this.pending.resolve();
          await this.pending.promise;
          this.pending = new Deferred();
          await this.operation();
          this.pending.resolve();
          await this.pending.promise;
          this.process(true).catch(() => {
          });
        } catch (error2) {
          if (this.retryPolicy(error2)) {
            this.process(false).catch(() => {
            });
          } else {
            this.stop();
          }
        }
      }
      getNextRun(hasSucceeded) {
        if (hasSucceeded) {
          this.nextErrorWaitInterval = this.lowerBound;
          return this.getWaitDuration();
        } else {
          const currentErrorWaitInterval = this.nextErrorWaitInterval;
          this.nextErrorWaitInterval *= 2;
          if (this.nextErrorWaitInterval > this.upperBound) {
            this.nextErrorWaitInterval = this.upperBound;
          }
          return currentErrorWaitInterval;
        }
      }
    };
    ERRORS2 = {
      ["already-initialized"]: "You have already called initializeAppCheck() for FirebaseApp {$appName} with different options. To avoid this error, call initializeAppCheck() with the same options as when it was originally called. This will return the already initialized instance.",
      ["use-before-activation"]: "App Check is being used before initializeAppCheck() is called for FirebaseApp {$appName}. Call initializeAppCheck() before instantiating other Firebase services.",
      ["fetch-network-error"]: "Fetch failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.",
      ["fetch-parse-error"]: "Fetch client could not parse response. Original error: {$originalErrorMessage}.",
      ["fetch-status-error"]: "Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.",
      ["storage-open"]: "Error thrown when opening storage. Original error: {$originalErrorMessage}.",
      ["storage-get"]: "Error thrown when reading from storage. Original error: {$originalErrorMessage}.",
      ["storage-set"]: "Error thrown when writing to storage. Original error: {$originalErrorMessage}.",
      ["recaptcha-error"]: "ReCAPTCHA error.",
      ["throttled"]: `Requests throttled due to {$httpStatus} error. Attempts allowed again after {$time}`
    };
    ERROR_FACTORY2 = new ErrorFactory("appCheck", "AppCheck", ERRORS2);
    DB_NAME3 = "firebase-app-check-database";
    DB_VERSION3 = 1;
    STORE_NAME2 = "firebase-app-check-store";
    dbPromise2 = null;
    logger2 = new Logger("@firebase/app-check");
    defaultTokenErrorData = { error: "UNKNOWN_ERROR" };
    AppCheckService = class {
      constructor(app, heartbeatServiceProvider) {
        this.app = app;
        this.heartbeatServiceProvider = heartbeatServiceProvider;
      }
      _delete() {
        const { tokenObservers } = getState(this.app);
        for (const tokenObserver of tokenObservers) {
          removeTokenListener(this.app, tokenObserver.next);
        }
        return Promise.resolve();
      }
    };
    name5 = "@firebase/app-check";
    version5 = "0.5.12";
    APP_CHECK_NAME = "app-check";
    APP_CHECK_NAME_INTERNAL = "app-check-internal";
    registerAppCheck();
  }
});

// node_modules/firebase/app-check/dist/index.esm.js
var init_index_esm5 = __esm({
  "node_modules/firebase/app-check/dist/index.esm.js"() {
    init_index_esm20178();
  }
});

// .svelte-kit/output/server/chunks/db.js
function getFirebase() {
  if (getApps().length == 0) {
    const app = initializeApp(config.firebase);
    La2(app, { ignoreUndefinedProperties: true });
  }
  return { db: Ua2(), storager: getStorage(), auth: getAuth() };
}
function stringToFixture(val) {
  const [team1ID, team2ID, time, team1, team2] = JSON.parse(val);
  return { team1ID, team2ID, time, scores: team1 === void 0 ? void 0 : { team1, team2 } };
}
function stringToPlayer(val) {
  const [
    teamID,
    jerseyNum,
    name6,
    displayImage,
    position,
    instagramUsername,
    place,
    matchesPlayed,
    goals,
    assists,
    passes,
    tackles,
    dribbles,
    shots,
    yellowCard,
    redCard,
    goalConceived,
    goalSaved,
    handling
  ] = JSON.parse(val);
  return {
    teamID,
    jerseyNum,
    name: name6,
    displayImage,
    position,
    instagramUsername,
    place,
    matchesPlayed,
    goals,
    assists,
    passes,
    tackles,
    dribbles,
    shots,
    yellowCard,
    redCard,
    goalConceived,
    goalSaved,
    handling
  };
}
function stringToTeam(val) {
  const [name6, acronym, logo, teamChemistry, color] = JSON.parse(val);
  return { teamChemistry, acronym, name: name6, logo, color };
}
function parseEventDocument(doc2) {
  const teams = {};
  const players = {};
  const fixtures = Object.entries(doc2.fixtures).map(function(x3) {
    const fixture = stringToFixture(x3[1]);
    let team1;
    let team2;
    const date = new Date(fixture.time);
    return {
      ...fixture,
      id: x3[0],
      displayTime: date.toLocaleTimeString(),
      displayDate: date.toLocaleDateString(),
      get team1() {
        return team1 ?? (team1 = teams[this.team1ID]);
      },
      get team2() {
        return team2 ?? (team2 = teams[this.team2ID]);
      }
    };
  }).sort((x3, y2) => x3.time.localeCompare(y2.time));
  const sortedTeams = Object.entries(doc2.teams).map(function(x3) {
    const id2 = x3[0];
    const data = {};
    function initFixtures() {
      data.won = 0;
      data.loss = 0;
      data.matchesPlayed = 0;
      data.goalScored = 0;
      data.goalConceived = 0;
      for (const fixture of fixtures) {
        if (fixture.scores) {
          if (id2 === fixture.team1ID) {
            data.matchesPlayed += 1;
            data.goalScored += fixture.scores.team1;
            data.goalConceived += fixture.scores.team2;
            if (fixture.scores.team1 > fixture.scores.team2) {
              data.won += 1;
            } else {
              data.loss += 1;
            }
          } else if (id2 === fixture.team2ID) {
            data.matchesPlayed += 1;
            data.goalScored += fixture.scores.team2;
            data.goalConceived += fixture.scores.team1;
            if (fixture.scores.team2 > fixture.scores.team1) {
              data.won += 1;
            } else {
              data.loss += 1;
            }
          }
        }
      }
    }
    return teams[id2] = {
      id: id2,
      ...stringToTeam(x3[1]),
      players: [],
      get matchesPlayed() {
        if (!("matchesPlayed" in data))
          initFixtures();
        return data.matchesPlayed;
      },
      get won() {
        if (!("won" in data))
          initFixtures();
        return data.won;
      },
      get loss() {
        if (!("loss" in data))
          initFixtures();
        return data.loss;
      },
      get goalScored() {
        if (!("goalScored" in data))
          initFixtures();
        return data.goalScored;
      },
      get goalConceived() {
        if (!("goalConceived" in data))
          initFixtures();
        return data.goalConceived;
      },
      get attack() {
        return data.attack ?? (data.attack = this.players.reduce((p2, c) => p2 + c.attack, 0) / this.players.length);
      },
      get possession() {
        return data.possession ?? (data.possession = this.players.reduce((p2, c) => p2 + c.possession, 0) / this.players.length);
      },
      get defence() {
        return data.defence ?? (data.defence = this.players.reduce((p2, c) => p2 + c.defence, 0) / this.players.length);
      },
      get score() {
        return data.score ?? (data.score = (this.attack + this.possession + this.defence) / 3);
      },
      get points() {
        return data.points ?? (data.points = this.won - this.loss + this.matchesPlayed);
      },
      get goalDifference() {
        return data.goalDifference ?? (data.goalDifference = this.goalScored - this.goalConceived);
      }
    };
  }).sort((a, b) => b.points - a.points);
  let maxAttack = 1;
  let maxPossession = 1;
  let maxDefence = 1;
  const sortedPlayers = Object.entries(doc2.players).map(function(x3) {
    const id2 = x3[0];
    const data = {};
    const player = stringToPlayer(x3[1]);
    const common = player.goals * 40 + player.assists * 20 + player.passes * 0.2;
    const _attack = common + player.shots * 6;
    const _possession = common + player.dribbles * 0.5;
    const _defence = common + player.tackles * 4;
    if (_attack > maxAttack)
      maxAttack = _attack;
    if (_possession > maxPossession)
      maxPossession = _possession;
    if (_defence > maxDefence)
      maxDefence = _defence;
    return players[id2] = {
      ...player,
      id: id2,
      team: teams[player.teamID],
      _attack,
      _defence,
      _possession,
      get isGoalkeeper() {
        return data.isGoalkeeper ?? (data.isGoalkeeper = this.position === "Goalkeeper");
      },
      get attack() {
        return data.attack ?? (data.attack = 99 * this._attack / maxAttack);
      },
      get possession() {
        return data.possession ?? (data.possession = 99 * this._possession / maxPossession);
      },
      get defence() {
        return data.defence ?? (data.defence = 99 * this._defence / maxDefence);
      },
      get conceiveRate() {
        return data.defence ?? (data.defence = 100 * this.goalConceived / this.goalSaved);
      },
      get score() {
        return data.score ?? (data.score = (this.attack + this.possession + this.defence) / 3);
      },
      get goalkeeperPoints() {
        return data.goalkeeperPoints ?? (data.goalkeeperPoints = (this.conceiveRate + this.possession + this.handling) / 3);
      }
    };
  }).sort((a, b) => b.goals * 1e3 + b.assists - a.goals * 1e3 - a.assists);
  const sortedGoalkeepers = [...sortedPlayers].filter(function(x3) {
    x3.team.players.push(x3);
    return x3.isGoalkeeper;
  }).sort((a, b) => b.handling - a.handling);
  let upcommingFixtures;
  return {
    liveStream: doc2.liveStream,
    fixtures,
    teams,
    players,
    sortedPlayers,
    sortedGoalkeepers,
    sortedTeams,
    get upcommingFixtures() {
      if (!(upcommingFixtures == null ? void 0 : upcommingFixtures.length)) {
        const now = new Date().toISOString();
        upcommingFixtures = fixtures.filter((f) => f.time.localeCompare(now) > 0);
      }
      return upcommingFixtures;
    }
  };
}
function videoRelated(id2) {
  return Kh(videosRef, Qh("connectionIDs", "array-contains", id2));
}
function getContent(str) {
  var re2 = / (@p|#t)-\d+ /g;
  let match;
  const val = [];
  let lastIndex = 0;
  while ((match = re2.exec(str)) != null) {
    if (match[1] === "@p") {
      const proxy2 = str.substring(lastIndex, match.index).split("\n");
      const text2 = [];
      for (let i = 0; i < proxy2.length; i++) {
        text2.push(proxy2[i], null);
      }
      text2.pop();
      val.push({ type: "text", text: text2 }, { type: "player", playerID: match[0].trim().substring(1) });
      lastIndex = match.index + match[0].length;
    } else if (match[1] === "#t") {
      const proxy2 = str.substring(lastIndex, match.index).split("\n");
      const text2 = [];
      for (let i = 0; i < proxy2.length; i++) {
        text2.push(proxy2[i], null);
      }
      text2.pop();
      val.push({ type: "text", text: text2 }, { type: "team", teamID: match[0].trim().substring(1) });
      lastIndex = match.index + match[0].length;
    }
  }
  const proxy = str.substring(lastIndex).split("\n");
  const text = [];
  for (let i = 0; i < proxy.length; i++) {
    text.push(proxy[i], null);
  }
  text.pop();
  val.push({ type: "text", text });
  return val;
}
function newsRelated(id2) {
  return Kh(newsRef, Qh("connectionIDs", "array-contains", id2));
}
var config, db2, eventRef, videoColl, newsColl, EventRef, VideoColl, videosRef, NewsColl, newsRef;
var init_db = __esm({
  ".svelte-kit/output/server/chunks/db.js"() {
    init_index_esm20176();
    init_index_esm();
    init_index_esm2();
    init_index_esm3();
    init_index_esm4();
    init_index_esm5();
    init_index_esm20177();
    config = {
      firebase: {
        apiKey: "AIzaSyCjxN7Imh2gGYb8TyuK4PeQ2LlEJKiVaqM",
        authDomain: "huddle-and-score.firebaseapp.com",
        projectId: "huddle-and-score",
        storageBucket: "huddle-and-score.appspot.com",
        messagingSenderId: "121551594521",
        appId: "1:121551594521:web:0657876815a5e27d3d7688",
        measurementId: "G-G6T6VSGMKF"
      },
      ReCaptchaV3Provider_siteKey: "6Ld7vOwhAAAAALgtN6_V2gP6dFdm-zI0xeSKSVY1"
    };
    ({ db: db2 } = getFirebase());
    eventRef = xa2(db2, "Event/001");
    eventRef.id;
    getFirebase();
    getFirebase();
    videoColl = Da(eventRef, "Video/");
    getFirebase();
    newsColl = Da(eventRef, "News/");
    getFirebase();
    getFirebase();
    EventRef = eventRef.withConverter({
      fromFirestore(snapshot) {
        return parseEventDocument(snapshot.data());
      },
      toFirestore() {
        throw "unimplemented";
      }
    });
    VideoColl = videoColl.withConverter({
      fromFirestore(snapshot) {
        let content;
        return {
          ...snapshot.data(),
          id: snapshot.id,
          get content() {
            return content ?? (content = getContent(this.caption));
          }
        };
      },
      toFirestore() {
        throw "unimplemented";
      }
    });
    videosRef = Kh(VideoColl, Wh("createdAt", "desc"));
    NewsColl = newsColl.withConverter({
      fromFirestore(snapshot) {
        let content;
        return {
          ...snapshot.data(),
          id: snapshot.id,
          get content() {
            return content ?? (content = getContent(this.caption));
          }
        };
      },
      toFirestore() {
        throw "unimplemented";
      }
    });
    newsRef = Kh(NewsColl, Wh("createdAt", "desc"));
  }
});

// .svelte-kit/output/server/entries/pages/_layout.ts.js
var layout_ts_exports = {};
__export(layout_ts_exports, {
  load: () => load
});
var load;
var init_layout_ts = __esm({
  ".svelte-kit/output/server/entries/pages/_layout.ts.js"() {
    init_db();
    init_index_esm2();
    init_index2();
    init_index_esm20176();
    init_index_esm();
    init_index_esm3();
    init_index_esm4();
    init_index_esm5();
    init_index_esm20177();
    load = async () => {
      try {
        const res = await dl(EventRef);
        const event2 = res.data();
        if (!event2)
          throw error(404, "Not found");
        return event2;
      } catch (e) {
        throw error(404, "Not found");
      }
    };
  }
});

// .svelte-kit/output/server/chunks/state.js
var event, _store, _ref, _askedFor, _currentlyListningTo, _unSub, LatestListner, latestNewsListner, latestVideosListner, _store2, _ref2, _askedFor2, _currentlyListningTo2, _unSub2, _connectTo, SelectiveListner, selectiveNewsListner, selectiveVideoListner;
var init_state = __esm({
  ".svelte-kit/output/server/chunks/state.js"() {
    init_index_esm2();
    init_index3();
    init_db();
    event = writable();
    LatestListner = class {
      constructor(ref) {
        __privateAdd(this, _store, void 0);
        __privateAdd(this, _ref, void 0);
        __privateAdd(this, _askedFor, void 0);
        __privateAdd(this, _currentlyListningTo, void 0);
        __privateAdd(this, _unSub, void 0);
        __privateSet(this, _store, writable({
          askedFor: 0,
          data: [],
          loading: true
        }));
        __privateSet(this, _ref, ref);
        __privateSet(this, _askedFor, 0);
        __privateSet(this, _currentlyListningTo, 0);
      }
      get store() {
        return __privateGet(this, _store);
      }
      get unSub() {
        return __privateGet(this, _unSub);
      }
      seeMore() {
        var _a;
        if (__privateGet(this, _askedFor) !== __privateGet(this, _currentlyListningTo))
          return;
        __privateSet(this, _askedFor, __privateGet(this, _askedFor) + 5);
        __privateGet(this, _store).update((x3) => ({ loading: true, data: x3.data, askedFor: __privateGet(this, _askedFor) }));
        (_a = __privateGet(this, _unSub)) == null ? void 0 : _a.call(this);
        const listner = this;
        __privateSet(this, _unSub, Rl(Kh(__privateGet(this, _ref), Hh(__privateGet(this, _askedFor))), {
          next(snap) {
            __privateSet(listner, _currentlyListningTo, snap.docs.length);
            __privateGet(listner, _store).set({
              data: snap.docs.map((x3) => x3.data()),
              loading: false,
              askedFor: __privateGet(listner, _askedFor)
            });
          }
        }));
      }
    };
    _store = new WeakMap();
    _ref = new WeakMap();
    _askedFor = new WeakMap();
    _currentlyListningTo = new WeakMap();
    _unSub = new WeakMap();
    latestNewsListner = new LatestListner(newsRef);
    latestVideosListner = new LatestListner(videosRef);
    SelectiveListner = class {
      constructor(ref) {
        __privateAdd(this, _store2, void 0);
        __privateAdd(this, _ref2, void 0);
        __privateAdd(this, _askedFor2, void 0);
        __privateAdd(this, _currentlyListningTo2, void 0);
        __privateAdd(this, _unSub2, void 0);
        __privateAdd(this, _connectTo, void 0);
        __privateSet(this, _store2, writable({
          askedFor: 0,
          data: [],
          loading: true
        }));
        __privateSet(this, _ref2, ref);
        __privateSet(this, _askedFor2, 0);
        __privateSet(this, _currentlyListningTo2, 0);
      }
      get connectTo() {
        return __privateGet(this, _connectTo);
      }
      set connectTo(newVal) {
        var _a;
        if (newVal === __privateGet(this, _connectTo))
          return;
        (_a = __privateGet(this, _unSub2)) == null ? void 0 : _a.call(this);
        __privateSet(this, _unSub2, void 0);
        __privateGet(this, _store2).set({ askedFor: 0, data: [], loading: false });
        __privateSet(this, _askedFor2, 0);
        __privateSet(this, _currentlyListningTo2, 0);
        if (__privateSet(this, _connectTo, newVal))
          this.seeMore();
      }
      get store() {
        return __privateGet(this, _store2);
      }
      seeMore() {
        var _a;
        if (!__privateGet(this, _connectTo))
          return;
        if (__privateGet(this, _askedFor2) !== __privateGet(this, _currentlyListningTo2))
          return;
        __privateSet(this, _askedFor2, __privateGet(this, _askedFor2) + 5);
        __privateGet(this, _store2).update((x3) => ({ loading: true, data: x3.data, askedFor: __privateGet(this, _askedFor2) }));
        (_a = __privateGet(this, _unSub2)) == null ? void 0 : _a.call(this);
        const listner = this;
        __privateSet(this, _unSub2, Rl(Kh(__privateGet(this, _ref2).call(this, __privateGet(this, _connectTo)), Hh(__privateGet(this, _askedFor2))), {
          next(snap) {
            __privateSet(listner, _currentlyListningTo2, snap.docs.length);
            __privateGet(listner, _store2).set({
              data: snap.docs.map((x3) => x3.data()),
              loading: false,
              askedFor: __privateGet(listner, _askedFor2)
            });
          }
        }));
      }
    };
    _store2 = new WeakMap();
    _ref2 = new WeakMap();
    _askedFor2 = new WeakMap();
    _currentlyListningTo2 = new WeakMap();
    _unSub2 = new WeakMap();
    _connectTo = new WeakMap();
    selectiveNewsListner = new SelectiveListner(newsRelated);
    selectiveVideoListner = new SelectiveListner(videoRelated);
  }
});

// .svelte-kit/output/server/entries/pages/_layout.svelte.js
var layout_svelte_exports = {};
__export(layout_svelte_exports, {
  default: () => Layout
});
var Latest, Ranking, Profile, Photos, Layout;
var init_layout_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/_layout.svelte.js"() {
    init_chunks();
    init_index_esm();
    init_index_esm2();
    init_index_esm3();
    init_index_esm4();
    init_index_esm5();
    init_db();
    init_state();
    init_index_esm20176();
    init_index_esm20177();
    init_index3();
    Latest = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<svg width="${"41"}" height="${"45"}" viewBox="${"0 0 41 45"}" fill="${"none"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"M28.7507 24.8372V2.74946C28.7497 2.39113 28.6069 2.04777 28.3535 1.79439C28.1001 1.54101 27.7568 1.3982 27.3984 1.39716H12.0723C11.7139 1.3982 11.3706 1.54101 11.1172 1.79439C10.8638 2.04777 10.721 2.39113 10.72 2.74946V22.5833C10.7218 23.1805 10.9598 23.7528 11.3821 24.175C11.8044 24.5973 12.3766 24.8354 12.9738 24.8372H28.7507Z"}" stroke="${"black"}" stroke-width="${"1.23368"}" stroke-linejoin="${"round"}"></path><path d="${"M21.5385 5.90485H25.1446M21.5385 9.511H25.1446M14.3262 13.1172H25.1446M14.3262 16.7233H25.1446M14.3262 20.3295H25.1446"}" stroke="${"black"}" stroke-width="${"1.23368"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}"></path><path d="${"M18.0826 10.4125H15.0775C14.8782 10.4125 14.6871 10.3334 14.5462 10.1925C14.4053 10.0516 14.3262 9.86051 14.3262 9.66126V6.65613C14.3262 6.45688 14.4053 6.26578 14.5462 6.12489C14.6871 5.984 14.8782 5.90485 15.0775 5.90485H18.0826C18.2818 5.90485 18.4729 5.984 18.6138 6.12489C18.7547 6.26578 18.8339 6.45688 18.8339 6.65613V9.66126C18.8339 9.86051 18.7547 10.0516 18.6138 10.1925C18.4729 10.3334 18.2818 10.4125 18.0826 10.4125Z"}" fill="${"black"}"></path><path d="${"M0.114803 43.86V33.7128H1.6458V42.542H6.24374V43.86H0.114803ZM10.0861 44.0284C9.60384 44.0284 9.16783 43.9393 8.77806 43.7609C8.3883 43.5792 8.07945 43.3166 7.85154 42.9731C7.62693 42.6296 7.51462 42.2084 7.51462 41.7097C7.51462 41.2802 7.5972 40.9268 7.76235 40.6494C7.92751 40.3719 8.15047 40.1522 8.43124 39.9904C8.712 39.8285 9.0258 39.7063 9.37263 39.6237C9.71945 39.5412 10.0729 39.4784 10.4329 39.4355C10.8888 39.3826 11.2587 39.3397 11.5428 39.3066C11.8268 39.2703 12.0333 39.2125 12.1621 39.1332C12.2909 39.0539 12.3553 38.9251 12.3553 38.7468V38.7121C12.3553 38.2794 12.2331 37.9441 11.9887 37.7063C11.7476 37.4684 11.3875 37.3495 10.9086 37.3495C10.4098 37.3495 10.0167 37.4602 9.72936 37.6815C9.44529 37.8995 9.24876 38.1423 9.13976 38.4098L7.74749 38.0927C7.91265 37.6303 8.15377 37.257 8.47087 36.973C8.79128 36.6856 9.15957 36.4775 9.57577 36.3487C9.99196 36.2166 10.4296 36.1505 10.8888 36.1505C11.1926 36.1505 11.5147 36.1868 11.8549 36.2595C12.1984 36.3289 12.5188 36.4577 12.8161 36.646C13.1167 36.8342 13.3628 37.1035 13.5544 37.4536C13.746 37.8004 13.8417 38.2513 13.8417 38.8062V43.86H12.395V42.8195H12.3355C12.2397 43.0111 12.096 43.1994 11.9045 43.3843C11.7129 43.5693 11.4668 43.7229 11.1662 43.8451C10.8656 43.9673 10.5056 44.0284 10.0861 44.0284ZM10.4082 42.8393C10.8177 42.8393 11.1679 42.7584 11.4585 42.5965C11.7525 42.4347 11.9755 42.2233 12.1274 41.9623C12.2827 41.6981 12.3603 41.4157 12.3603 41.1151V40.1341C12.3074 40.1869 12.2051 40.2365 12.0531 40.2827C11.9045 40.3256 11.7344 40.3636 11.5428 40.3967C11.3512 40.4264 11.1646 40.4545 10.9829 40.4809C10.8012 40.504 10.6493 40.5238 10.5271 40.5403C10.2397 40.5767 9.9771 40.6378 9.73927 40.7237C9.50475 40.8096 9.31647 40.9334 9.17444 41.0953C9.03571 41.2538 8.96634 41.4652 8.96634 41.7295C8.96634 42.0961 9.10177 42.3736 9.37263 42.5619C9.64348 42.7468 9.98866 42.8393 10.4082 42.8393ZM19.3675 36.2496V37.4387H15.2105V36.2496H19.3675ZM16.3253 34.4263H17.8067V41.6254C17.8067 41.9128 17.8497 42.1291 17.9356 42.2745C18.0214 42.4165 18.1321 42.514 18.2675 42.5668C18.4062 42.6164 18.5565 42.6411 18.7184 42.6411C18.8373 42.6411 18.9414 42.6329 19.0305 42.6164C19.1197 42.5998 19.1891 42.5866 19.2386 42.5767L19.5062 43.8005C19.4203 43.8336 19.2981 43.8666 19.1395 43.8996C18.981 43.936 18.7828 43.9558 18.545 43.9591C18.1552 43.9657 17.7919 43.8963 17.4549 43.751C17.118 43.6056 16.8455 43.381 16.6374 43.0771C16.4293 42.7733 16.3253 42.3917 16.3253 41.9326V34.4263ZM24.2045 44.0136C23.4547 44.0136 22.8089 43.8534 22.2672 43.533C21.7288 43.2093 21.3126 42.7551 21.0186 42.1704C20.7279 41.5825 20.5826 40.8938 20.5826 40.1043C20.5826 39.3248 20.7279 38.6378 21.0186 38.0432C21.3126 37.4486 21.7222 36.9845 22.2474 36.6509C22.7759 36.3173 23.3935 36.1505 24.1004 36.1505C24.5298 36.1505 24.946 36.2215 25.349 36.3636C25.752 36.5056 26.1137 36.7285 26.4341 37.0324C26.7545 37.3363 27.0072 37.731 27.1921 38.2166C27.3771 38.6989 27.4696 39.2852 27.4696 39.9755V40.5007H21.4199V39.3909H26.0179C26.0179 39.0011 25.9386 38.6559 25.7801 38.3553C25.6215 38.0514 25.3985 37.812 25.1112 37.6369C24.8271 37.4618 24.4935 37.3743 24.1103 37.3743C23.6941 37.3743 23.3308 37.4767 23.0203 37.6815C22.7131 37.883 22.4753 38.1472 22.3068 38.4742C22.1417 38.798 22.0591 39.1497 22.0591 39.5296V40.3967C22.0591 40.9053 22.1483 41.3381 22.3266 41.6948C22.5083 42.0515 22.761 42.324 23.0847 42.5123C23.4084 42.6973 23.7866 42.7898 24.2193 42.7898C24.5001 42.7898 24.7561 42.7501 24.9873 42.6709C25.2185 42.5883 25.4184 42.4661 25.5868 42.3042C25.7553 42.1424 25.8841 41.9425 25.9733 41.7047L27.3755 41.9574C27.2632 42.3703 27.0617 42.732 26.771 43.0425C26.4836 43.3497 26.1219 43.5891 25.6859 43.7609C25.2532 43.9294 24.7594 44.0136 24.2045 44.0136ZM34.8162 38.1076L33.4734 38.3454C33.4173 38.1737 33.3281 38.0102 33.2059 37.8549C33.087 37.6997 32.9251 37.5725 32.7203 37.4734C32.5155 37.3743 32.2595 37.3248 31.9523 37.3248C31.5328 37.3248 31.1827 37.4189 30.902 37.6072C30.6212 37.7922 30.4808 38.0316 30.4808 38.3256C30.4808 38.5799 30.5749 38.7847 30.7632 38.94C30.9515 39.0952 31.2554 39.2224 31.6749 39.3215L32.8838 39.599C33.5841 39.7608 34.106 40.0102 34.4495 40.3471C34.793 40.684 34.9648 41.1217 34.9648 41.6601C34.9648 42.1159 34.8327 42.5222 34.5684 42.879C34.3075 43.2324 33.9425 43.5099 33.4734 43.7113C33.0077 43.9128 32.4676 44.0136 31.8533 44.0136C31.001 44.0136 30.3057 43.8319 29.7673 43.4686C29.2289 43.1019 28.8986 42.5817 28.7764 41.9078L30.2083 41.6898C30.2975 42.0631 30.4808 42.3455 30.7583 42.5371C31.0357 42.7254 31.3974 42.8195 31.8433 42.8195C32.3289 42.8195 32.717 42.7188 33.0077 42.5173C33.2984 42.3125 33.4437 42.0631 33.4437 41.7691C33.4437 41.5313 33.3545 41.3314 33.1762 41.1696C33.0011 41.0077 32.7319 40.8855 32.3685 40.8029L31.0803 40.5205C30.3702 40.3587 29.845 40.101 29.5047 39.7476C29.1678 39.3942 28.9994 38.9466 28.9994 38.4049C28.9994 37.9557 29.1249 37.5626 29.3759 37.2257C29.6269 36.8887 29.9738 36.6262 30.4164 36.4379C30.859 36.2463 31.366 36.1505 31.9375 36.1505C32.76 36.1505 33.4074 36.3289 33.8797 36.6856C34.3521 37.039 34.6642 37.513 34.8162 38.1076ZM40.1461 36.2496V37.4387H35.9892V36.2496H40.1461ZM37.104 34.4263H38.5854V41.6254C38.5854 41.9128 38.6284 42.1291 38.7142 42.2745C38.8001 42.4165 38.9108 42.514 39.0462 42.5668C39.1849 42.6164 39.3352 42.6411 39.4971 42.6411C39.616 42.6411 39.72 42.6329 39.8092 42.6164C39.8984 42.5998 39.9678 42.5866 40.0173 42.5767L40.2849 43.8005C40.199 43.8336 40.0768 43.8666 39.9182 43.8996C39.7597 43.936 39.5615 43.9558 39.3237 43.9591C38.9339 43.9657 38.5706 43.8963 38.2336 43.751C37.8967 43.6056 37.6242 43.381 37.4161 43.0771C37.208 42.7733 37.104 42.3917 37.104 41.9326V34.4263Z"}" fill="${"black"}"></path></svg>`;
    });
    Ranking = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<svg width="${"52"}" height="${"47"}" viewBox="${"0 0 52 47"}" fill="${"none"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"M0.114803 43.0229V32.8757H3.73172C4.51786 32.8757 5.17023 33.0111 5.68882 33.282C6.21071 33.5528 6.60048 33.9277 6.85812 34.4067C7.11577 34.8823 7.24459 35.4323 7.24459 36.0566C7.24459 36.6776 7.11412 37.2243 6.85317 37.6966C6.59553 38.1656 6.20576 38.5306 5.68387 38.7916C5.16528 39.0525 4.51291 39.183 3.72677 39.183H0.986827V37.8651H3.58804C4.0835 37.8651 4.48648 37.794 4.79698 37.652C5.11077 37.51 5.34034 37.3035 5.48568 37.0327C5.63101 36.7618 5.70368 36.4365 5.70368 36.0566C5.70368 35.6734 5.62936 35.3415 5.48072 35.0607C5.33539 34.7799 5.10582 34.5652 4.79202 34.4166C4.48153 34.2647 4.07359 34.1887 3.56822 34.1887H1.6458V43.0229H0.114803ZM5.12399 38.4448L7.63106 43.0229H5.88701L3.42948 38.4448H5.12399ZM11.2034 43.1913C10.7211 43.1913 10.2851 43.1022 9.89534 42.9238C9.50558 42.7421 9.19673 42.4795 8.96882 42.136C8.74421 41.7925 8.6319 41.3713 8.6319 40.8726C8.6319 40.4432 8.71448 40.0897 8.87963 39.8123C9.04479 39.5348 9.26775 39.3151 9.54852 39.1533C9.82928 38.9914 10.1431 38.8692 10.4899 38.7866C10.8367 38.7041 11.1902 38.6413 11.5502 38.5984C12.006 38.5455 12.376 38.5026 12.6601 38.4695C12.9441 38.4332 13.1506 38.3754 13.2794 38.2961C13.4082 38.2168 13.4726 38.088 13.4726 37.9097V37.875C13.4726 37.4423 13.3504 37.107 13.106 36.8692C12.8648 36.6313 12.5048 36.5124 12.0259 36.5124C11.5271 36.5124 11.134 36.6231 10.8466 36.8444C10.5626 37.0624 10.366 37.3052 10.257 37.5727L8.86477 37.2556C9.02993 36.7932 9.27105 36.4199 9.58815 36.1359C9.90856 35.8485 10.2769 35.6404 10.693 35.5116C11.1092 35.3795 11.5469 35.3134 12.006 35.3134C12.3099 35.3134 12.632 35.3497 12.9722 35.4224C13.3157 35.4918 13.6361 35.6206 13.9334 35.8089C14.234 35.9971 14.4801 36.2664 14.6717 36.6165C14.8632 36.9633 14.959 37.4142 14.959 37.9691V43.0229H13.5123V41.9824H13.4528C13.357 42.174 13.2133 42.3623 13.0217 42.5472C12.8302 42.7322 12.5841 42.8858 12.2835 43.008C11.9829 43.1302 11.6229 43.1913 11.2034 43.1913ZM11.5254 42.0022C11.935 42.0022 12.2852 41.9213 12.5758 41.7594C12.8698 41.5976 13.0928 41.3862 13.2447 41.1252C13.4 40.861 13.4776 40.5786 13.4776 40.278V39.297C13.4247 39.3498 13.3223 39.3994 13.1704 39.4456C13.0217 39.4885 12.8516 39.5265 12.6601 39.5596C12.4685 39.5893 12.2818 39.6174 12.1002 39.6438C11.9185 39.6669 11.7666 39.6867 11.6443 39.7033C11.357 39.7396 11.0944 39.8007 10.8566 39.8866C10.622 39.9725 10.4338 40.0963 10.2917 40.2582C10.153 40.4167 10.0836 40.6281 10.0836 40.8924C10.0836 41.259 10.219 41.5365 10.4899 41.7248C10.7608 41.9097 11.1059 42.0022 11.5254 42.0022ZM18.4137 38.5042V43.0229H16.9322V35.4125H18.3542V36.6512H18.4484C18.6234 36.2482 18.8976 35.9245 19.2708 35.6801C19.6474 35.4356 20.1214 35.3134 20.6928 35.3134C21.2114 35.3134 21.6656 35.4224 22.0554 35.6404C22.4451 35.8551 22.7474 36.1755 22.9621 36.6016C23.1768 37.0277 23.2841 37.5546 23.2841 38.1822V43.0229H21.8027V38.3605C21.8027 37.8089 21.659 37.3779 21.3716 37.0674C21.0843 36.7536 20.6895 36.5967 20.1875 36.5967C19.8439 36.5967 19.5384 36.671 19.2708 36.8196C19.0066 36.9683 18.7968 37.1863 18.6416 37.4736C18.4897 37.7577 18.4137 38.1012 18.4137 38.5042ZM26.6335 40.4415L26.6236 38.633H26.8812L29.9135 35.4125H31.6873L28.2289 39.079H27.996L26.6335 40.4415ZM25.271 43.0229V32.8757H26.7524V43.0229H25.271ZM30.077 43.0229L27.3519 39.406L28.3726 38.3704L31.8954 43.0229H30.077ZM33.0374 43.0229V35.4125H34.5189V43.0229H33.0374ZM33.7856 34.2382C33.5279 34.2382 33.3066 34.1524 33.1217 33.9806C32.94 33.8055 32.8491 33.5974 32.8491 33.3563C32.8491 33.1119 32.94 32.9038 33.1217 32.732C33.3066 32.5569 33.5279 32.4694 33.7856 32.4694C34.0432 32.4694 34.2629 32.5569 34.4446 32.732C34.6295 32.9038 34.722 33.1119 34.722 33.3563C34.722 33.5974 34.6295 33.8055 34.4446 33.9806C34.2629 34.1524 34.0432 34.2382 33.7856 34.2382ZM37.9933 38.5042V43.0229H36.5119V35.4125H37.9339V36.6512H38.028C38.2031 36.2482 38.4772 35.9245 38.8505 35.6801C39.2271 35.4356 39.7011 35.3134 40.2725 35.3134C40.7911 35.3134 41.2453 35.4224 41.635 35.6404C42.0248 35.8551 42.327 36.1755 42.5417 36.6016C42.7564 37.0277 42.8638 37.5546 42.8638 38.1822V43.0229H41.3823V38.3605C41.3823 37.8089 41.2387 37.3779 40.9513 37.0674C40.6639 36.7536 40.2692 36.5967 39.7671 36.5967C39.4236 36.5967 39.1181 36.671 38.8505 36.8196C38.5862 36.9683 38.3765 37.1863 38.2213 37.4736C38.0693 37.7577 37.9933 38.1012 37.9933 38.5042ZM48.0414 46.0353C47.437 46.0353 46.9167 45.9561 46.4807 45.7975C46.048 45.639 45.6946 45.4292 45.4204 45.1683C45.1462 44.9073 44.9415 44.6216 44.806 44.3111L46.0794 43.7859C46.1686 43.9312 46.2875 44.0848 46.4361 44.2467C46.5881 44.4119 46.7929 44.5522 47.0505 44.6678C47.3114 44.7835 47.6467 44.8413 48.0563 44.8413C48.6178 44.8413 49.0819 44.7042 49.4486 44.43C49.8152 44.1592 49.9985 43.7265 49.9985 43.1319V41.6356H49.9044C49.8152 41.7974 49.6864 41.9775 49.5179 42.1756C49.3528 42.3738 49.1249 42.5456 48.8342 42.6909C48.5435 42.8363 48.1653 42.9089 47.6996 42.9089C47.0984 42.9089 46.5567 42.7685 46.0744 42.4878C45.5955 42.2037 45.2156 41.7859 44.9348 41.2342C44.6574 40.6793 44.5187 39.9972 44.5187 39.188C44.5187 38.3787 44.6557 37.685 44.9299 37.107C45.2074 36.529 45.5872 36.0863 46.0695 35.7791C46.5517 35.4687 47.0984 35.3134 47.7095 35.3134C48.1818 35.3134 48.5633 35.3927 48.854 35.5512C49.1447 35.7065 49.3709 35.8881 49.5328 36.0962C49.6979 36.3043 49.8251 36.4877 49.9143 36.6462H50.0233V35.4125H51.475V43.1913C51.475 43.8454 51.3231 44.3821 51.0192 44.8016C50.7153 45.2211 50.3041 45.5316 49.7855 45.7331C49.2702 45.9346 48.6888 46.0353 48.0414 46.0353ZM48.0266 41.6802C48.4527 41.6802 48.8127 41.5811 49.1067 41.3829C49.404 41.1814 49.6286 40.894 49.7805 40.5208C49.9358 40.1442 50.0134 39.6933 50.0134 39.1681C50.0134 38.6562 49.9374 38.2053 49.7855 37.8155C49.6335 37.4258 49.4106 37.1219 49.1166 36.9039C48.8226 36.6825 48.4593 36.5719 48.0266 36.5719C47.5806 36.5719 47.209 36.6875 46.9118 36.9187C46.6145 37.1466 46.3899 37.4571 46.2379 37.8502C46.0893 38.2433 46.015 38.6826 46.015 39.1681C46.015 39.6669 46.0909 40.1046 46.2429 40.4811C46.3948 40.8577 46.6194 41.1517 46.9167 41.3631C47.2173 41.5745 47.5873 41.6802 48.0266 41.6802Z"}" fill="${"black"}"></path><path d="${"M21.9354 8.72217H14V23.3722H21.9354V8.72217Z"}" stroke="${"#030303"}" stroke-width="${"1.2306"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}"></path><path d="${"M29.871 1.39716H21.9355V23.3722H29.871V1.39716Z"}" stroke="${"#030303"}" stroke-width="${"1.2306"}" stroke-linejoin="${"round"}"></path><path d="${"M37.8063 13.6055H29.8708V23.3722H37.8063V13.6055Z"}" stroke="${"#030303"}" stroke-width="${"1.2306"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}"></path></svg>`;
    });
    Profile = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<svg width="${"42"}" height="${"44"}" viewBox="${"0 0 42 44"}" fill="${"none"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"M0.114803 43.0229V32.8757H3.73172C4.52117 32.8757 5.17518 33.0194 5.69377 33.3068C6.21236 33.5941 6.60048 33.9872 6.85812 34.486C7.11577 34.9814 7.24459 35.5397 7.24459 36.1607C7.24459 36.7849 7.11412 37.3465 6.85317 37.8452C6.59553 38.3407 6.20576 38.7338 5.68387 39.0245C5.16528 39.3118 4.51291 39.4555 3.72677 39.4555H1.23952V38.1574H3.58804C4.08681 38.1574 4.49144 38.0715 4.80193 37.8997C5.11243 37.7247 5.34034 37.4869 5.48568 37.1863C5.63101 36.8857 5.70368 36.5438 5.70368 36.1607C5.70368 35.7775 5.63101 35.4373 5.48568 35.14C5.34034 34.8427 5.11077 34.6098 4.79698 34.4414C4.48648 34.2729 4.0769 34.1887 3.56822 34.1887H1.6458V43.0229H0.114803ZM8.92051 43.0229V35.4125H10.3524V36.6214H10.4317C10.5704 36.2119 10.8149 35.8898 11.165 35.6553C11.5184 35.4175 11.9181 35.2985 12.364 35.2985C12.4565 35.2985 12.5655 35.3018 12.691 35.3084C12.8198 35.3151 12.9206 35.3233 12.9933 35.3332V36.7503C12.9338 36.7337 12.8281 36.7156 12.6762 36.6958C12.5242 36.6726 12.3723 36.6611 12.2203 36.6611C11.8702 36.6611 11.5581 36.7354 11.2839 36.884C11.013 37.0294 10.7983 37.2325 10.6398 37.4935C10.4812 37.7511 10.402 38.0451 10.402 38.3754V43.0229H8.92051ZM17.2085 43.1765C16.495 43.1765 15.8723 43.013 15.3405 42.686C14.8087 42.359 14.3958 41.9015 14.1019 41.3135C13.8079 40.7256 13.6609 40.0385 13.6609 39.2524C13.6609 38.4629 13.8079 37.7726 14.1019 37.1813C14.3958 36.5901 14.8087 36.1309 15.3405 35.8039C15.8723 35.4769 16.495 35.3134 17.2085 35.3134C17.9219 35.3134 18.5446 35.4769 19.0764 35.8039C19.6082 36.1309 20.0211 36.5901 20.315 37.1813C20.609 37.7726 20.756 38.4629 20.756 39.2524C20.756 40.0385 20.609 40.7256 20.315 41.3135C20.0211 41.9015 19.6082 42.359 19.0764 42.686C18.5446 43.013 17.9219 43.1765 17.2085 43.1765ZM17.2134 41.9329C17.6758 41.9329 18.059 41.8106 18.3629 41.5662C18.6668 41.3218 18.8914 40.9964 19.0367 40.5901C19.1854 40.1839 19.2597 39.7363 19.2597 39.2474C19.2597 38.7619 19.1854 38.3159 19.0367 37.9097C18.8914 37.5001 18.6668 37.1714 18.3629 36.9237C18.059 36.6759 17.6758 36.5521 17.2134 36.5521C16.7477 36.5521 16.3612 36.6759 16.054 36.9237C15.7501 37.1714 15.5239 37.5001 15.3752 37.9097C15.2299 38.3159 15.1572 38.7619 15.1572 39.2474C15.1572 39.7363 15.2299 40.1839 15.3752 40.5901C15.5239 40.9964 15.7501 41.3218 16.054 41.5662C16.3612 41.8106 16.7477 41.9329 17.2134 41.9329ZM26.0315 35.4125V36.6016H21.7308V35.4125H26.0315ZM22.9101 43.0229V34.5306C22.9101 34.0549 23.0141 33.6602 23.2222 33.3464C23.4303 33.0293 23.7061 32.7931 24.0496 32.6379C24.3932 32.4793 24.7664 32.4001 25.1694 32.4001C25.4667 32.4001 25.721 32.4248 25.9324 32.4744C26.1438 32.5206 26.3007 32.5636 26.4031 32.6032L26.0563 33.8022C25.9869 33.7824 25.8977 33.7593 25.7887 33.7329C25.6797 33.7031 25.5476 33.6883 25.3923 33.6883C25.0323 33.6883 24.7747 33.7775 24.6194 33.9558C24.4675 34.1342 24.3915 34.3918 24.3915 34.7288V43.0229H22.9101ZM27.56 43.0229V35.4125H29.0415V43.0229H27.56ZM28.3082 34.2382C28.0505 34.2382 27.8292 34.1524 27.6443 33.9806C27.4626 33.8055 27.3717 33.5974 27.3717 33.3563C27.3717 33.1119 27.4626 32.9038 27.6443 32.732C27.8292 32.5569 28.0505 32.4694 28.3082 32.4694C28.5658 32.4694 28.7855 32.5569 28.9672 32.732C29.1521 32.9038 29.2446 33.1119 29.2446 33.3563C29.2446 33.5974 29.1521 33.8055 28.9672 33.9806C28.7855 34.1524 28.5658 34.2382 28.3082 34.2382ZM32.5159 32.8757V43.0229H31.0345V32.8757H32.5159ZM37.789 43.1765C37.0392 43.1765 36.3934 43.0163 35.8517 42.6959C35.3133 42.3722 34.8971 41.918 34.6031 41.3333C34.3124 40.7454 34.1671 40.0567 34.1671 39.2672C34.1671 38.4877 34.3124 37.8007 34.6031 37.2061C34.8971 36.6115 35.3067 36.1474 35.8319 35.8138C36.3604 35.4802 36.978 35.3134 37.6849 35.3134C38.1143 35.3134 38.5305 35.3844 38.9335 35.5265C39.3365 35.6685 39.6982 35.8915 40.0186 36.1953C40.339 36.4992 40.5917 36.8939 40.7766 37.3795C40.9616 37.8618 41.0541 38.4481 41.0541 39.1384V39.6636H35.0044V38.5538H39.6024C39.6024 38.164 39.5231 37.8188 39.3645 37.5182C39.206 37.2144 38.983 36.9749 38.6957 36.7998C38.4116 36.6247 38.078 36.5372 37.6948 36.5372C37.2786 36.5372 36.9153 36.6396 36.6048 36.8444C36.2976 37.0459 36.0598 37.3101 35.8913 37.6371C35.7262 37.9609 35.6436 38.3126 35.6436 38.6925V39.5596C35.6436 40.0682 35.7328 40.501 35.9111 40.8577C36.0928 41.2144 36.3455 41.4869 36.6692 41.6752C36.9929 41.8602 37.3711 41.9527 37.8038 41.9527C38.0846 41.9527 38.3406 41.913 38.5718 41.8338C38.803 41.7512 39.0029 41.629 39.1713 41.4671C39.3398 41.3053 39.4686 41.1054 39.5578 40.8676L40.96 41.1203C40.8476 41.5332 40.6462 41.8949 40.3555 42.2054C40.0681 42.5126 39.7064 42.752 39.2704 42.9238C38.8377 43.0923 38.3439 43.1765 37.789 43.1765Z"}" fill="${"black"}"></path><path d="${"M25.3701 6.42001C25.165 9.18625 23.0679 11.4429 20.7658 11.4429C18.4636 11.4429 16.3629 9.18677 16.1615 6.42001C15.9522 3.54233 17.9927 1.39716 20.7658 1.39716C23.5388 1.39716 25.5793 3.59466 25.3701 6.42001Z"}" stroke="${"black"}" stroke-width="${"1.2306"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}"></path><path d="${"M20.7658 14.7914C16.2138 14.7914 11.5939 17.3029 10.7389 22.0432C10.6359 22.6145 10.9592 23.1629 11.5572 23.1629H29.9744C30.5729 23.1629 30.8963 22.6145 30.7932 22.0432C29.9378 17.3029 25.3178 14.7914 20.7658 14.7914Z"}" stroke="${"black"}" stroke-width="${"1.2306"}" stroke-miterlimit="${"10"}"></path></svg>`;
    });
    Photos = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<svg width="${"46"}" height="${"45"}" viewBox="${"0 0 46 45"}" fill="${"none"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"M0.114803 43.86V33.7128H3.73172C4.52117 33.7128 5.17518 33.8565 5.69377 34.1439C6.21236 34.4312 6.60048 34.8243 6.85812 35.3231C7.11577 35.8185 7.24459 36.3768 7.24459 36.9978C7.24459 37.622 7.11412 38.1836 6.85317 38.6823C6.59553 39.1778 6.20576 39.5709 5.68387 39.8616C5.16528 40.1489 4.51291 40.2926 3.72677 40.2926H1.23952V38.9945H3.58804C4.08681 38.9945 4.49144 38.9086 4.80193 38.7368C5.11243 38.5618 5.34034 38.324 5.48568 38.0234C5.63101 37.7228 5.70368 37.3809 5.70368 36.9978C5.70368 36.6146 5.63101 36.2744 5.48568 35.9771C5.34034 35.6798 5.11077 35.4469 4.79698 35.2785C4.48648 35.11 4.0769 35.0258 3.56822 35.0258H1.6458V43.86H0.114803ZM10.402 39.3413V43.86H8.92051V33.7128H10.3821V37.4883H10.4763C10.6546 37.0787 10.9272 36.7533 11.2938 36.5122C11.6604 36.2711 12.1394 36.1505 12.7307 36.1505C13.2526 36.1505 13.7084 36.2579 14.0982 36.4726C14.4912 36.6873 14.7951 37.0077 15.0098 37.4338C15.2278 37.8566 15.3368 38.3851 15.3368 39.0193V43.86H13.8554V39.1976C13.8554 38.6394 13.7117 38.2067 13.4243 37.8995C13.1369 37.589 12.7373 37.4338 12.2253 37.4338C11.8752 37.4338 11.5614 37.5081 11.2839 37.6567C11.0097 37.8054 10.7934 38.0234 10.6348 38.3107C10.4796 38.5948 10.402 38.9383 10.402 39.3413ZM20.5194 44.0136C19.8059 44.0136 19.1833 43.8501 18.6515 43.5231C18.1197 43.1961 17.7068 42.7386 17.4128 42.1506C17.1189 41.5627 16.9719 40.8756 16.9719 40.0895C16.9719 39.3 17.1189 38.6097 17.4128 38.0184C17.7068 37.4272 18.1197 36.968 18.6515 36.641C19.1833 36.314 19.8059 36.1505 20.5194 36.1505C21.2329 36.1505 21.8555 36.314 22.3873 36.641C22.9191 36.968 23.332 37.4272 23.626 38.0184C23.92 38.6097 24.067 39.3 24.067 40.0895C24.067 40.8756 23.92 41.5627 23.626 42.1506C23.332 42.7386 22.9191 43.1961 22.3873 43.5231C21.8555 43.8501 21.2329 44.0136 20.5194 44.0136ZM20.5244 42.77C20.9868 42.77 21.37 42.6477 21.6739 42.4033C21.9777 42.1589 22.2024 41.8335 22.3477 41.4272C22.4963 41.021 22.5707 40.5734 22.5707 40.0845C22.5707 39.599 22.4963 39.153 22.3477 38.7468C22.2024 38.3372 21.9777 38.0085 21.6739 37.7608C21.37 37.513 20.9868 37.3892 20.5244 37.3892C20.0586 37.3892 19.6722 37.513 19.365 37.7608C19.0611 38.0085 18.8348 38.3372 18.6862 38.7468C18.5408 39.153 18.4682 39.599 18.4682 40.0845C18.4682 40.5734 18.5408 41.021 18.6862 41.4272C18.8348 41.8335 19.0611 42.1589 19.365 42.4033C19.6722 42.6477 20.0586 42.77 20.5244 42.77ZM29.2731 36.2496V37.4387H25.1161V36.2496H29.2731ZM26.2309 34.4263H27.7124V41.6254C27.7124 41.9128 27.7553 42.1291 27.8412 42.2745C27.9271 42.4165 28.0377 42.514 28.1732 42.5668C28.3119 42.6164 28.4622 42.6411 28.624 42.6411C28.743 42.6411 28.847 42.6329 28.9362 42.6164C29.0254 42.5998 29.0947 42.5866 29.1443 42.5767L29.4118 43.8005C29.326 43.8336 29.2037 43.8666 29.0452 43.8996C28.8866 43.936 28.6884 43.9558 28.4506 43.9591C28.0609 43.9657 27.6975 43.8963 27.3606 43.751C27.0237 43.6056 26.7512 43.381 26.5431 43.0771C26.335 42.7733 26.2309 42.3917 26.2309 41.9326V34.4263ZM34.0358 44.0136C33.3223 44.0136 32.6997 43.8501 32.1679 43.5231C31.6361 43.1961 31.2232 42.7386 30.9292 42.1506C30.6352 41.5627 30.4882 40.8756 30.4882 40.0895C30.4882 39.3 30.6352 38.6097 30.9292 38.0184C31.2232 37.4272 31.6361 36.968 32.1679 36.641C32.6997 36.314 33.3223 36.1505 34.0358 36.1505C34.7493 36.1505 35.3719 36.314 35.9037 36.641C36.4355 36.968 36.8484 37.4272 37.1424 38.0184C37.4364 38.6097 37.5833 39.3 37.5833 40.0895C37.5833 40.8756 37.4364 41.5627 37.1424 42.1506C36.8484 42.7386 36.4355 43.1961 35.9037 43.5231C35.3719 43.8501 34.7493 44.0136 34.0358 44.0136ZM34.0407 42.77C34.5032 42.77 34.8863 42.6477 35.1902 42.4033C35.4941 42.1589 35.7187 41.8335 35.8641 41.4272C36.0127 41.021 36.087 40.5734 36.087 40.0845C36.087 39.599 36.0127 39.153 35.8641 38.7468C35.7187 38.3372 35.4941 38.0085 35.1902 37.7608C34.8863 37.513 34.5032 37.3892 34.0407 37.3892C33.575 37.3892 33.1885 37.513 32.8813 37.7608C32.5775 38.0085 32.3512 38.3372 32.2026 38.7468C32.0572 39.153 31.9846 39.599 31.9846 40.0845C31.9846 40.5734 32.0572 41.021 32.2026 41.4272C32.3512 41.8335 32.5775 42.1589 32.8813 42.4033C33.1885 42.6477 33.575 42.77 34.0407 42.77ZM44.9398 38.1076L43.5971 38.3454C43.5409 38.1737 43.4517 38.0102 43.3295 37.8549C43.2106 37.6997 43.0488 37.5725 42.844 37.4734C42.6392 37.3743 42.3832 37.3248 42.076 37.3248C41.6565 37.3248 41.3064 37.4189 41.0256 37.6072C40.7448 37.7922 40.6045 38.0316 40.6045 38.3256C40.6045 38.5799 40.6986 38.7847 40.8869 38.94C41.0752 39.0952 41.379 39.2224 41.7985 39.3215L43.0075 39.599C43.7077 39.7608 44.2296 40.0102 44.5732 40.3471C44.9167 40.684 45.0884 41.1217 45.0884 41.6601C45.0884 42.1159 44.9563 42.5222 44.6921 42.879C44.4311 43.2324 44.0661 43.5099 43.5971 43.7113C43.1313 43.9128 42.5913 44.0136 41.9769 44.0136C41.1247 44.0136 40.4294 43.8319 39.891 43.4686C39.3526 43.1019 39.0223 42.5817 38.9 41.9078L40.3319 41.6898C40.4211 42.0631 40.6045 42.3455 40.8819 42.5371C41.1594 42.7254 41.5211 42.8195 41.967 42.8195C42.4526 42.8195 42.8407 42.7188 43.1313 42.5173C43.422 42.3125 43.5674 42.0631 43.5674 41.7691C43.5674 41.5313 43.4782 41.3314 43.2998 41.1696C43.1247 41.0077 42.8555 40.8855 42.4922 40.8029L41.204 40.5205C40.4938 40.3587 39.9686 40.101 39.6284 39.7476C39.2915 39.3942 39.123 38.9466 39.123 38.4049C39.123 37.9557 39.2485 37.5626 39.4996 37.2257C39.7506 36.8887 40.0974 36.6262 40.54 36.4379C40.9827 36.2463 41.4897 36.1505 42.0611 36.1505C42.8836 36.1505 43.531 36.3289 44.0034 36.6856C44.4757 37.039 44.7879 37.513 44.9398 38.1076Z"}" fill="${"black"}"></path><path d="${"M32.6759 1.39716H12.1279C10.4256 1.39716 9.04565 2.77711 9.04565 4.47936V20.9178C9.04565 22.6201 10.4256 24 12.1279 24H32.6759C34.3782 24 35.7581 22.6201 35.7581 20.9178V4.47936C35.7581 2.77711 34.3782 1.39716 32.6759 1.39716Z"}" stroke="${"black"}" stroke-width="${"1.2306"}" stroke-linejoin="${"round"}"></path><path d="${"M27.5389 9.61635C28.6738 9.61635 29.5937 8.69639 29.5937 7.56155C29.5937 6.42671 28.6738 5.50674 27.5389 5.50674C26.4041 5.50674 25.4841 6.42671 25.4841 7.56155C25.4841 8.69639 26.4041 9.61635 27.5389 9.61635Z"}" stroke="${"black"}" stroke-width="${"1.2306"}" stroke-miterlimit="${"10"}"></path><path d="${"M25.4841 17.8221L19.6626 12.0115C19.2921 11.6411 18.7942 11.4262 18.2706 11.4107C17.747 11.3952 17.2373 11.5802 16.8456 11.928L9.04565 18.863M20.3471 24L28.2671 16.08C28.6293 15.7171 29.1141 15.5027 29.6263 15.4789C30.1385 15.4552 30.641 15.6238 31.0353 15.9516L35.7581 19.8904"}" stroke="${"black"}" stroke-width="${"1.2306"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}"></path></svg>`;
    });
    Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { data } = $$props;
      event.update((x3) => x3 || data);
      if ($$props.data === void 0 && $$bindings.data && data !== void 0)
        $$bindings.data(data);
      return `<div class="${"app"}"><div class="${"pb-5"}">${slots.default ? slots.default({}) : ``}</div>
	<div class="${"h-16"}"></div>
	<div class="${"h-14 z-50 bg-base2 bg-white border-t items-center flex justify-around fixed bottom-0 screen-width"}"><a href="${"/"}">${validate_component(Latest, "Latest").$$render($$result, {}, {}, {})}</a>
		<a href="${"/rank"}">${validate_component(Ranking, "Ranking").$$render($$result, {}, {}, {})}</a>
		<a href="${"/profile"}">${validate_component(Profile, "Profile").$$render($$result, {}, {}, {})}</a>
		<a href="${"https://www.google.com/"}" target="${"_blank"}">${validate_component(Photos, "Photos").$$render($$result, {}, {}, {})}</a></div></div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/0.js
var __exports = {};
__export(__exports, {
  component: () => component,
  file: () => file,
  imports: () => imports,
  index: () => index,
  shared: () => layout_ts_exports,
  stylesheets: () => stylesheets
});
var index, component, file, imports, stylesheets;
var init__ = __esm({
  ".svelte-kit/output/server/nodes/0.js"() {
    init_layout_ts();
    index = 0;
    component = async () => (await Promise.resolve().then(() => (init_layout_svelte(), layout_svelte_exports))).default;
    file = "_app/immutable/components/pages/_layout.svelte-c98abee5.js";
    imports = ["_app/immutable/components/pages/_layout.svelte-c98abee5.js", "_app/immutable/chunks/index-2288207f.js", "_app/immutable/chunks/db-06457d1e.js", "_app/immutable/chunks/state-2107352d.js", "_app/immutable/modules/pages/_layout.ts-de045230.js", "_app/immutable/chunks/db-06457d1e.js", "_app/immutable/chunks/index-d6fabef0.js", "_app/immutable/chunks/_layout-7fdd324a.js"];
    stylesheets = ["_app/immutable/assets/+layout-e393e770.css"];
  }
});

// .svelte-kit/output/server/chunks/stores.js
function removed_session() {
  throw new Error(
    "stores.session is no longer available. See https://github.com/sveltejs/kit/discussions/5883"
  );
}
var getStores, page;
var init_stores = __esm({
  ".svelte-kit/output/server/chunks/stores.js"() {
    init_chunks();
    getStores = () => {
      const stores = getContext("__svelte__");
      const readonly_stores = {
        page: {
          subscribe: stores.page.subscribe
        },
        navigating: {
          subscribe: stores.navigating.subscribe
        },
        updated: stores.updated
      };
      Object.defineProperties(readonly_stores, {
        preloading: {
          get() {
            console.error("stores.preloading is deprecated; use stores.navigating instead");
            return {
              subscribe: stores.navigating.subscribe
            };
          },
          enumerable: false
        },
        session: {
          get() {
            removed_session();
            return {};
          },
          enumerable: false
        }
      });
      return readonly_stores;
    };
    page = {
      subscribe(fn2) {
        const store = getStores().page;
        return store.subscribe(fn2);
      }
    };
  }
});

// .svelte-kit/output/server/entries/fallbacks/error.svelte.js
var error_svelte_exports = {};
__export(error_svelte_exports, {
  default: () => Error2
});
var Error2;
var init_error_svelte = __esm({
  ".svelte-kit/output/server/entries/fallbacks/error.svelte.js"() {
    init_chunks();
    init_stores();
    Error2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $page, $$unsubscribe_page;
      $$unsubscribe_page = subscribe(page, (value) => $page = value);
      $$unsubscribe_page();
      return `<h1>${escape($page.status)}</h1>

<pre>${escape($page.error.message)}</pre>



${$page.error.frame ? `<pre>${escape($page.error.frame)}</pre>` : ``}
${$page.error.stack ? `<pre>${escape($page.error.stack)}</pre>` : ``}`;
    });
  }
});

// .svelte-kit/output/server/nodes/1.js
var __exports2 = {};
__export(__exports2, {
  component: () => component2,
  file: () => file2,
  imports: () => imports2,
  index: () => index2,
  stylesheets: () => stylesheets2
});
var index2, component2, file2, imports2, stylesheets2;
var init__2 = __esm({
  ".svelte-kit/output/server/nodes/1.js"() {
    index2 = 1;
    component2 = async () => (await Promise.resolve().then(() => (init_error_svelte(), error_svelte_exports))).default;
    file2 = "_app/immutable/components/error.svelte-51ced2f5.js";
    imports2 = ["_app/immutable/components/error.svelte-51ced2f5.js", "_app/immutable/chunks/index-2288207f.js", "_app/immutable/chunks/stores-83358fdb.js", "_app/immutable/chunks/singletons-c0295a0c.js"];
    stylesheets2 = [];
  }
});

// .svelte-kit/output/server/chunks/Share.js
var Back, Logo, Share;
var init_Share = __esm({
  ".svelte-kit/output/server/chunks/Share.js"() {
    init_chunks();
    Back = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<svg width="${"9"}" height="${"17"}" viewBox="${"0 0 9 17"}" fill="${"none"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"M8.76741 0.232592C9.04934 0.514521 9.07497 0.955694 8.8443 1.26658L8.76741 1.35564L1.91753 8.20588L8.76741 15.0561C9.04934 15.338 9.07497 15.7792 8.8443 16.0901L8.76741 16.1792C8.48548 16.4611 8.04431 16.4867 7.73342 16.2561L7.64436 16.1792L0.232592 8.76741C-0.0493377 8.48548 -0.074968 8.04431 0.155701 7.73342L0.232592 7.64436L7.64436 0.232592C7.95448 -0.0775306 8.45729 -0.0775306 8.76741 0.232592Z"}" fill="${"white"}"></path></svg>`;
    });
    Logo = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { dark = true } = $$props;
      if ($$props.dark === void 0 && $$bindings.dark && dark !== void 0)
        $$bindings.dark(dark);
      return `<svg width="${"27"}"${add_attribute("class", dark ? "fill-base1" : "fill-base2", 0)} height="${"22"}" viewBox="${"0 0 27 22"}" xmlns="${"http://www.w3.org/2000/svg"}"><path fill-rule="${"evenodd"}" clip-rule="${"evenodd"}" d="${"M5.18623 4.00943V8.01885L13.9334 10.0763C18.7445 11.2079 22.8519 12.2682 23.0609 12.4324C23.3347 12.6476 23.4412 13.9884 23.4412 17.2149C23.4412 19.681 23.5194 21.6986 23.6152 21.6986C23.7108 21.6986 24.3953 21.3466 25.1365 20.9166L26.4837 20.1345V15.0601C26.4837 10.488 26.431 9.97052 25.9512 9.82978C25.6583 9.74389 21.7906 8.92055 17.3562 8.00017C12.9218 7.07978 8.98539 6.19436 8.60904 6.03282C8.04313 5.78992 7.92448 5.50181 7.92448 4.36866V2.99833L12.7164 3.08151L17.5083 3.16438L17.5996 4.89726L17.6909 6.63014H19.349H21.0072V3.31507V0H13.0967H5.18623V4.00943ZM1.45218 1.12531L0 1.91701L0.0830608 7.0403L0.166121 12.1633L9.0362 14.0324C13.9148 15.0604 18.0566 15.9931 18.2397 16.1055C18.4232 16.2176 18.5732 16.9153 18.5732 17.6555V19.0017L13.7813 18.9185L8.98935 18.8356L8.89807 17.1027L8.8068 15.3699H7.14864H5.49048V18.6849V22H13.4098H21.3291L21.2442 18.0099L21.1593 14.02L12.3361 11.9291C7.48331 10.7791 3.44441 9.78367 3.36074 9.71707C3.27707 9.65047 3.14016 7.51164 3.05649 4.96447L2.90436 0.333315L1.45218 1.12531ZM23.4412 3.58811V6.87485L24.8645 7.35523C25.6473 7.61953 26.3319 7.83562 26.3857 7.83562C26.4396 7.83562 26.4837 6.55389 26.4837 4.98707V2.13852L25.1359 1.21995C24.3944 0.714849 23.7098 0.30137 23.6146 0.30137C23.5191 0.30137 23.4412 1.78049 23.4412 3.58811ZM0.383051 17.3125L0.47037 20.2069L1.76343 20.9699L3.05649 21.7327V18.5439C3.05649 15.051 3.19462 15.3129 0.991548 14.6327C0.29573 14.4181 0.295731 14.419 0.383051 17.3125Z"}"></path></svg>`;
    });
    Share = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { share } = $$props;
      if ($$props.share === void 0 && $$bindings.share && share !== void 0)
        $$bindings.share(share);
      return `<svg width="${"22"}" height="${"20"}" viewBox="${"0 0 22 20"}" fill="${"none"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"M11 1V13M11 1L7 5M11 1L15 5M1 15L1.621 17.485C1.72915 17.9177 1.97882 18.3018 2.33033 18.5763C2.68184 18.8508 3.11501 18.9999 3.561 19H18.439C18.885 18.9999 19.3182 18.8508 19.6697 18.5763C20.0212 18.3018 20.2708 17.9177 20.379 17.485L21 15"}" stroke="${"white"}" stroke-width="${"2"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}"></path></svg>`;
    });
  }
});

// .svelte-kit/output/server/chunks/Header.js
var Header;
var init_Header = __esm({
  ".svelte-kit/output/server/chunks/Header.js"() {
    init_chunks();
    init_Share();
    Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { tralingLogo = false } = $$props;
      let { title } = $$props;
      let { onBack = () => history.back() } = $$props;
      let { share = void 0 } = $$props;
      if ($$props.tralingLogo === void 0 && $$bindings.tralingLogo && tralingLogo !== void 0)
        $$bindings.tralingLogo(tralingLogo);
      if ($$props.title === void 0 && $$bindings.title && title !== void 0)
        $$bindings.title(title);
      if ($$props.onBack === void 0 && $$bindings.onBack && onBack !== void 0)
        $$bindings.onBack(onBack);
      if ($$props.share === void 0 && $$bindings.share && share !== void 0)
        $$bindings.share(share);
      return `<div class="${"flex justify-between page-margin"}"><a class="${"header"}" style="${"margin-left: 0px; margin-right: 0px;"}" href="${"/"}">Huddle &amp; Score</a>
	${tralingLogo ? `${validate_component(Logo, "Logo").$$render($$result, { dark: false }, {}, {})}` : ``}</div>
<div class="${"flex mt-1 justify-between page-margin"}"><button>${validate_component(Back, "Back").$$render($$result, {}, {}, {})}</button>
	<span>${escape(title)}</span>
	<span>${share ? `${validate_component(Share, "Share").$$render($$result, { share }, {}, {})}` : ``}</span></div>`;
    });
  }
});

// .svelte-kit/output/server/entries/pages/profile/player/_playerID_/_layout.svelte.js
var layout_svelte_exports2 = {};
__export(layout_svelte_exports2, {
  default: () => Layout2
});
var Layout2;
var init_layout_svelte2 = __esm({
  ".svelte-kit/output/server/entries/pages/profile/player/_playerID_/_layout.svelte.js"() {
    init_chunks();
    init_stores();
    init_state();
    init_Header();
    init_index_esm2();
    init_index3();
    init_db();
    init_index_esm20176();
    init_index_esm();
    init_index_esm3();
    init_index_esm4();
    init_index_esm5();
    init_index_esm20177();
    init_Share();
    Layout2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let playerID;
      let player;
      let $event, $$unsubscribe_event;
      let $page, $$unsubscribe_page;
      $$unsubscribe_event = subscribe(event, (value) => $event = value);
      $$unsubscribe_page = subscribe(page, (value) => $page = value);
      playerID = $page.params.playerID;
      player = $event.players[playerID];
      $$unsubscribe_event();
      $$unsubscribe_page();
      return `<div class="${"bg-base1 -mt-11 pt-11 min-h-screen"}">${validate_component(Header, "Header").$$render($$result, { title: "Player Profile" }, {}, {})}

	${player ? `${slots.default ? slots.default({}) : ``}` : `No Player Found`}</div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/2.js
var __exports3 = {};
__export(__exports3, {
  component: () => component3,
  file: () => file3,
  imports: () => imports3,
  index: () => index3,
  stylesheets: () => stylesheets3
});
var index3, component3, file3, imports3, stylesheets3;
var init__3 = __esm({
  ".svelte-kit/output/server/nodes/2.js"() {
    index3 = 2;
    component3 = async () => (await Promise.resolve().then(() => (init_layout_svelte2(), layout_svelte_exports2))).default;
    file3 = "_app/immutable/components/pages/profile/player/_playerID_/_layout.svelte-10107627.js";
    imports3 = ["_app/immutable/components/pages/profile/player/_playerID_/_layout.svelte-10107627.js", "_app/immutable/chunks/index-2288207f.js", "_app/immutable/chunks/stores-83358fdb.js", "_app/immutable/chunks/singletons-c0295a0c.js", "_app/immutable/chunks/state-2107352d.js", "_app/immutable/chunks/db-06457d1e.js", "_app/immutable/chunks/Header-9cf8977c.js", "_app/immutable/chunks/Share-9deee359.js"];
    stylesheets3 = [];
  }
});

// .svelte-kit/output/server/entries/pages/profile/team/_teamID_/_layout.svelte.js
var layout_svelte_exports3 = {};
__export(layout_svelte_exports3, {
  default: () => Layout3
});
var Layout3;
var init_layout_svelte3 = __esm({
  ".svelte-kit/output/server/entries/pages/profile/team/_teamID_/_layout.svelte.js"() {
    init_chunks();
    init_stores();
    init_state();
    init_Header();
    init_index_esm2();
    init_index3();
    init_db();
    init_index_esm20176();
    init_index_esm();
    init_index_esm3();
    init_index_esm4();
    init_index_esm5();
    init_index_esm20177();
    init_Share();
    Layout3 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let teamID;
      let team;
      let $event, $$unsubscribe_event;
      let $page, $$unsubscribe_page;
      $$unsubscribe_event = subscribe(event, (value) => $event = value);
      $$unsubscribe_page = subscribe(page, (value) => $page = value);
      teamID = $page.params.teamID;
      team = $event.teams[teamID];
      $$unsubscribe_event();
      $$unsubscribe_page();
      return `<div class="${"bg-base1 -mt-11 pt-11 min-h-screen"}">${validate_component(Header, "Header").$$render($$result, { title: "Team Profile" }, {}, {})}

	${team ? `${slots.default ? slots.default({}) : ``}` : `No Team Found`}</div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/3.js
var __exports4 = {};
__export(__exports4, {
  component: () => component4,
  file: () => file4,
  imports: () => imports4,
  index: () => index4,
  stylesheets: () => stylesheets4
});
var index4, component4, file4, imports4, stylesheets4;
var init__4 = __esm({
  ".svelte-kit/output/server/nodes/3.js"() {
    index4 = 3;
    component4 = async () => (await Promise.resolve().then(() => (init_layout_svelte3(), layout_svelte_exports3))).default;
    file4 = "_app/immutable/components/pages/profile/team/_teamID_/_layout.svelte-c0ed0e8d.js";
    imports4 = ["_app/immutable/components/pages/profile/team/_teamID_/_layout.svelte-c0ed0e8d.js", "_app/immutable/chunks/index-2288207f.js", "_app/immutable/chunks/stores-83358fdb.js", "_app/immutable/chunks/singletons-c0295a0c.js", "_app/immutable/chunks/state-2107352d.js", "_app/immutable/chunks/db-06457d1e.js", "_app/immutable/chunks/Header-9cf8977c.js", "_app/immutable/chunks/Share-9deee359.js"];
    stylesheets4 = [];
  }
});

// .svelte-kit/output/server/chunks/AppDrawer.js
var css, Drawer, AppDrawer;
var init_AppDrawer = __esm({
  ".svelte-kit/output/server/chunks/AppDrawer.js"() {
    init_chunks();
    init_Share();
    css = {
      code: ".drawer.svelte-1z01csw.svelte-1z01csw{position:fixed;top:0;left:0;height:100%;width:100%;z-index:-1;transition:z-index var(--duration) step-end}.drawer.open.svelte-1z01csw.svelte-1z01csw{z-index:99;transition:z-index var(--duration) step-start}.overlay.svelte-1z01csw.svelte-1z01csw{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(100, 100, 100, 0.5);opacity:0;z-index:2;transition:opacity var(--duration) ease}.drawer.open.svelte-1z01csw .overlay.svelte-1z01csw{opacity:1}.panel.svelte-1z01csw.svelte-1z01csw{position:fixed;width:100%;height:100%;background:white;z-index:3;transition:transform var(--duration) ease;overflow:auto}.panel.left.svelte-1z01csw.svelte-1z01csw{left:0;transform:translate(-100%, 0)}.panel.right.svelte-1z01csw.svelte-1z01csw{right:0;transform:translate(100%, 0)}.panel.top.svelte-1z01csw.svelte-1z01csw{top:0;transform:translate(0, -100%)}.panel.bottom.svelte-1z01csw.svelte-1z01csw{bottom:0;transform:translate(0, 100%)}.panel.left.size.svelte-1z01csw.svelte-1z01csw,.panel.right.size.svelte-1z01csw.svelte-1z01csw{max-width:var(--size)}.panel.top.size.svelte-1z01csw.svelte-1z01csw,.panel.bottom.size.svelte-1z01csw.svelte-1z01csw{max-height:var(--size)}.drawer.open.svelte-1z01csw .panel.svelte-1z01csw{transform:translate(0, 0)}",
      map: null
    };
    Drawer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let style;
      let { open = false } = $$props;
      let { duration = 0.2 } = $$props;
      let { placement = "left" } = $$props;
      let { size = null } = $$props;
      createEventDispatcher();
      if ($$props.open === void 0 && $$bindings.open && open !== void 0)
        $$bindings.open(open);
      if ($$props.duration === void 0 && $$bindings.duration && duration !== void 0)
        $$bindings.duration(duration);
      if ($$props.placement === void 0 && $$bindings.placement && placement !== void 0)
        $$bindings.placement(placement);
      if ($$props.size === void 0 && $$bindings.size && size !== void 0)
        $$bindings.size(size);
      $$result.css.add(css);
      style = `--duration: ${duration}s; --size: ${size};`;
      return `<aside class="${["drawer svelte-1z01csw", open ? "open" : ""].join(" ").trim()}"${add_attribute("style", style, 0)}><div class="${"overlay svelte-1z01csw"}"></div>

    <div class="${["panel " + escape(placement, true) + " svelte-1z01csw", size ? "size" : ""].join(" ").trim()}">${slots.default ? slots.default({}) : ``}</div>

</aside>`;
    });
    AppDrawer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { open } = $$props;
      let { close } = $$props;
      let { title } = $$props;
      let { placement = "bottom" } = $$props;
      let { bg = "base2" } = $$props;
      let { share = void 0 } = $$props;
      if ($$props.open === void 0 && $$bindings.open && open !== void 0)
        $$bindings.open(open);
      if ($$props.close === void 0 && $$bindings.close && close !== void 0)
        $$bindings.close(close);
      if ($$props.title === void 0 && $$bindings.title && title !== void 0)
        $$bindings.title(title);
      if ($$props.placement === void 0 && $$bindings.placement && placement !== void 0)
        $$bindings.placement(placement);
      if ($$props.bg === void 0 && $$bindings.bg && bg !== void 0)
        $$bindings.bg(bg);
      if ($$props.share === void 0 && $$bindings.share && share !== void 0)
        $$bindings.share(share);
      return `${validate_component(Drawer, "Drawer").$$render($$result, { open, placement, size: "100%" }, {}, {
        default: () => {
          return `<div class="${"app"}"><div class="${"header"}">Huddle &amp; Score</div>
		<div class="${["pb-9 mt-1", bg === "base2" ? "contrast" : ""].join(" ").trim()}"><div class="${"flex h-4 text-lg items-center justify-between page-margin"}"><button>${validate_component(Back, "Back").$$render($$result, {}, {}, {})}</button>
				<span>${escape(title)}</span>
				<span>${share ? `${validate_component(Share, "Share").$$render($$result, { share }, {}, {})}` : ``}</span></div></div>
		${bg === "base1" ? `<div class="${"pb-5"}">${slots.default ? slots.default({}) : ``}</div>` : `<div class="${"bg-base2 min-h-[calc(100vh-128px)] pt-1"}">${slots.default ? slots.default({}) : ``}</div>`}</div>`;
        }
      })}`;
    });
  }
});

// .svelte-kit/output/server/chunks/Ads.js
var Ads;
var init_Ads = __esm({
  ".svelte-kit/output/server/chunks/Ads.js"() {
    init_chunks();
    Ads = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `
<div class="${"px-2 my-8"}"><div class="${"border h-24"}">ADs</div></div>`;
    });
  }
});

// .svelte-kit/output/server/chunks/News.js
var News;
var init_News = __esm({
  ".svelte-kit/output/server/chunks/News.js"() {
    init_chunks();
    init_Ads();
    init_state();
    News = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $event, $$unsubscribe_event;
      $$unsubscribe_event = subscribe(event, (value) => $event = value);
      let { news } = $$props;
      let { onNavigateToOtherPage = void 0 } = $$props;
      if ($$props.news === void 0 && $$bindings.news && news !== void 0)
        $$bindings.news(news);
      if ($$props.onNavigateToOtherPage === void 0 && $$bindings.onNavigateToOtherPage && onNavigateToOtherPage !== void 0)
        $$bindings.onNavigateToOtherPage(onNavigateToOtherPage);
      $$unsubscribe_event();
      return `<h2 class="${"page-margin font-bold text-3xl sm:text-5xl"}">${escape(news.title)}</h2>
<img${add_attribute("src", news.image, 0)}${add_attribute("alt", news.id, 0)} class="${"w-full page-padding mt-5"}">
<p class="${"page-margin mt-5"}">${each(news.content, (content) => {
        return `${content.type === "team" ? `<a href="${"/profile/team/" + escape(content.teamID, true)}" class="${"underline"}">#${escape($event.teams[content.teamID].name)}
			</a>` : `${content.type === "player" ? `<a href="${"/profile/player/" + escape(content.playerID, true)}" class="${"underline"}">@${escape($event.players[content.playerID].name)}
			</a>` : `${each(content.text, (text) => {
          return `${text === null ? `<br>` : `<span>${escape(text)}</span>`}`;
        })}`}`}`;
      })}</p>
${validate_component(Ads, "Ads").$$render($$result, {}, {}, {})}`;
    });
  }
});

// .svelte-kit/output/server/chunks/Video.js
var Video;
var init_Video = __esm({
  ".svelte-kit/output/server/chunks/Video.js"() {
    init_chunks();
    init_Ads();
    init_state();
    Video = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $event, $$unsubscribe_event;
      $$unsubscribe_event = subscribe(event, (value) => $event = value);
      let { video } = $$props;
      let { onNavigateToOtherPage = void 0 } = $$props;
      if ($$props.video === void 0 && $$bindings.video && video !== void 0)
        $$bindings.video(video);
      if ($$props.onNavigateToOtherPage === void 0 && $$bindings.onNavigateToOtherPage && onNavigateToOtherPage !== void 0)
        $$bindings.onNavigateToOtherPage(onNavigateToOtherPage);
      $$unsubscribe_event();
      return `<h2 class="${"page-margin font-bold text-3xl sm:text-5xl"}">${escape(video.title)}</h2>
<video${add_attribute("src", video.video, 0)} ${"controls"} ${""} class="${"w-full page-padding mt-5"}"><track kind="${"captions"}"></video>
<p class="${"page-margin mt-5"}">${each(video.content, (content) => {
        return `${content.type === "team" ? `<a href="${"/profile/team/" + escape(content.teamID, true)}" class="${"underline"}">#${escape($event.teams[content.teamID].name)}
			</a>` : `${content.type === "player" ? `<a href="${"/profile/player/" + escape(content.playerID, true)}" class="${"underline"}">@${escape($event.players[content.playerID].name)}
			</a>` : `${each(content.text, (text) => {
          return `${text === null ? `<br>` : `<span>${escape(text)}</span>`}`;
        })}`}`}`;
      })}</p>
${validate_component(Ads, "Ads").$$render($$result, {}, {}, {})}`;
    });
  }
});

// .svelte-kit/output/server/chunks/Card.js
function getUniqueId() {
  return Math.random().toString(36).substring(2);
}
var css2, secondaryColor, primaryColor, speed, secondaryColorPercentWidth, ariaLabel, Skeleton, AllNews, AllVideos, Card;
var init_Card = __esm({
  ".svelte-kit/output/server/chunks/Card.js"() {
    init_chunks();
    init_state();
    init_AppDrawer();
    init_News();
    init_Video();
    init_Share();
    css2 = {
      code: ".img.svelte-12prmpb{width:6rem;-o-object-fit:cover;object-fit:cover;padding-top:0.5rem}.line1.svelte-12prmpb{border-radius:0.75rem;width:70%}.line2.svelte-12prmpb{border-radius:0.75rem;width:35%}@media(min-width: 700px){.line1.svelte-12prmpb{width:500px}}",
      map: null
    };
    secondaryColor = "#F5F5F7";
    primaryColor = "#EBECEF";
    speed = 2;
    secondaryColorPercentWidth = 100;
    ariaLabel = null;
    Skeleton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let idClip = getUniqueId();
      let idGradient = getUniqueId();
      $$result.css.add(css2);
      return `<svg width="${"100vw"}" height="${"75px"}"${add_attribute("aria-label", ariaLabel, 0)} preserveAspectRatio="${"none"}" class="${"mt-2 page-padding"}"><rect fill="${"url(#" + escape(idGradient, true) + ")"}" clip-path="${"url(#" + escape(idClip, true) + ")"}" width="${"100%"}" height="${"75px"}" x="${"0"}" y="${"0"}"></rect><defs><clipPath${add_attribute("id", idClip, 0)}><rect class="${"img svelte-12prmpb"}" height="${"72"}" x="${"0"}" y="${"0"}" rx="${"12"}" ry="${"12"}"></rect><rect class="${"line1 svelte-12prmpb"}" height="${"10"}" x="${"108"}" y="${"19"}" rx="${"5"}" ry="${"5"}"></rect><rect class="${"line2 svelte-12prmpb"}" height="${"10"}" x="${"108"}" y="${"43"}" rx="${"5"}" ry="${"5"}"></rect></clipPath><linearGradient${add_attribute("id", idGradient, 0)} x1="${"-" + escape(secondaryColorPercentWidth, true) + "%"}" y1="${"50%"}" x2="${"0%"}" y2="${"50%"}">${`<animate attributeName="${"x1"}" from="${"-" + escape(secondaryColorPercentWidth, true) + "%"}" to="${"100%"}" dur="${escape(speed, true) + "s"}" repeatCount="${"indefinite"}"></animate>
				<animate attributeName="${"x2"}" from="${"0%"}" to="${escape(100 + secondaryColorPercentWidth, true) + "%"}" dur="${escape(speed, true) + "s"}" repeatCount="${"indefinite"}"></animate>`}<stop${add_attribute("stop-color", primaryColor, 0)} offset="${"0%"}"></stop><stop${add_attribute("stop-color", secondaryColor, 0)} offset="${"50%"}"></stop><stop${add_attribute("stop-color", primaryColor, 0)} offset="${"100%"}"></stop></linearGradient></defs></svg>`;
    });
    AllNews = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $event, $$unsubscribe_event;
      $$unsubscribe_event = subscribe(event, (value) => $event = value);
      let { allNews } = $$props;
      let { loading } = $$props;
      let { seeMore = void 0 } = $$props;
      let { selectedNews = void 0 } = $$props;
      let { onNavigateToOtherPage = void 0 } = $$props;
      if ($$props.allNews === void 0 && $$bindings.allNews && allNews !== void 0)
        $$bindings.allNews(allNews);
      if ($$props.loading === void 0 && $$bindings.loading && loading !== void 0)
        $$bindings.loading(loading);
      if ($$props.seeMore === void 0 && $$bindings.seeMore && seeMore !== void 0)
        $$bindings.seeMore(seeMore);
      if ($$props.selectedNews === void 0 && $$bindings.selectedNews && selectedNews !== void 0)
        $$bindings.selectedNews(selectedNews);
      if ($$props.onNavigateToOtherPage === void 0 && $$bindings.onNavigateToOtherPage && onNavigateToOtherPage !== void 0)
        $$bindings.onNavigateToOtherPage(onNavigateToOtherPage);
      $$unsubscribe_event();
      return `${validate_component(AppDrawer, "AppDrawer").$$render(
        $$result,
        {
          bg: "base1",
          placement: "right",
          open: selectedNews !== void 0,
          close: () => selectedNews = void 0,
          title: "Latest News",
          share: {
            path: `/news/${selectedNews == null ? void 0 : selectedNews.id}`,
            title: selectedNews == null ? void 0 : selectedNews.title
          }
        },
        {},
        {
          default: () => {
            return `${selectedNews ? `${validate_component(News, "NewsComponent").$$render(
              $$result,
              {
                onNavigateToOtherPage: () => {
                  selectedNews = void 0;
                  onNavigateToOtherPage == null ? void 0 : onNavigateToOtherPage();
                },
                news: selectedNews
              },
              {},
              {}
            )}` : ``}`;
          }
        }
      )}

${each(allNews, (news) => {
        return `<button class="${"pt-3 page-padding h-20 overflow-hidden flex items-start w-full"}"><img${add_attribute("alt", news.id, 0)} class="${"object-cover w-[30%] pt-2"}"${add_attribute("src", news.image, 0)}>
		<div class="${"ml-2 text-start text-base1"}"><h4 class="${"text-xs italic font-semibold"}">${escape(news.title)}</h4>
			<p class="${"font-light"}">${each(news.content, (content) => {
          return `${content.type === "team" ? `<span class="${"underline"}">#${escape($event.teams[content.teamID].name)}
						</span>` : `${content.type === "player" ? `<span class="${"underline"}">@${escape($event.players[content.playerID].name)}
						</span>` : `${escape(content.text.map((x3) => x3 || " ").join(""))}`}`}`;
        })}
			</p></div>
	</button>`;
      })}
${loading ? `${validate_component(Skeleton, "Skeleton").$$render($$result, {}, {}, {})}` : `${seeMore ? `<button class="${"border-y border-dashed rounded-lg border-base1/50 text-center w-full mt-5"}">See More
	</button>` : ``}`}`;
    });
    AllVideos = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $event, $$unsubscribe_event;
      $$unsubscribe_event = subscribe(event, (value) => $event = value);
      let { allVideos } = $$props;
      let { loading } = $$props;
      let { seeMore = void 0 } = $$props;
      let { selectedVideo = void 0 } = $$props;
      let { onNavigateToOtherPage = void 0 } = $$props;
      if ($$props.allVideos === void 0 && $$bindings.allVideos && allVideos !== void 0)
        $$bindings.allVideos(allVideos);
      if ($$props.loading === void 0 && $$bindings.loading && loading !== void 0)
        $$bindings.loading(loading);
      if ($$props.seeMore === void 0 && $$bindings.seeMore && seeMore !== void 0)
        $$bindings.seeMore(seeMore);
      if ($$props.selectedVideo === void 0 && $$bindings.selectedVideo && selectedVideo !== void 0)
        $$bindings.selectedVideo(selectedVideo);
      if ($$props.onNavigateToOtherPage === void 0 && $$bindings.onNavigateToOtherPage && onNavigateToOtherPage !== void 0)
        $$bindings.onNavigateToOtherPage(onNavigateToOtherPage);
      $$unsubscribe_event();
      return `${validate_component(AppDrawer, "AppDrawer").$$render(
        $$result,
        {
          bg: "base1",
          placement: "right",
          open: selectedVideo !== void 0,
          close: () => selectedVideo = void 0,
          title: "Latest Video",
          share: {
            path: `/videos/${selectedVideo == null ? void 0 : selectedVideo.id}`,
            title: selectedVideo == null ? void 0 : selectedVideo.title
          }
        },
        {},
        {
          default: () => {
            return `${selectedVideo ? `${validate_component(Video, "VideoComponent").$$render(
              $$result,
              {
                onNavigateToOtherPage: () => {
                  selectedVideo = void 0;
                  onNavigateToOtherPage == null ? void 0 : onNavigateToOtherPage();
                },
                video: selectedVideo
              },
              {},
              {}
            )}` : ``}`;
          }
        }
      )}

${each(allVideos, (video) => {
        return `<button class="${"pt-3 page-padding h-20 overflow-hidden flex items-start w-full"}"><video${add_attribute("src", video.video, 0)} ${""} ${""} class="${"object-cover w-[30%] pt-2"}"><track kind="${"captions"}"></video>
		<div class="${"ml-2 text-start text-base1"}"><h4 class="${"text-xs italic font-semibold"}">${escape(video.title)}</h4>
			<p class="${"font-light"}">${each(video.content, (content) => {
          return `${content.type === "team" ? `<span class="${"underline"}">#${escape($event.teams[content.teamID].name)}
						</span>` : `${content.type === "player" ? `<span class="${"underline"}">@${escape($event.players[content.playerID].name)}
						</span>` : `${escape(content.text.map((x3) => x3 || " ").join(""))}`}`}`;
        })}
			</p></div>
	</button>`;
      })}
${loading ? `${validate_component(Skeleton, "Skeleton").$$render($$result, {}, {}, {})}` : `${seeMore ? `<button class="${"border-y border-dashed rounded-lg border-base1/50 text-center w-full mt-5"}">See More
	</button>` : ``}`}`;
    });
    Card = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { title = void 0 } = $$props;
      let { titleDiv = true } = $$props;
      let { viewMore = void 0 } = $$props;
      if ($$props.title === void 0 && $$bindings.title && title !== void 0)
        $$bindings.title(title);
      if ($$props.titleDiv === void 0 && $$bindings.titleDiv && titleDiv !== void 0)
        $$bindings.titleDiv(titleDiv);
      if ($$props.viewMore === void 0 && $$bindings.viewMore && viewMore !== void 0)
        $$bindings.viewMore(viewMore);
      return `<div class="${"card"}"><div class="${"bg-base2 py-3"}">${title ? `<h3 class="${"text-lg text-base1 page-padding font-semibold flex justify-between " + escape(titleDiv ? "border-b" : "", true)}"><span>${escape(title)}</span>${validate_component(Logo, "Logo").$$render($$result, {}, {}, {})}</h3>` : ``}
		${slots.default ? slots.default({}) : ``}
		${viewMore ? `${viewMore.herf ? `<a class="${"page-padding flex justify-end w-full text-base1 border-base1/50 border-t mt-2 font-medium"}"${add_attribute("href", viewMore.herf, 0)}>${escape(viewMore.placeholder)} <span class="${"ml-2"}">\u2192</span></a>` : `<button class="${"page-padding flex justify-end w-full text-base1 border-base1/50 border-t mt-2 font-medium"}">${escape(viewMore.placeholder)} <span class="${"ml-2"}">\u2192</span></button>`}` : ``}</div></div>`;
    });
  }
});

// .svelte-kit/output/server/entries/pages/_page.svelte.js
var page_svelte_exports = {};
__export(page_svelte_exports, {
  default: () => Page
});
var AllFixtures, LocationPin, Page;
var init_page_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/_page.svelte.js"() {
    init_chunks();
    init_state();
    init_AppDrawer();
    init_Ads();
    init_Card();
    init_index_esm2();
    init_index3();
    init_db();
    init_index_esm20176();
    init_index_esm();
    init_index_esm3();
    init_index_esm4();
    init_index_esm5();
    init_index_esm20177();
    init_Share();
    init_News();
    init_Video();
    AllFixtures = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let combineFixtures;
      let { fixtures } = $$props;
      let { showMaxDays = 0 } = $$props;
      const now = new Date().toISOString();
      if ($$props.fixtures === void 0 && $$bindings.fixtures && fixtures !== void 0)
        $$bindings.fixtures(fixtures);
      if ($$props.showMaxDays === void 0 && $$bindings.showMaxDays && showMaxDays !== void 0)
        $$bindings.showMaxDays(showMaxDays);
      combineFixtures = fixtures.reduce(
        function(prv, fixture) {
          const last = prv[prv.length - 1];
          if (fixture.displayDate === (last == null ? void 0 : last.date))
            last.fixtures.push(fixture);
          else
            prv.push({
              date: fixture.displayDate,
              fixtures: [fixture]
            });
          return prv;
        },
        []
      );
      return `${each(
        showMaxDays ? combineFixtures.splice(0, showMaxDays) : combineFixtures,
        (fixtures2) => {
          return `<div class="${"bg-base1light text-sm mt-3 page-padding py-1"}">${escape(fixtures2.date)}</div>
	${each(fixtures2.fixtures, (fixture) => {
            var _a, _b;
            return `<div class="${"text-accent1 text-lg justify-around flex items-center"}"><span class="${"w-10"}">${escape(fixture.team1.acronym)}</span>
			<img${add_attribute("src", fixture.team1.logo, 0)}${add_attribute("alt", fixture.team1.name, 0)} class="${"w-9 h-10"}">
			${fixture.time.localeCompare(now) > 0 ? `<span class="${"border text-center text-xs p-1 w-[25%]"}">${escape(fixture.displayTime)}</span>` : `<span class="${"w-[25%] text-center"}">${escape(((_a = fixture.scores) == null ? void 0 : _a.team1) ?? 0)} - ${escape(((_b = fixture.scores) == null ? void 0 : _b.team2) ?? 0)}
				</span>`}
			<img${add_attribute("src", fixture.team1.logo, 0)}${add_attribute("alt", fixture.team2.name, 0)} class="${"w-9 h-10"}">
			<span class="${"w-10"}">${escape(fixture.team2.acronym)}</span>
		</div>`;
          })}`;
        }
      )}`;
    });
    LocationPin = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<svg width="${"11"}" height="${"11"}" viewBox="${"0 0 11 11"}" fill="${"none"}" xmlns="${"http://www.w3.org/2000/svg"}"><path fill-rule="${"evenodd"}" clip-rule="${"evenodd"}" d="${"M0.895874 4.5888C0.895874 2.0972 2.97798 0.0833435 5.49649 0.0833435C8.0221 0.0833435 10.1042 2.0972 10.1042 4.5888C10.1042 5.84434 9.64759 7.00997 8.89602 7.99795C8.06689 9.08775 7.04496 10.0373 5.89467 10.7826C5.6314 10.9548 5.39381 10.9678 5.10487 10.7826C3.94802 10.0373 2.92609 9.08775 2.10406 7.99795C1.35195 7.00997 0.895874 5.84434 0.895874 4.5888ZM3.98023 4.72907C3.98023 5.56375 4.66134 6.22023 5.49647 6.22023C6.33215 6.22023 7.01981 5.56375 7.01981 4.72907C7.01981 3.90088 6.33215 3.21245 5.49647 3.21245C4.66134 3.21245 3.98023 3.90088 3.98023 4.72907Z"}" fill="${"white"}" fill-opacity="${"0.5"}"></path></svg>`;
    });
    Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      var _a, _b;
      let currentFixture;
      let topPlayers;
      let topTeams;
      let $event, $$unsubscribe_event;
      let $latestNews, $$unsubscribe_latestNews;
      let $latestVideos, $$unsubscribe_latestVideos;
      $$unsubscribe_event = subscribe(event, (value) => $event = value);
      let upcomingMatchDrawer = false;
      let latestNewsDrawer = false;
      let latestVideosDrawer = false;
      const latestNews = latestNewsListner.store;
      $$unsubscribe_latestNews = subscribe(latestNews, (value) => $latestNews = value);
      const latestVideos = latestVideosListner.store;
      $$unsubscribe_latestVideos = subscribe(latestVideos, (value) => $latestVideos = value);
      currentFixture = $event.fixtures[$event.fixtures.length - $event.upcommingFixtures.length - 1] ?? $event.fixtures[0];
      topPlayers = $event.sortedPlayers.slice(0, 3);
      topTeams = $event.sortedTeams.slice(0, 3);
      $$unsubscribe_event();
      $$unsubscribe_latestNews();
      $$unsubscribe_latestVideos();
      return `<a class="${"header"}" style="${"padding-bottom: 0;"}" href="${"/"}">Huddle &amp; Score</a>
<div class="${"page-padding -mt-1 items-center flex space-x-1"}">${validate_component(LocationPin, "LocationPin").$$render($$result, {}, {}, {})}
	<span class="${"text-sm"}">Ahmedabad</span></div>
${currentFixture ? `<div class="${"flex bg-base2 mt-5 page-padding"}"><div style="${"width: 9.81px; background-color: " + escape(currentFixture.team1.color, true) + "; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);"}"></div>
		<div class="${"w-full text-xl items-center flex justify-around pb-4 pt-5 font-medium"}"><span>${escape(currentFixture.team1.acronym)}</span>
			<img${add_attribute("src", currentFixture.team1.logo, 0)}${add_attribute("alt", currentFixture.team1.name, 0)} class="${"w-9 h-10"}">
			<span>${escape(((_a = currentFixture.scores) == null ? void 0 : _a.team1) ?? 0)} - ${escape(((_b = currentFixture.scores) == null ? void 0 : _b.team2) ?? 0)}</span>
			<img${add_attribute("src", currentFixture.team2.logo, 0)}${add_attribute("alt", currentFixture.team1.name, 0)} class="${"w-9 h-10"}">
			<span>${escape(currentFixture.team2.acronym)}</span></div>
		<div style="${"width: 9.81px; background-color: " + escape(currentFixture.team2.color, true) + "; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);"}"></div></div>` : ``}
${$event.liveStream ? `<a class="${"text-center"}"${add_attribute("href", $event.liveStream, 0)} target="${"_blank"}"><div class="${"bg-danger mt-3 py-2 h-9"}">Watch live stream</div></a>` : ``}
${validate_component(Ads, "Ads").$$render($$result, {}, {}, {})}
${$event.fixtures.length ? `${validate_component(Card, "Card").$$render(
        $$result,
        {
          titleDiv: false,
          viewMore: {
            placeholder: "All Fixtures",
            onClick: () => upcomingMatchDrawer = true
          },
          title: "All Fixtures"
        },
        {},
        {
          default: () => {
            return `${$event.upcommingFixtures.length ? `${validate_component(AllFixtures, "AllFixtures").$$render(
              $$result,
              {
                showMaxDays: 1,
                fixtures: $event.upcommingFixtures.splice(0, 3)
              },
              {},
              {}
            )}` : `<div class="${"text-center py-5"}">No Upcoming Matches</div>`}
		${validate_component(AppDrawer, "AppDrawer").$$render(
              $$result,
              {
                close: () => upcomingMatchDrawer = false,
                open: upcomingMatchDrawer,
                title: "Fixtures"
              },
              {},
              {
                default: () => {
                  return `${validate_component(AllFixtures, "AllFixtures").$$render($$result, { fixtures: $event.fixtures }, {}, {})}`;
                }
              }
            )}`;
          }
        }
      )}` : ``}
${topPlayers.length ? `${validate_component(Card, "Card").$$render(
        $$result,
        {
          titleDiv: false,
          viewMore: {
            placeholder: "Full Table",
            herf: "/rank/player"
          },
          title: "Player Rankings"
        },
        {},
        {
          default: () => {
            return `<div class="${"text-base1 hide-scroll-bar mt-5 overflow-x-auto"}"><table class="${"w-full text-sm text-left"}"><thead class="${"text-xs uppercase"}"><tr class="${"text-base1 x-7 bg-base1light"}"><th class="${"w-1 bg-base2"}" scope="${"col"}"></th>
						<th class="${"py-1 px-2"}" scope="${"col"}">Pos</th>
						<th class="${"py-1 px-3"}" scope="${"col"}">Player</th>
						<th class="${"py-1 px-2"}" scope="${"col"}">M</th>
						<th class="${"py-1 px-2"}" scope="${"col"}">G</th>
						<th class="${"py-1 px-2"}" scope="${"col"}">A</th>
						<th class="${"py-1 px-2"}" scope="${"col"}">Y</th>
						<th class="${"w-1 bg-base2"}" scope="${"col"}"></th></tr></thead>
				<tbody>${each(topPlayers, (player, i) => {
              return `<tr class="${escape(topPlayers.length === i + 1 ? "" : "border-b", true) + " border-base1/50"}"><td class="${"w-1"}"></td>
							<td class="${"py-2 px-3"}">${escape(i + 1)}</td>
							<th class="${"py-2 px-3 font-medium text-gray-900 whitespace-nowrap"}" scope="${"row"}"><a href="${"/profile/player/" + escape(player.id, true)}">${escape(player.name)}</a></th>
							<td class="${"py-2 px-2"}">${escape(player.matchesPlayed ?? 0)}</td>
							<td class="${"py-2 px-2"}">${escape(player.goals ?? 0)}</td>
							<td class="${"py-2 px-2"}">${escape(player.assists ?? 0)}</td>
							<td class="${"py-2 px-2"}">${escape(player.yellowCard ?? 0)}</td>
							<td class="${"w-1"}"></td>
						</tr>`;
            })}</tbody></table></div>`;
          }
        }
      )}` : ``}
${validate_component(Ads, "Ads").$$render($$result, {}, {}, {})}
${topTeams.length ? `${validate_component(Card, "Card").$$render(
        $$result,
        {
          titleDiv: false,
          viewMore: {
            placeholder: "Full Table",
            herf: "/rank/team"
          },
          title: "Team Rankings"
        },
        {},
        {
          default: () => {
            return `<div class="${"text-base1 hide-scroll-bar mt-5 overflow-x-auto"}"><table class="${"w-full text-sm text-left"}"><thead class="${"text-xs uppercase"}"><tr class="${"text-base1 x-7 bg-base1light"}"><th class="${"w-1 bg-base2"}" scope="${"col"}"></th>
						<th class="${"py-1 px-2"}" scope="${"col"}">Pos</th>
						<th class="${"py-1 px-3"}" scope="${"col"}">Teams</th>
						<th class="${"py-1 px-2"}" scope="${"col"}">M</th>
						<th class="${"py-1 px-2"}" scope="${"col"}">GD</th>
						<th class="${"py-1 px-2"}" scope="${"col"}">Pts.</th>
						<th class="${"w-1 bg-base2"}" scope="${"col"}"></th></tr></thead>
				<tbody>${each(topTeams, (team, i) => {
              return `<tr class="${escape(topTeams.length === i + 1 ? "" : "border-b", true) + " border-base1/50"}"><td class="${"w-1"}"></td>
							<td class="${"py-2 px-3"}">${escape(i + 1)}</td>
							<th class="${"py-2 px-3 font-medium text-gray-900 whitespace-nowrap"}" scope="${"row"}"><a href="${"/profile/team/" + escape(team.id, true)}">${escape(team.name)}</a></th>
							<td class="${"py-2 px-2"}">${escape(team.matchesPlayed ?? 0)}</td>
							<td class="${"py-2 px-2"}">${escape(team.goalDifference ?? 0)}</td>
							<td class="${"py-2 px-2"}">${escape(team.points ?? 0)}</td>
							<td class="${"w-1"}"></td>
						</tr>`;
            })}</tbody></table></div>`;
          }
        }
      )}` : ``}
${validate_component(Ads, "Ads").$$render($$result, {}, {}, {})}
${$latestNews.data.length ? `${validate_component(Card, "Card").$$render(
        $$result,
        {
          viewMore: {
            placeholder: "All News",
            onClick: () => latestNewsDrawer = true
          },
          title: "Latest News"
        },
        {},
        {
          default: () => {
            return `${validate_component(AllNews, "AllNews").$$render(
              $$result,
              {
                loading: $latestNews.loading,
                allNews: $latestNews.data.slice(0, 2)
              },
              {},
              {}
            )}
		${validate_component(AppDrawer, "AppDrawer").$$render(
              $$result,
              {
                close: () => latestNewsDrawer = false,
                open: latestNewsDrawer,
                title: "News"
              },
              {},
              {
                default: () => {
                  return `${validate_component(AllNews, "AllNews").$$render(
                    $$result,
                    {
                      onNavigateToOtherPage: () => latestNewsDrawer = false,
                      loading: $latestNews.loading,
                      allNews: $latestNews.data,
                      seeMore: $latestNews.askedFor === $latestNews.data.length ? latestNewsListner.seeMore : void 0
                    },
                    {},
                    {}
                  )}`;
                }
              }
            )}`;
          }
        }
      )}` : ``}

${$latestVideos.data.length ? `${validate_component(Card, "Card").$$render(
        $$result,
        {
          viewMore: {
            placeholder: "All Videos",
            onClick: () => latestVideosDrawer = true
          },
          title: "Latest Videos"
        },
        {},
        {
          default: () => {
            return `${validate_component(AllVideos, "AllVideos").$$render(
              $$result,
              {
                loading: $latestVideos.loading,
                allVideos: $latestVideos.data.slice(0, 2)
              },
              {},
              {}
            )}
		${validate_component(AppDrawer, "AppDrawer").$$render(
              $$result,
              {
                close: () => latestVideosDrawer = false,
                open: latestVideosDrawer,
                title: "Videos"
              },
              {},
              {
                default: () => {
                  return `${validate_component(AllVideos, "AllVideos").$$render(
                    $$result,
                    {
                      onNavigateToOtherPage: () => latestVideosDrawer = false,
                      loading: $latestVideos.loading,
                      allVideos: $latestVideos.data,
                      seeMore: $latestVideos.askedFor === $latestVideos.data.length ? latestVideosListner.seeMore : void 0
                    },
                    {},
                    {}
                  )}`;
                }
              }
            )}`;
          }
        }
      )}` : ``}
${validate_component(Ads, "Ads").$$render($$result, {}, {}, {})}`;
    });
  }
});

// .svelte-kit/output/server/nodes/4.js
var __exports5 = {};
__export(__exports5, {
  component: () => component5,
  file: () => file5,
  imports: () => imports5,
  index: () => index5,
  stylesheets: () => stylesheets5
});
var index5, component5, file5, imports5, stylesheets5;
var init__5 = __esm({
  ".svelte-kit/output/server/nodes/4.js"() {
    index5 = 4;
    component5 = async () => (await Promise.resolve().then(() => (init_page_svelte(), page_svelte_exports))).default;
    file5 = "_app/immutable/components/pages/_page.svelte-6400ead7.js";
    imports5 = ["_app/immutable/components/pages/_page.svelte-6400ead7.js", "_app/immutable/chunks/index-2288207f.js", "_app/immutable/chunks/state-2107352d.js", "_app/immutable/chunks/db-06457d1e.js", "_app/immutable/chunks/AppDrawer-03a7fc0d.js", "_app/immutable/chunks/Share-9deee359.js", "_app/immutable/chunks/Ads-15616d52.js", "_app/immutable/chunks/Card-33f40cce.js", "_app/immutable/chunks/News-9ed2f5fd.js", "_app/immutable/chunks/Video-4c69a625.js"];
    stylesheets5 = ["_app/immutable/assets/AppDrawer-9bb5768f.css", "_app/immutable/assets/Card-3dbfd86e.css"];
  }
});

// .svelte-kit/output/server/entries/pages/news/_newsID_/_page.ts.js
var page_ts_exports = {};
__export(page_ts_exports, {
  load: () => load2
});
var load2;
var init_page_ts = __esm({
  ".svelte-kit/output/server/entries/pages/news/_newsID_/_page.ts.js"() {
    init_db();
    init_index_esm2();
    init_index2();
    init_index_esm20176();
    init_index_esm();
    init_index_esm3();
    init_index_esm4();
    init_index_esm5();
    init_index_esm20177();
    load2 = async ({ params }) => {
      try {
        const res = await dl(xa2(NewsColl, params.newsID));
        const news = res.data();
        if (!news)
          throw error(404, "Not found");
        return news;
      } catch (e) {
        throw error(404, "Not found");
      }
    };
  }
});

// .svelte-kit/output/server/chunks/Seo.js
var Seo;
var init_Seo = __esm({
  ".svelte-kit/output/server/chunks/Seo.js"() {
    init_chunks();
    init_stores();
    Seo = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $page, $$unsubscribe_page;
      $$unsubscribe_page = subscribe(page, (value) => $page = value);
      let { title = "Huddle & Score" } = $$props;
      let { discription = "We are an all-in-one package deal for our customers. We offer bookings of turfs, for you and your friends. We also take care of your need to participate in tournaments and so, we offer bookings for both physical and online tournaments." } = $$props;
      let { url = $page.url.href } = $$props;
      let { poster = void 0 } = $$props;
      if ($$props.title === void 0 && $$bindings.title && title !== void 0)
        $$bindings.title(title);
      if ($$props.discription === void 0 && $$bindings.discription && discription !== void 0)
        $$bindings.discription(discription);
      if ($$props.url === void 0 && $$bindings.url && url !== void 0)
        $$bindings.url(url);
      if ($$props.poster === void 0 && $$bindings.poster && poster !== void 0)
        $$bindings.poster(poster);
      $$unsubscribe_page();
      return `${$$result.head += `${$$result.title = `<title>${escape(title)}</title>`, ""}<meta name="${"title"}"${add_attribute("content", title, 0)} data-svelte="svelte-bfami"><meta name="${"description"}"${add_attribute("content", discription, 0)} data-svelte="svelte-bfami"><meta property="${"og:type"}" content="${"website"}" data-svelte="svelte-bfami"><meta property="${"og:url"}"${add_attribute("content", url, 0)} data-svelte="svelte-bfami"><meta property="${"og:title"}"${add_attribute("content", title, 0)} data-svelte="svelte-bfami"><meta property="${"og:description"}"${add_attribute("content", discription, 0)} data-svelte="svelte-bfami">${poster ? `<meta property="${"og:image"}"${add_attribute("content", poster, 0)} data-svelte="svelte-bfami">` : ``}<meta property="${"twitter:card"}" content="${"summary_large_image"}" data-svelte="svelte-bfami"><meta property="${"twitter:url"}"${add_attribute("content", url, 0)} data-svelte="svelte-bfami"><meta property="${"twitter:title"}"${add_attribute("content", title, 0)} data-svelte="svelte-bfami"><meta property="${"twitter:description"}"${add_attribute("content", discription, 0)} data-svelte="svelte-bfami">${poster ? `<meta property="${"twitter:image"}"${add_attribute("content", poster, 0)} data-svelte="svelte-bfami">` : ``}`, ""}`;
    });
  }
});

// .svelte-kit/output/server/entries/pages/news/_newsID_/_page.svelte.js
var page_svelte_exports2 = {};
__export(page_svelte_exports2, {
  default: () => Page2
});
var Page2;
var init_page_svelte2 = __esm({
  ".svelte-kit/output/server/entries/pages/news/_newsID_/_page.svelte.js"() {
    init_chunks();
    init_stores();
    init_News();
    init_Header();
    init_Seo();
    init_Ads();
    init_state();
    init_index_esm2();
    init_index3();
    init_db();
    init_index_esm20176();
    init_index_esm();
    init_index_esm3();
    init_index_esm4();
    init_index_esm5();
    init_index_esm20177();
    init_Share();
    Page2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let newsID;
      let $page, $$unsubscribe_page;
      $$unsubscribe_page = subscribe(page, (value) => $page = value);
      let { data } = $$props;
      if ($$props.data === void 0 && $$bindings.data && data !== void 0)
        $$bindings.data(data);
      newsID = $page.params.newsID;
      $$unsubscribe_page();
      return `${validate_component(Seo, "Seo").$$render(
        $$result,
        {
          discription: data.caption,
          poster: data.image,
          title: data.title
        },
        {},
        {}
      )}
${validate_component(Header, "Header").$$render(
        $$result,
        {
          title: "Latest News",
          share: {
            path: `/news/${newsID}`,
            title: data == null ? void 0 : data.title
          }
        },
        {},
        {}
      )}
<div class="${"pb-9 mt-1"}">${validate_component(News, "News").$$render($$result, { news: data }, {}, {})}</div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/5.js
var __exports6 = {};
__export(__exports6, {
  component: () => component6,
  file: () => file6,
  imports: () => imports6,
  index: () => index6,
  shared: () => page_ts_exports,
  stylesheets: () => stylesheets6
});
var index6, component6, file6, imports6, stylesheets6;
var init__6 = __esm({
  ".svelte-kit/output/server/nodes/5.js"() {
    init_page_ts();
    index6 = 5;
    component6 = async () => (await Promise.resolve().then(() => (init_page_svelte2(), page_svelte_exports2))).default;
    file6 = "_app/immutable/components/pages/news/_newsID_/_page.svelte-3752f666.js";
    imports6 = ["_app/immutable/components/pages/news/_newsID_/_page.svelte-3752f666.js", "_app/immutable/chunks/index-2288207f.js", "_app/immutable/chunks/stores-83358fdb.js", "_app/immutable/chunks/singletons-c0295a0c.js", "_app/immutable/chunks/News-9ed2f5fd.js", "_app/immutable/chunks/Ads-15616d52.js", "_app/immutable/chunks/state-2107352d.js", "_app/immutable/chunks/db-06457d1e.js", "_app/immutable/chunks/Header-9cf8977c.js", "_app/immutable/chunks/Share-9deee359.js", "_app/immutable/chunks/Seo-aba2adc6.js", "_app/immutable/modules/pages/news/_newsID_/_page.ts-6ab22189.js", "_app/immutable/chunks/db-06457d1e.js", "_app/immutable/chunks/index-d6fabef0.js", "_app/immutable/chunks/_page-d5f7bce6.js"];
    stylesheets6 = [];
  }
});

// .svelte-kit/output/server/entries/pages/profile/_page.svelte.js
var page_svelte_exports3 = {};
__export(page_svelte_exports3, {
  default: () => Page3
});
var Page3;
var init_page_svelte3 = __esm({
  ".svelte-kit/output/server/entries/pages/profile/_page.svelte.js"() {
    init_chunks();
    init_Header();
    init_Seo();
    init_Share();
    init_stores();
    Page3 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `${validate_component(Seo, "Seo").$$render($$result, {}, {}, {})}
${validate_component(Header, "Header").$$render(
        $$result,
        {
          tralingLogo: true,
          title: "Select Profile"
        },
        {},
        {}
      )}
<a href="${"/profile/team"}" class="${"w-[50%] font-bold text-3xl rounded-lg aspect-square mt-5 mx-[25%] text-start items-center flex justify-center bg-base1lighter"}">Team
	<br>Profile
</a>
<a href="${"/profile/player"}" class="${"flex justify-center w-[50%] font-bold text-3xl rounded-lg aspect-square mt-5 mx-[25%] text-start items-center bg-base1lighter"}">Player
	<br>Profile
</a>`;
    });
  }
});

// .svelte-kit/output/server/nodes/6.js
var __exports7 = {};
__export(__exports7, {
  component: () => component7,
  file: () => file7,
  imports: () => imports7,
  index: () => index7,
  stylesheets: () => stylesheets7
});
var index7, component7, file7, imports7, stylesheets7;
var init__7 = __esm({
  ".svelte-kit/output/server/nodes/6.js"() {
    index7 = 6;
    component7 = async () => (await Promise.resolve().then(() => (init_page_svelte3(), page_svelte_exports3))).default;
    file7 = "_app/immutable/components/pages/profile/_page.svelte-9f7c8139.js";
    imports7 = ["_app/immutable/components/pages/profile/_page.svelte-9f7c8139.js", "_app/immutable/chunks/index-2288207f.js", "_app/immutable/chunks/Header-9cf8977c.js", "_app/immutable/chunks/Share-9deee359.js", "_app/immutable/chunks/Seo-aba2adc6.js", "_app/immutable/chunks/stores-83358fdb.js", "_app/immutable/chunks/singletons-c0295a0c.js"];
    stylesheets7 = [];
  }
});

// .svelte-kit/output/server/entries/pages/profile/player/_page.svelte.js
var page_svelte_exports4 = {};
__export(page_svelte_exports4, {
  default: () => Page4
});
var Page4;
var init_page_svelte4 = __esm({
  ".svelte-kit/output/server/entries/pages/profile/player/_page.svelte.js"() {
    init_chunks();
    init_AppDrawer();
    init_Header();
    init_Seo();
    init_state();
    init_Share();
    init_stores();
    init_index_esm2();
    init_index3();
    init_db();
    init_index_esm20176();
    init_index_esm();
    init_index_esm3();
    init_index_esm4();
    init_index_esm5();
    init_index_esm20177();
    Page4 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $event, $$unsubscribe_event;
      $$unsubscribe_event = subscribe(event, (value) => $event = value);
      let selectedTeam = void 0;
      $$unsubscribe_event();
      return `${validate_component(Seo, "Seo").$$render($$result, {}, {}, {})}
${validate_component(AppDrawer, "AppDrawer").$$render(
        $$result,
        {
          bg: "base1",
          open: selectedTeam !== void 0,
          close: () => selectedTeam = void 0,
          placement: "right",
          title: (selectedTeam == null ? void 0 : selectedTeam.name) ?? ""
        },
        {},
        {
          default: () => {
            return `<div class="${"grid grid-cols-2 mx-4 gap-4"}">${selectedTeam ? `${each(selectedTeam.players, (player) => {
              return `<a href="${"/profile/player/" + escape(player.id, true)}" class="${"w-full font-bold py-5 text-center rounded-lg aspect-square mt-5 flex justify-center items-center bg-base1lighter"}"><div><img class="${"w-[20vw] rounded-full sm:w-20 mx-auto"}"${add_attribute("src", player.displayImage, 0)}${add_attribute("alt", player.name, 0)}>
						<span class="${"block mt-2 sm:mt-5 sm:text-xl capitalize"}">${escape(player.name)}</span></div>
				</a>`;
            })}` : ``}</div>`;
          }
        }
      )}
${validate_component(Header, "Header").$$render($$result, { tralingLogo: true, title: "Select Teams" }, {}, {})}
<div class="${"grid grid-cols-2 mx-4 gap-4"}">${each($event.sortedTeams, (team) => {
        return `<button class="${"w-full font-bold py-5 text-center rounded-lg aspect-square mt-5 flex justify-center items-center bg-base1lighter"}"><div><img class="${"w-[20vw] aspect-square sm:w-20 mx-auto"}"${add_attribute("src", team.logo, 0)}${add_attribute("alt", team.name, 0)}>
				<span class="${"block mt-2 sm:mt-5 sm:text-xl capitalize"}">${escape(team.name)}</span></div>
		</button>`;
      })}</div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/7.js
var __exports8 = {};
__export(__exports8, {
  component: () => component8,
  file: () => file8,
  imports: () => imports8,
  index: () => index8,
  stylesheets: () => stylesheets8
});
var index8, component8, file8, imports8, stylesheets8;
var init__8 = __esm({
  ".svelte-kit/output/server/nodes/7.js"() {
    index8 = 7;
    component8 = async () => (await Promise.resolve().then(() => (init_page_svelte4(), page_svelte_exports4))).default;
    file8 = "_app/immutable/components/pages/profile/player/_page.svelte-77b0cc16.js";
    imports8 = ["_app/immutable/components/pages/profile/player/_page.svelte-77b0cc16.js", "_app/immutable/chunks/index-2288207f.js", "_app/immutable/chunks/AppDrawer-03a7fc0d.js", "_app/immutable/chunks/Share-9deee359.js", "_app/immutable/chunks/Header-9cf8977c.js", "_app/immutable/chunks/Seo-aba2adc6.js", "_app/immutable/chunks/stores-83358fdb.js", "_app/immutable/chunks/singletons-c0295a0c.js", "_app/immutable/chunks/state-2107352d.js", "_app/immutable/chunks/db-06457d1e.js"];
    stylesheets8 = ["_app/immutable/assets/AppDrawer-9bb5768f.css"];
  }
});

// .svelte-kit/output/server/entries/pages/profile/player/_playerID_/_page.svelte.js
var page_svelte_exports5 = {};
__export(page_svelte_exports5, {
  default: () => Page5
});
var Instagram, Page5;
var init_page_svelte5 = __esm({
  ".svelte-kit/output/server/entries/pages/profile/player/_playerID_/_page.svelte.js"() {
    init_chunks();
    init_stores();
    init_state();
    init_Card();
    init_AppDrawer();
    init_Ads();
    init_Seo();
    init_index_esm2();
    init_index3();
    init_db();
    init_index_esm20176();
    init_index_esm();
    init_index_esm3();
    init_index_esm4();
    init_index_esm5();
    init_index_esm20177();
    init_News();
    init_Video();
    init_Share();
    Instagram = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<svg width="${"22"}" height="${"22"}" viewBox="${"0 0 22 22"}" fill="${"none"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"M15.5832 1.83317C16.7977 1.8368 17.9615 2.32088 18.8203 3.1797C19.6791 4.03852 20.1632 5.20228 20.1668 6.41683V15.5832C20.1632 16.7977 19.6791 17.9615 18.8203 18.8203C17.9615 19.6791 16.7977 20.1632 15.5832 20.1668H6.41683C5.20228 20.1632 4.03852 19.6791 3.1797 18.8203C2.32088 17.9615 1.8368 16.7977 1.83317 15.5832V6.41683C1.8368 5.20228 2.32088 4.03852 3.1797 3.1797C4.03852 2.32088 5.20228 1.8368 6.41683 1.83317H15.5832M15.5832 0H6.41683C2.8875 0 0 2.8875 0 6.41683V15.5832C0 19.1125 2.8875 22 6.41683 22H15.5832C19.1125 22 22 19.1125 22 15.5832V6.41683C22 2.8875 19.1125 0 15.5832 0V0Z"}" fill="${"black"}"></path><path d="${"M16.9582 6.41684C16.6862 6.41684 16.4204 6.3362 16.1943 6.18511C15.9681 6.03402 15.7919 5.81928 15.6878 5.56803C15.5838 5.31678 15.5565 5.04031 15.6096 4.77359C15.6626 4.50687 15.7936 4.26187 15.9859 4.06957C16.1782 3.87727 16.4232 3.74632 16.6899 3.69326C16.9566 3.64021 17.2331 3.66744 17.4844 3.77151C17.7356 3.87558 17.9504 4.05181 18.1014 4.27793C18.2525 4.50405 18.3332 4.76989 18.3332 5.04184C18.3336 5.22252 18.2983 5.40149 18.2293 5.56849C18.1603 5.73549 18.0591 5.88722 17.9313 6.01498C17.8036 6.14274 17.6518 6.244 17.4848 6.31297C17.3178 6.38193 17.1388 6.41723 16.9582 6.41684V6.41684ZM11 7.33318C11.7252 7.33318 12.4342 7.54824 13.0372 7.95115C13.6402 8.35407 14.1102 8.92675 14.3877 9.59677C14.6652 10.2668 14.7379 11.0041 14.5964 11.7154C14.4549 12.4267 14.1057 13.08 13.5928 13.5928C13.08 14.1057 12.4267 14.4549 11.7154 14.5964C11.0041 14.7379 10.2668 14.6653 9.59677 14.3877C8.92674 14.1102 8.35406 13.6402 7.95114 13.0372C7.54823 12.4342 7.33317 11.7252 7.33317 11C7.33421 10.0278 7.72087 9.09576 8.40831 8.40832C9.09575 7.72088 10.0278 7.33422 11 7.33318M11 5.50001C9.9122 5.50001 8.84884 5.82258 7.94437 6.42693C7.0399 7.03127 6.33495 7.89026 5.91867 8.89525C5.50238 9.90024 5.39346 11.0061 5.60568 12.073C5.8179 13.1399 6.34173 14.1199 7.11092 14.8891C7.8801 15.6583 8.86011 16.1821 9.92701 16.3943C10.9939 16.6065 12.0998 16.4976 13.1048 16.0813C14.1098 15.6651 14.9687 14.9601 15.5731 14.0556C16.1774 13.1512 16.5 12.0878 16.5 11C16.5 9.54132 15.9205 8.14237 14.8891 7.11092C13.8576 6.07947 12.4587 5.50001 11 5.50001V5.50001Z"}" fill="${"black"}"></path></svg>`;
    });
    Page5 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let playerID;
      let player;
      let stats;
      let $event, $$unsubscribe_event;
      let $page, $$unsubscribe_page;
      let $latestNews, $$unsubscribe_latestNews;
      let $latestVideos, $$unsubscribe_latestVideos;
      $$unsubscribe_event = subscribe(event, (value) => $event = value);
      $$unsubscribe_page = subscribe(page, (value) => $page = value);
      let latestNewsDrawer = false;
      let latestVideosDrawer = false;
      const latestNews = selectiveNewsListner.store;
      $$unsubscribe_latestNews = subscribe(latestNews, (value) => $latestNews = value);
      const latestVideos = selectiveVideoListner.store;
      $$unsubscribe_latestVideos = subscribe(latestVideos, (value) => $latestVideos = value);
      playerID = $page.params.playerID;
      player = $event.players[playerID];
      stats = [
        {
          title: "Matches Played",
          val: player.matchesPlayed
        },
        { title: "Goals Scored", val: player.goals },
        { title: "Assists", val: player.assists },
        {
          title: "Yellow Card",
          val: player.yellowCard
        },
        { title: "Red Card", val: player.redCard }
      ].reduce(
        function(p2, c, i) {
          if (i % 2)
            p2[p2.length - 1].push(c);
          else
            p2.push([c]);
          return p2;
        },
        []
      );
      $$unsubscribe_event();
      $$unsubscribe_page();
      $$unsubscribe_latestNews();
      $$unsubscribe_latestVideos();
      return `${validate_component(Seo, "Seo").$$render(
        $$result,
        {
          discription: player.position + " in " + player.team.name + ", (with score of " + player.score + ")",
          poster: player.displayImage,
          title: player.name
        },
        {},
        {}
      )}
<div class="${"relative w-[320px] mx-auto"}"><div style="${"position: absolute; width: 263px; height: 301px; left: 11px; top: 10px; font-style: normal; font-weight: 900; font-size: 219.28px; line-height: 301px; background: linear-gradient(129.49deg, rgba(255, 255, 255, 0.28) 0.67%, rgba(0, 255, 28, 0.28) 54.08%, rgba(1, 51, 1, 0.28) 109.66%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; text-fill-color: transparent; "}">${escape(Number.isNaN(player.score) ? "00" : player.score < 10 ? "0" + player.score.toFixed(0) : player.score.toFixed(0))}</div>
	<div class="${"relative z-10 overflow-hidden bg-scroll bg-no-repeat w-full"}" style="${"background-image: url(" + escape(player.displayImage, true) + "); background-size: contain; height: 300px; background-position: 123px top;"}"><div class="${"w-full h-full"}" style="${"background-image : linear-gradient(to bottom, rgba(40, 73, 40, 0), rgba(40, 73, 40, 1)); "}"></div></div></div>
<div class="${"page-margin overflow-hidden flex justify-between"}"><div><h2 class="${"font-bold text-5xl"}">${escape(player.name)}</h2>
		<a href="${"/profile/team/" + escape(player.teamID, true)}" class="${"font-thin whitespace-nowrap text-xl"}">${escape(player.team.name)}</a></div>
	<a href="${"/profile/team/" + escape(player.teamID, true)}" class="${"-translate-x-5"}"><img${add_attribute("src", player.team.logo, 0)}${add_attribute("alt", player.team.name, 0)} class="${"w-24 ml-5"}"></a></div>
<h2 class="${"text-xl mt-5 page-margin"}">Overview</h2>
<div class="${"grid grid-cols-3 mt-5 page-margin gap-3"}">${each(
        [
          { title: "Attack", val: player.attack },
          {
            title: "Possession",
            val: player.possession
          },
          { title: "Defence", val: player.defence }
        ],
        ({ title, val }) => {
          return `<div class="${"rounded-xl bg-base1light p-3"}"><span class="${"font-medium text-xs block text-base1"}">${escape(title)}</span>
			<span class="${"font-bold text-4xl text-base1"}">${escape(Number.isNaN(val) ? "--" : val < 10 ? "0" + val.toFixed(0) : val.toFixed(0))}</span>
		</div>`;
        }
      )}</div>

<a href="${"https://www.instagram.com/" + escape(player.instagramUsername, true) + "/"}" target="${"_blank"}" class="${"m-8 bg-base1light py-2 whitespace-nowrap font-bold rounded-lg flex justify-center items-center"}"><span>Follow on Instagram</span>
	<span class="${"ml-2"}">${validate_component(Instagram, "Instagram").$$render($$result, {}, {}, {})}</span></a>
${validate_component(Card, "Card").$$render($$result, {}, {}, {
        default: () => {
          return `${each(stats, (data) => {
            return `<div class="${"flex justify-around mt-2"}">${each(data, (stat) => {
              return `<div class="${"rounded-xl bg-base1 text-center w-36 h-24 p-3"}"><span class="${"font-medium text-xs block"}">${escape(stat.title)}</span>
					<span class="${"font-bold block mt-3 text-4xl"}">${escape(Number.isNaN(stat.val) ? "--" : stat.val.toFixed(0))}</span>
				</div>`;
            })}
		</div>`;
          })}`;
        }
      })}
${$latestNews.data.length ? `${validate_component(Card, "Card").$$render(
        $$result,
        {
          title: "Latest News",
          viewMore: {
            placeholder: "All News",
            onClick: () => latestNewsDrawer = true
          }
        },
        {},
        {
          default: () => {
            return `${validate_component(AllNews, "AllNews").$$render(
              $$result,
              {
                loading: $latestNews.loading,
                allNews: $latestNews.data.slice(0, 2)
              },
              {},
              {}
            )}
		${validate_component(AppDrawer, "AppDrawer").$$render(
              $$result,
              {
                close: () => latestNewsDrawer = false,
                open: latestNewsDrawer,
                title: "News"
              },
              {},
              {
                default: () => {
                  return `${validate_component(AllNews, "AllNews").$$render(
                    $$result,
                    {
                      onNavigateToOtherPage: () => latestNewsDrawer = false,
                      loading: $latestNews.loading,
                      allNews: $latestNews.data,
                      seeMore: $latestNews.askedFor === $latestNews.data.length ? selectiveNewsListner.seeMore : void 0
                    },
                    {},
                    {}
                  )}`;
                }
              }
            )}`;
          }
        }
      )}` : ``}
${$latestVideos.data.length ? `${validate_component(Card, "Card").$$render(
        $$result,
        {
          viewMore: {
            placeholder: "All Videos",
            onClick: () => latestVideosDrawer = true
          },
          title: "Latest Videos"
        },
        {},
        {
          default: () => {
            return `${validate_component(AllVideos, "AllVideos").$$render(
              $$result,
              {
                loading: $latestVideos.loading,
                allVideos: $latestVideos.data.slice(0, 2)
              },
              {},
              {}
            )}
		${validate_component(AppDrawer, "AppDrawer").$$render(
              $$result,
              {
                close: () => latestVideosDrawer = false,
                open: latestVideosDrawer,
                title: "Videos"
              },
              {},
              {
                default: () => {
                  return `${validate_component(AllVideos, "AllVideos").$$render(
                    $$result,
                    {
                      onNavigateToOtherPage: () => latestVideosDrawer = false,
                      loading: $latestVideos.loading,
                      allVideos: $latestVideos.data,
                      seeMore: $latestVideos.askedFor === $latestVideos.data.length ? selectiveVideoListner.seeMore : void 0
                    },
                    {},
                    {}
                  )}`;
                }
              }
            )}`;
          }
        }
      )}` : ``}
${validate_component(Ads, "Ads").$$render($$result, {}, {}, {})}`;
    });
  }
});

// .svelte-kit/output/server/nodes/8.js
var __exports9 = {};
__export(__exports9, {
  component: () => component9,
  file: () => file9,
  imports: () => imports9,
  index: () => index9,
  stylesheets: () => stylesheets9
});
var index9, component9, file9, imports9, stylesheets9;
var init__9 = __esm({
  ".svelte-kit/output/server/nodes/8.js"() {
    index9 = 8;
    component9 = async () => (await Promise.resolve().then(() => (init_page_svelte5(), page_svelte_exports5))).default;
    file9 = "_app/immutable/components/pages/profile/player/_playerID_/_page.svelte-c67c0623.js";
    imports9 = ["_app/immutable/components/pages/profile/player/_playerID_/_page.svelte-c67c0623.js", "_app/immutable/chunks/index-2288207f.js", "_app/immutable/chunks/stores-83358fdb.js", "_app/immutable/chunks/singletons-c0295a0c.js", "_app/immutable/chunks/state-2107352d.js", "_app/immutable/chunks/db-06457d1e.js", "_app/immutable/chunks/Card-33f40cce.js", "_app/immutable/chunks/AppDrawer-03a7fc0d.js", "_app/immutable/chunks/Share-9deee359.js", "_app/immutable/chunks/News-9ed2f5fd.js", "_app/immutable/chunks/Ads-15616d52.js", "_app/immutable/chunks/Video-4c69a625.js", "_app/immutable/chunks/Seo-aba2adc6.js"];
    stylesheets9 = ["_app/immutable/assets/Card-3dbfd86e.css", "_app/immutable/assets/AppDrawer-9bb5768f.css"];
  }
});

// .svelte-kit/output/server/entries/pages/profile/team/_page.svelte.js
var page_svelte_exports6 = {};
__export(page_svelte_exports6, {
  default: () => Page6
});
var Page6;
var init_page_svelte6 = __esm({
  ".svelte-kit/output/server/entries/pages/profile/team/_page.svelte.js"() {
    init_chunks();
    init_Header();
    init_Seo();
    init_state();
    init_Share();
    init_stores();
    init_index_esm2();
    init_index3();
    init_db();
    init_index_esm20176();
    init_index_esm();
    init_index_esm3();
    init_index_esm4();
    init_index_esm5();
    init_index_esm20177();
    Page6 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $event, $$unsubscribe_event;
      $$unsubscribe_event = subscribe(event, (value) => $event = value);
      $$unsubscribe_event();
      return `${validate_component(Seo, "Seo").$$render($$result, {}, {}, {})}
${validate_component(Header, "Header").$$render($$result, { tralingLogo: true, title: "Teams" }, {}, {})}
<div class="${"grid grid-cols-2 mx-4 gap-4"}">${each($event.sortedTeams, (team) => {
        return `<a href="${"/profile/team/" + escape(team.id, true)}" class="${"w-full font-bold py-5 text-center rounded-lg aspect-square mt-5 flex justify-center items-center bg-base1lighter"}"><div><img class="${"w-[20vw] sm:w-20 mx-auto"}"${add_attribute("src", team.logo, 0)}${add_attribute("alt", team.name, 0)}>
				<span class="${"block mt-2 sm:mt-5 sm:text-xl capitalize"}">${escape(team.name)}</span></div>
		</a>`;
      })}</div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/9.js
var __exports10 = {};
__export(__exports10, {
  component: () => component10,
  file: () => file10,
  imports: () => imports10,
  index: () => index10,
  stylesheets: () => stylesheets10
});
var index10, component10, file10, imports10, stylesheets10;
var init__10 = __esm({
  ".svelte-kit/output/server/nodes/9.js"() {
    index10 = 9;
    component10 = async () => (await Promise.resolve().then(() => (init_page_svelte6(), page_svelte_exports6))).default;
    file10 = "_app/immutable/components/pages/profile/team/_page.svelte-5f1bb232.js";
    imports10 = ["_app/immutable/components/pages/profile/team/_page.svelte-5f1bb232.js", "_app/immutable/chunks/index-2288207f.js", "_app/immutable/chunks/Header-9cf8977c.js", "_app/immutable/chunks/Share-9deee359.js", "_app/immutable/chunks/Seo-aba2adc6.js", "_app/immutable/chunks/stores-83358fdb.js", "_app/immutable/chunks/singletons-c0295a0c.js", "_app/immutable/chunks/state-2107352d.js", "_app/immutable/chunks/db-06457d1e.js"];
    stylesheets10 = [];
  }
});

// .svelte-kit/output/server/entries/pages/profile/team/_teamID_/_page.svelte.js
var page_svelte_exports7 = {};
__export(page_svelte_exports7, {
  default: () => Page7
});
var Overview, Squad, Page7;
var init_page_svelte7 = __esm({
  ".svelte-kit/output/server/entries/pages/profile/team/_teamID_/_page.svelte.js"() {
    init_chunks();
    init_Seo();
    init_stores();
    init_state();
    init_Card();
    init_AppDrawer();
    init_index_esm2();
    init_index3();
    init_db();
    init_index_esm20176();
    init_index_esm();
    init_index_esm3();
    init_index_esm4();
    init_index_esm5();
    init_index_esm20177();
    init_News();
    init_Ads();
    init_Video();
    init_Share();
    Overview = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let teamID;
      let team;
      let stats;
      let $event, $$unsubscribe_event;
      let $page, $$unsubscribe_page;
      let $latestNews, $$unsubscribe_latestNews;
      let $latestVideos, $$unsubscribe_latestVideos;
      $$unsubscribe_event = subscribe(event, (value) => $event = value);
      $$unsubscribe_page = subscribe(page, (value) => $page = value);
      let latestNewsDrawer = false;
      let latestVideosDrawer = false;
      const latestNews = selectiveNewsListner.store;
      $$unsubscribe_latestNews = subscribe(latestNews, (value) => $latestNews = value);
      const latestVideos = selectiveVideoListner.store;
      $$unsubscribe_latestVideos = subscribe(latestVideos, (value) => $latestVideos = value);
      teamID = $page.params.teamID;
      team = $event.teams[teamID];
      stats = [
        {
          title: "Matches Played",
          val: team.matchesPlayed
        },
        {
          title: "Goals Scored",
          val: team.goalScored
        },
        { title: "Wins", val: team.won },
        { title: "Losses", val: team.loss },
        {
          title: "Goals Conceived",
          val: team.goalConceived
        },
        {
          title: "Goal Difference",
          val: team.goalDifference
        },
        { title: "Points", val: team.points }
      ].reduce(
        function(p2, c, i) {
          if (i % 2)
            p2[p2.length - 1].push(c);
          else
            p2.push([c]);
          return p2;
        },
        []
      );
      $$unsubscribe_event();
      $$unsubscribe_page();
      $$unsubscribe_latestNews();
      $$unsubscribe_latestVideos();
      return `<div><div class="${"relative"}"><div class="${"w-full text-center"}" style="${"position: absolute; top: -45px; font-weight: 900; font-size: 214.431px; line-height: 137.4%; background: linear-gradient(129.49deg, rgba(255, 255, 255, 0.28) 0.67%, rgba(0, 255, 28, 0.28) 54.08%, rgba(1, 51, 1, 0.28) 109.66%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; text-fill-color: transparent; "}">${escape(Number.isNaN(team.score) ? "00" : team.score < 10 ? "0" + team.score.toFixed(0) : team.score.toFixed(0))}</div>
		<img${add_attribute("src", team.logo, 0)}${add_attribute("alt", team.name, 0)} class="${"mx-auto pt-32 relative z-10 w-[50%]"}"></div>
	<h2 class="${"text-xl mt-5 page-margin"}">Overview</h2>
	<div class="${"grid grid-cols-3 mt-5 page-margin gap-3"}">${each(
        [
          { title: "Attack", val: team.attack },
          {
            title: "Possession",
            val: team.possession
          },
          { title: "Defence", val: team.defence }
        ],
        ({ title, val }) => {
          return `<div class="${"rounded-xl bg-base1light p-3"}"><span class="${"font-medium text-xs block text-base1"}">${escape(title)}</span>
				<span class="${"font-bold text-4xl text-base1"}">${escape(Number.isNaN(val) ? "--" : val < 10 ? "0" + val.toFixed(0) : val.toFixed(0))}</span>
			</div>`;
        }
      )}</div>

	<h2 class="${"text-xl mt-5 page-margin font-bold"}">Team Chemistry</h2>
	<div class="${"mt-1 page-margin flex items-center"}"><div class="${"bg-base2 h-1 w-[35%] rounded-full"}"><div class="${"bg-danger h-1 rounded-full"}" style="${"width: " + escape(team.teamChemistry, true) + "%;"}"></div></div>
		<span class="${"ml-2"}">${escape(team.teamChemistry)}%</span></div></div>
${validate_component(Card, "Card").$$render($$result, {}, {}, {
        default: () => {
          return `${each(stats, (data) => {
            return `<div class="${"flex justify-around mt-2"}">${each(data, (stat) => {
              return `<div class="${"rounded-xl bg-base1 text-center w-36 h-24 p-3"}"><span class="${"font-medium text-xs block"}">${escape(stat.title)}</span>
					<span class="${"font-bold block mt-3 text-4xl"}">${escape(Number.isNaN(stat.val) ? "--" : stat.val.toFixed(0))}</span>
				</div>`;
            })}
		</div>`;
          })}`;
        }
      })}
${$latestNews.data.length ? `${validate_component(Card, "Card").$$render(
        $$result,
        {
          title: "Latest News",
          viewMore: {
            placeholder: "All News",
            onClick: () => latestNewsDrawer = true
          }
        },
        {},
        {
          default: () => {
            return `${validate_component(AllNews, "AllNews").$$render(
              $$result,
              {
                loading: $latestNews.loading,
                allNews: $latestNews.data.slice(0, 2)
              },
              {},
              {}
            )}
		${validate_component(AppDrawer, "AppDrawer").$$render(
              $$result,
              {
                close: () => latestNewsDrawer = false,
                open: latestNewsDrawer,
                title: "News"
              },
              {},
              {
                default: () => {
                  return `${validate_component(AllNews, "AllNews").$$render(
                    $$result,
                    {
                      onNavigateToOtherPage: () => latestNewsDrawer = false,
                      loading: $latestNews.loading,
                      allNews: $latestNews.data,
                      seeMore: $latestNews.askedFor === $latestNews.data.length ? selectiveNewsListner.seeMore : void 0
                    },
                    {},
                    {}
                  )}`;
                }
              }
            )}`;
          }
        }
      )}` : ``}
${$latestVideos.data.length ? `${validate_component(Card, "Card").$$render(
        $$result,
        {
          viewMore: {
            placeholder: "All Videos",
            onClick: () => latestVideosDrawer = true
          },
          title: "Latest Videos"
        },
        {},
        {
          default: () => {
            return `${validate_component(AllVideos, "AllVideos").$$render(
              $$result,
              {
                loading: $latestVideos.loading,
                allVideos: $latestVideos.data.slice(0, 2)
              },
              {},
              {}
            )}
		${validate_component(AppDrawer, "AppDrawer").$$render(
              $$result,
              {
                close: () => latestVideosDrawer = false,
                open: latestVideosDrawer,
                title: "Videos"
              },
              {},
              {
                default: () => {
                  return `${validate_component(AllVideos, "AllVideos").$$render(
                    $$result,
                    {
                      onNavigateToOtherPage: () => latestVideosDrawer = false,
                      loading: $latestVideos.loading,
                      allVideos: $latestVideos.data,
                      seeMore: $latestVideos.askedFor === $latestVideos.data.length ? selectiveVideoListner.seeMore : void 0
                    },
                    {},
                    {}
                  )}`;
                }
              }
            )}`;
          }
        }
      )}` : ``}`;
    });
    Squad = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let teamID;
      let team;
      let playersType;
      let $event, $$unsubscribe_event;
      let $page, $$unsubscribe_page;
      $$unsubscribe_event = subscribe(event, (value) => $event = value);
      $$unsubscribe_page = subscribe(page, (value) => $page = value);
      teamID = $page.params.teamID;
      team = $event.teams[teamID];
      playersType = team.players.reduce(
        function(prv, player) {
          prv[player.position].push(player);
          return prv;
        },
        {
          Forward: [],
          Midfield: [],
          Defence: [],
          Goalkeeper: []
        }
      );
      $$unsubscribe_event();
      $$unsubscribe_page();
      return `${each(
        [
          {
            title: "Goal Keeper",
            players: playersType["Goalkeeper"]
          },
          {
            title: "Defender",
            players: playersType["Defence"]
          },
          {
            title: "Midfielders",
            players: playersType["Midfield"]
          },
          {
            title: "Attackers",
            players: playersType["Forward"]
          }
        ],
        ({ title, players }) => {
          return `<h2 class="${"mt-8 capitalize font-bold text-xl page-margin"}">${escape(title)}</h2>
	${players.length ? `${each(players, (player) => {
            return `<a href="${"/profile/player/" + escape(player.id, true)}" class="${"flex mt-5 page-margin"}"><img${add_attribute("src", player.displayImage, 0)}${add_attribute("alt", player.name, 0)} class="${"rounded-full bg-base2 h-16"}">
				<div class="${"ml-3"}"><div class="${"font-bold"}">${escape(player.name)}</div>
					<div class="${"mt-1"}">${escape(player.place)}</div></div>
			</a>`;
          })}` : `<span class="${"mx-10"}">No Player </span>`}`;
        }
      )}`;
    });
    Page7 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let teamID;
      let team;
      let $event, $$unsubscribe_event;
      let $page, $$unsubscribe_page;
      $$unsubscribe_event = subscribe(event, (value) => $event = value);
      $$unsubscribe_page = subscribe(page, (value) => $page = value);
      let xPos = 0;
      let content;
      teamID = $page.params.teamID;
      team = $event.teams[teamID];
      $$unsubscribe_event();
      $$unsubscribe_page();
      return `${validate_component(Seo, "Seo").$$render(
        $$result,
        {
          discription: "Team Chemistry of " + team.teamChemistry + "%, (with score of " + team.score + ")",
          poster: team.logo,
          title: team.name
        },
        {},
        {}
      )}
<div class="${"relative flex text-base1 w-64 text-center mt-5 rounded-lg bg-base1light mx-auto"}"><div class="${"absolute bg-base2 rounded-lg h-full w-32"}" style="${"left: " + escape(xPos * 100, true) + "%;"}"></div>
	<button class="${"relative pl-9 z-10 pr-8 py-2"}">Overview
	</button>
	<button class="${"relative pr-9 z-10 pl-8 py-2"}">Squad
	</button></div>

<ul class="${"flex w-full snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-none hide-scroll-bar"}"${add_attribute("this", content, 0)}><li class="${"screen-width object-cover relative shrink-0 snap-center"}">${validate_component(Overview, "Overview").$$render($$result, {}, {}, {})}</li>
	<li class="${"screen-width object-cover relative shrink-0 snap-center"}">${validate_component(Squad, "Squad").$$render($$result, {}, {}, {})}</li></ul>`;
    });
  }
});

// .svelte-kit/output/server/nodes/10.js
var __exports11 = {};
__export(__exports11, {
  component: () => component11,
  file: () => file11,
  imports: () => imports11,
  index: () => index11,
  stylesheets: () => stylesheets11
});
var index11, component11, file11, imports11, stylesheets11;
var init__11 = __esm({
  ".svelte-kit/output/server/nodes/10.js"() {
    index11 = 10;
    component11 = async () => (await Promise.resolve().then(() => (init_page_svelte7(), page_svelte_exports7))).default;
    file11 = "_app/immutable/components/pages/profile/team/_teamID_/_page.svelte-a064de93.js";
    imports11 = ["_app/immutable/components/pages/profile/team/_teamID_/_page.svelte-a064de93.js", "_app/immutable/chunks/index-2288207f.js", "_app/immutable/chunks/Seo-aba2adc6.js", "_app/immutable/chunks/stores-83358fdb.js", "_app/immutable/chunks/singletons-c0295a0c.js", "_app/immutable/chunks/state-2107352d.js", "_app/immutable/chunks/db-06457d1e.js", "_app/immutable/chunks/Card-33f40cce.js", "_app/immutable/chunks/AppDrawer-03a7fc0d.js", "_app/immutable/chunks/Share-9deee359.js", "_app/immutable/chunks/News-9ed2f5fd.js", "_app/immutable/chunks/Ads-15616d52.js", "_app/immutable/chunks/Video-4c69a625.js"];
    stylesheets11 = ["_app/immutable/assets/Card-3dbfd86e.css", "_app/immutable/assets/AppDrawer-9bb5768f.css"];
  }
});

// .svelte-kit/output/server/entries/pages/rank/_page.svelte.js
var page_svelte_exports8 = {};
__export(page_svelte_exports8, {
  default: () => Page8
});
var Page8;
var init_page_svelte8 = __esm({
  ".svelte-kit/output/server/entries/pages/rank/_page.svelte.js"() {
    init_chunks();
    init_Header();
    init_Seo();
    init_Share();
    init_stores();
    Page8 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `${validate_component(Seo, "Seo").$$render($$result, {}, {}, {})}
${validate_component(Header, "Header").$$render(
        $$result,
        {
          tralingLogo: true,
          title: "Select Ranking"
        },
        {},
        {}
      )}
<a href="${"/rank/team"}" class="${"w-[50%] font-bold text-3xl rounded-lg aspect-square mt-5 mx-[25%] text-start items-center flex justify-center bg-base1lighter"}">Team
	<br>Ranking
</a>
<a href="${"/rank/player"}" class="${"flex justify-center w-[50%] font-bold text-3xl rounded-lg aspect-square mt-5 mx-[25%] text-start items-center bg-base1lighter"}">Player
	<br>Ranking
</a>`;
    });
  }
});

// .svelte-kit/output/server/nodes/11.js
var __exports12 = {};
__export(__exports12, {
  component: () => component12,
  file: () => file12,
  imports: () => imports12,
  index: () => index12,
  stylesheets: () => stylesheets12
});
var index12, component12, file12, imports12, stylesheets12;
var init__12 = __esm({
  ".svelte-kit/output/server/nodes/11.js"() {
    index12 = 11;
    component12 = async () => (await Promise.resolve().then(() => (init_page_svelte8(), page_svelte_exports8))).default;
    file12 = "_app/immutable/components/pages/rank/_page.svelte-60f40151.js";
    imports12 = ["_app/immutable/components/pages/rank/_page.svelte-60f40151.js", "_app/immutable/chunks/index-2288207f.js", "_app/immutable/chunks/Header-9cf8977c.js", "_app/immutable/chunks/Share-9deee359.js", "_app/immutable/chunks/Seo-aba2adc6.js", "_app/immutable/chunks/stores-83358fdb.js", "_app/immutable/chunks/singletons-c0295a0c.js"];
    stylesheets12 = [];
  }
});

// .svelte-kit/output/server/entries/pages/rank/player/_page.svelte.js
var page_svelte_exports9 = {};
__export(page_svelte_exports9, {
  default: () => Page9
});
var Page9;
var init_page_svelte9 = __esm({
  ".svelte-kit/output/server/entries/pages/rank/player/_page.svelte.js"() {
    init_chunks();
    init_Header();
    init_Seo();
    init_state();
    init_Share();
    init_stores();
    init_index_esm2();
    init_index3();
    init_db();
    init_index_esm20176();
    init_index_esm();
    init_index_esm3();
    init_index_esm4();
    init_index_esm5();
    init_index_esm20177();
    Page9 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $event, $$unsubscribe_event;
      $$unsubscribe_event = subscribe(event, (value) => $event = value);
      $$unsubscribe_event();
      return `${validate_component(Seo, "Seo").$$render($$result, {}, {}, {})}
${validate_component(Header, "Header").$$render(
        $$result,
        {
          tralingLogo: true,
          title: "Player Rankings"
        },
        {},
        {}
      )}
<div class="${"bg-base2"}"><div class="${"text-base1 hide-scroll-bar overflow-x-auto"}"><table class="${"w-full text-sm text-left"}"><thead class="${"text-xs"}"><tr class="${"page-margin x-7 bg-base1light"}"><th class="${"py-2 font-medium pr-2 pl-2"}" scope="${"col"}">Pos</th>
					<th class="${"py-2 font-medium pr-4"}" scope="${"col"}">Player</th>
					<th class="${"py-2 font-medium pr-3"}" scope="${"col"}">M</th>
					<th class="${"py-2 font-medium pr-3"}" scope="${"col"}">G</th>
					<th class="${"py-2 font-medium pr-3"}" scope="${"col"}">A</th>
					<th class="${"py-2 font-medium pr-3"}" scope="${"col"}">Y</th>
					<th class="${"py-2 font-medium pr-2"}" scope="${"col"}">R</th></tr></thead>
			<tbody>${each($event.sortedPlayers, (player, i) => {
        return `<tr class="${"page-margin border-b border-base1/50"}"><td class="${"py-2 pr-2 pl-2"}">${escape(i + 1)}</td>
						<th class="${"py-2 pr-4 font-medium text-gray-900 whitespace-nowrap"}" scope="${"row"}"><a href="${"/profile/player/" + escape(player.id, true)}" class="${"flex items-center"}"><img${add_attribute("src", player.team.logo, 0)}${add_attribute("alt", player.team.name, 0)} class="${"object-cover h-4 mr-2"}">
								${escape(player.name)}
							</a></th>
						<td class="${"py-2 pr-3"}">${escape(player.matchesPlayed ?? 0)}</td>
						<td class="${"py-2 pr-3"}">${escape(player.goals ?? 0)}</td>
						<td class="${"py-2 pr-3"}">${escape(player.assists ?? 0)}</td>
						<td class="${"py-2 pr-3"}">${escape(player.yellowCard ?? 0)}</td>
						<td class="${"py-2 pr-2"}">${escape(player.redCard ?? 0)}</td>
					</tr>`;
      })}</tbody></table></div></div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/12.js
var __exports13 = {};
__export(__exports13, {
  component: () => component13,
  file: () => file13,
  imports: () => imports13,
  index: () => index13,
  stylesheets: () => stylesheets13
});
var index13, component13, file13, imports13, stylesheets13;
var init__13 = __esm({
  ".svelte-kit/output/server/nodes/12.js"() {
    index13 = 12;
    component13 = async () => (await Promise.resolve().then(() => (init_page_svelte9(), page_svelte_exports9))).default;
    file13 = "_app/immutable/components/pages/rank/player/_page.svelte-65b824fb.js";
    imports13 = ["_app/immutable/components/pages/rank/player/_page.svelte-65b824fb.js", "_app/immutable/chunks/index-2288207f.js", "_app/immutable/chunks/Header-9cf8977c.js", "_app/immutable/chunks/Share-9deee359.js", "_app/immutable/chunks/Seo-aba2adc6.js", "_app/immutable/chunks/stores-83358fdb.js", "_app/immutable/chunks/singletons-c0295a0c.js", "_app/immutable/chunks/state-2107352d.js", "_app/immutable/chunks/db-06457d1e.js"];
    stylesheets13 = [];
  }
});

// .svelte-kit/output/server/entries/pages/rank/team/_page.svelte.js
var page_svelte_exports10 = {};
__export(page_svelte_exports10, {
  default: () => Page10
});
var Page10;
var init_page_svelte10 = __esm({
  ".svelte-kit/output/server/entries/pages/rank/team/_page.svelte.js"() {
    init_chunks();
    init_Header();
    init_Seo();
    init_state();
    init_Share();
    init_stores();
    init_index_esm2();
    init_index3();
    init_db();
    init_index_esm20176();
    init_index_esm();
    init_index_esm3();
    init_index_esm4();
    init_index_esm5();
    init_index_esm20177();
    Page10 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $event, $$unsubscribe_event;
      $$unsubscribe_event = subscribe(event, (value) => $event = value);
      $$unsubscribe_event();
      return `${validate_component(Seo, "Seo").$$render($$result, {}, {}, {})}
${validate_component(Header, "Header").$$render(
        $$result,
        {
          tralingLogo: true,
          title: "Team Rankings"
        },
        {},
        {}
      )}
<div class="${"bg-base2"}"><div class="${"text-base1 hide-scroll-bar overflow-x-auto"}"><table class="${"w-full text-sm text-left"}"><thead class="${"text-xs"}"><tr class="${"page-margin x-7 bg-base1light"}"><th class="${"py-2 font-medium pr-2 pl-2"}" scope="${"col"}">Pos</th>
					<th class="${"py-2 font-medium pr-4"}" scope="${"col"}">Teams</th>
					
					<th class="${"py-2 font-medium pr-3"}" scope="${"col"}">M</th>
					<th class="${"py-2 font-medium pr-3"}" scope="${"col"}">W</th>
					<th class="${"py-2 font-medium pr-3"}" scope="${"col"}">L</th>
					<th class="${"py-2 font-medium pr-3"}" scope="${"col"}">P</th>
					<th class="${"py-2 font-medium pr-3"}" scope="${"col"}">GS</th>
					<th class="${"py-2 font-medium pr-3"}" scope="${"col"}">GC</th>
					<th class="${"py-2 font-medium pr-2"}" scope="${"col"}">GD</th></tr></thead>
			<tbody>${each($event.sortedTeams, (team, i) => {
        return `<tr class="${"page-margin border-b border-base1/50"}"><td class="${"py-2 pr-2 pl-2"}">${escape(i + 1)}</td>
						<th class="${"py-2 pr-4 font-medium text-gray-900 whitespace-nowrap"}" scope="${"row"}"><a href="${"/profile/team/" + escape(team.id, true)}" class="${"flex items-center"}"><img${add_attribute("src", team.logo, 0)}${add_attribute("alt", team.name, 0)} class="${"object-cover h-4 mr-2"}">
								${escape(team.acronym)}
							</a></th>
						
						<td class="${"py-2 pr-3"}">${escape(team.matchesPlayed ?? 0)}</td>
						<td class="${"py-2 pr-3"}">${escape(team.won ?? 0)}</td>
						<td class="${"py-2 pr-3"}">${escape(team.loss ?? 0)}</td>
						<td class="${"py-2 pr-3"}">${escape(team.points ?? 0)}</td>
						<td class="${"py-2 pr-3"}">${escape(team.goalScored ?? 0)}</td>
						<td class="${"py-2 pr-3"}">${escape(team.goalConceived ?? 0)}</td>
						<td class="${"py-2 pr-2"}">${escape(team.goalDifference ?? 0)}</td>
					</tr>`;
      })}</tbody></table></div></div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/13.js
var __exports14 = {};
__export(__exports14, {
  component: () => component14,
  file: () => file14,
  imports: () => imports14,
  index: () => index14,
  stylesheets: () => stylesheets14
});
var index14, component14, file14, imports14, stylesheets14;
var init__14 = __esm({
  ".svelte-kit/output/server/nodes/13.js"() {
    index14 = 13;
    component14 = async () => (await Promise.resolve().then(() => (init_page_svelte10(), page_svelte_exports10))).default;
    file14 = "_app/immutable/components/pages/rank/team/_page.svelte-0305aba4.js";
    imports14 = ["_app/immutable/components/pages/rank/team/_page.svelte-0305aba4.js", "_app/immutable/chunks/index-2288207f.js", "_app/immutable/chunks/Header-9cf8977c.js", "_app/immutable/chunks/Share-9deee359.js", "_app/immutable/chunks/Seo-aba2adc6.js", "_app/immutable/chunks/stores-83358fdb.js", "_app/immutable/chunks/singletons-c0295a0c.js", "_app/immutable/chunks/state-2107352d.js", "_app/immutable/chunks/db-06457d1e.js"];
    stylesheets14 = [];
  }
});

// .svelte-kit/output/server/entries/pages/videos/_videoID_/_page.ts.js
var page_ts_exports2 = {};
__export(page_ts_exports2, {
  load: () => load3
});
var load3;
var init_page_ts2 = __esm({
  ".svelte-kit/output/server/entries/pages/videos/_videoID_/_page.ts.js"() {
    init_db();
    init_index_esm2();
    init_index2();
    init_index_esm20176();
    init_index_esm();
    init_index_esm3();
    init_index_esm4();
    init_index_esm5();
    init_index_esm20177();
    load3 = async ({ params }) => {
      try {
        const res = await dl(xa2(VideoColl, params.videoID));
        const video = res.data();
        if (!video)
          throw error(404, "Not found");
        return video;
      } catch (e) {
        throw error(404, "Not found");
      }
    };
  }
});

// .svelte-kit/output/server/entries/pages/videos/_videoID_/_page.svelte.js
var page_svelte_exports11 = {};
__export(page_svelte_exports11, {
  default: () => Page11
});
var Page11;
var init_page_svelte11 = __esm({
  ".svelte-kit/output/server/entries/pages/videos/_videoID_/_page.svelte.js"() {
    init_chunks();
    init_stores();
    init_Video();
    init_Header();
    init_Seo();
    init_Ads();
    init_state();
    init_index_esm2();
    init_index3();
    init_db();
    init_index_esm20176();
    init_index_esm();
    init_index_esm3();
    init_index_esm4();
    init_index_esm5();
    init_index_esm20177();
    init_Share();
    Page11 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let videoID;
      let $page, $$unsubscribe_page;
      $$unsubscribe_page = subscribe(page, (value) => $page = value);
      let { data } = $$props;
      if ($$props.data === void 0 && $$bindings.data && data !== void 0)
        $$bindings.data(data);
      videoID = $page.params.videoID;
      $$unsubscribe_page();
      return `${validate_component(Seo, "Seo").$$render(
        $$result,
        {
          discription: data.caption,
          poster: data.video,
          title: data.title
        },
        {},
        {}
      )}
${validate_component(Header, "Header").$$render(
        $$result,
        {
          title: "Latest Video",
          share: {
            path: `/videos/${videoID}`,
            title: data == null ? void 0 : data.title
          }
        },
        {},
        {}
      )}
<div class="${"pb-9 mt-1"}">${validate_component(Video, "Video").$$render($$result, { video: data }, {}, {})}</div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/14.js
var __exports15 = {};
__export(__exports15, {
  component: () => component15,
  file: () => file15,
  imports: () => imports15,
  index: () => index15,
  shared: () => page_ts_exports2,
  stylesheets: () => stylesheets15
});
var index15, component15, file15, imports15, stylesheets15;
var init__15 = __esm({
  ".svelte-kit/output/server/nodes/14.js"() {
    init_page_ts2();
    index15 = 14;
    component15 = async () => (await Promise.resolve().then(() => (init_page_svelte11(), page_svelte_exports11))).default;
    file15 = "_app/immutable/components/pages/videos/_videoID_/_page.svelte-3e8ad9c1.js";
    imports15 = ["_app/immutable/components/pages/videos/_videoID_/_page.svelte-3e8ad9c1.js", "_app/immutable/chunks/index-2288207f.js", "_app/immutable/chunks/stores-83358fdb.js", "_app/immutable/chunks/singletons-c0295a0c.js", "_app/immutable/chunks/Video-4c69a625.js", "_app/immutable/chunks/Ads-15616d52.js", "_app/immutable/chunks/state-2107352d.js", "_app/immutable/chunks/db-06457d1e.js", "_app/immutable/chunks/Header-9cf8977c.js", "_app/immutable/chunks/Share-9deee359.js", "_app/immutable/chunks/Seo-aba2adc6.js", "_app/immutable/modules/pages/videos/_videoID_/_page.ts-0a3994f4.js", "_app/immutable/chunks/db-06457d1e.js", "_app/immutable/chunks/index-d6fabef0.js", "_app/immutable/chunks/_page-1a7e146d.js"];
    stylesheets15 = [];
  }
});

// .svelte-kit/cloudflare-workers-tmp/node_modules/mime/Mime.js
var require_Mime = __commonJS({
  ".svelte-kit/cloudflare-workers-tmp/node_modules/mime/Mime.js"(exports, module) {
    "use strict";
    function Mime() {
      this._types = /* @__PURE__ */ Object.create(null);
      this._extensions = /* @__PURE__ */ Object.create(null);
      for (let i = 0; i < arguments.length; i++) {
        this.define(arguments[i]);
      }
      this.define = this.define.bind(this);
      this.getType = this.getType.bind(this);
      this.getExtension = this.getExtension.bind(this);
    }
    Mime.prototype.define = function(typeMap, force) {
      for (let type in typeMap) {
        let extensions = typeMap[type].map(function(t2) {
          return t2.toLowerCase();
        });
        type = type.toLowerCase();
        for (let i = 0; i < extensions.length; i++) {
          const ext = extensions[i];
          if (ext[0] === "*") {
            continue;
          }
          if (!force && ext in this._types) {
            throw new Error(
              'Attempt to change mapping for "' + ext + '" extension from "' + this._types[ext] + '" to "' + type + '". Pass `force=true` to allow this, otherwise remove "' + ext + '" from the list of extensions for "' + type + '".'
            );
          }
          this._types[ext] = type;
        }
        if (force || !this._extensions[type]) {
          const ext = extensions[0];
          this._extensions[type] = ext[0] !== "*" ? ext : ext.substr(1);
        }
      }
    };
    Mime.prototype.getType = function(path) {
      path = String(path);
      let last = path.replace(/^.*[/\\]/, "").toLowerCase();
      let ext = last.replace(/^.*\./, "").toLowerCase();
      let hasPath = last.length < path.length;
      let hasDot = ext.length < last.length - 1;
      return (hasDot || !hasPath) && this._types[ext] || null;
    };
    Mime.prototype.getExtension = function(type) {
      type = /^\s*([^;\s]*)/.test(type) && RegExp.$1;
      return type && this._extensions[type.toLowerCase()] || null;
    };
    module.exports = Mime;
  }
});

// .svelte-kit/cloudflare-workers-tmp/node_modules/mime/types/standard.js
var require_standard = __commonJS({
  ".svelte-kit/cloudflare-workers-tmp/node_modules/mime/types/standard.js"(exports, module) {
    module.exports = { "application/andrew-inset": ["ez"], "application/applixware": ["aw"], "application/atom+xml": ["atom"], "application/atomcat+xml": ["atomcat"], "application/atomdeleted+xml": ["atomdeleted"], "application/atomsvc+xml": ["atomsvc"], "application/atsc-dwd+xml": ["dwd"], "application/atsc-held+xml": ["held"], "application/atsc-rsat+xml": ["rsat"], "application/bdoc": ["bdoc"], "application/calendar+xml": ["xcs"], "application/ccxml+xml": ["ccxml"], "application/cdfx+xml": ["cdfx"], "application/cdmi-capability": ["cdmia"], "application/cdmi-container": ["cdmic"], "application/cdmi-domain": ["cdmid"], "application/cdmi-object": ["cdmio"], "application/cdmi-queue": ["cdmiq"], "application/cu-seeme": ["cu"], "application/dash+xml": ["mpd"], "application/davmount+xml": ["davmount"], "application/docbook+xml": ["dbk"], "application/dssc+der": ["dssc"], "application/dssc+xml": ["xdssc"], "application/ecmascript": ["es", "ecma"], "application/emma+xml": ["emma"], "application/emotionml+xml": ["emotionml"], "application/epub+zip": ["epub"], "application/exi": ["exi"], "application/express": ["exp"], "application/fdt+xml": ["fdt"], "application/font-tdpfr": ["pfr"], "application/geo+json": ["geojson"], "application/gml+xml": ["gml"], "application/gpx+xml": ["gpx"], "application/gxf": ["gxf"], "application/gzip": ["gz"], "application/hjson": ["hjson"], "application/hyperstudio": ["stk"], "application/inkml+xml": ["ink", "inkml"], "application/ipfix": ["ipfix"], "application/its+xml": ["its"], "application/java-archive": ["jar", "war", "ear"], "application/java-serialized-object": ["ser"], "application/java-vm": ["class"], "application/javascript": ["js", "mjs"], "application/json": ["json", "map"], "application/json5": ["json5"], "application/jsonml+json": ["jsonml"], "application/ld+json": ["jsonld"], "application/lgr+xml": ["lgr"], "application/lost+xml": ["lostxml"], "application/mac-binhex40": ["hqx"], "application/mac-compactpro": ["cpt"], "application/mads+xml": ["mads"], "application/manifest+json": ["webmanifest"], "application/marc": ["mrc"], "application/marcxml+xml": ["mrcx"], "application/mathematica": ["ma", "nb", "mb"], "application/mathml+xml": ["mathml"], "application/mbox": ["mbox"], "application/mediaservercontrol+xml": ["mscml"], "application/metalink+xml": ["metalink"], "application/metalink4+xml": ["meta4"], "application/mets+xml": ["mets"], "application/mmt-aei+xml": ["maei"], "application/mmt-usd+xml": ["musd"], "application/mods+xml": ["mods"], "application/mp21": ["m21", "mp21"], "application/mp4": ["mp4s", "m4p"], "application/msword": ["doc", "dot"], "application/mxf": ["mxf"], "application/n-quads": ["nq"], "application/n-triples": ["nt"], "application/node": ["cjs"], "application/octet-stream": ["bin", "dms", "lrf", "mar", "so", "dist", "distz", "pkg", "bpk", "dump", "elc", "deploy", "exe", "dll", "deb", "dmg", "iso", "img", "msi", "msp", "msm", "buffer"], "application/oda": ["oda"], "application/oebps-package+xml": ["opf"], "application/ogg": ["ogx"], "application/omdoc+xml": ["omdoc"], "application/onenote": ["onetoc", "onetoc2", "onetmp", "onepkg"], "application/oxps": ["oxps"], "application/p2p-overlay+xml": ["relo"], "application/patch-ops-error+xml": ["xer"], "application/pdf": ["pdf"], "application/pgp-encrypted": ["pgp"], "application/pgp-signature": ["asc", "sig"], "application/pics-rules": ["prf"], "application/pkcs10": ["p10"], "application/pkcs7-mime": ["p7m", "p7c"], "application/pkcs7-signature": ["p7s"], "application/pkcs8": ["p8"], "application/pkix-attr-cert": ["ac"], "application/pkix-cert": ["cer"], "application/pkix-crl": ["crl"], "application/pkix-pkipath": ["pkipath"], "application/pkixcmp": ["pki"], "application/pls+xml": ["pls"], "application/postscript": ["ai", "eps", "ps"], "application/provenance+xml": ["provx"], "application/pskc+xml": ["pskcxml"], "application/raml+yaml": ["raml"], "application/rdf+xml": ["rdf", "owl"], "application/reginfo+xml": ["rif"], "application/relax-ng-compact-syntax": ["rnc"], "application/resource-lists+xml": ["rl"], "application/resource-lists-diff+xml": ["rld"], "application/rls-services+xml": ["rs"], "application/route-apd+xml": ["rapd"], "application/route-s-tsid+xml": ["sls"], "application/route-usd+xml": ["rusd"], "application/rpki-ghostbusters": ["gbr"], "application/rpki-manifest": ["mft"], "application/rpki-roa": ["roa"], "application/rsd+xml": ["rsd"], "application/rss+xml": ["rss"], "application/rtf": ["rtf"], "application/sbml+xml": ["sbml"], "application/scvp-cv-request": ["scq"], "application/scvp-cv-response": ["scs"], "application/scvp-vp-request": ["spq"], "application/scvp-vp-response": ["spp"], "application/sdp": ["sdp"], "application/senml+xml": ["senmlx"], "application/sensml+xml": ["sensmlx"], "application/set-payment-initiation": ["setpay"], "application/set-registration-initiation": ["setreg"], "application/shf+xml": ["shf"], "application/sieve": ["siv", "sieve"], "application/smil+xml": ["smi", "smil"], "application/sparql-query": ["rq"], "application/sparql-results+xml": ["srx"], "application/srgs": ["gram"], "application/srgs+xml": ["grxml"], "application/sru+xml": ["sru"], "application/ssdl+xml": ["ssdl"], "application/ssml+xml": ["ssml"], "application/swid+xml": ["swidtag"], "application/tei+xml": ["tei", "teicorpus"], "application/thraud+xml": ["tfi"], "application/timestamped-data": ["tsd"], "application/toml": ["toml"], "application/trig": ["trig"], "application/ttml+xml": ["ttml"], "application/ubjson": ["ubj"], "application/urc-ressheet+xml": ["rsheet"], "application/urc-targetdesc+xml": ["td"], "application/voicexml+xml": ["vxml"], "application/wasm": ["wasm"], "application/widget": ["wgt"], "application/winhlp": ["hlp"], "application/wsdl+xml": ["wsdl"], "application/wspolicy+xml": ["wspolicy"], "application/xaml+xml": ["xaml"], "application/xcap-att+xml": ["xav"], "application/xcap-caps+xml": ["xca"], "application/xcap-diff+xml": ["xdf"], "application/xcap-el+xml": ["xel"], "application/xcap-ns+xml": ["xns"], "application/xenc+xml": ["xenc"], "application/xhtml+xml": ["xhtml", "xht"], "application/xliff+xml": ["xlf"], "application/xml": ["xml", "xsl", "xsd", "rng"], "application/xml-dtd": ["dtd"], "application/xop+xml": ["xop"], "application/xproc+xml": ["xpl"], "application/xslt+xml": ["*xsl", "xslt"], "application/xspf+xml": ["xspf"], "application/xv+xml": ["mxml", "xhvml", "xvml", "xvm"], "application/yang": ["yang"], "application/yin+xml": ["yin"], "application/zip": ["zip"], "audio/3gpp": ["*3gpp"], "audio/adpcm": ["adp"], "audio/amr": ["amr"], "audio/basic": ["au", "snd"], "audio/midi": ["mid", "midi", "kar", "rmi"], "audio/mobile-xmf": ["mxmf"], "audio/mp3": ["*mp3"], "audio/mp4": ["m4a", "mp4a"], "audio/mpeg": ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"], "audio/ogg": ["oga", "ogg", "spx", "opus"], "audio/s3m": ["s3m"], "audio/silk": ["sil"], "audio/wav": ["wav"], "audio/wave": ["*wav"], "audio/webm": ["weba"], "audio/xm": ["xm"], "font/collection": ["ttc"], "font/otf": ["otf"], "font/ttf": ["ttf"], "font/woff": ["woff"], "font/woff2": ["woff2"], "image/aces": ["exr"], "image/apng": ["apng"], "image/avif": ["avif"], "image/bmp": ["bmp"], "image/cgm": ["cgm"], "image/dicom-rle": ["drle"], "image/emf": ["emf"], "image/fits": ["fits"], "image/g3fax": ["g3"], "image/gif": ["gif"], "image/heic": ["heic"], "image/heic-sequence": ["heics"], "image/heif": ["heif"], "image/heif-sequence": ["heifs"], "image/hej2k": ["hej2"], "image/hsj2": ["hsj2"], "image/ief": ["ief"], "image/jls": ["jls"], "image/jp2": ["jp2", "jpg2"], "image/jpeg": ["jpeg", "jpg", "jpe"], "image/jph": ["jph"], "image/jphc": ["jhc"], "image/jpm": ["jpm"], "image/jpx": ["jpx", "jpf"], "image/jxr": ["jxr"], "image/jxra": ["jxra"], "image/jxrs": ["jxrs"], "image/jxs": ["jxs"], "image/jxsc": ["jxsc"], "image/jxsi": ["jxsi"], "image/jxss": ["jxss"], "image/ktx": ["ktx"], "image/ktx2": ["ktx2"], "image/png": ["png"], "image/sgi": ["sgi"], "image/svg+xml": ["svg", "svgz"], "image/t38": ["t38"], "image/tiff": ["tif", "tiff"], "image/tiff-fx": ["tfx"], "image/webp": ["webp"], "image/wmf": ["wmf"], "message/disposition-notification": ["disposition-notification"], "message/global": ["u8msg"], "message/global-delivery-status": ["u8dsn"], "message/global-disposition-notification": ["u8mdn"], "message/global-headers": ["u8hdr"], "message/rfc822": ["eml", "mime"], "model/3mf": ["3mf"], "model/gltf+json": ["gltf"], "model/gltf-binary": ["glb"], "model/iges": ["igs", "iges"], "model/mesh": ["msh", "mesh", "silo"], "model/mtl": ["mtl"], "model/obj": ["obj"], "model/step+xml": ["stpx"], "model/step+zip": ["stpz"], "model/step-xml+zip": ["stpxz"], "model/stl": ["stl"], "model/vrml": ["wrl", "vrml"], "model/x3d+binary": ["*x3db", "x3dbz"], "model/x3d+fastinfoset": ["x3db"], "model/x3d+vrml": ["*x3dv", "x3dvz"], "model/x3d+xml": ["x3d", "x3dz"], "model/x3d-vrml": ["x3dv"], "text/cache-manifest": ["appcache", "manifest"], "text/calendar": ["ics", "ifb"], "text/coffeescript": ["coffee", "litcoffee"], "text/css": ["css"], "text/csv": ["csv"], "text/html": ["html", "htm", "shtml"], "text/jade": ["jade"], "text/jsx": ["jsx"], "text/less": ["less"], "text/markdown": ["markdown", "md"], "text/mathml": ["mml"], "text/mdx": ["mdx"], "text/n3": ["n3"], "text/plain": ["txt", "text", "conf", "def", "list", "log", "in", "ini"], "text/richtext": ["rtx"], "text/rtf": ["*rtf"], "text/sgml": ["sgml", "sgm"], "text/shex": ["shex"], "text/slim": ["slim", "slm"], "text/spdx": ["spdx"], "text/stylus": ["stylus", "styl"], "text/tab-separated-values": ["tsv"], "text/troff": ["t", "tr", "roff", "man", "me", "ms"], "text/turtle": ["ttl"], "text/uri-list": ["uri", "uris", "urls"], "text/vcard": ["vcard"], "text/vtt": ["vtt"], "text/xml": ["*xml"], "text/yaml": ["yaml", "yml"], "video/3gpp": ["3gp", "3gpp"], "video/3gpp2": ["3g2"], "video/h261": ["h261"], "video/h263": ["h263"], "video/h264": ["h264"], "video/iso.segment": ["m4s"], "video/jpeg": ["jpgv"], "video/jpm": ["*jpm", "jpgm"], "video/mj2": ["mj2", "mjp2"], "video/mp2t": ["ts"], "video/mp4": ["mp4", "mp4v", "mpg4"], "video/mpeg": ["mpeg", "mpg", "mpe", "m1v", "m2v"], "video/ogg": ["ogv"], "video/quicktime": ["qt", "mov"], "video/webm": ["webm"] };
  }
});

// .svelte-kit/cloudflare-workers-tmp/node_modules/mime/types/other.js
var require_other = __commonJS({
  ".svelte-kit/cloudflare-workers-tmp/node_modules/mime/types/other.js"(exports, module) {
    module.exports = { "application/prs.cww": ["cww"], "application/vnd.1000minds.decision-model+xml": ["1km"], "application/vnd.3gpp.pic-bw-large": ["plb"], "application/vnd.3gpp.pic-bw-small": ["psb"], "application/vnd.3gpp.pic-bw-var": ["pvb"], "application/vnd.3gpp2.tcap": ["tcap"], "application/vnd.3m.post-it-notes": ["pwn"], "application/vnd.accpac.simply.aso": ["aso"], "application/vnd.accpac.simply.imp": ["imp"], "application/vnd.acucobol": ["acu"], "application/vnd.acucorp": ["atc", "acutc"], "application/vnd.adobe.air-application-installer-package+zip": ["air"], "application/vnd.adobe.formscentral.fcdt": ["fcdt"], "application/vnd.adobe.fxp": ["fxp", "fxpl"], "application/vnd.adobe.xdp+xml": ["xdp"], "application/vnd.adobe.xfdf": ["xfdf"], "application/vnd.ahead.space": ["ahead"], "application/vnd.airzip.filesecure.azf": ["azf"], "application/vnd.airzip.filesecure.azs": ["azs"], "application/vnd.amazon.ebook": ["azw"], "application/vnd.americandynamics.acc": ["acc"], "application/vnd.amiga.ami": ["ami"], "application/vnd.android.package-archive": ["apk"], "application/vnd.anser-web-certificate-issue-initiation": ["cii"], "application/vnd.anser-web-funds-transfer-initiation": ["fti"], "application/vnd.antix.game-component": ["atx"], "application/vnd.apple.installer+xml": ["mpkg"], "application/vnd.apple.keynote": ["key"], "application/vnd.apple.mpegurl": ["m3u8"], "application/vnd.apple.numbers": ["numbers"], "application/vnd.apple.pages": ["pages"], "application/vnd.apple.pkpass": ["pkpass"], "application/vnd.aristanetworks.swi": ["swi"], "application/vnd.astraea-software.iota": ["iota"], "application/vnd.audiograph": ["aep"], "application/vnd.balsamiq.bmml+xml": ["bmml"], "application/vnd.blueice.multipass": ["mpm"], "application/vnd.bmi": ["bmi"], "application/vnd.businessobjects": ["rep"], "application/vnd.chemdraw+xml": ["cdxml"], "application/vnd.chipnuts.karaoke-mmd": ["mmd"], "application/vnd.cinderella": ["cdy"], "application/vnd.citationstyles.style+xml": ["csl"], "application/vnd.claymore": ["cla"], "application/vnd.cloanto.rp9": ["rp9"], "application/vnd.clonk.c4group": ["c4g", "c4d", "c4f", "c4p", "c4u"], "application/vnd.cluetrust.cartomobile-config": ["c11amc"], "application/vnd.cluetrust.cartomobile-config-pkg": ["c11amz"], "application/vnd.commonspace": ["csp"], "application/vnd.contact.cmsg": ["cdbcmsg"], "application/vnd.cosmocaller": ["cmc"], "application/vnd.crick.clicker": ["clkx"], "application/vnd.crick.clicker.keyboard": ["clkk"], "application/vnd.crick.clicker.palette": ["clkp"], "application/vnd.crick.clicker.template": ["clkt"], "application/vnd.crick.clicker.wordbank": ["clkw"], "application/vnd.criticaltools.wbs+xml": ["wbs"], "application/vnd.ctc-posml": ["pml"], "application/vnd.cups-ppd": ["ppd"], "application/vnd.curl.car": ["car"], "application/vnd.curl.pcurl": ["pcurl"], "application/vnd.dart": ["dart"], "application/vnd.data-vision.rdz": ["rdz"], "application/vnd.dbf": ["dbf"], "application/vnd.dece.data": ["uvf", "uvvf", "uvd", "uvvd"], "application/vnd.dece.ttml+xml": ["uvt", "uvvt"], "application/vnd.dece.unspecified": ["uvx", "uvvx"], "application/vnd.dece.zip": ["uvz", "uvvz"], "application/vnd.denovo.fcselayout-link": ["fe_launch"], "application/vnd.dna": ["dna"], "application/vnd.dolby.mlp": ["mlp"], "application/vnd.dpgraph": ["dpg"], "application/vnd.dreamfactory": ["dfac"], "application/vnd.ds-keypoint": ["kpxx"], "application/vnd.dvb.ait": ["ait"], "application/vnd.dvb.service": ["svc"], "application/vnd.dynageo": ["geo"], "application/vnd.ecowin.chart": ["mag"], "application/vnd.enliven": ["nml"], "application/vnd.epson.esf": ["esf"], "application/vnd.epson.msf": ["msf"], "application/vnd.epson.quickanime": ["qam"], "application/vnd.epson.salt": ["slt"], "application/vnd.epson.ssf": ["ssf"], "application/vnd.eszigno3+xml": ["es3", "et3"], "application/vnd.ezpix-album": ["ez2"], "application/vnd.ezpix-package": ["ez3"], "application/vnd.fdf": ["fdf"], "application/vnd.fdsn.mseed": ["mseed"], "application/vnd.fdsn.seed": ["seed", "dataless"], "application/vnd.flographit": ["gph"], "application/vnd.fluxtime.clip": ["ftc"], "application/vnd.framemaker": ["fm", "frame", "maker", "book"], "application/vnd.frogans.fnc": ["fnc"], "application/vnd.frogans.ltf": ["ltf"], "application/vnd.fsc.weblaunch": ["fsc"], "application/vnd.fujitsu.oasys": ["oas"], "application/vnd.fujitsu.oasys2": ["oa2"], "application/vnd.fujitsu.oasys3": ["oa3"], "application/vnd.fujitsu.oasysgp": ["fg5"], "application/vnd.fujitsu.oasysprs": ["bh2"], "application/vnd.fujixerox.ddd": ["ddd"], "application/vnd.fujixerox.docuworks": ["xdw"], "application/vnd.fujixerox.docuworks.binder": ["xbd"], "application/vnd.fuzzysheet": ["fzs"], "application/vnd.genomatix.tuxedo": ["txd"], "application/vnd.geogebra.file": ["ggb"], "application/vnd.geogebra.tool": ["ggt"], "application/vnd.geometry-explorer": ["gex", "gre"], "application/vnd.geonext": ["gxt"], "application/vnd.geoplan": ["g2w"], "application/vnd.geospace": ["g3w"], "application/vnd.gmx": ["gmx"], "application/vnd.google-apps.document": ["gdoc"], "application/vnd.google-apps.presentation": ["gslides"], "application/vnd.google-apps.spreadsheet": ["gsheet"], "application/vnd.google-earth.kml+xml": ["kml"], "application/vnd.google-earth.kmz": ["kmz"], "application/vnd.grafeq": ["gqf", "gqs"], "application/vnd.groove-account": ["gac"], "application/vnd.groove-help": ["ghf"], "application/vnd.groove-identity-message": ["gim"], "application/vnd.groove-injector": ["grv"], "application/vnd.groove-tool-message": ["gtm"], "application/vnd.groove-tool-template": ["tpl"], "application/vnd.groove-vcard": ["vcg"], "application/vnd.hal+xml": ["hal"], "application/vnd.handheld-entertainment+xml": ["zmm"], "application/vnd.hbci": ["hbci"], "application/vnd.hhe.lesson-player": ["les"], "application/vnd.hp-hpgl": ["hpgl"], "application/vnd.hp-hpid": ["hpid"], "application/vnd.hp-hps": ["hps"], "application/vnd.hp-jlyt": ["jlt"], "application/vnd.hp-pcl": ["pcl"], "application/vnd.hp-pclxl": ["pclxl"], "application/vnd.hydrostatix.sof-data": ["sfd-hdstx"], "application/vnd.ibm.minipay": ["mpy"], "application/vnd.ibm.modcap": ["afp", "listafp", "list3820"], "application/vnd.ibm.rights-management": ["irm"], "application/vnd.ibm.secure-container": ["sc"], "application/vnd.iccprofile": ["icc", "icm"], "application/vnd.igloader": ["igl"], "application/vnd.immervision-ivp": ["ivp"], "application/vnd.immervision-ivu": ["ivu"], "application/vnd.insors.igm": ["igm"], "application/vnd.intercon.formnet": ["xpw", "xpx"], "application/vnd.intergeo": ["i2g"], "application/vnd.intu.qbo": ["qbo"], "application/vnd.intu.qfx": ["qfx"], "application/vnd.ipunplugged.rcprofile": ["rcprofile"], "application/vnd.irepository.package+xml": ["irp"], "application/vnd.is-xpr": ["xpr"], "application/vnd.isac.fcs": ["fcs"], "application/vnd.jam": ["jam"], "application/vnd.jcp.javame.midlet-rms": ["rms"], "application/vnd.jisp": ["jisp"], "application/vnd.joost.joda-archive": ["joda"], "application/vnd.kahootz": ["ktz", "ktr"], "application/vnd.kde.karbon": ["karbon"], "application/vnd.kde.kchart": ["chrt"], "application/vnd.kde.kformula": ["kfo"], "application/vnd.kde.kivio": ["flw"], "application/vnd.kde.kontour": ["kon"], "application/vnd.kde.kpresenter": ["kpr", "kpt"], "application/vnd.kde.kspread": ["ksp"], "application/vnd.kde.kword": ["kwd", "kwt"], "application/vnd.kenameaapp": ["htke"], "application/vnd.kidspiration": ["kia"], "application/vnd.kinar": ["kne", "knp"], "application/vnd.koan": ["skp", "skd", "skt", "skm"], "application/vnd.kodak-descriptor": ["sse"], "application/vnd.las.las+xml": ["lasxml"], "application/vnd.llamagraphics.life-balance.desktop": ["lbd"], "application/vnd.llamagraphics.life-balance.exchange+xml": ["lbe"], "application/vnd.lotus-1-2-3": ["123"], "application/vnd.lotus-approach": ["apr"], "application/vnd.lotus-freelance": ["pre"], "application/vnd.lotus-notes": ["nsf"], "application/vnd.lotus-organizer": ["org"], "application/vnd.lotus-screencam": ["scm"], "application/vnd.lotus-wordpro": ["lwp"], "application/vnd.macports.portpkg": ["portpkg"], "application/vnd.mapbox-vector-tile": ["mvt"], "application/vnd.mcd": ["mcd"], "application/vnd.medcalcdata": ["mc1"], "application/vnd.mediastation.cdkey": ["cdkey"], "application/vnd.mfer": ["mwf"], "application/vnd.mfmp": ["mfm"], "application/vnd.micrografx.flo": ["flo"], "application/vnd.micrografx.igx": ["igx"], "application/vnd.mif": ["mif"], "application/vnd.mobius.daf": ["daf"], "application/vnd.mobius.dis": ["dis"], "application/vnd.mobius.mbk": ["mbk"], "application/vnd.mobius.mqy": ["mqy"], "application/vnd.mobius.msl": ["msl"], "application/vnd.mobius.plc": ["plc"], "application/vnd.mobius.txf": ["txf"], "application/vnd.mophun.application": ["mpn"], "application/vnd.mophun.certificate": ["mpc"], "application/vnd.mozilla.xul+xml": ["xul"], "application/vnd.ms-artgalry": ["cil"], "application/vnd.ms-cab-compressed": ["cab"], "application/vnd.ms-excel": ["xls", "xlm", "xla", "xlc", "xlt", "xlw"], "application/vnd.ms-excel.addin.macroenabled.12": ["xlam"], "application/vnd.ms-excel.sheet.binary.macroenabled.12": ["xlsb"], "application/vnd.ms-excel.sheet.macroenabled.12": ["xlsm"], "application/vnd.ms-excel.template.macroenabled.12": ["xltm"], "application/vnd.ms-fontobject": ["eot"], "application/vnd.ms-htmlhelp": ["chm"], "application/vnd.ms-ims": ["ims"], "application/vnd.ms-lrm": ["lrm"], "application/vnd.ms-officetheme": ["thmx"], "application/vnd.ms-outlook": ["msg"], "application/vnd.ms-pki.seccat": ["cat"], "application/vnd.ms-pki.stl": ["*stl"], "application/vnd.ms-powerpoint": ["ppt", "pps", "pot"], "application/vnd.ms-powerpoint.addin.macroenabled.12": ["ppam"], "application/vnd.ms-powerpoint.presentation.macroenabled.12": ["pptm"], "application/vnd.ms-powerpoint.slide.macroenabled.12": ["sldm"], "application/vnd.ms-powerpoint.slideshow.macroenabled.12": ["ppsm"], "application/vnd.ms-powerpoint.template.macroenabled.12": ["potm"], "application/vnd.ms-project": ["mpp", "mpt"], "application/vnd.ms-word.document.macroenabled.12": ["docm"], "application/vnd.ms-word.template.macroenabled.12": ["dotm"], "application/vnd.ms-works": ["wps", "wks", "wcm", "wdb"], "application/vnd.ms-wpl": ["wpl"], "application/vnd.ms-xpsdocument": ["xps"], "application/vnd.mseq": ["mseq"], "application/vnd.musician": ["mus"], "application/vnd.muvee.style": ["msty"], "application/vnd.mynfc": ["taglet"], "application/vnd.neurolanguage.nlu": ["nlu"], "application/vnd.nitf": ["ntf", "nitf"], "application/vnd.noblenet-directory": ["nnd"], "application/vnd.noblenet-sealer": ["nns"], "application/vnd.noblenet-web": ["nnw"], "application/vnd.nokia.n-gage.ac+xml": ["*ac"], "application/vnd.nokia.n-gage.data": ["ngdat"], "application/vnd.nokia.n-gage.symbian.install": ["n-gage"], "application/vnd.nokia.radio-preset": ["rpst"], "application/vnd.nokia.radio-presets": ["rpss"], "application/vnd.novadigm.edm": ["edm"], "application/vnd.novadigm.edx": ["edx"], "application/vnd.novadigm.ext": ["ext"], "application/vnd.oasis.opendocument.chart": ["odc"], "application/vnd.oasis.opendocument.chart-template": ["otc"], "application/vnd.oasis.opendocument.database": ["odb"], "application/vnd.oasis.opendocument.formula": ["odf"], "application/vnd.oasis.opendocument.formula-template": ["odft"], "application/vnd.oasis.opendocument.graphics": ["odg"], "application/vnd.oasis.opendocument.graphics-template": ["otg"], "application/vnd.oasis.opendocument.image": ["odi"], "application/vnd.oasis.opendocument.image-template": ["oti"], "application/vnd.oasis.opendocument.presentation": ["odp"], "application/vnd.oasis.opendocument.presentation-template": ["otp"], "application/vnd.oasis.opendocument.spreadsheet": ["ods"], "application/vnd.oasis.opendocument.spreadsheet-template": ["ots"], "application/vnd.oasis.opendocument.text": ["odt"], "application/vnd.oasis.opendocument.text-master": ["odm"], "application/vnd.oasis.opendocument.text-template": ["ott"], "application/vnd.oasis.opendocument.text-web": ["oth"], "application/vnd.olpc-sugar": ["xo"], "application/vnd.oma.dd2+xml": ["dd2"], "application/vnd.openblox.game+xml": ["obgx"], "application/vnd.openofficeorg.extension": ["oxt"], "application/vnd.openstreetmap.data+xml": ["osm"], "application/vnd.openxmlformats-officedocument.presentationml.presentation": ["pptx"], "application/vnd.openxmlformats-officedocument.presentationml.slide": ["sldx"], "application/vnd.openxmlformats-officedocument.presentationml.slideshow": ["ppsx"], "application/vnd.openxmlformats-officedocument.presentationml.template": ["potx"], "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": ["xlsx"], "application/vnd.openxmlformats-officedocument.spreadsheetml.template": ["xltx"], "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ["docx"], "application/vnd.openxmlformats-officedocument.wordprocessingml.template": ["dotx"], "application/vnd.osgeo.mapguide.package": ["mgp"], "application/vnd.osgi.dp": ["dp"], "application/vnd.osgi.subsystem": ["esa"], "application/vnd.palm": ["pdb", "pqa", "oprc"], "application/vnd.pawaafile": ["paw"], "application/vnd.pg.format": ["str"], "application/vnd.pg.osasli": ["ei6"], "application/vnd.picsel": ["efif"], "application/vnd.pmi.widget": ["wg"], "application/vnd.pocketlearn": ["plf"], "application/vnd.powerbuilder6": ["pbd"], "application/vnd.previewsystems.box": ["box"], "application/vnd.proteus.magazine": ["mgz"], "application/vnd.publishare-delta-tree": ["qps"], "application/vnd.pvi.ptid1": ["ptid"], "application/vnd.quark.quarkxpress": ["qxd", "qxt", "qwd", "qwt", "qxl", "qxb"], "application/vnd.rar": ["rar"], "application/vnd.realvnc.bed": ["bed"], "application/vnd.recordare.musicxml": ["mxl"], "application/vnd.recordare.musicxml+xml": ["musicxml"], "application/vnd.rig.cryptonote": ["cryptonote"], "application/vnd.rim.cod": ["cod"], "application/vnd.rn-realmedia": ["rm"], "application/vnd.rn-realmedia-vbr": ["rmvb"], "application/vnd.route66.link66+xml": ["link66"], "application/vnd.sailingtracker.track": ["st"], "application/vnd.seemail": ["see"], "application/vnd.sema": ["sema"], "application/vnd.semd": ["semd"], "application/vnd.semf": ["semf"], "application/vnd.shana.informed.formdata": ["ifm"], "application/vnd.shana.informed.formtemplate": ["itp"], "application/vnd.shana.informed.interchange": ["iif"], "application/vnd.shana.informed.package": ["ipk"], "application/vnd.simtech-mindmapper": ["twd", "twds"], "application/vnd.smaf": ["mmf"], "application/vnd.smart.teacher": ["teacher"], "application/vnd.software602.filler.form+xml": ["fo"], "application/vnd.solent.sdkm+xml": ["sdkm", "sdkd"], "application/vnd.spotfire.dxp": ["dxp"], "application/vnd.spotfire.sfs": ["sfs"], "application/vnd.stardivision.calc": ["sdc"], "application/vnd.stardivision.draw": ["sda"], "application/vnd.stardivision.impress": ["sdd"], "application/vnd.stardivision.math": ["smf"], "application/vnd.stardivision.writer": ["sdw", "vor"], "application/vnd.stardivision.writer-global": ["sgl"], "application/vnd.stepmania.package": ["smzip"], "application/vnd.stepmania.stepchart": ["sm"], "application/vnd.sun.wadl+xml": ["wadl"], "application/vnd.sun.xml.calc": ["sxc"], "application/vnd.sun.xml.calc.template": ["stc"], "application/vnd.sun.xml.draw": ["sxd"], "application/vnd.sun.xml.draw.template": ["std"], "application/vnd.sun.xml.impress": ["sxi"], "application/vnd.sun.xml.impress.template": ["sti"], "application/vnd.sun.xml.math": ["sxm"], "application/vnd.sun.xml.writer": ["sxw"], "application/vnd.sun.xml.writer.global": ["sxg"], "application/vnd.sun.xml.writer.template": ["stw"], "application/vnd.sus-calendar": ["sus", "susp"], "application/vnd.svd": ["svd"], "application/vnd.symbian.install": ["sis", "sisx"], "application/vnd.syncml+xml": ["xsm"], "application/vnd.syncml.dm+wbxml": ["bdm"], "application/vnd.syncml.dm+xml": ["xdm"], "application/vnd.syncml.dmddf+xml": ["ddf"], "application/vnd.tao.intent-module-archive": ["tao"], "application/vnd.tcpdump.pcap": ["pcap", "cap", "dmp"], "application/vnd.tmobile-livetv": ["tmo"], "application/vnd.trid.tpt": ["tpt"], "application/vnd.triscape.mxs": ["mxs"], "application/vnd.trueapp": ["tra"], "application/vnd.ufdl": ["ufd", "ufdl"], "application/vnd.uiq.theme": ["utz"], "application/vnd.umajin": ["umj"], "application/vnd.unity": ["unityweb"], "application/vnd.uoml+xml": ["uoml"], "application/vnd.vcx": ["vcx"], "application/vnd.visio": ["vsd", "vst", "vss", "vsw"], "application/vnd.visionary": ["vis"], "application/vnd.vsf": ["vsf"], "application/vnd.wap.wbxml": ["wbxml"], "application/vnd.wap.wmlc": ["wmlc"], "application/vnd.wap.wmlscriptc": ["wmlsc"], "application/vnd.webturbo": ["wtb"], "application/vnd.wolfram.player": ["nbp"], "application/vnd.wordperfect": ["wpd"], "application/vnd.wqd": ["wqd"], "application/vnd.wt.stf": ["stf"], "application/vnd.xara": ["xar"], "application/vnd.xfdl": ["xfdl"], "application/vnd.yamaha.hv-dic": ["hvd"], "application/vnd.yamaha.hv-script": ["hvs"], "application/vnd.yamaha.hv-voice": ["hvp"], "application/vnd.yamaha.openscoreformat": ["osf"], "application/vnd.yamaha.openscoreformat.osfpvg+xml": ["osfpvg"], "application/vnd.yamaha.smaf-audio": ["saf"], "application/vnd.yamaha.smaf-phrase": ["spf"], "application/vnd.yellowriver-custom-menu": ["cmp"], "application/vnd.zul": ["zir", "zirz"], "application/vnd.zzazz.deck+xml": ["zaz"], "application/x-7z-compressed": ["7z"], "application/x-abiword": ["abw"], "application/x-ace-compressed": ["ace"], "application/x-apple-diskimage": ["*dmg"], "application/x-arj": ["arj"], "application/x-authorware-bin": ["aab", "x32", "u32", "vox"], "application/x-authorware-map": ["aam"], "application/x-authorware-seg": ["aas"], "application/x-bcpio": ["bcpio"], "application/x-bdoc": ["*bdoc"], "application/x-bittorrent": ["torrent"], "application/x-blorb": ["blb", "blorb"], "application/x-bzip": ["bz"], "application/x-bzip2": ["bz2", "boz"], "application/x-cbr": ["cbr", "cba", "cbt", "cbz", "cb7"], "application/x-cdlink": ["vcd"], "application/x-cfs-compressed": ["cfs"], "application/x-chat": ["chat"], "application/x-chess-pgn": ["pgn"], "application/x-chrome-extension": ["crx"], "application/x-cocoa": ["cco"], "application/x-conference": ["nsc"], "application/x-cpio": ["cpio"], "application/x-csh": ["csh"], "application/x-debian-package": ["*deb", "udeb"], "application/x-dgc-compressed": ["dgc"], "application/x-director": ["dir", "dcr", "dxr", "cst", "cct", "cxt", "w3d", "fgd", "swa"], "application/x-doom": ["wad"], "application/x-dtbncx+xml": ["ncx"], "application/x-dtbook+xml": ["dtb"], "application/x-dtbresource+xml": ["res"], "application/x-dvi": ["dvi"], "application/x-envoy": ["evy"], "application/x-eva": ["eva"], "application/x-font-bdf": ["bdf"], "application/x-font-ghostscript": ["gsf"], "application/x-font-linux-psf": ["psf"], "application/x-font-pcf": ["pcf"], "application/x-font-snf": ["snf"], "application/x-font-type1": ["pfa", "pfb", "pfm", "afm"], "application/x-freearc": ["arc"], "application/x-futuresplash": ["spl"], "application/x-gca-compressed": ["gca"], "application/x-glulx": ["ulx"], "application/x-gnumeric": ["gnumeric"], "application/x-gramps-xml": ["gramps"], "application/x-gtar": ["gtar"], "application/x-hdf": ["hdf"], "application/x-httpd-php": ["php"], "application/x-install-instructions": ["install"], "application/x-iso9660-image": ["*iso"], "application/x-iwork-keynote-sffkey": ["*key"], "application/x-iwork-numbers-sffnumbers": ["*numbers"], "application/x-iwork-pages-sffpages": ["*pages"], "application/x-java-archive-diff": ["jardiff"], "application/x-java-jnlp-file": ["jnlp"], "application/x-keepass2": ["kdbx"], "application/x-latex": ["latex"], "application/x-lua-bytecode": ["luac"], "application/x-lzh-compressed": ["lzh", "lha"], "application/x-makeself": ["run"], "application/x-mie": ["mie"], "application/x-mobipocket-ebook": ["prc", "mobi"], "application/x-ms-application": ["application"], "application/x-ms-shortcut": ["lnk"], "application/x-ms-wmd": ["wmd"], "application/x-ms-wmz": ["wmz"], "application/x-ms-xbap": ["xbap"], "application/x-msaccess": ["mdb"], "application/x-msbinder": ["obd"], "application/x-mscardfile": ["crd"], "application/x-msclip": ["clp"], "application/x-msdos-program": ["*exe"], "application/x-msdownload": ["*exe", "*dll", "com", "bat", "*msi"], "application/x-msmediaview": ["mvb", "m13", "m14"], "application/x-msmetafile": ["*wmf", "*wmz", "*emf", "emz"], "application/x-msmoney": ["mny"], "application/x-mspublisher": ["pub"], "application/x-msschedule": ["scd"], "application/x-msterminal": ["trm"], "application/x-mswrite": ["wri"], "application/x-netcdf": ["nc", "cdf"], "application/x-ns-proxy-autoconfig": ["pac"], "application/x-nzb": ["nzb"], "application/x-perl": ["pl", "pm"], "application/x-pilot": ["*prc", "*pdb"], "application/x-pkcs12": ["p12", "pfx"], "application/x-pkcs7-certificates": ["p7b", "spc"], "application/x-pkcs7-certreqresp": ["p7r"], "application/x-rar-compressed": ["*rar"], "application/x-redhat-package-manager": ["rpm"], "application/x-research-info-systems": ["ris"], "application/x-sea": ["sea"], "application/x-sh": ["sh"], "application/x-shar": ["shar"], "application/x-shockwave-flash": ["swf"], "application/x-silverlight-app": ["xap"], "application/x-sql": ["sql"], "application/x-stuffit": ["sit"], "application/x-stuffitx": ["sitx"], "application/x-subrip": ["srt"], "application/x-sv4cpio": ["sv4cpio"], "application/x-sv4crc": ["sv4crc"], "application/x-t3vm-image": ["t3"], "application/x-tads": ["gam"], "application/x-tar": ["tar"], "application/x-tcl": ["tcl", "tk"], "application/x-tex": ["tex"], "application/x-tex-tfm": ["tfm"], "application/x-texinfo": ["texinfo", "texi"], "application/x-tgif": ["*obj"], "application/x-ustar": ["ustar"], "application/x-virtualbox-hdd": ["hdd"], "application/x-virtualbox-ova": ["ova"], "application/x-virtualbox-ovf": ["ovf"], "application/x-virtualbox-vbox": ["vbox"], "application/x-virtualbox-vbox-extpack": ["vbox-extpack"], "application/x-virtualbox-vdi": ["vdi"], "application/x-virtualbox-vhd": ["vhd"], "application/x-virtualbox-vmdk": ["vmdk"], "application/x-wais-source": ["src"], "application/x-web-app-manifest+json": ["webapp"], "application/x-x509-ca-cert": ["der", "crt", "pem"], "application/x-xfig": ["fig"], "application/x-xliff+xml": ["*xlf"], "application/x-xpinstall": ["xpi"], "application/x-xz": ["xz"], "application/x-zmachine": ["z1", "z2", "z3", "z4", "z5", "z6", "z7", "z8"], "audio/vnd.dece.audio": ["uva", "uvva"], "audio/vnd.digital-winds": ["eol"], "audio/vnd.dra": ["dra"], "audio/vnd.dts": ["dts"], "audio/vnd.dts.hd": ["dtshd"], "audio/vnd.lucent.voice": ["lvp"], "audio/vnd.ms-playready.media.pya": ["pya"], "audio/vnd.nuera.ecelp4800": ["ecelp4800"], "audio/vnd.nuera.ecelp7470": ["ecelp7470"], "audio/vnd.nuera.ecelp9600": ["ecelp9600"], "audio/vnd.rip": ["rip"], "audio/x-aac": ["aac"], "audio/x-aiff": ["aif", "aiff", "aifc"], "audio/x-caf": ["caf"], "audio/x-flac": ["flac"], "audio/x-m4a": ["*m4a"], "audio/x-matroska": ["mka"], "audio/x-mpegurl": ["m3u"], "audio/x-ms-wax": ["wax"], "audio/x-ms-wma": ["wma"], "audio/x-pn-realaudio": ["ram", "ra"], "audio/x-pn-realaudio-plugin": ["rmp"], "audio/x-realaudio": ["*ra"], "audio/x-wav": ["*wav"], "chemical/x-cdx": ["cdx"], "chemical/x-cif": ["cif"], "chemical/x-cmdf": ["cmdf"], "chemical/x-cml": ["cml"], "chemical/x-csml": ["csml"], "chemical/x-xyz": ["xyz"], "image/prs.btif": ["btif"], "image/prs.pti": ["pti"], "image/vnd.adobe.photoshop": ["psd"], "image/vnd.airzip.accelerator.azv": ["azv"], "image/vnd.dece.graphic": ["uvi", "uvvi", "uvg", "uvvg"], "image/vnd.djvu": ["djvu", "djv"], "image/vnd.dvb.subtitle": ["*sub"], "image/vnd.dwg": ["dwg"], "image/vnd.dxf": ["dxf"], "image/vnd.fastbidsheet": ["fbs"], "image/vnd.fpx": ["fpx"], "image/vnd.fst": ["fst"], "image/vnd.fujixerox.edmics-mmr": ["mmr"], "image/vnd.fujixerox.edmics-rlc": ["rlc"], "image/vnd.microsoft.icon": ["ico"], "image/vnd.ms-dds": ["dds"], "image/vnd.ms-modi": ["mdi"], "image/vnd.ms-photo": ["wdp"], "image/vnd.net-fpx": ["npx"], "image/vnd.pco.b16": ["b16"], "image/vnd.tencent.tap": ["tap"], "image/vnd.valve.source.texture": ["vtf"], "image/vnd.wap.wbmp": ["wbmp"], "image/vnd.xiff": ["xif"], "image/vnd.zbrush.pcx": ["pcx"], "image/x-3ds": ["3ds"], "image/x-cmu-raster": ["ras"], "image/x-cmx": ["cmx"], "image/x-freehand": ["fh", "fhc", "fh4", "fh5", "fh7"], "image/x-icon": ["*ico"], "image/x-jng": ["jng"], "image/x-mrsid-image": ["sid"], "image/x-ms-bmp": ["*bmp"], "image/x-pcx": ["*pcx"], "image/x-pict": ["pic", "pct"], "image/x-portable-anymap": ["pnm"], "image/x-portable-bitmap": ["pbm"], "image/x-portable-graymap": ["pgm"], "image/x-portable-pixmap": ["ppm"], "image/x-rgb": ["rgb"], "image/x-tga": ["tga"], "image/x-xbitmap": ["xbm"], "image/x-xpixmap": ["xpm"], "image/x-xwindowdump": ["xwd"], "message/vnd.wfa.wsc": ["wsc"], "model/vnd.collada+xml": ["dae"], "model/vnd.dwf": ["dwf"], "model/vnd.gdl": ["gdl"], "model/vnd.gtw": ["gtw"], "model/vnd.mts": ["mts"], "model/vnd.opengex": ["ogex"], "model/vnd.parasolid.transmit.binary": ["x_b"], "model/vnd.parasolid.transmit.text": ["x_t"], "model/vnd.sap.vds": ["vds"], "model/vnd.usdz+zip": ["usdz"], "model/vnd.valve.source.compiled-map": ["bsp"], "model/vnd.vtu": ["vtu"], "text/prs.lines.tag": ["dsc"], "text/vnd.curl": ["curl"], "text/vnd.curl.dcurl": ["dcurl"], "text/vnd.curl.mcurl": ["mcurl"], "text/vnd.curl.scurl": ["scurl"], "text/vnd.dvb.subtitle": ["sub"], "text/vnd.fly": ["fly"], "text/vnd.fmi.flexstor": ["flx"], "text/vnd.graphviz": ["gv"], "text/vnd.in3d.3dml": ["3dml"], "text/vnd.in3d.spot": ["spot"], "text/vnd.sun.j2me.app-descriptor": ["jad"], "text/vnd.wap.wml": ["wml"], "text/vnd.wap.wmlscript": ["wmls"], "text/x-asm": ["s", "asm"], "text/x-c": ["c", "cc", "cxx", "cpp", "h", "hh", "dic"], "text/x-component": ["htc"], "text/x-fortran": ["f", "for", "f77", "f90"], "text/x-handlebars-template": ["hbs"], "text/x-java-source": ["java"], "text/x-lua": ["lua"], "text/x-markdown": ["mkd"], "text/x-nfo": ["nfo"], "text/x-opml": ["opml"], "text/x-org": ["*org"], "text/x-pascal": ["p", "pas"], "text/x-processing": ["pde"], "text/x-sass": ["sass"], "text/x-scss": ["scss"], "text/x-setext": ["etx"], "text/x-sfv": ["sfv"], "text/x-suse-ymp": ["ymp"], "text/x-uuencode": ["uu"], "text/x-vcalendar": ["vcs"], "text/x-vcard": ["vcf"], "video/vnd.dece.hd": ["uvh", "uvvh"], "video/vnd.dece.mobile": ["uvm", "uvvm"], "video/vnd.dece.pd": ["uvp", "uvvp"], "video/vnd.dece.sd": ["uvs", "uvvs"], "video/vnd.dece.video": ["uvv", "uvvv"], "video/vnd.dvb.file": ["dvb"], "video/vnd.fvt": ["fvt"], "video/vnd.mpegurl": ["mxu", "m4u"], "video/vnd.ms-playready.media.pyv": ["pyv"], "video/vnd.uvvu.mp4": ["uvu", "uvvu"], "video/vnd.vivo": ["viv"], "video/x-f4v": ["f4v"], "video/x-fli": ["fli"], "video/x-flv": ["flv"], "video/x-m4v": ["m4v"], "video/x-matroska": ["mkv", "mk3d", "mks"], "video/x-mng": ["mng"], "video/x-ms-asf": ["asf", "asx"], "video/x-ms-vob": ["vob"], "video/x-ms-wm": ["wm"], "video/x-ms-wmv": ["wmv"], "video/x-ms-wmx": ["wmx"], "video/x-ms-wvx": ["wvx"], "video/x-msvideo": ["avi"], "video/x-sgi-movie": ["movie"], "video/x-smv": ["smv"], "x-conference/x-cooltalk": ["ice"] };
  }
});

// .svelte-kit/cloudflare-workers-tmp/node_modules/mime/index.js
var require_mime = __commonJS({
  ".svelte-kit/cloudflare-workers-tmp/node_modules/mime/index.js"(exports, module) {
    "use strict";
    var Mime = require_Mime();
    module.exports = new Mime(require_standard(), require_other());
  }
});

// .svelte-kit/cloudflare-workers-tmp/node_modules/@cloudflare/kv-asset-handler/dist/types.js
var require_types = __commonJS({
  ".svelte-kit/cloudflare-workers-tmp/node_modules/@cloudflare/kv-asset-handler/dist/types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InternalError = exports.NotFoundError = exports.MethodNotAllowedError = exports.KVError = void 0;
    var KVError = class extends Error {
      constructor(message, status = 500) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = KVError.name;
        this.status = status;
      }
    };
    exports.KVError = KVError;
    var MethodNotAllowedError = class extends KVError {
      constructor(message = `Not a valid request method`, status = 405) {
        super(message, status);
      }
    };
    exports.MethodNotAllowedError = MethodNotAllowedError;
    var NotFoundError = class extends KVError {
      constructor(message = `Not Found`, status = 404) {
        super(message, status);
      }
    };
    exports.NotFoundError = NotFoundError;
    var InternalError = class extends KVError {
      constructor(message = `Internal Error in KV Asset Handler`, status = 500) {
        super(message, status);
      }
    };
    exports.InternalError = InternalError;
  }
});

// .svelte-kit/cloudflare-workers-tmp/node_modules/@cloudflare/kv-asset-handler/dist/index.js
var require_dist = __commonJS({
  ".svelte-kit/cloudflare-workers-tmp/node_modules/@cloudflare/kv-asset-handler/dist/index.js"(exports) {
    "use strict";
    var __awaiter2 = exports && exports.__awaiter || function(thisArg, _arguments, P2, generator) {
      function adopt(value) {
        return value instanceof P2 ? value : new P2(function(resolve2) {
          resolve2(value);
        });
      }
      return new (P2 || (P2 = Promise))(function(resolve2, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InternalError = exports.NotFoundError = exports.MethodNotAllowedError = exports.serveSinglePageApp = exports.mapRequestToAsset = exports.getAssetFromKV = void 0;
    var mime = require_mime();
    var types_1 = require_types();
    Object.defineProperty(exports, "MethodNotAllowedError", { enumerable: true, get: function() {
      return types_1.MethodNotAllowedError;
    } });
    Object.defineProperty(exports, "NotFoundError", { enumerable: true, get: function() {
      return types_1.NotFoundError;
    } });
    Object.defineProperty(exports, "InternalError", { enumerable: true, get: function() {
      return types_1.InternalError;
    } });
    var defaultCacheControl = {
      browserTTL: null,
      edgeTTL: 2 * 60 * 60 * 24,
      bypassCache: false
    };
    var parseStringAsObject = (maybeString) => typeof maybeString === "string" ? JSON.parse(maybeString) : maybeString;
    var getAssetFromKVDefaultOptions = {
      ASSET_NAMESPACE: typeof __STATIC_CONTENT !== "undefined" ? __STATIC_CONTENT : void 0,
      ASSET_MANIFEST: typeof __STATIC_CONTENT_MANIFEST !== "undefined" ? parseStringAsObject(__STATIC_CONTENT_MANIFEST) : void 0,
      cacheControl: defaultCacheControl,
      defaultMimeType: "text/plain",
      defaultDocument: "index.html"
    };
    function assignOptions(options) {
      return Object.assign({}, getAssetFromKVDefaultOptions, options);
    }
    var mapRequestToAsset2 = (request, options) => {
      options = assignOptions(options);
      const parsedUrl = new URL(request.url);
      let pathname = parsedUrl.pathname;
      if (pathname.endsWith("/")) {
        pathname = pathname.concat(options.defaultDocument);
      } else if (!mime.getType(pathname)) {
        pathname = pathname.concat("/" + options.defaultDocument);
      }
      parsedUrl.pathname = pathname;
      return new Request(parsedUrl.toString(), request);
    };
    exports.mapRequestToAsset = mapRequestToAsset2;
    function serveSinglePageApp(request, options) {
      options = assignOptions(options);
      request = mapRequestToAsset2(request, options);
      const parsedUrl = new URL(request.url);
      if (parsedUrl.pathname.endsWith(".html")) {
        return new Request(`${parsedUrl.origin}/${options.defaultDocument}`, request);
      } else {
        return request;
      }
    }
    exports.serveSinglePageApp = serveSinglePageApp;
    var getAssetFromKV2 = (event2, options) => __awaiter2(void 0, void 0, void 0, function* () {
      options = assignOptions(options);
      const request = event2.request;
      const ASSET_NAMESPACE = options.ASSET_NAMESPACE;
      const ASSET_MANIFEST = parseStringAsObject(options.ASSET_MANIFEST);
      if (typeof ASSET_NAMESPACE === "undefined") {
        throw new types_1.InternalError(`there is no KV namespace bound to the script`);
      }
      const rawPathKey = new URL(request.url).pathname.replace(/^\/+/, "");
      let pathIsEncoded = false;
      let requestKey;
      if (options.mapRequestToAsset) {
        requestKey = options.mapRequestToAsset(request);
      } else if (ASSET_MANIFEST[rawPathKey]) {
        requestKey = request;
      } else if (ASSET_MANIFEST[decodeURIComponent(rawPathKey)]) {
        pathIsEncoded = true;
        requestKey = request;
      } else {
        const mappedRequest = mapRequestToAsset2(request);
        const mappedRawPathKey = new URL(mappedRequest.url).pathname.replace(/^\/+/, "");
        if (ASSET_MANIFEST[decodeURIComponent(mappedRawPathKey)]) {
          pathIsEncoded = true;
          requestKey = mappedRequest;
        } else {
          requestKey = mapRequestToAsset2(request, options);
        }
      }
      const SUPPORTED_METHODS = ["GET", "HEAD"];
      if (!SUPPORTED_METHODS.includes(requestKey.method)) {
        throw new types_1.MethodNotAllowedError(`${requestKey.method} is not a valid request method`);
      }
      const parsedUrl = new URL(requestKey.url);
      const pathname = pathIsEncoded ? decodeURIComponent(parsedUrl.pathname) : parsedUrl.pathname;
      let pathKey = pathname.replace(/^\/+/, "");
      const cache = caches.default;
      let mimeType = mime.getType(pathKey) || options.defaultMimeType;
      if (mimeType.startsWith("text") || mimeType === "application/javascript") {
        mimeType += "; charset=utf-8";
      }
      let shouldEdgeCache = false;
      if (typeof ASSET_MANIFEST !== "undefined") {
        if (ASSET_MANIFEST[pathKey]) {
          pathKey = ASSET_MANIFEST[pathKey];
          shouldEdgeCache = true;
        }
      }
      let cacheKey = new Request(`${parsedUrl.origin}/${pathKey}`, request);
      const evalCacheOpts = (() => {
        switch (typeof options.cacheControl) {
          case "function":
            return options.cacheControl(request);
          case "object":
            return options.cacheControl;
          default:
            return defaultCacheControl;
        }
      })();
      const formatETag = (entityId = pathKey, validatorType = "strong") => {
        if (!entityId) {
          return "";
        }
        switch (validatorType) {
          case "weak":
            if (!entityId.startsWith("W/")) {
              return `W/${entityId}`;
            }
            return entityId;
          case "strong":
            if (entityId.startsWith(`W/"`)) {
              entityId = entityId.replace("W/", "");
            }
            if (!entityId.endsWith(`"`)) {
              entityId = `"${entityId}"`;
            }
            return entityId;
          default:
            return "";
        }
      };
      options.cacheControl = Object.assign({}, defaultCacheControl, evalCacheOpts);
      if (options.cacheControl.bypassCache || options.cacheControl.edgeTTL === null || request.method == "HEAD") {
        shouldEdgeCache = false;
      }
      const shouldSetBrowserCache = typeof options.cacheControl.browserTTL === "number";
      let response = null;
      if (shouldEdgeCache) {
        response = yield cache.match(cacheKey);
      }
      if (response) {
        if (response.status > 300 && response.status < 400) {
          if (response.body && "cancel" in Object.getPrototypeOf(response.body)) {
            response.body.cancel();
            console.log("Body exists and environment supports readable streams. Body cancelled");
          } else {
            console.log("Environment doesnt support readable streams");
          }
          response = new Response(null, response);
        } else {
          let opts = {
            headers: new Headers(response.headers),
            status: 0,
            statusText: ""
          };
          opts.headers.set("cf-cache-status", "HIT");
          if (response.status) {
            opts.status = response.status;
            opts.statusText = response.statusText;
          } else if (opts.headers.has("Content-Range")) {
            opts.status = 206;
            opts.statusText = "Partial Content";
          } else {
            opts.status = 200;
            opts.statusText = "OK";
          }
          response = new Response(response.body, opts);
        }
      } else {
        const body = yield ASSET_NAMESPACE.get(pathKey, "arrayBuffer");
        if (body === null) {
          throw new types_1.NotFoundError(`could not find ${pathKey} in your content namespace`);
        }
        response = new Response(body);
        if (shouldEdgeCache) {
          response.headers.set("Accept-Ranges", "bytes");
          response.headers.set("Content-Length", body.length);
          if (!response.headers.has("etag")) {
            response.headers.set("etag", formatETag(pathKey, "strong"));
          }
          response.headers.set("Cache-Control", `max-age=${options.cacheControl.edgeTTL}`);
          event2.waitUntil(cache.put(cacheKey, response.clone()));
          response.headers.set("CF-Cache-Status", "MISS");
        }
      }
      response.headers.set("Content-Type", mimeType);
      if (response.status === 304) {
        let etag = formatETag(response.headers.get("etag"), "strong");
        let ifNoneMatch = cacheKey.headers.get("if-none-match");
        let proxyCacheStatus = response.headers.get("CF-Cache-Status");
        if (etag) {
          if (ifNoneMatch && ifNoneMatch === etag && proxyCacheStatus === "MISS") {
            response.headers.set("CF-Cache-Status", "EXPIRED");
          } else {
            response.headers.set("CF-Cache-Status", "REVALIDATED");
          }
          response.headers.set("etag", formatETag(etag, "weak"));
        }
      }
      if (shouldSetBrowserCache) {
        response.headers.set("Cache-Control", `max-age=${options.cacheControl.browserTTL}`);
      } else {
        response.headers.delete("Cache-Control");
      }
      return response;
    });
    exports.getAssetFromKV = getAssetFromKV2;
  }
});

// .svelte-kit/output/server/index.js
init_chunks();
init_index2();

// node_modules/devalue/dist/devalue.esm.js
var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function devalue(value) {
  var counts = /* @__PURE__ */ new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new Error("Cannot stringify a function");
    }
    if (counts.has(thing)) {
      counts.set(thing, counts.get(thing) + 1);
      return;
    }
    counts.set(thing, 1);
    if (!isPrimitive(thing)) {
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach(walk);
          break;
        case "Set":
        case "Map":
          Array.from(thing).forEach(walk);
          break;
        default:
          var proto = Object.getPrototypeOf(thing);
          if (proto !== Object.prototype && proto !== null && Object.getOwnPropertyNames(proto).sort().join("\0") !== objectProtoOwnPropertyNames) {
            throw new Error("Cannot stringify arbitrary non-POJOs");
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new Error("Cannot stringify POJOs with symbolic keys");
          }
          Object.keys(thing).forEach(function(key2) {
            return walk(thing[key2]);
          });
      }
    }
  }
  walk(value);
  var names = /* @__PURE__ */ new Map();
  Array.from(counts).filter(function(entry) {
    return entry[1] > 1;
  }).sort(function(a, b) {
    return b[1] - a[1];
  }).forEach(function(entry, i) {
    names.set(entry[0], getName(i));
  });
  function stringify(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (isPrimitive(thing)) {
      return stringifyPrimitive(thing);
    }
    var type = getType(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return "Object(" + stringify(thing.valueOf()) + ")";
      case "RegExp":
        return "new RegExp(" + stringifyString(thing.source) + ', "' + thing.flags + '")';
      case "Date":
        return "new Date(" + thing.getTime() + ")";
      case "Array":
        var members = thing.map(function(v2, i) {
          return i in thing ? stringify(v2) : "";
        });
        var tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return "[" + members.join(",") + tail + "]";
      case "Set":
      case "Map":
        return "new " + type + "([" + Array.from(thing).map(stringify).join(",") + "])";
      default:
        var obj = "{" + Object.keys(thing).map(function(key2) {
          return safeKey(key2) + ":" + stringify(thing[key2]);
        }).join(",") + "}";
        var proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? "Object.assign(Object.create(null)," + obj + ")" : "Object.create(null)";
        }
        return obj;
    }
  }
  var str = stringify(value);
  if (names.size) {
    var params_1 = [];
    var statements_1 = [];
    var values_1 = [];
    names.forEach(function(name6, thing) {
      params_1.push(name6);
      if (isPrimitive(thing)) {
        values_1.push(stringifyPrimitive(thing));
        return;
      }
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values_1.push("Object(" + stringify(thing.valueOf()) + ")");
          break;
        case "RegExp":
          values_1.push(thing.toString());
          break;
        case "Date":
          values_1.push("new Date(" + thing.getTime() + ")");
          break;
        case "Array":
          values_1.push("Array(" + thing.length + ")");
          thing.forEach(function(v2, i) {
            statements_1.push(name6 + "[" + i + "]=" + stringify(v2));
          });
          break;
        case "Set":
          values_1.push("new Set");
          statements_1.push(name6 + "." + Array.from(thing).map(function(v2) {
            return "add(" + stringify(v2) + ")";
          }).join("."));
          break;
        case "Map":
          values_1.push("new Map");
          statements_1.push(name6 + "." + Array.from(thing).map(function(_a) {
            var k3 = _a[0], v2 = _a[1];
            return "set(" + stringify(k3) + ", " + stringify(v2) + ")";
          }).join("."));
          break;
        default:
          values_1.push(Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}");
          Object.keys(thing).forEach(function(key2) {
            statements_1.push("" + name6 + safeProp(key2) + "=" + stringify(thing[key2]));
          });
      }
    });
    statements_1.push("return " + str);
    return "(function(" + params_1.join(",") + "){" + statements_1.join(";") + "}(" + values_1.join(",") + "))";
  } else {
    return str;
  }
}
function getName(num) {
  var name6 = "";
  do {
    name6 = chars[num % chars.length] + name6;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name6) ? name6 + "_" : name6;
}
function isPrimitive(thing) {
  return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
  if (typeof thing === "string")
    return stringifyString(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  var str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  return str;
}
function getType(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
  return escaped[c] || c;
}
function escapeUnsafeChars(str) {
  return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? key2 : escapeUnsafeChars(JSON.stringify(key2));
}
function safeProp(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? "." + key2 : "[" + escapeUnsafeChars(JSON.stringify(key2)) + "]";
}
function stringifyString(str) {
  var result = '"';
  for (var i = 0; i < str.length; i += 1) {
    var char = str.charAt(i);
    var code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped) {
      result += escaped[char];
    } else if (code >= 55296 && code <= 57343) {
      var next = str.charCodeAt(i + 1);
      if (code <= 56319 && (next >= 56320 && next <= 57343)) {
        result += char + str[++i];
      } else {
        result += "\\u" + code.toString(16).toUpperCase();
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
var devalue_esm_default = devalue;

// .svelte-kit/output/server/index.js
init_index3();
var cookie = __toESM(require_cookie(), 1);
var set_cookie_parser = __toESM(require_set_cookie(), 1);
function afterUpdate() {
}
var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page: page2 } = $$props;
  let { components } = $$props;
  let { data_0 = null } = $$props;
  let { data_1 = null } = $$props;
  let { data_2 = null } = $$props;
  let { errors } = $$props;
  {
    setContext("__svelte__", stores);
  }
  afterUpdate(stores.page.notify);
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page2 !== void 0)
    $$bindings.page(page2);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.data_0 === void 0 && $$bindings.data_0 && data_0 !== void 0)
    $$bindings.data_0(data_0);
  if ($$props.data_1 === void 0 && $$bindings.data_1 && data_1 !== void 0)
    $$bindings.data_1(data_1);
  if ($$props.data_2 === void 0 && $$bindings.data_2 && data_2 !== void 0)
    $$bindings.data_2(data_2);
  if ($$props.errors === void 0 && $$bindings.errors && errors !== void 0)
    $$bindings.errors(errors);
  {
    stores.page.set(page2);
  }
  return `


${components[1] ? `${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, { data: data_0, errors }, {}, {
    default: () => {
      return `${components[2] ? `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, { data: data_1, errors }, {}, {
        default: () => {
          return `${validate_component(components[2] || missing_component, "svelte:component").$$render($$result, { data: data_2 }, {}, {})}`;
        }
      })}` : `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, { data: data_1, errors }, {}, {})}`}`;
    }
  })}` : `${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, { data: data_0, errors }, {}, {})}`}

${``}`;
});
function serialize_error(error2, get_stack) {
  return JSON.stringify(error_to_pojo(error2, get_stack));
}
function error_to_pojo(error2, get_stack) {
  if (error2 instanceof HttpError) {
    return {
      message: error2.message,
      status: error2.status,
      __is_http_error: true
    };
  }
  const {
    name: name6,
    message,
    stack,
    cause,
    ...custom
  } = error2;
  const object = { name: name6, message, stack: get_stack(error2) };
  if (cause)
    object.cause = error_to_pojo(cause, get_stack);
  for (const key2 in custom) {
    object[key2] = custom[key2];
  }
  return object;
}
function check_method_names(mod) {
  ["get", "post", "put", "patch", "del"].forEach((m) => {
    if (m in mod) {
      const replacement = m === "del" ? "DELETE" : m.toUpperCase();
      throw Error(
        `Endpoint method "${m}" has changed to "${replacement}". See https://github.com/sveltejs/kit/discussions/5359 for more information.`
      );
    }
  });
}
var GENERIC_ERROR = {
  id: "__error"
};
function method_not_allowed(mod, method) {
  return new Response(`${method} method not allowed`, {
    status: 405,
    headers: {
      allow: allowed_methods(mod).join(", ")
    }
  });
}
function allowed_methods(mod) {
  const allowed = [];
  for (const method in ["GET", "POST", "PUT", "PATCH", "DELETE"]) {
    if (method in mod)
      allowed.push(method);
  }
  if (mod.GET || mod.HEAD)
    allowed.push("HEAD");
  return allowed;
}
async function render_endpoint(event2, mod) {
  const method = event2.request.method;
  check_method_names(mod);
  let handler = mod[method];
  if (!handler && method === "HEAD") {
    handler = mod.GET;
  }
  if (!handler) {
    return method_not_allowed(mod, method);
  }
  try {
    const response = await handler(
      event2
    );
    if (!(response instanceof Response)) {
      return new Response(
        `Invalid response from route ${event2.url.pathname}: handler should return a Response object`,
        { status: 500 }
      );
    }
    return response;
  } catch (error2) {
    if (error2 instanceof HttpError) {
      return new Response(error2.message, { status: error2.status });
    } else if (error2 instanceof Redirect) {
      return new Response(void 0, {
        status: error2.status,
        headers: { Location: error2.location }
      });
    } else {
      throw error2;
    }
  }
}
function negotiate(accept, types) {
  const parts = [];
  accept.split(",").forEach((str, i) => {
    const match = /([^/]+)\/([^;]+)(?:;q=([0-9.]+))?/.exec(str);
    if (match) {
      const [, type, subtype, q2 = "1"] = match;
      parts.push({ type, subtype, q: +q2, i });
    }
  });
  parts.sort((a, b) => {
    if (a.q !== b.q) {
      return b.q - a.q;
    }
    if (a.subtype === "*" !== (b.subtype === "*")) {
      return a.subtype === "*" ? 1 : -1;
    }
    if (a.type === "*" !== (b.type === "*")) {
      return a.type === "*" ? 1 : -1;
    }
    return a.i - b.i;
  });
  let accepted;
  let min_priority = Infinity;
  for (const mimetype of types) {
    const [type, subtype] = mimetype.split("/");
    const priority = parts.findIndex(
      (part) => (part.type === type || part.type === "*") && (part.subtype === subtype || part.subtype === "*")
    );
    if (priority !== -1 && priority < min_priority) {
      accepted = mimetype;
      min_priority = priority;
    }
  }
  return accepted;
}
function hash(value) {
  let hash2 = 5381;
  let i = value.length;
  if (typeof value === "string") {
    while (i)
      hash2 = hash2 * 33 ^ value.charCodeAt(--i);
  } else {
    while (i)
      hash2 = hash2 * 33 ^ value[--i];
  }
  return (hash2 >>> 0).toString(36);
}
var render_json_payload_script_dict = {
  "<": "\\u003C",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var render_json_payload_script_regex = new RegExp(
  `[${Object.keys(render_json_payload_script_dict).join("")}]`,
  "g"
);
function render_json_payload_script(attrs, payload) {
  const safe_payload = JSON.stringify(payload).replace(
    render_json_payload_script_regex,
    (match) => render_json_payload_script_dict[match]
  );
  let safe_attrs = "";
  for (const [key2, value] of Object.entries(attrs)) {
    if (value === void 0)
      continue;
    safe_attrs += ` sveltekit:data-${key2}=${escape_html_attr(value)}`;
  }
  return `<script type="application/json"${safe_attrs}>${safe_payload}<\/script>`;
}
var escape_html_attr_dict = {
  "&": "&amp;",
  '"': "&quot;"
};
var escape_html_attr_regex = new RegExp(
  `[${Object.keys(escape_html_attr_dict).join("")}]|[\\ud800-\\udbff](?![\\udc00-\\udfff])|[\\ud800-\\udbff][\\udc00-\\udfff]|[\\udc00-\\udfff]`,
  "g"
);
function escape_html_attr(str) {
  const escaped_str = str.replace(escape_html_attr_regex, (match) => {
    if (match.length === 2) {
      return match;
    }
    return escape_html_attr_dict[match] ?? `&#${match.charCodeAt(0)};`;
  });
  return `"${escaped_str}"`;
}
var s = JSON.stringify;
var encoder = new TextEncoder();
function sha256(data) {
  if (!key[0])
    precompute();
  const out = init.slice(0);
  const array2 = encode(data);
  for (let i = 0; i < array2.length; i += 16) {
    const w2 = array2.subarray(i, i + 16);
    let tmp;
    let a;
    let b;
    let out0 = out[0];
    let out1 = out[1];
    let out2 = out[2];
    let out3 = out[3];
    let out4 = out[4];
    let out5 = out[5];
    let out6 = out[6];
    let out7 = out[7];
    for (let i2 = 0; i2 < 64; i2++) {
      if (i2 < 16) {
        tmp = w2[i2];
      } else {
        a = w2[i2 + 1 & 15];
        b = w2[i2 + 14 & 15];
        tmp = w2[i2 & 15] = (a >>> 7 ^ a >>> 18 ^ a >>> 3 ^ a << 25 ^ a << 14) + (b >>> 17 ^ b >>> 19 ^ b >>> 10 ^ b << 15 ^ b << 13) + w2[i2 & 15] + w2[i2 + 9 & 15] | 0;
      }
      tmp = tmp + out7 + (out4 >>> 6 ^ out4 >>> 11 ^ out4 >>> 25 ^ out4 << 26 ^ out4 << 21 ^ out4 << 7) + (out6 ^ out4 & (out5 ^ out6)) + key[i2];
      out7 = out6;
      out6 = out5;
      out5 = out4;
      out4 = out3 + tmp | 0;
      out3 = out2;
      out2 = out1;
      out1 = out0;
      out0 = tmp + (out1 & out2 ^ out3 & (out1 ^ out2)) + (out1 >>> 2 ^ out1 >>> 13 ^ out1 >>> 22 ^ out1 << 30 ^ out1 << 19 ^ out1 << 10) | 0;
    }
    out[0] = out[0] + out0 | 0;
    out[1] = out[1] + out1 | 0;
    out[2] = out[2] + out2 | 0;
    out[3] = out[3] + out3 | 0;
    out[4] = out[4] + out4 | 0;
    out[5] = out[5] + out5 | 0;
    out[6] = out[6] + out6 | 0;
    out[7] = out[7] + out7 | 0;
  }
  const bytes = new Uint8Array(out.buffer);
  reverse_endianness(bytes);
  return base64(bytes);
}
var init = new Uint32Array(8);
var key = new Uint32Array(64);
function precompute() {
  function frac(x3) {
    return (x3 - Math.floor(x3)) * 4294967296;
  }
  let prime = 2;
  for (let i = 0; i < 64; prime++) {
    let is_prime = true;
    for (let factor = 2; factor * factor <= prime; factor++) {
      if (prime % factor === 0) {
        is_prime = false;
        break;
      }
    }
    if (is_prime) {
      if (i < 8) {
        init[i] = frac(prime ** (1 / 2));
      }
      key[i] = frac(prime ** (1 / 3));
      i++;
    }
  }
}
function reverse_endianness(bytes) {
  for (let i = 0; i < bytes.length; i += 4) {
    const a = bytes[i + 0];
    const b = bytes[i + 1];
    const c = bytes[i + 2];
    const d = bytes[i + 3];
    bytes[i + 0] = d;
    bytes[i + 1] = c;
    bytes[i + 2] = b;
    bytes[i + 3] = a;
  }
}
function encode(str) {
  const encoded = encoder.encode(str);
  const length = encoded.length * 8;
  const size = 512 * Math.ceil((length + 65) / 512);
  const bytes = new Uint8Array(size / 8);
  bytes.set(encoded);
  bytes[encoded.length] = 128;
  reverse_endianness(bytes);
  const words = new Uint32Array(bytes.buffer);
  words[words.length - 2] = Math.floor(length / 4294967296);
  words[words.length - 1] = length;
  return words;
}
var chars2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
function base64(bytes) {
  const l2 = bytes.length;
  let result = "";
  let i;
  for (i = 2; i < l2; i += 3) {
    result += chars2[bytes[i - 2] >> 2];
    result += chars2[(bytes[i - 2] & 3) << 4 | bytes[i - 1] >> 4];
    result += chars2[(bytes[i - 1] & 15) << 2 | bytes[i] >> 6];
    result += chars2[bytes[i] & 63];
  }
  if (i === l2 + 1) {
    result += chars2[bytes[i - 2] >> 2];
    result += chars2[(bytes[i - 2] & 3) << 4];
    result += "==";
  }
  if (i === l2) {
    result += chars2[bytes[i - 2] >> 2];
    result += chars2[(bytes[i - 2] & 3) << 4 | bytes[i - 1] >> 4];
    result += chars2[(bytes[i - 1] & 15) << 2];
    result += "=";
  }
  return result;
}
var array = new Uint8Array(16);
function generate_nonce() {
  crypto.getRandomValues(array);
  return base64(array);
}
var quoted = /* @__PURE__ */ new Set([
  "self",
  "unsafe-eval",
  "unsafe-hashes",
  "unsafe-inline",
  "none",
  "strict-dynamic",
  "report-sample"
]);
var crypto_pattern = /^(nonce|sha\d\d\d)-/;
var _use_hashes, _script_needs_csp, _style_needs_csp, _directives, _script_src, _style_src, _nonce;
var BaseProvider = class {
  constructor(use_hashes, directives, nonce, dev) {
    __privateAdd(this, _use_hashes, void 0);
    __privateAdd(this, _script_needs_csp, void 0);
    __privateAdd(this, _style_needs_csp, void 0);
    __privateAdd(this, _directives, void 0);
    __privateAdd(this, _script_src, void 0);
    __privateAdd(this, _style_src, void 0);
    __privateAdd(this, _nonce, void 0);
    __privateSet(this, _use_hashes, use_hashes);
    __privateSet(this, _directives, dev ? { ...directives } : directives);
    const d = __privateGet(this, _directives);
    if (dev) {
      const effective_style_src2 = d["style-src"] || d["default-src"];
      if (effective_style_src2 && !effective_style_src2.includes("unsafe-inline")) {
        d["style-src"] = [...effective_style_src2, "unsafe-inline"];
      }
    }
    __privateSet(this, _script_src, []);
    __privateSet(this, _style_src, []);
    const effective_script_src = d["script-src"] || d["default-src"];
    const effective_style_src = d["style-src"] || d["default-src"];
    __privateSet(this, _script_needs_csp, !!effective_script_src && effective_script_src.filter((value) => value !== "unsafe-inline").length > 0);
    __privateSet(this, _style_needs_csp, !dev && !!effective_style_src && effective_style_src.filter((value) => value !== "unsafe-inline").length > 0);
    this.script_needs_nonce = __privateGet(this, _script_needs_csp) && !__privateGet(this, _use_hashes);
    this.style_needs_nonce = __privateGet(this, _style_needs_csp) && !__privateGet(this, _use_hashes);
    __privateSet(this, _nonce, nonce);
  }
  add_script(content) {
    if (__privateGet(this, _script_needs_csp)) {
      if (__privateGet(this, _use_hashes)) {
        __privateGet(this, _script_src).push(`sha256-${sha256(content)}`);
      } else if (__privateGet(this, _script_src).length === 0) {
        __privateGet(this, _script_src).push(`nonce-${__privateGet(this, _nonce)}`);
      }
    }
  }
  add_style(content) {
    if (__privateGet(this, _style_needs_csp)) {
      if (__privateGet(this, _use_hashes)) {
        __privateGet(this, _style_src).push(`sha256-${sha256(content)}`);
      } else if (__privateGet(this, _style_src).length === 0) {
        __privateGet(this, _style_src).push(`nonce-${__privateGet(this, _nonce)}`);
      }
    }
  }
  get_header(is_meta = false) {
    const header = [];
    const directives = { ...__privateGet(this, _directives) };
    if (__privateGet(this, _style_src).length > 0) {
      directives["style-src"] = [
        ...directives["style-src"] || directives["default-src"] || [],
        ...__privateGet(this, _style_src)
      ];
    }
    if (__privateGet(this, _script_src).length > 0) {
      directives["script-src"] = [
        ...directives["script-src"] || directives["default-src"] || [],
        ...__privateGet(this, _script_src)
      ];
    }
    for (const key2 in directives) {
      if (is_meta && (key2 === "frame-ancestors" || key2 === "report-uri" || key2 === "sandbox")) {
        continue;
      }
      const value = directives[key2];
      if (!value)
        continue;
      const directive = [key2];
      if (Array.isArray(value)) {
        value.forEach((value2) => {
          if (quoted.has(value2) || crypto_pattern.test(value2)) {
            directive.push(`'${value2}'`);
          } else {
            directive.push(value2);
          }
        });
      }
      header.push(directive.join(" "));
    }
    return header.join("; ");
  }
};
_use_hashes = new WeakMap();
_script_needs_csp = new WeakMap();
_style_needs_csp = new WeakMap();
_directives = new WeakMap();
_script_src = new WeakMap();
_style_src = new WeakMap();
_nonce = new WeakMap();
var CspProvider = class extends BaseProvider {
  get_meta() {
    const content = escape_html_attr(this.get_header(true));
    return `<meta http-equiv="content-security-policy" content=${content}>`;
  }
};
var CspReportOnlyProvider = class extends BaseProvider {
  constructor(use_hashes, directives, nonce, dev) {
    var _a, _b;
    super(use_hashes, directives, nonce, dev);
    if (Object.values(directives).filter((v2) => !!v2).length > 0) {
      const has_report_to = ((_a = directives["report-to"]) == null ? void 0 : _a.length) ?? 0 > 0;
      const has_report_uri = ((_b = directives["report-uri"]) == null ? void 0 : _b.length) ?? 0 > 0;
      if (!has_report_to && !has_report_uri) {
        throw Error(
          "`content-security-policy-report-only` must be specified with either the `report-to` or `report-uri` directives, or both"
        );
      }
    }
  }
};
var Csp = class {
  constructor({ mode, directives, reportOnly }, { prerender, dev }) {
    __publicField(this, "nonce", generate_nonce());
    __publicField(this, "csp_provider");
    __publicField(this, "report_only_provider");
    const use_hashes = mode === "hash" || mode === "auto" && prerender;
    this.csp_provider = new CspProvider(use_hashes, directives, this.nonce, dev);
    this.report_only_provider = new CspReportOnlyProvider(use_hashes, reportOnly, this.nonce, dev);
  }
  get script_needs_nonce() {
    return this.csp_provider.script_needs_nonce || this.report_only_provider.script_needs_nonce;
  }
  get style_needs_nonce() {
    return this.csp_provider.style_needs_nonce || this.report_only_provider.style_needs_nonce;
  }
  add_script(content) {
    this.csp_provider.add_script(content);
    this.report_only_provider.add_script(content);
  }
  add_style(content) {
    this.csp_provider.add_style(content);
    this.report_only_provider.add_style(content);
  }
};
var updated = {
  ...readable(false),
  check: () => false
};
async function render_response({
  branch,
  fetched,
  cookies,
  options,
  state,
  page_config,
  status,
  error: error2 = null,
  event: event2,
  resolve_opts,
  validation_errors
}) {
  var _a;
  if (state.prerendering) {
    if (options.csp.mode === "nonce") {
      throw new Error('Cannot use prerendering if config.kit.csp.mode === "nonce"');
    }
    if (options.template_contains_nonce) {
      throw new Error("Cannot use prerendering if page template contains %sveltekit.nonce%");
    }
  }
  const { entry } = options.manifest._;
  const stylesheets16 = new Set(entry.stylesheets);
  const modulepreloads = new Set(entry.imports);
  const link_header_preloads = /* @__PURE__ */ new Set();
  const inline_styles = /* @__PURE__ */ new Map();
  let rendered;
  const stack = error2 instanceof HttpError ? void 0 : error2 == null ? void 0 : error2.stack;
  if (error2 && options.dev && !(error2 instanceof HttpError)) {
    error2.stack = options.get_stack(error2);
  }
  if (resolve_opts.ssr) {
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        updated
      },
      components: await Promise.all(branch.map(({ node }) => node.component()))
    };
    let data = {};
    for (let i = 0; i < branch.length; i += 1) {
      data = { ...data, ...branch[i].data };
      props[`data_${i}`] = data;
    }
    props.page = {
      error: error2,
      params: event2.params,
      routeId: event2.routeId,
      status,
      url: event2.url,
      data
    };
    if (validation_errors) {
      props.errors = validation_errors;
    }
    const print_error = (property, replacement) => {
      Object.defineProperty(props.page, property, {
        get: () => {
          throw new Error(`$page.${property} has been replaced by $page.url.${replacement}`);
        }
      });
    };
    print_error("origin", "origin");
    print_error("path", "pathname");
    print_error("query", "searchParams");
    rendered = options.root.render(props);
    for (const { node } of branch) {
      if (node.imports) {
        node.imports.forEach((url) => modulepreloads.add(url));
      }
      if (node.stylesheets) {
        node.stylesheets.forEach((url) => stylesheets16.add(url));
      }
      if (node.inline_styles) {
        Object.entries(await node.inline_styles()).forEach(([k3, v2]) => inline_styles.set(k3, v2));
      }
    }
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  let { head, html: body } = rendered;
  const csp = new Csp(options.csp, {
    dev: options.dev,
    prerender: !!state.prerendering
  });
  const target = hash(body);
  let assets2;
  if (options.paths.assets) {
    assets2 = options.paths.assets;
  } else if ((_a = state.prerendering) == null ? void 0 : _a.fallback) {
    assets2 = options.paths.base;
  } else {
    const segments = event2.url.pathname.slice(options.paths.base.length).split("/").slice(2);
    assets2 = segments.length > 0 ? segments.map(() => "..").join("/") : ".";
  }
  const prefixed = (path) => path.startsWith("/") ? path : `${assets2}/${path}`;
  const init_app = `
		import { set_public_env, start } from ${s(prefixed(entry.file))};

		set_public_env(${s(options.public_env)});

		start({
			target: document.querySelector('[data-sveltekit-hydrate="${target}"]').parentNode,
			paths: ${s(options.paths)},
			route: ${!!page_config.router},
			spa: ${!resolve_opts.ssr},
			trailing_slash: ${s(options.trailing_slash)},
			hydrate: ${resolve_opts.ssr && page_config.hydrate ? `{
				status: ${status},
				error: ${error2 && serialize_error(error2, (e) => e.stack)},
				node_ids: [${branch.map(({ node }) => node.index).join(", ")}],
				params: ${devalue_esm_default(event2.params)},
				routeId: ${s(event2.routeId)}
			}` : "null"}
		});
	`;
  const init_service_worker = `
		if ('serviceWorker' in navigator) {
			addEventListener('load', function () {
				navigator.serviceWorker.register('${options.service_worker}');
			});
		}
	`;
  if (inline_styles.size > 0) {
    const content = Array.from(inline_styles.values()).join("\n");
    const attributes = [];
    if (options.dev)
      attributes.push(" data-sveltekit");
    if (csp.style_needs_nonce)
      attributes.push(` nonce="${csp.nonce}"`);
    csp.add_style(content);
    head += `
	<style${attributes.join("")}>${content}</style>`;
  }
  for (const dep of stylesheets16) {
    const path = prefixed(dep);
    const attributes = [];
    if (csp.style_needs_nonce) {
      attributes.push(`nonce="${csp.nonce}"`);
    }
    if (inline_styles.has(dep)) {
      attributes.push("disabled", 'media="(max-width: 0)"');
    } else {
      const preload_atts = ['rel="preload"', 'as="style"'].concat(attributes);
      link_header_preloads.add(`<${encodeURI(path)}>; ${preload_atts.join(";")}; nopush`);
    }
    attributes.unshift('rel="stylesheet"');
    head += `
	<link href="${path}" ${attributes.join(" ")}>`;
  }
  if (page_config.router || page_config.hydrate) {
    for (const dep of modulepreloads) {
      const path = prefixed(dep);
      link_header_preloads.add(`<${encodeURI(path)}>; rel="modulepreload"; nopush`);
      if (state.prerendering) {
        head += `
	<link rel="modulepreload" href="${path}">`;
      }
    }
    const attributes = ['type="module"', `data-sveltekit-hydrate="${target}"`];
    csp.add_script(init_app);
    if (csp.script_needs_nonce) {
      attributes.push(`nonce="${csp.nonce}"`);
    }
    body += `
		<script ${attributes.join(" ")}>${init_app}<\/script>`;
  }
  if (resolve_opts.ssr && page_config.hydrate) {
    const serialized_data = [];
    for (const { url, body: body2, response } of fetched) {
      serialized_data.push(
        render_json_payload_script(
          { type: "data", url, body: typeof body2 === "string" ? hash(body2) : void 0 },
          response
        )
      );
    }
    if (branch.some((node) => node.server_data)) {
      serialized_data.push(
        render_json_payload_script(
          { type: "server_data" },
          branch.map(({ server_data }) => server_data)
        )
      );
    }
    if (validation_errors) {
      serialized_data.push(
        render_json_payload_script({ type: "validation_errors" }, validation_errors)
      );
    }
    body += `
	${serialized_data.join("\n	")}`;
  }
  if (options.service_worker) {
    csp.add_script(init_service_worker);
    head += `
			<script${csp.script_needs_nonce ? ` nonce="${csp.nonce}"` : ""}>${init_service_worker}<\/script>`;
  }
  if (state.prerendering) {
    const http_equiv = [];
    const csp_headers = csp.csp_provider.get_meta();
    if (csp_headers) {
      http_equiv.push(csp_headers);
    }
    if (state.prerendering.cache) {
      http_equiv.push(`<meta http-equiv="cache-control" content="${state.prerendering.cache}">`);
    }
    if (http_equiv.length > 0) {
      head = http_equiv.join("\n") + head;
    }
  }
  const html = await resolve_opts.transformPageChunk({
    html: options.template({ head, body, assets: assets2, nonce: csp.nonce }),
    done: true
  }) || "";
  const headers = new Headers({
    "content-type": "text/html",
    etag: `"${hash(html)}"`
  });
  if (!state.prerendering) {
    const csp_header = csp.csp_provider.get_header();
    if (csp_header) {
      headers.set("content-security-policy", csp_header);
    }
    const report_only_header = csp.report_only_provider.get_header();
    if (report_only_header) {
      headers.set("content-security-policy-report-only", report_only_header);
    }
    for (const new_cookie of cookies) {
      const { name: name6, value, ...options2 } = new_cookie;
      headers.append("set-cookie", cookie.serialize(name6, value, options2));
    }
    if (link_header_preloads.size) {
      headers.set("link", Array.from(link_header_preloads).join(", "));
    }
  }
  if (error2 && options.dev && !(error2 instanceof HttpError)) {
    error2.stack = stack;
  }
  return new Response(html, {
    status,
    headers
  });
}
var absolute = /^([a-z]+:)?\/?\//;
var scheme = /^[a-z]+:/;
function resolve(base2, path) {
  if (scheme.test(path))
    return path;
  const base_match = absolute.exec(base2);
  const path_match = absolute.exec(path);
  if (!base_match) {
    throw new Error(`bad base path: "${base2}"`);
  }
  const baseparts = path_match ? [] : base2.slice(base_match[0].length).split("/");
  const pathparts = path_match ? path.slice(path_match[0].length).split("/") : path.split("/");
  baseparts.pop();
  for (let i = 0; i < pathparts.length; i += 1) {
    const part = pathparts[i];
    if (part === ".")
      continue;
    else if (part === "..")
      baseparts.pop();
    else
      baseparts.push(part);
  }
  const prefix2 = path_match && path_match[0] || base_match && base_match[0] || "";
  return `${prefix2}${baseparts.join("/")}`;
}
function is_root_relative(path) {
  return path[0] === "/" && path[1] !== "/";
}
function normalize_path(path, trailing_slash) {
  if (path === "/" || trailing_slash === "ignore")
    return path;
  if (trailing_slash === "never") {
    return path.endsWith("/") ? path.slice(0, -1) : path;
  } else if (trailing_slash === "always" && !path.endsWith("/")) {
    return path + "/";
  }
  return path;
}
function decode_params(params) {
  for (const key2 in params) {
    params[key2] = params[key2].replace(/%23/g, "#").replace(/%3[Bb]/g, ";").replace(/%2[Cc]/g, ",").replace(/%2[Ff]/g, "/").replace(/%3[Ff]/g, "?").replace(/%3[Aa]/g, ":").replace(/%40/g, "@").replace(/%26/g, "&").replace(/%3[Dd]/g, "=").replace(/%2[Bb]/g, "+").replace(/%24/g, "$");
  }
  return params;
}
var tracked_url_properties = ["href", "pathname", "search", "searchParams", "toString", "toJSON"];
function make_trackable(url, callback) {
  const tracked = new URL(url);
  for (const property of tracked_url_properties) {
    let value = tracked[property];
    Object.defineProperty(tracked, property, {
      get() {
        callback();
        return value;
      },
      enumerable: true,
      configurable: true
    });
  }
  tracked[Symbol.for("nodejs.util.inspect.custom")] = (depth, opts, inspect) => {
    return inspect(url, opts);
  };
  disable_hash(tracked);
  return tracked;
}
function disable_hash(url) {
  Object.defineProperty(url, "hash", {
    get() {
      throw new Error(
        "Cannot access event.url.hash. Consider using `$page.url.hash` inside a component instead"
      );
    }
  });
}
function disable_search(url) {
  for (const property of ["search", "searchParams"]) {
    Object.defineProperty(url, property, {
      get() {
        throw new Error(`Cannot access url.${property} on a page with prerendering enabled`);
      }
    });
  }
}
async function load_server_data({ dev, event: event2, state, node, parent: parent2 }) {
  var _a;
  if (!(node == null ? void 0 : node.server))
    return null;
  const uses = {
    dependencies: /* @__PURE__ */ new Set(),
    params: /* @__PURE__ */ new Set(),
    parent: false,
    url: false
  };
  const url = make_trackable(event2.url, () => {
    uses.url = true;
  });
  if (state.prerendering) {
    disable_search(url);
  }
  const result = await ((_a = node.server.load) == null ? void 0 : _a.call(null, {
    ...event2,
    depends: (...deps) => {
      for (const dep of deps) {
        const { href } = new URL(dep, event2.url);
        uses.dependencies.add(href);
      }
    },
    params: new Proxy(event2.params, {
      get: (target, key2) => {
        uses.params.add(key2);
        return target[key2];
      }
    }),
    parent: async () => {
      uses.parent = true;
      return parent2();
    },
    url
  }));
  const data = result ? await unwrap_promises(result) : null;
  if (dev) {
    check_serializability(data, node.server_id, "data");
  }
  return {
    type: "data",
    data,
    uses: {
      dependencies: uses.dependencies.size > 0 ? Array.from(uses.dependencies) : void 0,
      params: uses.params.size > 0 ? Array.from(uses.params) : void 0,
      parent: uses.parent ? 1 : void 0,
      url: uses.url ? 1 : void 0
    }
  };
}
async function load_data({ event: event2, fetcher, node, parent: parent2, server_data_promise }) {
  var _a;
  const server_data_node = await server_data_promise;
  if (!((_a = node == null ? void 0 : node.shared) == null ? void 0 : _a.load)) {
    return (server_data_node == null ? void 0 : server_data_node.data) ?? null;
  }
  const load_event = {
    url: event2.url,
    params: event2.params,
    data: (server_data_node == null ? void 0 : server_data_node.data) ?? null,
    routeId: event2.routeId,
    fetch: fetcher,
    setHeaders: event2.setHeaders,
    depends: () => {
    },
    parent: parent2
  };
  Object.defineProperties(load_event, {
    session: {
      get() {
        throw new Error(
          "session is no longer available. See https://github.com/sveltejs/kit/discussions/5883"
        );
      },
      enumerable: false
    }
  });
  const data = await node.shared.load.call(null, load_event);
  return data ? unwrap_promises(data) : null;
}
async function unwrap_promises(object) {
  const unwrapped = {};
  for (const key2 in object) {
    unwrapped[key2] = await object[key2];
  }
  return unwrapped;
}
function check_serializability(value, id2, path) {
  const type = typeof value;
  if (type === "string" || type === "boolean" || type === "number" || type === "undefined") {
    return;
  }
  if (type === "object") {
    if (!value)
      return;
    if (Array.isArray(value)) {
      value.forEach((child, i) => {
        check_serializability(child, id2, `${path}[${i}]`);
      });
      return;
    }
    const tag = Object.prototype.toString.call(value);
    if (tag === "[object Object]") {
      for (const key2 in value) {
        check_serializability(value[key2], id2, `${path}.${key2}`);
      }
      return;
    }
  }
  throw new Error(`${path} returned from 'load' in ${id2} cannot be serialized as JSON`);
}
function coalesce_to_error(err) {
  return err instanceof Error || err && err.name && err.message ? err : new Error(JSON.stringify(err));
}
function normalize_error(error2) {
  return error2;
}
function domain_matches(hostname, constraint) {
  if (!constraint)
    return true;
  const normalized = constraint[0] === "." ? constraint.slice(1) : constraint;
  if (hostname === normalized)
    return true;
  return hostname.endsWith("." + normalized);
}
function path_matches(path, constraint) {
  if (!constraint)
    return true;
  const normalized = constraint.endsWith("/") ? constraint.slice(0, -1) : constraint;
  if (path === normalized)
    return true;
  return path.startsWith(normalized + "/");
}
function create_fetch({ event: event2, options, state, route }) {
  const fetched = [];
  const initial_cookies = cookie.parse(event2.request.headers.get("cookie") || "");
  const cookies = [];
  const fetcher = async (resource, opts = {}) => {
    let requested;
    if (typeof resource === "string" || resource instanceof URL) {
      requested = resource.toString();
    } else {
      requested = resource.url;
      opts = {
        method: resource.method,
        headers: resource.headers,
        body: resource.body,
        mode: resource.mode,
        credentials: resource.credentials,
        cache: resource.cache,
        redirect: resource.redirect,
        referrer: resource.referrer,
        integrity: resource.integrity,
        ...opts
      };
    }
    opts.headers = new Headers(opts.headers);
    for (const [key2, value] of event2.request.headers) {
      if (key2 !== "authorization" && key2 !== "connection" && key2 !== "content-length" && key2 !== "cookie" && key2 !== "host" && key2 !== "if-none-match" && !opts.headers.has(key2)) {
        opts.headers.set(key2, value);
      }
    }
    const resolved = resolve(event2.url.pathname, requested.split("?")[0]);
    let response;
    let dependency;
    const prefix2 = options.paths.assets || options.paths.base;
    const filename = decodeURIComponent(
      resolved.startsWith(prefix2) ? resolved.slice(prefix2.length) : resolved
    ).slice(1);
    const filename_html = `${filename}/index.html`;
    const is_asset = options.manifest.assets.has(filename);
    const is_asset_html = options.manifest.assets.has(filename_html);
    if (is_asset || is_asset_html) {
      const file16 = is_asset ? filename : filename_html;
      if (options.read) {
        const type = is_asset ? options.manifest.mimeTypes[filename.slice(filename.lastIndexOf("."))] : "text/html";
        response = new Response(options.read(file16), {
          headers: type ? { "content-type": type } : {}
        });
      } else {
        response = await fetch(`${event2.url.origin}/${file16}`, opts);
      }
    } else if (is_root_relative(resolved)) {
      if (opts.credentials !== "omit") {
        const authorization = event2.request.headers.get("authorization");
        const combined_cookies = { ...initial_cookies };
        for (const cookie3 of cookies) {
          if (!domain_matches(event2.url.hostname, cookie3.domain))
            continue;
          if (!path_matches(resolved, cookie3.path))
            continue;
          combined_cookies[cookie3.name] = cookie3.value;
        }
        const cookie2 = Object.entries(combined_cookies).map(([name6, value]) => `${name6}=${value}`).join("; ");
        if (cookie2) {
          opts.headers.set("cookie", cookie2);
        }
        if (authorization && !opts.headers.has("authorization")) {
          opts.headers.set("authorization", authorization);
        }
      }
      if (opts.body && typeof opts.body !== "string") {
        throw new Error("Request body must be a string");
      }
      response = await respond(
        new Request(new URL(requested, event2.url).href, { ...opts }),
        options,
        {
          ...state,
          initiator: route
        }
      );
      if (state.prerendering) {
        dependency = { response, body: null };
        state.prerendering.dependencies.set(resolved, dependency);
      }
    } else {
      if (resolved.startsWith("//")) {
        requested = event2.url.protocol + requested;
      }
      if (`.${new URL(requested).hostname}`.endsWith(`.${event2.url.hostname}`) && opts.credentials !== "omit") {
        const cookie2 = event2.request.headers.get("cookie");
        if (cookie2)
          opts.headers.set("cookie", cookie2);
      }
      opts.headers.delete("connection");
      const external_request = new Request(requested, opts);
      response = await options.hooks.externalFetch.call(null, external_request);
    }
    const set_cookie = response.headers.get("set-cookie");
    if (set_cookie) {
      cookies.push(
        ...set_cookie_parser.splitCookiesString(set_cookie).map((str) => set_cookie_parser.parseString(str))
      );
    }
    const proxy = new Proxy(response, {
      get(response2, key2, _receiver) {
        async function text() {
          const body = await response2.text();
          const headers = {};
          for (const [key3, value] of response2.headers) {
            if (key3 !== "set-cookie" && key3 !== "etag") {
              headers[key3] = value;
            }
          }
          if (!opts.body || typeof opts.body === "string") {
            const status_number = Number(response2.status);
            if (isNaN(status_number)) {
              throw new Error(
                `response.status is not a number. value: "${response2.status}" type: ${typeof response2.status}`
              );
            }
            fetched.push({
              url: requested,
              body: opts.body,
              response: {
                status: status_number,
                statusText: response2.statusText,
                headers,
                body
              }
            });
          }
          if (dependency) {
            dependency.body = body;
          }
          return body;
        }
        if (key2 === "arrayBuffer") {
          return async () => {
            const buffer = await response2.arrayBuffer();
            if (dependency) {
              dependency.body = new Uint8Array(buffer);
            }
            return buffer;
          };
        }
        if (key2 === "text") {
          return text;
        }
        if (key2 === "json") {
          return async () => {
            return JSON.parse(await text());
          };
        }
        return Reflect.get(response2, key2, response2);
      }
    });
    return proxy;
  };
  return { fetcher, fetched, cookies };
}
async function respond_with_error({ event: event2, options, state, status, error: error2, resolve_opts }) {
  const { fetcher, fetched, cookies } = create_fetch({
    event: event2,
    options,
    state,
    route: GENERIC_ERROR
  });
  try {
    const branch = [];
    if (resolve_opts.ssr) {
      const default_layout = await options.manifest._.nodes[0]();
      const server_data_promise = load_server_data({
        dev: options.dev,
        event: event2,
        state,
        node: default_layout,
        parent: async () => ({})
      });
      const server_data = await server_data_promise;
      const data = await load_data({
        event: event2,
        fetcher,
        node: default_layout,
        parent: async () => ({}),
        server_data_promise,
        state
      });
      branch.push(
        {
          node: default_layout,
          server_data,
          data
        },
        {
          node: await options.manifest._.nodes[1](),
          data: null,
          server_data: null
        }
      );
    }
    return await render_response({
      options,
      state,
      page_config: {
        hydrate: options.hydrate,
        router: options.router
      },
      status,
      error: error2,
      branch,
      fetched,
      cookies,
      event: event2,
      resolve_opts,
      validation_errors: void 0
    });
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options.handle_error(error3, event2);
    return new Response(error3.stack, {
      status: 500
    });
  }
}
function compact(arr) {
  return arr.filter((val) => val != null);
}
async function render_page(event2, route, page2, options, state, resolve_opts) {
  var _a, _b;
  if (state.initiator === route) {
    return new Response(`Not found: ${event2.url.pathname}`, {
      status: 404
    });
  }
  const accept = negotiate(event2.request.headers.get("accept") || "text/html", [
    "text/html",
    "application/json"
  ]);
  if (accept === "application/json" && event2.request.method !== "GET" && event2.request.method !== "HEAD") {
    const node = await options.manifest._.nodes[page2.leaf]();
    if (node.server) {
      return handle_json_request(event2, options, node.server);
    }
  }
  const { fetcher, fetched, cookies } = create_fetch({ event: event2, options, state, route });
  try {
    const nodes = await Promise.all([
      ...page2.layouts.map((n) => n == void 0 ? n : options.manifest._.nodes[n]()),
      options.manifest._.nodes[page2.leaf]()
    ]);
    const leaf_node = nodes.at(-1);
    let status = 200;
    let mutation_error;
    let validation_errors;
    if (leaf_node.server && event2.request.method !== "GET" && event2.request.method !== "HEAD") {
      try {
        const method = event2.request.method;
        const handler = leaf_node.server[method];
        if (handler) {
          const result = await handler.call(null, event2);
          if (result == null ? void 0 : result.errors) {
            validation_errors = result.errors;
            status = result.status ?? 400;
          }
          if (event2.request.method === "POST" && (result == null ? void 0 : result.location)) {
            return redirect_response(303, result.location);
          }
        } else {
          event2.setHeaders({
            allow: allowed_methods(leaf_node.server).join(", ")
          });
          mutation_error = error(405, "Method not allowed");
        }
      } catch (e) {
        if (e instanceof Redirect) {
          return redirect_response(e.status, e.location);
        }
        mutation_error = e;
      }
    }
    const should_prerender_data = nodes.some((node) => node == null ? void 0 : node.server);
    const data_pathname = `${event2.url.pathname.replace(/\/$/, "")}/__data.json`;
    const should_prerender = ((_a = leaf_node.shared) == null ? void 0 : _a.prerender) ?? ((_b = leaf_node.server) == null ? void 0 : _b.prerender) ?? options.prerender.default;
    if (should_prerender) {
      const mod = leaf_node.server;
      if (mod && (mod.POST || mod.PUT || mod.DELETE || mod.PATCH)) {
        throw new Error("Cannot prerender pages that have endpoints with mutative methods");
      }
    } else if (state.prerendering) {
      if (!should_prerender) {
        return new Response(void 0, {
          status: 204
        });
      }
    }
    if (!resolve_opts.ssr) {
      return await render_response({
        branch: [],
        validation_errors: void 0,
        fetched,
        cookies,
        page_config: {
          hydrate: true,
          router: true
        },
        status,
        error: null,
        event: event2,
        options,
        state,
        resolve_opts
      });
    }
    let branch = [];
    let load_error = null;
    const server_promises = nodes.map((node, i) => {
      if (load_error) {
        throw load_error;
      }
      return Promise.resolve().then(async () => {
        try {
          if (node === leaf_node && mutation_error) {
            throw mutation_error;
          }
          return await load_server_data({
            dev: options.dev,
            event: event2,
            state,
            node,
            parent: async () => {
              const data = {};
              for (let j2 = 0; j2 < i; j2 += 1) {
                const parent2 = await server_promises[j2];
                if (parent2)
                  Object.assign(data, await parent2.data);
              }
              return data;
            }
          });
        } catch (e) {
          load_error = e;
          throw load_error;
        }
      });
    });
    const load_promises = nodes.map((node, i) => {
      if (load_error)
        throw load_error;
      return Promise.resolve().then(async () => {
        try {
          return await load_data({
            event: event2,
            fetcher,
            node,
            parent: async () => {
              const data = {};
              for (let j2 = 0; j2 < i; j2 += 1) {
                Object.assign(data, await load_promises[j2]);
              }
              return data;
            },
            server_data_promise: server_promises[i],
            state
          });
        } catch (e) {
          load_error = e;
          throw load_error;
        }
      });
    });
    for (const p2 of server_promises)
      p2.catch(() => {
      });
    for (const p2 of load_promises)
      p2.catch(() => {
      });
    for (let i = 0; i < nodes.length; i += 1) {
      const node = nodes[i];
      if (node) {
        try {
          const server_data = await server_promises[i];
          const data = await load_promises[i];
          branch.push({ node, server_data, data });
        } catch (e) {
          const error2 = normalize_error(e);
          if (error2 instanceof Redirect) {
            if (state.prerendering && should_prerender_data) {
              state.prerendering.dependencies.set(data_pathname, {
                response: new Response(void 0),
                body: JSON.stringify({
                  type: "redirect",
                  location: error2.location
                })
              });
            }
            return redirect_response(error2.status, error2.location);
          }
          if (!(error2 instanceof HttpError)) {
            options.handle_error(error2, event2);
          }
          const status2 = error2 instanceof HttpError ? error2.status : 500;
          while (i--) {
            if (page2.errors[i]) {
              const index16 = page2.errors[i];
              const node2 = await options.manifest._.nodes[index16]();
              let j2 = i;
              while (!branch[j2])
                j2 -= 1;
              return await render_response({
                event: event2,
                options,
                state,
                resolve_opts,
                page_config: { router: true, hydrate: true },
                status: status2,
                error: error2,
                branch: compact(branch.slice(0, j2 + 1)).concat({
                  node: node2,
                  data: null,
                  server_data: null
                }),
                fetched,
                cookies,
                validation_errors: void 0
              });
            }
          }
          return new Response(
            error2 instanceof HttpError ? error2.message : options.get_stack(error2),
            { status: status2 }
          );
        }
      } else {
        branch.push(null);
      }
    }
    if (state.prerendering && should_prerender_data) {
      state.prerendering.dependencies.set(data_pathname, {
        response: new Response(void 0),
        body: JSON.stringify({
          type: "data",
          nodes: branch.map((branch_node) => branch_node == null ? void 0 : branch_node.server_data)
        })
      });
    }
    return await render_response({
      event: event2,
      options,
      state,
      resolve_opts,
      page_config: get_page_config(leaf_node, options),
      status,
      error: null,
      branch: compact(branch),
      validation_errors,
      fetched,
      cookies
    });
  } catch (error2) {
    options.handle_error(error2, event2);
    return await respond_with_error({
      event: event2,
      options,
      state,
      status: 500,
      error: error2,
      resolve_opts
    });
  }
}
function get_page_config(leaf, options) {
  var _a, _b;
  if (leaf.shared && "ssr" in leaf.shared) {
    throw new Error(
      "`export const ssr` has been removed \u2014 use the handle hook instead: https://kit.svelte.dev/docs/hooks#handle"
    );
  }
  return {
    router: ((_a = leaf.shared) == null ? void 0 : _a.router) ?? options.router,
    hydrate: ((_b = leaf.shared) == null ? void 0 : _b.hydrate) ?? options.hydrate
  };
}
async function handle_json_request(event2, options, mod) {
  const method = event2.request.method;
  const handler = mod[method];
  if (!handler) {
    return method_not_allowed(mod, method);
  }
  try {
    const result = await handler.call(null, event2);
    if (result == null ? void 0 : result.errors) {
      return json({ errors: result.errors }, { status: result.status || 400 });
    }
    return new Response(void 0, {
      status: 204,
      headers: (result == null ? void 0 : result.location) ? { location: result.location } : void 0
    });
  } catch (e) {
    const error2 = normalize_error(e);
    if (error2 instanceof Redirect) {
      return redirect_response(error2.status, error2.location);
    }
    if (!(error2 instanceof HttpError)) {
      options.handle_error(error2, event2);
    }
    return json(error_to_pojo(error2, options.get_stack), {
      status: error2 instanceof HttpError ? error2.status : 500
    });
  }
}
function redirect_response(status, location) {
  return new Response(void 0, {
    status,
    headers: { location }
  });
}
function exec(match, names, types, matchers) {
  const params = {};
  for (let i = 0; i < names.length; i += 1) {
    const name6 = names[i];
    const type = types[i];
    const value = match[i + 1] || "";
    if (type) {
      const matcher = matchers[type];
      if (!matcher)
        throw new Error(`Missing "${type}" param matcher`);
      if (!matcher(value))
        return;
    }
    params[name6] = value;
  }
  return params;
}
function once(fn2) {
  let done = false;
  let result;
  return () => {
    if (done)
      return result;
    done = true;
    return result = fn2();
  };
}
var DATA_SUFFIX = "/__data.json";
var default_transform = ({ html }) => html;
async function respond(request, options, state) {
  var _a, _b, _c2, _d;
  let url = new URL(request.url);
  const { parameter, allowed } = options.method_override;
  const method_override = (_a = url.searchParams.get(parameter)) == null ? void 0 : _a.toUpperCase();
  if (method_override) {
    if (request.method === "POST") {
      if (allowed.includes(method_override)) {
        request = new Proxy(request, {
          get: (target, property, _receiver) => {
            if (property === "method")
              return method_override;
            return Reflect.get(target, property, target);
          }
        });
      } else {
        const verb = allowed.length === 0 ? "enabled" : "allowed";
        const body = `${parameter}=${method_override} is not ${verb}. See https://kit.svelte.dev/docs/configuration#methodoverride`;
        return new Response(body, {
          status: 400
        });
      }
    } else {
      throw new Error(`${parameter}=${method_override} is only allowed with POST requests`);
    }
  }
  let decoded;
  try {
    decoded = decodeURI(url.pathname);
  } catch {
    return new Response("Malformed URI", { status: 400 });
  }
  let route = null;
  let params = {};
  if (options.paths.base && !((_b = state.prerendering) == null ? void 0 : _b.fallback)) {
    if (!decoded.startsWith(options.paths.base)) {
      return new Response("Not found", { status: 404 });
    }
    decoded = decoded.slice(options.paths.base.length) || "/";
  }
  const is_data_request = decoded.endsWith(DATA_SUFFIX);
  if (is_data_request) {
    const data_suffix_length = DATA_SUFFIX.length - (options.trailing_slash === "always" ? 1 : 0);
    decoded = decoded.slice(0, -data_suffix_length) || "/";
    url = new URL(url.origin + url.pathname.slice(0, -data_suffix_length) + url.search);
  }
  if (!((_c2 = state.prerendering) == null ? void 0 : _c2.fallback)) {
    const matchers = await options.manifest._.matchers();
    for (const candidate of options.manifest._.routes) {
      const match = candidate.pattern.exec(decoded);
      if (!match)
        continue;
      const matched = exec(match, candidate.names, candidate.types, matchers);
      if (matched) {
        route = candidate;
        params = decode_params(matched);
        break;
      }
    }
  }
  if (route) {
    if (route.page) {
      const normalized = normalize_path(url.pathname, options.trailing_slash);
      if (normalized !== url.pathname && !((_d = state.prerendering) == null ? void 0 : _d.fallback)) {
        return new Response(void 0, {
          status: 301,
          headers: {
            "x-sveltekit-normalize": "1",
            location: (normalized.startsWith("//") ? url.origin + normalized : normalized) + (url.search === "?" ? "" : url.search)
          }
        });
      }
    } else if (is_data_request) {
      return new Response(void 0, {
        status: 404
      });
    }
  }
  const headers = {};
  const cookies = [];
  if (state.prerendering)
    disable_search(url);
  const event2 = {
    getClientAddress: state.getClientAddress || (() => {
      throw new Error(
        `${"@sveltejs/adapter-cloudflare-workers"} does not specify getClientAddress. Please raise an issue`
      );
    }),
    locals: {},
    params,
    platform: state.platform,
    request,
    routeId: route && route.id,
    setHeaders: (new_headers) => {
      for (const key2 in new_headers) {
        const lower = key2.toLowerCase();
        const value = new_headers[key2];
        if (lower === "set-cookie") {
          const new_cookies = Array.isArray(value) ? value : [value];
          for (const cookie2 of new_cookies) {
            if (cookies.includes(cookie2)) {
              throw new Error(`"${key2}" header already has cookie with same value`);
            }
            cookies.push(cookie2);
          }
        } else if (lower in headers) {
          throw new Error(`"${key2}" header is already set`);
        } else {
          headers[lower] = value;
          if (state.prerendering && lower === "cache-control") {
            state.prerendering.cache = value;
          }
        }
      }
    },
    url
  };
  const removed = (property, replacement, suffix = "") => ({
    get: () => {
      throw new Error(`event.${property} has been replaced by event.${replacement}` + suffix);
    }
  });
  const details = ". See https://github.com/sveltejs/kit/pull/3384 for details";
  const body_getter = {
    get: () => {
      throw new Error(
        "To access the request body use the text/json/arrayBuffer/formData methods, e.g. `body = await request.json()`" + details
      );
    }
  };
  Object.defineProperties(event2, {
    clientAddress: removed("clientAddress", "getClientAddress"),
    method: removed("method", "request.method", details),
    headers: removed("headers", "request.headers", details),
    origin: removed("origin", "url.origin"),
    path: removed("path", "url.pathname"),
    query: removed("query", "url.searchParams"),
    body: body_getter,
    rawBody: body_getter
  });
  let resolve_opts = {
    ssr: true,
    transformPageChunk: default_transform
  };
  try {
    const response = await options.hooks.handle({
      event: event2,
      resolve: async (event22, opts) => {
        var _a2, _b2;
        if (opts) {
          if (opts.transformPage) {
            throw new Error(
              "transformPage has been replaced by transformPageChunk \u2014 see https://github.com/sveltejs/kit/pull/5657 for more information"
            );
          }
          resolve_opts = {
            ssr: opts.ssr !== false,
            transformPageChunk: opts.transformPageChunk || default_transform
          };
        }
        if ((_a2 = state.prerendering) == null ? void 0 : _a2.fallback) {
          return await render_response({
            event: event22,
            options,
            state,
            page_config: { router: true, hydrate: true },
            status: 200,
            error: null,
            branch: [],
            fetched: [],
            validation_errors: void 0,
            cookies: [],
            resolve_opts: {
              ...resolve_opts,
              ssr: false
            }
          });
        }
        if (route) {
          let response2;
          if (is_data_request && route.page) {
            try {
              const node_ids = [...route.page.layouts, route.page.leaf];
              const invalidated = ((_b2 = request.headers.get("x-sveltekit-invalidated")) == null ? void 0 : _b2.split(",").map(Boolean)) ?? node_ids.map(() => true);
              let aborted = false;
              const functions = node_ids.map((n, i) => {
                return once(async () => {
                  try {
                    if (aborted) {
                      return {
                        type: "skip"
                      };
                    }
                    const node = n == void 0 ? n : await options.manifest._.nodes[n]();
                    return load_server_data({
                      dev: options.dev,
                      event: event22,
                      state,
                      node,
                      parent: async () => {
                        const data = {};
                        for (let j2 = 0; j2 < i; j2 += 1) {
                          const parent2 = await functions[j2]();
                          if (parent2) {
                            Object.assign(data, parent2.data);
                          }
                        }
                        return data;
                      }
                    });
                  } catch (e) {
                    aborted = true;
                    throw e;
                  }
                });
              });
              const promises = functions.map(async (fn2, i) => {
                if (!invalidated[i]) {
                  return {
                    type: "skip"
                  };
                }
                return fn2();
              });
              let length = promises.length;
              const nodes = await Promise.all(
                promises.map(
                  (p2, i) => p2.catch((e) => {
                    const error2 = normalize_error(e);
                    if (error2 instanceof Redirect) {
                      throw error2;
                    }
                    length = Math.min(length, i + 1);
                    if (error2 instanceof HttpError) {
                      return {
                        type: "error",
                        httperror: { ...error2 }
                      };
                    }
                    options.handle_error(error2, event22);
                    return {
                      type: "error",
                      error: error_to_pojo(error2, options.get_stack)
                    };
                  })
                )
              );
              const server_data = {
                type: "data",
                nodes: nodes.slice(0, length)
              };
              response2 = json(server_data);
            } catch (e) {
              const error2 = normalize_error(e);
              if (error2 instanceof Redirect) {
                const server_data = {
                  type: "redirect",
                  location: error2.location
                };
                response2 = json(server_data);
              } else {
                response2 = json(error_to_pojo(error2, options.get_stack), { status: 500 });
              }
            }
          } else if (route.page) {
            response2 = await render_page(event22, route, route.page, options, state, resolve_opts);
          } else if (route.endpoint) {
            response2 = await render_endpoint(event22, await route.endpoint());
          } else {
            throw new Error("This should never happen");
          }
          if (!is_data_request) {
            for (const key2 in headers) {
              const value = headers[key2];
              response2.headers.set(key2, value);
            }
          }
          for (const cookie2 of cookies) {
            response2.headers.append("set-cookie", cookie2);
          }
          if (response2.status === 200 && response2.headers.has("etag")) {
            let if_none_match_value = request.headers.get("if-none-match");
            if (if_none_match_value == null ? void 0 : if_none_match_value.startsWith('W/"')) {
              if_none_match_value = if_none_match_value.substring(2);
            }
            const etag = response2.headers.get("etag");
            if (if_none_match_value === etag) {
              const headers2 = new Headers({ etag });
              for (const key2 of ["cache-control", "content-location", "date", "expires", "vary"]) {
                const value = response2.headers.get(key2);
                if (value)
                  headers2.set(key2, value);
              }
              return new Response(void 0, {
                status: 304,
                headers: headers2
              });
            }
          }
          return response2;
        }
        if (state.initiator === GENERIC_ERROR) {
          return new Response("Internal Server Error", {
            status: 500
          });
        }
        if (!state.initiator) {
          return await respond_with_error({
            event: event22,
            options,
            state,
            status: 404,
            error: new Error(`Not found: ${event22.url.pathname}`),
            resolve_opts
          });
        }
        if (state.prerendering) {
          return new Response("not found", { status: 404 });
        }
        return await fetch(request);
      },
      get request() {
        throw new Error("request in handle has been replaced with event" + details);
      }
    });
    if (response && !(response instanceof Response)) {
      throw new Error("handle must return a Response object" + details);
    }
    return response;
  } catch (e) {
    const error2 = coalesce_to_error(e);
    options.handle_error(error2, event2);
    const type = negotiate(event2.request.headers.get("accept") || "text/html", [
      "text/html",
      "application/json"
    ]);
    if (is_data_request || type === "application/json") {
      return new Response(serialize_error(error2, options.get_stack), {
        status: 500,
        headers: { "content-type": "application/json; charset=utf-8" }
      });
    }
    try {
      return await respond_with_error({
        event: event2,
        options,
        state,
        status: 500,
        error: error2,
        resolve_opts
      });
    } catch (e2) {
      const error3 = coalesce_to_error(e2);
      return new Response(options.dev ? error3.stack : error3.message, {
        status: 500
      });
    }
  }
}
var base = "";
var assets = "";
function set_paths(paths) {
  base = paths.base;
  assets = paths.assets || base;
}
var template = ({ head, body, assets: assets2, nonce }) => '<!DOCTYPE html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<link rel="icon" href="' + assets2 + '/favicon.svg" />\n		<link href="https://fonts.googleapis.com/css?family=Cairo" rel="stylesheet" />\n		<script\n			async\n			src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6370310974570347"\n			crossorigin="anonymous"\n		><\/script>\n		<meta name="viewport" content="width=device-width" />\n\n		' + head + '\n	</head>\n	<body>\n		<div style="scroll-behavior: smooth">' + body + "</div>\n	</body>\n</html>\n";
var read = null;
set_paths({ "base": "", "assets": "" });
var Server = class {
  constructor(manifest2) {
    this.options = {
      csp: { "mode": "auto", "directives": { "upgrade-insecure-requests": false, "block-all-mixed-content": false }, "reportOnly": { "upgrade-insecure-requests": false, "block-all-mixed-content": false } },
      dev: false,
      get_stack: (error2) => String(error2),
      handle_error: (error2, event2) => {
        this.options.hooks.handleError({
          error: error2,
          event: event2,
          get request() {
            throw new Error("request in handleError has been replaced with event. See https://github.com/sveltejs/kit/pull/3384 for details");
          }
        });
        error2.stack = this.options.get_stack(error2);
      },
      hooks: null,
      hydrate: true,
      manifest: manifest2,
      method_override: { "parameter": "_method", "allowed": [] },
      paths: { base, assets },
      prerender: {
        default: false,
        enabled: true
      },
      public_env: {},
      read,
      root: Root,
      service_worker: null,
      router: true,
      template,
      template_contains_nonce: false,
      trailing_slash: "never"
    };
  }
  async init({ env }) {
    const entries = Object.entries(env);
    Object.fromEntries(entries.filter(([k3]) => !k3.startsWith("PUBLIC_")));
    const pub = Object.fromEntries(entries.filter(([k3]) => k3.startsWith("PUBLIC_")));
    this.options.public_env = pub;
    if (!this.options.hooks) {
      const module = await Promise.resolve().then(() => (init_hooks(), hooks_exports));
      this.options.hooks = {
        handle: module.handle || (({ event: event2, resolve: resolve2 }) => resolve2(event2)),
        handleError: module.handleError || (({ error: error2 }) => console.error(error2.stack)),
        externalFetch: module.externalFetch || fetch
      };
    }
  }
  async respond(request, options = {}) {
    if (!(request instanceof Request)) {
      throw new Error("The first argument to server.respond must be a Request object. See https://github.com/sveltejs/kit/pull/3384 for details");
    }
    return respond(request, this.options, options);
  }
};

// .svelte-kit/cloudflare-workers-tmp/manifest.js
var manifest = {
  appDir: "_app",
  assets: /* @__PURE__ */ new Set(["attachments.svg", "bg-s-logo.svg", "favicon.svg", "Gilroy-Black.woff", "Gilroy-BlackItalic.woff", "Gilroy-Bold.woff", "Gilroy-BoldItalic.woff", "Gilroy-ExtraBold.woff", "Gilroy-ExtraBoldItalic.woff", "Gilroy-Light.woff", "Gilroy-LightItalic.woff", "Gilroy-Medium.woff", "Gilroy-MediumItalic.woff", "Gilroy-Regular.woff", "Gilroy-RegularItalic.woff", "Gilroy-SemiBold.woff", "Gilroy-SemiBoldItalic.woff", "Gilroy-Thin.woff", "Gilroy-ThinItalic.woff", "Gilroy-UltraLight.woff", "Gilroy-UltraLightItalic.woff"]),
  mimeTypes: { ".svg": "image/svg+xml", ".woff": "font/woff" },
  _: {
    entry: { "file": "_app/immutable/start-84eecf31.js", "imports": ["_app/immutable/start-84eecf31.js", "_app/immutable/chunks/index-2288207f.js", "_app/immutable/chunks/singletons-c0295a0c.js", "_app/immutable/chunks/index-d6fabef0.js"], "stylesheets": [] },
    nodes: [
      () => Promise.resolve().then(() => (init__(), __exports)),
      () => Promise.resolve().then(() => (init__2(), __exports2)),
      () => Promise.resolve().then(() => (init__3(), __exports3)),
      () => Promise.resolve().then(() => (init__4(), __exports4)),
      () => Promise.resolve().then(() => (init__5(), __exports5)),
      () => Promise.resolve().then(() => (init__6(), __exports6)),
      () => Promise.resolve().then(() => (init__7(), __exports7)),
      () => Promise.resolve().then(() => (init__8(), __exports8)),
      () => Promise.resolve().then(() => (init__9(), __exports9)),
      () => Promise.resolve().then(() => (init__10(), __exports10)),
      () => Promise.resolve().then(() => (init__11(), __exports11)),
      () => Promise.resolve().then(() => (init__12(), __exports12)),
      () => Promise.resolve().then(() => (init__13(), __exports13)),
      () => Promise.resolve().then(() => (init__14(), __exports14)),
      () => Promise.resolve().then(() => (init__15(), __exports15))
    ],
    routes: [
      {
        id: "",
        pattern: /^\/$/,
        names: [],
        types: [],
        page: { "layouts": [0], "errors": [1], "leaf": 4 },
        endpoint: null
      },
      {
        id: "profile",
        pattern: /^\/profile\/?$/,
        names: [],
        types: [],
        page: { "layouts": [0], "errors": [1], "leaf": 6 },
        endpoint: null
      },
      {
        id: "rank",
        pattern: /^\/rank\/?$/,
        names: [],
        types: [],
        page: { "layouts": [0], "errors": [1], "leaf": 11 },
        endpoint: null
      },
      {
        id: "profile/player",
        pattern: /^\/profile\/player\/?$/,
        names: [],
        types: [],
        page: { "layouts": [0], "errors": [1], "leaf": 7 },
        endpoint: null
      },
      {
        id: "profile/team",
        pattern: /^\/profile\/team\/?$/,
        names: [],
        types: [],
        page: { "layouts": [0], "errors": [1], "leaf": 9 },
        endpoint: null
      },
      {
        id: "rank/player",
        pattern: /^\/rank\/player\/?$/,
        names: [],
        types: [],
        page: { "layouts": [0], "errors": [1], "leaf": 12 },
        endpoint: null
      },
      {
        id: "rank/team",
        pattern: /^\/rank\/team\/?$/,
        names: [],
        types: [],
        page: { "layouts": [0], "errors": [1], "leaf": 13 },
        endpoint: null
      },
      {
        id: "profile/player/[playerID]",
        pattern: /^\/profile\/player\/([^/]+?)\/?$/,
        names: ["playerID"],
        types: [null],
        page: { "layouts": [0, 2], "errors": [1, null], "leaf": 8 },
        endpoint: null
      },
      {
        id: "profile/team/[teamID]",
        pattern: /^\/profile\/team\/([^/]+?)\/?$/,
        names: ["teamID"],
        types: [null],
        page: { "layouts": [0, 3], "errors": [1, null], "leaf": 10 },
        endpoint: null
      },
      {
        id: "news/[newsID]",
        pattern: /^\/news\/([^/]+?)\/?$/,
        names: ["newsID"],
        types: [null],
        page: { "layouts": [0], "errors": [1], "leaf": 5 },
        endpoint: null
      },
      {
        id: "videos/[videoID]",
        pattern: /^\/videos\/([^/]+?)\/?$/,
        names: ["videoID"],
        types: [null],
        page: { "layouts": [0], "errors": [1], "leaf": 14 },
        endpoint: null
      }
    ],
    matchers: async () => {
      return {};
    }
  }
};
var prerendered = /* @__PURE__ */ new Map([]);

// .svelte-kit/cloudflare-workers-tmp/entry.js
var import_kv_asset_handler = __toESM(require_dist());
import static_asset_manifest_json from "__STATIC_CONTENT_MANIFEST";
var static_asset_manifest = JSON.parse(static_asset_manifest_json);
var server = new Server(manifest);
var prefix = `/${manifest.appDir}/`;
var entry_default = {
  async fetch(req, env, context) {
    await server.init({ env });
    const url = new URL(req.url);
    if (url.pathname.startsWith(prefix)) {
      const res = await get_asset_from_kv(req, env, context);
      if (is_error(res.status))
        return res;
      const cache_control = url.pathname.startsWith(prefix + "immutable/") ? "public, immutable, max-age=31536000" : "no-cache";
      return new Response(res.body, {
        headers: {
          "cache-control": cache_control,
          "content-type": res.headers.get("content-type"),
          "x-robots-tag": "noindex"
        }
      });
    }
    const pathname = url.pathname.replace(/\/$/, "");
    let file16 = pathname.substring(1);
    try {
      file16 = decodeURIComponent(file16);
    } catch (err) {
    }
    if (manifest.assets.has(file16) || manifest.assets.has(file16 + "/index.html") || prerendered.has(pathname || "/")) {
      return get_asset_from_kv(req, env, context, (request, options) => {
        if (prerendered.has(pathname || "/")) {
          url.pathname = "/" + prerendered.get(pathname || "/").file;
          return new Request(url.toString(), request);
        }
        return (0, import_kv_asset_handler.mapRequestToAsset)(request, options);
      });
    }
    return await server.respond(req, {
      platform: { env, context, caches },
      getClientAddress() {
        return req.headers.get("cf-connecting-ip");
      }
    });
  }
};
async function get_asset_from_kv(req, env, context, map = import_kv_asset_handler.mapRequestToAsset) {
  return await (0, import_kv_asset_handler.getAssetFromKV)(
    {
      request: req,
      waitUntil(promise) {
        return context.waitUntil(promise);
      }
    },
    {
      ASSET_NAMESPACE: env.__STATIC_CONTENT,
      ASSET_MANIFEST: static_asset_manifest,
      mapRequestToAsset: map
    }
  );
}
function is_error(status) {
  return status > 399;
}
export {
  entry_default as default
};
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
//# sourceMappingURL=worker.js.map
