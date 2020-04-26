/**
 * !#en Enum for direction type.
 * !#zh 过渡类型
 * @enum GridView.Direction
 */
let Direction = cc.Enum({
    /**
     * !#en The vertical type.
     * !#zh 垂直滚动
     * @property {Number} VERTICAL
     */
    VERTICAL: 0,

    /**
     * !#en The horizontal type.
     * !#zh 水平滚动
     * @property {Number} HORIZONTAL
     */
    HORIZONTAL: 1,
});

cc.Class({
    extends: cc.Component,

    properties: {
        scrollView: cc.ScrollView,// 滚动视图
        /**
         * !#en direction type
         * !#zh 滚动视图的方向
         * @property {GridView.Direction} direction
         * @default GridView.Direction.VERTICAL
         */

        direction: {
            default: Direction.VERTICAL,
            type: Direction,
            notify() {
                // 在属性面板中，当方向修改的时候，调用该方法
                this._directionChanged();
            }
        },
        gridItemPrefab: cc.Prefab,// 每一关的按钮

        left: {
            default: 0,
            type: cc.Float,
            tooltip: "左间距",
        }, 
        right: {
            default: 0,
            type: cc.Float,
            tooltip: "右间距",
        }, 
        top: {
            default: 0,
            type: cc.Float,
            tooltip: "下间距",
        }, 
        bottom: {
            default: 0,
            type: cc.Float,
            tooltip: "上间距",
        }, 
        spacingX: {
            default: 0,
            type: cc.Float,
            tooltip: "横向间距"
        },
        spacingY: {
            default: 0,
            type: cc.Float,
            tooltip: "纵向间距",
        },  // 纵向间距
        fitWidth:{
            default: false,
            type: Boolean,
            tooltip: "横向滚动时，适配宽度，则高度变化时，item宽度将随之变化",
            visible: (function(){
                return this.direction === Direction.HORIZONTAL
            }),
        },
        fitHeight:{
            default: false,
            type: Boolean,
            tooltip: "纵向滚动时，适配高度，则高度变化时，item高度将随之变化",
            visible: (function(){
                return this.direction === Direction.VERTICAL
            }),
        },
        /**
         * !#en view of scrollView
         * !#zh 滚动视图里面的view
         */
        view: cc.Node,
        scrollContent: cc.Node,// 滚动式图的content
        leftBtn: cc.Button,
        rightBtn: cc.Button,
        xMax: {
            default: 1,// 水平最多放几个
            visible: (function () {
                return this.direction === Direction.VERTICAL
            }),// 是否可见
        },
        yMax: {
            default: 1,// 垂直最多放几个
            type: cc.Integer,
            visible: (function () {
                return this.direction === Direction.HORIZONTAL
            }),// 是否可见
    
        },
        reuseCell: false, //是否重用Cell
        _dRealCount: 0,// 指定方向上轴实际上存放了几个

    },

    // __preload () {
    //     cc.log('调用了该方法__preload');
    //     this._directionChanged();
    // },

    /**
     * 属性面板中，当方向修改的时候，调用该方法，
     * 用来控制x和y的最大显示
     */
    _directionChanged() {
        if (!this.target) {
            this.target = this.node;
        }
        cc.log('调用了该方法');
    },

    onLoad() {

    },

    initGridView: function () {
        if(this.direction === Direction.VERTICAL){
            if(this.leftBtn){
                this.leftBtn.node.active = false;
            }

            if(this.rightBtn){
                this.rightBtn.node.active = false;
            }

        }
        this.onLoadStageConfig();
    },
    // 创建item
    createItem: function () {
        let item = null;
        if (this.gridItemPrefab) {
            item = cc.instantiate(this.gridItemPrefab);//克隆制定item
            item.setContentSize(cc.size(this._itemWidth, this._itemHeight));
        }
        // if (this.nodePool) {
        //     if (this.nodePool.size() > 0) {
        //         item = this.nodePool.get();
        //     } else {
        //         if (this.gridItemPrefab) {
        //             item = cc.instantiate(this.gridItemPrefab);//克隆制定item
        //             item.setContentSize(cc.size(this.itemWidth, this.itemHeight));
        //         }
        //     }
        // }
        return item;
    },

    //
    _updateState: function () {
        
    },

    // 关卡模式的配置
    onLoadStageConfig: function () {
        if (this._itemArray && this._itemArray.length > 0) {
            for (var i = this._itemArray.length - 1; i >= 0; i--) {
                var com = this._itemArray[i];
                if (com && com.node) {
                    com.node.destroy();
                }
                this._itemArray.splice(i, 1);
            }
        }
        this._itemCellInIndexFunc = null;
        this.componentName = null;
        this._itemArray = [];// 保存按钮的数组
        this.stageInfoArray = [];// 用来保存数据的数组
        this._dataArray = [];
        this.scrollContent.removeAllChildren();
        /** 
         * 这几个值，用来计算按钮的位置，以及实现复用功能
         */
        // this.scrollView = this.node.getComponent(cc.ScrollView);// 获取当前的scrollView
        this.svHeight = this.node.height;// 滚动视图的高度
        this.svWidth = this.node.width;// 滚动视图的宽度
        this.startY = this.svHeight / 2;// 滚动视图的content的初始内容
        this.startX = this.scrollContent.x;// 滚动视图的content的初始内容
        if (this.direction == Direction.VERTICAL) {// vertical
            this._itemWidth = (this.view.width - this.spacingX * (this.xMax - 1) - this.left - this.right) / this.xMax;
            this._itemHeight = this.fitHeight ? this.gridItemPrefab.data.height * (this._itemWidth / this.gridItemPrefab.data.width) : this.gridItemPrefab.data.height;
            this.yMax = Math.ceil(this.view.height / (this._itemHeight + this.spacingY));
            // this.yMax = Math.ceil(250 / this.itemHeight);
            this._dRealCount = this.yMax + 2;
            this.scrollView.vertical = true;
            this.scrollView.horizontal = false;
        } else {// horizontal
            this._itemHeight = (this.view.height - this.spacingY * (this.yMax - 1) - this.top - this.bottom) / this.yMax;
            this._itemWidth = this.fitWidth ? this.gridItemPrefab.data.width * (this._itemHeight / this.gridItemPrefab.data.height) : this.gridItemPrefab.data.width;
            this.xMax = Math.ceil(this.view.width / (this._itemWidth + this.spacingX));
            // this.xMax = Math.ceil(240 / this.itemWidth);
            this._dRealCount = this.xMax + 2;
            this.scrollView.vertical = false;
            this.scrollView.horizontal = true;
        }

        // 注册事件
        // 参考文档 https://docs.cocos.com/creator/api/zh/classes/Button.html?q=cc.Component.EventHandler
        // let eventHandler = new cc.Component.EventHandler();
        // eventHandler.target = this.node;
        // eventHandler.component = "gridView";
        // eventHandler.handler = "onEventScrollView";
        // // eventHandler.emit(["param1", "param2", ....]);
        // if (this.scrollView){
        //     let scrollEvents = this.scrollView.scrollEvents;
        //     scrollEvents.push(eventHandler);
        // }
    },

    /**
     * 设置数据数组
     * @param array 数据数组
     * @param componentName item上挂载的用来处理逻辑的脚本名字
     * @param funcName  对应的处理方法的名字
     */
    setDataArray: function(array, componentName, itemCellInIndexCallBack) {
        //重新初始化
        this.initGridView();

        this._componentName = componentName;
        this._itemCellInIndexFunc = itemCellInIndexCallBack;
        if (!array) {
            cc.log("gridView数组为空");
            return;
        }
        if(this.interval){
            clearInterval(this.interval);
        }
        //滚动位置归位,此方法会触发滚动事件，因此在设置数据数组要放到后面
        this.scrollView.scrollToOffset(cc.v2(0, 0),0.1);
        var self = this;
        if(array.length == 0){
            return;
        }
        this.interval = setInterval(function(){
            self._dataArray = array;
            clearInterval(self.interval);
            if (self.direction == Direction.VERTICAL) {// vertical
                /**
                 * 这里讲一下服用的逻辑：
                 * 一个页面横向最多放4个按钮，纵向最多放5个，这是基本条件。
                 * 然后，为了复用，多创建1行，也就是5 + 2 行。
                 * 同时，还要判断按钮的数量，如果小于4 x (5 + 2)的话，就不需要考虑复用了，
                 * 直接就有多少创建多少个。
                 * 如果多余这个数值，就只创建 4 x (5 + 2) 个，这样的话，当滑动的时候，
                 * 页面最多实际上能显示 4 x (5 + 2) 个，因为滑动的时候，会有半个的情况。
                 * 水平滚动的实现逻辑类似
                 */
                self.initVerticalData(componentName);
            } else {// horizontal
                self.initHorizontalData(componentName);
            }
        },300);
        
    },
    initVerticalData: function(componentName){
        this.scrollContent.height = (this._itemHeight + this.spacingY) * Math.ceil(this._dataArray.length / this.xMax);
        this.scrollContent.height = this.scrollContent.height > 0 ? (this.scrollContent.height - this.spacingX) : this.scrollContent.height;
        this._dRealCount = this.yMax + 2;
        var sum = this.xMax * this._dRealCount;
        if (this._dataArray.length < this.xMax * this._dRealCount) {
            sum = this._dataArray.length;
        }
        var lineNum = 0;// 行数，表示当前创建第几行,第0行开始计算
        for (var i = 0; i < sum; i++) {
            let item = this.createItem();
            let com = item.getComponent(componentName);// 根据名称，获取组件
            if (!com) {
                console.log('no such component named ' + componentName);
                return;
            }
            this._itemArray.push(com);
            let x = (this._itemWidth + this.spacingX) * (i % this.xMax) + 0.5 * this._itemWidth - this.scrollContent.width * this.scrollContent.anchorX + this.left;
            let y = - (this._itemHeight + this.spacingY) * lineNum - 0.5 * this._itemHeight + this.view.height * (1 - this.scrollContent.anchorY) - this.top;
            item.setPosition(x, y);
            this.scrollContent.addChild(item);
            if(this._itemCellInIndexFunc){
                var data = this._dataArray[i];
                this._itemCellInIndexFunc(com,i,data);
            }
            if ((i + 1) % this.xMax == 0) {// 该换行了
                lineNum += 1;
            }
        }
    }
    ,
    initHorizontalData:function(componentName){
        var maxLine =  Math.ceil(this._dataArray.length / this.yMax);
        this.scrollContent.width = (this._itemWidth + this.spacingX) * maxLine - this.spacingX;
        this.minContentX = this.scrollContent.x - (this.scrollContent.width >  this.view.width ? (this.scrollContent.width - this.view.width) : 0);
        this._dRealCount = this.xMax + 2;
        var sum = this.yMax * this._dRealCount;
        if (this._dataArray.length < this.yMax * this._dRealCount) {
            sum = this._dataArray.length;
        }
        var lineNum = 0;// 行数，表示当前创建到了第几行
        for (var i = 0; i < sum; i++) {
            // let button = cc.instantiate(this.gridItemPrefab);
            let button = this.createItem();
            let com = button.getComponent(componentName);// 根据名称，获取组件
            this._itemArray.push(com);
            // let x = button.width * (i % this.xMax + 0.5) - this.scrollContent.width * this.scrollContent.anchorX;
            let x = (this._itemWidth + this.spacingX) * lineNum + this._itemWidth * 0.5 - this.view.width * this.scrollContent.anchorX + this.left;
            // let y = -button.height * (0.5 + lineNum);
            let y = - (this._itemHeight + this.spacingY) * (i % this.yMax) - 0.5 * this._itemHeight - this.top;
            y += this.scrollContent.height * (1 - this.scrollContent.anchorY);
            button.setPosition(x, y);
            this.scrollContent.addChild(button);
            if(this._itemCellInIndexFunc){
                var data = this._dataArray[i];
                this._itemCellInIndexFunc(com,i,data);
            }
            if ((i + 1) % this.yMax == 0) {// 该换行了
                lineNum += 1;
            }
        }
    },

    // 监听滚动视图的滚动回调
    onEventScrollView: function (target, eventType) {

        // scrollView事件枚举类型地址：  http://docs.cocos.com/creator/api/zh/enums/ScrollView.EventType.html
        if (this.direction === Direction.VERTICAL) {
            var stageCount = this._dataArray.length;
            //this.scrollContent.y 向上滚，因此值会为正，添加的item 往下 因此y为负
            var visibleViewTopY = -(this.scrollContent.y - this.view.height * 0.5);
            var visibleViewBottomY = visibleViewTopY + (-this.view.height);
            /**
             * 如果复用的时候最多摆放的按钮数大等于关卡数，表示当前关卡比较少，
             * 是按照关卡数进行创建按钮的，所以，这个时候，不需要复用，
             * 所以什么都不处理
             */
            if (this.xMax * this._dRealCount >= stageCount) {
                return;
            }
            this.scrollContent.y;// 根据y值来判断
            // 移动到最底部了，就不再复用了
            if (-visibleViewBottomY > this.scrollContent.height) {
                return;
            }
            // 移动到了顶部，也不进行复用
            if (this.scrollContent.y < this.startY) {
                return;
            }

            if(this.reuseCell){
                this._loadMoreItemCell();
            }else{
                this._reuseItemCellLoadVertical();
            }
     
            
        } else {
            var stageCount = this._dataArray.length;
            /**
             * 如果复用的时候最多摆放的按钮数大等于关卡数，表示当前关卡比较少，
             * 是按照关卡数进行创建按钮的，所以，这个时候，不需要复用，
             * 所以什么都不处理
             */
            if (this.yMax * this._dRealCount >= stageCount) {
                return;
            }
            this.scrollContent.y;// 根据y值来判断
            // 移动到最底部了，就不再复用了
            if (-this.scrollContent.x + this.startX + this._itemWidth + this.spacingX > this.scrollContent.width) {
                return;
            }
            // 移动到了顶部，也不进行复用
            if (this.scrollContent.x > this.startX) {
                // debugger;
                return;
            }
            if(this.reuseCell){
                this._loadMoreItemCell();
            }else{
                this._reuseItemCellLoadHorizontal();
            }
            
            
            this.leftBtn.node.active = !(this.scrollView.getScrollOffset().x > -this._itemWidth * 0.5);
            this.rightBtn.node.active = !(Math.abs(this.scrollView.getScrollOffset().x) > this.scrollView.getMaxScrollOffset().x - this._itemWidth * 0.5);
          
        }

    },

    _reuseItemCellLoadVertical(){
        // y轴滑动的部分都是不可见，例如向上滑动1行，实际创建了7行用与显示， 那么第0行进入不可见区域就用于显示第八行，第0行用于显示的坐标就是this.itemHeight * (7 + 1)
        var deltY = (this.scrollContent.y - this.startY);// y轴滑动的相对距离
        var deltLine = Math.floor((deltY + this.spacingY) / (this._itemHeight + this.spacingY));// 相对移动了多少行
        var yuShu = deltLine % this._dRealCount; //跳到下填充数量
        var beiShu = Math.floor(deltLine / this._dRealCount);
        for (var i = 0; i < this._dRealCount; i++) {
            for (var j = 0; j < this.xMax; j++) {
                let btnId = i * this.xMax + j;// 按钮在数组中的固定的Id
                let index;// 表示当前是第几个按钮，同时，对应自己该关的数据的Id
                let y;// y轴的坐标
                if (i < yuShu) { // 移动底部显示的行
                    var line = 0;
                    // index = line * this.xMax + j;
                    // y = -(line + 0.5) * this.itemHeight;
                    y = -((beiShu + 1) * this._dRealCount + i + 0.5) * (this._itemHeight + this.spacingY) - this.spacingY - this.top;
                    index = ((beiShu + 1) * this._dRealCount + i) * this.xMax + j;
                } else {
                    y = -(beiShu * this._dRealCount + i + 0.5) * (this._itemHeight + this.spacingY) - this.spacingY - this.top;
                    index = (beiShu * this._dRealCount + i) * this.xMax + j;
                }
                if (index >= stageCount) {// 表示已经到了最后关，那么就不移动按钮了
                    continue;
                }
                // 设置按钮的y轴坐标
                // let btn = this._itemArray[btnId];
                let com = this._itemArray[btnId];
                if (!com) {
                    continue;
                }
                if (com.node) {
                    // 防止多次设置，消耗性能
                    if (com.node.y == y) {
                        continue;
                    }
                    com.node.setPositionY(y);
                }
                let info = this._dataArray[index];
                // 设置数据
                let stageInfo = this._dataArray[index];
                if(this._itemCellInIndexFunc){
                    
                    this._itemCellInIndexFunc(com,index,stageInfo);
                }
            }
        }
    },

    //重复使用itemCell加载横向滚动内容
    _reuseItemCellLoadHorizontal(){
        var deltX = Math.abs(this.scrollView.getScrollOffset().x);
            var deltLine = Math.floor((deltX + this.spacingX) / (this._itemWidth + this.spacingX));// 相对移动了多少行
            var yuShu = 0;// 余数
            var beiShu = 0;// 倍数
            yuShu = deltLine % this._dRealCount;
            beiShu = Math.floor(deltLine / this._dRealCount);
            for (var i = 0; i < this._dRealCount; i++) {
                for (var j = 0; j < this.yMax; j++) {
                    let btnId = i * this.yMax + j;// 按钮在数组中的固定的Id
                    let index;// 表示当前是第几个按钮，同时，对应自己该关的数据的Id
                    let x;// x轴的坐标
                    if (i < yuShu) {
                        var line = 0;
                        x = ((beiShu + 1) * this._dRealCount + i + 0.5) * (this._itemWidth + this.spacingX) - this.spacingX + this.left;
                        index = ((beiShu + 1) * this._dRealCount + i) * this.yMax + j;
                    } else {
                        x = (beiShu * this._dRealCount + i + 0.5) * (this._itemWidth + this.spacingX) - this.spacingX + this.left;
                        index = (beiShu * this._dRealCount + i) * this.yMax + j;
                    }
                    if (index >= stageCount) {// 表示已经到了最后关，那么就不移动按钮了
                        continue;
                    }
                    // 设置按钮的y轴坐标
                    // let btn = this._itemArray[btnId];
                    let com = this._itemArray[btnId];
                    if (!com) {
                        continue;
                    }
                    if (com.node) {
                        // 防止多次设置，消耗性能
                        if (com.node.x == x) {
                            continue;
                        }
                        com.node.setPositionX(x);
                    }
                    // 设置数据
                    let stageInfo = this._dataArray[index];
                    if(this._itemCellInIndexFunc){
                        this._itemCellInIndexFunc(com,index,stageInfo);
                    }
                }
            }
    },

    //
    _loadMoreItemCell(){
        var _curOffset = this.scrollView.getScrollOffset();
        if(!this._lastOffset){
            this._lastOffset = this.scrollView.getScrollOffset();
        }
        this._getVisibleViewPosition();
        this._getLastVisibleViewPosition();
        
        if(this.direction === Direction.HORIZONTAL){
           
            const isRight = _curOffset.x < this._lastOffset.x; //是否向右加载更多内容
            if(isRight){
                var deltX = Math.abs(_curOffset.x);
                var canLoadItemCellCount = Math.ceil((deltX + this.view.width+ this.spacingX) / (this._itemWidth + this.spacingX)) * this.yMax;
                var curItemCount = this._itemArray.length;
                if(canLoadItemCellCount > this._dataArray.length){
                    canLoadItemCellCount = this._dataArray.length;
                }
                //创建从未加载的
                if(curItemCount < canLoadItemCellCount){
                    for(var i = curItemCount; i < canLoadItemCellCount; i++){
                        var x = Math.floor(i / this.yMax) * (this._itemWidth + this.spacingX) + this._itemWidth * 0.5 + this.left;
                        var y = -i % this.yMax * (this._itemHeight + this.spacingY) - this._itemHeight * 0.5 - this.top;
                        var item = this.createItem();
                        let com = item.getComponent(this._componentName);
                        com.node.setPosition(x,y);
                        this._itemArray.push(com);
                        this.scrollContent.addChild(item);
                        if(this._itemCellInIndexFunc){
                            let data = this._dataArray[i];
                            this._itemCellInIndexFunc(com,i,data);
                        }
                    }
                   
                }else{
                    var startIndex = this._lastVisibleViewMaxLine * this.yMax;
                    var endIndex = this._visibleViewMaxLine * this.yMax + this.yMax -1; 
                    //即将显示的
                    for(var index = startIndex; index <= endIndex; index++){
                        
                    }

                }
            }

       
        }else{
            const isDown = _curOffset.y > this._lastOffset.y; //是否向下加载更多内容
            if(isDown){
                var deltY = Math.abs(_curOffset.y);
                var canLoadItemCellCount = Math.ceil((deltY + this.view.height+ this.spacingY) / (this._itemHeight + this.spacingY)) * this.xMax;
                var curItemCount = this._itemArray.length;
                if(canLoadItemCellCount > this._dataArray.length){
                    canLoadItemCellCount = this._dataArray.length;
                }
                //创建从未加载的
                if(curItemCount < canLoadItemCellCount){
                    for(var i = curItemCount; i < canLoadItemCellCount; i++){
                        var y = -Math.floor(i / this.xMax) * (this._itemHeight + this.spacingY) - this._itemHeight * 0.5 - this.top;
                        var x = i % this.xMax * (this._itemWidth + this.spacingX) + this._itemWidth * 0.5 + this.left;
                        var item = this.createItem();
                        let com = item.getComponent(this._componentName);
                        com.node.setPosition(x,y);
                        this._itemArray.push(com);
                        this.scrollContent.addChild(item);
                        if(this._itemCellInIndexFunc){
                            let data = this._dataArray[i];
                            this._itemCellInIndexFunc(com,i,data);
                        }
                    }
                   
                }else{
                    var startIndex = this._lastVisibleViewMaxLine * this.xMax;
                    var endIndex = this._visibleViewMaxLine * this.xMax + this.xMax -1; 
                    //即将显示的
                    for(var index = startIndex; index <= endIndex; index++){
                        
                    }

                }
            }
        }
        this._lastOffset = _curOffset;

    },



    //获取可见区域边界坐标值
    _getVisibleViewPosition(){
        var _offset = this.scrollView.getScrollOffset();
        this._visibleViewMinX = - _offset.x;
        this._visibleViewMaxX = Math.abs(_offset.x) + this.view.width;
        this._visibleViewMinY = -_offset.y;
        this._visibleViewMaxY = - _offset.y - this.view.width;
        if(this.direction === Direction.HORIZONTAL){
            this._visibleViewMinLine = Math.floor((this._visibleViewMinX + this.spacingX) / (this._itemWidth + this.spacingX));
            this._visibleViewMaxLine = Math.floor((this._visibleViewMaxX + this.spacingX) / (this._itemWidth + this.spacingX));
        }else{
            this._visibleViewMinLine = Math.floor((this._visibleViewMinY + this.spacingX) / (this._itemHeight + this.spacingX));
            this._visibleViewMaxLine = Math.floor((this._visibleViewMaxY + this.spacingX) / (this._itemHeight + this.spacingX));
        }
    },

    //获取可见区域边界坐标值
    _getLastVisibleViewPosition(){
        var _offset = this._lastOffset;
        this._lastVisibleViewMinX = - _offset.x;
        this._lastVisibleViewMaxX = Math.abs(_offset.x) + this.view.width;
        this._lastVisibleViewMinY = -_offset.y;
        this._lastVisibleViewMaxY = - _offset.y - this.view.height;
        if(this.direction === Direction.HORIZONTAL){
            this._lastVisibleViewMinLine = Math.floor((this._lastVisibleViewMinX + this.spacingX) / (this._itemWidth + this.spacingX));
            this._lastVisibleViewMaxLine = Math.floor((this._lastVisibleViewMaxX + this.spacingX) / (this._itemWidth + this.spacingX));
        }else{
            this._lastVisibleViewMinLine = Math.floor((this._lastVisibleViewMinY + this.spacingX) / (this._itemHeight + this.spacingX));
            this._lastVisibleViewMaxLine = Math.floor((this._lastVisibleViewMaxY + this.spacingX) / (this._itemHeight + this.spacingX));
        }
    },

        /**
     * 滚动到底部触发
     */
    _onScrollToBottom() {
        if (this._scrollToBottomHandler) {
            this._scrollToBottomHandler.call(this._scrollToBottomThisObj);
        }
    },

            /**
     * 滚动到右端触发
     */
    _onScrollToRight() {
        if (this._scrollToBottomHandler) {
            this._scrollToBottomHandler.call(this._scrollToBottomThisObj);
        }
    },

    start() {

    },

    update(dt) {
    },

    onDestroy() {

    },


    onClickLeft() {
        var offset = this.scrollView.getScrollOffset()
        offset.x = Math.abs(offset.x) - this.scrollView.node.width + this.left
        if (offset.x < 0) offset.x = 0
        this.scrollView.scrollToOffset(offset, 0.5)
    },
    onClickRight() {
        var offset = this.scrollView.getScrollOffset()
        offset.x = Math.abs(offset.x) + this.scrollView.node.width - this.left
        if (offset.x > this.scrollView.getMaxScrollOffset().x) {
            offset.x = this.scrollView.getMaxScrollOffset().x
        }
        this.scrollView.scrollToOffset(cc.v2(offset.x, 0), 0.5)
    },
});
