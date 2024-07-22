import Landing from "@/components/landing";

function Dashboard() {
  return (
      <div id="content" className="flex min-h-screen w-full items-center justify-center dark:bg-black">
        <div
          id="layout"
          className="relative flex h-screen w-full max-w-screen-md flex-col items-center justify-center gap-5 overflow-hidden p-2 py-10 sm:gap-3 sm:p-4"
        >
          <Landing />
        </div>
      </div>
  );
}


export default Dashboard;