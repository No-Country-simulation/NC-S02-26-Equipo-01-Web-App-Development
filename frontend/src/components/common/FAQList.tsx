import type { FAQItemProps } from "@/types";
import FAQItem from "@components/common/FAQItem";

const FAQList = ({ FAQs }: { FAQs: FAQItemProps[] }) => {
  return (
    <ul className="space-y-5 mt-4 mb-14 min-w-82 max-w-125 mx-auto">
      {FAQs.length ? (
        FAQs.map((faq, index) => <FAQItem key={index} {...faq} />)
      ) : (
        <div className="text-center">No content available</div>
      )}
    </ul>
  );
};

export default FAQList;
