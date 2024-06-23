import { Link } from "react-router-dom";

export default function Page404() {
  return (
    <main className="flex flex-col items-center justify-center w-full h-screen bg-primary">
      <h1 className="font-extrabold tracking-widest text-white text-9xl">
        404
      </h1>
      <div className="absolute px-2 text-sm text-white bg-red-500 rounded rotate-12">
        Page Not Found
      </div>
      <Link to="/" className="mt-5">
        <a className="relative inline-block text-sm font-medium text-white group active:text-white focus:outline-none focus:ring">
          <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-white group-hover:translate-y-0 group-hover:translate-x-0"></span>
          <span className="relative block px-8 py-3 border border-current bg-primary">
            Go Home
          </span>
        </a>
      </Link>
    </main>
  );
}
