import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ProfileContent from "@/components/ProfileContent";

const ProfilePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  return <ProfileContent />;
};

export default ProfilePage;
