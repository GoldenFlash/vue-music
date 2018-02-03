export var musicFormate = function(data){
	var musicArry=[];
	data.forEach((item)=>{
		var o = {
			name:item.name,
			id:item.id,
			singer:item.artists[0].name,
			singerId:item.artists[0].id,
			picUrl:item.album.picUrl,
		};
		musicArry.push(o)
	});
	return musicArry
}