import json
import re
import difflib

#获取站点数据
def GetStationData(date):
    path = r'shenzhen\Passenger_flow_analysis\stationdata' + '\\' + date + '.json'
    with open(path, 'r', encoding='utf-8')as f:
        d = json.load(f)
    return d

#获取站带你图表
def GetStationDiagram(sta_n, date_in):
    '''
        :param sta_n: 站点名称
        :param date_in: '2017-09-18'
        :return: {'5.0': {'up': 0, 'down': 0}, '6.0': {'up': 77, 'down': 80}}
    '''
    path = r'shenzhen\Passenger_flow_analysis\stationdata\sta_diagram'

    with open(path + '\\' + date_in + '.json', 'r', encoding='utf-8')as f:
        dic = json.load(f)
    dic_out = {}
    for i in range(1, 289):
        num = (i - i % 12) / 12
        num = str(num)
        i = str(i / 1)
        try:
            if num not in dic_out.keys():
                dic_out[num] = {'up': dic[sta_n][i]['up'], 'down': dic[sta_n][i]['down']}
            else:
                dic_out[num]['up'] += dic[sta_n][i]['up']
                dic_out[num]['down'] += dic[sta_n][i]['down']
        except:
            dic_out[num] = {'up': 0, 'down': 0}
    res = []
    for time in dic_out.keys():
        dic_up = {"时间": time.split('.')[0], "数量": dic_out[time]['up'], "类型": '上车人数'}
        dic_down = {"时间": time.split('.')[0], "数量": dic_out[time]['down'], "类型": '下车人数'}
        res.append(dic_up)
        res.append(dic_down)

    return res

#查找站点名称
def SearchStationName(date_in, search):
    path = r'shenzhen\Passenger_flow_analysis\stationdata\sta_class.json'
    # with open(path + '\\' + date_in + '.json', 'r', encoding='utf-8')as f:
    #     dic = json.load(f)
    with open(path, 'r', encoding='utf-8') as f:
        dic = json.load(f)

    # res = []
    # pattern = '.*' + search + '.*'
    # for s in dic.keys():
    #     obj = re.findall(pattern, s)
    #     if len(obj) > 0:
    #         res.extend(obj)
    # res = list(filter(None, res))
    # print(res)


    return dic[search.lower()]

#查找路线名称
def SearchRouteName(type, search):
    path = r'shenzhen\Passenger_flow_analysis\line\line_show'
    if type == 'metro':
        fl, fs = 'metroline.json', 'metrolinestop.json'
    else:
        fl, fs = 'busline20.json', 'bus_stop20.json'
    with open(path + '\\' + fl, 'r', encoding='utf-8')as fl:
        d_l = json.load(fl)
    res = []
    pattern = '.*' + search + '.*'
    for s in d_l.keys():
        obj = re.findall(pattern, s)
        if len(obj) > 0:
            res.extend(obj)
    res = list(filter(None, res))
    return res

#获取路线数据
def GetRouteData(type, name):
    '''
        :param class_: “metro”或“bus”
        :param name_: 线路名称
        :return: 两个geojson数据，第一个是线路，第二个是线路的全部站点
    '''

    path = r'shenzhen\Passenger_flow_analysis\line\line_show'

    if type == 'metro':
        fl, fs = 'metroline.json', 'metrolinestop.json'
    else:
        fl, fs = 'busline20.json', 'bus_stop20.json'
    with open(path + '\\' + fl, 'r', encoding='utf-8')as fl:
        d_l = json.load(fl)
    with open(path + '\\' + fs, 'r', encoding='utf-8')as fs:
        d_s = json.load(fs)

    if type == 'metro':
        return {'route': d_l[name], 'metro_station': d_s[name]}
    else:
        return {'route': d_l[name], 'bus_station': d_s[name]}

#获取路线柱状图数据
def GetRouteBar(date_in, time_index, name):
    '''
        :param date_in: '2017-09-18'
        :param name: 线路名称
        :param time_index: '08:30:00'
        :return: 返回该时段（十五分钟一段）线路各个站点上下车人次以及差值 {'站名':{’up‘: 人次， ’down': 人次， ‘cha": 人次}}
    '''

    t = time_index.split(':')
    m = int(t[1])
    m = m - m % 5
    index = int(t[0]) * 12 + m / 5 + 1
    path = r'shenzhen\Passenger_flow_analysis\line'
    with open(path + '\\' + date_in + '.json', 'r', encoding='utf-8')as f:
        dic = json.load(f)
    dic_out = {}
    for i in range(3):  # 因为基础数据为五分钟一段，所以加三次
        num = str(index + i / 1)
        for key in dic[name].keys():
            try:
                up = dic[name][key][num]['up']
                down = dic[name][key][num]['down']
                if key not in dic_out.keys():
                    dic_out[key] = {'up': up, 'down': down, 'cha': up - down}
                else:
                    dic_out[key]['up'] += up
                    dic_out[key]['down'] += down
                    dic_out[key]['cha'] += (up - down)
            except:
                continue
    res = {
        'station': [],
        'up': [],
        'down': [],
    }
    for k in dic_out.keys():
        res['station'].append(k)
        res['up'].append(dic_out[k]['up'])
        res['down'].append(-dic_out[k]['down'])
    return res

