/*
	ゲーム・メイン
*/

// カメラ位置(整数)
var<D2Point_t> Camera = CreateD2Point(0.0, 0.0);

// ゲーム用タスク
var<TaskManager_t> GameTasks = CreateTaskManager();

var<int> @@_Credit = 1000;
var<int> @@_CreditDisp = @@_Credit;

function <void> AddGameCredit(<int> value)
{
	@@_Credit += value;
}

function* <generatorForTask> GameMain()
{
	FreezeInput();
	ClearAllActor();
	ClearAllTask(GameTasks);

	for (; ; )
	{
		yield* @@_TitleMain();
	}

	error(); // この関数は終了してはならない。
}

function* <generatorForTask> @@_TitleMain()
{
	FreezeInput();

	for (; ; )
	{
		if (GetMouseDown() == -1)
		{
			if (HoveredPicture == P_Lane01Button)
			{
				yield* @@_SlotMain(1);
			}
			else if (HoveredPicture == P_Lane02Button)
			{
				yield* @@_SlotMain(2);
			}
			else if (HoveredPicture == P_Lane03Button)
			{
				yield* @@_SlotMain(3);
			}
			else if (HoveredPicture == P_LaneXXButton)
			{
				yield* @@_SlotMain(4);
			}
		}

		// 背景
		{
			var<double> x = 600.0 + Math.sin(ProcFrame / 777.0) * 300.0;
			var<double> y = 600.0;

			Draw(P_Background, x, y, 1.0, 0.0, 1.0);

			SetColor("#00004080");
			PrintRect(0, 0, Screen_W, Screen_H);
		}

		SetColor("#ffffff");
		SetFSize(100);
		SetPrint(100, 200, 0);
		PrintLine("どのレーンへ行く？？");

		{
			var<double> x = 600.0;
			var<double> y = 400.0;
			var<double> yStep = 180.0;

			Draw(P_Lane01Button, x, y, 1.0, 0.0, 1.0);
			y += yStep;
			Draw(P_Lane02Button, x, y, 1.0, 0.0, 1.0);
			y += yStep;
			Draw(P_Lane03Button, x, y, 1.0, 0.0, 1.0);
			y += yStep;
			Draw(P_LaneXXButton, x, y, 1.0, 0.0, 1.0);
		}

		SetColor("#ffffffa0");
		SetFSize(32);
		SetPrint(10, Screen_H - 10, 0);
		PrintLine("Credit : " + ToThousandComma(@@_CreditDisp) + " / クレジット付与まで、あと " + GetAddGameCreditRem_MM() + ":" + GetAddGameCreditRem_SS());

		yield 1;
	}

	FreezeInput();
}

/*
	laneNo: 1 - 4
*/
function* <generatorForTask> @@_SlotMain(<int> laneNo)
{
	@@_LaneNo = laneNo;

	var<int[]> LANE_01_PIC_CNTS = [ 1, 2, 4, 8, 16, 24, 36, 54, 81 ];
	var<int[]> LANE_02_PIC_CNTS = [ 2, 3, 5, 7, 11, 13, 17, 19, 23 ];
	var<int[]> LANE_03_PIC_CNTS = [ 3, 4, 5, 6, 12, 13, 14, 15, 21 ];

	var<int[][]> picCntsLst;

	switch (laneNo)
	{
	case 1:
		picCntsLst = [ LANE_01_PIC_CNTS, LANE_01_PIC_CNTS, LANE_01_PIC_CNTS ];
		break;

	case 2:
		picCntsLst = [ LANE_02_PIC_CNTS, LANE_02_PIC_CNTS, LANE_02_PIC_CNTS ];
		break;

	case 3:
		picCntsLst = [ LANE_03_PIC_CNTS, LANE_03_PIC_CNTS, LANE_03_PIC_CNTS ];
		break;

	case 4:
		picCntsLst =
		[
			ChooseOne([ LANE_01_PIC_CNTS, LANE_02_PIC_CNTS, LANE_03_PIC_CNTS ]),
			ChooseOne([ LANE_01_PIC_CNTS, LANE_02_PIC_CNTS, LANE_03_PIC_CNTS ]),
			ChooseOne([ LANE_01_PIC_CNTS, LANE_02_PIC_CNTS, LANE_03_PIC_CNTS ]),
		];
		break;

	default:
		error();
	}

	if (
		picCntsLst.length != 3 ||
		picCntsLst[0].length != SLOT_PIC_NUM ||
		picCntsLst[1].length != SLOT_PIC_NUM ||
		picCntsLst[2].length != SLOT_PIC_NUM
		)
	{
		error();
	}

	var<int[][]> drums = [];

	for (var<int> c = 0; c < 3; c++)
	{
		var<int[]> drum = [];

		for (var<int> i = 0; i < SLOT_PIC_NUM; i++)
		{
			AddElements(drum, Repeat(i, picCntsLst[c][i]));
		}
		Shuffle(drum);
		drums.push(drum);
	}

	@@_Drums = drums;
	@@_DrumRots = [ 0.0, 0.0, 0.0 ];
	@@_Bets = [ 0, 0, 0, 0, 0 ];

	FreezeInput();

gameLoop:
	for (; ; )
	{
		for (; ; ) // Bet
		{
			{
				var<D2Point_t> mousePt = CreateD2Point(GetMouseX(), GetMouseY());
				var<int> mouseDown = GetMouseDown();

				for (var<int> c = 0; c < 5; c++)
				{
					if (!IsOut(mousePt, CreateD4Rect_LTRB(
						100,
						150 + c * 200,
						260,
						230 + c * 200), 0.0))
					{
						if (mouseDown == 1 || (60 <= mouseDown && mouseDown % 10 == 0))
						{
							@@_Bets[c] = Math.min(@@_Bets[c] + 1, 99);
						}
					}
				}

				if (mouseDown == -1)
				{
					if (!IsOut(mousePt, CreateD4Rect_LTRB(0, 0, 280, 80), 0.0)) // Press RESET
					{
						for (var<int> c = 0; c < 5; c++)
						{
							@@_Bets[c] = 0;
						}
					}

					if (!IsOut(mousePt, CreateD4Rect_LTRB(970, 0, Screen_W, 80), 0.0)) // Press EXIT
					{
						break gameLoop;
					}

					if (!IsOut(mousePt, CreateD4Rect_LTRB(0, 0, 280, 80), 0.0)) // Press AutoBet / START
					{
						// TODO
					}
				}
			}

			@@_DrawSlot();

			yield 1;
		}

		yield 1;
	}

	FreezeInput();
}

