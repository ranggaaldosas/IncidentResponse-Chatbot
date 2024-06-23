"use client";

import Image from "next/image";

const teamMembers = [
  { id: 1, name: "Wisnuyasha Faizal", img: "/inu.jpeg", number: "5027211036" },
  {
    id: 2,
    name: "Rangga Aldo Sastrowardoyo",
    img: "/rangga.png",
    number: "5027211059",
  },
  {
    id: 3,
    name: "Dzakirozaan Uzlahwasata",
    img: "/dzaki.png",
    number: "5027211066",
  },
];

export default function Header() {
  return (
    <div className="w-fit flex flex-col items-center mt-10">
      <div className="flex items-center justify-center font-nunito text-lg font-bold gap-2 mb-4">
        <span>Kelompok 5 Manajemen Insiden</span>
        <Image
          className="rounded-xl"
          src="/group5.jpeg"
          alt="Group Logo"
          width={40}
          height={40}
          priority
        />
      </div>
      <div className="w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg team-container p-4">
        <div className="flex justify-center font-nunito text-md font-bold p-2 bg-gray-100 rounded-lg shadow-md mb-4">
          <span>Team Members</span>
        </div>
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="p-4 border-b dark:border-gray-700 team-member flex items-center gap-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-300 ease-in-out rounded-lg"
          >
            <Image
              className="rounded-full"
              src={member.img}
              alt={member.name}
              width={50}
              height={50}
            />
            <div>
              <span className="font-bold text-lg">{member.name}</span>
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                <p>NRP: {member.number}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
