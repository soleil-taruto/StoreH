using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Charlotte.Utilities;
using Charlotte.Commons;

namespace Charlotte.Tests
{
	public class Test0007
	{
		public void Test01()
		{
			const int DENOM_MAX = 100;

			using (CsvFileWriter writer = new CsvFileWriter(SCommon.NextOutputPath() + ".csv"))
			{
				writer.WriteCell("denom - numer");

				for (int numer = 1; numer <= DENOM_MAX; numer++)
					writer.WriteCell("" + numer);

				writer.EndRow();
				writer.WriteRow(new string[] { "" + 1 });
				writer.WriteRow(new string[] { "" + 2 });

				for (int denom = 3; denom <= DENOM_MAX; denom++)
				{
					writer.WriteCell("" + denom);

					for (int numer = 1; numer <= denom; numer++)
					{
						writer.WriteCell(GetWinRate(numer, denom).ToString("F6"));
					}
					writer.EndRow();
				}
			}
		}

		private double GetWinRate(int numer, int denom)
		{
			const int TEST_COUNT = 1000000;
			int wincnt = 0;

			for (int count = 0; count < TEST_COUNT; count++)
			{
				if (WinTest(numer, denom))
				{
					wincnt++;
				}
			}
			double ret = (double)wincnt / TEST_COUNT;

			ProcMain.WriteLog(numer + " / " + denom + " ==> " + ret);

			return ret;
		}

		private bool WinTest(int numer, int denom)
		{
			bool[][] drums = new bool[][]
			{
				Enumerable.Repeat(true, numer).Concat(Enumerable.Repeat(false, denom - numer)).ToArray(),
				Enumerable.Repeat(true, numer).Concat(Enumerable.Repeat(false, denom - numer)).ToArray(),
				Enumerable.Repeat(true, numer).Concat(Enumerable.Repeat(false, denom - numer)).ToArray(),
			};

			SCommon.CRandom.Shuffle(drums[0]);
			SCommon.CRandom.Shuffle(drums[1]);
			SCommon.CRandom.Shuffle(drums[2]);

			int[] rots = new int[]
			{
				SCommon.CRandom.GetInt(denom),
				SCommon.CRandom.GetInt(denom),
				SCommon.CRandom.GetInt(denom),
			};

			return
				IsWin(drums, rots, 0, 1, 2) ||
				IsWin(drums, rots, 0, 0, 0) ||
				IsWin(drums, rots, 1, 1, 1) ||
				IsWin(drums, rots, 2, 2, 2) ||
				IsWin(drums, rots, 2, 1, 0);
		}

		private bool IsWin(bool[][] drums, int[] rots, int y1, int y2, int y3)
		{
			return
				drums[0][(rots[0] + y1) % drums[0].Length] &&
				drums[1][(rots[1] + y2) % drums[1].Length] &&
				drums[2][(rots[2] + y3) % drums[2].Length];
		}
	}
}
