/* empty css                           */import { c as createAstro, a as createComponent$1, r as renderTemplate, b as renderSlot, d as renderHead, e as addAttribute, m as maybeRenderHead, f as renderComponent, _ as __astro_tag_component__ } from '../astro.3143e1dd.mjs';
import 'html-escaper';
import MarkdownIt from 'markdown-it';
import mdKatex from 'markdown-it-katex';
import mdHighlight from 'markdown-it-highlightjs';
import { createParser } from 'eventsource-parser';

function createSignal(value, options) {
  return [() => value, v => {
    return value = typeof v === "function" ? v(value) : v;
  }];
}
const sharedConfig = {};
function setHydrateContext(context) {
  sharedConfig.context = context;
}
function nextHydrateContext() {
  return sharedConfig.context ? {
    ...sharedConfig.context,
    id: `${sharedConfig.context.id}${sharedConfig.context.count++}-`,
    count: 0
  } : undefined;
}
function createComponent(Comp, props) {
  if (sharedConfig.context && !sharedConfig.context.noHydrate) {
    const c = sharedConfig.context;
    setHydrateContext(nextHydrateContext());
    const r = Comp(props || {});
    setHydrateContext(c);
    return r;
  }
  return Comp(props || {});
}
function simpleMap(props, wrap) {
  const list = props.each || [],
    len = list.length,
    fn = props.children;
  if (len) {
    let mapped = Array(len);
    for (let i = 0; i < len; i++) mapped[i] = wrap(fn, list[i], i);
    return mapped;
  }
  return props.fallback;
}
function For(props) {
  return simpleMap(props, (fn, item, i) => fn(item, () => i));
}
function Show(props) {
  let c;
  return props.when ? typeof (c = props.children) === "function" ? c(props.when) : c : props.fallback || "";
}

const booleans = ["allowfullscreen", "async", "autofocus", "autoplay", "checked", "controls", "default", "disabled", "formnovalidate", "hidden", "indeterminate", "ismap", "loop", "multiple", "muted", "nomodule", "novalidate", "open", "playsinline", "readonly", "required", "reversed", "seamless", "selected"];
/*#__PURE__*/new Set(["className", "value", "readOnly", "formNoValidate", "isMap", "noModule", "playsInline", ...booleans]);

