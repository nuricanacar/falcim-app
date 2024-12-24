import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Bars3Icon, BellIcon, QuestionMarkCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'


const solutions = [
  { name: 'Fal 1 Bakıldı', href: '#' },
  { name: 'Bildirim', href: '#' },
  { name: 'Bildirim', href: '#' },
  { name: 'Integrations', href: '#' },
  { name: 'Automations', href: '#' },
  { name: 'Reports', href: '#' },
]

export default function Example() {
  return (
    <Popover className="relative">
      <Popover.Button     type="button"
        className="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
    
        <span className="sr-only">View notifications</span>
        <BellIcon className="h-6 w-6" aria-hidden="true" />
      </Popover.Button>

     

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-min -translate-x-1/2 px-4">
          <div className="w-80 shrink rounded-xl bg-white p-4 text-sm  leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5">
            {solutions.map((item) => (
              <a key={item.name} href={item.href} className="block p-2 hover:text-indigo-600 hover:bg-gray-100 rounded-lg">
                {item.name}
              </a>
            ))}
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
