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
        select.add(option)
    });
}