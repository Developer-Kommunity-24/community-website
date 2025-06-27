import { PageHeader } from "@/components/page-header"
import { CollegeCard } from "@/components/college-card"
import { colleges } from "@/constants/member-colleges"

export default function MemberCollegesPage() {
  return (
    <div className="container mx-auto px-6 py-12 max-w-7xl">
      <PageHeader
        title="Member Colleges"
        description="Meet the founding college communities that form DK24"
      />

      <div className="grid md:grid-cols-2 gap-12 mt-12">
        {colleges.map((college, index) => (
          <CollegeCard key={index} college={college} />
        ))}
      </div>
    </div>
  )
}
