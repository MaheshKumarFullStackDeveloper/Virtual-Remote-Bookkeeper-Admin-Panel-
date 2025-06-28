"use client";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect, useState } from "react";
import BookLoader from "@/lib/BookLoader";

export default function FullWidthPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const user = useSelector((state: RootState) => state?.user?.user);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (user !== undefined) {
      if (user) {
        router.push("/");
      }
      setIsChecking(false);
    }
  }, [user, router]);

  if (isChecking) {
    return <BookLoader />
  } else {

    return <div>{children}</div>;
  }
}