const {
  hasOwnProperty
} = Object.prototype;
const REF_START_CHARS = "hjkmoquxzABCDEFGHIJKLNPQRTUVWXYZ$_";
const REF_START_CHARS_LEN = REF_START_CHARS.length;
const REF_CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$_";
const REF_CHARS_LEN = REF_CHARS.length;
const STACK = [];
const BUFFER = [""];
let ASSIGNMENTS = new Map();
let INDEX_OR_REF = new WeakMap();
let REF_COUNT = 0;
BUFFER.pop();
function stringify(root) {
  if (writeProp(root, "")) {
    let result = BUFFER[0];
    for (let i = 1, len = BUFFER.length; i < len; i++) {
      result += BUFFER[i];
    }
    if (REF_COUNT) {
      if (ASSIGNMENTS.size) {
        let ref = INDEX_OR_REF.get(root);
        if (typeof ref === "number") {
          ref = toRefParam(REF_COUNT++);
          result = ref + "=" + result;
        }
        for (const [assignmentRef, assignments] of ASSIGNMENTS) {
          result += ";" + assignments + assignmentRef;
        }
        result += ";return " + ref;
        ASSIGNMENTS = new Map();
      } else {
        result = "return " + result;
      }
      result = "(function(" + refParamsString() + "){" + result + "}())";
    } else if (root && root.constructor === Object) {
      result = "(" + result + ")";
    }
    BUFFER.length = 0;
    INDEX_OR_REF = new WeakMap();
    return result;
  }
  return "void 0";
}
function writeProp(cur, accessor) {
  switch (typeof cur) {
    case "string":
      BUFFER.push(quote(cur, 0));
      break;
    case "number":
      BUFFER.push(cur + "");
      break;
    case "boolean":
      BUFFER.push(cur ? "!0" : "!1");
      break;
    case "object":
      if (cur === null) {
        BUFFER.push("null");
      } else {
        const ref = getRef(cur, accessor);
        switch (ref) {
          case true:
            return false;
          case false:
            switch (cur.constructor) {
              case Object:
                writeObject(cur);
                break;
              case Array:
                writeArray(cur);
                break;
              case Date:
                BUFFER.push('new Date("' + cur.toISOString() + '")');
                break;
              case RegExp:
                BUFFER.push(cur + "");
                break;
              case Map:
                BUFFER.push("new Map(");
                writeArray(Array.from(cur));
                BUFFER.push(")");
                break;
              case Set:
                BUFFER.push("new Set(");
                writeArray(Array.from(cur));
                BUFFER.push(")");
                break;
              case undefined:
                BUFFER.push("Object.assign(Object.create(null),");
                writeObject(cur);
                BUFFER.push(")");
                break;
              default:
                return false;
            }
            break;
          default:
            BUFFER.push(ref);
            break;
        }
      }
      break;
    default:
      return false;
  }
  return true;
}
function writeObject(obj) {
  let sep = "{";
  STACK.push(obj);
  for (const key in obj) {
    if (hasOwnProperty.call(obj, key)) {
      const val = obj[key];
      const escapedKey = toObjectKey(key);
      BUFFER.push(sep + escapedKey + ":");
      if (writeProp(val, escapedKey)) {
        sep = ",";
      } else {
        BUFFER.pop();
      }
    }
  }
  if (sep === "{") {
    BUFFER.push("{}");
  } else {
    BUFFER.push("}");
  }
  STACK.pop();
}
function writeArray(arr) {
  BUFFER.push("[");
  STACK.push(arr);
  writeProp(arr[0], 0);
  for (let i = 1, len = arr.length; i < len; i++) {
    BUFFER.push(",");
    writeProp(arr[i], i);
  }
  STACK.pop();
  BUFFER.push("]");
}
function getRef(cur, accessor) {
  let ref = INDEX_OR_REF.get(cur);
  if (ref === undefined) {
    INDEX_OR_REF.set(cur, BUFFER.length);
    return false;
  }
  if (typeof ref === "number") {
    ref = insertAndGetRef(cur, ref);
  }
  if (STACK.includes(cur)) {
    const parent = STACK[STACK.length - 1];
    let parentRef = INDEX_OR_REF.get(parent);
    if (typeof parentRef === "number") {
      parentRef = insertAndGetRef(parent, parentRef);
    }
    ASSIGNMENTS.set(ref, (ASSIGNMENTS.get(ref) || "") + toAssignment(parentRef, accessor) + "=");
    return true;
  }
  return ref;
}
function toObjectKey(name) {
  const invalidIdentifierPos = getInvalidIdentifierPos(name);
  return invalidIdentifierPos === -1 ? name : quote(name, invalidIdentifierPos);
}
function toAssignment(parent, key) {
  return parent + (typeof key === "number" || key[0] === '"' ? "[" + key + "]" : "." + key);
}
function getInvalidIdentifierPos(name) {
  let char = name[0];
  if (!(char >= "a" && char <= "z" || char >= "A" && char <= "Z" || char === "$" || char === "_")) {
    return 0;
  }
  for (let i = 1, len = name.length; i < len; i++) {
    char = name[i];
    if (!(char >= "a" && char <= "z" || char >= "A" && char <= "Z" || char >= "0" && char <= "9" || char === "$" || char === "_")) {
      return i;
    }
  }
  return -1;
}
function quote(str, startPos) {
  let result = "";
  let lastPos = 0;
  for (let i = startPos, len = str.length; i < len; i++) {
    let replacement;
    switch (str[i]) {
      case '"':
        replacement = '\\"';
        break;
      case "\\":
        replacement = "\\\\";
        break;
      case "<":
        replacement = "\\x3C";
        break;
      case "\n":
        replacement = "\\n";
        break;
      case "\r":
        replacement = "\\r";
        break;
      case "\u2028":
        replacement = "\\u2028";
        break;
      case "\u2029":
        replacement = "\\u2029";
        break;
      default:
        continue;
    }
    result += str.slice(lastPos, i) + replacement;
    lastPos = i + 1;
  }
  if (lastPos === startPos) {
    result = str;
  } else {
    result += str.slice(lastPos);
  }
  return '"' + result + '"';
}
function insertAndGetRef(obj, pos) {
  const ref = toRefParam(REF_COUNT++);
  INDEX_OR_REF.set(obj, ref);
  if (pos) {
    BUFFER[pos - 1] += ref + "=";
  } else {
    BUFFER[pos] = ref + "=" + BUFFER[pos];
  }
  return ref;
}
function refParamsString() {
  let result = REF_START_CHARS[0];
  for (let i = 1; i < REF_COUNT; i++) {
    result += "," + toRefParam(i);
  }
  REF_COUNT = 0;
  return result;
}
function toRefParam(index) {
  let mod = index % REF_START_CHARS_LEN;
  let ref = REF_START_CHARS[mod];
  index = (index - mod) / REF_START_CHARS_LEN;
  while (index > 0) {
    mod = index % REF_CHARS_LEN;
    ref += REF_CHARS[mod];
    index = (index - mod) / REF_CHARS_LEN;
  }
  return ref;
}
function renderToString(code, options = {}) {
  let scripts = "";
  sharedConfig.context = {
    id: options.renderId || "",
    count: 0,
    suspense: {},
    lazy: {},
    assets: [],
    nonce: options.nonce,
    writeResource(id, p, error) {
      if (sharedConfig.context.noHydrate) return;
      if (error) return scripts += `_$HY.set("${id}", ${serializeError(p)});`;
      scripts += `_$HY.set("${id}", ${stringify(p)});`;
    }
  };
  let html = resolveSSRNode(escape(code()));
  sharedConfig.context.noHydrate = true;
  html = injectAssets(sharedConfig.context.assets, html);
  if (scripts.length) html = injectScripts(html, scripts, options.nonce);
  return html;
}
function ssr(t, ...nodes) {
  if (nodes.length) {
    let result = "";
    for (let i = 0; i < nodes.length; i++) {
      result += t[i];
      const node = nodes[i];
      if (node !== undefined) result += resolveSSRNode(node);
    }
    t = result + t[nodes.length];
  }
  return {
    t
  };
}
function ssrAttribute(key, value, isBoolean) {
  return isBoolean ? value ? " " + key : "" : value != null ? ` ${key}="${value}"` : "";
}
function ssrHydrationKey() {
  const hk = getHydrationKey();
  return hk ? ` data-hk="${hk}"` : "";
}
function escape(s, attr) {
  const t = typeof s;
  if (t !== "string") {
    if (!attr && t === "function") return escape(s(), attr);
    if (!attr && Array.isArray(s)) {
      let r = "";
      for (let i = 0; i < s.length; i++) r += resolveSSRNode(escape(s[i], attr));
      return {
        t: r
      };
    }
    if (attr && t === "boolean") return String(s);
    return s;
  }
  const delim = attr ? '"' : "<";
  const escDelim = attr ? "&quot;" : "&lt;";
  let iDelim = s.indexOf(delim);
  let iAmp = s.indexOf("&");
  if (iDelim < 0 && iAmp < 0) return s;
  let left = 0,
    out = "";
  while (iDelim >= 0 && iAmp >= 0) {
    if (iDelim < iAmp) {
      if (left < iDelim) out += s.substring(left, iDelim);
      out += escDelim;
      left = iDelim + 1;
      iDelim = s.indexOf(delim, left);
    } else {
      if (left < iAmp) out += s.substring(left, iAmp);
      out += "&amp;";
      left = iAmp + 1;
      iAmp = s.indexOf("&", left);
    }
  }
  if (iDelim >= 0) {
    do {
      if (left < iDelim) out += s.substring(left, iDelim);
      out += escDelim;
      left = iDelim + 1;
      iDelim = s.indexOf(delim, left);
    } while (iDelim >= 0);
  } else while (iAmp >= 0) {
    if (left < iAmp) out += s.substring(left, iAmp);
    out += "&amp;";
    left = iAmp + 1;
    iAmp = s.indexOf("&", left);
  }
  return left < s.length ? out + s.substring(left) : out;
}
function resolveSSRNode(node) {
  const t = typeof node;
  if (t === "string") return node;
  if (node == null || t === "boolean") return "";
  if (Array.isArray(node)) {
    let mapped = "";
    for (let i = 0, len = node.length; i < len; i++) mapped += resolveSSRNode(node[i]);
    return mapped;
  }
  if (t === "object") return node.t;
  if (t === "function") return resolveSSRNode(node());
  return String(node);
}
function getHydrationKey() {
  const hydrate = sharedConfig.context;
  return hydrate && !hydrate.noHydrate && `${hydrate.id}${hydrate.count++}`;
}
function injectAssets(assets, html) {
  if (!assets || !assets.length) return html;
  let out = "";
  for (let i = 0, len = assets.length; i < len; i++) out += assets[i]();
  return html.replace(`</head>`, out + `</head>`);
}
function injectScripts(html, scripts, nonce) {
  const tag = `<script${nonce ? ` nonce="${nonce}"` : ""}>${scripts}</script>`;
  const index = html.indexOf("<!--xs-->");
  if (index > -1) {
    return html.slice(0, index) + tag + html.slice(index);
  }
  return html + tag;
}
function serializeError(error) {
  if (error.message) {
    const fields = {};
    const keys = Object.getOwnPropertyNames(error);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const value = error[key];
      if (!value || key !== "message" && typeof value !== "function") {
        fields[key] = value;
      }
    }
    return `Object.assign(new Error(${stringify(error.message)}), ${stringify(fields)})`;
  }
  return stringify(error);
}

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro$4 = createAstro();
const $$Layout = createComponent$1(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate(_a || (_a = __template(['<html lang="zh-CN">\n	<head>\n		<meta charset="UTF-8">\n		<meta name="viewport" content="width=device-width">\n		<link rel="icon" type="image/svg+xml" href="/favicon.svg">\n		<meta name="generator"', ">\n		<title>", '</title>\n		<script async defer data-website-id="918699fd-0704-408b-bda3-3f28c1bd9d1b" src="https://stats.ddiu.io/app.js"><\/script>\n	', "</head>\n	<body>\n		", "\n	</body></html>"])), addAttribute(Astro2.generator, "content"), title, renderHead($$result), renderSlot($$result, $$slots["default"]));
}, "/Users/niuwan/playground/chatgpt-demo/src/layouts/Layout.astro");

