var UserInfo = require("UserInfo");
var BSocket = require("BSocket");
cc.Class({
    extends: cc.Component,

    properties: {
        m_labelSessionId: {
            default: null,
            type: cc.Label
        },
        m_editBoxName: {
            default: null,
            type: cc.EditBox
        },
        m_buttonStart: {
            default: null,
            type: cc.Button
        },
    },

    // use this for initialization
    onLoad: function () {

        //初始化按钮对象
        this._buttonFighter = this.node.getChildByName("buttonFighter");
        this._buttonArchmage = this.node.getChildByName("buttonArchmage");
        this._buttonTaoist = this.node.getChildByName("buttonTaoist");
        this._buttonBoy = this.node.getChildByName("buttonBoy");
        this._buttonGirl = this.node.getChildByName("buttonGirl");
        this._buttonFighter.color = cc.color(0,0,255,255);
        this._buttonBoy.color = cc.color(0,0,255,255);



		this.m_labelSessionId.string=BSocket._sessionId;
        BSocket.setRecv(function(data) {
            cc.log(JSON.stringify(data));
        });
    },
    
    buttonSend: function () {
        BSocket.send("enterGame","www");
    },


    //开始游戏按钮
    buttonStart: function () {
        //必须超过4个字符判断
        if(this.m_editBoxName.string.length>=4){
            UserInfo._name = this.m_editBoxName.string;
            cc.director.loadScene("GameLayer");
        }else{
            //文字提示
            var node = new cc.Node();
            var tips = node.addComponent(cc.Label);
            node.x = 0;
            node.y = 0;
            tips.string = "最少4个字符";
            this.node.addChild(node);
            node.runAction(cc.sequence(cc.moveBy(0.5, cc.p(0, 200)), cc.delayTime(0.4),
                cc.spawn(cc.moveBy(0.4, cc.p(0, 100)), cc.fadeOut(0.4)),cc.removeSelf()));
        }
    },
    buttonFighter: function(){
        UserInfo._hero = "fighter";
        this._buttonFighter.color = cc.color(0,0,255,255);
        this._buttonArchmage.color = cc.color(255,255,255,255);
        this._buttonTaoist.color = cc.color(255,255,255,255);
    },
    buttonArchmage: function(){
        UserInfo._hero = "archmage";
        this._buttonFighter.color = cc.color(255,255,255,255);
        this._buttonArchmage.color = cc.color(0,0,255,255);
        this._buttonTaoist.color = cc.color(255,255,255,255);
    },
    buttonTaoist: function(){
        UserInfo._hero = "taoist";
        this._buttonFighter.color = cc.color(255,255,255,255);
        this._buttonArchmage.color = cc.color(255,255,255,255);
        this._buttonTaoist.color = cc.color(0,0,255,255);
    },
    buttonBoy: function(){
        UserInfo._sex = "boy";
        this._buttonBoy.color = cc.color(0,0,255,255);
        this._buttonGirl.color = cc.color(255,255,255,255);
    },
    buttonGirl: function(){
        UserInfo._sex = "girl";
        this._buttonBoy.color = cc.color(255,255,255,255);
        this._buttonGirl.color = cc.color(0,0,255,255);
    },
    textChanged: function(text) {
        //this.m_buttonStart.interactable = (text.length>=4);
    },
});
