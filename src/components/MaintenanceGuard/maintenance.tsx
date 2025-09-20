const Maintenance = ({ notice }: any) => {
	return (
		<div className="flex items-center justify-center min-h-screen bg-black text-white">
			<div className="text-center">
				<h1 className="text-4xl font-bold mb-4">
					🚧 Website Under Maintenance 🚧
				</h1>
				<p className="text-lg">{notice}</p>
			</div>
		</div>
	);
};

export default Maintenance;
