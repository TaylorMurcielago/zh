//index.js

var util = require('../../utils/util.js')
let City = require('../../utils/allcity.js');
// 百度定位
let bmap = require('../../utils/bmap-wx.min.js');
var app = getApp()
Page({
    data: {
        feed: [],
        feed_length: 0,
        city: [],
        currentLoc: '上海市',
        destinationLoc: '家乡', // 默认城市信息

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

    //事件处理函数
    bindItemTap: function() {
        wx.navigateTo({
            url: '../answer/answer'
        })
    },
    bindQueTap: function() {
        wx.navigateTo({
            url: '../question/question'
        })
    },
    onLoad: function() {
        console.log('onLoad')
            // 获取定位
        let that = this;
        //location city now

        that.getLocationCity();
        //调用应用实例的方法获取全局数据
        this.getData();
        this.setData({
            city: City
        })

    },
    onShow: function() {
        var that = this;
        that.setData({
            currentLoc: app.globalData.currentLoc,
            destinationLoc: app.globalData.destinationLoc

        })
    },
    getLocationCity: function(e) {
        //location city
        var that = this;
        var BMap = new bmap.BMapWX({
            ak: '9wZWnxib7OxxpGnTsfOYTBkIHD0yGgAL'
        });
        var fail = function(data) {
            console.log('fail!!!!')
        };
        var success = function(data) {

            that.setData({
                currentLoc: data.currentWeather[0].currentCity
            })
            app.globalData.currentLoc = data.currentWeather[0].currentCity;
            console.log(data.currentWeather[0].currentCity);
            // var weatherData = currentLoc; 
        }
        BMap.weather({
            fail: fail,
            success: success
        });
        //
    },
    bindLocation: function(event) {
        // var parameter = "?id=" + this.data.currentLoc.id + "&&name=" + this.data.currentLoc.name + "&&uid=" + this.data.currentLoc.uid;
        var cityId = event.target.dataset['se'];

        wx.navigateTo({
            url: '/pages/location/location?startDestination=' + cityId
        });
    },
    bindtap(e) {
        console.log(e.detail);
        var that = this;
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
    //scroll: function (e) {
    //  console.log("scroll")
    //},

    //网络请求数据, 实现首页刷新
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
    }


})