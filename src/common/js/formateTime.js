export var formateTime = function(time){
	var second = parseInt(time)%60;
	if(second<10){
		second = '0'+second;
	}
	var minutes = Math.floor(parseInt(time)/60);
	if(minutes<10){
		minutes = '0'+minutes;
	}
	time = `${minutes}:${second}`;
	return time;
};