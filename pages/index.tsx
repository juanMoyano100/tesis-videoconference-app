import { AuthContext } from "@/contexts/AuthContext";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/dist/client/router";
import { useContext, useEffect } from 'react';

const IndexPage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      router.push('/home');
    } else {
      router.push('/login');
    }
  }, [router, session]);


  return (
    <div>
      <h1>Redireccionando...</h1>
    </div>
  );
};

export default IndexPage;
