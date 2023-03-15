using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Drawing;
using System.IO;
using Charlotte.Commons;
using Charlotte.Utilities;

namespace Charlotte.Tests
{
	public class Test0001
	{
		public void Test01()
		{
			foreach (string file in Directory.GetFiles(@"C:\Dev", "*.cs", SearchOption.AllDirectories).Where(v => !v.EndsWith(".Designer.cs")))
			{
				string[] lines = File.ReadAllLines(file, Encoding.UTF8);

				foreach (string line in lines)
				{
					if (line != "" && line[0] == ' ')
					{
						Console.WriteLine(file);
						break;
					}
				}
			}
		}

		public void Test02()
		{
			foreach (string file in Directory.GetFiles(
				//@"C:\home\HPGame\Sword\Thumbs"
				//@"C:\home\HPGame\Shield\Thumbs"
				@"C:\home\HPGame\Soleil\Thumbs"
				))
			{
				Canvas canvas = Canvas.LoadFromFile(file);

				int w = canvas.W;
				int h = canvas.H;

				Canvas mask = new Canvas(w - 20, h - 20);

				mask.Fill(new I4Color(0, 0, 0, 255));
				mask.DrawString("BETA", w * 3, "Impact", FontStyle.Bold, new I3Color(255, 255, 255), new I4Rect(10, 10, w - 40, h - 40), 12);
				mask.FilterAllDot((dot, x, y) => { dot.A = 64; return dot; });

				canvas.DrawImage(mask, 10, 10, true);

				canvas.Save(Path.Combine(SCommon.GetOutputDir(), Path.GetFileName(file)));
			}
		}
	}
}
