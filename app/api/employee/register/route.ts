import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

import bcrypt from "bcryptjs";

import { createClient } from "@supabase/supabase-js";

const supabase =
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

export async function POST(
  req: Request
) {
  try {

    const formData =
      await req.formData();

    const firstName =
      formData.get("firstName") as string;

    const lastName =
      formData.get("lastName") as string;

    const email =
      formData.get("email") as string;

    const phone =
      formData.get("phone") as string;

    const password =
      formData.get("password") as string;

    const resume =
      formData.get("resume") as File;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !password ||
      !resume
    ) {
      return NextResponse.json({
        success: false,
        message:
          "All fields are required",
      });
    }

    const existingUser =
      await prisma.employee.findUnique({
        where: { email },
      });

    if (existingUser) {
      return NextResponse.json({
        success: false,
        message:
          "Employee already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    // FILE BUFFER
    const bytes =
      await resume.arrayBuffer();

    const buffer =
      Buffer.from(bytes);

    // FILE NAME
    const fileName =
      `${Date.now()}-${resume.name}`;

    // UPLOAD TO SUPABASE
    const { error } =
      await supabase.storage
        .from("resumes")
        .upload(
          fileName,
          buffer,
          {
            contentType:
              resume.type,
          }
        );

    if (error) {

      console.log(error);

      return NextResponse.json({
        success: false,
        message:
          "Resume upload failed",
      });
    }

    // PUBLIC URL
    const {
      data: publicUrlData,
    } =
      supabase.storage
        .from("resumes")
        .getPublicUrl(
          fileName
        );

    // SAVE DATABASE
    const employee =
      await prisma.employee.create({
        data: {
          firstName,
          lastName,
          email,
          phone,
          password:
            hashedPassword,
          resume:
            publicUrlData.publicUrl,
        },
      });

    return NextResponse.json({
      success: true,
      employee,
    });

  } catch (error) {

    console.log(
      "REGISTER ERROR:",
      error
    );

    return NextResponse.json({
      success: false,
      message:
        "Registration failed",
    });
  }
}