//logs.js
var util = require('../../utils/util.js')
var app = getApp()
Page({
    data: {
        navTab: ["通知", "赞与感谢", "关注"],
        currentNavtab: "0",
        version: app.globalData.version,
        imgUrl: app.globalData.imgUrl,
    },
    onLoad: function() {

    },
    switchTab: function(e) {
        this.setData({
            currentNavtab: e.currentTarget.dataset.idx
        });
    }
})