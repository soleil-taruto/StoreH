/*
	ゲーム・メイン
*/

// カメラ位置(整数)
var<D2Point_t> Camera = CreateD2Point(0.0, 0.0);

// ゲーム用タスク
var<TaskManager_t> GameTasks = CreateTaskManager();

var<int> @@_Credit = 1000;
var<int> @@_CreditDisp = @@_Credit;

function <void> @(UNQN)_EACH()
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
}

function <void> AddGameCredit(<int> value)
{
	@@_Credit += value;
}

function* <generatorForTask> GameMain()
{
	FreezeInput();
	ClearAllActor();
	ClearAllTask(GameTasks);

	yield* @@_TitleMain();

	error(); // この関数は終了してはならない。
}

function* <generatorForTask> @@_TitleMain()
{
	FreezeInput();

	for (; ; )
	{
		Play(M_Title);

		if (GetMouseDown() == -1)
		{
			if (HoveredPicture == P_Lane01Button)
			{
				Play(M_Lane_01);

				yield* @@_SlotMain(1);
			}
			else if (HoveredPicture == P_Lane02Button)
			{
				Play(M_Lane_02);

				yield* @@_SlotMain(2);
			}
			else if (HoveredPicture == P_Lane03Button)
			{
				Play(M_Lane_03);

				yield* @@_SlotMain(3);
			}
			else if (HoveredPicture == P_LaneXXButton)
			{
				Play(M_Lane_XX);

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
	SE(S_EnterLane);

	@@_LaneNo = laneNo;

	var<int[]> LANE_01_PIC_CNTS = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
	var<int[]> LANE_02_PIC_CNTS = [ 2, 3, 5, 7, 11, 13, 17, 1, 1 ];
	var<int[]> LANE_03_PIC_CNTS = [ 3, 4, 5, 6, 7, 8, 9, 10, 1 ];
	var<int[]> LANE_XX_PIC_CNTS =
	[
		GetRandRange(1, 20), GetRandRange(1, 20), GetRandRange(1, 20),
		GetRandRange(1, 20), GetRandRange(1, 20), GetRandRange(1, 20),
		GetRandRange(1, 20), GetRandRange(1, 20), GetRandRange(1, 20),
	];

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
		picCntsLst = [ LANE_XX_PIC_CNTS, LANE_XX_PIC_CNTS, LANE_XX_PIC_CNTS ];
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

	@@_ExtInfoPicCnts = picCntsLst[0];
	@@_Drums = drums;
	@@_DrumRots       = [ 0.0, 0.0, 0.0 ];
	@@_DrumSpeeds     = [ 0.0, 0.0, 0.0 ];
	@@_DrumStoppables = [ false, false, false ];
	@@_Bets           = [ 0, 0, 0, 0, 0 ];
//	@@_LastBets       = [ 5, 5, 5, 5, 5 ];

	// レーンを変えても維持する。
	if (!@@_LastBets)
	{
		@@_LastBets = [ 5, 5, 5, 5, 5 ];
	}

	FreezeInput();

gameLoop:
	for (; ; )
	{
	betLoop:
		for (; ; ) // Bet
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
					var<boolean> pressFlag; // ? 押下 or 連打
					var<boolean> pressSoundFlag;

					if (600 <= mouseDown)
					{
						pressFlag      = mouseDown %  2 == 0;
						pressSoundFlag = mouseDown % 10 == 0;
					}
					else if (300 <= mouseDown)
					{
						pressFlag      = mouseDown %  5 == 0;
						pressSoundFlag = mouseDown % 10 == 0;
					}
					else if (60 <= mouseDown)
					{
						pressFlag = mouseDown % 10 == 0;
						pressSoundFlag = pressFlag;
					}
					else
					{
						pressFlag = mouseDown == 1;
						pressSoundFlag = pressFlag;
					}

					if (1 <= @@_Credit && pressFlag)
					{
						if (@@_Bets[c] < 100) // ? 投入可能
						{
							if (pressSoundFlag)
							{
								SE(S_BetCoin);
							}

							@@_Bets[c]++;
							@@_Credit--;
						}
					}
				}
			}

			if (mouseDown == -1)
			{
				if (!IsOut(mousePt, CreateD4Rect_LTRB(0, 0, 280, 80), 0.0)) // Press RESET
				{
					SE(S_GetCoin);

					for (var<int> c = 0; c < 5; c++)
					{
						@@_Credit += @@_Bets[c];
						@@_Bets[c] = 0;
					}
				}

				if (!IsOut(mousePt, CreateD4Rect_LTRB(970, 0, Screen_W, 80), 0.0)) // Press EXIT
				{
					for (var<int> c = 0; c < 5; c++) // 払い戻し
					{
						@@_Credit += @@_Bets[c];
//						@@_Bets[c] = 0;
					}

					break gameLoop;
				}

				if (!IsOut(mousePt, CreateD4Rect_LTRB(0, Screen_H - 80, 280, Screen_H), 0.0)) // Press AutoBet / START
				{
					if (@@_IsBetted())
					{
						break betLoop;
					}
					else
					{
						SE(S_BetCoin);

						for (var<int> i = 0; i < 5; i++)
						{
							while (1 <= @@_Credit && @@_Bets[i] < @@_LastBets[i])
							{
								@@_Bets[i]++;
								@@_Credit--;
							}
						}
					}
				}
			}

			@@_DrawSlot();

			yield 1;
		}

		SE(S_RotStart);

		@@_DrumStoppables = [ true, true, true ];

	rotateDrumsLoop:
		for (; ; )
		{
			if (
				!@@_DrumSpeeds.some(v => MICRO < Math.abs(v)) &&
				!@@_DrumStoppables.some(v => v)
				)
			{
				break rotateDrumsLoop;
			}

			// 加速用定数
			var<double> DRUM_MAX_SPEED = -0.5;
			var<double[]> DRUM_ACCELE_RATES = [ 0.94, 0.95, 0.96 ];

			// 減速用定数
			var<double> DRUM_MIN_SPEED = 0.015;
			var<double> DRUM_DECELE_RATE = 0.965;

			for (var<int> c = 0; c < 3; c++)
			{
				if (GetMouseDown() == 1) // ? ストップボタン押下 -- マウスを押した瞬間で判定する。
				{
					var<double> stopBtn_x = 500 + c * 250;
					var<double> stopBtn_y = 1050;
					var<double> stopBtn_r = 100;

					if (GetDistanceLessThan(GetMouseX() - stopBtn_x, GetMouseY() - stopBtn_y, stopBtn_r))
					{
						if (@@_DrumStoppables[c])
						{
							SE(S_RotStop);

							@@_DrumStoppables[c] = false;
						}
					}
				}

				if (@@_DrumStoppables[c]) // ? 停止前 -> 加速
				{
					@@_DrumSpeeds[c] = Approach(@@_DrumSpeeds[c], DRUM_MAX_SPEED, DRUM_ACCELE_RATES[c]);
				}
				else // ? 停止後 -> 減速
				{
					if (Math.abs(@@_DrumSpeeds[c]) < DRUM_MIN_SPEED)
					{
						var<int> nearestPos = ToInt(@@_DrumRots[c]);

						if (Math.abs(@@_DrumRots[c] - nearestPos) < DRUM_MIN_SPEED)
						{
							@@_DrumRots[c] = nearestPos;
							@@_DrumSpeeds[c] = 0.0;
						}
					}
					else
					{
						@@_DrumSpeeds[c] = Approach(@@_DrumSpeeds[c], 0.0, DRUM_DECELE_RATE);
					}
				}

				@@_DrumRots[c] += @@_DrumSpeeds[c];
			}

			@@_DrawSlot();

			yield 1;
		}

		var<int> prizeCredit = @@_GetPrizeCredit();

		if (1 <= prizeCredit) // 当たり_結果エフェクト
		{
			SE(S_Atari);

			for (var<int> c = 0; c < 5; c++)
			{
				AddEffectDelay(c * 10 + 20, () => SE(S_GetCoin));
			}

			AddEffect(Effect_Atari_01());
			AddEffectDelay(30, () => AddEffect(Effect_Atari_02()));
			AddEffectDelay(60, () => AddEffect(Effect_Atari_03(prizeCredit)));
		}
		else // ハズレ_結果エフェクト
		{
			SE(S_Hazure);
		}

		@@_Credit += prizeCredit;

		@@_LastBets = @@_Bets;
		@@_Bets = [ 0, 0, 0, 0, 0 ];
	}

	SE(S_LeaveLane);

	FreezeInput();
}

