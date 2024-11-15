import { SelectQuestion } from "@/app/(mobile)/mental-health/page";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { XMLParser, XMLBuilder, XMLValidator } from "fast-xml-parser";

/**
 * parser that extracts <question> xml tags from string
 * @param request string with xml like tags
 * @returns questions: json object questions that is an array of strings { question: [] }
 */
export async function POST(request: Request) {
  const { phq9, gad7 }: { phq9: SelectQuestion[]; gad7: SelectQuestion[] } =
    await request.json();

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        content: `You are an esteemed therapist and hold a PhD in Psychology from Stanford. You have precisely identified thousands of potential mental health cases in patients by looking at the PHQ-9 and GAD-7 tests along with asking follow up questions.
                    
                    Your task is create 3 follow-up questions to help better identify if a user is suffering from depression or anxiety by utilizing initial data from a patient's PHQ-9 and GAD-7 test results. Utilize XML tags. Think step-by-step and reason using <thinking> tags on what the highest value questions to ask are in order to help a therapist further narrow down a diagnosis. Provide the final 3 questions labeled within an <answer> tag. Label the three questions using <question> tags for each individual question.

                    <phq9>
                    Over the last 2 weeks, how often have you been bothered by any of the following problems?
                    0 - Not at all
                    1 - Several days
                    2 - More than half the days
                    3 - Nearly every day
                    ${phq9.map((item) => {
                      return `* ${item.question} - (${item.answer}/3)\n`;
                    })}
                    </phq9>

                    <gad7>
                    Over the last 2 weeks, how often have you been bothered by any of the following problems?
                    0 - Not at all
                    1 - Several days
                    2 - More than half the days
                    3 - Nearly every day
                    ${gad7.map((item) => {
                      return `* ${item.question} - (${item.answer}/3)\n`;
                    })}
                    </gad7>`,
      },
    ],
  });

  const response = JSON.stringify(completion.choices[0].message.content);
  const parser = new XMLParser();
  const result = parser.parse(response);

  return NextResponse.json({
    success: true,
    response: result.answer.question,
  });
}
