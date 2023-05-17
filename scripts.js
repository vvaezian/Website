function filterProjects(tag) {
    var projects = document.getElementsByClassName("project");

    if (tag === "All") {
        for (var i = 0; i < projects.length; i++) {
            projects[i].style.display = "block";
        }
    } else {
        for (var i = 0; i < projects.length; i++) {
            var projectTags = projects[i].getAttribute("data-tags").split(", ");
            if (projectTags.includes(tag)) {
                projects[i].style.display = "block";
            } else {
                projects[i].style.display = "none";
            }
        }
    }

    var tags = document.getElementsByClassName("tag");
    for (var i = 0; i < tags.length; i++) {
        if (tags[i].innerHTML.toLowerCase() === tag.toLowerCase()) {
            tags[i].classList.add("active");
        } else {
            tags[i].classList.remove("active");
        }
    }
}


function filterTags() {
    var searchQuery = document.getElementById("searchBox").value.toLowerCase();
    var tags = document.getElementsByClassName("tag");

    for (var i = 0; i < tags.length; i++) {
        var tagName = tags[i].innerHTML.toLowerCase();
        if (tagName.includes(searchQuery)) {
            tags[i].style.display = "inline-block";
        } else {
            tags[i].style.display = "none";
        }
    }
}


function generate_project_tags() {
    // Generate tag items for each project
    var projects = document.getElementsByClassName("project");
    for (var i = 0; i < projects.length; i++) {
        var tags = projects[i].getAttribute("data-tags").split(", ");
        var tagsContainer = projects[i].getElementsByClassName("tags")[0];

        for (var j = 0; j < tags.length; j++) {
            var tagItem = document.createElement("span");
            tagItem.classList.add("tag-item");
            //tagItem.innerHTML = initCap(tags[j]);
            tagItem.innerHTML = tags[j];
            tagsContainer.appendChild(tagItem);
        }
    }
}


function initCap(str) {
    // turn the first letter of every word to uppercase.
    // also replaces '-' with ' ', and returns all caps if input length  is less than 3 letters
    if (str.length < 3) {return str.toUpperCase();}  // for example BI

    var words = str.replace(/-/g, ' ').toLowerCase().split(' ');
    for (var i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    return words.join(' ');
  }