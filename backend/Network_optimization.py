import base64

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


def GetAlgorithmsPic():
    ANT_pic = r'shenzhen\Network_optimization\algorithms_pic\ANT.png'
    GA_pic = r'shenzhen\Network_optimization\algorithms_pic\GA.png'
    LNS_pic = r'shenzhen\Network_optimization\algorithms_pic\LNS.png'
    TS_pic = r'shenzhen\Network_optimization\algorithms_pic\TS.png'

    data = {
        'ANT': read_fig(ANT_pic),
        'GA': read_fig(GA_pic),
        'LNS': read_fig(LNS_pic),
        'TS': read_fig(TS_pic),
    }

    return data