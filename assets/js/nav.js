
// Bu dosya: navbar'ı yükler + davranışları ayarlar (tek kopya kullan)
(async function mountNavbar(){
  const host = document.getElementById('navbar'); // sayfada boş bir <div id="navbar"></div> var
  if(!host) return;
  const res = await fetch('partials/navbar.html');
  host.innerHTML = await res.text();

  // Aktif link alt çizgisi için ufak stil
  const style = document.createElement('style');
  style.textContent = `
    .nav-link{position:relative}
   margin:auto;width:64px;height:2px;
      background:linear-gradient(90deg,#13547a,#80d0c7);border-radius:2px}
  `;
  document.head.appendChild(style);

  // Mobile toggle
  const burger = document.getElementById('burger');
  const mobile = document.getElementById('mobileMenu');
  burger?.addEventListener('click', () => {
    const open = mobile.classList.contains('opacity-100');
    mobile.classList.toggle('opacity-100', !open);
    mobile.classList.toggle('opacity-0', open);
    mobile.classList.toggle('scale-y-100', !open);
    mobile.classList.toggle('scale-y-0', open);
    mobile.classList.toggle('pointer-events-auto', !open);
    mobile.classList.toggle('pointer-events-none', open);
  });

  // Hangi sayfadaysak aktif menü
  const path = location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.nav-link');
  links.forEach(a => {
    const href = a.getAttribute('href') || '';
    if ((path === 'index.html' && href.startsWith('index.html')) ||
        (path === 'contact.html' && href.includes('contact.html'))) {
      a.classList.add('active');
    }
  });

  // Scroll davranışı:
  // - index.html: hero görünürken overlay; değilken sticky beyaz
  // - diğer sayfalar (contact.html): baştan sticky beyaz
  const header = document.getElementById('site-header');
  const nav = document.getElementById('nav');

  const topStyle = () => { header.classList.remove('bg-white','shadow-lg'); nav.classList.remove('text-neutral-900'); nav.classList.add('text-white'); };
  const stickyStyle = () => { header.classList.add('bg-white','shadow-lg'); nav.classList.remove('text-white'); nav.classList.add('text-neutral-900'); };

  if (path === '' || path === 'index.html') {
    topStyle();
    const hero = document.getElementById('hero');
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e => e.isIntersecting ? topStyle() : stickyStyle());
    },{threshold:0, rootMargin:"-64px 0px 0px 0px"});
    if (hero) io.observe(hero);
  } else {
    stickyStyle();
  }
})();
