const u={};function R(e){u.context=e}function le(){return{...u.context,id:`${u.context.id}${u.context.count++}-`,count:0}}const oe=(e,t)=>e===t,re=Symbol("solid-track"),M={equals:oe};let fe=z;const C=1,B=2,W={owned:null,cleanups:null,context:null,owner:null};var g=null;let E=null,h=null,p=null,m=null,F=0;function L(e,t){const n=h,s=g,i=e.length===0,l=i?W:{owned:null,cleanups:null,context:null,owner:t===void 0?s:t},r=i?e:()=>e(()=>v(()=>O(l)));g=l,h=null;try{return k(r,!0)}finally{h=n,g=s}}function ue(e,t){t=t?Object.assign({},M,t):M;const n={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},s=i=>(typeof i=="function"&&(i=i(n.value)),X(n,i));return[Q.bind(n),s]}function P(e,t,n){const s=J(e,t,!1,C);D(s)}function U(e,t,n){n=n?Object.assign({},M,n):M;const s=J(e,t,!0,0);return s.observers=null,s.observerSlots=null,s.comparator=n.equals||void 0,D(s),Q.bind(s)}function v(e){if(h===null)return e();const t=h;h=null;try{return e()}finally{h=t}}function ce(e){return g===null||(g.cleanups===null?g.cleanups=[e]:g.cleanups.push(e)),e}function Q(){const e=E;if(this.sources&&(this.state||e))if(this.state===C||e)D(this);else{const t=p;p=null,k(()=>I(this),!1),p=t}if(h){const t=this.observers?this.observers.length:0;h.sources?(h.sources.push(this),h.sourceSlots.push(t)):(h.sources=[this],h.sourceSlots=[t]),this.observers?(this.observers.push(h),this.observerSlots.push(h.sources.length-1)):(this.observers=[h],this.observerSlots=[h.sources.length-1])}return this.value}function X(e,t,n){let s=e.value;return(!e.comparator||!e.comparator(s,t))&&(e.value=t,e.observers&&e.observers.length&&k(()=>{for(let i=0;i<e.observers.length;i+=1){const l=e.observers[i],r=E&&E.running;r&&E.disposed.has(l),(r&&!l.tState||!r&&!l.state)&&(l.pure?p.push(l):m.push(l),l.observers&&ee(l)),r||(l.state=C)}if(p.length>1e6)throw p=[],new Error},!1)),t}function D(e){if(!e.fn)return;O(e);const t=g,n=h,s=F;h=g=e,ae(e,e.value,s),h=n,g=t}function ae(e,t,n){let s;try{s=e.fn(t)}catch(i){e.pure&&(e.state=C,e.owned&&e.owned.forEach(O),e.owned=null),te(i)}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&"observers"in e?X(e,s):e.value=s,e.updatedAt=n)}function J(e,t,n,s=C,i){const l={fn:e,state:s,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:g,context:null,pure:n};return g===null||g!==W&&(g.owned?g.owned.push(l):g.owned=[l]),l}function Z(e){const t=E;if(e.state===0||t)return;if(e.state===B||t)return I(e);if(e.suspense&&v(e.suspense.inFallback))return e.suspense.effects.push(e);const n=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<F);)(e.state||t)&&n.push(e);for(let s=n.length-1;s>=0;s--)if(e=n[s],e.state===C||t)D(e);else if(e.state===B||t){const i=p;p=null,k(()=>I(e,n[0]),!1),p=i}}function k(e,t){if(p)return e();let n=!1;t||(p=[]),m?n=!0:m=[],F++;try{const s=e();return he(n),s}catch(s){n||(m=null),p=null,te(s)}}function he(e){if(p&&(z(p),p=null),e)return;const t=m;m=null,t.length&&k(()=>fe(t),!1)}function z(e){for(let t=0;t<e.length;t++)Z(e[t])}function I(e,t){const n=E;e.state=0;for(let s=0;s<e.sources.length;s+=1){const i=e.sources[s];i.sources&&(i.state===C||n?i!==t&&Z(i):(i.state===B||n)&&I(i,t))}}function ee(e){const t=E;for(let n=0;n<e.observers.length;n+=1){const s=e.observers[n];(!s.state||t)&&(s.state=B,s.pure?p.push(s):m.push(s),s.observers&&ee(s))}}function O(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),s=e.sourceSlots.pop(),i=n.observers;if(i&&i.length){const l=i.pop(),r=n.observerSlots.pop();s<i.length&&(l.sourceSlots[r]=s,i[s]=l,n.observerSlots[s]=r)}}if(e.owned){for(t=0;t<e.owned.length;t++)O(e.owned[t]);e.owned=null}if(e.cleanups){for(t=0;t<e.cleanups.length;t++)e.cleanups[t]();e.cleanups=null}e.state=0,e.context=null}function de(e){return e instanceof Error||typeof e=="string"?e:new Error("Unknown error")}function te(e){throw e=de(e),e}const ge=Symbol("fallback");function V(e){for(let t=0;t<e.length;t++)e[t]()}function pe(e,t,n={}){let s=[],i=[],l=[],r=0,o=t.length>1?[]:null;return ce(()=>V(l)),()=>{let a=e()||[],c,f;return a[re],v(()=>{let d=a.length,w,S,$,H,q,b,x,A,T;if(d===0)r!==0&&(V(l),l=[],s=[],i=[],r=0,o&&(o=[])),n.fallback&&(s=[ge],i[0]=L(ie=>(l[0]=ie,n.fallback())),r=1);else if(r===0){for(i=new Array(d),f=0;f<d;f++)s[f]=a[f],i[f]=L(y);r=d}else{for($=new Array(d),H=new Array(d),o&&(q=new Array(d)),b=0,x=Math.min(r,d);b<x&&s[b]===a[b];b++);for(x=r-1,A=d-1;x>=b&&A>=b&&s[x]===a[A];x--,A--)$[A]=i[x],H[A]=l[x],o&&(q[A]=o[x]);for(w=new Map,S=new Array(A+1),f=A;f>=b;f--)T=a[f],c=w.get(T),S[f]=c===void 0?-1:c,w.set(T,f);for(c=b;c<=x;c++)T=s[c],f=w.get(T),f!==void 0&&f!==-1?($[f]=i[c],H[f]=l[c],o&&(q[f]=o[c]),f=S[f],w.set(T,f)):l[c]();for(f=b;f<d;f++)f in $?(i[f]=$[f],l[f]=H[f],o&&(o[f]=q[f],o[f](f))):i[f]=L(y);i=i.slice(0,r=d),s=a.slice(0)}return i});function y(d){if(l[f]=d,o){const[w,S]=ue(f);return o[f]=S,t(a[f],w)}return t(a[f])}}}let ne=!1;function ye(){ne=!0}function Ee(e,t){if(ne&&u.context){const n=u.context;R(le());const s=v(()=>e(t||{}));return R(n),s}return v(()=>e(t||{}))}function me(e){const t="fallback"in e&&{fallback:()=>e.fallback};return U(pe(()=>e.each,e.children,t||void 0))}function ve(e){let t=!1;const n=e.keyed,s=U(()=>e.when,void 0,{equals:(i,l)=>t?i===l:!i==!l});return U(()=>{const i=s();if(i){const l=e.children,r=typeof l=="function"&&l.length>0;return t=n||r,r?v(()=>l(i)):l}return e.fallback},void 0,void 0)}function we(e,t,n){let s=n.length,i=t.length,l=s,r=0,o=0,a=t[i-1].nextSibling,c=null;for(;r<i||o<l;){if(t[r]===n[o]){r++,o++;continue}for(;t[i-1]===n[l-1];)i--,l--;if(i===r){const f=l<s?o?n[o-1].nextSibling:n[l-o]:a;for(;o<l;)e.insertBefore(n[o++],f)}else if(l===o)for(;r<i;)(!c||!c.has(t[r]))&&t[r].remove(),r++;else if(t[r]===n[l-1]&&n[o]===t[i-1]){const f=t[--i].nextSibling;e.insertBefore(n[o++],t[r++].nextSibling),e.insertBefore(n[--l],f),t[i]=n[l]}else{if(!c){c=new Map;let y=o;for(;y<l;)c.set(n[y],y++)}const f=c.get(t[r]);if(f!=null)if(o<f&&f<l){let y=r,d=1,w;for(;++y<i&&y<l&&!((w=c.get(t[y]))==null||w!==f+d);)d++;if(d>f-o){const S=t[r];for(;o<f;)e.insertBefore(n[o++],S)}else e.replaceChild(n[o++],t[r++])}else r++;else t[r++].remove()}}}const K="_$DX_DELEGATE";function be(e,t,n,s={}){let i;return L(l=>{i=l,t===document?e():xe(t,e(),t.firstChild?null:void 0,n)},s.owner),()=>{i(),t.textContent=""}}function Ce(e,t,n){const s=document.createElement("template");s.innerHTML=e;let i=s.content.firstChild;return n&&(i=i.firstChild),i}function Te(e,t=window.document){const n=t[K]||(t[K]=new Set);for(let s=0,i=e.length;s<i;s++){const l=e[s];n.has(l)||(n.add(l),t.addEventListener(l,se))}}function Ne(e,t){t==null?e.removeAttribute("class"):e.className=t}function $e(e,t){!u.context&&(e.innerHTML=t)}function ke(e,t,n){return v(()=>e(t,n))}function xe(e,t,n,s){if(n!==void 0&&!s&&(s=[]),typeof t!="function")return j(e,t,s,n);P(i=>j(e,t(),i,n),s)}function Ae(e,t,n={}){u.completed=globalThis._$HY.completed,u.events=globalThis._$HY.events,u.load=globalThis._$HY.load,u.gather=i=>G(t,i),u.registry=new Map,u.context={id:n.renderId||"",count:0},G(t,n.renderId);const s=be(e,t,[...t.childNodes],n);return u.context=null,s}function He(e){let t,n;return!u.context||!(t=u.registry.get(n=Se()))?e.cloneNode(!0):(u.completed&&u.completed.add(t),u.registry.delete(n),t)}function qe(e){let t=e,n=0,s=[];if(u.context)for(;t;){if(t.nodeType===8){const i=t.nodeValue;if(i==="#")n++;else if(i==="/"){if(n===0)return[t,s];n--}}s.push(t),t=t.nextSibling}return[t,s]}function Le(){u.events&&!u.events.queued&&(queueMicrotask(()=>{const{completed:e,events:t}=u;for(t.queued=!1;t.length;){const[n,s]=t[0];if(!e.has(n))return;se(s),t.shift()}}),u.events.queued=!0)}function se(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return n||document}}),u.registry&&!u.done&&(u.done=!0,document.querySelectorAll("[id^=pl-]").forEach(s=>{for(;s&&s.nodeType!==8&&s.nodeValue!=="pl-"+e;){let i=s.nextSibling;s.remove(),s=i}s&&s.remove()}));n;){const s=n[t];if(s&&!n.disabled){const i=n[`${t}Data`];if(i!==void 0?s.call(n,i,e):s.call(n,e),e.cancelBubble)return}n=n._$host||n.parentNode||n.host}}function j(e,t,n,s,i){for(u.context&&!n&&(n=[...e.childNodes]);typeof n=="function";)n=n();if(t===n)return n;const l=typeof t,r=s!==void 0;if(e=r&&n[0]&&n[0].parentNode||e,l==="string"||l==="number"){if(u.context)return n;if(l==="number"&&(t=t.toString()),r){let o=n[0];o&&o.nodeType===3?o.data=t:o=document.createTextNode(t),n=N(e,n,s,o)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t}else if(t==null||l==="boolean"){if(u.context)return n;n=N(e,n,s)}else{if(l==="function")return P(()=>{let o=t();for(;typeof o=="function";)o=o();n=j(e,o,n,s)}),()=>n;if(Array.isArray(t)){const o=[],a=n&&Array.isArray(n);if(_(o,t,n,i))return P(()=>n=j(e,o,n,s,!0)),()=>n;if(u.context){if(!o.length)return n;for(let c=0;c<o.length;c++)if(o[c].parentNode)return n=o}if(o.length===0){if(n=N(e,n,s),r)return n}else a?n.length===0?Y(e,o,s):we(e,n,o):(n&&N(e),Y(e,o));n=o}else if(t instanceof Node){if(u.context&&t.parentNode)return n=r?[t]:t;if(Array.isArray(n)){if(r)return n=N(e,n,s,t);N(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}}return n}function _(e,t,n,s){let i=!1;for(let l=0,r=t.length;l<r;l++){let o=t[l],a=n&&n[l];if(o instanceof Node)e.push(o);else if(!(o==null||o===!0||o===!1))if(Array.isArray(o))i=_(e,o,a)||i;else if(typeof o=="function")if(s){for(;typeof o=="function";)o=o();i=_(e,Array.isArray(o)?o:[o],Array.isArray(a)?a:[a])||i}else e.push(o),i=!0;else{const c=String(o);a&&a.nodeType===3&&a.data===c?e.push(a):e.push(document.createTextNode(c))}}return i}function Y(e,t,n=null){for(let s=0,i=t.length;s<i;s++)e.insertBefore(t[s],n)}function N(e,t,n,s){if(n===void 0)return e.textContent="";const i=s||document.createTextNode("");if(t.length){let l=!1;for(let r=t.length-1;r>=0;r--){const o=t[r];if(i!==o){const a=o.parentNode===e;!l&&!r?a?e.replaceChild(i,o):e.insertBefore(i,n):a&&o.remove()}else l=!0}}else e.insertBefore(i,n);return[i]}function G(e,t){const n=e.querySelectorAll("*[data-hk]");for(let s=0;s<n.length;s++){const i=n[s],l=i.getAttribute("data-hk");(!t||l.startsWith(t))&&!u.registry.has(l)&&u.registry.set(l,i)}}function Se(){const e=u.context;return`${e.id}${e.count++}`}const Me=(...e)=>(ye(),Ae(...e));export{me as F,ve as S,Ne as a,ue as b,P as c,Te as d,qe as e,xe as f,He as g,Ee as h,$e as i,U as j,be as k,Me as l,Le as r,u as s,Ce as t,ke as u};
