var RecordBill;
(function (RecordBill) {
    var APP;
    (function (APP) {
        var url = "http://116.55.251.122:8099/api/WeChatRQCodePay/GetRQCodeUrl ";
        var data = {
            "RTCode": "BWTUwgsQ/1c=",
            "NotifyUrll": "http://www.baidu.com",
            "OrderM": {
                "ID": "111111111112111",
                "Description": "测试",
                "Attach": "qq=1",
                "TotalPrice": 1,
                "Tag": "",
                "EffectiveTime": 6
            }
        };
        var SFun = function (resM, xhr, status) {
            console.log(resM);
        };
        var FFun = function (resM, xhr, status) {
        };
        var CFun = function (resM, xhr, status) {
        };
        APP.Common.SendPost(url, data, SFun, FFun, CFun);
    })(APP = RecordBill.APP || (RecordBill.APP = {}));
})(RecordBill || (RecordBill = {}));
//# sourceMappingURL=Test.js.map