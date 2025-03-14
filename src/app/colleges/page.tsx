import { PageHeader } from "@/components/page-header"
import { CollegeCard } from "@/components/college-card"

export default function MemberCollegesPage() {
  const colleges = [
    {
      name: "Sahyadri Open Source Community (SOSC)",
      college: "Sahyadri College of Engineering & Management",
      description:
        "A student-driven open source community focused on promoting open source culture and fostering technical growth through workshops, events, and projects.",
      logo: "/images/colleges/sosc-logo.svg",
      representatives: [{ name: "Suhan Acharya", role: "Community Lead", email: "suhan@sosc.org.in" }],
      website: "https://sosc.org.in",
    },
    {
      name: "DevNation",
      college: "NMAM Institute of Technology",
      description:
        "A community of developers working on innovative projects and organizing technical events to enhance coding skills and promote collaboration.",
      logo: "/images/colleges/devnation-logo.svg",
      representatives: [{ name: "Rakshith Shetty", role: "Community Lead", email: "rakshith@devnation.org" }],
      website: "https://devnation.org",
    },
    {
      name: "FiniteLoop",
      college: "NMIT Bangalore",
      description:
        "A coding community focused on algorithmic problem solving, competitive programming, and building practical applications.",
      logo: "/images/colleges/finiteloop-logo.svg",
      representatives: [{ name: "Priya Sharma", role: "Community Lead", email: "priya@finiteloop.club" }],
      website: "https://finiteloop.club",
    },
    {
      name: "Sceptix",
      college: "St Joseph Engineering College",
      description:
        "A technical club that organizes workshops, hackathons, and technical competitions to enhance students' technical skills.",
      logo: "/images/colleges/sceptix-logo.svg",
      representatives: [{ name: "Aditya Nayak", role: "Community Lead", email: "aditya@sceptix.org" }],
      website: "https://sceptix.org",
    },
    {
      name: "SSOSC",
      college: "Shri Madhwa Vadiraja Institute of Technology",
      description:
        "A student-run open source community that promotes open source contribution and technical skill development.",
      logo: "/images/colleges/ssosc-logo.svg",
      representatives: [{ name: "Karthik Rao", role: "Community Lead", email: "karthik@ssosc.in" }],
      website: "https://ssosc.in",
    },
    {
      name: "CoRE",
      college: "Canara Engineering College",
      description:
        "Community of Research and Engineering that focuses on research-oriented projects and technical skill enhancement.",
      logo: "/images/colleges/core-logo.svg",
      representatives: [{ name: "Nikhil Kumar", role: "Community Lead", email: "nikhil@core-cec.org" }],
      website: "https://core-cec.org",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <PageHeader title="Member Colleges" description="Meet the founding college communities that form DK24" />

      <div className="grid md:grid-cols-2 gap-8 mt-12">
        {colleges.map((college, index) => (
          <CollegeCard key={index} college={college} />
        ))}
      </div>
    </div>
  )
}

