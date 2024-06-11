"use client";

import { useState } from "react";
import Image from "next/image";

const teamMembers = [
  { id: 1, name: "Wisnuyasha Faizal", img: "/inu.jpeg", number: "5027211036" },
  { id: 2, name: "Rangga Aldo Sastrowardoyo", img: "/rangga.png", number: "5027211059" },
  { id: 3, name: "Dzakirozaan Uzlahwasata", img: "/dzaki.png", number: "5027211066" },
];

export default function Header() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const selectMember = (member) => {
    if (selectedMember && selectedMember.id === member.id) {
      setSelectedMember(null);
    } else {
      setSelectedMember(member);
    }
  };

  return (
    <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
      <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
        Welcome to our&nbsp;
        <code className="font-mono font-bold">Chatbot</code>
      </p>
      <div className={`fixed bottom-0 left-0 mb-4 flex h-auto w-full items-end justify-center ${dropdownVisible ? 'mb-48' : 'mb-0'} bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:w-auto lg:bg-none lg:mb-0`}>
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center justify-center font-nunito text-lg font-bold gap-2 cursor-pointer"
          >
            <span>Team Members - Kelompok 5 Manajemen Insiden</span>
            <Image
              className="rounded-xl"
              src="/group5.jpeg"
              alt="Group Logo"
              width={40}
              height={40}
              priority
            />
          </button>
          {dropdownVisible && (
            <div className="absolute mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
              {teamMembers.map((member) => (
                <div key={member.id} className="p-4 border-b dark:border-gray-700 cursor-pointer" onClick={() => selectMember(member)}>
                  <Image
                    className="rounded-full"
                    src={member.img}
                    alt={member.name}
                    width={40}
                    height={40}
                  />
                  <div>
                    <span className="font-bold">{member.name}</span>
                  </div>
                  {selectedMember && selectedMember.id === member.id && (
                    <div className="mt-2 text-sm">
                      <p>NRP: {member.number}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
