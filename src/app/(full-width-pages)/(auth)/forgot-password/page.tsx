
import ForgotPassword from "@/components/auth/ForgotPassword";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SignIn Page ",
  description: "Signin Page",
};

const Page: React.FC = () => {
  return <ForgotPassword />;
}

export default Page