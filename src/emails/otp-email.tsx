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
import { NotificationTemplate } from "./_template/notification-template";

interface OTPEmailProps {
  username: string;
  requestFromIp: string;
  requestFromLocation: string;
  otpToken: string;
  invalidationLink: string;
}

export const OTPEmail = ({
  username,
  requestFromIp,
  requestFromLocation,
  otpToken,
  invalidationLink,
}: OTPEmailProps) => {
  return (
    <NotificationTemplate
      preview="Your Email Verification Token"
      heading={
        <>
          Your <strong>Email Verification</strong> Token
        </>
      }
    >
      <Text className="text-black text-[14px] leading-[24px]">
        Hello {username},
      </Text>
      <Text className="text-black text-[14px] leading-[24px]">
        Below is your email verification token. Do not share this token with
        anyone, and no one should ever ask you for it. This token is strictly
        intended to be used for BlmChat webapp.
      </Text>
      <Section className="px-12 py-4 text-lg font-bold text-center">
        <Row className="border border-solid border-black">
          <Column className="border border-solid border-[#000000] rounded-lg w-12 h-12">
            {otpToken[0]}
          </Column>
          <Column className="border border-solid border-[#000000] rounded-lg w-12 h-12">
            {otpToken[1]}
          </Column>
          <Column className="border border-solid border-[#000000] rounded-lg w-12 h-12">
            {otpToken[2]}
          </Column>
          <Column className="select-none">-</Column>
          <Column className="border border-solid border-[#000000] rounded-lg w-12 h-12">
            {otpToken[3]}
          </Column>
          <Column className="border border-solid border-[#000000] rounded-lg w-12 h-12">
            {otpToken[4]}
          </Column>
          <Column className="border border-solid border-[#000000] rounded-lg w-12 h-12">
            {otpToken[5]}
          </Column>
        </Row>
      </Section>
      <Text className="text-center font-bold text-lg">{otpToken}</Text>
      <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
      <Text className="text-[#666666] text-[12px] leading-[24px]">
        This invitation was intended for{" "}
        <span className="text-black">{username}</span>. This invite was sent
        from <span className="text-black">{requestFromIp}</span> located in{" "}
        <span className="text-black">{requestFromLocation}</span>. If you were
        not expecting this token, you can ignore this email. If you are
        concerned about your account's safety, please send us an email to{" "}
        <Link href="mailto:support@developedincode.com">
          support@developedincode.com
        </Link>
      </Text>
      <Text className="text-[#666666] text-[12px] leading-[24px]">
        Alternatively,{" "}
        <Link href={invalidationLink}>click here to invalidate the token</Link>!
      </Text>
    </NotificationTemplate>
  );
};

OTPEmail.PreviewProps = {
  username: "blm456",
  requestFromIp: "204.13.186.218",
  requestFromLocation: "São Paulo, Brazil",
  otpToken: "145872",
  invalidationLink:
    "http://localhost:3000/auth/invalidate-tokens?token=5648sa6d4s86ad84sa6d87sad6s45d6as54das86d&email=brandonleemartin1@gmail.com",
} as OTPEmailProps;

export default OTPEmail;
