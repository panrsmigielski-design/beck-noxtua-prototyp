// Dokumentacja Beck-Noxtua – wspólne elementy: nawigacja, przełączniki widoku (Projekt / Kod) i motywu.
(() => {
  const root = document.documentElement;
  const store = {
    get: k => { try { return localStorage.getItem(k) } catch (e) { return null } },
    set: (k, v) => { try { localStorage.setItem(k, v) } catch (e) {} }
  };
  root.dataset.view = store.get('bn-docs-view') || 'projekt';
  const theme = store.get('bn-docs-theme');
  if (theme) root.dataset.theme = theme;

  const PAGES = [
    ['index.html', 'Start'],
    ['tokeny.html', 'Tokeny'],
    ['komponenty.html', 'Komponenty'],
    [null, 'Zasady'],
    ['raport-wcag.html', 'Raport WCAG'],
    [null, 'CSS']
  ];
  const here = location.pathname.split('/').pop() || 'index.html';

  function seg(label, key, options, current, onPick) {
    const wrap = document.createElement('div');
    wrap.className = 'ctl';
    wrap.innerHTML = `<span>${label}</span><div class="seg" role="group" aria-label="${label}">` +
      options.map(([v, t]) => `<button type="button" data-v="${v}" aria-pressed="${v === current}">${t}</button>`).join('') + '</div>';
    wrap.querySelectorAll('button').forEach(b => b.addEventListener('click', () => {
      wrap.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', x === b));
      onPick(b.dataset.v);
    }));
    return wrap;
  }

  document.addEventListener('DOMContentLoaded', () => {
    const side = document.getElementById('side');
    if (side) {
      side.innerHTML = `<a class="brand" href="index.html">Beck-Noxtua<small>Design system · dokumentacja</small></a>
        <nav aria-label="Dokumentacja">${PAGES.map(([href, t]) => href
          ? `<a href="${href}"${href === here ? ' aria-current="page"' : ''}>${t}</a>`
          : `<a class="soon" aria-disabled="true">${t}</a>`).join('')}</nav>
        <div class="foot">
          <a href="../prototyp/index.html">Prototyp HTML →</a>
          <a href="https://www.figma.com/design/eTSMJ5Cs2LeK2tFohwT97U/" target="_blank" rel="noopener">Figma: Design System →</a>
          <a href="https://www.figma.com/design/WEUuqlkCpFItPX2oXOLU0u/" target="_blank" rel="noopener">Figma: makiety →</a>
        </div>`;
      const ctls = document.createElement('div');
      ctls.style.cssText = 'display:grid;gap:12px';
      ctls.append(
        seg('Widok', 'view', [['projekt', 'Projekt'], ['kod', 'Kod']], root.dataset.view, v => { root.dataset.view = v; store.set('bn-docs-view', v); }),
        seg('Motyw strony', 'theme', [['light', 'Jasny'], ['dark', 'Ciemny']],
          root.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
          v => { root.dataset.theme = v; store.set('bn-docs-theme', v); })
      );
      side.insertBefore(ctls, side.querySelector('.foot'));
    }
    // kopiowanie nazw zmiennych CSS
    document.addEventListener('click', e => {
      const b = e.target.closest('.copy');
      if (!b) return;
      navigator.clipboard && navigator.clipboard.writeText(b.dataset.copy || b.textContent).then(() => {
        b.classList.add('done'); setTimeout(() => b.classList.remove('done'), 900);
      });
    });
  });
})();
