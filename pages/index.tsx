import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/dist/client/router";
import { useContext, useEffect } from 'react';

const IndexPage = () => {
  const router = useRouter();
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (authContext.isLoggedIn) {
      router.push('/home');
    } else {
      router.push('/login');
    }    
  }, [authContext]);

  return (
    <div>
      <h1>Redireccionando...</h1>
    </div>
  );
};

export default IndexPage;
