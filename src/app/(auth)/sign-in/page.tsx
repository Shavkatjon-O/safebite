"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Cookies from "js-cookie"
import axios from "axios"

const signIn = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/login/`, {
      email,
      password,
    })
    const { access, refresh } = response.data;

    Cookies.set("accessToken", access)
    Cookies.set("refreshToken", refresh)
    
    return {
      success: true,
      message: "Sign in successful!",
    }
  } catch (error) {
    console.log(error)

    return {
      success: false,
      message: "Sign in failed!",
    }
  }
}

const Page = () => {
  

  return <div>Page</div>
}
export default Page