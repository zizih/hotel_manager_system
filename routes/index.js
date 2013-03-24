
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { 
  	title: 'Hotel System',
  	rooms: [
  		{num:1001, ifuse:false},
  		{num:34, ifuse:true}
  	]});
};

exports.add = function(req,res){
	console.log(req.body);
}