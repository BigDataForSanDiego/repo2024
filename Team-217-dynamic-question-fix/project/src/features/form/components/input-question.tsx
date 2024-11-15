import { ChangeEvent } from "react";

export default function InputQuestion({
	question,
	text,
	onChange,
}: {
	question: string;
	text: string;
	onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
	return (
		<div className="flex flex-col gap-2">
			<h3 className="font-bold text-secondary">{question}</h3>
			<textarea
				className="text-sm text-secondary border border-secondaryLight p-4 rounded-lg"
				placeholder="Enter your answer here"
				value={text}
				rows={4}
				onChange={(e) => onChange(e)}
			/>
		</div>
	);
}