const $$Astro$3 = createAstro();
const $$Logo = createComponent$1(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Logo;
  return renderTemplate`${maybeRenderHead($$result)}<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 32 32"><g fill="none"><path fill="#F8312F" d="M5 3.5a1.5 1.5 0 0 1-1 1.415V12l2.16 5.487L4 23c-1.1 0-2-.9-2-1.998v-7.004a2 2 0 0 1 1-1.728V4.915A1.5 1.5 0 1 1 5 3.5Zm25.05.05c0 .681-.44 1.26-1.05 1.468V12.2c.597.347 1 .994 1 1.73v7.01c0 1.1-.9 2-2 2l-2.94-5.68L28 11.93V5.018a1.55 1.55 0 1 1 2.05-1.468Z"></path><path fill="#FFB02E" d="M11 4.5A1.5 1.5 0 0 1 12.5 3h7a1.5 1.5 0 0 1 .43 2.938c-.277.082-.57.104-.847.186l-3.053.904l-3.12-.908c-.272-.08-.56-.1-.832-.18A1.5 1.5 0 0 1 11 4.5Z"></path><path fill="#CDC4D6" d="M22.05 30H9.95C6.66 30 4 27.34 4 24.05V12.03C4 8.7 6.7 6 10.03 6h11.95C25.3 6 28 8.7 28 12.03v12.03c0 3.28-2.66 5.94-5.95 5.94Z"></path><path fill="#212121" d="M9.247 18.5h13.506c2.33 0 4.247-1.919 4.247-4.25A4.257 4.257 0 0 0 22.753 10H9.247A4.257 4.257 0 0 0 5 14.25a4.257 4.257 0 0 0 4.247 4.25Zm4.225 7.5h5.056C19.34 26 20 25.326 20 24.5s-.66-1.5-1.472-1.5h-5.056C12.66 23 12 23.674 12 24.5s.66 1.5 1.472 1.5Z"></path><path fill="#00A6ED" d="M10.25 12C9.56 12 9 12.56 9 13.25v2.5a1.25 1.25 0 1 0 2.5 0v-2.5c0-.69-.56-1.25-1.25-1.25Zm11.5 0c-.69 0-1.25.56-1.25 1.25v2.5a1.25 1.25 0 1 0 2.5 0v-2.5c0-.69-.56-1.25-1.25-1.25Z"></path></g></svg>`;
}, "/Users/niuwan/playground/chatgpt-demo/src/components/Logo.astro");

