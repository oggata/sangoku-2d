/*イラスト */
//https://flowerillust.com/html/back/back_pattern0058.html


var CONFIG = CONFIG || {};

CONFIG.FONT = "PingFangHK-Light";
CONFIG.DEBUG_FLAG       = 0;
CONFIG.DEBUG_STAGE_NUM  = 4;
CONFIG.BGM_VOLUME       = 1;
CONFIG.SE_VOLUME        = 1;
CONFIG.CARD_SPEND_COST  = 3;


CONFIG.BASE_CARD_Y = 820;


CONFIG.MAP = [
    2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
    2,2,2,2,2,3,3,1,2,2,2,1,1,1,1,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,
    2,2,2,1,3,3,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,
    2,2,2,3,3,3,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,
    2,2,2,3,3,3,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,
    2,2,2,3,3,3,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,4,4,4,1,1,1,
    2,2,3,3,3,1,1,1,4,4,4,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,4,4,4,4,4,4,1,1,1,
    3,3,3,1,3,1,1,4,4,4,4,4,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,4,4,4,4,4,4,1,1,1,
    1,1,3,3,3,1,1,1,4,4,4,4,4,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,4,5,4,4,1,1,1,
    1,1,3,3,3,1,1,4,4,4,4,4,4,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,5,5,4,4,1,1,1,
    1,1,3,3,1,1,1,4,4,4,4,4,4,4,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,4,4,4,1,1,1,
    1,1,3,3,1,1,1,4,4,4,4,4,4,4,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,5,4,4,4,1,1,1,
    1,1,1,1,1,4,4,4,4,4,4,4,4,4,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,5,1,1,1,1,1,1,
    1,1,1,1,1,4,4,1,4,4,4,4,4,4,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,1,4,4,4,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,5,1,1,1,3,1,1,1,
    1,1,1,1,1,1,1,1,1,1,1,4,4,4,4,1,1,1,1,1,1,1,1,5,5,5,1,1,1,1,1,5,3,3,1,3,3,1,3,1,
    1,1,1,1,1,1,1,1,1,1,1,4,4,4,4,1,1,1,1,1,1,1,1,1,1,5,1,1,1,1,5,5,3,3,3,3,3,1,3,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,4,4,1,1,1,1,1,1,1,1,1,1,5,5,5,1,1,5,3,3,3,3,3,3,1,3,3,
    1,1,1,1,1,1,1,1,1,1,1,1,1,4,4,1,1,1,1,1,1,1,1,1,1,1,5,5,1,1,5,3,3,3,3,3,3,3,3,3,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,1,1,1,1,1,1,1,1,1,1,1,5,5,1,1,5,3,3,3,3,3,3,3,3,3,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,1,1,5,3,3,3,3,3,3,3,3,3,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,5,5,5,3,3,3,3,3,3,3,3,3,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,5,1,1,3,3,3,3,3,3,3,3,3,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,5,1,1,3,3,3,3,3,3,3,3,3,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,3,1,1,1,1,1,1,1,1,1,1,1,5,5,1,1,3,3,3,3,3,3,3,3,3,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,3,1,1,1,1,1,1,1,1,1,1,1,1,5,1,1,3,3,3,3,3,3,3,3,3,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,3,3,1,1,1,1,1,1,1,1,1,1,1,5,5,5,1,3,3,3,3,3,3,3,3,
    2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,3,3,1,1,1,1,1,1,1,1,1,1,1,1,5,1,3,3,3,3,3,3,3,3,
    2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,3,3,3,1,1,1,1,1,1,1,1,1,1,1,1,5,5,3,3,3,3,3,3,3,3,
    2,2,1,2,2,2,2,1,1,1,1,1,1,1,1,1,3,3,3,3,1,1,1,1,1,1,1,1,1,1,1,5,5,3,3,3,3,3,3,3,
    2,2,1,1,2,2,2,1,1,1,1,4,4,4,1,1,1,1,3,3,3,1,1,1,1,1,1,1,1,1,1,1,1,5,1,3,3,3,3,3,
    2,2,1,1,1,2,2,1,1,1,4,4,4,4,1,1,1,3,3,3,3,3,3,3,1,3,3,1,1,1,1,1,1,5,5,3,3,3,1,3,
    2,2,1,1,1,1,2,1,1,1,4,4,4,4,4,1,1,1,3,3,3,3,3,3,1,3,3,1,1,1,1,1,1,1,5,3,3,3,1,3,
    2,2,1,1,1,1,1,2,1,1,4,4,4,4,4,4,4,1,1,1,1,1,3,3,1,3,3,1,1,1,1,1,1,1,5,3,3,3,1,1,
    2,2,1,1,1,1,1,1,1,1,1,1,4,4,4,4,4,4,4,1,1,1,3,3,1,3,3,1,1,1,1,1,1,1,5,1,1,3,1,1,
    2,2,1,1,1,1,1,1,1,1,1,1,1,4,4,4,4,4,4,1,1,3,3,3,1,3,3,1,1,1,1,1,1,1,1,5,1,1,1,1,
    2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,3,3,3,3,3,3,3,3,3,1,1,1,1,5,5,5,5,5,
    2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,5,5,5,5,5,
];


