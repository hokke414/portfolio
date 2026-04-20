// blog data
const articles = [
  {
    title: "ブログ開発しました",
    publishedAt: "2025年10月29日",
    description: "待ちきれず開設いたしました",
    img: "blogs/files/hokke.jpeg",
    tag: "お知らせ",
    link: "blogs/article1.html"
  },
  {
    title: "[Zenn]無知がGoogle App Scriptで学校祭の受付予約サービスを構築してみた話",
    publishedAt: "2025年11月24日",
    description: "ついに初めてZennに記事を投稿しました",
    img: "blogs/files/zenn.jpg",
    tag: "記事",
    link: "blogs/article2.html"
  },
  {
    title: "[Zenn]個人開発で困らない程度までGitを学ぶ",
    publishedAt: "2026年3月7日",
    description: "約5300文字にわたるGit/Githubの使い方をまとめました",
    img: "blogs/files/zenn.jpg",
    tag: "記事",
    link: "blogs/article3.html"
  },
  {
    title: "MRプロジェクトに所属し、Unity開発に取り組みます",
    publishedAt: "2026年4月21日",
    description: "このたび大学のMRプロジェクトに所属させていただきました",
    img: "blogs/files/stacks/UnityLogo.png",
    tag: "お知らせ",
    link: "blogs/article4.html"
  },
  {
    title: "近日公開",
    publishedAt: "準備中",
    description: "",
    img: "blogs/files/noimg.png",
    tag: "その他",
    link: "blogs/article5.html"
  },
  {
    title: "近日公開",
    publishedAt: "準備中",
    description: "",
    img: "blogs/files/noimg.png",
    tag: "その他",
    link: "blogs/article6.html"
  },
  {
    title: "近日公開",
    publishedAt: "準備中",
    description: "",
    img: "blogs/files/noimg.png",
    tag: "その他",
    link: "blogs/article7.html"
  }
];











const articlesPerPage = 15;
let currentPage = 1;
let activeTag = "all";

const THEME_STORAGE_KEY = "portfolio-theme";

function getInitialTheme() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme === "dark" || savedTheme === "light") return savedTheme;

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme) {
  document.body.setAttribute("data-theme", theme);
  localStorage.setItem(THEME_STORAGE_KEY, theme);

  const toggleButton = document.getElementById("theme-toggle");
  if (!toggleButton) return;

  const nextLabel = theme === "dark" ? "ライトモード" : "ダークモード";
  toggleButton.textContent = nextLabel;
  toggleButton.setAttribute("aria-label", `${nextLabel}に切り替える`);
}

function initThemeToggle() {
  const headerContainer = document.querySelector(".header-container");
  if (!headerContainer) return;

  const nav = headerContainer.querySelector("nav");
  if (!nav) return;

  let actions = headerContainer.querySelector(".header-actions");
  if (!actions) {
    actions = document.createElement("div");
    actions.className = "header-actions";
    nav.after(actions);
  }

  if (!actions.contains(nav)) {
    actions.insertBefore(nav, actions.firstChild);
  }

  let toggleButton = document.getElementById("theme-toggle");
  if (!toggleButton) {
    toggleButton = document.createElement("button");
    toggleButton.id = "theme-toggle";
    toggleButton.className = "theme-toggle";
    toggleButton.type = "button";
    actions.appendChild(toggleButton);
  }

  const initialTheme = getInitialTheme();
  applyTheme(initialTheme);

  toggleButton.addEventListener("click", () => {
    const currentTheme = document.body.getAttribute("data-theme") || "light";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
  });
}

function createCardMarkup(article, isArticlePage = false) {
  const imgPrefix = isArticlePage ? "../" : "";
  const safeDescription = article.description || "更新をお待ちください。";

  return `
    <img src="${imgPrefix}${article.img}" alt="${article.title}">
    <h3>${article.title}</h3>
    <p class="card-date">公開日: ${article.publishedAt}</p>
    <p>${safeDescription}</p>
    <span class="tag">${article.tag}</span>
  `;
}

function renderArticles() {
  const filteredArticles = activeTag === "all"
    ? articles
    : articles.filter(article => article.tag === activeTag);

  const start = (currentPage - 1) * articlesPerPage;
  const end = start + articlesPerPage;
  const currentArticles = filteredArticles.slice(start, end);

  const container = document.getElementById("blog-list");
  if (!container) return;

  container.innerHTML = "";
  currentArticles.forEach(article => {
    const card = document.createElement("a");
    card.className = "card";
    card.href = article.link;
    card.innerHTML = createCardMarkup(article);
    container.appendChild(card);
  });

  renderPagination(filteredArticles.length);
}

function renderPagination(totalCount = articles.length) {
  const totalPages = Math.max(1, Math.ceil(totalCount / articlesPerPage));
  const pagination = document.getElementById("pagination");
  if (!pagination) return;
  pagination.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === currentPage) btn.classList.add("active");
    btn.addEventListener("click", () => {
      currentPage = i;
      renderArticles();
    });
    pagination.appendChild(btn);
  }
}

function initTagFilters() {
  const filterContainer = document.getElementById("tag-filters");
  if (!filterContainer) return;

  const buttons = filterContainer.querySelectorAll(".tag-filter-btn");
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      activeTag = button.dataset.tag || "all";
      currentPage = 1;

      buttons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      renderArticles();
    });
  });
}

function renderLatestArticles(limit = 6) {
  const container = document.getElementById("latest-blog-list");
  if (!container) return;

  container.innerHTML = "";
  const latestArticles = [...articles].slice(0, limit);
  latestArticles.forEach(article => {
    const card = document.createElement("a");
    card.className = "card";
    card.href = article.link;
    card.innerHTML = createCardMarkup(article);
    container.appendChild(card);
  });
}

// ==========================
// トップページ用おすすめ表示
// ==========================
function renderRecommendations() {
  const section = document.getElementById("blog");
  if (!section) return;
  const recommendDiv = document.createElement("div");
  recommendDiv.className = "recommend";
  recommendDiv.innerHTML = "<h3>おすすめ記事</h3><div class='card-container'></div>";

  const recommendContainer = recommendDiv.querySelector(".card-container");
  const shuffled = [...articles].sort(() => 0.5 - Math.random());
  shuffled.slice(0, 3).forEach(article => {
    const card = document.createElement("a");
    card.className = "card";
    card.href = article.link;
    card.innerHTML = createCardMarkup(article);
    recommendContainer.appendChild(card);
  });

  section.appendChild(recommendDiv);
}

// ==========================
// 各記事ページ用おすすめ表示
// ==========================
function renderRecommendationsForArticle(currentFile) {
  const area = document.getElementById("recommend-area");
  if (!area) return;

  const recommendDiv = document.createElement("div");
  recommendDiv.className = "recommend";
  recommendDiv.innerHTML = "<h3>おすすめ記事</h3><div class='card-container'></div>";

  const recommendContainer = recommendDiv.querySelector(".card-container");

  const filtered = articles.filter(a => !a.link.endsWith(currentFile));
  const shuffled = [...filtered].sort(() => 0.5 - Math.random());

  shuffled.slice(0, 3).forEach(article => {
    const card = document.createElement("a");
    card.className = "card";
    card.href = "../" + article.link;
    card.innerHTML = createCardMarkup(article, true);
    recommendContainer.appendChild(card);
  });

  area.appendChild(recommendDiv);
}

// ==========================
// 初期表示（index.html限定）
// ==========================
initThemeToggle();
initTagFilters();
renderArticles();
renderLatestArticles();

if (document.getElementById("blog")) {
  renderRecommendations();
}
