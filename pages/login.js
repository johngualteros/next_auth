import { signIn,useSession,getProviders } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
export default function Login() {
  const {push} = useRouter();
  const {data:session, status} = useSession();

  useEffect(()=>{
    (async()=>{
      const providers = await getProviders();
      console.log(providers);
    })();
  },[])
  if(status !== "loading" && status === 'authenticated'){
    push('/');
  }
  return (
    <div>
      <h1>Login</h1>
      {/* <Link href="/api/auth/signin/github"> */}
      <button onClick={() => signIn('github')}>Sign in with github</button>
      {/* </Link> */}
    </div>
  );
}
