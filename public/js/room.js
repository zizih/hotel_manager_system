
$(document).ready(function(){
	
	var BtnRoomAdd = $('#btn-room-add')
		,BtnRoomSave = $('#btn-room-save')
		,BtnRoomDelete = $('.btn-room-delete')
		,BtnRoomModify = $('.btn-room-modify')
		,BtnRoomSearch = $('#btn-room-search')
		,BtnRoomBook = $('.btn-room-book')
		,BtnRoomUnbook = $('.btn-room-unbook')
		,BtnBook = $('#btn-room-book')


	var PageRoom = $('#room')
		,PageSearch = $('#search')
		,PageUser = $('#user')
		,PageLevel = $('#level')
		
		,DivRoomAdd = $('#room-add')
		,DivRoomBook = $('#room-book')
		,DivRoomUnbook = $('#room-unbook')

	var DivRoomList = $('#div-room-list')
		,DivRoomAdd = $('#div-room-add')
		,DivRoomSearch = $('#div-room-search')
		,DivRoomSearchResult = $('#div-room-search-result')
		,DivRoomBookList = $("#div-room-book-list")
		,DivRoomUnbookList = $("#div-room-unbook-list")

	var UlRooms = $('ul.ul-rooms');

	var ANavSearch = $('a#a-nav-search')
		,ANavRoom = $('a#a-nav-room')
		,ANavUser = $('a#a-nav-user')
		,ANavLevel = $('a#a-nav-level')
		
	var ARoomBook = $('a#a-room-book')
		,ARoomUnbook = $('a#a-room-unbook')
		,ARoomAdd = $('a#a-room-add')
		

	var InputRoomSearch = $('#input_room_search')
		,InputRoomNum = $('#input_room_num')
		,InputRoomLevel = $('#input_room_level')
		,InputRoomIfBook = $('#input_room_ifbook')
		,InputRoomStartTime = $('#input_room_start_time')
		,InputRoomEndtime = $('#input_room_end_time')
		,InputRoomUserId = $('#input_room_user')
		,InputRoomStartDate = $("#input_room_start_date")
		,InputRoomStartTime = $("#input_room_start_time")
		,InputRoomEndDate = $("#input_room_end_date")
		,InputRoomEndTime = $("#input_room_end_time")

	var TxtBookRoomPrompt = $('.txt_book_room_propmt')
		
	//global
	var ModifyRoom;
	var BookingRoom;
	var UnbookingRoom;
	var BookingRoomNum;
	var BookingRoomLevel;

	DivRoomAdd.show();
	DivRoomBook.hide();
	DivRoomUnbook.hide();
	
	var booksNum = 0;
	var unbooksNum = 0;

	BtnRoomAdd.on('click',function(){
		$.ajax({
			type : 'POST',
			url : '/room/add',
			data : JSON.stringify({
				num : InputRoomNum.val(),
				level : InputRoomLevel.val()
			}),
			dataType : 'json',
			timeout : 300,
			contentType : 'application/json',
			error : function(xhr, type) {
				alert('err: maybe room number is duplicate');
			},
			success : function(data) {
				console.log(data);
				var room = data.room;
				if(data.success){
					DivRoomList.prepend(
							  "<ul style='background:#0f0' class='ul-rooms' id=" + room.num + ">"
								+ "new"
								+ "<li>Room Num :&nbsp;&nbsp;<strong class='txt-room-num'>" + room.num + "</strong></li>"
								+ "<li>Room Level :&nbsp;&nbsp;<strong class='txt-room-level'>" + room.level.name + "</strong></li>"
								+ "<li>Room Price :&nbsp;&nbsp;<strong class='txt-room-level'>" + room.level.price + "</strong></li>"
								+ "<input type='button' value='delete' class='btn-room-delete' onclick=\"alert('为避免进行频繁的相反操作，刷新后才可以使用')\">"
								+ "<input type='button' value='modify' class='btn-room-modify' onclick=\"alert('为避免进行频繁的相反操作，刷新后才可以使用')\">"
							+ "</ul>"
							);
					DivRoomUnbookList.append(
						"<ul class='ul-rooms' id='"+room.num+"'>"
				        	+ room.num
				        	+ "<li> Room Num :&nbsp;&nbsp;"
				           		+ "<strong class='txt-room-num'>" + room.num + "</strong>"
				            + "<li> Room Level :&nbsp;&nbsp;"
				             	+ "<strong class='txt-room-level'>" + room.level.name +"</strong>"
				            +"<input type='button' value='book' class='btn-room-book'>"
				        +"</ul>"
						);
				}

			}
		});	
	});

	BtnRoomDelete.on('click',function(){
		var room_num = $(this).parent().attr('id');
		var that = $(this).parent();
		$.ajax({
			type : 'GET',
			url : '/room/delete/' + room_num,
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

	BtnRoomModify.on('click',function(){
		var room_num = $(this).parent().children('li').children('strong.txt-room-num').html();
		var room_level = $(this).parent().children('li').children('strong.txt-room-level').html();
		InputRoomNum.val(room_num);
		InputRoomLevel.val(room_level);
		BtnRoomAdd.hide();
		BtnRoomSave.show();
		ModifyRoom = $(this).parent();
	});

	BtnRoomSave.on('click',function(){
		var room_num = ModifyRoom.children('li').children('strong.txt-room-num');
		var room_level = ModifyRoom.children('li').children('strong.txt-room-level');
		//ajax
		$.ajax({
			type : 'POST',
			url : '/room/add',
			data : JSON.stringify({
				id : ModifyRoom.attr('id'),
				num : InputRoomNum.val(),
				level : InputRoomLevel.val()
			}),
			dataType : 'json',
			timeout : 300,
			contentType : 'application/json',
			error : function(xhr, type) {
				alert('modify fail');
			},
			success : function(data) {
				console.log(data);
				var room = data.room;
				if(data.success){
					room_num.html(InputRoomNum.val());
					room_level.html(InputRoomLevel.val());
					BtnRoomAdd.show();
					BtnRoomSave.hide();
					InputRoomNum.val("");
					InputRoomLevel.val("");
				}
				document.title = data.title;
			}
		});
		//frontend
	});

	BtnRoomSearch.on('click',function(){
		console.log('/room/search/' + InputRoomSearch.val());
		$.ajax({
			type : 'GET',
			url : '/room/search/' + InputRoomSearch.val(),
			dataType : 'json',
			timeout : 300,
			contentType : 'application/json',
			error : function(xhr, type) {
				alert('Ajax require error!');
			},
			success : function(data) {
				console.log(data);
				var room = data.room;
				data.success && DivRoomSearchResult.html(
							  "<ul style='background:#444' class='ul-rooms' id=" + room.num + ">"
							+ "new"
							+ "<li>Room Num :&nbsp;&nbsp;<strong class='txt-room-num'>" + room.num + "</strong></li>"
							+ "<li>Room Level:&nbsp;&nbsp;<strong class='txt-room-level'>" + room.level.name + "<strong></li>"
							+ "</ul>"
							);
			}
		});
	});

	BtnRoomBook.on('click',function(){
		BookingRoom = $(this).parent();
		BookingRoomNum= $(this).parent().children('li').children('strong.txt-room-num').html();
		BookingRoomLevel = $(this).parent().children('li').children('strong.txt-room-level').html();
		TxtBookRoomPrompt.html(
			"You Choose Room: " 
			+ BookingRoomNum 
			+ ", Level: " 
			+ BookingRoomLevel);
	});

	BtnBook.on('click',function(){
		var num = BookingRoomNum
			,level = BookingRoomLevel
			,user = InputRoomUserId.val()
			,starttime = InputRoomStartDate.val() + " " + InputRoomStartTime.val()
			,endtime = InputRoomEndDate.val() +" "+InputRoomEndTime.val();
			console.log(num +" "+level+" "+user+" "+starttime+ " "+ endtime);
		$.ajax({
			type : 'POST',
			url : '/room/book',
			data : JSON.stringify({
				num : num,
				user : user,
				starttime : starttime,
				endtime : endtime
			}),
			dataType : 'json',
			timeout : 300,
			contentType : 'application/json',
			error : function(xhr, type) {
				alert('book fail');
			},
			success : function(data) {
				console.log(data);
				room = data.room;
				if(data.success){
					BookingRoom.remove();
					DivRoomBookList.append(
						"<ul class='ul-rooms' id='" + room.num + "' style='height:180px;')>"
	           				+ room.num
	            			+ "<li> Room Num :&nbsp;&nbsp;"
				              + "<strong class='txt-room-num'>" + room.num + "</strong>"
				              +"</li>"
				            + "<li> Room Level :&nbsp;&nbsp;"
				              + "<strong class='txt-room-level'>" + room.level.name +"</strong>"
				              +"</li>"
				            + "<li> Room Price :&nbsp;&nbsp;"
				              + "<strong class='txt-room-level'>" + room.level.price +"</strong>"
				              +"</li>"
				            + "<li> User Id Card :"
				              + "<strong class='txt-room-user-id'>" + room.user +"</strong>" 
				              +"</li>"
				            + "<li> Start Time :"
				              + "<strong class='txt-room-start-time'>" + room.starttime +"</strong>" 
				              +"</li>" 
				            + "<li> End Time :"
				              + "<strong class='txt-room-end-time'>" + room.endtime +"</strong>" 
				              +"</li>"
				            +"<input type='button' value='unbook' class='btn-room-unbook' onclick=\"alert('为避免进行频繁的相反操作，刷新后才可以使用')\">"
				        +"</ul>"
						);
					DivRoomBook.children('p.book-pro').html(" 刚订了 " + (++unbooksNum));
					DivRoomUnbook.children('p.unbook-pro').html(" 刚订了 " + unbooksNum);
				}
			}
		});	
	});

	BtnRoomUnbook.on('click',function(){
		UnbookingRoom = $(this).parent();
		$.ajax({
			type : 'GET',
			url : '/room/unbook/' + $(this).parent().attr('id'),
			dataType : 'json',
			timeout : 300,
			contentType : 'application/json',
			error : function(xhr, type) {
				alert('Ajax require error!');
			},
			success : function(data) {
				console.log(data);
				var room = data.room;
				if(data.success){
					UnbookingRoom.remove();
					DivRoomUnbookList.append(
						"<ul class='ul-rooms' id='"+room.num+"'>"
				        	+ room.num
				        	+ "<li> Room Num :&nbsp;&nbsp;"
				           		+ "<strong class='txt-room-num'>" + room.num + "</strong>"
				            + "<li> Room Level :&nbsp;&nbsp;"
				             	+ "<strong class='txt-room-level'>" + room.level.name +"</strong>"
				            +"<input type='button' value='book' class='btn-room-book' onclick=\"alert('为避免进行频繁的相反操作，刷新后才可以使用')\">"
				        +"</ul>"
						);
					DivRoomBook.children('p.book-pro').html(" 刚退订了 " + (++booksNum));
					DivRoomUnbook.children('p.unbook-pro').html(" 刚退订了 " + booksNum);
					
				}
			}
		});
	});


	ANavSearch.on('click',function(){
		PageRoom.hide();
		PageSearch.show();
		PageUser.hide();
		PageLevel.hide();
	});
	
	ANavUser.on('click',function(){
		PageRoom.hide();
		PageSearch.hide();
		PageUser.show();
		PageLevel.hide();
	});
	ANavLevel.on('click',function(){
		PageRoom.hide();
		PageSearch.hide();
		PageUser.hide();
		PageLevel.show();
	});
	
	ARoomAdd.on('click',function(){
		DivRoomAdd.show();
		DivRoomBook.hide();
		DivRoomUnbook.hide();
	});
	
	ARoomBook.on('click',function(){
		DivRoomAdd.hide();
		DivRoomBook.show();
		DivRoomUnbook.hide();
	});

	ARoomUnbook.on('click',function(){
		DivRoomAdd.hide();
		DivRoomBook.hide();
		DivRoomUnbook.show();
	});

});
