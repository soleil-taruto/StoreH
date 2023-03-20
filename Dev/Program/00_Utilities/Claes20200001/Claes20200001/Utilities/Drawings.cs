using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Drawing;
using Charlotte.Commons;

namespace Charlotte.Utilities
{
	/// <summary>
	/// 2次元描画系の構造体
	/// </summary>
	public static class Drawings
	{
		public struct D2Point
		{
			public double X;
			public double Y;

			public D2Point(double x, double y)
			{
				this.X = x;
				this.Y = y;
			}

			public I2Point ToI2Point()
			{
				return new I2Point(
					SCommon.ToInt(this.X),
					SCommon.ToInt(this.Y)
					);
			}

			public static D2Point operator +(D2Point a, D2Point b)
			{
				return new D2Point(a.X + b.X, a.Y + b.Y);
			}

			public static D2Point operator -(D2Point a, D2Point b)
			{
				return new D2Point(a.X - b.X, a.Y - b.Y);
			}

			public static D2Point operator *(D2Point a, double b)
			{
				return new D2Point(a.X * b, a.Y * b);
			}

			public static D2Point operator /(D2Point a, double b)
			{
				return new D2Point(a.X / b, a.Y / b);
			}
		}

		public struct D2Size
		{
			public double W;
			public double H;

			public D2Size(double w, double h)
			{
				this.W = w;
				this.H = h;
			}

			public I2Size ToI2Size()
			{
				return new I2Size(
					SCommon.ToInt(this.W),
					SCommon.ToInt(this.H)
					);
			}

			public static D2Size operator +(D2Size a, D2Size b)
			{
				return new D2Size(a.W + b.W, a.H + b.H);
			}

			public static D2Size operator -(D2Size a, D2Size b)
			{
				return new D2Size(a.W - b.W, a.H - b.H);
			}

			public static D2Size operator *(D2Size a, double b)
			{
				return new D2Size(a.W * b, a.H * b);
			}

			public static D2Size operator /(D2Size a, double b)
			{
				return new D2Size(a.W / b, a.H / b);
			}
		}

		/// <summary>
		/// アルファ値の無い色または色の比率を表す。
		/// 各色は 0.0 ～ 1.0 を想定する。
		/// </summary>
		public struct D3Color
		{
			public double R;
			public double G;
			public double B;

			public D3Color(double r, double g, double b)
			{
				this.R = r;
				this.G = g;
				this.B = b;
			}

			public D4Color WithAlpha(double a = 1.0)
			{
				return new D4Color(this.R, this.G, this.B, a);
			}

			public I3Color ToI3Color()
			{
				return new I3Color(
					SCommon.ToInt(this.R * 255.0),
					SCommon.ToInt(this.G * 255.0),
					SCommon.ToInt(this.B * 255.0)
					);
			}
		}

		/// <summary>
		/// アルファ値を含む色または色の比率を表す。
		/// 各色は 0.0 ～ 1.0 を想定する。
		/// </summary>
		public struct D4Color
		{
			public double R;
			public double G;
			public double B;
			public double A;

			public D4Color(double r, double g, double b, double a)
			{
				this.R = r;
				this.G = g;
				this.B = b;
				this.A = a;
			}

			public D3Color WithoutAlpha()
			{
				return new D3Color(this.R, this.G, this.B);
			}

			public I4Color ToI4Color()
			{
				return new I4Color(
					SCommon.ToInt(this.R * 255.0),
					SCommon.ToInt(this.G * 255.0),
					SCommon.ToInt(this.B * 255.0),
					SCommon.ToInt(this.A * 255.0)
					);
			}
		}

		public struct D4Rect
		{
			public double L;
			public double T;
			public double W;
			public double H;

			public D4Rect(D2Point lt, D2Size size)
				: this(lt.X, lt.Y, size.W, size.H)
			{ }

			public D4Rect(double l, double t, double w, double h)
			{
				this.L = l;
				this.T = t;
				this.W = w;
				this.H = h;
			}

			public static D4Rect LTRB(double l, double t, double r, double b)
			{
				return new D4Rect(l, t, r - l, b - t);
			}

			public static D4Rect XYWH(double x, double y, double w, double h)
			{
				return new D4Rect(x - w / 2.0, y - h / 2.0, w, h);
			}

			public double R
			{
				get
				{
					return this.L + this.W;
				}
			}

			public double B
			{
				get
				{
					return this.T + this.H;
				}
			}

			public D2Point LT
			{
				get
				{
					return new D2Point(this.L, this.T);
				}
			}

			public D2Point RT
			{
				get
				{
					return new D2Point(this.R, this.T);
				}
			}

			public D2Point RB
			{
				get
				{
					return new D2Point(this.R, this.B);
				}
			}

			public D2Point LB
			{
				get
				{
					return new D2Point(this.L, this.B);
				}
			}

			public P4Poly Poly
			{
				get
				{
					return new P4Poly(this.LT, this.RT, this.RB, this.LB);
				}
			}

			public D2Size Size
			{
				get
				{
					return new D2Size(this.W, this.H);
				}
			}

			public I4Rect ToI4Rect()
			{
				return new I4Rect(
					SCommon.ToInt(this.L),
					SCommon.ToInt(this.T),
					SCommon.ToInt(this.W),
					SCommon.ToInt(this.H)
					);
			}
		}

		public struct I2Point
		{
			public int X;
			public int Y;

