import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { getMe } from "../api/auth.api";

type User = {
    id: string;
    name: string;
    email: string;
};

const stats = [
    { label: "Total Videos", value: "0", icon: "#", detail: "Videos uploaded" },
    { label: "Processing Jobs", value: "0", icon: "#", detail: "Currently processing" },
    { label: "Workers Online", value: "0", icon: "#", detail: "Available Workers" },
    { label: "Completed Jobs", value: "0", icon: "#", detail: "Successfully processed" },
];

const jobs = [
    { name: "No videos yet", format: "Upload a video to get started", status: "Waiting", progress: 0 },
];

export default function DashboardPage() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchUser() {
            try {
                const data = await getMe();
                setCurrentUser(data.user);
            } catch (error) {
                console.error("Failed to fetch current user:", error);
                setError("Could not load your profile. Please log in again");
            }
            finally {
                setLoading(false);
            }
        }
        fetchUser();
    }, []);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };
    // console.log("USER = ", user);
    // console.log("TOKEN = ", token);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-600">Loading Voxmend...</div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50 p-6">
                <p className="text-red-600">{error}</p>
                <button onClick={handleLogout}
                    className="rounded-lg bg-slate-900 px-5 py-2.5 text-white hover:bg-slate-700"
                >Return to login</button>
            </div>
        );
    }

    const displayUser = currentUser ?? user;

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 md:flex">
          <aside className="flex w-full flex-col bg-slate-950 p-5 text-white md:min-h-screen md:w-64 md:shrink-0">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500 text-xl font-bold">
                V
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">Voxmend</h1>
                <p className="text-xs text-slate-400">Video Processing Platform</p>
              </div>
            </div>

            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
              Workspace
            </p>

            <nav className="flex gap-2 overflow-x-auto md:flex-col">
              <a href="#overview" className="rounded-lg bg-indigo-500/20 px-4 py-3 text-sm font-medium text-indigo-300">
                Overview
              </a>
              <a href="#videos" className="rounded-lg px-4 py-3 text-sm text-slate-300 hover:bg-slate-800">
                Videos
              </a>
              <a href="#jobs" className="rounded-lg px-4 py-3 text-sm text-slate-300 hover:bg-slate-800">
                Processing Jobs
              </a>
              <a href="#workers" className="rounded-lg px-4 py-3 text-sm text-slate-300 hover:bg-slate-800">
                Workers
              </a>
            </nav>

            <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900 p-4 md:mt-auto">
              <p className="text-sm font-medium">Distributed processing</p>
              <p className="mt-1 text-xs leading-5 text-slate-400">
                Monitor your video pipeline from one workspace.
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="mt-4 rounded-lg px-4 py-3 text-left text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
            >
              Log out
            </button>
          </aside>

          <main id="overview" className="min-w-0 flex-1 p-5 sm:p-8 lg:p-10">
            <header className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm font-medium text-indigo-600">Workspace overview</p>
                <h2 className="mt-1 text-3xl font-bold tracking-tight">Dashboard</h2>
                <p className="mt-2 text-sm text-slate-500">
                  Welcome back, {displayUser?.name ?? "User"}. Here's your pipeline at a glance.
                </p>
              </div>

              <button
                onClick={() => alert("Video upload will be connected in the next step.")}
                className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
              >
                + Upload video
              </button>
            </header>

            <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => (
                <article key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-lg text-indigo-600">
                      {stat.icon}
                    </span>
                  </div>
                  <p className="mt-5 text-3xl font-bold tracking-tight">{stat.value}</p>
                  <p className="mt-1 text-xs text-slate-500">{stat.detail}</p>
                </article>
              ))}
            </section>

            <section id="jobs" className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex flex-col justify-between gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:p-6">
                <div>
                  <h3 className="text-lg font-semibold">Recent processing jobs</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Track the status of your latest video tasks.
                  </p>
                </div>
                <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                  All jobs
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px] text-left text-sm">
                  <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                    <tr>
                      <th className="px-6 py-4 font-medium">Video / Job</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                      <th className="px-6 py-4 font-medium">Progress</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.map((job) => (
                      <tr key={job.name} className="border-t border-slate-100">
                        <td className="px-6 py-5">
                          <p className="font-medium text-slate-800">{job.name}</p>
                          <p className="mt-1 text-xs text-slate-500">{job.format}</p>
                        </td>
                        <td className="px-6 py-5">
                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                            {job.status}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="h-2 w-28 overflow-hidden rounded-full bg-slate-100">
                              <div className="h-full rounded-full bg-indigo-600" style={{ width: `${job.progress}%` }} />
                            </div>
                            <span className="text-xs text-slate-500">{job.progress}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section id="videos" className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-2xl text-indigo-600">
                ↑
              </div>
              <h3 className="mt-4 text-lg font-semibold">Ready to process your first video?</h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                Upload a video to start building your distributed processing workflow.
              </p>
              <button
                onClick={() => alert("Video upload will be connected in the next step.")}
                className="mt-5 rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold hover:bg-slate-50"
              >
                Select a video
              </button>
            </section>

            <footer id="workers" className="mt-8 flex flex-col gap-2 text-xs text-slate-400 sm:flex-row sm:justify-between">
              <p>Voxmend · Distributed video processing</p>
              <p>Signed in as {displayUser?.email ?? "—"}</p>
            </footer>
          </main>
        </div>
      );
}
