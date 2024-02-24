import Image from "next/image";
import officeWorkingPeople from "@/assets/images/officeWorkingPeople.webp";
import socialResponsibility from "@/assets/images/socialResponsibility.webp";
import globeImage from "@/assets/images/globeImage.webp";
import type { SelectEmployee } from "@/lib/db/schema/roleBased/employees";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";

type EmployeeDataProps = {
  Employee: SelectEmployee;
};

export default function EmployeeData({ Employee }: EmployeeDataProps) {
  return (
    <>
      <div>
        <h1 className="text-center bg-clip-text text-transparent bg-gradient-to-b selection:text-foreground from-[#6FEE8D] to-[#0e7139] text-2xl sm:text-3xl md:text-4xl lg:text-5xl mr-16">
          Welcome!
        </h1>
        <div className="relative flex flex-col w-full min-w-0 mb-6 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30 draggable">
          <div className="px-9 pt-9 flex-auto min-h-[70px] pb-0 bg-transparent">
            <div className="flex flex-wrap mb-6 xl:flex-nowrap">
              <div className="mb-5 mr-5">
                <div className="relative inline-block shrink-0 rounded-2xl">
                  <Image
                    width={80}
                    height={80}
                    className="inline-block shrink-0 rounded-2xl lg:w-[160px] lg:h-[160px]"
                    src={
                      "https://lh3.googleusercontent.com/a/ACg8ocKf4OFSZ0LEnFJqY4rzJ7N2TUIPGjxNZY1PpQ5K9XdJ=s96-c"
                    }
                    alt="Profile pic"
                  />
                  <div className="group/tooltip relative">
                    <span className="w-[15px] h-[15px] absolute bg-success rounded-full bottom-0 end-0 -mb-1 -mr-2  border border-white"></span>
                    <span className="text-xs absolute z-10 transition-opacity duration-300 ease-in-out px-3 py-2 whitespace-nowrap text-center transform bg-zinc-600 rounded-2xl shadow-sm bottom-0 -mb-2 start-full ml-4 font-medium text-secondary-inverse group-hover/tooltip:opacity-100 opacity-0 block">
                      Status: Active
                    </span>
                  </div>
                </div>
              </div>
              <div className="grow">
                <div className="flex flex-wrap items-start justify-between mb-2">
                  <div className="flex flex-col">
                    <div className="flex items-center mb-2">
                      <a
                        className="text-secondary-inverse hover:text-primary transition-colors duration-200 ease-in-out font-semibold text-[1.5rem] mr-1"
                        href="javascript:void(0)"
                      >
                        Aman Nambisan
                      </a>
                    </div>
                    <div className="flex flex-wrap pr-2 mb-4 font-medium">
                      <a
                        className="flex items-center mb-2 mr-5 text-secondary-dark hover:text-primary"
                        href="javascript:void(0)"
                      >
                        <span className="mr-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </span>
                        Mumbai, Maharashtra
                      </a>
                      <a
                        className="flex items-center mb-2 mr-5 text-secondary-dark hover:text-primary"
                        href="javascript:void(0)"
                      >
                        <span className="mr-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-5 h-5"
                          >
                            <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                            <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                          </svg>
                        </span>
                        aman2003nambisan@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex flex-wrap my-auto gap-4">
                    <Button color="danger">Edit</Button>
                    <Button color="primary" variant="faded">
                      View more
                    </Button>
                  </div>
                </div>
                <div className="flex flex-wrap justify-between">
                  <div className="flex flex-wrap items-center mx-4 gap-x-4">
                    <Chip color="success" variant="shadow">
                      HR
                    </Chip>
                    <Chip color="success" variant="shadow">
                      Head
                    </Chip>
                    <Chip color="success" variant="shadow">
                      3 Years experience
                    </Chip>
                  </div>
                </div>
              </div>
            </div>
            <hr className="w-full h-px border-neutral-200" />
            <ul
              nav-tabs
              className="group flex flex-wrap items-stretch text-[1.15rem] font-semibold list-none border-b-2 border-transparent border-solid active-assignments"
            >
              <li className="flex mt-2 -mb-[2px]">
                <a
                  aria-controls="assignments"
                  className="py-5 mr-1 sm:mr-3 lg:mr-10 transition-colors duration-200 ease-in-out border-b-2 border-transparent group-[.active-assignments]:border-primary group-[.active-assignments]:text-primary text-muted hover:border-primary"
                >
                  Summary of profile
                </a>
              </li>
              <li className="flex mt-2 -mb-[2px]">
                <a
                  aria-controls="summary"
                  className="py-5 mr-1 sm:mr-3 lg:mr-10 transition-colors duration-200 ease-in-out border-b-2 border-transparent group-[.active-summary]:border-primary group-[.active-summary]:text-primary text-muted hover:border-primary"
                >
                  Work done
                </a>
              </li>
              <li className="flex mt-2 -mb-[2px] group">
                <a
                  aria-controls="history"
                  className="py-5 mr-1 sm:mr-3 lg:mr-10 transition-colors duration-200 ease-in-out border-b-2 border-transparent group-[.active-history]:border-primary group-[.active-history]:text-primary text-muted hover:border-primary"
                >
                  History
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center mb-2 mt-10 dark:from-[#00b7fa] dark:to-[#01cfea] from-[#5EA2EF] to-[#0072F5] bg-clip-text text-transparent bg-gradient-to-b selection:text-foreground">
        Here are some fun facts about your company!
      </h1>
      <section className="flex justify-center">
        <div className="flex flex-wrap mx-auto md:flex-nowrap p-12 sm:max-w-md md:max-w-none">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.tcs.com/what-we-do/services/data-and-analytics"
          >
            <div className="flex w-full">
              <div className="relative flex flex-col items-start m-1 transition duration-300 ease-in-out delay-150 transform bg-white shadow-2xl rounded-xl md:w-80 md:-ml-16 md:hover:-translate-x-16 md:hover:-translate-y-8">
                <Image
                  height={192}
                  width={144}
                  className="object-cover object-center w-full rounded-t-xl"
                  src={officeWorkingPeople}
                  alt="People working at office"
                />
                <div className="px-6 py-8">
                  <h4 className="mt-4 text-2xl font-semibold text-neutral-600">
                    <span className="font-bold">Size and Workforce:</span>
                  </h4>
                  <p className="mt-4 text-base font-normal text-gray-500 leading-relax">
                    TCS is one of the largest IT services companies globally. It
                    has a large and diverse workforce, with employees from
                    different nationalities.
                  </p>
                </div>
              </div>
            </div>
          </a>

          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.tcs.com/who-we-are/tcs-sustainable-business-carbon-neutrality"
          >
            <div className="flex w-full">
              <div className="relative flex flex-col items-start m-1 transition duration-300 ease-in-out delay-150 transform bg-white shadow-2xl rounded-xl md:w-80 md:-ml-16 md:hover:-translate-x-16 md:hover:-translate-y-8">
                <Image
                  height={192}
                  width={144}
                  className="object-cover object-center w-full rounded-t-xl lg:h-48 md:h-36"
                  src={socialResponsibility}
                  alt="Social responsibility"
                />
                <div className="px-6 py-8">
                  <h4 className="mt-4 text-2xl font-semibold text-neutral-600">
                    <span className="font-bold">
                      Corporate Social Responsibility (CSR):
                    </span>
                  </h4>
                  <p className="mt-4 text-base font-normal text-gray-500 leading-relax">
                    Like many Tata Group companies, TCS is involved in various
                    corporate social responsibility initiatives, contributing to
                    education, healthcare, and community development.
                  </p>
                </div>
              </div>
            </div>
          </a>

          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.tcs.com/what-we-do/services/consulting/solution/finance-and-global-shared-services-transformation"
          >
            <div className="flex w-full">
              <div className="relative flex flex-col items-start m-1 transition duration-300 ease-in-out delay-150 transform bg-white shadow-2xl rounded-xl md:w-80 md:-ml-16 md:hover:-translate-x-16 md:hover:-translate-y-8">
                <Image
                  height={192}
                  width={144}
                  className="object-cover object-center w-full rounded-t-xl lg:h-48 md:h-36"
                  src={globeImage}
                  alt="Globe image of earth"
                />
                <div className="px-6 py-8">
                  <h4 className="mt-4 text-2xl font-semibold text-neutral-600">
                    <span className="font-bold">Global Presence:</span>
                  </h4>
                  <p className="mt-4 text-base font-normal text-gray-500 leading-relax">
                    TCS has strategically expanded its reach through a network
                    of offices and delivery centers, allowing it to engage with
                    clients on a global scale and provide on-site, nearshore,
                    and offshore solutions.
                  </p>
                </div>
              </div>
            </div>
          </a>
        </div>
      </section>
    </>
  );
}
