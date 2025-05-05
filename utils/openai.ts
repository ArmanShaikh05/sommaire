/* eslint-disable @typescript-eslint/no-explicit-any */
import { OpenAI } from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateSummaryFromOpenAi = async (pdfText: string) => {
  const SUMMARY_SYSTEM_PROMPT = `You are a social media content expert who makes complex documents easy and engaging to read. Create a viral-style summary using emogis that matches the documents context. Format your response in markdown with proper line breaks.
    
    # [Create a meaningful title based on the documents content]
    One powerful sentence that captures the documents essense.
    -Additionally key overview points (if needed)

    # Document Details
    -Type: [Document Type]
    -For: [Target audience]

    # Key Highlights
    -First key point
    -Second key point
    -Third key point

    # Why it Matters
    - A short impactful paragraph explaining real-world impact.

    # Main points
    -Main insight or finding
    -Key strength or advantage
    -Important outcome or result

    # Pro tips
    -First practical recommendation
    -Second valuable insight
    -Third actionable advice

    # Key terms to know
    -First key term: Simple explanation
    -Second key term: Simple explanation

    # Bottom Line
    -The most important takeway

    Note: Every single point must be a bulletin and should start with an emogi and a space. DO not use numbered lists. Always maintain this exact format for All points in all sections

    Example formats:
    •🎯 This is how every point should look
    •✨ This is another example point

    Never deviate from this format. 

    `;

  try {
    const chat = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "developer",
          content: SUMMARY_SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: `Transform this document into an engaging, easy-to-read summary with contextually relevant emogis and proper markdown formatting: \n\n ${pdfText}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    return chat.choices[0].message.content;
  } catch (error: any) {
    console.log(error);
    if (error?.status === 429) {
      throw new Error("Rate limit exceeded");
    }
  }
};
