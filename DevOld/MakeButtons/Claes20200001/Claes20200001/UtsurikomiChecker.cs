using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using Charlotte.Utilities;
using Charlotte.Commons;

namespace Charlotte
{
	public class UtsurikomiChecker
	{
		public static void CheckDir(string dir)
		{
			foreach (string file in Directory.GetFiles(dir))
			{
				string ext = Path.GetExtension(file).ToLower();

				if (
					ext == ".bmp" ||
					ext == ".gif" ||
					ext == ".jpg" ||
					ext == ".jpeg" ||
					ext == ".png"
					)
				{
					CheckFile(file);
				}
			}
		}

		private static void CheckFile(string file)
		{
			for (int c = 0; c <= 6; c++)
			{
				int minLv = (c + 0) * 32 - 0;
				int maxLv = (c + 2) * 32 - 1;

				Canvas canvas = Canvas.LoadFromFile(file);

				canvas.FilterAllDot((dot, x, y) =>
				{
					dot.R = ExpandLv(dot.R, minLv, maxLv);
					dot.G = ExpandLv(dot.G, minLv, maxLv);
					dot.B = ExpandLv(dot.B, minLv, maxLv);

					return dot;
				});

				canvas.Save(SCommon.NextOutputPath() + ".png");
			}
		}

		private static int ExpandLv(int lv, int minLv, int maxLv)
		{
			if (lv < minLv)
				return 0;

			if (maxLv < lv)
				return 255;

			return SCommon.ToInt((lv - minLv) * 255.0 / (maxLv - minLv));
		}
	}
}
