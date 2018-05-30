var dappAddress = "n1xfyB4ZaDAhoXnpoQ9Ta9Fmr37CYwMyoDT";
$(function() {
	
	
		var NebPay = require("nebpay"); //https://github.com/nebulasio/nebPay
		var nebpay = new NebPay();

		
		//var dappAddress = "n1xfyB4ZaDAhoXnpoQ9Ta9Fmr37CYwMyoDT";
		var txHash = "06b24ad954ef6649b778925be5e955d5f3c19e2f3d97f0b48fb09cdada4c4309";
		
		
	$("#allstars").click(function() {
		$("#detailTitle").text("全部天体 ALL Stars");

		var to = dappAddress;
		var value = "0";
		var callFunction = "getStars";
		var callArgs = "[]";
		nebpay.simulateCall(to, value, callFunction, callArgs, {
			listener: function(resp) {
				//console.log(JSON.stringify(resp.result));
				if(resp.result == ""){
					$("#searchresult").html('<div class="panel-body" >暂无记录</div>');
					return;
				}
				var res = JSON.parse(resp.result);
				if(res.length == 0){
					$("#searchresult").html('<div class="panel-body">暂无记录</div>');
					return;
				}

				var tempStr = "";

				for (var i = 0; i < res.length; i++) {
					if (i % 2 == 0) {
						tempStr += '<div class="panel-body"> ';
					} else {
						tempStr += '<div class="panel-footer">';
					}

					//					
					tempStr += '<p>';
					tempStr += res[i].content;
					tempStr += '</p>';
					tempStr += '<p>';
					tempStr += '<small><cite>' + 'Star记录地址:' + res[i].author + '</cite></small>';
					tempStr += '<br>';
					tempStr += '<a class="btn" href="javascript:void(0)" id="like" onclick="addMy(';
					tempStr += res[i].index;
					tempStr += ')">收藏Star</a>';

					tempStr += '</p> </div> ';
				}
				console.log(tempStr);
				$("#searchresult").html(tempStr);
			}
		});

	});
	$("#allstars").click();

	$("#Mystars").click(function() {
		$("#detailTitle").text("我的收藏 MY Stars");



		var to = dappAddress;
		var value = "0";
		var callFunction = "getMy";
		var callArgs = "[]";
		nebpay.simulateCall(to, value, callFunction, callArgs, {
			listener: function(resp) {
				//console.log(JSON.stringify(resp.result));
				if(resp.result == ""){
					$("#searchresult").html('<div class="panel-body">暂时没有记录</div>');
					return;
				}
				var res = JSON.parse(resp.result);
				if(res.length == 0){
					$("#searchresult").html('<div class="panel-body">暂时没有记录</div>');
					return;
				}
				

				var tempStr = "";

				for (var i = 0; i < res.length; i++) {
					if (i % 2 == 0) {
						tempStr += '<div class="panel-body"> ';
					} else {
						tempStr += '<div class="panel-footer">';
					}

					//					
					tempStr += '<p>';
					tempStr += res[i].content;
					tempStr += '</p>';
					tempStr += '<p>';
					tempStr += '<small><cite>' + 'Star记录地址:' + res[i].author + '</cite></small>';
					tempStr += '<br>';
					tempStr += '<a class="btn" href="#" id="reMy" onclick="reMy(';
					tempStr += res[i].index;
					tempStr += ')">取消收藏</a>';
					
					tempStr += '</p> </div> ';
				}
				console.log(tempStr);
				$("#searchresult").html(tempStr);
			}
		});

	});

	$("#create").click(function() {
		$("#detailTitle").text("记录新天体 NEW Star")

		var tempStr = '';
		tempStr += '<div class="panel-body"> ';
		tempStr += '<form role="form">';
		tempStr += '<div class="form-group">';
		tempStr += '<p>有效新天体将会在Committee forSmall Body Nomenclature审议通过后在《国际小行星通报》上公布，并通知各国天文台，其命名列入每年出版的《小行星星历表》。</p>';
		tempStr += '<p>Star Name 序号-名-临时编号</p>';
		tempStr += '<textarea class="form-control" rows="1" id="name" >1-Ceres-1899OF</textarea>';
		tempStr += '<p>Star Info 详细内容/轨道数据及描述</p>';
		tempStr += '<textarea class="form-control" rows="10" id="content" >将我替换为轨道数据/详细描述</textarea>';
		tempStr += '<button type="button" class="btn btn-primary" id="savebutton" onclick="save();">上传STAR数据</button>';		
		tempStr += '</div>';
		tempStr += '</form>';
		tempStr += '</div> ';
		console.log(tempStr);

		$("#searchresult").html(tempStr);
	});

});

function addMy(index){
	var NebPay = require("nebpay"); //https://github.com/nebulasio/nebPay
	var nebpay = new NebPay();

	//var dappAddress = "n1nk8EEJcCE2J1fk2wdFCLMkhH8cttrxGJE";
	var txHash = "4cbc74e26f138c57dda5e3a86dc6965a3f11dca7c7735e3164611a0e15ffedba";

		var to = dappAddress;
		var value = "0";
		var callFunction = "addMy";
		var callArgs = "[\"" + index + "\"]";
		nebpay.call(to, value, callFunction, callArgs, {
			listener: function(resp) {
				console.log(JSON.stringify(resp.result));
			}
		});
};

function reMy(index){
	var NebPay = require("nebpay"); //https://github.com/nebulasio/nebPay
	var nebpay = new NebPay();
		var to = dappAddress;
		var value = "0";
		var callFunction = "reMy";
		var callArgs = "[\"" + index + "\"]";
		nebpay.call(to, value, callFunction, callArgs, {
			listener: function(resp) {
				console.log(JSON.stringify(resp.result));
			}
		});
};

function save(){
	var NebPay = require("nebpay"); //https://github.com/nebulasio/nebPay
	var nebpay = new NebPay();
		var content = $("#content").val();
		var name = $("#name").val();
		if (content == "") {
			alert("请输入描述。");
			return;
		}
		if (name == "") {
			alert("请输入星名。");
			return;
		}
		
		content= content.replace(/\n/g,"<br>"); 
		name= name.replace(/\n/g,"<br>"); 
		var to = dappAddress;
		var value = "0";
		var callFunction = "save";
		var callArgs = "[\"" + name + "\u003cbr\u003e描述:" + content + "\"]";
		nebpay.call(to, value, callFunction, callArgs, {
			listener: function cbPush(resp) {
				console.log("response of push: " + JSON.stringify(resp))
				var respString = JSON.stringify(resp);
				if(respString.search("rejected by user") !== -1){
					alert("关闭交易,取消上传")
				}else if(respString.search("txhash") !== -1){
					alert("上传Hash: " + resp.txhash+"请等待交易确认,如果上传失败请检查内容是否含有特殊字符")
				}
			}
		});
	

};