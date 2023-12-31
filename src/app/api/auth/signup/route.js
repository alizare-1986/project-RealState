import User from "@/models/User";
import { hashPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    const { email, password } = await req.json();
    console.log({ email, password });
    if (!email || !password) {
      return NextResponse.json(
        { error: "اطلاعات معتبر نیست" },
        { status: 422 }
      );
    }
    const existingUser = await User.findOne({ email });
    console.log(existingUser);
    if (existingUser) {
      return NextResponse.json(
        { error: "حساب کاربری موجود است" },
        { status: 422 }
      );
    }
    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({
      email: email,
      password: hashedPassword,
    });
    console.log(newUser);
    return NextResponse.json(
      { message: "حساب کاربری ایجاد شد" },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "سمت سرور مشکلی پیش آمده" },
      { status: 500 }
    );
  }
}
