import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import http, { Server as Server$1 } from 'node:http';
import https, { Server } from 'node:https';
import { promises, existsSync } from 'fs';
import { dirname as dirname$1, resolve as resolve$2, join } from 'path';
import { toValue } from 'vue';
import { createConsola as createConsola$1 } from 'consola/core';
import { promises as promises$1 } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { getIcons } from '@iconify/utils';

const suspectProtoRx = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
const suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
const JsonSigRx = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function jsonParseTransform(key, value) {
  if (key === "__proto__" || key === "constructor" && value && typeof value === "object" && "prototype" in value) {
    warnKeyDropped(key);
    return;
  }
  return value;
}
function warnKeyDropped(key) {
  console.warn(`[destr] Dropping "${key}" key to prevent prototype pollution.`);
}
function destr(value, options = {}) {
  if (typeof value !== "string") {
    return value;
  }
  const _value = value.trim();
  if (
    // eslint-disable-next-line unicorn/prefer-at
    value[0] === '"' && value.endsWith('"') && !value.includes("\\")
  ) {
    return _value.slice(1, -1);
  }
  if (_value.length <= 9) {
    const _lval = _value.toLowerCase();
    if (_lval === "true") {
      return true;
    }
    if (_lval === "false") {
      return false;
    }
    if (_lval === "undefined") {
      return void 0;
    }
    if (_lval === "null") {
      return null;
    }
    if (_lval === "nan") {
      return Number.NaN;
    }
    if (_lval === "infinity") {
      return Number.POSITIVE_INFINITY;
    }
    if (_lval === "-infinity") {
      return Number.NEGATIVE_INFINITY;
    }
  }
  if (!JsonSigRx.test(value)) {
    if (options.strict) {
      throw new SyntaxError("[destr] Invalid JSON");
    }
    return value;
  }
  try {
    if (suspectProtoRx.test(value) || suspectConstructorRx.test(value)) {
      if (options.strict) {
        throw new Error("[destr] Possible prototype pollution");
      }
      return JSON.parse(value, jsonParseTransform);
    }
    return JSON.parse(value);
  } catch (error) {
    if (options.strict) {
      throw error;
    }
    return value;
  }
}

const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const IM_RE = /\?/g;
const PLUS_RE = /\+/g;
const ENC_CARET_RE = /%5e/gi;
const ENC_BACKTICK_RE = /%60/gi;
const ENC_PIPE_RE = /%7c/gi;
const ENC_SPACE_RE = /%20/gi;
const ENC_SLASH_RE = /%2f/gi;
const ENC_ENC_SLASH_RE = /%252f/gi;
function encode(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|");
}
function encodeQueryValue(input) {
  return encode(typeof input === "string" ? input : JSON.stringify(input)).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CARET_RE, "^").replace(SLASH_RE, "%2F");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function encodePath(text) {
  return encode(text).replace(HASH_RE, "%23").replace(IM_RE, "%3F").replace(ENC_ENC_SLASH_RE, "%2F").replace(AMPERSAND_RE, "%26").replace(PLUS_RE, "%2B");
}
function decode(text = "") {
  try {
    return decodeURIComponent("" + text);
  } catch {
    return "" + text;
  }
}
function decodePath(text) {
  return decode(text.replace(ENC_SLASH_RE, "%252F"));
}
function decodeQueryKey(text) {
  return decode(text.replace(PLUS_RE, " "));
}
function decodeQueryValue(text) {
  return decode(text.replace(PLUS_RE, " "));
}

function parseQuery(parametersString = "") {
  const object = {};
  if (parametersString[0] === "?") {
    parametersString = parametersString.slice(1);
  }
  for (const parameter of parametersString.split("&")) {
    const s = parameter.match(/([^=]+)=?(.*)/) || [];
    if (s.length < 2) {
      continue;
    }
    const key = decodeQueryKey(s[1]);
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = decodeQueryValue(s[2] || "");
    if (object[key] === void 0) {
      object[key] = value;
    } else if (Array.isArray(object[key])) {
      object[key].push(value);
    } else {
      object[key] = [object[key], value];
    }
  }
  return object;
}
function encodeQueryItem(key, value) {
  if (typeof value === "number" || typeof value === "boolean") {
    value = String(value);
  }
  if (!value) {
    return encodeQueryKey(key);
  }
  if (Array.isArray(value)) {
    return value.map((_value) => `${encodeQueryKey(key)}=${encodeQueryValue(_value)}`).join("&");
  }
  return `${encodeQueryKey(key)}=${encodeQueryValue(value)}`;
}
function stringifyQuery(query) {
  return Object.keys(query).filter((k) => query[k] !== void 0).map((k) => encodeQueryItem(k, query[k])).filter(Boolean).join("&");
}

const PROTOCOL_STRICT_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/;
const PROTOCOL_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{2})?/;
const PROTOCOL_RELATIVE_REGEX = /^([/\\]\s*){2,}[^/\\]/;
const JOIN_LEADING_SLASH_RE = /^\.?\//;
function hasProtocol(inputString, opts = {}) {
  if (typeof opts === "boolean") {
    opts = { acceptRelative: opts };
  }
  if (opts.strict) {
    return PROTOCOL_STRICT_REGEX.test(inputString);
  }
  return PROTOCOL_REGEX.test(inputString) || (opts.acceptRelative ? PROTOCOL_RELATIVE_REGEX.test(inputString) : false);
}
function hasTrailingSlash(input = "", respectQueryAndFragment) {
  {
    return input.endsWith("/");
  }
}
function withoutTrailingSlash(input = "", respectQueryAndFragment) {
  {
    return (hasTrailingSlash(input) ? input.slice(0, -1) : input) || "/";
  }
}
function withTrailingSlash(input = "", respectQueryAndFragment) {
  {
    return input.endsWith("/") ? input : input + "/";
  }
}
function hasLeadingSlash(input = "") {
  return input.startsWith("/");
}
function withLeadingSlash(input = "") {
  return hasLeadingSlash(input) ? input : "/" + input;
}
function withBase(input, base) {
  if (isEmptyURL(base) || hasProtocol(input)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (input.startsWith(_base)) {
    return input;
  }
  return joinURL(_base, input);
}
function withoutBase(input, base) {
  if (isEmptyURL(base)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (!input.startsWith(_base)) {
    return input;
  }
  const trimmed = input.slice(_base.length);
  return trimmed[0] === "/" ? trimmed : "/" + trimmed;
}
function withQuery(input, query) {
  const parsed = parseURL(input);
  const mergedQuery = { ...parseQuery(parsed.search), ...query };
  parsed.search = stringifyQuery(mergedQuery);
  return stringifyParsedURL(parsed);
}
function getQuery$1(input) {
  return parseQuery(parseURL(input).search);
}
function isEmptyURL(url) {
  return !url || url === "/";
}
function isNonEmptyURL(url) {
  return url && url !== "/";
}
function joinURL(base, ...input) {
  let url = base || "";
  for (const segment of input.filter((url2) => isNonEmptyURL(url2))) {
    if (url) {
      const _segment = segment.replace(JOIN_LEADING_SLASH_RE, "");
      url = withTrailingSlash(url) + _segment;
    } else {
      url = segment;
    }
  }
  return url;
}
function joinRelativeURL(..._input) {
  const JOIN_SEGMENT_SPLIT_RE = /\/(?!\/)/;
  const input = _input.filter(Boolean);
  const segments = [];
  let segmentsDepth = 0;
  for (const i of input) {
    if (!i || i === "/") {
      continue;
    }
    for (const [sindex, s] of i.split(JOIN_SEGMENT_SPLIT_RE).entries()) {
      if (!s || s === ".") {
        continue;
      }
      if (s === "..") {
        if (segments.length === 1 && hasProtocol(segments[0])) {
          continue;
        }
        segments.pop();
        segmentsDepth--;
        continue;
      }
      if (sindex === 1 && segments[segments.length - 1]?.endsWith(":/")) {
        segments[segments.length - 1] += "/" + s;
        continue;
      }
      segments.push(s);
      segmentsDepth++;
    }
  }
  let url = segments.join("/");
  if (segmentsDepth >= 0) {
    if (input[0]?.startsWith("/") && !url.startsWith("/")) {
      url = "/" + url;
    } else if (input[0]?.startsWith("./") && !url.startsWith("./")) {
      url = "./" + url;
    }
  } else {
    url = "../".repeat(-1 * segmentsDepth) + url;
  }
  if (input[input.length - 1]?.endsWith("/") && !url.endsWith("/")) {
    url += "/";
  }
  return url;
}
function withHttps(input) {
  return withProtocol(input, "https://");
}
function withProtocol(input, protocol) {
  let match = input.match(PROTOCOL_REGEX);
  if (!match) {
    match = input.match(/^\/{2,}/);
  }
  if (!match) {
    return protocol + input;
  }
  return protocol + input.slice(match[0].length);
}

const protocolRelative = Symbol.for("ufo:protocolRelative");
function parseURL(input = "", defaultProto) {
  const _specialProtoMatch = input.match(
    /^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i
  );
  if (_specialProtoMatch) {
    const [, _proto, _pathname = ""] = _specialProtoMatch;
    return {
      protocol: _proto.toLowerCase(),
      pathname: _pathname,
      href: _proto + _pathname,
      auth: "",
      host: "",
      search: "",
      hash: ""
    };
  }
  if (!hasProtocol(input, { acceptRelative: true })) {
    return defaultProto ? parseURL(defaultProto + input) : parsePath(input);
  }
  const [, protocol = "", auth, hostAndPath = ""] = input.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  let [, host = "", path = ""] = hostAndPath.match(/([^#/?]*)(.*)?/) || [];
  if (protocol === "file:") {
    path = path.replace(/\/(?=[A-Za-z]:)/, "");
  }
  const { pathname, search, hash } = parsePath(path);
  return {
    protocol: protocol.toLowerCase(),
    auth: auth ? auth.slice(0, Math.max(0, auth.length - 1)) : "",
    host,
    pathname,
    search,
    hash,
    [protocolRelative]: !protocol
  };
}
function parsePath(input = "") {
  const [pathname = "", search = "", hash = ""] = (input.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname,
    search,
    hash
  };
}
function stringifyParsedURL(parsed) {
  const pathname = parsed.pathname || "";
  const search = parsed.search ? (parsed.search.startsWith("?") ? "" : "?") + parsed.search : "";
  const hash = parsed.hash || "";
  const auth = parsed.auth ? parsed.auth + "@" : "";
  const host = parsed.host || "";
  const proto = parsed.protocol || parsed[protocolRelative] ? (parsed.protocol || "") + "//" : "";
  return proto + auth + host + pathname + search + hash;
}

const defaults = Object.freeze({
  ignoreUnknown: false,
  respectType: false,
  respectFunctionNames: false,
  respectFunctionProperties: false,
  unorderedObjects: true,
  unorderedArrays: false,
  unorderedSets: false,
  excludeKeys: void 0,
  excludeValues: void 0,
  replacer: void 0
});
function objectHash(object, options) {
  if (options) {
    options = { ...defaults, ...options };
  } else {
    options = defaults;
  }
  const hasher = createHasher(options);
  hasher.dispatch(object);
  return hasher.toString();
}
const defaultPrototypesKeys = Object.freeze([
  "prototype",
  "__proto__",
  "constructor"
]);
function createHasher(options) {
  let buff = "";
  let context = /* @__PURE__ */ new Map();
  const write = (str) => {
    buff += str;
  };
  return {
    toString() {
      return buff;
    },
    getContext() {
      return context;
    },
    dispatch(value) {
      if (options.replacer) {
        value = options.replacer(value);
      }
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    },
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      if (objectLength < 10) {
        objType = "unknown:[" + objString + "]";
      } else {
        objType = objString.slice(8, objectLength - 1);
      }
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = context.get(object)) === void 0) {
        context.set(object, context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        write("buffer:");
        return write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else if (!options.ignoreUnknown) {
          this.unkown(object, objType);
        }
      } else {
        let keys = Object.keys(object);
        if (options.unorderedObjects) {
          keys = keys.sort();
        }
        let extraKeys = [];
        if (options.respectType !== false && !isNativeFunction(object)) {
          extraKeys = defaultPrototypesKeys;
        }
        if (options.excludeKeys) {
          keys = keys.filter((key) => {
            return !options.excludeKeys(key);
          });
          extraKeys = extraKeys.filter((key) => {
            return !options.excludeKeys(key);
          });
        }
        write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          write(":");
          if (!options.excludeValues) {
            this.dispatch(object[key]);
          }
          write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    },
    array(arr, unordered) {
      unordered = unordered === void 0 ? options.unorderedArrays !== false : unordered;
      write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = createHasher(options);
        hasher.dispatch(entry);
        for (const [key, value] of hasher.getContext()) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    },
    date(date) {
      return write("date:" + date.toJSON());
    },
    symbol(sym) {
      return write("symbol:" + sym.toString());
    },
    unkown(value, type) {
      write(type);
      if (!value) {
        return;
      }
      write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          Array.from(value.entries()),
          true
          /* ordered */
        );
      }
    },
    error(err) {
      return write("error:" + err.toString());
    },
    boolean(bool) {
      return write("bool:" + bool);
    },
    string(string) {
      write("string:" + string.length + ":");
      write(string);
    },
    function(fn) {
      write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
      if (options.respectFunctionNames !== false) {
        this.dispatch("function-name:" + String(fn.name));
      }
      if (options.respectFunctionProperties) {
        this.object(fn);
      }
    },
    number(number) {
      return write("number:" + number);
    },
    xml(xml) {
      return write("xml:" + xml.toString());
    },
    null() {
      return write("Null");
    },
    undefined() {
      return write("Undefined");
    },
    regexp(regex) {
      return write("regex:" + regex.toString());
    },
    uint8array(arr) {
      write("uint8array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    uint8clampedarray(arr) {
      write("uint8clampedarray:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    int8array(arr) {
      write("int8array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    uint16array(arr) {
      write("uint16array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    int16array(arr) {
      write("int16array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    uint32array(arr) {
      write("uint32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    int32array(arr) {
      write("int32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    float32array(arr) {
      write("float32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    float64array(arr) {
      write("float64array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    arraybuffer(arr) {
      write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    },
    url(url) {
      return write("url:" + url.toString());
    },
    map(map) {
      write("map:");
      const arr = [...map];
      return this.array(arr, options.unorderedSets !== false);
    },
    set(set) {
      write("set:");
      const arr = [...set];
      return this.array(arr, options.unorderedSets !== false);
    },
    file(file) {
      write("file:");
      return this.dispatch([file.name, file.size, file.type, file.lastModfied]);
    },
    blob() {
      if (options.ignoreUnknown) {
        return write("[blob]");
      }
      throw new Error(
        'Hashing Blob objects is currently not supported\nUse "options.replacer" or "options.ignoreUnknown"\n'
      );
    },
    domwindow() {
      return write("domwindow");
    },
    bigint(number) {
      return write("bigint:" + number.toString());
    },
    /* Node.js standard native objects */
    process() {
      return write("process");
    },
    timer() {
      return write("timer");
    },
    pipe() {
      return write("pipe");
    },
    tcp() {
      return write("tcp");
    },
    udp() {
      return write("udp");
    },
    tty() {
      return write("tty");
    },
    statwatcher() {
      return write("statwatcher");
    },
    securecontext() {
      return write("securecontext");
    },
    connection() {
      return write("connection");
    },
    zlib() {
      return write("zlib");
    },
    context() {
      return write("context");
    },
    nodescript() {
      return write("nodescript");
    },
    httpparser() {
      return write("httpparser");
    },
    dataview() {
      return write("dataview");
    },
    signal() {
      return write("signal");
    },
    fsevent() {
      return write("fsevent");
    },
    tlswrap() {
      return write("tlswrap");
    }
  };
}
const nativeFunc = "[native code] }";
const nativeFuncLength = nativeFunc.length;
function isNativeFunction(f) {
  if (typeof f !== "function") {
    return false;
  }
  return Function.prototype.toString.call(f).slice(-nativeFuncLength) === nativeFunc;
}

var __defProp$1 = Object.defineProperty;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$1 = (obj, key, value) => {
  __defNormalProp$1(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class WordArray {
  constructor(words, sigBytes) {
    __publicField$1(this, "words");
    __publicField$1(this, "sigBytes");
    words = this.words = words || [];
    this.sigBytes = sigBytes === void 0 ? words.length * 4 : sigBytes;
  }
  toString(encoder) {
    return (encoder || Hex).stringify(this);
  }
  concat(wordArray) {
    this.clamp();
    if (this.sigBytes % 4) {
      for (let i = 0; i < wordArray.sigBytes; i++) {
        const thatByte = wordArray.words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
        this.words[this.sigBytes + i >>> 2] |= thatByte << 24 - (this.sigBytes + i) % 4 * 8;
      }
    } else {
      for (let j = 0; j < wordArray.sigBytes; j += 4) {
        this.words[this.sigBytes + j >>> 2] = wordArray.words[j >>> 2];
      }
    }
    this.sigBytes += wordArray.sigBytes;
    return this;
  }
  clamp() {
    this.words[this.sigBytes >>> 2] &= 4294967295 << 32 - this.sigBytes % 4 * 8;
    this.words.length = Math.ceil(this.sigBytes / 4);
  }
  clone() {
    return new WordArray([...this.words]);
  }
}
const Hex = {
  stringify(wordArray) {
    const hexChars = [];
    for (let i = 0; i < wordArray.sigBytes; i++) {
      const bite = wordArray.words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
      hexChars.push((bite >>> 4).toString(16), (bite & 15).toString(16));
    }
    return hexChars.join("");
  }
};
const Base64 = {
  stringify(wordArray) {
    const keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const base64Chars = [];
    for (let i = 0; i < wordArray.sigBytes; i += 3) {
      const byte1 = wordArray.words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
      const byte2 = wordArray.words[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 255;
      const byte3 = wordArray.words[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 255;
      const triplet = byte1 << 16 | byte2 << 8 | byte3;
      for (let j = 0; j < 4 && i * 8 + j * 6 < wordArray.sigBytes * 8; j++) {
        base64Chars.push(keyStr.charAt(triplet >>> 6 * (3 - j) & 63));
      }
    }
    return base64Chars.join("");
  }
};
const Latin1 = {
  parse(latin1Str) {
    const latin1StrLength = latin1Str.length;
    const words = [];
    for (let i = 0; i < latin1StrLength; i++) {
      words[i >>> 2] |= (latin1Str.charCodeAt(i) & 255) << 24 - i % 4 * 8;
    }
    return new WordArray(words, latin1StrLength);
  }
};
const Utf8 = {
  parse(utf8Str) {
    return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
  }
};
class BufferedBlockAlgorithm {
  constructor() {
    __publicField$1(this, "_data", new WordArray());
    __publicField$1(this, "_nDataBytes", 0);
    __publicField$1(this, "_minBufferSize", 0);
    __publicField$1(this, "blockSize", 512 / 32);
  }
  reset() {
    this._data = new WordArray();
    this._nDataBytes = 0;
  }
  _append(data) {
    if (typeof data === "string") {
      data = Utf8.parse(data);
    }
    this._data.concat(data);
    this._nDataBytes += data.sigBytes;
  }
  _doProcessBlock(_dataWords, _offset) {
  }
  _process(doFlush) {
    let processedWords;
    let nBlocksReady = this._data.sigBytes / (this.blockSize * 4);
    if (doFlush) {
      nBlocksReady = Math.ceil(nBlocksReady);
    } else {
      nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
    }
    const nWordsReady = nBlocksReady * this.blockSize;
    const nBytesReady = Math.min(nWordsReady * 4, this._data.sigBytes);
    if (nWordsReady) {
      for (let offset = 0; offset < nWordsReady; offset += this.blockSize) {
        this._doProcessBlock(this._data.words, offset);
      }
      processedWords = this._data.words.splice(0, nWordsReady);
      this._data.sigBytes -= nBytesReady;
    }
    return new WordArray(processedWords, nBytesReady);
  }
}
class Hasher extends BufferedBlockAlgorithm {
  update(messageUpdate) {
    this._append(messageUpdate);
    this._process();
    return this;
  }
  finalize(messageUpdate) {
    if (messageUpdate) {
      this._append(messageUpdate);
    }
  }
}

var __defProp$3 = Object.defineProperty;
var __defNormalProp$3 = (obj, key, value) => key in obj ? __defProp$3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$3 = (obj, key, value) => {
  __defNormalProp$3(obj, key + "" , value);
  return value;
};
const H = [
  1779033703,
  -1150833019,
  1013904242,
  -1521486534,
  1359893119,
  -1694144372,
  528734635,
  1541459225
];
const K = [
  1116352408,
  1899447441,
  -1245643825,
  -373957723,
  961987163,
  1508970993,
  -1841331548,
  -1424204075,
  -670586216,
  310598401,
  607225278,
  1426881987,
  1925078388,
  -2132889090,
  -1680079193,
  -1046744716,
  -459576895,
  -272742522,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  -1740746414,
  -1473132947,
  -1341970488,
  -1084653625,
  -958395405,
  -710438585,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  -2117940946,
  -1838011259,
  -1564481375,
  -1474664885,
  -1035236496,
  -949202525,
  -778901479,
  -694614492,
  -200395387,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  -2067236844,
  -1933114872,
  -1866530822,
  -1538233109,
  -1090935817,
  -965641998
];
const W = [];
class SHA256 extends Hasher {
  constructor() {
    super(...arguments);
    __publicField$3(this, "_hash", new WordArray([...H]));
  }
  /**
   * Resets the internal state of the hash object to initial values.
   */
  reset() {
    super.reset();
    this._hash = new WordArray([...H]);
  }
  _doProcessBlock(M, offset) {
    const H2 = this._hash.words;
    let a = H2[0];
    let b = H2[1];
    let c = H2[2];
    let d = H2[3];
    let e = H2[4];
    let f = H2[5];
    let g = H2[6];
    let h = H2[7];
    for (let i = 0; i < 64; i++) {
      if (i < 16) {
        W[i] = M[offset + i] | 0;
      } else {
        const gamma0x = W[i - 15];
        const gamma0 = (gamma0x << 25 | gamma0x >>> 7) ^ (gamma0x << 14 | gamma0x >>> 18) ^ gamma0x >>> 3;
        const gamma1x = W[i - 2];
        const gamma1 = (gamma1x << 15 | gamma1x >>> 17) ^ (gamma1x << 13 | gamma1x >>> 19) ^ gamma1x >>> 10;
        W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
      }
      const ch = e & f ^ ~e & g;
      const maj = a & b ^ a & c ^ b & c;
      const sigma0 = (a << 30 | a >>> 2) ^ (a << 19 | a >>> 13) ^ (a << 10 | a >>> 22);
      const sigma1 = (e << 26 | e >>> 6) ^ (e << 21 | e >>> 11) ^ (e << 7 | e >>> 25);
      const t1 = h + sigma1 + ch + K[i] + W[i];
      const t2 = sigma0 + maj;
      h = g;
      g = f;
      f = e;
      e = d + t1 | 0;
      d = c;
      c = b;
      b = a;
      a = t1 + t2 | 0;
    }
    H2[0] = H2[0] + a | 0;
    H2[1] = H2[1] + b | 0;
    H2[2] = H2[2] + c | 0;
    H2[3] = H2[3] + d | 0;
    H2[4] = H2[4] + e | 0;
    H2[5] = H2[5] + f | 0;
    H2[6] = H2[6] + g | 0;
    H2[7] = H2[7] + h | 0;
  }
  /**
   * Finishes the hash calculation and returns the hash as a WordArray.
   *
   * @param {string} messageUpdate - Additional message content to include in the hash.
   * @returns {WordArray} The finalised hash as a WordArray.
   */
  finalize(messageUpdate) {
    super.finalize(messageUpdate);
    const nBitsTotal = this._nDataBytes * 8;
    const nBitsLeft = this._data.sigBytes * 8;
    this._data.words[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
    this._data.words[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math.floor(
      nBitsTotal / 4294967296
    );
    this._data.words[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
    this._data.sigBytes = this._data.words.length * 4;
    this._process();
    return this._hash;
  }
}
function sha256base64(message) {
  return new SHA256().finalize(message).toString(Base64);
}

function hash(object, options = {}) {
  const hashed = typeof object === "string" ? object : objectHash(object, options);
  return sha256base64(hashed).slice(0, 10);
}

const NODE_TYPES = {
  NORMAL: 0,
  WILDCARD: 1,
  PLACEHOLDER: 2
};

function createRouter$1(options = {}) {
  const ctx = {
    options,
    rootNode: createRadixNode(),
    staticRoutesMap: {}
  };
  const normalizeTrailingSlash = (p) => options.strictTrailingSlash ? p : p.replace(/\/$/, "") || "/";
  if (options.routes) {
    for (const path in options.routes) {
      insert(ctx, normalizeTrailingSlash(path), options.routes[path]);
    }
  }
  return {
    ctx,
    lookup: (path) => lookup(ctx, normalizeTrailingSlash(path)),
    insert: (path, data) => insert(ctx, normalizeTrailingSlash(path), data),
    remove: (path) => remove(ctx, normalizeTrailingSlash(path))
  };
}
function lookup(ctx, path) {
  const staticPathNode = ctx.staticRoutesMap[path];
  if (staticPathNode) {
    return staticPathNode.data;
  }
  const sections = path.split("/");
  const params = {};
  let paramsFound = false;
  let wildcardNode = null;
  let node = ctx.rootNode;
  let wildCardParam = null;
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    if (node.wildcardChildNode !== null) {
      wildcardNode = node.wildcardChildNode;
      wildCardParam = sections.slice(i).join("/");
    }
    const nextNode = node.children.get(section);
    if (nextNode === void 0) {
      if (node && node.placeholderChildren.length > 1) {
        const remaining = sections.length - i;
        node = node.placeholderChildren.find((c) => c.maxDepth === remaining) || null;
      } else {
        node = node.placeholderChildren[0] || null;
      }
      if (!node) {
        break;
      }
      if (node.paramName) {
        params[node.paramName] = section;
      }
      paramsFound = true;
    } else {
      node = nextNode;
    }
  }
  if ((node === null || node.data === null) && wildcardNode !== null) {
    node = wildcardNode;
    params[node.paramName || "_"] = wildCardParam;
    paramsFound = true;
  }
  if (!node) {
    return null;
  }
  if (paramsFound) {
    return {
      ...node.data,
      params: paramsFound ? params : void 0
    };
  }
  return node.data;
}
function insert(ctx, path, data) {
  let isStaticRoute = true;
  const sections = path.split("/");
  let node = ctx.rootNode;
  let _unnamedPlaceholderCtr = 0;
  const matchedNodes = [node];
  for (const section of sections) {
    let childNode;
    if (childNode = node.children.get(section)) {
      node = childNode;
    } else {
      const type = getNodeType(section);
      childNode = createRadixNode({ type, parent: node });
      node.children.set(section, childNode);
      if (type === NODE_TYPES.PLACEHOLDER) {
        childNode.paramName = section === "*" ? `_${_unnamedPlaceholderCtr++}` : section.slice(1);
        node.placeholderChildren.push(childNode);
        isStaticRoute = false;
      } else if (type === NODE_TYPES.WILDCARD) {
        node.wildcardChildNode = childNode;
        childNode.paramName = section.slice(
          3
          /* "**:" */
        ) || "_";
        isStaticRoute = false;
      }
      matchedNodes.push(childNode);
      node = childNode;
    }
  }
  for (const [depth, node2] of matchedNodes.entries()) {
    node2.maxDepth = Math.max(matchedNodes.length - depth, node2.maxDepth || 0);
  }
  node.data = data;
  if (isStaticRoute === true) {
    ctx.staticRoutesMap[path] = node;
  }
  return node;
}
function remove(ctx, path) {
  let success = false;
  const sections = path.split("/");
  let node = ctx.rootNode;
  for (const section of sections) {
    node = node.children.get(section);
    if (!node) {
      return success;
    }
  }
  if (node.data) {
    const lastSection = sections.at(-1) || "";
    node.data = null;
    if (Object.keys(node.children).length === 0 && node.parent) {
      node.parent.children.delete(lastSection);
      node.parent.wildcardChildNode = null;
      node.parent.placeholderChildren = [];
    }
    success = true;
  }
  return success;
}
function createRadixNode(options = {}) {
  return {
    type: options.type || NODE_TYPES.NORMAL,
    maxDepth: 0,
    parent: options.parent || null,
    children: /* @__PURE__ */ new Map(),
    data: options.data || null,
    paramName: options.paramName || null,
    wildcardChildNode: null,
    placeholderChildren: []
  };
}
function getNodeType(str) {
  if (str.startsWith("**")) {
    return NODE_TYPES.WILDCARD;
  }
  if (str[0] === ":" || str === "*") {
    return NODE_TYPES.PLACEHOLDER;
  }
  return NODE_TYPES.NORMAL;
}

function toRouteMatcher(router) {
  const table = _routerNodeToTable("", router.ctx.rootNode);
  return _createMatcher(table, router.ctx.options.strictTrailingSlash);
}
function _createMatcher(table, strictTrailingSlash) {
  return {
    ctx: { table },
    matchAll: (path) => _matchRoutes(path, table, strictTrailingSlash)
  };
}
function _createRouteTable() {
  return {
    static: /* @__PURE__ */ new Map(),
    wildcard: /* @__PURE__ */ new Map(),
    dynamic: /* @__PURE__ */ new Map()
  };
}
function _matchRoutes(path, table, strictTrailingSlash) {
  if (strictTrailingSlash !== true && path.endsWith("/")) {
    path = path.slice(0, -1) || "/";
  }
  const matches = [];
  for (const [key, value] of _sortRoutesMap(table.wildcard)) {
    if (path === key || path.startsWith(key + "/")) {
      matches.push(value);
    }
  }
  for (const [key, value] of _sortRoutesMap(table.dynamic)) {
    if (path.startsWith(key + "/")) {
      const subPath = "/" + path.slice(key.length).split("/").splice(2).join("/");
      matches.push(..._matchRoutes(subPath, value));
    }
  }
  const staticMatch = table.static.get(path);
  if (staticMatch) {
    matches.push(staticMatch);
  }
  return matches.filter(Boolean);
}
function _sortRoutesMap(m) {
  return [...m.entries()].sort((a, b) => a[0].length - b[0].length);
}
function _routerNodeToTable(initialPath, initialNode) {
  const table = _createRouteTable();
  function _addNode(path, node) {
    if (path) {
      if (node.type === NODE_TYPES.NORMAL && !(path.includes("*") || path.includes(":"))) {
        if (node.data) {
          table.static.set(path, node.data);
        }
      } else if (node.type === NODE_TYPES.WILDCARD) {
        table.wildcard.set(path.replace("/**", ""), node.data);
      } else if (node.type === NODE_TYPES.PLACEHOLDER) {
        const subTable = _routerNodeToTable("", node);
        if (node.data) {
          subTable.static.set("/", node.data);
        }
        table.dynamic.set(path.replace(/\/\*|\/:\w+/, ""), subTable);
        return;
      }
    }
    for (const [childPath, child] of node.children.entries()) {
      _addNode(`${path}/${childPath}`.replace("//", "/"), child);
    }
  }
  _addNode(initialPath, initialNode);
  return table;
}

function isPlainObject(value) {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== null && prototype !== Object.prototype && Object.getPrototypeOf(prototype) !== null) {
    return false;
  }
  if (Symbol.iterator in value) {
    return false;
  }
  if (Symbol.toStringTag in value) {
    return Object.prototype.toString.call(value) === "[object Module]";
  }
  return true;
}

function _defu(baseObject, defaults, namespace = ".", merger) {
  if (!isPlainObject(defaults)) {
    return _defu(baseObject, {}, namespace, merger);
  }
  const object = Object.assign({}, defaults);
  for (const key in baseObject) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === void 0) {
      continue;
    }
    if (merger && merger(object, key, value, namespace)) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isPlainObject(value) && isPlainObject(object[key])) {
      object[key] = _defu(
        value,
        object[key],
        (namespace ? `${namespace}.` : "") + key.toString(),
        merger
      );
    } else {
      object[key] = value;
    }
  }
  return object;
}
function createDefu(merger) {
  return (...arguments_) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p, c) => _defu(p, c, "", merger), {})
  );
}
const defu = createDefu();
const defuFn = createDefu((object, key, currentValue) => {
  if (object[key] !== void 0 && typeof currentValue === "function") {
    object[key] = currentValue(object[key]);
    return true;
  }
});

function rawHeaders(headers) {
  const rawHeaders2 = [];
  for (const key in headers) {
    if (Array.isArray(headers[key])) {
      for (const h of headers[key]) {
        rawHeaders2.push(key, h);
      }
    } else {
      rawHeaders2.push(key, headers[key]);
    }
  }
  return rawHeaders2;
}
function mergeFns(...functions) {
  return function(...args) {
    for (const fn of functions) {
      fn(...args);
    }
  };
}
function createNotImplementedError(name) {
  throw new Error(`[unenv] ${name} is not implemented yet!`);
}

let defaultMaxListeners = 10;
let EventEmitter$1 = class EventEmitter {
  __unenv__ = true;
  _events = /* @__PURE__ */ Object.create(null);
  _maxListeners;
  static get defaultMaxListeners() {
    return defaultMaxListeners;
  }
  static set defaultMaxListeners(arg) {
    if (typeof arg !== "number" || arg < 0 || Number.isNaN(arg)) {
      throw new RangeError(
        'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + "."
      );
    }
    defaultMaxListeners = arg;
  }
  setMaxListeners(n) {
    if (typeof n !== "number" || n < 0 || Number.isNaN(n)) {
      throw new RangeError(
        'The value of "n" is out of range. It must be a non-negative number. Received ' + n + "."
      );
    }
    this._maxListeners = n;
    return this;
  }
  getMaxListeners() {
    return _getMaxListeners(this);
  }
  emit(type, ...args) {
    if (!this._events[type] || this._events[type].length === 0) {
      return false;
    }
    if (type === "error") {
      let er;
      if (args.length > 0) {
        er = args[0];
      }
      if (er instanceof Error) {
        throw er;
      }
      const err = new Error(
        "Unhandled error." + (er ? " (" + er.message + ")" : "")
      );
      err.context = er;
      throw err;
    }
    for (const _listener of this._events[type]) {
      (_listener.listener || _listener).apply(this, args);
    }
    return true;
  }
  addListener(type, listener) {
    return _addListener(this, type, listener, false);
  }
  on(type, listener) {
    return _addListener(this, type, listener, false);
  }
  prependListener(type, listener) {
    return _addListener(this, type, listener, true);
  }
  once(type, listener) {
    return this.on(type, _wrapOnce(this, type, listener));
  }
  prependOnceListener(type, listener) {
    return this.prependListener(type, _wrapOnce(this, type, listener));
  }
  removeListener(type, listener) {
    return _removeListener(this, type, listener);
  }
  off(type, listener) {
    return this.removeListener(type, listener);
  }
  removeAllListeners(type) {
    return _removeAllListeners(this, type);
  }
  listeners(type) {
    return _listeners(this, type, true);
  }
  rawListeners(type) {
    return _listeners(this, type, false);
  }
  listenerCount(type) {
    return this.rawListeners(type).length;
  }
  eventNames() {
    return Object.keys(this._events);
  }
};
function _addListener(target, type, listener, prepend) {
  _checkListener(listener);
  if (target._events.newListener !== void 0) {
    target.emit("newListener", type, listener.listener || listener);
  }
  if (!target._events[type]) {
    target._events[type] = [];
  }
  if (prepend) {
    target._events[type].unshift(listener);
  } else {
    target._events[type].push(listener);
  }
  const maxListeners = _getMaxListeners(target);
  if (maxListeners > 0 && target._events[type].length > maxListeners && !target._events[type].warned) {
    target._events[type].warned = true;
    const warning = new Error(
      `[unenv] Possible EventEmitter memory leak detected. ${target._events[type].length} ${type} listeners added. Use emitter.setMaxListeners() to increase limit`
    );
    warning.name = "MaxListenersExceededWarning";
    warning.emitter = target;
    warning.type = type;
    warning.count = target._events[type]?.length;
    console.warn(warning);
  }
  return target;
}
function _removeListener(target, type, listener) {
  _checkListener(listener);
  if (!target._events[type] || target._events[type].length === 0) {
    return target;
  }
  const lenBeforeFilter = target._events[type].length;
  target._events[type] = target._events[type].filter((fn) => fn !== listener);
  if (lenBeforeFilter === target._events[type].length) {
    return target;
  }
  if (target._events.removeListener) {
    target.emit("removeListener", type, listener.listener || listener);
  }
  if (target._events[type].length === 0) {
    delete target._events[type];
  }
  return target;
}
function _removeAllListeners(target, type) {
  if (!target._events[type] || target._events[type].length === 0) {
    return target;
  }
  if (target._events.removeListener) {
    for (const _listener of target._events[type]) {
      target.emit("removeListener", type, _listener.listener || _listener);
    }
  }
  delete target._events[type];
  return target;
}
function _wrapOnce(target, type, listener) {
  let fired = false;
  const wrapper = (...args) => {
    if (fired) {
      return;
    }
    target.removeListener(type, wrapper);
    fired = true;
    return args.length === 0 ? listener.call(target) : listener.apply(target, args);
  };
  wrapper.listener = listener;
  return wrapper;
}
function _getMaxListeners(target) {
  return target._maxListeners ?? EventEmitter$1.defaultMaxListeners;
}
function _listeners(target, type, unwrap) {
  let listeners = target._events[type];
  if (typeof listeners === "function") {
    listeners = [listeners];
  }
  return unwrap ? listeners.map((l) => l.listener || l) : listeners;
}
function _checkListener(listener) {
  if (typeof listener !== "function") {
    throw new TypeError(
      'The "listener" argument must be of type Function. Received type ' + typeof listener
    );
  }
}

const EventEmitter = globalThis.EventEmitter || EventEmitter$1;

class _Readable extends EventEmitter {
  __unenv__ = true;
  readableEncoding = null;
  readableEnded = true;
  readableFlowing = false;
  readableHighWaterMark = 0;
  readableLength = 0;
  readableObjectMode = false;
  readableAborted = false;
  readableDidRead = false;
  closed = false;
  errored = null;
  readable = false;
  destroyed = false;
  static from(_iterable, options) {
    return new _Readable(options);
  }
  constructor(_opts) {
    super();
  }
  _read(_size) {
  }
  read(_size) {
  }
  setEncoding(_encoding) {
    return this;
  }
  pause() {
    return this;
  }
  resume() {
    return this;
  }
  isPaused() {
    return true;
  }
  unpipe(_destination) {
    return this;
  }
  unshift(_chunk, _encoding) {
  }
  wrap(_oldStream) {
    return this;
  }
  push(_chunk, _encoding) {
    return false;
  }
  _destroy(_error, _callback) {
    this.removeAllListeners();
  }
  destroy(error) {
    this.destroyed = true;
    this._destroy(error);
    return this;
  }
  pipe(_destenition, _options) {
    return {};
  }
  compose(stream, options) {
    throw new Error("[unenv] Method not implemented.");
  }
  [Symbol.asyncDispose]() {
    this.destroy();
    return Promise.resolve();
  }
  // eslint-disable-next-line require-yield
  async *[Symbol.asyncIterator]() {
    throw createNotImplementedError("Readable.asyncIterator");
  }
  iterator(options) {
    throw createNotImplementedError("Readable.iterator");
  }
  map(fn, options) {
    throw createNotImplementedError("Readable.map");
  }
  filter(fn, options) {
    throw createNotImplementedError("Readable.filter");
  }
  forEach(fn, options) {
    throw createNotImplementedError("Readable.forEach");
  }
  reduce(fn, initialValue, options) {
    throw createNotImplementedError("Readable.reduce");
  }
  find(fn, options) {
    throw createNotImplementedError("Readable.find");
  }
  findIndex(fn, options) {
    throw createNotImplementedError("Readable.findIndex");
  }
  some(fn, options) {
    throw createNotImplementedError("Readable.some");
  }
  toArray(options) {
    throw createNotImplementedError("Readable.toArray");
  }
  every(fn, options) {
    throw createNotImplementedError("Readable.every");
  }
  flatMap(fn, options) {
    throw createNotImplementedError("Readable.flatMap");
  }
  drop(limit, options) {
    throw createNotImplementedError("Readable.drop");
  }
  take(limit, options) {
    throw createNotImplementedError("Readable.take");
  }
  asIndexedPairs(options) {
    throw createNotImplementedError("Readable.asIndexedPairs");
  }
}
const Readable = globalThis.Readable || _Readable;

class _Writable extends EventEmitter {
  __unenv__ = true;
  writable = true;
  writableEnded = false;
  writableFinished = false;
  writableHighWaterMark = 0;
  writableLength = 0;
  writableObjectMode = false;
  writableCorked = 0;
  closed = false;
  errored = null;
  writableNeedDrain = false;
  destroyed = false;
  _data;
  _encoding = "utf-8";
  constructor(_opts) {
    super();
  }
  pipe(_destenition, _options) {
    return {};
  }
  _write(chunk, encoding, callback) {
    if (this.writableEnded) {
      if (callback) {
        callback();
      }
      return;
    }
    if (this._data === void 0) {
      this._data = chunk;
    } else {
      const a = typeof this._data === "string" ? Buffer.from(this._data, this._encoding || encoding || "utf8") : this._data;
      const b = typeof chunk === "string" ? Buffer.from(chunk, encoding || this._encoding || "utf8") : chunk;
      this._data = Buffer.concat([a, b]);
    }
    this._encoding = encoding;
    if (callback) {
      callback();
    }
  }
  _writev(_chunks, _callback) {
  }
  _destroy(_error, _callback) {
  }
  _final(_callback) {
  }
  write(chunk, arg2, arg3) {
    const encoding = typeof arg2 === "string" ? this._encoding : "utf-8";
    const cb = typeof arg2 === "function" ? arg2 : typeof arg3 === "function" ? arg3 : void 0;
    this._write(chunk, encoding, cb);
    return true;
  }
  setDefaultEncoding(_encoding) {
    return this;
  }
  end(arg1, arg2, arg3) {
    const callback = typeof arg1 === "function" ? arg1 : typeof arg2 === "function" ? arg2 : typeof arg3 === "function" ? arg3 : void 0;
    if (this.writableEnded) {
      if (callback) {
        callback();
      }
      return this;
    }
    const data = arg1 === callback ? void 0 : arg1;
    if (data) {
      const encoding = arg2 === callback ? void 0 : arg2;
      this.write(data, encoding, callback);
    }
    this.writableEnded = true;
    this.writableFinished = true;
    this.emit("close");
    this.emit("finish");
    return this;
  }
  cork() {
  }
  uncork() {
  }
  destroy(_error) {
    this.destroyed = true;
    delete this._data;
    this.removeAllListeners();
    return this;
  }
  compose(stream, options) {
    throw new Error("[h3] Method not implemented.");
  }
}
const Writable = globalThis.Writable || _Writable;

const __Duplex = class {
  allowHalfOpen = true;
  _destroy;
  constructor(readable = new Readable(), writable = new Writable()) {
    Object.assign(this, readable);
    Object.assign(this, writable);
    this._destroy = mergeFns(readable._destroy, writable._destroy);
  }
};
function getDuplex() {
  Object.assign(__Duplex.prototype, Readable.prototype);
  Object.assign(__Duplex.prototype, Writable.prototype);
  return __Duplex;
}
const _Duplex = /* @__PURE__ */ getDuplex();
const Duplex = globalThis.Duplex || _Duplex;

class Socket extends Duplex {
  __unenv__ = true;
  bufferSize = 0;
  bytesRead = 0;
  bytesWritten = 0;
  connecting = false;
  destroyed = false;
  pending = false;
  localAddress = "";
  localPort = 0;
  remoteAddress = "";
  remoteFamily = "";
  remotePort = 0;
  autoSelectFamilyAttemptedAddresses = [];
  readyState = "readOnly";
  constructor(_options) {
    super();
  }
  write(_buffer, _arg1, _arg2) {
    return false;
  }
  connect(_arg1, _arg2, _arg3) {
    return this;
  }
  end(_arg1, _arg2, _arg3) {
    return this;
  }
  setEncoding(_encoding) {
    return this;
  }
  pause() {
    return this;
  }
  resume() {
    return this;
  }
  setTimeout(_timeout, _callback) {
    return this;
  }
  setNoDelay(_noDelay) {
    return this;
  }
  setKeepAlive(_enable, _initialDelay) {
    return this;
  }
  address() {
    return {};
  }
  unref() {
    return this;
  }
  ref() {
    return this;
  }
  destroySoon() {
    this.destroy();
  }
  resetAndDestroy() {
    const err = new Error("ERR_SOCKET_CLOSED");
    err.code = "ERR_SOCKET_CLOSED";
    this.destroy(err);
    return this;
  }
}

class IncomingMessage extends Readable {
  __unenv__ = {};
  aborted = false;
  httpVersion = "1.1";
  httpVersionMajor = 1;
  httpVersionMinor = 1;
  complete = true;
  connection;
  socket;
  headers = {};
  trailers = {};
  method = "GET";
  url = "/";
  statusCode = 200;
  statusMessage = "";
  closed = false;
  errored = null;
  readable = false;
  constructor(socket) {
    super();
    this.socket = this.connection = socket || new Socket();
  }
  get rawHeaders() {
    return rawHeaders(this.headers);
  }
  get rawTrailers() {
    return [];
  }
  setTimeout(_msecs, _callback) {
    return this;
  }
  get headersDistinct() {
    return _distinct(this.headers);
  }
  get trailersDistinct() {
    return _distinct(this.trailers);
  }
}
function _distinct(obj) {
  const d = {};
  for (const [key, value] of Object.entries(obj)) {
    if (key) {
      d[key] = (Array.isArray(value) ? value : [value]).filter(
        Boolean
      );
    }
  }
  return d;
}

class ServerResponse extends Writable {
  __unenv__ = true;
  statusCode = 200;
  statusMessage = "";
  upgrading = false;
  chunkedEncoding = false;
  shouldKeepAlive = false;
  useChunkedEncodingByDefault = false;
  sendDate = false;
  finished = false;
  headersSent = false;
  strictContentLength = false;
  connection = null;
  socket = null;
  req;
  _headers = {};
  constructor(req) {
    super();
    this.req = req;
  }
  assignSocket(socket) {
    socket._httpMessage = this;
    this.socket = socket;
    this.connection = socket;
    this.emit("socket", socket);
    this._flush();
  }
  _flush() {
    this.flushHeaders();
  }
  detachSocket(_socket) {
  }
  writeContinue(_callback) {
  }
  writeHead(statusCode, arg1, arg2) {
    if (statusCode) {
      this.statusCode = statusCode;
    }
    if (typeof arg1 === "string") {
      this.statusMessage = arg1;
      arg1 = void 0;
    }
    const headers = arg2 || arg1;
    if (headers) {
      if (Array.isArray(headers)) ; else {
        for (const key in headers) {
          this.setHeader(key, headers[key]);
        }
      }
    }
    this.headersSent = true;
    return this;
  }
  writeProcessing() {
  }
  setTimeout(_msecs, _callback) {
    return this;
  }
  appendHeader(name, value) {
    name = name.toLowerCase();
    const current = this._headers[name];
    const all = [
      ...Array.isArray(current) ? current : [current],
      ...Array.isArray(value) ? value : [value]
    ].filter(Boolean);
    this._headers[name] = all.length > 1 ? all : all[0];
    return this;
  }
  setHeader(name, value) {
    this._headers[name.toLowerCase()] = value;
    return this;
  }
  getHeader(name) {
    return this._headers[name.toLowerCase()];
  }
  getHeaders() {
    return this._headers;
  }
  getHeaderNames() {
    return Object.keys(this._headers);
  }
  hasHeader(name) {
    return name.toLowerCase() in this._headers;
  }
  removeHeader(name) {
    delete this._headers[name.toLowerCase()];
  }
  addTrailers(_headers) {
  }
  flushHeaders() {
  }
  writeEarlyHints(_headers, cb) {
    if (typeof cb === "function") {
      cb();
    }
  }
}

function hasProp(obj, prop) {
  try {
    return prop in obj;
  } catch {
    return false;
  }
}

var __defProp$2 = Object.defineProperty;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$2 = (obj, key, value) => {
  __defNormalProp$2(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class H3Error extends Error {
  constructor(message, opts = {}) {
    super(message, opts);
    __publicField$2(this, "statusCode", 500);
    __publicField$2(this, "fatal", false);
    __publicField$2(this, "unhandled", false);
    __publicField$2(this, "statusMessage");
    __publicField$2(this, "data");
    __publicField$2(this, "cause");
    if (opts.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
  toJSON() {
    const obj = {
      message: this.message,
      statusCode: sanitizeStatusCode(this.statusCode, 500)
    };
    if (this.statusMessage) {
      obj.statusMessage = sanitizeStatusMessage(this.statusMessage);
    }
    if (this.data !== void 0) {
      obj.data = this.data;
    }
    return obj;
  }
}
__publicField$2(H3Error, "__h3_error__", true);
function createError$1(input) {
  if (typeof input === "string") {
    return new H3Error(input);
  }
  if (isError(input)) {
    return input;
  }
  const err = new H3Error(input.message ?? input.statusMessage ?? "", {
    cause: input.cause || input
  });
  if (hasProp(input, "stack")) {
    try {
      Object.defineProperty(err, "stack", {
        get() {
          return input.stack;
        }
      });
    } catch {
      try {
        err.stack = input.stack;
      } catch {
      }
    }
  }
  if (input.data) {
    err.data = input.data;
  }
  if (input.statusCode) {
    err.statusCode = sanitizeStatusCode(input.statusCode, err.statusCode);
  } else if (input.status) {
    err.statusCode = sanitizeStatusCode(input.status, err.statusCode);
  }
  if (input.statusMessage) {
    err.statusMessage = input.statusMessage;
  } else if (input.statusText) {
    err.statusMessage = input.statusText;
  }
  if (err.statusMessage) {
    const originalMessage = err.statusMessage;
    const sanitizedMessage = sanitizeStatusMessage(err.statusMessage);
    if (sanitizedMessage !== originalMessage) {
      console.warn(
        "[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future, `statusMessage` will be sanitized by default."
      );
    }
  }
  if (input.fatal !== void 0) {
    err.fatal = input.fatal;
  }
  if (input.unhandled !== void 0) {
    err.unhandled = input.unhandled;
  }
  return err;
}
function sendError(event, error, debug) {
  if (event.handled) {
    return;
  }
  const h3Error = isError(error) ? error : createError$1(error);
  const responseBody = {
    statusCode: h3Error.statusCode,
    statusMessage: h3Error.statusMessage,
    stack: [],
    data: h3Error.data
  };
  if (debug) {
    responseBody.stack = (h3Error.stack || "").split("\n").map((l) => l.trim());
  }
  if (event.handled) {
    return;
  }
  const _code = Number.parseInt(h3Error.statusCode);
  setResponseStatus(event, _code, h3Error.statusMessage);
  event.node.res.setHeader("content-type", MIMES.json);
  event.node.res.end(JSON.stringify(responseBody, void 0, 2));
}
function isError(input) {
  return input?.constructor?.__h3_error__ === true;
}

function getQuery(event) {
  return getQuery$1(event.path || "");
}
function isMethod(event, expected, allowHead) {
  if (typeof expected === "string") {
    if (event.method === expected) {
      return true;
    }
  } else if (expected.includes(event.method)) {
    return true;
  }
  return false;
}
function assertMethod(event, expected, allowHead) {
  if (!isMethod(event, expected)) {
    throw createError$1({
      statusCode: 405,
      statusMessage: "HTTP method is not allowed."
    });
  }
}
function getRequestHeaders(event) {
  const _headers = {};
  for (const key in event.node.req.headers) {
    const val = event.node.req.headers[key];
    _headers[key] = Array.isArray(val) ? val.filter(Boolean).join(", ") : val;
  }
  return _headers;
}
function getRequestHeader(event, name) {
  const headers = getRequestHeaders(event);
  const value = headers[name.toLowerCase()];
  return value;
}
const getHeader = getRequestHeader;
function getRequestHost(event, opts = {}) {
  if (opts.xForwardedHost) {
    const xForwardedHost = event.node.req.headers["x-forwarded-host"];
    if (xForwardedHost) {
      return xForwardedHost;
    }
  }
  return event.node.req.headers.host || "localhost";
}
function getRequestProtocol(event, opts = {}) {
  if (opts.xForwardedProto !== false && event.node.req.headers["x-forwarded-proto"] === "https") {
    return "https";
  }
  return event.node.req.connection?.encrypted ? "https" : "http";
}
function getRequestURL(event, opts = {}) {
  const host = getRequestHost(event, opts);
  const protocol = getRequestProtocol(event, opts);
  const path = (event.node.req.originalUrl || event.path).replace(
    /^[/\\]+/g,
    "/"
  );
  return new URL(path, `${protocol}://${host}`);
}

const RawBodySymbol = Symbol.for("h3RawBody");
const ParsedBodySymbol = Symbol.for("h3ParsedBody");
const PayloadMethods$1 = ["PATCH", "POST", "PUT", "DELETE"];
function readRawBody(event, encoding = "utf8") {
  assertMethod(event, PayloadMethods$1);
  const _rawBody = event._requestBody || event.web?.request?.body || event.node.req[RawBodySymbol] || event.node.req.rawBody || event.node.req.body;
  if (_rawBody) {
    const promise2 = Promise.resolve(_rawBody).then((_resolved) => {
      if (Buffer.isBuffer(_resolved)) {
        return _resolved;
      }
      if (typeof _resolved.pipeTo === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.pipeTo(
            new WritableStream({
              write(chunk) {
                chunks.push(chunk);
              },
              close() {
                resolve(Buffer.concat(chunks));
              },
              abort(reason) {
                reject(reason);
              }
            })
          ).catch(reject);
        });
      } else if (typeof _resolved.pipe === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.on("data", (chunk) => {
            chunks.push(chunk);
          }).on("end", () => {
            resolve(Buffer.concat(chunks));
          }).on("error", reject);
        });
      }
      if (_resolved.constructor === Object) {
        return Buffer.from(JSON.stringify(_resolved));
      }
      if (_resolved instanceof URLSearchParams) {
        return Buffer.from(_resolved.toString());
      }
      return Buffer.from(_resolved);
    });
    return encoding ? promise2.then((buff) => buff.toString(encoding)) : promise2;
  }
  if (!Number.parseInt(event.node.req.headers["content-length"] || "") && !String(event.node.req.headers["transfer-encoding"] ?? "").split(",").map((e) => e.trim()).filter(Boolean).includes("chunked")) {
    return Promise.resolve(void 0);
  }
  const promise = event.node.req[RawBodySymbol] = new Promise(
    (resolve, reject) => {
      const bodyData = [];
      event.node.req.on("error", (err) => {
        reject(err);
      }).on("data", (chunk) => {
        bodyData.push(chunk);
      }).on("end", () => {
        resolve(Buffer.concat(bodyData));
      });
    }
  );
  const result = encoding ? promise.then((buff) => buff.toString(encoding)) : promise;
  return result;
}
async function readBody(event, options = {}) {
  const request = event.node.req;
  if (hasProp(request, ParsedBodySymbol)) {
    return request[ParsedBodySymbol];
  }
  const contentType = request.headers["content-type"] || "";
  const body = await readRawBody(event);
  let parsed;
  if (contentType === "application/json") {
    parsed = _parseJSON(body, options.strict ?? true);
  } else if (contentType.startsWith("application/x-www-form-urlencoded")) {
    parsed = _parseURLEncodedBody(body);
  } else if (contentType.startsWith("text/")) {
    parsed = body;
  } else {
    parsed = _parseJSON(body, options.strict ?? false);
  }
  request[ParsedBodySymbol] = parsed;
  return parsed;
}
function getRequestWebStream(event) {
  if (!PayloadMethods$1.includes(event.method)) {
    return;
  }
  const bodyStream = event.web?.request?.body || event._requestBody;
  if (bodyStream) {
    return bodyStream;
  }
  const _hasRawBody = RawBodySymbol in event.node.req || "rawBody" in event.node.req || "body" in event.node.req || "__unenv__" in event.node.req;
  if (_hasRawBody) {
    return new ReadableStream({
      async start(controller) {
        const _rawBody = await readRawBody(event, false);
        if (_rawBody) {
          controller.enqueue(_rawBody);
        }
        controller.close();
      }
    });
  }
  return new ReadableStream({
    start: (controller) => {
      event.node.req.on("data", (chunk) => {
        controller.enqueue(chunk);
      });
      event.node.req.on("end", () => {
        controller.close();
      });
      event.node.req.on("error", (err) => {
        controller.error(err);
      });
    }
  });
}
function _parseJSON(body = "", strict) {
  if (!body) {
    return void 0;
  }
  try {
    return destr(body, { strict });
  } catch {
    throw createError$1({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Invalid JSON body"
    });
  }
}
function _parseURLEncodedBody(body) {
  const form = new URLSearchParams(body);
  const parsedForm = /* @__PURE__ */ Object.create(null);
  for (const [key, value] of form.entries()) {
    if (hasProp(parsedForm, key)) {
      if (!Array.isArray(parsedForm[key])) {
        parsedForm[key] = [parsedForm[key]];
      }
      parsedForm[key].push(value);
    } else {
      parsedForm[key] = value;
    }
  }
  return parsedForm;
}

function handleCacheHeaders(event, opts) {
  const cacheControls = ["public", ...opts.cacheControls || []];
  let cacheMatched = false;
  if (opts.maxAge !== void 0) {
    cacheControls.push(`max-age=${+opts.maxAge}`, `s-maxage=${+opts.maxAge}`);
  }
  if (opts.modifiedTime) {
    const modifiedTime = new Date(opts.modifiedTime);
    const ifModifiedSince = event.node.req.headers["if-modified-since"];
    event.node.res.setHeader("last-modified", modifiedTime.toUTCString());
    if (ifModifiedSince && new Date(ifModifiedSince) >= opts.modifiedTime) {
      cacheMatched = true;
    }
  }
  if (opts.etag) {
    event.node.res.setHeader("etag", opts.etag);
    const ifNonMatch = event.node.req.headers["if-none-match"];
    if (ifNonMatch === opts.etag) {
      cacheMatched = true;
    }
  }
  event.node.res.setHeader("cache-control", cacheControls.join(", "));
  if (cacheMatched) {
    event.node.res.statusCode = 304;
    if (!event.handled) {
      event.node.res.end();
    }
    return true;
  }
  return false;
}

const MIMES = {
  html: "text/html",
  json: "application/json"
};

const DISALLOWED_STATUS_CHARS = /[^\u0009\u0020-\u007E]/g;
function sanitizeStatusMessage(statusMessage = "") {
  return statusMessage.replace(DISALLOWED_STATUS_CHARS, "");
}
function sanitizeStatusCode(statusCode, defaultStatusCode = 200) {
  if (!statusCode) {
    return defaultStatusCode;
  }
  if (typeof statusCode === "string") {
    statusCode = Number.parseInt(statusCode, 10);
  }
  if (statusCode < 100 || statusCode > 999) {
    return defaultStatusCode;
  }
  return statusCode;
}
function splitCookiesString(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString.flatMap((c) => splitCookiesString(c));
  }
  if (typeof cookiesString !== "string") {
    return [];
  }
  const cookiesStrings = [];
  let pos = 0;
  let start;
  let ch;
  let lastComma;
  let nextStart;
  let cookiesSeparatorFound;
  const skipWhitespace = () => {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  };
  const notSpecialChar = () => {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  };
  while (pos < cookiesString.length) {
    start = pos;
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
          cookiesStrings.push(cookiesString.slice(start, lastComma));
          start = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.slice(start));
    }
  }
  return cookiesStrings;
}

const defer = typeof setImmediate === "undefined" ? (fn) => fn() : setImmediate;
function send(event, data, type) {
  if (type) {
    defaultContentType(event, type);
  }
  return new Promise((resolve) => {
    defer(() => {
      if (!event.handled) {
        event.node.res.end(data);
      }
      resolve();
    });
  });
}
function sendNoContent(event, code) {
  if (event.handled) {
    return;
  }
  if (!code && event.node.res.statusCode !== 200) {
    code = event.node.res.statusCode;
  }
  const _code = sanitizeStatusCode(code, 204);
  if (_code === 204) {
    event.node.res.removeHeader("content-length");
  }
  event.node.res.writeHead(_code);
  event.node.res.end();
}
function setResponseStatus(event, code, text) {
  if (code) {
    event.node.res.statusCode = sanitizeStatusCode(
      code,
      event.node.res.statusCode
    );
  }
  if (text) {
    event.node.res.statusMessage = sanitizeStatusMessage(text);
  }
}
function getResponseStatus(event) {
  return event.node.res.statusCode;
}
function getResponseStatusText(event) {
  return event.node.res.statusMessage;
}
function defaultContentType(event, type) {
  if (type && event.node.res.statusCode !== 304 && !event.node.res.getHeader("content-type")) {
    event.node.res.setHeader("content-type", type);
  }
}
function sendRedirect(event, location, code = 302) {
  event.node.res.statusCode = sanitizeStatusCode(
    code,
    event.node.res.statusCode
  );
  event.node.res.setHeader("location", location);
  const encodedLoc = location.replace(/"/g, "%22");
  const html = `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`;
  return send(event, html, MIMES.html);
}
function getResponseHeader(event, name) {
  return event.node.res.getHeader(name);
}
function setResponseHeaders(event, headers) {
  for (const [name, value] of Object.entries(headers)) {
    event.node.res.setHeader(
      name,
      value
    );
  }
}
const setHeaders = setResponseHeaders;
function setResponseHeader(event, name, value) {
  event.node.res.setHeader(name, value);
}
const setHeader = setResponseHeader;
function removeResponseHeader(event, name) {
  return event.node.res.removeHeader(name);
}
function isStream(data) {
  if (!data || typeof data !== "object") {
    return false;
  }
  if (typeof data.pipe === "function") {
    if (typeof data._read === "function") {
      return true;
    }
    if (typeof data.abort === "function") {
      return true;
    }
  }
  if (typeof data.pipeTo === "function") {
    return true;
  }
  return false;
}
function isWebResponse(data) {
  return typeof Response !== "undefined" && data instanceof Response;
}
function sendStream(event, stream) {
  if (!stream || typeof stream !== "object") {
    throw new Error("[h3] Invalid stream provided.");
  }
  event.node.res._data = stream;
  if (!event.node.res.socket) {
    event._handled = true;
    return Promise.resolve();
  }
  if (hasProp(stream, "pipeTo") && typeof stream.pipeTo === "function") {
    return stream.pipeTo(
      new WritableStream({
        write(chunk) {
          event.node.res.write(chunk);
        }
      })
    ).then(() => {
      event.node.res.end();
    });
  }
  if (hasProp(stream, "pipe") && typeof stream.pipe === "function") {
    return new Promise((resolve, reject) => {
      stream.pipe(event.node.res);
      if (stream.on) {
        stream.on("end", () => {
          event.node.res.end();
          resolve();
        });
        stream.on("error", (error) => {
          reject(error);
        });
      }
      event.node.res.on("close", () => {
        if (stream.abort) {
          stream.abort();
        }
      });
    });
  }
  throw new Error("[h3] Invalid or incompatible stream provided.");
}
function sendWebResponse(event, response) {
  for (const [key, value] of response.headers) {
    if (key === "set-cookie") {
      event.node.res.appendHeader(key, splitCookiesString(value));
    } else {
      event.node.res.setHeader(key, value);
    }
  }
  if (response.status) {
    event.node.res.statusCode = sanitizeStatusCode(
      response.status,
      event.node.res.statusCode
    );
  }
  if (response.statusText) {
    event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  }
  if (response.redirected) {
    event.node.res.setHeader("location", response.url);
  }
  if (!response.body) {
    event.node.res.end();
    return;
  }
  return sendStream(event, response.body);
}

const PayloadMethods = /* @__PURE__ */ new Set(["PATCH", "POST", "PUT", "DELETE"]);
const ignoredHeaders = /* @__PURE__ */ new Set([
  "transfer-encoding",
  "connection",
  "keep-alive",
  "upgrade",
  "expect",
  "host",
  "accept"
]);
async function proxyRequest(event, target, opts = {}) {
  let body;
  let duplex;
  if (PayloadMethods.has(event.method)) {
    if (opts.streamRequest) {
      body = getRequestWebStream(event);
      duplex = "half";
    } else {
      body = await readRawBody(event, false).catch(() => void 0);
    }
  }
  const method = opts.fetchOptions?.method || event.method;
  const fetchHeaders = mergeHeaders$1(
    getProxyRequestHeaders(event),
    opts.fetchOptions?.headers,
    opts.headers
  );
  return sendProxy(event, target, {
    ...opts,
    fetchOptions: {
      method,
      body,
      duplex,
      ...opts.fetchOptions,
      headers: fetchHeaders
    }
  });
}
async function sendProxy(event, target, opts = {}) {
  let response;
  try {
    response = await _getFetch(opts.fetch)(target, {
      headers: opts.headers,
      ignoreResponseError: true,
      // make $ofetch.raw transparent
      ...opts.fetchOptions
    });
  } catch (error) {
    throw createError$1({
      status: 502,
      statusMessage: "Bad Gateway",
      cause: error
    });
  }
  event.node.res.statusCode = sanitizeStatusCode(
    response.status,
    event.node.res.statusCode
  );
  event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  const cookies = [];
  for (const [key, value] of response.headers.entries()) {
    if (key === "content-encoding") {
      continue;
    }
    if (key === "content-length") {
      continue;
    }
    if (key === "set-cookie") {
      cookies.push(...splitCookiesString(value));
      continue;
    }
    event.node.res.setHeader(key, value);
  }
  if (cookies.length > 0) {
    event.node.res.setHeader(
      "set-cookie",
      cookies.map((cookie) => {
        if (opts.cookieDomainRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookieDomainRewrite,
            "domain"
          );
        }
        if (opts.cookiePathRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookiePathRewrite,
            "path"
          );
        }
        return cookie;
      })
    );
  }
  if (opts.onResponse) {
    await opts.onResponse(event, response);
  }
  if (response._data !== void 0) {
    return response._data;
  }
  if (event.handled) {
    return;
  }
  if (opts.sendStream === false) {
    const data = new Uint8Array(await response.arrayBuffer());
    return event.node.res.end(data);
  }
  if (response.body) {
    for await (const chunk of response.body) {
      event.node.res.write(chunk);
    }
  }
  return event.node.res.end();
}
function getProxyRequestHeaders(event) {
  const headers = /* @__PURE__ */ Object.create(null);
  const reqHeaders = getRequestHeaders(event);
  for (const name in reqHeaders) {
    if (!ignoredHeaders.has(name)) {
      headers[name] = reqHeaders[name];
    }
  }
  return headers;
}
function fetchWithEvent(event, req, init, options) {
  return _getFetch(options?.fetch)(req, {
    ...init,
    context: init?.context || event.context,
    headers: {
      ...getProxyRequestHeaders(event),
      ...init?.headers
    }
  });
}
function _getFetch(_fetch) {
  if (_fetch) {
    return _fetch;
  }
  if (globalThis.fetch) {
    return globalThis.fetch;
  }
  throw new Error(
    "fetch is not available. Try importing `node-fetch-native/polyfill` for Node.js."
  );
}
function rewriteCookieProperty(header, map, property) {
  const _map = typeof map === "string" ? { "*": map } : map;
  return header.replace(
    new RegExp(`(;\\s*${property}=)([^;]+)`, "gi"),
    (match, prefix, previousValue) => {
      let newValue;
      if (previousValue in _map) {
        newValue = _map[previousValue];
      } else if ("*" in _map) {
        newValue = _map["*"];
      } else {
        return match;
      }
      return newValue ? prefix + newValue : "";
    }
  );
}
function mergeHeaders$1(defaults, ...inputs) {
  const _inputs = inputs.filter(Boolean);
  if (_inputs.length === 0) {
    return defaults;
  }
  const merged = new Headers(defaults);
  for (const input of _inputs) {
    for (const [key, value] of Object.entries(input)) {
      if (value !== void 0) {
        merged.set(key, value);
      }
    }
  }
  return merged;
}

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class H3Event {
  constructor(req, res) {
    __publicField(this, "__is_event__", true);
    // Context
    __publicField(this, "node");
    // Node
    __publicField(this, "web");
    // Web
    __publicField(this, "context", {});
    // Shared
    // Request
    __publicField(this, "_method");
    __publicField(this, "_path");
    __publicField(this, "_headers");
    __publicField(this, "_requestBody");
    // Response
    __publicField(this, "_handled", false);
    // Hooks
    __publicField(this, "_onBeforeResponseCalled");
    __publicField(this, "_onAfterResponseCalled");
    this.node = { req, res };
  }
  // --- Request ---
  get method() {
    if (!this._method) {
      this._method = (this.node.req.method || "GET").toUpperCase();
    }
    return this._method;
  }
  get path() {
    return this._path || this.node.req.url || "/";
  }
  get headers() {
    if (!this._headers) {
      this._headers = _normalizeNodeHeaders(this.node.req.headers);
    }
    return this._headers;
  }
  // --- Respoonse ---
  get handled() {
    return this._handled || this.node.res.writableEnded || this.node.res.headersSent;
  }
  respondWith(response) {
    return Promise.resolve(response).then(
      (_response) => sendWebResponse(this, _response)
    );
  }
  // --- Utils ---
  toString() {
    return `[${this.method}] ${this.path}`;
  }
  toJSON() {
    return this.toString();
  }
  // --- Deprecated ---
  /** @deprecated Please use `event.node.req` instead. */
  get req() {
    return this.node.req;
  }
  /** @deprecated Please use `event.node.res` instead. */
  get res() {
    return this.node.res;
  }
}
function isEvent(input) {
  return hasProp(input, "__is_event__");
}
function createEvent(req, res) {
  return new H3Event(req, res);
}
function _normalizeNodeHeaders(nodeHeaders) {
  const headers = new Headers();
  for (const [name, value] of Object.entries(nodeHeaders)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        headers.append(name, item);
      }
    } else if (value) {
      headers.set(name, value);
    }
  }
  return headers;
}

function defineEventHandler(handler) {
  if (typeof handler === "function") {
    handler.__is_handler__ = true;
    return handler;
  }
  const _hooks = {
    onRequest: _normalizeArray(handler.onRequest),
    onBeforeResponse: _normalizeArray(handler.onBeforeResponse)
  };
  const _handler = (event) => {
    return _callHandler(event, handler.handler, _hooks);
  };
  _handler.__is_handler__ = true;
  _handler.__resolve__ = handler.handler.__resolve__;
  _handler.__websocket__ = handler.websocket;
  return _handler;
}
function _normalizeArray(input) {
  return input ? Array.isArray(input) ? input : [input] : void 0;
}
async function _callHandler(event, handler, hooks) {
  if (hooks.onRequest) {
    for (const hook of hooks.onRequest) {
      await hook(event);
      if (event.handled) {
        return;
      }
    }
  }
  const body = await handler(event);
  const response = { body };
  if (hooks.onBeforeResponse) {
    for (const hook of hooks.onBeforeResponse) {
      await hook(event, response);
    }
  }
  return response.body;
}
const eventHandler = defineEventHandler;
function isEventHandler(input) {
  return hasProp(input, "__is_handler__");
}
function toEventHandler(input, _, _route) {
  if (!isEventHandler(input)) {
    console.warn(
      "[h3] Implicit event handler conversion is deprecated. Use `eventHandler()` or `fromNodeMiddleware()` to define event handlers.",
      _route && _route !== "/" ? `
     Route: ${_route}` : "",
      `
     Handler: ${input}`
    );
  }
  return input;
}
function defineLazyEventHandler(factory) {
  let _promise;
  let _resolved;
  const resolveHandler = () => {
    if (_resolved) {
      return Promise.resolve(_resolved);
    }
    if (!_promise) {
      _promise = Promise.resolve(factory()).then((r) => {
        const handler2 = r.default || r;
        if (typeof handler2 !== "function") {
          throw new TypeError(
            "Invalid lazy handler result. It should be a function:",
            handler2
          );
        }
        _resolved = { handler: toEventHandler(r.default || r) };
        return _resolved;
      });
    }
    return _promise;
  };
  const handler = eventHandler((event) => {
    if (_resolved) {
      return _resolved.handler(event);
    }
    return resolveHandler().then((r) => r.handler(event));
  });
  handler.__resolve__ = resolveHandler;
  return handler;
}
const lazyEventHandler = defineLazyEventHandler;

function createApp(options = {}) {
  const stack = [];
  const handler = createAppEventHandler(stack, options);
  const resolve = createResolver(stack);
  handler.__resolve__ = resolve;
  const getWebsocket = cachedFn(() => websocketOptions(resolve, options));
  const app = {
    // @ts-expect-error
    use: (arg1, arg2, arg3) => use(app, arg1, arg2, arg3),
    resolve,
    handler,
    stack,
    options,
    get websocket() {
      return getWebsocket();
    }
  };
  return app;
}
function use(app, arg1, arg2, arg3) {
  if (Array.isArray(arg1)) {
    for (const i of arg1) {
      use(app, i, arg2, arg3);
    }
  } else if (Array.isArray(arg2)) {
    for (const i of arg2) {
      use(app, arg1, i, arg3);
    }
  } else if (typeof arg1 === "string") {
    app.stack.push(
      normalizeLayer({ ...arg3, route: arg1, handler: arg2 })
    );
  } else if (typeof arg1 === "function") {
    app.stack.push(normalizeLayer({ ...arg2, handler: arg1 }));
  } else {
    app.stack.push(normalizeLayer({ ...arg1 }));
  }
  return app;
}
function createAppEventHandler(stack, options) {
  const spacing = options.debug ? 2 : void 0;
  return eventHandler(async (event) => {
    event.node.req.originalUrl = event.node.req.originalUrl || event.node.req.url || "/";
    const _reqPath = event._path || event.node.req.url || "/";
    let _layerPath;
    if (options.onRequest) {
      await options.onRequest(event);
    }
    for (const layer of stack) {
      if (layer.route.length > 1) {
        if (!_reqPath.startsWith(layer.route)) {
          continue;
        }
        _layerPath = _reqPath.slice(layer.route.length) || "/";
      } else {
        _layerPath = _reqPath;
      }
      if (layer.match && !layer.match(_layerPath, event)) {
        continue;
      }
      event._path = _layerPath;
      event.node.req.url = _layerPath;
      const val = await layer.handler(event);
      const _body = val === void 0 ? void 0 : await val;
      if (_body !== void 0) {
        const _response = { body: _body };
        if (options.onBeforeResponse) {
          event._onBeforeResponseCalled = true;
          await options.onBeforeResponse(event, _response);
        }
        await handleHandlerResponse(event, _response.body, spacing);
        if (options.onAfterResponse) {
          event._onAfterResponseCalled = true;
          await options.onAfterResponse(event, _response);
        }
        return;
      }
      if (event.handled) {
        if (options.onAfterResponse) {
          event._onAfterResponseCalled = true;
          await options.onAfterResponse(event, void 0);
        }
        return;
      }
    }
    if (!event.handled) {
      throw createError$1({
        statusCode: 404,
        statusMessage: `Cannot find any path matching ${event.path || "/"}.`
      });
    }
    if (options.onAfterResponse) {
      event._onAfterResponseCalled = true;
      await options.onAfterResponse(event, void 0);
    }
  });
}
function createResolver(stack) {
  return async (path) => {
    let _layerPath;
    for (const layer of stack) {
      if (layer.route === "/" && !layer.handler.__resolve__) {
        continue;
      }
      if (!path.startsWith(layer.route)) {
        continue;
      }
      _layerPath = path.slice(layer.route.length) || "/";
      if (layer.match && !layer.match(_layerPath, void 0)) {
        continue;
      }
      let res = { route: layer.route, handler: layer.handler };
      if (res.handler.__resolve__) {
        const _res = await res.handler.__resolve__(_layerPath);
        if (!_res) {
          continue;
        }
        res = {
          ...res,
          ..._res,
          route: joinURL(res.route || "/", _res.route || "/")
        };
      }
      return res;
    }
  };
}
function normalizeLayer(input) {
  let handler = input.handler;
  if (handler.handler) {
    handler = handler.handler;
  }
  if (input.lazy) {
    handler = lazyEventHandler(handler);
  } else if (!isEventHandler(handler)) {
    handler = toEventHandler(handler, void 0, input.route);
  }
  return {
    route: withoutTrailingSlash(input.route),
    match: input.match,
    handler
  };
}
function handleHandlerResponse(event, val, jsonSpace) {
  if (val === null) {
    return sendNoContent(event);
  }
  if (val) {
    if (isWebResponse(val)) {
      return sendWebResponse(event, val);
    }
    if (isStream(val)) {
      return sendStream(event, val);
    }
    if (val.buffer) {
      return send(event, val);
    }
    if (val.arrayBuffer && typeof val.arrayBuffer === "function") {
      return val.arrayBuffer().then((arrayBuffer) => {
        return send(event, Buffer.from(arrayBuffer), val.type);
      });
    }
    if (val instanceof Error) {
      throw createError$1(val);
    }
    if (typeof val.end === "function") {
      return true;
    }
  }
  const valType = typeof val;
  if (valType === "string") {
    return send(event, val, MIMES.html);
  }
  if (valType === "object" || valType === "boolean" || valType === "number") {
    return send(event, JSON.stringify(val, void 0, jsonSpace), MIMES.json);
  }
  if (valType === "bigint") {
    return send(event, val.toString(), MIMES.json);
  }
  throw createError$1({
    statusCode: 500,
    statusMessage: `[h3] Cannot send ${valType} as response.`
  });
}
function cachedFn(fn) {
  let cache;
  return () => {
    if (!cache) {
      cache = fn();
    }
    return cache;
  };
}
function websocketOptions(evResolver, appOptions) {
  return {
    ...appOptions.websocket,
    async resolve(info) {
      const url = info.request?.url || info.url || "/";
      const { pathname } = typeof url === "string" ? parseURL(url) : url;
      const resolved = await evResolver(pathname);
      return resolved?.handler?.__websocket__ || {};
    }
  };
}

const RouterMethods = [
  "connect",
  "delete",
  "get",
  "head",
  "options",
  "post",
  "put",
  "trace",
  "patch"
];
function createRouter(opts = {}) {
  const _router = createRouter$1({});
  const routes = {};
  let _matcher;
  const router = {};
  const addRoute = (path, handler, method) => {
    let route = routes[path];
    if (!route) {
      routes[path] = route = { path, handlers: {} };
      _router.insert(path, route);
    }
    if (Array.isArray(method)) {
      for (const m of method) {
        addRoute(path, handler, m);
      }
    } else {
      route.handlers[method] = toEventHandler(handler, void 0, path);
    }
    return router;
  };
  router.use = router.add = (path, handler, method) => addRoute(path, handler, method || "all");
  for (const method of RouterMethods) {
    router[method] = (path, handle) => router.add(path, handle, method);
  }
  const matchHandler = (path = "/", method = "get") => {
    const qIndex = path.indexOf("?");
    if (qIndex !== -1) {
      path = path.slice(0, Math.max(0, qIndex));
    }
    const matched = _router.lookup(path);
    if (!matched || !matched.handlers) {
      return {
        error: createError$1({
          statusCode: 404,
          name: "Not Found",
          statusMessage: `Cannot find any route matching ${path || "/"}.`
        })
      };
    }
    let handler = matched.handlers[method] || matched.handlers.all;
    if (!handler) {
      if (!_matcher) {
        _matcher = toRouteMatcher(_router);
      }
      const _matches = _matcher.matchAll(path).reverse();
      for (const _match of _matches) {
        if (_match.handlers[method]) {
          handler = _match.handlers[method];
          matched.handlers[method] = matched.handlers[method] || handler;
          break;
        }
        if (_match.handlers.all) {
          handler = _match.handlers.all;
          matched.handlers.all = matched.handlers.all || handler;
          break;
        }
      }
    }
    if (!handler) {
      return {
        error: createError$1({
          statusCode: 405,
          name: "Method Not Allowed",
          statusMessage: `Method ${method} is not allowed on this route.`
        })
      };
    }
    return { matched, handler };
  };
  const isPreemptive = opts.preemptive || opts.preemtive;
  router.handler = eventHandler((event) => {
    const match = matchHandler(
      event.path,
      event.method.toLowerCase()
    );
    if ("error" in match) {
      if (isPreemptive) {
        throw match.error;
      } else {
        return;
      }
    }
    event.context.matchedRoute = match.matched;
    const params = match.matched.params || {};
    event.context.params = params;
    return Promise.resolve(match.handler(event)).then((res) => {
      if (res === void 0 && isPreemptive) {
        return null;
      }
      return res;
    });
  });
  router.handler.__resolve__ = async (path) => {
    path = withLeadingSlash(path);
    const match = matchHandler(path);
    if ("error" in match) {
      return;
    }
    let res = {
      route: match.matched.path,
      handler: match.handler
    };
    if (match.handler.__resolve__) {
      const _res = await match.handler.__resolve__(path);
      if (!_res) {
        return;
      }
      res = { ...res, ..._res };
    }
    return res;
  };
  return router;
}
function toNodeListener(app) {
  const toNodeHandle = async function(req, res) {
    const event = createEvent(req, res);
    try {
      await app.handler(event);
    } catch (_error) {
      const error = createError$1(_error);
      if (!isError(_error)) {
        error.unhandled = true;
      }
      setResponseStatus(event, error.statusCode, error.statusMessage);
      if (app.options.onError) {
        await app.options.onError(error, event);
      }
      if (event.handled) {
        return;
      }
      if (error.unhandled || error.fatal) {
        console.error("[h3]", error.fatal ? "[fatal]" : "[unhandled]", error);
      }
      if (app.options.onBeforeResponse && !event._onBeforeResponseCalled) {
        await app.options.onBeforeResponse(event, { body: error });
      }
      await sendError(event, error, !!app.options.debug);
      if (app.options.onAfterResponse && !event._onAfterResponseCalled) {
        await app.options.onAfterResponse(event, { body: error });
      }
    }
  };
  return toNodeHandle;
}

const s=globalThis.Headers,i=globalThis.AbortController,l=globalThis.fetch||(()=>{throw new Error("[node-fetch-native] Failed to fetch: `globalThis.fetch` is not available!")});

class FetchError extends Error {
  constructor(message, opts) {
    super(message, opts);
    this.name = "FetchError";
    if (opts?.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
}
function createFetchError(ctx) {
  const errorMessage = ctx.error?.message || ctx.error?.toString() || "";
  const method = ctx.request?.method || ctx.options?.method || "GET";
  const url = ctx.request?.url || String(ctx.request) || "/";
  const requestStr = `[${method}] ${JSON.stringify(url)}`;
  const statusStr = ctx.response ? `${ctx.response.status} ${ctx.response.statusText}` : "<no response>";
  const message = `${requestStr}: ${statusStr}${errorMessage ? ` ${errorMessage}` : ""}`;
  const fetchError = new FetchError(
    message,
    ctx.error ? { cause: ctx.error } : void 0
  );
  for (const key of ["request", "options", "response"]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx[key];
      }
    });
  }
  for (const [key, refKey] of [
    ["data", "_data"],
    ["status", "status"],
    ["statusCode", "status"],
    ["statusText", "statusText"],
    ["statusMessage", "statusText"]
  ]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx.response && ctx.response[refKey];
      }
    });
  }
  return fetchError;
}

const payloadMethods = new Set(
  Object.freeze(["PATCH", "POST", "PUT", "DELETE"])
);
function isPayloadMethod(method = "GET") {
  return payloadMethods.has(method.toUpperCase());
}
function isJSONSerializable(value) {
  if (value === void 0) {
    return false;
  }
  const t = typeof value;
  if (t === "string" || t === "number" || t === "boolean" || t === null) {
    return true;
  }
  if (t !== "object") {
    return false;
  }
  if (Array.isArray(value)) {
    return true;
  }
  if (value.buffer) {
    return false;
  }
  return value.constructor && value.constructor.name === "Object" || typeof value.toJSON === "function";
}
const textTypes = /* @__PURE__ */ new Set([
  "image/svg",
  "application/xml",
  "application/xhtml",
  "application/html"
]);
const JSON_RE = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function detectResponseType(_contentType = "") {
  if (!_contentType) {
    return "json";
  }
  const contentType = _contentType.split(";").shift() || "";
  if (JSON_RE.test(contentType)) {
    return "json";
  }
  if (textTypes.has(contentType) || contentType.startsWith("text/")) {
    return "text";
  }
  return "blob";
}
function resolveFetchOptions(request, input, defaults, Headers) {
  const headers = mergeHeaders(
    input?.headers ?? request?.headers,
    defaults?.headers,
    Headers
  );
  let query;
  if (defaults?.query || defaults?.params || input?.params || input?.query) {
    query = {
      ...defaults?.params,
      ...defaults?.query,
      ...input?.params,
      ...input?.query
    };
  }
  return {
    ...defaults,
    ...input,
    query,
    params: query,
    headers
  };
}
function mergeHeaders(input, defaults, Headers) {
  if (!defaults) {
    return new Headers(input);
  }
  const headers = new Headers(defaults);
  if (input) {
    for (const [key, value] of Symbol.iterator in input || Array.isArray(input) ? input : new Headers(input)) {
      headers.set(key, value);
    }
  }
  return headers;
}
async function callHooks(context, hooks) {
  if (hooks) {
    if (Array.isArray(hooks)) {
      for (const hook of hooks) {
        await hook(context);
      }
    } else {
      await hooks(context);
    }
  }
}

const retryStatusCodes = /* @__PURE__ */ new Set([
  408,
  // Request Timeout
  409,
  // Conflict
  425,
  // Too Early (Experimental)
  429,
  // Too Many Requests
  500,
  // Internal Server Error
  502,
  // Bad Gateway
  503,
  // Service Unavailable
  504
  // Gateway Timeout
]);
const nullBodyResponses$1 = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function createFetch$1(globalOptions = {}) {
  const {
    fetch = globalThis.fetch,
    Headers = globalThis.Headers,
    AbortController = globalThis.AbortController
  } = globalOptions;
  async function onError(context) {
    const isAbort = context.error && context.error.name === "AbortError" && !context.options.timeout || false;
    if (context.options.retry !== false && !isAbort) {
      let retries;
      if (typeof context.options.retry === "number") {
        retries = context.options.retry;
      } else {
        retries = isPayloadMethod(context.options.method) ? 0 : 1;
      }
      const responseCode = context.response && context.response.status || 500;
      if (retries > 0 && (Array.isArray(context.options.retryStatusCodes) ? context.options.retryStatusCodes.includes(responseCode) : retryStatusCodes.has(responseCode))) {
        const retryDelay = typeof context.options.retryDelay === "function" ? context.options.retryDelay(context) : context.options.retryDelay || 0;
        if (retryDelay > 0) {
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
        return $fetchRaw(context.request, {
          ...context.options,
          retry: retries - 1
        });
      }
    }
    const error = createFetchError(context);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(error, $fetchRaw);
    }
    throw error;
  }
  const $fetchRaw = async function $fetchRaw2(_request, _options = {}) {
    const context = {
      request: _request,
      options: resolveFetchOptions(
        _request,
        _options,
        globalOptions.defaults,
        Headers
      ),
      response: void 0,
      error: void 0
    };
    if (context.options.method) {
      context.options.method = context.options.method.toUpperCase();
    }
    if (context.options.onRequest) {
      await callHooks(context, context.options.onRequest);
    }
    if (typeof context.request === "string") {
      if (context.options.baseURL) {
        context.request = withBase(context.request, context.options.baseURL);
      }
      if (context.options.query) {
        context.request = withQuery(context.request, context.options.query);
        delete context.options.query;
      }
      if ("query" in context.options) {
        delete context.options.query;
      }
      if ("params" in context.options) {
        delete context.options.params;
      }
    }
    if (context.options.body && isPayloadMethod(context.options.method)) {
      if (isJSONSerializable(context.options.body)) {
        context.options.body = typeof context.options.body === "string" ? context.options.body : JSON.stringify(context.options.body);
        context.options.headers = new Headers(context.options.headers || {});
        if (!context.options.headers.has("content-type")) {
          context.options.headers.set("content-type", "application/json");
        }
        if (!context.options.headers.has("accept")) {
          context.options.headers.set("accept", "application/json");
        }
      } else if (
        // ReadableStream Body
        "pipeTo" in context.options.body && typeof context.options.body.pipeTo === "function" || // Node.js Stream Body
        typeof context.options.body.pipe === "function"
      ) {
        if (!("duplex" in context.options)) {
          context.options.duplex = "half";
        }
      }
    }
    let abortTimeout;
    if (!context.options.signal && context.options.timeout) {
      const controller = new AbortController();
      abortTimeout = setTimeout(() => {
        const error = new Error(
          "[TimeoutError]: The operation was aborted due to timeout"
        );
        error.name = "TimeoutError";
        error.code = 23;
        controller.abort(error);
      }, context.options.timeout);
      context.options.signal = controller.signal;
    }
    try {
      context.response = await fetch(
        context.request,
        context.options
      );
    } catch (error) {
      context.error = error;
      if (context.options.onRequestError) {
        await callHooks(
          context,
          context.options.onRequestError
        );
      }
      return await onError(context);
    } finally {
      if (abortTimeout) {
        clearTimeout(abortTimeout);
      }
    }
    const hasBody = (context.response.body || // https://github.com/unjs/ofetch/issues/324
    // https://github.com/unjs/ofetch/issues/294
    // https://github.com/JakeChampion/fetch/issues/1454
    context.response._bodyInit) && !nullBodyResponses$1.has(context.response.status) && context.options.method !== "HEAD";
    if (hasBody) {
      const responseType = (context.options.parseResponse ? "json" : context.options.responseType) || detectResponseType(context.response.headers.get("content-type") || "");
      switch (responseType) {
        case "json": {
          const data = await context.response.text();
          const parseFunction = context.options.parseResponse || destr;
          context.response._data = parseFunction(data);
          break;
        }
        case "stream": {
          context.response._data = context.response.body || context.response._bodyInit;
          break;
        }
        default: {
          context.response._data = await context.response[responseType]();
        }
      }
    }
    if (context.options.onResponse) {
      await callHooks(
        context,
        context.options.onResponse
      );
    }
    if (!context.options.ignoreResponseError && context.response.status >= 400 && context.response.status < 600) {
      if (context.options.onResponseError) {
        await callHooks(
          context,
          context.options.onResponseError
        );
      }
      return await onError(context);
    }
    return context.response;
  };
  const $fetch = async function $fetch2(request, options) {
    const r = await $fetchRaw(request, options);
    return r._data;
  };
  $fetch.raw = $fetchRaw;
  $fetch.native = (...args) => fetch(...args);
  $fetch.create = (defaultOptions = {}, customGlobalOptions = {}) => createFetch$1({
    ...globalOptions,
    ...customGlobalOptions,
    defaults: {
      ...globalOptions.defaults,
      ...customGlobalOptions.defaults,
      ...defaultOptions
    }
  });
  return $fetch;
}

function createNodeFetch() {
  const useKeepAlive = JSON.parse(process.env.FETCH_KEEP_ALIVE || "false");
  if (!useKeepAlive) {
    return l;
  }
  const agentOptions = { keepAlive: true };
  const httpAgent = new http.Agent(agentOptions);
  const httpsAgent = new https.Agent(agentOptions);
  const nodeFetchOptions = {
    agent(parsedURL) {
      return parsedURL.protocol === "http:" ? httpAgent : httpsAgent;
    }
  };
  return function nodeFetchWithKeepAlive(input, init) {
    return l(input, { ...nodeFetchOptions, ...init });
  };
}
const fetch = globalThis.fetch ? (...args) => globalThis.fetch(...args) : createNodeFetch();
const Headers$1 = globalThis.Headers || s;
const AbortController$1 = globalThis.AbortController || i;
createFetch$1({ fetch, Headers: Headers$1, AbortController: AbortController$1 });

const nullBodyResponses = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function createCall(handle) {
  return function callHandle(context) {
    const req = new IncomingMessage();
    const res = new ServerResponse(req);
    req.url = context.url || "/";
    req.method = context.method || "GET";
    req.headers = {};
    if (context.headers) {
      const headerEntries = typeof context.headers.entries === "function" ? context.headers.entries() : Object.entries(context.headers);
      for (const [name, value] of headerEntries) {
        if (!value) {
          continue;
        }
        req.headers[name.toLowerCase()] = value;
      }
    }
    req.headers.host = req.headers.host || context.host || "localhost";
    req.connection.encrypted = // @ts-ignore
    req.connection.encrypted || context.protocol === "https";
    req.body = context.body || null;
    req.__unenv__ = context.context;
    return handle(req, res).then(() => {
      let body = res._data;
      if (nullBodyResponses.has(res.statusCode) || req.method.toUpperCase() === "HEAD") {
        body = null;
        delete res._headers["content-length"];
      }
      const r = {
        body,
        headers: res._headers,
        status: res.statusCode,
        statusText: res.statusMessage
      };
      req.destroy();
      res.destroy();
      return r;
    });
  };
}

function createFetch(call, _fetch = global.fetch) {
  return async function ufetch(input, init) {
    const url = input.toString();
    if (!url.startsWith("/")) {
      return _fetch(url, init);
    }
    try {
      const r = await call({ url, ...init });
      return new Response(r.body, {
        status: r.status,
        statusText: r.statusText,
        headers: Object.fromEntries(
          Object.entries(r.headers).map(([name, value]) => [
            name,
            Array.isArray(value) ? value.join(",") : String(value) || ""
          ])
        )
      });
    } catch (error) {
      return new Response(error.toString(), {
        status: Number.parseInt(error.statusCode || error.code) || 500,
        statusText: error.statusText
      });
    }
  };
}

function flatHooks(configHooks, hooks = {}, parentName) {
  for (const key in configHooks) {
    const subHook = configHooks[key];
    const name = parentName ? `${parentName}:${key}` : key;
    if (typeof subHook === "object" && subHook !== null) {
      flatHooks(subHook, hooks, name);
    } else if (typeof subHook === "function") {
      hooks[name] = subHook;
    }
  }
  return hooks;
}
const defaultTask = { run: (function_) => function_() };
const _createTask = () => defaultTask;
const createTask = typeof console.createTask !== "undefined" ? console.createTask : _createTask;
function serialTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return hooks.reduce(
    (promise, hookFunction) => promise.then(() => task.run(() => hookFunction(...args))),
    Promise.resolve()
  );
}
function parallelTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return Promise.all(hooks.map((hook) => task.run(() => hook(...args))));
}
function callEachWith(callbacks, arg0) {
  for (const callback of [...callbacks]) {
    callback(arg0);
  }
}

class Hookable {
  constructor() {
    this._hooks = {};
    this._before = void 0;
    this._after = void 0;
    this._deprecatedMessages = void 0;
    this._deprecatedHooks = {};
    this.hook = this.hook.bind(this);
    this.callHook = this.callHook.bind(this);
    this.callHookWith = this.callHookWith.bind(this);
  }
  hook(name, function_, options = {}) {
    if (!name || typeof function_ !== "function") {
      return () => {
      };
    }
    const originalName = name;
    let dep;
    while (this._deprecatedHooks[name]) {
      dep = this._deprecatedHooks[name];
      name = dep.to;
    }
    if (dep && !options.allowDeprecated) {
      let message = dep.message;
      if (!message) {
        message = `${originalName} hook has been deprecated` + (dep.to ? `, please use ${dep.to}` : "");
      }
      if (!this._deprecatedMessages) {
        this._deprecatedMessages = /* @__PURE__ */ new Set();
      }
      if (!this._deprecatedMessages.has(message)) {
        console.warn(message);
        this._deprecatedMessages.add(message);
      }
    }
    if (!function_.name) {
      try {
        Object.defineProperty(function_, "name", {
          get: () => "_" + name.replace(/\W+/g, "_") + "_hook_cb",
          configurable: true
        });
      } catch {
      }
    }
    this._hooks[name] = this._hooks[name] || [];
    this._hooks[name].push(function_);
    return () => {
      if (function_) {
        this.removeHook(name, function_);
        function_ = void 0;
      }
    };
  }
  hookOnce(name, function_) {
    let _unreg;
    let _function = (...arguments_) => {
      if (typeof _unreg === "function") {
        _unreg();
      }
      _unreg = void 0;
      _function = void 0;
      return function_(...arguments_);
    };
    _unreg = this.hook(name, _function);
    return _unreg;
  }
  removeHook(name, function_) {
    if (this._hooks[name]) {
      const index = this._hooks[name].indexOf(function_);
      if (index !== -1) {
        this._hooks[name].splice(index, 1);
      }
      if (this._hooks[name].length === 0) {
        delete this._hooks[name];
      }
    }
  }
  deprecateHook(name, deprecated) {
    this._deprecatedHooks[name] = typeof deprecated === "string" ? { to: deprecated } : deprecated;
    const _hooks = this._hooks[name] || [];
    delete this._hooks[name];
    for (const hook of _hooks) {
      this.hook(name, hook);
    }
  }
  deprecateHooks(deprecatedHooks) {
    Object.assign(this._deprecatedHooks, deprecatedHooks);
    for (const name in deprecatedHooks) {
      this.deprecateHook(name, deprecatedHooks[name]);
    }
  }
  addHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    const removeFns = Object.keys(hooks).map(
      (key) => this.hook(key, hooks[key])
    );
    return () => {
      for (const unreg of removeFns.splice(0, removeFns.length)) {
        unreg();
      }
    };
  }
  removeHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    for (const key in hooks) {
      this.removeHook(key, hooks[key]);
    }
  }
  removeAllHooks() {
    for (const key in this._hooks) {
      delete this._hooks[key];
    }
  }
  callHook(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(serialTaskCaller, name, ...arguments_);
  }
  callHookParallel(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(parallelTaskCaller, name, ...arguments_);
  }
  callHookWith(caller, name, ...arguments_) {
    const event = this._before || this._after ? { name, args: arguments_, context: {} } : void 0;
    if (this._before) {
      callEachWith(this._before, event);
    }
    const result = caller(
      name in this._hooks ? [...this._hooks[name]] : [],
      arguments_
    );
    if (result instanceof Promise) {
      return result.finally(() => {
        if (this._after && event) {
          callEachWith(this._after, event);
        }
      });
    }
    if (this._after && event) {
      callEachWith(this._after, event);
    }
    return result;
  }
  beforeEach(function_) {
    this._before = this._before || [];
    this._before.push(function_);
    return () => {
      if (this._before !== void 0) {
        const index = this._before.indexOf(function_);
        if (index !== -1) {
          this._before.splice(index, 1);
        }
      }
    };
  }
  afterEach(function_) {
    this._after = this._after || [];
    this._after.push(function_);
    return () => {
      if (this._after !== void 0) {
        const index = this._after.indexOf(function_);
        if (index !== -1) {
          this._after.splice(index, 1);
        }
      }
    };
  }
}
function createHooks() {
  return new Hookable();
}

function klona(x) {
	if (typeof x !== 'object') return x;

	var k, tmp, str=Object.prototype.toString.call(x);

	if (str === '[object Object]') {
		if (x.constructor !== Object && typeof x.constructor === 'function') {
			tmp = new x.constructor();
			for (k in x) {
				if (x.hasOwnProperty(k) && tmp[k] !== x[k]) {
					tmp[k] = klona(x[k]);
				}
			}
		} else {
			tmp = {}; // null
			for (k in x) {
				if (k === '__proto__') {
					Object.defineProperty(tmp, k, {
						value: klona(x[k]),
						configurable: true,
						enumerable: true,
						writable: true,
					});
				} else {
					tmp[k] = klona(x[k]);
				}
			}
		}
		return tmp;
	}

	if (str === '[object Array]') {
		k = x.length;
		for (tmp=Array(k); k--;) {
			tmp[k] = klona(x[k]);
		}
		return tmp;
	}

	if (str === '[object Set]') {
		tmp = new Set;
		x.forEach(function (val) {
			tmp.add(klona(val));
		});
		return tmp;
	}

	if (str === '[object Map]') {
		tmp = new Map;
		x.forEach(function (val, key) {
			tmp.set(klona(key), klona(val));
		});
		return tmp;
	}

	if (str === '[object Date]') {
		return new Date(+x);
	}

	if (str === '[object RegExp]') {
		tmp = new RegExp(x.source, x.flags);
		tmp.lastIndex = x.lastIndex;
		return tmp;
	}

	if (str === '[object DataView]') {
		return new x.constructor( klona(x.buffer) );
	}

	if (str === '[object ArrayBuffer]') {
		return x.slice(0);
	}

	// ArrayBuffer.isView(x)
	// ~> `new` bcuz `Buffer.slice` => ref
	if (str.slice(-6) === 'Array]') {
		return new x.constructor(x);
	}

	return x;
}

const NUMBER_CHAR_RE = /\d/;
const STR_SPLITTERS = ["-", "_", "/", "."];
function isUppercase(char = "") {
  if (NUMBER_CHAR_RE.test(char)) {
    return void 0;
  }
  return char !== char.toLowerCase();
}
function splitByCase(str, separators) {
  const splitters = STR_SPLITTERS;
  const parts = [];
  if (!str || typeof str !== "string") {
    return parts;
  }
  let buff = "";
  let previousUpper;
  let previousSplitter;
  for (const char of str) {
    const isSplitter = splitters.includes(char);
    if (isSplitter === true) {
      parts.push(buff);
      buff = "";
      previousUpper = void 0;
      continue;
    }
    const isUpper = isUppercase(char);
    if (previousSplitter === false) {
      if (previousUpper === false && isUpper === true) {
        parts.push(buff);
        buff = char;
        previousUpper = isUpper;
        continue;
      }
      if (previousUpper === true && isUpper === false && buff.length > 1) {
        const lastChar = buff.at(-1);
        parts.push(buff.slice(0, Math.max(0, buff.length - 1)));
        buff = lastChar + char;
        previousUpper = isUpper;
        continue;
      }
    }
    buff += char;
    previousUpper = isUpper;
    previousSplitter = isSplitter;
  }
  parts.push(buff);
  return parts;
}
function kebabCase(str, joiner) {
  return str ? (Array.isArray(str) ? str : splitByCase(str)).map((p) => p.toLowerCase()).join(joiner) : "";
}
function snakeCase(str) {
  return kebabCase(str || "", "_");
}

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /{{(.*?)}}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const inlineAppConfig = {
  "nuxt": {},
  "icon": {
    "provider": "iconify",
    "class": "",
    "aliases": {},
    "iconifyApiEndpoint": "https://api.iconify.design",
    "localApiEndpoint": "/api/_nuxt_icon",
    "fallbackToApi": true,
    "cssSelectorPrefix": "i-",
    "cssWherePseudo": true,
    "mode": "css",
    "attrs": {
      "aria-hidden": true
    },
    "collections": [
      "academicons",
      "akar-icons",
      "ant-design",
      "arcticons",
      "basil",
      "bi",
      "bitcoin-icons",
      "bpmn",
      "brandico",
      "bx",
      "bxl",
      "bxs",
      "bytesize",
      "carbon",
      "catppuccin",
      "cbi",
      "charm",
      "ci",
      "cib",
      "cif",
      "cil",
      "circle-flags",
      "circum",
      "clarity",
      "codicon",
      "covid",
      "cryptocurrency",
      "cryptocurrency-color",
      "dashicons",
      "devicon",
      "devicon-plain",
      "ei",
      "el",
      "emojione",
      "emojione-monotone",
      "emojione-v1",
      "entypo",
      "entypo-social",
      "eos-icons",
      "ep",
      "et",
      "eva",
      "f7",
      "fa",
      "fa-brands",
      "fa-regular",
      "fa-solid",
      "fa6-brands",
      "fa6-regular",
      "fa6-solid",
      "fad",
      "fe",
      "feather",
      "file-icons",
      "flag",
      "flagpack",
      "flat-color-icons",
      "flat-ui",
      "flowbite",
      "fluent",
      "fluent-emoji",
      "fluent-emoji-flat",
      "fluent-emoji-high-contrast",
      "fluent-mdl2",
      "fontelico",
      "fontisto",
      "formkit",
      "foundation",
      "fxemoji",
      "gala",
      "game-icons",
      "geo",
      "gg",
      "gis",
      "gravity-ui",
      "gridicons",
      "grommet-icons",
      "guidance",
      "healthicons",
      "heroicons",
      "heroicons-outline",
      "heroicons-solid",
      "hugeicons",
      "humbleicons",
      "ic",
      "icomoon-free",
      "icon-park",
      "icon-park-outline",
      "icon-park-solid",
      "icon-park-twotone",
      "iconamoon",
      "iconoir",
      "icons8",
      "il",
      "ion",
      "iwwa",
      "jam",
      "la",
      "lets-icons",
      "line-md",
      "logos",
      "ls",
      "lucide",
      "lucide-lab",
      "mage",
      "majesticons",
      "maki",
      "map",
      "marketeq",
      "material-symbols",
      "material-symbols-light",
      "mdi",
      "mdi-light",
      "medical-icon",
      "memory",
      "meteocons",
      "mi",
      "mingcute",
      "mono-icons",
      "mynaui",
      "nimbus",
      "nonicons",
      "noto",
      "noto-v1",
      "octicon",
      "oi",
      "ooui",
      "openmoji",
      "oui",
      "pajamas",
      "pepicons",
      "pepicons-pencil",
      "pepicons-pop",
      "pepicons-print",
      "ph",
      "pixelarticons",
      "prime",
      "ps",
      "quill",
      "radix-icons",
      "raphael",
      "ri",
      "rivet-icons",
      "si-glyph",
      "simple-icons",
      "simple-line-icons",
      "skill-icons",
      "solar",
      "streamline",
      "streamline-emojis",
      "subway",
      "svg-spinners",
      "system-uicons",
      "tabler",
      "tdesign",
      "teenyicons",
      "token",
      "token-branded",
      "topcoat",
      "twemoji",
      "typcn",
      "uil",
      "uim",
      "uis",
      "uit",
      "uiw",
      "unjs",
      "vaadin",
      "vs",
      "vscode-icons",
      "websymbol",
      "weui",
      "whh",
      "wi",
      "wpf",
      "zmdi",
      "zondicons"
    ],
    "fetchTimeout": 1500
  },
  "ui": {
    "primary": "green",
    "gray": "cool",
    "colors": [
      "red",
      "orange",
      "amber",
      "yellow",
      "lime",
      "green",
      "emerald",
      "teal",
      "cyan",
      "sky",
      "blue",
      "indigo",
      "violet",
      "purple",
      "fuchsia",
      "pink",
      "rose",
      "primary"
    ],
    "strategy": "merge"
  }
};



const appConfig = defuFn(inlineAppConfig);

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildId": "74ce9abb-c6c4-4ad8-a1dd-63dc8a5c24ac",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/sitemap.xsl": {
        "headers": {
          "Content-Type": "application/xslt+xml"
        }
      },
      "/sitemap.xml": {
        "swr": 600,
        "cache": {
          "swr": true,
          "maxAge": 600,
          "varies": [
            "X-Forwarded-Host",
            "X-Forwarded-Proto",
            "Host"
          ]
        }
      },
      "/_nuxt/builds/meta/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/_nuxt/builds/**": {
        "headers": {
          "cache-control": "public, max-age=1, immutable"
        }
      },
      "/_nuxt/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      }
    }
  },
  "public": {
    "nuxt-schema-org": {
      "reactive": true,
      "minify": true,
      "scriptAttributes": {
        "data-nuxt-schema-org": true
      },
      "identity": "",
      "version": "4.0.4"
    },
    "seo-utils": {
      "canonicalQueryWhitelist": [
        "page",
        "sort",
        "filter",
        "search",
        "q",
        "category",
        "tag"
      ]
    }
  },
  "sitemap": {
    "isI18nMapped": false,
    "sitemapName": "sitemap.xml",
    "isMultiSitemap": false,
    "excludeAppSources": [],
    "cacheMaxAgeSeconds": 600,
    "autoLastmod": false,
    "defaultSitemapsChunkSize": 1000,
    "minify": false,
    "sortEntries": true,
    "debug": false,
    "discoverImages": true,
    "discoverVideos": true,
    "sitemapsPathPrefix": "/__sitemap__/",
    "isNuxtContentDocumentDriven": false,
    "xsl": "/__sitemap__/style.xsl",
    "xslTips": true,
    "xslColumns": [
      {
        "label": "URL",
        "width": "50%"
      },
      {
        "label": "Images",
        "width": "25%",
        "select": "count(image:image)"
      },
      {
        "label": "Last Updated",
        "width": "25%",
        "select": "concat(substring(sitemap:lastmod,0,11),concat(' ', substring(sitemap:lastmod,12,5)),concat(' ', substring(sitemap:lastmod,20,6)))"
      }
    ],
    "credits": true,
    "version": "7.0.0",
    "sitemaps": {
      "sitemap.xml": {
        "sitemapName": "sitemap.xml",
        "route": "sitemap.xml",
        "defaults": {},
        "include": [],
        "exclude": [
          "/_nuxt/**",
          "/_**"
        ],
        "includeAppSources": true
      }
    }
  },
  "icon": {
    "serverKnownCssClasses": []
  },
  "nuxt-site-config": {
    "stack": [
      {
        "_context": "system",
        "_priority": -15,
        "name": "dafeena-consultancy",
        "env": "production"
      },
      {
        "_context": "package.json",
        "_priority": -10,
        "name": "dafeena-consultancy"
      },
      {
        "_priority": -3,
        "_context": "nuxt-site-config:config",
        "name": "Dafeena Consultancy",
        "description": "We are career consultants",
        "url": "https://dafeenaconsultancy.com",
        "language": "en"
      }
    ],
    "version": "3.0.6",
    "debug": false
  },
  "nuxt-robots": {
    "version": "5.0.1",
    "usingNuxtContent": false,
    "debug": false,
    "credits": true,
    "groups": [
      {
        "comment": [],
        "disallow": [
          ""
        ],
        "allow": [],
        "userAgent": [
          "*"
        ],
        "_indexable": true,
        "_rules": []
      }
    ],
    "sitemap": [
      "/sitemap.xml"
    ],
    "header": true,
    "robotsEnabledValue": "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    "robotsDisabledValue": "noindex, nofollow",
    "cacheControl": "max-age=14400, must-revalidate"
  }
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  applyEnv(runtimeConfig, envOptions);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
const _sharedAppConfig = _deepFreeze(klona(appConfig));
function useAppConfig(event) {
  {
    return _sharedAppConfig;
  }
}
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

function wrapToPromise(value) {
  if (!value || typeof value.then !== "function") {
    return Promise.resolve(value);
  }
  return value;
}
function asyncCall(function_, ...arguments_) {
  try {
    return wrapToPromise(function_(...arguments_));
  } catch (error) {
    return Promise.reject(error);
  }
}
function isPrimitive$1(value) {
  const type = typeof value;
  return value === null || type !== "object" && type !== "function";
}
function isPureObject(value) {
  const proto = Object.getPrototypeOf(value);
  return !proto || proto.isPrototypeOf(Object);
}
function stringify(value) {
  if (isPrimitive$1(value)) {
    return String(value);
  }
  if (isPureObject(value) || Array.isArray(value)) {
    return JSON.stringify(value);
  }
  if (typeof value.toJSON === "function") {
    return stringify(value.toJSON());
  }
  throw new Error("[unstorage] Cannot stringify value!");
}
function checkBufferSupport() {
  if (typeof Buffer === void 0) {
    throw new TypeError("[unstorage] Buffer is not supported!");
  }
}
const BASE64_PREFIX = "base64:";
function serializeRaw(value) {
  if (typeof value === "string") {
    return value;
  }
  checkBufferSupport();
  const base64 = Buffer.from(value).toString("base64");
  return BASE64_PREFIX + base64;
}
function deserializeRaw(value) {
  if (typeof value !== "string") {
    return value;
  }
  if (!value.startsWith(BASE64_PREFIX)) {
    return value;
  }
  checkBufferSupport();
  return Buffer.from(value.slice(BASE64_PREFIX.length), "base64");
}

const storageKeyProperties = [
  "hasItem",
  "getItem",
  "getItemRaw",
  "setItem",
  "setItemRaw",
  "removeItem",
  "getMeta",
  "setMeta",
  "removeMeta",
  "getKeys",
  "clear",
  "mount",
  "unmount"
];
function prefixStorage(storage, base) {
  base = normalizeBaseKey(base);
  if (!base) {
    return storage;
  }
  const nsStorage = { ...storage };
  for (const property of storageKeyProperties) {
    nsStorage[property] = (key = "", ...args) => (
      // @ts-ignore
      storage[property](base + key, ...args)
    );
  }
  nsStorage.getKeys = (key = "", ...arguments_) => storage.getKeys(base + key, ...arguments_).then((keys) => keys.map((key2) => key2.slice(base.length)));
  return nsStorage;
}
function normalizeKey$1(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0].replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
}
function joinKeys(...keys) {
  return normalizeKey$1(keys.join(":"));
}
function normalizeBaseKey(base) {
  base = normalizeKey$1(base);
  return base ? base + ":" : "";
}

function defineDriver$1(factory) {
  return factory;
}

const DRIVER_NAME$1 = "memory";
const memory = defineDriver$1(() => {
  const data = /* @__PURE__ */ new Map();
  return {
    name: DRIVER_NAME$1,
    options: {},
    hasItem(key) {
      return data.has(key);
    },
    getItem(key) {
      return data.get(key) ?? null;
    },
    getItemRaw(key) {
      return data.get(key) ?? null;
    },
    setItem(key, value) {
      data.set(key, value);
    },
    setItemRaw(key, value) {
      data.set(key, value);
    },
    removeItem(key) {
      data.delete(key);
    },
    getKeys() {
      return Array.from(data.keys());
    },
    clear() {
      data.clear();
    },
    dispose() {
      data.clear();
    }
  };
});

function createStorage(options = {}) {
  const context = {
    mounts: { "": options.driver || memory() },
    mountpoints: [""],
    watching: false,
    watchListeners: [],
    unwatch: {}
  };
  const getMount = (key) => {
    for (const base of context.mountpoints) {
      if (key.startsWith(base)) {
        return {
          base,
          relativeKey: key.slice(base.length),
          driver: context.mounts[base]
        };
      }
    }
    return {
      base: "",
      relativeKey: key,
      driver: context.mounts[""]
    };
  };
  const getMounts = (base, includeParent) => {
    return context.mountpoints.filter(
      (mountpoint) => mountpoint.startsWith(base) || includeParent && base.startsWith(mountpoint)
    ).map((mountpoint) => ({
      relativeBase: base.length > mountpoint.length ? base.slice(mountpoint.length) : void 0,
      mountpoint,
      driver: context.mounts[mountpoint]
    }));
  };
  const onChange = (event, key) => {
    if (!context.watching) {
      return;
    }
    key = normalizeKey$1(key);
    for (const listener of context.watchListeners) {
      listener(event, key);
    }
  };
  const startWatch = async () => {
    if (context.watching) {
      return;
    }
    context.watching = true;
    for (const mountpoint in context.mounts) {
      context.unwatch[mountpoint] = await watch(
        context.mounts[mountpoint],
        onChange,
        mountpoint
      );
    }
  };
  const stopWatch = async () => {
    if (!context.watching) {
      return;
    }
    for (const mountpoint in context.unwatch) {
      await context.unwatch[mountpoint]();
    }
    context.unwatch = {};
    context.watching = false;
  };
  const runBatch = (items, commonOptions, cb) => {
    const batches = /* @__PURE__ */ new Map();
    const getBatch = (mount) => {
      let batch = batches.get(mount.base);
      if (!batch) {
        batch = {
          driver: mount.driver,
          base: mount.base,
          items: []
        };
        batches.set(mount.base, batch);
      }
      return batch;
    };
    for (const item of items) {
      const isStringItem = typeof item === "string";
      const key = normalizeKey$1(isStringItem ? item : item.key);
      const value = isStringItem ? void 0 : item.value;
      const options2 = isStringItem || !item.options ? commonOptions : { ...commonOptions, ...item.options };
      const mount = getMount(key);
      getBatch(mount).items.push({
        key,
        value,
        relativeKey: mount.relativeKey,
        options: options2
      });
    }
    return Promise.all([...batches.values()].map((batch) => cb(batch))).then(
      (r) => r.flat()
    );
  };
  const storage = {
    // Item
    hasItem(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.hasItem, relativeKey, opts);
    },
    getItem(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => destr(value)
      );
    },
    getItems(items, commonOptions) {
      return runBatch(items, commonOptions, (batch) => {
        if (batch.driver.getItems) {
          return asyncCall(
            batch.driver.getItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              options: item.options
            })),
            commonOptions
          ).then(
            (r) => r.map((item) => ({
              key: joinKeys(batch.base, item.key),
              value: destr(item.value)
            }))
          );
        }
        return Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.getItem,
              item.relativeKey,
              item.options
            ).then((value) => ({
              key: item.key,
              value: destr(value)
            }));
          })
        );
      });
    },
    getItemRaw(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.getItemRaw) {
        return asyncCall(driver.getItemRaw, relativeKey, opts);
      }
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => deserializeRaw(value)
      );
    },
    async setItem(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key);
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.setItem) {
        return;
      }
      await asyncCall(driver.setItem, relativeKey, stringify(value), opts);
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async setItems(items, commonOptions) {
      await runBatch(items, commonOptions, async (batch) => {
        if (batch.driver.setItems) {
          return asyncCall(
            batch.driver.setItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              value: stringify(item.value),
              options: item.options
            })),
            commonOptions
          );
        }
        if (!batch.driver.setItem) {
          return;
        }
        await Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.setItem,
              item.relativeKey,
              stringify(item.value),
              item.options
            );
          })
        );
      });
    },
    async setItemRaw(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key, opts);
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.setItemRaw) {
        await asyncCall(driver.setItemRaw, relativeKey, value, opts);
      } else if (driver.setItem) {
        await asyncCall(driver.setItem, relativeKey, serializeRaw(value), opts);
      } else {
        return;
      }
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async removeItem(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { removeMeta: opts };
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.removeItem) {
        return;
      }
      await asyncCall(driver.removeItem, relativeKey, opts);
      if (opts.removeMeta || opts.removeMata) {
        await asyncCall(driver.removeItem, relativeKey + "$", opts);
      }
      if (!driver.watch) {
        onChange("remove", key);
      }
    },
    // Meta
    async getMeta(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { nativeOnly: opts };
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      const meta = /* @__PURE__ */ Object.create(null);
      if (driver.getMeta) {
        Object.assign(meta, await asyncCall(driver.getMeta, relativeKey, opts));
      }
      if (!opts.nativeOnly) {
        const value = await asyncCall(
          driver.getItem,
          relativeKey + "$",
          opts
        ).then((value_) => destr(value_));
        if (value && typeof value === "object") {
          if (typeof value.atime === "string") {
            value.atime = new Date(value.atime);
          }
          if (typeof value.mtime === "string") {
            value.mtime = new Date(value.mtime);
          }
          Object.assign(meta, value);
        }
      }
      return meta;
    },
    setMeta(key, value, opts = {}) {
      return this.setItem(key + "$", value, opts);
    },
    removeMeta(key, opts = {}) {
      return this.removeItem(key + "$", opts);
    },
    // Keys
    async getKeys(base, opts = {}) {
      base = normalizeBaseKey(base);
      const mounts = getMounts(base, true);
      let maskedMounts = [];
      const allKeys = [];
      for (const mount of mounts) {
        const rawKeys = await asyncCall(
          mount.driver.getKeys,
          mount.relativeBase,
          opts
        );
        const keys = rawKeys.map((key) => mount.mountpoint + normalizeKey$1(key)).filter((key) => !maskedMounts.some((p) => key.startsWith(p)));
        allKeys.push(...keys);
        maskedMounts = [
          mount.mountpoint,
          ...maskedMounts.filter((p) => !p.startsWith(mount.mountpoint))
        ];
      }
      return base ? allKeys.filter((key) => key.startsWith(base) && !key.endsWith("$")) : allKeys.filter((key) => !key.endsWith("$"));
    },
    // Utils
    async clear(base, opts = {}) {
      base = normalizeBaseKey(base);
      await Promise.all(
        getMounts(base, false).map(async (m) => {
          if (m.driver.clear) {
            return asyncCall(m.driver.clear, m.relativeBase, opts);
          }
          if (m.driver.removeItem) {
            const keys = await m.driver.getKeys(m.relativeBase || "", opts);
            return Promise.all(
              keys.map((key) => m.driver.removeItem(key, opts))
            );
          }
        })
      );
    },
    async dispose() {
      await Promise.all(
        Object.values(context.mounts).map((driver) => dispose(driver))
      );
    },
    async watch(callback) {
      await startWatch();
      context.watchListeners.push(callback);
      return async () => {
        context.watchListeners = context.watchListeners.filter(
          (listener) => listener !== callback
        );
        if (context.watchListeners.length === 0) {
          await stopWatch();
        }
      };
    },
    async unwatch() {
      context.watchListeners = [];
      await stopWatch();
    },
    // Mount
    mount(base, driver) {
      base = normalizeBaseKey(base);
      if (base && context.mounts[base]) {
        throw new Error(`already mounted at ${base}`);
      }
      if (base) {
        context.mountpoints.push(base);
        context.mountpoints.sort((a, b) => b.length - a.length);
      }
      context.mounts[base] = driver;
      if (context.watching) {
        Promise.resolve(watch(driver, onChange, base)).then((unwatcher) => {
          context.unwatch[base] = unwatcher;
        }).catch(console.error);
      }
      return storage;
    },
    async unmount(base, _dispose = true) {
      base = normalizeBaseKey(base);
      if (!base || !context.mounts[base]) {
        return;
      }
      if (context.watching && base in context.unwatch) {
        context.unwatch[base]();
        delete context.unwatch[base];
      }
      if (_dispose) {
        await dispose(context.mounts[base]);
      }
      context.mountpoints = context.mountpoints.filter((key) => key !== base);
      delete context.mounts[base];
    },
    getMount(key = "") {
      key = normalizeKey$1(key) + ":";
      const m = getMount(key);
      return {
        driver: m.driver,
        base: m.base
      };
    },
    getMounts(base = "", opts = {}) {
      base = normalizeKey$1(base);
      const mounts = getMounts(base, opts.parents);
      return mounts.map((m) => ({
        driver: m.driver,
        base: m.mountpoint
      }));
    }
  };
  return storage;
}
function watch(driver, onChange, base) {
  return driver.watch ? driver.watch((event, key) => onChange(event, base + key)) : () => {
  };
}
async function dispose(driver) {
  if (typeof driver.dispose === "function") {
    await asyncCall(driver.dispose);
  }
}

const _assets = {

};

const normalizeKey = function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0].replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
};

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

function defineDriver(factory) {
  return factory;
}
function createError(driver, message, opts) {
  const err = new Error(`[unstorage] [${driver}] ${message}`, opts);
  return err;
}
function createRequiredError(driver, name) {
  if (Array.isArray(name)) {
    return createError(
      driver,
      `Missing some of the required options ${name.map((n) => "`" + n + "`").join(", ")}`
    );
  }
  return createError(driver, `Missing required option \`${name}\`.`);
}

function ignoreNotfound(err) {
  return err.code === "ENOENT" || err.code === "EISDIR" ? null : err;
}
function ignoreExists(err) {
  return err.code === "EEXIST" ? null : err;
}
async function writeFile(path, data, encoding) {
  await ensuredir(dirname$1(path));
  return promises.writeFile(path, data, encoding);
}
function readFile(path, encoding) {
  return promises.readFile(path, encoding).catch(ignoreNotfound);
}
function unlink(path) {
  return promises.unlink(path).catch(ignoreNotfound);
}
function readdir(dir) {
  return promises.readdir(dir, { withFileTypes: true }).catch(ignoreNotfound).then((r) => r || []);
}
async function ensuredir(dir) {
  if (existsSync(dir)) {
    return;
  }
  await ensuredir(dirname$1(dir)).catch(ignoreExists);
  await promises.mkdir(dir).catch(ignoreExists);
}
async function readdirRecursive(dir, ignore) {
  if (ignore && ignore(dir)) {
    return [];
  }
  const entries = await readdir(dir);
  const files = [];
  await Promise.all(
    entries.map(async (entry) => {
      const entryPath = resolve$2(dir, entry.name);
      if (entry.isDirectory()) {
        const dirFiles = await readdirRecursive(entryPath, ignore);
        files.push(...dirFiles.map((f) => entry.name + "/" + f));
      } else {
        if (!(ignore && ignore(entry.name))) {
          files.push(entry.name);
        }
      }
    })
  );
  return files;
}
async function rmRecursive(dir) {
  const entries = await readdir(dir);
  await Promise.all(
    entries.map((entry) => {
      const entryPath = resolve$2(dir, entry.name);
      if (entry.isDirectory()) {
        return rmRecursive(entryPath).then(() => promises.rmdir(entryPath));
      } else {
        return promises.unlink(entryPath);
      }
    })
  );
}

const PATH_TRAVERSE_RE = /\.\.\:|\.\.$/;
const DRIVER_NAME = "fs-lite";
const unstorage_47drivers_47fs_45lite = defineDriver((opts = {}) => {
  if (!opts.base) {
    throw createRequiredError(DRIVER_NAME, "base");
  }
  opts.base = resolve$2(opts.base);
  const r = (key) => {
    if (PATH_TRAVERSE_RE.test(key)) {
      throw createError(
        DRIVER_NAME,
        `Invalid key: ${JSON.stringify(key)}. It should not contain .. segments`
      );
    }
    const resolved = join(opts.base, key.replace(/:/g, "/"));
    return resolved;
  };
  return {
    name: DRIVER_NAME,
    options: opts,
    hasItem(key) {
      return existsSync(r(key));
    },
    getItem(key) {
      return readFile(r(key), "utf8");
    },
    getItemRaw(key) {
      return readFile(r(key));
    },
    async getMeta(key) {
      const { atime, mtime, size, birthtime, ctime } = await promises.stat(r(key)).catch(() => ({}));
      return { atime, mtime, size, birthtime, ctime };
    },
    setItem(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value, "utf8");
    },
    setItemRaw(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value);
    },
    removeItem(key) {
      if (opts.readOnly) {
        return;
      }
      return unlink(r(key));
    },
    getKeys() {
      return readdirRecursive(r("."), opts.ignore);
    },
    async clear() {
      if (opts.readOnly || opts.noClear) {
        return;
      }
      await rmRecursive(r("."));
    }
  };
});

const storage = createStorage({});

storage.mount('/assets', assets$1);

storage.mount('data', unstorage_47drivers_47fs_45lite({"driver":"fsLite","base":"/Users/guruwalker/Sandbox/dafeena-consultancy/.data/kv"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const defaultCacheOptions = {
  name: "_",
  base: "/cache",
  swr: true,
  maxAge: 1
};
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions, ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[nitro] [cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          const promise = useStorage().setItem(cacheKey, entry).catch((error) => {
            console.error(`[nitro] [cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event && event.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[nitro] [cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
const cachedFunction = defineCachedFunction;
function getKey(...args) {
  return args.length > 0 ? hash(args, {}) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      const _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        variableHeaders[header] = incomingEvent.node.req.headers[header];
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            for (const header in headers2) {
              this.setHeader(header, headers2[header]);
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.context = incomingEvent.context;
      event.context.cache = {
        options: _opts
      };
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(event);
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        event.node.res.setHeader(name, value);
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  if (hasReqHeader(event, "accept", "text/html")) {
    return false;
  }
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function normalizeError(error) {
  const cwd = typeof process.cwd === "function" ? process.cwd() : "/";
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Not Found" : "");
  const message = error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}
function _captureError(error, type) {
  console.error(`[nitro] [${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter$1({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery$1(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery$1(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
const unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
const reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
const escaped = {
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
const objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function devalue(value) {
  const counts = /* @__PURE__ */ new Map();
  let logNum = 0;
  function log(message) {
    if (logNum < 100) {
      console.warn(message);
      logNum += 1;
    }
  }
  function walk(thing) {
    if (typeof thing === "function") {
      log(`Cannot stringify a function ${thing.name}`);
      return;
    }
    if (counts.has(thing)) {
      counts.set(thing, counts.get(thing) + 1);
      return;
    }
    counts.set(thing, 1);
    if (!isPrimitive(thing)) {
      const type = getType(thing);
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
          const proto = Object.getPrototypeOf(thing);
          if (proto !== Object.prototype && proto !== null && Object.getOwnPropertyNames(proto).sort().join("\0") !== objectProtoOwnPropertyNames) {
            if (typeof thing.toJSON !== "function") {
              log(`Cannot stringify arbitrary non-POJOs ${thing.constructor.name}`);
            }
          } else if (Object.getOwnPropertySymbols(thing).length > 0) {
            log(`Cannot stringify POJOs with symbolic keys ${Object.getOwnPropertySymbols(thing).map((symbol) => symbol.toString())}`);
          } else {
            Object.keys(thing).forEach((key) => walk(thing[key]));
          }
      }
    }
  }
  walk(value);
  const names = /* @__PURE__ */ new Map();
  Array.from(counts).filter((entry) => entry[1] > 1).sort((a, b) => b[1] - a[1]).forEach((entry, i) => {
    names.set(entry[0], getName(i));
  });
  function stringify(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (isPrimitive(thing)) {
      return stringifyPrimitive(thing);
    }
    const type = getType(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return `Object(${stringify(thing.valueOf())})`;
      case "RegExp":
        return thing.toString();
      case "Date":
        return `new Date(${thing.getTime()})`;
      case "Array":
        const members = thing.map((v, i) => i in thing ? stringify(v) : "");
        const tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return `[${members.join(",")}${tail}]`;
      case "Set":
      case "Map":
        return `new ${type}([${Array.from(thing).map(stringify).join(",")}])`;
      default:
        if (thing.toJSON) {
          let json = thing.toJSON();
          if (getType(json) === "String") {
            try {
              json = JSON.parse(json);
            } catch (e) {
            }
          }
          return stringify(json);
        }
        if (Object.getPrototypeOf(thing) === null) {
          if (Object.keys(thing).length === 0) {
            return "Object.create(null)";
          }
          return `Object.create(null,{${Object.keys(thing).map((key) => `${safeKey(key)}:{writable:true,enumerable:true,value:${stringify(thing[key])}}`).join(",")}})`;
        }
        return `{${Object.keys(thing).map((key) => `${safeKey(key)}:${stringify(thing[key])}`).join(",")}}`;
    }
  }
  const str = stringify(value);
  if (names.size) {
    const params = [];
    const statements = [];
    const values = [];
    names.forEach((name, thing) => {
      params.push(name);
      if (isPrimitive(thing)) {
        values.push(stringifyPrimitive(thing));
        return;
      }
      const type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values.push(`Object(${stringify(thing.valueOf())})`);
          break;
        case "RegExp":
          values.push(thing.toString());
          break;
        case "Date":
          values.push(`new Date(${thing.getTime()})`);
          break;
        case "Array":
          values.push(`Array(${thing.length})`);
          thing.forEach((v, i) => {
            statements.push(`${name}[${i}]=${stringify(v)}`);
          });
          break;
        case "Set":
          values.push("new Set");
          statements.push(`${name}.${Array.from(thing).map((v) => `add(${stringify(v)})`).join(".")}`);
          break;
        case "Map":
          values.push("new Map");
          statements.push(`${name}.${Array.from(thing).map(([k, v]) => `set(${stringify(k)}, ${stringify(v)})`).join(".")}`);
          break;
        default:
          values.push(Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}");
          Object.keys(thing).forEach((key) => {
            statements.push(`${name}${safeProp(key)}=${stringify(thing[key])}`);
          });
      }
    });
    statements.push(`return ${str}`);
    return `(function(${params.join(",")}){${statements.join(";")}}(${values.join(",")}))`;
  } else {
    return str;
  }
}
function getName(num) {
  let name = "";
  do {
    name = chars[num % chars.length] + name;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? `${name}0` : name;
}
function isPrimitive(thing) {
  return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
  if (typeof thing === "string") {
    return stringifyString(thing);
  }
  if (thing === void 0) {
    return "void 0";
  }
  if (thing === 0 && 1 / thing < 0) {
    return "-0";
  }
  const str = String(thing);
  if (typeof thing === "number") {
    return str.replace(/^(-)?0\./, "$1.");
  }
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
function safeKey(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : escapeUnsafeChars(JSON.stringify(key));
}
function safeProp(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? `.${key}` : `[${escapeUnsafeChars(JSON.stringify(key))}]`;
}
function stringifyString(str) {
  let result = '"';
  for (let i = 0; i < str.length; i += 1) {
    const char = str.charAt(i);
    const code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped) {
      result += escaped[char];
    } else if (code >= 55296 && code <= 57343) {
      const next = str.charCodeAt(i + 1);
      if (code <= 56319 && (next >= 56320 && next <= 57343)) {
        result += char + str[++i];
      } else {
        result += `\\u${code.toString(16).toUpperCase()}`;
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}

function defineNitroPlugin(def) {
  return def;
}

function normalizeSiteConfig(config) {
  if (typeof config.indexable !== "undefined")
    config.indexable = String(config.indexable) !== "false";
  if (typeof config.trailingSlash !== "undefined" && !config.trailingSlash)
    config.trailingSlash = String(config.trailingSlash) !== "false";
  if (config.url && !hasProtocol(config.url, { acceptRelative: true, strict: false }))
    config.url = withHttps(config.url);
  const keys = Object.keys(config).sort((a, b) => a.localeCompare(b));
  const newConfig = {};
  for (const k of keys)
    newConfig[k] = config[k];
  return newConfig;
}
function createSiteConfigStack(options) {
  const debug = options?.debug || false;
  const stack = [];
  function push(input) {
    if (!input || typeof input !== "object" || Object.keys(input).length === 0)
      return;
    if (!input._context && debug) {
      let lastFunctionName = new Error("tmp").stack?.split("\n")[2].split(" ")[5];
      if (lastFunctionName?.includes("/"))
        lastFunctionName = "anonymous";
      input._context = lastFunctionName;
    }
    const entry = {};
    for (const k in input) {
      const val = input[k];
      if (typeof val !== "undefined" && val !== "")
        entry[k] = val;
    }
    if (Object.keys(entry).filter((k) => !k.startsWith("_")).length > 0)
      stack.push(entry);
  }
  function get(options2) {
    const siteConfig = {};
    if (options2?.debug)
      siteConfig._context = {};
    for (const o in stack.sort((a, b) => (a._priority || 0) - (b._priority || 0))) {
      for (const k in stack[o]) {
        const key = k;
        const val = options2?.resolveRefs ? toValue(stack[o][k]) : stack[o][k];
        if (!k.startsWith("_") && typeof val !== "undefined") {
          siteConfig[k] = val;
          if (options2?.debug)
            siteConfig._context[key] = stack[o]._context?.[key] || stack[o]._context || "anonymous";
        }
      }
    }
    return options2?.skipNormalize ? siteConfig : normalizeSiteConfig(siteConfig);
  }
  return {
    stack,
    push,
    get
  };
}

function envSiteConfig(env) {
  return Object.fromEntries(Object.entries(env).filter(([k]) => k.startsWith("NUXT_SITE_") || k.startsWith("NUXT_PUBLIC_SITE_")).map(([k, v]) => [
    k.replace(/^NUXT_(PUBLIC_)?SITE_/, "").split("_").map((s, i) => i === 0 ? s.toLowerCase() : s[0].toUpperCase() + s.slice(1).toLowerCase()).join(""),
    v
  ]));
}

function useSiteConfig(e, _options) {
  e.context.siteConfig = e.context.siteConfig || createSiteConfigStack();
  const options = defu(_options, useRuntimeConfig(e)["nuxt-site-config"], { debug: false });
  return e.context.siteConfig.get(options);
}

const _je4yxeG8Gl = defineNitroPlugin(async (nitroApp) => {
  nitroApp.hooks.hook("render:html", async (ctx, { event }) => {
    getRouteRules(event);
    process.env.NUXT_COMPONENT_ISLANDS && event.path.startsWith("/__nuxt_island");
    event.path;
    {
      const siteConfig = Object.fromEntries(
        Object.entries(useSiteConfig(event)).map(([k, v]) => [k, toValue(v)])
      );
      ctx.body.push(`<script>window.__NUXT_SITE_CONFIG__=${devalue(siteConfig)}<\/script>`);
    }
  });
});

const basicReporter = {
  log(logObj) {
    (console[logObj.type] || console.log)(...logObj.args);
  }
};
function createConsola(options = {}) {
  return createConsola$1({
    reporters: [basicReporter],
    ...options
  });
}
const consola = createConsola();
consola.consola = consola;

const logger = createConsola({
  defaults: { tag: "@nuxtjs/robots" }
});

async function resolveRobotsTxtContext(e, nitro = useNitroApp()) {
  const { groups, sitemap: sitemaps } = useRuntimeConfig(e)["nuxt-robots"];
  const generateRobotsTxtCtx = {
    event: e,
    context: e ? "robots.txt" : "init",
    ...JSON.parse(JSON.stringify({ groups, sitemaps }))
  };
  await nitro.hooks.callHook("robots:config", generateRobotsTxtCtx);
  nitro._robots.ctx = generateRobotsTxtCtx;
  return generateRobotsTxtCtx;
}

const _RCECS5JODL = defineNitroPlugin(async (nitroApp) => {
  const { usingNuxtContent, robotsDisabledValue } = useRuntimeConfig()["nuxt-robots"];
  nitroApp._robots = {};
  await resolveRobotsTxtContext(void 0, nitroApp);
  const nuxtContentUrls = /* @__PURE__ */ new Set();
  if (usingNuxtContent) {
    let urls;
    try {
      urls = await (await nitroApp.localFetch("/__robots__/nuxt-content.json", {})).json();
    } catch (e) {
      logger.error("Failed to read robot rules from content files.", e);
    }
    if (urls && Array.isArray(urls) && urls.length) {
      urls.forEach((url) => nuxtContentUrls.add(withoutTrailingSlash(url)));
    }
  }
  if (nuxtContentUrls.size) {
    nitroApp._robots.nuxtContentUrls = nuxtContentUrls;
  }
});

const script = "\"use strict\";(()=>{const t=window,e=document.documentElement,c=[\"dark\",\"light\"],n=getStorageValue(\"localStorage\",\"nuxt-color-mode\")||\"light\";let i=n===\"system\"?u():n;const r=e.getAttribute(\"data-color-mode-forced\");r&&(i=r),l(i),t[\"__NUXT_COLOR_MODE__\"]={preference:n,value:i,getColorScheme:u,addColorScheme:l,removeColorScheme:d};function l(o){const s=\"\"+o+\"\",a=\"\";e.classList?e.classList.add(s):e.className+=\" \"+s,a&&e.setAttribute(\"data-\"+a,o)}function d(o){const s=\"\"+o+\"\",a=\"\";e.classList?e.classList.remove(s):e.className=e.className.replace(new RegExp(s,\"g\"),\"\"),a&&e.removeAttribute(\"data-\"+a)}function f(o){return t.matchMedia(\"(prefers-color-scheme\"+o+\")\")}function u(){if(t.matchMedia&&f(\"\").media!==\"not all\"){for(const o of c)if(f(\":\"+o).matches)return o}return\"light\"}})();function getStorageValue(t,e){switch(t){case\"localStorage\":return window.localStorage.getItem(e);case\"sessionStorage\":return window.sessionStorage.getItem(e);case\"cookie\":return getCookie(e);default:return null}}function getCookie(t){const c=(\"; \"+window.document.cookie).split(\"; \"+t+\"=\");if(c.length===2)return c.pop()?.split(\";\").shift()}";

const _IgcuCvSiJ7 = (function(nitro) {
  nitro.hooks.hook("render:html", (htmlContext) => {
    htmlContext.head.push(`<script>${script}<\/script>`);
  });
});

const plugins = [
  _je4yxeG8Gl,
_RCECS5JODL,
_IgcuCvSiJ7
];

const errorHandler = (async function errorhandler(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const errorObject = {
    url: event.path,
    statusCode,
    statusMessage,
    message,
    stack: "",
    // TODO: check and validate error.data for serialisation into query
    data: error.data
  };
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nuxt]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]",
      Number(errorObject.statusCode) !== 200 && `[${errorObject.statusCode}]`
    ].filter(Boolean).join(" ");
    console.error(tags, errorObject.message + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (event.handled) {
    return;
  }
  setResponseStatus(event, errorObject.statusCode !== 200 && errorObject.statusCode || 500, errorObject.statusMessage);
  if (isJsonRequest(event)) {
    setResponseHeader(event, "Content-Type", "application/json");
    return send(event, JSON.stringify(errorObject));
  }
  const reqHeaders = getRequestHeaders(event);
  const isRenderingError = event.path.startsWith("/__nuxt_error") || !!reqHeaders["x-nuxt-error"];
  const res = isRenderingError ? null : await useNitroApp().localFetch(
    withQuery(joinURL(useRuntimeConfig(event).app.baseURL, "/__nuxt_error"), errorObject),
    {
      headers: { ...reqHeaders, "x-nuxt-error": "true" },
      redirect: "manual"
    }
  ).catch(() => null);
  if (!res) {
    const { template } = await import('./_/error-500.mjs');
    if (event.handled) {
      return;
    }
    setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
    return send(event, template(errorObject));
  }
  const html = await res.text();
  if (event.handled) {
    return;
  }
  for (const [header, value] of res.headers.entries()) {
    setResponseHeader(event, header, value);
  }
  setResponseStatus(event, res.status && res.status !== 200 ? res.status : void 0, res.statusText);
  return send(event, html);
});

const assets = {
  "/.DS_Store": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"1804-3y++sUAKzaCQmjLBz2v0kvESHgc\"",
    "mtime": "2024-12-29T13:56:03.087Z",
    "size": 6148,
    "path": "../public/.DS_Store"
  },
  "/DCLogo.png": {
    "type": "image/png",
    "etag": "\"4f820-AOz9CGG62IUFrcNP8cix4fEJPx8\"",
    "mtime": "2024-12-29T13:56:03.084Z",
    "size": 325664,
    "path": "../public/DCLogo.png"
  },
  "/dafeenaconsultancy.jpg": {
    "type": "image/jpeg",
    "etag": "\"15b34-9x53qySfiBbrEoa/epLfgNwd4W4\"",
    "mtime": "2024-12-29T13:56:03.086Z",
    "size": 88884,
    "path": "../public/dafeenaconsultancy.jpg"
  },
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"103e-myeY0ffW62EHeqylRcYS5glRcN4\"",
    "mtime": "2024-12-29T13:56:03.090Z",
    "size": 4158,
    "path": "../public/favicon.ico"
  },
  "/twitter-image.jpg": {
    "type": "image/jpeg",
    "etag": "\"15b34-9x53qySfiBbrEoa/epLfgNwd4W4\"",
    "mtime": "2024-12-29T13:56:03.089Z",
    "size": 88884,
    "path": "../public/twitter-image.jpg"
  },
  "/css/nuxt-google-fonts.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"6ef9-e97zGAqDC27IAvCMPDGioPDs04s\"",
    "mtime": "2024-12-29T13:56:03.023Z",
    "size": 28409,
    "path": "../public/css/nuxt-google-fonts.css"
  },
  "/fonts/Inter-400-1.woff2": {
    "type": "font/woff2",
    "etag": "\"6520-ZPN63f5CbAs+du8gr4AxkcON9bM\"",
    "mtime": "2024-12-29T13:56:03.023Z",
    "size": 25888,
    "path": "../public/fonts/Inter-400-1.woff2"
  },
  "/fonts/Inter-400-2.woff2": {
    "type": "font/woff2",
    "etag": "\"4934-2DpHlCV17rgNMOvHv5pbb4PJMPs\"",
    "mtime": "2024-12-29T13:56:03.023Z",
    "size": 18740,
    "path": "../public/fonts/Inter-400-2.woff2"
  },
  "/fonts/Inter-400-3.woff2": {
    "type": "font/woff2",
    "etag": "\"2bc0-4RJqkAfSfa5JZkesG5c1br84Zxw\"",
    "mtime": "2024-12-29T13:56:03.024Z",
    "size": 11200,
    "path": "../public/fonts/Inter-400-3.woff2"
  },
  "/fonts/Inter-400-4.woff2": {
    "type": "font/woff2",
    "etag": "\"4a80-xHUXj1OV6ywtVWyPDpJQI3wBncg\"",
    "mtime": "2024-12-29T13:56:03.023Z",
    "size": 19072,
    "path": "../public/fonts/Inter-400-4.woff2"
  },
  "/fonts/Inter-400-5.woff2": {
    "type": "font/woff2",
    "etag": "\"280c-nBythjoDQ0+5wVAendJ6wU7Xz2M\"",
    "mtime": "2024-12-29T13:56:03.023Z",
    "size": 10252,
    "path": "../public/fonts/Inter-400-5.woff2"
  },
  "/fonts/Inter-400-6.woff2": {
    "type": "font/woff2",
    "etag": "\"12258-7g69LvBHk3zYylRxciKRVYE/+Tk\"",
    "mtime": "2024-12-29T13:56:03.023Z",
    "size": 74328,
    "path": "../public/fonts/Inter-400-6.woff2"
  },
  "/fonts/Inter-400-7.woff2": {
    "type": "font/woff2",
    "etag": "\"bd3c-10AkFnU64btMvUsQ0zoMEFF4OL0\"",
    "mtime": "2024-12-29T13:56:03.023Z",
    "size": 48444,
    "path": "../public/fonts/Inter-400-7.woff2"
  },
  "/fonts/Plus_Jakarta_Sans-400-36.woff2": {
    "type": "font/woff2",
    "etag": "\"64c-ect/J6RO92774AKd9cXVV48ib64\"",
    "mtime": "2024-12-29T13:56:03.023Z",
    "size": 1612,
    "path": "../public/fonts/Plus_Jakarta_Sans-400-36.woff2"
  },
  "/fonts/Plus_Jakarta_Sans-400-37.woff2": {
    "type": "font/woff2",
    "etag": "\"2070-7VTfKsv+FbKKKjlXFixBbwkm3Yw\"",
    "mtime": "2024-12-29T13:56:03.023Z",
    "size": 8304,
    "path": "../public/fonts/Plus_Jakarta_Sans-400-37.woff2"
  },
  "/fonts/Plus_Jakarta_Sans-400-38.woff2": {
    "type": "font/woff2",
    "etag": "\"543c-g3NbIoR7X4306ZXpwZZSBDwCd5o\"",
    "mtime": "2024-12-29T13:56:03.025Z",
    "size": 21564,
    "path": "../public/fonts/Plus_Jakarta_Sans-400-38.woff2"
  },
  "/fonts/Plus_Jakarta_Sans-400-39.woff2": {
    "type": "font/woff2",
    "etag": "\"6b34-F0x/KZFYEDEn1Q3oLxCGw7Zuglg\"",
    "mtime": "2024-12-29T13:56:03.024Z",
    "size": 27444,
    "path": "../public/fonts/Plus_Jakarta_Sans-400-39.woff2"
  },
  "/fonts/Rubik-300-52.woff2": {
    "type": "font/woff2",
    "etag": "\"7e74-iq2QQtHHrb1flGFZJ3/wf89XSuI\"",
    "mtime": "2024-12-29T13:56:03.024Z",
    "size": 32372,
    "path": "../public/fonts/Rubik-300-52.woff2"
  },
  "/fonts/Rubik-300-53.woff2": {
    "type": "font/woff2",
    "etag": "\"2fcc-by4xn5J1KU6WMzrDZAJHSL/xZwo\"",
    "mtime": "2024-12-29T13:56:03.024Z",
    "size": 12236,
    "path": "../public/fonts/Rubik-300-53.woff2"
  },
  "/fonts/Rubik-300-54.woff2": {
    "type": "font/woff2",
    "etag": "\"3ae4-1TcHSY1y/hkfVL5KxV8KnIdYH4M\"",
    "mtime": "2024-12-29T13:56:03.024Z",
    "size": 15076,
    "path": "../public/fonts/Rubik-300-54.woff2"
  },
  "/fonts/Rubik-300-55.woff2": {
    "type": "font/woff2",
    "etag": "\"2200-6gXuEzXiAZdd8zvjjDKamm3t6a8\"",
    "mtime": "2024-12-29T13:56:03.024Z",
    "size": 8704,
    "path": "../public/fonts/Rubik-300-55.woff2"
  },
  "/fonts/Rubik-300-56.woff2": {
    "type": "font/woff2",
    "etag": "\"49f0-mro5l2iZAnE6r3/tzO1HEKA/zQw\"",
    "mtime": "2024-12-29T13:56:03.024Z",
    "size": 18928,
    "path": "../public/fonts/Rubik-300-56.woff2"
  },
  "/fonts/Rubik-300-57.woff2": {
    "type": "font/woff2",
    "etag": "\"8a78-dgXgFBgNSQh3hTUL0ZBsFsOJaQ0\"",
    "mtime": "2024-12-29T13:56:03.025Z",
    "size": 35448,
    "path": "../public/fonts/Rubik-300-57.woff2"
  },
  "/_nuxt/1f1E8wxj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3199-aLP1oGRbrw/tyEtdldS6CDkceCw\"",
    "mtime": "2024-12-29T13:56:03.040Z",
    "size": 12697,
    "path": "../public/_nuxt/1f1E8wxj.js"
  },
  "/_nuxt/1oPB9uN7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2d2c-Yv+CPPb/OWHUZ76fNSTfMt9hhe0\"",
    "mtime": "2024-12-29T13:56:03.040Z",
    "size": 11564,
    "path": "../public/_nuxt/1oPB9uN7.js"
  },
  "/_nuxt/6uC0lmjy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2aca6-oZX/s4mBauFQR/ipKFzxbI6woBY\"",
    "mtime": "2024-12-29T13:56:03.041Z",
    "size": 175270,
    "path": "../public/_nuxt/6uC0lmjy.js"
  },
  "/_nuxt/8d25wbmW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"14a-9qmbL9//wLEdYoAQTcbU/2JFulU\"",
    "mtime": "2024-12-29T13:56:03.040Z",
    "size": 330,
    "path": "../public/_nuxt/8d25wbmW.js"
  },
  "/_nuxt/B0bfzGo_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"59-Yg1WpC89GFGCCwl4Win3xRmmiug\"",
    "mtime": "2024-12-29T13:56:03.040Z",
    "size": 89,
    "path": "../public/_nuxt/B0bfzGo_.js"
  },
  "/_nuxt/B16HWWvZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"63d-mpUBk4ztoxgcjS+2/1XatCng7t8\"",
    "mtime": "2024-12-29T13:56:03.041Z",
    "size": 1597,
    "path": "../public/_nuxt/B16HWWvZ.js"
  },
  "/_nuxt/B4iGM1WG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3464-BXEOwst4F13Sf2sS5gNRRTGNUjE\"",
    "mtime": "2024-12-29T13:56:03.041Z",
    "size": 13412,
    "path": "../public/_nuxt/B4iGM1WG.js"
  },
  "/_nuxt/BA4Uawfj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"63-pbznVCFQsPq7xXTwEmzRajPiy/I\"",
    "mtime": "2024-12-29T13:56:03.041Z",
    "size": 99,
    "path": "../public/_nuxt/BA4Uawfj.js"
  },
  "/_nuxt/BDOqFrHp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"a83-kPiOE7vmBvhgZJCuy7d2YUmN2wo\"",
    "mtime": "2024-12-29T13:56:03.041Z",
    "size": 2691,
    "path": "../public/_nuxt/BDOqFrHp.js"
  },
  "/_nuxt/BKPiID4E.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"22ae-H2nOETx1D/QIrwwlwezSk9Y2vVE\"",
    "mtime": "2024-12-29T13:56:03.041Z",
    "size": 8878,
    "path": "../public/_nuxt/BKPiID4E.js"
  },
  "/_nuxt/BPOkh3qr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3379-HPzBSrulFhMnB5gn2N9dHZW3ryo\"",
    "mtime": "2024-12-29T13:56:03.041Z",
    "size": 13177,
    "path": "../public/_nuxt/BPOkh3qr.js"
  },
  "/_nuxt/BPVJLfsd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2370-tz0AA/Xud0E28fuUWM6roX2N4dE\"",
    "mtime": "2024-12-29T13:56:03.041Z",
    "size": 9072,
    "path": "../public/_nuxt/BPVJLfsd.js"
  },
  "/_nuxt/BeGoaAoP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4dd1-8UVMH1bTZnn1cIeggwblZTBQ6e4\"",
    "mtime": "2024-12-29T13:56:03.041Z",
    "size": 19921,
    "path": "../public/_nuxt/BeGoaAoP.js"
  },
  "/_nuxt/BidKDOwI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2ff-2KAb/UsDTpLPLwJ2Gn5xxjUHj9c\"",
    "mtime": "2024-12-29T13:56:03.041Z",
    "size": 767,
    "path": "../public/_nuxt/BidKDOwI.js"
  },
  "/_nuxt/BqHl1s3T.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ba1-xfukneZjZpP1ZquHZGncNGMhAv4\"",
    "mtime": "2024-12-29T13:56:03.041Z",
    "size": 2977,
    "path": "../public/_nuxt/BqHl1s3T.js"
  },
  "/_nuxt/BymboeYA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"c4-bnf3A58S0lz0E3OtJ213/hltPwU\"",
    "mtime": "2024-12-29T13:56:03.041Z",
    "size": 196,
    "path": "../public/_nuxt/BymboeYA.js"
  },
  "/_nuxt/C6XEkE1i.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6a9-zCJEomEmY9qMlkzdxmNZ6u89VXI\"",
    "mtime": "2024-12-29T13:56:03.041Z",
    "size": 1705,
    "path": "../public/_nuxt/C6XEkE1i.js"
  },
  "/_nuxt/CDZG8UKf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1265-Z0vqvAg6iD5OxkQuipDBrwfgEqY\"",
    "mtime": "2024-12-29T13:56:03.042Z",
    "size": 4709,
    "path": "../public/_nuxt/CDZG8UKf.js"
  },
  "/_nuxt/CKtQArPP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"9dc-4PIoVyIBjtXoWV0DJStZBfFkYHo\"",
    "mtime": "2024-12-29T13:56:03.042Z",
    "size": 2524,
    "path": "../public/_nuxt/CKtQArPP.js"
  },
  "/_nuxt/CMS1F1dM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1022-OmtKOaylbXze2yRNt1o62SKBCYQ\"",
    "mtime": "2024-12-29T13:56:03.042Z",
    "size": 4130,
    "path": "../public/_nuxt/CMS1F1dM.js"
  },
  "/_nuxt/CaSUQcdY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1998-1G1PCalV5ZsPdO9ymFHvmPoLnt0\"",
    "mtime": "2024-12-29T13:56:03.042Z",
    "size": 6552,
    "path": "../public/_nuxt/CaSUQcdY.js"
  },
  "/_nuxt/CerxlvPd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"57-SIMdNhlUvnZxoR2ovjGhAbSWp9o\"",
    "mtime": "2024-12-29T13:56:03.042Z",
    "size": 87,
    "path": "../public/_nuxt/CerxlvPd.js"
  },
  "/_nuxt/CfZTa12F.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"17e8-XsYvjqo2jcirg4yf5i3VxwrCvos\"",
    "mtime": "2024-12-29T13:56:03.042Z",
    "size": 6120,
    "path": "../public/_nuxt/CfZTa12F.js"
  },
  "/_nuxt/Ch6e3OZ9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"156f-cIs+qlGyAWAMc68gjkquDJHo/6w\"",
    "mtime": "2024-12-29T13:56:03.042Z",
    "size": 5487,
    "path": "../public/_nuxt/Ch6e3OZ9.js"
  },
  "/_nuxt/ChhuPZy5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"59-Uix76BfCTkXqvTbNpo19nhRJYQY\"",
    "mtime": "2024-12-29T13:56:03.042Z",
    "size": 89,
    "path": "../public/_nuxt/ChhuPZy5.js"
  },
  "/_nuxt/CkqZg5ch.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"41b-CiO7a0pRYqlhUwkpH6TOEkWxNXg\"",
    "mtime": "2024-12-29T13:56:03.042Z",
    "size": 1051,
    "path": "../public/_nuxt/CkqZg5ch.js"
  },
  "/_nuxt/CtTeSTlS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"905-PeeATKqRKDS3fK4mVJNO2G+awHc\"",
    "mtime": "2024-12-29T13:56:03.043Z",
    "size": 2309,
    "path": "../public/_nuxt/CtTeSTlS.js"
  },
  "/_nuxt/CustomModalVideo.DRs-016B.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"421-DfqkBBYHbOAF13fihhkcuecoxB4\"",
    "mtime": "2024-12-29T13:56:03.042Z",
    "size": 1057,
    "path": "../public/_nuxt/CustomModalVideo.DRs-016B.css"
  },
  "/_nuxt/D-nKUy2z.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"797-1X9y76CW6al+1yD8b21WMJI50Zk\"",
    "mtime": "2024-12-29T13:56:03.042Z",
    "size": 1943,
    "path": "../public/_nuxt/D-nKUy2z.js"
  },
  "/_nuxt/D2AsrjkZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"7617-v4g4ggs6v0/roVvsmM21UGAr/oo\"",
    "mtime": "2024-12-29T13:56:03.043Z",
    "size": 30231,
    "path": "../public/_nuxt/D2AsrjkZ.js"
  },
  "/_nuxt/D7ksKH5h.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"392c4-4qjqol3YRiVTjw2YJmvOOlEFdgY\"",
    "mtime": "2024-12-29T13:56:03.044Z",
    "size": 234180,
    "path": "../public/_nuxt/D7ksKH5h.js"
  },
  "/_nuxt/DKuEeXfH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"14f7-tYEAIlkN6z1ROlPXHGmy+ZN3vZI\"",
    "mtime": "2024-12-29T13:56:03.043Z",
    "size": 5367,
    "path": "../public/_nuxt/DKuEeXfH.js"
  },
  "/_nuxt/DSvM-Gdy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"25ef-YsIe7ZJrVzlmGHF3M0kHl0l7HCQ\"",
    "mtime": "2024-12-29T13:56:03.043Z",
    "size": 9711,
    "path": "../public/_nuxt/DSvM-Gdy.js"
  },
  "/_nuxt/DTLacGP4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"24e2-reTEH050OXTpBxFGd2Dc+WEtR0E\"",
    "mtime": "2024-12-29T13:56:03.043Z",
    "size": 9442,
    "path": "../public/_nuxt/DTLacGP4.js"
  },
  "/_nuxt/DXISTzL2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"40dc-2bM1WfZCgP7nRQGl0OKerEHXY8E\"",
    "mtime": "2024-12-29T13:56:03.043Z",
    "size": 16604,
    "path": "../public/_nuxt/DXISTzL2.js"
  },
  "/_nuxt/Do_R7Ttm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"39b-A22eWKJDtfyaE8gaGPxUQJSp5LA\"",
    "mtime": "2024-12-29T13:56:03.043Z",
    "size": 923,
    "path": "../public/_nuxt/Do_R7Ttm.js"
  },
  "/_nuxt/DptEK5_m.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"14a-3drjUj0ksqJh1euFLxhCQJAvm9U\"",
    "mtime": "2024-12-29T13:56:03.043Z",
    "size": 330,
    "path": "../public/_nuxt/DptEK5_m.js"
  },
  "/_nuxt/DxkPMT6A.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1679-9syEZ45fje9BBDdgnUgY+/8RCNs\"",
    "mtime": "2024-12-29T13:56:03.043Z",
    "size": 5753,
    "path": "../public/_nuxt/DxkPMT6A.js"
  },
  "/_nuxt/Inter-400-1.B2xhLi22.woff2": {
    "type": "font/woff2",
    "etag": "\"6520-ZPN63f5CbAs+du8gr4AxkcON9bM\"",
    "mtime": "2024-12-29T13:56:03.043Z",
    "size": 25888,
    "path": "../public/_nuxt/Inter-400-1.B2xhLi22.woff2"
  },
  "/_nuxt/Inter-400-2.CMZtQduZ.woff2": {
    "type": "font/woff2",
    "etag": "\"4934-2DpHlCV17rgNMOvHv5pbb4PJMPs\"",
    "mtime": "2024-12-29T13:56:03.044Z",
    "size": 18740,
    "path": "../public/_nuxt/Inter-400-2.CMZtQduZ.woff2"
  },
  "/_nuxt/Inter-400-3.CGAr0uHJ.woff2": {
    "type": "font/woff2",
    "etag": "\"2bc0-4RJqkAfSfa5JZkesG5c1br84Zxw\"",
    "mtime": "2024-12-29T13:56:03.044Z",
    "size": 11200,
    "path": "../public/_nuxt/Inter-400-3.CGAr0uHJ.woff2"
  },
  "/_nuxt/Inter-400-4.CaVNZxsx.woff2": {
    "type": "font/woff2",
    "etag": "\"4a80-xHUXj1OV6ywtVWyPDpJQI3wBncg\"",
    "mtime": "2024-12-29T13:56:03.044Z",
    "size": 19072,
    "path": "../public/_nuxt/Inter-400-4.CaVNZxsx.woff2"
  },
  "/_nuxt/Inter-400-5.CBcvBZtf.woff2": {
    "type": "font/woff2",
    "etag": "\"280c-nBythjoDQ0+5wVAendJ6wU7Xz2M\"",
    "mtime": "2024-12-29T13:56:03.044Z",
    "size": 10252,
    "path": "../public/_nuxt/Inter-400-5.CBcvBZtf.woff2"
  },
  "/_nuxt/Inter-400-6.CFHvXkgd.woff2": {
    "type": "font/woff2",
    "etag": "\"12258-7g69LvBHk3zYylRxciKRVYE/+Tk\"",
    "mtime": "2024-12-29T13:56:03.044Z",
    "size": 74328,
    "path": "../public/_nuxt/Inter-400-6.CFHvXkgd.woff2"
  },
  "/_nuxt/Inter-400-7.C2S99t-D.woff2": {
    "type": "font/woff2",
    "etag": "\"bd3c-10AkFnU64btMvUsQ0zoMEFF4OL0\"",
    "mtime": "2024-12-29T13:56:03.044Z",
    "size": 48444,
    "path": "../public/_nuxt/Inter-400-7.C2S99t-D.woff2"
  },
  "/_nuxt/M13aDXwT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"29a8-/mR2sDBEZ2jTjbAkzQz/EWIEjtk\"",
    "mtime": "2024-12-29T13:56:03.044Z",
    "size": 10664,
    "path": "../public/_nuxt/M13aDXwT.js"
  },
  "/_nuxt/Nb8vE6F7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"23c4-OZtj6tCZGIfjhySaH3dqeUnsrWU\"",
    "mtime": "2024-12-29T13:56:03.044Z",
    "size": 9156,
    "path": "../public/_nuxt/Nb8vE6F7.js"
  },
  "/_nuxt/NxMVxrF8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"9cf-3B6hm2x4mETWdfXD2QH80IQDhu4\"",
    "mtime": "2024-12-29T13:56:03.044Z",
    "size": 2511,
    "path": "../public/_nuxt/NxMVxrF8.js"
  },
  "/_nuxt/Plus_Jakarta_Sans-400-37.Bnh6xcKr.woff2": {
    "type": "font/woff2",
    "etag": "\"2070-7VTfKsv+FbKKKjlXFixBbwkm3Yw\"",
    "mtime": "2024-12-29T13:56:03.044Z",
    "size": 8304,
    "path": "../public/_nuxt/Plus_Jakarta_Sans-400-37.Bnh6xcKr.woff2"
  },
  "/_nuxt/Plus_Jakarta_Sans-400-38.Ch-K9LVU.woff2": {
    "type": "font/woff2",
    "etag": "\"543c-g3NbIoR7X4306ZXpwZZSBDwCd5o\"",
    "mtime": "2024-12-29T13:56:03.045Z",
    "size": 21564,
    "path": "../public/_nuxt/Plus_Jakarta_Sans-400-38.Ch-K9LVU.woff2"
  },
  "/_nuxt/Plus_Jakarta_Sans-400-39.BD2oGHtS.woff2": {
    "type": "font/woff2",
    "etag": "\"6b34-F0x/KZFYEDEn1Q3oLxCGw7Zuglg\"",
    "mtime": "2024-12-29T13:56:03.045Z",
    "size": 27444,
    "path": "../public/_nuxt/Plus_Jakarta_Sans-400-39.BD2oGHtS.woff2"
  },
  "/_nuxt/Rubik-300-52.B1cAZTnW.woff2": {
    "type": "font/woff2",
    "etag": "\"7e74-iq2QQtHHrb1flGFZJ3/wf89XSuI\"",
    "mtime": "2024-12-29T13:56:03.045Z",
    "size": 32372,
    "path": "../public/_nuxt/Rubik-300-52.B1cAZTnW.woff2"
  },
  "/_nuxt/Rubik-300-53.CmWdqlJJ.woff2": {
    "type": "font/woff2",
    "etag": "\"2fcc-by4xn5J1KU6WMzrDZAJHSL/xZwo\"",
    "mtime": "2024-12-29T13:56:03.045Z",
    "size": 12236,
    "path": "../public/_nuxt/Rubik-300-53.CmWdqlJJ.woff2"
  },
  "/_nuxt/Rubik-300-54.B2b851D6.woff2": {
    "type": "font/woff2",
    "etag": "\"3ae4-1TcHSY1y/hkfVL5KxV8KnIdYH4M\"",
    "mtime": "2024-12-29T13:56:03.045Z",
    "size": 15076,
    "path": "../public/_nuxt/Rubik-300-54.B2b851D6.woff2"
  },
  "/_nuxt/Rubik-300-55.ByHZ5yRs.woff2": {
    "type": "font/woff2",
    "etag": "\"2200-6gXuEzXiAZdd8zvjjDKamm3t6a8\"",
    "mtime": "2024-12-29T13:56:03.045Z",
    "size": 8704,
    "path": "../public/_nuxt/Rubik-300-55.ByHZ5yRs.woff2"
  },
  "/_nuxt/Rubik-300-56.dLedyG89.woff2": {
    "type": "font/woff2",
    "etag": "\"49f0-mro5l2iZAnE6r3/tzO1HEKA/zQw\"",
    "mtime": "2024-12-29T13:56:03.045Z",
    "size": 18928,
    "path": "../public/_nuxt/Rubik-300-56.dLedyG89.woff2"
  },
  "/_nuxt/Rubik-300-57.CfpeRlx2.woff2": {
    "type": "font/woff2",
    "etag": "\"8a78-dgXgFBgNSQh3hTUL0ZBsFsOJaQ0\"",
    "mtime": "2024-12-29T13:56:03.045Z",
    "size": 35448,
    "path": "../public/_nuxt/Rubik-300-57.CfpeRlx2.woff2"
  },
  "/_nuxt/bg-01.BFmrfHW6.jpg": {
    "type": "image/jpeg",
    "etag": "\"2c3d-PXXJhyfClv1HZo4MmEG9LujbMo4\"",
    "mtime": "2024-12-29T13:56:03.045Z",
    "size": 11325,
    "path": "../public/_nuxt/bg-01.BFmrfHW6.jpg"
  },
  "/_nuxt/bg-02.CKspjl9z.jpg": {
    "type": "image/jpeg",
    "etag": "\"1d21-9VKYCBGIRy2iYqGVH0ijHVg5rwM\"",
    "mtime": "2024-12-29T13:56:03.045Z",
    "size": 7457,
    "path": "../public/_nuxt/bg-02.CKspjl9z.jpg"
  },
  "/_nuxt/bg-03.BLoOC4VG.jpg": {
    "type": "image/jpeg",
    "etag": "\"394d-ZJCsyx7OdJBx+ZE372Vo+fW2Vk8\"",
    "mtime": "2024-12-29T13:56:03.045Z",
    "size": 14669,
    "path": "../public/_nuxt/bg-03.BLoOC4VG.jpg"
  },
  "/_nuxt/bg-04.DkG06qhk.jpg": {
    "type": "image/jpeg",
    "etag": "\"2898-MFpYxW2sXLrqME1DL+6H4LCxOo8\"",
    "mtime": "2024-12-29T13:56:03.045Z",
    "size": 10392,
    "path": "../public/_nuxt/bg-04.DkG06qhk.jpg"
  },
  "/_nuxt/bg-05.D5cJxiFu.jpg": {
    "type": "image/jpeg",
    "etag": "\"2e2d-vmqu3klvbG1gLJByEme9XEfC4e8\"",
    "mtime": "2024-12-29T13:56:03.045Z",
    "size": 11821,
    "path": "../public/_nuxt/bg-05.D5cJxiFu.jpg"
  },
  "/_nuxt/blur-purple.CACy1Mc_.png": {
    "type": "image/png",
    "etag": "\"24cfe-GH8DNrA+//QPpc/1TTlGIMchMw4\"",
    "mtime": "2024-12-29T13:56:03.046Z",
    "size": 150782,
    "path": "../public/_nuxt/blur-purple.CACy1Mc_.png"
  },
  "/_nuxt/brandLogos.DMfaDL2h.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"56-h66fFKbd1F6NyN9MHutuWo5M9EQ\"",
    "mtime": "2024-12-29T13:56:03.046Z",
    "size": 86,
    "path": "../public/_nuxt/brandLogos.DMfaDL2h.css"
  },
  "/_nuxt/default.B36kvu4T.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"146-bYkM2fsfQFAh6fPwUuX9HufQH9U\"",
    "mtime": "2024-12-29T13:56:03.046Z",
    "size": 326,
    "path": "../public/_nuxt/default.B36kvu4T.css"
  },
  "/_nuxt/default.DX86XBOr.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"78d-Newjv2znH5C6xHn+UTCEX6YYXMo\"",
    "mtime": "2024-12-29T13:56:03.046Z",
    "size": 1933,
    "path": "../public/_nuxt/default.DX86XBOr.css"
  },
  "/_nuxt/entry.CFc76VMl.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"db027-EtAeni/0lzTLdBYKRV69n63pbU8\"",
    "mtime": "2024-12-29T13:56:03.049Z",
    "size": 897063,
    "path": "../public/_nuxt/entry.CFc76VMl.css"
  },
  "/_nuxt/flaticon.B67B1oJ2.svg": {
    "type": "image/svg+xml",
    "etag": "\"8520b-rdCL5EwbJPRi/nrLjKHxJvAdRv8\"",
    "mtime": "2024-12-29T13:56:03.048Z",
    "size": 545291,
    "path": "../public/_nuxt/flaticon.B67B1oJ2.svg"
  },
  "/_nuxt/flaticon.BAMUqhvK.woff2": {
    "type": "font/woff2",
    "etag": "\"7a4c-BBFiiib87LictjvzxCWYshvdnKY\"",
    "mtime": "2024-12-29T13:56:03.046Z",
    "size": 31308,
    "path": "../public/_nuxt/flaticon.BAMUqhvK.woff2"
  },
  "/_nuxt/flaticon.DOECBS8h.ttf": {
    "type": "font/ttf",
    "etag": "\"1006c-VChB588nX/g5lyfOMmSgaer1hJg\"",
    "mtime": "2024-12-29T13:56:03.047Z",
    "size": 65644,
    "path": "../public/_nuxt/flaticon.DOECBS8h.ttf"
  },
  "/_nuxt/flaticon.DeV2lt_K.woff": {
    "type": "font/woff",
    "etag": "\"91a0-AYvkpuFqxq/cz1zelXj4+ejXJyM\"",
    "mtime": "2024-12-29T13:56:03.047Z",
    "size": 37280,
    "path": "../public/_nuxt/flaticon.DeV2lt_K.woff"
  },
  "/_nuxt/flaticon.h08Ea4OL.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"10114-ike/yb4Abz1vvpRN8UaGP3yirak\"",
    "mtime": "2024-12-29T13:56:03.047Z",
    "size": 65812,
    "path": "../public/_nuxt/flaticon.h08Ea4OL.eot"
  },
  "/_nuxt/help-center.CgzU30qV.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"203-opLG5p7K+/lS/5PwlLvVjj7A+J0\"",
    "mtime": "2024-12-29T13:56:03.047Z",
    "size": 515,
    "path": "../public/_nuxt/help-center.CgzU30qV.css"
  },
  "/_nuxt/hero-1.BiMUkGJk.jpg": {
    "type": "image/jpeg",
    "etag": "\"3f6a-7Lp8lEsGOZq7TdWZeDsYaWlwrhA\"",
    "mtime": "2024-12-29T13:56:03.047Z",
    "size": 16234,
    "path": "../public/_nuxt/hero-1.BiMUkGJk.jpg"
  },
  "/_nuxt/hero-11.BIXBVxy2.jpg": {
    "type": "image/jpeg",
    "etag": "\"2897-XqHJ/vnNMOSLw/kWD9gRK1eG9o8\"",
    "mtime": "2024-12-29T13:56:03.047Z",
    "size": 10391,
    "path": "../public/_nuxt/hero-11.BIXBVxy2.jpg"
  },
  "/_nuxt/hero-12.DsLgfKT9.jpg": {
    "type": "image/jpeg",
    "etag": "\"2b8c-O78QMvZWMOMLsk+9ZQH5IhUoULU\"",
    "mtime": "2024-12-29T13:56:03.048Z",
    "size": 11148,
    "path": "../public/_nuxt/hero-12.DsLgfKT9.jpg"
  },
  "/_nuxt/hero-14.CqDTZ9dR.jpg": {
    "type": "image/jpeg",
    "etag": "\"938f-T51LSI8JHxmzUbY6AVn7Ps6YiFk\"",
    "mtime": "2024-12-29T13:56:03.048Z",
    "size": 37775,
    "path": "../public/_nuxt/hero-14.CqDTZ9dR.jpg"
  },
  "/_nuxt/hero-15-dark.DtbGVBOB.jpg": {
    "type": "image/jpeg",
    "etag": "\"16112-2NRM05gfka1xz1g6N6rTw67vbj4\"",
    "mtime": "2024-12-29T13:56:03.048Z",
    "size": 90386,
    "path": "../public/_nuxt/hero-15-dark.DtbGVBOB.jpg"
  },
  "/_nuxt/hero-15.CyWkaZFm.jpg": {
    "type": "image/jpeg",
    "etag": "\"2500-weE2xY7bwmUNd2pq6NJJVGp1jnE\"",
    "mtime": "2024-12-29T13:56:03.048Z",
    "size": 9472,
    "path": "../public/_nuxt/hero-15.CyWkaZFm.jpg"
  },
  "/_nuxt/hero-16.CRcoYteB.jpg": {
    "type": "image/jpeg",
    "etag": "\"1d0d-rDSh8lJO7vtxh8WzSLUdwlvRBNU\"",
    "mtime": "2024-12-29T13:56:03.048Z",
    "size": 7437,
    "path": "../public/_nuxt/hero-16.CRcoYteB.jpg"
  },
  "/_nuxt/hero-17-dark.QmUhUTLZ.jpg": {
    "type": "image/jpeg",
    "etag": "\"311c-pIWsO9Z4Dk1wNmmyajY/20umAhQ\"",
    "mtime": "2024-12-29T13:56:03.048Z",
    "size": 12572,
    "path": "../public/_nuxt/hero-17-dark.QmUhUTLZ.jpg"
  },
  "/_nuxt/hero-17.CdQKV-_S.jpg": {
    "type": "image/jpeg",
    "etag": "\"2cdf3-BPOCal0DZS25eteuqU9MXxLOr3U\"",
    "mtime": "2024-12-29T13:56:03.049Z",
    "size": 183795,
    "path": "../public/_nuxt/hero-17.CdQKV-_S.jpg"
  },
  "/_nuxt/hero-18-dark.DmW2ibpR.jpg": {
    "type": "image/jpeg",
    "etag": "\"b71f-xvp6LDYfHlo3hfICwgfNcZht7/g\"",
    "mtime": "2024-12-29T13:56:03.048Z",
    "size": 46879,
    "path": "../public/_nuxt/hero-18-dark.DmW2ibpR.jpg"
  },
  "/_nuxt/hero-20.BCE3TUJn.jpg": {
    "type": "image/jpeg",
    "etag": "\"12c1f-VYKXHxDYwXNFoF7SC4tRCvPsbqw\"",
    "mtime": "2024-12-29T13:56:03.049Z",
    "size": 76831,
    "path": "../public/_nuxt/hero-20.BCE3TUJn.jpg"
  },
  "/_nuxt/hero-22.DvlOxw6n.jpg": {
    "type": "image/jpeg",
    "etag": "\"75ff-U+yGlg2gyY6UjPc3Np367zan26w\"",
    "mtime": "2024-12-29T13:56:03.049Z",
    "size": 30207,
    "path": "../public/_nuxt/hero-22.DvlOxw6n.jpg"
  },
  "/_nuxt/hero-23.Bu6McSH3.jpg": {
    "type": "image/jpeg",
    "etag": "\"2264-13O+VGUajHDrT1MD6Zk22IQTgA4\"",
    "mtime": "2024-12-29T13:56:03.049Z",
    "size": 8804,
    "path": "../public/_nuxt/hero-23.Bu6McSH3.jpg"
  },
  "/_nuxt/hero-24.WQxpl8DG.jpg": {
    "type": "image/jpeg",
    "etag": "\"39e1-JdCDsAf+8MV8en5/Pw9VuNpHO8Y\"",
    "mtime": "2024-12-29T13:56:03.049Z",
    "size": 14817,
    "path": "../public/_nuxt/hero-24.WQxpl8DG.jpg"
  },
  "/_nuxt/hero-25-img.ChKufhyI.png": {
    "type": "image/png",
    "etag": "\"1b957-R1NFotEQ/gYJVO+3Y8cYdq6/E3M\"",
    "mtime": "2024-12-29T13:56:03.049Z",
    "size": 112983,
    "path": "../public/_nuxt/hero-25-img.ChKufhyI.png"
  },
  "/_nuxt/hero-25.CzAXn5BM.jpg": {
    "type": "image/jpeg",
    "etag": "\"14138-DXjiHE7A2M9uogZLQNT7rsF4ajQ\"",
    "mtime": "2024-12-29T13:56:03.049Z",
    "size": 82232,
    "path": "../public/_nuxt/hero-25.CzAXn5BM.jpg"
  },
  "/_nuxt/hero-27-dark.Dsvghe7C.png": {
    "type": "image/png",
    "etag": "\"2042-G91s61/r8AsAQamcLy6/Spy9vxw\"",
    "mtime": "2024-12-29T13:56:03.049Z",
    "size": 8258,
    "path": "../public/_nuxt/hero-27-dark.Dsvghe7C.png"
  },
  "/_nuxt/hero-27.C9k0MFD_.png": {
    "type": "image/png",
    "etag": "\"2042-5EVB40JkotA45IavBy5Isf6/hJw\"",
    "mtime": "2024-12-29T13:56:03.049Z",
    "size": 8258,
    "path": "../public/_nuxt/hero-27.C9k0MFD_.png"
  },
  "/_nuxt/hero-3.DvaSMXgw.jpg": {
    "type": "image/jpeg",
    "etag": "\"4730-0YOS9YdZnXFwnEEwak4pT30ev0Q\"",
    "mtime": "2024-12-29T13:56:03.049Z",
    "size": 18224,
    "path": "../public/_nuxt/hero-3.DvaSMXgw.jpg"
  },
  "/_nuxt/hero-4.CCNTuhq0.jpg": {
    "type": "image/jpeg",
    "etag": "\"2440-Ovhq6OmpqXjwK+pLezZW8VAvFUI\"",
    "mtime": "2024-12-29T13:56:03.049Z",
    "size": 9280,
    "path": "../public/_nuxt/hero-4.CCNTuhq0.jpg"
  },
  "/_nuxt/hero-5-dark.PkJHk2r6.jpg": {
    "type": "image/jpeg",
    "etag": "\"a304-1I/HI//gZCu0hu57F19Af4R+mgo\"",
    "mtime": "2024-12-29T13:56:03.050Z",
    "size": 41732,
    "path": "../public/_nuxt/hero-5-dark.PkJHk2r6.jpg"
  },
  "/_nuxt/hero-5.BLMUdcms.jpg": {
    "type": "image/jpeg",
    "etag": "\"22e1-OpbGbSsvJFCpr9hPBdsTrh/HFp8\"",
    "mtime": "2024-12-29T13:56:03.050Z",
    "size": 8929,
    "path": "../public/_nuxt/hero-5.BLMUdcms.jpg"
  },
  "/_nuxt/hero-8.mfaAWKnN.jpg": {
    "type": "image/jpeg",
    "etag": "\"889f-PTOB46qGas09V11+duVFyAWCEuY\"",
    "mtime": "2024-12-29T13:56:03.050Z",
    "size": 34975,
    "path": "../public/_nuxt/hero-8.mfaAWKnN.jpg"
  },
  "/_nuxt/kXVt4Gof.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"10c-ZmbsEef6r4YOKKjY7EsevWq3VUM\"",
    "mtime": "2024-12-29T13:56:03.050Z",
    "size": 268,
    "path": "../public/_nuxt/kXVt4Gof.js"
  },
  "/_nuxt/login-wrapper.BPI4Hi37.jpg": {
    "type": "image/jpeg",
    "etag": "\"99db-a3oyKxd3kNM6uEDrdCjZm+3Cn2k\"",
    "mtime": "2024-12-29T13:56:03.050Z",
    "size": 39387,
    "path": "../public/_nuxt/login-wrapper.BPI4Hi37.jpg"
  },
  "/_nuxt/login.DH8sNmQ4.jpg": {
    "type": "image/jpeg",
    "etag": "\"241e-W9mEIkeuRUJKK/1GC6bqVKlcUqk\"",
    "mtime": "2024-12-29T13:56:03.050Z",
    "size": 9246,
    "path": "../public/_nuxt/login.DH8sNmQ4.jpg"
  },
  "/_nuxt/login_dark.Cc36181b.jpg": {
    "type": "image/jpeg",
    "etag": "\"2920-ZN0jBZeymHOXQ7ADVjkRuNUgowI\"",
    "mtime": "2024-12-29T13:56:03.050Z",
    "size": 10528,
    "path": "../public/_nuxt/login_dark.Cc36181b.jpg"
  },
  "/_nuxt/modal-request.CSWxqcMs.jpg": {
    "type": "image/jpeg",
    "etag": "\"66f3-sG1Wl/rjA+JWrKS+LpmiznFGfeY\"",
    "mtime": "2024-12-29T13:56:03.051Z",
    "size": 26355,
    "path": "../public/_nuxt/modal-request.CSWxqcMs.jpg"
  },
  "/_nuxt/pattern-01.B-sDGO1l.png": {
    "type": "image/png",
    "etag": "\"2378-SmEqZBYbH+uVffA6LeAZO+9pycE\"",
    "mtime": "2024-12-29T13:56:03.051Z",
    "size": 9080,
    "path": "../public/_nuxt/pattern-01.B-sDGO1l.png"
  },
  "/_nuxt/pattern-02.Bv5MimjD.png": {
    "type": "image/png",
    "etag": "\"6a11-SidEyQ7A89j93Isv+olnIZmKanA\"",
    "mtime": "2024-12-29T13:56:03.051Z",
    "size": 27153,
    "path": "../public/_nuxt/pattern-02.Bv5MimjD.png"
  },
  "/_nuxt/pattern-03.CKMzQQhN.png": {
    "type": "image/png",
    "etag": "\"30b30-9PuKg9BXm9ULrlZPSjmjC+5t7vI\"",
    "mtime": "2024-12-29T13:56:03.051Z",
    "size": 199472,
    "path": "../public/_nuxt/pattern-03.CKMzQQhN.png"
  },
  "/_nuxt/pattern-04.Dt6f00io.png": {
    "type": "image/png",
    "etag": "\"165a1-SuVXcVE039ozgkESeutRUJ1NzV0\"",
    "mtime": "2024-12-29T13:56:03.051Z",
    "size": 91553,
    "path": "../public/_nuxt/pattern-04.Dt6f00io.png"
  },
  "/_nuxt/r6cytFyd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"326c-3gj2ud8lqDFLDkkaxwNaInN2Rfw\"",
    "mtime": "2024-12-29T13:56:03.051Z",
    "size": 12908,
    "path": "../public/_nuxt/r6cytFyd.js"
  },
  "/_nuxt/reset-password.q1oa-ytU.jpg": {
    "type": "image/jpeg",
    "etag": "\"22c7-6YtIEIE1tI69dflFkCu9k4xl2iQ\"",
    "mtime": "2024-12-29T13:56:03.051Z",
    "size": 8903,
    "path": "../public/_nuxt/reset-password.q1oa-ytU.jpg"
  },
  "/_nuxt/swiper-vue.Bs3d9ZnH.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"458b-ZRgiK6Rdj9nnlxRPZg+qVlCBZ+k\"",
    "mtime": "2024-12-29T13:56:03.051Z",
    "size": 17803,
    "path": "../public/_nuxt/swiper-vue.Bs3d9ZnH.css"
  },
  "/_nuxt/wTXcVuDc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"c9-xwLxSAtn2OnmBNlPx2TSVnE2RpI\"",
    "mtime": "2024-12-29T13:56:03.051Z",
    "size": 201,
    "path": "../public/_nuxt/wTXcVuDc.js"
  },
  "/assets/images/.DS_Store": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"1804-H0ID7tmR2F3CAAZuv5MRmJsq4eI\"",
    "mtime": "2024-12-29T13:56:03.081Z",
    "size": 6148,
    "path": "../public/assets/images/.DS_Store"
  },
  "/assets/images/DCLogo.png": {
    "type": "image/png",
    "etag": "\"4f820-AOz9CGG62IUFrcNP8cix4fEJPx8\"",
    "mtime": "2024-12-29T13:56:03.084Z",
    "size": 325664,
    "path": "../public/assets/images/DCLogo.png"
  },
  "/assets/images/DafeenaLogo.png": {
    "type": "image/png",
    "etag": "\"4f820-AOz9CGG62IUFrcNP8cix4fEJPx8\"",
    "mtime": "2024-12-29T13:56:03.085Z",
    "size": 325664,
    "path": "../public/assets/images/DafeenaLogo.png"
  },
  "/assets/images/a2-1.jpg": {
    "type": "image/jpeg",
    "etag": "\"fd31-1F9jGqf/zTTp0ZOStAZpYkoyznA\"",
    "mtime": "2024-12-29T13:56:03.089Z",
    "size": 64817,
    "path": "../public/assets/images/a2-1.jpg"
  },
  "/assets/images/a2-2.jpg": {
    "type": "image/jpeg",
    "etag": "\"14368-m9azqOXoC/zlrocDlb/W71ite5M\"",
    "mtime": "2024-12-29T13:56:03.083Z",
    "size": 82792,
    "path": "../public/assets/images/a2-2.jpg"
  },
  "/assets/images/a2-3.jpg": {
    "type": "image/jpeg",
    "etag": "\"1a6c2-QxraBRKmHGs6r3uWnm/kdyASU20\"",
    "mtime": "2024-12-29T13:56:03.085Z",
    "size": 108226,
    "path": "../public/assets/images/a2-3.jpg"
  },
  "/assets/images/a2-4.jpg": {
    "type": "image/jpeg",
    "etag": "\"84d1-YXXFtevA1mvFOxc6PjhKyIQRcZY\"",
    "mtime": "2024-12-29T13:56:03.089Z",
    "size": 34001,
    "path": "../public/assets/images/a2-4.jpg"
  },
  "/assets/images/a4-1.png": {
    "type": "image/png",
    "etag": "\"c839-05thJ0zn3K6SS6WY6YNPD3RzsrA\"",
    "mtime": "2024-12-29T13:56:03.085Z",
    "size": 51257,
    "path": "../public/assets/images/a4-1.png"
  },
  "/assets/images/a4-2.png": {
    "type": "image/png",
    "etag": "\"f4e6-UgLMbhSWlfuJVfud8ArErGC3+4g\"",
    "mtime": "2024-12-29T13:56:03.086Z",
    "size": 62694,
    "path": "../public/assets/images/a4-2.png"
  },
  "/assets/images/apple-touch-icon-120x120.png": {
    "type": "image/png",
    "etag": "\"3a7-cPKXucAWJ1xLPmyw8StSl5UScLM\"",
    "mtime": "2024-12-29T13:56:03.087Z",
    "size": 935,
    "path": "../public/assets/images/apple-touch-icon-120x120.png"
  },
  "/assets/images/apple-touch-icon-152x152.png": {
    "type": "image/png",
    "etag": "\"4a8-6g/TY6koF24bQxSO5miVuInunmc\"",
    "mtime": "2024-12-29T13:56:03.087Z",
    "size": 1192,
    "path": "../public/assets/images/apple-touch-icon-152x152.png"
  },
  "/assets/images/apple-touch-icon-76x76.png": {
    "type": "image/png",
    "etag": "\"2a2-7iRFVnVBh2PQokk7ALf/OMpO6QE\"",
    "mtime": "2024-12-29T13:56:03.091Z",
    "size": 674,
    "path": "../public/assets/images/apple-touch-icon-76x76.png"
  },
  "/assets/images/apple-touch-icon.png": {
    "type": "image/png",
    "etag": "\"264-44xNUKDYCPRrcyRtcD4P8sEQsTw\"",
    "mtime": "2024-12-29T13:56:03.088Z",
    "size": 612,
    "path": "../public/assets/images/apple-touch-icon.png"
  },
  "/assets/images/bg-01.jpg": {
    "type": "image/jpeg",
    "etag": "\"2c3d-PXXJhyfClv1HZo4MmEG9LujbMo4\"",
    "mtime": "2024-12-29T13:56:03.089Z",
    "size": 11325,
    "path": "../public/assets/images/bg-01.jpg"
  },
  "/assets/images/bg-02.jpg": {
    "type": "image/jpeg",
    "etag": "\"1d21-9VKYCBGIRy2iYqGVH0ijHVg5rwM\"",
    "mtime": "2024-12-29T13:56:03.089Z",
    "size": 7457,
    "path": "../public/assets/images/bg-02.jpg"
  },
  "/assets/images/bg-03.jpg": {
    "type": "image/jpeg",
    "etag": "\"394d-ZJCsyx7OdJBx+ZE372Vo+fW2Vk8\"",
    "mtime": "2024-12-29T13:56:03.089Z",
    "size": 14669,
    "path": "../public/assets/images/bg-03.jpg"
  },
  "/assets/images/bg-04.jpg": {
    "type": "image/jpeg",
    "etag": "\"2898-MFpYxW2sXLrqME1DL+6H4LCxOo8\"",
    "mtime": "2024-12-29T13:56:03.093Z",
    "size": 10392,
    "path": "../public/assets/images/bg-04.jpg"
  },
  "/assets/images/bg-05.jpg": {
    "type": "image/jpeg",
    "etag": "\"2e2d-vmqu3klvbG1gLJByEme9XEfC4e8\"",
    "mtime": "2024-12-29T13:56:03.092Z",
    "size": 11821,
    "path": "../public/assets/images/bg-05.jpg"
  },
  "/assets/images/blur-purple.png": {
    "type": "image/png",
    "etag": "\"24cfe-GH8DNrA+//QPpc/1TTlGIMchMw4\"",
    "mtime": "2024-12-29T13:56:03.090Z",
    "size": 150782,
    "path": "../public/assets/images/blur-purple.png"
  },
  "/assets/images/brand-1-white.png": {
    "type": "image/png",
    "etag": "\"74c-H3GyDMP5ahU92AjBDnxp/x5dS34\"",
    "mtime": "2024-12-29T13:56:03.090Z",
    "size": 1868,
    "path": "../public/assets/images/brand-1-white.png"
  },
  "/assets/images/brand-1.png": {
    "type": "image/png",
    "etag": "\"1831-T6ky3V9TVn02uohuLVXWnnLaOQM\"",
    "mtime": "2024-12-29T13:56:03.090Z",
    "size": 6193,
    "path": "../public/assets/images/brand-1.png"
  },
  "/assets/images/brand-10.png": {
    "type": "image/png",
    "etag": "\"1bd1-PcSFcMtIZcirwcxrwWwLvmtFj6o\"",
    "mtime": "2024-12-29T13:56:03.090Z",
    "size": 7121,
    "path": "../public/assets/images/brand-10.png"
  },
  "/assets/images/brand-2-white.png": {
    "type": "image/png",
    "etag": "\"282c-UKEF6lTNtv5QR5KQv+a5AAm2smU\"",
    "mtime": "2024-12-29T13:56:03.090Z",
    "size": 10284,
    "path": "../public/assets/images/brand-2-white.png"
  },
  "/assets/images/brand-2.png": {
    "type": "image/png",
    "etag": "\"2aac-UHfR1sQ38nSjvSJ5HgyO6q7V2/0\"",
    "mtime": "2024-12-29T13:56:03.090Z",
    "size": 10924,
    "path": "../public/assets/images/brand-2.png"
  },
  "/assets/images/brand-21-white.png": {
    "type": "image/png",
    "etag": "\"1a6f-B4Kj15q81JhltFMlIbFoXVfsJao\"",
    "mtime": "2024-12-29T13:56:03.091Z",
    "size": 6767,
    "path": "../public/assets/images/brand-21-white.png"
  },
  "/assets/images/brand-21.png": {
    "type": "image/png",
    "etag": "\"a6b-COYneAy86PITdkj9wESTLHcBXa0\"",
    "mtime": "2024-12-29T13:56:03.091Z",
    "size": 2667,
    "path": "../public/assets/images/brand-21.png"
  },
  "/assets/images/brand-22-white.png": {
    "type": "image/png",
    "etag": "\"1bba-Clt3ALENW28LNlVvXOMmB/a+3N8\"",
    "mtime": "2024-12-29T13:56:03.091Z",
    "size": 7098,
    "path": "../public/assets/images/brand-22-white.png"
  },
  "/assets/images/brand-22.png": {
    "type": "image/png",
    "etag": "\"1022-NkdMSeUf/8luqx9EzEysKDpSxj8\"",
    "mtime": "2024-12-29T13:56:03.091Z",
    "size": 4130,
    "path": "../public/assets/images/brand-22.png"
  },
  "/assets/images/brand-23-white.png": {
    "type": "image/png",
    "etag": "\"16d6-zujWY3pWFWX5vDRCmXpUN+fByJc\"",
    "mtime": "2024-12-29T13:56:03.093Z",
    "size": 5846,
    "path": "../public/assets/images/brand-23-white.png"
  },
  "/assets/images/brand-23.png": {
    "type": "image/png",
    "etag": "\"94e-ExecLbXz5tMLwyxd5R25nlLNkkc\"",
    "mtime": "2024-12-29T13:56:03.092Z",
    "size": 2382,
    "path": "../public/assets/images/brand-23.png"
  },
  "/assets/images/brand-3-white.png": {
    "type": "image/png",
    "etag": "\"ba2-yYwbiPmcLYfWMhyXIO096yhUhQk\"",
    "mtime": "2024-12-29T13:56:03.092Z",
    "size": 2978,
    "path": "../public/assets/images/brand-3-white.png"
  },
  "/assets/images/brand-3.png": {
    "type": "image/png",
    "etag": "\"1efc-37kjMZg07jBRbc9JmQHi0Zfcxpg\"",
    "mtime": "2024-12-29T13:56:03.093Z",
    "size": 7932,
    "path": "../public/assets/images/brand-3.png"
  },
  "/assets/images/brand-4-white.png": {
    "type": "image/png",
    "etag": "\"450-YWxajQQi09YhnDnbNrs7i5E5tOU\"",
    "mtime": "2024-12-29T13:56:03.098Z",
    "size": 1104,
    "path": "../public/assets/images/brand-4-white.png"
  },
  "/assets/images/brand-4.png": {
    "type": "image/png",
    "etag": "\"1457-gbBuCT5Rcq+hqXUd0BqHyiVTYX4\"",
    "mtime": "2024-12-29T13:56:03.093Z",
    "size": 5207,
    "path": "../public/assets/images/brand-4.png"
  },
  "/assets/images/brand-5-white.png": {
    "type": "image/png",
    "etag": "\"a24-YkIjePJ5SxOixK+Hv02gAQULimE\"",
    "mtime": "2024-12-29T13:56:03.093Z",
    "size": 2596,
    "path": "../public/assets/images/brand-5-white.png"
  },
  "/assets/images/brand-5.png": {
    "type": "image/png",
    "etag": "\"1cae-FVX1pIN7HWNAR3iPkgax0R0/cT4\"",
    "mtime": "2024-12-29T13:56:03.093Z",
    "size": 7342,
    "path": "../public/assets/images/brand-5.png"
  },
  "/assets/images/brand-6-white.png": {
    "type": "image/png",
    "etag": "\"89d-iWKUuehPARiKtAYUNDx/t4dptvM\"",
    "mtime": "2024-12-29T13:56:03.093Z",
    "size": 2205,
    "path": "../public/assets/images/brand-6-white.png"
  },
  "/assets/images/brand-6.png": {
    "type": "image/png",
    "etag": "\"17dc-AY4wQj4UXwSg0CCZsDkkeDR9MR8\"",
    "mtime": "2024-12-29T13:56:03.102Z",
    "size": 6108,
    "path": "../public/assets/images/brand-6.png"
  },
  "/assets/images/brand-7-white.png": {
    "type": "image/png",
    "etag": "\"aa5-9AGBoeIlWta9zrrs4Ar4lhct6RQ\"",
    "mtime": "2024-12-29T13:56:03.093Z",
    "size": 2725,
    "path": "../public/assets/images/brand-7-white.png"
  },
  "/assets/images/brand-7.png": {
    "type": "image/png",
    "etag": "\"1d49-VUMCLuQGnDM9jQ5mVIMnxduUipU\"",
    "mtime": "2024-12-29T13:56:03.094Z",
    "size": 7497,
    "path": "../public/assets/images/brand-7.png"
  },
  "/assets/images/brand-8-white.png": {
    "type": "image/png",
    "etag": "\"8a3-EAf5d10R8lbu0JTjULgIFawEiK0\"",
    "mtime": "2024-12-29T13:56:03.093Z",
    "size": 2211,
    "path": "../public/assets/images/brand-8-white.png"
  },
  "/assets/images/brand-8.png": {
    "type": "image/png",
    "etag": "\"1b89-DtBMBZeE9F4BTD1WdTVanegl+iE\"",
    "mtime": "2024-12-29T13:56:03.099Z",
    "size": 7049,
    "path": "../public/assets/images/brand-8.png"
  },
  "/assets/images/brand-9-white.png": {
    "type": "image/png",
    "etag": "\"a0a-yo7Yi/Bg+DjN4DjDsiYAxSNJ49A\"",
    "mtime": "2024-12-29T13:56:03.095Z",
    "size": 2570,
    "path": "../public/assets/images/brand-9-white.png"
  },
  "/assets/images/brand-9.png": {
    "type": "image/png",
    "etag": "\"ca1-ofYNnc8T88CqEpcskZrsQu0gAUU\"",
    "mtime": "2024-12-29T13:56:03.094Z",
    "size": 3233,
    "path": "../public/assets/images/brand-9.png"
  },
  "/assets/images/comment-author-1.jpg": {
    "type": "image/jpeg",
    "etag": "\"bc8-pDD8IUM0SombBv0viEaLufF3rmc\"",
    "mtime": "2024-12-29T13:56:03.094Z",
    "size": 3016,
    "path": "../public/assets/images/comment-author-1.jpg"
  },
  "/assets/images/comment-author-2.jpg": {
    "type": "image/jpeg",
    "etag": "\"635-9bZUX1BT2Uuty1lw+QhMWgjajks\"",
    "mtime": "2024-12-29T13:56:03.094Z",
    "size": 1589,
    "path": "../public/assets/images/comment-author-2.jpg"
  },
  "/assets/images/comment-author-3.jpg": {
    "type": "image/jpeg",
    "etag": "\"f8d-jRV0lYM/mcQ1ZeTZ7cvVrn0w8fI\"",
    "mtime": "2024-12-29T13:56:03.095Z",
    "size": 3981,
    "path": "../public/assets/images/comment-author-3.jpg"
  },
  "/assets/images/comment-author-4.jpg": {
    "type": "image/jpeg",
    "etag": "\"cc4-mxu7om+r74TvK1YTNXlPa0KnNoM\"",
    "mtime": "2024-12-29T13:56:03.095Z",
    "size": 3268,
    "path": "../public/assets/images/comment-author-4.jpg"
  },
  "/assets/images/dashboard-01.png": {
    "type": "image/png",
    "etag": "\"117a7-c7Bbv0K47UF28Go4QnKBLO/qVpQ\"",
    "mtime": "2024-12-29T13:56:03.095Z",
    "size": 71591,
    "path": "../public/assets/images/dashboard-01.png"
  },
  "/assets/images/dashboard-02.png": {
    "type": "image/png",
    "etag": "\"2354d-2eOM7TsRcG11boe1pFuycq0hFYw\"",
    "mtime": "2024-12-29T13:56:03.096Z",
    "size": 144717,
    "path": "../public/assets/images/dashboard-02.png"
  },
  "/assets/images/dashboard-03.png": {
    "type": "image/png",
    "etag": "\"4aadd-+7u0P3zAK47vESkB2SNcLB+CTrg\"",
    "mtime": "2024-12-29T13:56:03.096Z",
    "size": 305885,
    "path": "../public/assets/images/dashboard-03.png"
  },
  "/assets/images/dashboard-04.png": {
    "type": "image/png",
    "etag": "\"3e440-nAw7rOTNvDPJ9vIAWZ2NqJG7eLE\"",
    "mtime": "2024-12-29T13:56:03.096Z",
    "size": 255040,
    "path": "../public/assets/images/dashboard-04.png"
  },
  "/assets/images/dashboard-05.png": {
    "type": "image/png",
    "etag": "\"4b3f7-UCTF9FB0aT35Tus/D1CJ/ZaEm1M\"",
    "mtime": "2024-12-29T13:56:03.097Z",
    "size": 308215,
    "path": "../public/assets/images/dashboard-05.png"
  },
  "/assets/images/dashboard-06.png": {
    "type": "image/png",
    "etag": "\"161f2-IAvy1zC6GP6DuiNp4bbX77nxMDQ\"",
    "mtime": "2024-12-29T13:56:03.098Z",
    "size": 90610,
    "path": "../public/assets/images/dashboard-06.png"
  },
  "/assets/images/dashboard-07.png": {
    "type": "image/png",
    "etag": "\"17586-MW3pFU5VKrCUEGlzflz0fkvtd/g\"",
    "mtime": "2024-12-29T13:56:03.097Z",
    "size": 95622,
    "path": "../public/assets/images/dashboard-07.png"
  },
  "/assets/images/dashboard-08.png": {
    "type": "image/png",
    "etag": "\"e71b-2jO0zpZWNsY438ObidIdROtX7u8\"",
    "mtime": "2024-12-29T13:56:03.098Z",
    "size": 59163,
    "path": "../public/assets/images/dashboard-08.png"
  },
  "/assets/images/dashboard-09.png": {
    "type": "image/png",
    "etag": "\"ebce-MFEVGju+GvXotlP8xczsFukEn80\"",
    "mtime": "2024-12-29T13:56:03.097Z",
    "size": 60366,
    "path": "../public/assets/images/dashboard-09.png"
  },
  "/assets/images/error-404.png": {
    "type": "image/png",
    "etag": "\"1f53-NkxQCLmzo2Kt4m7JQbqK4rsopFg\"",
    "mtime": "2024-12-29T13:56:03.097Z",
    "size": 8019,
    "path": "../public/assets/images/error-404.png"
  },
  "/assets/images/f_01.png": {
    "type": "image/png",
    "etag": "\"4c5b-nSZRYzuL42Cgxcugh9JKeuUj84E\"",
    "mtime": "2024-12-29T13:56:03.108Z",
    "size": 19547,
    "path": "../public/assets/images/f_01.png"
  },
  "/assets/images/f_01_dark.png": {
    "type": "image/png",
    "etag": "\"2e64-YrRNecycWAiX5MpCRviB5clzWrc\"",
    "mtime": "2024-12-29T13:56:03.099Z",
    "size": 11876,
    "path": "../public/assets/images/f_01_dark.png"
  },
  "/assets/images/f_02.png": {
    "type": "image/png",
    "etag": "\"3a4d-P740v6/HytBmQBPgGyJbs15SRgI\"",
    "mtime": "2024-12-29T13:56:03.098Z",
    "size": 14925,
    "path": "../public/assets/images/f_02.png"
  },
  "/assets/images/f_02_dark.png": {
    "type": "image/png",
    "etag": "\"2c66-AAWdmwe/MFwrxTJ8F+6Sc4Cmyc8\"",
    "mtime": "2024-12-29T13:56:03.098Z",
    "size": 11366,
    "path": "../public/assets/images/f_02_dark.png"
  },
  "/assets/images/f_03.png": {
    "type": "image/png",
    "etag": "\"3737-2Gq4FwKzsgnQ8Iw/Wy0dnbDFtu0\"",
    "mtime": "2024-12-29T13:56:03.099Z",
    "size": 14135,
    "path": "../public/assets/images/f_03.png"
  },
  "/assets/images/f_03_dark.png": {
    "type": "image/png",
    "etag": "\"369d-2+MDNSeSjaGQpTJPEnok2rRmdvM\"",
    "mtime": "2024-12-29T13:56:03.099Z",
    "size": 13981,
    "path": "../public/assets/images/f_03_dark.png"
  },
  "/assets/images/f_04.png": {
    "type": "image/png",
    "etag": "\"5b51-LPmS+MJltEzxhCx6bK+BSMP4lYs\"",
    "mtime": "2024-12-29T13:56:03.099Z",
    "size": 23377,
    "path": "../public/assets/images/f_04.png"
  },
  "/assets/images/f_04_dark.png": {
    "type": "image/png",
    "etag": "\"a29f-/h47+UEWU1P1wRd3BzGBYFpGszg\"",
    "mtime": "2024-12-29T13:56:03.099Z",
    "size": 41631,
    "path": "../public/assets/images/f_04_dark.png"
  },
  "/assets/images/f_05.png": {
    "type": "image/png",
    "etag": "\"5dc1-3ejy6xdYnM00Kj5/IjuJqxlBglU\"",
    "mtime": "2024-12-29T13:56:03.100Z",
    "size": 24001,
    "path": "../public/assets/images/f_05.png"
  },
  "/assets/images/f_05_dark.png": {
    "type": "image/png",
    "etag": "\"63ac-NGlfbKJlld2fcBU1wV9Wlnr8NOQ\"",
    "mtime": "2024-12-29T13:56:03.105Z",
    "size": 25516,
    "path": "../public/assets/images/f_05_dark.png"
  },
  "/assets/images/f_06.png": {
    "type": "image/png",
    "etag": "\"371a-kZyB9HhSypccSQpM4LnDHwZbAhA\"",
    "mtime": "2024-12-29T13:56:03.099Z",
    "size": 14106,
    "path": "../public/assets/images/f_06.png"
  },
  "/assets/images/f_06_dark.png": {
    "type": "image/png",
    "etag": "\"3b50-JrEPRxkJBInmiH0/KNQ9o0O5aQ0\"",
    "mtime": "2024-12-29T13:56:03.099Z",
    "size": 15184,
    "path": "../public/assets/images/f_06_dark.png"
  },
  "/assets/images/f_07.png": {
    "type": "image/png",
    "etag": "\"2355-elshmqCDuY4KeKLEWbnQWGMRRaY\"",
    "mtime": "2024-12-29T13:56:03.099Z",
    "size": 9045,
    "path": "../public/assets/images/f_07.png"
  },
  "/assets/images/f_07_dark.png": {
    "type": "image/png",
    "etag": "\"35fb-ejVqmrsFKmEsDzIc6TPsRiVHNN8\"",
    "mtime": "2024-12-29T13:56:03.100Z",
    "size": 13819,
    "path": "../public/assets/images/f_07_dark.png"
  },
  "/assets/images/f_08.png": {
    "type": "image/png",
    "etag": "\"facc-OWntGaUqNOXRhHKqqiCBf90+ORY\"",
    "mtime": "2024-12-29T13:56:03.100Z",
    "size": 64204,
    "path": "../public/assets/images/f_08.png"
  },
  "/assets/images/f_08_dark.png": {
    "type": "image/png",
    "etag": "\"172d5-TNDBIW+TpAP8TGsKbJ0gY06glJw\"",
    "mtime": "2024-12-29T13:56:03.101Z",
    "size": 94933,
    "path": "../public/assets/images/f_08_dark.png"
  },
  "/assets/images/f_09.png": {
    "type": "image/png",
    "etag": "\"2176-rZ00WsgiwuR+ih1j/mK2vebKuJM\"",
    "mtime": "2024-12-29T13:56:03.105Z",
    "size": 8566,
    "path": "../public/assets/images/f_09.png"
  },
  "/assets/images/f_09_dark.png": {
    "type": "image/png",
    "etag": "\"68b6-ZCiwj3doQ8ZqG9vbRD1wPalyyjk\"",
    "mtime": "2024-12-29T13:56:03.101Z",
    "size": 26806,
    "path": "../public/assets/images/f_09_dark.png"
  },
  "/assets/images/f_10.png": {
    "type": "image/png",
    "etag": "\"3ca6-gUQhnh9cpP/aY9AHGEwowItPijQ\"",
    "mtime": "2024-12-29T13:56:03.100Z",
    "size": 15526,
    "path": "../public/assets/images/f_10.png"
  },
  "/assets/images/f_11.png": {
    "type": "image/png",
    "etag": "\"3b69-GwSrfsH4pCeS5hCC1g+31+tqhOw\"",
    "mtime": "2024-12-29T13:56:03.100Z",
    "size": 15209,
    "path": "../public/assets/images/f_11.png"
  },
  "/assets/images/f_11_dark.png": {
    "type": "image/png",
    "etag": "\"ceaf-+TTFY8PRDTrr1JasK8X0i4Juc/I\"",
    "mtime": "2024-12-29T13:56:03.101Z",
    "size": 52911,
    "path": "../public/assets/images/f_11_dark.png"
  },
  "/assets/images/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"103e-myeY0ffW62EHeqylRcYS5glRcN4\"",
    "mtime": "2024-12-29T13:56:03.101Z",
    "size": 4158,
    "path": "../public/assets/images/favicon.ico"
  },
  "/assets/images/help.png": {
    "type": "image/png",
    "etag": "\"3bfc-NMOj0yG0Q9uy6beDrHYYBMlsGoE\"",
    "mtime": "2024-12-29T13:56:03.101Z",
    "size": 15356,
    "path": "../public/assets/images/help.png"
  },
  "/assets/images/hero-1-img.png": {
    "type": "image/png",
    "etag": "\"3637e-vx8ZXM6WSP/dDhbqbJx2uuD29rY\"",
    "mtime": "2024-12-29T13:56:03.104Z",
    "size": 222078,
    "path": "../public/assets/images/hero-1-img.png"
  },
  "/assets/images/hero-1.jpg": {
    "type": "image/jpeg",
    "etag": "\"3f6a-7Lp8lEsGOZq7TdWZeDsYaWlwrhA\"",
    "mtime": "2024-12-29T13:56:03.101Z",
    "size": 16234,
    "path": "../public/assets/images/hero-1.jpg"
  },
  "/assets/images/hero-10-dark.jpg": {
    "type": "image/jpeg",
    "etag": "\"a304-1I/HI//gZCu0hu57F19Af4R+mgo\"",
    "mtime": "2024-12-29T13:56:03.102Z",
    "size": 41732,
    "path": "../public/assets/images/hero-10-dark.jpg"
  },
  "/assets/images/hero-10.jpg": {
    "type": "image/jpeg",
    "etag": "\"22e1-OpbGbSsvJFCpr9hPBdsTrh/HFp8\"",
    "mtime": "2024-12-29T13:56:03.115Z",
    "size": 8929,
    "path": "../public/assets/images/hero-10.jpg"
  },
  "/assets/images/hero-11-img.png": {
    "type": "image/png",
    "etag": "\"44d01-or8XnATzZuvwKABvinZP1FkkPYY\"",
    "mtime": "2024-12-29T13:56:03.105Z",
    "size": 281857,
    "path": "../public/assets/images/hero-11-img.png"
  },
  "/assets/images/hero-11.jpg": {
    "type": "image/jpeg",
    "etag": "\"2897-XqHJ/vnNMOSLw/kWD9gRK1eG9o8\"",
    "mtime": "2024-12-29T13:56:03.103Z",
    "size": 10391,
    "path": "../public/assets/images/hero-11.jpg"
  },
  "/assets/images/hero-12.jpg": {
    "type": "image/jpeg",
    "etag": "\"2b8c-O78QMvZWMOMLsk+9ZQH5IhUoULU\"",
    "mtime": "2024-12-29T13:56:03.104Z",
    "size": 11148,
    "path": "../public/assets/images/hero-12.jpg"
  },
  "/assets/images/hero-13-img.png": {
    "type": "image/png",
    "etag": "\"260f7-fS00Es6FBG+ej2/26hViX18vCTw\"",
    "mtime": "2024-12-29T13:56:03.105Z",
    "size": 155895,
    "path": "../public/assets/images/hero-13-img.png"
  },
  "/assets/images/hero-14.jpg": {
    "type": "image/jpeg",
    "etag": "\"938f-T51LSI8JHxmzUbY6AVn7Ps6YiFk\"",
    "mtime": "2024-12-29T13:56:03.105Z",
    "size": 37775,
    "path": "../public/assets/images/hero-14.jpg"
  },
  "/assets/images/hero-15-dark.jpg": {
    "type": "image/jpeg",
    "etag": "\"16112-2NRM05gfka1xz1g6N6rTw67vbj4\"",
    "mtime": "2024-12-29T13:56:03.106Z",
    "size": 90386,
    "path": "../public/assets/images/hero-15-dark.jpg"
  },
  "/assets/images/hero-15-img.png": {
    "type": "image/png",
    "etag": "\"2a844-M3IvuslBFEWFlilvlPl/vZaJsXI\"",
    "mtime": "2024-12-29T13:56:03.108Z",
    "size": 174148,
    "path": "../public/assets/images/hero-15-img.png"
  },
  "/assets/images/hero-15.jpg": {
    "type": "image/jpeg",
    "etag": "\"2500-weE2xY7bwmUNd2pq6NJJVGp1jnE\"",
    "mtime": "2024-12-29T13:56:03.106Z",
    "size": 9472,
    "path": "../public/assets/images/hero-15.jpg"
  },
  "/assets/images/hero-16-dark.jpg": {
    "type": "image/jpeg",
    "etag": "\"a304-1I/HI//gZCu0hu57F19Af4R+mgo\"",
    "mtime": "2024-12-29T13:56:03.110Z",
    "size": 41732,
    "path": "../public/assets/images/hero-16-dark.jpg"
  },
  "/assets/images/hero-16.jpg": {
    "type": "image/jpeg",
    "etag": "\"1d0d-rDSh8lJO7vtxh8WzSLUdwlvRBNU\"",
    "mtime": "2024-12-29T13:56:03.107Z",
    "size": 7437,
    "path": "../public/assets/images/hero-16.jpg"
  },
  "/assets/images/hero-17-dark.jpg": {
    "type": "image/jpeg",
    "etag": "\"311c-pIWsO9Z4Dk1wNmmyajY/20umAhQ\"",
    "mtime": "2024-12-29T13:56:03.106Z",
    "size": 12572,
    "path": "../public/assets/images/hero-17-dark.jpg"
  },
  "/assets/images/hero-17.jpg": {
    "type": "image/jpeg",
    "etag": "\"2cdf3-BPOCal0DZS25eteuqU9MXxLOr3U\"",
    "mtime": "2024-12-29T13:56:03.109Z",
    "size": 183795,
    "path": "../public/assets/images/hero-17.jpg"
  },
  "/assets/images/hero-18-dark.jpg": {
    "type": "image/jpeg",
    "etag": "\"b71f-xvp6LDYfHlo3hfICwgfNcZht7/g\"",
    "mtime": "2024-12-29T13:56:03.107Z",
    "size": 46879,
    "path": "../public/assets/images/hero-18-dark.jpg"
  },
  "/assets/images/hero-18-img.png": {
    "type": "image/png",
    "etag": "\"28e09-eTtng+9j+TQKZ+t49ILJsJwxBnA\"",
    "mtime": "2024-12-29T13:56:03.109Z",
    "size": 167433,
    "path": "../public/assets/images/hero-18-img.png"
  },
  "/assets/images/hero-18.jpg": {
    "type": "image/jpeg",
    "etag": "\"22e1-OpbGbSsvJFCpr9hPBdsTrh/HFp8\"",
    "mtime": "2024-12-29T13:56:03.109Z",
    "size": 8929,
    "path": "../public/assets/images/hero-18.jpg"
  },
  "/assets/images/hero-2-img.png": {
    "type": "image/png",
    "etag": "\"1bf7f-OyHqxAtmycBfoAoRp4u7a+e5azE\"",
    "mtime": "2024-12-29T13:56:03.112Z",
    "size": 114559,
    "path": "../public/assets/images/hero-2-img.png"
  },
  "/assets/images/hero-2.jpg": {
    "type": "image/jpeg",
    "etag": "\"2898-MFpYxW2sXLrqME1DL+6H4LCxOo8\"",
    "mtime": "2024-12-29T13:56:03.109Z",
    "size": 10392,
    "path": "../public/assets/images/hero-2.jpg"
  },
  "/assets/images/hero-20.jpg": {
    "type": "image/jpeg",
    "etag": "\"12c1f-VYKXHxDYwXNFoF7SC4tRCvPsbqw\"",
    "mtime": "2024-12-29T13:56:03.110Z",
    "size": 76831,
    "path": "../public/assets/images/hero-20.jpg"
  },
  "/assets/images/hero-21-dark.jpg": {
    "type": "image/jpeg",
    "etag": "\"b71f-xvp6LDYfHlo3hfICwgfNcZht7/g\"",
    "mtime": "2024-12-29T13:56:03.110Z",
    "size": 46879,
    "path": "../public/assets/images/hero-21-dark.jpg"
  },
  "/assets/images/hero-21-img.png": {
    "type": "image/png",
    "etag": "\"15075-Hn/d6XHA3sI5e7H+feOV+IS80LU\"",
    "mtime": "2024-12-29T13:56:03.112Z",
    "size": 86133,
    "path": "../public/assets/images/hero-21-img.png"
  },
  "/assets/images/hero-21.jpg": {
    "type": "image/jpeg",
    "etag": "\"2898-MFpYxW2sXLrqME1DL+6H4LCxOo8\"",
    "mtime": "2024-12-29T13:56:03.114Z",
    "size": 10392,
    "path": "../public/assets/images/hero-21.jpg"
  },
  "/assets/images/hero-22.jpg": {
    "type": "image/jpeg",
    "etag": "\"75ff-U+yGlg2gyY6UjPc3Np367zan26w\"",
    "mtime": "2024-12-29T13:56:03.111Z",
    "size": 30207,
    "path": "../public/assets/images/hero-22.jpg"
  },
  "/assets/images/hero-23-dark.jpg": {
    "type": "image/jpeg",
    "etag": "\"a304-1I/HI//gZCu0hu57F19Af4R+mgo\"",
    "mtime": "2024-12-29T13:56:03.111Z",
    "size": 41732,
    "path": "../public/assets/images/hero-23-dark.jpg"
  },
  "/assets/images/hero-23.jpg": {
    "type": "image/jpeg",
    "etag": "\"2264-13O+VGUajHDrT1MD6Zk22IQTgA4\"",
    "mtime": "2024-12-29T13:56:03.112Z",
    "size": 8804,
    "path": "../public/assets/images/hero-23.jpg"
  },
  "/assets/images/hero-24.jpg": {
    "type": "image/jpeg",
    "etag": "\"39e1-JdCDsAf+8MV8en5/Pw9VuNpHO8Y\"",
    "mtime": "2024-12-29T13:56:03.112Z",
    "size": 14817,
    "path": "../public/assets/images/hero-24.jpg"
  },
  "/assets/images/hero-25-dark.jpg": {
    "type": "image/jpeg",
    "etag": "\"a304-1I/HI//gZCu0hu57F19Af4R+mgo\"",
    "mtime": "2024-12-29T13:56:03.113Z",
    "size": 41732,
    "path": "../public/assets/images/hero-25-dark.jpg"
  },
  "/assets/images/hero-25-img.png": {
    "type": "image/png",
    "etag": "\"1b957-R1NFotEQ/gYJVO+3Y8cYdq6/E3M\"",
    "mtime": "2024-12-29T13:56:03.113Z",
    "size": 112983,
    "path": "../public/assets/images/hero-25-img.png"
  },
  "/assets/images/hero-25.jpg": {
    "type": "image/jpeg",
    "etag": "\"14138-DXjiHE7A2M9uogZLQNT7rsF4ajQ\"",
    "mtime": "2024-12-29T13:56:03.113Z",
    "size": 82232,
    "path": "../public/assets/images/hero-25.jpg"
  },
  "/assets/images/hero-26-img.png": {
    "type": "image/png",
    "etag": "\"2ae6c-MV9uu84raUhyRRWimAG/byfmsLE\"",
    "mtime": "2024-12-29T13:56:03.114Z",
    "size": 175724,
    "path": "../public/assets/images/hero-26-img.png"
  },
  "/assets/images/hero-26.jpg": {
    "type": "image/jpeg",
    "etag": "\"394d-ZJCsyx7OdJBx+ZE372Vo+fW2Vk8\"",
    "mtime": "2024-12-29T13:56:03.117Z",
    "size": 14669,
    "path": "../public/assets/images/hero-26.jpg"
  },
  "/assets/images/hero-27-dark.png": {
    "type": "image/png",
    "etag": "\"2042-G91s61/r8AsAQamcLy6/Spy9vxw\"",
    "mtime": "2024-12-29T13:56:03.114Z",
    "size": 8258,
    "path": "../public/assets/images/hero-27-dark.png"
  },
  "/assets/images/hero-27.png": {
    "type": "image/png",
    "etag": "\"2042-5EVB40JkotA45IavBy5Isf6/hJw\"",
    "mtime": "2024-12-29T13:56:03.114Z",
    "size": 8258,
    "path": "../public/assets/images/hero-27.png"
  },
  "/assets/images/hero-3.jpg": {
    "type": "image/jpeg",
    "etag": "\"4730-0YOS9YdZnXFwnEEwak4pT30ev0Q\"",
    "mtime": "2024-12-29T13:56:03.114Z",
    "size": 18224,
    "path": "../public/assets/images/hero-3.jpg"
  },
  "/assets/images/hero-4.jpg": {
    "type": "image/jpeg",
    "etag": "\"2440-Ovhq6OmpqXjwK+pLezZW8VAvFUI\"",
    "mtime": "2024-12-29T13:56:03.114Z",
    "size": 9280,
    "path": "../public/assets/images/hero-4.jpg"
  },
  "/assets/images/hero-5-dark.jpg": {
    "type": "image/jpeg",
    "etag": "\"a304-1I/HI//gZCu0hu57F19Af4R+mgo\"",
    "mtime": "2024-12-29T13:56:03.115Z",
    "size": 41732,
    "path": "../public/assets/images/hero-5-dark.jpg"
  },
  "/assets/images/hero-5.jpg": {
    "type": "image/jpeg",
    "etag": "\"22e1-OpbGbSsvJFCpr9hPBdsTrh/HFp8\"",
    "mtime": "2024-12-29T13:56:03.115Z",
    "size": 8929,
    "path": "../public/assets/images/hero-5.jpg"
  },
  "/assets/images/hero-8.jpg": {
    "type": "image/jpeg",
    "etag": "\"889f-PTOB46qGas09V11+duVFyAWCEuY\"",
    "mtime": "2024-12-29T13:56:03.116Z",
    "size": 34975,
    "path": "../public/assets/images/hero-8.jpg"
  },
  "/assets/images/img-01.png": {
    "type": "image/png",
    "etag": "\"6d4c-WRrx0dLA9exYyVBBs8Hl2jOocE8\"",
    "mtime": "2024-12-29T13:56:03.115Z",
    "size": 27980,
    "path": "../public/assets/images/img-01.png"
  },
  "/assets/images/img-02.png": {
    "type": "image/png",
    "etag": "\"4c62-vlYs5mwM2otbKNSrbb5Inv79+rg\"",
    "mtime": "2024-12-29T13:56:03.116Z",
    "size": 19554,
    "path": "../public/assets/images/img-02.png"
  },
  "/assets/images/img-03.png": {
    "type": "image/png",
    "etag": "\"6136-Xeiut163/77SD0JlU9CulvgpMx4\"",
    "mtime": "2024-12-29T13:56:03.116Z",
    "size": 24886,
    "path": "../public/assets/images/img-03.png"
  },
  "/assets/images/img-04.png": {
    "type": "image/png",
    "etag": "\"ac0d-K+pwDN7MEQMuPPI2Mr4cy4seE/s\"",
    "mtime": "2024-12-29T13:56:03.116Z",
    "size": 44045,
    "path": "../public/assets/images/img-04.png"
  },
  "/assets/images/img-05.png": {
    "type": "image/png",
    "etag": "\"3102-IedjF5ke7+YJs1WLtin+dJ92by0\"",
    "mtime": "2024-12-29T13:56:03.116Z",
    "size": 12546,
    "path": "../public/assets/images/img-05.png"
  },
  "/assets/images/img-06.png": {
    "type": "image/png",
    "etag": "\"1c266-HGQNcSaVzf7KjRpy3LvXCX4khCU\"",
    "mtime": "2024-12-29T13:56:03.117Z",
    "size": 115302,
    "path": "../public/assets/images/img-06.png"
  },
  "/assets/images/img-07-dark.png": {
    "type": "image/png",
    "etag": "\"192f2-SJyESR0LUOOsxAn3LYD/Q2Rgf8A\"",
    "mtime": "2024-12-29T13:56:03.120Z",
    "size": 103154,
    "path": "../public/assets/images/img-07-dark.png"
  },
  "/assets/images/img-07.png": {
    "type": "image/png",
    "etag": "\"1a06b-MKccnrKD/yeQT8TgbrB0M4Ldci8\"",
    "mtime": "2024-12-29T13:56:03.117Z",
    "size": 106603,
    "path": "../public/assets/images/img-07.png"
  },
  "/assets/images/img-08.png": {
    "type": "image/png",
    "etag": "\"21040-cabkq7t6uQhgxQxPda0QzUL6zGU\"",
    "mtime": "2024-12-29T13:56:03.118Z",
    "size": 135232,
    "path": "../public/assets/images/img-08.png"
  },
  "/assets/images/img-09.png": {
    "type": "image/png",
    "etag": "\"1e358-fi0uNVG1ybrJNQwrJ2rMH8khTMk\"",
    "mtime": "2024-12-29T13:56:03.118Z",
    "size": 123736,
    "path": "../public/assets/images/img-09.png"
  },
  "/assets/images/img-10.png": {
    "type": "image/png",
    "etag": "\"1b957-R1NFotEQ/gYJVO+3Y8cYdq6/E3M\"",
    "mtime": "2024-12-29T13:56:03.118Z",
    "size": 112983,
    "path": "../public/assets/images/img-10.png"
  },
  "/assets/images/img-11.png": {
    "type": "image/png",
    "etag": "\"35526-CjAEEbYZCLvoOhN8rOeFTz9SUnA\"",
    "mtime": "2024-12-29T13:56:03.119Z",
    "size": 218406,
    "path": "../public/assets/images/img-11.png"
  },
  "/assets/images/img-12.png": {
    "type": "image/png",
    "etag": "\"1e420-bCLu25Z4JsEz0RmRinq4S9MPogI\"",
    "mtime": "2024-12-29T13:56:03.120Z",
    "size": 123936,
    "path": "../public/assets/images/img-12.png"
  },
  "/assets/images/img-13.png": {
    "type": "image/png",
    "etag": "\"15ba4-7S+dZxP5zhQUFDAdxspCL7a3YKw\"",
    "mtime": "2024-12-29T13:56:03.120Z",
    "size": 88996,
    "path": "../public/assets/images/img-13.png"
  },
  "/assets/images/img-14.png": {
    "type": "image/png",
    "etag": "\"4250c-RKA402Pudv7V6J6IMrU0RCUaUOM\"",
    "mtime": "2024-12-29T13:56:03.121Z",
    "size": 271628,
    "path": "../public/assets/images/img-14.png"
  },
  "/assets/images/img-15.png": {
    "type": "image/png",
    "etag": "\"30a4e-4A7ji7CkJoGplmn4nuiSQi+ALzQ\"",
    "mtime": "2024-12-29T13:56:03.122Z",
    "size": 199246,
    "path": "../public/assets/images/img-15.png"
  },
  "/assets/images/img-16.png": {
    "type": "image/png",
    "etag": "\"7e76-3YLIbnlR4K3D5UK7IbFXQAAAZJU\"",
    "mtime": "2024-12-29T13:56:03.122Z",
    "size": 32374,
    "path": "../public/assets/images/img-16.png"
  },
  "/assets/images/img-17.jpg": {
    "type": "image/jpeg",
    "etag": "\"a630-jhbOc0Fyn3HVCoIoCKdoxJ7PpsA\"",
    "mtime": "2024-12-29T13:56:03.122Z",
    "size": 42544,
    "path": "../public/assets/images/img-17.jpg"
  },
  "/assets/images/img-18.png": {
    "type": "image/png",
    "etag": "\"2bb6f-e2Mfb3om5SBaCrGEsIW4kymiCZk\"",
    "mtime": "2024-12-29T13:56:03.125Z",
    "size": 179055,
    "path": "../public/assets/images/img-18.png"
  },
  "/assets/images/img-19.png": {
    "type": "image/png",
    "etag": "\"be5e-bPuXzraDTQb+p6NLDTFfUUlgUt8\"",
    "mtime": "2024-12-29T13:56:03.122Z",
    "size": 48734,
    "path": "../public/assets/images/img-19.png"
  },
  "/assets/images/login-wrapper.jpg": {
    "type": "image/jpeg",
    "etag": "\"99db-a3oyKxd3kNM6uEDrdCjZm+3Cn2k\"",
    "mtime": "2024-12-29T13:56:03.122Z",
    "size": 39387,
    "path": "../public/assets/images/login-wrapper.jpg"
  },
  "/assets/images/login.jpg": {
    "type": "image/jpeg",
    "etag": "\"241e-W9mEIkeuRUJKK/1GC6bqVKlcUqk\"",
    "mtime": "2024-12-29T13:56:03.122Z",
    "size": 9246,
    "path": "../public/assets/images/login.jpg"
  },
  "/assets/images/login_dark.jpg": {
    "type": "image/jpeg",
    "etag": "\"2920-ZN0jBZeymHOXQ7ADVjkRuNUgowI\"",
    "mtime": "2024-12-29T13:56:03.122Z",
    "size": 10528,
    "path": "../public/assets/images/login_dark.jpg"
  },
  "/assets/images/logo-black.png": {
    "type": "image/png",
    "etag": "\"8db-Cbab/Fyu7LoqhCJsBG4MY6twqQM\"",
    "mtime": "2024-12-29T13:56:03.123Z",
    "size": 2267,
    "path": "../public/assets/images/logo-black.png"
  },
  "/assets/images/logo-blog-white.png": {
    "type": "image/png",
    "etag": "\"dac-HsTFqmb7YnHJavylaeBB/k8dnxQ\"",
    "mtime": "2024-12-29T13:56:03.123Z",
    "size": 3500,
    "path": "../public/assets/images/logo-blog-white.png"
  },
  "/assets/images/logo-blog.png": {
    "type": "image/png",
    "etag": "\"e0e-RDN1rf9S5U0g6J3R90x4zTl+e3g\"",
    "mtime": "2024-12-29T13:56:03.124Z",
    "size": 3598,
    "path": "../public/assets/images/logo-blog.png"
  },
  "/assets/images/logo-blue-white.png": {
    "type": "image/png",
    "etag": "\"480e-H7aWfqKysXN1+CMau89uB9fJNyY\"",
    "mtime": "2024-12-29T13:56:03.128Z",
    "size": 18446,
    "path": "../public/assets/images/logo-blue-white.png"
  },
  "/assets/images/logo-blue.png": {
    "type": "image/png",
    "etag": "\"9c1-s1DfYTD6zciSK47EqTGMc5P+IaU\"",
    "mtime": "2024-12-29T13:56:03.124Z",
    "size": 2497,
    "path": "../public/assets/images/logo-blue.png"
  },
  "/assets/images/logo-magenta-white.png": {
    "type": "image/png",
    "etag": "\"c0c-VejbXhWcJYj7x6VB/5BqFxKnSEM\"",
    "mtime": "2024-12-29T13:56:03.124Z",
    "size": 3084,
    "path": "../public/assets/images/logo-magenta-white.png"
  },
  "/assets/images/logo-magenta.png": {
    "type": "image/png",
    "etag": "\"9d2-VK+UsGsA7NUW2yrMOAci/VvV08k\"",
    "mtime": "2024-12-29T13:56:03.124Z",
    "size": 2514,
    "path": "../public/assets/images/logo-magenta.png"
  },
  "/assets/images/logo-pink-white.png": {
    "type": "image/png",
    "etag": "\"a06-isxPZL/TqV09KBtBem13otfgWFA\"",
    "mtime": "2024-12-29T13:56:03.124Z",
    "size": 2566,
    "path": "../public/assets/images/logo-pink-white.png"
  },
  "/assets/images/logo-pink.png": {
    "type": "image/png",
    "etag": "\"9c4-TUkKgywwg9TAeENnMFxc5PvCeGg\"",
    "mtime": "2024-12-29T13:56:03.124Z",
    "size": 2500,
    "path": "../public/assets/images/logo-pink.png"
  },
  "/assets/images/logo-purple-white.png": {
    "type": "image/png",
    "etag": "\"c11-HyQf1EkDkD5loQ/2VUI3iiAWVPk\"",
    "mtime": "2024-12-29T13:56:03.124Z",
    "size": 3089,
    "path": "../public/assets/images/logo-purple-white.png"
  },
  "/assets/images/logo-purple.png": {
    "type": "image/png",
    "etag": "\"9d5-gIywRytZZFqyBR+SuVgFlz6+0JA\"",
    "mtime": "2024-12-29T13:56:03.125Z",
    "size": 2517,
    "path": "../public/assets/images/logo-purple.png"
  },
  "/assets/images/logo-skyblue-white.png": {
    "type": "image/png",
    "etag": "\"a4d-OOwh85Zc37DPo3LlkkXzbiaJ0rQ\"",
    "mtime": "2024-12-29T13:56:03.125Z",
    "size": 2637,
    "path": "../public/assets/images/logo-skyblue-white.png"
  },
  "/assets/images/logo-skyblue.png": {
    "type": "image/png",
    "etag": "\"8c7-xOFKxa6xf0iI7KkKMnjQLWczJjo\"",
    "mtime": "2024-12-29T13:56:03.125Z",
    "size": 2247,
    "path": "../public/assets/images/logo-skyblue.png"
  },
  "/assets/images/logo-violet-white.png": {
    "type": "image/png",
    "etag": "\"9de-PA7f23FfEoWy55NWl9CahZrlrFg\"",
    "mtime": "2024-12-29T13:56:03.125Z",
    "size": 2526,
    "path": "../public/assets/images/logo-violet-white.png"
  },
  "/assets/images/logo-violet.png": {
    "type": "image/png",
    "etag": "\"49d3-4y3go3xFtrd+POiLJnDGwGv4tko\"",
    "mtime": "2024-12-29T13:56:03.126Z",
    "size": 18899,
    "path": "../public/assets/images/logo-violet.png"
  },
  "/assets/images/logo-white.png": {
    "type": "image/png",
    "etag": "\"964-+NcSV5g9hPICcTm9Y2D1AhcCAZc\"",
    "mtime": "2024-12-29T13:56:03.126Z",
    "size": 2404,
    "path": "../public/assets/images/logo-white.png"
  },
  "/assets/images/m-pesa-logo.jpeg": {
    "type": "image/jpeg",
    "etag": "\"17cb-bqwZKePNYEYb5WBpyhMAUqGhDLk\"",
    "mtime": "2024-12-29T13:56:03.127Z",
    "size": 6091,
    "path": "../public/assets/images/m-pesa-logo.jpeg"
  },
  "/assets/images/modal-1-img.jpg": {
    "type": "image/jpeg",
    "etag": "\"6fdb-kYKUXmr6sT7C4uHWu+EGzEbpJWU\"",
    "mtime": "2024-12-29T13:56:03.126Z",
    "size": 28635,
    "path": "../public/assets/images/modal-1-img.jpg"
  },
  "/assets/images/modal-2-img.jpg": {
    "type": "image/jpeg",
    "etag": "\"6706-CU47H77ccQoD7K40jiaUSG59/6A\"",
    "mtime": "2024-12-29T13:56:03.126Z",
    "size": 26374,
    "path": "../public/assets/images/modal-2-img.jpg"
  },
  "/assets/images/modal-newsletter-blue.jpg": {
    "type": "image/jpeg",
    "etag": "\"29d0-UWjkeQ85GRYA7qkQkgqti9dRErw\"",
    "mtime": "2024-12-29T13:56:03.126Z",
    "size": 10704,
    "path": "../public/assets/images/modal-newsletter-blue.jpg"
  },
  "/assets/images/modal-newsletter-purple.jpg": {
    "type": "image/jpeg",
    "etag": "\"35d6-civQPIENIgdAcZwiQeACJYIoW14\"",
    "mtime": "2024-12-29T13:56:03.126Z",
    "size": 13782,
    "path": "../public/assets/images/modal-newsletter-purple.jpg"
  },
  "/assets/images/modal-newsletter-violet.jpg": {
    "type": "image/jpeg",
    "etag": "\"2dd2-UTJuMhO3g7vxFXh5MDpQzdAA2m4\"",
    "mtime": "2024-12-29T13:56:03.127Z",
    "size": 11730,
    "path": "../public/assets/images/modal-newsletter-violet.jpg"
  },
  "/assets/images/modal-request.jpg": {
    "type": "image/jpeg",
    "etag": "\"66f3-sG1Wl/rjA+JWrKS+LpmiznFGfeY\"",
    "mtime": "2024-12-29T13:56:03.127Z",
    "size": 26355,
    "path": "../public/assets/images/modal-request.jpg"
  },
  "/assets/images/pattern-01.png": {
    "type": "image/png",
    "etag": "\"2378-SmEqZBYbH+uVffA6LeAZO+9pycE\"",
    "mtime": "2024-12-29T13:56:03.127Z",
    "size": 9080,
    "path": "../public/assets/images/pattern-01.png"
  },
  "/assets/images/pattern-02.png": {
    "type": "image/png",
    "etag": "\"6a11-SidEyQ7A89j93Isv+olnIZmKanA\"",
    "mtime": "2024-12-29T13:56:03.127Z",
    "size": 27153,
    "path": "../public/assets/images/pattern-02.png"
  },
  "/assets/images/pattern-03.png": {
    "type": "image/png",
    "etag": "\"30b30-9PuKg9BXm9ULrlZPSjmjC+5t7vI\"",
    "mtime": "2024-12-29T13:56:03.128Z",
    "size": 199472,
    "path": "../public/assets/images/pattern-03.png"
  },
  "/assets/images/pattern-04.png": {
    "type": "image/png",
    "etag": "\"165a1-SuVXcVE039ozgkESeutRUJ1NzV0\"",
    "mtime": "2024-12-29T13:56:03.128Z",
    "size": 91553,
    "path": "../public/assets/images/pattern-04.png"
  },
  "/assets/images/post-author.jpg": {
    "type": "image/jpeg",
    "etag": "\"f64-8MMkmh1+U4AKBg2C3ZXai8pofPA\"",
    "mtime": "2024-12-29T13:56:03.127Z",
    "size": 3940,
    "path": "../public/assets/images/post-author.jpg"
  },
  "/assets/images/reset-password.jpg": {
    "type": "image/jpeg",
    "etag": "\"22c7-6YtIEIE1tI69dflFkCu9k4xl2iQ\"",
    "mtime": "2024-12-29T13:56:03.128Z",
    "size": 8903,
    "path": "../public/assets/images/reset-password.jpg"
  },
  "/assets/images/reset-password_dark.jpg": {
    "type": "image/jpeg",
    "etag": "\"1c0f-HprFfC9Myk+WSVwi6+U2S2ah4xA\"",
    "mtime": "2024-12-29T13:56:03.128Z",
    "size": 7183,
    "path": "../public/assets/images/reset-password_dark.jpg"
  },
  "/assets/images/review-author-1.jpg": {
    "type": "image/jpeg",
    "etag": "\"e84-P9xlDJqCll5Q+HUXgCkwM/edj1Y\"",
    "mtime": "2024-12-29T13:56:03.131Z",
    "size": 3716,
    "path": "../public/assets/images/review-author-1.jpg"
  },
  "/assets/images/review-author-2.jpg": {
    "type": "image/jpeg",
    "etag": "\"cc4-mxu7om+r74TvK1YTNXlPa0KnNoM\"",
    "mtime": "2024-12-29T13:56:03.128Z",
    "size": 3268,
    "path": "../public/assets/images/review-author-2.jpg"
  },
  "/assets/images/review-author-3.jpg": {
    "type": "image/jpeg",
    "etag": "\"fd8-XkZhnxbiLIQ5qgo+6zTr5A/2KNY\"",
    "mtime": "2024-12-29T13:56:03.128Z",
    "size": 4056,
    "path": "../public/assets/images/review-author-3.jpg"
  },
  "/assets/images/review-author-4.jpg": {
    "type": "image/jpeg",
    "etag": "\"bc8-pDD8IUM0SombBv0viEaLufF3rmc\"",
    "mtime": "2024-12-29T13:56:03.131Z",
    "size": 3016,
    "path": "../public/assets/images/review-author-4.jpg"
  },
  "/assets/images/review-author-5.jpg": {
    "type": "image/jpeg",
    "etag": "\"f8d-jRV0lYM/mcQ1ZeTZ7cvVrn0w8fI\"",
    "mtime": "2024-12-29T13:56:03.129Z",
    "size": 3981,
    "path": "../public/assets/images/review-author-5.jpg"
  },
  "/assets/images/review-author-6.jpg": {
    "type": "image/jpeg",
    "etag": "\"c9f-HyqCG43xR40a9R8Jh4N4pMEtEUg\"",
    "mtime": "2024-12-29T13:56:03.129Z",
    "size": 3231,
    "path": "../public/assets/images/review-author-6.jpg"
  },
  "/assets/images/review-author-7.jpg": {
    "type": "image/jpeg",
    "etag": "\"925-q4JJQQV/0g5eDWERMy0SchsCf0c\"",
    "mtime": "2024-12-29T13:56:03.129Z",
    "size": 2341,
    "path": "../public/assets/images/review-author-7.jpg"
  },
  "/assets/images/review-author-8.jpg": {
    "type": "image/jpeg",
    "etag": "\"f64-8MMkmh1+U4AKBg2C3ZXai8pofPA\"",
    "mtime": "2024-12-29T13:56:03.129Z",
    "size": 3940,
    "path": "../public/assets/images/review-author-8.jpg"
  },
  "/assets/images/square-logo.png": {
    "type": "image/png",
    "etag": "\"716-3UELjeJBr3vaJe/7RPrlfh1dS/g\"",
    "mtime": "2024-12-29T13:56:03.129Z",
    "size": 1814,
    "path": "../public/assets/images/square-logo.png"
  },
  "/assets/images/tablet-01.png": {
    "type": "image/png",
    "etag": "\"15075-Hn/d6XHA3sI5e7H+feOV+IS80LU\"",
    "mtime": "2024-12-29T13:56:03.130Z",
    "size": 86133,
    "path": "../public/assets/images/tablet-01.png"
  },
  "/assets/images/tablet-02.png": {
    "type": "image/png",
    "etag": "\"13f36-ooWdqALTAVfDbsjMQmKZhR/kjpw\"",
    "mtime": "2024-12-29T13:56:03.130Z",
    "size": 81718,
    "path": "../public/assets/images/tablet-02.png"
  },
  "/assets/images/tablet-03.png": {
    "type": "image/png",
    "etag": "\"20fce-XbLNoV9F9PS6CCrLC1QiI2HGxRc\"",
    "mtime": "2024-12-29T13:56:03.130Z",
    "size": 135118,
    "path": "../public/assets/images/tablet-03.png"
  },
  "/assets/images/tablet-04.png": {
    "type": "image/png",
    "etag": "\"160c4-qlBjH7yt1GlOkNRDz0Q0W5+jDbg\"",
    "mtime": "2024-12-29T13:56:03.131Z",
    "size": 90308,
    "path": "../public/assets/images/tablet-04.png"
  },
  "/assets/images/tablet-05.png": {
    "type": "image/png",
    "etag": "\"11a65-EEPVByquh4InMDUekWVNxpRDhMw\"",
    "mtime": "2024-12-29T13:56:03.130Z",
    "size": 72293,
    "path": "../public/assets/images/tablet-05.png"
  },
  "/assets/images/team-1.jpg": {
    "type": "image/jpeg",
    "etag": "\"ab59-IzWyMG0bZJBGE5latKvrso1Fdqs\"",
    "mtime": "2024-12-29T13:56:03.131Z",
    "size": 43865,
    "path": "../public/assets/images/team-1.jpg"
  },
  "/assets/images/team-10.jpg": {
    "type": "image/jpeg",
    "etag": "\"a597-FxHXX6JJmfU2lk2tl16gkRIRztw\"",
    "mtime": "2024-12-29T13:56:03.131Z",
    "size": 42391,
    "path": "../public/assets/images/team-10.jpg"
  },
  "/assets/images/team-11.jpg": {
    "type": "image/jpeg",
    "etag": "\"60d5-BZ289tIqeFE35wc0F/8Am8dOeNg\"",
    "mtime": "2024-12-29T13:56:03.131Z",
    "size": 24789,
    "path": "../public/assets/images/team-11.jpg"
  },
  "/assets/images/team-12.jpg": {
    "type": "image/jpeg",
    "etag": "\"9150-WpZtPHlIqojSCBe2niQYQnUW994\"",
    "mtime": "2024-12-29T13:56:03.131Z",
    "size": 37200,
    "path": "../public/assets/images/team-12.jpg"
  },
  "/assets/images/team-13.jpg": {
    "type": "image/jpeg",
    "etag": "\"1e0c-9YWbpwEQgYeUwko0hRPpVrUK204\"",
    "mtime": "2024-12-29T13:56:03.133Z",
    "size": 7692,
    "path": "../public/assets/images/team-13.jpg"
  },
  "/assets/images/team-2.jpg": {
    "type": "image/jpeg",
    "etag": "\"b94e-ToOzGUQKaL7brrNZiZV/PxMECQc\"",
    "mtime": "2024-12-29T13:56:03.131Z",
    "size": 47438,
    "path": "../public/assets/images/team-2.jpg"
  },
  "/assets/images/team-3.jpg": {
    "type": "image/jpeg",
    "etag": "\"e669-U1TvhphiOkC8cB6xpLAZC4wvFbA\"",
    "mtime": "2024-12-29T13:56:03.132Z",
    "size": 58985,
    "path": "../public/assets/images/team-3.jpg"
  },
  "/assets/images/team-4.jpg": {
    "type": "image/jpeg",
    "etag": "\"9de5-h6vCJtDlT7L69YOjeQdwfdMuLmw\"",
    "mtime": "2024-12-29T13:56:03.132Z",
    "size": 40421,
    "path": "../public/assets/images/team-4.jpg"
  },
  "/assets/images/team-5.jpg": {
    "type": "image/jpeg",
    "etag": "\"e277-W0k59iqjXRdMQvH1vwvwzcrhWB4\"",
    "mtime": "2024-12-29T13:56:03.132Z",
    "size": 57975,
    "path": "../public/assets/images/team-5.jpg"
  },
  "/assets/images/team-6.jpg": {
    "type": "image/jpeg",
    "etag": "\"cbf1-R6EB2z8lpRMYJXDx09W8yYzeHUc\"",
    "mtime": "2024-12-29T13:56:03.133Z",
    "size": 52209,
    "path": "../public/assets/images/team-6.jpg"
  },
  "/assets/images/team-7.jpg": {
    "type": "image/jpeg",
    "etag": "\"e0fe-aCgD1iGoxsb+s9XXAJXkeZzVfEE\"",
    "mtime": "2024-12-29T13:56:03.133Z",
    "size": 57598,
    "path": "../public/assets/images/team-7.jpg"
  },
  "/assets/images/team-8.jpg": {
    "type": "image/jpeg",
    "etag": "\"8f42-Zd2tCEh5fScYnJ0Uk1IgyH6jtDw\"",
    "mtime": "2024-12-29T13:56:03.132Z",
    "size": 36674,
    "path": "../public/assets/images/team-8.jpg"
  },
  "/assets/images/team-9.jpg": {
    "type": "image/jpeg",
    "etag": "\"9665-lSfj5NxRP4Rnz5C+n4/Hq4zI8dc\"",
    "mtime": "2024-12-29T13:56:03.132Z",
    "size": 38501,
    "path": "../public/assets/images/team-9.jpg"
  },
  "/assets/images/up_arrow.svg": {
    "type": "image/svg+xml",
    "etag": "\"2df-mul9oPIxCLUTPYbORckux+l57W0\"",
    "mtime": "2024-12-29T13:56:03.132Z",
    "size": 735,
    "path": "../public/assets/images/up_arrow.svg"
  },
  "/_nuxt/builds/latest.json": {
    "type": "application/json",
    "etag": "\"47-lD628Wc3ZGxKry03B5qlr5vvg0I\"",
    "mtime": "2024-12-29T13:56:03.019Z",
    "size": 71,
    "path": "../public/_nuxt/builds/latest.json"
  },
  "/assets/images/companies/.DS_Store": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"1804-3y++sUAKzaCQmjLBz2v0kvESHgc\"",
    "mtime": "2024-12-29T13:56:03.137Z",
    "size": 6148,
    "path": "../public/assets/images/companies/.DS_Store"
  },
  "/assets/images/companies/absa-logo.webp": {
    "type": "image/webp",
    "etag": "\"644c-DQPnuOQnnVNMMu8cllzSQwAvETE\"",
    "mtime": "2024-12-29T13:56:03.137Z",
    "size": 25676,
    "path": "../public/assets/images/companies/absa-logo.webp"
  },
  "/assets/images/companies/absa-logo2.png": {
    "type": "image/png",
    "etag": "\"da5-9qyyb2PEEzszw5ylldWPot3oUsg\"",
    "mtime": "2024-12-29T13:56:03.138Z",
    "size": 3493,
    "path": "../public/assets/images/companies/absa-logo2.png"
  },
  "/assets/images/companies/at-logo.png": {
    "type": "image/png",
    "etag": "\"1d09-kv7PVeda/vKmC75z2kCDTVM7gOo\"",
    "mtime": "2024-12-29T13:56:03.139Z",
    "size": 7433,
    "path": "../public/assets/images/companies/at-logo.png"
  },
  "/assets/images/companies/bamburi.png": {
    "type": "image/png",
    "etag": "\"10a7-peQjsWKgR9WV7DGh0Wi3Re87KeY\"",
    "mtime": "2024-12-29T13:56:03.082Z",
    "size": 4263,
    "path": "../public/assets/images/companies/bamburi.png"
  },
  "/assets/images/companies/coke.png": {
    "type": "image/png",
    "etag": "\"170d-8PhTQa7YOyXthFpDVdmx2HAERVA\"",
    "mtime": "2024-12-29T13:56:03.139Z",
    "size": 5901,
    "path": "../public/assets/images/companies/coke.png"
  },
  "/assets/images/companies/dn-logo.png": {
    "type": "image/png",
    "etag": "\"1474-2n8A8p4mhZAfz8Qr8R1cnMbQu1k\"",
    "mtime": "2024-12-29T13:56:03.138Z",
    "size": 5236,
    "path": "../public/assets/images/companies/dn-logo.png"
  },
  "/assets/images/companies/eabl-logo.png": {
    "type": "image/png",
    "etag": "\"d42-hxMkghOmhgSYC3Fa2B+Mi+Wfwz8\"",
    "mtime": "2024-12-29T13:56:03.137Z",
    "size": 3394,
    "path": "../public/assets/images/companies/eabl-logo.png"
  },
  "/assets/images/companies/jubilee-logo.png": {
    "type": "image/png",
    "etag": "\"2a50-e2XIC9YTIYvWQiiUX1caGnxbJXE\"",
    "mtime": "2024-12-29T13:56:03.138Z",
    "size": 10832,
    "path": "../public/assets/images/companies/jubilee-logo.png"
  },
  "/assets/images/companies/kcb-logo.png": {
    "type": "image/png",
    "etag": "\"13fe-Ya/4mIwgcNUbpaNaYcU/JKNe+PE\"",
    "mtime": "2024-12-29T13:56:03.138Z",
    "size": 5118,
    "path": "../public/assets/images/companies/kcb-logo.png"
  },
  "/assets/images/companies/kplc-logo.jpeg": {
    "type": "image/jpeg",
    "etag": "\"16fc-GiQKgWCThH5uKF/9MI6bv5W4tCA\"",
    "mtime": "2024-12-29T13:56:03.139Z",
    "size": 5884,
    "path": "../public/assets/images/companies/kplc-logo.jpeg"
  },
  "/assets/images/companies/microsoft-logo.png": {
    "type": "image/png",
    "etag": "\"8dc-mysrDwkE91NiH7BHODtwq3X9smo\"",
    "mtime": "2024-12-29T13:56:03.138Z",
    "size": 2268,
    "path": "../public/assets/images/companies/microsoft-logo.png"
  },
  "/assets/images/companies/safaricom-logo.png": {
    "type": "image/png",
    "etag": "\"294a-zPEdrBVD3oUxGbs2IMXFHY90stU\"",
    "mtime": "2024-12-29T13:56:03.138Z",
    "size": 10570,
    "path": "../public/assets/images/companies/safaricom-logo.png"
  },
  "/assets/images/color-scheme/blue.jpg": {
    "type": "image/jpeg",
    "etag": "\"219-UsLr1Fo328HbhyduvmZpWI7wANo\"",
    "mtime": "2024-12-29T13:56:03.135Z",
    "size": 537,
    "path": "../public/assets/images/color-scheme/blue.jpg"
  },
  "/assets/images/color-scheme/crocus.jpg": {
    "type": "image/jpeg",
    "etag": "\"219-YeuwMBQtvaHGZ0Ag0cwJ6/LTFs4\"",
    "mtime": "2024-12-29T13:56:03.082Z",
    "size": 537,
    "path": "../public/assets/images/color-scheme/crocus.jpg"
  },
  "/assets/images/color-scheme/green.jpg": {
    "type": "image/jpeg",
    "etag": "\"219-0hIVFF4IeKOdL2ege4HNs2R69D0\"",
    "mtime": "2024-12-29T13:56:03.135Z",
    "size": 537,
    "path": "../public/assets/images/color-scheme/green.jpg"
  },
  "/assets/images/color-scheme/magenta.jpg": {
    "type": "image/jpeg",
    "etag": "\"219-jnSr0OeggsWTjGspT+XWKiuc2fo\"",
    "mtime": "2024-12-29T13:56:03.136Z",
    "size": 537,
    "path": "../public/assets/images/color-scheme/magenta.jpg"
  },
  "/assets/images/color-scheme/pink.jpg": {
    "type": "image/jpeg",
    "etag": "\"218-tf3B0KWL+J1GD7FrwlKgOKQCWf4\"",
    "mtime": "2024-12-29T13:56:03.135Z",
    "size": 536,
    "path": "../public/assets/images/color-scheme/pink.jpg"
  },
  "/assets/images/color-scheme/purple.jpg": {
    "type": "image/jpeg",
    "etag": "\"219-yyUgJ1YxQ7Opw/ZM1H3OdsuXC74\"",
    "mtime": "2024-12-29T13:56:03.136Z",
    "size": 537,
    "path": "../public/assets/images/color-scheme/purple.jpg"
  },
  "/assets/images/color-scheme/red.jpg": {
    "type": "image/jpeg",
    "etag": "\"219-XxrUk1ZDU1kj1NKWvU/X7PLtE6Q\"",
    "mtime": "2024-12-29T13:56:03.136Z",
    "size": 537,
    "path": "../public/assets/images/color-scheme/red.jpg"
  },
  "/assets/images/color-scheme/skyblue.jpg": {
    "type": "image/jpeg",
    "etag": "\"219-VMHKHLT5R1BG5U+xf2fbDNyZTxI\"",
    "mtime": "2024-12-29T13:56:03.139Z",
    "size": 537,
    "path": "../public/assets/images/color-scheme/skyblue.jpg"
  },
  "/assets/images/color-scheme/violet.jpg": {
    "type": "image/jpeg",
    "etag": "\"219-qSUc65zNmdf3He0MDnIvtHRJnPY\"",
    "mtime": "2024-12-29T13:56:03.137Z",
    "size": 537,
    "path": "../public/assets/images/color-scheme/violet.jpg"
  },
  "/assets/images/blog/post-1-img.jpg": {
    "type": "image/jpeg",
    "etag": "\"73bc-XQsY39yQ3YUWjAWKp67Dbo2vkGY\"",
    "mtime": "2024-12-29T13:56:03.081Z",
    "size": 29628,
    "path": "../public/assets/images/blog/post-1-img.jpg"
  },
  "/assets/images/blog/post-10-img.jpg": {
    "type": "image/jpeg",
    "etag": "\"14f89-ajYQByi1/dlhXlQ2f8t+bUYS964\"",
    "mtime": "2024-12-29T13:56:03.134Z",
    "size": 85897,
    "path": "../public/assets/images/blog/post-10-img.jpg"
  },
  "/assets/images/blog/post-11-img.jpg": {
    "type": "image/jpeg",
    "etag": "\"bf36-s6dlyCmHS/tLsCIYhWFjYc9PTOU\"",
    "mtime": "2024-12-29T13:56:03.133Z",
    "size": 48950,
    "path": "../public/assets/images/blog/post-11-img.jpg"
  },
  "/assets/images/blog/post-12-img.jpg": {
    "type": "image/jpeg",
    "etag": "\"aff9-Gvwo4LRol8xLpeU32Cxp7IFeQg0\"",
    "mtime": "2024-12-29T13:56:03.134Z",
    "size": 45049,
    "path": "../public/assets/images/blog/post-12-img.jpg"
  },
  "/assets/images/blog/post-13-img.jpg": {
    "type": "image/jpeg",
    "etag": "\"612b-25wDSfJoXR7Qw4s8FOF6J+LX+as\"",
    "mtime": "2024-12-29T13:56:03.137Z",
    "size": 24875,
    "path": "../public/assets/images/blog/post-13-img.jpg"
  },
  "/assets/images/blog/post-14-img.jpg": {
    "type": "image/jpeg",
    "etag": "\"dec1-CV7rTHdhQSkYHs48/Q2LjSVc2ZU\"",
    "mtime": "2024-12-29T13:56:03.134Z",
    "size": 57025,
    "path": "../public/assets/images/blog/post-14-img.jpg"
  },
  "/assets/images/blog/post-2-img.jpg": {
    "type": "image/jpeg",
    "etag": "\"632d-UU5Bz9rc+UNwav7f69RuOgvHHao\"",
    "mtime": "2024-12-29T13:56:03.137Z",
    "size": 25389,
    "path": "../public/assets/images/blog/post-2-img.jpg"
  },
  "/assets/images/blog/post-3-img.jpg": {
    "type": "image/jpeg",
    "etag": "\"2c5d-K7k8uV7G12T+fX4CJWpJYjQs1vk\"",
    "mtime": "2024-12-29T13:56:03.135Z",
    "size": 11357,
    "path": "../public/assets/images/blog/post-3-img.jpg"
  },
  "/assets/images/blog/post-4-img.jpg": {
    "type": "image/jpeg",
    "etag": "\"4479-dR1vUsor/BCbtEgBjFRl2n5rHVM\"",
    "mtime": "2024-12-29T13:56:03.133Z",
    "size": 17529,
    "path": "../public/assets/images/blog/post-4-img.jpg"
  },
  "/assets/images/blog/post-5-img.jpg": {
    "type": "image/jpeg",
    "etag": "\"fc70-PVY046sY8k43oCwhUhdxWAWmAJI\"",
    "mtime": "2024-12-29T13:56:03.134Z",
    "size": 64624,
    "path": "../public/assets/images/blog/post-5-img.jpg"
  },
  "/assets/images/blog/post-6-img.jpg": {
    "type": "image/jpeg",
    "etag": "\"11771-+RcZUrOKO9y/i35HFe5e0Tb4oFE\"",
    "mtime": "2024-12-29T13:56:03.134Z",
    "size": 71537,
    "path": "../public/assets/images/blog/post-6-img.jpg"
  },
  "/assets/images/blog/post-7-img.jpg": {
    "type": "image/jpeg",
    "etag": "\"a132-msMjgiYeQrCxKWZ+qYDBUZCeWS0\"",
    "mtime": "2024-12-29T13:56:03.134Z",
    "size": 41266,
    "path": "../public/assets/images/blog/post-7-img.jpg"
  },
  "/assets/images/blog/post-8-img.jpg": {
    "type": "image/jpeg",
    "etag": "\"6cf8-jVq01EWD5X58kDNPZxwt/vMrKvc\"",
    "mtime": "2024-12-29T13:56:03.134Z",
    "size": 27896,
    "path": "../public/assets/images/blog/post-8-img.jpg"
  },
  "/assets/images/blog/post-9-img.jpg": {
    "type": "image/jpeg",
    "etag": "\"16136-TmcAHJIOwdswUnYsjnA9GK6SY9A\"",
    "mtime": "2024-12-29T13:56:03.135Z",
    "size": 90422,
    "path": "../public/assets/images/blog/post-9-img.jpg"
  },
  "/assets/images/icons/dark-black.svg": {
    "type": "image/svg+xml",
    "etag": "\"289-4JjtUEKyDX6nSuwXVJTGUseL5xM\"",
    "mtime": "2024-12-29T13:56:03.082Z",
    "size": 649,
    "path": "../public/assets/images/icons/dark-black.svg"
  },
  "/assets/images/icons/dark.svg": {
    "type": "image/svg+xml",
    "etag": "\"283-knmkaSRlwecSTSqotcSqFnVwwh8\"",
    "mtime": "2024-12-29T13:56:03.139Z",
    "size": 643,
    "path": "../public/assets/images/icons/dark.svg"
  },
  "/assets/images/icons/light-black.svg": {
    "type": "image/svg+xml",
    "etag": "\"841-2M7noJ3vHJAGHcCY+XjEpHD1nBE\"",
    "mtime": "2024-12-29T13:56:03.139Z",
    "size": 2113,
    "path": "../public/assets/images/icons/light-black.svg"
  },
  "/assets/images/icons/light.svg": {
    "type": "image/svg+xml",
    "etag": "\"83d-NcwqEeXQHfESwFOJJPCdIgyhmK0\"",
    "mtime": "2024-12-29T13:56:03.139Z",
    "size": 2109,
    "path": "../public/assets/images/icons/light.svg"
  },
  "/assets/images/projects/project-01.jpg": {
    "type": "image/jpeg",
    "etag": "\"6cf8-jVq01EWD5X58kDNPZxwt/vMrKvc\"",
    "mtime": "2024-12-29T13:56:03.145Z",
    "size": 27896,
    "path": "../public/assets/images/projects/project-01.jpg"
  },
  "/assets/images/projects/project-02.jpg": {
    "type": "image/jpeg",
    "etag": "\"1899c-KaUo1W/6gOHub4n2IprRkYPIeis\"",
    "mtime": "2024-12-29T13:56:03.084Z",
    "size": 100764,
    "path": "../public/assets/images/projects/project-02.jpg"
  },
  "/assets/images/projects/project-03.jpg": {
    "type": "image/jpeg",
    "etag": "\"18968-kdJgm53iUWk7ZyFkFdZqHdWod+0\"",
    "mtime": "2024-12-29T13:56:03.146Z",
    "size": 100712,
    "path": "../public/assets/images/projects/project-03.jpg"
  },
  "/assets/images/projects/project-04.jpg": {
    "type": "image/jpeg",
    "etag": "\"fc70-PVY046sY8k43oCwhUhdxWAWmAJI\"",
    "mtime": "2024-12-29T13:56:03.146Z",
    "size": 64624,
    "path": "../public/assets/images/projects/project-04.jpg"
  },
  "/assets/images/projects/project-05.jpg": {
    "type": "image/jpeg",
    "etag": "\"632d-UU5Bz9rc+UNwav7f69RuOgvHHao\"",
    "mtime": "2024-12-29T13:56:03.144Z",
    "size": 25389,
    "path": "../public/assets/images/projects/project-05.jpg"
  },
  "/assets/images/projects/project-06.jpg": {
    "type": "image/jpeg",
    "etag": "\"11771-+RcZUrOKO9y/i35HFe5e0Tb4oFE\"",
    "mtime": "2024-12-29T13:56:03.145Z",
    "size": 71537,
    "path": "../public/assets/images/projects/project-06.jpg"
  },
  "/assets/images/projects/project-07.jpg": {
    "type": "image/jpeg",
    "etag": "\"b1a5-xyeQz620Wz65jEZAjERldlh08UU\"",
    "mtime": "2024-12-29T13:56:03.145Z",
    "size": 45477,
    "path": "../public/assets/images/projects/project-07.jpg"
  },
  "/assets/images/projects/project-08.jpg": {
    "type": "image/jpeg",
    "etag": "\"15b34-9x53qySfiBbrEoa/epLfgNwd4W4\"",
    "mtime": "2024-12-29T13:56:03.145Z",
    "size": 88884,
    "path": "../public/assets/images/projects/project-08.jpg"
  },
  "/assets/images/projects/project-09.jpg": {
    "type": "image/jpeg",
    "etag": "\"85e6-hzVcaivyAqxX9qzmpooD1N+91Ig\"",
    "mtime": "2024-12-29T13:56:03.145Z",
    "size": 34278,
    "path": "../public/assets/images/projects/project-09.jpg"
  },
  "/assets/images/projects/project-10.jpg": {
    "type": "image/jpeg",
    "etag": "\"15241-+isfbHknB+L7tGciBopEPZu6BMU\"",
    "mtime": "2024-12-29T13:56:03.146Z",
    "size": 86593,
    "path": "../public/assets/images/projects/project-10.jpg"
  },
  "/assets/images/projects/project-10a.jpg": {
    "type": "image/jpeg",
    "etag": "\"11a10-p/pdvO6G4xjseVWBmG0ka30VHow\"",
    "mtime": "2024-12-29T13:56:03.146Z",
    "size": 72208,
    "path": "../public/assets/images/projects/project-10a.jpg"
  },
  "/assets/images/projects/project-11.jpg": {
    "type": "image/jpeg",
    "etag": "\"a1c5-qG7Vl4pncvSosrszNhz0KIIgg4k\"",
    "mtime": "2024-12-29T13:56:03.146Z",
    "size": 41413,
    "path": "../public/assets/images/projects/project-11.jpg"
  },
  "/assets/images/projects/project-11a.jpg": {
    "type": "image/jpeg",
    "etag": "\"11239-pNrg1GheKmBa3O6dqZp69aGtqmE\"",
    "mtime": "2024-12-29T13:56:03.146Z",
    "size": 70201,
    "path": "../public/assets/images/projects/project-11a.jpg"
  },
  "/assets/images/png_icons/am.png": {
    "type": "image/png",
    "etag": "\"1a4f-k+H2IRrTdK3FBjeOM8ffgN5dWc0\"",
    "mtime": "2024-12-29T13:56:03.083Z",
    "size": 6735,
    "path": "../public/assets/images/png_icons/am.png"
  },
  "/assets/images/png_icons/bitcoin.png": {
    "type": "image/png",
    "etag": "\"1449-iKHFsPHCGi2XxAGX1z/dDSqh/1w\"",
    "mtime": "2024-12-29T13:56:03.141Z",
    "size": 5193,
    "path": "../public/assets/images/png_icons/bitcoin.png"
  },
  "/assets/images/png_icons/citi.png": {
    "type": "image/png",
    "etag": "\"1118-bNCYxDJxH3Vaf4MThKiC2lhyLAY\"",
    "mtime": "2024-12-29T13:56:03.140Z",
    "size": 4376,
    "path": "../public/assets/images/png_icons/citi.png"
  },
  "/assets/images/png_icons/discover.png": {
    "type": "image/png",
    "etag": "\"13b7-10sZ4Mv5i6UhT09u33MCYqXwbb4\"",
    "mtime": "2024-12-29T13:56:03.140Z",
    "size": 5047,
    "path": "../public/assets/images/png_icons/discover.png"
  },
  "/assets/images/png_icons/ebay.png": {
    "type": "image/png",
    "etag": "\"158b-5U+xwvfsIxWYyszPqaqSm4v0iCY\"",
    "mtime": "2024-12-29T13:56:03.141Z",
    "size": 5515,
    "path": "../public/assets/images/png_icons/ebay.png"
  },
  "/assets/images/png_icons/google.png": {
    "type": "image/png",
    "etag": "\"1225-9dKO3E1ukPFm/woCyELBHYu0QpA\"",
    "mtime": "2024-12-29T13:56:03.141Z",
    "size": 4645,
    "path": "../public/assets/images/png_icons/google.png"
  },
  "/assets/images/png_icons/ideal.png": {
    "type": "image/png",
    "etag": "\"1332-e4K7eHMGlJ6LbmFvdEyw5S0sULk\"",
    "mtime": "2024-12-29T13:56:03.142Z",
    "size": 4914,
    "path": "../public/assets/images/png_icons/ideal.png"
  },
  "/assets/images/png_icons/jcb.png": {
    "type": "image/png",
    "etag": "\"1078-GTx61rZ82ipHJSQFqw0FgZ2XGuc\"",
    "mtime": "2024-12-29T13:56:03.141Z",
    "size": 4216,
    "path": "../public/assets/images/png_icons/jcb.png"
  },
  "/assets/images/png_icons/loud-speaker.png": {
    "type": "image/png",
    "etag": "\"3cf9-iJnOfVNPxZKk6DZpuJQeVkBdWu0\"",
    "mtime": "2024-12-29T13:56:03.141Z",
    "size": 15609,
    "path": "../public/assets/images/png_icons/loud-speaker.png"
  },
  "/assets/images/png_icons/mac-os.png": {
    "type": "image/png",
    "etag": "\"5b2-xI4WyUFgpqFQ2IrFLguJpw87zLk\"",
    "mtime": "2024-12-29T13:56:03.142Z",
    "size": 1458,
    "path": "../public/assets/images/png_icons/mac-os.png"
  },
  "/assets/images/png_icons/paypal.png": {
    "type": "image/png",
    "etag": "\"e2a-qeFB2+KNIq38PQuD47Z7GdsI89M\"",
    "mtime": "2024-12-29T13:56:03.142Z",
    "size": 3626,
    "path": "../public/assets/images/png_icons/paypal.png"
  },
  "/assets/images/png_icons/shopify.png": {
    "type": "image/png",
    "etag": "\"1579-vW9uAhPXazfLSixlxZ6ZpnPhSt8\"",
    "mtime": "2024-12-29T13:56:03.142Z",
    "size": 5497,
    "path": "../public/assets/images/png_icons/shopify.png"
  },
  "/assets/images/png_icons/tool-1.png": {
    "type": "image/png",
    "etag": "\"3fb-t6hn0DIHkEKly5jlybFeTDw8uLU\"",
    "mtime": "2024-12-29T13:56:03.142Z",
    "size": 1019,
    "path": "../public/assets/images/png_icons/tool-1.png"
  },
  "/assets/images/png_icons/tool-10.png": {
    "type": "image/png",
    "etag": "\"54b-nSn9Dtefd0o9fQA2ZWu5Lp35QY0\"",
    "mtime": "2024-12-29T13:56:03.143Z",
    "size": 1355,
    "path": "../public/assets/images/png_icons/tool-10.png"
  },
  "/assets/images/png_icons/tool-11.png": {
    "type": "image/png",
    "etag": "\"43b-L7cwhcHBIWhSw1n3p6/tgK38YPw\"",
    "mtime": "2024-12-29T13:56:03.142Z",
    "size": 1083,
    "path": "../public/assets/images/png_icons/tool-11.png"
  },
  "/assets/images/png_icons/tool-12.png": {
    "type": "image/png",
    "etag": "\"3d8-vtzioX7U0t5S71fQvh/g+oT9lrY\"",
    "mtime": "2024-12-29T13:56:03.143Z",
    "size": 984,
    "path": "../public/assets/images/png_icons/tool-12.png"
  },
  "/assets/images/png_icons/tool-13.png": {
    "type": "image/png",
    "etag": "\"3ff-yA3cFihry0IRCIlSEk0AJyzC/xw\"",
    "mtime": "2024-12-29T13:56:03.143Z",
    "size": 1023,
    "path": "../public/assets/images/png_icons/tool-13.png"
  },
  "/assets/images/png_icons/tool-14.png": {
    "type": "image/png",
    "etag": "\"847-nk2I+jGdU7nZhVdpw3HQ0j+KExE\"",
    "mtime": "2024-12-29T13:56:03.143Z",
    "size": 2119,
    "path": "../public/assets/images/png_icons/tool-14.png"
  },
  "/assets/images/png_icons/tool-2.png": {
    "type": "image/png",
    "etag": "\"e7-4VNstnRzxT7HX0cYHkthp755Lac\"",
    "mtime": "2024-12-29T13:56:03.143Z",
    "size": 231,
    "path": "../public/assets/images/png_icons/tool-2.png"
  },
  "/assets/images/png_icons/tool-3.png": {
    "type": "image/png",
    "etag": "\"5f2-lGGEHdCJ7d1KIn/5PuYuHaUshwU\"",
    "mtime": "2024-12-29T13:56:03.143Z",
    "size": 1522,
    "path": "../public/assets/images/png_icons/tool-3.png"
  },
  "/assets/images/png_icons/tool-4.png": {
    "type": "image/png",
    "etag": "\"48e-/pjCFLEcFVaErxfDO63p43u7l6M\"",
    "mtime": "2024-12-29T13:56:03.143Z",
    "size": 1166,
    "path": "../public/assets/images/png_icons/tool-4.png"
  },
  "/assets/images/png_icons/tool-5.png": {
    "type": "image/png",
    "etag": "\"33f3-7ysr0NoYbaY4GUkU4GUXQwGcAV4\"",
    "mtime": "2024-12-29T13:56:03.144Z",
    "size": 13299,
    "path": "../public/assets/images/png_icons/tool-5.png"
  },
  "/assets/images/png_icons/tool-6.png": {
    "type": "image/png",
    "etag": "\"5e4-9GgHlL0N17WLLCGbhKBs6fOe/yc\"",
    "mtime": "2024-12-29T13:56:03.143Z",
    "size": 1508,
    "path": "../public/assets/images/png_icons/tool-6.png"
  },
  "/assets/images/png_icons/tool-7.png": {
    "type": "image/png",
    "etag": "\"4b5-i9GUM4Zdft+L6gDo1sAfUm54uZA\"",
    "mtime": "2024-12-29T13:56:03.143Z",
    "size": 1205,
    "path": "../public/assets/images/png_icons/tool-7.png"
  },
  "/assets/images/png_icons/tool-8.png": {
    "type": "image/png",
    "etag": "\"1e6-i6Q3yXZhJuHt8bNr0guGNqXeXgc\"",
    "mtime": "2024-12-29T13:56:03.143Z",
    "size": 486,
    "path": "../public/assets/images/png_icons/tool-8.png"
  },
  "/assets/images/png_icons/tool-9.png": {
    "type": "image/png",
    "etag": "\"524-v6z3zYiLzIx4qkut2kosbqm6lCA\"",
    "mtime": "2024-12-29T13:56:03.143Z",
    "size": 1316,
    "path": "../public/assets/images/png_icons/tool-9.png"
  },
  "/assets/images/png_icons/visa.png": {
    "type": "image/png",
    "etag": "\"1563-5G0rp+VMHlOnwTA9sJxFTiVJAy4\"",
    "mtime": "2024-12-29T13:56:03.143Z",
    "size": 5475,
    "path": "../public/assets/images/png_icons/visa.png"
  },
  "/assets/images/png_icons/windows.png": {
    "type": "image/png",
    "etag": "\"10f-TtGO4m8sKGpdin3o2uBXrvqBKJU\"",
    "mtime": "2024-12-29T13:56:03.144Z",
    "size": 271,
    "path": "../public/assets/images/png_icons/windows.png"
  },
  "/assets/images/png_icons/wu.png": {
    "type": "image/png",
    "etag": "\"12b6-gD9YjzdHjbkTjkA+uYN/6Ngq1k4\"",
    "mtime": "2024-12-29T13:56:03.144Z",
    "size": 4790,
    "path": "../public/assets/images/png_icons/wu.png"
  },
  "/assets/images/store_badges/amazon-01.png": {
    "type": "image/png",
    "etag": "\"c58-FodC3QsihliHvKW3FFAu63nHsoE\"",
    "mtime": "2024-12-29T13:56:03.084Z",
    "size": 3160,
    "path": "../public/assets/images/store_badges/amazon-01.png"
  },
  "/assets/images/store_badges/amazon-02.png": {
    "type": "image/png",
    "etag": "\"d51-p5DPfjYExyNyGGDUL5rmHJJm89c\"",
    "mtime": "2024-12-29T13:56:03.148Z",
    "size": 3409,
    "path": "../public/assets/images/store_badges/amazon-02.png"
  },
  "/assets/images/store_badges/android.png": {
    "type": "image/png",
    "etag": "\"860-va1AtlGXhyuy0DobdbYxJDYesRA\"",
    "mtime": "2024-12-29T13:56:03.146Z",
    "size": 2144,
    "path": "../public/assets/images/store_badges/android.png"
  },
  "/assets/images/store_badges/appstore-white.png": {
    "type": "image/png",
    "etag": "\"10ac-Eu+FhU7DeaB2iDWEYEEqk6KZO+A\"",
    "mtime": "2024-12-29T13:56:03.146Z",
    "size": 4268,
    "path": "../public/assets/images/store_badges/appstore-white.png"
  },
  "/assets/images/store_badges/appstore.png": {
    "type": "image/png",
    "etag": "\"dae-ZgbPPKojZdE5JM77KbRa0JHRAfE\"",
    "mtime": "2024-12-29T13:56:03.148Z",
    "size": 3502,
    "path": "../public/assets/images/store_badges/appstore.png"
  },
  "/assets/images/store_badges/chrome.png": {
    "type": "image/png",
    "etag": "\"f34-vVxqtg/D3TmnVXnox0XdvGDVGY8\"",
    "mtime": "2024-12-29T13:56:03.146Z",
    "size": 3892,
    "path": "../public/assets/images/store_badges/chrome.png"
  },
  "/assets/images/store_badges/galaxystore.png": {
    "type": "image/png",
    "etag": "\"1bbb-9gDic3/rxChP16pcEbMXW8+PFlY\"",
    "mtime": "2024-12-29T13:56:03.147Z",
    "size": 7099,
    "path": "../public/assets/images/store_badges/galaxystore.png"
  },
  "/assets/images/store_badges/googleplay-white.png": {
    "type": "image/png",
    "etag": "\"15a3-6lK848Ttcrn2a6nn8AZoMYYauP4\"",
    "mtime": "2024-12-29T13:56:03.147Z",
    "size": 5539,
    "path": "../public/assets/images/store_badges/googleplay-white.png"
  },
  "/assets/images/store_badges/googleplay.png": {
    "type": "image/png",
    "etag": "\"10e3-cPS2wCVDk6DjhBM8OqYTuOBmsBg\"",
    "mtime": "2024-12-29T13:56:03.147Z",
    "size": 4323,
    "path": "../public/assets/images/store_badges/googleplay.png"
  },
  "/assets/images/store_badges/huawei.png": {
    "type": "image/png",
    "etag": "\"dba-19hqm367OJnKJKx8ENsrVPWo3DM\"",
    "mtime": "2024-12-29T13:56:03.147Z",
    "size": 3514,
    "path": "../public/assets/images/store_badges/huawei.png"
  },
  "/assets/images/store_badges/macstore.png": {
    "type": "image/png",
    "etag": "\"ddf-3+wVs3GH+5IZVAKF4b+1l9eeItE\"",
    "mtime": "2024-12-29T13:56:03.147Z",
    "size": 3551,
    "path": "../public/assets/images/store_badges/macstore.png"
  },
  "/assets/images/store_badges/microsoft-01.png": {
    "type": "image/png",
    "etag": "\"e51-WeqcAYjjEvsgdCHCj+bNhR8bvQs\"",
    "mtime": "2024-12-29T13:56:03.148Z",
    "size": 3665,
    "path": "../public/assets/images/store_badges/microsoft-01.png"
  },
  "/assets/images/store_badges/microsoft-02.png": {
    "type": "image/png",
    "etag": "\"9a3-jC3x55k7IYXHg//vvgCNGgazcVc\"",
    "mtime": "2024-12-29T13:56:03.148Z",
    "size": 2467,
    "path": "../public/assets/images/store_badges/microsoft-02.png"
  },
  "/assets/images/store_badges/shopify.png": {
    "type": "image/png",
    "etag": "\"1755-dNHN7FHEPAzmh4nX6IIjWDa9MnU\"",
    "mtime": "2024-12-29T13:56:03.148Z",
    "size": 5973,
    "path": "../public/assets/images/store_badges/shopify.png"
  },
  "/assets/images/store_badges/windows-10.png": {
    "type": "image/png",
    "etag": "\"95a-APQslCENOOAt6awZTYKzcLqooJU\"",
    "mtime": "2024-12-29T13:56:03.148Z",
    "size": 2394,
    "path": "../public/assets/images/store_badges/windows-10.png"
  },
  "/assets/images/team/team.jpg": {
    "type": "image/jpeg",
    "etag": "\"1e0c-9YWbpwEQgYeUwko0hRPpVrUK204\"",
    "mtime": "2024-12-29T13:56:03.087Z",
    "size": 7692,
    "path": "../public/assets/images/team/team.jpg"
  },
  "/assets/images/team/virginia.png": {
    "type": "image/png",
    "etag": "\"b578e-dWpfM5s3Kg1MbafGXy1fJ2yJDX0\"",
    "mtime": "2024-12-29T13:56:03.150Z",
    "size": 743310,
    "path": "../public/assets/images/team/virginia.png"
  },
  "/_nuxt/builds/meta/74ce9abb-c6c4-4ad8-a1dd-63dc8a5c24ac.json": {
    "type": "application/json",
    "etag": "\"8b-f0X9qFZTzTOR+B3IaX1Ur9oGmNA\"",
    "mtime": "2024-12-29T13:56:03.017Z",
    "size": 139,
    "path": "../public/_nuxt/builds/meta/74ce9abb-c6c4-4ad8-a1dd-63dc8a5c24ac.json"
  }
};

const _DRIVE_LETTER_START_RE = /^[A-Za-z]:\//;
function normalizeWindowsPath(input = "") {
  if (!input) {
    return input;
  }
  return input.replace(/\\/g, "/").replace(_DRIVE_LETTER_START_RE, (r) => r.toUpperCase());
}
const _IS_ABSOLUTE_RE = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/;
const _DRIVE_LETTER_RE = /^[A-Za-z]:$/;
function cwd() {
  if (typeof process !== "undefined" && typeof process.cwd === "function") {
    return process.cwd().replace(/\\/g, "/");
  }
  return "/";
}
const resolve$1 = function(...arguments_) {
  arguments_ = arguments_.map((argument) => normalizeWindowsPath(argument));
  let resolvedPath = "";
  let resolvedAbsolute = false;
  for (let index = arguments_.length - 1; index >= -1 && !resolvedAbsolute; index--) {
    const path = index >= 0 ? arguments_[index] : cwd();
    if (!path || path.length === 0) {
      continue;
    }
    resolvedPath = `${path}/${resolvedPath}`;
    resolvedAbsolute = isAbsolute(path);
  }
  resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute);
  if (resolvedAbsolute && !isAbsolute(resolvedPath)) {
    return `/${resolvedPath}`;
  }
  return resolvedPath.length > 0 ? resolvedPath : ".";
};
function normalizeString(path, allowAboveRoot) {
  let res = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let char = null;
  for (let index = 0; index <= path.length; ++index) {
    if (index < path.length) {
      char = path[index];
    } else if (char === "/") {
      break;
    } else {
      char = "/";
    }
    if (char === "/") {
      if (lastSlash === index - 1 || dots === 1) ; else if (dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res[res.length - 1] !== "." || res[res.length - 2] !== ".") {
          if (res.length > 2) {
            const lastSlashIndex = res.lastIndexOf("/");
            if (lastSlashIndex === -1) {
              res = "";
              lastSegmentLength = 0;
            } else {
              res = res.slice(0, lastSlashIndex);
              lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
            }
            lastSlash = index;
            dots = 0;
            continue;
          } else if (res.length > 0) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = index;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          res += res.length > 0 ? "/.." : "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0) {
          res += `/${path.slice(lastSlash + 1, index)}`;
        } else {
          res = path.slice(lastSlash + 1, index);
        }
        lastSegmentLength = index - lastSlash - 1;
      }
      lastSlash = index;
      dots = 0;
    } else if (char === "." && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}
const isAbsolute = function(p) {
  return _IS_ABSOLUTE_RE.test(p);
};
const dirname = function(p) {
  const segments = normalizeWindowsPath(p).replace(/\/$/, "").split("/").slice(0, -1);
  if (segments.length === 1 && _DRIVE_LETTER_RE.test(segments[0])) {
    segments[0] += "/";
  }
  return segments.join("/") || (isAbsolute(p) ? "/" : ".");
};
const basename = function(p, extension) {
  const lastSegment = normalizeWindowsPath(p).split("/").pop();
  return extension && lastSegment.endsWith(extension) ? lastSegment.slice(0, -extension.length) : lastSegment;
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises$1.readFile(resolve$1(serverDir, assets[id].path))
}

const publicAssetBases = {"/_nuxt/builds/meta/":{"maxAge":31536000},"/_nuxt/builds/":{"maxAge":1},"/_nuxt/":{"maxAge":31536000}};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _f4b49z = eventHandler((event) => {
  if (event.method && !METHODS.has(event.method)) {
    return;
  }
  let id = decodePath(
    withLeadingSlash(withoutTrailingSlash(parseURL(event.path).pathname))
  );
  let asset;
  const encodingHeader = String(
    getRequestHeader(event, "accept-encoding") || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  if (encodings.length > 1) {
    setResponseHeader(event, "Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      removeResponseHeader(event, "Cache-Control");
      throw createError$1({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = getRequestHeader(event, "if-none-match") === asset.etag;
  if (ifNotMatch) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  const ifModifiedSinceH = getRequestHeader(event, "if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  if (asset.type && !getResponseHeader(event, "Content-Type")) {
    setResponseHeader(event, "Content-Type", asset.type);
  }
  if (asset.etag && !getResponseHeader(event, "ETag")) {
    setResponseHeader(event, "ETag", asset.etag);
  }
  if (asset.mtime && !getResponseHeader(event, "Last-Modified")) {
    setResponseHeader(event, "Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !getResponseHeader(event, "Content-Encoding")) {
    setResponseHeader(event, "Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !getResponseHeader(event, "Content-Length")) {
    setResponseHeader(event, "Content-Length", asset.size);
  }
  return readAsset(id);
});

function useNitroOrigin(e) {
  const cert = process.env.NITRO_SSL_CERT;
  const key = process.env.NITRO_SSL_KEY;
  let host = process.env.NITRO_HOST || process.env.HOST || false;
  let port = false;
  let protocol = cert && key || !false ? "https" : "http";
  if (e) {
    host = getRequestHost(e, { xForwardedHost: true }) || host;
    protocol = getRequestProtocol(e, { xForwardedProto: true }) || protocol;
  }
  if (typeof host === "string" && host.includes(":")) {
    port = host.split(":").pop();
    host = host.split(":")[0];
  }
  port = port ? `:${port}` : "";
  return withTrailingSlash(`${protocol}://${host}${port}`);
}

const _kTwPIt = defineEventHandler(async (e) => {
  if (e.context.siteConfig)
    return;
  const runtimeConfig = useRuntimeConfig(e);
  const config = runtimeConfig["nuxt-site-config"];
  const nitroApp = useNitroApp();
  const siteConfig = createSiteConfigStack({
    debug: config.debug
  });
  const nitroOrigin = useNitroOrigin(e);
  e.context.siteConfigNitroOrigin = nitroOrigin;
  {
    siteConfig.push({
      _context: "nitro:init",
      _priority: -4,
      url: nitroOrigin
    });
  }
  siteConfig.push({
    _context: "runtimeEnv",
    _priority: 0,
    ...runtimeConfig.site || {},
    ...runtimeConfig.public.site || {},
    // @ts-expect-error untyped
    ...envSiteConfig(globalThis._importMeta_.env)
    // just in-case, shouldn't be needed
  });
  const buildStack = config.stack || [];
  buildStack.forEach((c) => siteConfig.push(c));
  if (e.context._nitro.routeRules.site) {
    siteConfig.push({
      _context: "route-rules",
      ...e.context._nitro.routeRules.site
    });
  }
  const ctx = { siteConfig, event: e };
  await nitroApp.hooks.callHook("site-config:init", ctx);
  e.context.siteConfig = ctx.siteConfig;
});

function resolveSitePath(pathOrUrl, options) {
  let path = pathOrUrl;
  if (hasProtocol(pathOrUrl, { strict: false, acceptRelative: true })) {
    const parsed = parseURL(pathOrUrl);
    path = parsed.pathname;
  }
  const base = withLeadingSlash(options.base || "/");
  if (base !== "/" && path.startsWith(base)) {
    path = path.slice(base.length);
  }
  let origin = withoutTrailingSlash(options.absolute ? options.siteUrl : "");
  if (base !== "/" && origin.endsWith(base)) {
    origin = origin.slice(0, origin.indexOf(base));
  }
  const baseWithOrigin = options.withBase ? withBase(base, origin || "/") : origin;
  const resolvedUrl = withBase(path, baseWithOrigin);
  return path === "/" && !options.withBase ? withTrailingSlash(resolvedUrl) : fixSlashes(options.trailingSlash, resolvedUrl);
}
function isPathFile(path) {
  const lastSegment = path.split("/").pop();
  return !!(lastSegment || path).match(/\.[0-9a-z]+$/i)?.[0];
}
function fixSlashes(trailingSlash, pathOrUrl) {
  const $url = parseURL(pathOrUrl);
  if (isPathFile($url.pathname))
    return pathOrUrl;
  const fixedPath = trailingSlash ? withTrailingSlash($url.pathname) : withoutTrailingSlash($url.pathname);
  return `${$url.protocol ? `${$url.protocol}//` : ""}${$url.host || ""}${fixedPath}${$url.search || ""}${$url.hash || ""}`;
}

function createSitePathResolver(e, options = {}) {
  const siteConfig = useSiteConfig(e);
  const nitroOrigin = useNitroOrigin(e);
  const nuxtBase = useRuntimeConfig(e).app.baseURL || "/";
  return (path) => {
    return resolveSitePath(path, {
      ...options,
      siteUrl: options.canonical !== false || false ? siteConfig.url : nitroOrigin,
      trailingSlash: siteConfig.trailingSlash,
      base: nuxtBase
    });
  };
}
function withSiteUrl(e, path, options = {}) {
  const siteConfig = e.context.siteConfig?.get();
  let siteUrl = e.context.siteConfigNitroOrigin;
  if ((options.canonical !== false || false) && siteConfig.url)
    siteUrl = siteConfig.url;
  return resolveSitePath(path, {
    absolute: true,
    siteUrl,
    trailingSlash: siteConfig.trailingSlash,
    base: e.context.nitro.baseURL,
    withBase: options.withBase
  });
}

function matches(pattern, path) {
  const pathLength = path.length;
  const patternLength = pattern.length;
  const matchingLengths = Array.from({ length: pathLength + 1 }).fill(0);
  let numMatchingLengths = 1;
  let p = 0;
  while (p < patternLength) {
    if (pattern[p] === "$" && p + 1 === patternLength) {
      return matchingLengths[numMatchingLengths - 1] === pathLength;
    }
    if (pattern[p] === "*") {
      numMatchingLengths = pathLength - matchingLengths[0] + 1;
      for (let i = 1; i < numMatchingLengths; i++) {
        matchingLengths[i] = matchingLengths[i - 1] + 1;
      }
    } else {
      let numMatches = 0;
      for (let i = 0; i < numMatchingLengths; i++) {
        const matchLength = matchingLengths[i];
        if (matchLength < pathLength && path[matchLength] === pattern[p]) {
          matchingLengths[numMatches++] = matchLength + 1;
        }
      }
      if (numMatches === 0) {
        return false;
      }
      numMatchingLengths = numMatches;
    }
    p++;
  }
  return true;
}
function matchPathToRule(path, _rules) {
  let matchedRule = null;
  const rules = _rules.filter(Boolean);
  const rulesLength = rules.length;
  let i = 0;
  while (i < rulesLength) {
    const rule = rules[i];
    if (!matches(rule.pattern, path)) {
      i++;
      continue;
    }
    if (!matchedRule || rule.pattern.length > matchedRule.pattern.length) {
      matchedRule = rule;
    } else if (rule.pattern.length === matchedRule.pattern.length && rule.allow && !matchedRule.allow) {
      matchedRule = rule;
    }
    i++;
  }
  return matchedRule;
}
function asArray(v) {
  return typeof v === "undefined" ? [] : Array.isArray(v) ? v : [v];
}
function generateRobotsTxt({ groups, sitemaps }) {
  const lines = [];
  for (const group of groups) {
    for (const comment of group.comment || [])
      lines.push(`# ${comment}`);
    for (const userAgent of group.userAgent || ["*"])
      lines.push(`User-agent: ${userAgent}`);
    for (const allow of group.allow || [])
      lines.push(`Allow: ${allow}`);
    for (const disallow of group.disallow || [])
      lines.push(`Disallow: ${disallow}`);
    for (const cleanParam of group.cleanParam || [])
      lines.push(`Clean-param: ${cleanParam}`);
    lines.push("");
  }
  for (const sitemap of sitemaps)
    lines.push(`Sitemap: ${sitemap}`);
  return lines.join("\n");
}
function normaliseRobotsRouteRule(config) {
  let allow;
  if (typeof config.robots === "boolean")
    allow = config.robots;
  else if (typeof config.robots === "object" && typeof config.robots.indexable !== "undefined")
    allow = config.robots.indexable;
  let rule;
  if (typeof config.robots === "object" && typeof config.robots.rule !== "undefined")
    rule = config.robots.rule;
  else if (typeof config.robots === "string")
    rule = config.robots;
  if (rule && !allow)
    allow = rule !== "none" && !rule.includes("noindex");
  if (typeof allow === "undefined" && typeof rule === "undefined")
    return;
  return {
    allow,
    rule
  };
}

function getSiteIndexable(e) {
  const { env, indexable } = useSiteConfig(e);
  if (typeof indexable !== "undefined")
    return String(indexable) === "true";
  return env === "production";
}

function getSiteRobotConfig(e) {
  const query = getQuery(e);
  const hints = [];
  const { groups, debug } = useRuntimeConfig(e)["nuxt-robots"];
  let indexable = getSiteIndexable(e);
  const queryIndexableEnabled = String(query.mockProductionEnv) === "true" || query.mockProductionEnv === "";
  if (debug || false) {
    const { _context } = useSiteConfig(e, { debug: debug || false });
    if (queryIndexableEnabled) {
      indexable = true;
      hints.push("You are mocking a production enviroment with ?mockProductionEnv query.");
    } else if (!indexable && _context.indexable === "nuxt-robots:config") {
      hints.push("You are blocking indexing with your Nuxt Robots config.");
    } else if (!queryIndexableEnabled && !_context.indexable) {
      hints.push(`Indexing is blocked in development. You can mock a production environment with ?mockProductionEnv query.`);
    } else if (!indexable && !queryIndexableEnabled) {
      hints.push(`Indexing is blocked by site config set by ${_context.indexable}.`);
    } else if (indexable && !queryIndexableEnabled) {
      hints.push(`Indexing is enabled from ${_context.indexable}.`);
    }
  }
  if (groups.some((g) => g.userAgent.includes("*") && g.disallow.includes("/"))) {
    indexable = false;
    hints.push("You are blocking all user agents with a wildcard `Disallow /`.");
  } else if (groups.some((g) => g.disallow.includes("/"))) {
    hints.push("You are blocking specific user agents with `Disallow /`.");
  }
  return { indexable, hints };
}

const _R8xavg = defineEventHandler(async (e) => {
  const nitro = useNitroApp();
  const { indexable, hints } = getSiteRobotConfig(e);
  const { credits, usingNuxtContent, cacheControl } = useRuntimeConfig(e)["nuxt-robots"];
  let robotsTxtCtx = {
    errors: [],
    sitemaps: [],
    groups: [
      {
        allow: [],
        comment: [],
        userAgent: ["*"],
        disallow: ["/"]
      }
    ]
  };
  if (indexable) {
    robotsTxtCtx = await resolveRobotsTxtContext(e);
    robotsTxtCtx.sitemaps = [...new Set(
      asArray(robotsTxtCtx.sitemaps).map((s) => !s.startsWith("http") ? withSiteUrl(e, s, { withBase: true, absolute: true }) : s)
    )];
    if (usingNuxtContent) {
      const contentWithRobotRules = await e.$fetch("/__robots__/nuxt-content.json", {
        headers: {
          Accept: "application/json"
        }
      });
      for (const group of robotsTxtCtx.groups) {
        if (group.userAgent.includes("*")) {
          group.disallow.push(...contentWithRobotRules);
          group.disallow = group.disallow.filter(Boolean);
        }
      }
    }
  }
  let robotsTxt = generateRobotsTxt(robotsTxtCtx);
  if (credits) {
    robotsTxt = [
      `# START nuxt-robots (${indexable ? "indexable" : "indexing disabled"})`,
      robotsTxt,
      "# END nuxt-robots"
    ].filter(Boolean).join("\n");
  }
  setHeader(e, "Content-Type", "text/plain; charset=utf-8");
  setHeader(e, "Cache-Control", globalThis._importMeta_.test || !cacheControl ? "no-store" : cacheControl);
  const hookCtx = { robotsTxt, e };
  await nitro.hooks.callHook("robots:robots-txt", hookCtx);
  return hookCtx.robotsTxt;
});

function withoutQuery$1(path) {
  return path.split("?")[0];
}
function createNitroRouteRuleMatcher$1() {
  const { nitro, app } = useRuntimeConfig();
  const _routeRulesMatcher = toRouteMatcher(
    createRouter$1({
      routes: Object.fromEntries(
        Object.entries(nitro?.routeRules || {}).map(([path, rules]) => [withoutTrailingSlash(path), rules])
      )
    })
  );
  return (path) => {
    return defu({}, ..._routeRulesMatcher.matchAll(
      // radix3 does not support trailing slashes
      withoutBase(withoutTrailingSlash(withoutQuery$1(path)), app.baseURL)
    ).reverse());
  };
}

function getPathRobotConfig(e, options) {
  const { robotsDisabledValue, robotsEnabledValue, usingNuxtContent } = useRuntimeConfig()["nuxt-robots"];
  if (!options?.skipSiteIndexable) {
    if (!getSiteRobotConfig(e).indexable) {
      return {
        rule: robotsDisabledValue,
        indexable: false
      };
    }
  }
  const path = options?.path || e.path;
  let userAgent = options?.userAgent;
  if (!userAgent) {
    try {
      userAgent = getRequestHeader(e, "User-Agent");
    } catch {
    }
  }
  const nitroApp = useNitroApp();
  const groups = [
    // run explicit user agent matching first
    ...nitroApp._robots.ctx.groups.filter((g) => {
      if (userAgent) {
        return g.userAgent.some((ua) => ua.toLowerCase().includes(userAgent.toLowerCase()));
      }
      return false;
    }),
    // run wildcard matches second
    ...nitroApp._robots.ctx.groups.filter((g) => g.userAgent.includes("*"))
  ];
  for (const group of groups) {
    if (!group._indexable) {
      return {
        indexable: false,
        rule: robotsDisabledValue,
        debug: {
          source: "/robots.txt",
          line: `Disallow: /`
        }
      };
    }
    const robotsTxtRule = matchPathToRule(path, group._rules);
    if (robotsTxtRule) {
      if (!robotsTxtRule.allow) {
        return {
          indexable: false,
          rule: robotsDisabledValue,
          debug: {
            source: "/robots.txt",
            line: `Disallow: ${robotsTxtRule.pattern}`
          }
        };
      }
      break;
    }
  }
  if (usingNuxtContent && nitroApp._robots?.nuxtContentUrls?.has(withoutTrailingSlash(path))) {
    return {
      indexable: false,
      rule: robotsDisabledValue,
      debug: {
        source: "Nuxt Content"
      }
    };
  }
  nitroApp._robotsRuleMactcher = nitroApp._robotsRuleMactcher || createNitroRouteRuleMatcher$1();
  const routeRules = normaliseRobotsRouteRule(nitroApp._robotsRuleMactcher(path));
  if (routeRules && (routeRules.allow || routeRules.rule)) {
    return {
      indexable: routeRules.allow,
      rule: routeRules.rule || (routeRules.allow ? robotsEnabledValue : robotsDisabledValue),
      debug: {
        source: "Route Rules"
      }
    };
  }
  return {
    indexable: true,
    rule: robotsEnabledValue
  };
}

const _oVwoiy = defineEventHandler(async (e) => {
  if (e.path === "/robots.txt" || e.path.startsWith("/__") || e.path.startsWith("/api") || e.path.startsWith("/_nuxt"))
    return;
  const robotConfig = getPathRobotConfig(e);
  const nuxtRobotsConfig = useRuntimeConfig(e)["nuxt-robots"];
  if (nuxtRobotsConfig) {
    const { header } = nuxtRobotsConfig;
    if (header) {
      setHeader(e, "X-Robots-Tag", robotConfig.rule);
    }
    e.context.robots = robotConfig;
  }
});

createConsola({
  defaults: {
    tag: "@nuxt/sitemap"
  }
});
const merger = createDefu((obj, key, value) => {
  if (Array.isArray(obj[key]) && Array.isArray(value))
    obj[key] = Array.from(/* @__PURE__ */ new Set([...obj[key], ...value]));
  return obj[key];
});
function mergeOnKey(arr, key) {
  const res = {};
  arr.forEach((item) => {
    const k = item[key];
    res[k] = merger(item, res[k] || {});
  });
  return Object.values(res);
}
function splitForLocales(path, locales) {
  const prefix = withLeadingSlash(path).split("/")[1];
  if (locales.includes(prefix))
    return [prefix, path.replace(`/${prefix}`, "")];
  return [null, path];
}
const StringifiedRegExpPattern = /\/(.*?)\/([gimsuy]*)$/;
function normalizeRuntimeFilters(input) {
  return (input || []).map((rule) => {
    if (rule instanceof RegExp || typeof rule === "string")
      return rule;
    const match = rule.regex.match(StringifiedRegExpPattern);
    if (match)
      return new RegExp(match[1], match[2]);
    return false;
  }).filter(Boolean);
}
function createPathFilter(options = {}) {
  const urlFilter = createFilter(options);
  return (loc) => {
    let path = loc;
    try {
      path = parseURL(loc).pathname;
    } catch {
      return false;
    }
    return urlFilter(path);
  };
}
function createFilter(options = {}) {
  const include = options.include || [];
  const exclude = options.exclude || [];
  if (include.length === 0 && exclude.length === 0)
    return () => true;
  return function(path) {
    for (const v of [{ rules: exclude, result: false }, { rules: include, result: true }]) {
      const regexRules = v.rules.filter((r) => r instanceof RegExp);
      if (regexRules.some((r) => r.test(path)))
        return v.result;
      const stringRules = v.rules.filter((r) => typeof r === "string");
      if (stringRules.length > 0) {
        const routes = {};
        for (const r of stringRules) {
          if (r === path)
            return v.result;
          routes[r] = true;
        }
        const routeRulesMatcher = toRouteMatcher(createRouter$1({ routes, strictTrailingSlash: false }));
        if (routeRulesMatcher.matchAll(path).length > 0)
          return Boolean(v.result);
      }
    }
    return include.length === 0;
  };
}

function useSimpleSitemapRuntimeConfig(e) {
  const clone = JSON.parse(JSON.stringify(useRuntimeConfig(e).sitemap));
  for (const k in clone.sitemaps) {
    const sitemap = clone.sitemaps[k];
    sitemap.include = normalizeRuntimeFilters(sitemap.include);
    sitemap.exclude = normalizeRuntimeFilters(sitemap.exclude);
    clone.sitemaps[k] = sitemap;
  }
  return Object.freeze(clone);
}

const _SX6xdi = defineEventHandler(async (e) => {
  const fixPath = createSitePathResolver(e, { absolute: false, withBase: true });
  const { sitemapName: fallbackSitemapName, cacheMaxAgeSeconds, version, xslColumns, xslTips } = useSimpleSitemapRuntimeConfig();
  setHeader(e, "Content-Type", "application/xslt+xml");
  if (cacheMaxAgeSeconds)
    setHeader(e, "Cache-Control", `public, max-age=${cacheMaxAgeSeconds}, must-revalidate`);
  else
    setHeader(e, "Cache-Control", `no-cache, no-store`);
  const { name: siteName, url: siteUrl } = useSiteConfig(e);
  const referrer = getHeader(e, "Referer") || "/";
  const referrerPath = parseURL(referrer).pathname;
  const isNotIndexButHasIndex = referrerPath !== "/sitemap.xml" && referrerPath !== "/sitemap_index.xml" && referrerPath.endsWith(".xml");
  const sitemapName = parseURL(referrer).pathname.split("/").pop()?.split("-sitemap")[0] || fallbackSitemapName;
  const title = `${siteName}${sitemapName !== "sitemap.xml" ? ` - ${sitemapName === "sitemap_index.xml" ? "index" : sitemapName}` : ""}`.replace(/&/g, "&amp;");
  const canonicalQuery = getQuery$1(referrer).canonical;
  const isShowingCanonical = typeof canonicalQuery !== "undefined" && canonicalQuery !== "false";
  const conditionalTips = [
    'You are looking at a <a href="https://developer.mozilla.org/en-US/docs/Web/XSLT/Transforming_XML_with_XSLT/An_Overview" style="color: #398465" target="_blank">XML stylesheet</a>. Read the <a href="https://nuxtseo.com/sitemap/guides/customising-ui" style="color: #398465" target="_blank">docs</a> to learn how to customize it. View the page source to see the raw XML.',
    `URLs missing? Check Nuxt Devtools Sitemap tab (or the <a href="${withQuery("/__sitemap__/debug.json", { sitemap: sitemapName })}" style="color: #398465" target="_blank">debug endpoint</a>).`
  ];
  if (!isShowingCanonical) {
    const canonicalPreviewUrl = withQuery(referrer, { canonical: "" });
    conditionalTips.push(`Your canonical site URL is <strong>${siteUrl}</strong>.`);
    conditionalTips.push(`You can preview your canonical sitemap by visiting <a href="${canonicalPreviewUrl}" style="color: #398465; white-space: nowrap;">${fixPath(canonicalPreviewUrl)}?canonical</a>`);
  } else {
    conditionalTips.push(`You are viewing the canonical sitemap. You can switch to using the request origin: <a href="${fixPath(referrer)}" style="color: #398465; white-space: nowrap ">${fixPath(referrer)}</a>`);
  }
  let columns = [...xslColumns];
  if (!columns.length) {
    columns = [
      { label: "URL", width: "50%" },
      { label: "Images", width: "25%", select: "count(image:image)" },
      { label: "Last Updated", width: "25%", select: "concat(substring(sitemap:lastmod,0,11),concat(' ', substring(sitemap:lastmod,12,5)),concat(' ', substring(sitemap:lastmod,20,6)))" }
    ];
  }
  return `<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xhtml="http://www.w3.org/1999/xhtml"
                xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>XML Sitemap</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <style type="text/css">
          body {
            font-family: Inter, Helvetica, Arial, sans-serif;
            font-size: 14px;
            color: #333;
          }

          table {
            border: none;
            border-collapse: collapse;
          }

          .bg-yellow-200 {
            background-color: #fef9c3;
          }

          .p-5 {
            padding: 1.25rem;
          }

          .rounded {
            border-radius: 4px;
            }

          .shadow {
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          }

          #sitemap tr:nth-child(odd) td {
            background-color: #f8f8f8 !important;
          }

          #sitemap tbody tr:hover td {
            background-color: #fff;
          }

          #sitemap tbody tr:hover td, #sitemap tbody tr:hover td a {
            color: #000;
          }

          .expl a {
            color: #398465
            font-weight: 600;
          }

          .expl a:visited {
            color: #398465
          }

          a {
            color: #000;
            text-decoration: none;
          }

          a:visited {
            color: #777;
          }

          a:hover {
            text-decoration: underline;
          }

          td {
            font-size: 12px;
          }

          .text-2xl {
            font-size: 2rem;
            font-weight: 600;
            line-height: 1.25;
          }

          th {
            text-align: left;
            padding-right: 30px;
            font-size: 12px;
          }

          thead th {
            border-bottom: 1px solid #000;
          }
          .fixed { position: fixed; }
          .right-2 { right: 2rem; }
          .top-2 { top: 2rem; }
          .w-30 { width: 30rem; }
          p { margin: 0; }
          li { padding-bottom: 0.5rem; line-height: 1.5; }
          h1 { margin: 0; }
          .mb-5 { margin-bottom: 1.25rem; }
          .mb-3 { margin-bottom: 0.75rem; }
        </style>
      </head>
      <body>
        <div style="grid-template-columns: 1fr 1fr; display: grid; margin: 3rem;">
            <div>
             <div id="content">
          <h1 class="text-2xl mb-3">XML Sitemap</h1>
          <h2>${title}</h2>
          ${isNotIndexButHasIndex ? `<p style="font-size: 12px; margin-bottom: 1rem;"><a href="${fixPath("/sitemap_index.xml")}">${fixPath("/sitemap_index.xml")}</a></p>` : ""}
          <xsl:if test="count(sitemap:sitemapindex/sitemap:sitemap) &gt; 0">
            <p class="expl" style="margin-bottom: 1rem;">
              This XML Sitemap Index file contains
              <xsl:value-of select="count(sitemap:sitemapindex/sitemap:sitemap)"/> sitemaps.
            </p>
            <table id="sitemap" cellpadding="3">
              <thead>
                <tr>
                  <th width="75%">Sitemap</th>
                  <th width="25%">Last Modified</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="sitemap:sitemapindex/sitemap:sitemap">
                  <xsl:variable name="sitemapURL">
                    <xsl:value-of select="sitemap:loc"/>
                  </xsl:variable>
                  <tr>
                    <td>
                      <a href="{$sitemapURL}">
                        <xsl:value-of select="sitemap:loc"/>
                      </a>
                    </td>
                    <td>
                      <xsl:value-of
                        select="concat(substring(sitemap:lastmod,0,11),concat(' ', substring(sitemap:lastmod,12,5)),concat(' ', substring(sitemap:lastmod,20,6)))"/>
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </xsl:if>
          <xsl:if test="count(sitemap:sitemapindex/sitemap:sitemap) &lt; 1">
            <p class="expl" style="margin-bottom: 1rem;">
              This XML Sitemap contains
              <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> URLs.
            </p>
            <table id="sitemap" cellpadding="3">
              <thead>
                <tr>
                  ${columns.map((c) => `<th width="${c.width}">${c.label}</th>`).join("\n")}
                </tr>
              </thead>
              <tbody>
                <xsl:variable name="lower" select="'abcdefghijklmnopqrstuvwxyz'"/>
                <xsl:variable name="upper" select="'ABCDEFGHIJKLMNOPQRSTUVWXYZ'"/>
                <xsl:for-each select="sitemap:urlset/sitemap:url">
                  <tr>
                    <td>
                      <xsl:variable name="itemURL">
                        <xsl:value-of select="sitemap:loc"/>
                      </xsl:variable>
                      <a href="{$itemURL}">
                        <xsl:value-of select="sitemap:loc"/>
                      </a>
                    </td>
                    ${columns.filter((c) => c.label !== "URL").map((c) => `<td>
<xsl:value-of select="${c.select}"/>
</td>`).join("\n")}
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </xsl:if>
        </div>
        </div>
                    ${""}
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
`;
});

function withoutQuery(path) {
  return path.split("?")[0];
}
function createNitroRouteRuleMatcher() {
  const { nitro, app } = useRuntimeConfig();
  const _routeRulesMatcher = toRouteMatcher(
    createRouter$1({
      routes: Object.fromEntries(
        Object.entries(nitro?.routeRules || {}).map(([path, rules]) => [path === "/" ? path : withoutTrailingSlash(path), rules])
      )
    })
  );
  return (pathOrUrl) => {
    const path = pathOrUrl[0] === "/" ? pathOrUrl : parseURL(pathOrUrl, app.baseURL).pathname;
    const pathWithoutQuery = withoutQuery(path);
    return defu({}, ..._routeRulesMatcher.matchAll(
      // radix3 does not support trailing slashes
      withoutBase(pathWithoutQuery === "/" ? pathWithoutQuery : withoutTrailingSlash(pathWithoutQuery), app.baseURL)
    ).reverse());
  };
}

function resolve(s, resolvers) {
  if (typeof s === "undefined" || !resolvers)
    return s;
  s = typeof s === "string" ? s : s.toString();
  if (hasProtocol(s, { acceptRelative: true, strict: false }))
    return resolvers.fixSlashes(s);
  return resolvers.canonicalUrlResolver(s);
}
function removeTrailingSlash(s) {
  return s.replace(/\/(\?|#|$)/, "$1");
}
function preNormalizeEntry(_e, resolvers) {
  const e = typeof _e === "string" ? { loc: _e } : { ..._e };
  if (e.url && !e.loc) {
    e.loc = e.url;
    delete e.url;
  }
  if (typeof e.loc !== "string") {
    e.loc = "";
  }
  e.loc = removeTrailingSlash(e.loc);
  e._abs = hasProtocol(e.loc, { acceptRelative: false, strict: false });
  try {
    e._path = e._abs ? parseURL(e.loc) : parsePath(e.loc);
  } catch (e2) {
    e2._path = null;
  }
  if (e._path) {
    const query = parseQuery(e._path.search);
    const qs = stringifyQuery(query);
    e._relativeLoc = `${encodePath(e._path?.pathname)}${qs.length ? `?${qs}` : ""}`;
    if (e._path.host) {
      e.loc = stringifyParsedURL(e._path);
    } else {
      e.loc = e._relativeLoc;
    }
  } else {
    e.loc = encodeURI(e.loc);
  }
  if (e.loc === "")
    e.loc = `/`;
  e.loc = resolve(e.loc, resolvers);
  e._key = `${e._sitemap || ""}${withoutTrailingSlash(e.loc)}`;
  return e;
}
function normaliseEntry(_e, defaults, resolvers) {
  const e = defu(_e, defaults);
  if (e.lastmod) {
    const date = normaliseDate(e.lastmod);
    if (date)
      e.lastmod = date;
    else
      delete e.lastmod;
  }
  if (!e.lastmod)
    delete e.lastmod;
  e.loc = resolve(e.loc, resolvers);
  if (e.alternatives) {
    e.alternatives = mergeOnKey(e.alternatives.map((e2) => {
      const a = { ...e2 };
      if (typeof a.href === "string")
        a.href = resolve(a.href, resolvers);
      else if (typeof a.href === "object" && a.href)
        a.href = resolve(a.href.href, resolvers);
      return a;
    }), "hreflang");
  }
  if (e.images) {
    e.images = mergeOnKey(e.images.map((i) => {
      i = { ...i };
      i.loc = resolve(i.loc, resolvers);
      return i;
    }), "loc");
  }
  if (e.videos) {
    e.videos = e.videos.map((v) => {
      v = { ...v };
      if (v.content_loc)
        v.content_loc = resolve(v.content_loc, resolvers);
      return v;
    });
  }
  return e;
}
const IS_VALID_W3C_DATE = [
  /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/,
  /^\d{4}-[01]\d-[0-3]\d$/,
  /^\d{4}-[01]\d$/,
  /^\d{4}$/
];
function isValidW3CDate(d) {
  return IS_VALID_W3C_DATE.some((r) => r.test(d));
}
function normaliseDate(d) {
  if (typeof d === "string") {
    if (d.includes("T")) {
      const t = d.split("T")[1];
      if (!t.includes("+") && !t.includes("-") && !t.includes("Z")) {
        d += "Z";
      }
    }
    if (!isValidW3CDate(d))
      return false;
    d = new Date(d);
    d.setMilliseconds(0);
    if (Number.isNaN(d.getTime()))
      return false;
  }
  const z = (n) => `0${n}`.slice(-2);
  const date = `${d.getUTCFullYear()}-${z(d.getUTCMonth() + 1)}-${z(d.getUTCDate())}`;
  if (d.getUTCHours() > 0 || d.getUTCMinutes() > 0 || d.getUTCSeconds() > 0) {
    return `${date}T${z(d.getUTCHours())}:${z(d.getUTCMinutes())}:${z(d.getUTCSeconds())}Z`;
  }
  return date;
}

async function fetchDataSource(input, event) {
  const context = typeof input.context === "string" ? { name: input.context } : input.context || { name: "fetch" };
  context.tips = context.tips || [];
  const url = typeof input.fetch === "string" ? input.fetch : input.fetch[0];
  const options = typeof input.fetch === "string" ? {} : input.fetch[1];
  const start = Date.now();
  const timeout = options.timeout || 5e3;
  const timeoutController = new AbortController();
  const abortRequestTimeout = setTimeout(() => timeoutController.abort(), timeout);
  let isHtmlResponse = false;
  try {
    const fetchContainer = url.startsWith("/") && event ? event : globalThis;
    const urls = await fetchContainer.$fetch(url, {
      ...options,
      responseType: "json",
      signal: timeoutController.signal,
      headers: defu(options?.headers, {
        Accept: "application/json"
      }, event ? { Host: getRequestHost(event, { xForwardedHost: true }) } : {}),
      // @ts-expect-error untyped
      onResponse({ response }) {
        if (typeof response._data === "string" && response._data.startsWith("<!DOCTYPE html>"))
          isHtmlResponse = true;
      }
    });
    const timeTakenMs = Date.now() - start;
    if (isHtmlResponse) {
      context.tips.push("This is usually because the URL isn't correct or is throwing an error. Please check the URL");
      return {
        ...input,
        context,
        urls: [],
        timeTakenMs,
        error: "Received HTML response instead of JSON"
      };
    }
    return {
      ...input,
      context,
      timeTakenMs,
      urls
    };
  } catch (_err) {
    const error = _err;
    if (error.message.includes("This operation was aborted"))
      context.tips.push("The request has taken too long. Make sure app sources respond within 5 seconds or adjust the timeout fetch option.");
    else
      context.tips.push(`Response returned a status of ${error.response?.status || "unknown"}.`);
    console.error("[@nuxtjs/sitemap] Failed to fetch source.", { url, error });
    return {
      ...input,
      context,
      urls: [],
      error: error.message
    };
  } finally {
    if (abortRequestTimeout) {
      clearTimeout(abortRequestTimeout);
    }
  }
}
function globalSitemapSources() {
  return import('./virtual/global-sources.mjs').then((m) => m.sources);
}
function childSitemapSources(definition) {
  return definition?._hasSourceChunk ? import('./virtual/child-sources.mjs').then((m) => m.sources[definition.sitemapName] || []) : Promise.resolve([]);
}
async function resolveSitemapSources(sources, event) {
  return (await Promise.all(
    sources.map((source) => {
      if (typeof source === "object" && "urls" in source) {
        return {
          timeTakenMs: 0,
          ...source,
          urls: source.urls
        };
      }
      if (source.fetch)
        return fetchDataSource(source, event);
      return {
        ...source,
        error: "Invalid source"
      };
    })
  )).flat();
}

function sortSitemapUrls(urls) {
  return urls.sort(
    (a, b) => {
      const aLoc = typeof a === "string" ? a : a.loc;
      const bLoc = typeof b === "string" ? b : b.loc;
      return aLoc.localeCompare(bLoc, void 0, { numeric: true });
    }
  ).sort((a, b) => {
    const aLoc = (typeof a === "string" ? a : a.loc) || "";
    const bLoc = (typeof b === "string" ? b : b.loc) || "";
    const aSegments = aLoc.split("/").length;
    const bSegments = bLoc.split("/").length;
    if (aSegments > bSegments)
      return 1;
    if (aSegments < bSegments)
      return -1;
    return 0;
  });
}

function resolveKey(k) {
  switch (k) {
    case "images":
      return "image";
    case "videos":
      return "video";
    // news & others?
    case "news":
      return "news";
    default:
      return k;
  }
}
function handleObject(key, obj) {
  return [
    `        <${key}:${key}>`,
    ...Object.entries(obj).map(([sk, sv]) => {
      if (key === "video" && Array.isArray(sv)) {
        return sv.map((v) => {
          if (typeof v === "string") {
            return [
              `            `,
              `<${key}:${sk}>`,
              escapeValueForXml(v),
              `</${key}:${sk}>`
            ].join("");
          }
          const attributes = Object.entries(v).filter(([ssk]) => ssk !== sk).map(([ssk, ssv]) => `${ssk}="${escapeValueForXml(ssv)}"`).join(" ");
          return [
            `            <${key}:${sk} ${attributes}>`,
            // value is the same sk
            v[sk],
            `</${key}:${sk}>`
          ].join("");
        }).join("\n");
      }
      if (typeof sv === "object") {
        if (key === "video") {
          const attributes = Object.entries(sv).filter(([ssk]) => ssk !== sk).map(([ssk, ssv]) => `${ssk}="${escapeValueForXml(ssv)}"`).join(" ");
          return [
            `            <${key}:${sk} ${attributes}>`,
            // value is the same sk
            sv[sk],
            `</${key}:${sk}>`
          ].join("");
        }
        return [
          `            <${key}:${sk}>`,
          ...Object.entries(sv).map(([ssk, ssv]) => `                <${key}:${ssk}>${escapeValueForXml(ssv)}</${key}:${ssk}>`),
          `            </${key}:${sk}>`
        ].join("\n");
      }
      return `            <${key}:${sk}>${escapeValueForXml(sv)}</${key}:${sk}>`;
    }),
    `        </${key}:${key}>`
  ].join("\n");
}
function handleArray(key, arr) {
  if (arr.length === 0)
    return false;
  key = resolveKey(key);
  if (key === "alternatives") {
    return arr.map((obj) => [
      `        <xhtml:link rel="alternate" ${Object.entries(obj).map(([sk, sv]) => `${sk}="${escapeValueForXml(sv)}"`).join(" ")} />`
    ].join("\n")).join("\n");
  }
  return arr.map((obj) => handleObject(key, obj)).join("\n");
}
function handleEntry(k, e) {
  return Array.isArray(e[k]) ? handleArray(k, e[k]) : typeof e[k] === "object" ? handleObject(k, e[k]) : `        <${k}>${escapeValueForXml(e[k])}</${k}>`;
}
function wrapSitemapXml(input, resolvers, options) {
  const xsl = options.xsl ? resolvers.relativeBaseUrlResolver(options.xsl) : false;
  const credits = options.credits;
  input.unshift(`<?xml version="1.0" encoding="UTF-8"?>${xsl ? `<?xml-stylesheet type="text/xsl" href="${xsl}"?>` : ""}`);
  if (credits)
    input.push(`<!-- XML Sitemap generated by @nuxtjs/sitemap v${options.version} at ${(/* @__PURE__ */ new Date()).toISOString()} -->`);
  if (options.minify)
    return input.join("").replace(/(?<!<[^>]*)\s(?![^<]*>)/g, "");
  return input.join("\n");
}
function escapeValueForXml(value) {
  if (value === true || value === false)
    return value ? "yes" : "no";
  return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

function resolveSitemapEntries(sitemap, sources, runtimeConfig, resolvers) {
  const {
    autoI18n,
    isI18nMapped
  } = runtimeConfig;
  const filterPath = createPathFilter({
    include: sitemap.include,
    exclude: sitemap.exclude
  });
  const _urls = sources.flatMap((e) => e.urls).map((_e) => {
    const e = preNormalizeEntry(_e, resolvers);
    if (!e.loc || !filterPath(e.loc))
      return false;
    return e;
  }).filter(Boolean);
  let validI18nUrlsForTransform = [];
  const withoutPrefixPaths = {};
  if (autoI18n && autoI18n.strategy !== "no_prefix") {
    const localeCodes = autoI18n.locales.map((l) => l.code);
    validI18nUrlsForTransform = _urls.map((_e, i) => {
      if (_e._abs)
        return false;
      const split = splitForLocales(_e._relativeLoc, localeCodes);
      let localeCode = split[0];
      const pathWithoutPrefix = split[1];
      if (!localeCode)
        localeCode = autoI18n.defaultLocale;
      const e = _e;
      e._pathWithoutPrefix = pathWithoutPrefix;
      const locale = autoI18n.locales.find((l) => l.code === localeCode);
      if (!locale)
        return false;
      e._locale = locale;
      e._index = i;
      e._key = `${e._sitemap || ""}${e._path?.pathname || "/"}${e._path.search}`;
      withoutPrefixPaths[pathWithoutPrefix] = withoutPrefixPaths[pathWithoutPrefix] || [];
      if (!withoutPrefixPaths[pathWithoutPrefix].some((e2) => e2._locale.code === locale.code))
        withoutPrefixPaths[pathWithoutPrefix].push(e);
      return e;
    }).filter(Boolean);
    for (const e of validI18nUrlsForTransform) {
      if (!e._i18nTransform && !e.alternatives?.length) {
        const alternatives = withoutPrefixPaths[e._pathWithoutPrefix].map((u) => {
          const entries = [];
          if (u._locale.code === autoI18n.defaultLocale) {
            entries.push({
              href: u.loc,
              hreflang: "x-default"
            });
          }
          entries.push({
            href: u.loc,
            hreflang: u._locale._hreflang || autoI18n.defaultLocale
          });
          return entries;
        }).flat().filter(Boolean);
        if (alternatives.length)
          e.alternatives = alternatives;
      } else if (e._i18nTransform) {
        delete e._i18nTransform;
        if (autoI18n.strategy === "no_prefix") ;
        if (autoI18n.differentDomains) {
          e.alternatives = [
            {
              // apply default locale domain
              ...autoI18n.locales.find((l) => [l.code, l.language].includes(autoI18n.defaultLocale)),
              code: "x-default"
            },
            ...autoI18n.locales.filter((l) => !!l.domain)
          ].map((locale) => {
            return {
              hreflang: locale._hreflang,
              href: joinURL(withHttps(locale.domain), e._pathWithoutPrefix)
            };
          });
        } else {
          for (const l of autoI18n.locales) {
            let loc = joinURL(`/${l.code}`, e._pathWithoutPrefix);
            if (autoI18n.differentDomains || ["prefix_and_default", "prefix_except_default"].includes(autoI18n.strategy) && l.code === autoI18n.defaultLocale)
              loc = e._pathWithoutPrefix;
            const _sitemap = isI18nMapped ? l._sitemap : void 0;
            const newEntry = preNormalizeEntry({
              _sitemap,
              ...e,
              _index: void 0,
              _key: `${_sitemap || ""}${loc || "/"}${e._path.search}`,
              _locale: l,
              loc,
              alternatives: [{ code: "x-default", _hreflang: "x-default" }, ...autoI18n.locales].map((locale) => {
                const code = locale.code === "x-default" ? autoI18n.defaultLocale : locale.code;
                const isDefault = locale.code === "x-default" || locale.code === autoI18n.defaultLocale;
                let href = "";
                if (autoI18n.strategy === "prefix") {
                  href = joinURL("/", code, e._pathWithoutPrefix);
                } else if (["prefix_and_default", "prefix_except_default"].includes(autoI18n.strategy)) {
                  if (isDefault) {
                    href = e._pathWithoutPrefix;
                  } else {
                    href = joinURL("/", code, e._pathWithoutPrefix);
                  }
                }
                if (!filterPath(href))
                  return false;
                return {
                  hreflang: locale._hreflang,
                  href
                };
              }).filter(Boolean)
            }, resolvers);
            if (e._locale.code === newEntry._locale.code) {
              _urls[e._index] = newEntry;
              e._index = void 0;
            } else {
              _urls.push(newEntry);
            }
          }
        }
      }
      if (isI18nMapped) {
        e._sitemap = e._sitemap || e._locale._sitemap;
        e._key = `${e._sitemap || ""}${e.loc || "/"}${e._path.search}`;
      }
      if (e._index)
        _urls[e._index] = e;
    }
  }
  return _urls;
}
async function buildSitemapUrls(sitemap, resolvers, runtimeConfig) {
  const {
    sitemaps,
    // enhancing
    autoI18n,
    isI18nMapped,
    isMultiSitemap,
    // sorting
    sortEntries,
    // chunking
    defaultSitemapsChunkSize
  } = runtimeConfig;
  const isChunking = typeof sitemaps.chunks !== "undefined" && !Number.isNaN(Number(sitemap.sitemapName));
  function maybeSort(urls) {
    return sortEntries ? sortSitemapUrls(urls) : urls;
  }
  function maybeSlice(urls) {
    if (isChunking && defaultSitemapsChunkSize) {
      const chunk = Number(sitemap.sitemapName);
      return urls.slice(chunk * defaultSitemapsChunkSize, (chunk + 1) * defaultSitemapsChunkSize);
    }
    return urls;
  }
  if (autoI18n?.differentDomains) {
    const domain = autoI18n.locales.find((e) => [e.language, e.code].includes(sitemap.sitemapName))?.domain;
    if (domain) {
      const _tester = resolvers.canonicalUrlResolver;
      resolvers.canonicalUrlResolver = (path) => resolveSitePath(path, {
        absolute: true,
        withBase: false,
        siteUrl: withHttps(domain),
        trailingSlash: _tester("/test/").endsWith("/"),
        base: "/"
      });
    }
  }
  const sources = sitemap.includeAppSources ? await globalSitemapSources() : [];
  sources.push(...await childSitemapSources(sitemap));
  const resolvedSources = await resolveSitemapSources(sources, resolvers.event);
  const enhancedUrls = resolveSitemapEntries(sitemap, resolvedSources, { autoI18n, isI18nMapped }, resolvers);
  const filteredUrls = enhancedUrls.filter((e) => {
    if (isMultiSitemap && e._sitemap && sitemap.sitemapName)
      return e._sitemap === sitemap.sitemapName;
    return true;
  });
  const sortedUrls = maybeSort(filteredUrls);
  return maybeSlice(sortedUrls);
}
function urlsToXml(urls, resolvers, { version, xsl, credits, minify }) {
  const urlset = urls.map((e) => {
    const keys = Object.keys(e).filter((k) => !k.startsWith("_"));
    return [
      "    <url>",
      keys.map((k) => handleEntry(k, e)).filter(Boolean).join("\n"),
      "    </url>"
    ].join("\n");
  });
  return wrapSitemapXml([
    '<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urlset.join("\n"),
    "</urlset>"
  ], resolvers, { version, xsl, credits, minify });
}

function useNitroUrlResolvers(e) {
  const canonicalQuery = getQuery(e).canonical;
  const isShowingCanonical = typeof canonicalQuery !== "undefined" && canonicalQuery !== "false";
  const siteConfig = useSiteConfig(e);
  return {
    event: e,
    fixSlashes: (path) => fixSlashes(siteConfig.trailingSlash, path),
    // we need these as they depend on the nitro event
    canonicalUrlResolver: createSitePathResolver(e, {
      canonical: isShowingCanonical || !false,
      absolute: true,
      withBase: true
    }),
    relativeBaseUrlResolver: createSitePathResolver(e, { absolute: false, withBase: true })
  };
}
async function createSitemap(event, definition, runtimeConfig) {
  const { sitemapName } = definition;
  const nitro = useNitroApp();
  const resolvers = useNitroUrlResolvers(event);
  let sitemapUrls = await buildSitemapUrls(definition, resolvers, runtimeConfig);
  const routeRuleMatcher = createNitroRouteRuleMatcher();
  const { autoI18n } = runtimeConfig;
  sitemapUrls = sitemapUrls.map((u) => {
    const path = u._path?.pathname || u.loc;
    if (!getPathRobotConfig(event, { path, skipSiteIndexable: true }).indexable)
      return false;
    let routeRules = routeRuleMatcher(path);
    if (autoI18n?.locales && autoI18n?.strategy !== "no_prefix") {
      const match = splitForLocales(path, autoI18n.locales.map((l) => l.code));
      const pathWithoutPrefix = match[1];
      if (pathWithoutPrefix && pathWithoutPrefix !== path)
        routeRules = defu(routeRules, routeRuleMatcher(pathWithoutPrefix));
    }
    if (routeRules.sitemap === false)
      return false;
    if (typeof routeRules.robots !== "undefined" && !routeRules.robots) {
      return false;
    }
    const hasRobotsDisabled = Object.entries(routeRules.headers || {}).some(([name, value]) => name.toLowerCase() === "x-robots-tag" && value.toLowerCase().includes("noindex"));
    if (routeRules.redirect || hasRobotsDisabled)
      return false;
    return routeRules.sitemap ? defu(u, routeRules.sitemap) : u;
  }).filter(Boolean);
  const resolvedCtx = {
    urls: sitemapUrls,
    sitemapName
  };
  await nitro.hooks.callHook("sitemap:resolved", resolvedCtx);
  const maybeSort = (urls2) => runtimeConfig.sortEntries ? sortSitemapUrls(urls2) : urls2;
  const normalizedPreDedupe = resolvedCtx.urls.map((e) => normaliseEntry(e, definition.defaults, resolvers));
  const urls = maybeSort(mergeOnKey(normalizedPreDedupe, "_key").map((e) => normaliseEntry(e, definition.defaults, resolvers)));
  const sitemap = urlsToXml(urls, resolvers, runtimeConfig);
  const ctx = { sitemap, sitemapName };
  await nitro.hooks.callHook("sitemap:output", ctx);
  setHeader(event, "Content-Type", "text/xml; charset=UTF-8");
  if (runtimeConfig.cacheMaxAgeSeconds)
    setHeader(event, "Cache-Control", `public, max-age=${runtimeConfig.cacheMaxAgeSeconds}, must-revalidate`);
  else
    setHeader(event, "Cache-Control", `no-cache, no-store`);
  event.context._isSitemap = true;
  return ctx.sitemap;
}

const _egjak8 = defineEventHandler(async (e) => {
  const runtimeConfig = useSimpleSitemapRuntimeConfig();
  const { sitemaps } = runtimeConfig;
  if ("index" in sitemaps) {
    return sendRedirect(e, withBase("/sitemap_index.xml", useRuntimeConfig().app.baseURL), 301);
  }
  return createSitemap(e, Object.values(sitemaps)[0], runtimeConfig);
});

const collections = {
};

const DEFAULT_ENDPOINT = "https://api.iconify.design";
const _HzCGYx = defineCachedEventHandler(async (event) => {
  const url = getRequestURL(event);
  if (!url)
    return createError$1({ status: 400, message: "Invalid icon request" });
  const options = useAppConfig().icon;
  const collectionName = event.context.params?.collection?.replace(/\.json$/, "");
  const collection = collectionName ? await collections[collectionName]?.() : null;
  const apiEndPoint = options.iconifyApiEndpoint || DEFAULT_ENDPOINT;
  const icons = url.searchParams.get("icons")?.split(",");
  if (collection) {
    if (icons?.length) {
      const data = getIcons(
        collection,
        icons
      );
      consola.debug(`[Icon] serving ${(icons || []).map((i) => "`" + collectionName + ":" + i + "`").join(",")} from bundled collection`);
      return data;
    }
  }
  if (options.fallbackToApi === true || options.fallbackToApi === "server-only") {
    const apiUrl = new URL("./" + basename(url.pathname) + url.search, apiEndPoint);
    consola.debug(`[Icon] fetching ${(icons || []).map((i) => "`" + collectionName + ":" + i + "`").join(",")} from iconify api`);
    if (apiUrl.host !== new URL(apiEndPoint).host) {
      return createError$1({ status: 400, message: "Invalid icon request" });
    }
    try {
      const data = await $fetch(apiUrl.href);
      return data;
    } catch (e) {
      consola.error(e);
      if (e.status === 404)
        return createError$1({ status: 404 });
      else
        return createError$1({ status: 500, message: "Failed to fetch fallback icon" });
    }
  }
  return createError$1({ status: 404 });
}, {
  group: "nuxt",
  name: "icon",
  getKey(event) {
    const collection = event.context.params?.collection?.replace(/\.json$/, "") || "unknown";
    const icons = String(getQuery(event).icons || "");
    return `${collection}_${icons.split(",")[0]}_${icons.length}_${hash(icons)}`;
  },
  swr: true,
  maxAge: 60 * 60 * 24 * 7
  // 1 week
});

const _lazy_F1ncfZ = () => import('./routes/api/contact-request.post.mjs');
const _lazy_jbdXKq = () => import('./routes/api/service-request.post.mjs');
const _lazy_0ZtATD = () => import('./routes/renderer.mjs');

const handlers = [
  { route: '', handler: _f4b49z, lazy: false, middleware: true, method: undefined },
  { route: '/api/contact-request', handler: _lazy_F1ncfZ, lazy: true, middleware: false, method: "post" },
  { route: '/api/service-request', handler: _lazy_jbdXKq, lazy: true, middleware: false, method: "post" },
  { route: '/__nuxt_error', handler: _lazy_0ZtATD, lazy: true, middleware: false, method: undefined },
  { route: '', handler: _kTwPIt, lazy: false, middleware: true, method: undefined },
  { route: '/robots.txt', handler: _R8xavg, lazy: false, middleware: false, method: undefined },
  { route: '', handler: _oVwoiy, lazy: false, middleware: true, method: undefined },
  { route: '/__sitemap__/style.xsl', handler: _SX6xdi, lazy: false, middleware: false, method: undefined },
  { route: '/sitemap.xml', handler: _egjak8, lazy: false, middleware: false, method: undefined },
  { route: '/api/_nuxt_icon/:collection', handler: _HzCGYx, lazy: false, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_0ZtATD, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((_err) => {
      console.error("Error while capturing another error", _err);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(false),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      await nitroApp.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter({
    preemptive: true
  });
  const localCall = createCall(toNodeListener(h3App));
  const _localFetch = createFetch(localCall, globalThis.fetch);
  const localFetch = (input, init) => _localFetch(input, init).then(
    (response) => normalizeFetchResponse(response)
  );
  const $fetch = createFetch$1({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  h3App.use(
    eventHandler((event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const envContext = event.node.req?.__unenv__;
      if (envContext) {
        Object.assign(event.context, envContext);
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (envContext?.waitUntil) {
          envContext.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
    })
  );
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  for (const plugin of plugins) {
    try {
      plugin(app);
    } catch (err) {
      captureError(err, { tags: ["plugin"] });
      throw err;
    }
  }
  return app;
}
const nitroApp = createNitroApp();
const useNitroApp = () => nitroApp;

const debug = (...args) => {
};
function GracefulShutdown(server, opts) {
  opts = opts || {};
  const options = Object.assign(
    {
      signals: "SIGINT SIGTERM",
      timeout: 3e4,
      development: false,
      forceExit: true,
      onShutdown: (signal) => Promise.resolve(signal),
      preShutdown: (signal) => Promise.resolve(signal)
    },
    opts
  );
  let isShuttingDown = false;
  const connections = {};
  let connectionCounter = 0;
  const secureConnections = {};
  let secureConnectionCounter = 0;
  let failed = false;
  let finalRun = false;
  function onceFactory() {
    let called = false;
    return (emitter, events, callback) => {
      function call() {
        if (!called) {
          called = true;
          return Reflect.apply(callback, this, arguments);
        }
      }
      for (const e of events) {
        emitter.on(e, call);
      }
    };
  }
  const signals = options.signals.split(" ").map((s) => s.trim()).filter((s) => s.length > 0);
  const once = onceFactory();
  once(process, signals, (signal) => {
    shutdown(signal).then(() => {
      if (options.forceExit) {
        process.exit(failed ? 1 : 0);
      }
    }).catch((err) => {
      process.exit(1);
    });
  });
  function isFunction(functionToCheck) {
    const getType = Object.prototype.toString.call(functionToCheck);
    return /^\[object\s([A-Za-z]+)?Function]$/.test(getType);
  }
  function destroy(socket, force = false) {
    if (socket._isIdle && isShuttingDown || force) {
      socket.destroy();
      if (socket.server instanceof http.Server) {
        delete connections[socket._connectionId];
      } else {
        delete secureConnections[socket._connectionId];
      }
    }
  }
  function destroyAllConnections(force = false) {
    for (const key of Object.keys(connections)) {
      const socket = connections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        destroy(socket);
      }
    }
    for (const key of Object.keys(secureConnections)) {
      const socket = secureConnections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        destroy(socket);
      }
    }
  }
  server.on("request", function(req, res) {
    req.socket._isIdle = false;
    if (isShuttingDown && !res.headersSent) {
      res.setHeader("connection", "close");
    }
    res.on("finish", function() {
      req.socket._isIdle = true;
      destroy(req.socket);
    });
  });
  server.on("connection", function(socket) {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = connectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      connections[id] = socket;
      socket.once("close", () => {
        delete connections[socket._connectionId];
      });
    }
  });
  server.on("secureConnection", (socket) => {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = secureConnectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      secureConnections[id] = socket;
      socket.once("close", () => {
        delete secureConnections[socket._connectionId];
      });
    }
  });
  process.on("close", function() {
  });
  function shutdown(sig) {
    function cleanupHttp() {
      destroyAllConnections();
      return new Promise((resolve, reject) => {
        server.close((err) => {
          if (err) {
            return reject(err);
          }
          return resolve(true);
        });
      });
    }
    if (options.development) {
      return process.exit(0);
    }
    function finalHandler() {
      if (!finalRun) {
        finalRun = true;
        if (options.finally && isFunction(options.finally)) {
          options.finally();
        }
      }
      return Promise.resolve();
    }
    function waitForReadyToShutDown(totalNumInterval) {
      if (totalNumInterval === 0) {
        debug(
          `Could not close connections in time (${options.timeout}ms), will forcefully shut down`
        );
        return Promise.resolve(true);
      }
      const allConnectionsClosed = Object.keys(connections).length === 0 && Object.keys(secureConnections).length === 0;
      if (allConnectionsClosed) {
        return Promise.resolve(false);
      }
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(waitForReadyToShutDown(totalNumInterval - 1));
        }, 250);
      });
    }
    if (isShuttingDown) {
      return Promise.resolve();
    }
    return options.preShutdown(sig).then(() => {
      isShuttingDown = true;
      cleanupHttp();
    }).then(() => {
      const pollIterations = options.timeout ? Math.round(options.timeout / 250) : 0;
      return waitForReadyToShutDown(pollIterations);
    }).then((force) => {
      if (force) {
        destroyAllConnections(force);
      }
      return options.onShutdown(sig);
    }).then(finalHandler).catch((err) => {
      const errString = typeof err === "string" ? err : JSON.stringify(err);
      failed = true;
      throw errString;
    });
  }
  function shutdownManual() {
    return shutdown("manual");
  }
  return shutdownManual;
}

function getGracefulShutdownConfig() {
  return {
    disabled: !!process.env.NITRO_SHUTDOWN_DISABLED,
    signals: (process.env.NITRO_SHUTDOWN_SIGNALS || "SIGTERM SIGINT").split(" ").map((s) => s.trim()),
    timeout: Number.parseInt(process.env.NITRO_SHUTDOWN_TIMEOUT, 10) || 3e4,
    forceExit: !process.env.NITRO_SHUTDOWN_NO_FORCE_EXIT
  };
}
function setupGracefulShutdown(listener, nitroApp) {
  const shutdownConfig = getGracefulShutdownConfig();
  if (shutdownConfig.disabled) {
    return;
  }
  GracefulShutdown(listener, {
    signals: shutdownConfig.signals.join(" "),
    timeout: shutdownConfig.timeout,
    forceExit: shutdownConfig.forceExit,
    onShutdown: async () => {
      await new Promise((resolve) => {
        const timeout = setTimeout(() => {
          console.warn("Graceful shutdown timeout, force exiting...");
          resolve();
        }, shutdownConfig.timeout);
        nitroApp.hooks.callHook("close").catch((err) => {
          console.error(err);
        }).finally(() => {
          clearTimeout(timeout);
          resolve();
        });
      });
    }
  });
}

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const server = cert && key ? new Server({ key, cert }, toNodeListener(nitroApp.h3App)) : new Server$1(toNodeListener(nitroApp.h3App));
const port = destr(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const host = process.env.NITRO_HOST || process.env.HOST;
const path = process.env.NITRO_UNIX_SOCKET;
const listener = server.listen(path ? { path } : { port, host }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  const addressInfo = listener.address();
  if (typeof addressInfo === "string") {
    console.log(`Listening on unix socket ${addressInfo}`);
    return;
  }
  const baseURL = (useRuntimeConfig().app.baseURL || "").replace(/\/$/, "");
  const url = `${protocol}://${addressInfo.family === "IPv6" ? `[${addressInfo.address}]` : addressInfo.address}:${addressInfo.port}${baseURL}`;
  console.log(`Listening on ${url}`);
});
trapUnhandledNodeErrors();
setupGracefulShutdown(listener, nitroApp);
const nodeServer = {};

export { send as a, setResponseStatus as b, useNitroApp as c, defineEventHandler as d, eventHandler as e, setResponseHeaders as f, getResponseStatus as g, getQuery as h, createError$1 as i, joinRelativeURL as j, getRouteRules as k, getResponseStatusText as l, nodeServer as n, readBody as r, setResponseHeader as s, useRuntimeConfig as u };
//# sourceMappingURL=runtime.mjs.map
