/*
	画像
*/

function <Picture_t> @@_Load(<string> url)
{
	return LoadPicture(url);
}

// ここから各種画像

// 慣習的プリフィクス == P_

var<Picture_t> P_GameStartButton = @@_Load(RESOURCE_Picture__GameStartButton_png);

var<Picture_t> P_TrumpFrame = @@_Load(RESOURCE_Trump__Frame_png);
var<Picture_t> P_TrumpBack  = @@_Load(RESOURCE_Trump__Back01_png);
var<Picture_t> P_TrumpJoker = @@_Load(RESOURCE_Trump__Joker_png);
