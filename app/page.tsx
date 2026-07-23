import type { Metadata } from "next";
import { LightExperience } from "./LightExperience";

export const metadata: Metadata = {
  title: "微光",
  description: "An interactive HTML-in-Canvas lighting experiment.",
};

export default function Home() {
  return <LightExperience />;
}
