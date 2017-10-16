var FieldLayer2 = cc.Layer.extend({
    sprite: null,
    ctor: function (storage, colorName, isCom) {
        this._super();
        //ゲーム状態
        this.storage = storage;
        //playBattleBGM(this.storage);
        this.isCom = isCom;
        //画面サイズの取得
        this.viewSize = cc.director.getVisibleSize();
        var size = cc.winSize;
        this.storage = storage;
        //storageのリセット
        this.storage.isSteal = false;
        this.storage.startPositionData = [];
        this.storage.enemyStartPositionData = [];

        this.storage.eventData = new Object();
        this.storage.enemyEventData = new Object();

        //カード使用回復
        this.cardUsePower = 100;
        this.cardUseMaxPower = 100;
        //カラーの分別
        this.colorName = colorName;
        if (this.colorName == "GREEN") {
            this.enemyColorName = "RED";
            this.greenUserId = this.storage.userId;
            this.redUserId = this.storage.battleTargetUserId;
        } else {
            this.enemyColorName = "GREEN";
            this.greenUserId = this.storage.battleTargetUserId;
            this.redUserId = this.storage.userId;
        }
        //ステータス
        this.gameStatus = "prepare";
        this.result = null;
        this.markers = [];
        this.gameStartTimeCnt = 0;
        this._webSocketIntervalCnt = 0;
        this.greenScore = 0;
        this.redScore = 0;
        this.battleEffects = [];
        this.endCnt = 0;

        this.baseNode = cc.Sprite.create("res/back_battle2.png");
        this.baseNode.setAnchorPoint(0, 0);
        this.addChild(this.baseNode);

        this.setHeaderLabel();

        cc.eventManager.addListener(cc.EventListener.create({
            event: cc.EventListener.TOUCH_ALL_AT_ONCE,
            onTouchesBegan: function (touches, event) {
                var location = touches[0].getLocation();
                event.getCurrentTarget().touchStart(touches[0].getLocation());
            },
            onTouchesMoved: function (touches, event) {
                var location = touches[0].getLocation();
                event.getCurrentTarget().touchMove(touches[0].getLocation());
            },
            onTouchesEnded: function (touches, event) {
                event.getCurrentTarget().touchFinish(touches[0].getLocation());
            }
        }), this);

        this.battleWindow = new BattleWindow(this);
        this.addChild(this.battleWindow, 999);
        this.battleWindow.setPosition(0, 200);
        this.battleWindow.setScale(1);

        this.setStartLabel();
        this.battleMessage = new BattleMessage(this);
        //this.addChild(this.battleMessage,9999999);

        this.resultSprite = new BattleResult(this);
        this.addChild(this.resultSprite,9999);
        this.resultSprite.setPosition(320, 500);
        this.resultSprite.setVisible(false);

        this.battleCardDeck = new BattleCardDeck(this);
        this.addChild(this.battleCardDeck,9999);
        this.battleCardDeck.setPosition(0, 30);

        this.scheduleUpdate();
        this.testCnt = 0;

        this.usedTickNum = 0;
        this.usedEnemyTickNum = 0;

        this.tutorial001 = cc.Sprite.create("res/tutorial001.png");
        this.tutorial001.setPosition(320, 550);
        this.addChild(this.tutorial001,99999);

        return true;
    },

    update: function (dt) {
        //コネクションエラー時はバトル画面にリダイレクトする
        if(this.storage.isConnectionError == true){
            this.storage.isConnectionError = false;
            this.goToStageLayer(1);
            return;
        }

        //イベントを処理する(味方)
        for (var eventDataKey in this.storage.eventData) {
            if (this.storage.eventData.hasOwnProperty(eventDataKey)) {
                var eventDataValue = this.storage.eventData[eventDataKey];
                var eventDataObj = JSON.parse(eventDataValue);
                if(this.battleWindow.turnCnt >= 1 
                    && this.usedTickNum != eventDataObj["tickNum"]
                    && this.battleWindow.turnCnt == eventDataObj["tickNum"]){
                    this.usedTickNum = eventDataObj["tickNum"];
                    this.addRipple(this.colorName,eventDataObj["col"],eventDataObj["row"]);
                    this.battleWindow.addPoint2(this.colorName,eventDataObj["col"],eventDataObj["row"]);


                    //城を建てる
                    this.battleWindow.addCastleIcon(eventDataObj["col"],eventDataObj["row"]);

                    //建設中表示を消す
                    this.battleCardDeck.touchMovedSprite.setVisible(false);

                    if(this.colorName == "GREEN"){
                        //this.addBattleEffect("GREEN",this.storage.enemyUsedCardId);
                        this.battleWindow.addGreenMessage(CONFIG.CARD[eventDataObj["id"]]["useTxt"]);
                    }else{
                        //this.addBattleEffect("RED",this.storage.enemyUsedCardId);
                        this.battleWindow.addRedMessage(CONFIG.CARD[eventDataObj["id"]]["useTxt"]);
                    }
                }
            }
        }
        //イベントを処理する(敵)
        for (var eventDataKey in this.storage.enemyEventData) {
            if (this.storage.enemyEventData.hasOwnProperty(eventDataKey)) {
                var eventDataValue = this.storage.enemyEventData[eventDataKey];
                var eventDataObj = JSON.parse(eventDataValue);
                if(this.battleWindow.turnCnt >= 1 
                    && this.usedEnemyTickNum != eventDataObj["tickNum"]
                    && this.battleWindow.turnCnt == eventDataObj["tickNum"]){
                    this.usedEnemyTickNum = eventDataObj["tickNum"];
                    this.addRipple(this.enemyColorName,eventDataObj["col"],eventDataObj["row"]);
                    this.battleWindow.addPoint2(this.enemyColorName,eventDataObj["col"],eventDataObj["row"]);

                    //城を建てる
                    this.battleWindow.addCastleIcon(eventDataObj["col"],eventDataObj["row"]);

                    if(this.colorName == "GREEN"){
                        //this.addBattleEffect("GREEN",this.storage.enemyUsedCardId);
                        this.battleWindow.addRedMessage(CONFIG.CARD[eventDataObj["id"]]["useTxt"]);
                    }else{
                        //this.addBattleEffect("RED",this.storage.enemyUsedCardId);
                        this.battleWindow.addGreenMessage(CONFIG.CARD[eventDataObj["id"]]["useTxt"]);
                    }
                }
            }
        }
/*
        this.testCnt ++;
        if(this.testCnt >= 30 * 1){
            this.testCnt = 0;
            cc.log(this.storage.eventData);
        }
*/      

        for (var i = 0; i < this.battleEffects.length; i++) {
            if (this.battleEffects[i].update() == false) {
                this.removeChild(this.battleEffects[i]);
                this.battleEffects.splice(i, 1);
            }
        }

        this.updateLabel();
        this.battleCardDeck.update();
        this.battleMessage.update();
        this.resultSprite.update();
        this.countScore();

        //モニターをupdateする
        this.battleWindow.update();

        //マーカーをupdate表示する
        for (var i = 0; i < this.markers.length; i++) {
            if (this.markers[i].update() == false) {
                this.removeChild(this.markers[i]);
                this.markers.splice(i, 1);
            }
        }

        if (this.gameStartTimeCnt >= 1) {
            this.gameStartTimeCnt++;
        }
        
        this.setPrepareStatus();
        this.setStartStatus();
        this.updateCardPower();
        this.setResultStatus();
        
        //タッチした場所をwebsocketで送信する
        this._webSocketIntervalCnt++;
        if (this._webSocketIntervalCnt >= 10) {
            //自分のデータを全Playerに対して同期させている。ここではuserStatus=1(battle中)という状態を同期させる
            if (this.storage) {
                var _data = '{' 
                + '"type":"SYNC_PLAYERS",' 
                + '"userId":' + this.storage.userId 
                + ',' 
                + '"userStatus":' + 1 
                + ',' 
                +　'"treasureAmount":' + this.storage.treasureAmount 
                + ',' 
                + '"enemyBattleStatus":"' + this.gameStatus 
                + '"}';
                this.storage.webSocketHelper.sendMsg(_data);
                this._webSocketIntervalCnt = 0;
            }
            if (this.storage) {
                this.storage.SYNC_ENEMY_DATA_ON_BATTLE(0,0,this.colorName,this.gameStatus,this.battleWindow.turnCnt,0,0);
            }
        }
    },

    setHeaderLabel:function(){
        this.greenUserIdLabel = new cc.LabelTTF(this.greenUserId, "Arial", 11);
        this.greenUserIdLabel.setFontFillColor(new cc.Color(0, 255, 0, 255));
        this.greenUserIdLabel.setAnchorPoint(0, 0);
        this.greenUserIdLabel.setPosition(20, 960 - 25);
        this.baseNode.addChild(this.greenUserIdLabel, 999999);

        this.redUserIdLabel = new cc.LabelTTF(this.redUserId, "Arial", 11);
        this.redUserIdLabel.setFontFillColor(new cc.Color(255, 0, 0, 255));
        this.redUserIdLabel.setAnchorPoint(1, 0);
        this.redUserIdLabel.setPosition(620, 960 - 25);
        this.baseNode.addChild(this.redUserIdLabel, 999999);

        this.greenScoreLabel = new cc.LabelTTF(this.greenScore, "Arial", 25);
        this.greenScoreLabel.setFontFillColor(new cc.Color(0, 255, 0, 255));
        this.greenScoreLabel.setAnchorPoint(0, 0);
        this.greenScoreLabel.setPosition(20, 960 - 110);
        this.baseNode.addChild(this.greenScoreLabel, 999999);

        this.redScoreLabel = new cc.LabelTTF(this.redScore, "Arial", 25);
        this.redScoreLabel.setFontFillColor(new cc.Color(255, 0, 0, 255));
        this.redScoreLabel.setAnchorPoint(1, 0);
        this.redScoreLabel.setPosition(620, 960 - 110);
        this.baseNode.addChild(this.redScoreLabel, 999999);

        this.turnCntLabel = new cc.LabelTTF("123", "Arial", 20);
        this.turnCntLabel.setFontFillColor(new cc.Color(255, 255, 255, 255));
        this.turnCntLabel.setAnchorPoint(0.5, 0);
        this.turnCntLabel.setPosition(320, 960 - 110);
        this.baseNode.addChild(this.turnCntLabel, 999999);
    },

    updateLabel:function(){
        if (this.colorName == "GREEN") {
            this.greenUserIdLabel.setString("USERID:" + this.storage.userId);
            this.redUserIdLabel.setString("USERID:" + this.storage.battleTargetUserId);
        } else {
            this.greenUserIdLabel.setString("USERID:" + this.storage.battleTargetUserId);
            this.redUserIdLabel.setString("USERID:" + this.storage.userId);
        }
        this.turnCntLabel.setString(this.battleWindow.turnCnt + "day");
    },

    isUseCard:function(){
        if(this.cardUsePower >= this.cardUseMaxPower){
            return true;
        }
        return false;
    },

    updateCardPower:function(){
        if(this.gameStatus == "gaming"){
            //カードのパワーを更新する
            this.cardUsePower++;
            if(this.cardUsePower >= this.cardUseMaxPower){
                this.cardUsePower = this.cardUseMaxPower;
            }
        }
    },

    setPrepareStatus:function(){
        //建設中表示を消す
        if (this.gameStatus == "wait" || this.gameStatus == "prepare") {
            this.battleCardDeck.touchMovedSprite.setVisible(false);
        }

        //ゲーム状態を変更する
        if (this.colorName == "GREEN") {
            if (this.greenScore == 1) {
                if (this.gameStatus == "prepare") {
                    this.gameStatus = "wait";
                }
            }
        } else {
            if (this.redScore == 1) {
                if (this.gameStatus == "prepare") {
                    this.gameStatus = "wait";
                }
            }
        }

        //自分と敵のgameStatusがwaitになったら開始
        if (this.gameStatus == "wait") {
            if (this.gameStartTimeCnt == 0) {
                this.labelStartCnt006.setVisible(true);
            }
            //コンピューター戦の場合はチェックしない
            if(this.isCom == true){
                if (this.gameStartTimeCnt == 0) {
                    this.gameStartTimeCnt = 1;
                }
            }
            //オンラインの場合は相手のステータスを見る
            if (this.storage.enemyBattleStatus == "wait") {
                if (this.gameStartTimeCnt == 0) {
                    //相手のポジショニングが正しいか再度確認する
                    this.gameStartTimeCnt = 1;
                }
            }
        }
    },

    setStartStatus:function(){
        this.labelStartCnt001.setVisible(false);
        this.labelStartCnt002.setVisible(false);
        this.labelStartCnt003.setVisible(false);
        this.labelStartCnt004.setVisible(false);
        if (1 * 10 < this.gameStartTimeCnt && this.gameStartTimeCnt < 10 * 2) {
            this.labelStartCnt006.setVisible(false);
            this.labelStartCnt001.setVisible(true);
            //初期配置が正しくなければ通信エラーとして処理する
            if(this.redScore == 1 && this.greenScore == 1){
            }else{
                this.storage.CONNECTION_ERROR();
                this.goToStageLayer(1);
            }
            this.battleMessage.message = "";
        }
        if (2 * 10 < this.gameStartTimeCnt && this.gameStartTimeCnt < 10 * 3) {
            this.labelStartCnt002.setVisible(true);
        }
        if (3 * 10 < this.gameStartTimeCnt && this.gameStartTimeCnt < 10 * 4) {
            this.labelStartCnt003.setVisible(true);
        }
        if (4 * 10 < this.gameStartTimeCnt && this.gameStartTimeCnt < 10 * 5) {
            this.labelStartCnt004.setVisible(true);
        }
        if (this.gameStartTimeCnt >= 10 * 5) {
            if (this.gameStatus == "wait") {
                this.gameStatus = "gaming";
                this.message = "";
                this.battleWindow.mode = "gaming";
            }
        }
    },

    setResultStatus:function(){
        if (this.battleWindow.mode == "result") {
            this.gameStatus = "end";
            this.result = this.battleWindow.result;
            this.endCnt++;
            //そこまで!のラベルを表示する
            if (0 <= this.endCnt &&  this.endCnt < 30 * 1) {
                this.labelStartCnt005.setVisible(true);
            }
            //試合結果を表示する
            if (this.endCnt == 30 * 1) {
                this.labelStartCnt005.setVisible(false);
                this.resultSprite.setVisible(true);
                if (this.colorName == "GREEN") {
                    if (this.greenScore > this.redScore) {
                        var _addCoin = 10;
                        this.msg = "勝利しました!!!!!\nSGK残高が" + this.storage.treasureAmount + "->" + Math.ceil(this.storage.treasureAmount + _addCoin) +  "に\n増加しました!";
                        this.storage.treasureAmount += _addCoin;
                        this.storage.saveCurrentData();
                    } else {
                        var _addCoin = 10;
                        this.msg = "敗北しました！\nSGK残高が" + this.storage.treasureAmount + "->" + Math.ceil(this.storage.treasureAmount - _addCoin) +  "に\n減少しました!";
                        this.storage.treasureAmount -= _addCoin;
                        this.storage.saveCurrentData();
                    }
                } else {
                    if (this.greenScore > this.redScore) {
                        var _addCoin = 10;
                        this.msg = "敗北しました！\nSGK残高が" + this.storage.treasureAmount + "->" + Math.ceil(this.storage.treasureAmount - _addCoin) +  "に\n減少しました!";
                        this.storage.treasureAmount -= _addCoin;
                        this.storage.saveCurrentData();
                    } else {
                        var _addCoin = 10;
                        this.msg = "勝利しました!!!!!\nSGK残高が" + this.storage.treasureAmount + "->" + Math.ceil(this.storage.treasureAmount + _addCoin) +  "に\n増加しました!";
                        this.storage.treasureAmount += _addCoin;
                        this.storage.saveCurrentData();
                    }
                }
                this.resultSprite.sendMessage(this.msg);
            }
        }
    },

    addBattleEffect:function(colorName,cardId){
        this.battleEffect = new BattleEffect(this,colorName,cardId);
        this.addChild(this.battleEffect,99999999);
        this.battleEffect.setPosition(0, 240);
        this.battleEffects.push(this.battleEffect);
    },

    setStartLabel: function () {
        this.labelStartCnt001 = cc.Sprite.create("res/label_starttime001.png");
        this.labelStartCnt001.setPosition(320, 500);
        this.addChild(this.labelStartCnt001, 99999999);
        this.labelStartCnt001.setVisible(false);
        this.labelStartCnt002 = cc.Sprite.create("res/label_starttime002.png");
        this.labelStartCnt002.setPosition(320, 500);
        this.addChild(this.labelStartCnt002, 99999999);
        this.labelStartCnt002.setVisible(false);
        this.labelStartCnt003 = cc.Sprite.create("res/label_starttime003.png");
        this.labelStartCnt003.setPosition(320, 500);
        this.addChild(this.labelStartCnt003, 99999999);
        this.labelStartCnt003.setVisible(false);
        this.labelStartCnt004 = cc.Sprite.create("res/label_starttime004.png");
        this.labelStartCnt004.setPosition(320, 500);
        this.addChild(this.labelStartCnt004, 99999999);
        this.labelStartCnt004.setVisible(false);
        this.labelStartCnt005 = cc.Sprite.create("res/label_starttime005.png");
        this.labelStartCnt005.setPosition(320, 500);
        this.addChild(this.labelStartCnt005, 99999999);
        this.labelStartCnt005.setVisible(false);
        this.labelStartCnt006 = cc.Sprite.create("res/label_starttime006.png");
        this.labelStartCnt006.setPosition(320, 500);
        this.addChild(this.labelStartCnt006, 99999999);
        this.labelStartCnt006.setVisible(false);
        this.labelStartCnt007 = cc.Sprite.create("res/label_starttime007.png");
        this.labelStartCnt007.setPosition(320, 500);
        this.addChild(this.labelStartCnt007, 99999999);
        this.labelStartCnt007.setVisible(false);
        this.labelStartCnt008 = cc.Sprite.create("res/label_starttime008.png");
        this.labelStartCnt008.setPosition(320, 500);
        this.addChild(this.labelStartCnt008, 99999999);
        this.labelStartCnt008.setVisible(false);
    },

    countScore: function () {
        //if(this.gameStatus != "gaming") return;
        if (this.battleWindow.redScore > this.redScore + 10) {
            this.redScore += 10;
        }
        if (this.battleWindow.redScore > this.redScore) {
            this.redScore += 1;
        }
        if (this.battleWindow.greenScore > this.greenScore + 10) {
            this.greenScore += 10;
        }
        if (this.battleWindow.greenScore > this.greenScore) {
            this.greenScore += 1;
        }
        if(this.gameStatus != "gaming") return;
        //設置可能な場所
        var _greenRate = this.greenScore / (this.greenScore + this.redScore + this.battleWindow.whiteCnt) * 100;
        this.greenScoreLabel.setString(Math.floor(_greenRate * 10) / 10 + "%");
        var _redRate = this.redScore / (this.greenScore + this.redScore + this.battleWindow.whiteCnt) * 100;
        this.redScoreLabel.setString(Math.floor(_redRate * 10) / 10  + "%");
    },

    useCard : function(cardId,x,y){

        var _marker = this.battleWindow.getMarker(x,y-200);
        if(_marker == null) return;

        if(this.cardUsePower != this.cardUseMaxPower) return;
        
        this.cardUsePower = 0;
        /*
        相手と自分のどちらのturnが多いかを比較するしてturn番号を決める
        */
        var tickNum = 0;
        var _myTurnCnt = this.battleWindow.turnCnt;
        var _enemyTurnCnt = this.storage.enemyTurnNum;
        if(_myTurnCnt > _enemyTurnCnt){
            tickNum = _myTurnCnt;
        }else{
            tickNum = _enemyTurnCnt;
        }
        //少し余裕をみて5tick先にイベントを設定する
        tickNum += 4;
        
        //イベント用のキューに保存する
        this.storage.saveEventDataToStorage(tickNum, CONFIG.CARD[cardId], _marker.col, _marker.row);

        //開始前であれば直接マップに書き込みする
        if(this.gameStatus == "prepare"){
            this.addRipple(this.colorName,_marker.col, _marker.row);
            var _posData = {colorName: this.colorName, col: _marker.col, row: _marker.row}
            this.storage.startPositionData.push(_posData);

            var _result = this.battleWindow.addPoint2(this.colorName,_marker.col, _marker.row);
            //城を建てる
            if(_result){
                this.battleWindow.addCastleIcon(_marker.col, _marker.row);
            }
        }
    },

    addRipple:function(colorName,col,row){
        this.marker = new Marker2(this, colorName);
        this.addChild(this.marker, 99999999999);
        var _marker = this.battleWindow.getMarker2(col,row);
        if(_marker == null) return;
        this.marker.setPosition(_marker.getPosition().x, _marker.getPosition().y + 200);
        this.markers.push(this.marker);
    },

    goToStageLayer: function (errorNum) {
        var scene = cc.Scene.create();
        //次のステージへいくためにstorageは必ず受けた渡す
        scene.addChild(BattleLayer2.create(this.storage, errorNum));
        cc.director.runScene(cc.TransitionFlipY.create(0.5, scene));
    },

    getRandNumberFromRange: function (min, max) {
        var rand = min + Math.floor(Math.random() * (max - min));
        return rand;
    },

    touchStart: function (location) {},
    touchMove: function (location) {},
    touchFinish: function (location) {},
});
FieldLayer2.create = function (storage, hackingType, isCom) {
    return new FieldLayer2(storage, hackingType, isCom);
};
var FieldLayer2Scene = cc.Scene.extend({
    onEnter: function (storage, hackingType, isCom) {
        this._super();
        var layer = new FieldLayer2(storage, hackingType, isCom);
        this.addChild(layer);
    }
});