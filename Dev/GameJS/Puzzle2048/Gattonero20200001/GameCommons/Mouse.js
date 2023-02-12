/*
	マウス・画面タッチ制御
*/

var<boolean> @@_Down = false;
var<double> @@_X = 0;
var<double> @@_Y = 0;

function <void> @@_ScreenPosToCanvasPos()
{
	var canvasRect = Canvas.getBoundingClientRect();

	@@_X -= canvasRect.left;
	@@_Y -= canvasRect.top;
	@@_X *= Screen_W / canvasRect.width;
	@@_Y *= Screen_H / canvasRect.height;
}

function <void> @@_TouchStart(<double> x, <double> y)
{
	@@_Down = true;
	@@_X = x;
	@@_Y = y;

	@@_ScreenPosToCanvasPos();
}

function <void> @@_TouchMove(<double> x, <double> y)
{
	@@_X = x;
	@@_Y = y;

	@@_ScreenPosToCanvasPos();
}

function <void> @@_TouchEnd(<double> x, <double> y)
{
	@@_Down = false;
	@@_X = x;
	@@_Y = y;

	@@_ScreenPosToCanvasPos();
}

function <Action event> @@_GetEvPointer(<Action double double> touch)
{
	var<Action event> ret = function(event)
	{
		touch(event.pageX, event.pageY);
	};

	return ret;
}

function <Action event> @@_GetEvTouch(<Action double double> touch)
{
	var<Action event> ret = function(event)
	{
		touch(event.changedTouches[0].pageX, event.changedTouches[0].pageY);
	};

	return ret;
}

function <Action event> @@_GetEvMouse(<Action double double> touch)
{
	var<Action event> ret = function(event)
	{
		touch(event.x, event.y);
	};

	return ret;
}

function <void> @(UNQN)_INIT()
{
	CanvasBox.onpointerdown  = @@_GetEvPointer(@@_TouchStart);
	CanvasBox.onpointermove  = @@_GetEvPointer(@@_TouchMove);
	CanvasBox.onpointerup    = @@_GetEvPointer(@@_TouchEnd);
	CanvasBox.onpointerleave = @@_GetEvPointer(@@_TouchEnd);
}

var<int> @@_DownCount;

function <void> @(UNQN)_EACH()
{
	if (1 <= @@_DownCount) // ? 前回_押下
	{
		if (@@_Down)
		{
			@@_DownCount++;
		}
		else
		{
			@@_DownCount = -1;
		}
	}
	else // ? 前回_押下していない。
	{
		if (@@_Down)
		{
			@@_DownCount = 1;
		}
		else
		{
			@@_DownCount = 0;
		}
	}
}

/*
	マウスボタンの押下(スクリーン・タッチ)状態を得る。
	戻り値：
		-1  == 離した。(前回は押下, 今回は押下していない)
		0   == 押していない。(前回も今回も押下していない)
		1   == 押した。(前回は押下していない, 今回は押下)
		2～ == 押している。値は押下し続けている長さ(フレーム数)
*/
function <int> GetMouseDown()
{
	return @@_DownCount;
}

/*
	マウスボタンの押下(スクリーン・タッチ)状態をクリアする。
*/
function <void> ClearMouseDown()
{
	@@_DownCount = 0;
}

/*
	マウスカーソルの位置を返す。X-座標
*/
function <double> GetMouseX()
{
	return @@_X;
}

/*
	マウスカーソルの位置を返す。Y-座標
*/
function <double> GetMouseY()
{
	return @@_Y;
}
