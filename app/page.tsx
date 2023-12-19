import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import axios from "axios";
import { redirect } from "next/navigation";

const Home = async () => {
  const user = await currentUser(); //
  // console.log(user)
  if (!user) {
    return redirectToSignIn();
  }
  try {
    console.log(`${process.env.NEXT_PUBLIC_URL}/api/bio/${user.username}`);
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/api/bio/${user.username}`
    );
  } catch (error) {
    console.log(error)
    return redirect(`/signup-next`);
  }
return redirect(`/dashboard`);
};

export default Home;
