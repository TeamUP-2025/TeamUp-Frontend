import Link from "next/link";
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Users, Search, Code, Star } from "lucide-react"

export default function HomePage() {
  return (
    <>
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Find Your Next Coding Adventure
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Connect with developers, discover exciting projects, and collaborate on GitHub repositories that match
                your skills and interests.
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <form className="flex space-x-2">
                <Input className="max-w-lg flex-1" placeholder="Search projects..." type="text" />
                <Button type="submit">Search</Button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
              <Users className="h-10 w-10 mb-2" />
              <h2 className="text-xl font-bold">Connect with Developers</h2>
              <p className="text-center text-gray-500 dark:text-gray-400">
                Find like-minded developers who share your passion for coding and innovation.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
              <Search className="h-10 w-10 mb-2" />
              <h2 className="text-xl font-bold">Discover Projects</h2>
              <p className="text-center text-gray-500 dark:text-gray-400">
                Explore a wide range of open-source projects that align with your skills and interests.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
              <Code className="h-10 w-10 mb-2" />
              <h2 className="text-xl font-bold">Collaborate Easily</h2>
              <p className="text-center text-gray-500 dark:text-gray-400">
                Seamlessly integrate with GitHub to start contributing to projects right away.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Popular Categories</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {["Web Development", "Machine Learning", "Mobile Apps", "Data Science", "Game Development", "DevOps"].map(
              (category) => (
                <div key={category} className="flex items-center space-x-4 border p-4 rounded-lg">
                  <Star className="h-6 w-6" />
                  <div className="font-medium">{category}</div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Start Collaborating Today</h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Join our community of developers and find your next exciting project to contribute to.
              </p>
            </div>
            <Button className="w-[200px]">Sign Up Now</Button>
          </div>
        </div>
      </section>
    </main>
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
      <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 CollabFinder. All rights reserved.</p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link className="text-xs hover:underline underline-offset-4" href="#">
          Terms of Service
        </Link>
        <Link className="text-xs hover:underline underline-offset-4" href="#">
          Privacy
        </Link>
      </nav>
    </footer>
    </>
  );
}
