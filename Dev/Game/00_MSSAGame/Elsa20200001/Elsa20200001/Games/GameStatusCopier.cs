using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Charlotte.Games
{
	/// <summary>
	/// プレイヤー・ステータス反映
	/// </summary>
	public static class GameStatusCopier
	{
		public static void マップ入場時()
		{
			// すべきこと：
			// -- ゲーム状態を Game.I.Status から各方面に展開・反映する。

			// 例：
			//Game.I.Player.HP = Game.I.Status.StartHP;
			//Game.I.Player.FacingLeft = Game.I.Status.StartFacingLeft;
			//Game.I.Player.武器 = Game.I.Status.Start_武器;
			// --

			Game.I.Player.HP = Game.I.Status.StartHP;
			Game.I.Player.FacingLeft = Game.I.Status.StartFacingLeft;
			Game.I.Player.武器 = Game.I.Status.Start_武器;
		}

		public static void マップ退場時()
		{
			// すべきこと：
			// -- 各方面に展開されているゲーム状態を Game.I.Status に反映・格納する。

			// 例：
			//Game.I.Status.StartHP = Game.I.Player.HP;
			//Game.I.Status.StartFacingLeft = Game.I.Player.FacingLeft;
			//Game.I.Status.Start_武器 = Game.I.Player.武器;
			// --

			Game.I.Status.StartHP = Game.I.Player.HP;
			Game.I.Status.StartFacingLeft = Game.I.Player.FacingLeft;
			Game.I.Status.Start_武器 = Game.I.Player.武器;
		}

		public static void セーブ時(GameStatus gameStatus)
		{
			// すべきこと：
			// -- 各方面に展開されているゲーム状態を gameStatus に反映・格納する。

			// 例：
			//gameStatus.StartHP = Game.I.Player.HP;
			//gameStatus.StartFacingLeft = Game.I.Player.FacingLeft;
			//gameStatus.Start_武器 = Game.I.Player.武器;
			// --

			gameStatus.StartHP = Game.I.Player.HP;
			gameStatus.StartFacingLeft = Game.I.Player.FacingLeft;
			gameStatus.Start_武器 = Game.I.Player.武器;
		}
	}
}
