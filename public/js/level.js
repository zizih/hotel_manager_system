
$(document).ready(function(){
	
	var BtnLevelAdd = $('#btn-level-add')
		,BtnLevelModify = $('.btn-level-Modify')
		,BtnLevelDelete = $('.btn-level-delete')
		
	var DivLevelList = $('#div-level-list')
	
	var InputLevel = $('#input_level_name')
		,InputLevelNum = $('#input_level_num')
		,InputLevelPrice = $('#input_level_price')
		
	BtnLevelAdd.on('click',function(){
		$.ajax({
			type : 'POST',
			url : '/level/add',
			data : JSON.stringify({
				name : InputLevel.val(),
				num : InputLevelNum.val(),
				price : InputLevelPrice.val()
			}),
			dataType : 'json',
			timeout : 300,
			contentType : 'application/json',
			error : function(xhr, type) {
				alert('err: maybe room number is duplicate');
			},
			success : function(data) {
				console.log(data);
				var level = data.level;
				if(data.success){
					DivLevelList.prepend(
							  "<ul style='background:#0f0' class='ul-rooms' id=" + level.name + ">"
								+ "new"
								+ "<li>Level Name :&nbsp;&nbsp;<strong class='txt-level-name'>" + level.name + "</strong></li>"
								+ "<li>Level Num :&nbsp;&nbsp;<strong class='txt-level-num'>" + level.num + "</strong></li>"
								+ "<li>Level price:&nbsp;&nbsp;<strong class='txt-level-price'>" + level.price + "</strong></li>"
								+ "<input type='button' value='delete' class='btn-level-delete' onclick=\"alert('为避免进行频繁的相反操作，刷新后才可以使用')\">"
								+ "<input type='button' value='modify' class='btn-level-modify' onclick=\"alert('为避免进行频繁的相反操作，刷新后才可以使用')\">"
							+ "</ul>"
							);
				}

			}
		});	
	});
	
	BtnLevelDelete.on('click',function(){
		var level_id = $(this).parent().attr('id');
		console.log(level_id);
		var that = $(this).parent();
		$.ajax({
			type : 'GET',
			url : '/level/delete/' + level_id,
			dataType : 'json',
			timeout : 300,
			contentType : 'application/json',
			error : function(xhr, type) {
				alert('Ajax require error!');
			},
			success : function(data) {
				console.log(data);
				data.success && that.remove();
				document.title = 'remove'+data.room + "room";
			}
		});		
	});
	
});
