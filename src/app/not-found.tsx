import Link from "next/link";

export default function Custom404() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br  bg-black p-6">
			<h1 className="text-[10rem] font-extrabold text-indigo-600 drop-shadow-lg">
				404
			</h1>
			<h2 className="text-4xl md:text-5xl font-semibold text-gray-700 mb-4">
				Page Not Found
			</h2>
			<p className="text-gray-500 text-lg md:text-xl mb-8 text-center max-w-md">
				Oops! Looks like the page you are looking for doesn't exist. It might
				have been moved or deleted.
			</p>
			<Link href="/">
				<button className="px-8 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-lg hover:bg-indigo-700 transition-colors duration-300">
					Go Back Home
				</button>
			</Link>
			<div className="mt-12">
				{/* Optional: subtle decorative illustration */}
				<svg
					className="w-64 h-64 text-indigo-200"
					fill="none"
					stroke="currentColor"
					strokeWidth={2}
					viewBox="0 0 24 24">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M12 8v4l3 3m6 0a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
			</div>
		</div>
	);
}
