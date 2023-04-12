﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.IO;
using System.Drawing;
using System.Windows.Forms;
using DxLibDLL;
using Charlotte.Commons;
using Charlotte.Drawings;
using Charlotte.GUICommons;
using Charlotte.GameSettings;

namespace Charlotte.GameCommons
{
	public static class GameProcMain
	{
		private static Action GameStarted;

		public static void GameMain(Form mainForm, Action userGameMain)
		{
			DD.RunOnUIThread = GetRunOnUIThread(mainForm);

			Thread th = new Thread(() =>
			{
				bool aliving = true;

				GameStarted = () =>
				{
					mainForm.BeginInvoke((MethodInvoker)delegate
					{
						if (aliving)
							mainForm.Visible = false;
					});

					userGameMain();
				};

				Main2();

				mainForm.BeginInvoke((MethodInvoker)delegate
				{
					aliving = false;
					mainForm.Close();
				});
			});

			th.Start();
		}

		/// <summary>
		/// メインスレッドで実行される処理を登録する処理を返す。
		/// 戻り値の処理は以下を満たす。
		/// -- スレッドセーフ
		/// -- 登録された処理は登録された順で実行される。
		/// </summary>
		/// <param name="mainForm">メインフォーム</param>
		/// <returns>処理</returns>
		private static Action<Action> GetRunOnUIThread(Form mainForm)
		{
			Queue<Action> q = new Queue<Action>();
			object SYNCROOT = new object();

			return routine =>
			{
				lock (SYNCROOT)
				{
					q.Enqueue(routine);

					mainForm.BeginInvoke((MethodInvoker)delegate
					{
						Action firstRoutine;

						lock (SYNCROOT)
						{
							firstRoutine = q.Dequeue();
						}

						firstRoutine();
					});
				}
			};
		}

		private static void Main2()
		{
			try
			{
				Main3();
			}
			catch (DU.CoffeeBreak)
			{
				// noop
			}
			catch (Exception e)
			{
				ProcMain.WriteLog(e);
			}
			finally
			{
				while (1 <= DD.Finalizers.Count)
				{
					try
					{
						SCommon.UnaddElement(DD.Finalizers)();
					}
					catch (Exception ex)
					{
						ProcMain.WriteLog(ex);
					}
				}
			}
		}

		private static void Main3()
		{
			LibbonDialog.Th = new Thread(LibbonDialog.MainTh);
			LibbonDialog.Th.Start();
			try
			{
				Main4();
			}
			finally
			{
				LibbonDialog.AliveFlag = false;
				LibbonDialog.Th.Join();
			}
		}

