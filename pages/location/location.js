// pages/location/location.js
var app = getApp()
var util = require('../../utils/util.js')
let City = require('../../utils/allcity.js');

Page({
    data: {
        city: [],
        config: {
            horizontal: true, // 第一个选项是否横排显示（一般第一个数据选项为 热门城市，常用城市之类 ，开启看需求）
            animation: true, // 过渡动画是否开启
            search: true, // 是否开启搜索
            searchHeight: 45, // 搜索条高度
            suctionTop: true // 是否开启标题吸顶
        },
        originLoc: "",
    },
    onLoad(options) {
        var that = this;
        // wx.showLoading({
        //         title: '加载数据中...',
        //     })
        // // 模拟服务器请求异步加载数据
        // setTimeout(() => {
        that.setData({
                city: City
            })
            //     wx.hideLoading()
            // }, 2000)
            //判断选择城市来源按钮
        if (options.startDestination == "current") {
            that.setData({
                originLoc: "current"
            })
        } else {
            that.setData({
                originLoc: "destination"
            })
        }
    },
    bindtap(e) {
        console.log(e.detail);
        var that = this;
        if (that.data.originLoc == "current") {
            app.globalData.currentLoc = e.detail.name;
        } else if (that.data.originLoc == "destination") {
            app.globalData.destinationLoc = e.detail.name;
        }
        wx.navigateBack({
            delta: 1
        })
    },
})