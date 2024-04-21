!function(){function e(e,t,a,l){Object.defineProperty(e,t,{get:a,set:l,enumerable:!0,configurable:!0})}function t(e){return e&&e.__esModule?e.default:e}var a="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},l={},n={},i=a.parcelRequire2fd9;null==i&&((i=function(e){if(e in l)return l[e].exports;if(e in n){var t=n[e];delete n[e];var a={id:e,exports:{}};return l[e]=a,t.call(a.exports,a,a.exports),a.exports}var i=Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){n[e]=t},a.parcelRequire2fd9=i);var o=i.register;o("iE7OH",function(t,a){e(t.exports,"register",function(){return l},function(e){return l=e});var l,n=new Map;l=function(e,t){for(var a=0;a<t.length-1;a+=2)n.set(t[a],{baseUrl:e,path:t[a+1]})}}),o("aNJCr",function(t,a){e(t.exports,"getBundleURL",function(){return l},function(e){return l=e});var l,n={};l=function(e){var t=n[e];return t||(t=function(){try{throw Error()}catch(t){var e=(""+t.stack).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^)\n]+/g);if(e)return(""+e[2]).replace(/^((?:https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/.+)\/[^/]+$/,"$1")+"/"}return"/"}(),n[e]=t),t}}),i("iE7OH").register(i("aNJCr").getBundleURL("2bI8P"),JSON.parse('["2bI8P","mylibrary.f4dd2f25.js","l8b3G","symbol-defs.ee796a2b.svg","4YoQ6","film-image-desktop.f135d06e.jpg","bkJ6y","mylibrary.0f3422ca.js","iRPdA","mylibrary.runtime.b195cbe6.js"]')),i("8IRs8");var s=i("8sEG4"),c={};c=i("aNJCr").getBundleURL("2bI8P")+"film-image-desktop.f135d06e.jpg";var r={};r=i("aNJCr").getBundleURL("2bI8P")+"symbol-defs.ee796a2b.svg";var d=i("iCDYa");i("7rQOT");var u=i("lubd3");let f={galleryWatchBox:document.querySelector(".gallery_watch-box"),filmModal:document.querySelector("[data-modal]"),body:document.querySelector("body"),galleryQueueBox:document.querySelector(".gallery_queue-box")},m={},y=[];async function b(e){if(e.target.classList.contains("gallery_queue-box"))return;let t=Number(e.target.closest(".card").id),a=y.find(e=>e.id===t);if(a)m=a;else{try{m=await (0,s.fetchFilmDetailsById)(t)}catch(e){console.log(e.message),console.log(e.code)}y.push(m)}h(),p(m);let l={closeBtn:document.querySelector("[button-modal-close]"),addQueueBtn:document.querySelector("[button-add-queue]"),addWatchBtn:document.querySelector("[button-add-watch]"),unselectBtn:document.querySelector("[button-unselect]")};M(l.unselectBtn),l.closeBtn.addEventListener("click",L),l.addQueueBtn.addEventListener("click",B),l.addWatchBtn.addEventListener("click",q),l.unselectBtn.addEventListener("click",w);let n=S("watched")||[],i=S("queue")||[],o=n.some(e=>e.id===m.id);i.some(e=>e.id===m.id)&&E(l.addQueueBtn),o&&E(l.addWatchBtn),v(),window.addEventListener("keydown",_)}async function g(e){if(e.target.classList.contains("gallery_fetch-box"))return;let t=Number(e.target.closest(".card").id),a=y.find(e=>e.id===t);if(a)m=a;else{try{m=await (0,s.fetchFilmDetailsById)(t)}catch(e){console.log(e.message),console.log(e.code)}y.push(m)}h(),p(m);let l={closeBtn:document.querySelector("[button-modal-close]"),addQueueBtn:document.querySelector("[button-add-queue]"),addWatchBtn:document.querySelector("[button-add-watch]"),unselectBtn:document.querySelector("[button-unselect]")};M(l.unselectBtn),l.closeBtn.addEventListener("click",L),l.addQueueBtn.addEventListener("click",B),l.addWatchBtn.addEventListener("click",q),l.unselectBtn.addEventListener("click",w);let n=S("watched")||[],i=S("queue")||[],o=n.some(e=>e.id===m.id);i.some(e=>e.id===m.id)&&E(l.addQueueBtn),o&&E(l.addWatchBtn),v(),window.addEventListener("keydown",_)}function p(e){let a=function(e){let{poster_path:a,title:l,vote_average:n,vote_count:i,popularity:o,original_title:s,genres:c,overview:d}=e,u=`https://image.tmdb.org/t/p/w500${a}`;return`
  <div class="film-modal">
    <button class="button-close" type="button" button-modal-close>
      <svg class="icon-close">
        <use href="${t(r)}#icon-close"></use>
      </svg>
    </button>
    <img
      class="film_image"
      src="${u}"
      alt="Film Image"
      onerror="loadNoPoster(this)"
    />
    <article>
      <div class="film_content">
        <h2 class="film_title">${l}</h2>

        <ul class="film-info">
          <li class="film-info_item">
            <p class="film-info_lable">Vote / Votes</p>

            <div class="film-vote">
              <span class="film-vote_lable film-vote_lable--orange"
                >${n}</span
              >
              <span>/</span>
              <span class="film-vote_lable">${i}</span>
            </div>
          </li>

          <li class="film-info_item">
            <p class="film-info_lable">Popularity</p>
            <span class="film-info_text">${o}</span>
          </li>

          <li class="film-info_item">
            <p class="film-info_lable">Original Title</p>
            <span class="film-info_text film-info_text--uppercase">
              ${s}
            </span>
          </li>

          <li class="film-info_item">
            <p class="film-info_lable">Genre</p>
            <span class="film-info_text"
              >${c.map(e=>e.name).join(", ")}</span
            >
          </li>
        </ul>

        <div class="film-description">
          <h3 class="film-description_title">About</h3>
          <p class="film-description_text">${d}</p>
        </div>
      </div>

      <ul class="film-button">
        <li class="film-button_item" id="button-add-watch">
          <button
            class="film-button_primary"
            type="button"
            button-add-watch
          >
            Add to Watched
          </button>
        </li>

        <li class="film-button_item">
          <button class="film-button_primary" type="button" button-add-queue>
            Add to Queue
          </button>
        </li>
        <li class="film-button_item">
          <button class="film-button_primary" type="button" button-unselect>
            Unselect
          </button>
        </li>
      </ul>
    </article>
  </div>
`}(e);f.filmModal.insertAdjacentHTML("beforeend",a)}function v(){let e;f.filmModal.classList.remove("is-hidden"),e=window.innerWidth-f.body.offsetWidth+"px",f.body.classList.add("disable-scroll"),f.body.style.paddingRight=e}function h(){f.filmModal.innerHTML=""}function L(){f.filmModal.classList.add("is-hidden"),window.removeEventListener("keydown",_),f.body.classList.remove("disable-scroll"),f.body.style.paddingRight=0,(0,u.updateMoviesGalleryByStatus)("watched",globalCurrentPage),(0,u.updateMoviesGalleryByStatus)("queue",globalCurrentPage)}function _(e){"Escape"===e.code&&L()}function w(){let e=S("watched")||[],t=S("queue")||[],a=e.some(e=>e.id===m.id);t.some(e=>e.id===m.id)&&(0,d.removeSaveQueue)(m),a&&(0,d.removeSaveWatch)(m),M(document.querySelector("[button-add-watch]")),M(document.querySelector("[button-add-queue]"))}function B({target:e}){(0,d.dataSaveQueue)(m),window.location.pathname.includes("my-library")&&(document.querySelector(".watched-btn").classList.contains("active")?(0,u.updateMoviesGalleryByStatus)("watched",globalCurrentPage):(0,u.updateMoviesGalleryByStatus)("queue",globalCurrentPage)),E(e),M(document.querySelector("[button-add-watch]")),M(document.querySelector("[button-unselect]"))}function q({target:e}){(0,d.dataSaveWatch)(m),window.location.pathname.includes("my-library")&&(document.querySelector(".watched-btn").classList.contains("active")?(0,u.updateMoviesGalleryByStatus)("watched",globalCurrentPage):(0,u.updateMoviesGalleryByStatus)("queue",globalCurrentPage)),E(e),M(document.querySelector("[button-add-queue]")),M(document.querySelector("[button-unselect]"))}function S(e){return function(e){let t;try{t=JSON.parse(e)}catch(e){console.log("ERROR: ",e.message),console.log("ERROR CODE: ",e.code)}return t}(localStorage.getItem(e))}function E(e){e.disabled=!0,e.classList.add("is-disabled")}function M(e){e.disabled=!1,e.classList.remove("is-disabled")}f.galleryWatchBox.addEventListener("click",g),f.galleryQueueBox.addEventListener("click",b),f.filmModal.addEventListener("click",function(e){e.currentTarget===e.target&&L()}),window.loadNoPoster=function(e){e.src=t(c)};var u=i("lubd3");i("4qzfL");let x={galleryMyLibraryWatch:document.querySelector(".gallery_watch-block"),galleryMyLibraryQueue:document.querySelector(".gallery_queue-block"),watchedBtn:document.querySelector(".watched-btn"),queueBtn:document.querySelector(".queue-btn"),unselectBtn:document.querySelector(".unselect-btn"),paginationMyLibraryContainer:document.querySelector(".pagination-mylibrary_container"),filmModal:document.querySelector("[data-modal]")};x.galleryMyLibraryWatch.classList.remove("is-hidden"),x.galleryMyLibraryQueue.classList.add("is-hidden"),x.watchedBtn.classList.add("active"),x.queueBtn.classList.remove("active"),(0,u.updateMoviesGalleryByStatus)("watched"),x.watchedBtn.addEventListener("click",function({target:e}){x.galleryMyLibraryWatch.classList.remove("is-hidden"),x.galleryMyLibraryQueue.classList.add("is-hidden"),e.classList.contains("active")||(x.watchedBtn.classList.add("active"),x.queueBtn.classList.remove("active"),(0,u.updateMoviesGalleryByStatus)(e.dataset.status))}),x.queueBtn.addEventListener("click",function({target:e}){x.galleryMyLibraryWatch.classList.add("is-hidden"),x.galleryMyLibraryQueue.classList.remove("is-hidden"),e.classList.contains("active")||(x.watchedBtn.classList.remove("active"),x.queueBtn.classList.add("active"),(0,u.updateMoviesGalleryByStatus)(e.dataset.status))})}();
//# sourceMappingURL=mylibrary.f4dd2f25.js.map
