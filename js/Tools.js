sensors_size_select = id => {
    let select = document.getElementById(id)
    for (sensor_name in sensor_sizes) {
        let option = document.createElement('option')
        option.text = sensor_name
        option.value = JSON.stringify(sensor_sizes[sensor_name])
        select.add(option)
    }
}

speed_select = (select_id, speed_list) => {
    let select = document.getElementById(select_id)
    speed_list.forEach(element => {
        let option = document.createElement('option')
        option.text = element
        if (["400", "1/250", "4.0"].includes(element)) {
            option.selected = "selected"
        }
        select.add(option)
    });
}

// ignore require statements in .js files
require = path => {}

open_nav = () => {
    sidebar = document.getElementById("sidebar")
    sidebar.style.width = "250px"
    // containers = document.getElementsByClassName("form-container")
    // for (let i = 0; i < containers.length; i++) {
    //     containers[i].style.marginLeft = "250px"
    // }
    document.getElementById("nav_toggle").setAttribute("onclick", "close_nav()")
    document.getElementById("content").style.filter = "blur(5px)"
    sidebar.style.visibility = "visible"
}

close_nav = () => {
    sidebar = document.getElementById("sidebar")
    sidebar.style.width = "0"
    containers = document.getElementsByClassName("form-container")
    for (let i = 0; i < containers.length; i++) {
        containers[i].style.marginLeft = "0"
    }
    document.getElementById("nav_toggle").setAttribute("onclick", "open_nav()")
    document.getElementById("content").style.filter = "none"
    sidebar.style.visibility = "hidden"
}

init_nav = () => {
    let pages = ["index", "aov", "av_tv", "dof", "exposure", "flash"]
    let page_names = {
        "index": "Home",
        "aov": "Angles of View",
        "av_tv": "Priority Modes",
        "dof": "Depth of Field",
        "exposure": "Equivalent exposure",
        "flash": "Flash exposure"
    }
    let sidebar = document.getElementById("sidebar")
    sidebar.innerHTML = ""
    pages.forEach(element => {
        sidebar.innerHTML += (
            "<a href=\"" + element + ".html\" class=\"sidebar-link menu\">" +
            page_names[element] + "</a>"
        )
    });
}

LANGS = ["en", "de"]
LANG_FLAGS = {
    "en": "🇬🇧",
    "de": "🇩🇪"
}

// https://stackoverflow.com/a/34579496
language_select = (select_id, lang_str) => {
    let select = document.getElementById(select_id)
    LANGS.forEach(element => {
        let option = document.createElement('option')
        option.text = LANG_FLAGS[element] + " " + element
        option.value = element
        if (element == lang_str) {
            option.selected = "selected"
        }
        select.add(option)
    })
}

set_language = lang_str => {
    storage = window.localStorage;
    storage.setItem('lang', lang_str)
    location.reload()
}

get_language = () => {
    storage = window.localStorage
    return storage.getItem('lang')
}

apply_language = lang_str => {
    lang_settings = lang_strings[lang_str]
    elements_to_translate = document.querySelectorAll("[data-lang-str]")
    elements_to_translate.forEach(element => {
        element.innerHTML = lang_settings[element.getAttribute("data-lang-str")]
    })
}