using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Charlotte.Commons;

namespace Charlotte
{
	public static class Common
	{
		public static void ToConsoleTable(IList<string> lines)
		{
			for (; ; )
			{
				int m = -1;

				foreach (string line in lines)
				{
					int p = line.IndexOf('*');

					if (p != -1)
						m = Math.Max(m, GetConsoleLength(line.Substring(0, p)));
				}
				if (m == -1)
					break;

				m += 2; // 列と列の間の空白分

				for (int index = 0; index < lines.Count; index++)
				{
					int p = lines[index].IndexOf('*');

					if (p != -1)
						lines[index] = lines[index].Substring(0, p)
							+ new string(Enumerable.Repeat(' ', m - GetConsoleLength(lines[index].Substring(0, p))).ToArray())
							+ lines[index].Substring(p + 1);
				}
			}
			for (int index = 0; index < lines.Count; index++)
				if (lines[index] == "----")
					lines[index] = new string(Enumerable.Repeat('-', GetConsoleLength(lines[0])).ToArray());
		}

		private static int GetConsoleLength(string str)
		{
			return SCommon.ENCODING_SJIS.GetByteCount(str);
		}
	}
}
