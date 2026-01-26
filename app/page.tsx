import SeoulMap from "./component/SeoulMap";
import Navbar from "./component/Navbar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black">
      <Navbar />
    </main>
  );
}