CONFIG.MAP = [
    2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,1,1,1,1,1,1,1,3,2,1,1,3,3,3,3,2,2,2,2,2,2,2,2,2,3,1,1,2,3,3,3,2,2,2,
    2,2,2,1,1,1,1,1,1,1,1,1,1,3,2,2,1,1,1,1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,2,2,
    2,2,1,1,1,1,1,1,2,2,1,1,1,1,3,3,2,1,1,1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,2,2,
    2,2,1,1,1,1,1,1,1,2,1,1,1,1,3,3,3,2,1,1,1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,2,2,
    2,1,1,1,1,1,1,1,1,2,1,1,1,1,1,3,3,3,2,1,1,1,3,3,3,1,1,1,3,3,3,3,3,3,3,3,3,1,2,2,
    2,1,1,1,1,1,1,1,2,2,2,1,1,1,1,1,3,3,2,2,1,1,3,3,3,1,1,1,3,3,3,3,3,3,3,3,3,1,2,2,
    2,1,1,1,1,1,1,2,2,2,1,1,1,1,1,1,3,3,3,2,1,1,3,3,3,1,1,1,3,3,3,3,3,3,3,3,3,2,2,2,
    2,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,3,3,3,2,2,1,3,3,3,1,1,1,3,3,3,3,3,3,3,3,2,2,2,2,
    2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,3,3,2,2,3,3,3,3,1,1,1,3,3,3,3,3,3,3,3,2,2,2,2,
    2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,3,3,2,2,2,1,3,3,1,1,1,3,3,3,3,3,3,3,2,2,2,2,2,
    2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,3,1,2,1,1,3,3,1,1,1,3,1,3,1,1,1,1,1,1,2,2,2,
    2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,1,1,1,1,1,1,3,3,3,3,3,1,1,2,1,1,1,1,1,2,2,2,
    2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,3,3,1,1,1,1,1,2,2,1,2,2,1,1,1,2,2,1,1,1,1,2,2,2,2,
    2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,3,3,1,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,2,2,2,
    2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,3,3,1,2,1,1,2,1,1,1,1,2,2,2,2,1,1,1,1,1,1,1,1,2,2,
    2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,3,3,2,1,1,1,1,1,1,1,1,1,1,2,2,2,1,5,1,1,1,1,1,1,2,
    2,2,2,2,2,1,1,1,1,1,1,1,1,1,3,3,3,3,1,1,1,1,1,1,1,1,1,1,1,1,2,1,5,5,5,5,1,1,1,2,
    2,2,2,2,2,1,1,1,1,1,1,1,1,1,3,3,3,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,5,5,1,1,1,2,
    2,2,2,2,2,1,1,1,1,1,1,1,1,1,3,3,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,5,5,1,1,1,2,
    2,2,2,2,2,1,1,3,3,3,3,3,3,3,3,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,5,5,1,1,2,2,
    2,2,2,1,1,3,3,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,5,5,1,2,2,2,
    2,2,2,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,5,5,1,2,2,2,
    5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,5,5,1,1,2,2,
    5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,5,5,1,1,2,2,
    5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,5,5,1,1,1,2,
    5,5,5,5,1,1,1,1,5,5,5,5,5,5,5,5,5,5,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,5,5,1,1,1,2,
    5,5,5,5,1,1,1,1,1,1,1,5,5,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,5,5,5,1,1,1,2,
    5,5,5,5,1,1,1,1,1,1,1,5,5,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,5,5,5,5,5,1,1,1,2,
    5,5,5,1,1,1,1,1,1,1,1,5,5,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,5,5,5,5,5,5,5,1,1,1,2,
    5,5,5,1,1,1,1,1,1,1,1,5,5,1,1,1,1,1,1,1,1,1,1,1,5,5,5,5,5,5,5,5,5,5,5,5,1,1,2,2,
    5,5,5,1,1,1,1,1,1,1,1,5,5,1,1,1,1,1,1,1,1,1,1,1,1,5,5,5,5,5,5,5,5,5,5,1,1,1,2,2,
    5,5,5,1,1,1,1,1,1,1,1,5,5,1,1,1,1,1,1,1,1,1,1,1,1,1,5,5,5,5,5,5,5,5,5,1,1,1,2,2,
    5,5,5,1,1,1,1,1,1,1,1,5,5,1,1,1,1,1,1,1,1,1,1,2,1,1,1,5,5,5,5,5,5,5,5,1,1,1,2,2,
    5,5,5,1,1,1,1,1,1,1,1,5,5,1,1,1,1,1,1,1,1,1,1,1,2,2,1,5,5,5,5,5,5,1,1,1,1,1,2,2,
    5,5,5,1,1,1,1,1,1,1,1,5,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,5,5,5,1,1,1,1,1,1,2,2,
    5,5,5,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,
    5,5,5,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,
    5,5,5,5,5,5,5,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
    5,5,5,5,5,5,5,5,5,5,5,5,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
];

