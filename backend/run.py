from flask import Flask, render_template
from flask_restful import Resource, Api, request, reqparse
import pandas as pd
import time
import os
import Basic_database
import Passenger_flow_analysis
import Network_optimization
import Network_assessment
app = Flask(__name__, template_folder="templates",)


_MAPPING = (u'零', u'一', u'二', u'三', u'四', u'五', u'六', u'七', u'八', u'九', u'十', u'十一', u'十二', u'十三', u'十四', u'十五', u'十六', u'十七',u'十八', u'十九')
_P0 = (u'', u'十', u'百', u'千',)
_S4 = 10 ** 4
def num_to_chinese4(num):
    assert (0 <= num and num < _S4)
    if num < 20:
        return _MAPPING[num]
    else:
        lst = []
        while num >= 10:
            lst.append(num % 10)
            num = num / 10
        lst.append(num)
        c = len(lst)  # 位数
        result = u''

        for idx, val in enumerate(lst):
            val = int(val)
            if val != 0:
                result += _P0[idx] + _MAPPING[val]
                if idx < c - 1 and lst[idx + 1] == 0:
                    result += u'零'
        return result[::-1]


@app.route('/')
def index():
  return render_template('index.html')

api = Api(app)

#第一部分--基础数据

#数据上传
class UploadFile(Resource):
    def post(self):
        file = request.json['file']

        data = file['data']
        name = file['name']

        props = request.json['props']

        path = r'shenzhen\Basic_database\input'
        f = open(os.path.join(path, name), 'w', encoding='utf-8')
        f.write(data)
        f.close()


        f = open(r'shenzhen\menu.txt', 'r', encoding='utf-8')
        num = len(f.readlines()) - 1
        f.close()

        fw = open(r'shenzhen\menu.txt', 'a', encoding='utf-8')
        s = str(num) + ',' + name + ',' + props['name'] + ',input,' + props['description'] + ',' + props['type'] + ',404.png' + ',' + str(num) + ',' + time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()) + ',' + props['open'] + '\n'
        print(s)
        fw.write(s)
        fw.close()



api.add_resource(UploadFile, '/upload')

class MapData(Resource):
    def get(self):
        return Basic_database.GetMapData()

api.add_resource(MapData, '/mapdata')


class ModalData(Resource):
    def post(self):
        name = request.json['name']
        return Basic_database.GetModalData(name)

api.add_resource(ModalData, '/modaldata')



#第二部分--客流分析
class GetStationdata(Resource):
    def post(self):
        date = request.json['date']
        return Passenger_flow_analysis.GetStationData(date)

api.add_resource(GetStationdata,'/stationdata')

class GetStationDiagram(Resource):
    def post(self):
        form = request.json['form']
        sta_n = form['name']
        date_in = form['date']
        return Passenger_flow_analysis.GetStationDiagram(sta_n, date_in)


api.add_resource(GetStationDiagram, '/stationdiagram')

class SearchStationName(Resource):
    def post(self):
        form = request.json['form']
        date_in = form['date']
        search = str(form['search'])
        return Passenger_flow_analysis.SearchStationName(date_in, search)

api.add_resource(SearchStationName, '/stationname')

class SearchRouteName(Resource):
    def post(self):
        form = request.json['form']
        type = form['type']
        search = str(form['search'])
        return Passenger_flow_analysis.SearchRouteName(type, search)

api.add_resource(SearchRouteName,'/routename')

class GetRoutedata(Resource):
    def post(self):
        form = request.json['form']
        type = form['type']
        name = form['name']
        return Passenger_flow_analysis.GetRouteData(type, name)

api.add_resource(GetRoutedata,'/routedata')

class GetRouteBar(Resource):
    def post(self):
        form = request.json['form_bar']
        date_in = form['date']
        time_index = form['time'] + ':00'
        name = form['name']
        if name[-1] == '路':
            name = name[:-1]
        elif name[-1] == '线':
            num = int(name[:-2])
            name = '地铁' + num_to_chinese4(num) + '号线'
        return Passenger_flow_analysis.GetRouteBar(date_in, time_index, name)

api.add_resource(GetRouteBar, '/routebar')

class GetRouteLine(Resource):
    def post(self):
        form = request.json['form_line']

        line_name = form['name']
        if line_name[-1] == '路':
            line_name = line_name[:-1]
        elif line_name[-1] == '线':
            num = int(line_name[:-2])
            line_name = '地铁' + num_to_chinese4(num) + '号线'

        date_in = form['date']
        return Passenger_flow_analysis.GetRouteLine(line_name, date_in)

api.add_resource(GetRouteLine, '/routeline')

class GetRegiondata(Resource):
    def post(self):
        date = request.json['date']
        return Passenger_flow_analysis.GetRegionData(date)

api.add_resource(GetRegiondata,'/regiondata')

class GetRegionLine(Resource):
    def post(self):
        form = request.json['form_region_line']
        date_in = form['date']
        dist_in = form['region']
        return Passenger_flow_analysis.GetRegionLine(date_in, dist_in)


api.add_resource(GetRegionLine, '/regionline')

class GetRegionSankey(Resource):
    def post(self):
        form = request.json['form']
        date_in = form['date']
        start_time = form['start_time']
        end_time = form['end_time']
        return Passenger_flow_analysis.GetRegionSankey(date_in, start_time, end_time)

api.add_resource(GetRegionSankey, '/regionsankey')

class GetTazdata(Resource):
    def post(self):
        date = request.json['date']
        return Passenger_flow_analysis.GetTazData(date)

api.add_resource(GetTazdata,'/tazdata')

#第三部分--线网优化
class GetAlgorithmsPic(Resource):
    def post(self):
        return Network_optimization.GetAlgorithmsPic()

api.add_resource(GetAlgorithmsPic,'/algorithmspic')


#第四部分--线网评估
class GetProdata(Resource):
    def post(self):
        return Network_assessment.GetProData()

api.add_resource(GetProdata,'/prodata')

class GetStaicValue(Resource):
    def post(self):
        return Network_assessment.static_value()

api.add_resource(GetStaicValue,'/staticvalue')

if __name__ == '__main__':
  app.run(debug=True)

