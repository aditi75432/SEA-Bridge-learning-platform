"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"

export function UserDashboard() {
  const { data: session, status } = useSession()
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    async function fetchUserProfile() {
      if (status === "authenticated" && session?.user?.id) {
        try {
          const response = await fetch("/api/user/profile")
          if (response.ok) {
            const data = await response.json()
            setProfile(data)
          } else {
            toast({
              title: "Error",
              description: "Failed to load profile data",
              variant: "destructive",
            })
          }
        } catch (error) {
          console.error("Error fetching profile:", error)
        } finally {
          setLoading(false)
        }
      } else if (status !== "loading") {
        setLoading(false)
      }
    }

    fetchUserProfile()
  }, [session, status, toast])

  if (status === "loading" || loading) {
    return <UserDashboardSkeleton />
  }

  if (status === "unauthenticated") {
    return (
      <Card>
        <CardHeader>
          <CardTitle>User Dashboard</CardTitle>
          <CardDescription>Please sign in to view your dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <a href="/auth/signin">Sign In</a>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || "User"} />
            <AvatarFallback>{session?.user?.name?.[0] || "U"}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{session?.user?.name}</CardTitle>
            <CardDescription>{session?.user?.email}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="profile">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="learning">Learning</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="profile" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium">Country</h3>
                <p>{profile?.user?.country || "Not specified"}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Preferred Language</h3>
                <p>{profile?.user?.preferredLanguage || "Not specified"}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Region</h3>
                <p>{profile?.user?.region || "Not specified"}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Age Group</h3>
                <p>{profile?.user?.ageGroup || "Not specified"}</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="learning" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium">Learning Style</h3>
                <p>
                  {profile?.learningProfile?.learningStyle
                    ? `Visual: ${Math.round(profile.learningProfile.learningStyle.visual * 100)}%, 
                       Auditory: ${Math.round(profile.learningProfile.learningStyle.auditory * 100)}%, 
                       Kinesthetic: ${Math.round(profile.learningProfile.learningStyle.kinesthetic * 100)}%`
                    : "Not assessed yet"}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Completed Courses</h3>
                <p>{profile?.learningProfile?.completedCourses?.length || 0} courses</p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Total Points</h3>
                <p>{profile?.learningProfile?.totalPoints || 0} points</p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Current Streak</h3>
                <p>{profile?.learningProfile?.streak || 0} days</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="settings" className="space-y-4 pt-4">
            <Button variant="outline">Edit Profile</Button>
            <Button variant="outline">Change Password</Button>
            <Button variant="outline">Notification Settings</Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

function UserDashboardSkeleton() {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Skeleton className="h-16 w-16 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Skeleton className="h-10 w-full" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
