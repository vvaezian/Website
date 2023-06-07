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

    no_logo_list = [
        'AI', 'Machine Learning', 'Deep Learning', 'Object Detection','Image Recognition','Few-shot Learning','Transfer Learning','Outlier Detection',
        'Statistical Analysis','Demand Forecasting','Price Optimization','Production Planning','NLP','Sentiment Analysis',
        'CI/CD','Time Series Analysis','Chatbot','Linear Optimization','App Development','BI','ETL','Web Scraping','PDF Scraping', 'Excel Scraping',
        'Computer Vision'
    ];

    logo_name_mapping = {
        'C#':'csharp', '.Net MAUI':'dotnetmaui', 'Looker Studio (Data Studio)':'lookerstudio', 'GCP Cloud Functions': 'cloudfunctions',
        'Google OR-Tools':'ortools'
    };

    var projects = document.getElementsByClassName("project");
    for (var i = 0; i < projects.length; i++) {
        var tags = projects[i].getAttribute("data-tags").split(", ");
        var tagsContainer = projects[i].getElementsByClassName("tags")[0];

        for (var j = 0; j < tags.length; j++) {
            var tagItem = document.createElement("span");
            tagItem.classList.add("tag-item");

            if ( no_logo_list.includes(tags[j]) ) {
                tagItem.innerHTML = tags[j];
            }
            else {
                if (tags[j] in logo_name_mapping){ 
                    logo_name = logo_name_mapping[tags[j]] ;
                } else {
                    logo_name = tags[j].replace("Amazon ", "").replace("AWS ", "").replace(" ", "").trim().toLowerCase();
                }
                
                tagItem.innerHTML = `<img src="logos/${logo_name}-logo.png" alt="${logo_name}" class="tag-logo">` + tags[j] + '</img>';
            }
            
            (function(tag) {
                tagItem.addEventListener('click', function() {
                    filterProjects(tag);
                });
            })(tags[j]);
            
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



document.addEventListener('DOMContentLoaded', function() {
    var projectLinks = document.getElementsByClassName('project-link');
  
    for (var i = 0; i < projectLinks.length; i++) {
      projectLinks[i].addEventListener('click', function(event) {
        if (this.getAttribute('href') === '') {
          event.preventDefault(); // Prevent default link behavior
  
          var projectInfo = this.parentNode.nextElementSibling;
          var allProjectInfos = document.getElementsByClassName('project-info');
  
          // Close all other sections
          for (var j = 0; j < allProjectInfos.length; j++) {
            var currentProjectInfo = allProjectInfos[j];
            if (currentProjectInfo !== projectInfo && currentProjectInfo.classList.contains('show')) {
              currentProjectInfo.classList.remove('show');
              currentProjectInfo.style.height = '0px';
            }
          }
  
          // Toggle the clicked section
          if (projectInfo.classList.contains('show')) {
            projectInfo.classList.remove('show');
            projectInfo.style.height = '0px';
          } else {
            projectInfo.style.height = projectInfo.scrollHeight + 'px';
            projectInfo.classList.add('show');
          }
        }
      });
    }
  });
  