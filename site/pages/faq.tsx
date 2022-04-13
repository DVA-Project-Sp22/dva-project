import { Disclosure } from "@headlessui/react"
import { ChevronDownIcon } from '@heroicons/react/outline'

const faqs = [
  {
    question: "How does this work?",
    answer:
      "Insert explanation here",
  },
  {
    question: "What technologies were used for this project?",
    answer:
      "We used Next.js, React, and Chart.js to build the frontend. There is an extensive data backend that uses many AWS products, such as S3, Lambda, and SQS. This site is hosted on Netlify.",
  },
  {
    question: "Where can I see all the generated playlists?",
    answer:
      "Add link to generated playlists",
  },
  {
    question: "This is cool - can I clone this?",
    answer:
      "Unfortunately, this repository is closed-source and not available to the general public.",
  },
  {
    question: "Why can't I use my Spotify account?",
    answer:
      "To limit our general project scope, we have decided to use a separate account for this project as this project is mainly proof-of-concept.",
  },
  // More questions...
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function FAQ() {
  return (
    <div className="w-full h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto divide-y-2 divide-gray-200">
          <h2 className="text-center text-3xl font-extrabold text-gray-900 sm:text-4xl">Frequently asked questions</h2>
          <dl className="mt-6 space-y-6 divide-y divide-gray-200">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt className="text-lg">
                      <Disclosure.Button className="text-left w-full flex justify-between items-start text-gray-400">
                        <span className="font-medium text-gray-900">{faq.question}</span>
                        <span className="ml-6 h-7 flex items-center">
                          <ChevronDownIcon
                            className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-6 w-6 transform')}
                            aria-hidden="true"
                          />
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-base text-gray-500">{faq.answer}</p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}