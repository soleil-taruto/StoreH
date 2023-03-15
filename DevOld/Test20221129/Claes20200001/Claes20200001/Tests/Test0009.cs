using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Charlotte.Commons;

namespace Charlotte.Tests
{
	public class Test0009
	{
		public void Test01()
		{
			Test01_a(1, 5, 10);
			Test01_a(1, 15, 20);
			Test01_a(1, 25, 30);
		}

		private void Test01_a(int numerMin, int numerMax, int denom)
		{
			for (int numer = numerMin; numer <= numerMax; numer++)
			{
				Test01_b(numer, denom);
			}
		}

		private void Test01_b(int numer, int denom)
		{
			const int TEST_COUNT = 10000;
			int atari = 0;

			for (int testcnt = 0; testcnt < TEST_COUNT; testcnt++)
				if (Test01_c(numer, denom))
					atari++;

			Console.WriteLine(numer + " / " + denom + " ==> " + ((double)atari / TEST_COUNT).ToString("F9"));
		}

		private bool Test01_c(int numer, int denom)
		{
			bool[][] drums = new bool[][]
			{
				MakeRrum(numer, denom),
				MakeRrum(numer, denom),
				MakeRrum(numer, denom),
			};

			return
				(drums[0][0] && drums[1][0] && drums[2][0]) || // 上段
				(drums[0][1] && drums[1][1] && drums[2][1]) || // 中段
				(drums[0][2] && drums[1][2] && drums[2][2]) || // 下段
				(drums[0][0] && drums[1][1] && drums[2][2]) || // 斜め - 左上から右下
				(drums[0][2] && drums[1][1] && drums[2][0]);   // 斜め - 左下から右上
		}

		private bool[] MakeRrum(int numer, int denom)
		{
			bool[] drum = Enumerable.Repeat(true, numer).Concat(Enumerable.Repeat(false, denom - numer)).ToArray();
			SCommon.CRandom.Shuffle(drum);
			return drum;
		}
	}
}
