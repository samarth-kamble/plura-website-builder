"use client";

import React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Sparkles, Star, Zap } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { PRICING } from "@/config/pricing";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const HoverPriceCard: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  const getPlanIcon = (title: string) => {
    switch (title) {
      case "Starter":
        return <Star className="h-6 w-6 text-blue-500" />;
      case "Basic":
        return <Zap className="h-6 w-6 text-orange-500" />;
      case "Unlimited Saas":
        return <Sparkles className="h-6 w-6 text-purple-500" />;
      default:
        return <Star className="h-6 w-6" />;
    }
  };

  const isPopular = (title: string) => title === "Unlimited Saas";

  return (
    <div className="relative">
      {/* Background gradient optimized for dark themes */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/20 via-transparent to-slate-800/20 rounded-3xl -z-10" />

      <div
        className={cn(
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6"
        )}
      >
        {PRICING.map((price, idx) => (
          <motion.div
            key={idx}
            className="relative group h-full"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, delay: idx * 0.1 },
            }}
          >
            {/* Popular badge */}
            {isPopular(price.title) && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
                >
                  ⭐ Most Popular
                </motion.div>
              </div>
            )}

            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className={cn(
                    "absolute inset-0 h-full w-full rounded-2xl -z-[1] shadow-2xl border border-slate-700/50",
                    isPopular(price.title)
                      ? "bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-purple-500/30"
                      : "bg-gradient-to-br from-slate-800/60 to-slate-900/60 border-slate-600/30"
                  )}
                  layoutId="hoverBackground"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.2 },
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.95,
                    transition: { duration: 0.2 },
                  }}
                />
              )}
            </AnimatePresence>

            <Card
              className={cn(
                "w-full h-full flex flex-col justify-between relative z-10 transition-all duration-300 border",
                isPopular(price.title)
                  ? "border-purple-400/30 bg-slate-900/40 backdrop-blur-md shadow-lg shadow-purple-500/10"
                  : "border-slate-700/50 bg-slate-900/30 backdrop-blur-md hover:border-slate-600/70 hover:bg-slate-900/50",
                hoveredIndex === idx && "shadow-xl shadow-slate-900/20"
              )}
            >
              <CardHeader className="text-center pb-4">
                <motion.div
                  className="flex justify-center mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {getPlanIcon(price.title)}
                </motion.div>

                <CardTitle
                  className={cn(
                    "text-2xl font-bold",
                    isPopular(price.title) &&
                      "bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
                  )}
                >
                  {price.title}
                </CardTitle>

                <CardDescription className="text-base dark:text-slate-400 text-gray-900">
                  {price.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="text-center pb-6">
                <div className="mb-6">
                  <motion.span
                    className={cn(
                      "text-5xl font-bold",
                      isPopular(price.title) &&
                        "bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
                    )}
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: idx * 0.1 + 0.3, type: "spring" }}
                  >
                    {price.price}
                  </motion.span>

                  {price.title !== "Starter" && (
                    <span className="text-lg dark:text-slate-400 text-slate-900 ml-1">
                      /month
                    </span>
                  )}
                </div>

                <div className="space-y-3 dark:text-slate-300 text-gray-900">
                  {price.features.map((feature, featureIdx) => (
                    <motion.div
                      key={feature}
                      className="flex items-center gap-3 text-left"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: idx * 0.1 + featureIdx * 0.05 + 0.4,
                      }}
                    >
                      <CheckCircle2 className="text-green-500 h-5 w-5 flex-shrink-0" />
                      <p className="text-sm dark:text-slate-300 text-gray-900">
                        {feature}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="pt-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full"
                >
                  <Link
                    href={`/agency?plan=${price.priceId}`}
                    className={cn(
                      "w-full relative overflow-hidden group transition-all duration-300",
                      buttonVariants({
                        variant: isPopular(price.title)
                          ? "default"
                          : "secondary",
                        size: "lg",
                      }),
                      isPopular(price.title)
                        ? "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg hover:shadow-purple-500/25 border-purple-500/50"
                        : "bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-600/50 hover:border-slate-500/70"
                    )}
                  >
                    <span className="relative z-10 font-semibold">
                      Get Started
                    </span>

                    {isPopular(price.title) && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100"
                        initial={false}
                        animate={{
                          x: ["0%", "100%"],
                          transition: {
                            duration: 0.6,
                            ease: "easeInOut",
                          },
                        }}
                      />
                    )}
                  </Link>
                </motion.div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HoverPriceCard;
