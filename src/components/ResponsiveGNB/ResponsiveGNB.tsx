import { GNB } from "@/components/GNB";

export default function ResponsiveGNB() {
  return (
    <>
      <div className="hidden xl:block">
        <GNB size="large" />
      </div>
      <div className="hidden md:block xl:hidden">
        <GNB size="medium" />
      </div>
      <div className="block md:hidden">
        <GNB size="small" />
      </div>
    </>
  );
}
