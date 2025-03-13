import { Column } from "@/components/custom/Column";
import React from "react";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
	return (
		<section className="flex items-start justify-start gap-6">
			<Column title="Todo" />
			<Column title="In progress" />
			<Column title="Done" />
		</section>
	);
};

export default Home;
