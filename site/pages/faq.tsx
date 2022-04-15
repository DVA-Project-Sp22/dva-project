import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/outline'

const faqs = [
  {
    question: 'How does this work?',
    answer: 'Insert explanation here',
  },
  {
    question: 'What technologies were used for this project?',
    answer:
      'We used Next.js, React, and Chart.js to build the frontend. There is an extensive data backend that uses many AWS products, such as S3, Lambda, and SQS. This site is hosted on Netlify.',
  },
  {
    question: 'Where can I see all the generated playlists?',
    answer:
      "Feel free to see all playlists <a class='text-semibold text-indigo-600' href='https://open.spotify.com/user/31wmtolxvqyrmcnqyywrmpcnlvrq'>here</a>.",
  },
  {
    question: 'This is cool - can I clone this?',
    answer:
      "Yes! Go to <a class='text-semibold text-indigo-600' href='https://github.com/DVA-Project-Sp22/dva-project'>this Github repository</a> and clone it. You will need to follow the README instructions to get things working locally, though.",
  },
  {
    question: "Why can't I use my Spotify account on this website?",
    answer:
      'To limit our general project scope, we have decided to use a separate account for this project as this project is mainly proof-of-concept. However, you can clone this project and use your Spotify account to generate playlists.',
  },
  // More questions...
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function FAQ() {
  return (
    <div className="h-screen w-full">
      <div className="mx-auto max-w-7xl py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl divide-y-2 divide-gray-200">
          <h2 className="text-center text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Frequently asked questions
          </h2>
          <dl className="mt-6 space-y-6 divide-y divide-gray-200">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt className="text-lg">
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-400">
                        <span className="font-medium text-gray-900">
                          {faq.question}
                        </span>
                        <span className="ml-6 flex h-7 items-center">
                          <ChevronDownIcon
                            className={classNames(
                              open ? '-rotate-180' : 'rotate-0',
                              'h-6 w-6 transform'
                            )}
                            aria-hidden="true"
                          />
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p
                        className="text-base text-gray-500"
                        dangerouslySetInnerHTML={{ __html: faq.answer }}
                      />
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