CONFIG.RAND_ARRAY = [1,4,6,8,3,5,4,7,2,3,1,6,7,8,5,4,1,2,6,3,2,8,2,3,6,7,8,5,6,8,3,4,1,7,6,5,1,5,8,9,4,7,2,8,3,5,3,4,5,7,2,1,1,5,1,6,4,3];

CONFIG.BATTLE_LIST_POSITION = [{},
    { 
        "x"         : 140 + 180*0,
        "y"         : 750
    },
    { 
        "x"         : 140 + 180*1,
        "y"         : 750
    },
    { 
        "x"         : 140 + 180*2,
        "y"         : 750
    },

    { 
        "x"         : 140 + 180*0,
        "y"         : 450
    },
    { 
        "x"         : 140 + 180*1,
        "y"         : 450
    },
    { 
        "x"         : 140 + 180*2,
        "y"         : 450
    },
];

CONFIG.MESSAGE_WARNING  = 
    [
        '外部システムから侵入されました.....',
        'システム侵入まで..........',
        '残り3秒..................',
        '残り2秒..................',
        '残り1秒..................',
        '..................................................................................',
    ].join("\n");

CONFIG.MESSAGE_HACKING  = 
    [
        '外部システムに侵入成功しました.....',
        'システム侵入まで..........',
        '残り3秒..................',
        '残り2秒..................',
        '残り1秒..................',
        '..................................................................................',
    ].join("\n");



CONFIG.LIST_POSITION = [{},
    { 
        "x"         : 140 + 180*0,
        "y"         : CONFIG.BASE_CARD_Y - 240 * 0
    },
    { 
        "x"         : 140 + 180*1,
        "y"         : CONFIG.BASE_CARD_Y - 240 * 0
    },
    { 
        "x"         : 140 + 180*2,
        "y"         : CONFIG.BASE_CARD_Y - 240 * 0
    },
    { 
        "x"         : 140 + 180*0,
        "y"         : CONFIG.BASE_CARD_Y - 240 * 1
    },
    { 
        "x"         : 140 + 180*1,
        "y"         : CONFIG.BASE_CARD_Y - 240 * 1
    },
    { 
        "x"         : 140 + 180*2,
        "y"         : CONFIG.BASE_CARD_Y - 240 * 1
    },
    { 
        "x"         : 140 + 180*0,
        "y"         : CONFIG.BASE_CARD_Y - 240 * 2
    },
    { 
        "x"         : 140 + 180*1,
        "y"         : CONFIG.BASE_CARD_Y - 240 * 2
    },
    { 
        "x"         : 140 + 180*2,
        "y"         : CONFIG.BASE_CARD_Y - 240 * 2
    }
];

/*
    勝利報酬が+10SGK上昇!

    相手の侵略を+5ターン停止!

    平地の占領スピード上昇！

    山岳の占領スピード上昇！

    沿岸の占領スピード上昇！

    森林の占領スピード上昇！
*/