const $$Astro$2 = createAstro();
const $$Header = createComponent$1(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Header;
  return renderTemplate`${maybeRenderHead($$result)}<header>
  ${renderComponent($$result, "Logo", $$Logo, {})}
  <div class="flex items-center mt-2">
    <span class="text-2xl text-slate font-extrabold mr-1">ChatGPT</span>
    <span class="text-2xl text-transparent font-extrabold bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-600">Demo</span>
  </div>
  <p mt-1 text-slate op-60>Based on OpenAI API (gpt-3.5-turbo).</p>
</header>`;
}, "/Users/niuwan/playground/chatgpt-demo/src/components/Header.astro");

const $$Astro$1 = createAstro();
const $$Footer = createComponent$1(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Footer;
  return renderTemplate`${maybeRenderHead($$result)}<footer op-60>
  <p mt-6 text-sm text-slate>
    <span pr-1>Made by</span>
    <a border-b border-slate border-none hover:border-dashed href="https://ddiu.io" target="_blank">
      Diu
    </a>
    <span px-1>|</span>
    <a border-b border-slate border-none hover:border-dashed href="https://github.com/ddiu8081/chatgpt-demo" target="_blank">
      Source Code
    </a>
  </p>
</footer>`;
}, "/Users/niuwan/playground/chatgpt-demo/src/components/Footer.astro");

