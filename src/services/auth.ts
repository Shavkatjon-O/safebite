"use client"

import axios from "axios"
import Cookies from "js-cookie"

const signIn = async (email: string, password: string) => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/login/`, {
    email: email,
    password: password
  });

  if (response.status === 200) {
    const { access, refresh } = response.data;

    Cookies.set("accessToken", access);
    Cookies.set("refreshToken", refresh);

    return { success: true, message: "Sign in successful" };
  } else {
    return { success: false, message: "Sign in failed" };
  }
}

const sendVerificationCode =  async (email: string) => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/send_verification/`, {
    email: email
  });

  if (response.status === 200) {
    return { success: true, message: "Verification code sent successfully" };
  } else {
    return { success: false, message: "Failed to send verification code" };
  }
}


const checkVerificationCode = async (email: string, code: string) => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/check_verification/`, {
    email: email,
    otp: code
  });

  if (response.status === 200) {
    return { success: true, message: "Verification code is correct" };
  } else {
    return { success: false, message: "Verification code is incorrect" };
  }
}

const signUp = async (
  email: string,
  password: string,
  // first_name: string,
  // last_name: string,
  // age: number,
  // gender: string,
  // height: number,
  // weight: number,
  // activity_level: string,
  // goal: string,
  // diet_type: string,
  // allergies: string,
) => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/register/`, {
    email: email,
    password: password,
    // first_name: first_name,
    // last_name: last_name,
    // age: age,
    // gender: gender,
    // height: height,
    // weight: weight,
    // activity_level: activity_level,
    // goal: goal,
    // diet_type: diet_type,
    // allergies: allergies,
  }, {
    headers: {
      "Content-Type": "application/json",
    }
  });

  if (response.status === 201) {
    return { success: true, message: "Sign up successful" };
  } else {
    return { success: false, message: "Sign up failed" };
  }
}

export {
  signIn,
  sendVerificationCode,
  checkVerificationCode,
  signUp,
}