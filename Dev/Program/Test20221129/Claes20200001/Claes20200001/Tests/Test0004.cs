using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Charlotte.Commons;
using Charlotte.Utilities;

namespace Charlotte.Tests
{
	public class Test0004
	{
		public void Test01()
		{
			const int DEST_W = 180;
			const int DEST_H = 180;
			const int MARGIN_LTRB = 10;

			Canvas canvas = Canvas.LoadFromFile(@"C:\Dev\GameJS\SlotMachine\res\春一番のフリー素材工房\_orig\nc226455.png");

			int[] X_BDRS = new int[] { 0, 750, canvas.W };
			int[] Y_BDRS = new int[] { 0, 600, 1200, 2000, canvas.H };

			for (int xi = 1; xi < X_BDRS.Length; xi++)
			{
				for (int yi = 1; yi < Y_BDRS.Length; yi++)
				{
					Canvas img = canvas.GetSubImage(I4Rect.LTRB(X_BDRS[xi - 1], Y_BDRS[yi - 1], X_BDRS[xi], Y_BDRS[yi]));

					img = img.GetSubImage(img.GetRect((dot, x, y) => dot.A != 0));
					img = img.Expand(DEST_W, DEST_H);
					img = img.PutMargin(MARGIN_LTRB, MARGIN_LTRB, MARGIN_LTRB, MARGIN_LTRB, new I4Color(0, 0, 0, 0));

#if true
					ShiftColorOutput(img, (dot, x, y) => new I4Color(dot.R, dot.G, dot.B, dot.A));
					ShiftColorOutput(img, (dot, x, y) => new I4Color(dot.G, dot.B, dot.R, dot.A));
					ShiftColorOutput(img, (dot, x, y) => new I4Color(dot.B, dot.R, dot.G, dot.A));
#else
					ShiftColorOutput(img, (dot, x, y) => new I4Color(dot.R, dot.G, dot.B, dot.A));
					ShiftColorOutput(img, (dot, x, y) => new I4Color(dot.R, dot.B, dot.G, dot.A));
					ShiftColorOutput(img, (dot, x, y) => new I4Color(dot.G, dot.R, dot.B, dot.A));
					ShiftColorOutput(img, (dot, x, y) => new I4Color(dot.G, dot.B, dot.R, dot.A));
					ShiftColorOutput(img, (dot, x, y) => new I4Color(dot.B, dot.R, dot.G, dot.A));
					ShiftColorOutput(img, (dot, x, y) => new I4Color(dot.B, dot.G, dot.R, dot.A));
#endif
				}
			}
		}

		private void ShiftColorOutput(Canvas img, Func<I4Color, int, int, I4Color> filter)
		{
			img = img.GetClone();
			img.FilterAllDot(filter);
			img.Save(SCommon.NextOutputPath() + ".png");
		}
	}
}
