let api_key = 'your_api_key_here'
let url = `https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/F-D0047-091?Authorization=${api_key}&downloadType=WEB&format=JSON`
var place_data = [
    {
        tag: "taipei_city",
        place: "台北市",
        low: 16,
        high: 24,
        weather: "Rainy"
    },
    {
        tag: "new_taipei_city",
        place: "新北市",
        low: 15,
        high: 22,
        weather: "Rainy"
    },
    {
        tag: "taichung_city",
        place: "台中市",
        low: 15,
        high: 22,
        weather: "Rainy"
    },
    {
        tag: "tainan_city",
        place: "台南市",
        low: 16,
        high: 24,
        weather: "Rainy"
    },
    {
        tag: "kaohsiung_city",
        place: "高雄市",
        low: 16,
        high: 24,
        weather: "Rainy"
    },
    {
        tag: "keelung_city",
        place: "基隆市",
        low: 15,
        high: 24,
        weather: "Rainy"
    },
    {
        tag: "taoyuan_country",
        place: "桃園市",
        low: 15,
        high: 24,
        weather: "Rainy"
    },
    {
        tag: "hsinchu_city",
        place: "新竹市",
        low: 13,
        high: 21,
        weather: "Rainy"
    },
    {
        tag: "hsinchu_country",
        place: "新竹縣",
        low: 19,
        high: 21,
        weather: "Rainy"
    },
    {
        tag: "miaoli_country",
        place: "苗栗縣",
        low: 16,
        high: 24,
        weather: "Rainy"
    },
    {
        tag: "changhua_country",
        place: "彰化縣",
        low: 14,
        high: 24,
        weather: "Rainy"
    },
    {
        tag: "nantou_country",
        place: "南投縣",
        low: 12,
        high: 24,
        weather: "Rainy"
    },
    {
        tag: "yunlin_country",
        place: "雲林縣",
        low: 11,
        high: 24,
        weather: "Cloudy"
    },
    {
        tag: "chiayi_city",
        place: "嘉義市",
        low: 10,
        high: 24,
        weather: "Rainy"
    },
    {
        tag: "chiayi_country",
        place: "嘉義縣",
        low: 12,
        high: 24,
        weather: "Cloudy"
    },
    {
        tag: "pingtung_country",
        place: "屏東縣",
        low: 18,
        high: 24,
        weather: "Cloudy"
    },
    {
        tag: "yilan_country",
        place: "宜蘭縣",
        low: 20,
        high: 24,
        weather: "Cloudy"
    },
    {
        tag: "hualien_country",
        place: "花蓮縣",
        low: 21,
        high: 24,
        weather: "Sunny"
    },
    {
        tag: "taitung_country",
        place: "台東縣",
        low: 17,
        high: 22,
        weather: "Sunny"
    },
    {
        tag: "penghu_country",
        place: "澎湖縣",
        low: 14,
        high: 24,
        weather: "Cloudy"
    },
    {
        tag: "kinmen_country",
        place: "金門縣",
        low: 15,
        high: 26,
        weather: "Sunny"
    },
    {
        tag: "lienchiang_country",
        place: "連江縣",
        low: 15,
        high: 20,
        weather: "Rainy"
    },
];
var paths;
const app = new Vue({
    el: '#app',
    mounted() {
        axios.get(url).then(data => {
            console.log(data)
            this.weather_data = data.data.cwbopendata.dataset.locations.location
        })
        paths = document.querySelectorAll('path');
        let _this = this
        paths.forEach(e => {
            e.onmouseover = function () {
                _this.filter = this.dataset.nameZh
            }
        })
    },
    data: () => {
        return {
            filter: '',
            place_data: null,
            weather_data: []
        }
    },
    computed: {
        now_area() {
            let data = {}
            let result = this.weather_data.find((obj) => {
                return obj.locationName === this.filter
            })
            if (result) {
                let high = result.weatherElement.find(el => el.elementName === 'MaxT').time[0].elementValue.value
                let low = result.weatherElement.find(el => el.elementName === 'MinT').time[0].elementValue.value
                let weather = result.weatherElement.find(el => el.elementName === 'Wx').time[0].elementValue[0].value
                data = {
                    place: this.filter,
                    low: low,
                    high: high,
                    weather: weather
                }
            }
            return data
        }
    },
})
