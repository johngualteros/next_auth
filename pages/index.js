import { useSession,getSession,signOut } from "next-auth/react";
import { useRouter } from "next/router";

export default function HomePage({user}) {
  const { push } = useRouter();
  // Get session method
  // const [user, setUser] = useState(null);

  // useEffect(()=>{
  //   (async()=>{
  //     const session = await getSession();
  //     setUser(session.user);
  //   })();
  // },[]);

  //use session method
  // const { data: session, status } = useSession();

  // if (status === "loading") {
  //   return <div>Loading...</div>;
  // }
  // if (status === "unauthenticated") {
  //   return push("/login");
  // }

  return (
    <div>
      {user ? (
        <>
          <img
            src={user.image}
            alt={user.name}
            width={80}
            height={80}
          />
          <h1>Welcome {user.name}</h1>
          <p>Your email is: {user.email}</p>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <>
          <h1>Welcome</h1>
        </>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if(!session){
    return{
      redirect: {
        destination: "/login",
        permanent: false
      }
    }
  }
  return {
    props: {
      user: session.user,
    }
  };
}
/**
 * This is the getServerSideProps function.
 * It is called on server-side and on client-side.
 * It is used to fetch data from the server.
 * It is called before the page is rendered.
 */
// export const getServerSideProps=async(context)=>{
//   const session = await getSession(context);
//   return {
//     props:{
//       user:session.user
//     }
//   }
// }
