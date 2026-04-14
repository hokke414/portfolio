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
    tag: "ブログ",
    link: "blogs/article2.html"
  },
  {
    title: "[Zenn]個人開発で困らない程度までGitを学ぶ",
    publishedAt: "2026年3月7日",
    description: "約5300文字にわたるGit/Githubの使い方をまとめました",
    img: "blogs/files/zenn.jpg",
    tag: "ブログ",
    link: "blogs/article3.html"
  },
  {
    title: "[Zenn][個人開発記録#0]開発目標の決定と環境構築",
    publishedAt: "2026年3月21日",
    description: "個人開発開始のお知らせと環境構築",
    img: "blogs/files/zenn.jpg",
    tag: "ブログ",
    link: "blogs/article4.html"
  },
  {
    title: "近日公開",
    publishedAt: "準備中",
    description: "",
    img: "blogs/files/noimg.png",
    tag: "開発",
    link: "blogs/article5.html"
  },
  {
    title: "近日公開",
    publishedAt: "準備中",
    description: "",
    img: "blogs/files/noimg.png",
    tag: "開発",
    link: "blogs/article6.html"
  },
  {
    title: "近日公開",
    publishedAt: "準備中",
    description: "",
    img: "blogs/files/noimg.png",
    tag: "開発",
    link: "blogs/article7.html"
  }
];











const articlesPerPage = 6;
let currentPage = 1;

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
  const start = (currentPage - 1) * articlesPerPage;
  const end = start + articlesPerPage;
  const currentArticles = articles.slice(start, end);

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

  renderPagination();
}

function renderPagination() {
  const totalPages = Math.ceil(articles.length / articlesPerPage);
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
renderArticles();
renderRecommendations();
