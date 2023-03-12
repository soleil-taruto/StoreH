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

var<Sound_t> M_Title   = @@_Load(RESOURCE_MusMus__MusMus_BGM_124_wc4g__0_39690_4410_4410__mp3);
var<Sound_t> M_Lane_01 = @@_Load(RESOURCE_MusMus__MusMus_BGM_141_wc4g__0_39690_4410_4410__mp3);
var<Sound_t> M_Lane_02 = @@_Load(RESOURCE_MusMus__MusMus_BGM_147_wc4g__0_39690_4410_4410__mp3);
var<Sound_t> M_Lane_03 = @@_Load(RESOURCE_MusMus__MusMus_BGM_156_wc4g__0_39690_4410_4410__mp3);
var<Sound_t> M_Lane_XX = @@_Load(RESOURCE_MusMus__MusMus_BGM_081_wc4g__6350400_39690_4410_4410__mp3);