CONFIG.CARD = [
    { 
    },
    { 
        "id"         : 1,
        "name"       : "AAA",
        "description": "AAA",
        "useTxt"     : "新しい地点を攻略開始",
        "image"      : "res/card001.png",
        "weak"       : [],
        "strong"     : [1,0,0,0],
    },
    { 
        "id"         : 2,
        "name"       : "",
        "description": "",
        "useTxt"     : "新しい地点を攻略開始",
        "image"      : "res/card002.png",
        "weak"       : [],
        "strong"     : [0,1,0,0],
    },
    { 
        "id"         : 3,
        "name"       : "",
        "description": "",
        "useTxt"     : "新しい地点を攻略開始",
        "image"      : "res/card003.png",
        "weak"       : [],
        "strong"     : [0,0,1,0],
    },
    { 
        "id"         : 4,
        "name"       : "",
        "description": "",
        "useTxt"     : "新しい地点を攻略開始",
        "image"      : "res/card004.png",
        "weak"       : [],
        "strong"     : [0,0,0,1],
    },
    { 
        "id"         : 5,
        "name"       : "",
        "description": "",
        "useTxt"     : "新しい地点を攻略開始",
        "image"      : "res/card005.png",
        "weak"       : [],
        "strong"     : [1,0,0,0],
    },
    { 
        "id"         : 6,
        "name"       : "",
        "description": "",
        "useTxt"     : "新しい地点を攻略開始",
        "image"      : "res/card001.png",
        "weak"       : [],
        "strong"     : [0,1,0,0],
    },
    { 
        "id"         : 7,
        "name"       : "",
        "description": "",
        "useTxt"     : "新しい地点を攻略開始",
        "image"      : "res/card002.png",
        "weak"       : [6],
        "strong"     : [6],
    },
    { 
        "id"         : 8,
        "name"       : "",
        "description": "",
        "useTxt"     : "効果なし",
        "image"      : "res/card003.png",
        "weak"       : [6],
        "strong"     : [6],
    },
    { 
        "id"         : 9,
        "name"       : "",
        "description": "",
        "useTxt"     : "効果なし",
        "image"      : "res/card004.png",
        "weak"       : [6],
        "strong"     : [6],
    },
    { 
        "id"         : 10,
        "name"       : "",
        "description": "",
        "useTxt"     : "効果なし",
        "image"      : "res/card001.png",
        "weak"       : [6],
        "strong"     : [6],
    },
    { 
        "id"         : 11,
        "name"       : "AAA",
        "description": "AAA",
        "useTxt"     : "効果なし",
        "image"      : "res/card001.png",
        "weak"       : [6],
        "strong"     : [6],
    },
    { 
        "id"         : 12,
        "name"       : "",
        "description": "",
        "useTxt"     : "効果なし",
        "image"      : "res/card001.png",
        "weak"       : [6],
        "strong"     : [6],
    },
    { 
        "id"         : 13,
        "name"       : "",
        "description": "",
        "useTxt"     : "効果なし",
        "image"      : "res/card001.png",
        "weak"       : [6],
        "strong"     : [6],
    },
    { 
        "id"         : 14,
        "name"       : "",
        "description": "",
        "useTxt"     : "効果なし",
        "image"      : "res/card001.png",
        "weak"       : [6],
        "strong"     : [6],
    },
    { 
        "id"         : 15,
        "name"       : "",
        "description": "",
        "useTxt"     : "効果なし",
        "image"      : "res/card001.png",
        "weak"       : [6],
        "strong"     : [6],
    },
    { 
        "id"         : 16,
        "name"       : "",
        "description": "",
        "useTxt"     : "効果なし",
        "image"      : "res/card001.png",
        "weak"       : [6],
        "strong"     : [6],
    },
    { 
        "id"         : 17,
        "name"       : "",
        "description": "",
        "useTxt"     : "効果なし",
        "image"      : "res/card001.png",
        "weak"       : [6],
        "strong"     : [6],
    },
    { 
        "id"         : 18,
        "name"       : "",
        "description": "",
        "useTxt"     : "効果なし",
        "image"      : "res/card001.png",
        "weak"       : [6],
        "strong"     : [6],
    },
    { 
        "id"         : 19,
        "name"       : "",
        "description": "",
        "useTxt"     : "効果なし",
        "image"      : "res/card001.png",
        "weak"       : [6],
        "strong"     : [6],
    },
    { 
        "id"         : 20,
        "name"       : "",
        "description": "",
        "useTxt"     : "効果なし",
        "image"      : "res/card001.png",
        "weak"       : [6],
        "strong"     : [6],
    },
    { 
        "id"         : 21,
        "name"       : "AAA",
        "description": "AAA",
        "useTxt"     : "効果なし",
        "image"      : "res/card001.png",
        "weak"       : [6],
        "strong"     : [6],
    },
    { 
        "id"         : 22,
        "name"       : "",
        "description": "",
        "useTxt"     : "スピードが+10した",
        "image"      : "res/card001.png",
        "weak"       : [6],
        "strong"     : [6],
    },
    { 
        "id"         : 23,
        "name"       : "",
        "description": "",
        "useTxt"     : "スピードが+10した",
        "image"      : "res/card003.png",
        "weak"       : [6],
        "strong"     : [6],
    }
];
