/**
 * CSS shared by every template — reset, lightbox, mobile nav primitives,
 * skip link, focus styles, reduced motion handling.
 * Templates layer their own visual CSS on top.
 */
export const SHARED_CSS = `/* ---------- Foundation reset ---------- */
*,*::before,*::after{box-sizing:border-box}
html{-webkit-text-size-adjust:100%;scroll-behavior:smooth;overflow-x:hidden}
body,h1,h2,h3,h4,h5,h6,p,figure,blockquote,dl,dd,ul,ol{margin:0}
ul,ol{padding:0;list-style:none}
img,picture,svg,video,canvas{display:block;max-width:100%;height:auto}
input,button,textarea,select{font:inherit;color:inherit}
button{background:none;border:0;padding:0;cursor:pointer}
a{color:inherit;text-decoration:none}
body{min-height:100dvh;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;overflow-x:hidden}
main{isolation:isolate}
section{position:relative;scroll-margin-top:5rem}
.container{width:min(var(--max,1200px),100% - clamp(1.5rem,5vw,4rem)*2);margin-inline:auto}
:where(p){max-width:68ch}
:where(input,textarea,select){width:100%}
:where(textarea){resize:vertical;min-height:8rem}
:focus-visible{outline:2px solid var(--color-accent,#5b6cff);outline-offset:3px;border-radius:4px}
::selection{background:color-mix(in srgb,var(--color-accent,#5b6cff) 22%,white);color:#111}
@media(prefers-reduced-motion:reduce){
  html{scroll-behavior:auto}
  *,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}
}

/* ---------- CTA / Button base ---------- */
.cta,.btn{
  min-height:48px;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  gap:.5rem;
  padding:.85rem 1.85rem;
  border-radius:10px;
  font-weight:600;
  font-size:.9375rem;
  letter-spacing:.008em;
  line-height:1;
  white-space:nowrap;
  transition:transform .2s cubic-bezier(.22,.68,0,1.2),box-shadow .2s ease,background-color .18s ease,color .18s ease,border-color .18s ease,opacity .18s ease
}
.cta:hover,.btn:hover{transform:translateY(-2px)}
.cta:active,.btn:active{transform:translateY(1px)}

/* ---------- Skip link ---------- */
.skip-link{position:absolute;left:-9999px;top:0;background:#000;color:#fff;padding:.5rem .85rem;z-index:9999;border-radius:0 0 8px 0;font-weight:600}
.skip-link:focus{left:0;top:0}

/* ---------- Reveal on scroll ---------- */
[data-reveal]{opacity:0;transform:translateY(22px);transition:opacity .7s cubic-bezier(.22,.68,0,1),transform .7s cubic-bezier(.22,.68,0,1);will-change:transform,opacity}
[data-reveal="fade"]{transform:none}
[data-reveal="left"]{transform:translateX(-22px)}
[data-reveal="right"]{transform:translateX(22px)}
[data-reveal="scale"]{transform:translateY(12px) scale(.97)}
[data-reveal][data-revealed="true"]{opacity:1;transform:none}

/* ---------- Lightbox ---------- */
.sf-lightbox{position:fixed;inset:0;background:rgba(5,7,12,.96);display:none;align-items:center;justify-content:center;z-index:9999;padding:1.25rem}
.sf-lightbox[data-open="true"]{display:flex}
.sf-lightbox__figure{margin:0;max-width:min(96vw,1240px);max-height:90vh;display:flex;flex-direction:column;align-items:center;gap:.75rem}
.sf-lightbox__figure img{max-width:100%;max-height:80vh;object-fit:contain;border-radius:12px;box-shadow:0 32px 100px rgba(0,0,0,.7)}
.sf-lightbox__figure figcaption{color:rgba(255,255,255,.6);font-size:.875rem;text-align:center;letter-spacing:.02em}
.sf-lightbox__close,.sf-lightbox__prev,.sf-lightbox__next{position:absolute;top:50%;transform:translateY(-50%);width:52px;height:52px;border-radius:999px;background:rgba(255,255,255,.1);color:#fff;font-size:1.2rem;display:grid;place-items:center;backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.12);transition:background .18s,transform .18s}
.sf-lightbox__close{top:1.25rem;right:1.25rem;transform:none}
.sf-lightbox__prev{left:1.25rem}
.sf-lightbox__next{right:1.25rem}
.sf-lightbox__close:hover,.sf-lightbox__prev:hover,.sf-lightbox__next:hover{background:rgba(255,255,255,.2)}
.sf-lightbox__prev:hover{transform:translateY(-50%) translateX(-2px)}
.sf-lightbox__next:hover{transform:translateY(-50%) translateX(2px)}
@media(max-width:640px){.sf-lightbox__close,.sf-lightbox__prev,.sf-lightbox__next{width:42px;height:42px}}

/* ---------- Mobile nav primitives ---------- */
[data-nav-toggle]{display:inline-grid;place-items:center;width:44px;height:44px;border-radius:10px}
[data-nav-toggle] span,[data-nav-toggle] span::before,[data-nav-toggle] span::after{display:block;content:"";width:20px;height:1.5px;background:currentColor;border-radius:2px;transition:transform .22s ease,opacity .22s ease}
[data-nav-toggle] span{position:relative}
[data-nav-toggle] span::before{position:absolute;top:-7px}
[data-nav-toggle] span::after{position:absolute;top:7px}
[data-nav-toggle][aria-expanded="true"] span{transform:rotate(45deg)}
[data-nav-toggle][aria-expanded="true"] span::before{transform:translateY(7px) rotate(-90deg)}
[data-nav-toggle][aria-expanded="true"] span::after{opacity:0}
@media(min-width:880px){[data-nav-toggle]{display:none}}

/* Touch friendly */
a,button{min-height:32px}
`;
