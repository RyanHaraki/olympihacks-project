import React, { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b border-gray-200 border-solid">
      <nav
        className="mx-auto flex  items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Exclusive</span>
            <img className="h-8 w-auto" src="./logo.svg" alt="logo" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-500"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            {!mobileMenuOpen && (
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center space-x-4">
          <a
            href="/dashboard/responses"
            className=" block rounded-lg px-3 py-1 font-semibold leading-7 text-gray-500 hover:bg-gray-50"
          >
            Responses
          </a>
          <a
            href="/dashboard/reward"
            className=" block rounded-lg px-3 py-1 font-semibold leading-7 text-gray-500 hover:bg-gray-50"
          >
            Reward
          </a>
          <a
            href="/dashboard"
            className=" block rounded-lg px-3 py-1 font-semibold leading-7 text-gray-500 hover:bg-gray-50"
          >
            Dashboard
          </a>
          <UserButton />
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="bg-white fixed inset-y-0 right-0 z-10 w-full overflow-y-auto px-6 py-6 sm:max-w-sm sm:ring-1">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Exclusive</span>
              <img className="h-8 w-auto" src="./logo.svg" alt="logo" />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              {mobileMenuOpen && (
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
          <div className="mt-12 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <a
                  href="/dashboard"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-500 hover:bg-gray-50
                  "
                >
                  Dashboard
                </a>

                <UserButton />
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
