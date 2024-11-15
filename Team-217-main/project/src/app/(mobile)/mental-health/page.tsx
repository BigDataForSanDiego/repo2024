"use client";

import InputQuestion from "@/features/form/components/input-question";
import Question from "@/features/question/components/question";
import { PHQ9 } from "@/features/question/utils/utils";
import { ChevronLeft, LoaderCircle } from "lucide-react";

import { useState } from "react";

export type SelectQuestion = {
	question: string;
	answer: number | null;
};

type InputQuestionType = {
	question: string | null;
	answer: string;
};

type DataType = {
	phq9: SelectQuestion[];
	gad7: SelectQuestion[];
	custom: InputQuestionType[];
};

const doctor = {
	name: "Ci Ma, MD",
	location: "Psychiatric Consultants of San Diego",
	areasOfFocus: [
		"Addictive behavior (drug and alcohol abuse)",
		"ADHD (adults)",
		"Anger management",
		"Anxiety and panic disorders",
		"Bipolar disorder",
		"Cognitive therapy",
		"Crisis intervention",
		"Depression",
		"Electroconvulsive therapy",
		"Mood disorders",
		"Post-traumatic stress disorder",
		"Psychiatric assessment",
		"Psychiatric trauma",
		"Psychotic disorders",
		"Rehab (neuropsychology)",
		"Relaxation therapy",
		"Schizophrenia",
		"Sleep disorders",
	],
	insurances: [
		"Aetna",
		"CIGNA",
		"Commercial/Indemnity Insurance",
		"Self-Pay",
		"United Behavioral Health",
	],
};

const defaultData: DataType = {
	phq9: [
		{
			question: "Little interest or pleasure in doing things",
			answer: null,
		},
		{
			question: "Feeling down, depressed, or hopeless",
			answer: null,
		},
		{
			question: "Trouble falling or staying asleep, or sleeping too much",
			answer: null,
		},
		{
			question: "Feeling tired or having little energy",
			answer: null,
		},
		{
			question: "Poor appetite or overeating",
			answer: null,
		},
		{
			question:
				"Feeling bad about yourself — or that you are a failure or have let yourself or your family down",
			answer: null,
		},
		{
			question:
				"Trouble concentrating on things, such as reading the newspaper or watching television",
			answer: null,
		},
		{
			question:
				"Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual",
			answer: null,
		},
		{
			question:
				"Thoughts that you would be better off dead or of hurting yourself in some way",
			answer: null,
		},
	],
	gad7: [
		{
			question: "Feeling nervous, anxious, or on edge",
			answer: null,
		},
		{
			question: "Not being able to stop or control worrying",
			answer: null,
		},
		{
			question: "Worrying too much about different things",
			answer: null,
		},
		{
			question: "Trouble relaxing",
			answer: null,
		},
		{
			question: "Being so restless that it is hard to sit still",
			answer: null,
		},
		{
			question: "Becoming easily annoyed or irritable",
			answer: null,
		},
		{
			question: "Feeling afraid, as if something awful might happen",
			answer: null,
		},
	],
	custom: [
		{
			question: "Question 1",
			answer: "",
		},
		{
			question: "Question 2",
			answer: "",
		},
		{
			question: "Question 3",
			answer: "",
		},
	],
};

async function getQuestionsFromLLM(
	phq9: SelectQuestion[],
	gad7: SelectQuestion[]
): Promise<string[]> {
	const response = await fetch("/api/questions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ phq9, gad7 }),
	});

	if (!response.ok) {
		console.error("Failed to fetch questions");
		return []; // Return an empty array or handle the error accordingly
	}

	const result = await response.json();

	return result.response || []; // Handle missing questions field
}

