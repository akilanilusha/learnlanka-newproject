import Image from "next/image";
import robotSide from "@/assets/images/robot-side.png";

export default function RobotMascot({
  className = "w-32",
  alt = "AI learning buddy",
}: {
  className?: string;
  alt?: string;
}) {
  return <Image src={robotSide} alt={alt} className={className} draggable={false} priority />;
}
