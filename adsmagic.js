(() => {
  const dialog = document.querySelector('.ads-image-dialog');
  if (!dialog || typeof dialog.showModal !== 'function') return;

  const title = dialog.querySelector('#ads-image-title');
  const image = dialog.querySelector('.ads-image-scroll img');
  const scroll = dialog.querySelector('.ads-image-scroll');
  const close = dialog.querySelector('[data-image-close]');
  const zoomOut = dialog.querySelector('[data-zoom-out]');
  const zoomIn = dialog.querySelector('[data-zoom-in]');
  const zoomReset = dialog.querySelector('[data-zoom-reset]');
  const zoomStatus = dialog.querySelector('[data-zoom-status]');
  let trigger;
  let zoom = 1;

  function setZoom(value) {
    const next = Math.max(1, Math.min(3, value));
    const centerX = (scroll.scrollLeft + scroll.clientWidth / 2) / zoom;
    const centerY = (scroll.scrollTop + scroll.clientHeight / 2) / zoom;
    zoom = next;
    scroll.style.setProperty('--ads-image-zoom', zoom);
    zoomStatus.textContent = `${Math.round(zoom * 100)}%`;
    zoomOut.disabled = zoom <= 1;
    zoomIn.disabled = zoom >= 3;
    scroll.scrollLeft = Math.max(0, centerX * zoom - scroll.clientWidth / 2);
    scroll.scrollTop = Math.max(0, centerY * zoom - scroll.clientHeight / 2);
  }

  document.querySelectorAll('.ads-compare-open').forEach(link => {
    link.addEventListener('click', event => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      trigger = link;
      const thumbnail = link.closest('figure').querySelector('img');
      title.textContent = link.dataset.title;
      image.src = link.href;
      image.alt = thumbnail.alt;
      zoom = 1;
      dialog.showModal();
      document.documentElement.classList.add('ads-image-open');
      setZoom(window.matchMedia('(max-width: 700px)').matches ? 2 : 1);
      scroll.scrollLeft = 0;
      scroll.scrollTop = 0;
      close.focus();
    });
  });

  close.addEventListener('click', () => dialog.close());
  zoomOut.addEventListener('click', () => setZoom(zoom - 0.5));
  zoomIn.addEventListener('click', () => setZoom(zoom + 0.5));
  zoomReset.addEventListener('click', () => setZoom(1));
  dialog.addEventListener('close', () => {
    document.documentElement.classList.remove('ads-image-open');
    trigger?.focus();
  });
})();
