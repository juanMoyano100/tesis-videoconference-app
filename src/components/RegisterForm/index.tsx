import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import styles from './style.module.css'


const RegisterForm: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Por favor ingrese todos los campos")
            return;
        }
        setIsLoading(true)
        try {
            const res = await fetch('api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })
            if (res.ok) {
                const form = e.target as HTMLFormElement;
                setIsLoading(false)
                setError("")
                form.reset();
            }
        } catch (error: any) {
            setError(error.message);
            setIsLoading(false)
        }

    };

    return (
        <Form className={styles.login} onSubmit={handleSubmit}>
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

            <Button variant="success" className="mt-3 w-100" type="submit"
                disabled={isLoading}
            >
                Registrar
            </Button>
        </Form>
    );
};

export default RegisterForm;
