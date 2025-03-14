// @/services/authService.ts
"use server";

export async function signIn<T>(data : T) {
    console.log("Server action data:", data);
    // Add your sign-in logic here (e.g., authenticate with a database)
}