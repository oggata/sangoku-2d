var BattleWindow = cc.Node.extend({
    ctor: function (game) {
        this._super();
        this.game = game;
        this.mode = "wait";
        this.field = cc.Sprite.create("res/monitor_battle.png");
        this.field.setAnchorPoint(0, 0);
        this.addChild(this.field);
        this.redScore = 0;
        this.greenScore = 0;
        this.whiteCnt = 0;
        this.networkWaitCnt = 0;
        this.waitCnt = 0;
        this.markers = [];
        this.greenMessages = [];
        this.greenMessageLabel = new cc.LabelTTF("", "Arial", 18);
        this.greenMessageLabel.setFontFillColor(new cc.Color(0, 255, 0, 255));
        this.greenMessageLabel.setAnchorPoint(0, 1);
        this.greenMessageLabel.setPosition(10, 620);
        this.addChild(this.greenMessageLabel);
        this.greenMessageRemoveCnt = 0;
        this.redMessages = [];
        this.redMessageLabel = new cc.LabelTTF("", "Arial", 18);
        this.redMessageLabel.setFontFillColor(new cc.Color(255, 0, 0, 255));
        this.redMessageLabel.setAnchorPoint(1, 1);
        this.redMessageLabel.setPosition(630, 620);
        this.addChild(this.redMessageLabel);
        this.redMessageRemoveCnt = 0;
        this.initMap();
        this.turnCnt = 0;
        this.timeCnt = 0;
        this.redTimeCnt = 0;
        this.greenTimeCnt = 0;
        this.scheduleUpdate();

        this.humans = [];

        //配置可能なリストを作る
        this.positionalMarkers = [];
        for (var j = 0; j < this.markers.length; j++) {
            ////スピードはMAPCHIPTYPEによって違う (1:普通 2:山岳 3:森 4:砂 5:海 6:その他)
            if(this.markers[j].mapChipType == 1 || this.markers[j].mapChipType == 3 || this.markers[j].mapChipType == 4){
                this.positionalMarkers.push(this.markers[j]);
            }
        }
        //コンピューターの時は配置可能リストの中から、ランダムで配置する
        if (this.game.isCom == true) {
            this.positionalMarkers.sort(this.shuffle);
            this.addPoint2("RED", this.positionalMarkers[0].col, this.positionalMarkers[0].row);
        }
        this.errorMessageLabel = new cc.LabelTTF("", "Arial", 18);
        this.errorMessageLabel.setFontFillColor(new cc.Color(255, 255, 255, 255));
        this.errorMessageLabel.setAnchorPoint(0, 0);
        this.errorMessageLabel.setPosition(10, 10);
        this.addChild(this.errorMessageLabel);
    },

    update: function (dt) {
        //人間さんをupdateする
        for (var j = 0; j < this.humans.length; j++) {
            if(this.humans[j].update() == false){
                this.field.removeChild(this.humans[j]);
                this.humans.splice(j,1);
            }
        }

        //敵の開始地点をセットする
        if(this.game.gameStatus == "prepare" || this.game.gameStatus == "wait"){
            if(this.game.storage.enemyStartPositionData){
                for (var m = 0; m < this.game.storage.enemyStartPositionData.length; m++) {
                    var _colorName = this.game.storage.enemyStartPositionData[m].colorName;
                    var _col = this.game.storage.enemyStartPositionData[m].col;
                    var _row = this.game.storage.enemyStartPositionData[m].row;
                    this.addPoint2(_colorName,_col,_row);
/*
                    if(this.game.gameStatus == "prepare"){
                        //城を建てる
                        this.addCastleIcon(_col,_row);
                    }
*/
                }
            }
        }

        //メッセージを制御する
        this.updateMessage();

        var _redCnt = 0;
        var _greenCnt = 0;
        var _whiteCnt = 0;
        for (var i = 0; i < this.markers.length; i++) {
            if (this.markers[i].colorId == "WHITE" && this.markers[i].isRender == true) {
                this.markers[i].color = new cc.Color(0, 0, 0, 0);
                this.markers[i].setOpacity(255 * 0);
            }
            if (this.markers[i].colorId == "RED" && this.markers[i].isRender == true) {
                this.markers[i].color = new cc.Color(140, 0, 0, 255);
                this.markers[i].setOpacity(255 * 0.7);
            }
            if (this.markers[i].colorId == "GREEN" && this.markers[i].isRender == true) {
                this.markers[i].color = new cc.Color(35, 140, 0, 255);
                this.markers[i].setOpacity(255 * 0.6);
            }
            if (this.markers[i].colorId == "RED") {
                _redCnt++;
            }
            if (this.markers[i].colorId == "GREEN") {
                _greenCnt++;
            }
        }
        this.redScore = _redCnt;
        this.greenScore = _greenCnt;
        _whiteCnt = this.positionalMarkers.length - _redCnt - _greenCnt;

        if (this.mode == "wait"){
            this.waitCnt++;
            this.maxWaitCnt = 30 * 20;
            this.errorMessageLabel.setString("ログアウトまで" + Math.ceil((this.maxWaitCnt-this.waitCnt)/30));
            if(this.waitCnt >= this.maxWaitCnt){
                this.game.storage.CONNECTION_ERROR();
                this.game.goToStageLayer(1);
            }
            return;
        }
        this.timeCnt++;
        this.redTimeCnt++;
        this.greenTimeCnt++;
        //残り少なくなったらスピードアップ
        this.speedLevel = 0;
        CONFIG.ALL_SPEED_LEVEL = [50,45,30, 28, 25, 20, 15, 10, 7, 5];
        if (this.whiteCnt <= 50) {
            this.maxTimeCnt = 5;
        } else {
            this.maxTimeCnt = CONFIG.ALL_SPEED_LEVEL[this.speedLevel];
        }
        if (this.timeCnt >= this.maxTimeCnt) {
            this.timeCnt = 0;
            //ゲーム画面の時、ある程度ターンcntがプレイヤー間で離れてしまったらネットワークエラーにする
            //ただし、自動モードがonになっていない場合に限る
            if (this.mode != "result" && this.game.isCom == true) {
                this.turnCnt += 1;
            }
            if (this.mode != "result" && this.game.isCom == false) {
                if (Math.abs(this.turnCnt - this.game.storage.enemyTurnNum) >= 20) {
                    if (this.turnCnt > this.game.storage.enemyTurnNum) {
                        this.game.labelStartCnt007.setVisible(true);
                    } else {
                        this.turnCnt += 1;
                        this.game.labelStartCnt008.setVisible(true);
                    }
                    this.networkWaitCnt++;
                } else {
                    this.turnCnt += 1;
                    this.game.labelStartCnt007.setVisible(false);
                    this.game.labelStartCnt008.setVisible(false);
                    this.networkWaitCnt = 0;
                }
                //遅延が回復しない場合はネットワークエラー
                if(this.networkWaitCnt >= 1){
                    this.errorMessageLabel.setString("ログアウトまで" + Math.ceil(20-this.networkWaitCnt));
                }
                if (this.networkWaitCnt >= 20) {
                    this.game.storage.CONNECTION_ERROR();
                    this.game.goToStageLayer(1);
                }
            }
            this.increment("GREEN", this.turnCnt);
            this.increment("RED", this.turnCnt);
        }

        //空白が50以下になったら試合終了
        this.whiteCnt = _whiteCnt;
        if (_whiteCnt <= 10) {
            this.mode = "result";
        }
    },

    addGreenMessage: function (msg) {
        this.greenMessages.push(msg);
        if (this.greenMessages.length >= 10) {
            this.greenMessages.splice(0, 1);
        }
    },
    addRedMessage: function (msg) {
        this.redMessages.push(msg);
        if (this.redMessages.length >= 10) {
            this.redMessages.splice(0, 1);
        }
    },
    addHuman:function(col,row,colorName){
        if(this.humans.length >= 20) return;
        this.human = new Human(this,col,row,colorName);
        this.field.addChild(this.human);
        this.humans.push(this.human);
    },
    updateMessage:function(){
        //メッセージを制御する
        var greenTxt = "";
        for (var m = 0; m < this.greenMessages.length; m++) {
            greenTxt += this.greenMessages[m] + "\n";
        }
        this.greenMessageLabel.setString(greenTxt);
        if (this.greenMessages.length >= 5) {
            this.greenMessageRemoveCnt++;
            if (this.greenMessageRemoveCnt >= 30 * 5) {
                this.greenMessageRemoveCnt = 0;
                this.greenMessages.splice(0, 1);
            }
        } else {
            this.greenMessageRemoveCnt = 0;
        }
        var redTxt = "";
        for (var m = 0; m < this.redMessages.length; m++) {
            redTxt += this.redMessages[m] + "\n";
        }
        this.redMessageLabel.setString(redTxt);
        if (this.greenMessages.length >= 5) {
            this.redMessageRemoveCnt++;
            if (this.redMessageRemoveCnt >= 30 * 5) {
                this.redMessageRemoveCnt = 0;
                this.redMessages.splice(0, 1);
            }
        } else {
            this.redMessageRemoveCnt = 0;
        }
    },

    initMap: function () {
        var _incrementNum = 0;
        for (var row = 0; row < 40; row++) {
            for (var col = 0; col < 40; col++) {
                var _rand = CONFIG.MAP[_incrementNum]
                if (_rand == 1) {
                    this.chip = cc.Sprite.create("res/map_001.png");
                }
                if (_rand == 2) {
                    this.chip = cc.Sprite.create("res/map_002.png");
                }
                if (_rand == 3) {
                    this.chip = cc.Sprite.create("res/map_003.png");
                }
                if (_rand == 4) {
                    this.chip = cc.Sprite.create("res/map_004.png");
                }
                if (_rand == 5) {
                    this.chip = cc.Sprite.create("res/map_005.png");
                }
                if (_rand == 6) {
                    this.chip = cc.Sprite.create("res/map_006.png");
                }
                this.chip.setAnchorPoint(0, 0);
                this.chip.setPosition(16 * col, 16 * row);
                this.field.addChild(this.chip);
                this.marker = cc.LayerColor.create(new cc.Color(0, 0, 0, 255*0.4), 16, 16);
                this.marker.setPosition(16 * col, 16 * row);
                this.marker.colorId = "WHITE";
                this.marker.mapChipType = _rand;
                this.marker.col = col;
                this.marker.row = row;
                this.field.addChild(this.marker);
                this.markers.push(this.marker);
                _incrementNum++;
            }
        }
    },

    addCastleIcon:function(col,row){
        this.caslte = cc.Sprite.create("res/castle_icon.png");
        this.caslte.setAnchorPoint(0,0);
        var _marker = this.getMarker2(col,row);
        if(_marker){
            this.caslte.setPosition(_marker.getPosition().x,_marker.getPosition().y);
            this.field.addChild(this.caslte,999999999);
        }
    },

    addBattleIcon:function(col,row){
        this.caslte = cc.Sprite.create("res/icon_battle.png");
        this.caslte.setAnchorPoint(0,0);
        var _marker = this.getMarker2(col,row);
        if(_marker){
            this.caslte.setPosition(_marker.getPosition().x,_marker.getPosition().y);
            this.field.addChild(this.caslte,999999999);
        }
    },

    addPoint2: function (colorName, col, row) {
        for (var i = 0; i < this.markers.length; i++) {
            if(this.markers[i].mapChipType == 1 || this.markers[i].mapChipType == 3 || this.markers[i].mapChipType == 4){
                if(this.markers[i].col == col && this.markers[i].row == row){
                    this.markers[i].colorId = colorName;
                    this.markers[i].isRender = true;
                    return true;
                }
            }
        }
        return false;
    },

    getMarker:function(posX, posY){
        var _mindist = 9999999;
        var _mindistMarker = null;
        for (var i = 0; i < this.markers.length; i++) {
            var _distance = Math.sqrt(
                (posX - this.markers[i].getPosition().x) * (posX - this.markers[i].getPosition().x) + (posY - this.markers[i].getPosition()
                    .y) * (posY - this.markers[i].getPosition().y));
            if (_mindist > _distance) {
                _mindist = _distance;
                _mindistMarker = this.markers[i];
            }
        }
        return _mindistMarker;
    },

    getMarker2:function(col, row){
        for (var i = 0; i < this.markers.length; i++) {
            if(this.markers[i].col == col && this.markers[i].row == row){
                return this.markers[i];
            }
        }
        return null;
    },

    getRandNumByRoule: function (col, row, turnCnt, maxNum) {
        return (col + row * col + row * turnCnt) % maxNum;
        //return (98 + ( col + turnCnt ) * col + row * col * row + row * turnCnt * (row * col * 99 + turnCnt ) + (turnCnt * turnCnt)) % maxNum;
    },

    increment: function (colorName, turnCnt) {
        for (var i = 0; i < this.markers.length; i++) {
            //スピードはMAPCHIPTYPEによって違う (1:普通 2:山岳 3:森 4:砂 5:海 6:その他)
            var _speed = 99;
            if (this.markers[i].mapChipType == 1) {
                _speed = this.getRandNumByRoule(this.markers[i].col, this.markers[i].row, turnCnt, 5);
                _speed = 1;
            }
            if (this.markers[i].mapChipType == 3) {
                _speed = this.getRandNumByRoule(this.markers[i].col, this.markers[i].row, turnCnt, 12);
                _speed = 1;
            }
            if (this.markers[i].mapChipType == 4) {
                _speed = this.getRandNumByRoule(this.markers[i].col, this.markers[i].row, turnCnt, 10);
                _speed = 1;
            }
            if (_speed == 1 || _speed == 2 || _speed == 3) {
                //先ずはpower1-8で考える
                //自分のどちら方向に進むかを指定する
                if (this.markers[i].colorId == colorName) {
                    var _rand = this.getRandNumByRoule(this.markers[i].col, this.markers[i].row, turnCnt, 40);
                    var _directionNum = CONFIG.RAND_ARRAY[_rand];
                    var _distance = this.getRandNumByRoule(this.markers[i].col, this.markers[i].row, turnCnt, 3);
                    _distance = 1;
                    _targetCol = 0;
                    _targetRow = 0;
                    switch (_directionNum) {
                    case 1:
                        _targetCol = this.markers[i].col - _distance;
                        _targetRow = this.markers[i].row - _distance;
                        break;
                    case 2:
                        _targetCol = this.markers[i].col;
                        _targetRow = this.markers[i].row - _distance;
                        break;
                    case 3:
                        _targetCol = this.markers[i].col + _distance;
                        _targetRow = this.markers[i].row - _distance;
                        break;
                    case 4:
                        _targetCol = this.markers[i].col - _distance;
                        _targetRow = this.markers[i].row;
                        break;
                    case 5:
                        _targetCol = this.markers[i].col + _distance;
                        _targetRow = this.markers[i].row;
                        break;
                    case 6:
                        _targetCol = this.markers[i].col - _distance;
                        _targetRow = this.markers[i].row + _distance;
                        break;
                    case 7:
                        _targetCol = this.markers[i].col;
                        _targetRow = this.markers[i].row + _distance;
                        break;
                    case 8:
                        _targetCol = this.markers[i].col + _distance;
                        _targetRow = this.markers[i].row + _distance;
                        break;
                    }

                    for (var j = 0; j < this.markers.length; j++) {
                        if(this.markers[j].mapChipType == 1 || this.markers[j].mapChipType == 3 || this.markers[j].mapChipType == 4)

                        if (this.markers[j].col == _targetCol && this.markers[j].row == _targetRow) {
                            if (this.markers[j].colorId == "WHITE") {
                                this.markers[j].colorId = colorName;
                                this.markers[j].isRender = true;
                                //ここの座標のマーカーの周囲を見て相手をkillする
                                /*
                                    適当な確率で城を作る
                                */
                                var _rand = this.getRandNumByRoule(this.markers[j].col, this.markers[j].row, turnCnt, 5);
                                if(_rand == 1){
/*
                                    if(this.markers[j].colorId == "GREEN"){
                                        this.caslte = cc.Sprite.create("res/icon_castle_green.png");
                                    }else{
                                        this.caslte = cc.Sprite.create("res/icon_castle.png");
                                    }
                                    this.caslte.setAnchorPoint(0,0);
                                    this.caslte.setPosition(this.markers[j].getPosition().x,this.markers[j].getPosition().y);
                                    this.addChild(this.caslte);
*/
                                }


                                //適当な確率でhumanを作る
                                if(_rand == 1){
                                    this.addHuman(this.markers[j].col,this.markers[j].row,this.markers[j].colorId);
                                }

                            }
                        }
                    }
                }
            }
        }
    },
    kill: function (colorName, enemyColorName) {
        for (var i = 0; i < this.markers.length; i++) {
            //周囲の8個のますの状態を調べる
            var _001col = this.markers[i].col - 1;
            var _001row = this.markers[i].row - 1;
            var _002col = this.markers[i].col;
            var _002row = this.markers[i].row - 1;
            var _003col = this.markers[i].col + 1;
            var _003row = this.markers[i].row - 1;
            var _004col = this.markers[i].col - 1;
            var _004row = this.markers[i].row;
            var _005col = this.markers[i].col + 1;
            var _005row = this.markers[i].row;
            var _006col = this.markers[i].col - 1;
            var _006row = this.markers[i].row + 1;
            var _007col = this.markers[i].col;
            var _007row = this.markers[i].row + 1;
            var _008col = this.markers[i].col + 1;
            var _008row = this.markers[i].row + 1;
            var _cnt = 0;
            for (var j = 0; j < this.markers.length; j++) {
                if (this.markers[j].col == _001col && this.markers[j].row == _001row) {
                    if (this.markers[j].colorId == colorName) {
                        _cnt++;
                    }
                }
                if (this.markers[j].col == _002col && this.markers[j].row == _002row) {
                    if (this.markers[j].colorId == colorName) {
                        _cnt++;
                    }
                }
                if (this.markers[j].col == _003col && this.markers[j].row == _003row) {
                    if (this.markers[j].colorId == colorName) {
                        _cnt++;
                    }
                }
                if (this.markers[j].col == _004col && this.markers[j].row == _004row) {
                    if (this.markers[j].colorId == colorName) {
                        _cnt++;
                    }
                }
                if (this.markers[j].col == _005col && this.markers[j].row == _005row) {
                    if (this.markers[j].colorId == colorName) {
                        _cnt++;
                    }
                }
                if (this.markers[j].col == _006col && this.markers[j].row == _006row) {
                    if (this.markers[j].colorId == colorName) {
                        _cnt++;
                    }
                }
                if (this.markers[j].col == _007col && this.markers[j].row == _007row) {
                    if (this.markers[j].colorId == colorName) {
                        _cnt++;
                    }
                }
                if (this.markers[j].col == _008col && this.markers[j].row == _008row) {
                    if (this.markers[j].colorId == colorName) {
                        _cnt++;
                    }
                }
            }
            if (_cnt >= 1) {
                if (this.markers[i].colorId == enemyColorName) {
                    this.markers[i].colorId = colorName;
                }
            }
            /*
            //1. 生きているセルの隣に生きているセルが1つもしくは0の場合、そのセルは過疎により死ぬ。
            if(_cnt == 0 || _cnt == 1){
                if(this.markers[i].colorId == colorName){
                    //this.markers[i].colorId = "white";
                }
            }
            //2. 生きているセルの隣に生きているセルが2つもしくは3つの場合、そのセルは生き残る。（ちょうど良い生存状況）
            if(_cnt == 2 || _cnt == 3){
                if(this.markers[i].colorId == colorName){
                    this.markers[i].colorId = colorName;
                }
            }
            //3. 生きているセルの隣に生きているセルが4つ以上ある場合、そのセルは過密により死ぬ。
            if(_cnt >= 4){
                if(this.markers[i].colorId == colorName){
                    //this.markers[i].colorId = "white";
                }
            }
            //4. 死んでいるセルの隣に生きているセルがちょうど3つあれば、生きているセルになる。（生殖、誕生）
            if(_cnt == 3){
                if(this.markers[i].colorId == "white"){
                    this.markers[i].colorId = colorName;
                }
            }
            */
        }
    },
    getRandNumberFromRange: function (min, max) {
        var rand = min + Math.floor(Math.random() * (max - min));
        return rand;
    },
    shuffle: function () {
        return Math.random() - .5;
    }
});