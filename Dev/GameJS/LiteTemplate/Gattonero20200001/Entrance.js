/*
	入り口
*/

function* <generatorForTask> EntranceMain()
{
	var<int> button_w = GetPicture_W(P_GameStartButton);
	var<int> button_h = GetPicture_H(P_GameStartButton);
	var<int> button_l = Math.trunc((Screen_W - button_w) / 2.0);
	var<int> button_t = Math.trunc((Screen_H - button_h) / 2.0);

	ClearMouseDown();

	for (; ; )
	{
		// マウスクリック
		if (
			GetMouseDown() == -1 &&
			button_l < GetMouseX() && GetMouseX() < button_l + button_w &&
			button_t < GetMouseY() && GetMouseY() < button_t + button_h
			)
		{
			break;
		}

		Context.fillStyle = "#000000";
		Context.fillRect(0, 0, Screen_W, Screen_H);
		Context.fillStyle = "#ffffff";
		Draw(P_GameStartButton, Screen_W / 2.0, Screen_H / 2.0, 1.0, 0.0, 1.0);

		yield 1;
	}

	ClearMouseDown();

	yield* GameMain();
}