const _tmpl$$2 = ["<div", " class=\"", "\"><div class=\"", "\"></div><div class=\"message prose text-slate break-words overflow-hidden\">", "</div></div>"];
const _arrow_function$2 = ({
  role,
  message
}) => {
  const roleClass = {
    system: "bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300",
    user: "bg-gradient-to-r from-purple-400 to-yellow-400",
    assistant: "bg-gradient-to-r from-yellow-200 via-green-200 to-green-300"
  };
  const htmlString = () => {
    const md = MarkdownIt().use(mdKatex).use(mdHighlight);
    if (typeof message === "function") {
      return md.render(message());
    } else if (typeof message === "string") {
      return md.render(message);
    }
    return "";
  };
  return ssr(_tmpl$$2, ssrHydrationKey(), `flex py-2 gap-3 -mx-4 px-4 rounded-lg transition-colors md:hover:bg-slate/3 ${role === "user" ? "op-75" : ""}`, `shrink-0 w-7 h-7 mt-4 rounded-full op-80 ${escape(roleClass[role], true)}`, htmlString());
};

__astro_tag_component__(_arrow_function$2, "@astrojs/solid-js");

const _tmpl$$1 = ["<svg", " xmlns=\"http://www.w3.org/2000/svg\" width=\"1em\" height=\"1em\" viewBox=\"0 0 24 24\"><path fill=\"currentColor\" d=\"M8 20v-5h2v5h9v-7H5v7h3zm-4-9h16V8h-6V4h-4v4H4v3zM3 21v-8H2V7a1 1 0 0 1 1-1h5V3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v3h5a1 1 0 0 1 1 1v6h-1v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z\"></path></svg>"];
const _arrow_function$1 = () => {
  return ssr(_tmpl$$1, ssrHydrationKey());
};

