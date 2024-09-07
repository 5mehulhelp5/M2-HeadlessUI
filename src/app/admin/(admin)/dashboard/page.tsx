import UserInformation from "@/components/admin/page/userInformation";
export default async function Dashboard() {
  return (
    <>
      <div className="container max-h-full flex flex-col justify-center items-center my-10">
        <UserInformation />
      </div>
    </>
  )
}