export default function MentalHealth() {
	const [screen, setScreen] = useState<number>(0);
	const [data, setData] = useState<DataType>(defaultData);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	let toDisplay: JSX.Element;

	if (screen === 0) {
		toDisplay = (
			<>
				<div className="flex flex-col gap-6">
					<div className="flex items-center gap-2">
						<ChevronLeft className="h-5 w-5 stroke-primary" />
						<span className="text-primary font-medium">Back</span>
					</div>
					<h1 className="font-bold text-2xl text-secondary">PHQ-9</h1>
				</div>
				<h2 className="pt-12 font-medium text-secondary">
					Over the last two weeks, how often have you been bothered by
					any of the following problems?
				</h2>
				<div className="pt-12 flex flex-col gap-8">
					{data.phq9.map((item) => (
						<Question
							key={item.question}
							question={item.question}
							answer={item.answer}
							onClick={(answer) => {
								setData({
									...data,
									phq9: data.phq9.map((phqItem) => {
										return {
											...phqItem,
											answer:
												phqItem.question ===
												item.question
													? answer
													: phqItem.answer,
										};
									}),
								});
							}}
						/>
					))}
				</div>
				<button
					onClick={() => setScreen(screen + 1)}
					className="mt-12 w-full py-2 rounded-full bg-primary text-white font-medium"
				>
					Next
				</button>
			</>
		);
	} else if (screen === 1) {
		toDisplay = (
			<>
				<div className="flex flex-col gap-6">
					<div className="flex items-center gap-2">
						<ChevronLeft className="h-5 w-5 stroke-primary" />
						<span className="text-primary font-medium">Back</span>
					</div>
					<h1 className="font-bold text-2xl text-secondary">GAD-7</h1>
				</div>
				<h2 className="pt-12 font-medium text-secondary">
					Over the last two weeks, how often have you been bothered by
					any of the following problems?
				</h2>
				<div className="pt-12 flex flex-col gap-8">
					{data.gad7.map((item) => (
						<Question
							key={item.question}
							question={item.question}
							answer={item.answer}
							onClick={(answer) => {
								setData({
									...data,
									gad7: data.gad7.map((gad7Item) => {
										return {
											...gad7Item,
											answer:
												gad7Item.question ===
												item.question
													? answer
													: gad7Item.answer,
										};
									}),
								});
							}}
						/>
					))}
				</div>
				<button
					onClick={async () => {
						setIsLoading(true);
						setScreen(screen + 1);
						const questions: string[] = await getQuestionsFromLLM(
							data.phq9,
							data.gad7
						);
						setData({
							...data,
							custom: data.custom.map((customItem, index) => {
								return {
									question: questions[index],
									answer: "",
								};
							}),
						});
						setIsLoading(false);
					}}
					className="mt-12 w-full py-2 rounded-full bg-primary text-white font-medium"
				>
					Next
				</button>
			</>
		);
	} else if (screen === 2) {
		toDisplay = (
			<>
				{isLoading ? (
					<div className="flex flex-col items-center justify-center mt-8 gap-2">
						<h1 className="text-secondary font-bold text-xl">
							Generating dynamic questions...
						</h1>
						<LoaderCircle className="stroke-primary h-8 w-8 animate-spin" />
					</div>
				) : (
					<>
						<div className="flex flex-col gap-6">
							<div className="flex items-center gap-2">
								<ChevronLeft className="h-5 w-5 stroke-primary" />
								<span className="text-primary font-medium">
									Back
								</span>
							</div>
							<h1 className="font-bold text-2xl text-secondary">
								Please answer the questions
							</h1>
						</div>
						<div className="pt-12 flex flex-col gap-8">
							{data.custom.map((item) => (
								<InputQuestion
									key={item.question}
									question={item.question!}
									text={item.answer}
									onChange={(e) => {
										setData({
											...data,
											custom: data.custom.map(
												(customItem) => {
													return {
														...customItem,
														answer:
															customItem.question ===
															item.question
																? e.target.value
																: customItem.answer,
													};
												}
											),
										});
									}}
								/>
							))}
						</div>
						<button
							onClick={() => {
								setIsLoading(true);
								setScreen(screen + 1);
								setTimeout(() => setIsLoading(false), 3000);
							}}
							className="mt-12 w-full py-2 rounded-full bg-primary text-white font-medium"
						>
							Next
						</button>
					</>
				)}
			</>
		);
	} else if (screen === 3) {
		toDisplay = (
			<>
				{isLoading ? (
					<div className="flex flex-col items-center justify-center mt-8 gap-2">
						<h1 className="text-secondary font-bold text-xl">
							Finding a doctor for you...
						</h1>
						<LoaderCircle className="stroke-primary h-8 w-8 animate-spin" />
					</div>
				) : (
					<div className="flex flex-col gap-4">
						<div className="flex gap-4 items-center">
							<img
								src="/profile_image.webp"
								alt="Profile Picture"
							/>
							<div className="flex flex-col">
								<h1 className="text-secondary font-bold text-xl">
									{doctor.name}
								</h1>
								<span className="text-secondary font-medium">
									{doctor.location}
								</span>
								<a
									className="text-primary font-bold hover:underline"
									href="https://www.sharp.com/doctors/ci-ma"
								>
									Connect with Ci Ma, MD here in the Sharp app
								</a>
							</div>
						</div>
						<div className="bg-white rounded-lg p-4 text-secondary">
							<h2 className="text-lg font-bold pb-2">
								Insurance
							</h2>
							<div className="flex flex-col gap-1">
								{doctor.insurances.map((item) => (
									<p key={item}>{item}</p>
								))}
							</div>
						</div>
						<div className="bg-white rounded-lg p-4 text-secondary">
							<h2 className="text-lg font-bold pb-2">
								Areas of Focus
							</h2>
							<div className="flex flex-col gap-1">
								{doctor.areasOfFocus.map((item) => (
									<p key={item}>{item}</p>
								))}
							</div>
						</div>
						<button
							onClick={() => setScreen(screen + 1)}
							className="mt-12 w-full py-2 rounded-full bg-primary text-white font-medium"
						>
							Go to psychiatrist view
						</button>
					</div>
				)}
			</>
		);
	} else {
		toDisplay = <Report data={data} />;
	}

	return <div className="pt-16 px-4 pb-8">{toDisplay}</div>;
}

