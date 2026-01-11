import { Inter } from "next/font/google";
import LandingPageLayout from "@/components/layouts/LandingPageLayout";
import Home from "@/components/views/Home/Home";

const inter = Inter({ subsets: ["latin"] });

const HomePage = () => {
  return (
    <LandingPageLayout title="Home">
      <Home></Home>
    </LandingPageLayout>
  );
};

export default HomePage;
