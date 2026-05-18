import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

import fs from "fs";

import path from "path";

import bcrypt from "bcryptjs";

export async function POST(
  req: Request
) {
  try {

    const formData =
      await req.formData();

    // GET VALUES
    const firstName =
      formData.get(
        "firstName"
      ) as string;

    const lastName =
      formData.get(
        "lastName"
      ) as string;

    const email =
      formData.get(
        "email"
      ) as string;

    const phone =
      formData.get(
        "phone"
      ) as string;

    const password =
      formData.get(
        "password"
      ) as string;

    const resume =
      formData.get(
        "resume"
      ) as File;

    // VALIDATION
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

    // CHECK EXISTING USER
    const existingUser =
      await prisma.employee.findUnique({
        where: {
          email,
        },
      });

    if (existingUser) {
      return NextResponse.json({
        success: false,
        message:
          "Employee already exists",
      });
    }

    // HASH PASSWORD
    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    // CREATE FILE BUFFER
    const bytes =
      await resume.arrayBuffer();

    const buffer =
      Buffer.from(bytes);

    // FILE NAME
    const fileName =
      `${Date.now()}-${resume.name}`;

    // UPLOAD PATH
    const uploadPath =
      path.join(
        process.cwd(),
        "public/uploads",
        fileName
      );

    // CREATE uploads folder if not exists
    const uploadDir =
      path.join(
        process.cwd(),
        "public/uploads"
      );

    if (
      !fs.existsSync(
        uploadDir
      )
    ) {
      fs.mkdirSync(
        uploadDir,
        {
          recursive: true,
        }
      );
    }

    // SAVE FILE
    fs.writeFileSync(
      uploadPath,
      buffer
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
            `/uploads/${fileName}`,
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