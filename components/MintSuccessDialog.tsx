'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

export default function MintSuccessDialog({ isOpen, onClose, uri }: { isOpen: boolean; onClose: () => void; uri: string }) {
    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog onClose={onClose} className="relative z-50">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-6 shadow-lg text-center">
                        <Dialog.Title className="text-lg font-bold">🎉 Mint Successful!</Dialog.Title>
                        <p className="mt-2 text-sm text-gray-700">Your comic NFT has been minted.</p>
                        <a
                            href={`https://ipfs.io/ipfs/${uri.split('ipfs://')[1]}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-block text-blue-600 underline"
                        >
                            View NFT Metadata
                        </a>
                        <button
                            onClick={onClose}
                            className="mt-6 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                        >
                            Close
                        </button>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </Transition>
    );
}
