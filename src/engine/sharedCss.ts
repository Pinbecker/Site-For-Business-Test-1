/**
 * CSS shared by every template — reset, lightbox, mobile nav primitives,
 * skip link, focus styles, reduced motion handling.
 * Templates layer their own visual CSS on top.
 */
export const SHARED_CSS = `/* ---------- Reset ---------- */
*,*::before,*::after{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body,h1,h2,h3,h4,h5,h6,p,figure,blockquote,dl,dd,ul,ol{margin:0}
ul,ol{padding:0;list-style:none}
img,picture,svg,video{display:block;max-width:100%;height:auto}
button{font:inherit;color:inherit;background:none;border:0;padding:0;cursor:pointer}
a{color:inherit;text-decoration:none}
:focus-visible{outline:2px solid var(--color-accent,#5b6cff);outline-offset:3px;border-radius:4px}
html{scroll-behavior:smooth}
@media (prefers-reduced-motion: reduce){
  html{scroll-behavior:auto}
  *,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}
}
/* ---------- Skip link ---------- */
.skip-link{position:absolute;left:-9999px;top:0;background:#000;color:#fff;padding:.5rem .75rem;z-index:1000}
.skip-link:focus{left:1rem;top:1rem}
/* ---------- Reveal on scroll ---------- */
[data-reveal]{opacity:0;transform:translateY(10px);transition:opacity .6s ease,transform .6s ease}
[data-reveal][data-revealed="true"]{opacity:1;transform:none}
/* ---------- Lightbox ---------- */
.sf-lightbox{position:fixed;inset:0;background:rgba(8,9,12,.92);display:none;align-items:center;justify-content:center;z-index:9999;padding:1rem}
.sf-lightbox[data-open="true"]{display:flex}
.sf-lightbox__figure{margin:0;max-width:min(96vw,1200px);max-height:90vh;display:flex;flex-direction:column;align-items:center;gap:.75rem}
.sf-lightbox__figure img{max-width:100%;max-height:80vh;object-fit:contain;border-radius:6px;box-shadow:0 12px 40px rgba(0,0,0,.5)}
.sf-lightbox__figure figcaption{color:#fff;font-size:.875rem;opacity:.85;text-align:center}
.sf-lightbox__close,.sf-lightbox__prev,.sf-lightbox__next{position:absolute;top:50%;transform:translateY(-50%);width:48px;height:48px;border-radius:999px;background:rgba(255,255,255,.12);color:#fff;font-size:1.5rem;display:grid;place-items:center;backdrop-filter:blur(8px)}
.sf-lightbox__close{top:1rem;right:1rem;transform:none}
.sf-lightbox__prev{left:1rem}
.sf-lightbox__next{right:1rem}
.sf-lightbox__close:hover,.sf-lightbox__prev:hover,.sf-lightbox__next:hover{background:rgba(255,255,255,.22)}
@media (max-width:640px){.sf-lightbox__close,.sf-lightbox__prev,.sf-lightbox__next{width:40px;height:40px}}
/* ---------- Mobile nav primitives ---------- */
[data-nav-toggle]{display:inline-grid;place-items:center;width:44px;height:44px;border-radius:8px}
[data-nav-toggle] span,[data-nav-toggle] span::before,[data-nav-toggle] span::after{display:block;content:"";width:22px;height:2px;background:currentColor;border-radius:2px;transition:transform .2s ease}
[data-nav-toggle] span{position:relative}
[data-nav-toggle] span::before{position:absolute;top:-6px}
[data-nav-toggle] span::after{position:absolute;top:6px}
@media (min-width:880px){[data-nav-toggle]{display:none}}
/* Touch-friendly */
a,button{min-height:32px}
.cta,.btn{min-height:44px;display:inline-flex;align-items:center;justify-content:center;padding:.85rem 1.25rem;border-radius:8px;font-weight:600;letter-spacing:.01em}
`;
