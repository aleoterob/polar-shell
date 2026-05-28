const LOGO_SRC = "/mediawiki-logo.svg";

interface AppLogoProps {
  className?: string;
}

export function AppLogo({ className = "size-4 shrink-0" }: AppLogoProps) {
  return (
    <img
      src={LOGO_SRC}
      alt=""
      aria-hidden
      className={className}
      width={16}
      height={16}
    />
  );
}
