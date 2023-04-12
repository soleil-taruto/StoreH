using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Drawing;
using Charlotte.Commons;

namespace Charlotte.Tests
{
	public class Test0001
	{
		public void Test01()
		{
			string RES = @"

// b6288.exe out

{b6288-3lGTo5KaiLMFU0ItpFOM0C-SfNNacBogZZCOf381F2cZG-bzQSJs0QNkPiR8tguZTTyI-AQTyDAE5Yj91Fy697zCxB0}

// b36c.exe out

{B36C-SQBV373P7KS66WDUEZ10501SE-4V984W29BZMGAM9ZP5Z2728XC-WQK5JFOKJXDMOG0AB1GD7BY45-2HQ1A0X0H45PC8K78VM2S1WT5}

// b26110.exe out

{AZCX-KSWGPDWPJKSSFWJGQROJVH-OHBPIFRMGJOEQYQPRNAOLC-WDMPILBTNOFHKAFJJBHORT-YQWUCBZRVCANWEWEKVBQXO-KLETHMKOMVZWDVWKKOJBBH}

// b16128.exe out

{bf80-e2d9e9836375c7911aec4e852d5792a2-c660cb37fc842e3429faa40ebcbed21a-f7766521c27f2786940bc157450a39e6-67fd10a6ef2f714d28ecffb4c090ad8d}

// b10155.exe out

{10155-8696980145457105474932955886039-6941488193702782155615889314647-1361334401314324066745955577033-4911080008869406765204672128624-2594416570826786648489078492303}

// ----

// MakeID512.exe out

{b6288-IUa4qXwbaJvrNfhLtEhpuF-OEz5xKKKnrPe137FE5nzYn-IeI1glXykaOz2Lw8aD8i1z-B47KQ9FTOAifpXjTzhhYhK}

{B36C-KL6A8OZ31DQZW3TXP7TAPMCWN-8L5UI7FGUF8KTWTTODH3KT1X9-0GED8SYMQ0QSDOG7ERAX30IUR-69F7W1FUKZNU7B4S3GEU3ZMDX}

{AZCX-BRQWKJCBFFYOEPCXECAUQS-OJUBNAZQLLPXRGOQMEWFKS-BBELJFDORALGESNTJAWQHE-TXPUVCPFQNZAZIBLGMGDPT-LLFJOIKBEEHOSSZYJODCBG}

{bf80-278b39101d7d73464604d651393bf45b-91f63e297bfbbcc505ce0b7c7a3e49ff-48f0112b6bdf985c933d713ea867d007-abea4e6d324dfd14fab7f6c1ec4d1b1f}

{10155-0672705688082215402069946819260-9727484739614754832869237380774-7222360212497208609359275807176-7685090735476380746124239950186-3451972546349843730149454540578}

";

			string[] lines = SCommon.TextToLines(RES)
				.Where(v => v != "" && !v.StartsWith("//"))
				.ToArray();

			foreach (string line in lines)
			{
				string format = new string(line.Select(v => "{-}".Contains(v) ? v : '#').ToArray());

				int[][] chrCnts = format.Select(v => new int[] { (int)v, 1 }).ToArray();

				for (int index = chrCnts.Length - 2; 0 <= index; index--)
				{
					if (chrCnts[index][0] == chrCnts[index + 1][0])
					{
						chrCnts[index][1] += chrCnts[index + 1][1];
						chrCnts[index + 1] = null;
					}
				}
				chrCnts = chrCnts.Where(v => v != null).ToArray();
				string[] strChrCnts = chrCnts.Select(v => string.Format("{0:x2} --> {1}", v[0], v[1])).ToArray();

				Console.WriteLine(line);
				Console.WriteLine(format);
				//foreach (string strChrCnt in strChrCnts) Console.WriteLine(strChrCnt);
				Console.WriteLine(string.Join(", ", chrCnts.Select(v => v[1].ToString("D2"))));
			}
		}
	}
}
