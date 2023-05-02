/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

// core components

function Footer() {
  return (
    <>
      <footer className="footer">
        <Container>
          <div className="copyright" id="copyright">
            SkillsLounge © {new Date().getFullYear()}, Designed and Created by{" "}
            <a
              href="https://ecs.co.uk/digital-engineering"
              target="_blank"
            >
              ECS
            </a>
          </div>
        </Container>
      </footer>
    </>
  );
}

export default Footer;
