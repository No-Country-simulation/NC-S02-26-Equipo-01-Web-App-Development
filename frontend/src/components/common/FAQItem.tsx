import type { FAQItemProps } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const FAQItem: React.FC<FAQItemProps> = ({ id, question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <li key={id} className="mb-2 max-w-125 md:w-125 lg:w-125 w-full ">
      <div className="w-full text-black border-b border-black">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="w-full p-3 flex justify-between items-center cursor-pointer text-left"
        >
          <span className="text-sm font-bold px-3">{question}</span>

          <motion.svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </motion.svg>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              className="overflow-hidden"
            >
              <div className="p-4 pl-6 text-sm text-left text-balance">
                <p>{answer}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </li>
  );
};

export default FAQItem;
