
cc.Class({
    extends: cc.Component,

    properties: {
        gridViewaNode: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

    },

    // start() {
    //     var offset = new cc.Vec2(0, 300);
    //     // this.scrollView.scrollToOffset(offset, 1.0);
    //     let gridView = this.scrollView.getComponent('GridView');
    //     let ary = [];
    //     for (var i = 0; i < 13; i++) {
    //         let stage = i;
    //         ary.push({
    //             'stageNum': stage,
    //             'starNum': 3,
    //         });
    //     }
    //     gridView.setDataArray(ary, 'GridViewItem', 'setStageInfo');
    // },

    start () {
       
        let gridView = this.gridViewaNode.getComponent('GridView');
        this.gridView = gridView; 
        this.scheduleOnce(()=>{
            this.onClickChange();
        },0);

    },

    onClickChange(){
        let ary = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
        this.gridView.setDataArray(ary,"GridViewItem","setStageInfo",function itemInIndex(itemCell,index,data){
            itemCell.setStageInfo(data);
            cc.log("index :" + index);
        });
    },

    onClickChangeBack(){
        let ary = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n"];
        this.gridView.setDataArray(ary,"GridViewItem","setStageInfo");
    },

    // update (dt) {},
});
