const JSON_PATH = "../blog_posts.json";

// Get required DOM elements
const emojiPicker = document.querySelector('emoji-picker');
const emojiButton = document.getElementById("emojiButton");
const bodyText = document.getElementById("message");
const titleText = document.getElementById("title");
const tagTextElem = document.getElementById("tagText");
const tagList = document.getElementById("tagList");
const tagError = document.getElementById("tagError");
const postCount = document.getElementById("postCount");
const createError = document.getElementById("createError");
const loadInput = document.getElementById("file-input");
const imageURL = document.getElementById("imageURL");
const imgPreview = document.getElementById("imgPreview");
const previewLbl = document.getElementById("previewLbl");
const loadBtnArea = document.getElementById("loadBtn");
const newPostArea = document.getElementById("newPost");
const saveBtnArea = document.getElementById("saveBtn");

// Initialise variables
let existingTagList = [];
let existingPostsJSON;
let postCounter = 0;

// Auto-Load Data
async function autoLoadData() {
  console.log("Loading data on startup...")

  // Url for the request 
  let url = 'http://localhost:8080/data';

  // Making our request 
  fetch(url, { method: 'GET' })
    .then(Result => Result.json())
    .then(jsonData => {
      // Printing json response 
      console.log(jsonData);
      existingPostsJSON = jsonData;
    })
    .catch(errorMsg => { console.log(errorMsg); });

}

function saveData() {
  console.log("Saving new post data...")

  // Url for the request 
  let url = 'http://localhost:8080/data';
  console.log("Here: ", existingPostsJSON);

  // Making our request 
  fetch(url, {
    method: 'POST', headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(existingPostsJSON),
  }).catch(errorMsg => { console.log(errorMsg); });
}

// ##### POST CREATION FUNCTIONS #####

// Add new tag to current new post
function addTag() {
  let tagText = ""
  let tagEmoji = ""

  // Trim whitespace, add emoji
  tagText += tagTextElem.value.trim();
  tagEmoji += emojiButton.textContent;
  tagFull = tagText + tagEmoji;
  tagFull = tagFull.toLowerCase()
  // console.log(tag);

  // Check if tag exists
  if (existingTagList.indexOf(tagFull) > -1) {
    console.log("ERROR: Tag already added");
    tagError.textContent = "ERROR: Tag already added";
  }
  else if (tagText == "") {
    console.log("ERROR: Tag text cannot be empty");
    tagError.textContent = "ERROR: Tag text cannot be empty";
  } else {
    // Track current existing tags
    existingTagList.push(tagFull);

    // Hide error text
    tagError.textContent = "";

    // Generate new list item
    var listItem = document.createElement('li');
    listItem.className = "list-item"
    listItem.appendChild(document.createTextNode(tagFull));
    listItem.addEventListener("click", () => {
      listItem.remove()
    })
    tagList.appendChild(listItem);

    // Clear fields
    tagTextElem.value = "";
  }
}

// emoji picker helper class
function emojiToggleHandler() {
  emojiPicker.classList.toggle("emoji");
}

// Toggle visibility of emoji picker
function toggle() {
  if (emojiPicker.style.display === "none") {
    emojiPicker.style.display = "block";
  } else {
    emojiPicker.style.display = "none";
  }
}

// Update emoji button value and toggle picker visibility
emojiPicker.addEventListener('emoji-click', event => {
  let emoji = event.detail

  // Update emoji button to match the picked emoji
  emojiButton.textContent = emoji.unicode;
  // Hide the emoji picker
  emojiPicker.classList.toggle("emoji");
});

// Control display of image preview
imageURL.addEventListener('change', event => {
  if (imageURL.value != "") {
    previewLbl.style.display = "block"
  } else {
    previewLbl.style.display = "none"
  }
  imgPreview.src = imageURL.value
})

// Add new post to currently loaded post data
function addPost() {
  if (bodyText.value == "") {
    createError.textContent = "ERROR: Must contain body content";
  }
  else if (titleText.value == "") {
    createError.textContent = "ERROR: Must contain valid title";
  }
  else if (existingTagList.length == 0) {
    createError.textContent = "ERROR: Must contain at least 1 tag";
  }
  else {
    let existingPosts = existingPostsJSON;

    // Get most recent post
    let mostRecentPost = existingPosts[Object.keys(existingPosts)[Object.keys(existingPosts).length - 1]];

    // Increment ID
    let id = mostRecentPost.ID + 1;
    // Get current Date
    let datePosted = new Date();

    // Build new post
    let newPost = {
      "ID": id,
      "title": titleText.value,
      "main_content": bodyText.value,
      "date_posted": datePosted.toUTCString(),
      "tags": existingTagList,
      "img": imageURL.value
    }

    // Add new post to existing post data
    console.log("Added new post")
    existingPostsJSON[newPost.ID] = newPost;
    console.log(existingPostsJSON);

    // Update post counter
    postCounter++;
    postCount.textContent = postCounter;

    // Clear fields
    bodyText.value = ""
    titleText.value = ""
    tagTextElem.value = "";
    tagList.textContent = ""
    tagError.textContent = "";
    createError.textContent = ""
    imageURL.value = "";
    existingTagList = [];
    previewLbl.style.display = "none"
    imgPreview.src = ""
  }
}

// Update currently loaded file with a new blog post
function updateData() {
  // Show download prompt
  let filename = "blog_posts.json";
  // download(filename, existingPostsJSON);
  saveData();

  // Clear fields
  bodyText.value = ""
  titleText.value = ""
  tagList.textContent = ""
  tagError.textContent = "";
  existingTagList = [];
  imageURL.value = "";
  previewLbl.style.display = "none"
  imgPreview.src = ""
}

// ========== MAIN ==========

function main() {
  console.log("Hello World")
  autoLoadData()
}

main();
