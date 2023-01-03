using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Charlotte.Commons;
using Charlotte.Utilities;

namespace Charlotte.Tests
{
	public class Test0005
	{
		public void Test01()
		{
			const int W = 200;
			const int H = 600;

			Canvas canvas = new Canvas(W, H);

			for (int y = 0; y < H; y++)
			{
				double yRate = (double)(y - H / 2) / (H / 2);
				double alphaRate = Math.Sqrt(1.0 - yRate * yRate);
				int a = SCommon.ToInt(255 - 255 * alphaRate);

				a /= 3;

				Console.WriteLine(y + " ==> " + a);

				for (int x = 0; x < W; x++)
				{
					canvas[x, y] = new I4Color(0, 0, 0, a);
				}
			}
			canvas.Save(SCommon.NextOutputPath() + ".png");
		}
	}
}
