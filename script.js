// blog data
const articles = [
  {
    title: "初めてのWeb開発体験",
    description: "Unityとの違いを感じた日...",
    img: "images/post1.jpg",
    tag: "お知らせ",
    link: "blog/article1.html"
  },
  {
    title: "近日公開",
    description: "",
    img: "blogs/files/noimage.png",
    tag: "開発",
    link: "blogs/article2.html"
  },
  {
    title: "近日公開",
    description: "",
    img: "blogs/files/noimage.png",
    tag: "開発",
    link: "blog/article3.html"
  },
  {
    title: "近日公開",
    description: "両者の開発思想の差とは？",
    img: "blogs/files/noimage.png",
    tag: "開発",
    link: "blog/article4.html"
  },
  {
    title: "近日公開",
    description: "",
    img: "blogs/files/noimage.png",
    tag: "開発",
    link: "blog/article5.html"
  },
  {
    title: "近日公開",
    description: "",
    img: "blogs/files/noimage.png",
    tag: "開発",
    link: "blog/article6.html"
  },
  {
    title: "近日公開",
    description: "",
    img: "blogs/files/noimage.png",
    tag: "開発",
    link: "blog/article7.html"
  }
];











const articlesPerPage = 6;
let currentPage = 1;

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
    card.innerHTML = `
      <img src="${article.img}" alt="${article.title}">
      <h3>${article.title}</h3>
      <p>${article.description}</p>
      <span class="tag">${article.tag}</span>
    `;
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
    card.innerHTML = `
      <img src="${article.img}" alt="${article.title}">
      <h3>${article.title}</h3>
      <p>${article.description}</p>
      <span class="tag">${article.tag}</span>
    `;
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
    card.innerHTML = `
      <img src="../${article.img}" alt="${article.title}">
      <h3>${article.title}</h3>
      <p>${article.description}</p>
      <span class="tag">${article.tag}</span>
    `;
    recommendContainer.appendChild(card);
  });

  area.appendChild(recommendDiv);
}

// ==========================
// 初期表示（index.html限定）
// ==========================
renderArticles();
renderRecommendations();
