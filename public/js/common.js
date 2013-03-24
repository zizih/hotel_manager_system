
$(document).ready(function(){
	
	var BtnAddRoom = $('#btn-add-room')
		,BtnDeleteRoom = $('#btn-delete-room')

	BtnAddRoom.on('click',function(){
		$.ajax({
			type : 'POST',
			url : '/add',
			data : JSON.stringify({

			}),
			dataType : 'json',
			timeout : 300,
			contentType : 'application/json',
			error : function(xhr, type) {
				alert('Ajax require to ' + url + ' error!');
			},
			success : function(data) {
				callback(data);
			}
		});	
	});


});
