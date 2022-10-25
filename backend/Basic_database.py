import base64
import os
import json
import pandas as pd

#将图片转化为图片流
def read_fig(path_fig):
    '''
    读取图片流数据
    :param path_fig: 图片路径
    :return:
    '''
    img_stream = ''
    with open(path_fig, 'rb') as img_f:
        img_stream = img_f.read()
        img_stream = base64.b64encode(img_stream).decode()
    return img_stream

#获取后端地图数据
def GetMapData():
    city_dir = r'D:\bus_system\Website\backend\shenzhen'
    path = os.path.join(city_dir, 'menu.txt')
    data = pd.read_table(path, sep=',', encoding='utf-8', index_col=0, error_bad_lines=False)
    all_data = {"input": [], "others": []}
    for index, values in data.iterrows():
        data_info = dict(values)
        folder = values["folder"]
        path_data = os.path.join(city_dir, folder + '\\' + values["file"])
        path_pic = os.path.join(city_dir, "pic" + '\\' + values["pic"])
        data_info["path"] = path_data
        data_info["pic"] = read_fig(path_pic)
        if folder == "input":
            all_data["input"].append(data_info)
        else:
            all_data["others"].append(data_info)

    return all_data

#获取预览图数据
def GetModalData(name):
    if name == '深圳公交线网数据简化':
        file = r'shenzhen\Basic_database\input\SZ_BusRouteExsit.geojson'
        with open(file, 'r', encoding='utf-8')as f:
            d = json.load(f)
        return d

    elif name == '深圳简化路网数据':
        file = r'shenzhen\Basic_database\input\SZ_RoadArc.geojson'
        with open(file, 'r', encoding='utf-8')as f:
            d = json.load(f)
        return d

    elif name == '深圳道路节点数据':
        file = r'shenzhen\Basic_database\input\SZ_RoadNode.geojson'
        with open(file, 'r', encoding='utf-8')as f:
            d = json.load(f)
        return d

    elif name == '深圳公交线网数据':
        file = r'shenzhen\Basic_database\others\SZ_BusLine.geojson'
        with open(file, 'r', encoding='utf-8')as f:
            d = json.load(f)
        return d

    elif name == '深圳站点数据':
        file = r'shenzhen\Basic_database\others\SZ_BusStop.geojson'
        with open(file, 'r', encoding='utf-8')as f:
            d = json.load(f)
        return d

    elif name == '深圳行政区数据':
        file = r'shenzhen\Basic_database\others\SZ_District.geojson'
        with open(file, 'r', encoding='utf-8')as f:
            d = json.load(f)
        return d

    elif name == '深圳地铁线网数据':
        file = r'shenzhen\Basic_database\others\SZ_MetroLine.geojson'
        with open(file, 'r', encoding='utf-8')as f:
            d = json.load(f)
        return d

    elif name == '深圳地铁站点数据':
        file = r'shenzhen\Basic_database\others\SZ_MetroStation.geojson'
        with open(file, 'r', encoding='utf-8')as f:
            d = json.load(f)
        return d

    elif name == '深圳轮廓数据':
        file = r'shenzhen\Basic_database\others\SZ_Outline.geojson'
        with open(file, 'r', encoding='utf-8')as f:
            d = json.load(f)
        return d

    elif name == '深圳公交分析小区数据':
        file = r'shenzhen\Basic_database\others\SZ_TAZ.geojson'
        with open(file, 'r', encoding='utf-8')as f:
            d = json.load(f)
        return d



