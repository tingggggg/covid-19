function gettime(){
    $.ajax({
        url:"/time",
        timeout:10000,
        success:function(data) {
            $("#tim").html(data)
        },
        error:function(xhr, type, errorThrown) {

        }
    });
}

function get_c1_data() {
    $.ajax({
        url:"/c1",
        success:function(data) {
            
            $(".num h1").eq(0).text(data.confirm)
            $(".num h1").eq(1).text(data.isolated)
            $(".num h1").eq(2).text(data.dead)
            $(".num h1").eq(3).text(data.unblock)
        },
        error:function(xhr, type, errorThrown) {

        }
    });
}

function get_c2_data() {
    $.ajax({
        url:"/c2",
        success: function(data) {
            optionCenter.xAxis.data = data.date_datas
            optionCenter.series[0].data = data.confirm_datas
            optionCenter.series[1].data = data.isolated_datas
            optionCenter.series[2].data = data.dead_datas
            optionCenter.series[3].data = data.unblock_datas
            ec_center.setOption(optionCenter)
        },
        error: function(xhr, type, errorThrown) {
        
        }
    });
}

function get_c3_data() {
    $.ajax({
        url:"/c3",
        success: function(data) {
            optionCenter3.legend.data = data.cities;
            for(var j = 0; j < data.confirm_add.length; j++) {
                optionCenter3.series[j].data = data.confirm_add[j]
                optionCenter3.series[j].name = data.cities[j]
            }
            ec_center3.setOption(optionCenter3)
        },
        error: function(xhr, type, errorThrown) {
        
        }
    });
}

function set_color() {
    $.ajax({
        url:"/map",
        success: function(data) {
            for(var j=0;j<data.city_data.length;j++) 
            {
                // console.log(data.city_data[j][2]);
                $("path[data-name-zh='" + data.city_data[j][2] + "']").css("fill", data.city_data[j][5]);
                $("path[data-name-zh='" + data.city_data[j][2] + "']").text(data.city_data[j][3]);
            }
            
        },
        error: function(xhr, type, errorThrown) {
        
        }
    });
}

var paths;
const app = new Vue({
    el: '#app',
    mounted() {
        
        paths = document.querySelectorAll('path');
        console.log(paths);
        let _this = this
        paths.forEach(e => {
            e.onmouseover = function () {
                var confirm, city;
                city = document.querySelector('[name="cityname"]');
                confirm = document.querySelector('[name="confirm"]');

                city.innerHTML = this.getAttribute("data-name-zh")
                confirm.innerHTML = "累計確診  " + this.innerHTML;
            }
        })
    },
    data: () => {
        return {
            place_data: null
        }
    },

});


gettime()
get_c1_data()
get_c2_data()
get_c3_data()
set_color()
setInterval(gettime, 1000)
setInterval(get_c1_data, 5000)
setInterval(get_c2_data, 5000)
setInterval(get_c3_data, 5000)
setInterval(set_color, 10000)