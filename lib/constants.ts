export type Plan = {
  id: string;
  name: string;
  price: number;
  items: string[];
  paymentLink: string;
  priceId: string;
  desc: string;
};

export const plans: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    price: 9,
    items: [
      "5 PDF summaries per month",
      "Standard processing speed",
      "Email support",
    ],
    desc: "Prefer for occasional use",
    paymentLink: "https://buy.stripe.com/test_aEU2b78uMfuD6wo7ss",
    priceId: "price_1RL38ZPZo4NGp7MucFLbQ67E",
  },
  {
    id: "pro",
    price: 19,
    name: "Pro",
    desc: "For professionals and teams",
    items: [
      "Unlimited PDF summaries",
      "Priority processing",
      "24/7 priority support",
      "Markdown export",
    ],
    paymentLink: "https://buy.stripe.com/test_9AQg1X12keqzf2UfYZ",
    priceId: "price_1RL38ZPZo4NGp7MuqlyNLLVO",
  },
];

export const DEMO_SUMMARY = `
# 🌟 Meet Arman: A Promising IT Engineer of 2025! 
Arman Ajijul Shaikh is combining tech skills with social impact for a brighter future! 

# Document Details
- 📄 Type: Academic Profile
- 🎓 For: Future Employers & Educational Institutions

# Key Highlights
- 🎓 CGPA: 7.68 – A strong academic performer!
- 🏫 Class XII Score: 89% & Class X Score: 90.6% – Consistently high achiever!
- 💻 Proficient in both Front-End and Back-End Web Development – A full-stack developer!

# Why it Matters
- 🌍 Arman is not just excelling academically; he's utilizing his skills to create impactful projects like Pawsitive Paths and Hire Neu, shaping a better world for pets and job seekers alike.

# Main points
- 🔍 Main Insight: Arman is well-versed in modern tech stacks like MERN and Python for diverse projects.
- 💪 Key Strength: Strong foundation in programming languages and technologies.
- 🎯 Important Outcome: Successful project completions showcasing real-world applications.

# Pro tips
- 🚀 Stay updated with the latest tech trends to enhance your skills.
- 📚 Participate in hackathons and competitions to gain practical experience.
- 🤝 Engage in volunteer work for a well-rounded profile.

# Key terms to know
- 🐾 MERN Stack: A combination of MongoDB, Express.js, React.js, and Node.js for full-stack development.
- 📈 LSTM Model: Long Short-Term Memory model used for training machine learning tasks, especially in time series predictions.

# Bottom Line
- 🌟 Arman is a multi-talented individual ready to make a significant impact in the IT industry!`;


export const ORIGIN_URL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://sommaire-nine.vercel.app"