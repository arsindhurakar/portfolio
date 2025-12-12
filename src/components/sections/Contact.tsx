import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BiLogoGmail } from "react-icons/bi";
import { FaGithub, FaLinkedin, FaViber, FaWhatsapp } from "react-icons/fa";
import { Button, Input, Textarea } from "components/shared/atoms";
import toast from "react-hot-toast";
import Basket from "components/shared/molecules/Basket";
import { useIsSmallScreen } from "utils";
import { IoIosChatbubbles } from "react-icons/io";

interface IContactProps {
  isPanelActive: boolean;
}

function Contact({ isPanelActive }: IContactProps) {
  const [active, setActive] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const isSendingMessage = status === "sending";
  const isSmallScreen = useIsSmallScreen();

  const channels = [
    { id: "gmail", icon: <BiLogoGmail />, handle: "loremipsum@gmail.com" },
    {
      id: "linkedin",
      icon: <FaLinkedin />,
      handle: "Lorem",
    },
    { id: "github", icon: <FaGithub />, handle: "lorem123" },
  ];

  const chats = [
    {
      id: "whats-app",
      icon: <FaWhatsapp />,
      color: "#25D366",
      link: "https://wa.me/+9779841234567",
    },
    {
      id: "viber",
      icon: <FaViber />,
      color: "#7360f2",
      link: "viber://chat?number=9779841234567",
    },
  ];

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isPanelActive) {
      timeout = setTimeout(() => setActive(true), 0);
    } else {
      setTimeout(() => setActive(false), 0);
    }

    return () => clearTimeout(timeout);
  }, [isPanelActive]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // still returns void
    const form = e.currentTarget;

    void (async () => {
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      const { name, email, message } = data;

      setStatus("sending");

      try {
        await emailjs.send(
          "service_e91jyn5", // e.g., "service_xxxxx"
          "template_ful2fbm", // e.g., "template_yyyyy"
          {
            name,
            email,
            message,
          },
          "c_TKyUXVcbkPbbwiL" // Your EmailJS User ID
        );
        setStatus("success");
        toast.success("All done! Your message is on its way.");
        form.reset();
      } catch (error) {
        console.error(error);
        toast.error("Oops! That didn’t behave.");
        setStatus("error");
      }
    })();
  };

  return (
    <div className="h-screen w-full px-4 py-6 sm:p-8 flex items-start md:items-center bg-background-secondary">
      <div className="sm:w-[calc(100vw-116px)] xl:w-[calc(100vw-130px)] flex flex-col-reverse md:flex-row items-start gap-8">
        <div className="flex flex-col space-y-4 md:w-1/2">
          <div className="flex flex-col space-y-4">
            <h1 className="text-primary m-0 hidden md:block">Lorem Ipsum?</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
              luctus efficitur diam at ultrices. Donec sed egestas odio,{" "}
              <span className="text-primary">id feugiat erat</span>.
            </p>
          </div>
          <div className="flex flex-col gap-1">
            {channels.map((channel) => (
              <div key={channel.id} className="flex items-center space-x-3">
                <span className="text-primary scale-[1.35]">
                  {channel.icon}
                </span>
                <p className="m-0">{channel.handle}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full md:w-1/2 ">
          <h1 className="text-primary mb-4 block md:hidden">Lorem Ipsum?</h1>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="card">
              <form className="space-y-4" onSubmit={onSubmit}>
                <Input
                  id="input-contact-form-name"
                  label="Name"
                  name="name"
                  placeholder="Your Name"
                  disabled={isSendingMessage}
                  required
                />
                <Input
                  id="input-contact-form-email"
                  type="email"
                  label="Email"
                  name="email"
                  placeholder="your@email.com"
                  disabled={isSendingMessage}
                  required
                />
                <Textarea
                  id="input-contact-form-message"
                  label="Message"
                  name="message"
                  placeholder="Your message..."
                  disabled={isSendingMessage}
                  required
                />
                <div className="md:text-end">
                  <Button
                    id="contact-form-submit"
                    type="submit"
                    className="button-outlined"
                    disabled={isSendingMessage}
                    loading={isSendingMessage}
                  >
                    {isSendingMessage ? "Sending" : "Send Message"}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
      <Basket
        className={`absolute z-50 ${
          !isSmallScreen ? "left-8 bottom-8" : "right-8 bottom-28"
        }`}
        basketIcon={<IoIosChatbubbles />}
        popups={chats}
        popupAlign={!isSmallScreen ? "right" : "left"}
      />
    </div>
  );
}

export default Contact;
