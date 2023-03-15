using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Charlotte.Commons;

namespace Charlotte.Tests
{
	public class Test0010
	{
		public void Test01()
		{
			const int TEST_COUNT = 1000000;
			const int GAME_MAX = 30000;

			int winCnt = 0;
			int winGameNum = 0;
			int loseCnt = 0;
			int loseWinVal = 0;

			for (int testCnt = 0; testCnt < TEST_COUNT; testCnt++)
			{
				if (testCnt % (TEST_COUNT / 100) == 0) Console.WriteLine("testCnt: " + testCnt); // cout

				int win = 0;
				int game = 0;

				while (game < GAME_MAX)
				{
					//win += SCommon.CRandom.GetSign();
					//win += SCommon.CRandom.GetReal1() < 0.5 ? 1 : -1;
					//win += SCommon.CRandom.GetReal1() < 0.501 ? 1 : -1;
					//win += SCommon.CRandom.GetReal1() < 0.51 ? 1 : -1;
					win += SCommon.CRandom.GetReal1() < 0.6 ? 1 : -1;
					game++;

					if (win == 1)
						break;
				}
				if (win == 1)
				{
					winCnt++;
					winGameNum += game;
				}
				else
				{
					loseCnt++;
					loseWinVal += win;
				}
			}

			Console.WriteLine("TEST_COUNT: " + TEST_COUNT);
			Console.WriteLine("GAME_MAX: " + GAME_MAX);

			Console.WriteLine("winCnt: " + winCnt);
			Console.WriteLine("winCnt_R: " + (winCnt * 1.0 / TEST_COUNT));
			Console.WriteLine("winGameNum: " + winGameNum);
			Console.WriteLine("winGameNum_K: " + (winGameNum * 1.0 / winCnt));
			Console.WriteLine("loseCnt: " + loseCnt);
			Console.WriteLine("loseCnt_R: " + (loseCnt * 1.0 / TEST_COUNT));
			Console.WriteLine("loseWinVal: " + loseWinVal);
			Console.WriteLine("loseWinVal_K: " + (loseWinVal * 1.0 / loseCnt));
		}
	}
}
