using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Drawing;
using System.IO;
using Charlotte.Commons;

namespace Charlotte.Tests
{
	public class Test0004
	{
		public void Test01()
		{
			// 表示範囲(緯度経度)
			double NORTH_LAT = 35.607500; // 自由が丘駅
			double SOUTH_LAT = 35.596889; // 田園調布駅
			double WEST_LON = 139.661000; // 九品仏駅
			double EAST_LON = 139.685639; // 大岡山駅

			// 表示範囲のマージン(meter)
			double MARGIN = 1000.0;

			// 出力画像の幅(pixel)
			int IMAGE_WIDTH = 1600;

			StationInfo[] stations = new StationInfo[]
			{
				new StationInfo("35.605417:139.661000:九品仏駅:-80:10:世田谷区:1:004400"),
				new StationInfo("35.607500:139.668889:自由が丘駅:-165:-60:目黒区:-1:664400"),
				//new StationInfo("35.607500:139.668889:自由が丘駅:-180:-40:目黒区:-1:664400"),
				new StationInfo("35.606389:139.679361:緑ヶ丘駅:-20:-60:目黒区:-1:664400"),
				//new StationInfo("35.606389:139.679361:緑ヶ丘駅:-20:-50:目黒区:-1:664400"),
				new StationInfo("35.607500:139.685639:大岡山駅:0:10:大田区:1:004444"),
				new StationInfo("35.596889:139.667306:田園調布駅:-185:-15:大田区:1:004466"),
				new StationInfo("35.603833:139.672306:奥沢駅:0:10:世田谷区:1:004400"),
			};

			OutputImage(NORTH_LAT, SOUTH_LAT, WEST_LON, EAST_LON, MARGIN, IMAGE_WIDTH, stations);
		}

		private class StationInfo
		{
			public double Lat;
			public double Lon;
			public string Name;
			public I2Point NamePos;
			public string AreaName;
			public I2Point AreaNamePos;
			public Color PointColor;
			public Color TextColor;

			public StationInfo(string prm)
			{
				string[] prms = prm.Split(':');
				int c = 0;

				this.Lat = double.Parse(prms[c++]);
				this.Lon = double.Parse(prms[c++]);
				this.Name = prms[c++];
				this.NamePos = new I2Point(0, 0);
				this.NamePos.X = int.Parse(prms[c++]);
				this.NamePos.Y = int.Parse(prms[c++]);
				this.AreaName = prms[c++];
				this.AreaNamePos = new I2Point(0, 0);
				this.AreaNamePos.X = this.NamePos.X;
				this.AreaNamePos.Y = this.NamePos.Y + 40 * int.Parse(prms[c++]);
				int iColor = Convert.ToInt32(prms[c++], 16);
				this.PointColor = Color.FromArgb((int)(64u * 16777216 + iColor));
				this.TextColor = Color.FromArgb((int)(224u * 16777216 + iColor));
			}
		}

		private void OutputImage(double nLat, double sLat, double wLon, double eLon, double margin, int imageWidth, StationInfo[] stations)
		{
			double LAT_TO_METER = 111132.871463004;
			double LON_TO_METER = 90362.222363910;

			// マージン適用
			{
				nLat += margin / LAT_TO_METER;
				sLat -= margin / LAT_TO_METER;
				wLon -= margin / LON_TO_METER;
				eLon += margin / LON_TO_METER;
			}

			double xLon = eLon - wLon;
			double yLat = nLat - sLat;

			double xMeter = xLon * LON_TO_METER;
			double yMeter = yLat * LAT_TO_METER;

			double meterToPixel = imageWidth / xMeter;

			double latToPixel = LAT_TO_METER * meterToPixel;
			double lonToPixel = LON_TO_METER * meterToPixel;

			int w = imageWidth;
			int h = SCommon.ToInt(yMeter * meterToPixel);

			Bitmap image = new Bitmap(w, h);

			using (Graphics g = Graphics.FromImage(image))
			{
				g.FillRectangle(new SolidBrush(Color.White), 0, 0, w, h);

				Action<string, Pen> drawPolyFromFile = (polyFile, pen) =>
				{
					string[] polyLines = File.ReadAllLines(polyFile, Encoding.ASCII);
					int polyLineIndex = 0;

					while (polyLineIndex < polyLines.Length)
					{
						List<double[]> poly = new List<double[]>();

						while (polyLines[polyLineIndex] != "")
							poly.Add(polyLines[polyLineIndex++].Split(' ').Select(v => double.Parse(v)).ToArray());

						polyLineIndex++;

						foreach (double[] p in poly)
						{
							p[0] = (nLat - p[0]) * latToPixel; // Lat to pixel
							p[1] = (p[1] - wLon) * lonToPixel; // Lon to pixel
						}

						for (int polyIndex = 0; polyIndex + 1 < poly.Count; polyIndex++)
						{
							double[] p = poly[polyIndex + 0];
							double[] q = poly[polyIndex + 1];

							if (
								(0.0 <= p[0] && p[0] < h) ||
								(0.0 <= p[1] && p[1] < w) ||
								(0.0 <= q[0] && q[0] < h) ||
								(0.0 <= q[1] && q[1] < w)
								)
							{
								g.DrawLine(pen, (float)p[1], (float)p[0], (float)q[1], (float)q[0]);
							}
						}
					}
				};

				drawPolyFromFile(
					@"C:\temp\Building.txt",
					new Pen(new SolidBrush(Color.FromArgb(192, 255, 192)), 1.0F)
					);
				drawPolyFromFile(
					@"C:\temp\Road.txt",
					new Pen(new SolidBrush(Color.FromArgb(192, 192, 192)), 1.0F)
					);
				drawPolyFromFile(
					@"C:\temp\Rail.txt",
					new Pen(new SolidBrush(Color.FromArgb(0, 0, 0)), 1.0F)
					);
				drawPolyFromFile(
					@"C:\temp\Area.txt",
					new Pen(new SolidBrush(Color.FromArgb(96, 255, 0, 0)), 5.0F)
					);

				foreach (StationInfo station in stations)
				{
					double x = (station.Lon - wLon) * lonToPixel; // Lon to pixel
					double y = (nLat - station.Lat) * latToPixel; // Lat to pixel
					double r = 50.0;

					g.FillEllipse(
						new SolidBrush(station.PointColor),
						//new SolidBrush(Color.FromArgb(128, 0, 255, 0)),
						(float)(x - r / 2.0),
						(float)(y - r / 2.0),
						(float)r,
						(float)r
						);

					g.DrawString(
						station.Name,
						new Font("UD デジタル 教科書体 N-B", 24f, FontStyle.Regular),
						new SolidBrush(station.TextColor),
						(float)(x + station.NamePos.X),
						(float)(y + station.NamePos.Y)
						);

					string areaName = station.AreaName;

					areaName = "(" + areaName + ")";

					g.DrawString(
						areaName,
						new Font("UD デジタル 教科書体 N-B", 24f, FontStyle.Regular),
						new SolidBrush(station.TextColor),
						(float)(x + station.AreaNamePos.X),
						(float)(y + station.AreaNamePos.Y)
						);
				}
			}
			image.Save(SCommon.NextOutputPath() + ".png");
		}
	}
}
