import { CommunityCard } from "@/components/community-card";
import { PageHeader } from "@/components/page-header";
import { communities } from "@/constants/member-colleges";

export default function MemberCollegesPage() {
	return (
		<div className="container mx-auto px-6 py-12 max-w-7xl">
			<PageHeader
				title="Member Communities"
				description="Meet the founding communities that form DK24"
			/>

			<div className="grid md:grid-cols-2 gap-12 mt-12">
				{communities.map((community, index) => (
					<CommunityCard key={index} community={community} />
				))}
			</div>
		</div>
	);
}
