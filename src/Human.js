
var Human = cc.Node.extend(
{
    ctor : function (game,col,row,colorName) 
    {
        this._super();
        this.game = game;
        this.hp = 100;
        this.maxHp = 100;
        this.colorName = colorName;

        /*
        //image
        var image_type = getRandNumberFromRange(1,6);
        if(image_type == 1)
        {
            this.image = res.Animal_001_png;
        }else if(image_type == 2)
        {
            this.image = res.Animal_002_png;
        }else if(image_type == 3)
        {
            this.image = res.Animal_003_png;
        }else if(image_type == 4)
        {
            this.image = res.Animal_004_png;
        }else
        {
            this.image = res.Animal_005_png;
        }
        */
        this.image = "res/human.png";

        this.imgWidth = 16;
        this.imgHeight = 16;
        //init
        this.direction = "front";
        this.walkingDirection = "up";
        this.tmpWalkingDirection = "up";
        this.initializeWalkAnimation();
        this._mostNearMarker = null;
        this._mostNearDistance = 99999;

        //this.isGoal = 0;
        //this.isFailed = 0;
        //this.targetRefreshTime = 0;
        this.walkSpeed = 0.4;
        //this.jumpDistance = 0;
        //this.spriteScale = 1;
        //this.spriteScaleAddNum = 0.1
        //this.sigh = cc.LayerColor.create(new cc.Color(0, 0, 0, 255), 80, 80);
        //this.sigh.setPosition(0,0);
        //this.addChild(this.sigh,9999);


        this.col = col;
        this.row = row;

        var marker = this.getMarker(col,row);
        this.setPosition(marker.getPosition().x,marker.getPosition().y);

        this.moveTimeCnt = 0;
        this._targetCol = this.col;
        this._targetRow = this.row;
        this._tmpMostNearMarke = null;


        this.timeCnt = 0;
    },

    getMarker : function(col,row){
        for (var j = 0; j < this.game.markers.length; j++) {
            if (this.game.markers[j].col == col && this.game.markers[j].row == row) {
                return this.game.markers[j];
            }
        }
        return null;
    },

    getMarker2 : function(col,row,colorName){
        for (var j = 0; j < this.game.markers.length; j++) {
            if (this.game.markers[j].col == col && this.game.markers[j].row == row && this.game.markers[j].colorId == colorName) {
                return this.game.markers[j];
            }
        }
        return null;
    },

    init : function () { },

    update : function () 
    {
        this.timeCnt++;
        if(this.timeCnt >= 30 * 10){
            return false;
        }

        //this.walkSpeed = 0.5;
        this.moveTimeCnt++;

        if(this.moveTimeCnt >= 10 * 1){
            this.moveTimeCnt = 0;
            var _rand = this.game.getRandNumberFromRange(1,5);
            //_rand = 1;
            if(_rand == 1){
                //上
                this._tmpMostNearMarke = this.getMarker2(this.col + 0,this.row + 1,this.colorName);
                if(this._tmpMostNearMarke){
                    this.row+=1;
                }
            }else
            if(_rand == 2){
                //下
                this._tmpMostNearMarke = this.getMarker2(this.col + 0,this.row - 1,this.colorName);
                if(this._tmpMostNearMarke){
                    this.row-=1;
                }
            }else
            if(_rand == 3){
                //右
                this._tmpMostNearMarke = this.getMarker2(this.col + 1,this.row,this.colorName);
                if(this._tmpMostNearMarke){
                    this.col+=1;
                }
            }else
            if(_rand == 4){
                //左
                this._tmpMostNearMarke = this.getMarker2(this.col - 1,this.row,this.colorName);
                if(this._tmpMostNearMarke){
                    this.col-=1;
                }
            }
            //cc.log(this._targetCol + "/" + this._targetRow)
        }



if(this._tmpMostNearMarke){
        this.moveToTarget(this._tmpMostNearMarke,2,2);
}

        return true;
    },
    remove : function () 
    {
        this.removeChild(this.sprite);
    },
    getDirection : function ()
    {
        return this.direction;
    },
    initializeWalkAnimation : function ()
    {
        var frameSeq = [];
        for (var i = 0; i < 3; i++) 
        {
            var frame = cc.SpriteFrame.create(this.image, cc.rect(this.imgWidth * i, this.imgHeight * 0, 
            this.imgWidth, this.imgHeight));
            frameSeq.push(frame);
        }
        this.wa = cc.Animation.create(frameSeq, 0.2);
        this.ra = cc.RepeatForever.create(cc.Animate.create(this.wa));
        this.sprite = cc.Sprite.create(this.image, cc.rect(0, 0, this.imgWidth, this.imgHeight));
        this.sprite.runAction(this.ra);
        this.sprite.setAnchorPoint(0,0);
        this.addChild(this.sprite);
        //this.sprite.setScale(1.0, 1.0);
    },
    setDirection : function (targetSprite)
    {
        var diffX = Math.floor(targetSprite.getPosition().x - this.getPosition().x);
        var diffY = Math.floor(targetSprite.getPosition().y - this.getPosition().y);
        if (diffX > 0 && diffY > 0) {
            this.walkDown();
        }
        if (diffX > 0 && diffY < 0) {
            this.walkRight();
        }
        if (diffX < 0 && diffY > 0) {
            this.walkUp();
        }
        if (diffX < 0 && diffY < 0) {
            this.walkLeft();
        }
    },
    moveToTarget : function (object, speed, targetDist) 
    {
        var dX = object.getPosition().x - this.getPosition().x;
        var dY = object.getPosition().y - this.getPosition().y;
        var dist = Math.sqrt(dX * dX + dY * dY);
        if ( dist > targetDist ) 
        {
            var rad = Math.atan2(dX, dY);
            var speedX = speed * Math.sin(rad);
            var speedY = speed * Math.cos(rad);
            this.setPosition( this.getPosition().x + speedX, this.getPosition().y + speedY );
        }
    },
    
    moveToRight : function (speed, target) 
    {
        var _ySPeed = 0;
        if (target)
        {
            var dY = target.getPosition().y - this.getPosition().y;
            if (dY >= 20) {
                _ySPeed = speed;
            }
            if (dY <= - 20) {
                _ySPeed = speed * - 1;
            }
        }
        this.setPosition( this.getPosition().x + speed, this.getPosition().y + _ySPeed );
        this.walkRight();
    },
    moveToLeft : function (speed, target) 
    {
        var _ySPeed = 0;
        if (target)
        {
            var dY = target.getPosition().y - this.getPosition().y;
            if (dY >= 2) {
                _ySPeed = speed;
            }
            if (dY <= - 2) {
                _ySPeed = speed * - 1;
            }
        }
        this.setPosition( this.getPosition().x - speed, this.getPosition().y + _ySPeed );
        this.walkLeft();
    },
    moveToUp : function (speed, target) 
    {
        var _xSPeed = 0;
        if (target)
        {
            var dX = target.getPosition().x - this.getPosition().x;
            if (dX >= 2) {
                _xSPeed = speed;
            }
            if (dX <= - 2) {
                _xSPeed = speed * - 1;
            }
        }
        this.setPosition( this.getPosition().x + _xSPeed, this.getPosition().y + speed );
        this.walkBack();
    },

    moveToDown : function (speed, target) 
    {
        var _xSPeed = 0;
        if (target) 
        {
            var dX = target.getPosition().x - this.getPosition().x;
            if (dX >= 2) {
                _xSPeed = speed;
            }
            if (dX <= - 2) {
                _xSPeed = speed * - 1;
            }
        }
        this.setPosition( this.getPosition().x + _xSPeed, this.getPosition().y - speed);
        this.walkFront();
    },
    walkFront : function ()
    {
        if (this.direction != "front")
        {
            this.direction = "front";
            this.sprite.stopAllActions();
            var frameSeq = [];
            for (var i = 0; i < 3; i++) 
            {
                var frame = cc.SpriteFrame.create(this.image, cc.rect(this.imgWidth * i, this.imgHeight * 0, 
                this.imgWidth, this.imgHeight));
                frameSeq.push(frame);
            }
            this.wa = cc.Animation.create(frameSeq, 0.2);
            this.ra = cc.RepeatForever.create(cc.Animate.create(this.wa));
            this.sprite.runAction(this.ra);
        }
    },
    walkLeft : function ()
    {
        if (this.direction != "left")
        {
            this.direction = "left";
            this.sprite.stopAllActions();
            var frameSeq = [];
            for (var i = 0; i < 3; i++) 
            {
                var frame = cc.SpriteFrame.create(this.image, cc.rect(this.imgWidth * i, this.imgHeight * 1, 
                this.imgWidth, this.imgHeight));
                frameSeq.push(frame);
            }
            this.wa = cc.Animation.create(frameSeq, 0.2);
            this.ra = cc.RepeatForever.create(cc.Animate.create(this.wa));
            this.sprite.runAction(this.ra);
        }
    },
    walkRight : function ()
    {
        if (this.direction != "right")
        {
            this.direction = "right";
            this.sprite.stopAllActions();
            var frameSeq = [];
            for (var i = 0; i < 3; i++) 
            {
                var frame = cc.SpriteFrame.create(this.image, cc.rect(this.imgWidth * i, this.imgHeight * 2, 
                this.imgWidth, this.imgHeight));
                frameSeq.push(frame);
            }
            this.wa = cc.Animation.create(frameSeq, 0.2);
            this.ra = cc.RepeatForever.create(cc.Animate.create(this.wa));
            this.sprite.runAction(this.ra);
        }
    },
    walkBack : function ()
    {
        if (this.direction != "back")
        {
            this.direction = "back";
            this.sprite.stopAllActions();
            var frameSeq = [];
            for (var i = 0; i < 3; i++) 
            {
                var frame = cc.SpriteFrame.create(this.image, cc.rect(this.imgWidth * i, this.imgHeight * 3, 
                this.imgWidth, this.imgHeight));
                frameSeq.push(frame);
            }
            this.wa = cc.Animation.create(frameSeq, 0.2);
            this.ra = cc.RepeatForever.create(cc.Animate.create(this.wa));
            this.sprite.runAction(this.ra);
        }
    },
});