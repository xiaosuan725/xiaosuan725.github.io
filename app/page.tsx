import type { Metadata } from "next";
import { LightExperience } from "./LightExperience";

export const metadata: Metadata = {
  title: "HTML Light Demo",
  description: "An interactive HTML-in-Canvas lighting experiment.",
};

export default function Home() {
  return <LightExperience />;
}
