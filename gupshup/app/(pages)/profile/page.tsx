import Navbar from "@/components/Navbar";
import SideBar from "@/components/SideBar";

export default function Profile() {
  return (
    <div>
      <div className="">
        <Navbar />
      </div>
      <div className="flex">
        <div className="h-[53.3rem] w-[450px] bg-black">
          <SideBar />
        </div>
        <div>Profile</div>
      </div>
    </div>
  );
}
