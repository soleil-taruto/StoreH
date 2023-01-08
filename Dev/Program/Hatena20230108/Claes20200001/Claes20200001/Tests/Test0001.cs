using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Drawing;
using Charlotte.Commons;
using Charlotte.Utilities;
using System.IO;

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

		public void Test02()
		{
			PrintXMLTree(@"C:\temp\FG-GML-533935-ALL-20221001\FG-GML-533935-AdmArea-20221001-0001.xml");
			PrintXMLTree(@"C:\temp\FG-GML-533935-ALL-20221001\FG-GML-533935-BldL-20221001-0001.xml");
			PrintXMLTree(@"C:\temp\FG-GML-533935-ALL-20221001\FG-GML-533935-RailCL-20221001-0001.xml");
		}

		private void PrintXMLTree(string file)
		{
			HashSet<string> xmlPaths = new HashSet<string>();
			XMLNode root = XMLNode.LoadFromFile(file);
			root.Search((xmlPath, node) => xmlPaths.Add(xmlPath));

			Console.WriteLine(file);

			foreach (string xmlPath in xmlPaths.OrderBy(SCommon.Comp))
				Console.WriteLine(xmlPath);

			Console.WriteLine();
		}

		public void Test03()
		{
			ExportPosList(
				@"C:\temp\FG-GML-533935-ALL-20221001\FG-GML-533935-AdmArea-20221001-0001.xml",
				@"C:\temp\Area.txt",
				"Dataset/AdmArea/area/Surface/patches/PolygonPatch/exterior/Ring/curveMember/Curve/segments/LineStringSegment/posList"
				);
			ExportPosList(
				@"C:\temp\FG-GML-533935-ALL-20221001\FG-GML-533935-BldL-20221001-0001.xml",
				@"C:\temp\Building.txt",
				"Dataset/BldL/loc/Curve/segments/LineStringSegment/posList"
				);
			ExportPosList(
				@"C:\temp\FG-GML-533935-ALL-20221001\FG-GML-533935-RailCL-20221001-0001.xml",
				@"C:\temp\Rail.txt",
				"Dataset/RailCL/loc/Curve/segments/LineStringSegment/posList"
				);
		}

		private void ExportPosList(string mapFile, string polyFile, string polyXmlPath)
		{
			XMLNode root = XMLNode.LoadFromFile(mapFile);

			using (StreamWriter writer = new StreamWriter(polyFile, false, Encoding.ASCII))
			{
				root.Search((xmlPath, node) =>
				{
					if (xmlPath == polyXmlPath)
					{
						writer.WriteLine(node.Value);
						writer.WriteLine(); // 空行
					}
				});
			}
		}
	}
}
