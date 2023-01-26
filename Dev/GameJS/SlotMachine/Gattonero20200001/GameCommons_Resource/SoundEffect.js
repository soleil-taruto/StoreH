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

var S_Atari     = @@_Load(RESOURCE_小森平__powerup04_mp3);
var S_Hazure    = @@_Load(RESOURCE_小森平__cat_like1a_mp3);
var S_BetCoin   = @@_Load(RESOURCE_小森平__coin03_mp3);
var S_GetCoin   = @@_Load(RESOURCE_小森平__coin07_mp3);
var S_EnterLane = @@_Load(RESOURCE_小森平__jump06_mp3);
var S_LeaveLane = @@_Load(RESOURCE_小森平__jump07_mp3);
var S_RotStart  = @@_Load(RESOURCE_小森平__jump01_mp3);
var S_RotStop   = @@_Load(RESOURCE_小森平__jump02_mp3);
