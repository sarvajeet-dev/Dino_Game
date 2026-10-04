import Image from "next/image";
import DinoGame from "./component/DinoGame";

export default function Home() {
  return (
   <main className="bg-white min-h-screen flex items-center justify-center">
      <DinoGame/>
   </main> 
  );
}
