let config = {
    TABS: ['HOT', 'AB', 'CD', 'EFG', 'H', 'J', 'KL', 'MNP', 'QR', 'S', 'T', 'W', 'X', 'Y', 'Z'],
    CITYS: {
        HOT: {
            HOT: ["北京市", "上海市", "广州市", "深圳市", "南京市", "杭州市", "天津市", "重庆市",
                "成都市", "青岛市", "苏州市", "无锡市", "常州市", "温州市", "武汉市", "长沙市",
                "南昌市", "三亚市", "合肥市", "石家庄市"]
        },
        AB: {
            A: ["阿拉善盟", "鞍山市", "安庆市", "安阳市", "阿坝藏族羌族自治州", "安顺市", "阿里地区",
                "安康市", "阿克苏地区", "阿勒泰地区", "阿拉尔市"],
            B: ["北京市", "保定市", "包头市", "巴彦淖尔市", "本溪市", "白山市", "白城市", "蚌埠市", "亳州市", "滨州市", "北海市", "百色市", "白沙黎族自治县",
                "保亭黎族苗族自治县", "巴中市", "毕节地区", "保山市", "宝鸡市", "白银市", "博尔塔拉蒙古自治州",
                "巴音郭楞蒙古自治州", "北区"]
        },
        CD: {
            C: ["重庆市", "成都市", "常州市", "长沙市", "承德市", "沧州市", "长治市", "赤峰市", "朝阳市",
                "长春市", "滁州市", "巢湖市", "池州市", "常德市", "郴州市", "潮州市", "崇左市", "澄迈县",
                "昌江黎族自治县", "楚雄彝族自治州", "昌都地区", "昌吉回族自治州"],
            D: ["大同市", "大连市", "丹东市",
                "大庆市", "大兴安岭地区", "东营市", "德州市", "东莞市", "儋州市", "东方市", "定安县", "德阳市",
                "达州市", "大理白族自治州", "德宏傣族景颇族自治州", "迪庆藏族自治州", "定西市", "东区", "大埔区", "大堂区"]
        },
        EFG: {
            E: ["鄂尔多斯市", "鄂州市", "恩施土家族苗族自治州"],
            F: ["抚顺市", "阜新市", "阜阳市", "福州市", "抚州市", "佛山市", "防城港市"],
            G: ["广州市", "赣州市", "桂林市", "贵港市", "广元市", "广安市", "贵阳市", "固原市", "高雄市",
                "高雄县", "甘南藏族自治州", "甘孜藏族自治州"]
        },
        H: {
            H: ["杭州市", "合肥市", "邯郸市", "衡水市", "呼和浩特市", "呼伦贝尔市", "葫芦岛市", "哈尔滨市",
                "鹤岗市", "黑河市", "淮安市", "湖州市", "淮南市", "淮北市", "黄山市", "菏泽市", "鹤壁市", "黄石市",
                "黄冈市", "衡阳市", "怀化市", "惠州市", "河源市", "贺州市", "河池市", "海口市", "红河哈尼族彝族自治州",
                "汉中市", "海东地区", "海北藏族自治州", "黄南藏族自治州", "海南藏族自治州", "果洛藏族自治州", "海西蒙古族藏族自治州",
                "哈密地区", "和田地区", "花莲县", "黄大仙区", "花地玛堂区"]
        },
        J: {
            J: ["晋城市", "晋中市", "锦州市", "吉林市", "鸡西市", "佳木斯市", "嘉兴市", "金华市", "景德镇市", "九江市",
                "吉安市", "济南市", "济宁市", "焦作市", "济源市", "荆门市", "荆州市", "江门市", "湛江市", "揭阳市",
                "嘉峪关市", "金昌市", "酒泉市", "基隆市", "嘉义市", "嘉义县", "九龙城区", "嘉模堂区"],
        },
        KL: {
            K: ["开封市", "昆明市", "克拉玛依市", "克孜勒苏柯尔克孜自治州", "喀什地区"],
            L: ["廊坊市", "临汾市", "吕梁市", "辽阳市", "辽源市", "连云港市", "丽水市", "六安市", "龙岩市", "莱芜市", "临沂市", "聊城市",
                "洛阳市", "漯河市", "娄底市", "柳州市", "来宾市", "临高县", "乐东黎族自治县", "陵水黎族自治县", "泸州市",
                "乐山市", "凉山彝族自治州", "六盘水市", "丽江市", "临沧市", "拉萨市", "林芝地区", "兰州市", "陇南市",
                "临夏回族自治州"]
        },
        MNP: {
            M: ["牡丹江市", "马鞍山市", "茂名市", "梅州市", "绵阳市", "眉山市", "苗栗县"],
            N: ["南京市", "南昌市", "南通市", "宁波市", "南平市", "宁德市", "南阳市", "南宁市", "南沙群岛", "内江市", "南充市", "怒江傈傈族自治州",
                "那曲地区", "南投县"],
            P: ["盘锦市", "莆田市", "萍乡市", "平顶山市", "濮阳市", "攀枝花市", "平凉市", "屏东县", "澎湖县"]
        },
        QR: {
            Q: ["青岛市", "秦皇岛市", "齐齐哈尔市", "黔西南布依族苗族自治州", "七台河市", "衢州市", "泉州市", "潜江市", "清远市", "钦州市",
                "琼海市", "曲靖市", "庆阳市", "荃湾区", "黔东南苗族侗族自治州", "黔南布依族苗族自治州", "琼中黎族苗族自治县"],
            R: ["日照市", "日喀则地区"]
        },
        S: {
            S: ["上海市", "深圳市", "苏州市", "石家庄市", "三亚市", "朔州市", "沈阳市", "四平市", "松原市", "双鸭山市",
                "绥化市", "宿迁市", "绍兴市", "宿州市", "三明市", "上饶市", "三门峡市", "商丘市", "十堰市", "随州市",
                "邵阳市", "韶关市", "汕头市", "汕尾市", "三亚市", "遂宁市", "思茅市", "山南地区", "商洛市", "石嘴山市", "石河子市",
                "深水埗区", "沙田区", "神农架林区", "圣安多尼堂区", "圣方济各堂区"]
        },
        T: {
            T: ["天津市", "唐山市", "太原市", "通辽市", "铁岭市", "通化市", "泰州市", "台州市", "铜陵市", "泰安市", "天门市",
                "屯昌县", "铜仁地区", "铜川市", "天水市", "吐鲁番地区", "塔城地区", "图木舒克市", "台北市", "台中市", "台南市",
                "台北县", "桃园县", "台中县", "台南县", "台东县", "屯门区"]
        },
        W: {
            W: ["无锡市", "温州市", "武汉市", "乌海市", "乌兰察布市", "芜湖市", "潍坊市", "威海市", "梧州市",
                "五指山市", "文昌市", "万宁市", "文山壮族苗族自治州", "渭南市", "武威市", "吴忠市", "乌鲁木齐市",
                "五家渠市", "湾仔区", "望德堂区"]
        },
        X: {
            X: ["邢台市", "忻州市", "兴安盟", "徐州市", "宣城市", "厦门市", "新余市", "新乡市", "许昌市",
                "信阳市", "襄樊市", "孝感市", "咸宁市", "仙桃市", "湘潭市", "西安市", "咸阳市", "西宁市",
                "新竹市", "新竹县", "西贡区", "锡林郭勒盟", "西沙群岛", "湘西土家族苗族自治州", "西双版纳傣族自治州"]
        },
        Y: {
            Y: ["阳泉市", "运城市", "营口市", "延边朝鲜族自治州", "伊春市", "盐城市", "扬州市", "鹰潭市", "宜春市", "烟台市", "宜昌市",
                "岳阳市", "益阳市", "永州市", "阳江市", "云浮市", "玉林市", "宜宾市", "雅安市", "玉溪市", "延安市", "榆林市", "玉树藏族自治州",
                "银川市", "伊犁哈萨克自治州", "宜兰县", "云林县", "油尖旺区", "元朗区"]
        },
        Z: {
            Z: ["郑州市", "张家口市", "镇江市", "舟山市", "漳州市", "淄博市", "枣庄市", "周口市", "驻马店市", "株洲市", "张家界市",
                "珠海市", "肇庆市", "中山市", "自贡市", "资阳市", "遵义市", "昭通市", "张掖市", "中卫市",
                "彰化县", "中西区", "中沙群岛的岛礁及其海域"]
        }

    }
}
export default config;