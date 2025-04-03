import { Skeleton } from "~/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "~/components/ui/card";

export default function ProfileLoading() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 px-4 py-6 md:px-6">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="space-y-8">
            {/* Profile header skeleton */}
            <div className="flex flex-col items-center space-y-4">
              <Skeleton className="h-32 w-32 rounded-full" />
              <div className="text-center">
                <Skeleton className="mx-auto h-8 w-48" />
                <Skeleton className="mx-auto mt-2 h-4 w-32" />
              </div>
            </div>

            {/* Bio skeleton */}
            <Skeleton className="mx-auto h-6 w-full max-w-2xl" />

            {/* Location skeleton */}
            <div className="flex justify-center">
              <Skeleton className="h-6 w-24" />
            </div>

            {/* Stats skeleton */}
            <div className="flex justify-center space-x-4">
              <div className="text-center">
                <Skeleton className="mx-auto h-8 w-16" />
                <Skeleton className="mx-auto mt-1 h-4 w-20" />
              </div>
              <div className="text-center">
                <Skeleton className="mx-auto h-8 w-16" />
                <Skeleton className="mx-auto mt-1 h-4 w-20" />
              </div>
              <div className="text-center">
                <Skeleton className="mx-auto h-8 w-16" />
                <Skeleton className="mx-auto mt-1 h-4 w-20" />
              </div>
            </div>
          </div>

          {/* Repositories skeleton */}
          <div className="space-y-4">
            <Skeleton className="h-8 w-48" />
            {[1, 2, 3].map((index) => (
              <Card key={index}>
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="mt-2 h-4 w-full" />
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-6 w-16" />
                    </div>
                    <Skeleton className="h-8 w-24" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
        <Skeleton className="h-4 w-64" />
        <div className="flex gap-4 sm:ml-auto sm:gap-6">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24" />
        </div>
      </footer>
    </div>
  );
}
