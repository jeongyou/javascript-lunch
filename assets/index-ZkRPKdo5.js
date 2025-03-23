(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const CATEGORY = {
  label: "카테고리",
  name: "category",
  lists: /* @__PURE__ */ new Map([
    ["KOREAN", "한식"],
    ["CHINESE", "중식"],
    ["JAPANESE", "일식"],
    ["WESTERN", "양식"],
    ["ASIAN", "아시안"],
    ["ETC", "기타"]
  ])
};
const DISTANCE = {
  label: "거리(도보 이동 시간)",
  name: "distance",
  lists: /* @__PURE__ */ new Map([
    ["FIVE_MIN", "5분 내"],
    ["TEN_MIN", "10분 내"],
    ["FIFTEEN_MIN", "15분 내"],
    ["TWENTY_MIN", "20분 내"],
    ["THIRTY_MIN", "30분 내"]
  ])
};
const NAME = {
  label: "이름",
  name: "name",
  helpText: "",
  required: true,
  type: "text"
};
const LINK = {
  label: "참고 링크",
  name: "link",
  helpText: "매장 정보를 확인할 수 있는 링크를 입력해 주세요.",
  required: false,
  type: "url"
};
const DESCRIPTION = {
  label: "설명",
  name: "description",
  helpText: "메뉴 등 추가 정보를 입력해 주세요."
};
const CANCEL_BUTTON = {
  type: "button",
  className: "button--secondary",
  content: "취소하기"
};
const ADD_BUTTON = {
  type: "submit",
  className: "button--primary",
  content: "추가하기"
};
const DELETE_BUTTON = {
  type: "button",
  className: "delete-button button--secondary",
  content: "삭제하기"
};
const CLOSE_BUTTON = {
  type: "button",
  className: "close-button button--primary",
  content: "닫기"
};
const IMAGE = /* @__PURE__ */ new Map([
  ["한식", "category-korean.png"],
  ["중식", "category-chinese.png"],
  ["일식", "category-japanese.png"],
  ["양식", "category-western.png"],
  ["아시안", "category-asian.png"],
  ["기타", "category-etc.png"]
]);
const FAV_STAR = {
  className: "favorite-star",
  activeSrc: "favorite-icon-filled.png",
  inactiveSrc: "favorite-icon-lined.png"
};
const CATEGORY_FILTER_SELECT = {
  name: "category",
  id: "category-filter",
  class: "restaurant-filter",
  options: ["전체", "한식", "중식", "일식", "양식", "아시안", "기타"]
};
const SORTING_FILTER_SELECT = {
  name: "sorting",
  id: "sorting-filter",
  class: "restaurant-filter",
  options: ["이름순", "거리순"]
};
const ALL_RESTAURANT_TAB = {
  class: "tab",
  active: true,
  dataTab: "all",
  text: "모든 음식점"
};
const FAVORITE_RESTAURANT_TAB = {
  class: "tab",
  active: false,
  dataTab: "favorites",
  text: "자주 가는 음식점"
};
const initialState = {
  id: 7,
  category: "",
  name: "",
  distance: 0,
  description: "",
  link: "",
  isFavorite: false
};
const stateStore = {
  state: { ...initialState },
  updateState(newState) {
    this.state = newState;
  },
  initState() {
    this.state = { ...initialState };
  },
  getState() {
    return { ...this.state };
  }
};
const RESTAURANTS = [
  {
    id: 1,
    category: `${CATEGORY.lists.get("KOREAN")}`,
    name: "피양콩할마니",
    distance: 10,
    description: "평양 출신의 할머니가 수십 년간 운영해온 비지 전문점 피양콩 할마니. 두부를 빼지 않은 되비지를 맛볼 수 있는 곳으로, ‘피양’은 평안도 사투리로 ‘평양’을 의미한다. 딸과 함께 운영하는 이곳에선 맷돌로 직접 간 콩만을 사용하며, 일체의 조건강식을 선보인다. 콩비이곳의 대표메뉴지만, 할머니가 옛날만들어내는 비지전골 또한느낄 수 있는 특별한메뉴다. 반찬은 손님들이덜어 먹을 수 있게 준비돼 있다.",
    link: "",
    isFavorite: false
  },
  {
    id: 2,
    category: `${CATEGORY.lists.get("CHINESE")}`,
    name: "친친",
    distance: 5,
    description: "Since 2004 편리한 교통과 주차, 그리고 관록만큼 깊은 맛과 정성으로 정통 중식의 세계를 펼쳐갑니다",
    link: "",
    isFavorite: false
  },
  {
    id: 3,
    category: `${CATEGORY.lists.get("JAPANESE")}`,
    name: "잇쇼우",
    distance: 10,
    description: "잇쇼우는 정통 자가제면 사누끼 우동이 대표메뉴입니다. 기술은 정성을 이길 수 없다는 신념으로 모든 음식에 최선을 다하는 잇쇼우는 고객 한분 한분께 최선을 다하겠습니다",
    link: "",
    isFavorite: false
  },
  {
    id: 4,
    category: `${CATEGORY.lists.get("WESTERN")}`,
    name: "이태리키친",
    distance: 20,
    description: "늘 변화를 추구하는 이태리키친입니다.",
    link: "",
    isFavorite: false
  },
  {
    id: 5,
    category: `${CATEGORY.lists.get("ASIAN")}`,
    name: "호아빈 삼성점",
    distance: 15,
    description: "푸짐한 양에 국물이 일품인 쌀국수",
    link: "",
    isFavorite: false
  },
  {
    id: 6,
    category: `${CATEGORY.lists.get("ETC")}`,
    name: "도스타코스 선릉점",
    distance: 5,
    description: "멕시칸 캐주얼 그릴",
    link: "",
    isFavorite: false
  }
];
const restaurantStore = initRestaurantStore();
function addRestaurant(newRestaurant) {
  restaurantStore.push(newRestaurant);
  localStorage.setItem("restaurantStore", JSON.stringify(restaurantStore));
}
function getNextRestaurantId() {
  return restaurantStore.length > 0 ? Math.max(...restaurantStore.map((item) => item.id)) + 1 : 1;
}
function loadRestaurants() {
  const data = localStorage.getItem("restaurantStore");
  if (data) {
    return JSON.parse(data);
  }
  return [];
}
function initRestaurantStore() {
  const stored = loadRestaurants();
  if (stored.length > 0) {
    return stored;
  }
  localStorage.setItem("restaurantStore", JSON.stringify([...RESTAURANTS]));
  return [...RESTAURANTS];
}
function deleteRestaurant(restaurantId) {
  const updatedStore = restaurantStore.filter((restaurant) => restaurant.id !== restaurantId);
  restaurantStore.length = 0;
  restaurantStore.push(...updatedStore);
  localStorage.setItem("restaurantStore", JSON.stringify(restaurantStore));
}
function createFavoriteStar(fieldName) {
  const dataIdAttr = fieldName.dataId ? `data-id="${fieldName.dataId}"` : "";
  const favoriteStar = `<img src="${fieldName.inactiveSrc}" class="${fieldName.className}" ${dataIdAttr} alt="자주 가는 음식점 아이콘">`;
  return favoriteStar;
}
function createRestaurantItem({ id, category, name, distance, description, link, isFavorite }) {
  const favoriteStarConfig = {
    ...FAV_STAR,
    inactiveSrc: isFavorite ? FAV_STAR.activeSrc : FAV_STAR.inactiveSrc,
    dataId: id
  };
  const item = `<li class="restaurant" data-id="${id}">
              <div class="restaurant__category">
                <img src="${IMAGE.get(category)}" alt="${category}" class="category-icon" />
              </div>
              <div class="restaurant__info">
                <div class="titleStar__box">
                  <div class="title__box">
                    <h3 class="restaurant__name text-subtitle">${name}</h3>
                    <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
                  </div>
                  ${createFavoriteStar(favoriteStarConfig)}
                </div>
                <p class="restaurant__description text-body">
                  ${description}
                  </p>
                  <a href="${link}" class="restaurant__link">${link}</a>
              </div>
            </li>`;
  return item;
}
function reRenderRestaurantList(data) {
  const ul = document.querySelector(".restaurant-list");
  if (!ul) return;
  ul.innerHTML = data.map((restaurant) => createRestaurantItem(restaurant)).join("");
}
function filterByCategory(category) {
  if (category === "전체") {
    return restaurantStore;
  }
  return restaurantStore.filter((restaurant) => restaurant.category === category);
}
function sortByCondition(data, sorting) {
  if (sorting === "이름순") {
    return [...data].sort((a, b) => {
      const cmp = a.name.localeCompare(b.name);
      if (cmp !== 0) return cmp;
      return a.distance - b.distance;
    });
  }
  if (sorting === "거리순") {
    return [...data].sort((a, b) => {
      if (a.distance !== b.distance) return a.distance - b.distance;
      return a.name.localeCompare(b.name);
    });
  }
  return data;
}
function applyFilters() {
  const categoryFilter = document.getElementById("category-filter");
  const sortingFilter = document.getElementById("sorting-filter");
  const currentCategory = categoryFilter ? categoryFilter.value : "전체";
  const currentSorting = sortingFilter ? sortingFilter.value : "이름순";
  const filteredRestaurants = filterByCategory(currentCategory);
  const sortedRestaurants = sortByCondition(filteredRestaurants, currentSorting);
  reRenderRestaurantList(sortedRestaurants);
}
function registerCategoryFilter() {
  const categoryFilter = document.getElementById("category-filter");
  if (!categoryFilter) return;
  categoryFilter.addEventListener("change", applyFilters);
}
function registerSortingFilter() {
  const sortingFilter = document.getElementById("sorting-filter");
  if (!sortingFilter) return;
  sortingFilter.addEventListener("change", applyFilters);
}
function updateRestaurantListBasedOnActiveTab() {
  const activeTab = document.querySelector(".tab.active");
  const categoryFilter = document.getElementById("category-filter");
  const sortingFilter = document.getElementById("sorting-filter");
  const currentCategory = categoryFilter ? categoryFilter.value : "전체";
  const currentSorting = sortingFilter ? sortingFilter.value : "이름순";
  const filteredRestaurants = filterByCategory(currentCategory);
  const sortedRestaurants = sortByCondition(filteredRestaurants, currentSorting);
  if (activeTab && activeTab.id === "favorites") {
    const favorites = sortedRestaurants.filter((restaurant) => restaurant.isFavorite);
    localStorage.setItem("restaurantStore", JSON.stringify(restaurantStore));
    reRenderRestaurantList(favorites);
    return;
  }
  localStorage.setItem("restaurantStore", JSON.stringify(restaurantStore));
  reRenderRestaurantList(sortedRestaurants);
}
function handleOpenModal() {
  const modal = document.querySelector(".modal");
  if (!modal) return;
  modal.classList.add("modal--open");
}
function handleCloseModal(event) {
  const target = event.target;
  const modal = target.closest(".modal");
  resetFormAndState();
  if (!modal) return;
  modal.classList.remove("modal--open");
}
function handleEscKey(event) {
  if (event.key !== "Escape") return;
  const openModals = document.querySelectorAll(".modal.modal--open");
  openModals.forEach((modal) => {
    modal.classList.remove("modal--open");
  });
  resetFormAndState();
}
function handleNewRestaurantSubmit(event, addNewRestaurantItem2) {
  event.preventDefault();
  const categoryElement = document.querySelector("#category");
  const nameElement = document.querySelector("#name");
  const distanceElement = document.querySelector("#distance");
  const descriptionElement = document.querySelector("#description");
  const linkElement = document.querySelector("#link");
  if (categoryElement instanceof HTMLSelectElement && nameElement instanceof HTMLInputElement && distanceElement instanceof HTMLSelectElement && descriptionElement instanceof HTMLTextAreaElement && linkElement instanceof HTMLInputElement) {
    const newRestaurantData = {
      id: getNextRestaurantId(),
      category: categoryElement.value,
      name: nameElement.value,
      distance: Number(distanceElement.value.replace("분 내", "")),
      description: descriptionElement.value,
      link: linkElement.value,
      isFavorite: false
    };
    addRestaurant(newRestaurantData);
    stateStore.updateState(newRestaurantData);
    addNewRestaurantItem2();
    handleCloseModal(event);
    updateRestaurantListBasedOnActiveTab();
  }
}
function resetForm() {
  const form = document.querySelector("#new-restaurant-form");
  if (form instanceof HTMLFormElement) {
    form.reset();
  }
}
function resetState() {
  stateStore.initState();
}
function resetFormAndState() {
  resetForm();
  resetState();
}
function handleStarToggle(event) {
  const target = event.target;
  if (!(target instanceof HTMLImageElement)) return;
  const restaurantId = target.getAttribute("data-id");
  if (!restaurantId) return;
  const idNumber = Number(restaurantId);
  const restaurant = restaurantStore.find((item) => item.id === idNumber);
  if (!restaurant) return;
  restaurant.isFavorite = !restaurant.isFavorite;
  const newSrc = restaurant.isFavorite ? "favorite-icon-filled.png" : "favorite-icon-lined.png";
  target.src = newSrc;
  const mainIcon = document.querySelector(`.restaurant[data-id="${restaurantId}"] .favorite-star`);
  if (mainIcon && mainIcon !== target && mainIcon instanceof HTMLImageElement) {
    mainIcon.src = newSrc;
  }
  const modalIcon = document.querySelector(`.modal .favorite-star[data-id="${restaurantId}"]`);
  if (modalIcon && modalIcon !== target && modalIcon instanceof HTMLImageElement) {
    modalIcon.src = newSrc;
  }
  updateRestaurantListBasedOnActiveTab();
}
function handleRestaurantClick(event, openModal) {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  const target = event.target;
  const restaurantItem = target.closest(".restaurant");
  if (!restaurantItem) return;
  const restaurantId = Number(restaurantItem.getAttribute("data-id") ?? 0);
  const altValue = ((_a = restaurantItem.querySelector(".category-icon")) == null ? void 0 : _a.getAttribute("alt")) ?? "";
  const restaurantName = ((_b = restaurantItem.querySelector(".restaurant__name")) == null ? void 0 : _b.textContent) ?? "";
  const restaurantDistance = ((_c = restaurantItem.querySelector(".restaurant__distance")) == null ? void 0 : _c.textContent) ?? "";
  const numericValue = ((_d = restaurantDistance.match(/\d+/)) == null ? void 0 : _d[0]) ?? "";
  const restaurantDescription = ((_e = restaurantItem.querySelector(".restaurant__description")) == null ? void 0 : _e.textContent) ?? "";
  const restaurantImage = ((_f = restaurantItem.querySelector(".category-icon")) == null ? void 0 : _f.getAttribute("src")) ?? "";
  const favoriteStar = restaurantItem.querySelector(".favorite-star");
  const isFavorite = ((_g = favoriteStar == null ? void 0 : favoriteStar.getAttribute("src")) == null ? void 0 : _g.includes("favorite-icon-filled.png")) ?? false;
  const restaurantLink = ((_h = restaurantItem.querySelector(".restaurant__link")) == null ? void 0 : _h.getAttribute("href")) ?? "";
  openModal({
    id: restaurantId,
    category: altValue,
    name: restaurantName,
    distance: numericValue,
    description: restaurantDescription,
    image: restaurantImage,
    isFavorite,
    link: restaurantLink
  });
  const closeBtn = document.querySelector(".close-button");
  if (closeBtn) {
    closeBtn.addEventListener("click", handleCloseModal);
  }
  const deleteBtn = document.querySelector(".delete-button");
  if (deleteBtn) {
    deleteBtn.addEventListener("click", (event2) => handleRestaurantDelete(restaurantId, event2));
  }
}
function handleRestaurantDelete(restaurantId, event) {
  deleteRestaurant(restaurantId);
  updateRestaurantListBasedOnActiveTab();
  handleCloseModal(event);
}
let formSubmitHandler;
function registerEventHandlers(addNewRestaurantItem2, openRestaurantModal2) {
  const gnbButton = document.querySelector(".gnb__button");
  const closeButton = document.querySelector(".button--secondary");
  const modalBackdrop = document.querySelectorAll(".modal-backdrop");
  const form = document.querySelector("#new-restaurant-form");
  if (!gnbButton || !closeButton || !modalBackdrop || !(form instanceof HTMLFormElement)) return;
  gnbButton.addEventListener("click", handleOpenModal);
  closeButton.addEventListener("click", handleCloseModal);
  modalBackdrop.forEach((backdrop) => backdrop.addEventListener("click", handleCloseModal));
  document.addEventListener("keydown", handleEscKey);
  formSubmitHandler = (event) => handleNewRestaurantSubmit(event, addNewRestaurantItem2);
  form.addEventListener("submit", formSubmitHandler);
  const restaurantList = document.querySelector(".restaurant-list");
  if (restaurantList) {
    restaurantList.addEventListener("click", (event) => {
      const target = event.target;
      if (target.classList.contains("favorite-star")) {
        handleStarToggle(event);
        return;
      }
      const restaurantItem = target.closest(".restaurant");
      if (restaurantItem) {
        handleRestaurantClick(event, openRestaurantModal2);
      }
    });
  }
}
function removeEventHandlers() {
  const gnbButton = document.querySelector(".gnb__button");
  const closeButton = document.querySelector(".button--secondary");
  const modalBackdrop = document.querySelector(".modal-backdrop");
  const form = document.querySelector("#new-restaurant-form");
  if (!gnbButton || !closeButton || !modalBackdrop || !(form instanceof HTMLFormElement)) return;
  gnbButton.removeEventListener("click", handleOpenModal);
  closeButton.removeEventListener("click", handleCloseModal);
  modalBackdrop.removeEventListener("click", handleCloseModal);
  document.removeEventListener("keydown", handleEscKey);
  form.removeEventListener("submit", formSubmitHandler);
}
const eventHandlers = {
  registerEventHandlers,
  removeEventHandlers
};
function createButton(fieldName) {
  const button = `<button type="${fieldName.type}" class="button ${fieldName.className} text-caption">${fieldName.content}</button>`;
  return button;
}
function createHeader({ title }) {
  const header = document.createElement("header");
  header.innerHTML = `<h1 class="gnb__title text-title">${title}</h1>
    <button type="button" class="gnb__button" aria-label="음식점 추가">
      <img src="./add-button.png" alt="음식점 추가" />
    </button>`;
  header.classList.add("gnb");
  return header;
}
function createInput(fieldName) {
  const input = `<div class="form-item ${fieldName.required ? "form-item--required" : ""}">
    <label for="${fieldName.name}" class="text-caption">${fieldName.label}</label>
    <input type="${fieldName.type}" name="${fieldName.name}" id="${fieldName.name}" ${fieldName.required ? "required" : ""}>
    <span class="help-text text-caption">${fieldName.helpText}</span>
  </div>`;
  return input;
}
function createModal(type) {
  const templateId = type === "new-restaurant" ? "#new-restaurant-modal-template" : "#restaurant-detail-modal-template";
  const template = document.querySelector(templateId);
  return template.content.cloneNode(true);
}
function createSelect(fieldName) {
  const select = `<div class="form-item form-item--required">
    <label for="${fieldName.name}" class="text-caption">${fieldName.label}</label>
    <select name="${fieldName.name}" id="${fieldName.name}" required>
      <option value="">선택해 주세요</option>
      ${Array.from(fieldName.lists.values()).map((list) => {
    return `<option value="${list}">${list}</option>`;
  })}
    </select>
  </div>`;
  return select;
}
function createTextarea(fieldName) {
  const textarea = `<div class="form-item">
      <label for="${fieldName.name}" class="text-caption">${fieldName.label}</label>
      <textarea name="${fieldName.name}" id="${fieldName.name}" cols="30" rows="5"></textarea>
      <span class="help-text text-caption">${fieldName.helpText}</span>
    </div>`;
  return textarea;
}
function createMultiSelect(fieldName) {
  const multiSelect = `<select name="${fieldName.name}" id="${fieldName.id}" class="${fieldName.class}">
${fieldName.options.map((option) => {
    return `<option value="${option}">${option}</option>`;
  }).join("")}
          </select>`;
  return multiSelect;
}
function createFilterTab(fieldName) {
  const filterTab = `<div class="${fieldName.class} ${fieldName.active ? "active" : ""}" id="${fieldName.dataTab}">${fieldName.text}</div>`;
  return filterTab;
}
function createModalContent({ id, category, name, distance, description, image, isFavorite, link }) {
  return `
    <div class="modal-header restaurant__detail">
      ${createRestaurantItem({ id, category, name, distance, description, link, isFavorite })}
    </div>
  `;
}
function registerFilterTabClick() {
  const tabs = document.querySelectorAll(".tab");
  if (!tabs) return;
  tabs.forEach((tab) => {
    tab.addEventListener("click", (event) => {
      const target = event.currentTarget;
      tabs.forEach((t) => t.classList.remove("active"));
      target.classList.add("active");
      if (target.id === "all") {
        showCategoryFilterSelect();
        updateRestaurantListBasedOnActiveTab();
        return;
      }
      hideCategoryFilterSelect();
      updateRestaurantListBasedOnActiveTab();
    });
  });
}
function showCategoryFilterSelect() {
  const filterContainer = document.querySelector(".restaurant-filter-container");
  if (!filterContainer) return;
  filterContainer.textContent = "";
  filterContainer.insertAdjacentHTML("beforeend", createMultiSelect(CATEGORY_FILTER_SELECT));
  filterContainer.insertAdjacentHTML("beforeend", createMultiSelect(SORTING_FILTER_SELECT));
  registerCategoryFilter();
  registerSortingFilter();
}
function hideCategoryFilterSelect() {
  const filterContainer = document.querySelector(".restaurant-filter-container");
  if (!filterContainer) return;
  filterContainer.textContent = "";
}
addEventListener("load", () => {
  appendHeader();
  initRestaurantItems();
  appendModal();
  appendModalContents();
  appendCategoryFilterSelect(CATEGORY_FILTER_SELECT);
  appendCategoryFilterSelect(SORTING_FILTER_SELECT);
  appendFilterTab(ALL_RESTAURANT_TAB);
  appendFilterTab(FAVORITE_RESTAURANT_TAB);
  const nameInputElement = document.querySelector("#name");
  if (nameInputElement instanceof HTMLInputElement) {
    setRequired(nameInputElement);
  }
  eventHandlers.registerEventHandlers(addNewRestaurantItem, openRestaurantModal);
  registerCategoryFilter();
  registerSortingFilter();
  registerFilterTabClick();
});
function appendHeader() {
  const app = document.querySelector("#app");
  if (!app) return;
  const header = createHeader({ title: "점심 뭐 먹지" });
  app.prepend(header);
}
function addNewRestaurantItem() {
  applyFilters();
}
function setRequired(element) {
  element.required = true;
}
function appendModal() {
  const main = document.querySelector("main");
  if (!main) return;
  const newRestaurantModal = createModal("new-restaurant");
  if (newRestaurantModal) main.appendChild(newRestaurantModal);
  const restaurantDetailModal = createModal("restaurant-detail");
  if (restaurantDetailModal) main.appendChild(restaurantDetailModal);
}
function appendModalContents() {
  const form = document.querySelector("#new-restaurant-form");
  if (!(form instanceof HTMLFormElement)) return;
  const categorySelect = createSelect(CATEGORY);
  const nameInput = createInput(NAME);
  const distanceSelect = createSelect(DISTANCE);
  const descriptionTextarea = createTextarea(DESCRIPTION);
  const linkInput = createInput(LINK);
  form.insertAdjacentHTML("beforeend", categorySelect);
  form.insertAdjacentHTML("beforeend", nameInput);
  form.insertAdjacentHTML("beforeend", distanceSelect);
  form.insertAdjacentHTML("beforeend", descriptionTextarea);
  form.insertAdjacentHTML("beforeend", linkInput);
  appendModalButton(form);
}
function appendModalButton(form) {
  const buttonDiv = document.createElement("div");
  buttonDiv.classList.add("button-container");
  form.appendChild(buttonDiv);
  const addButton = createButton(ADD_BUTTON);
  const cancelButton = createButton(CANCEL_BUTTON);
  const buttonContainer = document.querySelector(".button-container");
  if (!buttonContainer) return;
  buttonContainer.insertAdjacentHTML("beforeend", cancelButton);
  buttonContainer.insertAdjacentHTML("beforeend", addButton);
}
function initRestaurantItems() {
  applyFilters();
}
function appendCategoryFilterSelect(fieldName) {
  const filterContainer = document.querySelector(".restaurant-filter-container");
  if (!filterContainer) return;
  const categoryFilterSelect = createMultiSelect(fieldName);
  filterContainer.insertAdjacentHTML("beforeend", categoryFilterSelect);
}
function appendFilterTab(fieldName) {
  const tabContainer = document.querySelector(".tab-container");
  if (!tabContainer) return;
  const tab = createFilterTab(fieldName);
  tabContainer.insertAdjacentHTML("beforeend", tab);
}
function openRestaurantModal({
  id,
  category,
  name,
  distance,
  description,
  image,
  isFavorite,
  link
}) {
  const modal = document.querySelector(".restaurant-detail-modal");
  const modalContent = modal == null ? void 0 : modal.querySelector("#restaurant-detail-content");
  if (!modal || !modalContent) return;
  const restaurantModalContent = createModalContent({
    id,
    category,
    name,
    distance,
    description,
    image,
    isFavorite,
    link
  });
  modalContent.innerHTML = restaurantModalContent;
  appendRestaurantDetailModalButton(modalContent);
  const modalStar = modalContent.querySelector(".favorite-star");
  if (modalStar) {
    modalStar.addEventListener("click", handleStarToggle);
  }
  modal.classList.add("modal--open");
}
function appendRestaurantDetailModalButton(modalContent) {
  const buttonDiv = document.createElement("div");
  buttonDiv.classList.add("button-container");
  modalContent.appendChild(buttonDiv);
  const deleteButton = createButton(DELETE_BUTTON);
  const closeButton = createButton(CLOSE_BUTTON);
  buttonDiv.insertAdjacentHTML("beforeend", deleteButton);
  buttonDiv.insertAdjacentHTML("beforeend", closeButton);
}
