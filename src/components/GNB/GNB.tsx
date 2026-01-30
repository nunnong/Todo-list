import Link from "next/link";
import CharacterLarge from "@public/img/characterLarge.svg";
import CharacterSmall from "@public/img/characterSmall.svg";

type GNBSize = "large" | "medium" | "small";

interface GNBProps {
  size?: GNBSize;
}

const STYLES = {
  large: { padding: "pl-90" },
  medium: { padding: "pl-6" },
  small: { padding: "pl-4" },
};

export default function GNB({ size = "large" }: GNBProps) {
  const { padding } = STYLES[size];
  const isSmall = size === "small";

  return (
    <div className={`w-full h-15 bg-white border-b border-slate-200 flex items-center ${padding}`}>
      <Link href="/">
        {isSmall ? (
          <CharacterSmall className="w-[71px] h-10" />
        ) : (
          <CharacterLarge className="w-[151px] h-10" />
        )}
      </Link>
    </div>
  );
}
