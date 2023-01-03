/*
	GohoubiMain
*/

function* <generatorForTask> GohoubiMain()
{
	FreezeInput();

	for (; ; )
	{
		if (GetMouseDown() == -1)
		{
			break;
		}

		SetColor("#808000");
		PrintRect(0, 0, Screen_W, Screen_H);

		SetColor("#ffff00");
		SetFSize(60);
		SetPrint(100, 200, 150);

		PrintLine("★★★ クリア画面 ★★★");
		PrintLine("(試作版につき未実装)");
		PrintLine("画面をタップして下さい。");
		PrintLine("最初の画面に戻ります。");

		yield 1;
	}
	FreezeInput();
}
