"use client";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import styles from "./style.module.css";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res && res.error) {
        setError("Invalid credentials");
        return;
      }
      setLoading(false);
      router.push("/");
    } catch (error: any) {
      setError(error.message);
    }
    // onSubmit(email, password);
  };

  return (
    <Form className={styles.login} onSubmit={handleSubmit}>
      <div>
        <Image
          src="/banner.png"
          width={300}
          height={100}
          className="d-inline-block align-top"
          alt="Logo"
        />
      </div>
      <Form.Group className="mt-3" controlId="formBasicEmail">
        <Form.Label>Correo electrónico</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mt-3" controlId="formBasicPassword">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      {error && <p className="text-danger">{error}</p>}
      <Button
        variant="success"
        className="mt-3 w-100"
        type="submit"
        disabled={loading}
      >
        Login
      </Button>
    </Form>
  );
};

export default LoginForm;
