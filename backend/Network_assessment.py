import pandas
import csv
import json
import geopandas
from return_result import Result

def GetProData():
    path = r'shenzhen\Network_assessment\evaluation\data_sourse\SZ_BusRouteExsit.geojson'
    with open(path, 'r', encoding='utf-8')as f:
        d = json.load(f)
    return d

# 计算公交线路总长和平均线路长度
def length_total(result_dict):
    with open(r"shenzhen\Network_assessment\evaluation\data_result\geojson_file\SZ_BusRouteExsit_result.geojson", encoding="utf-8") as json_file:
        data = json.load(json_file)
        features = data['features']
        sum = 0
        for feature in features:
            sum += feature['properties']['real_dist']

        total_length = sum / 1000
        average_length = total_length / len(features)

        result_dict["公交线路总长(KM)："] = total_length
        result_dict["平均线路长度(KM)："] = average_length
        return total_length, average_length


# 计算平均非直线系数
def nonline_coefficient(result_dict):
    with open(r"shenzhen\Network_assessment\evaluation\data_result\geojson_file\SZ_BusRouteExsit_result.geojson","r",encoding="utf-8") as nonline_file:
        nonline_coe = json.load(nonline_file)
        features = nonline_coe["features"]
        i = 0
        nonline_coe_sum = 0
        for feature in features:
            if feature["properties"]["nonline_coe"] == 0:
                i += 1
            else:
                nonline_coe_sum += feature["properties"]["nonline_coe"]
        # 计算非直线系数
        nonline_coe_ave = nonline_coe_sum/(len(features) - i)
        result_dict["平均非直线系数："] = nonline_coe_ave
        return nonline_coe_ave

# 计算线网密度
def net_density(result_dict):
    lengths = 0
    with open(r"shenzhen\Network_assessment\evaluation\data_result\geojson_file\SZ_RouteRoad_insert.geojson", 'r', encoding='utf-8') as json_file:
        json_data = json.load(json_file)
        features = json_data["features"]
        for feature in features:
            lengths += feature["properties"]["real_distance"]
        # 区域内布设道路的线路长度
        road_center = lengths / 1000
        # 深圳市用地面积
        sz_area = 1997.47
        sz_area = 927.96
        result_dict["区域内布设道路的线路长度(KM)："] = road_center
        result_dict["线网密度(KM/KM^2)："] = (road_center / sz_area)
        return road_center, (road_center / sz_area)


# 计算道路重复系数
def road_rep(result_dict):
    length_data = length_total(result_dict)
    net_density_data = net_density(result_dict)
    rep = length_data[0] / net_density_data[0]
    result_dict["道路重复系数"] = rep


# 计算站点300米,500米覆盖率
def buffer(result_dict):
    with open(r"shenzhen\Network_assessment\evaluation\data_result\json_file\station_cover_ratio.json", "r", encoding="utf-8") as file:
        data = json.load(file)
        result_dict["300米覆盖率："] = data['cover_300']
        result_dict["500米覆盖率："] = data['cover_500']


# 计算直达率和换乘率
def direct_ratio(result_dict):
    with open(r"shenzhen\Network_assessment\evaluation\data_result\json_file\direct_transfer_ratio.json", "r", encoding="utf-8") as file:
        data = json.load(file)
        result_dict["直达率："] = data['direct']
        result_dict["一次换乘率："] = data['transfer_one']
        result_dict["两次换乘率："] = data['transfer_two']
        result_dict["三次及三次以上换乘率："] = data['transfer_others']

def static_value():
    result_dict = {}
    road_rep(result_dict)
    buffer(result_dict)
    nonline_coefficient(result_dict)
    direct_ratio(result_dict)
    data = []
    n = 1
    for k in result_dict.keys():
        d = {'key': n, 'static': k, 'value': round(result_dict[k], 3)}
        data.append(d)
        n += 1
    return data
