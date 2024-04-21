function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},a={},l={},n=t.parcelRequire2fd9;null==n&&((n=function(e){if(e in a)return a[e].exports;if(e in l){var t=l[e];delete l[e];var n={id:e,exports:{}};return a[e]=n,t.call(n.exports,n,n.exports),n.exports}var i=Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){l[e]=t},t.parcelRequire2fd9=n);var i=n.register;i("kyEFX",function(e,t){Object.defineProperty(e.exports,"register",{get:function(){return a},set:function(e){return a=e},enumerable:!0,configurable:!0});var a,l=new Map;a=function(e,t){for(var a=0;a<t.length-1;a+=2)l.set(t[a],{baseUrl:e,path:t[a+1]})}}),i("5WK3d",function(e,t){e.exports=new URL("film-image-desktop.f135d06e.jpg",import.meta.url).toString()}),i("kc5yK",function(e,t){e.exports=new URL("symbol-defs.ee796a2b.svg",import.meta.url).toString()}),n("kyEFX").register(new URL("",import.meta.url).toString(),JSON.parse('["6EVkV","mylibrary.0c038fa5.js","dTa8I","film-image-desktop.f135d06e.jpg","f0tFQ","symbol-defs.ee796a2b.svg","3zSZI","mylibrary.d624f0e7.js","bi1um","mylibrary.runtime.da1ab012.js"]')),n("d2y5i");var o=n("fSK0k"),s=n("5WK3d"),c=n("kc5yK"),d=n("ixU3C");n("dSs1Y");var r=n("rLtvl");const u={galleryWatchBox:document.querySelector(".gallery_watch-box"),filmModal:document.querySelector("[data-modal]"),body:document.querySelector("body"),galleryQueueBox:document.querySelector(".gallery_queue-box")};let m={};const y=[];async function f(e){if(e.target.classList.contains("gallery_queue-box"))return;let t=Number(e.target.closest(".card").id),a=y.find(e=>e.id===t);if(a)m=a;else{try{m=await (0,o.fetchFilmDetailsById)(t)}catch(e){console.log(e.message),console.log(e.code)}y.push(m)}v(),g(m);let l={closeBtn:document.querySelector("[button-modal-close]"),addQueueBtn:document.querySelector("[button-add-queue]"),addWatchBtn:document.querySelector("[button-add-watch]"),unselectBtn:document.querySelector("[button-unselect]")};E(l.unselectBtn),l.closeBtn.addEventListener("click",h),l.addQueueBtn.addEventListener("click",_),l.addWatchBtn.addEventListener("click",w),l.unselectBtn.addEventListener("click",S);let n=q("watched")||[],i=q("queue")||[],s=n.some(e=>e.id===m.id);i.some(e=>e.id===m.id)&&B(l.addQueueBtn),s&&B(l.addWatchBtn),p(),window.addEventListener("keydown",L)}async function b(e){if(e.target.classList.contains("gallery_fetch-box"))return;let t=Number(e.target.closest(".card").id),a=y.find(e=>e.id===t);if(a)m=a;else{try{m=await (0,o.fetchFilmDetailsById)(t)}catch(e){console.log(e.message),console.log(e.code)}y.push(m)}v(),g(m);let l={closeBtn:document.querySelector("[button-modal-close]"),addQueueBtn:document.querySelector("[button-add-queue]"),addWatchBtn:document.querySelector("[button-add-watch]"),unselectBtn:document.querySelector("[button-unselect]")};E(l.unselectBtn),l.closeBtn.addEventListener("click",h),l.addQueueBtn.addEventListener("click",_),l.addWatchBtn.addEventListener("click",w),l.unselectBtn.addEventListener("click",S);let n=q("watched")||[],i=q("queue")||[],s=n.some(e=>e.id===m.id);i.some(e=>e.id===m.id)&&B(l.addQueueBtn),s&&B(l.addWatchBtn),p(),window.addEventListener("keydown",L)}function g(t){let a=function(t){let{poster_path:a,title:l,vote_average:n,vote_count:i,popularity:o,original_title:s,genres:d,overview:r}=t,u=`https://image.tmdb.org/t/p/w500${a}`;return`
  <div class="film-modal">
    <button class="button-close" type="button" button-modal-close>
      <svg class="icon-close">
        <use href="${e(c)}#icon-close"></use>
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
              >${d.map(e=>e.name).join(", ")}</span
            >
          </li>
        </ul>

        <div class="film-description">
          <h3 class="film-description_title">About</h3>
          <p class="film-description_text">${r}</p>
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
`}(t);u.filmModal.insertAdjacentHTML("beforeend",a)}function p(){let e;u.filmModal.classList.remove("is-hidden"),e=window.innerWidth-u.body.offsetWidth+"px",u.body.classList.add("disable-scroll"),u.body.style.paddingRight=e}function v(){u.filmModal.innerHTML=""}function h(){u.filmModal.classList.add("is-hidden"),window.removeEventListener("keydown",L),u.body.classList.remove("disable-scroll"),u.body.style.paddingRight=0,(0,r.updateMoviesGalleryByStatus)("watched",globalCurrentPage),(0,r.updateMoviesGalleryByStatus)("queue",globalCurrentPage)}function L(e){"Escape"===e.code&&h()}function S(){let e=q("watched")||[],t=q("queue")||[],a=e.some(e=>e.id===m.id);t.some(e=>e.id===m.id)&&(0,d.removeSaveQueue)(m),a&&(0,d.removeSaveWatch)(m),E(document.querySelector("[button-add-watch]")),E(document.querySelector("[button-add-queue]"))}function _({target:e}){(0,d.dataSaveQueue)(m),window.location.pathname.includes("my-library")&&(document.querySelector(".watched-btn").classList.contains("active")?(0,r.updateMoviesGalleryByStatus)("watched",globalCurrentPage):(0,r.updateMoviesGalleryByStatus)("queue",globalCurrentPage)),B(e),E(document.querySelector("[button-add-watch]")),E(document.querySelector("[button-unselect]"))}function w({target:e}){(0,d.dataSaveWatch)(m),window.location.pathname.includes("my-library")&&(document.querySelector(".watched-btn").classList.contains("active")?(0,r.updateMoviesGalleryByStatus)("watched",globalCurrentPage):(0,r.updateMoviesGalleryByStatus)("queue",globalCurrentPage)),B(e),E(document.querySelector("[button-add-queue]")),E(document.querySelector("[button-unselect]"))}function q(e){return function(e){let t;try{t=JSON.parse(e)}catch(e){console.log("ERROR: ",e.message),console.log("ERROR CODE: ",e.code)}return t}(localStorage.getItem(e))}function B(e){e.disabled=!0,e.classList.add("is-disabled")}function E(e){e.disabled=!1,e.classList.remove("is-disabled")}u.galleryWatchBox.addEventListener("click",b),u.galleryQueueBox.addEventListener("click",f),u.filmModal.addEventListener("click",function(e){e.currentTarget===e.target&&h()}),window.loadNoPoster=function(t){t.src=e(s)};var r=n("rLtvl");n("4eEc7");const M={galleryMyLibraryWatch:document.querySelector(".gallery_watch-block"),galleryMyLibraryQueue:document.querySelector(".gallery_queue-block"),watchedBtn:document.querySelector(".watched-btn"),queueBtn:document.querySelector(".queue-btn"),unselectBtn:document.querySelector(".unselect-btn"),paginationMyLibraryContainer:document.querySelector(".pagination-mylibrary_container"),filmModal:document.querySelector("[data-modal]")};M.galleryMyLibraryWatch.classList.remove("is-hidden"),M.galleryMyLibraryQueue.classList.add("is-hidden"),M.watchedBtn.classList.add("active"),M.queueBtn.classList.remove("active"),(0,r.updateMoviesGalleryByStatus)("watched"),M.watchedBtn.addEventListener("click",function({target:e}){M.galleryMyLibraryWatch.classList.remove("is-hidden"),M.galleryMyLibraryQueue.classList.add("is-hidden"),e.classList.contains("active")||(M.watchedBtn.classList.add("active"),M.queueBtn.classList.remove("active"),(0,r.updateMoviesGalleryByStatus)(e.dataset.status))}),M.queueBtn.addEventListener("click",function({target:e}){M.galleryMyLibraryWatch.classList.add("is-hidden"),M.galleryMyLibraryQueue.classList.remove("is-hidden"),e.classList.contains("active")||(M.watchedBtn.classList.remove("active"),M.queueBtn.classList.add("active"),(0,r.updateMoviesGalleryByStatus)(e.dataset.status))});
//# sourceMappingURL=mylibrary.0c038fa5.js.map
