import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import styles from './style.module.css'

interface RegisterFormProps {
    onSubmit: (email: string, password: string) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("")

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Por favor ingrese todos los campos")
            return;
        }

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
                form.reset();

            }
        } catch (error: any) {
            setError(error.message);
        }

        // onSubmit(email, password);
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

            <Button variant="success" className="mt-3 w-100" type="submit">
                Login
            </Button>
        </Form>
    );
};

export default RegisterForm;
