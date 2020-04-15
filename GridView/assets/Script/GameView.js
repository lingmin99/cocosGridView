
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
        let ary = ["https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=294893614,3986146911&fm=26&gp=0.jpg",
        "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3212860924,1428066181&fm=26&gp=0.jpg",
        "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1073559568,470074036&fm=26&gp=0.jpg",
        "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1452084672,2791892417&fm=26&gp=0.jpg",
        "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=294893614,3986146911&fm=26&gp=0.jpg",
        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4024070726,3956765417&fm=26&gp=0.jpg",
        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3680290371,612854172&fm=26&gp=0.jpg",
        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3210855908,3095539181&fm=26&gp=0.jpg",
        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2245111742,2209441973&fm=26&gp=0.jpg",
        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1025999189,4268722616&fm=26&gp=0.jpg",
        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=322036232,137210695&fm=26&gp=0.jpg",
        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=167207800,3558583397&fm=26&gp=0.jpg",
        "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3734097612,3486786282&fm=11&gp=0.jpg",
        "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3175863360,731434724&fm=26&gp=0.jpg",
        "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2441956749,4275399915&fm=26&gp=0.jpg",
        "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1073559568,470074036&fm=26&gp=0.jpg",
        "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1006242141,1952258795&fm=11&gp=0.jpg",
        "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=452922460,1191714532&fm=11&gp=0.jpg",
        "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4176816726,2568559965&fm=11&gp=0.jpg",
        "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3841076921,2731247098&fm=26&gp=0.jpg",
        "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3544375238,114231233&fm=26&gp=0.jpg",
        "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3212860924,1428066181&fm=26&gp=0.jpg",
        "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2906612143,2745639562&fm=26&gp=0.jpg"
        ];

        var dataArray = [];
        for(var i = 0; i< 500; i ++){
            dataArray.push(i);
        }

        this.gridView.setDataArray(dataArray,"gridViewItem",function itemInIndex(itemCell,index,data){
            cc.log("index :" + index);
            var i = index % ary.length;
            var url = ary[i];
            itemCell.setStageInfo(url);
        });
    },
    onClickLeft(){
        let ary = ["https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=294893614,3986146911&fm=26&gp=0.jpg",
        "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3212860924,1428066181&fm=26&gp=0.jpg",
        "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1073559568,470074036&fm=26&gp=0.jpg",
        "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1452084672,2791892417&fm=26&gp=0.jpg",
        "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=294893614,3986146911&fm=26&gp=0.jpg",
        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4024070726,3956765417&fm=26&gp=0.jpg"];
        this.gridView.setDataArray(ary,"gridViewItem",function itemInIndex(itemCell,index,data){
            cc.log("index :" + index);
            itemCell.setStageInfo(data);
        });
    },
    onClickChangeBack(){
        let ary = ["https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=294893614,3986146911&fm=26&gp=0.jpg",
        "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3212860924,1428066181&fm=26&gp=0.jpg",
        "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1073559568,470074036&fm=26&gp=0.jpg",
        "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1452084672,2791892417&fm=26&gp=0.jpg",
        "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=294893614,3986146911&fm=26&gp=0.jpg",
        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4024070726,3956765417&fm=26&gp=0.jpg",
    "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3680290371,612854172&fm=26&gp=0.jpg",
"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3210855908,3095539181&fm=26&gp=0.jpg",
"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2245111742,2209441973&fm=26&gp=0.jpg",
"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1025999189,4268722616&fm=26&gp=0.jpg",
"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=322036232,137210695&fm=26&gp=0.jpg",
"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=167207800,3558583397&fm=26&gp=0.jpg",
"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3734097612,3486786282&fm=11&gp=0.jpg",
"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3175863360,731434724&fm=26&gp=0.jpg",
"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2441956749,4275399915&fm=26&gp=0.jpg",
"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1073559568,470074036&fm=26&gp=0.jpg",
"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1006242141,1952258795&fm=11&gp=0.jpg",
"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=452922460,1191714532&fm=11&gp=0.jpg",
"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4176816726,2568559965&fm=11&gp=0.jpg",
"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3841076921,2731247098&fm=26&gp=0.jpg",
"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3544375238,114231233&fm=26&gp=0.jpg",
"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3212860924,1428066181&fm=26&gp=0.jpg",
"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2906612143,2745639562&fm=26&gp=0.jpg",
"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=294893614,3986146911&fm=26&gp=0.jpg",
        "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3212860924,1428066181&fm=26&gp=0.jpg",
        "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1073559568,470074036&fm=26&gp=0.jpg",
        "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1452084672,2791892417&fm=26&gp=0.jpg",
        "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=294893614,3986146911&fm=26&gp=0.jpg",
        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4024070726,3956765417&fm=26&gp=0.jpg",
    "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3680290371,612854172&fm=26&gp=0.jpg",
"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3210855908,3095539181&fm=26&gp=0.jpg",
"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2245111742,2209441973&fm=26&gp=0.jpg",
"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1025999189,4268722616&fm=26&gp=0.jpg",
"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=322036232,137210695&fm=26&gp=0.jpg",
"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=167207800,3558583397&fm=26&gp=0.jpg",
"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3734097612,3486786282&fm=11&gp=0.jpg",
"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3175863360,731434724&fm=26&gp=0.jpg",
"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2441956749,4275399915&fm=26&gp=0.jpg",
"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1073559568,470074036&fm=26&gp=0.jpg",
"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1006242141,1952258795&fm=11&gp=0.jpg",
"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=452922460,1191714532&fm=11&gp=0.jpg",
"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4176816726,2568559965&fm=11&gp=0.jpg",
"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3841076921,2731247098&fm=26&gp=0.jpg",
"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3544375238,114231233&fm=26&gp=0.jpg",
"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3212860924,1428066181&fm=26&gp=0.jpg",
"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2906612143,2745639562&fm=26&gp=0.jpg"];
        this.gridView.setDataArray(ary,"gridViewItem",function itemInIndex(itemCell,index,data){
            cc.log("index :" + index);
            itemCell.setStageInfo(data);
        });
    },

    // update (dt) {},
});
