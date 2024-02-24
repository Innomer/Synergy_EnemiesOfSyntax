"use client";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import  ActionSectionWrapper from "./hoc";

function FAQSection() {
  const faqContent = [
    {
      title: "What is your company all about?",
      subtitle: "Company Overview",
      content:
        "Our company is dedicated to providing innovative solutions for various industries. We focus on creating cutting-edge technologies to improve efficiency and user experiences.",
    },
    {
      title: "How can I contact customer support?",
      subtitle: "Contacting Support",
      content:
        "You can reach our customer support team by email at support@yourcompany.com or by phone at +123-456-7890. We're here to assist you with any questions or issues you may have.",
    },
    {
      title: "Do you offer a money-back guarantee?",
      subtitle: "Money-Back Guarantee",
      content:
        "Yes, we offer a 30-day money-back guarantee on all our products. If you're not satisfied with your purchase, please contact our support team for a refund.",
    },
    {
      title: "Are there any special requirements to use your services?",
      subtitle: "System Requirements",
      content:
        "The specific requirements for using our services may vary depending on the product. However, most of our solutions are user-friendly and compatible with common hardware and software. Please check the product documentation for details.",
    },
    {
      title: "What payment methods do you accept?",
      subtitle: "Accepted Payment Methods",
      content:
        "We accept major credit cards, PayPal, and bank transfers for payments. You can choose the payment method that is most convenient for you during the checkout process.",
    },
    {
      title: "Is my personal information secure with you?",
      subtitle: "Data Security and Privacy",
      content:
        "Yes, we take data security and privacy seriously. We have robust measures in place to protect your personal information. You can learn more about our data security practices in our privacy policy.",
    },
    {
      title: "How can I get updates on your products and services?",
      subtitle: "Receiving Updates",
      content:
        "You can subscribe to our newsletter to receive updates on new products, features, and promotions. You can also follow us on social media for the latest news and announcements.",
    },
    {
      title: "Do you offer discounts for non-profit organizations?",
      subtitle: "Non-Profit Discounts",
      content:
        "Yes, we have special pricing and discounts for non-profit organizations. Contact our sales team to learn more about our non-profit programs.",
    },
  ];

  return (
    <>
      <div className="text-center">
        <h1 className="text-4xl">Still confused?</h1>
        <p className="lg:w-full md:w-1/2 my-2 text-1xl lg:text-2xl text-default-500 block max-w-full">
          Here are some frequently asked questions
        </p>
      </div>
      <div className=" gap-4 mt-16 px-6">
        <Accordion
          variant="splitted"
          fullWidth={false}
          className="grid sm:grid-cols-1 md:grid-cols-2 gap-2"
          selectionMode="multiple"
        >
          {faqContent.map((faq) => (
            <AccordionItem
              key={faq.title}
              aria-label={faq.title}
              subtitle={faq.subtitle}
              title={faq.title}
            >
              {faq.content}
          </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  );
}

export default ActionSectionWrapper(FAQSection, "FAQ", 0.5);
