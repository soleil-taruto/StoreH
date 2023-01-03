/*
	効果音
*/

function <SE_t> @@_Load(<string> url)
{
	return LoadSE(url);
}

// ここから各種効果音

// プリフィクス
// S_ ... 効果音

//var<SE_t> S_無音 = @@_Load(RESOURCE_General__muon_mp3); // デカいのでロードしない。

// ★ここまで固定 -- 持ち回り_共通 -- サンプルとしてキープ

var S_Start   = @@_Load(RESOURCE_小森平__coin05_mp3);
var S_YouWin  = @@_Load(RESOURCE_小森平__crrect_answer3_mp3);
var S_YouLose = @@_Load(RESOURCE_小森平__powerdown07_mp3);
var S_Pong    = @@_Load(RESOURCE_小森平__crrect_answer1_mp3);
var S_Chow    = @@_Load(RESOURCE_小森平__Budda_small_bell_mp3);
var S_Kong    = @@_Load(RESOURCE_小森平__Budda_large_bell_mp3);