			public I2Point(int x, int y)
			{
				this.X = x;
				this.Y = y;
			}

			public D2Point ToD2Point()
			{
				return new D2Point(this.X, this.Y);
			}

			public static I2Point operator +(I2Point a, I2Point b)
			{
				return new I2Point(a.X + b.X, a.Y + b.Y);
			}

			public static I2Point operator -(I2Point a, I2Point b)
			{
				return new I2Point(a.X - b.X, a.Y - b.Y);
			}

			public static I2Point operator *(I2Point a, int b)
			{
				return new I2Point(a.X * b, a.Y * b);
			}

			public static I2Point operator /(I2Point a, int b)
			{
				return new I2Point(a.X / b, a.Y / b);
			}
		}

		public struct I2Size
		{
			public int W;
			public int H;

			public I2Size(int w, int h)
			{
				this.W = w;
				this.H = h;
			}

			public D2Size ToD2Size()
			{
				return new D2Size(this.W, this.H);
			}

			public static I2Size operator +(I2Size a, I2Size b)
			{
				return new I2Size(a.W + b.W, a.H + b.H);
			}

			public static I2Size operator -(I2Size a, I2Size b)
			{
				return new I2Size(a.W - b.W, a.H - b.H);
			}

			public static I2Size operator *(I2Size a, int b)
			{
				return new I2Size(a.W * b, a.H * b);
			}

			public static I2Size operator /(I2Size a, int b)
			{
				return new I2Size(a.W / b, a.H / b);
			}
		}

		/// <summary>
		/// アルファ値の無い色を表す。
		/// 各色は 0 ～ 255 を想定する。
		/// </summary>
		public struct I3Color
		{
			public int R;
			public int G;
			public int B;

			public I3Color(int r, int g, int b)
			{
				this.R = r;
				this.G = g;
				this.B = b;
			}

			public override string ToString()
			{
				return string.Format("{0:x2}{1:x2}{2:x2}", this.R, this.G, this.B);
			}

			public I4Color WithAlpha(int a = 255)
			{
				return new I4Color(this.R, this.G, this.B, a);
			}

			public D3Color ToD3Color()
			{
				return new D3Color(
					this.R / 255.0,
					this.G / 255.0,
					this.B / 255.0
					);
			}

			public Color ToColor()
			{
				return Color.FromArgb(this.R, this.G, this.B);
			}
		}

		/// <summary>
		/// アルファ値を含む色を表す。
		/// 各色は 0 ～ 255 を想定する。
		/// </summary>
		public struct I4Color
		{
			public int R;
			public int G;
			public int B;
			public int A;

			public I4Color(int r, int g, int b, int a)
			{
				this.R = r;
				this.G = g;
				this.B = b;
				this.A = a;
			}

			public override string ToString()
			{
				return string.Format("{0:x2}{1:x2}{2:x2}{3:x2}", this.R, this.G, this.B, this.A);
			}

			public I3Color WithoutAlpha()
			{
				return new I3Color(this.R, this.G, this.B);
			}

			public D4Color ToD4Color()
			{
				return new D4Color(
					this.R / 255.0,
					this.G / 255.0,
					this.B / 255.0,
					this.A / 255.0
					);
			}

			public Color ToColor()
			{
				return Color.FromArgb(this.A, this.R, this.G, this.B); // 引数の並びは ARGB なので注意すること。
			}
		}

		public struct I4Rect
		{
			public int L;
			public int T;
			public int W;
			public int H;

			public I4Rect(I2Point lt, I2Size size)
				: this(lt.X, lt.Y, size.W, size.H)
			{ }

			public I4Rect(int l, int t, int w, int h)
			{
				this.L = l;
				this.T = t;
				this.W = w;
				this.H = h;
			}

			public static I4Rect LTRB(int l, int t, int r, int b)
			{
				return new I4Rect(l, t, r - l, b - t);
			}

			public static I4Rect XYWH(int x, int y, int w, int h)
			{
				return new I4Rect(x - w / 2, y - h / 2, w, h);
			}

			public int R
			{
				get
				{
					return this.L + this.W;
				}
			}

			public int B
			{
				get
				{
					return this.T + this.H;
				}
			}

			public I2Point LT
			{
				get
				{
					return new I2Point(this.L, this.T);
				}
			}

			public I2Point RT
			{
				get
				{
					return new I2Point(this.R, this.T);
				}
			}

			public I2Point RB
			{
				get
				{
					return new I2Point(this.R, this.B);
				}
			}

			public I2Point LB
			{
				get
				{
					return new I2Point(this.L, this.B);
				}
			}

			public I2Size Size
			{
				get
				{
					return new I2Size(this.W, this.H);
				}
			}

			public D4Rect ToD4Rect()
			{
				return new D4Rect(this.L, this.T, this.W, this.H);
			}
		}

		public struct P4Poly
		{
			public D2Point LT;
			public D2Point RT;
			public D2Point RB;
			public D2Point LB;

			public P4Poly(D2Point lt, D2Point rt, D2Point rb, D2Point lb)
			{
				this.LT = lt;
				this.RT = rt;
				this.RB = rb;
				this.LB = lb;
			}

			public P4Poly(double x1, double y1, double x2, double y2, double x3, double y3, double x4, double y4)
			{
				this.LT = new D2Point(x1, y1);
				this.RT = new D2Point(x2, y2);
				this.RB = new D2Point(x3, y3);
				this.LB = new D2Point(x4, y4);
			}
		}
	}
}