/*
	補足情報
	ドラムの絵柄の個数リスト
*/
var<int[]> @@_ExtInfoPicCnts;

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
	回転ドラムの速度
	長さ：[3]
	値：フレーム毎に @@_DrumRots に加算する値
*/
var<double[]> @@_DrumSpeeds;

/*
	ドラムを停止できるか
	長さ：[3]
*/
var<boolean[]> @@_DrumStoppables;

/*
	投入したコイン数
	長さ：[5] -- 斜め(左上から右下) , 上段 , 中段 , 下段 , 斜め(左下から右上)
	値：0 ～
*/
var<int[]> @@_Bets;

/*
	前回投入したコイン数
	長さ：@@_Bets と同じ
	値：0 ～
*/
var<int[]> @@_LastBets;

function <void> @@_DrawSlot()
{
	SetColor("#ffffff");
	PrintRect(0, 0, Screen_W, Screen_H);

	for (var<int> c = 0; c < 3; c++)
	{
		// 回転位置正規化
		{
			while (@@_DrumRots[c] < -@@_Drums[c].length)
			{
				@@_DrumRots[c] += @@_Drums[c].length;
			}
			while (0.0 < @@_DrumRots[c])
			{
				@@_DrumRots[c] -= @@_Drums[c].length;
			}
		}

		for (var<int> i = 0; i < @@_Drums[c].length + 3; i++)
		{
			var<double> rot = @@_DrumRots[c] + i;

			if (-1.0 < rot && rot < 3.0)
			{
				var<double> x = 500.0 + c   * 250.0;
				var<double> y = 400.0 + rot * 200.0;

				Draw(P_SlotPics[@@_Drums[c][i % @@_Drums[c].length]], x, y, 1.0, 0.0, 1.0);
			}
		}
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
		var<boolean> stoppable = @@_DrumStoppables[c];

		SetColor(stoppable ? "#00ffffc0" : "#40a0a0a0");
		PrintCircle(500 + c * 250, 1050, 100);

		SetColor("#004040");
		SetFSize(50);
		SetPrint(435 + c * 250, 1070, 0);
		PrintLine("STOP");
	}

	var<string> dispLaneNo = "" + @@_LaneNo;

	if (dispLaneNo == "4")
	{
		dispLaneNo = "X";
	}
	var<string> dispLaneNoExt = "(" + JoinString(@@_ExtInfoPicCnts, ", ") + ")";

	SetColor("#80ffff");
	SetFSize(32);
	SetPrint(400, 32, 0);
	PrintLine("LANE NO." + dispLaneNo);

	SetColor("#408080");
	SetFSize(24);
	SetPrint(400, 64, 0);
	PrintLine(dispLaneNoExt);

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
	return @@_Bets.some(v => v != 0);
}

