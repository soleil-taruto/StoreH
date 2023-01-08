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
			LoadXMLTest(@"C:\temp\FG-GML-533935-ALL-20221001\FG-GML-533935-AdmArea-20221001-0001.xml");
			LoadXMLTest(@"C:\temp\FG-GML-533935-ALL-20221001\FG-GML-533935-BldL-20221001-0001.xml");
			LoadXMLTest(@"C:\temp\FG-GML-533935-ALL-20221001\FG-GML-533935-RailCL-20221001-0001.xml");
			LoadXMLTest(@"C:\temp\FG-GML-533935-ALL-20221001\FG-GML-533935-RdEdg-20221001-0001.xml");
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
			PrintXMLPaths(@"C:\temp\FG-GML-533935-ALL-20221001\FG-GML-533935-AdmArea-20221001-0001.xml");
			PrintXMLPaths(@"C:\temp\FG-GML-533935-ALL-20221001\FG-GML-533935-BldL-20221001-0001.xml");
			PrintXMLPaths(@"C:\temp\FG-GML-533935-ALL-20221001\FG-GML-533935-RailCL-20221001-0001.xml");
			PrintXMLPaths(@"C:\temp\FG-GML-533935-ALL-20221001\FG-GML-533935-RdEdg-20221001-0001.xml");
		}

		private void PrintXMLPaths(string file)
		{
			HashSet<string> xmlPaths = new HashSet<string>();
			XMLNode root = XMLNode.LoadFromFile(file);
			root.Search((xmlPath, node) => xmlPaths.Add(xmlPath));

			Console.WriteLine(file);

			foreach (string xmlPath in xmlPaths.OrderBy(SCommon.Comp))
				Console.WriteLine(xmlPath
					+ "\t" + GetNodeCount(root, xmlPath, int.MaxValue, Math.Min)
					+ "\t" + GetNodeCount(root, xmlPath, int.MinValue, Math.Max));

			Console.WriteLine();
		}

		private int GetNodeCount(XMLNode root, string xmlPath, int count, Func<int, int, int> chooser)
		{
			int p = xmlPath.LastIndexOf('/');

			if (p == -1) // ? ルートTag
				return 1;

			string parentXmlPath = xmlPath.Substring(0, p);
			string name = xmlPath.Substring(p + 1);

			root.Search((xp, node) =>
			{
				if (xp == parentXmlPath)
					count = chooser(count, node.Children.Where(n => n.Name == name).Count());
			});

			return count;
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
			ExportPosList(
				@"C:\temp\FG-GML-533935-ALL-20221001\FG-GML-533935-RdEdg-20221001-0001.xml",
				@"C:\temp\Road.txt",
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
						writer.WriteLine(); // 空行 -- データの区切りとして
					}
				});
			}
		}

		public void Test04()
		{
			double ER = 6367444.5; // 地球の半径(meter)
			double LAT = 35.6; // 基準とする北緯(degree)

			double latToMeter = ER * 2.0 * Math.PI / 360.0;
			double lonToMeter = ER * Math.Cos(LAT * Math.PI / 180.0) * 2.0 * Math.PI / 360.0;

			Console.WriteLine("緯度の 1 度を " + latToMeter.ToString("F9") + " メートルとする。");
			Console.WriteLine("経度の 1 度を " + lonToMeter.ToString("F9") + " メートルとする。");
		}
	}
}
