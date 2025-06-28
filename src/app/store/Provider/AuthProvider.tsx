"use client";
import { ReactNode, useEffect, useState } from "react";
import { useVerifyAuthMutation } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { logout, setEmailVerified, setUser } from "../slice/userSlice";
import BookLoader from "@/lib/BookLoader";
import { useRouter } from "next/navigation";

const INACTIVITY_TIMEOUT = 60 * 60 * 1000; // 60 minutes

export default function AuthCheck({ children }: { children: ReactNode }) {
    const [verifyAuth, { isLoading }] = useVerifyAuthMutation();
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.user);
    const accessToken = useSelector((state: RootState) => state.user.accessToken);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await verifyAuth({}).unwrap();

                if (response.success) {
                    dispatch(setUser(response.data));
                    dispatch(setEmailVerified(response.data.isVerified));
                } else {
                    dispatch(logout());
                    router.push("/signin");
                }
            } catch (error) {
                console.log(error);
                dispatch(logout());
                router.push("/signin");
            } finally {
                setIsCheckingAuth(false);
            }
        };

        if (!user || !accessToken) {
            checkAuth();
        } else {
            setIsCheckingAuth(false);
        }
    }, [user, accessToken, dispatch, router, verifyAuth]);

    // Auto Logout on Inactivity & Browser Close
    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        const resetTimer = () => {
            clearTimeout(timeoutId);
            const currentTime = Date.now();
            localStorage.setItem("lastActivity", currentTime.toString()); // Store last activity time

            timeoutId = setTimeout(() => {
                console.log("User inactive for 5 minutes, logging out...");
                dispatch(logout());
                localStorage.removeItem("lastActivity"); // Clear stored activity
                router.push("/signin");
            }, INACTIVITY_TIMEOUT);
        };

        // Check last activity on page load
        const lastActivity = localStorage.getItem("lastActivity");
        if (lastActivity && Date.now() - parseInt(lastActivity) > INACTIVITY_TIMEOUT) {
            console.log("User was inactive for more than 5 minutes, logging out...");
            dispatch(logout());
            localStorage.removeItem("lastActivity");
            router.push("/signin");
        }

        // Listen for user activity
        window.addEventListener("mousemove", resetTimer);
        window.addEventListener("keydown", resetTimer);
        window.addEventListener("click", resetTimer);

        // Initialize the timer
        resetTimer();

        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener("mousemove", resetTimer);
            window.removeEventListener("keydown", resetTimer);
            window.removeEventListener("click", resetTimer);
        };
    }, [dispatch, router]);

    if (isLoading || isCheckingAuth) {
        return <BookLoader />;
    }

    return <>{children}</>;
}