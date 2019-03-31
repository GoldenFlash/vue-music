export var formateLyric = function(lyric) {
  var lyricArry = lyric.split("\n");
  
  var reg = /\[\d{2}:\d{2}.\d+]/;

  if (lyricArry.length != 0) {
    var newlyric = lyricArry.map((item,index) => {
      var time = item.match(reg);
     
      if (time) {
      	var timeArr = time[0].split(':');
      	
      	time = parseInt(timeArr[0].slice(1))*60 + parseFloat(timeArr[1]);
      	
      	var text = item.replace(reg, '');
      	var obj ={'time':time,'text':text};
        return obj;
      }else if(index ===lyricArry.length-1){
      	return {'time':600,'text':item}
      }else{
      	return {'time':0,'text':item};
      }

    });
  }

  return newlyric;
}
