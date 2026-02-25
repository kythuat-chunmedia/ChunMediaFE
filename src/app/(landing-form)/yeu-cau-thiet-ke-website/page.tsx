
import { LandingPage } from "@/app/components/landing";
import BackgroundEffects from "@/app/components/landing/BackgroundEffects";
import Header from "@/app/components/landing/Header";

export default function LandingRoute() {
  return (
    <>
      <BackgroundEffects />
      <Header />
      <LandingPage />
    </>
  );
}
