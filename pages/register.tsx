import { Row, Col } from "react-bootstrap";
import Image from "next/image";
import image from "../public/assets/img-start.webp";
import { useRouter } from "next/router";
import RegisterForm from "@/components/RegisterForm";

const RegisterPage: React.FC = () => {

    return (
        <div style={{ background: "#002856", padding: "10%", height: "100vh" }}>
            <Row className="h-100" style={{ background: "#e5e0e0", borderRadius: "5px" }}>
                <Col md={6} sm={12} className="p-0" >
                    <Image src={image} alt="login" className="img-fluid"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                </Col>
                <Col>
                    <RegisterForm />
                </Col>
            </Row>
        </div>
    );
};

export default RegisterPage;
