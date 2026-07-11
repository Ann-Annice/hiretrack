export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">

        <div className="w-14 h-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>

        <h2 className="mt-6 text-2xl font-bold text-gray-700">
          Loading...
        </h2>

        <p className="text-gray-500">
          Please wait while we load HireTrack.
        </p>

      </div>
    </div>
  );
}