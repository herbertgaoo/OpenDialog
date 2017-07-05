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
	$("body").append("<div id='"+param.id+"' class='opendialog noselect'/>");
	$("#"+param.id).append("<div class='opendialog_header'><span class='title'>"
			+param.title+"</span><span class='closeBtn' onclick=closeOpenDialog('"+param.id+"');>X</span></div>");
	$("#"+param.id).append("<div class='dialog_content'/>")
	$("#"+param.id+" .dialog_content").load(param.href);
	//calc postion and resize
	var height = document.documentElement.clientHeight;
	var width = document.documentElement.clientWidth;
	var offsetTop = (height - param.height - 10) / 2;
	var offsetLeft = (width - param.width) / 2;
	$("#"+param.id).css("top",offsetTop);
	$("#"+param.id).css("left",offsetLeft);
	$("#"+param.id).css("height",param.height);
	$("#"+param.id).css("width",param.width);
	eventListening();
}

function closeOpenDialog(id) {
	$("#"+id).remove();
	if($(".opendialog").length == 0) {
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