// pages/location/location.js
var app = getApp()
var util = require('../../utils/util.js')
let City = require('../../utils/allcity.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        feed: [],
        feed_length: 0,
        city: [],
        oldCityFlag: "",
        currentLoc: { "name": "上海市" }, // 默认城市信息

        version: app.globalData.version,
        imgUrl: app.globalData.imgUrl,
        config: {
            horizontal: true, // 第一个选项是否横排显示（一般第一个数据选项为 热门城市，常用城市之类 ，开启看需求）
            animation: true, // 过渡动画是否开启
            search: true, // 是否开启搜索
            searchHeight: 45, // 搜索条高度
            suctionTop: true // 是否开启标题吸顶
        }

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

        console.log(options.startDestination)
        var that = this;
        that.setData({
                oldCityFlag: options.startDestination
            })
            //调用应用实例的方法获取全局数据
        this.getData();
        this.setData({
            city: City
        })
    },
    bindtap(e) {
        console.log(e.detail);
        var that = this;
        // app.globalData.currentLoc = "";
        // app.globalData.destinationLoc = "";
        if (that.data.oldCityFlag == "current") {
            app.globalData.currentLoc = e.detail.name;
        } else {
            app.globalData.destinationLoc = e.detail.name;
        }
        wx.navigateBack({
            delta: 2
        })
        that.setData({
            showOrHide_head_navgation: false
        })
    },
    upper: function() {
        wx.showNavigationBarLoading()
        this.refresh();
        console.log("upper");
        setTimeout(function() {
            wx.hideNavigationBarLoading();
            wx.stopPullDownRefresh();
        }, 2000);
    },
    lower: function(e) {
        wx.showNavigationBarLoading();
        var that = this;
        setTimeout(function() {
            wx.hideNavigationBarLoading();
            that.nextLoad();
        }, 1000);
        console.log("lower")
    },
    refresh0: function() {
        var index_api = '';
        util.getData(index_api)
            .then(function(data) {
                //this.setData({
                //
                //});
                console.log(data);
            });
    },
    //使用本地 fake 数据实现刷新效果
    getData: function() {
        var feed = util.getData2();
        console.log("loaddata");
        var feed_data = feed.data;
        this.setData({
            feed: feed_data,
            feed_length: feed_data.length
        });
    },
    refresh: function() {
        wx.showToast({
            title: '刷新中',
            icon: 'loading',
            duration: 3000
        });
        var feed = util.getData2();
        console.log("loaddata");
        var feed_data = feed.data;
        this.setData({
            feed: feed_data,
            feed_length: feed_data.length
        });
        setTimeout(function() {
            wx.showToast({
                title: '刷新成功',
                icon: 'success',
                duration: 2000
            })
        }, 3000)

    },
    //使用本地 fake 数据实现继续加载效果
    nextLoad: function() {
        wx.showToast({
            title: '加载中',
            icon: 'loading',
            duration: 4000
        })
        var next = util.getNext();
        console.log("continueload");
        var next_data = next.data;
        this.setData({
            feed: this.data.feed.concat(next_data),
            feed_length: this.data.feed_length + next_data.length
        });
        setTimeout(function() {
            wx.showToast({
                title: '加载成功',
                icon: 'success',
                duration: 2000
            })
        }, 3000)
    },


    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})