function Report({ data }: { data: DataType }) {
	return (
		<div className="flex flex-col gap-8 text-secondary px-8">
			<h1 className="font-bold text-3xl">Patient: John Smith</h1>
			<div className="grid grid-cols-3 gap-8">
				<div className="flex flex-col gap-2">
					<h2 className="font-bold text-2xl">Generated Questions:</h2>
					<div className="flex flex-col gap-8">
						{data.custom.map((item) => (
							<InputQuestion
								key={item.question}
								question={item.question!}
								text={item.answer!}
								onChange={() => {}}
							/>
						))}
					</div>
				</div>
				<div className="flex flex-col gap-2">
					<h2 className="font-bold text-2xl">PHQ-9:</h2>
					<h3 className="font-bold text-xl text-primary">
						Score: {addScore(data.phq9)}
					</h3>
					<div className="flex flex-col gap-8">
						{data.phq9.map((item) => (
							<Question
								key={item.question}
								question={item.question}
								answer={item.answer}
								onClick={() => {}}
							/>
						))}
					</div>
				</div>
				<div className="flex flex-col gap-2">
					<h2 className="font-bold text-2xl">GAD-7:</h2>
					<h3 className="font-bold text-xl text-primary">
						Score: {addScore(data.gad7)}
					</h3>
					<div className="flex flex-col gap-8">
						{data.gad7.map((item) => (
							<Question
								key={item.question}
								question={item.question}
								answer={item.answer}
								onClick={() => {}}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

function addScore(questions: SelectQuestion[]): number {
	let finalScore = 0;
	for (const question of questions) {
		finalScore += question.answer!;
	}
	return finalScore;
}
