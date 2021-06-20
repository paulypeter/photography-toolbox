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
    sidebar.style.width = "250px";
    sidebar.style.display = "block"
    // containers = document.getElementsByClassName("form-container")
    // for (let i = 0; i < containers.length; i++) {
    //     containers[i].style.marginLeft = "250px"
    // }
    document.getElementById("nav_toggle").setAttribute("onclick", "close_nav()")
    document.getElementById("content").style.filter = "blur(5px)"
}

close_nav = () => {
    sidebar = document.getElementById("sidebar")
    sidebar.style.width = "0";
    sidebar.style.display = "none"
    containers = document.getElementsByClassName("form-container")
    for (let i = 0; i < containers.length; i++) {
        containers[i].style.marginLeft = "0"
    }
    document.getElementById("nav_toggle").setAttribute("onclick", "open_nav()")
    document.getElementById("content").style.filter = "none"
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
            "<a href=\"" + element + "html\" class=\"sidebar-link menu\">" +
            page_names[element] + "</a>"
        )
    });
}
