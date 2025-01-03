import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import React from "react";

interface InteractionTemplate {
  preview?: string;
  children?: React.ReactNode;
  heading?: React.ReactNode;
}

export function NotificationTemplate({
  children,
  heading,
  preview,
}: InteractionTemplate) {
  return (
    <Html lang="en">
      <Head />
      <Preview>{preview ?? ""}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Section className="mt-[32px]">
              {/* <Img
            src={`${baseUrl}/static/vercel-logo.png`}
            width="40"
            height="37"
            alt="Vercel"
            className="my-0 mx-auto"
          /> */}
            </Section>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              {heading}
            </Heading>
            {children}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
