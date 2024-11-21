"use client"

import axios from "axios"
import Cookies from "js-cookie"
import coreApi from "@/lib/coreApi"

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


const checkVerificationCode = async (email: string, otp: string) => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/check_verification/`, {
    email: email,
    otp: otp,
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
  first_name: string,
  last_name: string,
  age: number,
  gender: string,
  height: number,
  weight: number,
  activity_level: string,
  goal: string,
  diet_type: string,
  allergies: string,
  calories: number,
  carbs: number,
  proteins: number,
  fats: number,
) => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/register/`, {
    email,
    password,
    first_name,
    last_name,
    age,
    gender,
    height,
    weight,
    activity_level,
    goal,
    diet_type,
    allergies,
    calories,
    carbs,
    proteins,
    fats,
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

const getCalculatedCalorie = async (
  age: number,
  gender: string,
  height: string,
  weight: string,
  activity_level: string,
  goal: string,
) => {
  const response = await coreApi.post("/users/calorie/", {
    age: age,
    gender: gender,
    height: height,
    weight: weight,
    activity_level: activity_level,
    goal: goal,
  });
  if (response.status === 200) {
    return { success: true, message: "Calculated calorie", data: response.data };
  } else {
    return { success: false, message: "Failed to calculate calorie" };
  }
}

export {
  signIn,
  sendVerificationCode,
  checkVerificationCode,
  signUp,
  getCalculatedCalorie,
}