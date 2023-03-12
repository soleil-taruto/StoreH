/*
	ゲーム用メインモジュール
*/

// メイン処理
var<generatorForTask> @@_AppMain;

// 描画先Canvasタグ
var Canvas;

// 描画先Canvasを格納するDivタグ
var CanvasBox;

/*
	ゲームを実行する。

	appMain: メイン処理
*/
function <void> ProcMain(<generatorForTask> appMain)
{
	@@_AppMain = appMain;

	/*
	memo:
		Canvas.width, Canvas.height == スクリーン・サイズ
		Canvas.style.width, Canvas.style.height == 表示上のサイズ
	*/

	Canvas = document.createElement("canvas");
	Canvas.width  = Screen_W;
	Canvas.height = Screen_H;
	Canvas.style.width  = "calc(min(" + Canvas_W + "px, 100%))";
//	Canvas.style.height = Canvas_H + "px";
	Canvas.style.height = "";

	CanvasBox = document.getElementById("Gattonero20200001-CanvasBox");
	CanvasBox.style.width  = "calc(min(" + Canvas_W + "px, 100%))";
//	CanvasBox.style.height = Canvas_H + "px";
	CanvasBox.style.height = "";
	CanvasBox.innerHTML = "";
	CanvasBox.appendChild(Canvas);

	Mouse_INIT();

	@@_Anime();
}

// リフレッシュレート高過ぎ検知用時間
var<int> @@_HzChaserTime = 0;

// プロセスフレームカウンタ
var<int> ProcFrame = 0;

// 描画先コンテキスト(描画先スクリーン)
var Context = null;

/*
	ゲームのフレーム処理
*/
function <void> @@_Anime()
{
	var<int> currTime = new Date().getTime();

	@@_HzChaserTime = Math.max(@@_HzChaserTime, currTime - 100);
	@@_HzChaserTime = Math.min(@@_HzChaserTime, currTime + 100);

	if (@@_HzChaserTime < currTime)
	{
		Context = Canvas.getContext("2d");
		@@_AppMain.next();

		Mouse_EACH();
		Music_EACH();
		SoundEffect_EACH();

		Context = null;
		@@_HzChaserTime += 16;
		ProcFrame++;
	}
	requestAnimationFrame(@@_Anime);
}
