import json
with open(r'shenzhen\Passenger_flow_analysis\stationdata\sta_class.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
print(data)
search = 'number'.lower()
print(data[search])
# print(data)