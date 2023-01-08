using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Drawing;
using Charlotte.Commons;
using Charlotte.Utilities;

namespace Charlotte.Tests
{
	public class Test0001
	{
		public void Test01()
		{
			LoadXMLTest(@"C:\temp\FG-GML-533935-ALL-20221001\FG-GML-533935-AdmArea-20221001-0001.xml");
			LoadXMLTest(@"C:\temp\FG-GML-533935-ALL-20221001\FG-GML-533935-BldL-20221001-0001.xml");
			LoadXMLTest(@"C:\temp\FG-GML-533935-ALL-20221001\FG-GML-533935-RailCL-20221001-0001.xml");
		}

		private List<XMLNode> LoadedXMLs = new List<XMLNode>();

		private void LoadXMLTest(string file)
		{
			Console.WriteLine("Load " + file);
			DateTime stTm = DateTime.Now;
			LoadedXMLs.Add(XMLNode.LoadFromFile(file));
			DateTime edTm = DateTime.Now;
			Console.WriteLine("OK " + (edTm - stTm).TotalSeconds.ToString("F3") + "s");
		}
	}
}
