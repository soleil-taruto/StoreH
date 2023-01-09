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
		yield* @@_RotateMain();
		yield* @@_ResultMain();
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
				yield* @@_LaneEntered(1);
			}
			else if (HoveredPicture == P_Lane02Button)
			{
				yield* @@_LaneEntered(2);
			}
			else if (HoveredPicture == P_Lane03Button)
			{
				yield* @@_LaneEntered(3);
			}
			else if (HoveredPicture == P_LaneXXButton)
			{
				yield* @@_LaneEntered(4);
			}
		}

		// 背景
		{
			var<double> x = 600.0 + Math.sin(ProcFrame / 1333.0) * 300.0;
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

		yield 1;
	}

	FreezeInput();
}

/*
	laneNo: 1 - 4
*/
function* <generatorForTask> @@_LaneEntered(<int> laneNo)
{
	FreezeInput();

	var<int[]> LANE_01_PIC_CNTS = [ 2, 3, 5, 7, 11, 13, 17, 19, 23 ];
	var<int[]> LANE_02_PIC_CNTS = [ 1, 2, 4, 8, 16, 24, 36, 54, 81 ];
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



	error(); // TODO



	FreezeInput();
}

function <void> @@_DrawSlotWall()
{
	error(); // TODO
}

function <void> @@_DrawSlotFront()
{
	error(); // TODO
}

function* <generatorForTask> @@_RotateMain()
{
	error(); // TODO
}

function* <generatorForTask> @@_ResultMain()
{
	error(); // TODO
}
