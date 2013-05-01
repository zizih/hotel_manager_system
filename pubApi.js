var settings = require('./settings')
	,fs = require('fs')
	,PubApi = require('./pubApi')

format = function(date, style){
	var y = date.getFullYear();    
	var M = "0" + (date.getMonth() + 1);    
	M = M.substring(M.length - 2);   
	var d = "0" + date.getDate();   
	d = d.substring(d.length - 2);    
	var h = "0" + date.getHours();    
	h = h.substring(h.length - 2);    
	var m = "0" + date.getMinutes();    
	m = m.substring(m.length - 2);   
	var s = "0" + date.getSeconds();    
	s = s.substring(s.length - 2);   
	return style.replace('yyyy', y).replace('MM', M).replace('dd', d).replace('hh', h).replace('mm', m).replace('ss', s);   
};

exports.getDate = function(){
	return format(new Date(),settings.dateStyle);
};