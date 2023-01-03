/*
	音楽
*/

function <Sound_t> @@_Load(<string> url)
{
	return LoadSound(url);
}

// ここから各種音楽

// 慣習的プリフィクス == M_

var<Sound_t> M_MidnightStreet = @@_Load(RESOURCE_DovaSyndrome__Midnight_Street_mp3);
