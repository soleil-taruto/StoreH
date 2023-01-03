using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using Charlotte.Commons;

namespace Charlotte.Tests
{
	public class Test0003
	{
		public void Test01()
		{
			string[] lines = File.ReadAllLines(@"C:\temp\Paiza.txt", SCommon.ENCODING_SJIS);
			List<string> dest = new List<string>();

			foreach (string f_line in lines)
			{
				string line = f_line;
				int i;

				for (i = 0; i < line.Length; i++)
					if (line[i] != ' ')
						break;

				if (1 <= i && i % 4 == 0)
					line = new string('\t', i / 4) + line.Substring(i);

				dest.Add(line);
			}
			File.WriteAllLines(SCommon.NextOutputPath() + ".txt", dest, SCommon.ENCODING_SJIS);
		}
	}
}
