(() => {
  // src/strictmode.js
  function strictMode() {
    if (window.__abStrict) return;
    window.__abStrict = true;
    const noop = () => {
    };
    window.open = () => null;
    for (const n of ["kxysy", "voofyf"]) {
      try {
        Object.defineProperty(window, n, { get: () => noop, set: () => {
        }, configurable: false });
      } catch (e) {
      }
    }
    const kill = (n) => n.nodeType === 1 && /z-index\s*:\s*2147483647/.test(n.getAttribute("style") || "") && n.remove();
    const watch = (el) => {
      [...el.children].forEach(kill);
      mo.observe(el, { childList: true });
    };
    const mo = new MutationObserver((ms) => ms.forEach((m) => m.addedNodes.forEach((n) => {
      kill(n);
      if (n === document.body) watch(n);
    })));
    watch(document.documentElement);
    if (document.body) watch(document.body);
  }

  // src/strict.js
  strictMode();
})();
