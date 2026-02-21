import type { FAQItemProps } from "@/types";

const FAQItem: React.FC<FAQItemProps> = ({ id, question, answer }) => {
  return (
    <li key={id} className="mb-2 max-w-125 md:w-125 lg:w-125 w-full ">
      <div className="w-full">
        <details className="w-full text-black">
          <summary className="p-3 border-b border-black flex justify-between items-center cursor-pointer">
            <span className="text-sm font-bold px-3">{question}</span>
            <span className="ml-2">
              <svg
                className="w-4 h-4 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </span>
          </summary>
          <div className="p-4 pl-6 text-sm text-left text-balance">
            <p>{answer}</p>
          </div>
        </details>
      </div>
    </li>
  );
};

export default FAQItem;
