const elUserform = document.querySelector(".user-list");
const elPostform = document.querySelector(".post-list");
const elCommentform = document.querySelector(".comment-list");
const elUserTamplate = document.querySelector("#users-template").content;
const elPostTemplate = document.querySelector("#post-template").content;
const elCommentTemplate = document.querySelector("#comment-template").content;
const elTotalUsers = document.querySelector(".total-numbers-users");
const elTotalPosts = document.querySelector(".total-numbers-posts");
const elTotalComments = document.querySelector(".total-numbers-comments");

function renderUserDatas(arr, element) {
  element.innerHTML = null;

  const DataUserFragement = document.createDocumentFragment();

  arr.forEach((row) => {
    const userTamplate = elUserTamplate.cloneNode(true);

    userTamplate.querySelector(".users__template-link").textContent = row.name + " " + row.username;
    userTamplate.querySelector(".users__template-link").dataset.id = row.id;
    userTamplate.querySelector(".users__template-email").textContent = row.email
    userTamplate.querySelector(".users__template-country").textContent = "Country: " + row.address.city;
    userTamplate.querySelector(".users__template-company").textContent = "Company: " + row.company.name;
    userTamplate.querySelector(".users__template-website").textContent = row.website;
    DataUserFragement.appendChild(userTamplate);
  });
  element.appendChild(DataUserFragement);
}

async function fetchIds() {
  try {
    response = await fetch("https://jsonplaceholder.typicode.com/users");
    data = await response.json();
    elTotalUsers.textContent = "count of users: " + data.length;
    renderUserDatas(data, elUserform);
  } catch (error) {
    console.log("Error", error);
  }
}
fetchIds();


function renderPostData(arr, element) {
  element.innerHTML = null;

  const dataPostFragment = document.createDocumentFragment();

  arr.forEach((row) => {
    const postTemplate = elPostTemplate.cloneNode(true);

    postTemplate.querySelector(".post-title").textContent = row.title;
    postTemplate.querySelector(".post-title").dataset.id = row.id;
    postTemplate.querySelector(".post-body").textContent = row.body;
    dataPostFragment.appendChild(postTemplate);
  });
  element.appendChild(dataPostFragment);
};

elUserform.addEventListener("click", async (evt) => {
  try {
    if (evt.target.matches(".users__template-link")) {
      const UserId = evt.target.dataset.id;
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${UserId}`);
      const result = await response.json();
      elTotalPosts.textContent = "count of posts: " + result.length;
      renderPostData(result, elPostform)
    }
  } catch (error) {
    console.log("Error", error);
  }
})

function renderCommentData(arr, element) {
  element.innerHTML = null;

  const dataCommentFragment = document.createDocumentFragment();

  arr.forEach((row) => {
    const CommentTemplate = elCommentTemplate.cloneNode(true);

    CommentTemplate.querySelector(".comment-title").textContent = "Title: " + row.name;
    CommentTemplate.querySelector(".comment-mail").textContent = row.email;
    CommentTemplate.querySelector(".comments-comment").textContent = "Comment: " + row.body;
    dataCommentFragment.appendChild(CommentTemplate);
  });
  element.appendChild(dataCommentFragment);
};

elPostform.addEventListener("click", async (evt) => {
  try {
    if (evt.target.matches(".post-title")) {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/1/comments`);
      const result = await response.json();
      elTotalComments.textContent = "count of comments: " + result.length;
      renderCommentData(result, elCommentform)
    }
  } catch (error) {
    console.log("Error: " + error);
  }
})