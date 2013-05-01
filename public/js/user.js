$(document).ready(function() {

	var PageRoom = $('#room')
		,PageSearch = $('#search')
		,PageUser = $('#user')
		,PageLevel = $('#level')

	var BtnUserToLogin = $('#btn-user-tologin'), 
		BtnUserToReg = $('#btn-user-toreg'), 
		BtnUserLogin = $('#btn-user-login'), 
		BtnUserReg = $('#btn-user-reg')

	var DivUserLogin = $('#div-user-login'), 
		DivUserReg = $('#div-user-reg')

	var InputUserLoginName = $('#input_user_login_name'), 
		InputUserLoginPasswd = $('#input_user_login_passwd'), 
		InputUserRegName = $('#input_user_reg_name'), 
		InputUserRegPasswd = $('#input_user_reg_passwd'),
		InputUserRegCardId = $('#input_user_reg_card'),
		SelectedUserRegRole = $('#select_user_reg_role')

	var TxtBookUserPrompt = $('.txt_book_User_propmt')

	BtnUserLogin.on('click', function() {
		$.ajax({
			type : 'POST',
			url : '/u/login',
			data : JSON.stringify({
				name : InputUserLoginName.val(),
				passwd : InputUserLoginPasswd.val()
			}),
			dataType : 'json',
			timeout : 300,
			contentType : 'application/json',
			error : function(xhr, type) {
				alert('login fail');
			},
			success : function(data) {
				console.log(data);
				var user = data.user;
				document.title = data.title;
				window.location.hash = "#!u/"+user.name;
				if(data.sucess && data.role.name == "admin"){
					PageRoom.show();
					PageSearch.hide();
					PageUser.hide();
					PageLevel.hide();
				}else if(data.role.name == "customer"){
					PageRoom.hide();
					PageSearch.hide();
					PageUser.hide();
					PageLevel.hide();
				}
			}
		});
	});

	BtnUserReg.on('click', function() {
		$.ajax({
			type : 'POST',
			url : '/u/reg',
			data : JSON.stringify({
				name : InputUserRegName.val(),
				passwd : InputUserRegPasswd.val(),
				card_id : InputUserRegCardId.val(),
				role : SelectedUserRegRole.val(),
			}),
			dataType : 'json',
			timeout : 300,
			contentType : 'application/json',
			error : function(xhr, type) {
				alert('reg fail');
			},
			success : function(data) {
				console.log(data);
				var room = data.room;
				if(data.sucess && data.role.name == "admin"){
					PageRoomAdd.show();
					PageRoomBook.hide();
					PageRoomUnbook.hide();
					PageRoomSearch.hide();
					PageUser.hide();
					PageLevel.hide();
				}else if(data.role.name == "customer"){
					PageRoomAdd.hide();
					PageRoomBook.hide();
					PageRoomUnbook.show();
					PageRoomSearch.hide();
					PageUser.hide();
					PageLevel.hide();
				}
			}
		});
	});

	BtnUserToLogin.on('click', function() {
		DivUserLogin.show();
		DivUserReg.hide();
	});

	BtnUserToReg.on('click', function() {
		DivUserLogin.hide();
		DivUserReg.show();
	});

});
