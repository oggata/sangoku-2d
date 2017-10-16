var BattleCardDeck = cc.Node.extend({
    ctor: function (game) {
        this._super();
        this.game = game;
        this.isSetCard = false;
        this.rectBase001 = cc.LayerColor.create(new cc.Color(0, 0, 0, 255 * 0.7), 362 * 0.27, 494 * 0.27);
        this.rectBase001.setAnchorPoint(0, 0);
        this.rectBase001.setPosition(10, 30);
        this.addChild(this.rectBase001, 9999999);
        this.rectBase002 = cc.LayerColor.create(new cc.Color(0, 0, 0, 255 * 0.7), 362 * 0.27, 494 * 0.27);
        this.rectBase002.setAnchorPoint(0, 0);
        this.rectBase002.setPosition(10 + 100, 30);
        this.addChild(this.rectBase002, 9999999);
        this.rectBase003 = cc.LayerColor.create(new cc.Color(0, 0, 0, 255 * 0.7), 362 * 0.27, 494 * 0.27);
        this.rectBase003.setAnchorPoint(0, 0);
        this.rectBase003.setPosition(10 + 100 * 2, 30);
        this.addChild(this.rectBase003, 9999999);
        this.rectBase004 = cc.LayerColor.create(new cc.Color(0, 0, 0, 255 * 0.7), 362 * 0.27, 494 * 0.27);
        this.rectBase004.setAnchorPoint(0, 0);
        this.rectBase004.setPosition(30 + 100 * 3, 30);
        this.addChild(this.rectBase004, 9999999);
        this.rectBase005 = cc.LayerColor.create(new cc.Color(0, 0, 0, 255 * 0.7), 362 * 0.27, 494 * 0.27);
        this.rectBase005.setAnchorPoint(0, 0);
        this.rectBase005.setPosition(30 + 100 * 4, 30);
        this.addChild(this.rectBase005, 9999999);
        this.rectBase006 = cc.LayerColor.create(new cc.Color(0, 0, 0, 255 * 0.7), 362 * 0.27, 494 * 0.27);
        this.rectBase006.setAnchorPoint(0, 0);
        this.rectBase006.setPosition(30 + 100 * 5, 30);
        this.addChild(this.rectBase006, 9999999);

        this.touchMoveSprite = cc.Sprite.create("res/target_card.png");
        this.addChild(this.touchMoveSprite, 9999999);
        this.touchMoveSprite.setVisible(false);

        this.touchMovedSprite = cc.Sprite.create("res/target_card2.png");
        this.addChild(this.touchMovedSprite, 9999999);
        this.touchMovedSprite.setVisible(false);

        this.cardOkSprite001 = cc.Sprite.create("res/label_card_ok.png");
        this.addChild(this.cardOkSprite001, 9999999);
        this.cardOkSprite001.setPosition(170,180);
        this.cardOkSprite001.setVisible(false);

        this.cardOkSprite002 = cc.Sprite.create("res/label_card_ok.png");
        this.addChild(this.cardOkSprite002, 9999999);
        this.cardOkSprite002.setPosition(480,180);
        this.cardOkSprite002.setVisible(false);
    },
    init: function () {},
    setCards: function () {

        this.card001 = new ccui.Button(this.getCardImage(1), "res/card000_on.png");
        this.card001.cardId = 1;
        this.card001.setAnchorPoint(0,0);
        this.card001.addTouchEventListener(this.touchEvent, this);
        this.card001.setScale(0.27);
        this.card001.setPosition(10 + 100 * 0, 30);
        this.addChild(this.card001);

        this.card002 = new ccui.Button(this.getCardImage(2), "res/card000_on.png");
        this.card002.cardId = 2;
        this.card002.setAnchorPoint(0,0);
        this.card002.addTouchEventListener(this.touchEvent, this);
        this.card002.setScale(0.27);
        this.card002.setPosition(10 + 100 * 1, 30);
        this.addChild(this.card002);

        this.card003 = new ccui.Button(this.getCardImage(3), "res/card000_on.png");
        this.card003.cardId = 3;
        this.card003.setAnchorPoint(0,0);
        this.card003.addTouchEventListener(this.touchEvent, this);
        this.card003.setScale(0.27);
        this.card003.setPosition(10 + 100 * 2, 30);
        this.addChild(this.card003);

        this.card004 = new ccui.Button(this.getCardImage(4), "res/card000_on.png");
        this.card004.cardId = 4;
        this.card004.setAnchorPoint(0,0);
        this.card004.addTouchEventListener(this.touchEvent, this);
        this.card004.setScale(0.27);
        this.card004.setPosition(30 + 100 * 3, 30);
        this.addChild(this.card004);

        this.card005 = new ccui.Button(this.getCardImage(5), "res/card000_on.png");
        this.card005.cardId = 5;
        this.card005.setAnchorPoint(0,0);
        this.card005.addTouchEventListener(this.touchEvent, this);
        this.card005.setScale(0.27);
        this.card005.setPosition(30 + 100 * 4, 30);
        this.addChild(this.card005);

        this.card006 = new ccui.Button(this.getCardImage(6), "res/card000_on.png");
        this.card006.cardId = 6;
        this.card006.setAnchorPoint(0,0);
        this.card006.addTouchEventListener(this.touchEvent, this);
        this.card006.setScale(0.27);
        this.card006.setPosition(30 + 100 * 5, 30);
        this.addChild(this.card006);
    },


    touchEvent: function(sender, type){
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                cc.log("Touch Down");

            //if(this.gameStatus == "wait"){
                this.game.tutorial001.setVisible(false);
            //}


                if(this.game.isUseCard()==false) return;

                this.touchMoveSprite.setVisible(true);
                break;
 
            case ccui.Widget.TOUCH_MOVED:
                cc.log("Touch Move");

                if(this.game.isUseCard()==false) return;

                this.touchMoveSprite.setPosition(sender.getTouchMovePosition().x, sender.getTouchMovePosition().y - 40);
                this.touchMovedSprite.setPosition(sender.getTouchMovePosition().x, sender.getTouchMovePosition().y - 40);
                break;
 
            case ccui.Widget.TOUCH_ENDED:
                cc.log("Touch END");

                if(this.game.isUseCard()==false) return;

                this.touchMoveSprite.setVisible(false);
                break;
 
            case ccui.Widget.TOUCH_CANCELED:
                cc.log("Touch Cancelled");

                if(this.game.isUseCard()==false) return;

                this.touchMoveSprite.setVisible(false);
                this.game.useCard(sender.cardId,sender.getTouchMovePosition().x, sender.getTouchMovePosition().y);
                this.touchMovedSprite.setVisible(true);
                break;
 
            default:
                break;
        }
    },

    update: function () {

        if(this.game.isUseCard()==true){
            if (this.game.colorName == "GREEN") {
                this.cardOkSprite001.setVisible(true);
            }else{
                this.cardOkSprite002.setVisible(true);
            }
        }else{
            this.cardOkSprite001.setVisible(false);
            this.cardOkSprite002.setVisible(false);
        }



        if (this.isSetCard == false) {
            if(this.game.isCom == true){
                this.isSetCard = true;
                this.setCards();
            }
            if (Object.keys(this.game.storage.enemyDeckData).length > 0) {
                this.isSetCard = true;
                this.setCards();
            }
        }
        if (this.isSetCard == true) {
            var _rate = this.game.cardUsePower / this.game.cardUseMaxPower;
            if (this.game.colorName == "GREEN") {
                this.rectBase001.setScale(1, 1 - _rate);
                this.rectBase002.setScale(1, 1 - _rate);
                this.rectBase003.setScale(1, 1 - _rate);
            } else {
                this.rectBase004.setScale(1, 1 - _rate);
                this.rectBase005.setScale(1, 1 - _rate);
                this.rectBase006.setScale(1, 1 - _rate);
            }
        }
        return true;
    },
    getCardImage: function (orderNum) {
        var _image001 = "res/card000.png";
        var _image002 = "res/card000.png";
        var _image003 = "res/card000.png";
        var _image004 = "res/card000.png";
        var _image005 = "res/card000.png";
        var _image006 = "res/card000.png";
        if (this.game.colorName == "GREEN") {
            if (this.game.storage.deckData.DECK_1) {
                var _deck1 = JSON.parse(this.game.storage.deckData.DECK_1);
            }
            if (this.game.storage.deckData.DECK_2) {
                var _deck2 = JSON.parse(this.game.storage.deckData.DECK_2);
            }
            if (this.game.storage.deckData.DECK_3) {
                var _deck3 = JSON.parse(this.game.storage.deckData.DECK_3);
            }
            if (_deck1) {
                _image001 = _deck1.image;
            }
            if (_deck2) {
                _image002 = _deck2.image;
            }
            if (_deck3) {
                _image003 = _deck3.image;
            }

            if (this.game.storage.enemyDeckData.DECK_1) {
                var _deck4 = JSON.parse(this.game.storage.enemyDeckData.DECK_1);
            }
            if (_deck4) {
                _image004 = _deck4.image;
            }
            if (this.game.storage.enemyDeckData.DECK_2) {
                var _deck5 = JSON.parse(this.game.storage.enemyDeckData.DECK_2);
            }
            if (_deck5) {
                _image005 = _deck5.image;
            }
            if (this.game.storage.enemyDeckData.DECK_3) {
                var _deck6 = JSON.parse(this.game.storage.enemyDeckData.DECK_3);
            }
            if (_deck6) {
                _image006 = _deck6.image;
            }

        } else {
            if (this.game.storage.deckData.DECK_1) {
                var _deck4 = JSON.parse(this.game.storage.deckData.DECK_1);
            }
            if (this.game.storage.deckData.DECK_2) {
                var _deck5 = JSON.parse(this.game.storage.deckData.DECK_2);
            }
            if (this.game.storage.deckData.DECK_3) {
                var _deck6 = JSON.parse(this.game.storage.deckData.DECK_3);
            }
            if (_deck4) {
                _image004 = _deck4.image;
            }
            if (_deck5) {
                _image005 = _deck5.image;
            }
            if (_deck6) {
                _image006 = _deck6.image;
            }



            if (this.game.storage.enemyDeckData.DECK_1) {
                var _deck1 = JSON.parse(this.game.storage.enemyDeckData.DECK_1);
            }
            if (_deck1) {
                _image001 = _deck1.image;
            }
            if (this.game.storage.enemyDeckData.DECK_2) {
                var _deck2 = JSON.parse(this.game.storage.enemyDeckData.DECK_2);
            }
            if (_deck2) {
                _image002 = _deck2.image;
            }
            if (this.game.storage.enemyDeckData.DECK_3) {
                var _deck3 = JSON.parse(this.game.storage.enemyDeckData.DECK_3);
            }
            if (_deck3) {
                _image003 = _deck3.image;
            }

        }
        if (orderNum == 1) {
            return _image001;
        }
        if (orderNum == 2) {
            return _image002;
        }
        if (orderNum == 3) {
            return _image003;
        }
        if (orderNum == 4) {
            return _image004;
        }
        if (orderNum == 5) {
            return _image005;
        }
        if (orderNum == 6) {
            return _image006;
        }
    },
});