function propPage(){
	var dangqianyeshu = $("#dangqianyeshu").val();
	if(dangqianyeshu != 1){
		renzheng(dangqianyeshu-1);
	}
}

function nextPage(){
	var dangqianyeshu = $("#dangqianyeshu").val();
	var rows = $("#zongyeshu").val();
	if(dangqianyeshu != rows){
		renzheng(Number(dangqianyeshu)+Number(1));
	}
}

function firstPage(){
	var dangqianyeshu = $("#dangqianyeshu").val();
	if(dangqianyeshu != 1){
		renzheng(1);
	}
}

function lastPage(){
	var dangqianyeshu = $("#dangqianyeshu").val();
	var rows = $("#zongyeshu").val();
	if(dangqianyeshu != rows){
		renzheng(rows);
	}
}

function renzheng(pageNum){
	var data = sessionStorage.getItem('data');
	if(data.onclick == 1){
		tiaozhuan(pageNum);
	}else{
		reloadList(pageNum)
	}
}