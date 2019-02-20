//logs.js
var util = require('../../utils/util.js')
var app = getApp()
Page({
    data: {
        motto: 'Hello World',
        userInfo: {},
        version: app.globalData.version,
        imgUrl: app.globalData.imgUrl,
        userInfo: {},
    },
    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
            url: ''
        })
    },
    onLoad: function() {
        console.log('onLoad')
        var that = this
            //调用应用实例的方法获取全局数据
        app.getUserInfo(function(userInfo) {
            //更新数据
            that.setData({
                userInfo: userInfo
            })
        })
    },
    onTabItemTap(item) {
        console.log(item)
            // wx.showToast({
            //     title: 'tab点击',
            // })
            // this.getUser();
    },
    //获取用户授权
    getUser: function(e) {
        wx.getSetting({
            success: (res) => {
                wx.getUserInfo({
                    success: function(res) {
                        console.log(res + "|||||||")
                            // app.globalData.userInfo = e.detail.userInfo
                            // this.setData({
                            //     userInfo: e.detail.userInfo,
                            //     hasUserInfo: true
                            // })
                    },
                    fail: function(res) {
                        console.log(res + "[[[[[[[");
                    }
                })
            }
        })
    },
    //点击用户授权同意之后
    bindGetUserInfo: function(e) {
        if (e.detail.userInfo) {
            //用户按了允许授权按钮 
            // wx.showToast({
            //     title: '允许', //提示文字
            //     duration: 2000, //显示时长
            //     mask: true, //是否显示透明蒙层，防止触摸穿透，默认：false  
            //     icon: 'success', //图标，支持"success"、"loading"  
            //     success: function() {}, //接口调用成功
            //     fail: function() {}, //接口调用失败的回调函数  
            //     complete: function() {} //接口调用结束的回调函数  
            // })
            app.globalData.userInfo = e.detail.userInfo
            this.setData({
                userInfo: e.detail.userInfo,
                hasUserInfo: true
            })
        } else {
            //用户按了拒绝按钮
            console.log("+++");
            // wx.showToast({
            //     title: '拒绝', //提示文字
            //     duration: 2000, //显示时长
            //     mask: true, //是否显示透明蒙层，防止触摸穿透，默认：false  
            //     icon: 'success', //图标，支持"success"、"loading"  
            //     success: function() {}, //接口调用成功
            //     fail: function() {}, //接口调用失败的回调函数  
            //     complete: function() {} //接口调用结束的回调函数  
            // }) 
        }
    },
})