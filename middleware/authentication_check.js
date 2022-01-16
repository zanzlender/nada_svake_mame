import { useRouter } from "next/router";
import { useAuthContext } from "lib/Firebase/AuthProvider";

const isLoggedIn = (WrappedComponent) => {
  return (props) => {
    // checks whether we are on client / browser or server.
    if (typeof window !== "undefined") {
      const currentUser = useAuthContext();
      const router = useRouter();

      if (currentUser?.currentUser == null) {
        router.replace("/auth/login");
        console.log(currentUser);
      } else {
        return <WrappedComponent {...props} />;
      }
    }
    // If we are on server, return null
    return null;
  };
};

export default isLoggedIn;