function <int> @@_GetPrizeCredit()
{
	var<int> ret = 0;

	for (var<int> c = 0; c < 5; c++)
	{
		ret += @@_Bets[c] * @@_GetPrize(c);
	}
	return ret;
}

function <int> @@_GetPrize(<int> betIdx)
{
	switch (betIdx)
	{
	case 0: return @@_GetPrize_YPosLst([ 0, 1, 2 ]);
	case 1: return @@_GetPrize_YPosLst([ 0, 0, 0 ]);
	case 2: return @@_GetPrize_YPosLst([ 1, 1, 1 ]);
	case 3: return @@_GetPrize_YPosLst([ 2, 2, 2 ]);
	case 4: return @@_GetPrize_YPosLst([ 2, 1, 0 ]);

	default:
		error();
	}
}

function <int> @@_GetPrize_YPosLst(<int[]> yPosLst)
{
	var<int[]> picIdxs = [];

	for (var<int> c = 0; c < 3; c++)
	{
		var<int> nearestPos = ToInt(@@_DrumRots[c]);
		var<int> i = (yPosLst[c] - nearestPos) % @@_Drums[c].length;
		var<int> picIdx = @@_Drums[c][i];

		picIdxs.push(picIdx);
	}

	if (
		picIdxs[0] == picIdxs[1] &&
		picIdxs[0] == picIdxs[2]
		)
	{
		return SLOT_PIC_PRIZES[picIdxs[0]];
	}

	return 0;
}
