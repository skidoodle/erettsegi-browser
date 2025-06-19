import { Button } from "@heroui/button";
import { useRouter } from "next/router";
import { Footer } from "@/components/Footer";

export default function ErrorPage() {
	const router = useRouter();

	const handleBack = () => {
		router.push("/");
	};

	return (
		<>
			<main className="dark:bg-[#121212] text-foreground bg-background py-5">
				<h1 className="text-7xl font-bold text-blue-400 text-center mt-16">
					404
				</h1>
				<div className="flex min-h-screen flex-col items-center justify-between">
					<div className="container mx-auto">
						<div className="flex flex-col items-center justify-center">
							<div className="mt-5 mb-3">
								<div className="text-2xl font-semibold text-gray-600">
									<p className="mt-2">Az keresett oldal nem található.</p>
									<p className="mt-8 text-center">
										<Button color="primary" onPress={handleBack}>
											Vissza
										</Button>
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<Footer />
			</main>
		</>
	);
}
