var Marker2 = cc.Node.extend({
    ctor: function (game, colorTxt) {
        this._super();
        this.game = game;
        this.colorTxt = colorTxt;

        switch (this.colorTxt){
          case "GREEN":
            this.marker = cc.Sprite.create("res/marker_green.png");
            break;
          case "RED":
          this.marker = cc.Sprite.create("res/marker_red.png");
            break;
          case "GREEN_BLOCK":
          this.marker = cc.Sprite.create("res/marker_green_block.png");
            break;
          case "RED_BLOCK":
          this.marker = cc.Sprite.create("res/marker_red_block.png");
            break;
        }

        this.addChild(this.marker);
        this.marker.setScale(this.scaleRate);
        this.marker.setOpacity(255 * 0.5);
        this.scaleRate = 0.1;

        this.effectTime = 0;

    },
    update: function () {
        this.effectTime += 1;

        if(this.colorTxt == "GREEN" || this.colorTxt == "RED"){
            this.scaleRate += 0.04;
        }else{
            this.scaleRate = 1;
        }

        this.marker.setScale(this.scaleRate);
        if (this.effectTime >= 30) {
            return false;
        }
        return true;
    }
});
