"use client"
import { SelectQuestion } from "@/app/(mobile)/mental-health/page";

const options: string[] = [
        "Not at all",
        "Several days",
        "More than half the days",
        "Nearly every day",
    ];

export default function Response({question, answer}: SelectQuestion) {

    

    return (
        <div className="min-w-[100%]">
            <div className="text-secondary font-bold pb-2">{question}</div>
			<div className="grid grid-cols-4 gap-1">
				{options.map((option, index) => (
					<div className="flex flex-col items-center">
						<button
							key={option}
							className={`flex gap-2 h-16 w-full px-4 justify-between items-center ${
								answer === index
									? "bg-primary"
									: "bg-secondaryLight"
							} ${
								index === 0
									? "rounded-l-2xl"
									: index === options.length - 1
									? "rounded-r-2xl"
									: "rounded-none"
							}`}
                            disabled
							// onClick={() => onClick(index)} NOT NEEDED HERE
						></button>
						<span
							className={`text-center text-sm font-medium mt-2 ${
								answer === index
									? "text-primary"
									: "text-secondary"
							}`}
						>
							{option}
						</span>
					</div>
				))}
			</div>
        </div>
    )
}