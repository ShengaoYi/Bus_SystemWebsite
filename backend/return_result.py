import json


class Result:
    def __init__(self):
        self.code = -1
        self.msg = ""
        self.data = None

    def success_with_no_data(self):
        self.code = 1
        self.msg = "成功"
        return to_json(self.__dict__)

    def fail(self):
        self.code = 0
        self.msg = "失败"
        return to_json(self.__dict__)

    def success_with_data(self, data):
        self.code = 1
        self.msg = "成功"
        self.data = data
        return to_json(self.__dict__)

    def fail_with_msg(self, msg):
        self.code = 0
        self.msg = msg
        return to_json(self.__dict__)


def to_json(data):
    return json.dumps(data, indent=2, ensure_ascii=False)