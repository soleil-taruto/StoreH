using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using Charlotte.Commons;

namespace Charlotte.Tests
{
	public class Test0002
	{
		private List<string> FoundFiles = new List<string>();

		public void Test01()
		{
			Test01_a(@"C:\Factory", file => Path.GetExtension(file).ToLower() == ".c", SCommon.ENCODING_SJIS);
			Test01_a(@"C:\Factory", file => Path.GetExtension(file).ToLower() == ".h", SCommon.ENCODING_SJIS);
			Test01_a(@"C:\Dev", file => Path.GetExtension(file).ToLower() == ".cs" && !file.ToLower().EndsWith(".designer.cs"), Encoding.UTF8);

			// ====

			foreach (string file in FoundFiles.Distinct())
				Console.WriteLine(file);
		}

		private void Test01_a(string rootDir, Predicate<string> fileMatch, Encoding encoding)
		{
			string[] files = Directory.GetFiles(rootDir, "*", SearchOption.AllDirectories)
				.Where(v => fileMatch(v))
				.ToArray();

			foreach (string file in files)
			{
				string[] lines = File.ReadAllLines(file, encoding);

				for (int index = 1; index + 1 < lines.Length; index++)
				{
					string trLine_01 = lines[index - 1].Trim();
					string trLine_02 = lines[index].Trim();
					string trLine_03 = lines[index + 1].Trim();

					if (trLine_02.StartsWith("else"))
					{
						int c = 0;

						if (trLine_01.StartsWith("}")) c++;
						if (trLine_03.StartsWith("{")) c++;

						if (c == 1)
						{
							FoundFiles.Add(file);
						}
					}
				}

				foreach (string line in lines)
					if (line != "" && line[line.Length - 1] <= ' ')
						FoundFiles.Add(file);
			}
		}
	}
}