__astro_tag_component__(_arrow_function$1, "@astrojs/solid-js");

const _tmpl$ = ["<div", " class=\"my-4 flex items-center gap-2\"><input type=\"text\" id=\"input\" placeholder=\"Enter something...\" autocomplete=\"off\" autofocus", " w-full px-4 h-12 text-slate rounded-sm bg-slate bg-op-15 focus:bg-op-20 focus:ring-0 focus:outline-none placeholder:text-slate-400 placeholder:op-30><button", " h-12 px-4 py-2 bg-slate bg-op-15 hover:bg-op-20 text-slate rounded-sm>Send</button><button title=\"Clear\"", " h-12 px-4 py-2 bg-slate bg-op-15 hover:bg-op-20 text-slate rounded-sm>", "</button></div>"],
  _tmpl$2 = ["<div", " my-6><!--#-->", "<!--/--><!--#-->", "<!--/--><!--#-->", "<!--/--></div>"],
  _tmpl$3 = ["<div", " class=\"h-12 my-4 flex items-center justify-center bg-slate bg-op-15 text-slate rounded-sm\">AI is thinking...</div>"];
const _arrow_function = () => {
  const [messageList, setMessageList] = createSignal([]);
  const [currentAssistantMessage, setCurrentAssistantMessage] = createSignal("");
  const [loading, setLoading] = createSignal(false);
  return ssr(_tmpl$2, ssrHydrationKey(), escape(createComponent(For, {
    get each() {
      return messageList();
    },
    children: message => createComponent(_arrow_function$2, {
      get role() {
        return message.role;
      },
      get message() {
        return message.content;
      }
    })
  })), currentAssistantMessage() && escape(createComponent(_arrow_function$2, {
    role: "assistant",
    message: currentAssistantMessage
  })), escape(createComponent(Show, {
    get when() {
      return !loading();
    },
    fallback: () => ssr(_tmpl$3, ssrHydrationKey()),
    get children() {
      return ssr(_tmpl$, ssrHydrationKey(), ssrAttribute("disabled", loading(), true), ssrAttribute("disabled", loading(), true), ssrAttribute("disabled", loading(), true), escape(createComponent(_arrow_function$1, {})));
    }
  })));
};

__astro_tag_component__(_arrow_function, "@astrojs/solid-js");

const $$Astro = createAstro();
const $$Index = createComponent$1(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "ChatGPT API Demo" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead($$result2)}<main>
    ${renderComponent($$result2, "Header", $$Header, {})}
    ${renderComponent($$result2, "Generator", _arrow_function, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/niuwan/playground/chatgpt-demo/src/components/Generator", "client:component-export": "default" })}
    ${renderComponent($$result2, "Footer", $$Footer, {})}
  </main>` })}`;
}, "/Users/niuwan/playground/chatgpt-demo/src/pages/index.astro");

const $$file = "/Users/niuwan/playground/chatgpt-demo/src/pages/index.astro";
const $$url = "";

const _page0 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const apiKey = ({}).OPENAI_API_KEY;
const post = async (context) => {
  const body = await context.request.json();
  const messages = body.messages;
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  if (!messages) {
    return new Response("No input text");
  }
  const completion = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    method: "POST",
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages,
      temperature: 0.6,
      stream: true
    })
  });
  const stream = new ReadableStream({
    async start(controller) {
      const streamParser = (event) => {
        if (event.type === "event") {
          const data = event.data;
          if (data === "[DONE]") {
            controller.close();
            return;
          }
          try {
            const json = JSON.parse(data);
            const text = json.choices[0].delta?.content;
            const queue = encoder.encode(text);
            controller.enqueue(queue);
          } catch (e) {
            controller.error(e);
          }
        }
      };
      const parser = createParser(streamParser);
      for await (const chunk of completion.body) {
        parser.feed(decoder.decode(chunk));
      }
    }
  });
  return new Response(stream);
};

const _page1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  post
}, Symbol.toStringTag, { value: 'Module' }));

export { _page0 as _, _page1 as a, createComponent as c, renderToString as r, ssr as s };
