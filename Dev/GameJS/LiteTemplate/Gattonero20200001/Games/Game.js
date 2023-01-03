/*
	ゲーム・メイン
*/

function* <generatorForTask> GameMain()
{
	// 音楽を再生する。
	Play(M_MidnightStreet);

	// 無限ループ
	for (; ; )
	{
		// カード位置(X座標)
		var<double> cardX = Screen_W + 300;

		// カード位置(Y座標)
		var<double> cardY = Screen_H / 2;

		// カードが画面の中心に来るまでループ // 0.5 は許容誤差
		while (Screen_W / 2 + 0.5 < cardX)
		{
			// カードを画面の中心に近づける。
			cardX = (cardX - Screen_W / 2) * 0.9 + Screen_W / 2;

			// 背景をグレーで塗りつぶす。
			Context.fillStyle = "#a0a0a0";
			Context.fillRect(0, 0, Screen_W, Screen_H);

			// カードを描画
			Draw(P_TrumpFrame, cardX, cardY, 1.0, 0.0, 1.0);
			Draw(P_TrumpBack,  cardX, cardY, 1.0, 0.0, 1.0);

			// 次のフレームを待つ
			yield 1;
		}

		// カード位置矯正
		cardX = Screen_W / 2;

		for (; ; )
		{
			// カードをクリックしたか。
			if (
				GetMouseDown() == -1 && // マウスボタンの解放を以てクリックと判定する。
				cardX - GetPicture_W(P_TrumpFrame) / 2 < GetMouseX() && GetMouseX() < cardX + GetPicture_W(P_TrumpFrame) / 2 &&
				cardY - GetPicture_H(P_TrumpFrame) / 2 < GetMouseY() && GetMouseY() < cardY + GetPicture_H(P_TrumpFrame) / 2
				)
			{
				break;
			}

			// 背景をグレーで塗りつぶす。
			Context.fillStyle = "#a0a0a0";
			Context.fillRect(0, 0, Screen_W, Screen_H);

			// カードを描画
			Draw(P_TrumpFrame, cardX, cardY, 1.0, 0.0, 1.0);
			Draw(P_TrumpBack,  cardX, cardY, 1.0, 0.0, 1.0);

			// メッセージを表示
			Context.fillStyle = "#000000";
			Context.font = "42px 'sans-serif'";
			Context.fillText("カードをクリックするとカードが回転します！！", 150, 1200);

			// 次のフレームを待つ
			yield 1;
		}

		// 効果音を鳴らす。
		SE(S_Coin04);

		// 回転・前半
		for (var<double> rad = 0.0; rad < Math.PI / 2; rad += 0.05)
		{
			// 背景をグレーで塗りつぶす。
			Context.fillStyle = "#a0a0a0";
			Context.fillRect(0, 0, Screen_W, Screen_H);

			// カードを描画
			Draw2(P_TrumpFrame, cardX, cardY, 1.0, 0.0, Math.cos(rad), 1.0);
			Draw2(P_TrumpBack,  cardX, cardY, 1.0, 0.0, Math.cos(rad), 1.0);

			// 次のフレームを待つ
			yield 1;
		}

		// 回転・後半
		for (var<double> rad = Math.PI / 2 - 0.1; 0.0 < rad; rad -= 0.05)
		{
			// 背景をグレーで塗りつぶす。
			Context.fillStyle = "#a0a0a0";
			Context.fillRect(0, 0, Screen_W, Screen_H);

			// カードを描画
			Draw2(P_TrumpFrame, cardX, cardY, 1.0, 0.0, Math.cos(rad), 1.0);
			Draw2(P_TrumpJoker, cardX, cardY, 1.0, 0.0, Math.cos(rad), 1.0);

			// 次のフレームを待つ
			yield 1;
		}

		// カード速度
		var<double> cardXAdd = -0.5;

		// カードが退場するまでループ
		while (-300.0 < cardX)
		{
			// カード加速
			cardXAdd *= 1.1;

			// カード移動
			cardX += cardXAdd;

			// 背景をグレーで塗りつぶす。
			Context.fillStyle = "#a0a0a0";
			Context.fillRect(0, 0, Screen_W, Screen_H);

			// カードを描画
			Draw(P_TrumpFrame, cardX, cardY, 1.0, 0.0, 1.0);
			Draw(P_TrumpJoker, cardX, cardY, 1.0, 0.0, 1.0);

			// 次のフレームを待つ
			yield 1;
		}
	}
}
