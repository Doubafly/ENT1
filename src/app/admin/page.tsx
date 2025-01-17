import SmallIconCard from "@/component/smallIconCard/SmallIconCard";
import UserCard from "@/component/userCard/UserCard";
import "@fortawesome/fontawesome-free/css/all.min.css";

const userData = {
  image: "/img/man2.jpg",
  nom: "Manager Dayif",
  desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus ad, exercitationem consectetur a beatae nobis culpa tenetur incidunt",
  email: "managerdayif@gmail.com",
  adresse: "Moribabougou",
  date: "Janvier 2025",
  tel: "79994640",
};

export default function HomePage() {
  return (
    <div className="w-full mt-16 gap-10 flex flex-col justify-center items-center">
      <div className="flex gap-5 min-h-[clac(100vh-100px)] items-start">
        <div className="flex flex-col gap-5 w-[600px] h-full">
          <UserCard item={userData} />
          <div className="bg-userCard h-[500px] rounded-lg"></div>
        </div>
        <div className="flex flex-col gap-5 h-full">
          <div className="flex flex-col gap-5 h-[250px]">
            <div className="flex gap-5">
              <SmallIconCard
                photoName="/icons/calendarColor.png"
                stats="90%"
                name="Présence"
              />
              <SmallIconCard
                photoName="/icons/book.png"
                stats="3"
                name="Filière"
              />
            </div>
            <div className="flex h-full gap-5">
              <SmallIconCard
                photoName="/icons/text-books.png"
                stats="10"
                name="Matière"
              />
              <SmallIconCard
                photoName="/icons/teach.png"
                stats="9"
                name="classes"
              />
            </div>
          </div>
          <div className="bg-userCard h-[500px] rounded-lg"></div>
        </div>
      </div>
      <div className="flex flex-col gap-10"></div>
    </div>
  );
}
