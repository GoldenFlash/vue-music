var fmFormate = function(data){
	var musicArry=[];
	data.forEach((item)=>{
		var o = {
			name:item.name,
			id:item.id,
			singer:item.artists[0].name,
			singerId:item.artists[0].id,
			albumName:item.album.name,
			picUrl:item.album.picUrl,
		};
		musicArry.push(o)
	});
	return musicArry
}
var newSongsFormate =function(data){
	var musicArry=[];
	data.forEach((item)=>{
		var o = {
			name:item.song.name,
			id:item.song.id,
			singer:item.song.artists[0].name,
			singerId:item.song.artists[0].id,
			picUrl:item.song.album.picUrl,
			albumName:item.song.album.name,
		};
		musicArry.push(o)
	});
	return musicArry
}
var listDetailFormate =function(data){
	var musicArry=[];
	data.forEach((item)=>{
		var o = {
			name:item.name,
			id:item.id,
			singer:item.ar[0].name,
			singerId:item.ar[0].id,
			picUrl:item.al.picUrl,
			albumName:item.al.name,
		};
		musicArry.push(o)
	});
	return musicArry
}
var rankingDetailFormate =function(data){
	var musicArry=[];
	data.forEach((item)=>{
		
		var o = {
			name:item.name,
			id:item.id,
			singer:item.ar[0].name,
			singerId:item.ar[0].id,
			picUrl:item.al.picUrl,
			albumName:item.al.name,
		};
		musicArry.push(o)
	});
	return musicArry
}
var searchResultFormate =function(data){
	var musicArry=[];
	data.forEach((item)=>{
		
		var o = {
			name:item.name,
			id:item.id,
			singer:item.artists[0].name,
			singerId:item.artists[0].id,
			// picUrl:item.al.picUrl,
			albumName:item.album.name,
		};
		musicArry.push(o)
	});
	return musicArry
}
export{fmFormate,newSongsFormate,listDetailFormate,rankingDetailFormate,searchResultFormate}