		private static void Main4()
		{
			string logSaveDir;
			string logFile;

			if (ProcMain.DEBUG)
			{
				logSaveDir = @"C:\temp";
				logFile = @"C:\temp\Game.log";
			}
			else
			{
				logSaveDir = new WorkingDir().GetPath(".");
				logFile = Path.Combine(ProcMain.SelfDir, "Game.log");
			}

			File.WriteAllBytes(logFile, SCommon.EMPTY_BYTES);

			ProcMain.WriteLog = message =>
			{
				File.AppendAllText(logFile, "[" + DateTime.Now + "] " + message + "\r\n", Encoding.UTF8);
			};

			Keyboard.Initialize();

			string saveDataFile = Path.Combine(ProcMain.SelfDir, "SaveData.dat");

			if (File.Exists(saveDataFile))
				GameSetting.Deserialize(File.ReadAllText(saveDataFile, Encoding.ASCII));
			else
				GameSetting.Initialize();

			DD.Save = () =>
			{
				File.WriteAllText(saveDataFile, GameSetting.Serialize(), Encoding.ASCII);
			};

			DD.Finalizers.Add(DD.Save);

			DD.MainWindowTitle =
				Path.GetFileNameWithoutExtension(ProcMain.SelfFile)
				+ " / "
				+ GUIProcMain.BuiltDateTime.ToString("yyyy-MM-dd-HH-mm-ss");

			DD.TargetMonitor = DU.GetTargetMonitor_Boot();
			DD.SetLibbon("ゲームを起動しています...");

			Icon icon;

			using (MemoryStream mem = new MemoryStream(DD.GetResFileData(@"General\app.ico")))
			{
				icon = new Icon(mem);
			}

			// DXLib 初期化 ここから

			DX.SetApplicationLogSaveDirectory(logSaveDir);
			DX.SetOutApplicationLogValidFlag(1); // ログを出力/1:する/0:しない
			DX.SetAlwaysRunFlag(1); // 非アクティブ時に/1:動く/0:止まる
			DX.SetMainWindowText(DD.MainWindowTitle);
			DX.SetGraphMode(GameConfig.ScreenSize.W, GameConfig.ScreenSize.H, 32); // 幅, 高さ, ビット数(16 or 32)
			DX.ChangeWindowMode(1); // 1:ウィンドウ/0:フルスクリーン
			DX.SetWindowIconHandle(icon.Handle);

			if (DX.DxLib_Init() != 0) // ? 失敗
				throw new Exception("DxLib_Init failed");

			DD.Finalizers.Add(() =>
			{
				if (DX.DxLib_End() != 0) // ? 失敗
					throw new Exception("DxLib_End failed");
			});

			DX.SetDrawScreen(DX.DX_SCREEN_BACK);
			DX.SetDrawMode(DX.DX_DRAWMODE_ANISOTROPIC);
			DX.SetWindowSizeChangeEnableFlag(0); // ウィンドウの右下をドラッグでサイズ変更/1:する/0:しない
			DX.SetMouseDispFlag(1); // マウスカーソルを表示/1:する/0:しない

			// DXLib 初期化 ここまで

			Pad.Initialize();

			if (GameSetting.FullScreen)
				DD.RealScreenSize = new I2Size(DD.TargetMonitor.W, DD.TargetMonitor.H);
			else
				DD.RealScreenSize = GameSetting.UserScreenSize;

			DD.MainScreenDrawRect = new I4Rect(0, 0, DD.RealScreenSize.W, DD.RealScreenSize.H);
			DD.MainScreen = new SubScreen(GameConfig.ScreenSize.W, GameConfig.ScreenSize.H);
			DD.LastMainScreen = new SubScreen(GameConfig.ScreenSize.W, GameConfig.ScreenSize.H);
			DD.KeptMainScreen = new SubScreen(GameConfig.ScreenSize.W, GameConfig.ScreenSize.H);

			foreach (string resPath in GameConfig.FontFileResPaths)
				DU.AddFontFile(resPath);

			SetRealScreenSize(DD.RealScreenSize.W, DD.RealScreenSize.H);

			DD.SetLibbon(null);

			GameStarted();
		}

		/// <summary>
		/// ゲーム画面サイズを変更する。
		/// 以下を経由して呼び出すこと。
		/// -- DD.SetRealScreenSize()
		/// </summary>
		/// <param name="w">幅</param>
		/// <param name="h">高さ</param>
		/// <param name="onBoot">リボンを表示するか</param>
		public static void SetRealScreenSize(int w, int h)
		{
			DX.SetDrawScreen(DX.DX_SCREEN_BACK);

			Picture.UnloadAll();
			SubScreen.UnloadAll();
			DU.UnloadAllFontHandle();
			//Music.UnloadAll(); // アンロード不要
			//SoundEffect.UnloadAll(); // アンロード不要

			DX.SetGraphMode(w, h, 32);
			DX.SetDrawScreen(DX.DX_SCREEN_BACK);
			DX.SetDrawMode(DX.DX_DRAWMODE_ANISOTROPIC);
			DX.SetWindowSizeChangeEnableFlag(0);
			DX.SetMouseDispFlag(1);

			int l = DD.TargetMonitor.L + (DD.TargetMonitor.W - w) / 2;
			int t = DD.TargetMonitor.T + (DD.TargetMonitor.H - h) / 2;

			DU.SetMainWindowPosition(l, t);

			DD.MainScreenDrawRect = DD.EnlargeFullInterior(
				GameConfig.ScreenSize.ToD2Size(),
				new I4Rect(0, 0, w, h).ToD4Rect()
				)
				.ToI4Rect();

			DD.RealScreenSize.W = w;
			DD.RealScreenSize.H = h;
		}
	}
}