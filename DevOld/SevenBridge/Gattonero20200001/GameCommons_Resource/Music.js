/*
	音楽
*/

function <Sound_t> @@_Load(<string> url)
{
	return LoadSound(url);
}

// ここから各種音楽

// プリフィクス
// M_ ... 音楽

//var<Sound_t> M_無音 = @@_Load(RESOURCE_General__muon_mp3); // デカいのでロードしない。

// ★ここまで固定 -- 持ち回り_共通 -- サンプルとしてキープ

var<Sound_t> M_Title     = @@_Load(RESOURCE_魔王魂__魔王魂_8bit29_wc4g__0_39690_4410_4410__mp3);
var<Sound_t> M_Battle_01 = @@_Load(RESOURCE_魔王魂__魔王魂_8bit28_wc4g__0_39690_4410_4410__mp3);
var<Sound_t> M_Battle_02 = @@_Load(RESOURCE_魔王魂__魔王魂_8bit27_wc4g__0_39690_4410_4410__mp3);
var<Sound_t> M_Battle_03 = @@_Load(RESOURCE_魔王魂__魔王魂_8bit26_wc4g__13009500_39690_4410_4410__mp3);
