import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Hr,
  Html,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";
import { siteConfig } from "../config/siteConfig";

interface AirbnbReviewEmailProps {
  authorName?: string;
  authorImage?: string;
  reviewText?: string;
}

export const InviteTemplateEmail = ({
  authorName = "John Doe",
  reviewText = `“Please join my forum”`,
}: AirbnbReviewEmailProps) => {
  const previewText = `Read ${authorName}'s review`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>

      <Body style={main}>
        <Section style={main}>
          <Container style={container}>
            <Section>
              <Text style={logo}>{siteConfig.name}</Text>
            </Section>
            <Section style={sectionsBorders}>
              <Row>
                <Column style={sectionBorder} />
                <Column style={sectionCenter} />
                <Column style={sectionBorder} />
              </Row>
            </Section>

            <Section style={{ paddingBottom: "20px" }}>
              <Row>
                <Text style={heading}>Lets become retirement buddies!</Text>
                <Text style={review}>{reviewText}</Text>
                <Text style={paragraph}>
                  We&apos;ve posted {authorName}
                  &apos;s review to your profile and we think that you are a
                  great match four our forum!
                </Text>
                <Text style={{ ...paragraph, paddingBottom: "16px" }}>
                  While it&apos;s too late to write a review of your own, you
                  can send your feedback to {authorName} using your retiral
                  message thread for our retirement ideas!
                </Text>

                <Button style={button} href="/">
                  Join the conversation now!
                </Button>
              </Row>
            </Section>

            <Hr style={hr} />

            <Section>
              <Row>
                <Text style={{ ...paragraph, fontWeight: "700" }}>
                  Common questions
                </Text>
                <Text>
                  <Link href="" style={link}>
                    How do reviews work?
                  </Link>
                </Text>
                <Text>
                  <Link href="" style={link}>
                    How do star ratings work?
                  </Link>
                </Text>
                <Text>
                  <Link href="" style={link}>
                    Can I leave a review after 14 days?
                  </Link>
                </Text>
                <Hr style={hr} />
                <Text style={footer}>
                  Retiral, Inc., 888 Brannan St, San Francisco, CA 94103
                </Text>
                <Link href="" style={reportLink}>
                  Report unsafe behavior
                </Link>
              </Row>
            </Section>
          </Container>
        </Section>
      </Body>
    </Html>
  );
};

export default InviteTemplateEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const logo = {
  margin: "0 auto",
};

const sectionsBorders = {
  width: "100%",
  display: "flex",
};

const sectionBorder = {
  borderBottom: "1px solid rgb(238,238,238)",
  width: "249px",
};

const sectionCenter = {
  borderBottom: "1px solid #006FEE",
  width: "102px",
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "580px",
};

const userImage = {
  margin: "0 auto",
  marginBottom: "16px",
  borderRadius: "50%",
};

const heading = {
  fontSize: "32px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#006FEE",
};

const paragraph = {
  fontSize: "18px",
  lineHeight: "1.4",
  color: "#000",
};

const review = {
  ...paragraph,
  padding: "24px",
  backgroundColor: "#f2f3f3",
  borderRadius: "4px",
};

const button = {
  backgroundColor: "#17c964",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "18px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
  padding: "16px 0",
};

const link = {
  ...paragraph,
  color: "#000",
  display: "block",
  textDecoration: "underline",
};

const reportLink = {
  fontSize: "14px",
  color: "#9ca299",
  textDecoration: "underline",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#9ca299",
  fontSize: "14px",
  marginBottom: "10px",
};
