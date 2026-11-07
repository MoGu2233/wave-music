/* Wave PWA Service Worker
   策略：同源请求 network-first（在线用最新，离线回退缓存）；跨域（音源 API）不拦截。
   离线价值：播放器壳可打开 + 本地音乐（IndexedDB 缓存）完全可播 */
const CACHE = 'wave-v1'; /* 改名升级缓存：清掉旧 FMusic / rie / banjo 预缓存。**改 icons/ 或 manifest 时必须再升一版**，否则已装 PWA 一直吃旧图标与旧清单（走 cache-first） */
const PRECACHE = ['/', '/index.html', '/manifest.webmanifest', '/icons/icon-192.png', '/icons/icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(PRECACHE)).catch(() => {})
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; /* 跨域（音源 API / 封面）不拦截 */
  /* 导航请求（打开页面）：network-first，离线回退缓存。只缓存成功响应——
     把 4xx/5xx 存进去会让离线兜底返回一张错误页，而不是上一次的好副本 */
  if (req.mode === 'navigate'){
    e.respondWith(
      fetch(req).then(res => {
        if (res.ok){
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
        }
        return res;
      }).catch(() => caches.match(req).then(r => r || caches.match('/index.html')))
    );
    return;
  }
  /* 静态资源：cache-first，miss 时请求并缓存 */
  e.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;
      return fetch(req).then(res => {
        if (res.ok){
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
        }
        return res;
      });
    })
  );
});