/*
	レーン番号
	値：1 ～ 4
*/
var<int> @@_LaneNo;

/*
	回転ドラム
	長さ：[3][絵柄の数] -- 各ドラムで絵柄の数が違うこともある。
	値：絵柄のindex (0 ～ (SLOT_PIC_NUM - 1))
*/
var<int[][]> @@_Drums;

/*
	回転ドラムの位置
	長さ：[3]
	値：ある絵柄から次の絵柄までを 1.0 とする。プラス方向で絵柄は上へ移動 , マイナス方向で絵柄は下へ移動
*/
var<double[]> @@_DrumRots;

/*
	投入したコイン数
	長さ：[5] -- 斜め(左上から右下) , 上段 , 中段 , 下段 , 斜め(左下から右上)
	値：0 ～
*/
var<int[]> @@_Bets;

function <void> @@_DrawSlot()
{
	if (108 < Math.abs(@@_Credit - @@_CreditDisp))
	{
		@@_CreditDisp = ToInt(Approach(@@_CreditDisp, @@_Credit, 0.99));
	}
	else if (@@_Credit < @@_CreditDisp)
	{
		@@_CreditDisp--;
	}
	else if (@@_Credit > @@_CreditDisp)
	{
		@@_CreditDisp++;
	}

	// ----

	SetColor("#ffffff");
	PrintRect(0, 0, Screen_W, Screen_H);

	for (var<int> c = 0; c < 3; c++)
	for (var<int> d = 0; d < 3; d++) // test test test
	{
		Draw(P_SlotPics[@@_Drums[c][d]], 500 + c * 250, 400 + d * 200, 1.0, 0.0, 1.0);
	}

	for (var<int> c = 0; c < 3; c++)
	{
		Draw(P_DrumShadow, 500 + c * 250, 600, 1.0, 0.0, 1.0);
	}

	Draw(P_SlotBackground, Screen_W / 2, Screen_H / 2, 1.0, 0.0, 1.0);

	SetColor("#ff8000");
	SetFSize(60);
	SetPrint(30, 80, 0);
	PrintLine("<RESET>");

	SetColor("#ff8000");
	SetFSize(60);
	SetPrint(930, 80, 0);
	PrintLine("<EXIT>");

	SetColor("#ff8000");
	SetFSize(60);
	SetPrint(30, 1160, 0);
	PrintLine(@@_IsBetted() ? "<START>" : "<AutoBet>");

	for (var<int> c = 0; c < 5; c++)
	{
		SetColor("#ffff00");
		SetFSize(90);
		SetPrint(80, 220 + c * 200, 0);
		PrintLine("[" + ZPad(@@_Bets[c], 2, "0") + "]");
	}

	for (var<int> c = 0; c < 3; c++)
	{
		SetColor("#00ffffa0");
		PrintCircle(500 + c * 250, 1050, 100);

		SetColor("#004040");
		SetFSize(50);
		SetPrint(435 + c * 250, 1070, 0);
		PrintLine("STOP");
	}

	SetColor("#80ffff");
	SetFSize(32);
	SetPrint(400, 32, 0);
	PrintLine("LANE NO." + @@_LaneNo);

	SetColor("#ffffff");
	SetFSize(60);
	SetPrint(400, 180, 0);
	PrintLine("CREDIT : " + ToThousandComma(@@_CreditDisp));

	SetColor("#a0a0a0");
	SetFSize(32);
	SetPrint(400, 230, 0);
	PrintLine("CREDIT 付与まで、あと " + GetAddGameCreditRem_MM() + ":" + GetAddGameCreditRem_SS());

	if (DEBUG)
	{
		SetColor("#ffffff");
		SetFSize(16);
		SetPrint(0, 16, 0);
		PrintLine(GetMouseX() + " " + GetMouseY());
	}

	@@_DrawBettedBar(0, 750, 600, Math.PI * 0.23);
	@@_DrawBettedBar(1, 750, 400, 0.0);
	@@_DrawBettedBar(2, 750, 600, 0.0);
	@@_DrawBettedBar(3, 750, 800, 0.0);
	@@_DrawBettedBar(4, 750, 600, Math.PI * -0.23);
}

function <void> @@_DrawBettedBar(<int> betIdx, x, y, rot)
{
	var<int> bet = @@_Bets[betIdx];

	if (bet == 0)
	{
		return;
	}

	var<boolean> nanameFlag = rot != 0.0;

	var<double> w = 850;
	var<double> h = 20;

	if (nanameFlag)
	{
		w *= 1.3;
	}

	SetColor("#ffff0050");
	PrintRectRot(x, y, w, h, rot);
}

function <boolean> @@_IsBetted()
{
	for (var<int> i = 0; i < 5; i++)
	{
		if (@@_Bets[i] != 0)
		{
			return true;
		}
	}
	return false;
}
