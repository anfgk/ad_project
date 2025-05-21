// 캐시 이름 설정 - 캐시 버전 관리를 위해 사용됩니다.
const CACHE_NAME = "tws-website-v1";

// 캐시할 파일 목록
// 오프라인에서도 접근 가능하도록 하고 싶은 파일들을 여기에 나열합니다.
const urlsToCache = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js",
  "/img/twsLogo.svg",
  "/img/about.jpeg",
  "/img/about-small.jpeg",
  "/slick/slick.css",
  "/slick/slick-theme.css",
  "/slick/slick.min.js",
  // 필요한 다른 파일들도 여기에 추가할 수 있습니다.
];

// Service Worker 설치 단계
// 웹사이트에 처음 접속할 때 실행되며, 위에서 지정한 파일들을 캐시에 저장합니다.
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("캐시 저장소가 열렸습니다");
      return cache.addAll(urlsToCache); // 모든 파일을 캐시에 저장
    })
  );
});

// 네트워크 요청 가로채기
// 브라우저가 서버에 파일을 요청할 때마다 실행됩니다.
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // 요청한 파일이 캐시에 있는지 확인
      if (response) {
        return response; // 캐시에 있으면 캐시된 파일 반환
      }

      // 캐시에 없으면 네트워크로 요청
      return fetch(event.request).then((response) => {
        // 유효한 응답인지 확인
        // - response가 존재하고
        // - 상태 코드가 200(성공)이고
        // - 응답 타입이 basic(같은 도메인의 요청)인 경우에만 캐시
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }

        // 응답을 복제합니다 (응답은 스트림이라 한 번만 사용할 수 있기 때문)
        const responseToCache = response.clone();

        // 새로 받은 파일을 캐시에 저장
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});

// Service Worker 활성화 단계
// 새로운 버전의 Service Worker가 설치되었을 때 실행됩니다.
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME]; // 유지할 캐시 목록

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        // 이전 버전의 캐시를 삭제
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // 현재 버전의 캐시가 아니면 삭제
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
