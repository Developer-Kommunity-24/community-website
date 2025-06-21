import { PageHeader } from "@/components/page-header"
import { JoinForm } from "@/components/join-form"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function JoinUsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <PageHeader
        title="Join DK24"
        description="Be a part of the growing tech ecosystem in Mangalore"
      />

      <div className="mt-12">
        <Tabs defaultValue="individual">
          <TabsList className="grid w-full md:w-auto grid-cols-2">
            <TabsTrigger value="individual">Join as an Individual</TabsTrigger>
            <TabsTrigger value="college">Join as a College</TabsTrigger>
          </TabsList>

          <TabsContent value="individual" className="mt-6">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Join as an Individual</CardTitle>
                  <CardDescription>
                    Students and professionals can join DK24 to contribute,
                    learn, and grow with the community
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Benefits of Joining</h3>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                      <li>
                        Access to a network of tech enthusiasts across colleges
                      </li>
                      <li>
                        Opportunities to work on real-world collaborative
                        projects
                      </li>
                      <li>Mentorship from industry professionals</li>
                      <li>Exclusive workshops and learning resources</li>
                      <li>
                        Recognition for your contributions to the community
                      </li>
                    </ul>

                    <h3 className="text-lg font-medium mt-6">Who Can Join</h3>
                    <p className="text-muted-foreground">
                      We welcome students from any college in Mangalore, as well
                      as working professionals who want to contribute as
                      mentors. If you&apos;re passionate about technology and
                      community building, DK24 is the right place for you!
                    </p>
                  </div>
                </CardContent>
              </Card>

              <JoinForm type="individual" />
            </div>
          </TabsContent>

          <TabsContent value="college" className="mt-6">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Join as a College Community</CardTitle>
                  <CardDescription>
                    Bring your college&apos;s tech community into the DK24
                    network
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Benefits of Joining</h3>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                      <li>
                        Connect your students with other college communities
                      </li>
                      <li>Access to shared resources and knowledge</li>
                      <li>Collaborative events and initiatives</li>
                      <li>
                        Increased visibility for your college&apos;s tech
                        activities
                      </li>
                      <li>Support for growing your own tech community</li>
                    </ul>

                    <h3 className="text-lg font-medium mt-6">Requirements</h3>
                    <p className="text-muted-foreground">
                      To join DK24 as a college community, you should have:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                      <li>
                        An active technical community or club in your college
                      </li>
                      <li>At least one faculty coordinator</li>
                      <li>
                        A team of student leaders who can represent your
                        community
                      </li>
                      <li>
                        Willingness to participate in collaborative initiatives
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <JoinForm type="college" />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
        <Card>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  General Inquiries
                </h3>
                <p className="text-muted-foreground mb-2">
                  For general questions about DK24:
                </p>
                <p className="font-medium">deveeshshetty@gmail.com</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  Partnership Opportunities
                </h3>
                <p className="text-muted-foreground mb-2">
                  For collaboration and partnership inquiries:
                </p>
                <p className="font-medium">deveeshshetty@gmail</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}