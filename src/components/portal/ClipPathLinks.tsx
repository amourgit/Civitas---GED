import React from "react";
import {
  SiGoogle,
  SiTiktok,
  SiSpotify,
} from "react-icons/si";
import { FaDiscord } from "react-icons/fa";
import {
  Github,
  Twitter,
  Instagram,
  Facebook,
  Linkedin,
  Code,
} from "lucide-react";
import { useAnimate } from "framer-motion";

export const ClipPathLinks: React.FC = () => {
  return (
    <div className="w-full divide-y border divide-border border-border rounded-2xl overflow-hidden backdrop-blur-sm bg-black/20 shadow-xl">
      <div className="grid grid-cols-2 divide-x divide-border">
        <LinkBox Icon={SiGoogle} href="https://mail.google.com/mail/u/0/?fs=1&to=kamalkamalesh316@gmail.com&tf=cm" />
        <LinkBox Icon={Github} href="https://github.com/kamaleshsa" />
      </div>
      <div className="grid grid-cols-4 divide-x divide-border">
        <LinkBox Icon={Twitter} href="https://x.com/Kamales71036733" />
        <LinkBox Icon={Linkedin} href="https://www.linkedin.com/in/kamaleshsa" />
        <LinkBox Icon={Instagram} href="https://www.instagram.com/k.a.m.a_l?igsh=ZmRzbXF6NTBwOXIw" />
        <LinkBox Icon={Facebook} href="https://www.facebook.com/share/16Zgo4MK6M/" />
      </div>
      <div className="grid grid-cols-3 divide-x divide-border">
        <LinkBox Icon={FaDiscord} href="https://discord.com/users/1367756111725334599" />
        <LinkBox
          href="https://21st.dev/kamaleshsa"
          className="h-6 w-auto object-contain"
          imgSrc="https://media.licdn.com/dms/image/v2/D4E0BAQH3Jqtih4t7-A/company-logo_200_200/B4EZY_fSK1HUAM-/0/1744821888382/21st_dev_logo?e=2147483647&v=beta&t=8hoDRfmpNQR3aqnKWef5U0bW9Mg2GCbgwvgeQ5MKaKU"
        />
        <LinkBox
          href="https://kamaleshsaportfolio.netlify.app/"
          className="h-8 w-auto object-contain"
          imgSrc="https://cdn.21st.dev/assets/mirror/6c/6cf66dcf9de8b9ead62593f77267c650bc967da32cad15bf8c2fff02d24bc65f.png"
        />
      </div>
    </div>
  );
};

const NO_CLIP = "polygon(0 0, 100% 0, 100% 100%, 0% 100%)";
const BOTTOM_RIGHT_CLIP = "polygon(0 0, 100% 0, 0 0, 0% 100%)";
const TOP_RIGHT_CLIP = "polygon(0 0, 0 100%, 100% 100%, 0% 100%)";
const BOTTOM_LEFT_CLIP = "polygon(100% 100%, 100% 0, 100% 100%, 0 100%)";
const TOP_LEFT_CLIP = "polygon(0 0, 100% 0, 100% 100%, 100% 0)";

type Side = "left" | "right" | "top" | "bottom";

const ENTRANCE_KEYFRAMES: Record<Side, [string, string]> = {
  left: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  bottom: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  top: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  right: [TOP_LEFT_CLIP, NO_CLIP],
};

const EXIT_KEYFRAMES: Record<Side, [string, string]> = {
  left: [NO_CLIP, TOP_RIGHT_CLIP],
  bottom: [NO_CLIP, TOP_RIGHT_CLIP],
  top: [NO_CLIP, TOP_RIGHT_CLIP],
  right: [NO_CLIP, BOTTOM_LEFT_CLIP],
};

interface LinkBoxProps {
  Icon?: React.ComponentType<{ className?: string }>;
  href?: string;
  imgSrc?: string;
  className?: string;
}

const LinkBox: React.FC<LinkBoxProps> = ({ Icon, href, imgSrc, className }) => {
  const [scope, animate] = useAnimate();

  const getNearestSide = (e: React.MouseEvent<HTMLAnchorElement>): Side => {
    const box = e.currentTarget.getBoundingClientRect();

    const proximityToLeft = {
      proximity: Math.abs(box.left - e.clientX),
      side: "left" as Side,
    };
    const proximityToRight = {
      proximity: Math.abs(box.right - e.clientX),
      side: "right" as Side,
    };
    const proximityToTop = {
      proximity: Math.abs(box.top - e.clientY),
      side: "top" as Side,
    };
    const proximityToBottom = {
      proximity: Math.abs(box.bottom - e.clientY),
      side: "bottom" as Side,
    };

    const sortedProximity = [
      proximityToLeft,
      proximityToRight,
      proximityToTop,
      proximityToBottom,
    ].sort((a, b) => a.proximity - b.proximity);

    return sortedProximity[0].side;
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const side = getNearestSide(e);
    animate(scope.current, {
      clipPath: ENTRANCE_KEYFRAMES[side],
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const side = getNearestSide(e);
    animate(scope.current, {
      clipPath: EXIT_KEYFRAMES[side],
    });
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative grid h-20 w-full place-content-center sm:h-28 md:h-36 text-foreground bg-transparent transition-colors"
    >
      {imgSrc ? (
        <img
          src={imgSrc}
          alt="custom icon"
          className={className ?? "max-h-10 sm:max-h-16 md:max-h-20 object-contain"}
        />
      ) : Icon ? (
        <Icon className="text-xl sm:text-3xl md:text-4xl" />
      ) : null}

      <div
        ref={scope}
        style={{ clipPath: BOTTOM_RIGHT_CLIP }}
        className="absolute inset-0 grid place-content-center bg-primary text-primary-foreground transition-colors duration-300"
      >
        {imgSrc ? (
          <img
            src={imgSrc}
            alt="custom icon hover"
            className={className ?? "max-h-10 sm:max-h-16 md:max-h-20 object-contain"}
          />
        ) : Icon ? (
          <Icon className="text-xl sm:text-3xl md:text-4xl" />
        ) : null}
      </div>
    </a>
  );
};

export default ClipPathLinks;
