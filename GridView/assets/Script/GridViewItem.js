
cc.Class({
    extends: cc.Component,

    properties: {
        stageLabel: cc.Label,// 当前是第几关的label显示
        image: cc.Sprite,
    },

    onLoad: function () {
        this.node.on('touchend', this.onStartGame.bind(this));
    },

    start() {

    },

    /**
     * 设置关卡信息
     * @param stageNum 关卡数，从0开始
     * @param starNum 当前的星级
     * @param stageInfo 通关条件以及关卡相关的信息
     */
    setStageInfo: function (data) {
        if (!data) {
            return;
        }
        // var stageNum = data.stageNum;
        // var starNum = data.starNum;
        // let stageInfo = data;
        // this.stageInfo = stageInfo;
        // this._stageNum = stageNum;
        //this.stageLabel.string = '第' + (data) + '关';

        var url = data;//图片路径
        var container = this.image.getComponent(cc.Sprite);//图片呈现位置
        this.loadImg(container,url);

    },

    //动态加载图片的方法
    loadImg: function(container,url){
        cc.loader.load(url, function (err, texture) {
            if(!err){
                var sprite  = new cc.SpriteFrame(texture);
                container.spriteFrame = sprite;
            }else{
                cc.log(err);
            }
          
        });
    },

    // 点击按钮
    onStartGame: function () {
        console.log('点击了开始按钮');
    }

    // update (dt) {},
});
