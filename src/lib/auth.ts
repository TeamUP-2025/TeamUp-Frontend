// app/lib/auth.ts
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export interface AuthUser {
  name: string;
  isLoggedIn: boolean;
}

export interface DecodedToken {
  exp?: number;
  name?: string;
  [key: string]: any;
}

export async function getServerAuthSession(): Promise<AuthUser> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  
  if (!token) {
    return { name: "", isLoggedIn: false };
  }
  
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    
    // Verify token expiration
    if (!decoded.exp || decoded.exp < Date.now() / 1000) {
      return { name: "", isLoggedIn: false };
    }
    
    // Return validated user data
    return {
      name: typeof decoded.name === "string" ? decoded.name : "",
      isLoggedIn: true
    };
  } catch (error) {
    console.error("Error validating token:", error);
    return { name: "", isLoggedIn: false };
  }
}
