from flask import Flask
from flask import request
from flask import render_template
from flask import jsonify
import utils
app = Flask(__name__)

@app.route('/')
def hello_world():
    return render_template("main.html")

@app.route('/index')
def index():
    return render_template("index.html")

@app.route('/time')
def get_time():
    return utils.get_time()

@app.route('/c1')
def get_c1_data():
    data = utils.get_c1_data()
    return jsonify({"confirm": data[0], "isolated": data[1], "dead": data[2], "unblock": data[3]})

@app.route('/c2')
def get_c2_data():
    datas = utils.get_c2_data()
    datas = list(datas)
    datas = sorted(datas, key=lambda x: x[0])

    date_datas = []
    confirm_datas = []
    isolated_datas = []
    dead_datas = []
    unblock_datas = []
    for x in datas:
        date_datas.append(x[0].date().strftime("%Y-%m-%d"))
        confirm_datas.append(x[1])
        isolated_datas.append(x[2])
        dead_datas.append(x[3])
        unblock_datas.append(x[4])

    return jsonify({"date_datas": date_datas, 
                    "confirm_datas": confirm_datas, 
                    "isolated_datas": isolated_datas,
                    "dead_datas": dead_datas,
                    "unblock_datas": unblock_datas})

@app.route('/map')
def get_map_data():
    def map_color(cnt):
        if cnt > 300:
            return "#e87705"
        elif cnt <=300 and cnt >= 100:
            return "#eb9e51"
        else:
            return "#ecbd8d"
    datas = utils.get_map_data()
    for i in range(len(datas)):
        datas[i] += (map_color(datas[i][3]),)
    return jsonify({"city_data": datas})

@app.route('/c3')
def get_c3_data():
    datas = utils.get_c3_data()
    # 最近七天每日新增人數加總排序
    datas = sorted(datas.items(), key=lambda kv:(sum(kv[1])), reverse=True)
    cities = []
    confirm_add = []
    # 顯示最近七日新增最多的前六個縣市
    for city, add in datas[:6]:
        cities.append(city)
        confirm_add.append([add[i] for i in range(len(add) - 1, -1, -1)])

    return jsonify({"cities": cities,
                    "confirm_add": confirm_add})

if __name__ == "__main__":
    app.run(debug=True)