#获取路线折线图数据
def GetRouteLine(line_name, date_in):
    '''
        :param date_in: '2017-09-18'
        :param line_name: 线路名称
        :return: 返回二十四小时中该线路每小时上下车人次的字典 {1.0：{’up‘：人次，’down‘：人次}}
    '''
    path = r'shenzhen\Passenger_flow_analysis\line'


    with open(path + '\\' + date_in + '.json', 'r', encoding='utf-8')as f:
        dic = json.load(f)
    dic_out = {}

    for i in range(1, 289):
        try:
            num = (i - i % 12) / 12
            i = str(i / 1)
            for key in dic[line_name]:
                if num not in dic_out.keys():
                    dic_out[num] = {'up': dic[line_name][key][i]['up'], 'down': dic[line_name][key][i]['down']}
                else:
                    dic_out[num]['up'] += dic[line_name][key][i]['up']
                    dic_out[num]['down'] += dic[line_name][key][i]['down']
        except:
            continue
    res = []
    time_list = [str(i) for i in range(0, 25)]

    for time in time_list:
        time = float(time)
        if time in dic_out.keys():
            dic_up = {"时间": str(time).split('.')[0], "数量": dic_out[time]['up'], "类型": '上车人数'}
            dic_down = {"时间": str(time).split('.')[0], "数量": dic_out[time]['down'], "类型": '下车人数'}
            res.append(dic_up)
            res.append(dic_down)
        else:
            dic_up = {"时间": str(time).split('.')[0], "数量": 0, "类型": '上车人数'}
            dic_down = {"时间": str(time).split('.')[0], "数量": 0, "类型": '下车人数'}
            res.append(dic_up)
            res.append(dic_down)

    return res


#获取行政区划数据
def GetRegionData(date):
    path = r'shenzhen\Passenger_flow_analysis\region' + '\\' + date + '.geojson'
    with open(path, 'r', encoding='utf-8')as f:
        d = json.load(f)
    return d

#获取行政区折线图数据
def GetRegionLine(date_in, dist_in):
    with open(r'shenzhen\Passenger_flow_analysis\region\base_data\sta_qu.json', 'r', encoding='utf-8')as fw:
        dic_ts = json.load(fw)

    path = r'shenzhen\Passenger_flow_analysis\region\sta'
    with open(path + '\\' + date_in + '.geojson', 'r', encoding='utf-8')as f:
        dic = json.load(f)
    dic_out = {}
    for fea in dic['features']:
        sta_name = fea['properties']['station_name']
        tim = fea['properties']['time_interval'].split(':')[0]
        up = fea['properties']['up']
        try:
            dist = dic_ts[sta_name]
        except:
            continue
        if dist == dist_in:

            if tim not in dic_out.keys():
                dic_out[tim] = up
            else:
                dic_out[tim] += up
    res = []
    for k in dic_out.keys():
        r = {"时间": str(int(k)), "数量": dic_out[k], '类型': '上车人数'}
        res.append(r)
    res.sort(key=lambda x: (int(x['时间']), x['数量']))

    return res

#获取行政区桑基图数据
def GetRegionSankey(date_in, start_time, end_time):
    t1, t2 = start_time, end_time
    with open(r'shenzhen\Passenger_flow_analysis\region\district\sankey\\' + date_in + '.json', 'r', encoding='utf-8')as f:
        dic = json.load(f)
    with open(r'shenzhen\Passenger_flow_analysis\region\district\sankey\sta_qu.json', 'r', encoding='utf-8')as fw:
        dic_relate = json.load(fw)
    dic_out = {}
    for t in dic.keys():
        if int(t1) <= int(t.split(':')[0]) < int(t2):
            for o in dic[t].keys():
                for d in dic[t][o].keys():
                    try:
                        dist_o = dic_relate[o]
                        dist_d = dic_relate[d]
                        if dist_o not in dic_out.keys():
                            dic_out[dist_o] = {dist_d: dic[t][o][d]}
                        else:
                            if dist_d not in dic_out[dist_o].keys():
                                dic_out[dist_o][dist_d] = dic[t][o][d]
                            else:
                                dic_out[dist_o][dist_d] += dic[t][o][d]
                    except:
                        continue
    region = []
    data = []
    for k in dic_out.keys():
        r = {'name': k}
        rr = {'name': k + '.'}
        region.append(r)
        region.append(rr)
        for kk in dic_out[k].keys():
            d = {'source': k, 'target': kk + '.', 'value': dic_out[k][kk]}
            data.append(d)
    res = {
        'region': region,
        'data': data
    }
    return res

#获取Taz数据
def GetTazData(date):
    path = r'shenzhen\Passenger_flow_analysis\taz' + '\\' + date + '.geojson'
    with open(path, 'r', encoding='utf-8')as f:
        d = json.load(f)
    return d









