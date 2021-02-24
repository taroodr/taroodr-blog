import Link from "next/link";

export const Layout: React.FC = ({ children }) => {
  return (
    <div className="container max-w-screen-md mx-auto py-4 px-4 md:px-0">
      <header className="">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-lg text-green-400">
            <Link href="/">
              <a className="inline-flex items-center">
                <img
                  src="https://github.com/taroodr.png"
                  width="32"
                  height="32"
                  alt="taroodr"
                  className="rounded-full"
                />
                <span className="inline-block ml-3 mt-1">taroodr.dev</span>
              </a>
            </Link>
          </h1>
        </div>
      </header>
      <div className="mt-10">{children}</div>
      <footer className="flex items-center justify-center pt-12">
        <small>
          <a href="https://twitter.com/taroodr">© 2021 @taroodr</a>
        </small>
      </footer>
    </div>
  );
};
