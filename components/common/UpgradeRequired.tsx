import React from "react";
import BgGradient from "./BgGradient";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

const UpgradeRequired = () => {
  return (
    <div className="relative min-h-[50vh] ">
      <BgGradient />
      <div className="container px-8 py-16">
        <div className="flex flex-col items-center justify-center gap-8 text-center max-w-2xl mx-auto">
          <div className="flex items-center gap-2 text-rose-500">
            <Sparkles className="w-6 h-6" />
            <span className="text-sm uppercase font-medium tracking-wider">
              Premium Feature
            </span>
          </div>

          <h1 className="text-4xl  font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 text-transparent bg-clip-text">
            Subscription Required
          </h1>
          <p className="text-lg leading-8 text-gray-600 border-2 border-rose-200 bg-white/50 backdrop-blur-xs rounded-lg p-6 border-dashed max-w-xl mx-auto">
            You need to upgrade to the basic plan or pro plan to access this
            feature
          </p>
          <Button
            className="bg-linear-to-r from-rose-500 to-rose-700 text-white"
            asChild
          >
            <Link href={"/#pricing"} className="flex gap-2 items-center">
              View Pricing Plans
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpgradeRequired;
