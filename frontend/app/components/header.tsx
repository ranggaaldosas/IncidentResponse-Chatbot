"use client";

import Image from "next/image";

const teamMembers = [
  { id: 1, name: "Wisnuyasha Faizal", img: "/inu.jpeg", number: "5027211036" },
  { id: 2, name: "Rangga Aldo Sastrowardoyo", img: "/rangga.png", number: "5027211059" },
  { id: 3, name: "Dzakirozaan Uzlahwasata", img: "/dzaki.png", number: "5027211066" },
];

export default function Header() {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex items-center justify-center font-nunito text-lg font-bold gap-2 mb-4">
        <span>Team Members - Kelompok 5 Manajemen Insiden</span>
        <Image
          className="rounded-xl"
          src="/group5.jpeg"
          alt="Group Logo"
          width={40}
          height={40}
          priority
        />
      </div>
      <div className="w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        {teamMembers.map((member) => (
          <div key={member.id} className="p-4 border-b dark:border-gray-700">
            <Image
              className="rounded-full"
              src={member.img}
              alt={member.name}
              width={40}
              height={40}
            />
            <div>
              <span className="font-bold">{member.name}</span>
              <div className="mt-2 text-sm">
                <p>NRP: {member.number}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
