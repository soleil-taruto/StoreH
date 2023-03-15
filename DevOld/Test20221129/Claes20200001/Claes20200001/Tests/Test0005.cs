using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Charlotte.Commons;
using Charlotte.Utilities;
using System.IO;

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

				a /= 2;
				//a /= 3;

				Console.WriteLine(y + " ==> " + a);

				for (int x = 0; x < W; x++)
				{
					canvas[x, y] = new I4Color(0, 0, 0, a);
				}
			}
			canvas.Save(SCommon.NextOutputPath() + ".png");
		}

		public void Test02()
		{
			Test02_a(@"C:\temp\IMG_20160000_003879_B.png");
			Test02_a(@"C:\temp\IMG_20160000_003893_B.png");
		}

		private void Test02_a(string file)
		{
			Canvas canvas = Canvas.LoadFromFile(file);

			for (int c = 0; c < 3; c++)
			{
				canvas.FilterRect(new I4Rect(400 + c * 250, 300, 200, 600), (dot, x, y) => { dot.A = 0; return dot; });
			}

			//canvas.FilterAllDot((dot, x, y) => { dot.R = SCommon.ToInt(255 - (255 - dot.R) * 0.8); return dot; });

			canvas.Save(Path.Combine(SCommon.GetOutputDir(), Path.GetFileNameWithoutExtension(file) + ".png"));
		}
	}
}
