/*
	画像
*/

function <Picture_t> @@_Load(<string> url)
{
	return LoadPicture(url);
}

// ここから各種画像

// プリフィクス
// P_ ... 画像

var<Picture_t> P_Dummy = @@_Load(RESOURCE_General__Dummy_png);
var<Picture_t> P_WhiteBox = @@_Load(RESOURCE_General__WhiteBox_png);
var<Picture_t> P_WhiteCircle = @@_Load(RESOURCE_General__WhiteCircle_png);

// ★ここまで固定 -- 持ち回り_共通 -- サンプルとしてキープ

var<Picture_t> P_GameStartButton = @@_Load(RESOURCE_Picture__GameStartButton_png);

var<Picture_t> P_Background = @@_Load(RESOURCE_ぱくたそ__Wall_png);
var<Picture_t> P_SlotBackground = @@_Load(RESOURCE_Picture__Game__IMG_20160000_003879_B_png);
//var<Picture_t> P_SlotBackground = @@_Load(RESOURCE_Picture__Game__IMG_20160000_003893_B_png);

var<Picture_t> P_Bar     = @@_Load(RESOURCE_春一番のフリー素材工房__Bar_png);
var<Picture_t> P_Bell    = @@_Load(RESOURCE_春一番のフリー素材工房__Bell_png);
var<Picture_t> P_BellC   = @@_Load(RESOURCE_春一番のフリー素材工房__BellC_png);
var<Picture_t> P_BellP   = @@_Load(RESOURCE_春一番のフリー素材工房__BellP_png);
var<Picture_t> P_Cherry  = @@_Load(RESOURCE_春一番のフリー素材工房__Cherry_png);
var<Picture_t> P_CherryB = @@_Load(RESOURCE_春一番のフリー素材工房__CherryB_png);
var<Picture_t> P_CherryG = @@_Load(RESOURCE_春一番のフリー素材工房__CherryG_png);
var<Picture_t> P_Replay  = @@_Load(RESOURCE_春一番のフリー素材工房__Replay_png);
var<Picture_t> P_ReplayP = @@_Load(RESOURCE_春一番のフリー素材工房__ReplayP_png);
var<Picture_t> P_ReplayY = @@_Load(RESOURCE_春一番のフリー素材工房__ReplayY_png);
var<Picture_t> P_Seven   = @@_Load(RESOURCE_春一番のフリー素材工房__Seven_png);
var<Picture_t> P_SevenB  = @@_Load(RESOURCE_春一番のフリー素材工房__SevenB_png);
var<Picture_t> P_SevenG  = @@_Load(RESOURCE_春一番のフリー素材工房__SevenG_png);
var<Picture_t> P_Seven2  = @@_Load(RESOURCE_春一番のフリー素材工房__Seven2_png);
var<Picture_t> P_Seven2G = @@_Load(RESOURCE_春一番のフリー素材工房__Seven2G_png);
var<Picture_t> P_Seven2P = @@_Load(RESOURCE_春一番のフリー素材工房__Seven2P_png);
var<Picture_t> P_Suica   = @@_Load(RESOURCE_春一番のフリー素材工房__Suica_png);
var<Picture_t> P_SuicaB  = @@_Load(RESOURCE_春一番のフリー素材工房__SuicaB_png);
var<Picture_t> P_SuicaG  = @@_Load(RESOURCE_春一番のフリー素材工房__SuicaG_png);

/*
	スロットの絵柄リスト
	長さ == SLOT_PIC_NUM
	倍率の高い順
*/
var<Picture_t[]> P_SlotPics =
[
	P_Seven2,
	P_Seven,
	P_Bar,
	P_SuicaB,
	P_Suica,
	P_BellC,
	P_Bell,
	P_CherryG,
	P_Cherry,
];

function <void> @(UNQN)_INIT()
{
	if (P_SlotPics.length != SLOT_PIC_NUM)
	{
		error();
	}
}

var<Picture_t> P_DrumShadow = @@_Load(RESOURCE_Picture__Game__DrumShadow_png);

var<Picture_t> P_Lane01Button = @@_Load(RESOURCE_Picture__Game__Lane01Button_png);
var<Picture_t> P_Lane02Button = @@_Load(RESOURCE_Picture__Game__Lane02Button_png);
var<Picture_t> P_Lane03Button = @@_Load(RESOURCE_Picture__Game__Lane03Button_png);
var<Picture_t> P_LaneXXButton = @@_Load(RESOURCE_Picture__Game__LaneXXButton_png);
