/**
 * 
 */
var draged = false;
var lastMouseX = 0;
var lastMouseY = 0;
var actived="";

function $dialog(param) {
	initDialog();
	//remove
	$("#"+param.id).remove();
	//new dialog
	if(param.modal && $(".modal_bg").length == 0) {
		$("body").append("<div class='modal_bg' />")
	}
	$("body").append("<div id='"+param.id+"' data-modal='"+param.modal+"' class='opendialog noselect'/>");
	$("#"+param.id).append("<div class='opendialog_header'><span class='title'>"
			+param.title+"</span><span class='closeBtn' onclick=closeOpenDialog('"+param.id+"');>X</span></div>");
	$("#"+param.id).append("<div class='dialog_content'/>")
	if(param.href != "" && param.href != undefined) {
		$("#"+param.id+" .dialog_content").load(param.href);
	}
	$("#"+param.id+" .dialog_content").append(param.content);
	
	if(param.type == "img" ) {
		imgType(param.id);
	}
	calculatePosition(param.id, param.height, param.width);
	eventListening();
}

function closeOpenDialog(id) {
	$("#"+id).remove();
	if($(".opendialog[data-modal=true]").length == 0) {
		$(".modal_bg").remove();
	}
}

function eventListening() {
	$(".opendialog_header").on("mousedown", function(event){
		draged = true;
		lastMouseX = event.offsetX;
		lastMouseY = event.offsetY;
		$(".opendialog_header").css("cursor","move");
		actived = $(this).parent().attr("id");
	})
}

function imgType(id){
	$("#"+id+" img").load(function() {
		var h = $(this).css("height");
		var w = $(this).css("width");
		$(this).css("width", w);
		calculatePosition(id, h.replace("px","")*1, w.replace("px","")*1);
	});
}

function calculatePosition(id, h, w) {
	//calc postion and resize
	var height = document.documentElement.clientHeight;
	var width = document.documentElement.clientWidth;
	var offsetTop = (height - h - 10) / 2;
	var offsetLeft = (width - w) / 2;
	$("#"+id).css("top",offsetTop);
	$("#"+id).css("left",offsetLeft);
	$("#"+id).css("height",h);
	$("#"+id).css("width",w);
}

function initDialog() {
	$("html").on("mousemove", function (event){
		if(draged) {
			var dialogX = $(".opendialog").css("left").replace("px","")*1;
			var dialogY = $(".opendialog").css("top").replace("px","")*1;
			dialogX = event.pageX - lastMouseX;
			dialogY = event.pageY - lastMouseY;
			$("#"+actived).css({ top: dialogY, left: dialogX });
		}
	});
	
	$("html").on("mouseup", function (event) {
		draged = false;
		$(".opendialog_header").css("cursor","default");
	});
	
}