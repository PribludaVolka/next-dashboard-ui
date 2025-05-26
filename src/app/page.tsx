"use client"
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Homepage = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  const router = useRouter();

  useEffect(() => {
    const role = user?.publicMetadata.role;

    if(isSignedIn){
        router.push(`/${role}`);
    }
  }, [user, router]);
  
  return (
    <div className="">Homepage</div>
  )
}

export default Homepage