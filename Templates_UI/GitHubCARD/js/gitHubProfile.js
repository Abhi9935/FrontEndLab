function getProfile() {
    var gReq = new XMLHttpRequest();
    gReq.addEventListener("load", updateProfileBadge);
    gReq.open("GET", "https://api.github.com/users/Abhi9935");
    gReq.send();
    getCommit();
}

function updateProfileBadge() {
    var response = JSON.parse(this.responseText);
    if (response.message === "Not Found") {
        updateDomWithUser(emptyUser);
    } else {
        updateDomWithUser(response);
    }
}
/* https://github.com/users/Abhi9935/contributions*/
function updateDomWithUser(user) {
    var profile = document.getElementById('github_profile_card');
    document.getElementById('github_profile_pic').src = user.avatar_url;
    document.getElementById('github_profile_username').innerHTML = user.login;
    document.getElementById("github_profile_name").innerHTML = user.name;
    document.getElementById("github_profile_repo_count").innerHTML = user.public_repos;
    document.getElementById("github_profile_gist_count").innerHTML = user.public_gists;
}


function getCommit() {
    var gcom = new XMLHttpRequest();
    gcom.addEventListener("load", updateCommits);
    //gcom.open("GET", "https://api.github.com/repos/Abhi9935/HackerRank/stats/contributors");
    gcom.open("GET", "https://api.github.com/users/Abhi9935/repos");
    gcom.send();
}

function updateCommits() {
    var resp = JSON.parse(this.responseText);
    if (resp.message === "Not Found") {
        commitDomWithUser(emptyUser);
    } else {
        commitDomWithUser(resp);
    }
}
/* https://github.com/users/Abhi9935/contributions*/
function commitDomWithUser(resp) {
    //var myCommit = document.getElementById('github_profile_card');
    var y = 0,
        lang = "";
    const UniqueLang = [...new Set(resp.map(resp => resp.language))]
    for (i = 0, j = 0; i < resp.length; i++, j++) {
        y += resp[i].size;
        let z = i;
        if (z > 2) {
            z = Math.floor((Math.random() * 5) + 1);
        }
        if (j < UniqueLang.length) {
            if (UniqueLang[j] != null) {
                lang += "<span id='bgcolor" + z + "'>" + UniqueLang[j] + " </span>";
            }
        }
    }
    document.getElementById("github_profile_contri_total").innerHTML = y;
    document.getElementById("github_profile_lang").innerHTML = lang;
}