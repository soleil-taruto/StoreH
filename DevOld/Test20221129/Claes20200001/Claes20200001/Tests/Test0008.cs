using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Drawing;
using Charlotte.Commons;
using Charlotte.Utilities;

namespace Charlotte.Tests
{
	public class Test0008
	{
		public void Test01()
		{
			Canvas canvas = new Canvas(260, 200);

			/*
			canvas.Gradation(
				dot => true,
				new I4Color(200, 200, 100, 255),
				new I4Color(100, 200, 100, 255),
				new I4Color(100, 100, 200, 255),
				new I4Color(200, 100, 100, 255)
				);
			 * */
			canvas.Gradation(
				dot => true,
				new I4Color(255, 255, 0, 255),
				new I4Color(0, 255, 0, 255),
				new I4Color(0, 0, 255, 255),
				new I4Color(255, 0, 0, 255)
				);

			{
				const int MARGIN = 10;

				Canvas textCvs = new Canvas(canvas.W - MARGIN * 2, canvas.H - MARGIN * 2);

				textCvs.Fill(new I4Color(0, 0, 0, 0));

				textCvs.DrawString(
					"DUMMY",
					//"Dummy",
					600,
					"Impact",
					FontStyle.Bold,
					//FontStyle.Regular,
					new I3Color(255, 255, 255),
					//new I3Color(0, 0, 0),
					new I4Rect(0, 0, textCvs.W, textCvs.H),
					13
					);

				textCvs.FilterAllDot((dot, x, y) => { dot.A /= 5; return dot; });

				canvas.DrawImage(textCvs, MARGIN, MARGIN, true);
			}

			canvas.Save(SCommon.NextOutputPath() + ".png");
		}

		public void Test02()
		{
			Canvas canvas = Canvas.LoadFromFile(@"C:\home\Instagram\Instagram\IMG_20160000_004071.jpg");

			canvas = canvas.Expand(200, 200);

			{
				const int MARGIN = 10;

				Canvas textCvs = new Canvas(canvas.W - MARGIN * 2, canvas.H - MARGIN * 2);

				textCvs.Fill(new I4Color(0, 0, 0, 0));

				textCvs.DrawString(
					"Dummy",
					600,
					"Impact",
					FontStyle.Bold,
					new I3Color(0, 0, 0),
					new I4Rect(0, 0, textCvs.W, textCvs.H),
					13
					);

				textCvs.FilterAllDot((dot, x, y) => { dot.A /= 2; return dot; });

				canvas.DrawImage(textCvs, MARGIN, MARGIN, true);
			}

			canvas.Save(SCommon.NextOutputPath() + ".png");
		}
	}
}
