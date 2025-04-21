import { useEffect, useState } from "react";
import { auth, db } from "../Firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Alert, Spinner, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ReqProfCreate = ({ children }) => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setUserRole("unauthorized");
        setLoading(false);
        return;
      }

      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists() && userSnap.data().role === "teacher") {
          setUserRole("teacher");
        } else {
          setUserRole("unauthorized");
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
        setUserRole("unauthorized");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">{t("reqProf.loading")}</span>
        </Spinner>
      </Container>
    );
  }

  if (userRole !== "teacher") {
    return (
      <Container className="mt-4">
        <Alert variant="danger" dismissible>
          <Alert.Heading>{t("reqProf.accessDenied")}</Alert.Heading>
          <p>{t("reqProf.errorMessage")}</p>
          <Button onClick={() => navigate("/Contact")} variant="dark">
            {t("reqProf.contactButton")}
          </Button>
        </Alert>
      </Container>
    );
  }

  return <>{children}</>;
};

export default ReqProfCreate;