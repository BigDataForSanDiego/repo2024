"use client";
import Response from "@/features/report/components/Response";
import { SelectQuestion } from "@/app/(mobile)/mental-health/page";
import Question from "@/features/question/components/question";
import InputQuestion from "@/features/form/components/input-question";

type DataType = {
	phq9: SelectQuestion[];
	gad7: SelectQuestion[];
	custom: InputQuestion[];
};

type InputQuestion = {
	question: string | null;
	answer: string | null;
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
			question: null,
			answer: null,
		},
		{
			question: null,
			answer: null,
		},
		{
			question: null,
			answer: null,
		},
	],
};

// const data = defaultData;

// export default function Report() {
//     return (
//         <div>
//             <h2 className="text-lg font-bold text-primary">Intake Summary</h2>
//             <p className="text-secondary">
//                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id felis vehicula, cursus massa vitae, fermentum ipsum. Integer non varius eros. Vestibulum quis neque volutpat, consectetur sapien eget, fringilla libero.
//             </p>
//             <h2 className="text-lg font-bold text-primary">Sentiment analysis</h2>
//             <p>Placeholder, maybe use chart here</p>
//             <h2 className="text-lg font-bold text-primary">Patient Answers</h2>
//             <h2 className="font-bold text-primary">PHQ-9</h2>
//             <div className="flex flex-col gap-2">
//                 {data.phq9.map((item) => (
//                     <Response
//                         key={item.question}
//                         question={item.question}
//                         answer={item.answer}
//                     />
//                 ))}
//             </div>
//             <h2 className="font-bold text-primary">GAD-7</h2>
//             <div className="flex flex-col gap-2">
//                 {data.gad7.map((item) => (
//                     <Response
//                         key={item.question}
//                         question={item.question}
//                         answer={item.answer}
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// }
